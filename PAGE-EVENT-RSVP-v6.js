/* PAGE-EVENT-RSVP-v6.js - BEGIN */
(function(){
"use strict";

var VERSION="PAGE-EVENT-RSVP-v6";
var MOUNT_ID="syncetc-webflow-mount";
var DEFAULT_CUSTOMER_KEY="demo_flying_club";
var RSVP_FUNCTION_URL="https://ocdaohkiwonjmirqkjww.supabase.co/functions/v1/syncetc-event-rsvp";
var SUPABASE_ANON_KEY=""; // optional; V3 can still use hosted Supabase session storage without this

var COMPONENT_FILES=[
  "COMPONENT-shared-utils-v1.js",
  "COMPONENT-customer-style-v1.js",
  "COMPONENT-base-styles-v1.js",
  "COMPONENT-auth-context-v1.js",
  "COMPONENT-auth-modal-v1.js",
  "COMPONENT-security-context-v1.js",
  "COMPONENT-auth-soft-bridge-v1.js",
  "COMPONENT-master-controls-v1.js",
  "COMPONENT-customer-settings-v1.js",
  "COMPONENT-master-header-v1.js",
  "COMPONENT-scroll-banner-v1.js",
  "COMPONENT-master-footer-v1.js",
  "COMPONENT-site-shell-v1.js",
  "COMPONENT-customer-switcher-v1.js",
  "COMPONENT-access-guard-v1.js"
];

var state={
  booted:false,
  customerKey:DEFAULT_CUSTOMER_KEY,
  eventId:"",
  event:null,
  rsvps:[],
  currentUserRsvp:null,
  summary:null,
  loading:true,
  saving:false,
  dirty:false,
  message:"",
  messageType:"",
  authToken:"",
  user:null,
  authRetrying:false,
  loginPrompted:false,
  loginModalOpen:false
};

function qs(sel,root){return (root||document).querySelector(sel);}
function qsa(sel,root){return Array.prototype.slice.call((root||document).querySelectorAll(sel));}
function clean(v){return String(v==null?"":v).trim();}
function lower(v){return clean(v).toLowerCase();}
function int(v){var n=parseInt(v,10);return isNaN(n)?0:n;}
function esc(v){
  return clean(v).replace(/[&<>"']/g,function(ch){
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch];
  });
}
function bool(v){
  if(typeof v==="boolean")return v;
  var s=lower(v);
  return s==="true"||s==="yes"||s==="1"||s==="on";
}
function getParam(name){
  try{return new URLSearchParams(window.location.search).get(name)||"";}catch(e){return "";}
}
function setMessage(msg,type){
  state.message=clean(msg);
  state.messageType=type||"";
  renderMainOnly();
}
function clearMessage(){
  state.message="";
  state.messageType="";
}

function scriptBase(){
  var scripts=document.getElementsByTagName("script");
  for(var i=scripts.length-1;i>=0;i--){
    var src=scripts[i].src||"";
    if(src.indexOf("PAGE-EVENT-RSVP-v6.js")>-1){
      return src.substring(0,src.lastIndexOf("/")+1);
    }
  }
  return "https://feskesen.github.io/syncetc-webflow-assets/assets/";
}

function loadScript(src){
  return new Promise(function(resolve,reject){
    if(qs('script[data-syncetc-src="'+src+'"]')){resolve();return;}
    var s=document.createElement("script");
    s.src=src;
    s.async=false;
    s.dataset.syncetcSrc=src;
    s.onload=function(){resolve();};
    s.onerror=function(){reject(new Error("Failed to load "+src));};
    document.head.appendChild(s);
  });
}

function loadComponents(){
  var base=scriptBase();
  var p=Promise.resolve();
  COMPONENT_FILES.forEach(function(file){
    p=p.then(function(){return loadScript(base+file+"?v=event-rsvp-v6");});
  });
  return p;
}

function C(){window.SyncEtc=window.SyncEtc||{};return window.SyncEtc;}

function getMount(){
  var el=document.getElementById(MOUNT_ID);
  if(!el){
    el=document.createElement("div");
    el.id=MOUNT_ID;
    document.body.appendChild(el);
  }
  return el;
}

function getSiteShell(){
  return C().SiteShell||null;
}

function getCustomerKey(){
  try{
    var shell=getSiteShell();
    if(shell&&shell.getState&&shell.getState().customerKey)return shell.getState().customerKey;
    if(shell&&shell.customer&&shell.customer().key)return shell.customer().key;
  }catch(e){}
  return getParam("customer")||getParam("customer_key")||DEFAULT_CUSTOMER_KEY;
}

function decodeJwtPayload(token){
  try{
    var part=String(token||"").split(".")[1]||"";
    if(!part)return null;
    part=part.replace(/-/g,"+").replace(/_/g,"/");
    while(part.length%4)part+="=";
    return JSON.parse(atob(part));
  }catch(e){return null;}
}

function isLikelySupabaseJwt(token){
  var payload=decodeJwtPayload(token);
  if(!payload)return false;
  if(!payload.sub||!payload.exp)return false;
  if(payload.exp && Date.now()/1000 > Number(payload.exp))return false;
  return true;
}

function setUserFromToken(token){
  var payload=decodeJwtPayload(token)||{};
  if(payload.email){
    state.user={
      id:payload.sub||"",
      email:payload.email||"",
      user_metadata:payload.user_metadata||payload.app_metadata||{}
    };
  }
}

function deepFindAccessToken(obj,depth){
  if(!obj||depth>8)return "";
  if(typeof obj==="string"){
    if(isLikelySupabaseJwt(obj))return obj;
    try{return deepFindAccessToken(JSON.parse(obj),depth+1);}catch(e){return "";}
  }
  if(typeof obj!=="object")return "";
  if(obj.access_token&&isLikelySupabaseJwt(obj.access_token))return obj.access_token;
  if(obj.currentSession&&obj.currentSession.access_token&&isLikelySupabaseJwt(obj.currentSession.access_token))return obj.currentSession.access_token;
  if(obj.session&&obj.session.access_token&&isLikelySupabaseJwt(obj.session.access_token))return obj.session.access_token;
  if(obj.data&&obj.data.session&&obj.data.session.access_token&&isLikelySupabaseJwt(obj.data.session.access_token))return obj.data.session.access_token;

  var keys=Object.keys(obj);
  for(var i=0;i<keys.length;i++){
    var found=deepFindAccessToken(obj[keys[i]],depth+1);
    if(found)return found;
  }
  return "";
}

function tokenFromStorage(){
  var stores=[];
  try{stores.push(localStorage);}catch(e){}
  try{stores.push(sessionStorage);}catch(e){}

  for(var s=0;s<stores.length;s++){
    var store=stores[s];

    /* First pass: Supabase-specific keys. */
    for(var i=0;i<store.length;i++){
      var key=store.key(i)||"";
      var low=key.toLowerCase();
      if(
        low.indexOf("sb-ocdaohkiwonjmirqkjww-auth-token")>=0 ||
        low.indexOf("supabase.auth.token")>=0 ||
        low.indexOf("sb-")===0
      ){
        var found=deepFindAccessToken(store.getItem(key),0);
        if(found)return found;
      }
    }

    /* Second pass: broader auth keys. */
    for(var j=0;j<store.length;j++){
      var key2=store.key(j)||"";
      var low2=key2.toLowerCase();
      if(low2.indexOf("auth")>=0||low2.indexOf("session")>=0||low2.indexOf("token")>=0){
        var found2=deepFindAccessToken(store.getItem(key2),0);
        if(found2)return found2;
      }
    }
  }

  return "";
}

function waitForToken(maxMs){
  var started=Date.now();
  return new Promise(function(resolve){
    function check(){
      var t=tokenFromStorage();
      if(t){resolve(t);return;}
      if(Date.now()-started>=maxMs){resolve("");return;}
      setTimeout(check,250);
    }
    check();
  });
}

function getAuthToken(){
  var token="";

  /* Primary path: the SyncEtc login modal signs in through AuthContext. */
  try{
    if(C().AuthContext&&C().AuthContext.getToken){
      token=C().AuthContext.getToken()||"";
      if(token&&isLikelySupabaseJwt(token)){
        setUserFromToken(token);
        return Promise.resolve(token);
      }
    }
  }catch(e){}

  /* Initialize AuthContext, then read its internal session token directly. */
  try{
    if(C().AuthContext&&C().AuthContext.init){
      return Promise.resolve(C().AuthContext.init({activeCustomerKey:state.customerKey}))
        .then(function(){
          var t="";
          try{if(C().AuthContext&&C().AuthContext.getToken)t=C().AuthContext.getToken()||"";}catch(e){}
          if(!t||!isLikelySupabaseJwt(t))t=tokenFromStorage();
          if(t&&isLikelySupabaseJwt(t)){setUserFromToken(t);return t;}
          return waitForToken(1200).then(function(wt){if(wt)setUserFromToken(wt);return wt;});
        })
        .catch(function(){
          var fallback="";
          try{if(C().AuthContext&&C().AuthContext.getToken)fallback=C().AuthContext.getToken()||"";}catch(e){}
          if(!fallback||!isLikelySupabaseJwt(fallback))fallback=tokenFromStorage();
          if(fallback&&isLikelySupabaseJwt(fallback)){setUserFromToken(fallback);return fallback;}
          return waitForToken(1200).then(function(wt){if(wt)setUserFromToken(wt);return wt;});
        });
    }
  }catch(e){}

  /* Supabase client fallback only if a global client exists. */
  try{
    if(window.supabase&&window.supabase.auth&&window.supabase.auth.getSession){
      return window.supabase.auth.getSession().then(function(res){
        var t=res&&res.data&&res.data.session?res.data.session.access_token:"";
        if(!t||!isLikelySupabaseJwt(t))t=tokenFromStorage();
        if(t&&isLikelySupabaseJwt(t))setUserFromToken(t);
        return t;
      }).catch(function(){
        var fallback=tokenFromStorage();
        if(fallback&&isLikelySupabaseJwt(fallback))setUserFromToken(fallback);
        return fallback;
      });
    }
  }catch(e){}

  token=tokenFromStorage();
  if(token&&isLikelySupabaseJwt(token))setUserFromToken(token);
  return Promise.resolve(token);
}

function getCurrentUserFallback(){
  try{
    if(C().AuthContext&&C().AuthContext.currentUser)return C().AuthContext.currentUser();
  }catch(e){}
  try{
    var shell=getSiteShell();
    var st=shell&&shell.getState?shell.getState():null;
    if(st&&st.user)return st.user;
  }catch(e){}
  return null;
}

function eventIdFromUrl(){
  return clean(getParam("event_id")||getParam("event")||getParam("id")||getParam("slug"));
}

function formatDate(raw){
  if(!raw)return "";
  var d=new Date(raw);
  if(isNaN(d.getTime()))return clean(raw);
  return d.toLocaleString("en-US",{
    weekday:"short",
    month:"short",
    day:"numeric",
    year:"numeric",
    hour:"numeric",
    minute:"2-digit"
  });
}

function normalizeEvent(row){
  if(!row)return null;
  return {
    id:clean(row.id||row.event_id||row.eventId||row.event_internal_id||row.eventInternalId),
    title:clean(row.title||row.name||row.event_name||row.eventName)||"Event",
    start:clean(row.start_time||row.start||row.starts_at||row.event_start||row.eventStart),
    end:clean(row.end_time||row.end||row.ends_at||row.event_end||row.eventEnd),
    location:clean(row.location||row.location_label||row.event_location||row.venue),
    address:clean(row.address||row.event_address),
    access:clean(row.access||row.access_level||row.event_access),
    rsvpOn:row.rsvp_on==null?true:bool(row.rsvp_on),
    image:clean(row.image_url||row.image||row.event_image_url)
  };
}

function tryReadEventFromGlobals(){
  var id=state.eventId;
  var possible=[
    window.SyncEtcCalendarEvents,
    window.SYNCETC_CALENDAR_EVENTS,
    window.syncetcCalendarEvents
  ];
  for(var i=0;i<possible.length;i++){
    var arr=possible[i];
    if(Array.isArray(arr)){
      var found=arr.find(function(ev){
        return clean(ev.id)===id||clean(ev.event_id)===id||clean(ev.slug)===id||clean(ev.eventInternalId)===id;
      });
      if(found)return normalizeEvent(found);
    }
  }
  return null;
}

function readEventFallback(){
  var ev=tryReadEventFromGlobals();
  if(ev)return ev;
  return {
    id:state.eventId,
    title:clean(getParam("event_name")||getParam("name"))||"Selected Event",
    start:clean(getParam("start")),
    end:clean(getParam("end")),
    location:clean(getParam("location")),
    address:clean(getParam("address")),
    access:"",
    rsvpOn:true,
    image:""
  };
}

function rsvpStatus(){
  var el=qs('input[name="rsvp-status"]:checked');
  return el?el.value:"No response";
}
function formData(){
  var memberAttending=!!(qs("#rsvp-member-attending")&&qs("#rsvp-member-attending").checked);
  var adults=Math.max(0,Math.min(50,int(qs("#rsvp-additional-adults")&&qs("#rsvp-additional-adults").value)));
  var children=Math.max(0,Math.min(50,int(qs("#rsvp-additional-children")&&qs("#rsvp-additional-children").value)));
  var status=rsvpStatus();
  var total=status==="Yes"?(memberAttending?1:0)+adults+children:0;
  return {
    rsvp_status:status,
    member_attending:memberAttending,
    additional_adults:adults,
    additional_children:children,
    total_count:total,
    bringing_note:clean(qs("#rsvp-bringing-note")&&qs("#rsvp-bringing-note").value),
    member_comment:clean(qs("#rsvp-member-comment")&&qs("#rsvp-member-comment").value)
  };
}

function userProfileForPayload(){
  var user=state.user||getCurrentUserFallback()||{};
  var security={};
  var authSnap={};

  try{if(C().SecurityContext&&C().SecurityContext.getSnapshot)security=C().SecurityContext.getSnapshot()||{};}catch(e){}
  try{if(C().AuthContext&&C().AuthContext.getSnapshot)authSnap=C().AuthContext.getSnapshot()||{};}catch(e){}

  var profile=authSnap.profile||{};
  var active=authSnap.active_customer||{};
  var email=clean(user.email||profile.email||security.actor_email||user.auth_email||user.member_email);
  var meta=user.user_metadata||user.metadata||{};

  return {
    member_name:clean(profile.display_name||profile.full_name||meta.full_name||meta.name||user.name||email||"Member"),
    member_email:email,
    member_type:clean(active.role_label||active.role_key||profile.member_type||meta.member_type||meta.memberType||""),
    memberstack_id:clean(profile.memberstack_id||meta.memberstack_id||meta.memberstackId||"")
  };
}


function openLoginModalForRsvp(){
  if(state.loginModalOpen)return;
  state.loginPrompted=true;
  state.loginModalOpen=true;

  try{
    if(C().AuthModal&&C().AuthModal.open){
      C().AuthModal.open({customerLabel:"SyncEtc"});
      setTimeout(function(){state.loginModalOpen=false;},3500);
      return;
    }
  }catch(e){}

  state.loginModalOpen=false;
  setMessage("RSVP needs a fresh login. Use the SyncEtc sign-in control, then click Retry RSVP.", "error");
}

function retryRsvpAfterAuth(reason){
  if(state.authRetrying)return;
  state.authRetrying=true;
  setTimeout(function(){
    state.authRetrying=false;
    getAuthToken().then(function(token){
      if(token&&isLikelySupabaseJwt(token)){
        state.loginPrompted=false;
        state.loginModalOpen=false;
        if(state.eventId)loadRsvps();
      }
    }).catch(function(){});
  },350);
}

function callRsvpFunction(payload){
  return getAuthToken().then(function(token){
    state.authToken=token||"";

    if(!state.authToken||!isLikelySupabaseJwt(state.authToken)){
      throw new Error("RSVP needs a fresh SyncEtc login. Click Sign in / Refresh Login, complete login once, then click Retry RSVP if needed.");
    }

    var headers={
      "Content-Type":"application/json",
      "Authorization":"Bearer "+state.authToken
    };
    if(SUPABASE_ANON_KEY)headers.apikey=SUPABASE_ANON_KEY;

    return fetch(RSVP_FUNCTION_URL,{
      method:"POST",
      headers:headers,
      body:JSON.stringify(payload)
    });
  }).then(function(resp){
    return resp.text().then(function(txt){
      var data={};
      try{data=txt?JSON.parse(txt):{};}catch(e){data={raw:txt};}
      if(!resp.ok||data.ok===false){
        if(resp.status===401){
          throw new Error("RSVP request failed: 401. Supabase did not accept the AuthContext login token. Click Sign in / Refresh Login once, then Retry RSVP.");
        }
        throw new Error(clean(data.error)||("RSVP request failed: "+resp.status));
      }
      return data;
    });
  });
}

function loadRsvps(){
  state.loading=true;
  clearMessage();
  renderMainOnly();

  var payload={
    action:"read",
    customer_key:state.customerKey,
    event_id:state.eventId
  };

  return callRsvpFunction(payload).then(function(data){
    state.rsvps=Array.isArray(data.rsvps)?data.rsvps:[];
    state.currentUserRsvp=data.current_user_rsvp||null;
    state.summary=data.summary||null;
    state.loading=false;
    renderMainOnly();
  }).catch(function(err){
    state.loading=false;
    setMessage(err.message||"Could not load RSVP data.","error");
  });
}

function saveRsvp(){
  if(state.saving)return;
  state.saving=true;
  clearMessage();
  renderMainOnly();

  var fd=formData();
  var profile=userProfileForPayload();
  var payload=Object.assign({},profile,fd,{
    action:"save",
    customer_key:state.customerKey,
    event_id:state.eventId,
    event_name:state.event&&state.event.title?state.event.title:""
  });

  return callRsvpFunction(payload).then(function(data){
    state.rsvps=Array.isArray(data.rsvps)?data.rsvps:[];
    state.currentUserRsvp=data.current_user_rsvp||data.rsvp||null;
    state.summary=data.summary||null;
    state.dirty=false;
    state.saving=false;
    setMessage("Your RSVP has been saved.","saved");
  }).catch(function(err){
    state.saving=false;
    setMessage(err.message||"Could not save RSVP.","error");
  });
}

function countSummary(rows){
  if(state.summary)return state.summary;
  var out={members:0,adults:0,children:0,total:0,maybe:0,no_or_no_response:0};
  rows.forEach(function(r){
    var status=lower(r.rsvp_status);
    if(status==="yes"){
      var member=r.member_attending?1:0;
      var adults=int(r.additional_adults);
      var children=int(r.additional_children);
      out.members+=member;
      out.adults+=adults;
      out.children+=children;
      out.total+=int(r.total_count)||(member+adults+children);
    }else if(status==="maybe"){
      out.maybe+=1;
    }else{
      out.no_or_no_response+=1;
    }
  });
  return out;
}

function currentValues(){
  var r=state.currentUserRsvp||{};
  return {
    status:clean(r.rsvp_status)||"No response",
    memberAttending:r.member_attending==null?true:!!r.member_attending,
    adults:int(r.additional_adults),
    children:int(r.additional_children),
    bringing:clean(r.bringing_note),
    comment:clean(r.member_comment)
  };
}

function styleHtml(){
  return '<style id="PAGE-EVENT-RSVP-v6-style">'+
'.syncetc-rsvp-page,.syncetc-rsvp-page *{box-sizing:border-box}.syncetc-rsvp-page{width:100%;padding:26px 18px 42px;color:#1e2933;font-family:Arial,Helvetica,sans-serif}.syncetc-rsvp-shell{width:min(1160px,100%);margin:0 auto}.syncetc-rsvp-card{overflow:hidden;border-radius:26px;background:rgba(255,255,255,.95);border:1px solid rgba(18,54,90,.16);box-shadow:0 18px 50px rgba(12,38,64,.18)}.syncetc-rsvp-hero{display:flex;justify-content:space-between;align-items:flex-start;gap:18px;padding:24px 28px;background:linear-gradient(135deg,rgba(18,54,90,.96),rgba(47,128,196,.88));color:#fff}.syncetc-rsvp-pill,.syncetc-rsvp-label{display:inline-flex;align-items:center;width:fit-content;padding:6px 11px;border-radius:999px;font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.syncetc-rsvp-pill{margin-bottom:9px;color:#fff;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.24)}.syncetc-rsvp-label{margin-bottom:7px;color:#12365a;background:#eaf5ff;border:1px solid rgba(18,54,90,.16)}.syncetc-rsvp-hero h1{margin:0;color:#fff;font-size:clamp(30px,4vw,48px);line-height:1.05;font-weight:800;letter-spacing:-.035em}.syncetc-rsvp-hero p{margin:8px 0 0;color:rgba(255,255,255,.9);font-size:15px;line-height:1.45;font-weight:700}.syncetc-rsvp-body{padding:18px 28px 24px}.syncetc-rsvp-event{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:14px;align-items:center;margin-bottom:14px;padding:16px;border-radius:18px;background:rgba(234,245,255,.65);border:1px solid rgba(18,54,90,.14)}.syncetc-rsvp-event h2{margin:0;color:#0b2744;font-size:clamp(22px,2.3vw,30px);line-height:1.05;font-weight:850;letter-spacing:-.03em}.syncetc-rsvp-event p{margin:5px 0 0;color:#12365a;font-size:14px;line-height:1.35;font-weight:800}.syncetc-rsvp-section{margin-top:14px;padding:16px;border-radius:18px;background:rgba(255,255,255,.84);border:1px solid rgba(18,54,90,.16)}.syncetc-rsvp-section-head{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;margin-bottom:12px}.syncetc-rsvp-section h2{margin:0;color:#0b2744;font-size:23px;line-height:1.15;font-weight:800;letter-spacing:-.02em}.syncetc-rsvp-alert{margin:0 0 14px;padding:12px 14px;border-radius:14px;border:1px solid rgba(18,54,90,.16);background:#eaf5ff;color:#12365a;font-size:14px;line-height:1.45;font-weight:800}.syncetc-rsvp-alert.is-error{border-color:rgba(150,30,30,.25);background:#fff0f0;color:#7a1f1f}.syncetc-rsvp-alert.is-saved{border-color:rgba(22,92,52,.18);background:#e9f7ef;color:#165c34}.syncetc-rsvp-form{display:grid;gap:11px}.syncetc-rsvp-row{display:grid;grid-template-columns:minmax(260px,.9fr) minmax(300px,1.1fr);gap:10px;align-items:stretch}.syncetc-rsvp-status{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.syncetc-rsvp-status label,.syncetc-rsvp-check{display:flex;align-items:center;gap:9px;padding:10px 12px;border-radius:14px;border:1px solid rgba(18,54,90,.16);background:#fff;color:#0b2744;font-size:14px;font-weight:900}.syncetc-rsvp-status label:has(input:checked){background:#12365a;color:#fff;border-color:#12365a}.syncetc-rsvp-counts{display:grid;grid-template-columns:1fr 1fr;gap:10px}.syncetc-rsvp-field span{display:block;margin-bottom:6px;color:#12365a;font-size:11px;font-weight:900;letter-spacing:.07em;text-transform:uppercase}.syncetc-rsvp-field input,.syncetc-rsvp-field textarea,.syncetc-rsvp-search{width:100%;min-height:42px;border-radius:14px;border:1px solid rgba(18,54,90,.17);background:#fff;color:#1e2933;padding:9px 11px;font-size:14px;font-weight:800}.syncetc-rsvp-field textarea{min-height:66px;resize:vertical;font-weight:700}.syncetc-rsvp-footer{display:flex;justify-content:space-between;align-items:center;gap:12px}.syncetc-rsvp-primary,.syncetc-rsvp-secondary{display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:9px 15px;border-radius:999px;border:1px solid rgba(18,54,90,.18);font-size:14px;font-weight:900;text-decoration:none;cursor:pointer;box-shadow:0 8px 20px rgba(7,28,52,.08);white-space:nowrap}.syncetc-rsvp-primary{background:#12365a;color:#fff;border-color:#12365a}.syncetc-rsvp-primary:disabled{opacity:.48;cursor:not-allowed}.syncetc-rsvp-secondary{background:#fff;color:#12365a}.syncetc-rsvp-summary{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px;margin-bottom:12px}.syncetc-rsvp-summary-card{padding:10px;border-radius:14px;background:#eaf5ff;border:1px solid rgba(18,54,90,.16)}.syncetc-rsvp-summary-card span{display:block;color:#5d6b78;font-size:10px;font-weight:900;letter-spacing:.06em;text-transform:uppercase}.syncetc-rsvp-summary-card strong{display:block;margin-top:4px;color:#0b2744;font-size:24px;line-height:1;font-weight:900}.syncetc-rsvp-table{border-radius:14px;border:1px solid rgba(18,54,90,.12);overflow:hidden;background:#fff}.syncetc-rsvp-table-head,.syncetc-rsvp-attendee{display:grid;grid-template-columns:minmax(190px,1.35fr) 100px 70px 70px 80px minmax(240px,1.45fr);gap:10px;align-items:center}.syncetc-rsvp-table-head{padding:10px 12px;background:#d9ecfb;color:#12365a;font-size:11px;font-weight:900;letter-spacing:.07em;text-transform:uppercase}.syncetc-rsvp-attendee{padding:10px 12px;border-top:1px solid rgba(18,54,90,.08)}.syncetc-rsvp-attendee strong{display:block;color:#0b2744;font-size:13px;line-height:1.25}.syncetc-rsvp-attendee small{display:block;margin-top:2px;color:#5d6b78;font-size:11px;font-weight:700}.syncetc-rsvp-status-pill{display:inline-flex;width:fit-content;justify-content:center;padding:5px 9px;border-radius:999px;background:#eaf5ff;color:#12365a;border:1px solid rgba(18,54,90,.16);font-size:12px;font-weight:900}.syncetc-rsvp-status-pill.yes{background:#17633a;color:#fff;border-color:#17633a}.syncetc-rsvp-status-pill.no{background:#8b2424;color:#fff;border-color:#8b2424}.syncetc-rsvp-status-pill.maybe{background:#8a6400;color:#fff;border-color:#8a6400}.syncetc-rsvp-note{white-space:pre-wrap;color:#38566d;font-size:13px;line-height:1.3;font-weight:700}.syncetc-rsvp-muted{color:#5d6b78;font-size:13px;font-weight:800}.syncetc-rsvp-version{margin-top:12px;color:#7a8793;font-size:11px;font-weight:700;text-align:right}@media(max-width:980px){.syncetc-rsvp-row,.syncetc-rsvp-summary{grid-template-columns:1fr}.syncetc-rsvp-table-head{display:none}.syncetc-rsvp-attendee{grid-template-columns:1fr;gap:6px}}@media(max-width:700px){.syncetc-rsvp-page{padding:20px 12px 34px}.syncetc-rsvp-hero,.syncetc-rsvp-body,.syncetc-rsvp-section{padding:18px}.syncetc-rsvp-hero,.syncetc-rsvp-section-head,.syncetc-rsvp-footer{flex-direction:column}.syncetc-rsvp-counts,.syncetc-rsvp-status{grid-template-columns:1fr}.syncetc-rsvp-primary,.syncetc-rsvp-secondary,.syncetc-rsvp-search{width:100%;max-width:none}}'+
'</style>';
}

function eventHtml(){
  var ev=state.event||{};
  var when=formatDate(ev.start);
  var loc=[ev.location,ev.address].filter(Boolean).join(" — ");
  return '<section class="syncetc-rsvp-event">'+
    '<div>'+
      '<div class="syncetc-rsvp-label">Club Event RSVP</div>'+
      '<h2>'+esc(ev.title||"Selected Event")+'</h2>'+
      '<p>'+esc(when||"Date/time not listed")+'</p>'+
      '<p>'+esc(loc||"No location listed")+'</p>'+
    '</div>'+
    '<a class="syncetc-rsvp-secondary" href="/calendar">Return to Calendar</a>'+
  '</section>';
}

function messageHtml(){
  if(!state.message)return "";
  var cls=state.messageType==="error"?" is-error":(state.messageType==="saved"?" is-saved":"");
  var authButton="";
  if(state.message.indexOf("fresh SyncEtc login")>=0||state.message.indexOf("valid Supabase login token")>=0||state.message.indexOf("401")>=0){
    authButton='<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;"><button id="syncetc-rsvp-login-btn" class="syncetc-rsvp-primary" type="button">Sign in / Refresh Login</button><button id="syncetc-rsvp-retry-btn" class="syncetc-rsvp-secondary" type="button">Retry RSVP</button></div>';
  }
  return '<div class="syncetc-rsvp-alert'+cls+'">'+esc(state.message)+authButton+'</div>';
}

function formHtml(){
  var v=currentValues();
  var total=v.status==="Yes"?(v.memberAttending?1:0)+v.adults+v.children:0;
  return '<section class="syncetc-rsvp-section">'+
    '<div class="syncetc-rsvp-section-head"><div><div class="syncetc-rsvp-label">Your RSVP</div><h2>Are you coming?</h2></div><div class="syncetc-rsvp-muted">'+(state.dirty?"Unsaved changes":"No unsaved changes")+'</div></div>'+
    '<form id="syncetc-rsvp-form" class="syncetc-rsvp-form">'+
      '<div class="syncetc-rsvp-row">'+
        '<div class="syncetc-rsvp-status">'+
          radioHtml("Yes",v.status)+radioHtml("Maybe",v.status)+radioHtml("No",v.status)+
        '</div>'+
        '<label class="syncetc-rsvp-check"><input id="rsvp-member-attending" type="checkbox" '+(v.memberAttending?"checked":"")+'> <span><strong>I am attending personally</strong><br><small>Uncheck only if responding for guests but not yourself.</small></span></label>'+
      '</div>'+
      '<div class="syncetc-rsvp-row">'+
        '<div class="syncetc-rsvp-counts">'+
          '<label class="syncetc-rsvp-field"><span>Additional adults</span><input id="rsvp-additional-adults" type="number" min="0" max="50" step="1" value="'+esc(v.adults)+'"></label>'+
          '<label class="syncetc-rsvp-field"><span>Additional children</span><input id="rsvp-additional-children" type="number" min="0" max="50" step="1" value="'+esc(v.children)+'"></label>'+
        '</div>'+
        '<label class="syncetc-rsvp-field"><span>Shared RSVP Note</span><textarea id="rsvp-bringing-note" maxlength="10000" placeholder="Optional. Add what you are bringing, how you can help, or an officer update visible with your RSVP.">'+esc(v.bringing)+'</textarea></label>'+
      '</div>'+
      '<label class="syncetc-rsvp-field"><span>Private Note to Self</span><textarea id="rsvp-member-comment" maxlength="2000" placeholder="Optional. This note is saved with your RSVP but not shown in the attendee list.">'+esc(v.comment)+'</textarea></label>'+
      '<div class="syncetc-rsvp-footer"><div class="syncetc-rsvp-muted">Total for your RSVP: <strong id="syncetc-rsvp-total">'+esc(total)+'</strong></div><button class="syncetc-rsvp-primary" type="submit" '+(state.saving?"disabled":"")+'>'+(state.saving?"Saving...":"Save RSVP")+'</button></div>'+
    '</form>'+
  '</section>';
}

function radioHtml(value,current){
  return '<label><input type="radio" name="rsvp-status" value="'+esc(value)+'" '+(current===value?"checked":"")+'> '+esc(value)+'</label>';
}

function summaryHtml(){
  var s=countSummary(state.rsvps);
  var cards=[
    ["Members",s.members],
    ["Adults",s.adults],
    ["Children",s.children],
    ["Total",s.total],
    ["Maybe",s.maybe],
    ["No / NR",s.no_or_no_response]
  ];
  return '<div class="syncetc-rsvp-summary">'+cards.map(function(c){
    return '<div class="syncetc-rsvp-summary-card"><span>'+esc(c[0])+'</span><strong>'+esc(c[1])+'</strong></div>';
  }).join("")+'</div>';
}

function attendeeHtml(){
  var rows=(state.rsvps||[]).slice().sort(function(a,b){
    return clean(a.member_name||a.member_email).localeCompare(clean(b.member_name||b.member_email));
  });
  if(!rows.length){
    return '<div class="syncetc-rsvp-attendee"><div class="syncetc-rsvp-muted">No RSVPs yet.</div></div>';
  }
  return rows.map(function(r){
    var status=clean(r.rsvp_status)||"No response";
    var statusCls=lower(status)==="yes"?"yes":(lower(status)==="maybe"?"maybe":(lower(status)==="no"?"no":""));
    return '<div class="syncetc-rsvp-attendee">'+
      '<div><strong>'+esc(r.member_name||r.member_email||"Member")+'</strong><small>'+esc(r.member_type||r.member_email||"")+'</small></div>'+
      '<span class="syncetc-rsvp-status-pill '+statusCls+'">'+esc(status)+'</span>'+
      '<div class="syncetc-rsvp-muted">'+esc(r.member_attending?1:0)+'</div>'+
      '<div class="syncetc-rsvp-muted">'+esc(int(r.additional_adults))+'</div>'+
      '<div class="syncetc-rsvp-muted">'+esc(int(r.additional_children))+'</div>'+
      '<div class="syncetc-rsvp-note">'+esc(r.bringing_note||"")+'</div>'+
    '</div>';
  }).join("");
}

function attendeesSectionHtml(){
  return '<section class="syncetc-rsvp-section">'+
    '<div class="syncetc-rsvp-section-head"><div><div class="syncetc-rsvp-label">Who’s Coming</div><h2>Member RSVP Summary</h2></div><button id="syncetc-rsvp-refresh" class="syncetc-rsvp-secondary" type="button">Refresh</button></div>'+
    summaryHtml()+
    '<div class="syncetc-rsvp-table">'+
      '<div class="syncetc-rsvp-table-head"><span>Member</span><span>Status</span><span>Member</span><span>Adults</span><span>Children</span><span>Bringing / Note</span></div>'+
      attendeeHtml()+
    '</div>'+
  '</section>';
}

function pageHtml(){
  if(!state.eventId){
    return styleHtml()+'<main class="syncetc-rsvp-page"><div class="syncetc-rsvp-shell"><section class="syncetc-rsvp-card"><div class="syncetc-rsvp-hero"><div><div class="syncetc-rsvp-pill">Club Event RSVP</div><h1>No event selected</h1><p>Open RSVP from a calendar event.</p></div><a class="syncetc-rsvp-secondary" href="/calendar">Return to Calendar</a></div></section></div></main>';
  }

  return styleHtml()+
    '<main class="syncetc-rsvp-page">'+
      '<div class="syncetc-rsvp-shell">'+
        '<section class="syncetc-rsvp-card">'+
          '<header class="syncetc-rsvp-hero">'+
            '<div><div class="syncetc-rsvp-pill">Club Event RSVP</div><h1>Submit or update your RSVP</h1><p>Confirm the event below, update your RSVP, and see who else is coming.</p></div>'+
            '<a class="syncetc-rsvp-secondary" href="/calendar">Return to Calendar</a>'+
          '</header>'+
          '<div class="syncetc-rsvp-body">'+
            eventHtml()+
            messageHtml()+
            (state.loading?'<div class="syncetc-rsvp-alert">Loading RSVP data...</div>':formHtml()+attendeesSectionHtml())+

          '</div>'+
        '</section>'+
      '</div>'+
    '</main>';
}

function bindPage(){
  var form=qs("#syncetc-rsvp-form");
  if(form){
    form.addEventListener("submit",function(e){
      e.preventDefault();
      saveRsvp();
    });
    qsa("input,textarea",form).forEach(function(el){
      el.addEventListener("input",function(){state.dirty=true;updateTotalLive();});
      el.addEventListener("change",function(){state.dirty=true;updateTotalLive();});
    });
  }
  var refresh=qs("#syncetc-rsvp-refresh");
  if(refresh)refresh.addEventListener("click",function(){loadRsvps();});

  var loginBtn=qs("#syncetc-rsvp-login-btn");
  if(loginBtn)loginBtn.addEventListener("click",function(){
    getAuthToken().then(function(token){
      if(token&&isLikelySupabaseJwt(token)){
        state.loginPrompted=false;
        state.loginModalOpen=false;
        loadRsvps();
      }else{
        state.loginModalOpen=false;
        openLoginModalForRsvp();
      }
    }).catch(function(){
      state.loginModalOpen=false;
      openLoginModalForRsvp();
    });
  });

  var retryBtn=qs("#syncetc-rsvp-retry-btn");
  if(retryBtn)retryBtn.addEventListener("click",function(){
    state.loginPrompted=false;
    loadRsvps();
  });
}

function updateTotalLive(){
  var totalEl=qs("#syncetc-rsvp-total");
  if(totalEl)totalEl.textContent=String(formData().total_count);
}

function renderMainOnly(){
  var shell=getSiteShell();
  var html=pageHtml();
  if(shell&&shell.render){
    shell.render(html);
  }else{
    getMount().innerHTML=html;
  }
  bindPage();
}

function registerPageSettings(){
  try{
    if(C().CustomerSettings&&C().CustomerSettings.registerPage){
      C().CustomerSettings.registerPage({
        pageKey:"event-rsvp",
        title:"Event RSVP",
        fields:[
          {key:"event_rsvp_hero_title",label:"RSVP Hero Title",type:"text",defaultValue:"Submit or update your RSVP"},
          {key:"event_rsvp_intro",label:"RSVP Intro",type:"textarea",defaultValue:"Confirm the event below, update your RSVP, and see who else is coming."}
        ]
      });
    }
  }catch(e){}
}

function boot(){
  if(state.booted)return;
  state.booted=true;

  loadComponents().then(function(){
    try{if(C().AuthModal&&C().AuthModal.init)C().AuthModal.init();}catch(e){}
    try{if(C().AuthSoftBridge&&C().AuthSoftBridge.start)C().AuthSoftBridge.start();}catch(e){}
    if(!window.__syncetcRsvpAuthListenerV5){
      window.__syncetcRsvpAuthListenerV5=true;
      try{document.addEventListener("syncetc:auth-soft-change",function(e){retryRsvpAfterAuth(e&&e.detail&&e.detail.reason);});}catch(e){}
      try{if(C().AuthContext&&C().AuthContext.subscribe){C().AuthContext.subscribe(function(){retryRsvpAfterAuth("auth-context-subscribe");});}}catch(e){}
    }

    state.customerKey=getCustomerKey();
    state.eventId=eventIdFromUrl();
    state.event=readEventFallback();
    state.user=getCurrentUserFallback();
    registerPageSettings();
    renderMainOnly();

    return getAuthToken().then(function(){
      try{if(C().SecurityContext&&C().SecurityContext.refresh)C().SecurityContext.refresh(state.customerKey);}catch(e){}
      if(!state.eventId)return;
      return loadRsvps();
    });
  }).catch(function(err){
    getMount().innerHTML=styleHtml()+'<main class="syncetc-rsvp-page"><div class="syncetc-rsvp-shell"><div class="syncetc-rsvp-alert is-error">'+esc(err.message||"RSVP page failed to load.")+'</div></div></main>';
  });
}

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);
else boot();

})();
/* PAGE-EVENT-RSVP-v6.js - END */
