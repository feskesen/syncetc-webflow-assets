/* PAGE-AIRCRAFT-v6.js | self-contained consumer of saved Aircraft page text | Generated: 2026-06-01 */
(function(){
"use strict";
var VERSION="PAGE-AIRCRAFT-v6";
var SUPABASE_URL="https://ocdaohkiwonjmirqkjww.supabase.co";
var ANON_KEY=window.SYNCETC_SUPABASE_ANON_KEY||window.SUPABASE_ANON_KEY||"";
var READ_URL=SUPABASE_URL+"/functions/v1/syncetc-site-settings-read";
var MOUNT_ID="syncetc-webflow-mount";
var ROOT_ID="syncetc-aircraft-v6-root";
var STYLE_ID="syncetc-aircraft-v6-style";
var CUSTOMER_KEY=window.SYNCETC_CUSTOMER_KEY||"150th_aero";
var AIRCRAFT_PAGE_DEFAULTS={
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

function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(m){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m];});}
function obj(v){return v&&typeof v==="object"&&!Array.isArray(v)?v:{};}
function arr(v){return Array.isArray(v)?v:[];}
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
function baseConfig(){
  var name=CUSTOMER_KEY==="demo_flying_club"?"Test Customer":"150th Aero Flying Club";
  return clone(AIRCRAFT_PAGE_DEFAULTS[name]||AIRCRAFT_PAGE_DEFAULTS["150th Aero Flying Club"]);
}
function localValue(local,key,fallback){return Object.prototype.hasOwnProperty.call(local||{},key)?local[key]:fallback;}
function configFor(values){
  var cfg=baseConfig();
  values=values||{};
  cfg.heroEyebrow=localValue(values,"aircraft.heroEyebrow",cfg.heroEyebrow);
  cfg.heroTitle=localValue(values,"aircraft.heroTitle",cfg.heroTitle);
  cfg.heroIntro=localValue(values,"aircraft.heroIntro",cfg.heroIntro);
  cfg.introLabel=localValue(values,"aircraft.introLabel",cfg.introLabel);
  cfg.introTitle=localValue(values,"aircraft.introTitle",cfg.introTitle);
  cfg.introText=localValue(values,"aircraft.introText",cfg.introText);
  cfg.note=localValue(values,"aircraft.note",cfg.note);
  for(var i=0;i<3;i++){
    cfg.stats[i]=cfg.stats[i]||{};
    cfg.stats[i].value=localValue(values,"aircraft.stats."+i+".value",cfg.stats[i].value||"");
    cfg.stats[i].text=localValue(values,"aircraft.stats."+i+".text",cfg.stats[i].text||"");
  }
  return cfg;
}
function inlineText(v){return esc(v).replace(/\*([^*]+)\*/g,"<em>$1</em>");}
function renderAircraftPage(values){
  var cfg=configFor(values);
  var stats=arr(cfg.stats);
  var rows=arr(cfg.aircraft).slice().sort(function(a,b){return (a.sortOrder||999)-(b.sortOrder||999);});
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
  return '<div class="aero-fleet-page"><div class="aero-fleet-shell"><section class="aero-fleet-hero"><div class="aero-fleet-eyebrow">'+esc(cfg.heroEyebrow)+'</div><h1>'+esc(cfg.heroTitle)+'</h1><p>'+esc(cfg.heroIntro)+'</p><div class="aero-fleet-stats">'+stats.map(statMarkup).join("")+'</div></section><main class="aero-fleet-main"><section class="aero-fleet-intro-card"><div class="aero-section-label">'+esc(cfg.introLabel)+'</div><h2>'+esc(cfg.introTitle)+'</h2><p>'+esc(cfg.introText)+'</p></section><section class="aero-aircraft-list">'+(rows.length?rows.map(aircraftCard).join(""):'<div class="aero-empty-message">Aircraft information is not available at this time.</div>')+'</section><div class="aero-note-strip"><strong>Note:</strong> '+esc(cfg.note||"")+'</div></main></div></div>';
}
function findValues(body){
  var rows=arr(obj(body).customer_page_settings).concat(arr(obj(body).page_settings)).concat(arr(obj(body).pages));
  for(var i=0;i<rows.length;i++){
    var r=rows[i]||{};
    if((r.page_key||r.pageKey)==="aircraft")return Object.assign({},obj(r.current_settings_json),obj(r.settings_json),obj(r.values_json));
  }
  return {};
}
function render(values){
  installStyles();
  var mount=document.getElementById(MOUNT_ID);
  if(!mount){mount=document.createElement("div");mount.id=MOUNT_ID;document.body.appendChild(mount);}
  mount.innerHTML='<div id="'+ROOT_ID+'">'+renderAircraftPage(values||{})+'<div class="se-version">'+esc(VERSION)+'</div></div>';
}
function boot(){
  render({});
  fetch(READ_URL+"?customer_key="+encodeURIComponent(CUSTOMER_KEY)+"&t="+Date.now(),{headers:{"apikey":ANON_KEY}})
    .then(function(res){return res.json();})
    .then(function(body){render(findValues(body));})
    .catch(function(){render({});});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
})();
 /* PAGE-AIRCRAFT-v6.js - END */
