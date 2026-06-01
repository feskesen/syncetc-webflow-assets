/* COMPONENT-master-controls-v1.js | clean content-editor restore | Generated: 2026-06-01 01:04:15 UTC */
/* COMPONENT-master-controls-v1.js - BEGIN */
(function(){
"use strict";
window.SyncEtc=window.SyncEtc||{};
window.SyncEtc.Components=window.SyncEtc.Components||{};
var VERSION="COMPONENT-master-controls-v1";
var ACTION_URL="https://ocdaohkiwonjmirqkjww.supabase.co/functions/v1/syncetc-site-settings-action";
var siteEditorDirty=false;
var currentApi=null;
var currentRoot=null;
var beforeUnloadInstalled=false;
var dirtyGuardInstalled=false;
var lastCustomerSelectValue="";

function ensureBeforeUnloadProtection(){
  if(beforeUnloadInstalled)return;
  beforeUnloadInstalled=true;
  window.addEventListener("beforeunload",function(e){
    if(!siteEditorDirty)return;
    e.preventDefault();
    e.returnValue="";
    return "";
  });
}

function markDirty(root,msg){
  siteEditorDirty=true;
  ensureBeforeUnloadProtection();
  ensureDirtyGuard();
  if(root)markStatus(root,msg||"Unsaved site setting changes.","warn");
}

function markClean(root,msg){
  siteEditorDirty=false;
  if(root)markStatus(root,msg||"Saved customer site settings.","good");
}

function discardSiteEditorPreview(reason){
  siteEditorDirty=false;
  try{
    if(currentApi&&currentApi.clearSiteEditorLocal)currentApi.clearSiteEditorLocal();
    else if(currentApi&&currentApi.setLocal){
      currentApi.setLocal("stylePresetKey",null);
      currentApi.setLocal("layoutPresetKey",null);
    }
    if(currentRoot)markStatus(currentRoot,"Unsaved Site Editor changes discarded.","");
  }catch(err){}
}

function confirmDiscardUnsaved(reason){
  if(!siteEditorDirty)return true;
  var msg="You have unsaved Site Editor changes. Continue and discard those changes?";
  if(reason)msg+="\n\nAction: "+reason;
  var ok=window.confirm(msg);
  if(ok)discardSiteEditorPreview(reason);
  return ok;
}

function shouldGuardLink(a){
  if(!a)return false;
  var href=a.getAttribute("href")||"";
  if(!href||href==="#"||href.indexOf("javascript:")===0)return false;
  if(a.closest("[data-se-editor]"))return false;
  return true;
}

function ensureDirtyGuard(){
  if(dirtyGuardInstalled)return;
  dirtyGuardInstalled=true;

  document.addEventListener("focusin",function(e){
    var t=e.target;
    if(t&&t.matches&&t.matches("[data-se-customer]"))lastCustomerSelectValue=t.value;
  },true);

  document.addEventListener("mousedown",function(e){
    var t=e.target;
    if(t&&t.matches&&t.matches("[data-se-customer]"))lastCustomerSelectValue=t.value;
  },true);

  document.addEventListener("click",function(e){
    if(!siteEditorDirty)return;
    var t=e.target;
    if(!t||!t.closest)return;

    if(t.closest("[data-se-drawer-close]"))return; // closing drawer preserves staged local changes

    if(t.closest("[data-se-drawer-signout]")||t.closest("[data-se-auth-logout]")||t.closest("[data-se-signout]")){
      if(!confirmDiscardUnsaved("sign out")){
        e.preventDefault();
        e.stopImmediatePropagation();
      }
      return;
    }

    var a=t.closest("a[href]");
    if(shouldGuardLink(a)){
      if(!confirmDiscardUnsaved("leave this page")){
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    }
  },true);

  document.addEventListener("change",function(e){
    if(!siteEditorDirty)return;
    var t=e.target;
    if(!t||!t.matches)return;

    if(t.matches("[data-se-customer]")){
      var attempted=t.value;
      if(!confirmDiscardUnsaved("switch customer")){
        e.preventDefault();
        e.stopImmediatePropagation();
        if(lastCustomerSelectValue!==undefined&&lastCustomerSelectValue!==null)t.value=lastCustomerSelectValue;
      }else{
        lastCustomerSelectValue=attempted;
      }
    }
  },true);
}

function markStatus(root,msg,cls){
  var status=root&&root.querySelector?root.querySelector("[data-se-status]"):null;
  if(!status)return;
  status.textContent=msg||"";
  status.className="se-status"+(cls?" "+cls:"");
}

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
function installStyles(){U().installStyle("COMPONENT-master-controls-v17-style",`
    .syncetc-drawer .se-site-editor,
    .syncetc-drawer .se-site-editor *{box-sizing:border-box}
    .syncetc-drawer .se-site-editor{padding:0;background:transparent;font-family:inherit;color:#102034}
    .syncetc-drawer .se-editor-shell{border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important}
    .syncetc-drawer .se-editor-top{display:none!important}
    .syncetc-drawer .se-body{display:block!important;padding:0!important;background:transparent!important}
    .syncetc-drawer .se-grid{display:block!important}
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
    .syncetc-drawer .se-view-row button.active,
    .syncetc-drawer button[data-se-view].is-active,
    .syncetc-drawer button[data-se-view].active{background:#12365a!important;color:#fff!important;border-color:#12365a!important}
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
    .syncetc-drawer .se-actions{position:static!important;bottom:auto!important;background:transparent!important;padding:12px 0 0!important;border-top:1px solid rgba(18,54,90,.10)!important}
    .syncetc-drawer .se-status{margin-top:10px!important;color:#304d73!important;font-size:12px!important;font-weight:900!important;min-height:18px!important}
    .syncetc-drawer .se-status.warn{color:#8f2424!important}
    .syncetc-drawer .se-status.good{color:#247245!important}
  `);}
function snapshot(){return window.SyncEtc.SecurityContext&&window.SyncEtc.SecurityContext.getSnapshot?window.SyncEtc.SecurityContext.getSnapshot():{};}
function isPlatformAdmin(){return !!(window.SyncEtc.SecurityContext&&window.SyncEtc.SecurityContext.isPlatformAdmin&&window.SyncEtc.SecurityContext.isPlatformAdmin());}

function installHardButtonLayoutStyles(){
  if(document.getElementById("syncetc-site-editor-hard-button-layout"))return;
  var style=document.createElement("style");
  style.id="syncetc-site-editor-hard-button-layout";
  style.textContent=[
    ".syncetc-drawer [data-se-editor] .se-viewas{",
    "display:grid!important;",
    "grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;",
    "gap:8px!important;",
    "margin:12px 0 14px!important;",
    "align-items:stretch!important;",
    "}",
    ".syncetc-drawer [data-se-editor] .se-viewas > button,",
    ".syncetc-drawer [data-se-editor] button.se-view{",
    "display:flex!important;",
    "width:100%!important;",
    "min-width:0!important;",
    "max-width:none!important;",
    "height:auto!important;",
    "min-height:44px!important;",
    "align-items:center!important;",
    "justify-content:center!important;",
    "text-align:center!important;",
    "white-space:normal!important;",
    "box-sizing:border-box!important;",
    "}",
    ".syncetc-drawer [data-se-editor] .se-actions{",
    "position:static!important;",
    "inset:auto!important;",
    "top:auto!important;",
    "right:auto!important;",
    "bottom:auto!important;",
    "left:auto!important;",
    "z-index:auto!important;",
    "display:grid!important;",
    "grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;",
    "gap:10px!important;",
    "align-items:stretch!important;",
    "background:transparent!important;",
    "padding:12px 0 0!important;",
    "margin:14px 0 0!important;",
    "border-top:1px solid rgba(18,54,90,.10)!important;",
    "}",
    ".syncetc-drawer [data-se-editor] .se-actions > button{",
    "display:flex!important;",
    "width:100%!important;",
    "min-width:0!important;",
    "max-width:none!important;",
    "align-items:center!important;",
    "justify-content:center!important;",
    "text-align:center!important;",
    "box-sizing:border-box!important;",
    "}"
  ].join("");
  document.head.appendChild(style);
}

function render(ctx){installStyles();installHardButtonLayoutStyles();if(!isPlatformAdmin())return"";var c=ctx.customer||{}, local=ctx.local||{}, content=c.content||{}, title=local.calendarTitle||nested(content,"calendar.title","Calendar"), intro=local.calendarIntro||nested(content,"calendar.intro","Upcoming meetings, fly-outs, work sessions, and other events."), preset=local.stylePresetKey||c.stylePresetKey||"classic-aviation", layoutPreset=local.layoutPresetKey||nested(c,"layout.preset","standard-layout"), presets=c.availablePresets||window.SyncEtc.Components.CustomerStyle.fallbackPresets||[], layoutPresets=c.availableLayoutPresets||window.SyncEtc.Components.CustomerStyle.fallbackLayoutPresets||[], customerKey=ctx.customerKey||c.customer_key||"demo_flying_club", viewAs=ctx.viewAs||(ctx.audience==="admin"?"admin":(ctx.audience==="member"?"member":"public")), open=ctx.siteEditorOpen===true, sec=snapshot(), actor=sec.actor_email||"signed-in user", platformRole=sec.platform_role||"platform admin", activeCustomerRole=sec.active_customer_role||"n/a";function selected(a,b){return clean(a)===clean(b)?"selected":"";}function active(v){return clean(v)===clean(viewAs)?"is-active":"";}return `<section class="se-workbench"><div class="se-editor ${open?"is-open":""}" data-se-editor><div class="se-editor-top"><div class="se-editor-title"><h2>SyncEtc Site Editor</h2><span class="se-pill">Calendar · View as <span data-se-view-label>${U().esc(viewAs)}</span></span></div><div class="se-top-actions"><div class="se-top-identity"><span>${U().esc(actor)}</span><span>${U().esc(platformRole)}</span></div><button class="se-top-signout" type="button" data-se-signout>Not you? Sign out</button><button class="se-toggle" type="button" data-se-toggle>${open?"Close Site Editor":"Open Site Editor"}</button></div></div><div class="se-editor-body"><div class="se-grid"><div class="se-panel"><h3>Platform Site Controls</h3><p class="se-help">Platform-only customer-wide style and layout controls. Changes here affect this customer site and must be saved before navigating away.</p><div class="se-row"><label class="se-control"><span>Customer</span><select data-se-customer><option value="demo_flying_club" ${selected("demo_flying_club",customerKey)}>Demo Flying Club</option><option value="150th_aero" ${selected("150th_aero",customerKey)}>150th Aero Flying Club</option></select><small>Switches customer preview. Unsaved changes are protected.</small></label><label class="se-control"><span>Customer-wide Style Preset</span><select data-se-local="stylePresetKey">${presets.map(function(p){return '<option value="'+U().esc(p.preset_key)+'" '+selected(p.preset_key,preset)+'>'+U().esc(p.preset_name||p.preset_key)+'</option>';}).join("")}</select><small>Applies locally for preview. Use Save Site Settings to persist.</small></label></div><div class="se-row"><label class="se-control"><span>Customer-wide Layout Preset</span><select data-se-local="layoutPresetKey">${layoutPresets.map(function(p){var key=p.layout_key||p.preset_key||p.key||"standard-layout";return '<option value="'+U().esc(key)+'" '+selected(key,layoutPreset)+'>'+U().esc(p.layout_name||p.preset_name||key)+'</option>';}).join("")}</select><small>Supabase-backed site-wide layout preset. Not page-specific.</small></label><label class="se-control"><span>Preset Builder</span><input value="Deferred: future platform preset builder" disabled><small>Separate page later. Not part of day-to-day customer settings.</small></label></div><div class="se-viewas"><button type="button" class="se-view ${active("public")}" data-se-view="public">View as Public</button><button type="button" class="se-view ${active("member")}" data-se-view="member">View as Member</button><button type="button" class="se-view ${active("admin")}" data-se-view="admin">View as Customer Admin</button><button type="button" class="se-view ${active("platform")}" data-se-view="platform">View as Platform Admin</button></div><div class="se-actions"><button type="button" data-se-save>Save Site Settings</button><button type="button" class="secondary" data-se-reset>Reset local changes</button></div><div class="se-status" data-se-status></div></div></div></div></div></section>`;}
function setText(sel,val){document.querySelectorAll(sel).forEach(function(el){el.textContent=val;});}
function save(api,root){var token=getToken();var status=root.querySelector("[data-se-status]");if(!token){markStatus(root,"Save failed: sign in required.","warn");return;}markStatus(root,"Saving...","");fetch(ACTION_URL,{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({action:"save_customer_site_settings",payload:api.getSavePayload()})}).then(function(r){return r.json().catch(function(){return null;}).then(function(body){if(!r.ok||!body||body.ok===false)throw new Error((body&&body.error)||"Save failed");return body;});}).then(function(){markClean(root,"Saved site settings.");}).catch(function(err){markStatus(root,"Save failed: "+(err.message||err),"warn");});}
function signOutAndReload(){
  if(!confirmDiscardUnsaved("sign out"))return;
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
function bind(api,root){
  installHardButtonLayoutStyles();
  currentApi=api;
  currentRoot=root&&root.querySelector?root.querySelector("[data-se-editor]"):null;
  var editor=root.querySelector("[data-se-editor]");
  if(!editor||editor.getAttribute("data-se-bound")==="1")return;
  editor.setAttribute("data-se-bound","1");
  ensureBeforeUnloadProtection();
  ensureDirtyGuard();

  editor.addEventListener("click",function(e){
    var t=e.target;
    if(t.closest("[data-se-toggle]")){
      var open=!editor.classList.contains("is-open");
      editor.classList.toggle("is-open",open);
      api.setEditorOpen(open);
      t.textContent=open?"Close Site Editor":"Open Site Editor";
      return;
    }

    var view=t.closest("[data-se-view]");
    if(view){
      var v=view.getAttribute("data-se-view");
      var drawer=view.closest(".syncetc-drawer");
      var drawerBody=drawer?drawer.querySelector(".syncetc-drawer-body"):null;
      var keepTop=drawer?drawer.scrollTop||0:0;
      var keepBodyTop=drawerBody?drawerBody.scrollTop||0:0;
      var keepX=window.scrollX||0, keepY=window.scrollY||0;
      editor.querySelectorAll("[data-se-view]").forEach(function(b){b.classList.toggle("is-active",b===view);b.classList.toggle("active",b===view);});
      api.setViewAs(v);
      setText("[data-se-view-label]",v);
      try{document.dispatchEvent(new CustomEvent("syncetc:view-as-hard-change",{detail:{viewAs:v}}));}catch(err){}
      if(api.renderAdminLayerOnly)api.renderAdminLayerOnly();
      setTimeout(function(){
        try{
          var freshDrawer=document.querySelector(".syncetc-drawer");
          var freshBody=freshDrawer?freshDrawer.querySelector(".syncetc-drawer-body"):null;
          if(freshDrawer)freshDrawer.scrollTop=keepTop;
          if(freshBody)freshBody.scrollTop=keepBodyTop;
          var freshBtn=freshDrawer?freshDrawer.querySelector('[data-se-view="'+CSS.escape(v)+'"]'):null;
          if(freshBtn&&freshBtn.focus)freshBtn.focus({preventScroll:true});
          window.scrollTo(keepX,keepY);
        }catch(err){}
      },0);
      return;
    }

    if(t.closest("[data-se-signout]")){signOutAndReload();return;}
    if(t.closest("[data-se-save]")){save(api,editor);return;}

    if(t.closest("[data-se-reset]")){
      if(siteEditorDirty&&!window.confirm("Reset local Site Editor changes?"))return;
      discardSiteEditorPreview("reset local changes");
      if(api.render)api.render(api.getState&&api.getState().lastPageHtml?api.getState().lastPageHtml:"");
      else window.location.reload();
      return;
    }
  });

  editor.addEventListener("change",function(e){
    var t=e.target;

    if(t.matches("[data-se-customer]")){
      if(siteEditorDirty&&!confirmDiscardUnsaved("switch customer")){
        if(lastCustomerSelectValue)t.value=lastCustomerSelectValue;
        return;
      }
      lastCustomerSelectValue=t.value;
      api.setCustomerKey(t.value);
      api.loadCustomer().then(function(){
        window.SyncEtc.Components.Utils.dispatch("syncetc:customer-hard-change",{customerKey:t.value});
        markStatus(editor,"Customer preview loaded.","");
      });
      return;
    }

    if(t.matches("[data-se-local]")){
      handleLocal(api,editor,t);
      markDirty(editor,"Unsaved site setting changes. Save before navigating away.");
    }
  });

  editor.addEventListener("input",function(e){
    var t=e.target;
    if(t.matches("[data-se-local]")){
      handleLocal(api,editor,t);
      markDirty(editor,"Unsaved site setting changes. Save before navigating away.");
    }
  });
}

function findLayoutPresetForPreview(customerConfig,key){
  var list=(customerConfig&&customerConfig.availableLayoutPresets)||[];
  if((!list||!list.length)&&window.SyncEtc&&window.SyncEtc.Components&&window.SyncEtc.Components.CustomerStyle){
    list=window.SyncEtc.Components.CustomerStyle.fallbackLayoutPresets||[];
  }
  key=clean(key);
  for(var i=0;i<list.length;i++){
    var item=list[i]||{};
    var k=clean(item.layout_key||item.preset_key||item.key);
    if(k===key)return item;
  }
  return list&&list.length?list[0]:{layout_key:"standard-layout",layout_name:"Standard Layout",layout:{preset:"standard-layout"}};
}

function previewLayoutPreset(api,value){
  try{
    var c=api.customer?api.customer():{};
    var item=findLayoutPresetForPreview(c,value);
    var layout=Object.assign({},item.layout||{});
    layout.preset=value||layout.preset||item.layout_key||"standard-layout";
    if(window.SyncEtc&&window.SyncEtc.Components&&window.SyncEtc.Components.CustomerStyle&&window.SyncEtc.Components.CustomerStyle.applyLayoutVars){
      window.SyncEtc.Components.CustomerStyle.applyLayoutVars(document.getElementById("syncetc-component-shell"),layout);
    }
  }catch(err){}
}

function handleLocal(api,editor,t){
  var field=t.getAttribute("data-se-local"),value=t.value;
  api.setLocal(field,value);

  if(field==="stylePresetKey"){
    var c=api.customer();
    var theme=window.SyncEtc.Components.CustomerStyle.themeForPreset(c,value);
    window.SyncEtc.Components.CustomerStyle.applyThemeVars(document.getElementById("syncetc-component-shell"),theme);
    markStatus(editor,"Unsaved style preset change. Click Save Site Settings to persist.","warn");
  }

  if(field==="layoutPresetKey"){
    previewLayoutPreset(api,value);
    markStatus(editor,"Unsaved layout preset change previewing on the page. Click Save Site Settings to persist.","warn");
  }
}
window.SyncEtc.Components.MasterControls={version:VERSION,render:render,bind:bind,installStyles:installStyles};
})();
/* COMPONENT-master-controls-v1.js - END */
