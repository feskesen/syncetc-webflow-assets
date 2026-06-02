/* COMPONENT-assets-renderer-v2.js | shared Assets renderer scoped CSS fix | Generated: 2026-06-02 */
(function(){
"use strict";

var VERSION="COMPONENT-assets-renderer-v2";
var STYLE_ID="syncetc-assets-renderer-v2-style";

function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(m){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m];});}
function arr(v){return Array.isArray(v)?v:[];}
function clean(v){return String(v==null?"":v).trim();}

function installStyles(){
  if(document.getElementById(STYLE_ID))return;
  var st=document.createElement("style");
  st.id=STYLE_ID;
  st.textContent=`
    .aero-fleet-page{font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#0f172a;background:linear-gradient(180deg,#f8fafc 0%,#eef3f8 100%);padding:56px 24px;min-height:100vh;box-sizing:border-box;}
    .aero-fleet-shell{max-width:1180px;margin:0 auto;background:#fff;border-radius:24px;box-shadow:0 28px 80px rgba(15,23,42,.12);overflow:hidden;}
    .aero-fleet-hero{background:linear-gradient(135deg,#12395a 0%,#2878bd 100%);color:#fff;padding:42px 44px 34px;}
    .aero-fleet-eyebrow{display:inline-flex;align-items:center;border-radius:999px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22);padding:7px 13px;margin-bottom:16px;font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;}
    .aero-fleet-hero h1{margin:0 0 14px;font-size:44px;line-height:1.02;letter-spacing:-.03em;color:#fff;}
    .aero-fleet-hero p{margin:0;max-width:840px;font-size:17px;line-height:1.6;color:rgba(255,255,255,.94);}
    .aero-fleet-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:26px;}
    .aero-fleet-stat{border:1px solid rgba(255,255,255,.24);background:rgba(255,255,255,.11);border-radius:12px;padding:13px 16px;}
    .aero-fleet-stat strong{display:block;font-size:22px;line-height:1.1;color:#fff;}
    .aero-fleet-stat span{display:block;margin-top:4px;font-size:12px;font-weight:750;line-height:1.35;color:rgba(255,255,255,.92);}
    .aero-fleet-main{padding:28px 30px 36px;background:#f8fafc;}
    .aero-fleet-intro-card,.aero-aircraft-card{border:1px solid rgba(15,23,42,.1);border-radius:18px;background:#fff;box-shadow:0 12px 34px rgba(15,23,42,.06);}
    .aero-fleet-intro-card{padding:24px 26px;margin-bottom:22px;}
    .aero-section-label{display:inline-flex;align-items:center;border-radius:999px;background:#eef6ff;color:#143b5d;padding:6px 10px;margin-bottom:10px;font-size:11px;font-weight:950;letter-spacing:.08em;text-transform:uppercase;}
    .aero-fleet-intro-card h2{margin:0 0 10px;font-size:26px;line-height:1.15;color:#0f172a;}
    .aero-fleet-intro-card p{margin:0;color:#334155;font-size:15px;line-height:1.65;}
    .aero-aircraft-list{display:grid;gap:22px;}
    .aero-aircraft-card{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(280px,.9fr);gap:26px;padding:24px 24px 22px;}
    .aero-aircraft-copy{min-width:0;}
    .aero-aircraft-header{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;margin-bottom:14px;}
    .aero-tail-number{margin:0;font-size:25px;line-height:1.1;letter-spacing:.02em;color:#0f172a;}
    .aero-aircraft-meta{font-size:13px;font-weight:900;color:#64748b;text-transform:uppercase;letter-spacing:.05em;}
    .aero-aircraft-copy p{margin:0 0 12px;color:#334155;font-size:14px;line-height:1.65;}
    .aero-aircraft-copy ul{margin:10px 0 0 18px;padding:0;color:#1f2937;font-size:14px;line-height:1.55;}
    .aero-aircraft-copy li{margin:4px 0;}
    .aero-aircraft-media{display:grid;gap:12px;align-content:start;}
    .aero-aircraft-photo-card{border:1px solid rgba(15,23,42,.1);border-radius:14px;overflow:hidden;background:#eef2f7;}
    .aero-aircraft-photo-card img{display:block;width:100%;height:auto;max-height:320px;object-fit:cover;}
    .aero-aircraft-photo-label{padding:8px 12px;background:#f8fafc;border-top:1px solid rgba(15,23,42,.08);font-size:11px;font-weight:950;letter-spacing:.08em;text-transform:uppercase;color:#475569;}
    .aero-aircraft-placeholder{min-height:170px;display:flex;align-items:center;justify-content:center;text-align:center;padding:20px;color:#64748b;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.06em;}
    .aero-note-strip{margin-top:22px;border-radius:16px;background:#eef6ff;border:1px solid rgba(29,78,216,.15);color:#143b5d;padding:14px 16px;font-size:13px;font-weight:750;line-height:1.5;}
    .aero-empty-message{border:1px dashed rgba(15,23,42,.18);border-radius:16px;background:#fff;padding:18px 20px;color:#64748b;font-size:14px;font-weight:750;}
    .se-version{position:fixed;right:18px;bottom:18px;background:#0f3554;color:#fff;border-radius:999px;padding:8px 12px;font-size:11px;font-weight:900;letter-spacing:.06em;text-transform:uppercase;z-index:99;box-shadow:0 10px 28px rgba(15,23,42,.22);}
    @media(max-width:900px){
      .aero-fleet-page{padding:26px 14px;}
      .aero-fleet-hero{padding:30px 24px;}
      .aero-fleet-hero h1{font-size:34px;}
      .aero-fleet-stats{grid-template-columns:1fr;}
      .aero-fleet-main{padding:20px 16px 28px;}
      .aero-aircraft-card{grid-template-columns:1fr;padding:20px;}
    }
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

function configFor(values){
  values=values||{};
  var cfg={heroEyebrow:"",heroTitle:"",heroIntro:"",stats:[],introLabel:"",introTitle:"",introText:"",note:"",aircraft:arr(values.aircraft).length?arr(values.aircraft):arr(values.assets)};
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
function normalizeAssetRecords(records){return arr(records).map(normalizeAssetRecord);}

function renderPage(values,options){
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

window.SYNCETC_ASSETS_RENDERER_V1=window.SYNCETC_ASSETS_RENDERER_V2={version:VERSION,installStyles:installStyles,normalizeAssetRecord:normalizeAssetRecord,normalizeAssetRecords:normalizeAssetRecords,renderPage:renderPage,renderAircraftPage:renderPage};
})();
/* COMPONENT-assets-renderer-v2.js - END */
