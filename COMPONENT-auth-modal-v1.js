/* COMPONENT-auth-modal-v1.js - BEGIN */
(function () {
  "use strict";

  window.SyncEtc = window.SyncEtc || {};

  var VERSION="COMPONENT-auth-modal-v1";
  var installed = false;
  var openState = false;
  var message = "";
  var messageType = "info";
  var busy = false;
  var customerLabel = "";

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  function clean(v) {
    return v == null ? "" : String(v).trim();
  }

  function snapshot() {
    return window.SyncEtc.AuthContext ? window.SyncEtc.AuthContext.getSnapshot() : {};
  }

  function labelFromSnapshot(s) {
    var active = s && s.active_customer ? s.active_customer : null;
    if (customerLabel) return customerLabel;
    if (active && active.syncetc_customers && active.syncetc_customers.display_name) return active.syncetc_customers.display_name;
    if (active && active.customer_key) return active.customer_key;
    return "SyncEtc";
  }

  function installStyle() {
    if (document.getElementById("COMPONENT-auth-modal-v1-style")) return;
    var style = document.createElement("style");
    style.id = "COMPONENT-auth-modal-v1-style";
    style.textContent = `
      .se-auth-modal-backdrop { position:fixed; inset:0; z-index:2147483200; display:none; align-items:center; justify-content:center; padding:22px; background:rgba(7,24,42,.58); backdrop-filter:blur(4px); }
      .se-auth-modal-backdrop.open { display:flex; }
      .se-auth-modal-card { width:min(460px,100%); border-radius:24px; background:#fff; border:1px solid rgba(18,54,90,.18); box-shadow:0 24px 70px rgba(0,0,0,.28); overflow:hidden; font-family:Arial,Helvetica,sans-serif; }
      .se-auth-modal-head { padding:22px 24px; background:linear-gradient(135deg,var(--se-aero-navy,#12365a),var(--se-aero-blue,#2f80c4)); color:#fff; }
      .se-auth-modal-head h3 { margin:0; color:#fff; font-size:24px; line-height:1.15; font-weight:900; letter-spacing:-.025em; }
      .se-auth-modal-head p { margin:8px 0 0; color:rgba(255,255,255,.88); font-size:14px; line-height:1.45; }
      .se-auth-modal-body { padding:22px 24px 24px; color:var(--se-aero-text,#1e2933); }
      .se-auth-modal-form { display:grid; gap:14px; }
      .se-auth-modal-field { display:grid; gap:7px; }
      .se-auth-modal-field label { color:var(--se-aero-navy-dark,#0b2744); font-size:13px; font-weight:900; line-height:1.25; }
      .se-auth-modal-input { width:100%; min-height:44px; padding:11px 13px; border:1px solid rgba(18,54,90,.18); border-radius:14px; background:#fff; color:var(--se-aero-text,#1e2933); font:inherit; font-size:14px; line-height:1.4; outline:none; box-sizing:border-box; }
      .se-auth-modal-input:focus { border-color:rgba(47,128,196,.62); box-shadow:0 0 0 4px rgba(47,128,196,.12); }
      .se-auth-modal-actions { display:flex; flex-wrap:wrap; gap:10px; justify-content:flex-end; align-items:center; margin-top:4px; }
      .se-auth-modal-btn { display:inline-flex; align-items:center; justify-content:center; min-height:42px; padding:10px 16px; border-radius:999px; background:var(--se-aero-navy,#12365a); color:#fff; border:1px solid rgba(255,255,255,.14); box-shadow:0 8px 18px rgba(18,54,90,.18); text-decoration:none; font:inherit; font-size:13px; font-weight:900; line-height:1.1; cursor:pointer; transition:.18s ease; }
      .se-auth-modal-btn.secondary { background:#fff; color:var(--se-aero-navy,#12365a); border:1px solid rgba(18,54,90,.22); box-shadow:none; }
      .se-auth-modal-btn[disabled] { opacity:.55; cursor:not-allowed; transform:none; box-shadow:none; }
      .se-auth-modal-status { display:none; margin-top:14px; padding:12px 13px; border-radius:14px; border:1px solid rgba(18,54,90,.12); font-size:13px; line-height:1.45; font-weight:800; word-break:break-word; }
      .se-auth-modal-status.show { display:block; }
      .se-auth-modal-status.info { background:rgba(234,245,255,.92); color:var(--se-aero-navy-dark,#0b2744); }
      .se-auth-modal-status.success { background:rgba(235,249,239,.96); border-color:rgba(25,128,62,.22); color:#14532d; }
      .se-auth-modal-status.error { background:rgba(255,241,241,.96); border-color:rgba(180,35,24,.24); color:#7a1d16; }
      .se-auth-modal-note { margin-top:14px; padding:12px 13px; border-radius:14px; background:rgba(18,54,90,.06); border:1px solid rgba(18,54,90,.12); color:var(--se-aero-muted,#5d6b78); font-size:13px; line-height:1.5; }
      @media(max-width:620px){ .se-auth-modal-actions{display:grid}.se-auth-modal-btn{width:100%} }
    `;
    document.head.appendChild(style);
  }

  function ensureRoot() {
    var root = document.getElementById("se-auth-modal-root");
    if (root) return root;
    root = document.createElement("div");
    root.id = "se-auth-modal-root";
    document.body.appendChild(root);
    return root;
  }

  function render() {
    installStyle();
    var root = ensureRoot();
    var s = snapshot();
    var signedIn = !!s.signed_in;
    var label = labelFromSnapshot(s);
    var statusClass = message ? "se-auth-modal-status show " + messageType : "se-auth-modal-status";
    var email = s.user && s.user.email ? s.user.email : "frank@syncetc.com";

    root.innerHTML = '<div class="se-auth-modal-backdrop ' + (openState ? "open" : "") + '" data-se-auth-modal-backdrop>' +
      '<div class="se-auth-modal-card" role="dialog" aria-modal="true">' +
        '<div class="se-auth-modal-head"><h3>' + (signedIn ? 'Signed in' : 'Sign in to ' + esc(label)) + '</h3><p>' + (signedIn ? 'Your SyncEtc session is active.' : 'Use your SyncEtc account for this customer/site.') + '</p></div>' +
        '<div class="se-auth-modal-body">' +
          (signedIn
            ? '<div class="se-auth-modal-note"><strong>' + esc(email) + '</strong><br>Current customer: ' + esc(label) + '</div><div class="se-auth-modal-actions"><button type="button" class="se-auth-modal-btn secondary" data-se-auth-modal-close>Close</button><button type="button" class="se-auth-modal-btn" data-se-auth-modal-signout ' + (busy ? "disabled" : "") + '>Sign Out</button></div>'
            : '<form class="se-auth-modal-form" id="se-auth-modal-form"><div class="se-auth-modal-field"><label>Email</label><input id="se-auth-modal-email" class="se-auth-modal-input" type="email" value="' + esc(email) + '" autocomplete="username"></div><div class="se-auth-modal-field"><label>Password</label><input id="se-auth-modal-password" class="se-auth-modal-input" type="password" autocomplete="current-password"></div><div class="se-auth-modal-actions"><button type="button" class="se-auth-modal-btn secondary" data-se-auth-modal-close>Cancel</button><button class="se-auth-modal-btn" type="submit" ' + (busy ? "disabled" : "") + '>Sign In</button></div></form>'
          ) +
          '<div class="' + esc(statusClass) + '">' + esc(message) + '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function open(options) {
    options = options || {};
    customerLabel = clean(options.customerLabel) || customerLabel;
    openState = true;
    message = "";
    messageType = "info";
    render();
    setTimeout(function () {
      var pw = document.getElementById("se-auth-modal-password");
      var em = document.getElementById("se-auth-modal-email");
      if (pw) pw.focus();
      else if (em) em.focus();
    }, 40);
  }

  function close() {
    openState = false;
    render();
  }

  async function submitLogin() {
    var Auth = window.SyncEtc && window.SyncEtc.AuthContext ? window.SyncEtc.AuthContext : null;
    if (!Auth) {
      messageType = "error";
      message = "AuthContext is not loaded.";
      render();
      return;
    }

    var email = clean(document.getElementById("se-auth-modal-email") && document.getElementById("se-auth-modal-email").value);
    var password = document.getElementById("se-auth-modal-password") && document.getElementById("se-auth-modal-password").value ? document.getElementById("se-auth-modal-password").value : "";

    if (!email || !password) {
      messageType = "error";
      message = "Email and password are required.";
      render();
      return;
    }

    busy = true;
    messageType = "info";
    message = "Signing in...";
    render();

    try {
      await Auth.signIn(email, password);
      busy = false;
      messageType = "success";
      message = "Signed in.";
      render();
      setTimeout(close, 650);
    } catch (err) {
      busy = false;
      messageType = "error";
      message = err.message || String(err);
      render();
    }
  }

  async function signOut() {
    var Auth = window.SyncEtc && window.SyncEtc.AuthContext ? window.SyncEtc.AuthContext : null;
    if (!Auth) {
      messageType = "error";
      message = "AuthContext is not loaded.";
      render();
      return;
    }

    busy = true;
    messageType = "info";
    message = "Signing out...";
    render();

    try {
      await Auth.signOut();
      busy = false;
      messageType = "success";
      message = "Signed out.";
      render();
      setTimeout(close, 500);
    } catch (err) {
      busy = false;
      messageType = "error";
      message = err.message || String(err);
      render();
    }
  }

  function wire() {
    if (installed) return;
    installed = true;

    document.addEventListener("submit", function (e) {
      if (e.target && e.target.id === "se-auth-modal-form") {
        e.preventDefault();
        submitLogin();
      }
    });

    document.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("[data-se-auth-modal-close]")) {
        close();
        return;
      }
      if (e.target.closest && e.target.closest("[data-se-auth-modal-signout]")) {
        signOut();
        return;
      }
      var backdrop = e.target.closest && e.target.closest("[data-se-auth-modal-backdrop]");
      if (backdrop && e.target === backdrop) {
        close();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && openState) close();
    });
  }

  function init() {
    wire();
    render();
    if (window.SyncEtc && window.SyncEtc.AuthContext && typeof window.SyncEtc.AuthContext.subscribe === "function") {
      window.SyncEtc.AuthContext.subscribe(function () {
        if (openState) render();
      });
    }
  }

  window.SyncEtc.AuthModal = {
    version: VERSION,
    init: init,
    open: open,
    close: close,
    render: render
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
/* COMPONENT-auth-modal-v1.js - END */
