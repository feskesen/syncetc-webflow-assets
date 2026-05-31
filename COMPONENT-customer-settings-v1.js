/* COMPONENT-customer-settings-v1.js | customer-owned Supabase page settings | Generated: 2026-05-31 16:09:55 UTC */
(function(){
"use strict";
window.SyncEtc=window.SyncEtc||{};
window.SyncEtc.Components=window.SyncEtc.Components||{};
var VERSION="COMPONENT-customer-settings-v1";
var ACTION_URL="https://ocdaohkiwonjmirqkjww.supabase.co/functions/v1/syncetc-site-settings-action";

var registry={};
var hasUnsavedCustomerSettings=false;
var beforeUnloadInstalled=false;
var dirtyGuardInstalled=false;
var lastCustomerSelectValue="";

function ensureBeforeUnloadProtection(){
  if(beforeUnloadInstalled)return;
  beforeUnloadInstalled=true;
  window.addEventListener("beforeunload",function(e){
    if(!hasUnsavedCustomerSettings)return;
    e.preventDefault();
    e.returnValue="";
    return "";
  });
}

function markDirty(){
  hasUnsavedCustomerSettings=true;
  ensureBeforeUnloadProtection();
  ensureDirtyActionGuard();
}

function markClean(){
  hasUnsavedCustomerSettings=false;
}

function confirmDiscardUnsaved(reason){
  if(!hasUnsavedCustomerSettings)return true;
  var msg="You have unsaved customer setting changes. Continue and discard those changes?";
  if(reason)msg+="\n\nAction: "+reason;
  var ok=window.confirm(msg);
  if(ok)markClean();
  return ok;
}

function shouldGuardLink(a){
  if(!a)return false;
  var href=a.getAttribute("href")||"";
  if(!href||href==="#"||href.indexOf("javascript:")===0)return false;
  if(a.closest("[data-se-customer-settings]"))return false;
  return true;
}

function ensureDirtyActionGuard(){
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
    if(!hasUnsavedCustomerSettings)return;
    var t=e.target;
    if(!t||!t.closest)return;

    if(t.closest("[data-se-drawer-close]"))return;

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
    if(!hasUnsavedCustomerSettings)return;
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


function U(){return window.SyncEtc.Components.Utils;}
function esc(v){return U().esc(v);}
function clean(v){return v==null?"":String(v).trim();}
function nested(o,path,fallback){try{return path.split(".").reduce(function(a,k){return a&&a[k];},o)||fallback||"";}catch(e){return fallback||"";}}
function pageKeyFromCtx(ctx){return (ctx&&ctx.pageKey)||"calendar";}
function customerPageSettingsRow(ctx,key){
  try{
    var c=ctx&&ctx.customer?ctx.customer:{};
    var byKey=c.customerPageSettingsByKey||{};
    if(byKey&&byKey[key])return byKey[key];
    var rows=c.customerPageSettings||[];
    for(var i=0;i<rows.length;i++){
      if(clean(rows[i]&&rows[i].page_key)===clean(key))return rows[i];
    }
  }catch(e){}
  return null;
}
function schemaFor(ctx){
  var key=pageKeyFromCtx(ctx);
  var base=registry[key]||registry.default||defaultSchema(key);
  var row=customerPageSettingsRow(ctx,key);
  if(!row)return base;
  var fields=Array.isArray(row.fields_json)?row.fields_json:base.fields;
  return Object.assign({},base,{
    pageKey:key,
    pageLabel:row.page_label||base.pageLabel,
    note:row.note||base.note,
    fields:fields,
    source_template_key:row.source_template_key||base.source_template_key,
    getDefaults:function(){return row.settings_json||{};}
  });
}
function defaultSchema(key){
  var label=(key||"Page").replace(/[-_]/g," ").replace(/\b\w/g,function(m){return m.toUpperCase();});
  return {
    pageKey:key,
    pageLabel:label,
    note:"Customer-owned page copy controls. Click a default value under any field to restore that field only. Delete all text to hide that field on pages that support hiding. Use Restore SyncEtc Defaults to restore all fields on this page.",
    fields:[
      {key:key+".heroTitle",label:label+" Hero Title",type:"text",defaultValue:label},
      {key:key+".heroIntro",label:label+" Intro",type:"textarea",defaultValue:""}
    ]
  };
}
function registerPage(schema){
  if(!schema||!schema.pageKey)return;
  registry[schema.pageKey]=schema;
}
function getRegisteredPage(pageKey){return registry[pageKey]||null;}

function installStyles(){
  U().installStyle("COMPONENT-customer-settings-v1-style",`
    .se-customer-settings{padding:0;margin:0}
    .se-customer-settings-shell{background:transparent;border:0;border-radius:0;box-shadow:none;overflow:visible}
    .se-customer-settings-top{display:none}
    .se-customer-settings-body{display:block;padding:0;background:transparent}
    .se-customer-settings-note{margin:0 0 14px;color:#64748b;font-size:12px;line-height:1.45;font-weight:700}
    .se-customer-settings-section{margin:16px 0 8px;padding-top:12px;border-top:1px solid rgba(18,54,90,.12);color:#12365a;font-size:12px;font-weight:950;text-transform:uppercase;letter-spacing:.04em}
    .se-customer-settings-section:first-of-type{margin-top:0;padding-top:0;border-top:0}
    .se-customer-settings-row{display:grid;grid-template-columns:1fr;gap:10px;margin-bottom:10px}
    .se-customer-settings-control{display:block}
    .se-customer-settings-control span{display:block;margin-bottom:5px;color:#12365a;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.03em}
    .se-customer-settings-control input,.se-customer-settings-control textarea,.se-customer-settings-control select{width:100%;border:1px solid rgba(18,54,90,.20);border-radius:11px;padding:9px 10px;font:inherit;font-size:13px;background:#fff;color:#102034;box-sizing:border-box}
    .se-customer-settings-control textarea{min-height:78px;resize:vertical}
    .se-customer-settings-control small{display:block;margin-top:4px;color:#64748b;font-size:11px;line-height:1.35}
    .se-customer-settings-control.is-deleted input,.se-customer-settings-control.is-deleted textarea{background:#fffaf0;border-style:dashed}
    .se-cs-default-link{display:inline;border:0;background:transparent;color:#12365a!important;text-decoration:underline;text-underline-offset:2px;font:inherit;font-weight:900;cursor:pointer;padding:0;line-height:inherit}
    .se-customer-settings-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
    .se-customer-settings-actions button,.se-manager-link{border:1px solid rgba(18,54,90,.20);border-radius:999px;padding:9px 11px;background:#12365a;color:#fff!important;font-weight:900;font-size:12px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;justify-content:center}
    .se-customer-settings-actions button.secondary,.se-manager-link.secondary{background:#fff;color:#12365a!important}
    .se-customer-settings-actions button:disabled{opacity:.55;cursor:not-allowed}
    .se-customer-settings-status{margin-top:9px;min-height:18px;color:#304d73;font-size:12px;font-weight:900}
    .se-customer-settings-status.warn{color:#8f2424}.se-customer-settings-status.good{color:#247245}
  `);
}

function canRender(ctx){
  var key=(ctx&&ctx.customerKey)||((ctx&&ctx.customer&&ctx.customer.customer_key)||"");
  return !!(window.SyncEtc.SecurityContext&&window.SyncEtc.SecurityContext.isCustomerAdmin&&window.SyncEtc.SecurityContext.isCustomerAdmin(key));
}
function fieldDefault(field,defaults){
  if(defaults&&Object.prototype.hasOwnProperty.call(defaults,field.key))return defaults[field.key];
  if(Object.prototype.hasOwnProperty.call(field,"defaultValue"))return field.defaultValue;
  return "";
}
function fieldValue(field,local,defaults){
  if(local&&Object.prototype.hasOwnProperty.call(local,field.key))return local[field.key];
  return fieldDefault(field,defaults);
}
function defaultsForSchema(schema,ctx,api){
  try{
    if(schema&&typeof schema.getDefaults==="function")return schema.getDefaults(ctx,api)||{};
  }catch(e){}
  var out={};
  (schema.fields||[]).forEach(function(f){out[f.key]=fieldDefault(f,{});});
  return out;
}
function renderField(field,value,def){
  var tag=field.type==="textarea"?"textarea":"input";
  var isBlank=clean(value)==="";
  var help='<small>Default: <button type="button" class="se-cs-default-link" data-cs-restore-one="'+esc(field.key)+'">'+esc(def||"blank")+'</button></small>';
  if(field.help)help+='<small>'+esc(field.help)+'</small>';
  var placeholder=isBlank?' placeholder="Deleted — type here to restore custom text"':'';
  if(tag==="textarea"){
    return '<label class="se-customer-settings-control '+(isBlank?'is-deleted':'')+'"><span>'+esc(field.label||field.key)+'</span><textarea data-cs-local="'+esc(field.key)+'"'+placeholder+'>'+esc(value)+'</textarea>'+help+'</label>';
  }
  return '<label class="se-customer-settings-control '+(isBlank?'is-deleted':'')+'"><span>'+esc(field.label||field.key)+'</span><input data-cs-local="'+esc(field.key)+'" value="'+esc(value)+'"'+placeholder+'>'+help+'</label>';
}
function render(ctx){
  installStyles();
  if(!canRender(ctx))return "";
  var schema=schemaFor(ctx), local=ctx.local||{}, defaults=defaultsForSchema(schema,ctx,null);
  var sec=window.SyncEtc.SecurityContext&&window.SyncEtc.SecurityContext.getSnapshot?window.SyncEtc.SecurityContext.getSnapshot():{};
  var customerName=(ctx.customer&&ctx.customer.customerName)||(ctx.customer&&ctx.customer.shortName)||ctx.customerKey||"Customer";
  var open=ctx.customerSettingsOpen===true;
  var currentSection="";
  var fieldHtml=(schema.fields||[]).map(function(field){
    var section=field.section||"";
    var prefix="";
    if(section!==currentSection){
      currentSection=section;
      if(section)prefix='<div class="se-customer-settings-section">'+esc(section)+'</div>';
    }
    return prefix+renderField(field,fieldValue(field,local,defaults),fieldDefault(field,defaults));
  }).join("");
  var manager="";
  if(schema.managerLink&&schema.managerLink.label){
    var href=schema.managerLink.href||"#";
    var pageAttr=schema.managerLink.pageKey?' data-se-page-link="'+esc(schema.managerLink.pageKey)+'"':"";
    manager='<a class="se-manager-link secondary" href="'+esc(href)+'"'+pageAttr+'>'+esc(schema.managerLink.label)+'</a>';
  }
  return `<section class="se-customer-settings"><div class="se-customer-settings-shell ${open?"is-open":""}" data-se-customer-settings data-cs-page-key="${esc(schema.pageKey||pageKeyFromCtx(ctx))}">
    <div class="se-customer-settings-top"></div>
    <div class="se-customer-settings-body">
      <p class="se-customer-settings-note">${esc(schema.note||"Customer-owned page settings.")}</p>
      <div class="se-customer-settings-row">${fieldHtml}</div>
      <div class="se-customer-settings-actions">
        <button type="button" data-cs-save>Save Customer Settings</button>
        <button type="button" class="secondary" data-cs-restore>Restore SyncEtc Defaults</button>
        <button type="button" class="secondary" data-cs-undo disabled>Undo Restore</button>
        <button type="button" class="secondary" data-cs-clear>Clear Copy Fields</button>
        ${manager}
      </div>
      <div class="se-customer-settings-status" data-cs-status></div>
    </div>
  </div></section>`;
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
      var parsed; try{parsed=JSON.parse(v);}catch(e){continue;}
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
function currentValues(api,schema){
  var local=(api.getState().local)||{}, ctx={customer:api.customer(),customerKey:api.getState().customerKey,pageKey:schema.pageKey,local:local};
  var defaults=defaultsForSchema(schema,ctx,api), values={};
  (schema.fields||[]).forEach(function(f){values[f.key]=fieldValue(f,local,defaults);});
  return values;
}
function buildPayload(api,schema){
  var values=currentValues(api,schema);
  var state=api.getState?api.getState():{};
  var pageKey=schema.pageKey||state.pageKey||"page";
  return {
    customer_key:state.customerKey,
    page_key:pageKey,
    page_label:schema.pageLabel||pageKey,
    note:schema.note||"",
    settings_json:values,
    fields_json:schema.fields||[],
    source_template_key:schema.source_template_key||null,
    is_enabled:true
  };
}
function save(api,root,schema){
  var token=tokenFromWindow();
  if(!token){setStatus(root,"Save failed: sign in required.","warn");return;}
  setStatus(root,"Saving...","");
  fetch(ACTION_URL,{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({action:"save_customer_page_settings",payload:buildPayload(api,schema)})})
  .then(function(r){return r.json().catch(function(){return null;}).then(function(body){if(!r.ok||!body||body.ok===false)throw new Error((body&&body.error)||"Save failed");return body;});})
  .then(function(){markClean();setStatus(root,"Saved customer page settings.","good"); if(api.loadCustomer)api.loadCustomer().catch(function(){});})
  .catch(function(err){setStatus(root,"Save failed: "+(err.message||err),"warn");});
}
function setStatus(root,msg,cls){
  var el=root.querySelector("[data-cs-status]");
  if(!el)return;
  el.textContent=msg||"";
  el.className="se-customer-settings-status"+(cls?" "+cls:"");
}
function dispatchLocalChange(schema,api){
  try{document.dispatchEvent(new CustomEvent("syncetc:customer-settings-local-change",{detail:{pageKey:schema.pageKey,local:(api.getState&&api.getState().local)||{}}}));}catch(e){}
}
function setInput(root,key,value){
  var el=root.querySelector('[data-cs-local="'+CSS.escape(key)+'"]');
  if(el)el.value=value==null?"":String(value);
}
function bind(api,root){
  var box=root.querySelector("[data-se-customer-settings]");
  if(!box||box.getAttribute("data-cs-bound")==="1")return;
  box.setAttribute("data-cs-bound","1");
  ensureBeforeUnloadProtection();
  ensureDirtyActionGuard();

  var schema=schemaFor({pageKey:api.getState().pageKey,customerKey:api.getState().customerKey,customer:api.customer(),local:api.getState().local});
  var restoreBackup=null;
  var typingTimer=null;

  function schedulePreviewUpdate(){
    if(typingTimer)clearTimeout(typingTimer);
    typingTimer=setTimeout(function(){
      typingTimer=null;
      dispatchLocalChange(schema,api);
    },650);
  }

  function flushPreviewUpdate(){
    if(typingTimer){
      clearTimeout(typingTimer);
      typingTimer=null;
    }
    dispatchLocalChange(schema,api);
  }

  function captureBackup(){
    var local=api.getState().local||{};
    restoreBackup={};
    (schema.fields||[]).forEach(function(f){restoreBackup[f.key]=local[f.key];});
    var undo=box.querySelector("[data-cs-undo]");
    if(undo)undo.disabled=false;
  }

  function refreshControlClass(fieldKey,value){
    var el=box.querySelector('[data-cs-local="'+CSS.escape(fieldKey)+'"]');
    if(!el)return;
    var wrap=el.closest(".se-customer-settings-control");
    if(wrap)wrap.classList.toggle("is-deleted",clean(value)==="");
  }

  box.addEventListener("click",function(e){
    var restoreOne=e.target.closest("[data-cs-restore-one]");
    if(restoreOne){
      var key=restoreOne.getAttribute("data-cs-restore-one");
      var field=(schema.fields||[]).filter(function(f){return f.key===key;})[0];
      if(!field)return;
      captureBackup();
      var defaults=defaultsForSchema(schema,{customer:api.customer(),customerKey:api.getState().customerKey,pageKey:schema.pageKey,local:api.getState().local||{}},api);
      var v=fieldDefault(field,defaults);
      if(defaults&&Object.prototype.hasOwnProperty.call(defaults,field.key))v=defaults[field.key];
      api.setLocal(field.key,v);
      setInput(box,field.key,v);
      refreshControlClass(field.key,v);
      markDirty();
      flushPreviewUpdate();
      setStatus(box,"Default restored for this field. Save to persist.","");
      return;
    }

    if(e.target.closest("[data-cs-save]")){
      if(typingTimer){
        clearTimeout(typingTimer);
        typingTimer=null;
      }
      save(api,box,schema);
      return;
    }

    if(e.target.closest("[data-cs-restore]")){
      if(hasUnsavedCustomerSettings&&!window.confirm("Restore all defaults for this page? Unsaved custom edits will be replaced locally."))return;
      captureBackup();
      var local=api.getState().local||{};
      var defaults=defaultsForSchema(schema,{customer:api.customer(),customerKey:api.getState().customerKey,pageKey:schema.pageKey,local:local},api);
      (schema.fields||[]).forEach(function(f){
        var v=fieldDefault(f,defaults);
        if(defaults&&Object.prototype.hasOwnProperty.call(defaults,f.key))v=defaults[f.key];
        api.setLocal(f.key,v);
        setInput(box,f.key,v);
        refreshControlClass(f.key,v);
      });
      markDirty();
      flushPreviewUpdate();
      setStatus(box,"Defaults restored locally. Save to persist.","");
      return;
    }

    if(e.target.closest("[data-cs-undo]")){
      if(!restoreBackup)return;
      (schema.fields||[]).forEach(function(f){
        var v=restoreBackup[f.key]||"";
        api.setLocal(f.key,v);
        setInput(box,f.key,v);
        refreshControlClass(f.key,v);
      });
      e.target.disabled=true;
      markDirty();
      flushPreviewUpdate();
      setStatus(box,"Restore undone locally. Save to persist.","");
      return;
    }

    if(e.target.closest("[data-cs-clear]")){
      if(!window.confirm("Clear all editable copy fields for this page? Blank fields are treated as hidden/deleted on pages that support hiding."))return;
      captureBackup();
      (schema.fields||[]).forEach(function(f){
        api.setLocal(f.key,"");
        setInput(box,f.key,"");
        refreshControlClass(f.key,"");
      });
      markDirty();
      flushPreviewUpdate();
      setStatus(box,"Copy fields cleared locally. Save to persist.","");
      return;
    }
  });

  box.addEventListener("input",function(e){
    var field=e.target&&e.target.getAttribute&&e.target.getAttribute("data-cs-local");
    if(!field)return;
    api.setLocal(field,e.target.value);
    refreshControlClass(field,e.target.value);
    markDirty();
    schedulePreviewUpdate();
  });

  box.addEventListener("change",function(e){
    var field=e.target&&e.target.getAttribute&&e.target.getAttribute("data-cs-local");
    if(!field)return;
    api.setLocal(field,e.target.value);
    refreshControlClass(field,e.target.value);
    markDirty();
    flushPreviewUpdate();
  });

  box.addEventListener("blur",function(e){
    var field=e.target&&e.target.getAttribute&&e.target.getAttribute("data-cs-local");
    if(!field)return;
    api.setLocal(field,e.target.value);
    refreshControlClass(field,e.target.value);
    flushPreviewUpdate();
  },true);
}
window.SyncEtc.Components.CustomerSettings={version:VERSION,render:render,bind:bind,installStyles:installStyles,canRender:canRender,registerPage:registerPage,getRegisteredPage:getRegisteredPage};
})();
/* COMPONENT-customer-settings-v1.js - END | clean default restore + dirty guards */
