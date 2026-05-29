/* COMPONENT-master-controls-v1.js - BEGIN */
(function () {
  "use strict";

  window.SyncEtc = window.SyncEtc || {};
  window.SyncEtc.Components = window.SyncEtc.Components || {};

  const PAGES = [
    { key:"home", label:"Home" },
    { key:"info", label:"Info" },
    { key:"aircraft", label:"Aircraft" },
    { key:"events", label:"Calendar" },
    { key:"documents", label:"Documents" },
    { key:"gallery", label:"Gallery" },
    { key:"roster", label:"Roster" },
    { key:"member", label:"Member Dashboard" },
    { key:"admin", label:"Admin Dashboard" }
  ];

  function installStyles() {
    const U = window.SyncEtc.Components.Utils;
    U.installStyle("COMPONENT-master-controls-v1-style", `
      .se-workbench { max-width:1180px; margin:8px auto 16px; padding:0 18px; }
      .se-workbench-shell { background:rgba(255,255,255,.96); border:1px solid var(--se-aero-border); border-radius:22px; box-shadow:var(--se-aero-shadow); overflow:hidden; }
      .se-workbench-head { display:flex; justify-content:space-between; gap:16px; align-items:flex-start; padding:16px 18px; background:linear-gradient(135deg,var(--se-aero-navy),var(--se-aero-blue)); color:#fff; }
      .se-workbench-head h2 { margin:0; font-size:20px; line-height:1.1; color:#fff; }
      .se-workbench-head p { margin:5px 0 0; color:rgba(255,255,255,.88); font-size:13px; line-height:1.35; }
      .se-workbench-badges { display:flex; flex-wrap:wrap; gap:6px; justify-content:flex-end; }
      .se-workbench-badges span { background:rgba(255,255,255,.90); color:var(--se-aero-navy); border-radius:999px; padding:6px 9px; font-size:11px; font-weight:900; white-space:nowrap; }
      .se-workbench-grid { display:grid; grid-template-columns:minmax(300px,.45fr) minmax(0,.55fr); gap:0; }
      .se-workbench-grid.right { grid-template-columns:minmax(0,.55fr) minmax(300px,.45fr); }
      .se-controls { padding:16px; border-right:1px solid var(--se-aero-border); background:#f8fbff; }
      .se-workbench-grid.right .se-controls { border-right:none; border-left:1px solid var(--se-aero-border); order:2; }
      .se-mini-preview { padding:16px; background:#fff; }
      .se-controls h3, .se-mini-preview h3 { margin:0 0 8px; color:var(--se-aero-navy); font-size:15px; }
      .se-control-row { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px; }
      .se-control { display:block; }
      .se-control label { display:block; margin-bottom:5px; color:var(--se-aero-navy); font-size:11px; font-weight:900; letter-spacing:.02em; text-transform:uppercase; }
      .se-control input, .se-control select, .se-control textarea { width:100%; border:1px solid rgba(18,54,90,.20); border-radius:11px; padding:9px 10px; font:inherit; font-size:13px; background:#fff; color:var(--se-aero-text); }
      .se-control textarea { min-height:74px; resize:vertical; }
      .se-control small { display:block; margin-top:4px; color:#657789; font-size:11px; line-height:1.25; }
      .se-action-row { display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; }
      .se-action-row button { border:1px solid rgba(18,54,90,.20); border-radius:999px; padding:9px 12px; background:var(--se-aero-navy); color:#fff; font-weight:900; cursor:pointer; }
      .se-action-row button.secondary { background:#fff; color:var(--se-aero-navy); }
      .se-preview-card { border:1px solid var(--se-aero-border); border-radius:18px; overflow:hidden; background:var(--se-aero-card); box-shadow:0 10px 28px rgba(12,38,64,.12); }
      .se-preview-hero { padding:20px; color:#fff; background:linear-gradient(135deg,var(--se-aero-navy),var(--se-aero-blue)); }
      .se-preview-hero h4 { margin:5px 0 8px; font-size:25px; line-height:1.05; letter-spacing:-.035em; white-space:pre-line; color:#fff; }
      .se-preview-hero p { margin:0; line-height:1.5; color:rgba(255,255,255,.92); }
      .se-preview-body { padding:14px; }
      .se-preview-pills { display:flex; gap:8px; flex-wrap:wrap; }
      .se-preview-pills span { border:1px solid var(--se-aero-border); border-radius:999px; padding:7px 9px; background:#fff; color:var(--se-aero-navy); font-size:12px; font-weight:900; }
      @media (max-width:980px){ .se-workbench-grid,.se-workbench-grid.right{grid-template-columns:1fr}.se-workbench-grid.right .se-controls{order:0;border-left:none}.se-controls{border-right:none;border-bottom:1px solid var(--se-aero-border)} }
      @media (max-width:720px){ .se-workbench{padding-left:12px;padding-right:12px}.se-control-row{grid-template-columns:1fr} }
    `);
  }

  function render(ctx) {
    installStyles();
    const U = window.SyncEtc.Components.Utils;
    const customer = U.normalizeCustomerConfig(ctx.customer || {});
    const pageKey = ctx.pageKey || "home";
    const controlsSide = ctx.controlsSide || "left";
    const gridClass = controlsSide === "right" ? "se-workbench-grid right" : "se-workbench-grid";
    const pageLabel = U.pageLabel(pageKey, PAGES);
    const heroHeadline = ctx.local && ctx.local.heroHeadline ? ctx.local.heroHeadline : (customer.heroHeadline || "Welcome to\n" + customer.fullName);
    const announcement = ctx.local && ctx.local.announcement ? ctx.local.announcement : customer.announcement;

    return `<section class="se-workbench" data-se-component="master-controls">
      <div class="se-workbench-shell">
        <div class="se-workbench-head">
          <div><h2>150th Aero rendered-site controls</h2><p>The left/right control area is intentionally utilitarian. The preview and rendered page below show what the customer-facing site will look like.</p></div>
          <div class="se-workbench-badges"><span>${U.esc(ctx.version || "component renderer")}</span><span>${U.esc(customer.preset)}</span><span>Supabase asset variables</span></div>
        </div>
        <div class="${gridClass}">
          <div class="se-controls">
            <h3>Customer display controls</h3>
            <div class="se-control-row">
              <label class="se-control"><label>Customer</label><select data-se-field="customer"><option ${customer.customerName === "150th Aero Flying Club" ? "selected" : ""}>150th Aero Flying Club</option></select><small>Switches customer-specific asset variables and copy.</small></label>
              <label class="se-control"><label>Page</label><select data-se-field="pageKey">${PAGES.map(function(p){ return '<option value="'+U.esc(p.key)+'" '+(pageKey===p.key?'selected':'')+'>'+U.esc(p.label)+'</option>'; }).join("")}</select><small>Changes the rendered page body.</small></label>
            </div>
            <div class="se-control-row">
              <label class="se-control"><label>Audience</label><select data-se-field="audience"><option value="public" ${ctx.audience==="public"?"selected":""}>Public</option><option value="member" ${ctx.audience==="member"?"selected":""}>Member</option><option value="admin" ${ctx.audience==="admin"?"selected":""}>Admin</option></select><small>Changes visible nav rows.</small></label>
              <label class="se-control"><label>Controls side</label><select data-se-field="controlsSide"><option value="left" ${controlsSide==="left"?"selected":""}>Left</option><option value="right" ${controlsSide==="right"?"selected":""}>Right</option></select><small>Proof that the interface layout can change.</small></label>
            </div>
            <div class="se-control-row">
              <label class="se-control"><label>Hero headline</label><textarea data-se-local="heroHeadline">${U.esc(heroHeadline)}</textarea><small>Updates local state. Page module may decide whether to consume it live.</small></label>
              <label class="se-control"><label>Customer-editable announcement text</label><textarea data-se-local="announcement">${U.esc(announcement)}</textarea><small>Feeds the banner text.</small></label>
            </div>
            <div class="se-action-row"><button type="button" data-se-export>Export current settings JSON</button><button type="button" class="secondary" data-se-reset>Reset local changes</button></div>
          </div>
          <div class="se-mini-preview"><h3>Immediate customer-view preview</h3><div class="se-preview-card"><div class="se-preview-hero"><div style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;font-weight:900;color:rgba(255,255,255,.80)">${U.esc(customer.founded || customer.division)}</div><h4>${U.esc(heroHeadline)}</h4><p>${U.esc(customer.heroSubhead || "A member-operated flying club dedicated to keeping general aviation safe, affordable, and accessible.")}</p></div><div class="se-preview-body"><div class="se-preview-pills"><span>${U.esc(customer.preset)}</span><span>${U.esc(pageLabel)}</span><span>${U.esc(ctx.audience || "public")}</span><span>${ctx.showBanner === false ? "banner off" : "banner on"}</span></div></div></div></div>
        </div>
      </div>
    </section>`;
  }

  function bind(ctx, root) {
    const target = root || document;
    target.addEventListener("change", function (e) {
      const field = e.target && e.target.getAttribute && e.target.getAttribute("data-se-field");
      if (!field) return;

      let value = e.target.value;
      if (field === "showBanner") value = value === "true";
      window.SyncEtc.Components.Utils.dispatch("syncetc:control-change", { field: field, value: value });
    });

    target.addEventListener("input", function (e) {
      const local = e.target && e.target.getAttribute && e.target.getAttribute("data-se-local");
      if (!local) return;
      /* Critical: do not full-render the page on every keystroke. */
      window.SyncEtc.Components.Utils.dispatch("syncetc:local-input", { field: local, value: e.target.value });
    });

    target.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("[data-se-reset]")) {
        window.SyncEtc.Components.Utils.dispatch("syncetc:reset-local", {});
      }
      if (e.target.closest && e.target.closest("[data-se-export]")) {
        window.SyncEtc.Components.Utils.dispatch("syncetc:export-settings", {});
      }
    });
  }

  window.SyncEtc.Components.MasterControls = {
    render: render,
    bind: bind,
    installStyles: installStyles,
    pages: PAGES
  };
})();
/* COMPONENT-master-controls-v1.js - END */
