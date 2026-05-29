/* COMPONENT-site-shell-v3.js - BEGIN */
(function () {
  "use strict";

  window.SyncEtc = window.SyncEtc || {};
  window.SyncEtc.Components = window.SyncEtc.Components || {};

  var VERSION = "COMPONENT-site-shell-v3";

  const DEFAULT_STATE = {
    customerName: "Demo Flying Club",
    customerKey: "demo_flying_club",
    pageKey: "home",
    audience: "public",
    viewAs: "public",
    showControls: true,
    showBanner: true,
    siteEditorOpen: false,
    local: {},
    version: VERSION
  };

  function clean(v){ return v == null ? "" : String(v).trim(); }

  function snapshot(){
    return window.SyncEtc.AuthContext && window.SyncEtc.AuthContext.getSnapshot ? window.SyncEtc.AuthContext.getSnapshot() : {};
  }

  function activeCustomerFromAuth(){
    const s = snapshot();
    const c = s.active_customer || {};
    const row = c.syncetc_customers || {};
    const key = clean(s.active_customer_key || c.customer_key || row.customer_key);
    const name = clean(row.display_name || row.name || c.display_name || c.name || key.replace(/_/g, " "));
    return { key:key, name:name };
  }

  function customerNameFromKey(key){
    if(key === "150th_aero") return "150th Aero Flying Club";
    if(key === "demo_flying_club") return "Demo Flying Club";
    return clean(key).replace(/_/g, " ").replace(/\b\w/g, function(m){ return m.toUpperCase(); }) || "Demo Flying Club";
  }

  function create(mountId, options) {
    const state = Object.assign({}, DEFAULT_STATE, options || {});
    state.local = Object.assign({}, state.local || {});

    const qs = new URLSearchParams(window.location.search);
    const queryCustomer = clean(qs.get("customer_key") || qs.get("customer"));
    const authCustomer = activeCustomerFromAuth();

    if(queryCustomer) {
      state.customerKey = queryCustomer;
      state.customerName = customerNameFromKey(queryCustomer);
    } else if(authCustomer.key) {
      state.customerKey = authCustomer.key;
      state.customerName = authCustomer.name || customerNameFromKey(authCustomer.key);
    } else {
      state.customerKey = state.customerKey || "demo_flying_club";
      state.customerName = state.customerName || customerNameFromKey(state.customerKey);
    }

    const mount = document.getElementById(mountId || "syncetc-webflow-mount");
    if (!mount) throw new Error("SyncEtc mount not found.");

    function effectiveAudience(){
      if(state.viewAs === "platform") return "admin";
      if(state.viewAs === "admin") return "admin";
      if(state.viewAs === "member") return "member";
      return state.audience || "public";
    }

    function customer() {
      return window.SyncEtc.Components.CustomerStyle.getCustomerConfig(state.customerName, state.local || {});
    }

    function render(pageHtml) {
      const C = window.SyncEtc.Components;
      const U = C.Utils;
      C.BaseStyles.install();

      const c = customer();
      const shellId = "syncetc-component-shell";
      const audience = effectiveAudience();

      mount.innerHTML = `<div id="${shellId}" class="syncetc-shell" data-se-customer-key="${U.esc(state.customerKey)}" data-se-view-as="${U.esc(state.viewAs)}">
        ${state.showControls && C.MasterControls ? C.MasterControls.render({ customer:c, customerKey:state.customerKey, pageKey:state.pageKey, audience:audience, viewAs:state.viewAs, siteEditorOpen:state.siteEditorOpen, showBanner:state.showBanner, local:state.local, version:state.version }) : ""}
        ${C.MasterHeader.render({ customer:c, pageKey:state.pageKey, audience:audience, viewAs:state.viewAs })}
        ${state.showBanner && state.pageKey === "home" ? C.ScrollBanner.render({ customer:c, showBanner:state.showBanner }) : ""}
        <main data-se-page-body>${pageHtml || ""}</main>
        ${C.MasterFooter.render({ customer:c, pageKey:state.pageKey, audience:audience, viewAs:state.viewAs })}
      </div>`;

      const shell = document.getElementById(shellId);
      C.CustomerStyle.applyCustomerCssVars(shell, c);
      if(C.MasterControls) C.MasterControls.bind(state, shell);
    }

    function updateState(partial) {
      Object.assign(state, partial || {});
      if(partial && partial.customerKey){
        state.customerName = customerNameFromKey(partial.customerKey);
      }
    }

    function getState() {
      return JSON.parse(JSON.stringify(state));
    }

    document.addEventListener("syncetc:control-change", function (e) {
      const d = e.detail || {};
      if (!d.field) return;

      if (d.field === "customerKey") {
        state.customerKey = d.value;
        state.customerName = customerNameFromKey(d.value);
        state.local = Object.assign({}, state.local || {});
      } else if(d.field === "viewAs") {
        state.viewAs = d.value || "public";
        state.audience = effectiveAudience();
      } else {
        state[d.field] = d.value;
      }

      window.SyncEtc.Components.Utils.dispatch("syncetc:shell-structural-change", { state: getState(), field:d.field, value:d.value });
    });

    document.addEventListener("syncetc:local-input", function (e) {
      const d = e.detail || {};
      if (!d.field) return;
      state.local[d.field] = d.value;
      window.SyncEtc.Components.Utils.dispatch("syncetc:shell-local-change", { state: getState(), field: d.field, value: d.value });
    });

    document.addEventListener("syncetc:reset-local", function () {
      state.local = {};
      window.SyncEtc.Components.Utils.dispatch("syncetc:shell-structural-change", { state: getState() });
    });

    document.addEventListener("syncetc:export-settings", function () {
      const blob = new Blob([JSON.stringify(getState(), null, 2)], {type:"application/json;charset=utf-8"});
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "syncetc-site-editor-settings-" + Date.now() + ".json";
      document.body.appendChild(a);
      a.click();
      setTimeout(function(){ URL.revokeObjectURL(url); a.remove(); }, 500);
    });

    return {
      render: render,
      updateState: updateState,
      getState: getState,
      customer: customer
    };
  }

  window.SyncEtc.Components.SiteShell = { create: create, version: VERSION };
})();
/* COMPONENT-site-shell-v3.js - END */
