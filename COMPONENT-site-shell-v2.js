/* COMPONENT-site-shell-v2.js - BEGIN */
(function () {
  "use strict";

  window.SyncEtc = window.SyncEtc || {};
  window.SyncEtc.Components = window.SyncEtc.Components || {};

  const VERSION = "COMPONENT-site-shell-v2";

  const DEFAULT_STATE = {
    customerKey: "",
    customerName: "",
    pageKey: "home",
    audience: "public",
    showControls: true,
    showBanner: true,
    siteEditorOpen: false,
    siteEditorMode: "preview",
    stylePreset: "current",
    layoutFamily: "current",
    local: {},
    version: VERSION
  };

  function clean(v) {
    return v == null ? "" : String(v).trim();
  }

  function snapshot() {
    return window.SyncEtc && window.SyncEtc.AuthContext && window.SyncEtc.AuthContext.getSnapshot ? window.SyncEtc.AuthContext.getSnapshot() : {};
  }

  function activeCustomerFromAuth() {
    const s = snapshot();
    const c = s.active_customer || {};
    const related = c.syncetc_customers || {};
    const key = clean(s.active_customer_key || c.customer_key || related.customer_key);
    const name = clean(related.display_name || related.name || c.display_name || c.name || c.customer_name || c.customer_key || key);
    return { customerKey:key, customerName:name };
  }

  function keyToName(key) {
    return clean(key).replace(/_/g, " ").replace(/\b\w/g, function(m){ return m.toUpperCase(); }) || "Customer";
  }

  function create(mountId, options) {
    const state = Object.assign({}, DEFAULT_STATE, options || {});
    state.local = Object.assign({}, state.local || {});

    const mount = document.getElementById(mountId || "syncetc-webflow-mount");
    if (!mount) throw new Error("SyncEtc mount not found.");

    function currentCustomerIdentity() {
      const authCustomer = activeCustomerFromAuth();
      const key = clean(state.customerKey || authCustomer.customerKey || "demo_flying_club");
      const name = clean(state.customerName || authCustomer.customerName || keyToName(key));
      return { key:key, name:name };
    }

    function customer() {
      const identity = currentCustomerIdentity();
      const lookup = identity.key || identity.name;
      return window.SyncEtc.Components.CustomerStyle.getCustomerConfig(lookup, Object.assign({}, state.local || {}, {
        customerKey: identity.key,
        customerName: identity.name
      }));
    }

    function render(pageHtml) {
      const C = window.SyncEtc.Components;
      const U = C.Utils;
      C.BaseStyles.install();

      const c = customer();
      const shellId = "syncetc-component-shell";
      const pageLabel = C.Utils.pageLabel(state.pageKey, C.MasterControls.pages);

      mount.innerHTML = `<div id="${shellId}" class="syncetc-shell" data-se-shell-version="${U.esc(VERSION)}">
        <div class="se-component-version">${U.esc(state.version)} loaded</div>
        <div class="se-topline"><span>SyncEtc component render</span><span>${U.esc(c.customerName || c.shortName)} · ${U.esc(pageLabel)}</span></div>
        ${state.showControls ? C.MasterControls.render({ customer:c, pageKey:state.pageKey, audience:state.audience, showBanner:state.showBanner, local:state.local, version:state.version, siteEditorOpen:state.siteEditorOpen, siteEditorMode:state.siteEditorMode, stylePreset:state.stylePreset, layoutFamily:state.layoutFamily }) : ""}
        ${C.MasterHeader.render({ customer:c, pageKey:state.pageKey, audience:state.audience })}
        ${state.showBanner && state.pageKey === "home" ? C.ScrollBanner.render({ customer:c, showBanner:state.showBanner }) : ""}
        <main data-se-page-body>${pageHtml || ""}</main>
        ${C.MasterFooter.render({ customer:c, pageKey:state.pageKey, audience:state.audience })}
      </div>`;

      const shell = document.getElementById(shellId);
      C.CustomerStyle.applyCustomerCssVars(document.documentElement, c);
      C.CustomerStyle.applyCustomerCssVars(shell, c);
      C.MasterControls.bind(state, shell);
    }

    function updateState(partial) {
      Object.assign(state, partial || {});
    }

    function getState() {
      return JSON.parse(JSON.stringify(state));
    }

    document.addEventListener("syncetc:control-change", function (e) {
      const d = e.detail || {};
      if (!d.field) return;

      if (d.field === "customer" || d.field === "customerName") {
        state.customerName = d.value;
        state.local = {};
      } else if (d.field === "customerKey") {
        state.customerKey = d.value;
        state.local = {};
      } else {
        state[d.field] = d.value;
      }

      window.SyncEtc.Components.Utils.dispatch("syncetc:shell-structural-change", { state: getState() });
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
      a.download = "syncetc-component-settings-" + Date.now() + ".json";
      document.body.appendChild(a);
      a.click();
      setTimeout(function(){ URL.revokeObjectURL(url); a.remove(); }, 500);
    });

    return {
      render: render,
      updateState: updateState,
      getState: getState,
      customer: customer,
      version: VERSION
    };
  }

  window.SyncEtc.Components.SiteShell = { create: create, version: VERSION };
})();
/* COMPONENT-site-shell-v2.js - END */
