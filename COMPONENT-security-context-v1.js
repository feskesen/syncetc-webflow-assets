/* COMPONENT-security-context-v1.js - BEGIN */
(function(){
"use strict";
window.SyncEtc=window.SyncEtc||{};
window.SyncEtc.SecurityContext=window.SyncEtc.SecurityContext||{};
var VERSION="COMPONENT-security-context-v1";
var READ_URL="https://ocdaohkiwonjmirqkjww.supabase.co/functions/v1/syncetc-security-context-read";
var snapshot={ok:false,signed_in:false,loading:false,actor_email:"",customer_key:"",platform_role:"",is_syncetc_platform_admin:false,is_syncetc_super_admin:false,active_customer_role:"",active_customer_is_admin:false,customer_roles:[]};

function findAccessToken(obj,depth){
  if(!obj||depth>6)return "";
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
        var st=findAccessToken(window.SyncEtc.AuthContext.getSnapshot(),0);
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
function setPublic(customerKey){
  snapshot={ok:true,signed_in:false,loading:false,actor_email:"",customer_key:customerKey||"",platform_role:"",is_syncetc_platform_admin:false,is_syncetc_super_admin:false,active_customer_role:"",active_customer_is_admin:false,customer_roles:[]};
  return snapshot;
}
function refresh(customerKey){
  var token=getToken();
  if(!token)return Promise.resolve(setPublic(customerKey));
  snapshot.loading=true;
  return fetch(READ_URL+"?customer_key="+encodeURIComponent(customerKey||""),{
    method:"GET",
    headers:{"Authorization":"Bearer "+token}
  }).then(function(r){return r.json().catch(function(){return null;}).then(function(body){if(!r.ok||!body||body.ok===false)throw new Error((body&&body.error)||"Security context failed");return body;});})
  .then(function(body){snapshot=Object.assign({loading:false},body||{});return snapshot;})
  .catch(function(err){snapshot={ok:false,signed_in:false,loading:false,error:err&&err.message?err.message:String(err),customer_key:customerKey||"",is_syncetc_platform_admin:false,is_syncetc_super_admin:false,active_customer_is_admin:false,customer_roles:[]};return snapshot;});
}
function getSnapshot(){return Object.assign({},snapshot);}
function isPlatformAdmin(){return !!snapshot.is_syncetc_platform_admin;}
function isSuperAdmin(){return !!snapshot.is_syncetc_super_admin;}
function isCustomerAdmin(customerKey){
  if(snapshot.is_syncetc_platform_admin)return true;
  if(customerKey&&snapshot.customer_key&&customerKey!==snapshot.customer_key)return false;
  return !!snapshot.active_customer_is_admin;
}
function clearAuthStorage(){
  function shouldClear(k){
    var key=String(k||"").toLowerCase();
    return key.indexOf("sb-")===0||key.indexOf("supabase")>=0||key.indexOf("auth")>=0||key.indexOf("syncetc")>=0;
  }
  try{
    var keys=[];
    for(var i=0;i<localStorage.length;i++)keys.push(localStorage.key(i));
    keys.forEach(function(k){if(shouldClear(k))localStorage.removeItem(k);});
  }catch(e){}
  try{
    var skeys=[];
    for(var j=0;j<sessionStorage.length;j++)skeys.push(sessionStorage.key(j));
    skeys.forEach(function(k){if(shouldClear(k))sessionStorage.removeItem(k);});
  }catch(e){}
  snapshot={ok:true,signed_in:false,loading:false,actor_email:"",customer_key:"",platform_role:"",is_syncetc_platform_admin:false,is_syncetc_super_admin:false,active_customer_role:"",active_customer_is_admin:false,customer_roles:[]};
}
function signOutHard(){
  var p=Promise.resolve();
  try{
    if(window.SyncEtc&&window.SyncEtc.AuthContext&&window.SyncEtc.AuthContext.signOut){
      p=Promise.resolve(window.SyncEtc.AuthContext.signOut()).catch(function(){});
    }
  }catch(e){p=Promise.resolve();}
  return p.then(function(){
    clearAuthStorage();
    return new Promise(function(resolve){setTimeout(resolve,220);});
  }).then(function(){
    window.location.reload();
  });
}
window.SyncEtc.SecurityContext={version:VERSION,refresh:refresh,getSnapshot:getSnapshot,isPlatformAdmin:isPlatformAdmin,isSuperAdmin:isSuperAdmin,isCustomerAdmin:isCustomerAdmin,getToken:getToken,clearAuthStorage:clearAuthStorage,signOutHard:signOutHard};
})();
/* COMPONENT-security-context-v1.js - END */
