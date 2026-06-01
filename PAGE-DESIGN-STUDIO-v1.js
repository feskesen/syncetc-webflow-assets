/* PAGE-DESIGN-STUDIO-v1.js | company-only design studio foundation | Generated: 2026-06-01 01:11:55 UTC */
(function(){
"use strict";

var VERSION="PAGE-DESIGN-STUDIO-v1";
var SUPABASE_URL="https://ocdaohkiwonjmirqkjww.supabase.co";
var READ_URL=SUPABASE_URL+"/functions/v1/syncetc-site-settings-read";
var ACTION_URL=SUPABASE_URL+"/functions/v1/syncetc-site-settings-action";
var ROOT_ID="syncetc-design-studio-root";
var STYLE_ID="syncetc-design-studio-style";

var state={
  loading:true,
  saving:false,
  error:"",
  notice:"",
  customer_key:"demo_flying_club",
  data:null,
  selected:{
    layout:"club-classic-boxed",
    style:"rounded-club",
    typography:"system-standard",
    color:"forest-operations",
    effect:"soft-card-shadows"
  }
};

function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(m){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m];});}
function clean(v){return v==null?"":String(v).trim();}
function byId(id){return document.getElementById(id);}
function first(arr){return Array.isArray(arr)&&arr.length?arr[0]:null;}
function findBy(arr,keyName,key){return (arr||[]).find(function(x){return clean(x[keyName])===clean(key);})||null;}
function obj(v){return v&&typeof v==="object"&&!Array.isArray(v)?v:{};}

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
  try{if(window.SyncEtc&&window.SyncEtc.AuthContext&&window.SyncEtc.AuthContext.getToken){var t=window.SyncEtc.AuthContext.getToken();if(t)return t;}}catch(e){}
  try{
    for(var i=0;i<localStorage.length;i++){var key=localStorage.key(i)||"";if(key.indexOf("auth")>=0||key.indexOf("sb-")===0||key.indexOf("supabase")>=0){var found=findAccessToken(localStorage.getItem(key),0);if(found)return found;}}
  }catch(e){}
  return "";
}

function installStyles(){
  if(byId(STYLE_ID))return;
  var s=document.createElement("style");
  s.id=STYLE_ID;
  s.textContent=`
    #${ROOT_ID}{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:#17212b;max-width:1240px;margin:28px auto 64px;padding:0 22px;}
    .ds-top{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;margin-bottom:18px;}
    .ds-kicker{display:inline-flex;margin-bottom:8px;color:#617082;font-size:11px;font-weight:900;letter-spacing:.10em;text-transform:uppercase;}
    .ds-top h1{margin:0;color:#102a43;font-size:clamp(30px,4vw,46px);line-height:1.03;letter-spacing:-.04em;}
    .ds-top p{max-width:790px;margin:12px 0 0;color:#536171;font-size:16px;line-height:1.6;}
    .ds-pill{display:inline-flex;align-items:center;gap:7px;padding:7px 10px;border-radius:999px;background:#eef6ff;border:1px solid rgba(18,54,90,.14);color:#12365a;font-size:12px;font-weight:900;white-space:nowrap;}
    .ds-shell{display:grid;grid-template-columns:360px minmax(0,1fr);gap:18px;align-items:start;}
    .ds-panel{background:rgba(255,255,255,.96);border:1px solid rgba(18,54,90,.16);border-radius:22px;box-shadow:0 12px 34px rgba(12,38,64,.12);overflow:hidden;}
    .ds-panel-head{padding:16px 18px;background:linear-gradient(135deg,#12365a,#2f80c4);color:#fff;}
    .ds-panel-head h2{margin:0;color:#fff;font-size:18px;line-height:1.15;}
    .ds-panel-head p{margin:6px 0 0;color:rgba(255,255,255,.86);font-size:12.5px;line-height:1.4;}
    .ds-controls{padding:16px;display:grid;gap:12px;}
    .ds-field label{display:block;margin-bottom:5px;color:#12365a;font-size:11px;font-weight:900;letter-spacing:.06em;text-transform:uppercase;}
    .ds-field select{width:100%;border:1px solid rgba(18,54,90,.22);border-radius:12px;background:#fff;color:#17212b;padding:10px 11px;font:inherit;font-size:13px;}
    .ds-field small{display:block;margin-top:5px;color:#667789;font-size:11.5px;line-height:1.3;}
    .ds-actions{display:flex;gap:8px;flex-wrap:wrap;padding-top:4px;}
    .ds-btn{border:0;border-radius:999px;padding:10px 13px;font-size:13px;font-weight:900;cursor:pointer;background:#12365a;color:#fff;}
    .ds-btn.secondary{background:#eef6ff;color:#12365a;border:1px solid rgba(18,54,90,.18);}
    .ds-btn:disabled{opacity:.55;cursor:not-allowed;}
    .ds-note{padding:11px 12px;border-radius:14px;background:#f8fbff;border:1px solid rgba(18,54,90,.12);color:#536171;font-size:12px;line-height:1.45;}
    .ds-note.error{background:#fff5f5;border-color:#fecaca;color:#991b1b;}
    .ds-note.good{background:#f0fdf4;border-color:#bbf7d0;color:#14532d;}
    .ds-preview-wrap{padding:18px;}
    .ds-preview{min-height:620px;border-radius:22px;border:1px solid rgba(18,54,90,.14);background:var(--ds-bg,#fff);overflow:hidden;box-shadow:0 12px 34px rgba(12,38,64,.10);}
    .ds-preview.unboxed{border-color:transparent;box-shadow:none;border-radius:0;}
    .ds-preview-inner{padding:var(--ds-pad,28px);font-family:var(--ds-font,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif);color:var(--ds-text,#17212b);}
    .ds-preview-header{display:grid;grid-template-columns:92px minmax(0,1fr);gap:16px;align-items:center;margin-bottom:var(--ds-gap,22px);padding:var(--ds-header-pad,14px);border:var(--ds-border,1px solid rgba(18,54,90,.14));border-radius:var(--ds-radius,18px);box-shadow:var(--ds-shadow,0 8px 22px rgba(12,38,64,.08));background:var(--ds-card,#fff);}
    .ds-logo-box{height:72px;border-radius:var(--ds-radius,18px);border:var(--ds-border,1px solid rgba(18,54,90,.14));background:var(--ds-soft,#eef6ff);display:flex;align-items:center;justify-content:center;color:var(--ds-primary,#12365a);font-weight:1000;}
    .ds-preview-nav{display:flex;gap:10px;flex-wrap:wrap;margin-top:8px;}
    .ds-preview-nav span{font-size:12px;font-weight:850;color:var(--ds-primary,#12365a);padding:5px 8px;border-radius:var(--ds-button-radius,999px);background:var(--ds-soft,#eef6ff);}
    .ds-hero{padding:var(--ds-hero-pad,28px);margin-bottom:var(--ds-gap,22px);border:var(--ds-hero-border,var(--ds-border,1px solid rgba(18,54,90,.14)));border-radius:var(--ds-hero-radius,var(--ds-radius,22px));box-shadow:var(--ds-shadow,0 10px 28px rgba(12,38,64,.10));background:var(--ds-hero-bg,linear-gradient(135deg,var(--ds-primary,#12365a),var(--ds-accent,#2f80c4)));color:var(--ds-hero-text,#fff);}
    .ds-eyebrow{display:inline-flex;margin-bottom:10px;padding:var(--ds-eyebrow-pad,5px 10px);border-radius:var(--ds-eyebrow-radius,999px);background:var(--ds-eyebrow-bg,rgba(255,255,255,.16));border:var(--ds-eyebrow-border,1px solid rgba(255,255,255,.22));font-size:11px;font-weight:950;letter-spacing:.08em;text-transform:uppercase;}
    .ds-hero h3{margin:0;font-size:var(--ds-title-size,38px);line-height:1.04;letter-spacing:-.04em;color:inherit;}
    .ds-hero p{max-width:760px;margin:12px 0 0;color:var(--ds-hero-muted,rgba(255,255,255,.88));font-size:15px;line-height:1.6;}
    .ds-grid{display:grid;grid-template-columns:var(--ds-grid,1fr 1fr);gap:var(--ds-gap,18px);}
    .ds-card{padding:var(--ds-card-pad,20px);border:var(--ds-border,1px solid rgba(18,54,90,.14));border-radius:var(--ds-radius,18px);box-shadow:var(--ds-shadow,0 8px 22px rgba(12,38,64,.08));background:var(--ds-card,#fff);}
    .ds-card h4{margin:0 0 8px;color:var(--ds-primary,#12365a);font-size:18px;}
    .ds-card p{margin:0;color:var(--ds-muted,#536171);font-size:14px;line-height:1.55;}
    .ds-meta{margin-top:14px;padding-top:12px;border-top:1px solid rgba(18,54,90,.10);font-size:12px;color:var(--ds-muted,#536171);}
    @media(max-width:900px){.ds-shell{grid-template-columns:1fr;}.ds-top{display:block;}}
  `;
  document.head.appendChild(s);
}

function getPresetLists(){
  var d=state.data||{};
  var dp=d.design_presets||{};
  return {
    layouts:dp.layouts||[],
    styles:dp.styles||[],
    typography:dp.typography||[],
    colors:dp.colors||[],
    effects:dp.effects||[]
  };
}
function syncSelectedFromSettings(){
  var settings=(state.data&&state.data.settings)||{};
  state.selected.layout=clean(settings.active_layout_key)||state.selected.layout;
  state.selected.style=clean(settings.active_style_key)||state.selected.style;
  state.selected.typography=clean(settings.active_typography_key)||state.selected.typography;
  state.selected.color=clean(settings.active_color_key)||state.selected.color;
  state.selected.effect=clean(settings.active_effect_key)||state.selected.effect;
}

function optionHtml(arr,keyName,labelName,selected){
  return (arr||[]).map(function(x){var k=clean(x[keyName]);return '<option value="'+esc(k)+'" '+(k===selected?'selected':'')+'>'+esc(x[labelName]||k)+'</option>';}).join("");
}

function describePreset(arr,keyName,key,descName,jsonName){
  var p=findBy(arr,keyName,key);
  if(!p)return "";
  var d=clean(p[descName]);
  return d || JSON.stringify(obj(p[jsonName]||{})).slice(0,160);
}

function previewVars(){
  var lists=getPresetLists();
  var layout=findBy(lists.layouts,"layout_key",state.selected.layout)||{};
  var style=findBy(lists.styles,"style_key",state.selected.style)||{};
  var type=findBy(lists.typography,"typography_key",state.selected.typography)||{};
  var color=findBy(lists.colors,"color_key",state.selected.color)||{};
  var effect=findBy(lists.effects,"effect_key",state.selected.effect)||{};
  var L=obj(layout.structure_json), S=obj(style.style_json), T=obj(type.typography_json), C=obj(color.color_json), E=obj(effect.effect_json);

  var css={};
  css["--ds-primary"]=C.primary||"#12365a";
  css["--ds-accent"]=C.accent||"#2f80c4";
  css["--ds-soft"]=C.soft||"#eef6ff";
  css["--ds-text"]=C.text||"#17212b";
  css["--ds-muted"]=C.muted||"#536171";
  css["--ds-bg"]=C.background||"#ffffff";
  css["--ds-font"]=T.fontFamily||"Arial, Helvetica, sans-serif";

  css["--ds-radius"]=S.radiusScale==="none"?"0":(S.radiusScale==="medium"?"12px":"22px");
  css["--ds-button-radius"]=S.buttonShape==="square"?"0":(S.buttonShape==="rounded"?"12px":"999px");
  css["--ds-eyebrow-radius"]=S.eyebrowShape==="text"?"0":"999px";
  css["--ds-gap"]=S.spacing==="compact"?"12px":(S.spacing==="open"?"32px":"18px");

  css["--ds-shadow"]=E.shadows==="none"?"none":(E.shadows==="minimal"?"0 3px 10px rgba(12,38,64,.06)":"0 10px 28px rgba(12,38,64,.10)");
  css["--ds-border"]=E.borders==="none"?"0":(E.borders==="hairline"?"1px solid rgba(18,54,90,.10)":"1px solid rgba(18,54,90,.14)");
  css["--ds-hero-bg"]=E.gradients==="none"?(C.background||"#fff"):"linear-gradient(135deg,"+(C.primary||"#12365a")+","+(C.accent||"#2f80c4")+")";
  css["--ds-hero-text"]=E.gradients==="none"?(C.text||"#17212b"):"#ffffff";
  css["--ds-hero-muted"]=E.gradients==="none"?(C.muted||"#536171"):"rgba(255,255,255,.88)";
  css["--ds-hero-border"]=L.shell==="unboxed"?"0":"var(--ds-border)";
  css["--ds-hero-radius"]=L.shell==="unboxed"?"0":"var(--ds-radius)";
  css["--ds-hero-pad"]=L.hero==="open"?"46px 0 28px":"28px";
  css["--ds-pad"]=L.shell==="unboxed"?"8px 10px":"28px";
  css["--ds-card"]=L.sections==="floating"?"transparent":"#ffffff";
  css["--ds-card-pad"]=L.sections==="floating"?"22px 0":"20px";
  css["--ds-grid"]=L.columns==="multi"?"1fr 1fr 1fr":(L.columns==="open"?"1.2fr .8fr":"1fr 1fr");
  css["--ds-title-size"]=T.scale==="large"?"46px":(T.scale==="compact"?"30px":"38px");
  return css;
}
function styleAttr(obj){
  return Object.keys(obj).map(function(k){return k+":"+String(obj[k]).replace(/"/g,"&quot;");}).join(";");
}

function render(){
  installStyles();
  var mount=byId("syncetc-webflow-mount")||document.body;
  var lists=getPresetLists();
  var s=state.selected;
  var css=previewVars();
  var settings=(state.data&&state.data.settings)||{};
  var customerLabel=settings.brand_overrides&&settings.brand_overrides.customerName?settings.brand_overrides.customerName:state.customer_key.replace(/_/g," ");
  var previewClass=(s.layout==="apple-unboxed"||s.layout==="club-classic-boxed"===false)?"unboxed":"";

  mount.innerHTML='<div id="'+ROOT_ID+'">'+
    '<div class="ds-top">'+
      '<div><span class="ds-kicker">SyncEtc Company Tool</span><h1>Design Studio</h1><p>Build and assign the company-controlled design system. Customers keep only page-specific content editing in the side drawer.</p></div>'+
      '<div class="ds-pill">Customer: '+esc(customerLabel)+'</div>'+
    '</div>'+
    '<div class="ds-shell">'+
      '<section class="ds-panel"><div class="ds-panel-head"><h2>Design assignment</h2><p>These selectors are company-side only. They assign the design framework to the selected customer.</p></div>'+
      '<div class="ds-controls">'+
        '<div class="ds-field"><label>Customer</label><select data-ds="customer"><option value="150th_aero" '+(state.customer_key==="150th_aero"?"selected":"")+'>150th Aero</option><option value="demo_flying_club" '+(state.customer_key==="demo_flying_club"?"selected":"")+'>Demo Flying Club</option></select><small>Later this becomes searchable/scrollable for many customers.</small></div>'+
        '<div class="ds-field"><label>Layout</label><select data-ds="layout">'+optionHtml(lists.layouts,"layout_key","layout_name",s.layout)+'</select><small>'+esc(describePreset(lists.layouts,"layout_key",s.layout,"description","structure_json"))+'</small></div>'+
        '<div class="ds-field"><label>Style</label><select data-ds="style">'+optionHtml(lists.styles,"style_key","style_name",s.style)+'</select><small>'+esc(describePreset(lists.styles,"style_key",s.style,"description","style_json"))+'</small></div>'+
        '<div class="ds-field"><label>Typography</label><select data-ds="typography">'+optionHtml(lists.typography,"typography_key","typography_name",s.typography)+'</select><small>'+esc(describePreset(lists.typography,"typography_key",s.typography,"description","typography_json"))+'</small></div>'+
        '<div class="ds-field"><label>Color</label><select data-ds="color">'+optionHtml(lists.colors,"color_key","color_name",s.color)+'</select><small>'+esc(describePreset(lists.colors,"color_key",s.color,"description","color_json"))+'</small></div>'+
        '<div class="ds-field"><label>Effects</label><select data-ds="effect">'+optionHtml(lists.effects,"effect_key","effect_name",s.effect)+'</select><small>'+esc(describePreset(lists.effects,"effect_key",s.effect,"description","effect_json"))+'</small></div>'+
        '<div class="ds-actions"><button class="ds-btn" data-action="save" '+(state.saving?"disabled":"")+'>Save to customer</button><button class="ds-btn secondary" data-action="reload">Reload</button></div>'+
        (state.error?'<div class="ds-note error">'+esc(state.error)+'</div>':'')+
        (state.notice?'<div class="ds-note good">'+esc(state.notice)+'</div>':'')+
        '<div class="ds-note">This page is the future home for screenshot/style inspiration generation, draft presets, approval, and assignment. It is separate from customer page text editing.</div>'+
      '</div></section>'+
      '<section class="ds-panel"><div class="ds-panel-head"><h2>Live design preview</h2><p>Preview combines layout + style + typography + color + effects before saving.</p></div>'+
      '<div class="ds-preview-wrap">'+
        '<div class="ds-preview '+esc(previewClass)+'" style="'+esc(styleAttr(css))+'"><div class="ds-preview-inner">'+
          '<div class="ds-preview-header"><div class="ds-logo-box">LOGO</div><div><strong>'+esc(customerLabel)+'</strong><div class="ds-preview-nav"><span>Home</span><span>Aircraft</span><span>Calendar</span><span>Documents</span></div></div></div>'+
          '<section class="ds-hero"><span class="ds-eyebrow">Aircraft Fleet</span><h3>Our Aircraft</h3><p>This is a sample rendered area showing how the selected design layers combine across a header, hero, cards, text, and page rhythm.</p></section>'+
          '<div class="ds-grid"><article class="ds-card"><h4>Page section</h4><p>Layout controls the structure and containers. Style controls shape and spacing. Typography controls text. Color controls palette. Effects control shadows and borders.</p><div class="ds-meta">Structure: '+esc(s.layout)+'</div></article><article class="ds-card"><h4>Customer content</h4><p>The customer-facing side drawer edits page text and visibility only. This company page controls appearance.</p><div class="ds-meta">Design package can be assigned to any customer.</div></article></div>'+
        '</div></div>'+
      '</div></section>'+
    '</div>'+
  '</div>';
  bind();
}

function bind(){
  var root=byId(ROOT_ID); if(!root)return;
  root.querySelectorAll("select[data-ds]").forEach(function(sel){
    sel.addEventListener("change",function(){
      var key=sel.getAttribute("data-ds");
      if(key==="customer"){state.customer_key=sel.value; load(); return;}
      state.selected[key]=sel.value;
      state.notice="";
      state.error="";
      render();
    });
  });
  var save=root.querySelector('[data-action="save"]');
  if(save)save.addEventListener("click",saveAssignment);
  var reload=root.querySelector('[data-action="reload"]');
  if(reload)reload.addEventListener("click",load);
}

function load(){
  state.loading=true; state.error=""; state.notice="";
  var mount=byId("syncetc-webflow-mount")||document.body;
  mount.innerHTML='<div id="'+ROOT_ID+'" style="max-width:960px;margin:40px auto;padding:24px;font-family:Arial,sans-serif;">Loading Design Studio...</div>';
  fetch(READ_URL+"?customer_key="+encodeURIComponent(state.customer_key),{method:"GET"})
    .then(function(r){return r.json().then(function(b){if(!r.ok||!b||b.ok===false)throw new Error((b&&b.error)||"Load failed");return b;});})
    .then(function(body){state.data=body; syncSelectedFromSettings(); state.loading=false; render();})
    .catch(function(err){state.loading=false; state.error=err.message||String(err); render();});
}

function saveAssignment(){
  var token=getToken();
  if(!token){state.error="You must be logged in as a platform admin to save design assignments.";state.notice="";render();return;}
  state.saving=true; state.error=""; state.notice="";
  render();
  fetch(ACTION_URL,{
    method:"POST",
    headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},
    body:JSON.stringify({
      action:"save_company_design_assignment",
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
  .then(function(r){return r.json().then(function(b){if(!r.ok||!b||b.ok===false)throw new Error((b&&b.error)||"Save failed");return b;});})
  .then(function(){state.saving=false;state.notice="Design assignment saved for "+state.customer_key+".";load();})
  .catch(function(err){state.saving=false;state.error=err.message||String(err);render();});
}

function start(){
  installStyles();
  load();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();

})();
/* PAGE-DESIGN-STUDIO-v1.js - END */
