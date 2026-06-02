/* COMPONENT-assets-renderer-v1.js | shared Assets renderer for live pages and Design Studio | Generated: 2026-06-02 */
(function(){
"use strict";

var VERSION="COMPONENT-assets-renderer-v1";
var STYLE_ID="syncetc-assets-renderer-v1-style";

function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(m){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m];});}
function obj(v){return v&&typeof v==="object"&&!Array.isArray(v)?v:{};}
function arr(v){return Array.isArray(v)?v:[];}
function clean(v){return String(v==null?"":v).trim();}
function clone(o){return JSON.parse(JSON.stringify(o||{}));}

function installStyles(){
  if(document.getElementById(STYLE_ID))return;
  var st=document.createElement("style");
  st.id=STYLE_ID;
  st.textContent=`
    
:root{
  --se-aero-navy:#12365a;
  --se-aero-navy-dark:#0b2744;
  --se-aero-blue:#2f80c4;
  --se-aero-sky:#eaf5ff;
  --se-aero-card:rgba(255,255,255,.94);
  --se-aero-card-soft:rgba(255,255,255,.84);
  --se-aero-border:rgba(18,54,90,.16);
  --se-aero-text:#1e2933;
  --se-aero-muted:#5d6b78;
  --se-shadow-lg:0 18px 50px rgba(12,38,64,.16);
  --se-radius-xl:26px;
  --se-radius-lg:18px;
  --se-radius-md:12px;
}
.aero-fleet-page{max-width:1180px;margin:0 auto 56px;padding:0 18px;font-family:Arial,Helvetica,sans-serif;color:var(--se-aero-text,#1e2933);}
.aero-fleet-shell{background:var(--se-aero-card,rgba(255,255,255,.94));border:1px solid var(--se-aero-border,rgba(18,54,90,.16));border-radius:var(--se-radius-xl,26px);box-shadow:var(--se-shadow-lg,0 18px 50px rgba(12,38,64,.22));overflow:hidden;backdrop-filter:blur(8px);}
.aero-fleet-hero{position:relative;padding:34px 34px 28px;background:linear-gradient(135deg,var(--se-aero-navy,#12365a),var(--se-aero-blue,#2f80c4)),radial-gradient(circle at top right,rgba(255,255,255,.34),transparent 36%);color:#fff;}
.aero-fleet-eyebrow{display:inline-flex;align-items:center;gap:8px;margin-bottom:12px;padding:6px 12px;border-radius:999px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.24);font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;}
.aero-fleet-hero h1{margin:0;font-size:clamp(30px,4vw,48px);line-height:1.05;font-weight:800;letter-spacing:-.035em;color:#fff;}
.aero-fleet-hero p{max-width:820px;margin:14px 0 0;font-size:17px;line-height:1.65;color:rgba(255,255,255,.9);}
.aero-fleet-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:26px;}
.aero-fleet-stat{padding:14px 16px;border-radius:var(--se-radius-md,12px);background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22);}
.aero-fleet-stat strong{display:block;margin-bottom:3px;font-size:22px;line-height:1;color:#fff;}
.aero-fleet-stat span{display:block;font-size:13px;line-height:1.35;color:rgba(255,255,255,.82);}
.aero-fleet-main{padding:26px;}
.aero-section-label{display:inline-flex;margin-bottom:10px;padding:5px 10px;border-radius:999px;background:var(--se-aero-sky,#eaf5ff);color:var(--se-aero-navy,#12365a);font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;}
.aero-fleet-intro-card{margin-bottom:18px;padding:22px;border-radius:var(--se-radius-lg,18px);background:rgba(255,255,255,.82);border:1px solid var(--se-aero-border,rgba(18,54,90,.16));box-shadow:0 8px 24px rgba(12,38,64,.08);}
.aero-fleet-intro-card h2,.aero-aircraft-copy h2{margin:0 0 10px;color:var(--se-aero-navy-dark,#0b2744);font-size:23px;line-height:1.18;font-weight:800;letter-spacing:-.02em;}
.aero-fleet-intro-card p{margin:0;font-size:15px;line-height:1.7;color:var(--se-aero-text,#1e2933);}
.aero-aircraft-list{display:grid;gap:22px;}
.aero-aircraft-card{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(300px,.92fr);gap:22px;align-items:start;padding:22px;border-radius:var(--se-radius-lg,18px);background:var(--se-aero-card-soft,rgba(255,255,255,.84));border:1px solid var(--se-aero-border,rgba(18,54,90,.16));box-shadow:0 8px 24px rgba(12,38,64,.08);}
.aero-aircraft-header{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 12px;margin-bottom:8px;}
.aero-tail-number{margin:0;color:var(--se-aero-navy-dark,#0b2744);font-size:28px;line-height:1.05;font-weight:800;letter-spacing:-.025em;}
.aero-aircraft-meta{color:var(--se-aero-muted,#5d6b78);font-size:14px;line-height:1.2;font-weight:800;letter-spacing:.03em;text-transform:uppercase;}
.aero-aircraft-copy{min-width:0;}
.aero-aircraft-copy p{margin:0 0 13px;font-size:15px;line-height:1.7;color:var(--se-aero-text,#1e2933);}
.aero-aircraft-copy ul{margin:12px 0 0 20px;padding:0;color:var(--se-aero-text,#1e2933);font-size:14px;line-height:1.55;}
.aero-aircraft-copy li{margin-bottom:4px;}
.aero-aircraft-copy em{color:var(--se-aero-navy-dark,#0b2744);}
.aero-aircraft-media{display:grid;gap:14px;}
.aero-aircraft-photo-card{overflow:hidden;border-radius:16px;background:#fff;border:1px solid rgba(18,54,90,.16);box-shadow:0 8px 20px rgba(12,38,64,.08);}
.aero-aircraft-photo-card img{display:block;width:100%;height:230px;object-fit:cover;object-position:center center;}
.aero-aircraft-photo-label{padding:9px 12px;color:var(--se-aero-muted,#5d6b78);font-size:12px;line-height:1.25;font-weight:800;letter-spacing:.08em;text-transform:uppercase;background:rgba(234,245,255,.72);border-top:1px solid rgba(18,54,90,.10);}
.aero-aircraft-placeholder{display:flex;align-items:center;justify-content:center;min-height:230px;padding:22px;background:linear-gradient(135deg,rgba(234,245,255,.96),rgba(255,255,255,.88));color:var(--se-aero-muted,#5d6b78);font-size:13px;line-height:1.45;font-weight:800;text-align:center;}
.aero-empty-message{padding:18px;border-radius:16px;background:#fff;border:1px dashed rgba(18,54,90,.24);color:var(--se-aero-muted,#5d6b78);font-size:14px;line-height:1.55;}
.aero-note-strip{margin-top:18px;padding:16px 18px;border-radius:16px;background:rgba(18,54,90,.06);border:1px solid rgba(18,54,90,.12);color:var(--se-aero-muted,#5d6b78);font-size:13px;line-height:1.55;}
@media (max-width:980px){.aero-aircraft-card{grid-template-columns:1fr}.aero-aircraft-media{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:720px){.aero-fleet-page{margin-top:20px;padding:0 12px}.aero-fleet-hero{padding:26px 20px 22px}.aero-fleet-main{padding:18px}.aero-fleet-stats{grid-template-columns:1fr}.aero-fleet-intro-card,.aero-aircraft-card{padding:18px}.aero-aircraft-media{grid-template-columns:1fr}.aero-aircraft-photo-card img,.aero-aircraft-placeholder{height:210px;min-height:210px}.aero-tail-number{font-size:25px}}

    #${ROOT_ID}{min-height:100vh;background:#f7fafc;padding:28px 0 60px;}
    #${ROOT_ID} .se-version{position:fixed;right:12px;bottom:12px;z-index:999999;border-radius:999px;background:#12365a;color:#fff;padding:7px 10px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:950;box-shadow:0 10px 24px rgba(0,0,0,.18)}
  `;
  document.head.appendChild(st);
}

function localValue(values,key,fallback){
  values=values||{};
  if(values[key]!==undefined&&values[key]!==null&&String(values[key]).trim()!=="")return values[key];
  var alt=key.replace(/^aircraft\./,"assets.");
  if(values[alt]!==undefined&&values[alt]!==null&&String(values[alt]).trim()!=="")return values[alt];
  return fallback||"";
}

function baseConfig(values){
  values=values||{};
  return {
    heroEyebrow:"",
    heroTitle:"",
    heroIntro:"",
    stats:[],
    introLabel:"",
    introTitle:"",
    introText:"",
    note:"",
    aircraft:arr(values.aircraft).length?arr(values.aircraft):arr(values.assets)
  };
}

function configFor(values){
  var cfg=baseConfig(values);
  values=values||{};
  cfg.heroEyebrow=localValue(values,"aircraft.heroEyebrow",cfg.heroEyebrow);
  cfg.heroTitle=localValue(values,"aircraft.heroTitle",cfg.heroTitle);
  cfg.heroIntro=localValue(values,"aircraft.heroIntro",cfg.heroIntro);
  cfg.introLabel=localValue(values,"aircraft.introLabel",cfg.introLabel);
  cfg.introTitle=localValue(values,"aircraft.introTitle",cfg.introTitle);
  cfg.introText=localValue(values,"aircraft.introText",cfg.introText);
  cfg.note=localValue(values,"aircraft.note",cfg.note);
  for(var i=0;i<3;i++){
    var value=localValue(values,"aircraft.stats."+i+".value","");
    var text=localValue(values,"aircraft.stats."+i+".text","");
    if(value||text)cfg.stats.push({value:value,text:text});
  }
  cfg.aircraft=arr(values.aircraft).length?arr(values.aircraft):arr(values.assets);
  return cfg;
}

function inlineText(v){return esc(v).replace(/\*([^*]+)\*/g,"<em>$1</em>");}

function firstValue(row,keys){
  row=row||{};
  for(var i=0;i<keys.length;i++){
    var k=keys[i];
    if(row[k]!==null&&row[k]!==undefined&&clean(row[k])!=="")return row[k];
    if(row.raw&&row.raw[k]!==null&&row.raw[k]!==undefined&&clean(row.raw[k])!=="")return row.raw[k];
  }
  return "";
}

function normalizeAssetRecord(row){
  row=row||{};
  return {
    tailNumber:firstValue(row,["tailNumber","tail_number","asset_identifier","asset_name","public_label","asset_key","aircraft_slug"]),
    slug:firstValue(row,["slug","aircraft_slug","asset_slug","asset_key"]),
    aircraftType:firstValue(row,["aircraftType","aircraft_type","asset_type","type","model"]),
    modelYear:firstValue(row,["modelYear","model_year","year"]),
    details:firstValue(row,["details","public_description_plain","description","summary","notes"]),
    aircraftPhoto:firstValue(row,["aircraftPhoto","aircraft_photo","exterior_photo_url","image_url","photo_url","asset_image_url"]),
    panelPhoto:firstValue(row,["panelPhoto","panel_photo","panel_photo_url"]),
    sortOrder:Number(firstValue(row,["sortOrder","sort_order"])||999),
    homeBase:firstValue(row,["homeBase","home_base","base","airport"]),
    hourlyRate:firstValue(row,["hourlyRate","hourly_rate","rate","display_rate"]),
    status:firstValue(row,["status","availability_status"]),
    current:firstValue(row,["current","is_current"]),
    adminTitle:firstValue(row,["adminTitle","admin_title"]),
    raw:row
  };
}

function normalizeAssetRecords(records){
  return arr(records).map(normalizeAssetRecord);
}

function renderAircraftPage(values,options){
  options=options||{};
  installStyles();
  var cfg=configFor(values);
  var stats=arr(cfg.stats);
  var rows=arr(cfg.aircraft).map(normalizeAssetRecord).slice().sort(function(a,b){return (a.sortOrder||999)-(b.sortOrder||999);});

  function statMarkup(s){return '<div class="aero-fleet-stat"><strong>'+esc(s.value||"")+'</strong><span>'+esc(s.text||"")+'</span></div>';}
  function labelFor(ac){return String(ac.tailNumber||"").toUpperCase()==="N150TH"?"Flagship Aircraft":"Club Aircraft";}
  function metaFor(ac){return [ac.modelYear,ac.aircraftType].filter(Boolean).join(" ");}
  function detailsMarkup(ac){
    var parts=String(ac.details||"").split("||").map(function(x){return x.trim();}).filter(Boolean);
    if(!parts.length)return "<p>Aircraft details are not available at this time.</p>";
    var intro=parts.shift();
    return (intro?'<p>'+inlineText(intro)+'</p>':"")+(parts.length?'<ul>'+parts.map(function(x){return '<li>'+inlineText(x)+'</li>';}).join("")+'</ul>':"");
  }
  function photoCard(url,label,alt){
    return '<div class="aero-aircraft-photo-card">'+(url?'<img src="'+esc(url)+'" alt="'+esc(alt||label)+'">':'<div class="aero-aircraft-placeholder">'+esc(label)+' photo not available</div>')+'<div class="aero-aircraft-photo-label">'+esc(label)+'</div></div>';
  }
  function aircraftCard(ac){
    return '<article class="aero-aircraft-card"><div class="aero-aircraft-copy"><div class="aero-section-label">'+esc(labelFor(ac))+'</div><div class="aero-aircraft-header"><h2 class="aero-tail-number">'+esc(ac.tailNumber||"Aircraft")+'</h2><div class="aero-aircraft-meta">'+esc(metaFor(ac)||"Aircraft Details")+'</div></div>'+detailsMarkup(ac)+'</div><div class="aero-aircraft-media">'+photoCard(ac.aircraftPhoto,"Exterior",(ac.tailNumber||"Aircraft")+" exterior aircraft photo")+photoCard(ac.panelPhoto,"Panel",(ac.tailNumber||"Aircraft")+" panel photo")+'</div></article>';
  }

  return '<div class="aero-fleet-page" data-shared-assets-renderer="'+esc(VERSION)+'"><div class="aero-fleet-shell"><section class="aero-fleet-hero"><div class="aero-fleet-eyebrow">'+esc(cfg.heroEyebrow)+'</div><h1>'+esc(cfg.heroTitle)+'</h1><p>'+esc(cfg.heroIntro)+'</p>'+(stats.length?'<div class="aero-fleet-stats">'+stats.map(statMarkup).join("")+'</div>':'')+'</section><main class="aero-fleet-main"><section class="aero-fleet-intro-card"><div class="aero-section-label">'+esc(cfg.introLabel)+'</div><h2>'+esc(cfg.introTitle)+'</h2><p>'+esc(cfg.introText)+'</p></section><section class="aero-aircraft-list">'+(rows.length?rows.map(aircraftCard).join(""):'<div class="aero-empty-message">Asset information is not available at this time.</div>')+'</section>'+(cfg.note?'<div class="aero-note-strip"><strong>Note:</strong> '+esc(cfg.note||"")+'</div>':'')+'</main></div></div>';
}

window.SYNCETC_ASSETS_RENDERER_V1={
  version:VERSION,
  installStyles:installStyles,
  normalizeAssetRecord:normalizeAssetRecord,
  normalizeAssetRecords:normalizeAssetRecords,
  renderPage:renderAircraftPage,
  renderAircraftPage:renderAircraftPage
};

})();
/* COMPONENT-assets-renderer-v1.js - END */
