/* COMPONENT-access-guard-v1.js - BEGIN */
(function () {
  "use strict";

  window.SyncEtc = window.SyncEtc || {};

  var VERSION = "COMPONENT-access-guard-v1";

  function clean(v) {
    return v == null ? "" : String(v).trim();
  }

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function auth() {
    return window.SyncEtc && window.SyncEtc.AuthContext ? window.SyncEtc.AuthContext : null;
  }

  function snapshot() {
    var A = auth();
    return A ? A.getSnapshot() : {
      signed_in: false,
      initialized: false,
      loading: false,
      last_error: "AuthContext is not loaded."
    };
  }

  function deny(reason, details) {
    return {
      allowed: false,
      read_only: true,
      denied: true,
      status: "denied",
      reason: reason || "Access denied.",
      details: details || {}
    };
  }

  function loading(reason) {
    return {
      allowed: false,
      read_only: true,
      denied: false,
      status: "loading",
      reason: reason || "Checking access.",
      details: {}
    };
  }

  function signedOut(reason) {
    return {
      allowed: false,
      read_only: true,
      denied: true,
      status: "signed_out",
      reason: reason || "Sign in required.",
      details: {}
    };
  }

  function allow(details) {
    return {
      allowed: true,
      read_only: false,
      denied: false,
      status: "allowed",
      reason: "Allowed.",
      details: details || {}
    };
  }

  function readOnly(reason, details) {
    return {
      allowed: false,
      read_only: true,
      denied: false,
      status: "read_only",
      reason: reason || "Read-only access.",
      details: details || {}
    };
  }

  function evaluate(options) {
    options = options || {};
    var A = auth();
    var s = snapshot();

    var moduleKey = clean(options.moduleKey);
    var action = clean(options.action || "view");
    var minRoleKey = clean(options.minRoleKey);
    var requireSignedIn = options.requireSignedIn !== false;
    var allowSuperAdmin = options.allowSuperAdmin !== false;
    var fallback = clean(options.fallback || "deny"); // deny | read_only

    // Secure default: if anything material is unknown, do not grant write/manage access.
    if (!A) return fallback === "read_only" ? readOnly("AuthContext is not loaded.") : deny("AuthContext is not loaded.");

    if (s.loading || s.busy) return loading("Checking login and permissions.");

    if (requireSignedIn && !s.signed_in) return signedOut("Sign in required.");

    if (allowSuperAdmin && A.hasPlatformRole && A.hasPlatformRole("syncetc_super_admin")) {
      return allow({
        source: "platform_super_admin",
        module_key: moduleKey,
        action: action,
        active_customer_key: s.active_customer_key || ""
      });
    }

    if (minRoleKey) {
      if (!A.hasCustomerRoleAtLeast || !A.hasCustomerRoleAtLeast(minRoleKey)) {
        return fallback === "read_only"
          ? readOnly("Current customer role is below " + minRoleKey + ".", { min_role_key: minRoleKey })
          : deny("Current customer role is below " + minRoleKey + ".", { min_role_key: minRoleKey });
      }
    }

    if (moduleKey) {
      if (!A.hasModuleAccess) {
        return fallback === "read_only" ? readOnly("Module access checker is unavailable.") : deny("Module access checker is unavailable.");
      }

      var mode = action === "manage" || action === "edit" || action === "approve" || action === "delete" ? "manage" : "view";
      var ok = A.hasModuleAccess(moduleKey, mode);

      if (!ok) {
        var msg = "Access is not permitted for module " + moduleKey + " / " + mode + ".";
        return fallback === "read_only" ? readOnly(msg, { module_key: moduleKey, mode: mode }) : deny(msg, { module_key: moduleKey, mode: mode });
      }
    }

    return allow({
      source: "customer_role_module",
      module_key: moduleKey,
      action: action,
      active_customer_key: s.active_customer_key || "",
      active_customer_role_key: s.active_customer_role_key || ""
    });
  }

  function enforce(options) {
    var result = evaluate(options);
    if (!result.allowed && result.status !== "read_only") {
      var err = new Error(result.reason || "Access denied.");
      err.accessGuard = result;
      throw err;
    }
    return result;
  }

  function applyToElement(target, options) {
    var el = typeof target === "string" ? document.querySelector(target) : target;
    if (!el) return evaluate(options);

    var result = evaluate(options);
    var disabledSelector = options && options.disableSelector ? options.disableSelector : "button,input,select,textarea,a";

    el.setAttribute("data-se-access-status", result.status);

    if (result.allowed) {
      el.classList.remove("se-access-denied", "se-access-readonly");
      Array.prototype.slice.call(el.querySelectorAll(disabledSelector)).forEach(function (node) {
        node.removeAttribute("disabled");
        node.removeAttribute("aria-disabled");
      });
      return result;
    }

    if (result.status === "read_only" || result.read_only) {
      el.classList.add("se-access-readonly");
      el.classList.remove("se-access-denied");
      Array.prototype.slice.call(el.querySelectorAll(disabledSelector)).forEach(function (node) {
        if (node.tagName && node.tagName.toLowerCase() === "a") node.setAttribute("aria-disabled", "true");
        else node.setAttribute("disabled", "disabled");
      });
      return result;
    }

    el.classList.add("se-access-denied");
    el.classList.remove("se-access-readonly");
    Array.prototype.slice.call(el.querySelectorAll(disabledSelector)).forEach(function (node) {
      if (node.tagName && node.tagName.toLowerCase() === "a") node.setAttribute("aria-disabled", "true");
      else node.setAttribute("disabled", "disabled");
    });

    return result;
  }

  function messageHtml(result, options) {
    options = options || {};
    var title = options.title || (
      result.allowed ? "Access granted" :
      result.status === "signed_out" ? "Sign in required" :
      result.status === "read_only" ? "Read-only mode" :
      "Access denied"
    );

    return '<div class="se-access-message se-access-message-' + esc(result.status) + '">' +
      '<strong>' + esc(title) + '</strong>' +
      '<span>' + esc(result.reason || "") + '</span>' +
    '</div>';
  }

  function installStyle() {
    if (document.getElementById("COMPONENT-access-guard-v1-style")) return;
    var style = document.createElement("style");
    style.id = "COMPONENT-access-guard-v1-style";
    style.textContent = `
      .se-access-denied { opacity:.72; }
      .se-access-readonly { opacity:.88; }
      .se-access-message { display:grid; gap:4px; margin:12px 0; padding:13px 14px; border-radius:14px; border:1px solid rgba(18,54,90,.12); font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:1.45; }
      .se-access-message strong { color:var(--se-aero-navy-dark,#0b2744); font-weight:900; }
      .se-access-message span { color:var(--se-aero-muted,#5d6b78); font-weight:800; }
      .se-access-message-allowed { background:rgba(235,249,239,.96); border-color:rgba(25,128,62,.22); }
      .se-access-message-read_only, .se-access-message-loading { background:rgba(234,245,255,.92); }
      .se-access-message-denied, .se-access-message-signed_out { background:rgba(255,241,241,.96); border-color:rgba(180,35,24,.24); }
    `;
    document.head.appendChild(style);
  }

  function init() {
    installStyle();
  }

  window.SyncEtc.AccessGuard = {
    version: VERSION,
    init: init,
    evaluate: evaluate,
    enforce: enforce,
    applyToElement: applyToElement,
    messageHtml: messageHtml,
    installStyle: installStyle
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
/* COMPONENT-access-guard-v1.js - END */
