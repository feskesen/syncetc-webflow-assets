/* PAGE-DESIGN-STUDIO-v4.js | preview boundary and expanded layout controls | Generated: 2026-06-01 03:35:00 UTC */
(function(){
"use strict";

var VERSION="PAGE-DESIGN-STUDIO-v4";
var SUPABASE_URL="https://ocdaohkiwonjmirqkjww.supabase.co";
var READ_URL=SUPABASE_URL+"/functions/v1/syncetc-site-settings-read";
var ACTION_URL=SUPABASE_URL+"/functions/v1/syncetc-site-settings-action";
var MOUNT_ID="syncetc-webflow-mount";
var ROOT_ID="syncetc-design-studio-root";
var STYLE_ID="syncetc-design-studio-v4-style";
var CONTROL_ORDER=["customer","layout","style","typography","color","siteWidth","headerTreatment","heroTreatment","sectionRhythm","density","effect","shadow","border","corner","gradient"];

var CUSTOMER_OPTIONS=[
  {key:"demo_flying_club",label:"Demo Flying Club"},
  {key:"150th_aero",label:"150th Aero Flying Club"}
];

var DEFAULT_SELECTED={
  layout:"club-classic-boxed",
  style:"rounded-club",
  typography:"system-standard",
  color:"forest-operations",
  effect:"soft-card-shadows",
  shadow:"preset",
  border:"preset",
  corner:"preset",
  gradient:"preset",
  siteWidth:"standard",
  headerTreatment:"standard",
  heroTreatment:"standard",
  sectionRhythm:"standard",
  density:"standard"
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
  selected:Object.assign({},DEFAULT_SELECTED),
  lastSaved:Object.assign({},DEFAULT_SELECTED),
  loadSeq:0,
  previewTimer:null,
  sideOpen:false
};

function esc(v){return String(v==null?"":v).replace(/[&<>\"']/g,function(m){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m];});}
function clean(v){return v==null?"":String(v).trim();}
function byId(id){return document.getElementById(id);}
function root(){return byId(ROOT_ID);}
function obj(v){return v&&typeof v==="object"&&!Array.isArray(v)?v:{};}
function arr(v){return Array.isArray(v)?v:[];}
function cloneSelected(v){return {layout:v.layout,style:v.style,typography:v.typography,color:v.color,effect:v.effect,shadow:v.shadow,border:v.border,corner:v.corner,gradient:v.gradient,siteWidth:v.siteWidth,headerTreatment:v.headerTreatment,heroTreatment:v.heroTreatment,sectionRhythm:v.sectionRhythm,density:v.density};}
function sameSelected(a,b){return clean(a.layout)===clean(b.layout)&&clean(a.style)===clean(b.style)&&clean(a.typography)===clean(b.typography)&&clean(a.color)===clean(b.color)&&clean(a.effect)===clean(b.effect)&&clean(a.shadow)===clean(b.shadow)&&clean(a.border)===clean(b.border)&&clean(a.corner)===clean(b.corner)&&clean(a.gradient)===clean(b.gradient)&&clean(a.siteWidth)===clean(b.siteWidth)&&clean(a.headerTreatment)===clean(b.headerTreatment)&&clean(a.heroTreatment)===clean(b.heroTreatment)&&clean(a.sectionRhythm)===clean(b.sectionRhythm)&&clean(a.density)===clean(b.density);}
function setText(selector,text){var r=root();if(!r)return;var el=r.querySelector(selector);if(el)el.textContent=text||"";}
function setHTML(selector,html){var r=root();if(!r)return;var el=r.querySelector(selector);if(el)el.innerHTML=html||"";}
function setDisabled(selector,disabled){var r=root();if(!r)return;r.querySelectorAll(selector).forEach(function(el){el.disabled=!!disabled;});}

function findAccessToken(value,depth){
  if(!value||depth>6)return "";
  if(typeof value==="string"){
    if(value.split(".").length===3&&value.length>80)return value;
    try{return findAccessToken(JSON.parse(value),depth+1);}catch(e){return "";}
  }
  if(typeof value!=="object")return "";
  if(value.access_token&&typeof value.access_token==="string")return value.access_token;
  if(value.currentSession&&value.currentSession.access_token)return value.currentSession.access_token;
  if(value.session&&value.session.access_token)return value.session.access_token;
  if(value.data&&value.data.session&&value.data.session.access_token)return value.data.session.access_token;
  var keys=Object.keys(value);
  for(var i=0;i<keys.length;i++){var found=findAccessToken(value[keys[i]],depth+1);if(found)return found;}
  return "";
}

function getToken(){
  try{if(window.SyncEtc&&window.SyncEtc.AuthContext&&window.SyncEtc.AuthContext.getToken){var t=window.SyncEtc.AuthContext.getToken();if(t)return t;}}catch(e){}
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
    #'+ROOT_ID+'{--ds-shell-max:1240px;--ds-sticky-top:0px;--ds-control-h:270px;--ds-primary:#12365a;--ds-accent:#2f80c4;--ds-soft:#eaf5ff;--ds-text:#17212b;--ds-muted:#5d6b78;--ds-bg:#fff;--ds-font:Arial,Helvetica,sans-serif;--ds-radius:22px;--ds-button-radius:999px;--ds-eyebrow-radius:999px;--ds-gap:18px;--ds-shadow:0 10px 28px rgba(12,38,64,.10);--ds-border:1px solid rgba(18,54,90,.14);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:#17212b;min-height:100vh;background:linear-gradient(180deg,#f7fbff 0%,#ffffff 220px);}\
    #'+ROOT_ID+' .ds-shell{max-width:var(--ds-shell-max);margin:0 auto;padding:24px 22px 64px;}\
    #'+ROOT_ID+' .ds-hero-top{display:flex;justify-content:space-between;align-items:flex-end;gap:22px;margin:0 0 18px;}\
    #'+ROOT_ID+' .ds-kicker{display:inline-flex;margin-bottom:8px;color:#607287;font-size:11px;font-weight:950;letter-spacing:.105em;text-transform:uppercase;}\
    #'+ROOT_ID+' h1{margin:0;color:#102a43;font-size:clamp(30px,4vw,46px);line-height:1.02;letter-spacing:-.04em;}\
    #'+ROOT_ID+' .ds-hero-top p{max-width:830px;margin:10px 0 0;color:#536171;font-size:15.5px;line-height:1.55;}\
    #'+ROOT_ID+' .ds-version{display:inline-flex;align-items:center;white-space:nowrap;border:1px solid rgba(18,54,90,.14);background:#fff;border-radius:999px;padding:7px 11px;color:#12365a;font-size:12px;font-weight:900;box-shadow:0 4px 14px rgba(12,38,64,.06);}\
    #'+ROOT_ID+' .ds-toolbar-wrap{position:sticky;top:var(--ds-sticky-top);z-index:50;min-height:var(--ds-control-h);margin:0 0 18px;}\
    #'+ROOT_ID+' .ds-toolbar{min-height:var(--ds-control-h);border:1px solid rgba(18,54,90,.16);border-radius:24px;background:rgba(255,255,255,.96);backdrop-filter:blur(14px);box-shadow:0 14px 38px rgba(12,38,64,.13);padding:14px;}\
    #'+ROOT_ID+' .ds-toolbar-grid{display:grid;grid-template-columns:1.18fr repeat(5,minmax(128px,1fr));gap:10px;align-items:end;}\
    #'+ROOT_ID+' .ds-layout-grid,#'+ROOT_ID+' .ds-effect-grid{display:grid;grid-template-columns:repeat(5,minmax(128px,1fr));gap:10px;align-items:end;margin-top:10px;padding-top:10px;border-top:1px solid rgba(18,54,90,.10);}\
    #'+ROOT_ID+' .ds-field{min-width:0;}\
    #'+ROOT_ID+' .ds-field label{display:block;margin:0 0 5px;color:#12365a;font-size:10.5px;font-weight:950;letter-spacing:.06em;text-transform:uppercase;}\
    #'+ROOT_ID+' .ds-field select{width:100%;height:42px;border:1px solid rgba(18,54,90,.22);border-radius:12px;background:#fff;color:#17212b;padding:0 10px;font:inherit;font-size:12.5px;font-weight:750;line-height:42px;appearance:auto;outline:none;}\
    #'+ROOT_ID+' .ds-field select:focus{border-color:#2f80c4;box-shadow:0 0 0 3px rgba(47,128,196,.13);}\
    #'+ROOT_ID+' .ds-field select:disabled{background:#f8fafc;color:#94a3b8;}\
    #'+ROOT_ID+' .ds-help-line{min-height:18px;margin-top:5px;color:#667789;font-size:10.8px;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}\
    #'+ROOT_ID+' .ds-toolbar-actions{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-top:12px;min-height:38px;}\
    #'+ROOT_ID+' .ds-status{min-height:18px;color:#536171;font-size:12px;font-weight:850;}\
    #'+ROOT_ID+' .ds-status.good{color:#166534;}\
    #'+ROOT_ID+' .ds-status.warn{color:#92400e;}\
    #'+ROOT_ID+' .ds-status.error{color:#991b1b;}\
    #'+ROOT_ID+' .ds-actions{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;}\
    #'+ROOT_ID+' .ds-btn{display:inline-flex;align-items:center;justify-content:center;min-height:36px;border:1px solid #12365a;border-radius:999px;background:#12365a;color:#fff;padding:9px 13px;font:inherit;font-size:12px;font-weight:950;cursor:pointer;text-decoration:none;white-space:nowrap;}\
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
    #'+ROOT_ID+' .ds-preview{min-height:620px;border-radius:var(--preview-radius,24px);border:var(--preview-border,1px solid rgba(18,54,90,.14));background:var(--ds-bg,#fff);box-shadow:var(--preview-shadow,0 12px 34px rgba(12,38,64,.10));overflow:hidden;transition:background .16s ease,border-color .16s ease,box-shadow .16s ease;}\
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
    @media(max-width:1080px){#'+ROOT_ID+' .ds-toolbar-grid,#'+ROOT_ID+' .ds-layout-grid,#'+ROOT_ID+' .ds-effect-grid{grid-template-columns:1fr 1fr 1fr;}#'+ROOT_ID+'{--ds-control-h:430px;}}\
    @media(max-width:760px){#'+ROOT_ID+' .ds-shell{padding:18px 14px 48px;}#'+ROOT_ID+' .ds-hero-top{display:block;}#'+ROOT_ID+' .ds-version{margin-top:12px;}#'+ROOT_ID+' .ds-toolbar-grid,#'+ROOT_ID+' .ds-layout-grid,#'+ROOT_ID+' .ds-effect-grid{grid-template-columns:1fr;}#'+ROOT_ID+'{--ds-control-h:980px;}#'+ROOT_ID+' .ds-toolbar-actions{display:block;}#'+ROOT_ID+' .ds-actions{justify-content:flex-start;margin-top:10px;}#'+ROOT_ID+' .ds-preview-head{display:block;}#'+ROOT_ID+' .ds-chip-row{justify-content:flex-start;margin-top:10px;}#'+ROOT_ID+' .ds-preview-header{grid-template-columns:1fr;}#'+ROOT_ID+' .ds-grid{grid-template-columns:1fr!important;}}\
  ';
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
  state.selected.layout=clean(settings.active_layout_key)||DEFAULT_SELECTED.layout;
  state.selected.style=clean(settings.active_style_key)||DEFAULT_SELECTED.style;
  state.selected.typography=clean(settings.active_typography_key)||DEFAULT_SELECTED.typography;
  state.selected.color=clean(settings.active_color_key)||DEFAULT_SELECTED.color;
  state.selected.effect=clean(settings.active_effect_key)||DEFAULT_SELECTED.effect;
  state.selected.shadow="preset";
  state.selected.border="preset";
  state.selected.corner="preset";
  state.selected.gradient="preset";
  state.selected.siteWidth="standard";
  state.selected.headerTreatment="standard";
  state.selected.heroTreatment="standard";
  state.selected.sectionRhythm="standard";
  state.selected.density="standard";
  state.lastSaved=cloneSelected(state.selected);
  state.dirty=false;
}

function describe(list,keyName,key,descName,jsonName){
  var p=findPreset(list,keyName,key);
  if(!p)return state.loading?"Loading options...":"No preset found for this value.";
  return cleanPresetDescription(key,clean(p[descName])||JSON.stringify(obj(p[jsonName])).slice(0,140));
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
  return out;
}

function styleAttr(map){return Object.keys(map).map(function(k){return k+":"+String(map[k]).replace(/[\";]/g,"");}).join(";");}

function fixedOptionHtml(field){
  var options={
    shadow:[["preset","Preset"],["none","None"],["soft","Soft"],["strong","Strong"]],
    border:[["preset","Preset"],["none","None"],["hairline","Hairline"],["visible","Visible"]],
    corner:[["preset","Preset"],["square","Square"],["soft","Soft"],["rounded","Rounded"],["pill","Pill"]],
    gradient:[["preset","Preset"],["off","Off"],["subtle","Subtle"],["standard","Standard"]],
    siteWidth:[["standard","Standard"],["narrow","Narrow"],["wide","Wide"],["full","Full Bleed"]],
    headerTreatment:[["standard","Standard"],["plain","Plain"],["utility","Utility"],["dashboard","Dashboard"]],
    heroTreatment:[["standard","Standard"],["plain","Plain"],["banner","Banner"],["compact","Compact"]],
    sectionRhythm:[["standard","Standard"],["open","Open"],["divided","Divided"],["banded","Banded"]],
    density:[["standard","Standard"],["relaxed","Relaxed"],["compact","Compact"],["operations","Operations"]]
  }[field]||[];
  return options.map(function(o){return '<option value="'+esc(o[0])+'" '+(state.selected[field]===o[0]?'selected':'')+'>'+esc(o[1])+'</option>';}).join("");
}

function renderFrame(){
  installStyles();
  var mount=byId(MOUNT_ID)||document.body;
  mount.innerHTML='<div id="'+ROOT_ID+'" class="'+(state.loading?'ds-skeleton':'')+'">'+
    '<div class="ds-shell">'+
      '<div class="ds-hero-top"><div><span class="ds-kicker">SyncEtc Company Tool</span><h1>Design Studio</h1><p>Assign the company-controlled design system for a customer profile. Page text and customer content editing stay on the individual customer pages.</p></div><div class="ds-version">'+esc(VERSION)+'</div></div>'+
      '<div class="ds-toolbar-wrap"><section class="ds-toolbar" aria-label="Design Studio Controls">'+
        '<div class="ds-toolbar-grid">'+
          controlHtml("customer","Customer / Profile","customer")+
          controlHtml("layout","Layout","layout")+
          controlHtml("style","Style","style")+
          controlHtml("typography","Typography","typography")+
          controlHtml("color","Color Theme","color")+
        '</div>'+ 
        '<div class="ds-layout-grid">'+
          controlHtml("siteWidth","Default Width","siteWidth")+
          controlHtml("headerTreatment","Header","headerTreatment")+
          controlHtml("heroTreatment","Hero","heroTreatment")+
          controlHtml("sectionRhythm","Section Rhythm","sectionRhythm")+
          controlHtml("density","Density","density")+
        '</div>'+
        '<div class="ds-effect-grid">'+
          controlHtml("effect","Effect Preset","effect")+
          controlHtml("shadow","Shadows","shadow")+
          controlHtml("border","Borders","border")+
          controlHtml("corner","Corners","corner")+
          controlHtml("gradient","Gradients","gradient")+
        '</div>'+
        '<div class="ds-toolbar-actions"><div class="ds-status" data-ds-status></div><div class="ds-actions"><button class="ds-btn" type="button" data-ds-action="save">Save to customer</button><button class="ds-btn secondary" type="button" data-ds-action="save-profile" disabled>Save as New Design Profile</button><button class="ds-btn secondary" type="button" data-ds-action="enter-profile" disabled>Enter New Design Profile</button><button class="ds-btn secondary" type="button" data-ds-action="reset">Reset preview</button><button class="ds-btn secondary" type="button" data-ds-action="reload">Reload</button></div></div>'+
      '</section></div>'+
      '<section class="ds-preview-panel"><div class="ds-preview-head"><div><h2>Live preview</h2><p>Local preview updates before save. The control bar keeps fixed order and reserved height to avoid first-load hopping.</p></div><div class="ds-chip-row" data-ds-chips></div></div><div class="ds-preview-boundary">Customer preview starts here</div><div class="ds-preview-frame" data-ds-preview-frame></div></section>'+
    '</div>'+
    '<button class="ds-side-tab" type="button" data-ds-action="side-open">Page Text</button>'+
    '<aside class="ds-side-drawer" data-ds-side-drawer><div class="ds-side-head"><div><h3>Page text loader</h3><p>Placeholder for the selected customer only. Customer switching is locked while this drawer is open.</p></div><button class="ds-side-close" type="button" data-ds-action="side-close">×</button></div><div class="ds-side-body"><div class="ds-field"><label for="ds-page-placeholder">Page</label><select id="ds-page-placeholder" disabled><option>Aircraft</option><option>Calendar</option><option>Documents</option><option>Gallery</option><option>Home</option></select><div class="ds-help-line">Future version will list only pages/modules enabled for the selected customer.</div></div><div class="ds-side-disabled">Page text editing is intentionally disabled in v4. Next pass will audit the content-editing tables and wire this drawer to the correct page-specific settings path.</div></div></aside>'+
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
    gradient:{html:fixedOptionHtml("gradient"),value:state.selected.gradient,help:"Composable preview override for hero/background gradients."}
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
  var text=""; var cls="";
  if(state.loading){text="Loading Design Studio presets...";}
  else if(state.saving){text="Saving design assignment...";}
  else if(state.error){text=state.error;cls="error";}
  else if(state.notice){text=state.notice;cls="good";}
  else if(state.dirty){text="Unsaved local preview. Save to assign this design to "+customerName()+".";cls="warn";}
  else{text="Saved assignment loaded for "+customerName()+".";cls="good";}
  var r=root(); if(!r)return;
  var el=r.querySelector('[data-ds-status]');
  if(el){el.textContent=text;el.className="ds-status"+(cls?" "+cls:"");}
}

function updatePreview(immediate){
  if(state.previewTimer)clearTimeout(state.previewTimer);
  var run=function(){
    var vars=cssVars();
    var chipHtml='<span class="ds-chip">'+esc(displayPresetLabel(state.selected.layout,state.selected.layout))+'</span><span class="ds-chip">'+esc(displayPresetLabel(state.selected.style,state.selected.style))+'</span><span class="ds-chip">'+esc(displayPresetLabel(state.selected.typography,state.selected.typography))+'</span><span class="ds-chip">'+esc(state.selected.color)+'</span><span class="ds-chip">'+esc(state.selected.effect)+'</span><span class="ds-chip">shadow: '+esc(state.selected.shadow)+'</span><span class="ds-chip">border: '+esc(state.selected.border)+'</span><span class="ds-chip">corner: '+esc(state.selected.corner)+'</span><span class="ds-chip">gradient: '+esc(state.selected.gradient)+'</span><span class="ds-chip">width: '+esc(state.selected.siteWidth)+'</span><span class="ds-chip">header: '+esc(state.selected.headerTreatment)+'</span><span class="ds-chip">hero: '+esc(state.selected.heroTreatment)+'</span><span class="ds-chip">rhythm: '+esc(state.selected.sectionRhythm)+'</span><span class="ds-chip">density: '+esc(state.selected.density)+'</span>';
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
      if(field&&state.selected.hasOwnProperty(field)){
        state.selected[field]=sel.value;
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
      if(action==='save')saveAssignment();
      if(action==='save-profile'||action==='enter-profile')return;
      if(action==='side-open'){var d=r.querySelector('[data-ds-side-drawer]');if(d)d.classList.add('is-open');state.sideOpen=true;state.notice='Page Text is open for '+customerName()+'. Close it before switching customers.';state.error='';hydrateControls();updateStatus();return;}
      if(action==='side-close'){var c=r.querySelector('[data-ds-side-drawer]');if(c)c.classList.remove('is-open');state.sideOpen=false;state.notice='Page Text closed.';hydrateControls();updateStatus();return;}
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
      syncSelectedFromSettings();
      state.loading=false;
      var r=root(); if(r)r.classList.remove('ds-skeleton');
      hydrateControls();
      updateStatus();
      updatePreview(true);
    })
    .catch(function(err){
      if(seq!==state.loadSeq)return;
      state.loading=false;
      state.error=err&&err.message?err.message:String(err);
      var r=root(); if(r)r.classList.remove('ds-skeleton');
      hydrateControls();
      updateStatus();
      updatePreview(true);
    });
}

function saveAssignment(){
  var token=getToken();
  if(!token){state.error='Sign in as a platform admin before saving Design Studio assignments.';state.notice='';updateStatus();return;}
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
        active_effect_key:state.selected.effect
      }
    })
  })
  .then(function(res){return res.json().catch(function(){return null;}).then(function(body){if(!res.ok||!body||body.ok===false)throw new Error((body&&body.error)||'Save failed.');return body;});})
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
    if(!state.dirty)return;
    e.preventDefault();
    e.returnValue='';
    return '';
  });
}

function start(){
  installStyles();
  installUnloadGuard();
  renderFrame();
  loadCustomer();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();

})();
/* PAGE-DESIGN-STUDIO-v4.js - END */
