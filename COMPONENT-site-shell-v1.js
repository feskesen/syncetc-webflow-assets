/* COMPONENT-site-shell-v1.js - BEGIN */
(function () {
  "use strict";

  window.SyncEtc = window.SyncEtc || {};
  window.SyncEtc.Components = window.SyncEtc.Components || {};

  const DEFAULT_STATE = {
    customerName: "150th Aero Flying Club",
    pageKey: "home",
    audience: "public",
    controlsSide: "left",
    showControls: true,
    showBanner: true,
    local: {},
    version: "COMPONENT-site-shell-v1"
  };

  function create(mountId, options) {
    const state = Object.assign({}, DEFAULT_STATE, options || {});
    state.local = Object.assign({}, state.local || {});

    const mount = document.getElementById(mountId || "syncetc-webflow-mount");
    if (!mount) throw new Error("SyncEtc mount not found.");

    function customer() {
      return window.SyncEtc.Components.CustomerStyle.getCustomerConfig(state.customerName, state.local || {});
    }

    function render(pageHtml) {
      const C = window.SyncEtc.Components;
      const U = C.Utils;
      C.BaseStyles.install();

      const c = customer();
      const shellId = "syncetc-component-shell";
      mount.innerHTML = `<div id="${shellId}" class="syncetc-shell">
        <div class="se-component-version">${U.esc(state.version)} loaded</div>
        <div class="se-topline"><span>SyncEtc component renderer</span><span>${U.esc(c.customerName || c.shortName)} · ${U.esc(C.Utils.pageLabel(state.pageKey, C.MasterControls.pages))}</span></div>
        ${state.showControls ? C.MasterControls.render({ customer:c, pageKey:state.pageKey, audience:state.audience, controlsSide:state.controlsSide, showBanner:state.showBanner, local:state.local, version:state.version }) : ""}
        ${C.MasterHeader.render({ customer:c, pageKey:state.pageKey, audience:state.audience })}
        ${state.showBanner && state.pageKey === "home" ? C.ScrollBanner.render({ customer:c, showBanner:state.showBanner }) : ""}
        <main data-se-page-body>${pageHtml || ""}</main>
        ${C.MasterFooter.render({ customer:c, pageKey:state.pageKey, audience:state.audience })}
      </div>`;

      const shell = document.getElementById(shellId);
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
      if (d.field === "customer") {
        state.customerName = d.value;
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
      customer: customer
    };
  }

  window.SyncEtc.Components.SiteShell = { create: create };
})();
/* COMPONENT-site-shell-v1.js - END */
