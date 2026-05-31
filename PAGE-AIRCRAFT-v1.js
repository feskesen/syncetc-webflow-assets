/* PAGE-AIRCRAFT-v1.js | baseline defaults + current Supabase values | Generated: 2026-05-31 18:50:08 UTC */
(function () {
  "use strict";

  const VERSION = "PAGE-AIRCRAFT-v1";
  const MOUNT_ID = "syncetc-webflow-mount";
  const STYLE_ID = "syncetc-aircraft-page-v1-style";

  const COMPONENT_FILES = [
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

  const CURRENT_SCRIPT_SRC = document.currentScript && document.currentScript.src ? document.currentScript.src : "";

  function componentBaseUrl() {
    if (window.SYNCETC_COMPONENT_BASE_URL) return String(window.SYNCETC_COMPONENT_BASE_URL).replace(/\/?$/, "/");
    if (CURRENT_SCRIPT_SRC) return CURRENT_SCRIPT_SRC.substring(0, CURRENT_SCRIPT_SRC.lastIndexOf("/") + 1);
    return "https://feskesen.github.io/syncetc-webflow-assets/";
  }

  function loadScriptOnce(src) {
    return new Promise(function(resolve, reject) {
      var existing = Array.prototype.slice.call(document.scripts).find(function(s) { return s.src === src; });
      if (existing) return resolve();
      var script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = function() { resolve(); };
      script.onerror = function() { reject(new Error("Could not load " + src)); };
      document.head.appendChild(script);
    });
  }

  function ensureComponents() {
    var base = componentBaseUrl();
    return COMPONENT_FILES.reduce(function(p, file) {
      return p.then(function() {
        return loadScriptOnce(base + file + "?v=page-aware-customer-settings-aircraft-1");
      });
    }, Promise.resolve());
  }

  const AIRCRAFT_PAGE_DEFAULTS = {
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

  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (m) {
      return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m];
    });
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
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
    `;
    document.head.appendChild(style);
  }

  function customerAircraftSettings(customerKey){
    try{
      var cs=window.SyncEtc&&window.SyncEtc.Components&&window.SyncEtc.Components.CustomerStyle;
      if(!cs||!cs.getCustomerConfig)return null;
      var customer=cs.getCustomerConfig(customerKey);
      var row=cs.pageSettingsFor?cs.pageSettingsFor(customer,"aircraft"):((customer.customerPageSettingsByKey||{}).aircraft);
      return row&&(row.current_settings_json||row.settings_json)?(row.current_settings_json||row.settings_json):null;
    }catch(e){return null;}
  }

  function applyAircraftSettings(cfg,settings){
    settings=settings||{};
    cfg.heroEyebrow=localValue(settings,"aircraft.heroEyebrow",cfg.heroEyebrow);
    cfg.heroTitle=localValue(settings,"aircraft.heroTitle",cfg.heroTitle);
    cfg.heroIntro=localValue(settings,"aircraft.heroIntro",cfg.heroIntro);
    cfg.introLabel=localValue(settings,"aircraft.introLabel",cfg.introLabel);
    cfg.introTitle=localValue(settings,"aircraft.introTitle",cfg.introTitle);
    cfg.introText=localValue(settings,"aircraft.introText",cfg.introText);
    cfg.note=localValue(settings,"aircraft.note",cfg.note);
    for(var i=0;i<3;i++){
      cfg.stats[i]=cfg.stats[i]||{};
      cfg.stats[i].value=localValue(settings,"aircraft.stats."+i+".value",cfg.stats[i].value||"");
      cfg.stats[i].text=localValue(settings,"aircraft.stats."+i+".text",cfg.stats[i].text||"");
    }
    return cfg;
  }

  function baseConfig(customerKey) {
    var cfg;
    if (customerKey === "150th_aero") cfg=JSON.parse(JSON.stringify(AIRCRAFT_PAGE_DEFAULTS["150th Aero Flying Club"]));
    else if (customerKey === "demo_flying_club") cfg=JSON.parse(JSON.stringify(AIRCRAFT_PAGE_DEFAULTS["Test Customer"] || AIRCRAFT_PAGE_DEFAULTS["150th Aero Flying Club"]));
    else cfg=JSON.parse(JSON.stringify(AIRCRAFT_PAGE_DEFAULTS["150th Aero Flying Club"]));
    return applyAircraftSettings(cfg,customerAircraftSettings(customerKey));
  }

  function localValue(local,key,fallback) {
    return Object.prototype.hasOwnProperty.call(local||{},key) ? local[key] : fallback;
  }

  function configFor(customerKey,local) {
    var cfg = baseConfig(customerKey);
    cfg.heroEyebrow = localValue(local,"aircraft.heroEyebrow",cfg.heroEyebrow);
    cfg.heroTitle = localValue(local,"aircraft.heroTitle",cfg.heroTitle);
    cfg.heroIntro = localValue(local,"aircraft.heroIntro",cfg.heroIntro);
    cfg.introLabel = localValue(local,"aircraft.introLabel",cfg.introLabel);
    cfg.introTitle = localValue(local,"aircraft.introTitle",cfg.introTitle);
    cfg.introText = localValue(local,"aircraft.introText",cfg.introText);
    cfg.note = localValue(local,"aircraft.note",cfg.note);
    for(var i=0;i<3;i++) {
      cfg.stats[i] = cfg.stats[i] || {};
      cfg.stats[i].value = localValue(local,"aircraft.stats."+i+".value",cfg.stats[i].value || "");
      cfg.stats[i].text = localValue(local,"aircraft.stats."+i+".text",cfg.stats[i].text || "");
    }
    return cfg;
  }

  function registerPageSettings(shell) {
    if (!window.SyncEtc || !window.SyncEtc.Components || !window.SyncEtc.Components.CustomerSettings) return;
    window.SyncEtc.Components.CustomerSettings.registerPage({
      pageKey:"aircraft",
      pageLabel:"Aircraft",
      note:"Customer-owned Aircraft page copy and display controls. Aircraft records themselves belong in the Aircraft Manager, not in this page settings drawer.",
      getDefaults:function(ctx,api) {
        var key = (api && api.getState && api.getState().customerKey) || (ctx && ctx.customerKey) || "150th_aero";
        var db = customerAircraftSettings(key);
        var rowDb=(function(){try{var cs=window.SyncEtc&&window.SyncEtc.Components&&window.SyncEtc.Components.CustomerStyle;var customer=cs&&cs.getCustomerConfig?cs.getCustomerConfig(key):null;var row=cs&&cs.pageSettingsFor?cs.pageSettingsFor(customer,"aircraft"):null;return row&&(row.default_settings_json||row.baseline_settings_json)?(row.default_settings_json||row.baseline_settings_json):null;}catch(e){return null;}})();
        if(rowDb) return rowDb;
        if(db) return db;
        var cfg = baseConfig(key);
        return {
          "aircraft.heroEyebrow": cfg.heroEyebrow || "",
          "aircraft.heroTitle": cfg.heroTitle || "",
          "aircraft.heroIntro": cfg.heroIntro || "",
          "aircraft.stats.0.value": (cfg.stats[0] && cfg.stats[0].value) || "",
          "aircraft.stats.0.text": (cfg.stats[0] && cfg.stats[0].text) || "",
          "aircraft.stats.1.value": (cfg.stats[1] && cfg.stats[1].value) || "",
          "aircraft.stats.1.text": (cfg.stats[1] && cfg.stats[1].text) || "",
          "aircraft.stats.2.value": (cfg.stats[2] && cfg.stats[2].value) || "",
          "aircraft.stats.2.text": (cfg.stats[2] && cfg.stats[2].text) || "",
          "aircraft.introLabel": cfg.introLabel || "",
          "aircraft.introTitle": cfg.introTitle || "",
          "aircraft.introText": cfg.introText || "",
          "aircraft.note": cfg.note || ""
        };
      },
      fields:[
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
      ],
      managerLink:{label:"Manage Aircraft Records",pageKey:"aircraft-admin"}
    });
  }

  function inlineText(v) { return esc(v).replace(/\*([^*]+)\*/g, "<em>$1</em>"); }
  function hasText(v) { return String(v == null ? "" : v).trim() !== ""; }

  function renderAircraftPage(customerKey,local) {
    installStyles();
    var cfg = configFor(customerKey,local||{});
    var stats = Array.isArray(cfg.stats) ? cfg.stats : [];
    var rows = Array.isArray(cfg.aircraft) ? cfg.aircraft.slice().sort(function(a,b) { return (a.sortOrder || 999) - (b.sortOrder || 999); }) : [];

    function statMarkup(s) {
      var value = hasText(s && s.value) ? '<strong>' + esc(s.value) + '</strong>' : '';
      var text = hasText(s && s.text) ? '<span>' + esc(s.text) + '</span>' : '';
      if(!value && !text) return '';
      return '<div class="aero-fleet-stat">' + value + text + '</div>';
    }

    function labelFor(ac) { return String(ac.tailNumber || '').toUpperCase() === 'N150TH' ? 'Flagship Aircraft' : 'Club Aircraft'; }
    function metaFor(ac) { return [ac.modelYear, ac.aircraftType].filter(Boolean).join(' '); }

    function detailsMarkup(ac) {
      var parts = String(ac.details || '').split('||').map(function(x) { return x.trim(); }).filter(Boolean);
      if (!parts.length) return '<p>Aircraft details are not available at this time.</p>';
      var intro = parts.shift();
      return (intro ? '<p>' + inlineText(intro) + '</p>' : '') + (parts.length ? '<ul>' + parts.map(function(x) { return '<li>' + inlineText(x) + '</li>'; }).join('') + '</ul>' : '');
    }

    function photoCard(url, label, alt) {
      return '<div class="aero-aircraft-photo-card">' + (url ? '<img src="' + esc(url) + '" alt="' + esc(alt || label) + '">' : '<div class="aero-aircraft-placeholder">' + esc(label) + ' photo not available</div>') + '<div class="aero-aircraft-photo-label">' + esc(label) + '</div></div>';
    }

    function aircraftCard(ac) {
      return '<article class="aero-aircraft-card"><div class="aero-aircraft-copy"><div class="aero-section-label">' + esc(labelFor(ac)) + '</div><div class="aero-aircraft-header"><h2 class="aero-tail-number">' + esc(ac.tailNumber || 'Aircraft') + '</h2><div class="aero-aircraft-meta">' + esc(metaFor(ac) || 'Aircraft Details') + '</div></div>' + detailsMarkup(ac) + '</div><div class="aero-aircraft-media">' + photoCard(ac.aircraftPhoto, 'Exterior', (ac.tailNumber || 'Aircraft') + ' exterior aircraft photo') + photoCard(ac.panelPhoto, 'Panel', (ac.tailNumber || 'Aircraft') + ' panel photo') + '</div></article>';
    }

    var heroEyebrow = hasText(cfg.heroEyebrow) ? '<div class="aero-fleet-eyebrow">' + esc(cfg.heroEyebrow) + '</div>' : '';
    var heroTitle = hasText(cfg.heroTitle) ? '<h1>' + esc(cfg.heroTitle) + '</h1>' : '';
    var heroIntro = hasText(cfg.heroIntro) ? '<p>' + esc(cfg.heroIntro) + '</p>' : '';
    var statHtml = stats.map(statMarkup).filter(Boolean).join('');
    var statsBlock = statHtml ? '<div class="aero-fleet-stats">' + statHtml + '</div>' : '';

    var introLabel = hasText(cfg.introLabel) ? '<div class="aero-section-label">' + esc(cfg.introLabel) + '</div>' : '';
    var introTitle = hasText(cfg.introTitle) ? '<h2>' + esc(cfg.introTitle) + '</h2>' : '';
    var introText = hasText(cfg.introText) ? '<p>' + esc(cfg.introText) + '</p>' : '';
    var introBlock = (introLabel || introTitle || introText) ? '<section class="aero-fleet-intro-card">' + introLabel + introTitle + introText + '</section>' : '';
    var noteBlock = hasText(cfg.note) ? '<div class="aero-note-strip"><strong>Note:</strong> ' + esc(cfg.note) + '</div>' : '';

    return '<div class="aero-fleet-page"><div class="aero-fleet-shell"><section class="aero-fleet-hero">' + heroEyebrow + heroTitle + heroIntro + statsBlock + '</section><main class="aero-fleet-main">' + introBlock + '<section class="aero-aircraft-list">' + (rows.length ? rows.map(aircraftCard).join('') : '<div class="aero-empty-message">Aircraft information is not available at this time.</div>') + '</section>' + noteBlock + '</main></div></div>';
  }

  function shellState(shell) { try { return shell.getState ? shell.getState() : {}; } catch(e) { return {}; } }
  function activeCustomerKey(shell) { return shellState(shell).customerKey || "150th_aero"; }
  function activeLocal(shell) { return shellState(shell).local || {}; }

  function init() {
    ensureComponents().then(function () {
      if (window.SyncEtc && window.SyncEtc.AuthModal && window.SyncEtc.AuthModal.init) window.SyncEtc.AuthModal.init();
      if (window.SyncEtc && window.SyncEtc.AuthSoftBridge && window.SyncEtc.AuthSoftBridge.start) window.SyncEtc.AuthSoftBridge.start();

      var mount = document.getElementById(MOUNT_ID);
      if (!mount) { mount = document.createElement("div"); mount.id = MOUNT_ID; document.body.appendChild(mount); }

      var shell = window.SyncEtc.Components.SiteShell.create(MOUNT_ID, {
        customerKey: "150th_aero",
        pageKey: "aircraft",
        audience: "public",
        showControls: true,
        showBanner: false,
        version: VERSION
      });

      registerPageSettings(shell);

      function renderAll() { shell.render(renderAircraftPage(activeCustomerKey(shell),activeLocal(shell))); }

      document.addEventListener("syncetc:customer-hard-change", function () { if (shell.loadCustomer) shell.loadCustomer().then(function(){registerPageSettings(shell);renderAll();}); else renderAll(); });
      document.addEventListener("syncetc:view-as-hard-change", renderAll);
      document.addEventListener("syncetc:customer-settings-local-change", function(e) { if(!e.detail || e.detail.pageKey==="aircraft") renderAll(); });
      document.addEventListener("syncetc:auth-soft-change", function () {
        if (window.SyncEtc.SecurityContext && window.SyncEtc.SecurityContext.refresh) window.SyncEtc.SecurityContext.refresh(activeCustomerKey(shell)).then(renderAll).catch(renderAll);
        else renderAll();
      });

      if (window.SyncEtc.SecurityContext && window.SyncEtc.SecurityContext.refresh) window.SyncEtc.SecurityContext.refresh(activeCustomerKey(shell)).then(renderAll).catch(renderAll);
      else renderAll();

      console.log(VERSION + " loaded");
    }).catch(function (err) {
      console.error(VERSION, err);
      document.body.insertAdjacentHTML("afterbegin", '<div style="max-width:900px;margin:30px auto;padding:20px;border:1px solid #c44;border-radius:14px;background:#fff;color:#722;font-family:Arial">Could not load SyncEtc Aircraft page: ' + esc(err.message || err) + '</div>');
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
/* PAGE-AIRCRAFT-v1.js - END | hidden blank fields honored */
