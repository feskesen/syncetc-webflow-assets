/* PAGE-HEADER-AUTH-TEST-v1.js - BEGIN */
(function () {
  "use strict";

  var VERSION="PAGE-HEADER-AUTH-TEST-v1";
  var COMPONENT_FILES = ["COMPONENT-shared-utils-v1.js","COMPONENT-customer-style-v1.js","COMPONENT-base-styles-v1.js","COMPONENT-auth-context-v1.js","COMPONENT-auth-modal-v1.js","COMPONENT-security-context-v1.js","COMPONENT-auth-soft-bridge-v1.js","COMPONENT-master-controls-v1.js","COMPONENT-customer-settings-v1.js","COMPONENT-master-header-v1.js","COMPONENT-scroll-banner-v1.js","COMPONENT-master-footer-v1.js","COMPONENT-site-shell-v1.js","COMPONENT-customer-switcher-v1.js","COMPONENT-access-guard-v1.js"];

  var CURRENT_SCRIPT_SRC = document.currentScript && document.currentScript.src ? document.currentScript.src : "";
  var state = { shell:null, snapshot:null, message:"", messageType:"info" };

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
    var base = componentBaseUrl();
    return COMPONENT_FILES.reduce(function (p, file) {
      return p.then(function () { return loadScriptOnce(base + file + "?v=shared-security-policy-uniformity-1"); });
    }, Promise.resolve());
  }

  function U() {
    if (window.SyncEtc && window.SyncEtc.Components && window.SyncEtc.Components.Utils) return window.SyncEtc.Components.Utils;
    return {
      esc:function(v){return String(v==null?"":v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");},
      installStyle:function(id,css){var existing=document.getElementById(id);if(existing)existing.remove();var style=document.createElement("style");style.id=id;style.textContent=css;document.head.appendChild(style);}
    };
  }

  function esc(v){return U().esc(v);}

  function installStyles() {
    U().installStyle("PAGE-HEADER-AUTH-TEST-v1-style", `
      .se-hat-page{max-width:1180px;margin:34px auto 56px;padding:0 18px;font-family:Arial,Helvetica,sans-serif;color:var(--se-aero-text,#1e2933)}
      .se-hat-shell{background:rgba(255,255,255,.94);border:1px solid rgba(18,54,90,.16);border-radius:26px;box-shadow:0 18px 50px rgba(12,38,64,.22);overflow:hidden}
      .se-hat-hero{padding:30px 34px 26px;background:linear-gradient(135deg,var(--se-aero-navy,#12365a),var(--se-aero-blue,#2f80c4));color:#fff}
      .se-hat-eyebrow{display:inline-flex;margin-bottom:12px;padding:6px 12px;border-radius:999px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.24);font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:#fff}
      .se-hat-hero h1{margin:0;color:#fff;font-size:clamp(30px,4vw,46px);line-height:1.05;font-weight:900;letter-spacing:-.035em}
      .se-hat-hero p{max-width:880px;margin:14px 0 0;color:rgba(255,255,255,.9);font-size:16px;line-height:1.6}
      .se-hat-main{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:22px;padding:26px;background:linear-gradient(180deg,rgba(234,245,255,.55),rgba(255,255,255,.86))}
      .se-hat-panel{padding:22px;border-radius:20px;background:rgba(255,255,255,.88);border:1px solid rgba(18,54,90,.16);box-shadow:0 8px 24px rgba(12,38,64,.08)}
      .se-hat-label{display:inline-flex;margin-bottom:10px;padding:5px 10px;border-radius:999px;background:var(--se-aero-sky,#eaf5ff);color:var(--se-aero-navy,#12365a);font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
      .se-hat-panel h2{margin:0 0 12px;color:var(--se-aero-navy-dark,#0b2744);font-size:25px;line-height:1.18;font-weight:900;letter-spacing:-.02em}
      .se-hat-panel p{margin:0 0 15px;font-size:14px;line-height:1.65;color:var(--se-aero-text,#1e2933)}
      .se-hat-card{padding:15px;border-radius:16px;background:#fff;border:1px solid rgba(18,54,90,.12);margin-top:12px}
      .se-hat-card h3{margin:0 0 10px;color:var(--se-aero-navy-dark,#0b2744);font-size:16px;line-height:1.25;font-weight:900}
      .se-hat-kv{display:grid;grid-template-columns:170px 1fr;gap:8px 12px;font-size:13px;line-height:1.45}
      .se-hat-kv strong{color:var(--se-aero-muted,#5d6b78);font-weight:900}.se-hat-kv span{color:var(--se-aero-text,#1e2933);font-weight:800;word-break:break-word}
      .se-hat-note{margin-top:14px;padding:14px 16px;border-radius:16px;background:rgba(18,54,90,.06);border:1px solid rgba(18,54,90,.12);color:var(--se-aero-muted,#5d6b78);font-size:13px;line-height:1.55}
      @media(max-width:940px){.se-hat-main{grid-template-columns:1fr}}@media(max-width:620px){.se-hat-page{margin:24px auto 42px;padding:0 12px}.se-hat-hero{padding:26px 20px}.se-hat-main{padding:18px}.se-hat-panel{padding:18px}.se-hat-kv{grid-template-columns:1fr}}
    `);
  }

  function roleLabel(row) {
    if (!row) return "";
    return row.syncetc_role_definitions && row.syncetc_role_definitions.role_label ? row.syncetc_role_definitions.role_label : row.role_key;
  }

  function customerLabel(row) {
    if (!row) return "";
    return row.syncetc_customers && row.syncetc_customers.display_name ? row.syncetc_customers.display_name : row.customer_key;
  }

  function renderPage() {
    installStyles();
    var s = state.snapshot || {};
    var active = s.active_customer || {};
    var html = '<div class="se-hat-page"><div class="se-hat-shell"><header class="se-hat-hero"><div class="se-hat-eyebrow">Header Auth Test</div><h1>Header Login Wiring</h1><p>This verifies that the shared header Login and Logout buttons use the Supabase Auth modal and AuthContext.</p></header><main class="se-hat-main"><section class="se-hat-panel"><span class="se-hat-label">Instructions</span><h2>Use the header buttons</h2><p>Click Login in the site header. It should open the SyncEtc login modal. After sign-in, the header should show your email and a Logout button.</p><div class="se-hat-note">This does not touch Memberstack. It uses Supabase Auth.</div></section><section class="se-hat-panel"><span class="se-hat-label">Current State</span><h2>Resolved session</h2><div class="se-hat-card"><h3>Auth Context</h3><div class="se-hat-kv"><strong>Signed In</strong><span>' + esc(s.signed_in ? "yes" : "no") + '</span><strong>Email</strong><span>' + esc(s.user && s.user.email || "") + '</span><strong>Customer</strong><span>' + esc(customerLabel(active)) + '</span><strong>Role</strong><span>' + esc(roleLabel(active)) + '</span><strong>Gallery Admin Manage</strong><span>' + esc(window.SyncEtc && window.SyncEtc.AuthContext && window.SyncEtc.AuthContext.hasModuleAccess("gallery_admin","manage") ? "yes" : "no") + '</span></div></div></section></main></div></div>';
    if (state.shell) state.shell.render(html);
    else {
      var mount = document.getElementById("syncetc-webflow-mount") || document.body;
      mount.innerHTML = html;
    }
  }

  function init() {
    ensureComponents().then(function () {
      if(window.SyncEtc && window.SyncEtc.AuthModal && window.SyncEtc.AuthModal.init) window.SyncEtc.AuthModal.init();
      if(window.SyncEtc && window.SyncEtc.AuthSoftBridge && window.SyncEtc.AuthSoftBridge.start) window.SyncEtc.AuthSoftBridge.start();
      var mountId = "syncetc-webflow-mount";
      var mount = document.getElementById(mountId);
      if (!mount) {
        mount = document.createElement("div");
        mount.id = mountId;
        document.body.appendChild(mount);
      }

      if (window.SyncEtc && window.SyncEtc.AuthModal) window.SyncEtc.AuthModal.init();

      if (window.SyncEtc && window.SyncEtc.Components && window.SyncEtc.Components.SiteShell) {
        state.shell = window.SyncEtc.Components.SiteShell.create(mountId, {
          pageKey: "header-auth-test",
          audience: "public",
          version: VERSION,
          showBanner: false
        });
      }

      window.SyncEtc.AuthContext.subscribe(function (snapshot) {
        state.snapshot = snapshot;
        renderPage();
      });

      return window.SyncEtc.AuthContext.init();
    }).catch(function (err) {
      state.snapshot = { signed_in:false, last_error: err.message || String(err) };
      renderPage();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
/* PAGE-HEADER-AUTH-TEST-v1.js - END */
