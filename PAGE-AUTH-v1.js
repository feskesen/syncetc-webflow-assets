/* PAGE-AUTH-v1.js - BEGIN */
(function () {
  "use strict";

  var VERSION = "PAGE-AUTH-v1";
  var SUPABASE_URL = "https://ocdaohkiwonjmirqkjww.supabase.co";
  var SUPABASE_ANON_KEY = window.SYNCETC_SUPABASE_ANON_KEY || window.SUPABASE_ANON_KEY || "";
  var EDGE_URL = SUPABASE_URL + "/functions/v1/syncetc-auth-profile";

  var COMPONENT_FILES = [
    "COMPONENT-shared-utils-v1.js",
    "COMPONENT-customer-style-v1.js",
    "COMPONENT-base-styles-v1.js",
    "COMPONENT-master-controls-v1.js",
    "COMPONENT-master-header-v1.js",
    "COMPONENT-scroll-banner-v1.js",
    "COMPONENT-master-footer-v1.js",
    "COMPONENT-site-shell-v1.js"
  ];

  var CURRENT_SCRIPT_SRC = document.currentScript && document.currentScript.src ? document.currentScript.src : "";

  var state = {
    shell: null,
    client: null,
    loading: true,
    busy: false,
    message: "",
    messageType: "info",
    session: null,
    authUser: null,
    resolved: null,
    rawJsonOpen: false
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
    if (window.SyncEtc && window.SyncEtc.Components && window.SyncEtc.Components.SiteShell) return Promise.resolve();
    var base = componentBaseUrl();
    return COMPONENT_FILES.reduce(function (p, file) {
      return p.then(function () { return loadScriptOnce(base + file); });
    }, Promise.resolve());
  }

  function ensureSupabaseClient() {
    if (window.supabase && typeof window.supabase.createClient === "function") return Promise.resolve();
    return loadScriptOnce("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2");
  }

  function U() {
    if (window.SyncEtc && window.SyncEtc.Components && window.SyncEtc.Components.Utils) return window.SyncEtc.Components.Utils;
    return {
      esc: function (v) {
        return String(v == null ? "" : v)
          .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
      },
      installStyle: function (id, css) {
        var existing = document.getElementById(id);
        if (existing) existing.remove();
        var style = document.createElement("style");
        style.id = id;
        style.textContent = css;
        document.head.appendChild(style);
      }
    };
  }

  function esc(v) { return U().esc(v); }
  function byId(id) { return document.getElementById(id); }
  function clean(v) { return (v == null ? "" : String(v)).trim(); }

  function setMessage(type, msg) {
    state.messageType = type || "info";
    state.message = msg || "";
    render();
  }

  function installStyles() {
    U().installStyle("PAGE-AUTH-v1-style", `
      .se-auth-page { max-width:1180px; margin:34px auto 56px; padding:0 18px; font-family:Arial,Helvetica,sans-serif; color:var(--se-aero-text,#1e2933); }
      .se-auth-shell { background:rgba(255,255,255,.94); border:1px solid rgba(18,54,90,.16); border-radius:26px; box-shadow:0 18px 50px rgba(12,38,64,.22); overflow:hidden; }
      .se-auth-hero { padding:30px 34px 26px; background:linear-gradient(135deg,var(--se-aero-navy,#12365a),var(--se-aero-blue,#2f80c4)); color:#fff; }
      .se-auth-eyebrow { display:inline-flex; margin-bottom:12px; padding:6px 12px; border-radius:999px; background:rgba(255,255,255,.16); border:1px solid rgba(255,255,255,.24); font-size:12px; font-weight:900; letter-spacing:.08em; text-transform:uppercase; color:#fff; }
      .se-auth-hero h1 { margin:0; color:#fff; font-size:clamp(30px,4vw,46px); line-height:1.05; font-weight:900; letter-spacing:-.035em; }
      .se-auth-hero p { max-width:850px; margin:14px 0 0; color:rgba(255,255,255,.9); font-size:16px; line-height:1.6; }
      .se-auth-main { display:grid; grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr); gap:22px; padding:26px; background:linear-gradient(180deg,rgba(234,245,255,.55),rgba(255,255,255,.86)); }
      .se-auth-panel { padding:22px; border-radius:20px; background:rgba(255,255,255,.88); border:1px solid rgba(18,54,90,.16); box-shadow:0 8px 24px rgba(12,38,64,.08); }
      .se-auth-label { display:inline-flex; margin-bottom:10px; padding:5px 10px; border-radius:999px; background:var(--se-aero-sky,#eaf5ff); color:var(--se-aero-navy,#12365a); font-size:11px; font-weight:900; letter-spacing:.08em; text-transform:uppercase; }
      .se-auth-panel h2 { margin:0 0 12px; color:var(--se-aero-navy-dark,#0b2744); font-size:25px; line-height:1.18; font-weight:900; letter-spacing:-.02em; }
      .se-auth-panel p { margin:0 0 15px; font-size:14px; line-height:1.65; color:var(--se-aero-text,#1e2933); }
      .se-auth-form { display:grid; gap:14px; }
      .se-auth-field { display:grid; gap:7px; }
      .se-auth-field label { color:var(--se-aero-navy-dark,#0b2744); font-size:13px; font-weight:900; line-height:1.25; }
      .se-auth-input { width:100%; min-height:44px; padding:11px 13px; border:1px solid rgba(18,54,90,.18); border-radius:14px; background:#fff; color:var(--se-aero-text,#1e2933); font:inherit; font-size:14px; line-height:1.4; outline:none; }
      .se-auth-input:focus { border-color:rgba(47,128,196,.62); box-shadow:0 0 0 4px rgba(47,128,196,.12); }
      .se-auth-actions { display:flex; flex-wrap:wrap; gap:10px; align-items:center; margin-top:4px; }
      .se-auth-btn { display:inline-flex; align-items:center; justify-content:center; min-height:42px; padding:10px 16px; border-radius:999px; background:var(--se-aero-navy,#12365a); color:#fff; border:1px solid rgba(255,255,255,.14); box-shadow:0 8px 18px rgba(18,54,90,.18); text-decoration:none; font:inherit; font-size:13px; font-weight:900; line-height:1.1; cursor:pointer; transition:.18s ease; }
      .se-auth-btn:hover { transform:translateY(-1px); background:var(--se-aero-navy-dark,#0b2744); }
      .se-auth-btn.secondary { background:#fff; color:var(--se-aero-navy,#12365a); border:1px solid rgba(18,54,90,.22); box-shadow:none; }
      .se-auth-btn.secondary:hover { background:var(--se-aero-sky,#eaf5ff); color:var(--se-aero-navy,#12365a); box-shadow:none; }
      .se-auth-btn[disabled] { opacity:.55; cursor:not-allowed; transform:none; box-shadow:none; }
      .se-auth-status { display:none; margin-top:14px; padding:14px 16px; border-radius:16px; border:1px solid rgba(18,54,90,.12); font-size:13px; line-height:1.55; font-weight:800; word-break:break-word; }
      .se-auth-status.show { display:block; }
      .se-auth-status.info { background:rgba(234,245,255,.92); color:var(--se-aero-navy-dark,#0b2744); }
      .se-auth-status.success { background:rgba(235,249,239,.96); border-color:rgba(25,128,62,.22); color:#14532d; }
      .se-auth-status.error { background:rgba(255,241,241,.96); border-color:rgba(180,35,24,.24); color:#7a1d16; }
      .se-auth-cards { display:grid; gap:12px; }
      .se-auth-card { padding:15px; border-radius:16px; background:#fff; border:1px solid rgba(18,54,90,.12); }
      .se-auth-card h3 { margin:0 0 10px; color:var(--se-aero-navy-dark,#0b2744); font-size:16px; line-height:1.25; font-weight:900; }
      .se-auth-kv { display:grid; grid-template-columns:170px 1fr; gap:8px 12px; font-size:13px; line-height:1.45; }
      .se-auth-kv strong { color:var(--se-aero-muted,#5d6b78); font-weight:900; }
      .se-auth-kv span { color:var(--se-aero-text,#1e2933); font-weight:800; word-break:break-word; }
      .se-auth-pill-row { display:flex; flex-wrap:wrap; gap:8px; margin-top:8px; }
      .se-auth-pill { display:inline-flex; align-items:center; padding:6px 10px; border-radius:999px; background:var(--se-aero-sky,#eaf5ff); color:var(--se-aero-navy,#12365a); border:1px solid rgba(18,54,90,.12); font-size:12px; line-height:1.1; font-weight:900; }
      .se-auth-module-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; margin-top:10px; }
      .se-auth-module { padding:10px 11px; border-radius:13px; background:rgba(234,245,255,.55); border:1px solid rgba(18,54,90,.1); font-size:12px; line-height:1.3; }
      .se-auth-module strong { display:block; color:var(--se-aero-navy-dark,#0b2744); font-weight:900; margin-bottom:3px; }
      .se-auth-module span { color:var(--se-aero-muted,#5d6b78); font-weight:800; }
      .se-auth-json { margin-top:12px; max-height:340px; overflow:auto; padding:14px; border-radius:14px; background:#07182a; color:#e7f2ff; font-size:12px; line-height:1.5; white-space:pre-wrap; word-break:break-word; }
      .se-auth-note { margin-top:14px; padding:14px 16px; border-radius:16px; background:rgba(18,54,90,.06); border:1px solid rgba(18,54,90,.12); color:var(--se-aero-muted,#5d6b78); font-size:13px; line-height:1.55; }
      @media(max-width:940px){ .se-auth-main{grid-template-columns:1fr}.se-auth-module-grid{grid-template-columns:1fr} }
      @media(max-width:620px){ .se-auth-page{margin:24px auto 42px;padding:0 12px}.se-auth-hero{padding:26px 20px 22px}.se-auth-main{padding:18px}.se-auth-panel{padding:18px}.se-auth-kv{grid-template-columns:1fr}.se-auth-btn{width:100%} }
    `);
  }

  function createClient() {
    if (!SUPABASE_ANON_KEY) throw new Error("Missing SYNCETC_SUPABASE_ANON_KEY on this page.");
    state.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  async function refreshSession(resolveProfile) {
    if (!state.client) return;
    state.loading = true;
    render();
    var result = await state.client.auth.getSession();
    state.session = result.data && result.data.session ? result.data.session : null;
    state.authUser = state.session ? state.session.user : null;
    state.loading = false;
    render();
    if (resolveProfile && state.session) await resolveCurrentProfile();
  }

  async function resolveCurrentProfile() {
    if (!state.session || !state.session.access_token) {
      setMessage("error", "No active Supabase session. Log in first.");
      return;
    }
    state.busy = true;
    state.resolved = null;
    setMessage("info", "Resolving SyncEtc profile and permissions...");
    try {
      var response = await fetch(EDGE_URL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + state.session.access_token
        },
        body: JSON.stringify({ action: "current_profile", source: VERSION })
      });
      var text = await response.text();
      var body = {};
      try { body = text ? JSON.parse(text) : {}; }
      catch (_err) { throw new Error("Profile resolver returned non-JSON response: " + text.slice(0, 160)); }
      if (!response.ok || !body.ok) throw new Error(body.error || ("Profile resolver error " + response.status));
      state.resolved = body;
      state.busy = false;
      setMessage("success", "Profile resolved. Supabase Auth is connected to SyncEtc permissions.");
    } catch (err) {
      state.busy = false;
      state.resolved = null;
      setMessage("error", err.message || String(err));
    }
  }

  async function login(email, password) {
    state.busy = true;
    setMessage("info", "Signing in...");
    try {
      var result = await state.client.auth.signInWithPassword({ email: email, password: password });
      if (result.error) throw result.error;
      state.session = result.data.session || null;
      state.authUser = state.session ? state.session.user : null;
      await resolveCurrentProfile();
    } catch (err) {
      state.busy = false;
      setMessage("error", err.message || String(err));
    }
  }

  async function logout() {
    state.busy = true;
    setMessage("info", "Signing out...");
    try {
      var result = await state.client.auth.signOut();
      if (result.error) throw result.error;
      state.session = null;
      state.authUser = null;
      state.resolved = null;
      state.busy = false;
      setMessage("success", "Signed out.");
    } catch (err) {
      state.busy = false;
      setMessage("error", err.message || String(err));
    }
  }

  function roleLabel(row) {
    return row && row.syncetc_role_definitions && row.syncetc_role_definitions.role_label ? row.syncetc_role_definitions.role_label : (row && row.role_key ? row.role_key : "");
  }

  function customerLabel(row) {
    return row && row.syncetc_customers && row.syncetc_customers.display_name ? row.syncetc_customers.display_name : (row && row.customer_key ? row.customer_key : "");
  }

  function renderProfileCards() {
    if (state.loading) {
      return '<div class="se-auth-card"><h3>Loading session...</h3><p>Checking browser session.</p></div>';
    }

    if (!state.session) {
      return '<div class="se-auth-card"><h3>No active session</h3><p>Log in with frank@syncetc.com to test Supabase Auth.</p></div>';
    }

    var resolved = state.resolved;
    var profile = resolved && resolved.profile ? resolved.profile : {};
    var active = resolved && resolved.active_customer ? resolved.active_customer : null;
    var platformRoles = resolved && resolved.platform_roles ? resolved.platform_roles : [];
    var memberships = resolved && resolved.customer_memberships ? resolved.customer_memberships : [];
    var modules = resolved && resolved.active_modules ? resolved.active_modules : [];

    var html = '';
    html += '<div class="se-auth-card"><h3>Supabase Session</h3><div class="se-auth-kv">' +
      '<strong>Email</strong><span>' + esc(state.authUser && state.authUser.email || "") + '</span>' +
      '<strong>Auth User ID</strong><span>' + esc(state.authUser && state.authUser.id || "") + '</span>' +
      '<strong>Session</strong><span>Active</span>' +
      '</div></div>';

    html += '<div class="se-auth-card"><h3>SyncEtc Profile</h3><div class="se-auth-kv">' +
      '<strong>Display Name</strong><span>' + esc(profile.display_name || "") + '</span>' +
      '<strong>Email</strong><span>' + esc(profile.email || "") + '</span>' +
      '<strong>Status</strong><span>' + esc(profile.user_status || "") + '</span>' +
      '<strong>SyncEtc Staff</strong><span>' + esc(profile.is_syncetc_staff ? "true" : "false") + '</span>' +
      '</div></div>';

    html += '<div class="se-auth-card"><h3>Platform Role</h3><div class="se-auth-pill-row">' +
      (platformRoles.length ? platformRoles.map(function (r) { return '<span class="se-auth-pill">' + esc(roleLabel(r)) + '</span>'; }).join("") : '<span class="se-auth-pill">None</span>') +
      '</div></div>';

    html += '<div class="se-auth-card"><h3>Active Customer</h3><div class="se-auth-kv">' +
      '<strong>Customer</strong><span>' + esc(customerLabel(active)) + '</span>' +
      '<strong>Customer Key</strong><span>' + esc(active && active.customer_key || "") + '</span>' +
      '<strong>Role</strong><span>' + esc(roleLabel(active)) + '</span>' +
      '<strong>Default</strong><span>' + esc(active && active.is_default_customer ? "true" : "false") + '</span>' +
      '<strong>Demo Customer</strong><span>' + esc(active && active.syncetc_customers && active.syncetc_customers.is_demo_customer ? "true" : "false") + '</span>' +
      '</div></div>';

    html += '<div class="se-auth-card"><h3>Customer Memberships</h3><div class="se-auth-pill-row">' +
      (memberships.length ? memberships.map(function (m) { return '<span class="se-auth-pill">' + esc(customerLabel(m)) + " · " + esc(roleLabel(m)) + '</span>'; }).join("") : '<span class="se-auth-pill">None</span>') +
      '</div></div>';

    html += '<div class="se-auth-card"><h3>Enabled Modules for Active Customer</h3><div class="se-auth-module-grid">' +
      (modules.length ? modules.map(function (m) {
        return '<div class="se-auth-module"><strong>' + esc(m.module_label) + '</strong><span>' + esc(m.module_key) + ' · view: ' + esc(m.can_view ? "yes" : "no") + ' · manage: ' + esc(m.can_manage ? "yes" : "no") + '</span></div>';
      }).join("") : '<div class="se-auth-module"><strong>No modules found</strong><span>Check customer module access.</span></div>') +
      '</div></div>';

    html += '<div class="se-auth-card"><h3>Raw Resolver Output</h3><button type="button" class="se-auth-btn secondary" data-se-auth-json-toggle>' + (state.rawJsonOpen ? "Hide JSON" : "Show JSON") + '</button>' +
      (state.rawJsonOpen ? '<pre class="se-auth-json">' + esc(JSON.stringify(resolved || {}, null, 2)) + '</pre>' : '') +
      '</div>';

    return html;
  }

  function render() {
    installStyles();

    var statusClass = state.message ? "se-auth-status show " + state.messageType : "se-auth-status";
    var loggedIn = !!state.session;
    var emailValue = loggedIn && state.authUser ? state.authUser.email : "frank@syncetc.com";

    var html = '<div class="se-auth-page"><div class="se-auth-shell">' +
      '<header class="se-auth-hero"><div class="se-auth-eyebrow">SyncEtc Auth Test</div><h1>Login & Profile Resolver</h1><p>This page confirms Supabase Auth login, the SyncEtc user profile, platform role, customer membership, and active customer module access.</p></header>' +
      '<main class="se-auth-main">' +
        '<section class="se-auth-panel"><span class="se-auth-label">Login Test</span><h2>Supabase Auth</h2>' +
          '<form class="se-auth-form" id="se-auth-form">' +
            '<div class="se-auth-field"><label for="se-auth-email">Email</label><input id="se-auth-email" class="se-auth-input" type="email" autocomplete="username" value="' + esc(emailValue) + '" ' + (loggedIn ? "disabled" : "") + '></div>' +
            '<div class="se-auth-field"><label for="se-auth-password">Password</label><input id="se-auth-password" class="se-auth-input" type="password" autocomplete="current-password" placeholder="' + (loggedIn ? "Already signed in" : "Enter test password") + '" ' + (loggedIn ? "disabled" : "") + '></div>' +
            '<div class="se-auth-actions">' +
              (loggedIn ? '<button type="button" class="se-auth-btn" data-se-auth-resolve ' + (state.busy ? "disabled" : "") + '>Resolve Profile</button><button type="button" class="se-auth-btn secondary" data-se-auth-logout ' + (state.busy ? "disabled" : "") + '>Sign Out</button>' : '<button type="submit" class="se-auth-btn" ' + (state.busy ? "disabled" : "") + '>Sign In</button>') +
            '</div>' +
            '<div class="' + esc(statusClass) + '">' + esc(state.message) + '</div>' +
          '</form>' +
          '<div class="se-auth-note">This is a SyncEtc test login. It does not touch Memberstack and does not use the real 150th Aero login model.</div>' +
        '</section>' +
        '<section class="se-auth-panel"><span class="se-auth-label">Resolved Access</span><h2>Current User Context</h2><div class="se-auth-cards">' + renderProfileCards() + '</div></section>' +
      '</main></div></div>';

    if (state.shell) state.shell.render(html);
    else {
      var mount = byId("syncetc-webflow-mount") || document.body;
      mount.innerHTML = html;
    }
  }

  function bind() {
    document.addEventListener("submit", function (e) {
      if (e.target && e.target.id === "se-auth-form") {
        e.preventDefault();
        if (state.session) return;
        var email = clean(byId("se-auth-email") && byId("se-auth-email").value);
        var password = byId("se-auth-password") && byId("se-auth-password").value ? byId("se-auth-password").value : "";
        if (!email || !password) {
          setMessage("error", "Email and password are required.");
          return;
        }
        login(email, password);
      }
    });

    document.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("[data-se-auth-resolve]")) {
        resolveCurrentProfile();
        return;
      }
      if (e.target.closest && e.target.closest("[data-se-auth-logout]")) {
        logout();
        return;
      }
      if (e.target.closest && e.target.closest("[data-se-auth-json-toggle]")) {
        state.rawJsonOpen = !state.rawJsonOpen;
        render();
        return;
      }
    });
  }

  function init() {
    ensureComponents()
      .then(ensureSupabaseClient)
      .then(function () {
        createClient();

        var mountId = "syncetc-webflow-mount";
        var mount = byId(mountId);
        if (!mount) {
          mount = document.createElement("div");
          mount.id = mountId;
          document.body.appendChild(mount);
        }

        if (window.SyncEtc && window.SyncEtc.Components && window.SyncEtc.Components.SiteShell) {
          state.shell = window.SyncEtc.Components.SiteShell.create(mountId, {
            pageKey: "auth",
            audience: "syncetc",
            version: VERSION,
            showBanner: false
          });
        }

        bind();
        render();
        return refreshSession(true);
      })
      .catch(function (err) {
        state.loading = false;
        state.busy = false;
        setMessage("error", err.message || String(err));
      });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
/* PAGE-AUTH-v1.js - END */
