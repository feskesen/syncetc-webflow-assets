/* COMPONENT-customer-settings-v6.js - BEGIN */
(function(){
"use strict";
window.SyncEtc=window.SyncEtc||{};
window.SyncEtc.Components=window.SyncEtc.Components||{};
var VERSION="COMPONENT-customer-settings-v6";

function U(){return window.SyncEtc.Components.Utils;}
function clean(v){return v==null?"":String(v).trim();}
function nested(o,path,fallback){try{return path.split(".").reduce(function(a,k){return a&&a[k];},o)||fallback||"";}catch(e){return fallback||"";}}

function installStyles(){
  U().installStyle("COMPONENT-customer-settings-v6-style",`
    .se-customer-settings{padding:0;margin:0}
    .se-customer-settings-shell{background:transparent;border:0;border-radius:0;box-shadow:none;overflow:visible}
    .se-customer-settings-top{display:none}
    .se-customer-settings-body{display:block;padding:0;background:transparent}
    .se-customer-settings-note{margin:0 0 14px;color:#64748b;font-size:12px;line-height:1.45;font-weight:700}
    .se-customer-settings-row{display:grid;grid-template-columns:1fr;gap:10px;margin-bottom:10px}
    .se-customer-settings-control{display:block}
    .se-customer-settings-control span{display:block;margin-bottom:5px;color:#12365a;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.03em}
    .se-customer-settings-control input,.se-customer-settings-control textarea{width:100%;border:1px solid rgba(18,54,90,.20);border-radius:11px;padding:9px 10px;font:inherit;font-size:13px;background:#fff;color:#102034}
    .se-customer-settings-control textarea{min-height:78px;resize:vertical}
    .se-customer-settings-control small{display:block;margin-top:4px;color:#64748b;font-size:11px}
    .se-customer-settings-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
    .se-customer-settings-actions button{border:1px solid rgba(18,54,90,.20);border-radius:999px;padding:9px 11px;background:#12365a;color:#fff;font-weight:900;font-size:12px;cursor:pointer}
    .se-customer-settings-actions button.secondary{background:#fff;color:#12365a}
    .se-customer-settings-actions button:disabled{opacity:.55;cursor:not-allowed}
    .se-customer-settings-status{margin-top:9px;min-height:18px;color:#304d73;font-size:12px;font-weight:900}
    .se-customer-settings-status.warn{color:#8f2424}.se-customer-settings-status.good{color:#247245}
  `);
}

function defaultCopy(){
  return {
    calendarTitle:"Calendar",
    calendarIntro:"Upcoming meetings, fly-outs, work sessions, and other events."
  };
}

function canRender(ctx){
  var key=(ctx&&ctx.customerKey)||((ctx&&ctx.customer&&ctx.customer.customer_key)||"");
  return !!(window.SyncEtc.SecurityContext&&window.SyncEtc.SecurityContext.isCustomerAdmin&&window.SyncEtc.SecurityContext.isCustomerAdmin(key));
}
function render(ctx){
  installStyles();
  if(!canRender(ctx))return "";
  var c=ctx.customer||{}, local=ctx.local||{}, content=c.content||{}, defaults=defaultCopy();
  var title=local.calendarTitle||nested(content,"calendar.title",defaults.calendarTitle);
  var intro=local.calendarIntro||nested(content,"calendar.intro",defaults.calendarIntro);
  var sec=window.SyncEtc.SecurityContext&&window.SyncEtc.SecurityContext.getSnapshot?window.SyncEtc.SecurityContext.getSnapshot():{};
  var actor=sec.actor_email||"signed-in user", customerRole=sec.active_customer_role||"customer admin", platformRole=sec.platform_role||"", customerName=c.customerName||c.shortName||ctx.customerKey||"Customer";
  var open=ctx.customerSettingsOpen===true;
  return `<section class="se-customer-settings"><div class="se-customer-settings-shell ${open?"is-open":""}" data-se-customer-settings>
    <div class="se-customer-settings-top">
      <div class="se-customer-settings-title"><h2>${U().esc(customerName)} · Calendar Page Settings</h2></div>
      <div class="se-cs-top-actions"><div class="se-cs-top-identity"><span>${U().esc(actor)}</span><span>${U().esc(customerRole)}</span></div><button type="button" class="se-cs-top-signout" data-cs-signout>Not you? Sign out</button><button type="button" class="se-customer-settings-toggle" data-cs-toggle>${open?"Close Customer Settings":"Open Customer Settings"}</button></div>
    </div>
    <div class="se-customer-settings-body">
      <p class="se-customer-settings-note">Customer-owned copy controls. These values override SyncEtc defaults for this customer. If blank, pages can fall back to the platform default.</p>
      <div class="se-customer-settings-row">
        <label class="se-customer-settings-control"><span>Calendar Hero Title</span><input data-cs-local="calendarTitle" value="${U().esc(title)}"><small>Default: ${U().esc(defaults.calendarTitle)}</small></label>
        <label class="se-customer-settings-control"><span>Calendar Intro</span><textarea data-cs-local="calendarIntro">${U().esc(intro)}</textarea><small>Default: ${U().esc(defaults.calendarIntro)}</small></label>
      </div>
      <div class="se-customer-settings-actions">
        <button type="button" data-cs-save>Save Customer Settings</button>
        <button type="button" class="secondary" data-cs-restore>Restore SyncEtc Defaults</button>
        <button type="button" class="secondary" data-cs-undo disabled>Undo Restore</button>
        <button type="button" class="secondary" data-cs-clear>Clear Copy Fields</button>
      </div>
      <div class="se-customer-settings-status" data-cs-status></div>
    </div>
  </div></section>`;
}

function setText(sel,val){document.querySelectorAll(sel).forEach(function(el){el.textContent=val;});}
function setValue(root,field,value){var el=root.querySelector('[data-cs-local="'+field+'"]');if(el)el.value=value;}
function updateLive(field,value){
  if(field==="calendarTitle"){setText("[data-cv-live-title]",value||"Calendar");}
  if(field==="calendarIntro"){setText("[data-cv-live-intro]",value||"Upcoming meetings, fly-outs, work sessions, and other events.");}
}
function setStatus(root,msg,cls){
  var el=root.querySelector("[data-cs-status]");
  if(!el)return;
  el.textContent=msg||"";
  el.className="se-customer-settings-status"+(cls?" "+cls:"");
}
function tokenFromWindow(){
  try{
    var s=window.SyncEtc.AuthContext&&window.SyncEtc.AuthContext.getSnapshot?window.SyncEtc.AuthContext.getSnapshot():{};
    var stack=[s];
    while(stack.length){
      var o=stack.pop();
      if(!o)continue;
      if(typeof o==="string"&&o.split(".").length===3&&o.length>80)return o;
      if(typeof o==="object"){
        if(o.access_token)return o.access_token;
        Object.keys(o).forEach(function(k){stack.push(o[k]);});
      }
    }
  }catch(e){}
  try{
    for(var i=0;i<localStorage.length;i++){
      var v=localStorage.getItem(localStorage.key(i));
      if(!v)continue;
      var parsed;
      try{parsed=JSON.parse(v);}catch(e){continue;}
      var stack2=[parsed];
      while(stack2.length){
        var o2=stack2.pop();
        if(!o2)continue;
        if(typeof o2==="object"){
          if(o2.access_token)return o2.access_token;
          Object.keys(o2).forEach(function(k){stack2.push(o2[k]);});
        }
      }
    }
  }catch(e){}
  return "";
}
function buildPayload(api){
  var c=api.customer(), content=c.content||{}, local=api.getState().local||{};
  return {
    customer_key:api.getState().customerKey,
    style_preset_key:local.stylePresetKey||c.stylePresetKey||"classic-aviation",
    theme_overrides:{},
    brand_overrides:{},
    content_overrides:Object.assign({},content,{calendar:Object.assign({},content.calendar||{},{title:local.calendarTitle||"",intro:local.calendarIntro||""})}),
    module_overrides:{layout:{preset:local.layoutPresetKey||nested(c,"layout.preset","standard-layout")}},
    enabled_modules:c.modules||{},
    is_enabled:true
  };
}
function save(api,root){
  var token=tokenFromWindow();
  if(!token){setStatus(root,"Save failed: sign in required.","warn");return;}
  setStatus(root,"Saving...","");
  fetch("https://ocdaohkiwonjmirqkjww.supabase.co/functions/v1/syncetc-site-settings-action",{
    method:"POST",
    headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},
    body:JSON.stringify({action:"save_customer_page_settings",payload:buildPayload(api)})
  }).then(function(r){return r.json().catch(function(){return null;}).then(function(body){if(!r.ok||!body||body.ok===false)throw new Error((body&&body.error)||"Save failed");return body;});})
  .then(function(){setStatus(root,"Saved customer page settings.","good");})
  .catch(function(err){setStatus(root,"Save failed: "+(err.message||err),"warn");});
}
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
function bind(api,root){
  var box=root.querySelector("[data-se-customer-settings]");
  if(!box||box.getAttribute("data-cs-bound")==="1")return;
  box.setAttribute("data-cs-bound","1");
  var restoreBackup=null;
  box.addEventListener("click",function(e){
    if(e.target.closest("[data-cs-toggle]")){
      var open=!box.classList.contains("is-open");
      box.classList.toggle("is-open",open);
      api.setCustomerSettingsOpen&&api.setCustomerSettingsOpen(open);
      e.target.textContent=open?"Close Customer Settings":"Open Customer Settings";
      return;
    }
    if(e.target.closest("[data-cs-signout]")){signOutAndReload();return;}if(e.target.closest("[data-cs-save]")){save(api,box);return;}
    if(e.target.closest("[data-cs-restore]")){
      var st=api.getState();
      restoreBackup={calendarTitle:st.local.calendarTitle,calendarIntro:st.local.calendarIntro};
      var d=defaultCopy();
      api.setLocal("calendarTitle",d.calendarTitle);
      api.setLocal("calendarIntro",d.calendarIntro);
      setValue(box,"calendarTitle",d.calendarTitle);setValue(box,"calendarIntro",d.calendarIntro);
      updateLive("calendarTitle",d.calendarTitle);updateLive("calendarIntro",d.calendarIntro);
      var undo=box.querySelector("[data-cs-undo]");if(undo)undo.disabled=false;
      setStatus(box,"Defaults restored locally. Save to persist.","");
      return;
    }
    if(e.target.closest("[data-cs-undo]")){
      if(!restoreBackup)return;
      api.setLocal("calendarTitle",restoreBackup.calendarTitle||"");
      api.setLocal("calendarIntro",restoreBackup.calendarIntro||"");
      setValue(box,"calendarTitle",restoreBackup.calendarTitle||"");
      setValue(box,"calendarIntro",restoreBackup.calendarIntro||"");
      updateLive("calendarTitle",restoreBackup.calendarTitle||"Calendar");
      updateLive("calendarIntro",restoreBackup.calendarIntro||"Upcoming meetings, fly-outs, work sessions, and other events.");
      e.target.disabled=true;
      setStatus(box,"Restore undone locally. Save to persist.","");
      return;
    }
    if(e.target.closest("[data-cs-clear]")){
      api.setLocal("calendarTitle","");
      api.setLocal("calendarIntro","");
      setValue(box,"calendarTitle","");
      setValue(box,"calendarIntro","");
      updateLive("calendarTitle","Calendar");
      updateLive("calendarIntro","Upcoming meetings, fly-outs, work sessions, and other events.");
      setStatus(box,"Copy fields cleared locally. Save to persist.","");
      return;
    }
  });
  box.addEventListener("input",function(e){
    var field=e.target&&e.target.getAttribute&&e.target.getAttribute("data-cs-local");
    if(!field)return;
    api.setLocal(field,e.target.value);
    updateLive(field,e.target.value);
  });
}
window.SyncEtc.Components.CustomerSettings={version:VERSION,render:render,bind:bind,installStyles:installStyles,canRender:canRender};
})();
/* COMPONENT-customer-settings-v6.js - END */
