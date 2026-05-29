/* COMPONENT-master-controls-v3.js - BEGIN */
(function () {
  "use strict";

  window.SyncEtc = window.SyncEtc || {};
  window.SyncEtc.Components = window.SyncEtc.Components || {};

  var VERSION = "COMPONENT-master-controls-v3";

  var PAGES = [
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

  var PRESETS = [
    { key:"classic-aviation", label:"Classic Aviation" },
    { key:"modern-ops", label:"Modern Ops" },
    { key:"clean-club", label:"Clean Club" },
    { key:"bold-banner", label:"Bold Banner" }
  ];

  var DEFAULT_CUSTOMERS = [
    { key:"demo_flying_club", label:"Demo Flying Club" },
    { key:"150th_aero", label:"150th Aero Flying Club" }
  ];

  function U(){ return window.SyncEtc.Components.Utils; }
  function clean(v){ return v == null ? "" : String(v).trim(); }

  function installStyles() {
    U().installStyle("COMPONENT-master-controls-v3-style", `
      .se-workbench { max-width:1180px; margin:8px auto 16px; padding:0 18px; }
      .se-site-editor-shell { background:rgba(255,255,255,.96); border:1px solid var(--se-aero-border); border-radius:22px; box-shadow:var(--se-aero-shadow); overflow:hidden; }
      .se-site-editor-toggle-row { display:flex; justify-content:space-between; gap:12px; align-items:center; padding:10px 14px; background:linear-gradient(135deg,var(--se-aero-navy),var(--se-aero-blue)); color:#fff; }
      .se-site-editor-title { display:flex; gap:8px; align-items:center; flex-wrap:wrap; min-width:0; }
      .se-site-editor-title h2 { margin:0; color:#fff; font-size:16px; line-height:1.1; }
      .se-site-editor-sub { color:rgba(255,255,255,.84); font-size:12px; font-weight:800; }
      .se-site-editor-pill { display:inline-flex; align-items:center; min-height:24px; padding:4px 9px; border-radius:999px; background:rgba(255,255,255,.16); border:1px solid rgba(255,255,255,.24); color:#fff; font-size:10.5px; font-weight:900; letter-spacing:.05em; text-transform:uppercase; }
      .se-site-editor-toggle { border:1px solid rgba(255,255,255,.32); border-radius:999px; padding:8px 12px; background:#fff; color:var(--se-aero-navy); font-size:12px; font-weight:900; cursor:pointer; white-space:nowrap; }
      .se-site-editor-body { display:none; border-top:1px solid rgba(255,255,255,.24); background:#f8fbff; }
      .se-site-editor-shell.is-open .se-site-editor-body { display:block; }
      .se-site-editor-grid { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:0; }
      .se-site-editor-panel { padding:16px; border-right:1px solid var(--se-aero-border); }
      .se-site-editor-panel:last-child { border-right:0; background:#fff; }
      .se-site-editor-panel h3 { margin:0 0 8px; color:var(--se-aero-navy); font-size:15px; }
      .se-site-editor-help { margin:0 0 12px; color:#657789; font-size:12px; line-height:1.35; font-weight:700; }
      .se-control-row { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px; }
      .se-control { display:block; min-width:0; }
      .se-control span { display:block; margin-bottom:5px; color:var(--se-aero-navy); font-size:11px; font-weight:900; letter-spacing:.02em; text-transform:uppercase; }
      .se-control input, .se-control select, .se-control textarea { width:100%; border:1px solid rgba(18,54,90,.20); border-radius:11px; padding:9px 10px; font:inherit; font-size:13px; background:#fff; color:var(--se-aero-text); }
      .se-control textarea { min-height:70px; resize:vertical; }
      .se-control small { display:block; margin-top:4px; color:#657789; font-size:11px; line-height:1.25; }
      .se-viewas-row { display:flex; flex-wrap:wrap; gap:8px; margin:8px 0 14px; }
      .se-viewas-btn { border:1px solid rgba(18,54,90,.20); border-radius:999px; padding:8px 11px; background:#fff; color:var(--se-aero-navy); font-size:12px; font-weight:900; cursor:pointer; }
      .se-viewas-btn.active { background:var(--se-aero-navy); color:#fff; border-color:var(--se-aero-navy); box-shadow:0 7px 17px rgba(18,54,90,.18); }
      .se-editor-action-row { display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; }
      .se-editor-action-row button { border:1px solid rgba(18,54,90,.20); border-radius:999px; padding:9px 12px; background:var(--se-aero-navy); color:#fff; font-weight:900; cursor:pointer; }
      .se-editor-action-row button.secondary { background:#fff; color:var(--se-aero-navy); }
      .se-editor-note { padding:12px; border-radius:14px; border:1px solid var(--se-aero-border); background:rgba(234,245,255,.72); color:#304d73; font-size:12px; line-height:1.45; font-weight:800; }
      .se-editor-preview-card { border:1px solid var(--se-aero-border); border-radius:18px; overflow:hidden; background:var(--se-aero-card); box-shadow:0 10px 28px rgba(12,38,64,.10); }
      .se-editor-preview-hero { padding:18px; color:#fff; background:linear-gradient(135deg,var(--se-aero-navy),var(--se-aero-blue)); }
      .se-editor-preview-hero h4 { margin:5px 0 8px; font-size:22px; line-height:1.05; letter-spacing:-.025em; white-space:pre-line; color:#fff; }
      .se-editor-preview-hero p { margin:0; line-height:1.5; color:rgba(255,255,255,.92); }
      .se-editor-preview-body { padding:13px; background:#fff; }
      .se-editor-preview-pills { display:flex; gap:8px; flex-wrap:wrap; }
      .se-editor-preview-pills span { border:1px solid var(--se-aero-border); border-radius:999px; padding:7px 9px; background:#fff; color:var(--se-aero-navy); font-size:12px; font-weight:900; }
      .se-editor-placeholder { opacity:.68; }
      .se-editor-hidden { display:none!important; }
      @media (max-width:980px){ .se-site-editor-grid{grid-template-columns:1fr}.se-site-editor-panel{border-right:0;border-bottom:1px solid var(--se-aero-border)}.se-site-editor-panel:last-child{border-bottom:0}.se-control-row{grid-template-columns:1fr} }
      @media (max-width:720px){ .se-workbench{padding-left:12px;padding-right:12px}.se-site-editor-toggle-row{align-items:flex-start;flex-direction:column}.se-site-editor-toggle{width:100%} }
    `);
  }

  function snapshot(){
    return window.SyncEtc.AuthContext && window.SyncEtc.AuthContext.getSnapshot ? window.SyncEtc.AuthContext.getSnapshot() : {};
  }

  function isPlatformAdmin(ctx){
    const s = snapshot();
    if(s && s.is_syncetc_super_admin) return true;
    if(s && (s.platform_role === "super_admin" || s.platform_role === "admin")) return true;
    if(window.SYNCETC_FORCE_SITE_EDITOR === true) return true;
    if(ctx && ctx.forceSiteEditor === true) return true;
    return false;
  }

  function customerOptions(ctx){
    const s = snapshot();
    const fromAuth = [];
    if(s && Array.isArray(s.customer_memberships)){
      s.customer_memberships.forEach(function(m){
        const key = clean(m.customer_key || (m.syncetc_customers && m.syncetc_customers.customer_key));
        const label = clean(m.display_name || (m.syncetc_customers && (m.syncetc_customers.display_name || m.syncetc_customers.name)) || key);
        if(key) fromAuth.push({ key:key, label:label || key });
      });
    }
    if(s && Array.isArray(s.customers)){
      s.customers.forEach(function(c){
        const key = clean(c.customer_key || c.key);
        const label = clean(c.display_name || c.name || key);
        if(key) fromAuth.push({ key:key, label:label || key });
      });
    }
    const all = fromAuth.length ? fromAuth : DEFAULT_CUSTOMERS.slice();
    const current = clean(ctx.customerKey || "demo_flying_club");
    if(!all.some(function(c){ return c.key === current; })) all.unshift({ key:current, label:current.replace(/_/g," ") });
    const seen = {};
    return all.filter(function(c){ if(seen[c.key]) return false; seen[c.key]=true; return true; });
  }

  function render(ctx) {
    installStyles();
    if(!isPlatformAdmin(ctx)) return "";

    const customer = U().normalizeCustomerConfig(ctx.customer || {});
    const pageKey = ctx.pageKey || "home";
    const pageLabel = U().pageLabel(pageKey, PAGES);
    const viewAs = clean(ctx.viewAs || ctx.audience || "public");
    const open = ctx.siteEditorOpen === true;
    const heroHeadline = ctx.local && ctx.local.heroHeadline ? ctx.local.heroHeadline : (customer.heroHeadline || "Welcome to\n" + customer.fullName);
    const announcement = ctx.local && ctx.local.announcement ? ctx.local.announcement : customer.announcement;
    const customerKey = clean(ctx.customerKey || "demo_flying_club");
    const customers = customerOptions(ctx);
    const preset = clean((ctx.local && ctx.local.stylePreset) || customer.preset || "classic-aviation");

    function selected(v, current){ return clean(v) === clean(current) ? "selected" : ""; }
    function active(v){ return clean(v) === viewAs ? "active" : ""; }

    return `<section class="se-workbench" data-se-component="master-controls">
      <div class="se-site-editor-shell ${open ? "is-open" : ""}">
        <div class="se-site-editor-toggle-row">
          <div class="se-site-editor-title">
            <h2>SyncEtc Site Editor</h2>
            <span class="se-site-editor-pill">${U().esc(ctx.version || VERSION)}</span>
            <span class="se-site-editor-pill">${U().esc(customer.shortName || customer.customerName || customerKey)}</span>
            <span class="se-site-editor-sub">${U().esc(pageLabel)} · View as ${U().esc(viewAs)}</span>
          </div>
          <button type="button" class="se-site-editor-toggle" data-se-toggle-editor>${open ? "Close Site Editor" : "Open Site Editor"}</button>
        </div>
        <div class="se-site-editor-body">
          <div class="se-site-editor-grid">
            <div class="se-site-editor-panel">
              <h3>Platform Preview Controls</h3>
              <p class="se-site-editor-help">Visible to SyncEtc platform admins only. Used to test customer context, page context, and role/audience preview without editing each page module.</p>
              <div class="se-control-row">
                <label class="se-control"><span>Customer</span><select data-se-field="customerKey">${customers.map(function(c){ return '<option value="'+U().esc(c.key)+'" '+selected(c.key, customerKey)+'>'+U().esc(c.label)+'</option>'; }).join("")}</select><small>Switches the active customer preview for platform/admin testing.</small></label>
                <label class="se-control"><span>Page</span><select data-se-field="pageKey">${PAGES.map(function(p){ return '<option value="'+U().esc(p.key)+'" '+selected(p.key, pageKey)+'>'+U().esc(p.label)+'</option>'; }).join("")}</select><small>Changes the rendered page body when the page shell supports it.</small></label>
              </div>
              <div class="se-viewas-row" aria-label="View as controls">
                <button type="button" class="se-viewas-btn ${active("public")}" data-se-view-as="public">View as Public</button>
                <button type="button" class="se-viewas-btn ${active("member")}" data-se-view-as="member">View as Member</button>
                <button type="button" class="se-viewas-btn ${active("admin")}" data-se-view-as="admin">View as Customer Admin</button>
                <button type="button" class="se-viewas-btn ${active("platform")}" data-se-view-as="platform">View as SyncEtc Admin</button>
              </div>
              <div class="se-control-row">
                <label class="se-control"><span>Admin Style Preset</span><select data-se-local="stylePreset">${PRESETS.map(function(p){ return '<option value="'+U().esc(p.key)+'" '+selected(p.key, preset)+'>'+U().esc(p.label)+'</option>'; }).join("")}</select><small>Placeholder for future platform-only style preset injection.</small></label>
                <label class="se-control"><span>Customer Banner Text</span><textarea data-se-local="announcement">${U().esc(announcement || "")}</textarea><small>Customer-safe editable content. Currently local preview only.</small></label>
              </div>
              <div class="se-editor-action-row"><button type="button" data-se-export>Export current settings JSON</button><button type="button" class="secondary" data-se-reset>Reset local changes</button></div>
            </div>
            <div class="se-site-editor-panel">
              <h3>Customer Experience Preview</h3>
              <p class="se-site-editor-help">This preview confirms the shared customer variables that should flow into header, footer, page hero, and module styling.</p>
              <div class="se-editor-preview-card">
                <div class="se-editor-preview-hero">
                  <div style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;font-weight:900;color:rgba(255,255,255,.80)">${U().esc(customer.founded || customer.division || "Customer Site")}</div>
                  <h4>${U().esc(heroHeadline)}</h4>
                  <p>${U().esc(customer.heroSubhead || "Customer-specific website experience powered by SyncEtc.")}</p>
                </div>
                <div class="se-editor-preview-body">
                  <div class="se-editor-preview-pills">
                    <span>${U().esc(customer.preset || preset)}</span>
                    <span>${U().esc(pageLabel)}</span>
                    <span>View as ${U().esc(viewAs)}</span>
                    <span>${ctx.showBanner === false ? "banner off" : "banner on"}</span>
                  </div>
                </div>
              </div>
              <p class="se-editor-note" style="margin-top:12px">Future controls will save to Supabase. For now, customer selection and View-As preview are wired for page testing; deeper styling controls are marked as preview/local.</p>
            </div>
          </div>
        </div>
      </div>
    </section>`;
  }

  function bind(ctx, root) {
    const target = root || document;

    target.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("[data-se-toggle-editor]")) {
        window.SyncEtc.Components.Utils.dispatch("syncetc:control-change", { field:"siteEditorOpen", value:!(ctx.siteEditorOpen === true) });
        return;
      }

      const viewBtn = e.target.closest && e.target.closest("[data-se-view-as]");
      if(viewBtn){
        const value = viewBtn.getAttribute("data-se-view-as") || "public";
        window.SyncEtc.Components.Utils.dispatch("syncetc:control-change", { field:"viewAs", value:value });
        return;
      }

      if (e.target.closest && e.target.closest("[data-se-reset]")) {
        window.SyncEtc.Components.Utils.dispatch("syncetc:reset-local", {});
      }

      if (e.target.closest && e.target.closest("[data-se-export]")) {
        window.SyncEtc.Components.Utils.dispatch("syncetc:export-settings", {});
      }
    });

    target.addEventListener("change", function (e) {
      const field = e.target && e.target.getAttribute && e.target.getAttribute("data-se-field");
      if (!field) return;
      window.SyncEtc.Components.Utils.dispatch("syncetc:control-change", { field: field, value: e.target.value });
    });

    target.addEventListener("input", function (e) {
      const local = e.target && e.target.getAttribute && e.target.getAttribute("data-se-local");
      if (!local) return;
      window.SyncEtc.Components.Utils.dispatch("syncetc:local-input", { field: local, value: e.target.value });
    });

    target.addEventListener("change", function (e) {
      const local = e.target && e.target.getAttribute && e.target.getAttribute("data-se-local");
      if (!local) return;
      window.SyncEtc.Components.Utils.dispatch("syncetc:local-input", { field: local, value: e.target.value });
    });
  }

  window.SyncEtc.Components.MasterControls = {
    render: render,
    bind: bind,
    installStyles: installStyles,
    pages: PAGES,
    version: VERSION
  };
})();
/* COMPONENT-master-controls-v3.js - END */
