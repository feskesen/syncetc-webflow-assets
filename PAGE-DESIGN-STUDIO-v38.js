/* PAGE-DESIGN-STUDIO-v38.js | post-load inheritance audit refresh | Generated: 2026-06-01 */
(function(){
"use strict";

var VERSION="PAGE-DESIGN-STUDIO-v38";
var SUPABASE_URL="https://ocdaohkiwonjmirqkjww.supabase.co";
var ANON_KEY=window.SYNCETC_SUPABASE_ANON_KEY||window.SUPABASE_ANON_KEY||"";
var READ_URL=SUPABASE_URL+"/functions/v1/syncetc-site-settings-read";
var ACTION_URL=SUPABASE_URL+"/functions/v1/syncetc-site-settings-action";
var MOUNT_ID="syncetc-webflow-mount";
var ROOT_ID="syncetc-design-studio-root";
var STYLE_ID="syncetc-design-studio-v38-style";
var SYNCETC_LOGO_URL="https://ocdaohkiwonjmirqkjww.supabase.co/storage/v1/object/public/public-site-assets/!SyncEtc-branding/SyncEtc-logo-compact.png";
var CONTROL_ORDER=["customer","designProfile","layout","style","typography","color","effect","siteWidth","headerTreatment","heroTreatment","sectionRhythm","density","shadow","border","corner","gradient","motion","background","imageTreatment","dividerStyle","emphasisStyle","surfaceStyle"];

var CUSTOMER_OPTIONS=[
  {key:"demo_flying_club",label:"Demo Flying Club"},
  {key:"150th_aero",label:"150th Aero Flying Club"}
];

var DESIGN_PROFILE_OPTIONS=[
  {key:"current-assignment",label:"Current Saved Assignment",help:"Loads the selected customer’s current saved design assignment."},
  {key:"custom-unsaved",label:"Custom Unsaved Mix",help:"Manual mix created by changing individual design layers."},
  {key:"classic-aviation-club",label:"Classic Aviation Club",help:"Traditional club site: boxed, rounded, aviation blue, soft shadows."},
  {key:"plain-jane-open",label:"Plain Jane Open",help:"Open white-space design with no chrome, no shadows, and pure white background."},
  {key:"forest-ops-dashboard",label:"Forest Ops Dashboard",help:"Operational green dashboard: dense, paneled, hairline utility treatment."},
  {key:"modern-utility",label:"Modern Utility",help:"Balanced modern utility profile for practical admin-heavy sites."},
  {key:"premium-editorial",label:"Premium Editorial",help:"Wider editorial presentation with larger type and polished motion."}
];

var DESIGN_PROFILE_RECIPES={
  "classic-aviation-club":{
    layout:"club-classic-boxed",style:"rounded-club",typography:"system-standard",color:"classic-aviation-blue",effect:"soft-card-shadows",
    shadow:"preset",border:"preset",corner:"preset",gradient:"preset",siteWidth:"standard",headerTreatment:"standard",heroTreatment:"banner",sectionRhythm:"standard",density:"standard",motion:"subtle",background:"soft-tint",imageTreatment:"standard",dividerStyle:"hairline",emphasisStyle:"pills",surfaceStyle:"cards"
  },
  "plain-jane-open":{
    layout:"apple-unboxed",style:"minimal-plain",typography:"apple-system-large",color:"plain-black-white",effect:"flat-no-chrome",
    shadow:"none",border:"none",corner:"square",gradient:"off",siteWidth:"narrow",headerTreatment:"plain",heroTreatment:"plain",sectionRhythm:"open",density:"relaxed",motion:"none",background:"pure-white",imageTreatment:"plain",dividerStyle:"none",emphasisStyle:"plain-text",surfaceStyle:"open"
  },
  "forest-ops-dashboard":{
    layout:"ops-dashboard",style:"compact-utility",typography:"compact-ops-type",color:"forest-operations",effect:"ops-hairline",
    shadow:"minimal",border:"hairline",corner:"soft",gradient:"subtle",siteWidth:"wide",headerTreatment:"dashboard",heroTreatment:"compact",sectionRhythm:"divided",density:"operations",motion:"none",background:"soft-tint",imageTreatment:"inset",dividerStyle:"section-rules",emphasisStyle:"labels",surfaceStyle:"panels"
  },
  "modern-utility":{
    layout:"club-classic-boxed",style:"compact-utility",typography:"system-standard",color:"classic-aviation-blue",effect:"ops-hairline",
    shadow:"minimal",border:"hairline",corner:"soft",gradient:"subtle",siteWidth:"standard",headerTreatment:"utility",heroTreatment:"compact",sectionRhythm:"divided",density:"compact",motion:"subtle",background:"pure-white",imageTreatment:"rounded",dividerStyle:"hairline",emphasisStyle:"labels",surfaceStyle:"panels"
  },
  "premium-editorial":{
    layout:"apple-unboxed",style:"rounded-club",typography:"apple-system-large",color:"classic-aviation-blue",effect:"soft-card-shadows",
    shadow:"soft",border:"hairline",corner:"rounded",gradient:"subtle",siteWidth:"wide",headerTreatment:"plain",heroTreatment:"banner",sectionRhythm:"open",density:"relaxed",motion:"polished",background:"gradient-wash",imageTreatment:"full-bleed",dividerStyle:"soft-rules",emphasisStyle:"badges",surfaceStyle:"soft-cards"
  }
};

var DEFAULT_SELECTED={
  layout:"club-classic-boxed",
  style:"rounded-club",
  typography:"system-standard",
  color:"forest-operations",
  effect:"soft-card-shadows",
  designProfile:"current-assignment",
  shadow:"preset",
  border:"preset",
  corner:"preset",
  gradient:"preset",
  siteWidth:"standard",
  headerTreatment:"standard",
  heroTreatment:"standard",
  sectionRhythm:"standard",
  density:"standard",
  motion:"subtle",
  background:"pure-white",
  imageTreatment:"standard",
  dividerStyle:"hairline",
  emphasisStyle:"pills",
  surfaceStyle:"cards"
};

var state={
  booted:false,
  loading:false,
  saving:false,
  dirty:false,
  error:"",
  notice:"",
  customer_key:"demo_flying_club",
  data:null,
  styleDiagnostic:null,
  selected:Object.assign({},DEFAULT_SELECTED),
  lastSaved:Object.assign({},DEFAULT_SELECTED),
  loadSeq:0,
  previewTimer:null,
  sideOpen:false,
  fullPreview:false,
  authEmail:'',
  authToken:'',
  authRefreshToken:'',
  authExpiresAt:0,
  authOpen:false,
  authBusy:false,
  sidePageKey:'home',
  sideSaving:false,
  sideDirty:false,
  sideAppliedDirty:false,
  sideDraftValues:null,
  sideAppliedValues:null
};

var ASSETS_PAGE_DEFAULTS={
  "150th Aero Flying Club": {
    "heroEyebrow": "Aircraft Fleet",
    "heroTitle": "Our Aircraft",
    "heroIntro": "The 150th Aero Flying Club maintains a practical fleet of Cessna aircraft for qualified members. Aircraft access depends on membership status, Club checkout requirements, pilot currency, and compliance with FAA and Club rules.",
    "stats": [
      {
        "value": "FOUR",
        "text": "Club aircraft currently available to qualified members."
      },
      {
        "value": "KMMU / KSMQ",
        "text": "Aircraft are based at Morristown Municipal Airport and Somerset Airport."
      },
      {
        "value": "C172",
        "text": "A practical training and travel platform familiar to many general aviation pilots."
      }
    ],
    "introLabel": "Fleet Overview",
    "introTitle": "Well-equipped aircraft for Club flying",
    "introText": "Each aircraft has its own equipment profile and avionics package. The descriptions below are intended as a general overview for members and prospective members. Current availability, rates, squawks, and operating limitations should be confirmed through Club systems and current Club rules.",
    "note": "Aircraft information shown on this page is for general orientation only. Members should confirm current aircraft status, operating limitations, equipment status, squawks, reservations, and checkout requirements through current Club systems before flight.",
    "aircraft": [
      {
        "tailNumber": "N150TH",
        "slug": "n150th",
        "aircraftType": "Cessna 172SP",
        "modelYear": "2003",
        "details": "With the vanity “150TH” tail number, this aircraft is considered the 150th’s flagship aircraft. || 180HP fuel-injected Lycoming engine || SureFly SIM4P electronic ignition || Dual King KX155A NAV/COM radios || KCS-55A compass system with HSI || JPI EDM 730 engine monitor || Marker beacon receiver || KLN-94 IFR-certified GPS || GTX-327 transponder with Mode C || Dual vacuum pumps || KMA-28 4-place intercom || KAP-140 2-axis autopilot with altitude pre-select || KMD-550 multifunction display || 406 MHz ELT || FreeFlight FDL-978 ADS-B IN / OUT || Rosen sun visors || CiES fuel level sending units || TA102 Mid-Continent dual USB power port || HID 85W landing/taxi light || Reiff electric engine preheat system",
        "aircraftPhoto": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/68334b3c5e73bf3f5e38b4d5_0th.jpg",
        "panelPhoto": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/68334b70b33146129bcdb65f_N150TH-scaled.jpg",
        "sortOrder": 1,
        "homeBase": "KMMU - Morristown, NJ",
        "hourlyRate": "155",
        "status": "Active",
        "current": true,
        "adminTitle": "N150TH · 2003 Cessna 172SP"
      },
      {
        "tailNumber": "N123GG",
        "slug": "n123gg",
        "aircraftType": "Cessna 172SP",
        "modelYear": "2004",
        "details": "The Club’s newest aircraft, and currently equipped with the most modern avionics in our fleet. *2023 avionics upgrade.* || 180HP fuel-injected Lycoming engine || Reiff electric engine preheat system || GTN 650Xi WAAS GPS navigation/com || Dual Garmin GI 275s || Flight Stream 210 wireless communicator || Marker beacon receiver || King KX155A NAV/COM || GTX-327 transponder with Mode C || KMA-28 4-place intercom || KAP-140 2-axis autopilot with altitude pre-select || 406 MHz ELT || FreeFlight FDL-978 ADS-B IN / OUT || Rosen sun visors || CiES fuel level sending units || TA102 Mid-Continent dual USB power port || HID 35W landing/taxi light upgrade installed || Whelen wingtip LED strobes || SureFly SIM4P electronic ignition",
        "aircraftPhoto": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/68334ceb8e547d803b8c8229_123gg.jpg",
        "panelPhoto": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/68334cfedf5f1f8dd46c4203_N123GG-GTN-650-scaled.jpg",
        "sortOrder": 2,
        "homeBase": "KSMQ - Somerset, NJ",
        "hourlyRate": "155",
        "status": "Active",
        "current": true,
        "adminTitle": "N123GG · 2004 Cessna 172SP"
      },
      {
        "tailNumber": "N792MD",
        "slug": "n792md",
        "aircraftType": "Cessna 172SP",
        "modelYear": "2004",
        "details": "The only aircraft in our fleet with installed air conditioning, 792MD tends to be popular in the summer months. Though with the accompanying reduction in useful load, this is likely not the plane to take four adults on long trips. || 180HP fuel-injected Lycoming engine || Reiff electric engine preheat system || Dual King KX155A NAV/COM radios || KCS-55A compass system with HSI || Keith air conditioning || Marker beacon receiver || KLN-94 IFR-certified GPS || GTX-327 transponder with Mode C || Dual vacuum pumps || KMA-28 4-place intercom || KAP-140 2-axis autopilot with altitude pre-select || KMD-550 multifunction display || 406 MHz ELT || FreeFlight FDL-978 ADS-B IN / OUT || Rosen sun visors || CiES fuel level sending units || TA102 Mid-Continent dual USB power port || SureFly SIM4P electronic ignition || Whelen Parmetheus Pro LED landing light",
        "aircraftPhoto": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/68334ffd74d1d2ed562c4ebd_792md.jpg",
        "panelPhoto": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/6833501edd31e21371e10d8b_792panel.jpg",
        "sortOrder": 3,
        "homeBase": "KSMQ - Somerset, NJ",
        "hourlyRate": "155",
        "status": "Active",
        "current": true,
        "adminTitle": "N792MD · 2004 Cessna 172SP"
      },
      {
        "tailNumber": "N645PD",
        "slug": "n645pd",
        "aircraftType": "Cessna 172",
        "modelYear": "2000",
        "details": "One of the Club’s workhorses. When maintenance issues keep other planes out of service, 645PD seems to always be there when we need her. || 180HP fuel-injected Lycoming engine || SureFly SIM4P electronic ignition || Dual King KX155A NAV/COM radios || KLN-94 IFR-certified GPS || GTX-327 transponder with Mode C || Dual vacuum pumps || KMA-26 4-place intercom || KAP-140 2-axis autopilot with altitude pre-select || KMD-550 multifunction display || 406 MHz ELT || FreeFlight FDL-978 ADS-B IN / OUT || CiES fuel level sending units || TA102 Mid-Continent dual USB power port || HID 85W landing/taxi light upgrade installed",
        "aircraftPhoto": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/68334dcae4a085dddde0d7cb_645pd.jpg",
        "panelPhoto": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/68334de9e42a265d3db5b904_5PDpanel-ADS-1.jpg",
        "sortOrder": 4,
        "homeBase": "KMMU - Morristown, NJ",
        "hourlyRate": "155",
        "status": "Active",
        "current": true,
        "adminTitle": "N645PD · 2000 Cessna 172"
      }
    ]
  },
  "Test Customer": {
    "heroEyebrow": "Assets",
    "heroTitle": "Equipment / Assets",
    "heroIntro": "A public asset page can list aircraft, vehicles, equipment, rooms, or other customer-managed resources.",
    "stats": [
      {
        "value": "DATA",
        "text": "Rendered from reusable records."
      },
      {
        "value": "MEDIA",
        "text": "Photos can remain legacy URLs until migrated."
      },
      {
        "value": "SAFE",
        "text": "Public display only."
      }
    ],
    "introLabel": "Overview",
    "introTitle": "Reusable asset-page model",
    "introText": "The same page structure can support a non-aviation customer later.",
    "note": "Prototype display only.",
    "aircraft": []
  }
};

function esc(v){return String(v==null?"":v).replace(/[&<>\"']/g,function(m){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m];});}
function clean(v){return v==null?"":String(v).trim();}
function byId(id){return document.getElementById(id);}
function root(){return byId(ROOT_ID);}
function obj(v){return v&&typeof v==="object"&&!Array.isArray(v)?v:{};}
function arr(v){return Array.isArray(v)?v:[];}
function cloneSelected(v){return {layout:v.layout,style:v.style,typography:v.typography,color:v.color,effect:v.effect,designProfile:v.designProfile,shadow:v.shadow,border:v.border,corner:v.corner,gradient:v.gradient,siteWidth:v.siteWidth,headerTreatment:v.headerTreatment,heroTreatment:v.heroTreatment,sectionRhythm:v.sectionRhythm,density:v.density,motion:v.motion,background:v.background,imageTreatment:v.imageTreatment,dividerStyle:v.dividerStyle,emphasisStyle:v.emphasisStyle,surfaceStyle:v.surfaceStyle};}
function sameSelected(a,b){return clean(a.layout)===clean(b.layout)&&clean(a.style)===clean(b.style)&&clean(a.typography)===clean(b.typography)&&clean(a.color)===clean(b.color)&&clean(a.effect)===clean(b.effect)&&clean(a.designProfile)===clean(b.designProfile)&&clean(a.shadow)===clean(b.shadow)&&clean(a.border)===clean(b.border)&&clean(a.corner)===clean(b.corner)&&clean(a.gradient)===clean(b.gradient)&&clean(a.siteWidth)===clean(b.siteWidth)&&clean(a.headerTreatment)===clean(b.headerTreatment)&&clean(a.heroTreatment)===clean(b.heroTreatment)&&clean(a.sectionRhythm)===clean(b.sectionRhythm)&&clean(a.density)===clean(b.density)&&clean(a.motion)===clean(b.motion)&&clean(a.background)===clean(b.background)&&clean(a.imageTreatment)===clean(b.imageTreatment)&&clean(a.dividerStyle)===clean(b.dividerStyle)&&clean(a.emphasisStyle)===clean(b.emphasisStyle)&&clean(a.surfaceStyle)===clean(b.surfaceStyle);}
function setText(selector,text){var r=root();if(!r)return;var el=r.querySelector(selector);if(el)el.textContent=text||"";}
function setHTML(selector,html){var r=root();if(!r)return;var el=r.querySelector(selector);if(el)el.innerHTML=html||"";}
function setDisabled(selector,disabled){var r=root();if(!r)return;r.querySelectorAll(selector).forEach(function(el){el.disabled=!!disabled;});}


function looksLikeJwt(token){
  token=clean(token);
  return /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(token);
}

function decodeJwtPayload(token){
  try{
    if(!looksLikeJwt(token))return {};
    var part=token.split('.')[1]||'';
    part=part.replace(/-/g,'+').replace(/_/g,'/');
    while(part.length%4)part+='=';
    return JSON.parse(atob(part));
  }catch(e){return {};}
}

function looksLikeSupabaseUserJwt(token){
  if(!looksLikeJwt(token))return false;
  var p=decodeJwtPayload(token);
  if(!p||typeof p!=="object")return false;
  if(p.exp&&Number(p.exp)*1000<Date.now())return false;
  return !!(p.sub&&(p.aud==="authenticated"||p.role==="authenticated"||(p.iss&&String(p.iss).indexOf("supabase")>=0)));
}

function findAccessToken(value,depth){
  if(!value||depth>6)return "";
  if(typeof value==="string"){
    if(looksLikeSupabaseUserJwt(value))return value;
    try{return findAccessToken(JSON.parse(value),depth+1);}catch(e){return "";}
  }
  if(typeof value!=="object")return "";
  if(value.access_token&&typeof value.access_token==="string"&&looksLikeSupabaseUserJwt(value.access_token))return value.access_token;
  if(value.currentSession&&value.currentSession.access_token&&looksLikeSupabaseUserJwt(value.currentSession.access_token))return value.currentSession.access_token;
  if(value.session&&value.session.access_token&&looksLikeSupabaseUserJwt(value.session.access_token))return value.session.access_token;
  if(value.data&&value.data.session&&value.data.session.access_token&&looksLikeSupabaseUserJwt(value.data.session.access_token))return value.data.session.access_token;
  var keys=Object.keys(value);
  for(var i=0;i<keys.length;i++){var found=findAccessToken(value[keys[i]],depth+1);if(found)return found;}
  return "";
}


function authStorageKey(){
  return "syncetc.platformAdminSession.v1";
}

function saveAuthSession(session){
  try{
    if(!session||!session.access_token)return;
    var expiresAt=0;
    if(session.expires_at)expiresAt=Number(session.expires_at)*1000;
    if(!expiresAt&&session.expires_in)expiresAt=Date.now()+Number(session.expires_in)*1000;
    var email=clean(session.user&&session.user.email);
    var record={access_token:session.access_token,refresh_token:session.refresh_token||"",expires_at:expiresAt,email:email};
    localStorage.setItem(authStorageKey(),JSON.stringify(record));
    state.authToken=record.access_token;
    state.authRefreshToken=record.refresh_token;
    state.authExpiresAt=record.expires_at;
    state.authEmail=record.email;
  }catch(e){}
}

function loadAuthSession(){
  try{
    var raw=localStorage.getItem(authStorageKey());
    if(!raw)return false;
    var record=JSON.parse(raw);
    if(!record||!looksLikeSupabaseUserJwt(record.access_token))return false;
    if(record.expires_at&&Number(record.expires_at)<Date.now()){clearAuthSession();return false;}
    state.authToken=record.access_token;
    state.authRefreshToken=record.refresh_token||"";
    state.authExpiresAt=Number(record.expires_at||0);
    state.authEmail=clean(record.email);
    return true;
  }catch(e){return false;}
}

function clearAuthSession(){
  try{localStorage.removeItem(authStorageKey());}catch(e){}
  state.authToken='';
  state.authRefreshToken='';
  state.authExpiresAt=0;
  state.authEmail='';
}

function platformAuthLabel(){
  return state.authEmail?("Signed in: "+state.authEmail):"Not signed in";
}

function signInPlatformAdmin(email,password){
  email=clean(email);
  password=String(password||"");
  if(!email||!password){state.error='Enter platform admin email and password.';state.notice='';updateStatus();return;}
  state.authBusy=true;
  state.error='';
  state.notice='Signing in...';
  renderFrame();
  bindAuthPanelActions();

  if(!ANON_KEY){
    state.authBusy=false;
    state.error='Login failed. Missing Supabase anon key on page.';
    state.notice='';
    renderFrame();
    bindAuthPanelActions();
    return;
  }

  fetch(SUPABASE_URL+'/auth/v1/token?grant_type=password',{
    method:'POST',
    headers:{'Content-Type':'application/json','apikey':ANON_KEY},
    body:JSON.stringify({email:email,password:password})
  })
  .then(function(res){
    return res.json().catch(function(){return null;}).then(function(body){
      if(!res.ok||!body||!body.access_token){
        var msg=(body&&(body.error_description||body.msg||body.error))||('HTTP '+res.status);
        throw new Error('Login failed. '+msg);
      }
      return body;
    });
  })
  .then(function(session){
    saveAuthSession(session);
    state.authBusy=false;
    state.authOpen=false;
    state.error='';
    state.notice='Signed in as '+(state.authEmail||email)+'.';
    loadCustomer();
  })
  .catch(function(err){
    state.authBusy=false;
    state.error=err&&err.message?err.message:String(err);
    state.notice='';
    renderFrame();
    bindAuthPanelActions();
  });
}


function bindAuthPanelActions(){
  var panel=document.querySelector('#'+ROOT_ID+' .ds-auth-panel');
  if(!panel)return;

  var emailEl=panel.querySelector('[data-ds-auth-email]');
  var passEl=panel.querySelector('[data-ds-auth-password]');
  var loginBtn=panel.querySelector('[data-ds-action="platform-login"]');

  function submitLogin(ev){
    if(ev){ev.preventDefault();ev.stopPropagation();}
    signInPlatformAdmin(emailEl?emailEl.value:'',passEl?passEl.value:'');
  }

  if(loginBtn)loginBtn.onclick=submitLogin;

  if(emailEl){
    emailEl.onkeydown=function(ev){
      if(ev&&ev.key==='Enter'){
        ev.preventDefault();
        if(passEl)passEl.focus();
      }
    };
  }

  if(passEl){
    passEl.onkeydown=function(ev){
      if(ev&&ev.key==='Enter')submitLogin(ev);
    };
  }
}

function renderAuthPanel(){
  if(!state.authOpen)return '';
  return '<div class="ds-auth-panel">'+
    '<div><label>Platform Admin Email</label><input type="email" autocomplete="username" data-ds-auth-email value="'+esc(state.authEmail||'')+'"></div>'+
    visibleStyleDiagnosticHtml()+'<div><label>Password</label><input type="password" autocomplete="current-password" data-ds-auth-password></div>'+
    '<button type="button" data-ds-action="platform-login">'+(state.authBusy?'Signing in...':'Sign In')+'</button>'+
  '</div>';
}

function getToken(){
  if(state.authToken&&looksLikeSupabaseUserJwt(state.authToken))return state.authToken;
  if(loadAuthSession()&&state.authToken&&looksLikeSupabaseUserJwt(state.authToken))return state.authToken;
  try{if(window.SyncEtc&&window.SyncEtc.AuthContext&&window.SyncEtc.AuthContext.getToken){var t=window.SyncEtc.AuthContext.getToken();if(looksLikeSupabaseUserJwt(t))return t;}}catch(e){}
  try{if(window.SyncEtc&&window.SyncEtc.AuthContext&&window.SyncEtc.AuthContext.getSnapshot){var s=window.SyncEtc.AuthContext.getSnapshot();var st=findAccessToken(s,0);if(st)return st;}}catch(e){}
  try{
    for(var i=0;i<localStorage.length;i++){
      var key=localStorage.key(i)||"";
      if(key.indexOf("auth")>=0||key.indexOf("sb-")===0||key.indexOf("supabase")>=0){var found=findAccessToken(localStorage.getItem(key),0);if(found)return found;}
    }
  }catch(e){}
  return "";
}

function installStyles(){
  if(byId(STYLE_ID))return;
  var style=document.createElement("style");
  style.id=STYLE_ID;
  style.textContent='\
    #'+ROOT_ID+',#'+ROOT_ID+' *{box-sizing:border-box}\
    #'+ROOT_ID+'{--ds-shell-max:1240px;--ds-sticky-top:0px;--ds-control-h:430px;--ds-primary:#12365a;--ds-accent:#2f80c4;--ds-soft:#eaf5ff;--ds-text:#17212b;--ds-muted:#5d6b78;--ds-bg:#fff;--ds-font:Arial,Helvetica,sans-serif;--ds-radius:22px;--ds-button-radius:999px;--ds-eyebrow-radius:999px;--ds-gap:18px;--ds-shadow:0 10px 28px rgba(12,38,64,.10);--ds-border:1px solid rgba(18,54,90,.14);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:#17212b;min-height:100vh;background:linear-gradient(180deg,#f7fbff 0%,#ffffff 220px);}\
    #'+ROOT_ID+' .ds-shell{max-width:var(--ds-shell-max);margin:0 auto;padding:24px 22px 64px;}\
    #'+ROOT_ID+' .ds-hero-top{display:flex;justify-content:space-between;align-items:flex-end;gap:22px;margin:0 0 18px;}\
    #'+ROOT_ID+' .ds-kicker{display:inline-flex;margin-bottom:8px;color:#607287;font-size:11px;font-weight:950;letter-spacing:.105em;text-transform:uppercase;}\
    #'+ROOT_ID+' h1{margin:0;color:#102a43;font-size:clamp(30px,4vw,46px);line-height:1.02;letter-spacing:-.04em;}\
    #'+ROOT_ID+' .ds-hero-top p{max-width:830px;margin:10px 0 0;color:#536171;font-size:15.5px;line-height:1.55;}\
    #'+ROOT_ID+' .ds-version{display:inline-flex;align-items:center;white-space:nowrap;border:1px solid rgba(18,54,90,.14);background:#fff;border-radius:999px;padding:7px 11px;color:#12365a;font-size:12px;font-weight:900;box-shadow:0 4px 14px rgba(12,38,64,.06);}\
    #'+ROOT_ID+' .ds-toolbar-wrap{position:sticky;top:var(--ds-sticky-top);z-index:50;min-height:var(--ds-control-h);margin:0 0 18px;}\
    #'+ROOT_ID+' .ds-toolbar{min-height:var(--ds-control-h);border:1px solid rgba(18,54,90,.16);border-radius:24px;background:rgba(255,255,255,.96);backdrop-filter:blur(14px);box-shadow:0 14px 38px rgba(12,38,64,.13);padding:14px;}\
    #'+ROOT_ID+' .ds-profile-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;align-items:end;}\
    #'+ROOT_ID+' .ds-toolbar-grid{display:grid;grid-template-columns:repeat(5,minmax(128px,1fr));gap:10px;align-items:end;margin-top:10px;padding-top:10px;border-top:1px solid rgba(18,54,90,.10);}\
    #'+ROOT_ID+' .ds-layout-grid,#'+ROOT_ID+' .ds-effect-grid,#'+ROOT_ID+' .ds-extra-grid{display:grid;grid-template-columns:repeat(5,minmax(128px,1fr));gap:10px;align-items:end;margin-top:10px;padding-top:10px;border-top:1px solid rgba(18,54,90,.10);}\
    #'+ROOT_ID+' .ds-field{min-width:0;}\
    #'+ROOT_ID+' .ds-field label{display:block;margin:0 0 5px;color:#12365a;font-size:10.5px;font-weight:950;letter-spacing:.06em;text-transform:uppercase;}\
    #'+ROOT_ID+' .ds-field select{width:100%;height:42px;border:1px solid rgba(18,54,90,.22);border-radius:12px;background:#fff;color:#17212b;padding:0 10px;font:inherit;font-size:12.5px;font-weight:750;line-height:42px;appearance:auto;outline:none;}\
    #'+ROOT_ID+' .ds-field select:focus{border-color:#2f80c4;box-shadow:0 0 0 3px rgba(47,128,196,.13);}\
    #'+ROOT_ID+' .ds-field select:disabled{background:#f8fafc;color:#94a3b8;}\
    #'+ROOT_ID+' .ds-help-line{display:none!important;}\
    #'+ROOT_ID+' .ds-toolbar-actions{display:flex;justify-content:flex-end;gap:12px;align-items:center;margin-top:12px;min-height:38px;}\
    #'+ROOT_ID+' .ds-status{height:42px;min-height:42px;box-sizing:border-box;border:1px solid rgba(18,54,90,.16);border-radius:12px;background:#f8fbff;color:#536171;font-size:11.5px;font-weight:850;line-height:1.1;padding:0 10px;display:flex;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}\
    #'+ROOT_ID+' .ds-status.good{color:#166534;}\
    #'+ROOT_ID+' .ds-status.warn{color:#92400e;}\
    #'+ROOT_ID+' .ds-status.error{color:#991b1b;}\
    #'+ROOT_ID+' .ds-actions{display:flex;gap:7px;flex-wrap:nowrap;justify-content:flex-end;align-items:center;width:100%;} #'+ROOT_ID+' .ds-actions .ds-btn{flex:0 0 auto;}\
    #'+ROOT_ID+' .ds-btn{display:inline-flex;align-items:center;justify-content:center;min-height:36px;border:1px solid #12365a;border-radius:999px;background:#12365a;color:#fff;padding:8px 10px;font:inherit;font-size:11px;font-weight:950;cursor:pointer;text-decoration:none;white-space:nowrap;}\
    #'+ROOT_ID+' .ds-btn.secondary{background:#fff;color:#12365a;border-color:rgba(18,54,90,.22);}\
    #'+ROOT_ID+' .ds-btn:disabled{opacity:.55;cursor:not-allowed;}\
    #'+ROOT_ID+' .ds-preview-panel{border:0;border-radius:0;background:transparent;box-shadow:none;overflow:visible;}\
    #'+ROOT_ID+' .ds-preview-head{display:flex;justify-content:space-between;gap:14px;align-items:center;padding:16px 18px;border:1px solid rgba(18,54,90,.14);border-radius:24px;background:#fff;box-shadow:0 12px 30px rgba(12,38,64,.10);margin-bottom:14px;}\
    #'+ROOT_ID+' .ds-preview-head h2{margin:0;color:#12365a;font-size:18px;line-height:1.2;}\
    #'+ROOT_ID+' .ds-preview-head p{margin:4px 0 0;color:#64748b;font-size:12.5px;line-height:1.35;}\
    #'+ROOT_ID+' .ds-chip-row{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end;}\
    #'+ROOT_ID+' .ds-chip{display:inline-flex;border-radius:999px;background:#eef6ff;color:#12365a;border:1px solid rgba(18,54,90,.12);padding:5px 8px;font-size:11px;font-weight:900;}\
    #'+ROOT_ID+' .ds-preview-boundary{margin:0 0 10px;color:#334155;font-size:11px;font-weight:950;letter-spacing:.08em;text-transform:uppercase;}\
    #'+ROOT_ID+' .ds-preview-boundary:after{content:"";display:block;border-top:1px solid rgba(15,23,42,.20);margin-top:7px;}\
    #'+ROOT_ID+' .ds-preview-frame{padding:0;background:transparent;min-height:660px;}\
    #'+ROOT_ID+' .ds-preview{min-height:620px;border-radius:var(--preview-radius,24px);border:var(--preview-border,1px solid rgba(18,54,90,.14));background:var(--ds-bg,#fff);box-shadow:var(--preview-shadow,0 12px 34px rgba(12,38,64,.10));overflow:hidden;transition:var(--ds-transition,background .16s ease,border-color .16s ease,box-shadow .16s ease);}\
    #'+ROOT_ID+' .ds-preview-inner{padding:var(--ds-pad,28px);font-family:var(--ds-font,Arial,Helvetica,sans-serif);color:var(--ds-text,#17212b);}\
    #'+ROOT_ID+' .ds-preview-header{display:grid;grid-template-columns:92px minmax(0,1fr) auto;gap:16px;align-items:center;margin-bottom:var(--ds-gap,22px);padding:var(--ds-header-pad,14px);border:var(--ds-header-border,var(--ds-border));border-radius:var(--ds-header-radius,var(--ds-radius));box-shadow:var(--ds-header-shadow,var(--ds-shadow));background:var(--ds-header-bg,var(--ds-card,#fff));}\
    #'+ROOT_ID+' .ds-logo-box{height:72px;border-radius:var(--ds-logo-radius,var(--ds-radius));border:var(--ds-logo-border,var(--ds-border));background:var(--ds-logo-bg,var(--ds-soft));display:flex;align-items:center;justify-content:center;color:var(--ds-primary);font-weight:1000;}\
    #'+ROOT_ID+' .ds-customer-name{font-size:19px;font-weight:950;color:var(--ds-primary);}\
    #'+ROOT_ID+' .ds-preview-nav{display:flex;gap:9px;flex-wrap:wrap;margin-top:8px;}\
    #'+ROOT_ID+' .ds-preview-nav span{font-size:12px;font-weight:850;color:var(--ds-primary);padding:5px 8px;border-radius:var(--ds-button-radius);background:var(--ds-soft);}\
    #'+ROOT_ID+' .ds-mini-btn{display:inline-flex;align-items:center;justify-content:center;min-height:34px;border-radius:var(--ds-button-radius);border:var(--ds-border);background:var(--ds-primary);color:#fff;padding:7px 11px;font-size:12px;font-weight:950;}\
    #'+ROOT_ID+' .ds-page-hero{padding:var(--ds-hero-pad,30px);margin-bottom:var(--ds-gap,22px);border:var(--ds-hero-border,var(--ds-border));border-radius:var(--ds-hero-radius,var(--ds-radius));box-shadow:var(--ds-shadow);background:var(--ds-hero-bg,linear-gradient(135deg,var(--ds-primary),var(--ds-accent)));color:var(--ds-hero-text,#fff);}\
    #'+ROOT_ID+' .ds-eyebrow{display:inline-flex;margin-bottom:10px;padding:var(--ds-eyebrow-pad,5px 10px);border-radius:var(--ds-eyebrow-radius);background:var(--ds-eyebrow-bg,rgba(255,255,255,.16));border:var(--ds-eyebrow-border,1px solid rgba(255,255,255,.22));font-size:11px;font-weight:950;letter-spacing:.08em;text-transform:uppercase;}\
    #'+ROOT_ID+' .ds-page-hero h3{margin:0;color:inherit;font-size:var(--ds-title-size,38px);line-height:1.04;letter-spacing:-.04em;}\
    #'+ROOT_ID+' .ds-page-hero p{max-width:780px;margin:12px 0 0;color:var(--ds-hero-muted,rgba(255,255,255,.88));font-size:15px;line-height:1.58;}\
    #'+ROOT_ID+' .ds-grid{display:grid;grid-template-columns:var(--ds-grid,1fr 1fr);gap:var(--ds-gap,18px);}\
    #'+ROOT_ID+' .ds-card{padding:var(--ds-card-pad,20px);border:var(--ds-card-border,var(--ds-border));border-radius:var(--ds-card-radius,var(--ds-radius));box-shadow:var(--ds-card-shadow,var(--ds-shadow));background:var(--ds-card,#fff);}\
    #'+ROOT_ID+' .ds-card h4{margin:0 0 8px;color:var(--ds-primary);font-size:18px;line-height:1.2;}\
    #'+ROOT_ID+' .ds-card p{margin:0;color:var(--ds-muted);font-size:14px;line-height:1.55;}\
    #'+ROOT_ID+' .ds-card-meta{margin-top:14px;padding-top:12px;border-top:var(--ds-divider,1px solid rgba(18,54,90,.10));color:var(--ds-muted);font-size:12px;font-weight:800;}\
    #'+ROOT_ID+' .ds-skeleton .ds-field select{color:transparent;background:linear-gradient(90deg,#f1f5f9,#ffffff,#f1f5f9);background-size:200% 100%;animation:dsShimmer 1.2s linear infinite;}\
    #'+ROOT_ID+' .ds-skeleton .ds-help-line{color:transparent;background:#eef2f7;border-radius:6px;}\
    #'+ROOT_ID+' .ds-side-tab{position:fixed;right:0;top:42%;z-index:70;writing-mode:vertical-rl;transform:translateY(-50%);border:1px solid rgba(18,54,90,.20);border-right:0;border-radius:14px 0 0 14px;background:#12365a;color:#fff;padding:12px 8px;font-size:11px;font-weight:950;letter-spacing:.05em;text-transform:uppercase;box-shadow:0 12px 26px rgba(12,38,64,.18);cursor:pointer;}\
    #'+ROOT_ID+' .ds-side-drawer{position:fixed;right:0;top:0;bottom:0;width:min(390px,92vw);z-index:80;background:#fff;border-left:1px solid rgba(18,54,90,.16);box-shadow:-18px 0 42px rgba(12,38,64,.18);transform:translateX(102%);transition:transform .18s ease;display:flex;flex-direction:column;}\
    #'+ROOT_ID+' .ds-side-drawer.is-open{transform:translateX(0);}\
    #'+ROOT_ID+' .ds-side-head{padding:16px;border-bottom:1px solid rgba(18,54,90,.10);display:flex;align-items:flex-start;justify-content:space-between;gap:14px;}\
    #'+ROOT_ID+' .ds-side-head h3{margin:0;color:#12365a;font-size:18px;line-height:1.15;}\
    #'+ROOT_ID+' .ds-side-head p{margin:6px 0 0;color:#64748b;font-size:12px;line-height:1.4;}\
    #'+ROOT_ID+' .ds-side-body{padding:16px;overflow:auto;color:#334155;font-size:13px;line-height:1.5;}\
    #'+ROOT_ID+' .ds-side-close{border:1px solid rgba(18,54,90,.20);background:#fff;color:#12365a;border-radius:999px;width:34px;height:34px;font-weight:950;cursor:pointer;}\
    #'+ROOT_ID+' .ds-side-disabled{border:1px dashed rgba(18,54,90,.25);border-radius:16px;background:#f8fafc;padding:14px;color:#475569;font-weight:750;}\
    @keyframes dsShimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}\
    #'+ROOT_ID+' .ds-customer-preview .ds-grid-card{border-top:1px solid var(--ds-divider,rgba(18,54,90,.12));}\
    #'+ROOT_ID+' .ds-card-note{display:inline-flex;border-radius:var(--ds-emphasis-radius,999px);}\
    #'+ROOT_ID+' .ds-preview-bubble{display:none!important;}\
    #'+ROOT_ID+' .ds-preview-boundary{margin:18px 0 0!important;padding:0 0 6px!important;border:0!important;background:transparent!important;border-radius:0!important;box-shadow:none!important;color:#475569!important;font-size:12px!important;font-weight:900!important;text-transform:uppercase!important;letter-spacing:.06em!important;}\
    #'+ROOT_ID+' .ds-preview-head{display:none!important;}\
    #'+ROOT_ID+' .ds-preview-bubble{display:none!important;}\
    #'+ROOT_ID+' .ds-preview-boundary{margin:18px 0 0!important;padding:0 0 6px!important;border:0!important;background:transparent!important;border-radius:0!important;box-shadow:none!important;color:#475569!important;font-size:12px!important;font-weight:950!important;text-transform:uppercase!important;letter-spacing:.06em!important;}\
    #'+ROOT_ID+' .ds-full-preview .ds-control-wrap,#'+ROOT_ID+' .ds-full-preview .ds-hero,#'+ROOT_ID+' .ds-full-preview .ds-preview-bubble,#'+ROOT_ID+' .ds-full-preview .ds-preview-boundary,#'+ROOT_ID+' .ds-full-preview .ds-page-tab,#'+ROOT_ID+' .ds-full-preview .ds-side-drawer{display:none!important;}\
    #'+ROOT_ID+' .ds-full-preview .ds-shell{max-width:none!important;padding:0!important;}\
    #'+ROOT_ID+' .ds-full-preview .ds-preview-outer{margin:0!important;}\
    #'+ROOT_ID+' .ds-full-preview .ds-customer-preview{min-height:100vh!important;}\
    #'+ROOT_ID+' .ds-exit-full{position:fixed;right:16px;top:16px;z-index:10000;border:1px solid rgba(18,54,90,.24);border-radius:999px;background:#fff;color:#12365a;font-weight:950;font-size:12px;padding:10px 14px;box-shadow:0 14px 30px rgba(12,38,64,.18);cursor:pointer;}\
    #'+ROOT_ID+' .ds-exit-full:hover{border-color:#12365a;}\
    #'+ROOT_ID+' .ds-preview-head,#'+ROOT_ID+' .ds-preview-bubble,#'+ROOT_ID+' [data-ds-chips],#'+ROOT_ID+' [data-ds-preview-tags]{display:none!important;}\
    #'+ROOT_ID+' .ds-preview-boundary{margin:18px 0 0!important;padding:0 0 6px!important;border:0!important;background:transparent!important;border-radius:0!important;box-shadow:none!important;color:#475569!important;font-size:12px!important;font-weight:950!important;text-transform:uppercase!important;letter-spacing:.06em!important;}\
    #'+ROOT_ID+' .ds-exit-full{position:fixed;right:16px;top:16px;z-index:10000;border:1px solid rgba(18,54,90,.24);border-radius:999px;background:#fff;color:#12365a;font-weight:950;font-size:12px;padding:10px 14px;box-shadow:0 14px 30px rgba(12,38,64,.18);cursor:pointer;}\
    #'+ROOT_ID+'.ds-full-preview .ds-control-wrap,#'+ROOT_ID+'.ds-full-preview .ds-hero-top,#'+ROOT_ID+'.ds-full-preview .ds-preview-boundary,#'+ROOT_ID+'.ds-full-preview .ds-side-tab,#'+ROOT_ID+'.ds-full-preview .ds-side-drawer{display:none!important;}\
    #'+ROOT_ID+'.ds-full-preview .ds-shell{max-width:none!important;padding:0!important;}\
    #'+ROOT_ID+'.ds-full-preview .ds-preview-panel{margin:0!important;border:0!important;box-shadow:none!important;border-radius:0!important;}\
    #'+ROOT_ID+'.ds-full-preview .ds-preview-frame{margin:0!important;}\
    #'+ROOT_ID+'.ds-full-preview .ds-customer-preview{min-height:100vh!important;}\
    /* true preview isolation v10 */\
    #'+ROOT_ID+'.ds-full-preview{background:var(--ds-bg,#fff)!important;}\
    #'+ROOT_ID+'.ds-full-preview .ds-hero-top,#'+ROOT_ID+'.ds-full-preview .ds-toolbar-wrap,#'+ROOT_ID+'.ds-full-preview .ds-preview-boundary,#'+ROOT_ID+'.ds-full-preview .ds-side-tab,#'+ROOT_ID+'.ds-full-preview .ds-side-drawer{display:none!important;}\
    #'+ROOT_ID+'.ds-full-preview .ds-shell{max-width:none!important;width:100%!important;margin:0!important;padding:0!important;}\
    #'+ROOT_ID+'.ds-full-preview .ds-preview-panel{margin:0!important;border:0!important;border-radius:0!important;box-shadow:none!important;background:transparent!important;}\
    #'+ROOT_ID+'.ds-full-preview .ds-preview-frame{margin:0!important;padding:0!important;min-height:100vh!important;}\
    #'+ROOT_ID+'.ds-full-preview .ds-preview{min-height:100vh!important;border-radius:0!important;}\
    #'+ROOT_ID+'.ds-full-preview .ds-customer-preview{min-height:100vh!important;}\
    /* v11 clutter reduction */\
    #'+ROOT_ID+' .ds-help{display:none!important;}\
    #'+ROOT_ID+' .ds-field{gap:5px!important;}\
    #'+ROOT_ID+' .ds-profile-grid,#'+ROOT_ID+' .ds-toolbar-grid,#'+ROOT_ID+' .ds-layout-grid,#'+ROOT_ID+' .ds-effect-grid,#'+ROOT_ID+' .ds-extra-grid{align-items:end;}\
    /* v16 platform login */\
    #'+ROOT_ID+' .ds-status-shell{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;align-items:center;width:100%;}\
    #'+ROOT_ID+' .ds-auth-btn{height:28px;border:1px solid rgba(18,54,90,.22);border-radius:999px;background:#fff;color:#12365a;font:inherit;font-size:10.5px;font-weight:950;padding:0 9px;cursor:pointer;white-space:nowrap;}\
    #'+ROOT_ID+' .ds-auth-panel{margin-top:10px;border:1px solid rgba(18,54,90,.16);border-radius:16px;background:#ffffff;padding:12px;box-shadow:0 10px 24px rgba(18,54,90,.08);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr) auto;gap:8px;align-items:end;}\
    #'+ROOT_ID+' .ds-auth-panel label{display:block;color:#5c6c7d;font-size:10.5px;font-weight:950;text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px;}\
    #'+ROOT_ID+' .ds-auth-panel input{width:100%;height:36px;box-sizing:border-box;border:1px solid rgba(18,54,90,.18);border-radius:12px;background:#fff;color:#12365a;font:inherit;font-size:12px;font-weight:800;padding:0 10px;}\
    #'+ROOT_ID+' .ds-auth-panel button{height:36px;border:1px solid #12365a;border-radius:999px;background:#12365a;color:#fff;font:inherit;font-size:11px;font-weight:950;padding:0 12px;cursor:pointer;white-space:nowrap;}\
    /* v23 page text side loader */\
    #'+ROOT_ID+' .ds-side-tools{display:grid;grid-template-columns:1fr;gap:12px;}\
    #'+ROOT_ID+' .ds-side-select{width:100%;height:38px;border:1px solid rgba(18,54,90,.18);border-radius:12px;background:#fff;color:#12365a;font:inherit;font-size:12px;font-weight:850;padding:0 10px;}\
    #'+ROOT_ID+' .ds-side-form{display:grid;gap:12px;margin-top:14px;}\
    #'+ROOT_ID+' .ds-side-form .ds-page-field{display:grid;gap:5px;}\
    #'+ROOT_ID+' .ds-side-form label{color:#5c6c7d;font-size:10.5px;font-weight:950;text-transform:uppercase;letter-spacing:.04em;}\
    #'+ROOT_ID+' .ds-page-input,#'+ROOT_ID+' .ds-page-textarea{width:100%;box-sizing:border-box;border:1px solid rgba(18,54,90,.18);border-radius:12px;background:#fff;color:#12365a;font:inherit;font-size:12px;font-weight:750;padding:9px 10px;}\
    #'+ROOT_ID+' .ds-page-input{height:38px;}\
    #'+ROOT_ID+' .ds-page-textarea{min-height:86px;resize:vertical;line-height:1.45;}\
    #'+ROOT_ID+' .ds-side-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;}\
    #'+ROOT_ID+' .ds-side-actions .ds-btn{min-height:34px;font-size:11px;padding:7px 11px;}\
    #'+ROOT_ID+' .ds-side-note{margin-top:10px;border:1px solid rgba(18,54,90,.12);border-radius:12px;background:#f8fafc;padding:10px;color:#475569;font-size:12px;font-weight:750;line-height:1.4;}\
    /* v24 selected page preview */\
    #'+ROOT_ID+' .ds-selected-page-preview{background:var(--ds-page-bg,#fff);border:1px solid rgba(18,54,90,.10);border-radius:22px;box-shadow:0 14px 36px rgba(18,54,90,.10);overflow:hidden;}\
    #'+ROOT_ID+' .ds-selected-page-shell{padding:28px;display:grid;gap:18px;}\
    #'+ROOT_ID+' .ds-selected-page-hero{border-radius:22px;background:linear-gradient(135deg,var(--ds-primary,#12365a),var(--ds-accent,#1d6fa3));color:#fff;padding:34px;display:grid;gap:12px;}\
    #'+ROOT_ID+' .ds-selected-page-eyebrow{display:inline-flex;width:max-content;border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:7px 11px;font-size:11px;font-weight:950;text-transform:uppercase;letter-spacing:.06em;background:rgba(255,255,255,.12);}\
    #'+ROOT_ID+' .ds-selected-page-title{margin:0;font-size:34px;line-height:1.05;font-weight:950;letter-spacing:-.02em;}\
    #'+ROOT_ID+' .ds-selected-page-intro{max-width:760px;font-size:15px;line-height:1.55;font-weight:750;opacity:.95;}\
    #'+ROOT_ID+' .ds-selected-page-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;}\
    #'+ROOT_ID+' .ds-selected-page-card{border:1px solid rgba(18,54,90,.12);border-radius:18px;background:#fff;padding:18px;box-shadow:0 8px 22px rgba(18,54,90,.07);}\
    #'+ROOT_ID+' .ds-selected-page-card strong{display:block;color:#12365a;font-size:12px;font-weight:950;text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px;}\
    #'+ROOT_ID+' .ds-selected-page-card p{margin:0;color:#334155;font-size:13px;line-height:1.45;font-weight:750;}\
    #'+ROOT_ID+' .ds-selected-page-section{border:1px solid rgba(18,54,90,.12);border-radius:18px;background:#fff;padding:20px;box-shadow:0 8px 22px rgba(18,54,90,.06);}\
    #'+ROOT_ID+' .ds-selected-page-section h3{margin:0 0 8px;color:#12365a;font-size:18px;font-weight:950;}\
    #'+ROOT_ID+' .ds-selected-page-section p{margin:0;color:#334155;font-size:13px;line-height:1.55;font-weight:750;}\
    #'+ROOT_ID+' .ds-selected-page-note{color:#64748b;font-size:12px;font-weight:800;text-align:center;}\
    /* v28 page text mode layout */\
    #'+ROOT_ID+'.ds-page-text-mode .ds-toolbar-wrap{display:none!important;}\
    #'+ROOT_ID+'.ds-page-text-mode .ds-preview-outer{margin-right:430px!important;transition:margin-right .18s ease;}\
    #'+ROOT_ID+'.ds-page-text-mode .ds-preview-panel{min-height:520px;}\
    #'+ROOT_ID+'.ds-page-text-mode .ds-selected-page-preview{min-height:520px;}\
    #'+ROOT_ID+'.ds-page-text-mode .ds-preview-boundary{color:#475569;}\
    #'+ROOT_ID+'.ds-page-text-mode .ds-side-drawer{width:400px;}\
    /* v31 Assets drawer patch - BEGIN */\
    #'+ROOT_ID+'.ds-page-text-mode .ds-hero-top{display:none!important;}\
    #'+ROOT_ID+'.ds-page-text-mode .ds-toolbar-wrap{display:none!important;}\
    #'+ROOT_ID+'.ds-page-text-mode .ds-preview-boundary{display:none!important;}\
    #'+ROOT_ID+'.ds-page-text-mode .ds-shell{max-width:none!important;width:calc(100vw - 430px)!important;margin:0 430px 0 0!important;padding-left:34px!important;padding-right:24px!important;transition:width .18s ease,margin .18s ease;}\
    #'+ROOT_ID+'.ds-page-text-mode .ds-preview-panel{min-height:calc(100vh - 40px);}\
    #'+ROOT_ID+'.ds-page-text-mode .ds-preview-outer{margin-right:0!important;}\
    #'+ROOT_ID+'.ds-page-text-mode .ds-side-drawer{width:410px;}\
    #'+ROOT_ID+'.ds-page-text-mode .ds-side-tab{display:none!important;}\
    #'+ROOT_ID+' .ds-side-actions .ds-btn[disabled]{opacity:.42;cursor:not-allowed;}\
    @media(max-width:900px){#'+ROOT_ID+'.ds-page-text-mode .ds-shell{width:100%!important;margin-right:0!important;padding:18px 14px 520px!important;}#'+ROOT_ID+'.ds-page-text-mode .ds-side-drawer{width:100%;top:auto;height:520px;border-left:0;border-top:1px solid rgba(18,54,90,.16);}}\
    /* v31 Assets drawer patch - END */\
    /* v32 Assets preview text color specificity patch - BEGIN */\
    #'+ROOT_ID+' .ds-preview-panel .aero-fleet-hero,\
    #'+ROOT_ID+' .ds-preview-panel .aero-fleet-hero h1,\
    #'+ROOT_ID+' .ds-preview-panel .aero-fleet-hero p,\
    #'+ROOT_ID+' .ds-preview-panel .aero-fleet-eyebrow,\
    #'+ROOT_ID+' .ds-preview-panel .aero-fleet-stat,\
    #'+ROOT_ID+' .ds-preview-panel .aero-fleet-stat strong,\
    #'+ROOT_ID+' .ds-preview-panel .aero-fleet-stat span{color:#fff!important;}\
    #'+ROOT_ID+' .ds-preview-panel .aero-fleet-intro-card h2,\
    #'+ROOT_ID+' .ds-preview-panel .aero-tail-number{color:var(--se-aero-navy-dark,#0b2744)!important;}\
    #'+ROOT_ID+' .ds-preview-panel .aero-fleet-intro-card p,\
    #'+ROOT_ID+' .ds-preview-panel .aero-aircraft-copy p,\
    #'+ROOT_ID+' .ds-preview-panel .aero-aircraft-copy li{color:var(--se-aero-text,#1e2933)!important;}\
    #'+ROOT_ID+' .ds-preview-panel .aero-section-label{color:var(--se-aero-navy,#12365a)!important;}\
    /* v32 Assets preview text color specificity patch - END */\
    /* v33 Supabase style diagnostic mode - BEGIN */\
    #'+ROOT_ID+' .ds-supabase-style-warning{margin:0 0 14px;border:3px solid #991b1b;border-radius:18px;background:repeating-linear-gradient(45deg,#fee2e2 0,#fee2e2 12px,#fff 12px,#fff 24px);color:#7f1d1d;padding:16px 18px;box-shadow:0 14px 34px rgba(127,29,29,.18);font-weight:950;}\
    #'+ROOT_ID+' .ds-supabase-style-warning strong{display:block;font-size:18px;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px;color:#7f1d1d!important;}\
    #'+ROOT_ID+' .ds-supabase-style-warning span{display:block;font-size:12px;line-height:1.45;font-weight:850;color:#7f1d1d!important;}\
    #'+ROOT_ID+' .ds-supabase-style-warning .ds-missing-list{margin-top:8px;font-family:monospace;font-size:12px;background:rgba(255,255,255,.8);border:1px solid rgba(127,29,29,.25);border-radius:10px;padding:8px;white-space:normal;color:#7f1d1d!important;}\
    @keyframes dsMissingPulse{0%,100%{outline-color:#991b1b;}50%{outline-color:#f97316;}}\
    #'+ROOT_ID+'.ds-style-diagnostic-missing [data-ds-preview-frame]{outline:5px solid #991b1b;outline-offset:4px;animation:dsMissingPulse .9s infinite;}\
    /* v33 Supabase style diagnostic mode - END */\
    /* v34 branded Design Studio login gate - BEGIN */\
    #'+ROOT_ID+'.ds-login-only{min-height:100vh;background:radial-gradient(circle at top left,rgba(47,128,196,.28),transparent 34%),linear-gradient(135deg,#07192b 0%,#12365a 48%,#2f80c4 100%);display:flex;align-items:center;justify-content:center;padding:28px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:#fff;}\
    #'+ROOT_ID+' .ds-login-card{width:min(520px,100%);border:1px solid rgba(255,255,255,.22);border-radius:30px;background:rgba(255,255,255,.94);box-shadow:0 28px 80px rgba(0,0,0,.32);overflow:hidden;color:#12365a;}\
    #'+ROOT_ID+' .ds-login-brand{padding:32px 32px 24px;background:linear-gradient(135deg,rgba(18,54,90,.98),rgba(47,128,196,.94));text-align:center;color:#fff;}\
    #'+ROOT_ID+' .ds-login-logo-wrap{width:132px;height:132px;margin:0 auto 16px;border-radius:28px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 18px 42px rgba(0,0,0,.22);border:1px solid rgba(255,255,255,.36);}\
    #'+ROOT_ID+' .ds-login-logo{max-width:106px;max-height:106px;object-fit:contain;display:block;}\
    #'+ROOT_ID+' .ds-login-brand h1{margin:0;color:#fff;font-size:34px;line-height:1;font-weight:950;letter-spacing:-.04em;}\
    #'+ROOT_ID+' .ds-login-brand p{margin:10px auto 0;max-width:360px;color:rgba(255,255,255,.86);font-size:14px;line-height:1.45;font-weight:750;}\
    #'+ROOT_ID+' .ds-login-body{padding:26px 30px 30px;display:grid;gap:14px;}\
    #'+ROOT_ID+' .ds-login-body label{display:block;margin-bottom:6px;color:#24496c;font-size:11px;font-weight:950;text-transform:uppercase;letter-spacing:.08em;}\
    #'+ROOT_ID+' .ds-login-body input{width:100%;height:44px;border:1px solid rgba(18,54,90,.18);border-radius:14px;background:#fff;color:#12365a;font:inherit;font-size:14px;font-weight:800;padding:0 12px;box-shadow:0 4px 14px rgba(18,54,90,.05);}\
    #'+ROOT_ID+' .ds-login-submit{height:44px;border:1px solid #12365a;border-radius:999px;background:#12365a;color:#fff;font:inherit;font-size:13px;font-weight:950;padding:0 18px;cursor:pointer;box-shadow:0 10px 22px rgba(18,54,90,.18);}\
    #'+ROOT_ID+' .ds-login-submit:disabled{opacity:.55;cursor:not-allowed;}\
    #'+ROOT_ID+' .ds-login-note{border:1px solid rgba(18,54,90,.12);border-radius:14px;background:#f8fafc;color:#536171;font-size:12px;line-height:1.45;font-weight:750;padding:11px 12px;}\
    #'+ROOT_ID+' .ds-login-error{border:1px solid rgba(153,27,27,.26);border-radius:14px;background:#fef2f2;color:#991b1b;font-size:12px;line-height:1.45;font-weight:850;padding:11px 12px;}\
    #'+ROOT_ID+' .ds-login-version{text-align:center;color:rgba(18,54,90,.55);font-size:11px;font-weight:850;padding-top:2px;}\
    /* v34 branded Design Studio login gate - END */\
    /* v35 detailed inheritance audit - BEGIN */\
    #'+ROOT_ID+' .ds-supabase-style-warning{border-color:#b45309;background:linear-gradient(135deg,#fffbeb,#fff7ed);color:#7c2d12;}\
    #'+ROOT_ID+' .ds-supabase-style-warning strong{color:#7c2d12!important;}\
    #'+ROOT_ID+' .ds-supabase-style-warning span{color:#7c2d12!important;}\
    #'+ROOT_ID+' .ds-inheritance-table{display:grid;gap:8px;margin-top:10px;}\
    #'+ROOT_ID+' .ds-inheritance-row{display:grid;grid-template-columns:170px 90px 1fr;gap:8px;align-items:start;border:1px solid rgba(124,45,18,.16);background:rgba(255,255,255,.82);border-radius:12px;padding:8px 10px;color:#12365a;}\
    #'+ROOT_ID+' .ds-inheritance-name{font-weight:950;font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:#12365a;}\
    #'+ROOT_ID+' .ds-inheritance-status{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:4px 8px;font-size:10px;font-weight:950;text-transform:uppercase;letter-spacing:.04em;}\
    #'+ROOT_ID+' .ds-inheritance-status.ok{background:#dcfce7;color:#166534;}\
    #'+ROOT_ID+' .ds-inheritance-status.warn{background:#fef3c7;color:#92400e;}\
    #'+ROOT_ID+' .ds-inheritance-status.fail{background:#fee2e2;color:#991b1b;}\
    #'+ROOT_ID+' .ds-inheritance-detail{font-family:monospace;font-size:11px;line-height:1.35;color:#334155;word-break:break-word;}\
    #'+ROOT_ID+' .ds-missing-list{display:none;}\
    /* v35 detailed inheritance audit - END */\
    /* v36 visible inheritance audit placement - BEGIN */\
    #'+ROOT_ID+' .ds-visible-inheritance-warning{max-width:1180px;margin:10px 0 18px;}\
    #'+ROOT_ID+' .ds-visible-inheritance-warning .ds-supabase-style-warning{margin:0;}\
    #'+ROOT_ID+' [data-ds-visible-inheritance-warning="true"]{max-width:1180px;margin:10px 0 18px;}\
    /* v36 visible inheritance audit placement - END */\
    /* v37 dropdown-backed audit - BEGIN */\
    #'+ROOT_ID+' .ds-inheritance-summary{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;}\
    #'+ROOT_ID+' .ds-inheritance-summary span{border-radius:999px;padding:5px 9px;font-size:10px;font-weight:950;text-transform:uppercase;letter-spacing:.04em;background:#eef2ff;color:#1e1b4b;}\
    #'+ROOT_ID+' .ds-audit-source-note{margin-top:8px;font-family:monospace;font-size:11px;line-height:1.35;color:#475569;}\
    /* v37 dropdown-backed audit - END */\
    @media(max-width:1080px){#'+ROOT_ID+' .ds-profile-grid,#'+ROOT_ID+' .ds-toolbar-grid,#'+ROOT_ID+' .ds-layout-grid,#'+ROOT_ID+' .ds-effect-grid,#'+ROOT_ID+' .ds-extra-grid{grid-template-columns:1fr 1fr;}#'+ROOT_ID+'{--ds-control-h:720px;}}\
    @media(max-width:760px){#'+ROOT_ID+' .ds-shell{padding:18px 14px 48px;}#'+ROOT_ID+' .ds-hero-top{display:block;}#'+ROOT_ID+' .ds-version{margin-top:12px;}#'+ROOT_ID+' .ds-profile-grid,#'+ROOT_ID+' .ds-toolbar-grid,#'+ROOT_ID+' .ds-layout-grid,#'+ROOT_ID+' .ds-effect-grid,#'+ROOT_ID+' .ds-extra-grid{grid-template-columns:1fr;}#'+ROOT_ID+'{--ds-control-h:1560px;}#'+ROOT_ID+' .ds-toolbar-actions{display:block;}#'+ROOT_ID+' .ds-actions{justify-content:flex-start;margin-top:10px;flex-wrap:wrap;}#'+ROOT_ID+' .ds-preview-head{display:block;}#'+ROOT_ID+' .ds-chip-row{justify-content:flex-start;margin-top:10px;}#'+ROOT_ID+' .ds-preview-header{grid-template-columns:1fr;}#'+ROOT_ID+' .ds-grid{grid-template-columns:1fr!important;}}\
  ';
  document.head.appendChild(style);
}


function installAircraftPreviewStyles(){
  var sid="syncetc-design-studio-aircraft-preview-v29-style";
  if(document.getElementById(sid))return;
  var style=document.createElement("style");
  style.id=sid;
  style.textContent=`
/* PAGE-DESIGN-STUDIO-v29 actual Aircraft preview CSS - BEGIN */
      .aero-fleet-page { max-width:1180px; margin:34px auto 56px; padding:0 18px; font-family:Arial, Helvetica, sans-serif; color:var(--se-aero-text, #1e2933); }
      .aero-fleet-shell { background:var(--se-aero-card, rgba(255,255,255,.94)); border:1px solid var(--se-aero-border, rgba(18,54,90,.16)); border-radius:var(--se-radius-xl, 26px); box-shadow:var(--se-shadow-lg, 0 18px 50px rgba(12,38,64,.22)); overflow:hidden; backdrop-filter:blur(8px); }
      .aero-fleet-hero { position:relative; padding:34px 34px 28px; background:linear-gradient(135deg, var(--se-aero-navy, #12365a), var(--se-aero-blue, #2f80c4)),radial-gradient(circle at top right, rgba(255,255,255,.34), transparent 36%); color:#fff; }
      .aero-fleet-eyebrow { display:inline-flex; align-items:center; gap:8px; margin-bottom:12px; padding:6px 12px; border-radius:999px; background:rgba(255,255,255,.16); border:1px solid rgba(255,255,255,.24); font-size:12px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
      .aero-fleet-hero h1 { margin:0; font-size:clamp(30px,4vw,48px); line-height:1.05; font-weight:800; letter-spacing:-.035em; color:#fff; }
      .aero-fleet-hero p { max-width:820px; margin:14px 0 0; font-size:17px; line-height:1.65; color:rgba(255,255,255,.9); }
      .aero-fleet-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-top:26px; }
      .aero-fleet-stat { padding:14px 16px; border-radius:var(--se-radius-md, 12px); background:rgba(255,255,255,.14); border:1px solid rgba(255,255,255,.22); }
      .aero-fleet-stat strong { display:block; margin-bottom:3px; font-size:22px; line-height:1; color:#fff; }
      .aero-fleet-stat span { display:block; font-size:13px; line-height:1.35; color:rgba(255,255,255,.82); }
      .aero-fleet-main { padding:26px; }
      .aero-section-label { display:inline-flex; margin-bottom:10px; padding:5px 10px; border-radius:999px; background:var(--se-aero-sky, #eaf5ff); color:var(--se-aero-navy, #12365a); font-size:11px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
      .aero-fleet-intro-card { margin-bottom:18px; padding:22px; border-radius:var(--se-radius-lg, 18px); background:rgba(255,255,255,.82); border:1px solid var(--se-aero-border, rgba(18,54,90,.16)); box-shadow:0 8px 24px rgba(12,38,64,.08); }
      .aero-fleet-intro-card h2,.aero-aircraft-copy h2 { margin:0 0 10px; color:var(--se-aero-navy-dark, #0b2744); font-size:23px; line-height:1.18; font-weight:800; letter-spacing:-.02em; }
      .aero-fleet-intro-card p { margin:0; font-size:15px; line-height:1.7; color:var(--se-aero-text, #1e2933); }
      .aero-aircraft-list { display:grid; gap:22px; }
      .aero-aircraft-card { display:grid; grid-template-columns:minmax(0,1.08fr) minmax(300px,.92fr); gap:22px; align-items:start; padding:22px; border-radius:var(--se-radius-lg, 18px); background:var(--se-aero-card-soft, rgba(255,255,255,.84)); border:1px solid var(--se-aero-border, rgba(18,54,90,.16)); box-shadow:0 8px 24px rgba(12,38,64,.08); }
      .aero-aircraft-header { display:flex; flex-wrap:wrap; align-items:baseline; gap:8px 12px; margin-bottom:8px; }
      .aero-tail-number { margin:0; color:var(--se-aero-navy-dark, #0b2744); font-size:28px; line-height:1.05; font-weight:800; letter-spacing:-.025em; }
      .aero-aircraft-meta { color:var(--se-aero-muted, #5d6b78); font-size:14px; line-height:1.2; font-weight:800; letter-spacing:.03em; text-transform:uppercase; }
      .aero-aircraft-copy { min-width:0; }
      .aero-aircraft-copy p { margin:0 0 13px; font-size:15px; line-height:1.7; color:var(--se-aero-text, #1e2933); }
      .aero-aircraft-copy ul { margin:12px 0 0 20px; padding:0; color:var(--se-aero-text, #1e2933); font-size:14px; line-height:1.55; }
      .aero-aircraft-copy li { margin-bottom:4px; }
      .aero-aircraft-copy em { color:var(--se-aero-navy-dark, #0b2744); }
      .aero-aircraft-media { display:grid; gap:14px; }
      .aero-aircraft-photo-card { overflow:hidden; border-radius:16px; background:#fff; border:1px solid rgba(18,54,90,.16); box-shadow:0 8px 20px rgba(12,38,64,.08); }
      .aero-aircraft-photo-card img { display:block; width:100%; height:230px; object-fit:cover; object-position:center center; }
      .aero-aircraft-photo-label { padding:9px 12px; color:var(--se-aero-muted, #5d6b78); font-size:12px; line-height:1.25; font-weight:800; letter-spacing:.08em; text-transform:uppercase; background:rgba(234,245,255,.72); border-top:1px solid rgba(18,54,90,.10); }
      .aero-aircraft-placeholder { display:flex; align-items:center; justify-content:center; min-height:230px; padding:22px; background:linear-gradient(135deg,rgba(234,245,255,.96),rgba(255,255,255,.88)); color:var(--se-aero-muted, #5d6b78); font-size:13px; line-height:1.45; font-weight:800; text-align:center; }
      .aero-empty-message { padding:18px; border-radius:16px; background:#fff; border:1px dashed rgba(18,54,90,.24); color:var(--se-aero-muted, #5d6b78); font-size:14px; line-height:1.55; }
      .aero-note-strip { margin-top:18px; padding:16px 18px; border-radius:16px; background:rgba(18,54,90,.06); border:1px solid rgba(18,54,90,.12); color:var(--se-aero-muted, #5d6b78); font-size:13px; line-height:1.55; }
      @media (max-width:980px){ .aero-aircraft-card{grid-template-columns:1fr;} .aero-aircraft-media{grid-template-columns:repeat(2,minmax(0,1fr));} }
      @media (max-width:720px){ .aero-fleet-page{margin-top:20px;padding:0 12px;} .aero-fleet-hero{padding:26px 20px 22px;} .aero-fleet-main{padding:18px;} .aero-fleet-stats{grid-template-columns:1fr;} .aero-fleet-intro-card,.aero-aircraft-card{padding:18px;} .aero-aircraft-media{grid-template-columns:1fr;} .aero-aircraft-photo-card img,.aero-aircraft-placeholder{height:210px;min-height:210px;} .aero-tail-number{font-size:25px;} }
/* PAGE-DESIGN-STUDIO-v29 actual Aircraft preview CSS - END */
  `;
  document.head.appendChild(style);
}

function getPresetLists(){
  var d=state.data||{};
  var p=obj(d.design_presets);
  return {
    layouts:arr(p.layouts),
    styles:arr(p.styles),
    typography:arr(p.typography),
    colors:arr(p.colors),
    effects:arr(p.effects)
  };
}


function getDesignProfiles(){
  var d=state.data||{};
  var p=obj(d.design_presets);
  return arr(p.profiles).map(function(x){
    return {
      key:clean(x.design_profile_key||x.key),
      label:clean(x.design_profile_name||x.label||x.design_profile_key||x.key),
      help:clean(x.description),
      recipe:obj(x.profile_json),
      sort:Number(x.sort_order||100)
    };
  }).filter(function(x){return !!x.key;}).sort(function(a,b){return (a.sort-b.sort)||a.label.localeCompare(b.label);});
}

function findDesignProfile(profileKey){
  profileKey=clean(profileKey);
  var rows=getDesignProfiles();
  for(var i=0;i<rows.length;i++){if(rows[i].key===profileKey)return rows[i];}
  return null;
}

function isDurableProfileKey(profileKey){
  profileKey=clean(profileKey);
  if(!profileKey||profileKey==="current-assignment"||profileKey==="custom-unsaved")return false;
  return !!findDesignProfile(profileKey)||!!DESIGN_PROFILE_RECIPES[profileKey];
}

function findPreset(list,keyName,key){
  key=clean(key);
  for(var i=0;i<arr(list).length;i++){if(clean(list[i][keyName])===key)return list[i];}
  return null;
}

function displayPresetLabel(key,label){
  key=clean(key); label=clean(label)||key;
  var map={"apple-unboxed":"Plain Jane Open","apple-system-large":"System Large"};
  return map[key]||label.replace(/Apple/g,"System");
}

function cleanPresetDescription(key,text){
  text=clean(text);
  if(key==="apple-unboxed")return "Open white-space layout with no outer chrome when paired with no-shadow, no-border effects.";
  return text.replace(/Apple/g,"plain");
}

function optionHtml(list,keyName,labelName,selected){
  return arr(list).map(function(x){
    var key=clean(x[keyName]);
    var label=displayPresetLabel(key,x[labelName]);
    return '<option value="'+esc(key)+'" '+(key===selected?'selected':'')+'>'+esc(label)+'</option>';
  }).join("");
}

function customerOptionsHtml(){
  return CUSTOMER_OPTIONS.map(function(c){return '<option value="'+esc(c.key)+'" '+(c.key===state.customer_key?'selected':'')+'>'+esc(c.label)+'</option>';}).join("");
}

function defaultCustomerName(customerKey){
  if(customerKey==="150th_aero")return "150th Aero Flying Club";
  if(customerKey==="demo_flying_club")return "Demo Flying Club";
  return customerKey.replace(/_/g," ").replace(/\b\w/g,function(m){return m.toUpperCase();});
}

function customerName(){
  var settings=obj(state.data&&state.data.settings);
  var brand=obj(settings.brand_overrides);
  return clean(brand.customerName||brand.fullName||brand.shortName)||defaultCustomerName(state.customer_key);
}

function syncSelectedFromSettings(){
  var settings=obj(state.data&&state.data.settings);
  var theme=obj(settings.theme_overrides);
  var recipe=obj(theme.design_profile_recipe);
  state.selected.layout=clean(settings.active_layout_key)||clean(recipe.layout)||DEFAULT_SELECTED.layout;
  state.selected.style=clean(settings.active_style_key)||clean(recipe.style)||DEFAULT_SELECTED.style;
  state.selected.typography=clean(settings.active_typography_key)||clean(recipe.typography)||DEFAULT_SELECTED.typography;
  state.selected.color=clean(settings.active_color_key)||clean(recipe.color)||DEFAULT_SELECTED.color;
  state.selected.effect=clean(settings.active_effect_key)||clean(recipe.effect)||DEFAULT_SELECTED.effect;
  state.selected.designProfile=clean(theme.active_design_profile_key)||"current-assignment";
  state.selected.shadow=clean(recipe.shadow)||"preset";
  state.selected.border=clean(recipe.border)||"preset";
  state.selected.corner=clean(recipe.corner)||"preset";
  state.selected.gradient=clean(recipe.gradient)||"preset";
  state.selected.siteWidth=clean(recipe.siteWidth)||"standard";
  state.selected.headerTreatment=clean(recipe.headerTreatment)||"standard";
  state.selected.heroTreatment=clean(recipe.heroTreatment)||"standard";
  state.selected.sectionRhythm=clean(recipe.sectionRhythm)||"standard";
  state.selected.density=clean(recipe.density)||"standard";
  state.selected.motion=clean(recipe.motion)||"subtle";
  state.selected.background=clean(recipe.background)||"pure-white";
  state.selected.imageTreatment=clean(recipe.imageTreatment)||"standard";
  state.selected.dividerStyle=clean(recipe.dividerStyle)||"hairline";
  state.selected.emphasisStyle=clean(recipe.emphasisStyle)||"pills";
  state.selected.surfaceStyle=clean(recipe.surfaceStyle)||"cards";
  state.lastSaved=cloneSelected(state.selected);
  state.dirty=false;
}

function describe(list,keyName,key,descName,jsonName){
  var p=findPreset(list,keyName,key);
  if(!p)return state.loading?"Loading options...":"No preset found for this value.";
  return cleanPresetDescription(key,clean(p[descName])||JSON.stringify(obj(p[jsonName])).slice(0,140));
}

function designProfileOptionsHtml(){
  var dynamic=getDesignProfiles();
  var rows=[{key:"current-assignment",label:"Current Saved Assignment"}];
  if(dynamic.length){
    rows=rows.concat(dynamic.map(function(p){return {key:p.key,label:p.label};}));
  }else{
    rows=DESIGN_PROFILE_OPTIONS.filter(function(p){return p.key!=="custom-unsaved";});
  }
  if(state.selected.designProfile==="custom-unsaved"){
    rows.splice(1,0,{key:"custom-unsaved",label:"Custom Unsaved Mix"});
  }
  return rows.map(function(p){return '<option value="'+esc(p.key)+'" '+(p.key===state.selected.designProfile?'selected':'')+'>'+esc(p.label)+'</option>';}).join("");
}

function designProfileHelp(){
  var durable=findDesignProfile(state.selected.designProfile);
  if(durable)return durable.help;
  for(var i=0;i<DESIGN_PROFILE_OPTIONS.length;i++){if(DESIGN_PROFILE_OPTIONS[i].key===state.selected.designProfile)return DESIGN_PROFILE_OPTIONS[i].help;}
  return "";
}

function applyDesignProfile(profileKey){
  var durable=findDesignProfile(profileKey);
  var recipe=durable?durable.recipe:DESIGN_PROFILE_RECIPES[profileKey];
  if(!recipe)return false;
  Object.keys(recipe).forEach(function(k){state.selected[k]=recipe[k];});
  state.selected.designProfile=profileKey;
  return true;
}

function cssVars(){
  var lists=getPresetLists();
  var layout=findPreset(lists.layouts,"layout_key",state.selected.layout)||{};
  var style=findPreset(lists.styles,"style_key",state.selected.style)||{};
  var type=findPreset(lists.typography,"typography_key",state.selected.typography)||{};
  var color=findPreset(lists.colors,"color_key",state.selected.color)||{};
  var effect=findPreset(lists.effects,"effect_key",state.selected.effect)||{};
  var L=obj(layout.structure_json), S=obj(style.style_json), T=obj(type.typography_json), C=obj(color.color_json), E=obj(effect.effect_json);
  var shadowOverride=clean(state.selected.shadow);
  var borderOverride=clean(state.selected.border);
  var cornerOverride=clean(state.selected.corner);
  var gradientOverride=clean(state.selected.gradient);
  var shadowValue=shadowOverride&&shadowOverride!=="preset"?shadowOverride:E.shadows;
  var borderValue=borderOverride&&borderOverride!=="preset"?borderOverride:E.borders;
  var cornerValue=cornerOverride&&cornerOverride!=="preset"?cornerOverride:S.radiusScale;
  var gradientValue=gradientOverride&&gradientOverride!=="preset"?gradientOverride:E.gradients;
  var siteWidth=clean(state.selected.siteWidth)||"standard";
  var headerTreatment=clean(state.selected.headerTreatment)||"standard";
  var heroTreatment=clean(state.selected.heroTreatment)||"standard";
  var sectionRhythm=clean(state.selected.sectionRhythm)||"standard";
  var density=clean(state.selected.density)||"standard";
  var motion=clean(state.selected.motion)||"subtle";
  var background=clean(state.selected.background)||"pure-white";
  var surfaceStyle=clean(state.selected.surfaceStyle)||"cards";
  var dividerStyle=clean(state.selected.dividerStyle)||"hairline";
  var emphasisStyle=clean(state.selected.emphasisStyle)||"pills";
  var imageTreatment=clean(state.selected.imageTreatment)||"standard";
  var trueNoChrome=(L.shell==="unboxed"||state.selected.layout==="apple-unboxed")&&shadowValue==="none"&&borderValue==="none"&&(gradientValue==="off"||gradientValue==="none");
  var out={};
  out["--ds-primary"]=C.primary||"#12365a";
  out["--ds-accent"]=C.accent||"#2f80c4";
  out["--ds-soft"]=C.soft||"#eaf5ff";
  out["--ds-text"]=C.text||"#17212b";
  out["--ds-muted"]=C.muted||"#5d6b78";
  out["--ds-bg"]=C.background||"#ffffff";
  out["--ds-font"]=T.fontFamily||"Arial, Helvetica, sans-serif";
  out["--ds-title-size"]=T.scale==="large"?"46px":(T.scale==="compact"?"30px":"38px");
  out["--ds-radius"]=cornerValue==="none"||cornerValue==="square"?"0px":(cornerValue==="soft"||cornerValue==="medium"?"12px":(cornerValue==="pill"?"999px":"22px"));
  out["--ds-button-radius"]=S.buttonShape==="square"?"0px":(S.buttonShape==="rounded"?"12px":"999px");
  out["--ds-eyebrow-radius"]=S.eyebrowShape==="text"?"0px":"999px";
  out["--ds-gap"]=S.spacing==="compact"?"12px":(S.spacing==="open"?"32px":"18px");
  out["--ds-shadow"]=shadowValue==="none"?"none":(shadowValue==="minimal"||shadowValue==="soft"?"0 3px 10px rgba(12,38,64,.06)":"0 10px 28px rgba(12,38,64,.10)");
  out["--ds-border"]=borderValue==="none"?"0":(borderValue==="hairline"?"1px solid rgba(18,54,90,.10)":"1px solid rgba(18,54,90,.14)");
  out["--ds-hero-bg"]=gradientValue==="off"||gradientValue==="none"?(C.background||"#ffffff"):"linear-gradient(135deg,"+(C.primary||"#12365a")+","+(C.accent||"#2f80c4")+")";
  out["--ds-hero-text"]=gradientValue==="off"||gradientValue==="none"?(C.text||"#17212b"):"#ffffff";
  out["--ds-hero-muted"]=gradientValue==="off"||gradientValue==="none"?(C.muted||"#5d6b78"):"rgba(255,255,255,.88)";
  out["--ds-transition"]=motion==="none"?"none":(motion==="polished"?"all .28s cubic-bezier(.2,.8,.2,1)":"all .16s ease");
  if(background==="pure-white")out["--ds-bg"]="#ffffff";
  if(background==="soft-tint")out["--ds-bg"]=C.soft||"#f8fafc";
  if(background==="gradient-wash")out["--ds-bg"]="linear-gradient(135deg,"+(C.background||"#ffffff")+" 0%,"+(C.soft||"#eaf5ff")+" 48%, #ffffff 100%)";
  if(background==="dark-floor"){out["--ds-bg"]="#0f172a";out["--ds-text"]="#f8fafc";out["--ds-muted"]="#cbd5e1";}
  if(background==="image-placeholder")out["--ds-bg"]="linear-gradient(135deg,rgba(15,23,42,.05),rgba(15,23,42,.02)), repeating-linear-gradient(45deg,rgba(18,54,90,.08) 0 10px,rgba(18,54,90,.02) 10px 20px)";
  if(surfaceStyle==="open"){out["--ds-card-bg"]="transparent";out["--ds-border"]="transparent";out["--ds-shadow"]="none";}
  if(surfaceStyle==="panels"){out["--ds-card-bg"]=C.soft||"#f8fafc";}
  if(surfaceStyle==="floating"){out["--ds-card-bg"]="#ffffff";out["--ds-shadow"]="0 18px 48px rgba(12,38,64,.12)";}
  if(dividerStyle==="none")out["--ds-divider"]="transparent";
  if(dividerStyle==="hairline")out["--ds-divider"]="rgba(18,54,90,.12)";
  if(dividerStyle==="soft-rules")out["--ds-divider"]="rgba(18,54,90,.18)";
  if(dividerStyle==="section-rules")out["--ds-divider"]="rgba(18,54,90,.28)";
  if(dividerStyle==="strong-rules")out["--ds-divider"]=C.primary||"#12365a";
  out["--ds-emphasis-radius"]=emphasisStyle==="plain-text"?"0":(emphasisStyle==="labels"?"8px":"999px");
  out["--ds-image-radius"]=imageTreatment==="plain"?"0":(imageTreatment==="rounded"?"18px":(imageTreatment==="full-bleed"?"0":"12px"));
  out["--preview-radius"]=L.shell==="unboxed"||trueNoChrome?"0px":"24px";
  out["--preview-border"]=L.shell==="unboxed"||trueNoChrome?"0":"1px solid rgba(18,54,90,.14)";
  out["--preview-shadow"]=L.shell==="unboxed"||trueNoChrome?"none":"0 12px 34px rgba(12,38,64,.10)";
  out["--ds-pad"]=L.shell==="unboxed"?"8px 10px":"28px";
  out["--ds-header-pad"]=L.shell==="unboxed"?"0 0 18px":"14px";
  out["--ds-hero-border"]=L.shell==="unboxed"?"0":"var(--ds-border)";
  out["--ds-hero-radius"]=L.shell==="unboxed"?"0px":"var(--ds-radius)";
  out["--ds-hero-pad"]=L.hero==="open"?"46px 0 28px":"30px";
  out["--ds-card"]=L.sections==="floating"||trueNoChrome?"transparent":"#ffffff";
  out["--ds-card-pad"]=L.sections==="floating"||trueNoChrome?"22px 0":"20px";
  if(trueNoChrome){
    out["--ds-header-border"]="0";
    out["--ds-header-shadow"]="none";
    out["--ds-header-bg"]="transparent";
    out["--ds-logo-border"]="0";
    out["--ds-logo-bg"]="transparent";
    out["--ds-card-border"]="0";
    out["--ds-card-shadow"]="none";
    out["--ds-divider"]="1px solid rgba(17,17,17,.10)";
  }
  out["--ds-grid"]=L.columns==="multi"?"1fr 1fr 1fr":(L.columns==="open"?"1.2fr .8fr":"1fr 1fr");
  if(siteWidth==="narrow")out["--ds-content-max"]="900px";
  else if(siteWidth==="wide")out["--ds-content-max"]="1320px";
  else if(siteWidth==="full")out["--ds-content-max"]="none";
  else out["--ds-content-max"]="1120px";
  if(headerTreatment==="plain")out["--ds-header-border"]="0";
  if(headerTreatment==="utility")out["--ds-header-pad"]="8px 0 12px";
  if(headerTreatment==="dashboard")out["--ds-header-bg"]=C.soft||"#eaf5ff";
  if(heroTreatment==="plain"){out["--ds-hero-bg"]="transparent";out["--ds-hero-text"]=C.text||"#17212b";out["--ds-hero-muted"]=C.muted||"#5d6b78";out["--ds-hero-border"]="0";out["--ds-hero-radius"]="0";}
  if(heroTreatment==="banner")out["--ds-hero-pad"]="44px 34px";
  if(heroTreatment==="compact")out["--ds-hero-pad"]="18px 0";
  if(sectionRhythm==="open")out["--ds-card-border"]="0";
  if(sectionRhythm==="divided")out["--ds-card-border"]="0";
  if(sectionRhythm==="banded")out["--ds-card"]=C.soft||"#eaf5ff";
  if(density==="relaxed"){out["--ds-gap"]="34px";out["--ds-card-pad"]="26px";}
  if(density==="compact"){out["--ds-gap"]="12px";out["--ds-card-pad"]="14px";out["--ds-title-size"]="30px";}
  if(density==="operations"){out["--ds-gap"]="10px";out["--ds-card-pad"]="13px";out["--ds-title-size"]="28px";}
  return out;
}

function styleAttr(map){return Object.keys(map).map(function(k){return k+":"+String(map[k]).replace(/[\";]/g,"");}).join(";");}

function fixedOptionHtml(field){
  var options={
    designProfile:DESIGN_PROFILE_OPTIONS.map(function(p){return [p.key,p.label];}),
    shadow:[["preset","Preset"],["none","None"],["soft","Soft"],["strong","Strong"]],
    border:[["preset","Preset"],["none","None"],["hairline","Hairline"],["visible","Visible"]],
    corner:[["preset","Preset"],["square","Square"],["soft","Soft"],["rounded","Rounded"],["pill","Pill"]],
    gradient:[["preset","Preset"],["off","Off"],["subtle","Subtle"],["standard","Standard"]],
    siteWidth:[["standard","Standard"],["narrow","Narrow"],["wide","Wide"],["full","Full Bleed"]],
    headerTreatment:[["standard","Standard"],["plain","Plain"],["utility","Utility"],["dashboard","Dashboard"]],
    heroTreatment:[["standard","Standard"],["plain","Plain"],["banner","Banner"],["compact","Compact"]],
    sectionRhythm:[["standard","Standard"],["open","Open"],["divided","Divided"],["banded","Banded"]],
    density:[["standard","Standard"],["relaxed","Relaxed"],["compact","Compact"],["operations","Operations"]],
    motion:[["none","None"],["subtle","Subtle"],["standard","Standard"],["polished","Polished"]],
    background:[["pure-white","Pure White"],["soft-tint","Soft Tint"],["gradient-wash","Gradient Wash"],["dark-floor","Dark Floor"],["image-placeholder","Image Placeholder"]],
    imageTreatment:[["standard","Standard"],["plain","Plain"],["rounded","Rounded"],["inset","Inset"],["full-bleed","Full Bleed"]],
    dividerStyle:[["none","None"],["hairline","Hairline"],["soft-rules","Soft Rules"],["section-rules","Section Rules"],["strong-rules","Strong Rules"]],
    emphasisStyle:[["plain-text","Plain Text"],["pills","Pills"],["labels","Labels"],["badges","Badges"],["underlined","Underlined"]],
    surfaceStyle:[["open","Open"],["cards","Cards"],["soft-cards","Soft Cards"],["panels","Panels"],["floating","Floating"]]
  }[field]||[];
  return options.map(function(o){return '<option value="'+esc(o[0])+'" '+(state.selected[field]===o[0]?'selected':'')+'>'+esc(o[1])+'</option>';}).join("");
}


function pageRows(){
  return arr(state.data&&state.data.customer_page_settings);
}

function normalizePageKey(k){
  k=clean(k).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  return k||"home";
}

function pageRowByKey(key){
  key=normalizePageKey(key);
  var rows=pageRows();
  for(var i=0;i<rows.length;i++){
    if(normalizePageKey(rows[i].page_key)===key)return rows[i];
  }
  return null;
}

function pageOptions(){
  var rows=pageRows();
  var out=[];
  var seen={};

  rows.forEach(function(row){
    var key=normalizePageKey(row.page_key);
    if(!key||seen[key])return;
    seen[key]=true;
    out.push({key:key,label:clean(row.page_label)||titleFromKey(key)});
  });

  if(!seen.home){
    out.unshift({key:"home",label:"Home"});
    seen.home=true;
  }

  if(!seen.aircraft){
    // Keep Assets available as the first practical test page even if the row has not been seeded yet.
    out.push({key:"aircraft",label:"Assets"});
  }

  out.sort(function(a,b){
    if(a.key==="home")return -1;
    if(b.key==="home")return 1;
    if(a.key==="aircraft")return -1;
    if(b.key==="aircraft")return 1;
    return a.label.localeCompare(b.label);
  });

  return out;
}

function titleFromKey(key){
  key=normalizePageKey(key);
  return key.split("-").map(function(part){return part?part.charAt(0).toUpperCase()+part.slice(1):"";}).join(" ")||"Home";
}

function selectedPageKey(){
  var opts=pageOptions();
  var key=normalizePageKey(state.sidePageKey||"home");
  for(var i=0;i<opts.length;i++){if(opts[i].key===key)return key;}
  return opts[0]?opts[0].key:"home";
}

function selectedPageRow(){
  return pageRowByKey(selectedPageKey());
}

function selectedPageLabel(){
  var key=selectedPageKey();
  if(key==='aircraft')return 'Assets';
  var row=selectedPageRow();
  return clean(row&&row.page_label)||titleFromKey(key);
}

function cloneObj(v){return JSON.parse(JSON.stringify(v||{}));}

function assetDefaultsObject(){
  var name=state.customer_key==='demo_flying_club'?'Test Customer':'150th Aero Flying Club';
  var cfg=cloneObj(ASSETS_PAGE_DEFAULTS[name]||ASSETS_PAGE_DEFAULTS['150th Aero Flying Club']);
  return {
    'aircraft.heroEyebrow':cfg.heroEyebrow||'',
    'aircraft.heroTitle':cfg.heroTitle||'',
    'aircraft.heroIntro':cfg.heroIntro||'',
    'aircraft.stats.0.value':(cfg.stats&&cfg.stats[0]&&cfg.stats[0].value)||'',
    'aircraft.stats.0.text':(cfg.stats&&cfg.stats[0]&&cfg.stats[0].text)||'',
    'aircraft.stats.1.value':(cfg.stats&&cfg.stats[1]&&cfg.stats[1].value)||'',
    'aircraft.stats.1.text':(cfg.stats&&cfg.stats[1]&&cfg.stats[1].text)||'',
    'aircraft.stats.2.value':(cfg.stats&&cfg.stats[2]&&cfg.stats[2].value)||'',
    'aircraft.stats.2.text':(cfg.stats&&cfg.stats[2]&&cfg.stats[2].text)||'',
    'aircraft.introLabel':cfg.introLabel||'',
    'aircraft.introTitle':cfg.introTitle||'',
    'aircraft.introText':cfg.introText||'',
    'aircraft.note':cfg.note||''
  };
}

function pageSettingsObject(row){
  var saved=obj(row&&row.current_settings_json&&Object.keys(obj(row.current_settings_json)).length?row.current_settings_json:(row&&row.settings_json));
  if(selectedPageKey&&selectedPageKey()==='aircraft')return Object.assign({},assetDefaultsObject(),saved);
  return saved;
}

function initSideEditState(reset){
  if(!state.sideOpen)return;
  if(!reset&&state.sideDraftValues&&state.sideAppliedValues)return;
  var base=pageSettingsObject(selectedPageRow());
  state.sideDraftValues=cloneObj(base);
  state.sideAppliedValues=cloneObj(base);
  state.sideDirty=false;
  state.sideAppliedDirty=false;
}

function hasSideUnsaved(){
  return !!(state.sideDirty||state.sideAppliedDirty);
}

function defaultPageFields(key){
  key=normalizePageKey(key);
  if(key==="aircraft"){
    return [
      {section:"Hero",key:"aircraft.heroEyebrow",label:"Hero Eyebrow",type:"text"},
      {section:"Hero",key:"aircraft.heroTitle",label:"Hero Title",type:"text"},
      {section:"Hero",key:"aircraft.heroIntro",label:"Hero Intro",type:"textarea"},
      {section:"Stat / Bubble 1",key:"aircraft.stats.0.value",label:"Bubble 1 Value",type:"text"},
      {section:"Stat / Bubble 1",key:"aircraft.stats.0.text",label:"Bubble 1 Text",type:"textarea"},
      {section:"Stat / Bubble 2",key:"aircraft.stats.1.value",label:"Bubble 2 Value",type:"text"},
      {section:"Stat / Bubble 2",key:"aircraft.stats.1.text",label:"Bubble 2 Text",type:"textarea"},
      {section:"Stat / Bubble 3",key:"aircraft.stats.2.value",label:"Bubble 3 Value",type:"text"},
      {section:"Stat / Bubble 3",key:"aircraft.stats.2.text",label:"Bubble 3 Text",type:"textarea"},
      {section:"Intro Card",key:"aircraft.introLabel",label:"Intro Label",type:"text"},
      {section:"Intro Card",key:"aircraft.introTitle",label:"Intro Title",type:"text"},
      {section:"Intro Card",key:"aircraft.introText",label:"Intro Text",type:"textarea"},
      {section:"Page Note",key:"aircraft.note",label:"Page Note",type:"textarea"}
    ];
  }
  return [
    {key:"page_title",label:"Page Title",type:"text"},
    {key:"intro_text",label:"Intro Text",type:"textarea"},
    {key:"primary_button_text",label:"Primary Button Text",type:"text"},
    {key:"secondary_button_text",label:"Secondary Button Text",type:"text"}
  ];
}

function normalizePageFields(row,key){
  var fields=arr(row&&row.fields_json).map(function(f){
    f=obj(f);
    var fieldKey=clean(f.key||f.field_key||f.name||f.id);
    if(!fieldKey)return null;
    return {
      key:fieldKey,
      label:clean(f.label||f.name||titleFromKey(fieldKey)),
      type:clean(f.type||f.input_type||f.control)||"text"
    };
  }).filter(Boolean);

  var settings=pageSettingsObject(row);
  Object.keys(settings).forEach(function(k){
    if(fields.some(function(f){return f.key===k;}))return;
    fields.push({key:k,label:titleFromKey(k),type:String(settings[k]||"").length>90?"textarea":"text"});
  });

  if(!fields.length)fields=defaultPageFields(key);
  return fields;
}

function renderPageOptions(){
  var key=selectedPageKey();
  return pageOptions().map(function(p){
    return '<option value="'+esc(p.key)+'" '+(p.key===key?'selected':'')+'>'+esc(p.label)+'</option>';
  }).join("");
}

function renderPageFields(){
  var key=selectedPageKey();
  var row=selectedPageRow();
  var settings=(state.sideOpen&&state.sideDraftValues)?state.sideDraftValues:pageSettingsObject(row);
  var fields=normalizePageFields(row,key);

  return fields.map(function(f){
    var val=settings[f.key];
    if(val==null)val="";
    var tag=(f.type==="textarea"||String(val).length>90) ?
      '<textarea class="ds-page-textarea" data-ds-page-field="'+esc(f.key)+'">'+esc(val)+'</textarea>' :
      '<input class="ds-page-input" data-ds-page-field="'+esc(f.key)+'" value="'+esc(val)+'">';
    return '<div class="ds-page-field"><label>'+esc(f.label)+'</label>'+tag+'</div>';
  }).join("");
}

function renderSideDrawer(){
  return '<button class="ds-side-tab" type="button" data-ds-action="side-open">Page Text</button>'+
    '<aside class="ds-side-drawer '+(state.sideOpen?'is-open':'')+'" data-ds-side-drawer>'+
      '<div class="ds-side-head"><div><h3>Page Text</h3><p>'+esc(customerName())+' · '+esc(selectedPageLabel())+'</p></div><button class="ds-side-close" type="button" data-ds-action="side-close">×</button></div>'+
      '<div class="ds-side-body">'+
        '<div class="ds-side-tools"><div class="ds-field"><label for="ds-page-selector">Page</label><select id="ds-page-selector" class="ds-side-select" data-ds-page-select>'+renderPageOptions()+'</select></div></div>'+
        '<div class="ds-side-form" data-ds-page-form>'+renderPageFields()+'</div>'+
        '<div class="ds-side-actions">'+
          '<button class="ds-btn" type="button" data-ds-action="apply-page-text" '+(!state.sideDirty||state.sideSaving?'disabled':'')+'>Apply Changes</button>'+
          '<button class="ds-btn" type="button" data-ds-action="save-page-text" '+(!state.sideAppliedDirty||state.sideSaving?'disabled':'')+'>'+(state.sideSaving?'Saving...':'Save Changes')+'</button>'+
          '<button class="ds-btn secondary" type="button" data-ds-action="discard-page-text" '+(!hasSideUnsaved()||state.sideSaving?'disabled':'')+'>Discard Changes</button>'+
        '</div>'+
        '<div class="ds-side-note">'+esc(state.sideAppliedDirty?'Preview applied. Save Changes is now available.':(state.sideDirty?'Drawer edits pending. Apply Changes to update the preview.':'Page text changes are customer/page-specific.'))+'</div>'+
      '</div>'+
    '</aside>';
}

function collectPageTextValues(){
  var out={};
  var r=root();
  if(!r)return out;
  r.querySelectorAll('[data-ds-page-field]').forEach(function(el){
    var key=clean(el.getAttribute('data-ds-page-field'));
    out[key]=el.value;
  });
  return out;
}


function livePageTextValues(){
  var base=pageSettingsObject(selectedPageRow());
  if(state.sideOpen&&state.sideAppliedValues)return Object.assign({},base,state.sideAppliedValues);
  return base;
}

function normalizedFieldKey(k){
  return clean(k).toLowerCase().replace(/[^a-z0-9]+/g,"");
}

function fieldValue(settings,key,fallback){
  settings=settings||{};
  var aliases={
    "aircraft.heroEyebrow":["aircraft.heroEyebrow","aircraft.hero_eyebrow","heroEyebrow","hero_eyebrow","eyebrow"],
    "aircraft.heroTitle":["aircraft.heroTitle","aircraft.hero_title","heroTitle","hero_title","page_title","title"],
    "aircraft.heroIntro":["aircraft.heroIntro","aircraft.hero_intro","heroIntro","hero_intro","intro_text","description"],
    "aircraft.stats.0.value":["aircraft.stats.0.value","aircraft.statOne","statOne","bubble_1_value","bubble1Value"],
    "aircraft.stats.0.text":["aircraft.stats.0.text","aircraft.statOneText","statOneText","bubble_1_text","bubble1Text"],
    "aircraft.stats.1.value":["aircraft.stats.1.value","aircraft.statTwo","statTwo","bubble_2_value","bubble2Value"],
    "aircraft.stats.1.text":["aircraft.stats.1.text","aircraft.statTwoText","statTwoText","bubble_2_text","bubble2Text"],
    "aircraft.stats.2.value":["aircraft.stats.2.value","aircraft.statThree","statThree","bubble_3_value","bubble3Value"],
    "aircraft.stats.2.text":["aircraft.stats.2.text","aircraft.statThreeText","statThreeText","bubble_3_text","bubble3Text"],
    "aircraft.introLabel":["aircraft.introLabel","aircraft.intro_label","introLabel","intro_label"],
    "aircraft.introTitle":["aircraft.introTitle","aircraft.intro_title","introTitle","intro_title"],
    "aircraft.introText":["aircraft.introText","aircraft.intro_text","introText","intro_text"],
    "aircraft.note":["aircraft.note","aircraft.bottomNote","bottomNote","bottom_note","note"]
  };
  var keys=aliases[key]||[key];
  var normMap={};
  Object.keys(settings).forEach(function(k){normMap[normalizedFieldKey(k)]=settings[k];});

  for(var i=0;i<keys.length;i++){
    var direct=settings[keys[i]];
    if(direct!=null&&String(direct).trim()!=="")return String(direct);
    var norm=normMap[normalizedFieldKey(keys[i])];
    if(norm!=null&&String(norm).trim()!=="")return String(norm);
  }
  return fallback||"";
}

function aircraftDefaultsForDesignStudio(){
  var name=state.customer_key==='demo_flying_club'?'Test Customer':'150th Aero Flying Club';
  return cloneObj(ASSETS_PAGE_DEFAULTS[name]||ASSETS_PAGE_DEFAULTS['150th Aero Flying Club']);
}

function aircraftConfigFromPageText(){
  var settings=livePageTextValues();
  var cfg=aircraftDefaultsForDesignStudio();

  cfg.heroEyebrow=fieldValue(settings,"aircraft.heroEyebrow",cfg.heroEyebrow);
  cfg.heroTitle=fieldValue(settings,"aircraft.heroTitle",cfg.heroTitle);
  cfg.heroIntro=fieldValue(settings,"aircraft.heroIntro",cfg.heroIntro);
  cfg.stats=[
    {value:fieldValue(settings,"aircraft.stats.0.value",cfg.stats[0].value),text:fieldValue(settings,"aircraft.stats.0.text",cfg.stats[0].text)},
    {value:fieldValue(settings,"aircraft.stats.1.value",cfg.stats[1].value),text:fieldValue(settings,"aircraft.stats.1.text",cfg.stats[1].text)},
    {value:fieldValue(settings,"aircraft.stats.2.value",cfg.stats[2].value),text:fieldValue(settings,"aircraft.stats.2.text",cfg.stats[2].text)}
  ];
  cfg.introLabel=fieldValue(settings,"aircraft.introLabel",cfg.introLabel);
  cfg.introTitle=fieldValue(settings,"aircraft.introTitle",cfg.introTitle);
  cfg.introText=fieldValue(settings,"aircraft.introText",cfg.introText);
  cfg.note=fieldValue(settings,"aircraft.note",cfg.note);
  return cfg;
}

function inlineText(v){return esc(v).replace(/\*([^*]+)\*/g,'<em>$1</em>');}

function renderActualAircraftPagePreview(){
  var cfg=aircraftConfigFromPageText();
  var stats=Array.isArray(cfg.stats)?cfg.stats:[];
  var rows=Array.isArray(cfg.aircraft)?cfg.aircraft.slice().sort(function(a,b){return (a.sortOrder||999)-(b.sortOrder||999);}):[];

  function statMarkup(st){
    return '<div class="aero-fleet-stat"><strong>'+esc(st.value||'')+'</strong><span>'+esc(st.text||'')+'</span></div>';
  }
  function labelFor(ac){return String(ac.tailNumber||'').toUpperCase()==='N150TH'?'Flagship Asset':'Asset';}
  function metaFor(ac){return [ac.modelYear,ac.aircraftType].filter(Boolean).join(' ');}
  function detailsMarkup(ac){
    var parts=String(ac.details||'').split('||').map(function(x){return x.trim();}).filter(Boolean);
    if(!parts.length)return '<p>Asset details are not available at this time.</p>';
    var intro=parts.shift();
    return (intro?'<p>'+inlineText(intro)+'</p>':'')+(parts.length?'<ul>'+parts.map(function(x){return '<li>'+inlineText(x)+'</li>';}).join('')+'</ul>':'');
  }
  function photoCard(url,label,alt){
    return '<div class="aero-aircraft-photo-card">'+(url?'<img src="'+esc(url)+'" alt="'+esc(alt||label)+'">':'<div class="aero-aircraft-placeholder">'+esc(label)+' photo not available</div>')+'<div class="aero-aircraft-photo-label">'+esc(label)+'</div></div>';
  }
  function assetCard(ac){
    return '<article class="aero-aircraft-card"><div class="aero-aircraft-copy"><div class="aero-section-label">'+esc(labelFor(ac))+'</div><div class="aero-aircraft-header"><h2 class="aero-tail-number">'+esc(ac.tailNumber||'Asset')+'</h2><div class="aero-aircraft-meta">'+esc(metaFor(ac)||'Asset Details')+'</div></div>'+detailsMarkup(ac)+'</div><div class="aero-aircraft-media">'+photoCard(ac.aircraftPhoto,'Exterior',(ac.tailNumber||'Asset')+' exterior photo')+photoCard(ac.panelPhoto,'Panel',(ac.tailNumber||'Asset')+' detail photo')+'</div></article>';
  }

  return '<div class="aero-fleet-page"><div class="aero-fleet-shell">'+
    '<section class="aero-fleet-hero">'+
      '<div class="aero-fleet-eyebrow">'+esc(cfg.heroEyebrow)+'</div>'+
      '<h1>'+esc(cfg.heroTitle)+'</h1>'+
      '<p>'+esc(cfg.heroIntro)+'</p>'+
      '<div class="aero-fleet-stats">'+stats.map(statMarkup).join('')+'</div>'+
    '</section>'+
    '<main class="aero-fleet-main">'+
      '<section class="aero-fleet-intro-card">'+
        '<div class="aero-section-label">'+esc(cfg.introLabel)+'</div>'+
        '<h2>'+esc(cfg.introTitle)+'</h2>'+
        '<p>'+esc(cfg.introText)+'</p>'+
      '</section>'+
      '<section class="aero-aircraft-list">'+(rows.length?rows.map(assetCard).join(''):'<div class="aero-empty-message">Asset information is not available at this time.</div>')+'</section>'+
      '<div class="aero-note-strip"><strong>Note:</strong> '+esc(cfg.note||'')+'</div>'+
    '</main>'+
  '</div></div>';
}




function dataRoot(){
  return obj(state.data||{});
}

function auditObjectPaths(){
  var d=dataRoot();
  return [
    ["state.data",d],
    ["state.data.payload",obj(d.payload)],
    ["state.data.data",obj(d.data)],
    ["state.data.result",obj(d.result)],
    ["state.data.response",obj(d.response)],
    ["state.data.customer",obj(d.customer)],
    ["state.data.settings",obj(d.settings)],
    ["state.data.site_settings",obj(d.site_settings)],
    ["state.data.customer_site_settings",obj(d.customer_site_settings)],
    ["state.data.design",obj(d.design)],
    ["state.data.design_presets",obj(d.design_presets)],
    ["state.data.presets",obj(d.presets)],
    ["state.data.preset_lists",obj(d.preset_lists)]
  ];
}

function readPath(o,path){
  var cur=o;
  for(var i=0;i<path.length;i++){
    if(!cur || typeof cur!=="object")return undefined;
    cur=cur[path[i]];
  }
  return cur;
}

function firstNonEmpty(){
  for(var i=0;i<arguments.length;i++){
    var v=arguments[i];
    if(Array.isArray(v)&&v.length)return v;
    if(v&&typeof v==="object"&&Object.keys(v).length)return v;
    if(typeof v==="string"&&clean(v))return clean(v);
  }
  return null;
}

function collectValuesByNames(names){
  var out=[];
  var paths=auditObjectPaths();
  names.forEach(function(name){
    paths.forEach(function(pair){
      var label=pair[0], source=pair[1];
      if(!source||typeof source!=="object")return;
      if(Object.prototype.hasOwnProperty.call(source,name)){
        var v=source[name];
        if(v!==undefined&&v!==null&&String(v)!==""){
          out.push({source:label+"."+name,value:v});
        }
      }
    });
  });
  return out;
}

function getSelectedFromDom(settingNames){
  var root=byId(ROOT_ID);
  if(!root)return null;

  var possibleNames=[];
  settingNames.forEach(function(n){
    possibleNames.push(n);
    possibleNames.push(n.replace(/^active_/,""));
    possibleNames.push(n.replace(/_key$/,""));
  });

  for(var i=0;i<possibleNames.length;i++){
    var n=possibleNames[i];
    var el=root.querySelector('[name="'+n+'"],[data-field="'+n+'"],[data-setting="'+n+'"],[data-ds-setting="'+n+'"],[data-control="'+n+'"]');
    if(el&&clean(el.value))return {source:"visible control "+n,value:clean(el.value)};
  }

  return null;
}

function getSelected(label,settingNames){
  var direct=collectValuesByNames(settingNames);
  for(var i=0;i<direct.length;i++){
    var v=direct[i].value;
    if(typeof v==="string"&&clean(v))return {source:direct[i].source,value:clean(v)};
    if(v&&typeof v==="object"){
      var key=clean(v.key||v.slug||v.name||v.id||v.value);
      if(key)return {source:direct[i].source,value:key};
    }
  }

  var dom=getSelectedFromDom(settingNames);
  if(dom)return dom;

  /* Last-resort fallback from visible dropdown labels/state values. This is intentionally
     used for audit reporting only, not for rendering or saving. */
  var stateNames={
    "Customer profile":["customer_key"],
    "Design profile":["selected.designProfile"],
    "Layout preset":["selected.layout"],
    "Style preset":["selected.style"],
    "Typography preset":["selected.typography"],
    "Color theme":["selected.color"],
    "Effect preset":["selected.effect"],
    "Default width":["selected.siteWidth"],
    "Header style":["selected.headerTreatment"],
    "Hero style":["selected.heroTreatment"],
    "Section rhythm":["selected.sectionRhythm"],
    "Density":["selected.density"],
    "Shadows":["selected.shadow"],
    "Borders":["selected.border"],
    "Corners":["selected.corner"],
    "Gradients":["selected.gradient"],
    "Motion":["selected.motion"],
    "Background":["selected.background"],
    "Image treatment":["selected.imageTreatment"],
    "Divider style":["selected.dividerStyle"],
    "Emphasis style":["selected.emphasisStyle"],
    "Surface/card style":["selected.surfaceStyle"]
  }[label]||[];

  for(var j=0;j<stateNames.length;j++){
    var path=stateNames[j].split('.');
    var sv=state;
    for(var pi=0;pi<path.length;pi++){sv=sv&&sv[path[pi]];}
    if(typeof sv==="string"&&clean(sv))return {source:"state."+stateNames[j],value:clean(sv)};
    if(sv&&typeof sv==="object"){
      var sk=clean(sv.key||sv.slug||sv.name||sv.id||sv.value);
      if(sk)return {source:"state."+stateNames[j],value:sk};
    }
  }

  return null;
}

function getPresetBucket(label,presetNames){
  var lists=getPresetLists ? getPresetLists() : {};
  var fixedKeyMap={
    "Layout preset":lists.layouts,
    "Style preset":lists.styles,
    "Typography preset":lists.typography,
    "Color theme":lists.colors,
    "Effect preset":lists.effects,
    "Default width":FIXED_OPTIONS&&FIXED_OPTIONS.siteWidth,
    "Header style":FIXED_OPTIONS&&FIXED_OPTIONS.headerTreatment,
    "Hero style":FIXED_OPTIONS&&FIXED_OPTIONS.heroTreatment,
    "Section rhythm":FIXED_OPTIONS&&FIXED_OPTIONS.sectionRhythm,
    "Density":FIXED_OPTIONS&&FIXED_OPTIONS.density,
    "Shadows":FIXED_OPTIONS&&FIXED_OPTIONS.shadow,
    "Borders":FIXED_OPTIONS&&FIXED_OPTIONS.border,
    "Corners":FIXED_OPTIONS&&FIXED_OPTIONS.corner,
    "Gradients":FIXED_OPTIONS&&FIXED_OPTIONS.gradient,
    "Motion":FIXED_OPTIONS&&FIXED_OPTIONS.motion,
    "Background":FIXED_OPTIONS&&FIXED_OPTIONS.background,
    "Image treatment":FIXED_OPTIONS&&FIXED_OPTIONS.imageTreatment,
    "Divider style":FIXED_OPTIONS&&FIXED_OPTIONS.dividerStyle,
    "Emphasis style":FIXED_OPTIONS&&FIXED_OPTIONS.emphasisStyle,
    "Surface/card style":FIXED_OPTIONS&&FIXED_OPTIONS.surfaceStyle
  };
  if(fixedKeyMap[label]&&arr(fixedKeyMap[label]).length)return {source:"active Design Studio preset list for "+label,value:arr(fixedKeyMap[label])};

  var paths=auditObjectPaths();
  var found=[];
  presetNames.forEach(function(name){
    paths.forEach(function(pair){
      var source=pair[1];
      if(!source||typeof source!=="object")return;
      var v=source[name];
      if(Array.isArray(v)&&v.length)found.push({source:pair[0]+"."+name,value:v});
      else if(v&&typeof v==="object"&&Object.keys(v).length)found.push({source:pair[0]+"."+name,value:v});
    });
  });

  if(found.length)return found[0];

  /* If the visible selector exists and has options, treat that as the active returned
     preset list. This makes the audit match what the user can see in Design Studio. */
  var root=byId(ROOT_ID);
  if(root){
    for(var i=0;i<presetNames.length;i++){
      var n=presetNames[i];
      var el=root.querySelector('[name="'+n+'"],[data-field="'+n+'"],[data-setting="'+n+'"],[data-ds-setting="'+n+'"],[data-control="'+n+'"]');
      if(el && el.options && el.options.length){
        return {source:"visible selector "+n,value:Array.prototype.map.call(el.options,function(o){return {key:o.value,name:o.textContent};})};
      }
    }
  }

  return null;
}

function listHasKey(list,key){
  if(!key||!list)return false;
  var val=list.value||list;
  if(Array.isArray(val)){
    return val.some(function(item){
      item=obj(item);
      return clean(item.key||item.slug||item.name||item.id||item.value||item.layout_key||item.style_key||item.typography_key||item.color_key||item.effect_key)===key || clean(item.label||item.layout_name||item.style_name||item.typography_name||item.color_name||item.effect_name)===key;
    });
  }
  if(val&&typeof val==="object"){
    if(Object.prototype.hasOwnProperty.call(val,key))return true;
    return Object.keys(val).some(function(k){
      var item=obj(val[k]);
      return clean(k)===key || clean(item.key||item.slug||item.name||item.id||item.value)===key || clean(item.label)===key;
    });
  }
  return false;
}

function hasAnyLoadedData(){
  var d=dataRoot();
  if(d&&typeof d==="object"&&Object.keys(d).length)return true;
  var root=byId(ROOT_ID);
  if(!root)return false;
  return !!root.querySelector('select option, [data-ds-setting], [data-setting], [data-control]');
}

function auditOne(label,settingNames,presetNames,required){
  var selected=getSelected(label,settingNames);
  var bucket=getPresetBucket(label,presetNames);
  var hasLoaded=hasAnyLoadedData();

  var status="ok";
  var detail="Resolved.";
  var selectedValue=selected?selected.value:"";

  if(!hasLoaded){
    status="fail";
    detail="No loaded Design Studio data or visible controls found.";
  }else if(required && !selectedValue){
    status="fail";
    detail="Returned but empty. Checked settings: "+settingNames.join(", ");
  }else if(!selectedValue && !required){
    status="warn";
    detail="Optional selection is empty. Checked settings: "+settingNames.join(", ");
  }else if(label==="Design profile" && selectedValue==="current-assignment"){
    status="ok";
    detail="Using current saved customer assignment.";
  }else if(selectedValue && !bucket){
    status=required?"warn":"warn";
    detail="Selected '"+selectedValue+"' found from "+selected.source+", but no preset list was found. Checked lists: "+presetNames.join(", ");
  }else if(selectedValue && bucket && !listHasKey(bucket,selectedValue)){
    status="warn";
    detail="Selected '"+selectedValue+"' found from "+selected.source+", but it was not matched inside "+bucket.source+". This may be a label/value mismatch.";
  }else if(selectedValue && bucket && listHasKey(bucket,selectedValue)){
    detail="Selected '"+selectedValue+"' resolved using "+selected.source+" and "+bucket.source+".";
  }

  return {label:label,status:status,detail:detail,selected:selectedValue};
}

function computeStyleDiagnostic(){
  var audits=[
    auditOne("Customer profile",["customer_key","customer_slug","customer_id","active_customer_key"],["customers","customer_profiles","profiles"],false),
    auditOne("Design profile",["active_design_profile_key","design_profile_key","active_profile_key","profile_key"],["profiles","design_profiles"],true),
    auditOne("Layout preset",["active_layout_key","layout_key","preset_layout_key","layout_preset_key"],["layouts","layout_presets"],true),
    auditOne("Style preset",["active_style_key","style_key","style_preset_key"],["styles","style_presets"],true),
    auditOne("Typography preset",["active_typography_key","typography_key","typography_preset_key"],["typography","typography_presets"],true),
    auditOne("Color theme",["active_color_key","color_key","color_theme_key","theme_key"],["colors","color_presets","color_themes","themes"],true),
    auditOne("Effect preset",["active_effect_key","effect_key","effect_preset_key"],["effects","effect_presets"],true),
    auditOne("Default width",["default_width_key","width_key","site_width_key"],["widths","width_presets"],false),
    auditOne("Header style",["header_key","header_style_key"],["headers","header_presets","header_styles"],false),
    auditOne("Hero style",["hero_key","hero_style_key"],["heroes","hero_presets","hero_styles"],false),
    auditOne("Section rhythm",["section_rhythm_key","rhythm_key"],["rhythms","section_rhythm_presets","section_rhythms"],false),
    auditOne("Density",["density_key","density_preset_key"],["densities","density_presets"],false),
    auditOne("Shadows",["shadow_key","shadows_key","shadow_preset_key"],["shadows","shadow_presets"],false),
    auditOne("Borders",["border_key","borders_key","border_preset_key"],["borders","border_presets"],false),
    auditOne("Corners",["corner_key","corners_key","radius_key","radius_preset_key"],["corners","corner_presets","radii","radius_presets"],false),
    auditOne("Gradients",["gradient_key","gradients_key","gradient_preset_key"],["gradients","gradient_presets"],false),
    auditOne("Motion",["motion_key","motion_preset_key"],["motions","motion_presets"],false),
    auditOne("Background",["background_key","background_preset_key"],["backgrounds","background_presets"],false),
    auditOne("Image treatment",["image_treatment_key","image_key","image_preset_key"],["images","image_presets","image_treatments"],false),
    auditOne("Divider style",["divider_key","divider_style_key"],["dividers","divider_presets","divider_styles"],false),
    auditOne("Emphasis style",["emphasis_key","emphasis_style_key"],["emphasis","emphasis_presets","emphasis_styles"],false),
    auditOne("Surface/card style",["surface_key","surface_style_key","card_style_key"],["surfaces","surface_presets","surface_styles","cards","card_presets"],false)
  ];

  var failures=audits.filter(function(a){return a.status==="fail";});
  var warnings=audits.filter(function(a){return a.status==="warn";});

  state.styleDiagnostic={
    audits:audits,
    failures:failures,
    warnings:warnings,
    ok:failures.length===0
  };
  return state.styleDiagnostic;
}

function styleDiagnosticHtml(){
  var diag=state.styleDiagnostic||computeStyleDiagnostic();
  if(diag.ok)return "";
  var rows=diag.audits.filter(function(a){return a.status!=="ok";}).map(function(a){
    return '<div class="ds-inheritance-row">'+
      '<div class="ds-inheritance-name">'+esc(a.label)+'</div>'+
      '<div><span class="ds-inheritance-status '+esc(a.status)+'">'+esc(a.status)+'</span></div>'+
      '<div class="ds-inheritance-detail">'+esc(a.detail)+'</div>'+
    '</div>';
  }).join("");
  return '<div class="ds-supabase-style-warning">'+
    '<strong>SUPABASE STYLE INHERITANCE WARNING</strong>'+
    '<span>Build/test diagnostic mode is active. The items below did not fully inherit from the loaded Design Studio/Supabase data.</span>'+
    '<div class="ds-inheritance-summary"><span>Failures: '+diag.failures.length+'</span><span>Warnings: '+diag.warnings.length+'</span></div>'+
    '<div class="ds-audit-source-note">Audit source: loaded state data plus visible Design Studio controls. This is a build-time diagnostic, not public-page output.</div>'+
    '<div class="ds-inheritance-table">'+rows+'</div>'+
  '</div>';
}

function visibleStyleDiagnosticHtml(){
  var html=styleDiagnosticHtml();
  if(!html)return "";
  return '<div class="ds-visible-inheritance-warning">'+html+'</div>';
}

function ensureVisibleDiagnosticPanel(){
  var root=byId(ROOT_ID);
  if(!root)return;
  var existing=root.querySelector('[data-ds-visible-inheritance-warning]');
  if(existing)existing.remove();

  var html=styleDiagnosticHtml();
  if(!html)return;

  var target=root.querySelector('[data-ds-preview-frame]');
  if(!target)return;

  var wrap=document.createElement('div');
  wrap.setAttribute('data-ds-visible-inheritance-warning','true');
  wrap.className='ds-visible-inheritance-warning';
  wrap.innerHTML=html;
  target.parentNode.insertBefore(wrap,target);
}


function refreshInheritanceAuditPanel(){
  computeStyleDiagnostic();
  var r=root();
  if(r){
    if(state.styleDiagnostic&&state.styleDiagnostic.ok)r.classList.remove('ds-style-diagnostic-missing');
    else r.classList.add('ds-style-diagnostic-missing');
  }
  ensureVisibleDiagnosticPanel();
}

function renderSelectedPagePreview(){
  if(selectedPageKey()==='aircraft')return renderActualAircraftPagePreview();

  var label=selectedPageLabel();
  var settings=livePageTextValues();

  var eyebrow=fieldValue(settings,"hero_eyebrow",label);
  var title=fieldValue(settings,"hero_title",label);
  var intro=fieldValue(settings,"hero_intro",fieldValue(settings,"intro_text",""));
  var introLabel=fieldValue(settings,"intro_label","Overview");
  var introTitle=fieldValue(settings,"intro_title",title);
  var introText=fieldValue(settings,"intro_text",intro);
  var bottomNote=fieldValue(settings,"bottom_note","");

  return '<div class="ds-selected-page-preview">'+
    '<div class="ds-selected-page-shell">'+
      '<div class="ds-selected-page-hero">'+
        '<span class="ds-selected-page-eyebrow">'+esc(eyebrow)+'</span>'+
        '<h2 class="ds-selected-page-title">'+esc(title)+'</h2>'+
        (intro?'<div class="ds-selected-page-intro">'+esc(intro)+'</div>':'')+
      '</div>'+
      '<div class="ds-selected-page-section">'+
        '<h3>'+esc(introLabel)+' · '+esc(introTitle)+'</h3>'+
        '<p>'+esc(introText)+'</p>'+
      '</div>'+
      (bottomNote?'<div class="ds-selected-page-note">'+esc(bottomNote)+'</div>':'')+
    '</div>'+
  '</div>';
}

function updateLeftPagePreview(){
  var frame=document.querySelector('#'+ROOT_ID+' [data-ds-preview-frame]');
  if(!frame)return;
  frame.innerHTML=renderSelectedPagePreview();
}

function applyPageText(){
  state.sideDraftValues=collectPageTextValues();
  state.sideAppliedValues=cloneObj(state.sideDraftValues);
  state.sideDirty=false;
  state.sideAppliedDirty=true;
  state.notice='Preview updated. Save Changes is now available.';
  state.error='';
  renderFrame();
}

function discardPageText(doRender){
  initSideEditState(true);
  state.notice='Page text changes discarded.';
  state.error='';
  if(doRender!==false)renderFrame();
}

function pageTextHasUnsafeNavigation(){
  return state.sideOpen&&hasSideUnsaved();
}

function savePageText(){
  var token=getToken();
  if(!token){state.error='No valid Supabase login token found. Sign in as a SyncEtc platform admin, then try again.';state.notice='';updateStatus();return;}

  var key=selectedPageKey();
  var row=selectedPageRow();
  var label=selectedPageLabel();
  var fields=normalizePageFields(row,key);
  if(!state.sideAppliedDirty){state.notice='Apply Changes before saving.';state.error='';updateStatus();return;}
  var values=cloneObj(state.sideAppliedValues||collectPageTextValues());

  state.sideSaving=true;
  state.error='';
  state.notice='Saving page text...';
  updateStatus();

  fetch(ACTION_URL,{
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
    body:JSON.stringify({
      action:'save_customer_page_settings',
      customer_key:state.customer_key,
      payload:{
        customer_key:state.customer_key,
        page_key:key,
        page_label:(key==='aircraft'?'Assets':label),
        current_settings_json:values,
        settings_json:values,
        fields_json:fields,
        note:clean(row&&row.note),
        source_template_key:clean(row&&row.source_template_key)||null,
        is_enabled:true
      }
    })
  })
  .then(function(res){
    return res.json().catch(function(){return null;}).then(function(body){
      if(!res.ok||!body||body.ok===false)throw new Error(errorMessageFromResponse(body,res.status));
      return body;
    });
  })
  .then(function(body){
    var saved=obj(body&&body.result);
    if(!state.data)state.data={};
    var rows=pageRows().filter(function(p){return normalizePageKey(p.page_key)!==key;});
    if(saved&&saved.page_key){
      saved.current_settings_json=values;
      saved.settings_json=values;
      saved.fields_json=fields;
      rows.push(saved);
    }else{
      rows.push({
        customer_key:state.customer_key,
        page_key:key,
        page_label:label,
        current_settings_json:values,
        settings_json:values,
        fields_json:fields,
        is_enabled:true
      });
    }
    state.data.customer_page_settings=rows;
    state.sideSaving=false;
    state.sideDirty=false;
    state.sideAppliedDirty=false;
    state.sideDraftValues=cloneObj(values);
    state.sideAppliedValues=cloneObj(values);
    state.error='';
    state.notice='Page text saved for '+(key==='aircraft'?'Assets':label)+'.';
    renderFrame();
    updateLeftPagePreview();
  })
  .catch(function(err){
    state.sideSaving=false;
    state.error=err&&err.message?err.message:String(err);
    state.notice='';
    updateStatus();
  });
}



function renderLoginGate(){
  installStyles();
  var mount=byId(MOUNT_ID)||document.body;
  mount.innerHTML='<div id="'+ROOT_ID+'" class="ds-login-only">'+
    '<section class="ds-login-card">'+
      '<div class="ds-login-brand">'+
        '<div class="ds-login-logo-wrap"><img class="ds-login-logo" src="'+esc(SYNCETC_LOGO_URL)+'" alt="SyncEtc logo"></div>'+
        '<h1>SyncEtc Design Studio</h1>'+
        '<p>Platform tools for building, styling, and previewing customer sites.</p>'+
      '</div>'+
      '<form class="ds-login-body" data-ds-login-form>'+
        (state.error?'<div class="ds-login-error">'+esc(state.error)+'</div>':'')+
        (state.notice&&!state.error?'<div class="ds-login-note">'+esc(state.notice)+'</div>':'')+
        '<div><label>Platform Admin Email</label><input type="email" autocomplete="username" data-ds-auth-email value="'+esc(state.authEmail||'')+'"></div>'+
        '<div><label>Password</label><input type="password" autocomplete="current-password" data-ds-auth-password></div>'+
        '<button class="ds-login-submit" type="submit" data-ds-action="platform-login" '+(state.authBusy?'disabled':'')+'>'+(state.authBusy?'Signing in...':'Sign In')+'</button>'+
        '<div class="ds-login-note">This company-side workspace is not intended for normal customer access. Sign in with a platform admin account.</div>'+
        '<div class="ds-login-version">'+esc(VERSION)+'</div>'+
      '</form>'+
    '</section>'+
  '</div>';

  var form=document.querySelector('#'+ROOT_ID+' [data-ds-login-form]');
  if(form){
    form.onsubmit=function(ev){
      ev.preventDefault();
      var emailEl=form.querySelector('[data-ds-auth-email]');
      var passEl=form.querySelector('[data-ds-auth-password]');
      signInPlatformAdmin(emailEl?emailEl.value:'',passEl?passEl.value:'');
    };
  }
}

function renderFrame(){
  installStyles();
  installAircraftPreviewStyles();
  if(!getToken()){
    renderLoginGate();
    return;
  }
  var mount=byId(MOUNT_ID)||document.body;
  var diag=computeStyleDiagnostic();
  mount.innerHTML='<div id="'+ROOT_ID+'" class="'+(state.loading?'ds-skeleton ':'')+(state.fullPreview?'ds-full-preview ':'')+(state.sideOpen?'ds-page-text-mode ':'')+(diag.ok?'':'ds-style-diagnostic-missing')+'">'+
    (state.fullPreview?'<button type="button" class="ds-exit-full" data-ds-action="exit-full">Exit Full Preview</button>':'')+
    '<div class="ds-shell">'+
      '<div class="ds-hero-top"><div><span class="ds-kicker">SyncEtc Company Tool</span><h1>Design Studio</h1></div><div class="ds-version">'+esc(VERSION)+'</div></div>'+
      '<div class="ds-toolbar-wrap"><section class="ds-toolbar" aria-label="Design Studio Controls">'+
        '<div class="ds-profile-grid">'+
          controlHtml("customer","Customer / Profile","customer")+
          controlHtml("designProfile","Design Profile","designProfile")+
          '<div class="ds-field ds-status-field"><label>Status</label><div class="ds-status" data-ds-status></div></div>'+
        '</div>'+
        renderAuthPanel()+
        '<div class="ds-toolbar-grid">'+
          controlHtml("layout","Preset Layout","layout")+
          controlHtml("style","Style","style")+
          controlHtml("typography","Typography","typography")+
          controlHtml("color","Color Theme","color")+
          controlHtml("effect","Effect Preset","effect")+
        '</div>'+
        '<div class="ds-layout-grid">'+
          controlHtml("siteWidth","Default Width","siteWidth")+
          controlHtml("headerTreatment","Header","headerTreatment")+
          controlHtml("heroTreatment","Hero","heroTreatment")+
          controlHtml("sectionRhythm","Section Rhythm","sectionRhythm")+
          controlHtml("density","Density","density")+
        '</div>'+
        '<div class="ds-effect-grid">'+
          controlHtml("shadow","Shadows","shadow")+
          controlHtml("border","Borders","border")+
          controlHtml("corner","Corners","corner")+
          controlHtml("gradient","Gradients","gradient")+
          controlHtml("motion","Motion","motion")+
        '</div>'+
        '<div class="ds-extra-grid">'+
          controlHtml("background","Background","background")+
          controlHtml("imageTreatment","Image Treatment","imageTreatment")+
          controlHtml("dividerStyle","Divider Style","dividerStyle")+
          controlHtml("emphasisStyle","Emphasis Style","emphasisStyle")+
          controlHtml("surfaceStyle","Surface Style","surfaceStyle")+
        '</div>'+
        '<div class="ds-toolbar-actions"><div class="ds-actions"><button class="ds-btn" type="button" data-ds-action="save">Save to customer</button><button class="ds-btn secondary" type="button" data-ds-action="full-preview">View Full Screen Preview</button><button class="ds-btn secondary" type="button" data-ds-action="save-profile">Save as New Design Profile</button><button class="ds-btn secondary" type="button" data-ds-action="reset">Discard Preview Changes</button><button class="ds-btn secondary" type="button" data-ds-action="reload">Reload from Supabase</button></div></div>'+
      '</section></div>'+
      '<section class="ds-preview-panel"><div class="ds-preview-boundary">Customer preview starts here</div><div class="ds-preview-frame" data-ds-preview-frame></div></section>'+
    '</div>'+
    renderSideDrawer()+
  '</div>';
  state.booted=true;
  bindFrame();
  hydrateControls();
  updatePreview(true);
  updateStatus();
}

function controlHtml(field,label,type){
  return '<div class="ds-field" data-field-wrap="'+esc(field)+'"><label for="ds-'+esc(field)+'">'+esc(label)+'</label><select id="ds-'+esc(field)+'" data-ds-select="'+esc(type)+'" disabled><option>Loading...</option></select><div class="ds-help-line" data-help="'+esc(field)+'">Loading options...</div></div>';
}

function hydrateControls(){
  var r=root(); if(!r)return;
  var lists=getPresetLists();
  var map={
    customer:{html:customerOptionsHtml(),value:state.customer_key,help:state.sideOpen?"Close Page Text before switching customers.":"Default preview profile is Demo Flying Club."},
    designProfile:{html:designProfileOptionsHtml(),value:state.selected.designProfile,help:designProfileHelp()},
    layout:{html:optionHtml(lists.layouts,"layout_key","layout_name",state.selected.layout),value:state.selected.layout,help:describe(lists.layouts,"layout_key",state.selected.layout,"description","structure_json")},
    style:{html:optionHtml(lists.styles,"style_key","style_name",state.selected.style),value:state.selected.style,help:describe(lists.styles,"style_key",state.selected.style,"description","style_json")},
    typography:{html:optionHtml(lists.typography,"typography_key","typography_name",state.selected.typography),value:state.selected.typography,help:describe(lists.typography,"typography_key",state.selected.typography,"description","typography_json")},
    color:{html:optionHtml(lists.colors,"color_key","color_name",state.selected.color),value:state.selected.color,help:describe(lists.colors,"color_key",state.selected.color,"description","color_json")},
    effect:{html:optionHtml(lists.effects,"effect_key","effect_name",state.selected.effect),value:state.selected.effect,help:describe(lists.effects,"effect_key",state.selected.effect,"description","effect_json")},
    siteWidth:{html:fixedOptionHtml("siteWidth"),value:state.selected.siteWidth,help:"Global default content width. Page-specific pages can override later."},
    headerTreatment:{html:fixedOptionHtml("headerTreatment"),value:state.selected.headerTreatment,help:"Global header/nav treatment for the preview."},
    heroTreatment:{html:fixedOptionHtml("heroTreatment"),value:state.selected.heroTreatment,help:"Global hero default. Page-specific hero counts stay in Page Studio."},
    sectionRhythm:{html:fixedOptionHtml("sectionRhythm"),value:state.selected.sectionRhythm,help:"Global section feel: open, divided, banded, or standard."},
    density:{html:fixedOptionHtml("density"),value:state.selected.density,help:"Global spacing density. Page-specific grids stay in Page Studio."},
    shadow:{html:fixedOptionHtml("shadow"),value:state.selected.shadow,help:"Composable preview override. Preset means use selected Effect Preset."},
    border:{html:fixedOptionHtml("border"),value:state.selected.border,help:"Composable preview override. Use None for true no-chrome tests."},
    corner:{html:fixedOptionHtml("corner"),value:state.selected.corner,help:"Mutually exclusive corner treatment."},
    gradient:{html:fixedOptionHtml("gradient"),value:state.selected.gradient,help:"Composable preview override for hero/background gradients."},
    motion:{html:fixedOptionHtml("motion"),value:state.selected.motion,help:"Global motion treatment. Use None for utility/admin-heavy layouts."},
    background:{html:fixedOptionHtml("background"),value:state.selected.background,help:"Global preview background/underlay treatment. Page-specific images stay in Page Studio."},
    imageTreatment:{html:fixedOptionHtml("imageTreatment"),value:state.selected.imageTreatment,help:"Global image treatment. Page-specific image count stays in Page Studio."},
    dividerStyle:{html:fixedOptionHtml("dividerStyle"),value:state.selected.dividerStyle,help:"Global section divider treatment."},
    emphasisStyle:{html:fixedOptionHtml("emphasisStyle"),value:state.selected.emphasisStyle,help:"Global emphasis treatment for labels, badges, and small calls-to-action."},
    surfaceStyle:{html:fixedOptionHtml("surfaceStyle"),value:state.selected.surfaceStyle,help:"Global content surface treatment. Page sections may override later."}
  };
  CONTROL_ORDER.forEach(function(key){
    var sel=r.querySelector('[data-ds-select="'+key+'"]');
    if(sel){sel.innerHTML=map[key].html||'<option value="">No options</option>'; sel.value=map[key].value; sel.disabled=state.loading||state.saving||(key==="customer"&&state.sideOpen);}
    var help=r.querySelector('[data-help="'+key+'"]');
    if(help)help.textContent=map[key].help||"";
  });
  setDisabled('[data-ds-action]',state.loading||state.saving);
  var save=r.querySelector('[data-ds-action="save"]');
  if(save){save.disabled=state.loading||state.saving||!state.dirty;save.textContent=state.saving?"Saving...":"Save to customer";}
}

function updateStatus(){
  var el=document.querySelector('#'+ROOT_ID+' [data-ds-status]');
  if(!el)return;
  var text='';
  var color='';
  if(state.error){text=state.error;color='#9f1239';}
  else if(state.notice){text=state.notice;color='#166534';}
  else if(state.dirty){text='Unsaved changes';color='#92400e';}
  else{text=platformAuthLabel();color=state.authEmail?'#166534':'#536171';}
  el.innerHTML='<div class="ds-status-shell"><span>'+esc(text)+'</span><button type="button" class="ds-auth-btn" data-ds-action="toggle-auth">'+esc(state.authEmail?'Sign Out':'Sign In')+'</button></div>';
  el.style.color=color;
  var authBtn=el.querySelector('[data-ds-action="toggle-auth"]');
  if(authBtn){
    authBtn.onclick=function(ev){
      if(ev){ev.preventDefault();ev.stopPropagation();}
      if(state.authEmail){
        clearAuthSession();
        state.notice='Signed out.';
        state.error='';
        state.authOpen=false;
        renderLoginGate();
        return;
      }
      state.authOpen=!state.authOpen;
      renderFrame();
      bindAuthPanelActions();
    };
  }
}

function updatePreview(immediate){
  if(state.sideOpen){updateLeftPagePreview();return;}
  if(state.previewTimer)clearTimeout(state.previewTimer);
  var run=function(){
    var vars=cssVars();
    var chipHtml='<span class="ds-chip">profile: '+esc(state.selected.designProfile)+'</span><span class="ds-chip">'+esc(displayPresetLabel(state.selected.layout,state.selected.layout))+'</span><span class="ds-chip">'+esc(displayPresetLabel(state.selected.style,state.selected.style))+'</span><span class="ds-chip">'+esc(displayPresetLabel(state.selected.typography,state.selected.typography))+'</span><span class="ds-chip">'+esc(state.selected.color)+'</span><span class="ds-chip">'+esc(state.selected.effect)+'</span><span class="ds-chip">shadow: '+esc(state.selected.shadow)+'</span><span class="ds-chip">border: '+esc(state.selected.border)+'</span><span class="ds-chip">corner: '+esc(state.selected.corner)+'</span><span class="ds-chip">gradient: '+esc(state.selected.gradient)+'</span><span class="ds-chip">width: '+esc(state.selected.siteWidth)+'</span><span class="ds-chip">header: '+esc(state.selected.headerTreatment)+'</span><span class="ds-chip">hero: '+esc(state.selected.heroTreatment)+'</span><span class="ds-chip">rhythm: '+esc(state.selected.sectionRhythm)+'</span><span class="ds-chip">density: '+esc(state.selected.density)+'</span>';
    setHTML('[data-ds-chips]',chipHtml);
    var preview=''+
      '<div class="ds-preview" style="'+esc(styleAttr(vars))+'"><div class="ds-preview-inner" style="max-width:var(--ds-content-max);margin:0 auto;">'+
        '<div class="ds-preview-header"><div class="ds-logo-box">LOGO</div><div><div class="ds-customer-name">'+esc(customerName())+'</div><div class="ds-preview-nav"><span>Home</span><span>Aircraft</span><span>Calendar</span><span>Documents</span></div></div><div class="ds-mini-btn">Member Login</div></div>'+
        '<section class="ds-page-hero"><span class="ds-eyebrow">Aircraft Fleet</span><h3>Our Aircraft</h3><p>This sample area shows how the selected layout, style, typography, color theme, and effects combine across normal SyncEtc page parts.</p></section>'+
        '<div class="ds-grid"><article class="ds-card"><h4>Design layers</h4><p>Layout controls structure. Style controls components. Typography controls type. Color controls palette. Effects control borders, shadows, gradients, and chrome.</p><div class="ds-card-meta">Preview updates locally before save.</div></article><article class="ds-card"><h4>Customer content</h4><p>Customer text, labels, and page notes remain in page-level content controls. This Design Studio page controls only appearance.</p><div class="ds-card-meta">Designed for future page-format reuse.</div></article><article class="ds-card"><h4>Future preset builder</h4><p>Draft generation from screenshots or descriptions can be added here later, then approved as company presets before assignment.</p><div class="ds-card-meta">Company-side only.</div></article></div>'+
      '</div></div>';
    setHTML('[data-ds-preview-frame]',preview);
  };
  if(immediate)run(); else state.previewTimer=setTimeout(run,120);
}

function bindFrame(){
  var r=root(); if(!r)return;

  var pageSelect=r.querySelector('[data-ds-page-select]');
  if(pageSelect){
    pageSelect.addEventListener('change',function(){
      if(hasSideUnsaved()&&!window.confirm('Discard unapplied/unsaved Page Text changes and switch page?')){pageSelect.value=state.sidePageKey;return;}
      state.sidePageKey=normalizePageKey(pageSelect.value);
      state.sideDraftValues=null;
      state.sideAppliedValues=null;
      initSideEditState(true);
      renderFrame();
      updateLeftPagePreview();
    });
  }
  r.querySelectorAll('[data-ds-page-field]').forEach(function(el){
    el.addEventListener('input',function(){
      var k=el.getAttribute('data-ds-page-field');
      if(!state.sideDraftValues)state.sideDraftValues=cloneObj(pageSettingsObject(selectedPageRow()));
      state.sideDraftValues[k]=el.value;
      state.sideDirty=true;
      var note=r.querySelector('.ds-side-note');
      if(note)note.textContent='Drawer edits pending. Apply Changes to update the preview.';
      hydrateControls();
      updateStatus();
    });
  });

  r.querySelectorAll('[data-ds-select]').forEach(function(sel){
    sel.addEventListener('change',function(){
      var field=sel.getAttribute('data-ds-select');
      if(field==='customer'){
        if(state.sideOpen){sel.value=state.customer_key;state.notice="Close Page Text before switching customer profiles.";state.error="";hydrateControls();updateStatus();return;}
        if(state.dirty&&!window.confirm('Discard unsaved local preview changes and switch customer?')){sel.value=state.customer_key;return;}
        state.customer_key=sel.value;
        loadCustomer();
        return;
      }
      if(field==="designProfile"){
        if(sel.value==="current-assignment"){
          state.selected=cloneSelected(state.lastSaved);
          state.selected.designProfile="current-assignment";
        }else{
          applyDesignProfile(sel.value);
        }
        state.dirty=!sameSelected(state.selected,state.lastSaved);
        state.error="";
        state.notice="";
        hydrateControls();
        updateStatus();
        updatePreview(false);
        return;
      }
      if(field&&state.selected.hasOwnProperty(field)){
        state.selected[field]=sel.value;
        if(field!=="designProfile")state.selected.designProfile="custom-unsaved";
        state.dirty=!sameSelected(state.selected,state.lastSaved);
        state.error="";
        state.notice="";
        hydrateControls();
        updateStatus();
        updatePreview(false);
      }
    });
  });
  r.querySelectorAll('[data-ds-action]').forEach(function(btn){
    btn.addEventListener('click',function(){
      var action=btn.getAttribute('data-ds-action');
      if(action==='toggle-auth'){
        if(state.authEmail){clearAuthSession();state.notice='Signed out.';state.error='';state.authOpen=false;renderFrame();return;}
        state.authOpen=!state.authOpen;renderFrame();bindAuthPanelActions();return;
      }
      if(action==='platform-login'){
        var emailEl=document.querySelector('#'+ROOT_ID+' [data-ds-auth-email]');
        var passEl=document.querySelector('#'+ROOT_ID+' [data-ds-auth-password]');
        signInPlatformAdmin(emailEl?emailEl.value:'',passEl?passEl.value:'');
        return;
      }
      if(action==='save')saveAssignment();
      if(action==='full-preview'){state.fullPreview=true;state.sideOpen=false;renderFrame();return;}
      if(action==='exit-full'){state.fullPreview=false;renderFrame();return;}
      if(action==='save-profile'){saveNewDesignProfile();return;}
      if(action==='side-open'){state.sideOpen=true;initSideEditState(true);state.notice='Page Text is open for '+customerName()+'.';state.error='';renderFrame();return;}
      if(action==='side-close'){if(hasSideUnsaved()&&!window.confirm('Discard unapplied/unsaved Page Text changes and close?'))return;state.sideOpen=false;state.sideDirty=false;state.sideAppliedDirty=false;state.sideDraftValues=null;state.sideAppliedValues=null;state.notice='Page Text closed. Dropdown-backed inheritance audit active.';renderFrame();return;}
      if(action==='apply-page-text'){applyPageText();return;}
      if(action==='save-page-text'){savePageText();return;}
      if(action==='discard-page-text'){discardPageText();return;}
      
      if(action==='reset')resetPreview();
      if(action==='reload'){
        if(state.dirty&&!window.confirm('Reload and discard unsaved local preview changes?'))return;
        loadCustomer();
      }
    });
  });
}

function resetPreview(){
  if(!state.dirty)return;
  state.selected=cloneSelected(state.lastSaved);
  state.dirty=false;
  state.error="";
  state.notice="Local preview reset to saved assignment.";
  hydrateControls();
  updateStatus();
  updatePreview(false);
}

function loadCustomer(){
  state.loading=true;
  state.saving=false;
  state.error="";
  state.notice="";
  state.dirty=false;
  state.loadSeq++;
  var seq=state.loadSeq;
  if(!state.booted)renderFrame(); else {var r=root(); if(r)r.classList.add('ds-skeleton'); hydrateControls(); updateStatus();}
  fetch(READ_URL+'?customer_key='+encodeURIComponent(state.customer_key),{method:'GET'})
    .then(function(res){return res.json().catch(function(){return null;}).then(function(body){if(!res.ok||!body||body.ok===false)throw new Error((body&&body.error)||'Design Studio load failed.');return body;});})
    .then(function(body){
      if(seq!==state.loadSeq)return;
      state.data=body;
      state.sidePageKey=pageOptions().some(function(p){return p.key==='home';})?'home':(pageOptions()[0]&&pageOptions()[0].key)||'home';
      state.sideDirty=false;
      state.sideAppliedDirty=false;
      state.sideDraftValues=null;
      state.sideAppliedValues=null;
      syncSelectedFromSettings();
      computeStyleDiagnostic();
      state.loading=false;
      var r=root(); if(r)r.classList.remove('ds-skeleton');
      hydrateControls();
      updateStatus();
      updatePreview(true);
      refreshInheritanceAuditPanel();
    })
    .catch(function(err){
      if(seq!==state.loadSeq)return;
      state.loading=false;
      state.error=err&&err.message?err.message:String(err);
      var r=root(); if(r)r.classList.remove('ds-skeleton');
      hydrateControls();
      updateStatus();
      updatePreview(true);
      refreshInheritanceAuditPanel();
    });
}


function slugifyProfileName(name){
  return clean(name).toLowerCase()
    .replace(/&/g," and ")
    .replace(/[^a-z0-9]+/g,"-")
    .replace(/^-+|-+$/g,"")
    .slice(0,80);
}

function currentProfileRecipe(){
  return {
    layout:state.selected.layout,
    style:state.selected.style,
    typography:state.selected.typography,
    color:state.selected.color,
    effect:state.selected.effect,
    siteWidth:state.selected.siteWidth,
    headerTreatment:state.selected.headerTreatment,
    heroTreatment:state.selected.heroTreatment,
    sectionRhythm:state.selected.sectionRhythm,
    density:state.selected.density,
    shadow:state.selected.shadow,
    border:state.selected.border,
    corner:state.selected.corner,
    gradient:state.selected.gradient,
    motion:state.selected.motion,
    background:state.selected.background,
    imageTreatment:state.selected.imageTreatment,
    dividerStyle:state.selected.dividerStyle,
    emphasisStyle:state.selected.emphasisStyle,
    surfaceStyle:state.selected.surfaceStyle
  };
}

function errorMessageFromResponse(body,status){
  if(!body)return "Save failed. HTTP "+status+".";
  if(body.error)return "Save failed. "+body.error;
  if(body.message)return "Save failed. "+body.message;
  return "Save failed. HTTP "+status+". "+JSON.stringify(body).slice(0,300);
}


function saveNewDesignProfile(){
  var existingName='';
  if(state.selected.designProfile&&state.selected.designProfile!=="current-assignment"){
    var durable=findDesignProfile(state.selected.designProfile);
    if(durable&&durable.label)existingName=durable.label;
    else if(state.selected.designProfile==="custom-unsaved")existingName='';
  }

  var name=window.prompt('Save current settings as new Design Profile. Enter profile name:',existingName);
  name=clean(name);

  if(!name){
    state.notice='Save as New Design Profile cancelled.';
    state.error='';
    updateStatus();
    return;
  }

  var key=slugifyProfileName(name);
  if(!key){
    state.error='Design Profile name must contain at least one letter or number.';
    state.notice='';
    updateStatus();
    return;
  }

  var durableExisting=findDesignProfile(key);
  if(durableExisting){
    var overwrite=window.confirm('A Design Profile named "'+durableExisting.label+'" already exists. Overwrite it?');
    if(!overwrite){
      state.notice='Save as New Design Profile cancelled.';
      state.error='';
      updateStatus();
      return;
    }
  }

  var token=getToken();
  if(!token){
    state.error='No valid Supabase login token found. Sign in as a SyncEtc platform admin, then try again.';
    state.notice='';
    updateStatus();
    return;
  }

  state.saving=true;
  state.error='';
  state.notice=durableExisting?'Overwriting Design Profile...':'Saving new Design Profile...';
  hydrateControls();
  updateStatus();

  var recipe=currentProfileRecipe();

  fetch(ACTION_URL,{
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
    body:JSON.stringify({
      action:'save_design_profile',
      customer_key:state.customer_key,
      payload:{
        customer_key:state.customer_key,
        design_profile_key:key,
        design_profile_name:name,
        description:'Created in Design Studio for '+customerName()+'.',
        profile_json:recipe
      }
    })
  })
  .then(function(res){
    return res.json().catch(function(){return null;}).then(function(body){
      if(!res.ok||!body||body.ok===false)throw new Error(errorMessageFromResponse(body,res.status));
      return body;
    });
  })
  .then(function(body){
    var design=obj(state.data&&state.data.design_presets);
    if(!Array.isArray(design.profiles))design.profiles=[];

    var row={
      design_profile_key:key,
      design_profile_name:name,
      description:'Created in Design Studio for '+customerName()+'.',
      profile_json:recipe,
      is_active:true,
      is_platform_only:true,
      sort_order:999
    };

    var replaced=false;
    design.profiles=design.profiles.map(function(p){
      if(clean(p.design_profile_key)===key){replaced=true;return row;}
      return p;
    });
    if(!replaced)design.profiles.push(row);

    if(!state.data)state.data={};
    if(!state.data.design_presets)state.data.design_presets={};
    state.data.design_presets.profiles=design.profiles;

    state.selected.designProfile=key;
    state.saving=false;
    state.dirty=true;
    state.error='';
    state.notice=(replaced?'Design Profile overwritten: ':'New Design Profile saved: ')+name+'. Use Save to customer to assign it.';
    hydrateControls();
    updateStatus();
    updatePreview(false);
  })
  .catch(function(err){
    state.saving=false;
    state.error=err&&err.message?err.message:String(err);
    state.notice='';
    hydrateControls();
    updateStatus();
  });
}

function saveAssignment(){
  var token=getToken();
  if(!token){state.error='No valid Supabase login token found. Sign in as a SyncEtc platform admin, then try again.';state.notice='';updateStatus();return;}
  state.saving=true;
  state.error="";
  state.notice="";
  hydrateControls();
  updateStatus();
  fetch(ACTION_URL,{
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
    body:JSON.stringify({
      action:'save_company_design_assignment',
      customer_key:state.customer_key,
      payload:{
        customer_key:state.customer_key,
        active_layout_key:state.selected.layout,
        active_style_key:state.selected.style,
        active_typography_key:state.selected.typography,
        active_color_key:state.selected.color,
        active_effect_key:state.selected.effect,
        design_profile_key:isDurableProfileKey(state.selected.designProfile)?state.selected.designProfile:null,
        active_design_profile_name:(findDesignProfile(state.selected.designProfile)||{}).label||"",
        profile_json:currentProfileRecipe()
      }
    })
  })
  .then(function(res){return res.json().catch(function(){return null;}).then(function(body){if(!res.ok||!body||body.ok===false)throw new Error(errorMessageFromResponse(body,res.status));return body;});})
  .then(function(){
    state.saving=false;
    state.lastSaved=cloneSelected(state.selected);
    state.dirty=false;
    state.notice='Design assignment saved for '+customerName()+'.';
    hydrateControls();
    updateStatus();
    updatePreview(false);
  })
  .catch(function(err){
    state.saving=false;
    state.error=err&&err.message?err.message:String(err);
    hydrateControls();
    updateStatus();
  });
}

function installUnloadGuard(){
  window.addEventListener('beforeunload',function(e){
    if(!(state.dirty||pageTextHasUnsafeNavigation()))return;
    e.preventDefault();
    e.returnValue='';
    return '';
  });
  document.addEventListener('click',function(e){
    if(!pageTextHasUnsafeNavigation())return;
    var a=e.target&&e.target.closest&&e.target.closest('a[href]');
    if(!a)return;
    var href=a.getAttribute('href')||'';
    if(href==='#'||href.indexOf('javascript:')===0)return;
    if(!window.confirm('You have unapplied/unsaved Page Text changes. Leave this page and lose them?')){
      e.preventDefault();
      e.stopPropagation();
    }
  },true);
}

function start(){
  installStyles();
  installUnloadGuard();
  loadAuthSession();
  if(getToken()){
    renderFrame();
    loadCustomer();
  }else{
    renderLoginGate();
  }
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();


/* v36 post-render visible diagnostic hook - BEGIN */
var __syncetcRenderFrameOriginal=renderFrame;
renderFrame=function(){
  __syncetcRenderFrameOriginal.apply(this,arguments);
  setTimeout(ensureVisibleDiagnosticPanel,0);
};
/* v36 post-render visible diagnostic hook - END */

})();
/* PAGE-DESIGN-STUDIO-v38.js - END */
