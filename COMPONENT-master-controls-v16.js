/* COMPONENT-master-controls-v16.js - BEGIN */
(function(){
"use strict";
window.SyncEtc=window.SyncEtc||{};
window.SyncEtc.Components=window.SyncEtc.Components||{};
var VERSION="COMPONENT-master-controls-v16";
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
function installStyles(){U().installStyle("COMPONENT-master-controls-v16-style",`
    .se-site-editor{padding:0;background:transparent}
    .se-editor-shell{border:0;border-radius:0;background:transparent;box-shadow:none;overflow:visible}
    .se-editor-top{display:none}
    .se-body{display:block!important;padding:0;background:transparent}
    .se-note{margin:0 0 14px;color:#64748b;font-size:12px;line-height:1.45;font-weight:700}
    .se-row{display:grid;grid-template-columns:1fr;gap:10px;margin-bottom:12px}
    .se-control{display:block}
    .se-control span{display:block;margin-bottom:5px;color:#12365a;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.035em}
    .se-control small{display:block;margin-top:4px;color:#64748b;font-size:11px;line-height:1.35}
    .se-control input,.se-control select,.se-control textarea{width:100%;border:1px solid rgba(18,54,90,.22);border-radius:12px;padding:10px 11px;background:#fff;color:#102034;font:inherit;font-size:13px;box-sizing:border-box}
    .se-control textarea{min-height:78px;resize:vertical}
    .se-view-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0 14px}
    .se-view-row button{appearance:none;border:1px solid rgba(18,54,90,.22);border-radius:999px;padding:10px 10px;background:#fff;color:#12365a;font-weight:950;font-size:12px;cursor:pointer;line-height:1.1;text-align:center;box-shadow:0 1px 0 rgba(12,38,64,.04)}
    .se-view-row button:hover{border-color:#12365a}
    .se-view-row button.is-active{background:#12365a;color:#fff;border-color:#12365a}
    .se-actions{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 16px}
    .se-actions button,.se-save{appearance:none;border:1px solid rgba(18,54,90,.22);border-radius:999px;padding:10px 12px;background:#fff;color:#12365a;font-weight:950;font-size:12px;cursor:pointer;line-height:1.1;text-align:center}
    .se-actions button:first-child,.se-save{background:#12365a;color:#fff;border-color:#12365a}
    .se-preview{display:grid;grid-template-columns:1fr;gap:10px;margin-top:12px}
    .se-preview-card{border:1px solid rgba(18,54,90,.14);border-radius:16px;padding:13px;background:#fff;box-shadow:0 8px 20px rgba(12,38,64,.06)}
    .se-preview-card h4{margin:0 0 5px;color:#12365a;font-size:15px}
    .se-preview-card p{margin:0;color:#64748b;font-size:12px;line-height:1.35}
    .se-preview-pills{display:flex;gap:6px;flex-wrap:wrap;margin-top:9px}
    .se-preview-pills span{font-size:10.5px;font-weight:950;color:#12365a}
    .se-preview-pills span+span:before{content:'·';margin-right:6px;color:#8da0b5}
    .se-status{margin-top:10px;color:#304d73;font-size:12px;font-weight:900;min-height:18px}
    .se-status.warn{color:#8f2424}.se-status.good{color:#247245}
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
/* COMPONENT-master-controls-v16.js - END */
