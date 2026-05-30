/* PAGE-AUTH-CONTEXT-TEST-v1.js - BEGIN */
(function () {
  "use strict";

  var VERSION="PAGE-AUTH-CONTEXT-TEST-v1";
  var COMPONENT_FILES = [
    "COMPONENT-shared-utils-v1.js",
    "COMPONENT-customer-style-v1.js",
    "COMPONENT-base-styles-v1.js",
    "COMPONENT-master-controls-v1.js",
    "COMPONENT-master-header-v1.js",
    "COMPONENT-scroll-banner-v1.js",
    "COMPONENT-master-footer-v1.js",
    "COMPONENT-site-shell-v1.js",
    "COMPONENT-auth-context-v1.js"
  ];

  var CURRENT_SCRIPT_SRC = document.currentScript && document.currentScript.src ? document.currentScript.src : "";
  var state = {
    shell: null,
    snapshot: null,
    message: "",
    messageType: "info",
    rawOpen: false
  };

  function componentBaseUrl() {
    if (window.SYNCETC_COMPONENT_BASE_URL) return String(window.SYNCETC_COMPONENT_BASE_URL).replace(/\/?$/, "/");
    if (CURRENT_SCRIPT_SRC) return CURRENT_SCRIPT_SRC.substring(0, CURRENT_SCRIPT_SRC.lastIndexOf("/") + 1);
    return "https://feskesen.github.io/syncetc-webflow-assets/";
  }

  function loadScriptOnce(src) {
    return new Promise(function (resolve, reject) {
      var existing = Array.prototype.slice.call(document.scripts).find(function (s) { return s.src === src; });
      if (existing) return resolve();
      var script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = function () { resolve(); };
      script.onerror = function () { reject(new Error("Could not load " + src)); };
      document.head.appendChild(script);
    });
  }

  function ensureComponents() {
    if (window.SyncEtc && window.SyncEtc.AuthContext) return Promise.resolve();
    var base = componentBaseUrl();
    return COMPONENT_FILES.reduce(function (p, file) {
      return p.then(function () { return loadScriptOnce(base + file); });
    }, Promise.resolve());
  }

  function U() {
    if (window.SyncEtc && window.SyncEtc.Components && window.SyncEtc.Components.Utils) return window.SyncEtc.Components.Utils;
    return {
      esc: function (v) { return String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;"); },
      installStyle: function (id, css) { var existing = document.getElementById(id); if (existing) existing.remove(); var style = document.createElement("style"); style.id = id; style.textContent = css; document.head.appendChild(style); }
    };
  }

  function esc(v) { return U().esc(v); }
  function clean(v) { return v == null ? "" : String(v).trim(); }
  function byId(id) { return document.getElementById(id); }

  function setMessage(type, text) {
    state.messageType = type || "info";
    state.message = text || "";
    render();
  }

  function installStyles() {
    U().installStyle("PAGE-AUTH-CONTEXT-TEST-v1-style", `
      .se-act-page{max-width:1180px;margin:34px auto 56px;padding:0 18px;font-family:Arial,Helvetica,sans-serif;color:var(--se-aero-text,#1e2933)}
      .se-act-shell{background:rgba(255,255,255,.94);border:1px solid rgba(18,54,90,.16);border-radius:26px;box-shadow:0 18px 50px rgba(12,38,64,.22);overflow:hidden}
      .se-act-hero{padding:30px 34px 26px;background:linear-gradient(135deg,var(--se-aero-navy,#12365a),var(--se-aero-blue,#2f80c4));color:#fff}
      .se-act-eyebrow{display:inline-flex;margin-bottom:12px;padding:6px 12px;border-radius:999px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.24);font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:#fff}
      .se-act-hero h1{margin:0;color:#fff;font-size:clamp(30px,4vw,46px);line-height:1.05;font-weight:900;letter-spacing:-.035em}
      .se-act-hero p{max-width:880px;margin:14px 0 0;color:rgba(255,255,255,.9);font-size:16px;line-height:1.6}
      .se-act-main{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:22px;padding:26px;background:linear-gradient(180deg,rgba(234,245,255,.55),rgba(255,255,255,.86))}
      .se-act-panel{padding:22px;border-radius:20px;background:rgba(255,255,255,.88);border:1px solid rgba(18,54,90,.16);box-shadow:0 8px 24px rgba(12,38,64,.08)}
      .se-act-label{display:inline-flex;margin-bottom:10px;padding:5px 10px;border-radius:999px;background:var(--se-aero-sky,#eaf5ff);color:var(--se-aero-navy,#12365a);font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
      .se-act-panel h2{margin:0 0 12px;color:var(--se-aero-navy-dark,#0b2744);font-size:25px;line-height:1.18;font-weight:900;letter-spacing:-.02em}
      .se-act-panel p{margin:0 0 15px;font-size:14px;line-height:1.65;color:var(--se-aero-text,#1e2933)}
      .se-act-form{display:grid;gap:14px}.se-act-field{display:grid;gap:7px}.se-act-field label{color:var(--se-aero-navy-dark,#0b2744);font-size:13px;font-weight:900}
      .se-act-input{width:100%;min-height:44px;padding:11px 13px;border:1px solid rgba(18,54,90,.18);border-radius:14px;background:#fff;color:var(--se-aero-text,#1e2933);font:inherit;font-size:14px;outline:none}
      .se-act-actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
      .se-act-btn{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:10px 16px;border-radius:999px;background:var(--se-aero-navy,#12365a);color:#fff;border:1px solid rgba(255,255,255,.14);box-shadow:0 8px 18px rgba(18,54,90,.18);font:inherit;font-size:13px;font-weight:900;cursor:pointer}
      .se-act-btn.secondary{background:#fff;color:var(--se-aero-navy,#12365a);border:1px solid rgba(18,54,90,.22);box-shadow:none}.se-act-btn[disabled]{opacity:.55;cursor:not-allowed}
      .se-act-status{display:none;margin-top:14px;padding:14px 16px;border-radius:16px;border:1px solid rgba(18,54,90,.12);font-size:13px;line-height:1.55;font-weight:800}.se-act-status.show{display:block}.se-act-status.info{background:rgba(234,245,255,.92);color:var(--se-aero-navy-dark,#0b2744)}.se-act-status.success{background:rgba(235,249,239,.96);border-color:rgba(25,128,62,.22);color:#14532d}.se-act-status.error{background:rgba(255,241,241,.96);border-color:rgba(180,35,24,.24);color:#7a1d16}
      .se-act-cards{display:grid;gap:12px}.se-act-card{padding:15px;border-radius:16px;background:#fff;border:1px solid rgba(18,54,90,.12)}.se-act-card h3{margin:0 0 10px;color:var(--se-aero-navy-dark,#0b2744);font-size:16px;line-height:1.25;font-weight:900}
      .se-act-kv{display:grid;grid-template-columns:180px 1fr;gap:8px 12px;font-size:13px;line-height:1.45}.se-act-kv strong{color:var(--se-aero-muted,#5d6b78);font-weight:900}.se-act-kv span{color:var(--se-aero-text,#1e2933);font-weight:800;word-break:break-word}
      .se-act-pill-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}.se-act-pill{display:inline-flex;align-items:center;padding:6px 10px;border-radius:999px;background:var(--se-aero-sky,#eaf5ff);color:var(--se-aero-navy,#12365a);border:1px solid rgba(18,54,90,.12);font-size:12px;font-weight:900}
      .se-act-module-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:10px}.se-act-module{padding:10px 11px;border-radius:13px;background:rgba(234,245,255,.55);border:1px solid rgba(18,54,90,.1);font-size:12px;line-height:1.3}.se-act-module strong{display:block;color:var(--se-aero-navy-dark,#0b2744);font-weight:900;margin-bottom:3px}.se-act-module span{color:var(--se-aero-muted,#5d6b78);font-weight:800}
      .se-act-json{margin-top:12px;max-height:340px;overflow:auto;padding:14px;border-radius:14px;background:#07182a;color:#e7f2ff;font-size:12px;line-height:1.5;white-space:pre-wrap;word-break:break-word}
      .se-act-note{margin-top:14px;padding:14px 16px;border-radius:16px;background:rgba(18,54,90,.06);border:1px solid rgba(18,54,90,.12);color:var(--se-aero-muted,#5d6b78);font-size:13px;line-height:1.55}
      @media(max-width:940px){.se-act-main{grid-template-columns:1fr}.se-act-module-grid{grid-template-columns:1fr}}@media(max-width:620px){.se-act-page{margin:24px auto 42px;padding:0 12px}.se-act-hero{padding:26px 20px}.se-act-main{padding:18px}.se-act-panel{padding:18px}.se-act-kv{grid-template-columns:1fr}.se-act-btn{width:100%}}
    `);
  }

  function displayNameForCustomer(c) {
    if (!c) return "";
    return c.syncetc_customers && c.syncetc_customers.display_name ? c.syncetc_customers.display_name : c.customer_key;
  }

  function roleLabel(r) {
    if (!r) return "";
    return r.syncetc_role_definitions && r.syncetc_role_definitions.role_label ? r.syncetc_role_definitions.role_label : r.role_key;
  }

  function renderLogin(snapshot) {
    if (snapshot && snapshot.signed_in) {
      return '<div class="se-act-card"><h3>Signed In</h3><div class="se-act-kv"><strong>Email</strong><span>' + esc(snapshot.user.email) + '</span><strong>Auth User ID</strong><span>' + esc(snapshot.user.id) + '</span></div><div class="se-act-actions" style="margin-top:14px;"><button type="button" class="se-act-btn" data-se-act-resolve>Refresh Context</button><button type="button" class="se-act-btn secondary" data-se-act-signout>Sign Out</button></div></div>';
    }
    return '<form class="se-act-form" id="se-act-login"><div class="se-act-field"><label>Email</label><input id="se-act-email" class="se-act-input" type="email" value="frank@syncetc.com" autocomplete="username"></div><div class="se-act-field"><label>Password</label><input id="se-act-password" class="se-act-input" type="password" autocomplete="current-password"></div><div class="se-act-actions"><button class="se-act-btn" type="submit">Sign In</button></div></form>';
  }

  function renderCards(snapshot) {
    if (!snapshot) return '<div class="se-act-card"><h3>Loading...</h3><p>Initializing auth context.</p></div>';
    if (!snapshot.signed_in) return '<div class="se-act-card"><h3>No Active Session</h3><p>Sign in to test the shared auth context component.</p></div>';

    var profile = snapshot.profile || {};
    var active = snapshot.active_customer || {};
    var platforms = snapshot.platform_roles || [];
    var memberships = snapshot.customer_memberships || [];
    var modules = snapshot.active_modules || [];

    var html = '';
    html += '<div class="se-act-card"><h3>Profile</h3><div class="se-act-kv"><strong>Display Name</strong><span>' + esc(profile.display_name || "") + '</span><strong>Email</strong><span>' + esc(profile.email || "") + '</span><strong>SyncEtc Staff</strong><span>' + esc(profile.is_syncetc_staff ? "true" : "false") + '</span></div></div>';
    html += '<div class="se-act-card"><h3>Active Customer</h3><div class="se-act-kv"><strong>Customer</strong><span>' + esc(displayNameForCustomer(active)) + '</span><strong>Customer Key</strong><span>' + esc(snapshot.active_customer_key || "") + '</span><strong>Role</strong><span>' + esc(roleLabel(active)) + '</span><strong>Role Rank</strong><span>' + esc(snapshot.active_customer_role_rank || "") + '</span></div></div>';
    html += '<div class="se-act-card"><h3>Platform Roles</h3><div class="se-act-pill-row">' + (platforms.length ? platforms.map(function (r) { return '<span class="se-act-pill">' + esc(roleLabel(r)) + '</span>'; }).join("") : '<span class="se-act-pill">None</span>') + '</div></div>';
    html += '<div class="se-act-card"><h3>Customer Memberships</h3><div class="se-act-pill-row">' + (memberships.length ? memberships.map(function (m) { return '<span class="se-act-pill">' + esc(displayNameForCustomer(m)) + ' · ' + esc(roleLabel(m)) + '</span>'; }).join("") : '<span class="se-act-pill">None</span>') + '</div></div>';
    html += '<div class="se-act-card"><h3>Module Checks</h3><div class="se-act-kv"><strong>Gallery View</strong><span>' + esc(window.SyncEtc.AuthContext.hasModuleAccess("gallery", "view") ? "yes" : "no") + '</span><strong>Gallery Admin Manage</strong><span>' + esc(window.SyncEtc.AuthContext.hasModuleAccess("gallery_admin", "manage") ? "yes" : "no") + '</span><strong>Customer Admin+</strong><span>' + esc(window.SyncEtc.AuthContext.hasCustomerRoleAtLeast("customer_admin") ? "yes" : "no") + '</span><strong>SyncEtc Super Admin</strong><span>' + esc(window.SyncEtc.AuthContext.hasPlatformRole("syncetc_super_admin") ? "yes" : "no") + '</span></div></div>';
    html += '<div class="se-act-card"><h3>Active Modules</h3><div class="se-act-module-grid">' + (modules.length ? modules.map(function (m) { return '<div class="se-act-module"><strong>' + esc(m.module_label || m.module_key) + '</strong><span>' + esc(m.module_key) + ' · view: ' + esc(m.can_view ? "yes" : "no") + ' · manage: ' + esc(m.can_manage ? "yes" : "no") + '</span></div>'; }).join("") : '<div class="se-act-module"><strong>No modules found</strong><span>Check resolver output.</span></div>') + '</div></div>';
    html += '<div class="se-act-card"><h3>Raw Snapshot</h3><button type="button" class="se-act-btn secondary" data-se-act-json>' + (state.rawOpen ? "Hide JSON" : "Show JSON") + '</button>' + (state.rawOpen ? '<pre class="se-act-json">' + esc(JSON.stringify(snapshot, null, 2)) + '</pre>' : '') + '</div>';
    return html;
  }

  function render() {
    installStyles();
    var snapshot = state.snapshot;
    var statusClass = state.message ? "se-act-status show " + state.messageType : "se-act-status";
    var html = '<div class="se-act-page"><div class="se-act-shell"><header class="se-act-hero"><div class="se-act-eyebrow">Shared Auth Context Test</div><h1>Auth Context Component</h1><p>This verifies the reusable SyncEtc auth/customer context helper that future pages will call instead of duplicating login/profile logic.</p></header><main class="se-act-main"><section class="se-act-panel"><span class="se-act-label">Login / Session</span><h2>Shared Auth State</h2>' + renderLogin(snapshot) + '<div class="' + esc(statusClass) + '">' + esc(state.message) + '</div><div class="se-act-note">Component under test: COMPONENT-auth-context-v1.js</div></section><section class="se-act-panel"><span class="se-act-label">Resolved Context</span><h2>Current Context Snapshot</h2><div class="se-act-cards">' + renderCards(snapshot) + '</div></section></main></div></div>';

    if (state.shell) state.shell.render(html);
    else {
      var mount = document.getElementById("syncetc-webflow-mount") || document.body;
      mount.innerHTML = html;
    }
  }

  function bind() {
    document.addEventListener("submit", async function (e) {
      if (e.target && e.target.id === "se-act-login") {
        e.preventDefault();
        try {
          await window.SyncEtc.AuthContext.signIn(clean(byId("se-act-email").value), byId("se-act-password").value || "");
          setMessage("success", "Signed in through shared AuthContext.");
        } catch (err) {
          setMessage("error", err.message || String(err));
        }
      }
    });

    document.addEventListener("click", async function (e) {
      if (e.target.closest && e.target.closest("[data-se-act-signout]")) {
        try {
          await window.SyncEtc.AuthContext.signOut();
          setMessage("success", "Signed out.");
        } catch (err) {
          setMessage("error", err.message || String(err));
        }
        return;
      }
      if (e.target.closest && e.target.closest("[data-se-act-resolve]")) {
        try {
          await window.SyncEtc.AuthContext.resolve();
          setMessage("success", "Context refreshed.");
        } catch (err) {
          setMessage("error", err.message || String(err));
        }
        return;
      }
      if (e.target.closest && e.target.closest("[data-se-act-json]")) {
        state.rawOpen = !state.rawOpen;
        render();
      }
    });
  }

  function init() {
    ensureComponents().then(function () {
      var mountId = "syncetc-webflow-mount";
      var mount = document.getElementById(mountId);
      if (!mount) {
        mount = document.createElement("div");
        mount.id = mountId;
        document.body.appendChild(mount);
      }

      if (window.SyncEtc && window.SyncEtc.Components && window.SyncEtc.Components.SiteShell) {
        state.shell = window.SyncEtc.Components.SiteShell.create(mountId, {
          pageKey: "auth-context-test",
          audience: "syncetc",
          version: VERSION,
          showBanner: false
        });
      }

      bind();

      window.SyncEtc.AuthContext.subscribe(function (snapshot) {
        state.snapshot = snapshot;
        render();
      });

      return window.SyncEtc.AuthContext.init();
    }).then(function () {
      setMessage("success", "Auth context initialized.");
    }).catch(function (err) {
      setMessage("error", err.message || String(err));
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
/* PAGE-AUTH-CONTEXT-TEST-v1.js - END */
