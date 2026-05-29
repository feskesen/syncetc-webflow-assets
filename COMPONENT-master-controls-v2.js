/* COMPONENT-master-controls-v2.js - BEGIN */
(function () {
  "use strict";

  window.SyncEtc = window.SyncEtc || {};
  window.SyncEtc.Components = window.SyncEtc.Components || {};

  const VERSION = "COMPONENT-master-controls-v2";

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

  const SITE_EDITOR_MODES = [
    { key:"preview", label:"Preview / View As" },
    { key:"site_builder", label:"Site Builder Placeholder" },
    { key:"customer_content", label:"Customer Content Controls" },
    { key:"style_presets", label:"Style Preset Controls" },
    { key:"launch_review", label:"Launch Review Placeholder" }
  ];

  const STYLE_PRESETS = [
    { key:"current", label:"Current Customer Preset" },
    { key:"classic_aviation", label:"Classic Aviation" },
    { key:"modern_blue", label:"Modern Blue" },
    { key:"ops_console", label:"Operations Console" },
    { key:"minimal_portal", label:"Minimal Portal" }
  ];

  function clean(v) {
    return v == null ? "" : String(v).trim();
  }

  function snapshot() {
    return window.SyncEtc && window.SyncEtc.AuthContext && window.SyncEtc.AuthContext.getSnapshot ? window.SyncEtc.AuthContext.getSnapshot() : {};
  }

  function isPlatformEditor(ctx) {
    if (window.SYNCETC_FORCE_SITE_EDITOR === true) return true;
    if (ctx && ctx.forceSiteEditor === true) return true;

    const s = snapshot();
    if (s && s.is_syncetc_super_admin) return true;

    const role = clean(s.platform_role || s.platformRole || s.role || "").toLowerCase();
    if (role.indexOf("syncetc") >= 0 && (role.indexOf("admin") >= 0 || role.indexOf("super") >= 0 || role.indexOf("owner") >= 0)) return true;

    return false;
  }

  function installStyles() {
    const U = window.SyncEtc.Components.Utils;
    U.installStyle("COMPONENT-master-controls-v2-style", `
      .se-workbench { max-width:1180px; margin:8px auto 16px; padding:0 18px; }
      .se-workbench-shell { background:rgba(255,255,255,.96); border:1px solid var(--se-aero-border); border-radius:22px; box-shadow:var(--se-aero-shadow); overflow:hidden; }
      .se-workbench-collapsed { border-radius:22px; overflow:hidden; }
      .se-site-editor-details { display:block; }
      .se-site-editor-details > summary { list-style:none; cursor:pointer; display:flex; justify-content:space-between; gap:16px; align-items:center; padding:14px 18px; background:linear-gradient(135deg,var(--se-aero-navy),var(--se-aero-blue)); color:#fff; }
      .se-site-editor-details > summary::-webkit-details-marker { display:none; }
      .se-editor-title { display:flex; flex-direction:column; gap:4px; }
      .se-editor-title strong { color:#fff; font-size:18px; line-height:1.1; }
      .se-editor-title span { color:rgba(255,255,255,.86); font-size:12px; line-height:1.35; }
      .se-workbench-badges { display:flex; flex-wrap:wrap; gap:6px; justify-content:flex-end; align-items:center; }
      .se-workbench-badges span { background:rgba(255,255,255,.90); color:var(--se-aero-navy); border-radius:999px; padding:6px 9px; font-size:11px; font-weight:900; white-space:nowrap; }
      .se-editor-body { padding:16px; background:#f8fbff; border-top:1px solid rgba(255,255,255,.22); }
      .se-editor-section { margin:0 0 14px; padding:16px; border:1px solid var(--se-aero-border); border-radius:18px; background:rgba(255,255,255,.94); box-shadow:0 8px 20px rgba(12,38,64,.06); }
      .se-editor-section:last-child { margin-bottom:0; }
      .se-editor-section h3 { margin:0 0 8px; color:var(--se-aero-navy); font-size:15px; }
      .se-editor-section p { margin:0 0 12px; color:#657789; font-size:12px; line-height:1.45; font-weight:700; }
      .se-control-row { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px; }
      .se-control-row.three { grid-template-columns:1fr 1fr 1fr; }
      .se-control { display:block; min-width:0; }
      .se-control label { display:block; margin-bottom:5px; color:var(--se-aero-navy); font-size:11px; font-weight:900; letter-spacing:.02em; text-transform:uppercase; }
      .se-control input, .se-control select, .se-control textarea { width:100%; border:1px solid rgba(18,54,90,.20); border-radius:11px; padding:9px 10px; font:inherit; font-size:13px; background:#fff; color:var(--se-aero-text); box-sizing:border-box; }
      .se-control textarea { min-height:74px; resize:vertical; }
      .se-control small { display:block; margin-top:4px; color:#657789; font-size:11px; line-height:1.25; }
      .se-action-row { display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; }
      .se-action-row button { border:1px solid rgba(18,54,90,.20); border-radius:999px; padding:9px 12px; background:var(--se-aero-navy); color:#fff; font-weight:900; cursor:pointer; }
      .se-action-row button.secondary { background:#fff; color:var(--se-aero-navy); }
      .se-placeholder-note { border:1px dashed rgba(18,54,90,.22); border-radius:14px; padding:12px; background:rgba(234,245,255,.55); color:#516579; font-size:12px; line-height:1.45; font-weight:800; }
      @media (max-width:720px){ .se-workbench{padding-left:12px;padding-right:12px}.se-control-row,.se-control-row.three{grid-template-columns:1fr}.se-site-editor-details > summary{display:block}.se-workbench-badges{justify-content:flex-start;margin-top:10px} }
    `);
  }

  function optionList(items, selected) {
    const U = window.SyncEtc.Components.Utils;
    return items.map(function(item){
      return '<option value="' + U.esc(item.key) + '" ' + (clean(selected) === item.key ? "selected" : "") + '>' + U.esc(item.label) + '</option>';
    }).join("");
  }

  function pagesOptions(selected) {
    return optionList(PAGES, selected || "home");
  }

  function render(ctx) {
    installStyles();

    if (!isPlatformEditor(ctx)) return "";

    const U = window.SyncEtc.Components.Utils;
    const customer = U.normalizeCustomerConfig(ctx.customer || {});
    const pageKey = ctx.pageKey || "home";
    const pageLabel = U.pageLabel(pageKey, PAGES);
    const siteEditorMode = ctx.siteEditorMode || "preview";
    const stylePreset = ctx.stylePreset || "current";
    const heroHeadline = ctx.local && ctx.local.heroHeadline ? ctx.local.heroHeadline : (customer.heroHeadline || "Welcome to\n" + customer.fullName);
    const announcement = ctx.local && ctx.local.announcement ? ctx.local.announcement : customer.announcement;
    const openAttr = ctx.siteEditorOpen ? " open" : "";

    return `<section class="se-workbench" data-se-component="master-controls" data-se-version="${U.esc(VERSION)}">
      <div class="se-workbench-shell se-workbench-collapsed">
        <details class="se-site-editor-details"${openAttr}>
          <summary>
            <div class="se-editor-title">
              <strong>SyncEtc Site Editor</strong>
              <span>Platform-only controls for view-as testing, site creation, customer content, and future style preset injection.</span>
            </div>
            <div class="se-workbench-badges">
              <span>${U.esc(ctx.version || "page")}</span>
              <span>${U.esc(customer.shortName || customer.customerName || "Customer")}</span>
              <span>${U.esc(pageLabel)}</span>
              <span>${U.esc(ctx.audience || "public")}</span>
            </div>
          </summary>

          <div class="se-editor-body">
            <div class="se-editor-section">
              <h3>Site Editor Mode</h3>
              <p>This is the top-level SyncEtc workbench. It is intentionally a placeholder/control layer for the platform builder, not customer-facing content.</p>
              <div class="se-control-row three">
                <label class="se-control"><label>Editor Mode</label><select data-se-field="siteEditorMode">${optionList(SITE_EDITOR_MODES, siteEditorMode)}</select><small>Placeholder for future editor folders.</small></label>
                <label class="se-control"><label>Page Preview</label><select data-se-field="pageKey">${pagesOptions(pageKey)}</select><small>Internal preview selector.</small></label>
                <label class="se-control"><label>View As</label><select data-se-field="audience"><option value="public" ${ctx.audience==="public"?"selected":""}>Public Visitor</option><option value="member" ${ctx.audience==="member"?"selected":""}>Member/User</option><option value="admin" ${ctx.audience==="admin"?"selected":""}>Customer Admin</option><option value="platform" ${ctx.audience==="platform"?"selected":""}>SyncEtc Admin</option></select><small>Preview permissions and nav rows.</small></label>
              </div>
            </div>

            <div class="se-editor-section">
              <h3>Customer Content Controls</h3>
              <p>These are the kinds of safe controls a customer admin may eventually receive. They should feed shared customer config, not one-off page code.</p>
              <div class="se-control-row">
                <label class="se-control"><label>Hero Headline</label><textarea data-se-local="heroHeadline">${U.esc(heroHeadline)}</textarea><small>Customer-editable copy placeholder.</small></label>
                <label class="se-control"><label>Announcement / Banner Text</label><textarea data-se-local="announcement">${U.esc(announcement)}</textarea><small>Customer-editable banner placeholder.</small></label>
              </div>
              <div class="se-placeholder-note">Future customer controls should include logo, banner text, selected images, announcements, and safe module visibility choices. Major layout and style presets remain SyncEtc-controlled.</div>
            </div>

            <div class="se-editor-section">
              <h3>Admin-Only Style Preset Controls</h3>
              <p>Style presets are platform-level controls. They should eventually inject customer CSS variables and bounded layout settings globally through shared components.</p>
              <div class="se-control-row">
                <label class="se-control"><label>Style Preset</label><select data-se-field="stylePreset">${optionList(STYLE_PRESETS, stylePreset)}</select><small>Placeholder. Does not yet write to Supabase.</small></label>
                <label class="se-control"><label>Layout Family</label><select data-se-field="layoutFamily"><option value="current">Current</option><option value="classic">Classic</option><option value="wide">Wide</option><option value="compact">Compact</option></select><small>Placeholder for future global layout families.</small></label>
              </div>
              <div class="se-action-row"><button type="button" data-se-export>Export current settings JSON</button><button type="button" class="secondary" data-se-reset>Reset local changes</button></div>
            </div>
          </div>
        </details>
      </div>
    </section>`;
  }

  function bind(ctx, root) {
    const target = root || document;
    if (target.__syncetcMasterControlsV2Bound) return;
    target.__syncetcMasterControlsV2Bound = true;

    target.addEventListener("toggle", function(e){
      if (e.target && e.target.classList && e.target.classList.contains("se-site-editor-details")) {
        window.SyncEtc.Components.Utils.dispatch("syncetc:control-change", { field:"siteEditorOpen", value:!!e.target.open });
      }
    }, true);

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
      window.SyncEtc.Components.Utils.dispatch("syncetc:local-input", { field: local, value: e.target.value });
    });

    target.addEventListener("click", function (e) {
      const pageLink = e.target && e.target.closest && e.target.closest("[data-se-page-link]");
      if (pageLink) {
        e.preventDefault();
        window.SyncEtc.Components.Utils.dispatch("syncetc:control-change", { field:"pageKey", value:pageLink.getAttribute("data-se-page-link") });
        return;
      }

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
    pages: PAGES,
    version: VERSION
  };
})();
/* COMPONENT-master-controls-v2.js - END */
