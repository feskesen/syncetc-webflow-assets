/* PAGE-CUSTOMER-SWITCHER-TEST-v1.js - BEGIN */
(function () {
  "use strict";

  var VERSION="PAGE-CUSTOMER-SWITCHER-TEST-v1";
  var COMPONENT_FILES = ["COMPONENT-shared-utils-v1.js","COMPONENT-customer-style-v1.js","COMPONENT-base-styles-v1.js","COMPONENT-auth-context-v1.js","COMPONENT-auth-modal-v1.js","COMPONENT-security-context-v1.js","COMPONENT-auth-soft-bridge-v1.js","COMPONENT-master-controls-v1.js","COMPONENT-customer-settings-v1.js","COMPONENT-master-header-v1.js","COMPONENT-scroll-banner-v1.js","COMPONENT-master-footer-v1.js","COMPONENT-site-shell-v1.js","COMPONENT-customer-switcher-v1.js","COMPONENT-access-guard-v1.js"];

  var CURRENT_SCRIPT_SRC = document.currentScript && document.currentScript.src ? document.currentScript.src : "";

  var state = {
    shell: null,
    snapshot: null,
    message: "",
    messageType: "info"
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
    var base = componentBaseUrl();
    return COMPONENT_FILES.reduce(function (p, file) {
      return p.then(function () { return loadScriptOnce(base + file + "?v=shared-security-policy-uniformity-1"); });
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
  function byId(id) { return document.getElementById(id); }

  function installStyles() {
    U().installStyle("PAGE-CUSTOMER-SWITCHER-TEST-v1-style", `
      .se-cst-page{max-width:1180px;margin:34px auto 56px;padding:0 18px;font-family:Arial,Helvetica,sans-serif;color:var(--se-aero-text,#1e2933)}
      .se-cst-shell{background:rgba(255,255,255,.94);border:1px solid rgba(18,54,90,.16);border-radius:26px;box-shadow:0 18px 50px rgba(12,38,64,.22);overflow:hidden}
      .se-cst-hero{padding:30px 34px 26px;background:linear-gradient(135deg,var(--se-aero-navy,#12365a),var(--se-aero-blue,#2f80c4));color:#fff}
      .se-cst-eyebrow{display:inline-flex;margin-bottom:12px;padding:6px 12px;border-radius:999px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.24);font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:#fff}
      .se-cst-hero h1{margin:0;color:#fff;font-size:clamp(30px,4vw,46px);line-height:1.05;font-weight:900;letter-spacing:-.035em}.se-cst-hero p{max-width:880px;margin:14px 0 0;color:rgba(255,255,255,.9);font-size:16px;line-height:1.6}
      .se-cst-main{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:22px;padding:26px;background:linear-gradient(180deg,rgba(234,245,255,.55),rgba(255,255,255,.86))}
      .se-cst-panel{padding:22px;border-radius:20px;background:rgba(255,255,255,.88);border:1px solid rgba(18,54,90,.16);box-shadow:0 8px 24px rgba(12,38,64,.08)}
      .se-cst-label{display:inline-flex;margin-bottom:10px;padding:5px 10px;border-radius:999px;background:var(--se-aero-sky,#eaf5ff);color:var(--se-aero-navy,#12365a);font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
      .se-cst-panel h2{margin:0 0 12px;color:var(--se-aero-navy-dark,#0b2744);font-size:25px;line-height:1.18;font-weight:900;letter-spacing:-.02em}.se-cst-panel p{margin:0 0 15px;font-size:14px;line-height:1.65;color:var(--se-aero-text,#1e2933)}
      .se-cst-card{padding:15px;border-radius:16px;background:#fff;border:1px solid rgba(18,54,90,.12);margin-top:12px}.se-cst-card h3{margin:0 0 10px;color:var(--se-aero-navy-dark,#0b2744);font-size:16px;line-height:1.25;font-weight:900}
      .se-cst-kv{display:grid;grid-template-columns:180px 1fr;gap:8px 12px;font-size:13px;line-height:1.45}.se-cst-kv strong{color:var(--se-aero-muted,#5d6b78);font-weight:900}.se-cst-kv span{color:var(--se-aero-text,#1e2933);font-weight:800;word-break:break-word}
      .se-cst-status{display:none;margin-top:14px;padding:14px 16px;border-radius:16px;border:1px solid rgba(18,54,90,.12);font-size:13px;line-height:1.55;font-weight:800}.se-cst-status.show{display:block}.se-cst-status.success{background:rgba(235,249,239,.96);border-color:rgba(25,128,62,.22);color:#14532d}.se-cst-status.error{background:rgba(255,241,241,.96);border-color:rgba(180,35,24,.24);color:#7a1d16}.se-cst-status.info{background:rgba(234,245,255,.92);color:var(--se-aero-navy-dark,#0b2744)}
      .se-cst-json{margin-top:12px;max-height:300px;overflow:auto;padding:14px;border-radius:14px;background:#07182a;color:#e7f2ff;font-size:12px;line-height:1.5;white-space:pre-wrap;word-break:break-word}
      @media(max-width:940px){.se-cst-main{grid-template-columns:1fr}}@media(max-width:620px){.se-cst-page{margin:24px auto 42px;padding:0 12px}.se-cst-hero{padding:26px 20px}.se-cst-main{padding:18px}.se-cst-panel{padding:18px}.se-cst-kv{grid-template-columns:1fr}}
    `);
  }

  function setMessage(type, text) {
    state.messageType = type || "info";
    state.message = text || "";
    render();
  }

  function labelCustomer(row) {
    if (!row) return "";
    return row.syncetc_customers && row.syncetc_customers.display_name ? row.syncetc_customers.display_name : row.customer_key;
  }

  function labelRole(row) {
    if (!row) return "";
    return row.syncetc_role_definitions && row.syncetc_role_definitions.role_label ? row.syncetc_role_definitions.role_label : row.role_key;
  }

  function render() {
    installStyles();
    var s = state.snapshot || {};
    var active = s.active_customer || {};
    var statusClass = state.message ? "se-cst-status show " + state.messageType : "se-cst-status";

    var html = '<div class="se-cst-page"><div class="se-cst-shell"><header class="se-cst-hero"><div class="se-cst-eyebrow">Customer Context Test</div><h1>Customer Switcher Component</h1><p>This verifies that reusable pages can switch or preserve active customer context without hard-coded customer-specific files.</p></header><main class="se-cst-main"><section class="se-cst-panel"><span class="se-cst-label">Switcher</span><h2>Choose active customer</h2><p>For now Frank has one customer membership, so this will show Demo Flying Club only. The same control will support multiple customer memberships later.</p><div id="se-cst-switcher"></div><div class="' + esc(statusClass) + '">' + esc(state.message) + '</div></section><section class="se-cst-panel"><span class="se-cst-label">Resolved Context</span><h2>Active Customer Snapshot</h2><div class="se-cst-card"><h3>Current Customer</h3><div class="se-cst-kv"><strong>Signed In</strong><span>' + esc(s.signed_in ? "yes" : "no") + '</span><strong>User</strong><span>' + esc(s.user && s.user.email || "") + '</span><strong>Customer</strong><span>' + esc(labelCustomer(active)) + '</span><strong>Customer Key</strong><span>' + esc(s.active_customer_key || "") + '</span><strong>Role</strong><span>' + esc(labelRole(active)) + '</span><strong>Role Rank</strong><span>' + esc(s.active_customer_role_rank || "") + '</span></div></div><div class="se-cst-card"><h3>Access Checks</h3><div class="se-cst-kv"><strong>Gallery View</strong><span>' + esc(window.SyncEtc && window.SyncEtc.AuthContext && window.SyncEtc.AuthContext.hasModuleAccess("gallery", "view") ? "yes" : "no") + '</span><strong>Gallery Admin Manage</strong><span>' + esc(window.SyncEtc && window.SyncEtc.AuthContext && window.SyncEtc.AuthContext.hasModuleAccess("gallery_admin", "manage") ? "yes" : "no") + '</span><strong>Customer Admin+</strong><span>' + esc(window.SyncEtc && window.SyncEtc.AuthContext && window.SyncEtc.AuthContext.hasCustomerRoleAtLeast("customer_admin") ? "yes" : "no") + '</span></div></div><div class="se-cst-card"><h3>Raw Context</h3><pre class="se-cst-json">' + esc(JSON.stringify(s, null, 2)) + '</pre></div></section></main></div></div>';

    if (state.shell) state.shell.render(html);
    else {
      var mount = document.getElementById("syncetc-webflow-mount") || document.body;
      mount.innerHTML = html;
    }

    var sw = byId("se-cst-switcher");
    if (sw && window.SyncEtc && window.SyncEtc.CustomerSwitcher) {
      window.SyncEtc.CustomerSwitcher.mount(sw, {
        instanceId: "test",
        label: "Active customer/workspace",
        onChange: function (snapshot) {
          state.snapshot = snapshot;
          setMessage("success", "Customer context updated.");
        }
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

      if (window.SyncEtc && window.SyncEtc.Components && window.SyncEtc.Components.SiteShell) {
        state.shell = window.SyncEtc.Components.SiteShell.create(mountId, {
          pageKey: "customer-switcher-test",
          audience: "syncetc",
          version: VERSION,
          showBanner: false
        });
      }

      window.SyncEtc.AuthContext.subscribe(function (snapshot) {
        state.snapshot = snapshot;
        render();
      });

      return window.SyncEtc.AuthContext.init();
    }).then(function () {
      setMessage("success", "Customer switcher initialized.");
    }).catch(function (err) {
      setMessage("error", err.message || String(err));
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
/* PAGE-CUSTOMER-SWITCHER-TEST-v1.js - END */
