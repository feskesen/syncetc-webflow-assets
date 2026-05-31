/* COMPONENT-customer-style-v1.js | layout presets scoped away from side drawer | Generated: 2026-05-31 08:24:44 UTC */
(function () {
  "use strict";
  window.SyncEtc = window.SyncEtc || {};
  window.SyncEtc.Components = window.SyncEtc.Components || {};

  var VERSION="COMPONENT-customer-style-v1";
  var SUPABASE_URL = "https://ocdaohkiwonjmirqkjww.supabase.co";
  var SETTINGS_READ_URL = SUPABASE_URL + "/functions/v1/syncetc-site-settings-read";
  var cache = {};

  var FALLBACK_PRESETS = [
    { preset_key:"classic-aviation", preset_name:"Classic Aviation", theme:{ navy:"#12365a", navyDark:"#0b2744", blue:"#2f80c4", sky:"#eaf5ff", text:"#1e2933", muted:"#5d6b78" }, layout:{} },
    { preset_key:"modern-ops", preset_name:"Modern Ops", theme:{ navy:"#102a43", navyDark:"#071a2d", blue:"#2563a6", sky:"#eef6ff", text:"#17212b", muted:"#536171" }, layout:{} },
    { preset_key:"clean-club", preset_name:"Clean Club", theme:{ navy:"#24415f", navyDark:"#13283d", blue:"#4c8fc7", sky:"#f3f9ff", text:"#23313d", muted:"#657381" }, layout:{} },
    { preset_key:"bold-banner", preset_name:"Bold Banner", theme:{ navy:"#0f2f57", navyDark:"#081d36", blue:"#1f78bd", sky:"#e6f4ff", text:"#182635", muted:"#566879" }, layout:{} }
  ];

  var FALLBACK_LAYOUT_PRESETS=[
    {layout_key:"standard-layout",layout_name:"Standard Layout",description:"Balanced default layout for most customer sites.",layout:{preset:"standard-layout",density:"normal",heroSize:"standard",maxWidth:"normal",cardStyle:"standard",navDensity:"normal",buttonShape:"rounded",sectionSpacing:"normal"},sort_order:10},
    {layout_key:"compact-ops",layout_name:"Compact Ops",description:"Denser operational layout for fast scanning.",layout:{preset:"compact-ops",density:"compact",heroSize:"small",maxWidth:"normal",cardStyle:"compact",navDensity:"compact",buttonShape:"rounded",sectionSpacing:"tight"},sort_order:20},
    {layout_key:"bold-homepage",layout_name:"Bold Homepage",description:"Larger home-page-forward layout.",layout:{preset:"bold-homepage",density:"normal",heroSize:"large",maxWidth:"wide",cardStyle:"prominent",navDensity:"normal",buttonShape:"pill",sectionSpacing:"generous"},sort_order:30},
    {layout_key:"club-magazine",layout_name:"Club Magazine",description:"Editorial image-forward club presentation.",layout:{preset:"club-magazine",density:"comfortable",heroSize:"large",maxWidth:"wide",cardStyle:"editorial",navDensity:"normal",buttonShape:"soft",sectionSpacing:"generous"},sort_order:40}
  ];


  var DEFAULT_CUSTOMERS = {
    "demo_flying_club": { customer_key:"demo_flying_club", customerName:"Demo Flying Club", shortName:"Demo Flying Club", fullName:"Demo Flying Club", legalName:"Demo Flying Club", founded:"Demo Customer", announcement:"Demo site editor preview.", footerText:"Demo customer footer text.", social:{}, theme:FALLBACK_PRESETS[0].theme },
    "150th_aero": { customer_key:"150th_aero", customerName:"150th Aero Flying Club", shortName:"150th Aero", fullName:"The 150th Aero Flying Club", legalName:"150th Aero Flying Club, Inc.", founded:"Founded in 1960", headerLogoUrl:"https://ocdaohkiwonjmirqkjww.supabase.co/storage/v1/object/public/public-site-assets/150thAero/FINAL_SQUARE_LOGO_TRANSPARENT-p-130x130q80.png", footerLogoUrl:"https://ocdaohkiwonjmirqkjww.supabase.co/storage/v1/object/public/public-site-assets/150thAero/FINAL_LOGO_PLANE_ONLY_TRANSPARENT-p-130x130q80.png", announcement:"Vote results: N150TH will receive avionics upgrades similar to N123GG. Aiming for Winter upgrade.", footerText:"Member-owned flying club based at Morristown Municipal Airport, providing aircraft access, aviation community, and practical member resources.", social:{ youtube:"https://www.youtube.com/@150thAero", instagram:"https://www.instagram.com/150thaero/", facebook:"https://www.facebook.com/150thAeroFlyingClub/" }, theme:FALLBACK_PRESETS[0].theme }
  };

  function clean(v){ return v == null ? "" : String(v).trim(); }
  function keyFromName(v){ var raw=clean(v); if(raw==="150th Aero Flying Club"||raw==="150th Aero") return "150th_aero"; if(raw==="Demo Flying Club") return "demo_flying_club"; return raw || "demo_flying_club"; }
  function deepMerge(a,b){ var out=Object.assign({},a||{}); Object.keys(b||{}).forEach(function(k){ if(b[k]&&typeof b[k]==="object"&&!Array.isArray(b[k])&&out[k]&&typeof out[k]==="object"&&!Array.isArray(out[k])) out[k]=deepMerge(out[k],b[k]); else out[k]=b[k]; }); return out; }
  function presetByKey(presets,key){ return (presets||FALLBACK_PRESETS).find(function(p){return clean(p.preset_key)===clean(key);}) || FALLBACK_PRESETS[0]; }
  function layoutPresetByKey(layoutPresets,key){ return (layoutPresets||FALLBACK_LAYOUT_PRESETS).find(function(p){return clean(p.layout_key||p.preset_key||p.key)===clean(key);}) || FALLBACK_LAYOUT_PRESETS[0]; }
  function savedLayoutKey(settings,overrides){
    if(overrides&&overrides.layoutPresetKey)return overrides.layoutPresetKey;
    var mo=(settings&&settings.module_overrides)||{};
    return (mo.layout&&mo.layout.preset)||"standard-layout";
  }
  function fallbackConfig(customerKeyOrName){ var key=keyFromName(customerKeyOrName); return Object.assign({}, DEFAULT_CUSTOMERS[key] || { customer_key:key, customerName:key.replace(/_/g," "), shortName:key.replace(/_/g," "), fullName:key.replace(/_/g," "), legalName:key.replace(/_/g," "), founded:"Customer Site", announcement:"", social:{}, theme:FALLBACK_PRESETS[0].theme }); }

  function getCustomerConfig(customerKeyOrName, overrides){
    overrides = overrides || {};
    var key=keyFromName(customerKeyOrName);
    var base=fallbackConfig(key);
    var bundle=cache[key] || {};
    var settings=bundle.settings || {};
    var presets=bundle.presets && bundle.presets.length ? bundle.presets : FALLBACK_PRESETS;
    var layoutPresets=bundle.layout_presets && bundle.layout_presets.length ? bundle.layout_presets : ((bundle.layoutPresets && bundle.layoutPresets.length) ? bundle.layoutPresets : FALLBACK_LAYOUT_PRESETS);
    var presetKey=overrides.stylePresetKey || settings.style_preset_key || "classic-aviation";
    var preset=presetByKey(presets,presetKey);
    var cfg=deepMerge(base, settings.brand_overrides || {});
    cfg.customer_key=key;
    cfg.availablePresets=presets;
    cfg.availableLayoutPresets=layoutPresets;
    cfg.stylePresetKey=preset.preset_key;
    cfg.preset=preset.preset_name;
    var layoutKey=savedLayoutKey(settings,overrides);
    var layoutPreset=layoutPresetByKey(layoutPresets,layoutKey);
    cfg.layoutPresetKey=layoutPreset.layout_key||layoutKey;
    cfg.layoutPresetName=layoutPreset.layout_name||layoutKey;
    cfg.layout=deepMerge(layoutPreset.layout||{},((settings.module_overrides||{}).layout||{}));
    cfg.layout.preset=layoutKey;
    cfg.theme=deepMerge(preset.theme || {}, settings.theme_overrides || {});
    cfg.content=deepMerge(settings.content_overrides || {}, overrides.content || {});
    cfg.modules=settings.enabled_modules || {};
    cfg.rawSiteSettings=settings;
    cfg=deepMerge(cfg,overrides);
    cfg.theme=preset.theme || cfg.theme;
    return cfg;
  }

  function loadCustomerConfig(customerKeyOrName){
    var key=keyFromName(customerKeyOrName);
    return fetch(SETTINGS_READ_URL+"?customer_key="+encodeURIComponent(key),{credentials:"omit"})
      .then(function(r){return r.json().catch(function(){return null;}).then(function(body){if(!r.ok||!body||body.ok===false)throw new Error((body&&body.error)||"site settings read failed");return body;});})
      .then(function(bundle){cache[key]=bundle;return getCustomerConfig(key);})
      .catch(function(){return getCustomerConfig(key);});
  }

  function themeForPreset(customerConfig,presetKey){
    var presets=(customerConfig&&customerConfig.availablePresets)||FALLBACK_PRESETS;
    return presetByKey(presets,presetKey).theme || FALLBACK_PRESETS[0].theme;
  }

  function applyThemeVars(rootEl,theme){
    var target=rootEl || document.documentElement;
    theme=theme || FALLBACK_PRESETS[0].theme;
    target.style.setProperty("--se-aero-navy",theme.navy||"#12365a");
    target.style.setProperty("--se-aero-navy-dark",theme.navyDark||"#0b2744");
    target.style.setProperty("--se-aero-blue",theme.blue||"#2f80c4");
    target.style.setProperty("--se-aero-sky",theme.sky||"#eaf5ff");
    target.style.setProperty("--se-aero-text",theme.text||"#1e2933");
    target.style.setProperty("--se-aero-muted",theme.muted||"#5d6b78");
  }

  function ensureLayoutStyles(){
    if(document.getElementById("syncetc-layout-preset-visible-vars"))return;
    var style=document.createElement("style");
    style.id="syncetc-layout-preset-visible-vars";
    style.textContent=[
      "/* Layout presets intentionally affect rendered customer site only, never the admin side drawer. */",

      "#syncetc-component-shell{max-width:var(--se-layout-shell-max,1180px)!important;margin-left:auto!important;margin-right:auto!important;}",

      "#syncetc-component-shell > main{display:block!important;}",
      "#syncetc-component-shell > main section{margin-bottom:var(--se-layout-section-gap,24px)!important;}",

      "#syncetc-component-shell > main button,",
      "#syncetc-component-shell > main a[class*='button'],",
      "#syncetc-component-shell > main [class*='btn'],",
      "#syncetc-component-shell > .club-header-wrapper button,",
      "#syncetc-component-shell > .club-header-wrapper a[class*='button'],",
      "#syncetc-component-shell > .club-header-wrapper [class*='btn'],",
      "#syncetc-component-shell > footer button,",
      "#syncetc-component-shell > footer a[class*='button'],",
      "#syncetc-component-shell > footer [class*='btn']{",
      "border-radius:var(--se-layout-button-radius,999px)!important;",
      "}",

      "#syncetc-component-shell > main [class*='card'],",
      "#syncetc-component-shell > main [class*='panel'],",
      "#syncetc-component-shell > main [class*='tile'],",
      "#syncetc-component-shell > main [class*='stat'],",
      "#syncetc-component-shell > main [class*='hero'],",
      "#syncetc-component-shell > main [class*='section'],",
      "#syncetc-component-shell > .club-header-wrapper .club-header-card,",
      "#syncetc-component-shell > footer [class*='card'],",
      "#syncetc-component-shell > footer [class*='panel']{",
      "border-radius:var(--se-layout-card-radius,18px)!important;",
      "box-shadow:var(--se-layout-card-shadow,none)!important;",
      "}",

      "#syncetc-component-shell > main [class*='hero']{",
      "min-height:var(--se-layout-hero-min,auto)!important;",
      "padding-top:var(--se-layout-hero-pad-y,inherit)!important;",
      "padding-bottom:var(--se-layout-hero-pad-y,inherit)!important;",
      "}",

      "#syncetc-component-shell > .club-header-wrapper{",
      "padding-top:var(--se-layout-nav-pad-y,inherit)!important;",
      "padding-bottom:var(--se-layout-nav-pad-y,inherit)!important;",
      "}",

      "#syncetc-component-shell > .syncetc-drawer,",
      "#syncetc-component-shell > .syncetc-drawer *,",
      "#syncetc-component-shell .syncetc-admin-fab{",
      "border-radius:revert-layer;",
      "box-shadow:revert-layer;",
      "}"
    ].join("");
    document.head.appendChild(style);
  }

  function sizeValue(v,normal,wide,narrow){
    if(v==="wide")return wide;
    if(v==="narrow")return narrow;
    return normal;
  }

  function applyLayoutVars(rootEl,layout){
    ensureLayoutStyles();
    var target=rootEl || document.documentElement;
    layout=layout||{};
    var radius="18px", buttonRadius="999px", shadow="none", gap="24px", heroMin="auto", heroPad="inherit", shellMax="1180px", navPad="inherit";

    if(layout.buttonShape==="square")buttonRadius="4px";
    else if(layout.buttonShape==="soft")buttonRadius="14px";
    else if(layout.buttonShape==="pill")buttonRadius="999px";
    else if(layout.buttonShape==="rounded")buttonRadius="12px";

    if(layout.cardStyle==="square"||layout.cardStyle==="sharp")radius="4px";
    else if(layout.cardStyle==="soft")radius="22px";
    else if(layout.cardStyle==="prominent")radius="26px";
    else if(layout.cardStyle==="editorial")radius="30px";
    else if(layout.cardStyle==="compact")radius="10px";

    if(layout.shadow==="deep")shadow="0 18px 40px rgba(15,23,42,.22)";
    else if(layout.shadow==="medium")shadow="0 10px 24px rgba(15,23,42,.14)";
    else if(layout.shadow==="soft")shadow="0 8px 22px rgba(15,23,42,.10)";
    else if(layout.shadow==="flat")shadow="none";

    if(layout.sectionSpacing==="tight")gap="14px";
    else if(layout.sectionSpacing==="generous")gap="36px";
    else if(layout.sectionSpacing==="wide")gap="48px";

    if(layout.heroSize==="small"){heroMin="160px";heroPad="24px";}
    else if(layout.heroSize==="large"){heroMin="360px";heroPad="56px";}
    else if(layout.heroSize==="xl"){heroMin="460px";heroPad="76px";}
    else {heroMin="240px";heroPad="36px";}

    shellMax=sizeValue(layout.maxWidth,"1180px","1380px","980px");
    if(layout.navDensity==="compact")navPad="4px";
    else if(layout.navDensity==="roomy")navPad="16px";

    target.style.setProperty("--se-layout-card-radius",radius);
    target.style.setProperty("--se-layout-button-radius",buttonRadius);
    target.style.setProperty("--se-layout-card-shadow",shadow);
    target.style.setProperty("--se-layout-section-gap",gap);
    target.style.setProperty("--se-layout-hero-min",heroMin);
    target.style.setProperty("--se-layout-hero-pad-y",heroPad);
    target.style.setProperty("--se-layout-shell-max",shellMax);
    target.style.setProperty("--se-layout-nav-pad-y",navPad);
  }

  function applyCustomerCssVars(rootEl, customerConfig){
    applyThemeVars(rootEl,(customerConfig&&customerConfig.theme)||FALLBACK_PRESETS[0].theme);
    applyLayoutVars(rootEl,(customerConfig&&customerConfig.layout)||FALLBACK_LAYOUT_PRESETS[0].layout);
  }

  window.SyncEtc.Components.CustomerStyle={version:VERSION,customers:DEFAULT_CUSTOMERS,fallbackPresets:FALLBACK_PRESETS,fallbackLayoutPresets:FALLBACK_LAYOUT_PRESETS,getCustomerConfig:getCustomerConfig,loadCustomerConfig:loadCustomerConfig,themeForPreset:themeForPreset,applyThemeVars:applyThemeVars,applyLayoutVars:applyLayoutVars,applyCustomerCssVars:applyCustomerCssVars};
})();
/* COMPONENT-customer-style-v1.js - END */
