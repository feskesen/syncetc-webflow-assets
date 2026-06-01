/* PAGE-DESIGN-STUDIO-v30.js | page-wide drawer apply-save flow | Generated: 2026-06-01 */
(function(){
"use strict";

var VERSION="PAGE-DESIGN-STUDIO-v30";
var SUPABASE_URL="https://ocdaohkiwonjmirqkjww.supabase.co";
var ANON_KEY=window.SYNCETC_SUPABASE_ANON_KEY||window.SUPABASE_ANON_KEY||"";
var READ_URL=SUPABASE_URL+"/functions/v1/syncetc-site-settings-read";
var ACTION_URL=SUPABASE_URL+"/functions/v1/syncetc-site-settings-action";
var MOUNT_ID="syncetc-webflow-mount";
var ROOT_ID="syncetc-design-studio-root";
var STYLE_ID="syncetc-design-studio-v30-style";
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

var PAGE_FIELDS=[
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

var CUSTOMERS=[
  {key:"150th_aero",name:"150th Aero Flying Club",defaultsName:"150th Aero Flying Club"},
  {key:"demo_flying_club",name:"Demo Flying Club",defaultsName:"Test Customer"}
];

var state={
  customerKey:"150th_aero",
  drawerOpen:false,
  loading:false,
  saving:false,
  applying:false,
  dirty:false,
  appliedDirty:false,
  notice:"",
  error:"",
  savedValues:{},
  draftValues:{},
  appliedValues:{},
  data:null,
  authOpen:false,
  authEmail:"",
  authPassword:"",
  authBusy:false,
  authToken:"",
  authExpiresAt:0
};

function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(m){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m];});}
function clean(v){return v==null?"":String(v).trim();}
function obj(v){return v&&typeof v==="object"&&!Array.isArray(v)?v:{};}
function arr(v){return Array.isArray(v)?v:[];}
function root(){return document.getElementById(ROOT_ID);}
function activeCustomer(){return CUSTOMERS.find(function(c){return c.key===state.customerKey;})||CUSTOMERS[0];}
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

    body.syncetc-ds-dirty:before{content:"";position:fixed;left:0;right:0;top:0;height:4px;background:#c2410c;z-index:2147483647;}
    #${ROOT_ID}{min-height:100vh;background:#f7fafc;color:#12365a;font-family:Arial,Helvetica,sans-serif;}
    #${ROOT_ID} *{box-sizing:border-box}
    #${ROOT_ID} .ds-shell{max-width:1180px;margin:0 auto;padding:26px 18px 60px;transition:max-width .22s ease, padding-right .22s ease, transform .22s ease;}
    #${ROOT_ID}.is-page-wide .ds-shell{max-width:none;width:calc(100vw - 430px);margin-left:0;margin-right:430px;padding-left:34px;padding-right:24px;transform:translateX(-10px);}
    #${ROOT_ID} .ds-kicker{font-size:11px;font-weight:950;letter-spacing:.14em;text-transform:uppercase;color:#476a8c;margin-bottom:8px}
    #${ROOT_ID} h1{margin:0 0 14px;font-size:38px;line-height:1;font-weight:950;letter-spacing:-.04em;color:#0b2744}
    #${ROOT_ID} .ds-top{background:#fff;border:1px solid rgba(18,54,90,.14);border-radius:22px;box-shadow:0 12px 34px rgba(12,38,64,.08);padding:14px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:18px;}
    #${ROOT_ID}.is-page-wide .ds-top{display:none}
    #${ROOT_ID} .ds-field{display:grid;gap:6px}
    #${ROOT_ID} label{font-size:11px;font-weight:950;letter-spacing:.08em;text-transform:uppercase;color:#24496c}
    #${ROOT_ID} select,#${ROOT_ID} input,#${ROOT_ID} textarea{width:100%;border:1px solid rgba(18,54,90,.18);border-radius:12px;background:#fff;color:#12365a;font:inherit;font-size:13px;font-weight:750;padding:10px 11px;}
    #${ROOT_ID} textarea{min-height:86px;resize:vertical;line-height:1.45}
    #${ROOT_ID} .ds-status{border:1px solid rgba(18,54,90,.12);border-radius:14px;background:#f8fafc;padding:11px;font-size:12px;font-weight:900;color:#476a8c}
    #${ROOT_ID} .ds-status.good{color:#247245;background:#f0fdf4;border-color:#bbf7d0}
    #${ROOT_ID} .ds-status.warn{color:#9a3412;background:#fff7ed;border-color:#fed7aa}
    #${ROOT_ID} .ds-status.bad{color:#991b1b;background:#fef2f2;border-color:#fecaca}
    #${ROOT_ID} .ds-pagebar{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 12px;}
    #${ROOT_ID} .ds-pagebar strong{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#24496c}
    #${ROOT_ID} .ds-actions{display:flex;gap:8px;flex-wrap:wrap}
    #${ROOT_ID} button{border:1px solid rgba(18,54,90,.18);border-radius:999px;background:#fff;color:#12365a;font:inherit;font-size:12px;font-weight:950;min-height:36px;padding:9px 13px;cursor:pointer}
    #${ROOT_ID} button.primary{background:#12365a;color:#fff;border-color:#12365a}
    #${ROOT_ID} button:disabled{opacity:.42;cursor:not-allowed}
    #${ROOT_ID} .ds-preview-wrap{transition:margin-right .22s ease, transform .22s ease;}
    #${ROOT_ID}.is-page-wide .ds-preview-wrap{margin-right:0;transform:translateX(-4px);}
    #${ROOT_ID} .ds-side-tab{position:fixed;right:0;top:210px;z-index:999997;border-radius:16px 0 0 16px;background:#12365a;color:#fff;border-color:#12365a;box-shadow:0 10px 28px rgba(12,38,64,.18)}
    #${ROOT_ID}.is-page-wide .ds-side-tab{display:none}
    #${ROOT_ID} .ds-drawer{position:fixed;right:0;top:0;bottom:0;width:410px;background:#fff;border-left:1px solid rgba(18,54,90,.16);box-shadow:-18px 0 44px rgba(12,38,64,.14);z-index:999998;display:none;grid-template-rows:auto 1fr auto}
    #${ROOT_ID}.is-page-wide .ds-drawer{display:grid}
    #${ROOT_ID} .ds-drawer-head{padding:16px 18px;border-bottom:1px solid rgba(18,54,90,.10);display:flex;justify-content:space-between;gap:12px;align-items:start}
    #${ROOT_ID} .ds-drawer-head h2{margin:0;color:#0b2744;font-size:18px;font-weight:950}
    #${ROOT_ID} .ds-drawer-head p{margin:5px 0 0;color:#64748b;font-size:12px;font-weight:800}
    #${ROOT_ID} .ds-drawer-body{padding:16px 18px;overflow:auto}
    #${ROOT_ID} .ds-fieldset{display:grid;gap:12px;margin-bottom:18px}
    #${ROOT_ID} .ds-section-label{font-size:11px;font-weight:950;letter-spacing:.08em;text-transform:uppercase;color:#64748b;border-top:1px solid rgba(18,54,90,.10);padding-top:12px;margin-top:4px}
    #${ROOT_ID} .ds-drawer-foot{padding:14px 18px;border-top:1px solid rgba(18,54,90,.12);background:#f8fafc;display:grid;gap:9px}
    #${ROOT_ID} .ds-foot-row{display:flex;gap:8px;flex-wrap:wrap}
    #${ROOT_ID} .ds-small{font-size:12px;line-height:1.35;color:#64748b;font-weight:800}
    #${ROOT_ID} .ds-auth{display:grid;gap:8px;border:1px solid rgba(18,54,90,.12);background:#fff;border-radius:14px;padding:10px;margin-top:8px}
    #${ROOT_ID} .ds-version{position:fixed;right:12px;bottom:12px;z-index:999999;border-radius:999px;background:#12365a;color:#fff;padding:7px 10px;font-size:11px;font-weight:950;box-shadow:0 10px 24px rgba(0,0,0,.18)}
    @media(max-width:1000px){
      #${ROOT_ID}.is-page-wide .ds-shell{width:100%;margin-right:0;transform:none;padding:18px 12px 540px}
      #${ROOT_ID}.is-page-wide .ds-drawer{top:auto;left:0;width:100%;height:520px;border-left:0;border-top:1px solid rgba(18,54,90,.16)}
      #${ROOT_ID} .ds-top{grid-template-columns:1fr}
      #${ROOT_ID} .aero-fleet-stats{grid-template-columns:1fr}
    }
  `;
  document.head.appendChild(st);
}

function baseConfig(){
  var c=activeCustomer();
  var base=AIRCRAFT_PAGE_DEFAULTS[c.defaultsName]||AIRCRAFT_PAGE_DEFAULTS["150th Aero Flying Club"];
  return clone(base);
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
function defaultValues(){
  var cfg=baseConfig();
  return {
    "aircraft.heroEyebrow":cfg.heroEyebrow||"",
    "aircraft.heroTitle":cfg.heroTitle||"",
    "aircraft.heroIntro":cfg.heroIntro||"",
    "aircraft.stats.0.value":(cfg.stats[0]&&cfg.stats[0].value)||"",
    "aircraft.stats.0.text":(cfg.stats[0]&&cfg.stats[0].text)||"",
    "aircraft.stats.1.value":(cfg.stats[1]&&cfg.stats[1].value)||"",
    "aircraft.stats.1.text":(cfg.stats[1]&&cfg.stats[1].text)||"",
    "aircraft.stats.2.value":(cfg.stats[2]&&cfg.stats[2].value)||"",
    "aircraft.stats.2.text":(cfg.stats[2]&&cfg.stats[2].text)||"",
    "aircraft.introLabel":cfg.introLabel||"",
    "aircraft.introTitle":cfg.introTitle||"",
    "aircraft.introText":cfg.introText||"",
    "aircraft.note":cfg.note||""
  };
}
function currentRows(){
  var d=obj(state.data);
  return arr(d.customer_page_settings).concat(arr(d.page_settings)).concat(arr(d.pages));
}
function pageRow(){
  var rows=currentRows();
  for(var i=0;i<rows.length;i++){
    if(clean(rows[i].customer_key||rows[i].customerKey)===state.customerKey && clean(rows[i].page_key||rows[i].pageKey)==="aircraft")return rows[i];
  }
  for(var j=0;j<rows.length;j++){
    if(clean(rows[j].page_key||rows[j].pageKey)==="aircraft")return rows[j];
  }
  return null;
}
function rowValues(row){
  row=obj(row);
  return Object.assign({},defaultValues(),obj(row.current_settings_json),obj(row.settings_json),obj(row.values_json));
}
function resetFromData(){
  var vals=rowValues(pageRow());
  state.savedValues=clone(vals);
  state.draftValues=clone(vals);
  state.appliedValues=clone(vals);
  state.dirty=false;
  state.appliedDirty=false;
  syncDirtyState();
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

function statusClass(){
  if(state.error)return "bad";
  if(state.appliedDirty||state.dirty)return "warn";
  if(state.notice)return "good";
  return "";
}
function statusText(){
  if(state.error)return state.error;
  if(state.saving)return "Saving page text...";
  if(state.appliedDirty)return "Preview applied. Save Changes is now available.";
  if(state.dirty)return "Drawer edits pending. Apply Changes to update the preview.";
  return state.notice||"No unsaved page-text changes.";
}

function renderFields(){
  var last="";
  return PAGE_FIELDS.map(function(f){
    var sec="";
    if(f.section!==last){last=f.section;sec='<div class="ds-section-label">'+esc(f.section)+'</div>';}
    var val=state.draftValues[f.key]==null?"":state.draftValues[f.key];
    var input=f.type==="textarea"
      ? '<textarea data-page-field="'+esc(f.key)+'">'+esc(val)+'</textarea>'
      : '<input data-page-field="'+esc(f.key)+'" value="'+esc(val)+'">';
    return sec+'<div class="ds-field"><label>'+esc(f.label)+'</label>'+input+'</div>';
  }).join("");
}
function authPanel(){
  if(!state.authOpen)return "";
  return '<div class="ds-auth"><input data-auth-email placeholder="Platform admin email" value="'+esc(state.authEmail)+'"><input data-auth-password type="password" placeholder="Password" value="'+esc(state.authPassword)+'"><button class="primary" data-action="sign-in" '+(state.authBusy?'disabled':'')+'>'+(state.authBusy?'Signing in...':'Sign In')+'</button></div>';
}
function render(){
  installStyles();
  var mount=document.getElementById(MOUNT_ID);
  if(!mount){mount=document.createElement("div");mount.id=MOUNT_ID;document.body.appendChild(mount);}
  var c=activeCustomer();
  mount.innerHTML='<div id="'+ROOT_ID+'" class="'+(state.drawerOpen?'is-page-wide':'')+'">'+
    '<button class="ds-side-tab" data-action="open-drawer">Page Text</button>'+
    '<main class="ds-shell">'+
      '<div class="ds-kicker">SyncEtc Company Tool</div><h1>Design Studio</h1>'+
      '<section class="ds-top">'+
        '<div class="ds-field"><label>Customer / Profile</label><select data-action="customer-select">'+CUSTOMERS.map(function(x){return '<option value="'+esc(x.key)+'" '+(x.key===state.customerKey?'selected':'')+'>'+esc(x.name)+'</option>';}).join("")+'</select></div>'+
        '<div class="ds-field"><label>Design Profile</label><select><option>Current Saved Assignment</option><option>Classic Aviation Club</option><option>Forest Ops Dashboard</option></select></div>'+
        '<div class="ds-status '+statusClass()+'">'+esc(statusText())+'</div>'+
      '</section>'+
      '<div class="ds-pagebar"><strong>Customer Preview Starts Here</strong><div class="ds-actions"><button data-action="reload">Reload</button><button class="primary" data-action="open-drawer">Page Text</button></div></div>'+
      '<section class="ds-preview-wrap" data-preview>'+renderAircraftPage(state.appliedValues)+'</section>'+
    '</main>'+
    '<aside class="ds-drawer">'+
      '<div class="ds-drawer-head"><div><h2>Page Text</h2><p>'+esc(c.name)+' · Aircraft</p></div><button data-action="close-drawer">×</button></div>'+
      '<div class="ds-drawer-body">'+renderFields()+authPanel()+'</div>'+
      '<div class="ds-drawer-foot">'+
        '<div class="ds-status '+statusClass()+'">'+esc(statusText())+'</div>'+
        '<div class="ds-foot-row">'+
          '<button class="primary" data-action="apply" '+(!state.dirty||state.saving?'disabled':'')+'>Apply Changes</button>'+
          '<button class="primary" data-action="save" '+(!state.appliedDirty||state.saving?'disabled':'')+'>Save Changes</button>'+
          '<button data-action="discard" '+((!state.dirty&&!state.appliedDirty)||state.saving?'disabled':'')+'>Discard Changes</button>'+
          '<button data-action="toggle-auth">'+(getToken()?'Signed In':'Sign In')+'</button>'+
        '</div>'+
        '<div class="ds-small">Edit text, Apply Changes to update the preview, then Save Changes to write to Supabase.</div>'+
      '</div>'+
    '</aside>'+
    '<div class="ds-version">'+esc(VERSION)+'</div>'+
  '</div>';
  bind();
  syncDirtyState();
}
function bind(){
  var r=root(); if(!r)return;
  r.querySelectorAll("[data-action]").forEach(function(el){
    el.addEventListener("click",function(e){
      var a=el.getAttribute("data-action");
      if(a==="open-drawer"){state.drawerOpen=true;render();return;}
      if(a==="close-drawer"){attemptCloseDrawer();return;}
      if(a==="apply"){applyChanges();return;}
      if(a==="save"){saveChanges();return;}
      if(a==="discard"){discardChanges();return;}
      if(a==="reload"){loadData();return;}
      if(a==="toggle-auth"){state.authOpen=!state.authOpen;render();return;}
      if(a==="sign-in"){signIn();return;}
    });
  });
  var sel=r.querySelector('[data-action="customer-select"]');
  if(sel)sel.addEventListener("change",function(){
    if(hasUnsaved()&&!confirm("You have unsaved page-text changes. Switch customers and lose them?")){sel.value=state.customerKey;return;}
    state.customerKey=sel.value;
    loadData();
  });
  r.querySelectorAll("[data-page-field]").forEach(function(el){
    el.addEventListener("input",function(){
      state.draftValues[el.getAttribute("data-page-field")]=el.value;
      state.dirty=true;
      state.notice="";
      state.error="";
      syncDirtyState();
      updateStatuses();
    });
  });
  var ae=r.querySelector("[data-auth-email]");
  if(ae)ae.addEventListener("input",function(){state.authEmail=ae.value;});
  var ap=r.querySelector("[data-auth-password]");
  if(ap)ap.addEventListener("input",function(){state.authPassword=ap.value;});
}
function updateStatuses(){
  var r=root(); if(!r)return;
  r.querySelectorAll(".ds-status").forEach(function(el){el.className="ds-status "+statusClass();el.textContent=statusText();});
  var apply=r.querySelector('[data-action="apply"]');
  var save=r.querySelector('[data-action="save"]');
  var discard=r.querySelector('[data-action="discard"]');
  if(apply)apply.disabled=!state.dirty||state.saving;
  if(save)save.disabled=!state.appliedDirty||state.saving;
  if(discard)discard.disabled=(!state.dirty&&!state.appliedDirty)||state.saving;
}
function hasUnsaved(){return !!(state.dirty||state.appliedDirty);}
function syncDirtyState(){document.body.classList.toggle("syncetc-ds-dirty",hasUnsaved());}
function attemptCloseDrawer(){
  if(hasUnsaved()&&!confirm("You have unsaved page-text changes. Close the drawer and discard them?"))return;
  discardChanges(false);
  state.drawerOpen=false;
  render();
}
function applyChanges(){
  state.appliedValues=clone(state.draftValues);
  state.dirty=false;
  state.appliedDirty=true;
  state.notice="Preview updated. Save Changes is now available.";
  state.error="";
  render();
}
function discardChanges(doRender){
  state.draftValues=clone(state.savedValues);
  state.appliedValues=clone(state.savedValues);
  state.dirty=false;
  state.appliedDirty=false;
  state.notice="Changes discarded.";
  state.error="";
  syncDirtyState();
  if(doRender!==false)render();
}
function getToken(){
  if(state.authToken&&Date.now()<state.authExpiresAt-30000)return state.authToken;
  try{
    for(var i=0;i<localStorage.length;i++){
      var k=localStorage.key(i),v=localStorage.getItem(k)||"";
      if(v.indexOf("access_token")>=0){
        var o=JSON.parse(v);
        var t=o.access_token||(o.currentSession&&o.currentSession.access_token)||(o.session&&o.session.access_token)||(o.data&&o.data.session&&o.data.session.access_token);
        if(t)return t;
      }
    }
  }catch(e){}
  return "";
}
function signIn(){
  state.authBusy=true;state.error="";render();
  fetch(SUPABASE_URL+"/auth/v1/token?grant_type=password",{
    method:"POST",
    headers:{"Content-Type":"application/json","apikey":ANON_KEY},
    body:JSON.stringify({email:state.authEmail,password:state.authPassword})
  }).then(function(res){return res.json().then(function(body){if(!res.ok)throw new Error(body.error_description||body.msg||body.message||"Sign in failed");return body;});})
  .then(function(body){
    state.authToken=body.access_token||"";
    state.authExpiresAt=Date.now()+((body.expires_in||3600)*1000);
    state.authPassword="";
    state.authOpen=false;
    state.authBusy=false;
    state.notice="Signed in.";
    render();
  }).catch(function(err){
    state.authBusy=false;
    state.error=err.message||String(err);
    render();
  });
}
function saveChanges(){
  var token=getToken();
  if(!token){state.authOpen=true;state.error="Sign in before saving page text.";render();return;}
  state.saving=true;state.error="";state.notice="Saving page text...";render();
  var payload={
    customer_key:state.customerKey,
    page_key:"aircraft",
    page_label:"Aircraft",
    current_settings_json:clone(state.appliedValues),
    settings_json:clone(state.appliedValues),
    fields_json:PAGE_FIELDS,
    note:"Customer-owned Aircraft page copy and display controls. Aircraft records themselves belong in the Aircraft Manager, not in this page settings drawer.",
    source_template_key:"aircraft",
    is_enabled:true
  };
  fetch(ACTION_URL,{
    method:"POST",
    headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},
    body:JSON.stringify({action:"save_customer_page_settings",customer_key:state.customerKey,payload:payload})
  }).then(function(res){return res.json().catch(function(){return null;}).then(function(body){if(!res.ok||!body||body.ok===false)throw new Error((body&&(body.error||body.message))||("Save failed: "+res.status));return body;});})
  .then(function(){
    state.savedValues=clone(state.appliedValues);
    state.draftValues=clone(state.appliedValues);
    state.dirty=false;
    state.appliedDirty=false;
    state.saving=false;
    state.notice="Saved page text.";
    state.error="";
    syncDirtyState();
    render();
  }).catch(function(err){
    state.saving=false;
    state.error=err.message||String(err);
    syncDirtyState();
    render();
  });
}
function loadData(){
  state.loading=true;state.error="";state.notice="Loading...";
  fetch(READ_URL+"?customer_key="+encodeURIComponent(state.customerKey)+"&t="+Date.now(),{headers:{"apikey":ANON_KEY}})
  .then(function(res){return res.json().catch(function(){return null;}).then(function(body){if(!res.ok||!body)throw new Error("Read failed: "+res.status);return body;});})
  .then(function(body){
    state.data=body;
    state.loading=false;
    state.notice="Loaded.";
    resetFromData();
    render();
  }).catch(function(err){
    state.loading=false;
    state.error=err.message||String(err);
    resetFromData();
    render();
  });
}
window.addEventListener("beforeunload",function(e){
  if(hasUnsaved()){
    e.preventDefault();
    e.returnValue="";
    return "";
  }
});
document.addEventListener("click",function(e){
  var a=e.target&&e.target.closest&&e.target.closest("a[href]");
  if(!a||!hasUnsaved())return;
  var href=a.getAttribute("href")||"";
  if(href==="#"||href.indexOf("javascript:")===0)return;
  if(!confirm("You have unsaved page-text changes. Leave this page and lose them?")){
    e.preventDefault();
    e.stopPropagation();
  }
},true);

function boot(){
  installStyles();
  state.savedValues=defaultValues();
  state.draftValues=clone(state.savedValues);
  state.appliedValues=clone(state.savedValues);
  render();
  loadData();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
})();
 /* PAGE-DESIGN-STUDIO-v30.js - END */
