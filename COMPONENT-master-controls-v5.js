/* COMPONENT-master-controls-v5.js - BEGIN */
(function () {
  "use strict";
  window.SyncEtc = window.SyncEtc || {};
  window.SyncEtc.Components = window.SyncEtc.Components || {};

  var VERSION = "COMPONENT-master-controls-v5";
  var SUPABASE_URL = "https://ocdaohkiwonjmirqkjww.supabase.co";
  var SETTINGS_ACTION_URL = SUPABASE_URL + "/functions/v1/syncetc-site-settings-action";

  function U(){ return window.SyncEtc.Components.Utils; }
  function clean(v){ return v == null ? "" : String(v).trim(); }
  function nested(obj, path, fallback){ try { return path.split(".").reduce(function(o,k){return o&&o[k];}, obj) || fallback || ""; } catch(e){ return fallback || ""; } }

  function installStyles(){
    U().installStyle("COMPONENT-master-controls-v5-style", `
      .se-workbench{max-width:1180px;margin:8px auto 16px;padding:0 18px}.se-site-editor-shell{background:rgba(255,255,255,.96);border:1px solid var(--se-aero-border);border-radius:22px;box-shadow:var(--se-aero-shadow);overflow:hidden}.se-site-editor-toggle-row{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:10px 14px;background:linear-gradient(135deg,var(--se-aero-navy),var(--se-aero-blue));color:#fff}.se-site-editor-title{display:flex;gap:8px;align-items:center;flex-wrap:wrap;min-width:0}.se-site-editor-title h2{margin:0;color:#fff;font-size:16px;line-height:1.1}.se-site-editor-sub{color:rgba(255,255,255,.84);font-size:12px;font-weight:800}.se-site-editor-pill{display:inline-flex;align-items:center;min-height:24px;padding:4px 9px;border-radius:999px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.24);color:#fff;font-size:10.5px;font-weight:900;letter-spacing:.05em;text-transform:uppercase}.se-site-editor-toggle{border:1px solid rgba(255,255,255,.32);border-radius:999px;padding:8px 12px;background:#fff;color:var(--se-aero-navy);font-size:12px;font-weight:900;cursor:pointer;white-space:nowrap}.se-site-editor-body{display:none;border-top:1px solid rgba(255,255,255,.24);background:#f8fbff}.se-site-editor-shell.is-open .se-site-editor-body{display:block}.se-site-editor-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:0}.se-site-editor-panel{padding:16px;border-right:1px solid var(--se-aero-border)}.se-site-editor-panel:last-child{border-right:0;background:#fff}.se-site-editor-panel h3{margin:0 0 8px;color:var(--se-aero-navy);font-size:15px}.se-site-editor-help{margin:0 0 12px;color:#657789;font-size:12px;line-height:1.35;font-weight:700}.se-control-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}.se-control{display:block;min-width:0}.se-control span{display:block;margin-bottom:5px;color:var(--se-aero-navy);font-size:11px;font-weight:900;letter-spacing:.02em;text-transform:uppercase}.se-control input,.se-control select,.se-control textarea{width:100%;border:1px solid rgba(18,54,90,.20);border-radius:11px;padding:9px 10px;font:inherit;font-size:13px;background:#fff;color:var(--se-aero-text)}.se-control textarea{min-height:70px;resize:vertical}.se-control small{display:block;margin-top:4px;color:#657789;font-size:11px;line-height:1.25}.se-viewas-row{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0 14px}.se-viewas-btn{border:1px solid rgba(18,54,90,.20);border-radius:999px;padding:8px 11px;background:#fff;color:var(--se-aero-navy);font-size:12px;font-weight:900;cursor:pointer}.se-viewas-btn.active{background:var(--se-aero-navy);color:#fff;border-color:var(--se-aero-navy);box-shadow:0 7px 17px rgba(18,54,90,.18)}.se-editor-action-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.se-editor-action-row button{border:1px solid rgba(18,54,90,.20);border-radius:999px;padding:9px 12px;background:var(--se-aero-navy);color:#fff;font-weight:900;cursor:pointer}.se-editor-action-row button.secondary{background:#fff;color:var(--se-aero-navy)}.se-editor-action-row button:disabled{opacity:.55;cursor:not-allowed}.se-editor-save-status{margin-top:9px;min-height:18px;color:#304d73;font-size:12px;line-height:1.35;font-weight:900}.se-editor-save-status.warn{color:#8f2424}.se-editor-save-status.good{color:#247245}.se-editor-preview-card{border:1px solid var(--se-aero-border);border-radius:18px;overflow:hidden;background:var(--se-aero-card);box-shadow:0 10px 28px rgba(12,38,64,.10)}.se-editor-preview-hero{padding:18px;color:#fff;background:linear-gradient(135deg,var(--se-aero-navy),var(--se-aero-blue))}.se-editor-preview-hero h4{margin:5px 0 8px;font-size:22px;line-height:1.05;letter-spacing:-.025em;white-space:pre-line;color:#fff}.se-editor-preview-hero p{margin:0;line-height:1.5;color:rgba(255,255,255,.92)}.se-editor-preview-body{padding:13px;background:#fff}.se-editor-preview-pills{display:flex;gap:8px;flex-wrap:wrap}.se-editor-preview-pills span{border:1px solid var(--se-aero-border);border-radius:999px;padding:7px 9px;background:#fff;color:var(--se-aero-navy);font-size:12px;font-weight:900}@media(max-width:980px){.se-site-editor-grid{grid-template-columns:1fr}.se-site-editor-panel{border-right:0;border-bottom:1px solid var(--se-aero-border)}.se-site-editor-panel:last-child{border-bottom:0}.se-control-row{grid-template-columns:1fr}}@media(max-width:720px){.se-workbench{padding-left:12px;padding-right:12px}.se-site-editor-toggle-row{align-items:flex-start;flex-direction:column}.se-site-editor-toggle{width:100%}}
    `);
  }

  function snapshot(){ return window.SyncEtc.AuthContext && window.SyncEtc.AuthContext.getSnapshot ? window.SyncEtc.AuthContext.getSnapshot() : {}; }
  function isPlatformAdmin(ctx){ var s=snapshot(); return !!((s && (s.is_syncetc_super_admin || s.platform_role==="super_admin" || s.platform_role==="admin")) || window.SYNCETC_FORCE_SITE_EDITOR === true || (ctx && ctx.forceSiteEditor === true)); }
  function authToken(){ return window.SyncEtc && window.SyncEtc.AuthContext && window.SyncEtc.AuthContext.getToken ? window.SyncEtc.AuthContext.getToken() : ""; }
  function customerOptions(ctx){ var current=clean(ctx.customerKey||"demo_flying_club"); var all=[{key:"demo_flying_club",label:"Demo Flying Club"},{key:"150th_aero",label:"150th Aero Flying Club"}]; if(!all.some(function(c){return c.key===current;})) all.unshift({key:current,label:current.replace(/_/g," ")}); return all; }
  function availablePresets(ctx){ var c=ctx.customer||{}; return c.availablePresets && c.availablePresets.length ? c.availablePresets : (window.SyncEtc.Components.CustomerStyle.fallbackPresets || []); }

  function render(ctx){
    installStyles();
    if(!isPlatformAdmin(ctx)) return "";
    var customer=U().normalizeCustomerConfig(ctx.customer||{}), local=ctx.local||{}, content=customer.content||{};
    var viewAs=clean(ctx.viewAs||ctx.audience||"public"), open=ctx.siteEditorOpen===true;
    var calendarTitle=local.calendarTitle || nested(content,"calendar.title","Calendar");
    var calendarIntro=local.calendarIntro || nested(content,"calendar.intro","Upcoming meetings, fly-outs, work sessions, and other events.");
    var announcement=local.announcement || customer.announcement || "";
    var customerKey=clean(ctx.customerKey||customer.customer_key||"demo_flying_club");
    var presetKey=clean(local.stylePresetKey||customer.stylePresetKey||"classic-aviation");
    var presets=availablePresets(ctx), saveStatus=clean(ctx.siteSettingsStatus||""), saving=ctx.siteSettingsSaving===true;
    function selected(v,c){return clean(v)===clean(c)?"selected":"";} function active(v){return clean(v)===viewAs?"active":"";}
    return `<section class="se-workbench" data-se-component="master-controls"><div class="se-site-editor-shell ${open?"is-open":""}">
      <div class="se-site-editor-toggle-row"><div class="se-site-editor-title"><h2>SyncEtc Site Editor</h2><span class="se-site-editor-pill">${U().esc(ctx.version||VERSION)}</span><span class="se-site-editor-pill" data-se-live="customer-label">${U().esc(customer.shortName||customer.customerName||customerKey)}</span><span class="se-site-editor-sub">Calendar · View as <span data-se-live="view-as-label">${U().esc(viewAs)}</span></span></div><button type="button" class="se-site-editor-toggle" data-se-toggle-editor>${open?"Close Site Editor":"Open Site Editor"}</button></div>
      <div class="se-site-editor-body"><div class="se-site-editor-grid"><div class="se-site-editor-panel"><h3>Platform Site Controls</h3><p class="se-site-editor-help">Customer-wide settings intended to flow into every compliant page through the shared shell and customer style layer.</p>
      <div class="se-control-row"><label class="se-control"><span>Customer</span><select data-se-field="customerKey">${customerOptions(ctx).map(function(c){return '<option value="'+U().esc(c.key)+'" '+selected(c.key,customerKey)+'>'+U().esc(c.label)+'</option>';}).join("")}</select><small>Switches active customer preview.</small></label><label class="se-control"><span>Customer-wide Style Preset</span><select data-se-local="stylePresetKey">${presets.map(function(p){return '<option value="'+U().esc(p.preset_key)+'" '+selected(p.preset_key,presetKey)+'>'+U().esc(p.preset_name||p.preset_key)+'</option>';}).join("")}</select><small>Applies across the customer site, not per page.</small></label></div>
      <div class="se-viewas-row"><button type="button" class="se-viewas-btn ${active("public")}" data-se-view-as="public">View as Public</button><button type="button" class="se-viewas-btn ${active("member")}" data-se-view-as="member">View as Member</button><button type="button" class="se-viewas-btn ${active("admin")}" data-se-view-as="admin">View as Customer Admin</button><button type="button" class="se-viewas-btn ${active("platform")}" data-se-view-as="platform">View as SyncEtc Admin</button></div>
      <div class="se-control-row"><label class="se-control"><span>Calendar Title</span><input data-se-local="calendarTitle" value="${U().esc(calendarTitle)}"><small>Customer page-copy override.</small></label><label class="se-control"><span>Calendar Intro</span><textarea data-se-local="calendarIntro">${U().esc(calendarIntro)}</textarea><small>Customer-editable module copy.</small></label></div>
      <label class="se-control"><span>Banner / Announcement Text</span><textarea data-se-local="announcement">${U().esc(announcement)}</textarea><small>Customer-safe text. Later this belongs in Customer Settings.</small></label>
      <div class="se-editor-action-row"><button type="button" data-se-save-site-settings ${saving?"disabled":""}>${saving?"Saving...":"Save Customer Site Settings"}</button><button type="button" class="secondary" data-se-export>Export JSON</button><button type="button" class="secondary" data-se-reset>Reset local changes</button></div><div class="se-editor-save-status ${saveStatus.indexOf("failed")>=0||saveStatus.indexOf("denied")>=0?"warn":(saveStatus?"good":"")}" data-se-save-status>${U().esc(saveStatus)}</div>
      </div><div class="se-site-editor-panel"><h3>Customer Experience Preview</h3><p class="se-site-editor-help">Confirms customer-wide style and copy flowing into the rendered page.</p><div class="se-editor-preview-card"><div class="se-editor-preview-hero"><div style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;font-weight:900;color:rgba(255,255,255,.80)">${U().esc(customer.founded||customer.division||"Customer Site")}</div><h4 data-se-live="calendarTitle">${U().esc(calendarTitle)}</h4><p data-se-live="calendarIntro">${U().esc(calendarIntro)}</p></div><div class="se-editor-preview-body"><div class="se-editor-preview-pills"><span data-se-live="preset">${U().esc(customer.preset||presetKey)}</span><span>Calendar</span><span>View as <span data-se-live="view-as-pill">${U().esc(viewAs)}</span></span><span>${ctx.showBanner===false?"banner off":"banner on"}</span></div></div></div></div></div></div></div></section>`;
  }

  function buildSavePayload(ctx){
    var local=ctx.local||{}, customer=ctx.customer||{}, existingContent=customer.content||{};
    return {
      customer_key: clean(ctx.customerKey||customer.customer_key||"demo_flying_club"),
      style_preset_key: clean(local.stylePresetKey||customer.stylePresetKey||"classic-aviation"),
      theme_overrides:{},
      brand_overrides:{ announcement:clean(local.announcement||customer.announcement||"") },
      content_overrides:Object.assign({}, existingContent, { calendar:Object.assign({}, existingContent.calendar||{}, { title:clean(local.calendarTitle||nested(existingContent,"calendar.title","Calendar")), intro:clean(local.calendarIntro||nested(existingContent,"calendar.intro","Upcoming meetings, fly-outs, work sessions, and other events.")) }) }),
      module_overrides:{},
      enabled_modules:customer.modules||{},
      is_enabled:true
    };
  }
  function saveSiteSettings(ctx){
    var token=authToken();
    if(!token){ window.SyncEtc.Components.Utils.dispatch("syncetc:site-settings-status",{saving:false,status:"Save failed: sign in required."}); return; }
    window.SyncEtc.Components.Utils.dispatch("syncetc:site-settings-status",{saving:true,status:"Saving customer site settings..."});
    fetch(SETTINGS_ACTION_URL,{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({action:"save_customer_site_settings",customer_key:ctx.customerKey,payload:buildSavePayload(ctx),source:VERSION})})
      .then(function(r){return r.json().catch(function(){return null;}).then(function(body){if(!r.ok||!body||body.ok===false)throw new Error((body&&body.error)||("Save failed "+r.status));return body;});})
      .then(function(){window.SyncEtc.Components.Utils.dispatch("syncetc:site-settings-status",{saving:false,status:"Saved customer site settings."});window.SyncEtc.Components.Utils.dispatch("syncetc:site-settings-saved",{customerKey:ctx.customerKey});})
      .catch(function(err){window.SyncEtc.Components.Utils.dispatch("syncetc:site-settings-status",{saving:false,status:"Save failed: "+(err.message||err)});});
  }

  function setText(root, selector, value){ Array.prototype.slice.call(root.querySelectorAll(selector)).forEach(function(el){ el.textContent = value; }); }
  function updateLiveDom(root, field, value){
    if(field==="calendarTitle"){ setText(root,'[data-se-live="calendarTitle"]',value); setText(document,'[data-cv-live="calendar-title"]',value); }
    if(field==="calendarIntro"){ setText(root,'[data-se-live="calendarIntro"]',value); setText(document,'[data-cv-live="calendar-intro"]',value); }
    if(field==="stylePresetKey"){
      var select = root.querySelector('[data-se-local="stylePresetKey"]');
      var label = select && select.options[select.selectedIndex] ? select.options[select.selectedIndex].textContent : value;
      setText(root,'[data-se-live="preset"]',label);
    }
  }
  function setActiveView(root, value){
    Array.prototype.slice.call(root.querySelectorAll(".se-viewas-btn")).forEach(function(btn){ btn.classList.toggle("active", btn.getAttribute("data-se-view-as") === value); });
    setText(root,'[data-se-live="view-as-label"]',value);
    setText(root,'[data-se-live="view-as-pill"]',value);
  }

  function bind(ctx, root){
    var target=root||document;
    target.addEventListener("click",function(e){
      if(e.target.closest&&e.target.closest("[data-se-toggle-editor]")){window.SyncEtc.Components.Utils.dispatch("syncetc:control-change",{field:"siteEditorOpen",value:!(ctx.siteEditorOpen===true)});return;}
      var viewBtn=e.target.closest&&e.target.closest("[data-se-view-as]"); if(viewBtn){var v=viewBtn.getAttribute("data-se-view-as")||"public";setActiveView(target,v);window.SyncEtc.Components.Utils.dispatch("syncetc:control-change",{field:"viewAs",value:v});return;}
      if(e.target.closest&&e.target.closest("[data-se-save-site-settings]")){saveSiteSettings(ctx);return;}
      if(e.target.closest&&e.target.closest("[data-se-reset]")) window.SyncEtc.Components.Utils.dispatch("syncetc:reset-local",{});
      if(e.target.closest&&e.target.closest("[data-se-export]")) window.SyncEtc.Components.Utils.dispatch("syncetc:export-settings",{});
    });
    target.addEventListener("change",function(e){
      var field=e.target&&e.target.getAttribute&&e.target.getAttribute("data-se-field"); if(field){window.SyncEtc.Components.Utils.dispatch("syncetc:control-change",{field:field,value:e.target.value}); return;}
      var local=e.target&&e.target.getAttribute&&e.target.getAttribute("data-se-local"); if(local){updateLiveDom(target,local,e.target.value);window.SyncEtc.Components.Utils.dispatch("syncetc:local-input",{field:local,value:e.target.value});}
    });
    target.addEventListener("input",function(e){var local=e.target&&e.target.getAttribute&&e.target.getAttribute("data-se-local");if(local){updateLiveDom(target,local,e.target.value);window.SyncEtc.Components.Utils.dispatch("syncetc:local-input",{field:local,value:e.target.value});}});
    document.addEventListener("syncetc:site-settings-status", function(e){
      var status = target.querySelector("[data-se-save-status]");
      if(!status) return;
      var d = e.detail || {};
      status.textContent = d.status || "";
      status.classList.toggle("warn", String(d.status||"").indexOf("failed") >= 0 || String(d.status||"").indexOf("denied") >= 0);
      status.classList.toggle("good", !!d.status && !status.classList.contains("warn"));
      var btn = target.querySelector("[data-se-save-site-settings]");
      if(btn){ btn.disabled = !!d.saving; btn.textContent = d.saving ? "Saving..." : "Save Customer Site Settings"; }
    });
  }
  window.SyncEtc.Components.MasterControls={render:render,bind:bind,installStyles:installStyles,version:VERSION};
})();
/* COMPONENT-master-controls-v5.js - END */
