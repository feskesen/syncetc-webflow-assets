/* PAGE-ACCESS-GUARD-TEST-v1.js - BEGIN */
(function () {
  "use strict";

  var VERSION="PAGE-ACCESS-GUARD-TEST-v1";
  var COMPONENT_FILES = ["COMPONENT-shared-utils-v1.js","COMPONENT-customer-style-v1.js","COMPONENT-base-styles-v1.js","COMPONENT-auth-context-v1.js","COMPONENT-auth-modal-v1.js","COMPONENT-security-context-v1.js","COMPONENT-auth-soft-bridge-v1.js","COMPONENT-master-controls-v1.js","COMPONENT-customer-settings-v1.js","COMPONENT-master-header-v1.js","COMPONENT-scroll-banner-v1.js","COMPONENT-master-footer-v1.js","COMPONENT-site-shell-v1.js","COMPONENT-customer-switcher-v1.js","COMPONENT-access-guard-v1.js"];

  var CURRENT_SCRIPT_SRC = document.currentScript && document.currentScript.src ? document.currentScript.src : "";
  var state = { shell:null, snapshot:null, checks:[] };

  function baseUrl() {
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
    var b = baseUrl();
    return COMPONENT_FILES.reduce(function (p, file) {
      return p.then(function () { return loadScriptOnce(b + file); });
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
    U().installStyle("PAGE-ACCESS-GUARD-TEST-v1-style", `
      .se-agt-page{max-width:1180px;margin:34px auto 56px;padding:0 18px;font-family:Arial,Helvetica,sans-serif;color:var(--se-aero-text,#1e2933)}
      .se-agt-shell{background:rgba(255,255,255,.94);border:1px solid rgba(18,54,90,.16);border-radius:26px;box-shadow:0 18px 50px rgba(12,38,64,.22);overflow:hidden}
      .se-agt-hero{padding:30px 34px 26px;background:linear-gradient(135deg,var(--se-aero-navy,#12365a),var(--se-aero-blue,#2f80c4));color:#fff}
      .se-agt-eyebrow{display:inline-flex;margin-bottom:12px;padding:6px 12px;border-radius:999px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.24);font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:#fff}
      .se-agt-hero h1{margin:0;color:#fff;font-size:clamp(30px,4vw,46px);line-height:1.05;font-weight:900;letter-spacing:-.035em}.se-agt-hero p{max-width:880px;margin:14px 0 0;color:rgba(255,255,255,.9);font-size:16px;line-height:1.6}
      .se-agt-main{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:22px;padding:26px;background:linear-gradient(180deg,rgba(234,245,255,.55),rgba(255,255,255,.86))}
      .se-agt-panel{padding:22px;border-radius:20px;background:rgba(255,255,255,.88);border:1px solid rgba(18,54,90,.16);box-shadow:0 8px 24px rgba(12,38,64,.08)}
      .se-agt-label{display:inline-flex;margin-bottom:10px;padding:5px 10px;border-radius:999px;background:var(--se-aero-sky,#eaf5ff);color:var(--se-aero-navy,#12365a);font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
      .se-agt-panel h2{margin:0 0 12px;color:var(--se-aero-navy-dark,#0b2744);font-size:25px;line-height:1.18;font-weight:900;letter-spacing:-.02em}.se-agt-panel p{margin:0 0 15px;font-size:14px;line-height:1.65;color:var(--se-aero-text,#1e2933)}
      .se-agt-card{padding:15px;border-radius:16px;background:#fff;border:1px solid rgba(18,54,90,.12);margin-top:12px}
      .se-agt-card h3{margin:0 0 10px;color:var(--se-aero-navy-dark,#0b2744);font-size:16px;line-height:1.25;font-weight:900}
      .se-agt-kv{display:grid;grid-template-columns:180px 1fr;gap:8px 12px;font-size:13px;line-height:1.45}.se-agt-kv strong{color:var(--se-aero-muted,#5d6b78);font-weight:900}.se-agt-kv span{color:var(--se-aero-text,#1e2933);font-weight:800;word-break:break-word}
      .se-agt-check{display:grid;gap:10px}.se-agt-check-row{padding:13px;border-radius:14px;background:#fff;border:1px solid rgba(18,54,90,.12)}
      .se-agt-check-row strong{display:block;color:var(--se-aero-navy-dark,#0b2744);font-size:13px;margin-bottom:4px}.se-agt-check-row span{display:block;color:var(--se-aero-muted,#5d6b78);font-size:13px;line-height:1.5}
      .se-agt-pill{display:inline-flex;align-items:center;padding:5px 9px;border-radius:999px;font-size:11px;font-weight:900;text-transform:uppercase;margin-top:8px}
      .se-agt-pill.allowed{background:rgba(235,249,239,.96);color:#14532d;border:1px solid rgba(25,128,62,.22)}
      .se-agt-pill.read_only,.se-agt-pill.loading{background:rgba(234,245,255,.92);color:var(--se-aero-navy,#12365a);border:1px solid rgba(18,54,90,.12)}
      .se-agt-pill.denied,.se-agt-pill.signed_out{background:rgba(255,241,241,.96);color:#7a1d16;border:1px solid rgba(180,35,24,.24)}
      .se-agt-demo-box{padding:14px;border-radius:14px;background:rgba(234,245,255,.55);border:1px solid rgba(18,54,90,.12);margin-top:12px}
      .se-agt-demo-box button{min-height:36px;padding:8px 12px;border-radius:999px;border:1px solid rgba(18,54,90,.22);font-weight:900;background:#fff;color:var(--se-aero-navy,#12365a)}
      @media(max-width:940px){.se-agt-main{grid-template-columns:1fr}}@media(max-width:620px){.se-agt-page{margin:24px auto 42px;padding:0 12px}.se-agt-hero{padding:26px 20px}.se-agt-main{padding:18px}.se-agt-panel{padding:18px}.se-agt-kv{grid-template-columns:1fr}}
    `);
  }

  function labelCustomer(row) {
    if (!row) return "";
    return row.syncetc_customers && row.syncetc_customers.display_name ? row.syncetc_customers.display_name : row.customer_key;
  }

  function labelRole(row) {
    if (!row) return "";
    return row.syncetc_role_definitions && row.syncetc_role_definitions.role_label ? row.syncetc_role_definitions.role_label : row.role_key;
  }

  function runChecks() {
    var G = window.SyncEtc.AccessGuard;
    if (!G) return [];
    return [
      { title:"Gallery view", config:{ moduleKey:"gallery", action:"view", fallback:"deny" } },
      { title:"Gallery admin/manage", config:{ moduleKey:"gallery_admin", action:"manage", fallback:"deny" } },
      { title:"Gallery submit/member", config:{ moduleKey:"gallery_submit", action:"view", minRoleKey:"customer_member", fallback:"read_only" } },
      { title:"Settings manage", config:{ moduleKey:"settings", action:"manage", fallback:"deny" } },
      { title:"Fake restricted finance manage", config:{ moduleKey:"finance", action:"manage", minRoleKey:"customer_owner", fallback:"read_only" } }
    ].map(function (item) {
      item.result = G.evaluate(item.config);
      return item;
    });
  }

  function render() {
    installStyles();
    var s = state.snapshot || {};
    var active = s.active_customer || {};
    var checks = runChecks();
    var html = '<div class="se-agt-page"><div class="se-agt-shell"><header class="se-agt-hero"><div class="se-agt-eyebrow">Access Guard Test</div><h1>Secure Page Access Rules</h1><p>This verifies the reusable fail-secure access guard. If permissions are unknown or insufficient, pages default to denied or read-only rather than editable.</p></header><main class="se-agt-main"><section class="se-agt-panel"><span class="se-agt-label">Current Context</span><h2>Resolved user/customer</h2><div class="se-agt-card"><h3>Auth Context</h3><div class="se-agt-kv"><strong>Signed In</strong><span>' + esc(s.signed_in ? "yes" : "no") + '</span><strong>Email</strong><span>' + esc(s.user && s.user.email || "") + '</span><strong>Customer</strong><span>' + esc(labelCustomer(active)) + '</span><strong>Role</strong><span>' + esc(labelRole(active)) + '</span><strong>Role Rank</strong><span>' + esc(s.active_customer_role_rank || "") + '</span><strong>Super Admin</strong><span>' + esc(s.is_syncetc_super_admin ? "yes" : "no") + '</span></div></div><div class="se-agt-demo-box" id="se-agt-demo-box"><strong>Editable test box</strong><p>This button is disabled if the guard puts the section in read-only/denied mode.</p><button type="button">Example edit action</button></div></section><section class="se-agt-panel"><span class="se-agt-label">Guard Results</span><h2>Permission checks</h2><div class="se-agt-check">' + checks.map(function (c) { return '<div class="se-agt-check-row"><strong>' + esc(c.title) + '</strong><span>' + esc(c.result.reason) + '</span><span class="se-agt-pill ' + esc(c.result.status) + '">' + esc(c.result.status) + '</span></div>'; }).join("") + '</div></section></main></div></div>';

    if (state.shell) state.shell.render(html);
    else {
      var mount = document.getElementById("syncetc-webflow-mount") || document.body;
      mount.innerHTML = html;
    }

    if (window.SyncEtc.AccessGuard) {
      window.SyncEtc.AccessGuard.applyToElement("#se-agt-demo-box", {
        moduleKey:"gallery_admin",
        action:"manage",
        fallback:"read_only"
      });
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
          pageKey: "access-guard-test",
          audience: "public",
          version: VERSION,
          showBanner: false
        });
      }

      window.SyncEtc.AuthContext.subscribe(function (snapshot) {
        state.snapshot = snapshot;
        render();
      });

      return window.SyncEtc.AuthContext.init();
    }).catch(function (err) {
      state.snapshot = { signed_in:false, last_error:err.message || String(err) };
      render();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
/* PAGE-ACCESS-GUARD-TEST-v1.js - END */
