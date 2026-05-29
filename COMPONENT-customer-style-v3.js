/* COMPONENT-customer-style-v3.js - BEGIN */
(function () {
  "use strict";
  window.SyncEtc = window.SyncEtc || {};
  window.SyncEtc.Components = window.SyncEtc.Components || {};

  var VERSION = "COMPONENT-customer-style-v3";
  var SUPABASE_URL = "https://ocdaohkiwonjmirqkjww.supabase.co";
  var SETTINGS_READ_URL = SUPABASE_URL + "/functions/v1/syncetc-site-settings-read";
  var cache = {};

  var FALLBACK_PRESETS = [
    { preset_key:"classic-aviation", preset_name:"Classic Aviation", theme:{ navy:"#12365a", navyDark:"#0b2744", blue:"#2f80c4", sky:"#eaf5ff", text:"#1e2933", muted:"#5d6b78" }, layout:{ density:"normal", hero:"standard", cardRadius:"large", headerStyle:"logo-left" } },
    { preset_key:"modern-ops", preset_name:"Modern Ops", theme:{ navy:"#102a43", navyDark:"#071a2d", blue:"#2563a6", sky:"#eef6ff", text:"#17212b", muted:"#536171" }, layout:{ density:"compact", hero:"standard", cardRadius:"medium", headerStyle:"logo-left" } },
    { preset_key:"clean-club", preset_name:"Clean Club", theme:{ navy:"#24415f", navyDark:"#13283d", blue:"#4c8fc7", sky:"#f3f9ff", text:"#23313d", muted:"#657381" }, layout:{ density:"comfortable", hero:"soft", cardRadius:"large", headerStyle:"logo-left" } },
    { preset_key:"bold-banner", preset_name:"Bold Banner", theme:{ navy:"#0f2f57", navyDark:"#081d36", blue:"#1f78bd", sky:"#e6f4ff", text:"#182635", muted:"#566879" }, layout:{ density:"normal", hero:"bold", cardRadius:"large", headerStyle:"logo-left" } }
  ];

  var DEFAULT_CUSTOMERS = {
    "150th_aero": {
      customer_key:"150th_aero", customerName:"150th Aero Flying Club", shortName:"150th Aero", fullName:"The 150th Aero Flying Club", legalName:"150th Aero Flying Club, Inc.",
      division:"Aviation", preset:"Classic Aviation", founded:"Founded in 1960",
      headerLogoUrl:"https://ocdaohkiwonjmirqkjww.supabase.co/storage/v1/object/public/public-site-assets/150thAero/FINAL_SQUARE_LOGO_TRANSPARENT-p-130x130q80.png",
      footerLogoUrl:"https://ocdaohkiwonjmirqkjww.supabase.co/storage/v1/object/public/public-site-assets/150thAero/FINAL_LOGO_PLANE_ONLY_TRANSPARENT-p-130x130q80.png",
      backgroundUrl:"https://ocdaohkiwonjmirqkjww.supabase.co/storage/v1/object/public/public-site-assets/150thAero/Cockpit.webp",
      bannerTowUrl:"https://ocdaohkiwonjmirqkjww.supabase.co/storage/v1/object/public/public-site-assets/150thAero/Bannertow.png",
      announcement:"Vote results: N150TH will receive avionics upgrades similar to N123GG. Aiming for Winter upgrade.",
      heroSubhead:"A member-operated flying club dedicated to keeping general aviation safe, affordable, and accessible.",
      footerText:"Member-owned flying club based at Morristown Municipal Airport, providing aircraft access, aviation community, and practical member resources.",
      social:{ youtube:"https://www.youtube.com/@150thAero", instagram:"https://www.instagram.com/150thaero/", facebook:"https://www.facebook.com/150thAeroFlyingClub/" },
      theme:FALLBACK_PRESETS[0].theme
    },
    "demo_flying_club": {
      customer_key:"demo_flying_club", customerName:"Demo Flying Club", shortName:"Demo Flying Club", fullName:"Demo Flying Club", legalName:"Demo Flying Club",
      division:"Aviation", preset:"Classic Aviation", founded:"Demo Customer", announcement:"Demo site editor preview.",
      heroSubhead:"A sample customer site for testing SyncEtc modules, roles, and customer-specific styling.",
      footerText:"Demo customer footer text. This area should later come from customer configuration.",
      social:{}, theme:FALLBACK_PRESETS[0].theme
    }
  };

  function clean(v){ return v == null ? "" : String(v).trim(); }
  function keyFromName(v){
    var raw = clean(v);
    if(raw === "150th Aero Flying Club" || raw === "150th Aero") return "150th_aero";
    if(raw === "Demo Flying Club") return "demo_flying_club";
    return raw || "demo_flying_club";
  }
  function deepMerge(base, override){
    var out = Object.assign({}, base || {});
    Object.keys(override || {}).forEach(function(k){
      if(override[k] && typeof override[k] === "object" && !Array.isArray(override[k]) && out[k] && typeof out[k] === "object" && !Array.isArray(out[k])){
        out[k] = deepMerge(out[k], override[k]);
      } else out[k] = override[k];
    });
    return out;
  }
  function fallbackConfig(customerKeyOrName){
    var key = keyFromName(customerKeyOrName);
    return Object.assign({}, DEFAULT_CUSTOMERS[key] || { customer_key:key, customerName:key.replace(/_/g," ").replace(/\b\w/g,function(m){return m.toUpperCase();}), shortName:key.replace(/_/g," "), fullName:key.replace(/_/g," "), legalName:key.replace(/_/g," "), division:"Aviation", preset:"Classic Aviation", founded:"Customer Site", announcement:"", social:{}, theme:FALLBACK_PRESETS[0].theme });
  }
  function presetByKey(presets, key){
    return (presets || FALLBACK_PRESETS).find(function(p){ return clean(p.preset_key) === clean(key); }) || FALLBACK_PRESETS[0];
  }
  function buildConfig(customerKeyOrName, settingsBundle, overrides){
    var key = keyFromName(customerKeyOrName);
    var base = fallbackConfig(key);
    var settings = settingsBundle && settingsBundle.settings ? settingsBundle.settings : {};
    var presets = settingsBundle && settingsBundle.presets && settingsBundle.presets.length ? settingsBundle.presets : FALLBACK_PRESETS;
    var preset = presetByKey(presets, settings.style_preset_key || "classic-aviation");
    var brand = settings.brand_overrides || {};
    var theme = deepMerge(preset.theme || base.theme || {}, settings.theme_overrides || {});
    var config = deepMerge(base, brand);
    config.customer_key = key;
    config.stylePresetKey = preset.preset_key || "classic-aviation";
    config.preset = preset.preset_name || config.preset || "Classic Aviation";
    config.theme = theme;
    config.layout = preset.layout || {};
    config.content = settings.content_overrides || {};
    config.modules = settings.enabled_modules || {};
    config.rawSiteSettings = settings;
    config.availablePresets = presets;
    return deepMerge(config, overrides || {});
  }
  function getCustomerConfig(customerKeyOrName, overrides) {
    var key = keyFromName(customerKeyOrName);
    return buildConfig(key, cache[key], overrides);
  }
  function loadCustomerConfig(customerKeyOrName) {
    var key = keyFromName(customerKeyOrName);
    return fetch(SETTINGS_READ_URL + "?customer_key=" + encodeURIComponent(key), { credentials:"omit" })
      .then(function(r){ return r.json().catch(function(){ return null; }).then(function(body){ if(!r.ok || !body || body.ok === false) throw new Error((body && body.error) || ("site settings read failed " + r.status)); return body; }); })
      .then(function(bundle){ cache[key] = bundle; return getCustomerConfig(key); })
      .catch(function(){ return getCustomerConfig(key); });
  }
  function applyCustomerCssVars(rootEl, customerConfig) {
    var U = window.SyncEtc.Components.Utils;
    var c = U.normalizeCustomerConfig(customerConfig);
    var theme = c.theme || {};
    var target = rootEl || document.documentElement;
    target.style.setProperty("--se-aero-navy", theme.navy || "#12365a");
    target.style.setProperty("--se-aero-navy-dark", theme.navyDark || "#0b2744");
    target.style.setProperty("--se-aero-blue", theme.blue || "#2f80c4");
    target.style.setProperty("--se-aero-sky", theme.sky || "#eaf5ff");
    target.style.setProperty("--se-aero-text", theme.text || "#1e2933");
    target.style.setProperty("--se-aero-muted", theme.muted || "#5d6b78");
    target.style.setProperty("--se-customer-bg", c.backgroundUrl ? "url('" + U.cssUrl(c.backgroundUrl) + "')" : "none");
  }

  window.SyncEtc.Components.CustomerStyle = { customers:DEFAULT_CUSTOMERS, fallbackPresets:FALLBACK_PRESETS, getCustomerConfig:getCustomerConfig, loadCustomerConfig:loadCustomerConfig, applyCustomerCssVars:applyCustomerCssVars, version:VERSION };
})();
/* COMPONENT-customer-style-v3.js - END */
