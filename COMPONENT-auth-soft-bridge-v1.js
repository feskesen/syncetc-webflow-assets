/* COMPONENT-auth-soft-bridge-v1.js - BEGIN */
(function(){
"use strict";
window.SyncEtc=window.SyncEtc||{};
var VERSION="COMPONENT-auth-soft-bridge-v1";
var started=false;
var timer=null;
var lastSignature="";
var quietTicks=0;

function clean(v){return v==null?"":String(v).trim();}
function authSnapshot(){
  try{
    if(window.SyncEtc.AuthContext&&window.SyncEtc.AuthContext.getSnapshot){
      return window.SyncEtc.AuthContext.getSnapshot()||{};
    }
  }catch(e){}
  return {};
}
function securitySnapshot(){
  try{
    if(window.SyncEtc.SecurityContext&&window.SyncEtc.SecurityContext.getSnapshot){
      return window.SyncEtc.SecurityContext.getSnapshot()||{};
    }
  }catch(e){}
  return {};
}
function tokenPresent(){
  try{
    if(window.SyncEtc.SecurityContext&&window.SyncEtc.SecurityContext.getToken&&window.SyncEtc.SecurityContext.getToken())return true;
  }catch(e){}
  try{
    for(var i=0;i<localStorage.length;i++){
      var key=localStorage.key(i)||"";
      if(key.indexOf("sb-")===0||key.toLowerCase().indexOf("supabase")>=0||key.toLowerCase().indexOf("auth")>=0){
        var val=localStorage.getItem(key)||"";
        if(val.indexOf("access_token")>=0||val.split(".").length===3)return true;
      }
    }
  }catch(e){}
  return false;
}
function actorFrom(o){
  try{
    return clean((o.user&&o.user.email)||o.email||(o.session&&o.session.user&&o.session.user.email)||(o.currentSession&&o.currentSession.user&&o.currentSession.user.email)||o.actor_email).toLowerCase();
  }catch(e){return "";}
}
function signature(){
  var a=authSnapshot();
  var s=securitySnapshot();
  var signed=!!(a.signed_in||s.signed_in||tokenPresent());
  var actor=actorFrom(a)||actorFrom(s);
  var busy=!!(a.loading||a.busy||s.loading);
  return [signed?"in":"out", actor||"none", busy?"busy":"idle", tokenPresent()?"token":"notoken"].join("|");
}
function dispatch(reason){
  try{
    document.dispatchEvent(new CustomEvent("syncetc:auth-soft-change",{detail:{reason:reason||"auth-soft-bridge",signature:lastSignature,version:VERSION}}));
  }catch(e){}
}
function tick(){
  var sig=signature();
  if(!lastSignature){
    lastSignature=sig;
    return;
  }
  if(sig!==lastSignature){
    lastSignature=sig;
    quietTicks=0;
    dispatch("auth-signature-changed");
    return;
  }
  // Safety: after login modal says signed in but page did not update, repeat a few nudges.
  var signedNow=sig.indexOf("in|")===0;
  if(signedNow && quietTicks<4){
    quietTicks++;
    dispatch("signed-in-confirmation-"+quietTicks);
  }
}
function start(){
  if(started)return;
  started=true;
  lastSignature=signature();
  timer=setInterval(tick,500);
}
function force(reason){
  lastSignature=signature();
  dispatch(reason||"forced");
}
window.SyncEtc.AuthSoftBridge={version:VERSION,start:start,force:force,signature:signature};
start();
})();
/* COMPONENT-auth-soft-bridge-v1.js - END */
