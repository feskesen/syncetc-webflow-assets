/* COMPONENT-master-controls-v2.js - BEGIN */
(function(){
"use strict";
window.SyncEtc=window.SyncEtc||{};
window.SyncEtc.Components=window.SyncEtc.Components||{};
var VERSION="COMPONENT-master-controls-v2";
var ACTION_URL="https://ocdaohkiwonjmirqkjww.supabase.co/functions/v1/syncetc-site-settings-action";
function U(){return window.SyncEtc.Components.Utils;}
function clean(v){return v==null?"":String(v).trim();}
function findAccessToken(obj,depth){
  if(!obj||depth>5)return "";
  if(typeof obj==="string"){
    if(obj.split(".").length===3&&obj.length>80)return obj;
    try{return findAccessToken(JSON.parse(obj),depth+1);}catch(e){return "";}
  }
  if(typeof obj!=="object")return "";
  if(obj.access_token&&typeof obj.access_token==="string")return obj.access_token;
  if(obj.currentSession&&obj.currentSession.access_token)return obj.currentSession.access_token;
  if(obj.session&&obj.session.access_token)return obj.session.access_token;
  if(obj.data&&obj.data.session&&obj.data.session.access_token)return obj.data.session.access_token;
  var keys=Object.keys(obj);
  for(var i=0;i<keys.length;i++){var found=findAccessToken(obj[keys[i]],depth+1);if(found)return found;}
  return "";
}
function getToken(){
  try{
    if(window.SyncEtc&&window.SyncEtc.AuthContext){
      if(window.SyncEtc.AuthContext.getToken){
        var t=window.SyncEtc.AuthContext.getToken();
        if(t)return t;
      }
      if(window.SyncEtc.AuthContext.getSnapshot){
        var s=window.SyncEtc.AuthContext.getSnapshot();
        var st=findAccessToken(s,0);
        if(st)return st;
      }
    }
  }catch(e){}
  try{
    for(var i=0;i<localStorage.length;i++){
      var key=localStorage.key(i)||"";
      if(key.indexOf("auth")>=0||key.indexOf("sb-")===0||key.indexOf("supabase")>=0){
        var val=localStorage.getItem(key);
        var found=findAccessToken(val,0);
        if(found)return found;
      }
    }
  }catch(e){}
  return "";
}
function nested(o,path,fallback){try{return path.split(".").reduce(function(a,k){return a&&a[k];},o)||fallback||"";}catch(e){return fallback||"";}}
function installStyles(){U().installStyle("COMPONENT-master-controls-v2-style",`
    .syncetc-drawer .se-site-editor,
    .syncetc-drawer .se-site-editor *{box-sizing:border-box}
    .syncetc-drawer .se-site-editor{padding:0;background:transparent;font-family:inherit;color:#102034}
    .syncetc-drawer .se-editor-shell{border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important}
    .syncetc-drawer .se-editor-top{display:none!important}
    .syncetc-drawer .se-body{display:block!important;padding:0!important;background:transparent!important}
    .syncetc-drawer .se-note{margin:0 0 14px!important;color:#64748b!important;font-size:12px!important;line-height:1.45!important;font-weight:700!important}
    .syncetc-drawer .se-row{display:grid!important;grid-template-columns:1fr!important;gap:12px!important;margin:0 0 14px!important}
    .syncetc-drawer .se-control{display:block!important;margin:0!important}
    .syncetc-drawer .se-control span{display:block!important;margin:0 0 5px!important;color:#12365a!important;font-size:11px!important;font-weight:900!important;text-transform:uppercase!important;letter-spacing:.035em!important}
    .syncetc-drawer .se-control small{display:block!important;margin:5px 0 0!important;color:#64748b!important;font-size:11px!important;line-height:1.35!important}
    .syncetc-drawer .se-control input,
    .syncetc-drawer .se-control select,
    .syncetc-drawer .se-control textarea{width:100%!important;max-width:100%!important;border:1px solid rgba(18,54,90,.22)!important;border-radius:12px!important;padding:10px 11px!important;background:#fff!important;color:#102034!important;font:inherit!important;font-size:13px!important;line-height:1.25!important;box-shadow:none!important;appearance:auto!important}
    .syncetc-drawer .se-control textarea{min-height:78px!important;resize:vertical!important}
    .syncetc-drawer .se-view-row{display:grid!important;grid-template-columns:1fr 1fr!important;gap:8px!important;margin:12px 0 14px!important;background:transparent!important}
    .syncetc-drawer .se-view-row button,
    .syncetc-drawer button[data-se-view]{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:38px!important;appearance:none!important;border:1px solid rgba(18,54,90,.24)!important;border-radius:999px!important;padding:10px 12px!important;background:#fff!important;color:#12365a!important;font:inherit!important;font-weight:950!important;font-size:12px!important;line-height:1.1!important;text-align:center!important;cursor:pointer!important;box-shadow:0 1px 0 rgba(12,38,64,.04)!important;text-decoration:none!important;white-space:normal!important}
    .syncetc-drawer .se-view-row button:hover,
    .syncetc-drawer button[data-se-view]:hover{border-color:#12365a!important}
    .syncetc-drawer .se-view-row button.is-active,
    .syncetc-drawer button[data-se-view].is-active{background:#12365a!important;color:#fff!important;border-color:#12365a!important}
    .syncetc-drawer .se-actions{display:flex!important;flex-wrap:wrap!important;gap:8px!important;margin:12px 0 16px!important;background:transparent!important}
    .syncetc-drawer .se-actions button,
    .syncetc-drawer .se-save,
    .syncetc-drawer button[data-se-save],
    .syncetc-drawer button[data-se-reset]{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:38px!important;appearance:none!important;border:1px solid rgba(18,54,90,.24)!important;border-radius:999px!important;padding:10px 13px!important;background:#fff!important;color:#12365a!important;font:inherit!important;font-weight:950!important;font-size:12px!important;line-height:1.1!important;cursor:pointer!important;text-align:center!important;box-shadow:none!important;text-decoration:none!important}
    .syncetc-drawer .se-actions button:first-child,
    .syncetc-drawer .se-save,
    .syncetc-drawer button[data-se-save]{background:#12365a!important;color:#fff!important;border-color:#12365a!important}
    .syncetc-drawer .se-preview{display:grid!important;grid-template-columns:1fr!important;gap:10px!important;margin-top:12px!important}
    .syncetc-drawer .se-preview-card{border:1px solid rgba(18,54,90,.14)!important;border-radius:16px!important;padding:13px!important;background:#fff!important;box-shadow:0 8px 20px rgba(12,38,64,.06)!important}
    .syncetc-drawer .se-preview-card h4{margin:0 0 5px!important;color:#12365a!important;font-size:15px!important;line-height:1.2!important}
    .syncetc-drawer .se-preview-card p{margin:0!important;color:#64748b!important;font-size:12px!important;line-height:1.35!important}
    .syncetc-drawer .se-preview-pills{display:flex!important;gap:6px!important;flex-wrap:wrap!important;margin-top:9px!important}
    .syncetc-drawer .se-preview-pills span{font-size:10.5px!important;font-weight:950!important;color:#12365a!important}
    .syncetc-drawer .se-preview-pills span+span:before{content:'·';margin-right:6px;color:#8da0b5}
    .syncetc-drawer .se-status{margin-top:10px!important;color:#304d73!important;font-size:12px!important;font-weight:900!important;min-height:18px!important}
    .syncetc-drawer .se-status.warn{color:#8f2424!important}
    .syncetc-drawer .se-status.good{color:#247245!important}
  `);}
function snapshot(){return window.SyncEtc.SecurityContext&&window.SyncEtc.SecurityContext.getSnapshot?window.SyncEtc.SecurityContext.getSnapshot():{};}
function isPlatformAdmin(){return !!(window.SyncEtc.SecurityContext&&window.SyncEtc.SecurityContext.isPlatformAdmin&&window.SyncEtc.SecurityContext.isPlatformAdmin());}
function render(ctx){installStyles();if(!isPlatformAdmin())return"";var c=ctx.customer||{}, local=ctx.local||{}, content=c.content||{}, title=local.calendarTitle||nested(content,"calendar.title","Calendar"), intro=local.calendarIntro||nested(content,"calendar.intro","Upcoming meetings, fly-outs, work sessions, and other events."), preset=local.stylePresetKey||c.stylePresetKey||"classic-aviation", layoutPreset=local.layoutPresetKey||nested(c,"layout.preset","standard-layout"), presets=c.availablePresets||window.SyncEtc.Components.CustomerStyle.fallbackPresets||[], customerKey=ctx.customerKey||c.customer_key||"demo_flying_club", viewAs=ctx.viewAs||"public", open=ctx.siteEditorOpen===true, sec=snapshot(), actor=sec.actor_email||"signed-in user", platformRole=sec.platform_role||"platform admin", activeCustomerRole=sec.active_customer_role||"n/a";function selected(a,b){return clean(a)===clean(b)?"selected":"";}function active(v){return clean(v)===clean(viewAs)?"active":"";}return `<section class="se-workbench"><div class="se-editor ${open?"is-open":""}" data-se-editor><div class="se-editor-top"><div class="se-editor-title"><h2>SyncEtc Site Editor</h2><span class="se-pill">Calendar · View as <span data-se-view-label>${U().esc(viewAs)}</span></span></div><div class="se-top-actions"><div class="se-top-identity"><span>${U().esc(actor)}</span><span>${U().esc(platformRole)}</span></div><button class="se-top-signout" type="button" data-se-signout>Not you? Sign out</button><button class="se-toggle" type="button" data-se-toggle>${open?"Close Site Editor":"Open Site Editor"}</button></div></div><div class="se-editor-body"><div class="se-grid"><div class="se-panel"><h3>Platform Site Controls</h3><p class="se-help">Platform-only customer-wide style and layout controls. Customer-owned copy lives in Customer Settings below.</p><div class="se-row"><label class="se-control"><span>Customer</span><select data-se-customer><option value="demo_flying_club" ${selected("demo_flying_club",customerKey)}>Demo Flying Club</option><option value="150th_aero" ${selected("150th_aero",customerKey)}>150th Aero Flying Club</option></select><small>Reloads customer preview once selected.</small></label><label class="se-control"><span>Customer-wide Style Preset</span><select data-se-local="stylePresetKey">${presets.map(function(p){return '<option value="'+U().esc(p.preset_key)+'" '+selected(p.preset_key,preset)+'>'+U().esc(p.preset_name||p.preset_key)+'</option>';}).join("")}</select><small>Applies immediately to this page.</small></label></div><div class="se-row"><label class="se-control"><span>Customer-wide Layout Preset</span><select data-se-local="layoutPresetKey"><option value="standard-layout" ${selected("standard-layout",layoutPreset)}>Standard Layout</option><option value="compact-ops" ${selected("compact-ops",layoutPreset)}>Compact Ops</option><option value="bold-homepage" ${selected("bold-homepage",layoutPreset)}>Bold Homepage</option><option value="club-magazine" ${selected("club-magazine",layoutPreset)}>Club Magazine</option></select><small>Future site-wide layout preset. Not page-specific.</small></label><label class="se-control"><span>Preset Builder</span><input value="Deferred: future platform preset builder" disabled><small>Separate page later. Not part of day-to-day customer settings.</small></label></div><div class="se-viewas"><button type="button" class="se-view ${active("public")}" data-se-view="public">View as Public</button><button type="button" class="se-view ${active("member")}" data-se-view="member">View as Member</button><button type="button" class="se-view ${active("admin")}" data-se-view="admin">View as Customer Admin</button><button type="button" class="se-view ${active("platform")}" data-se-view="platform">View as SyncEtc Admin</button></div><div class="se-actions"><button type="button" data-se-save>Save Customer Site Settings</button><button type="button" class="secondary" data-se-reset>Reset local changes</button></div><div class="se-status" data-se-status></div></div><div class="se-panel"><h3>Customer Experience Preview</h3><p class="se-help">Confirms live style and copy without destroying the form.</p><div class="se-card"><div class="se-card-hero"><h4>Customer-wide Site Design</h4><p>Style and layout presets apply across compliant customer pages.</p></div><div class="se-card-body"><div class="se-preview-pills"><span data-se-preview-preset>${U().esc(c.preset||preset)}</span><span data-se-preview-layout>${U().esc(layoutPreset)}</span><span>Calendar</span><span>View as <span data-se-preview-view>${U().esc(viewAs)}</span></span></div></div></div></div></div></div></div></section>`;}
function setText(sel,val){document.querySelectorAll(sel).forEach(function(el){el.textContent=val;});}
function save(api,root){var token=getToken();var status=root.querySelector("[data-se-status]");if(!token){status.textContent="Save failed: sign in required.";status.className="se-status warn";return;}status.textContent="Saving...";status.className="se-status";fetch(ACTION_URL,{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({action:"save_customer_site_settings",payload:api.getSavePayload()})}).then(function(r){return r.json().catch(function(){return null;}).then(function(body){if(!r.ok||!body||body.ok===false)throw new Error((body&&body.error)||"Save failed");return body;});}).then(function(){status.textContent="Saved customer site settings.";status.className="se-status good";}).catch(function(err){status.textContent="Save failed: "+(err.message||err);status.className="se-status warn";});}
function signOutAndReload(){
  if(window.SyncEtc&&window.SyncEtc.SecurityContext&&window.SyncEtc.SecurityContext.signOutHard){
    window.SyncEtc.SecurityContext.signOutHard();
    return;
  }
  try{if(window.SyncEtc&&window.SyncEtc.AuthContext&&window.SyncEtc.AuthContext.signOut)window.SyncEtc.AuthContext.signOut();}catch(e){}
  try{
    Object.keys(localStorage).forEach(function(k){var key=String(k).toLowerCase();if(key.indexOf("sb-")===0||key.indexOf("supabase")>=0||key.indexOf("auth")>=0||key.indexOf("syncetc")>=0)localStorage.removeItem(k);});
    Object.keys(sessionStorage).forEach(function(k){var key=String(k).toLowerCase();if(key.indexOf("sb-")===0||key.indexOf("supabase")>=0||key.indexOf("auth")>=0||key.indexOf("syncetc")>=0)sessionStorage.removeItem(k);});
  }catch(e){}
  setTimeout(function(){window.location.reload();},220);
}
function bind(api,root){var editor=root.querySelector("[data-se-editor]");if(!editor||editor.getAttribute("data-se-bound")==="1")return;editor.setAttribute("data-se-bound","1");editor.addEventListener("click",function(e){var t=e.target;if(t.closest("[data-se-toggle]")){var open=!editor.classList.contains("is-open");editor.classList.toggle("is-open",open);api.setEditorOpen(open);t.textContent=open?"Close Site Editor":"Open Site Editor";return;}var view=t.closest("[data-se-view]");if(view){var v=view.getAttribute("data-se-view");editor.querySelectorAll("[data-se-view]").forEach(function(b){b.classList.toggle("active",b===view);});api.setViewAs(v);setText("[data-se-view-label]",v);setText("[data-se-preview-view]",v);try{document.dispatchEvent(new CustomEvent("syncetc:view-as-hard-change",{detail:{viewAs:v}}));}catch(err){}return;}if(t.closest("[data-se-signout]")){signOutAndReload();return;}if(t.closest("[data-se-save]")){save(api,editor);return;}if(t.closest("[data-se-reset]")){window.location.reload();return;}});editor.addEventListener("change",function(e){var t=e.target;if(t.matches("[data-se-customer]")){api.setCustomerKey(t.value);api.loadCustomer().then(function(){window.SyncEtc.Components.Utils.dispatch("syncetc:customer-hard-change",{customerKey:t.value});});return;}if(t.matches("[data-se-local]"))handleLocal(api,editor,t);});editor.addEventListener("input",function(e){var t=e.target;if(t.matches("[data-se-local]"))handleLocal(api,editor,t);});}
function handleLocal(api,editor,t){var field=t.getAttribute("data-se-local"),value=t.value;api.setLocal(field,value);if(field==="stylePresetKey"){var c=api.customer();var theme=window.SyncEtc.Components.CustomerStyle.themeForPreset(c,value);window.SyncEtc.Components.CustomerStyle.applyThemeVars(document.getElementById("syncetc-component-shell"),theme);var label=t.options[t.selectedIndex]?t.options[t.selectedIndex].textContent:value;setText("[data-se-preview-preset]",label);}
if(field==="layoutPresetKey"){var layoutLabel=t.options[t.selectedIndex]?t.options[t.selectedIndex].textContent:value;setText("[data-se-preview-layout]",layoutLabel);}
}
window.SyncEtc.Components.MasterControls={version:VERSION,render:render,bind:bind,installStyles:installStyles};
})();
/* COMPONENT-master-controls-v2.js - END */
