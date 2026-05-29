/* COMPONENT-customer-style-v2.js - BEGIN */
(function () {
  "use strict";

  window.SyncEtc = window.SyncEtc || {};
  window.SyncEtc.Components = window.SyncEtc.Components || {};

  const DEFAULT_CUSTOMERS = {
    "150th Aero Flying Club": {
      customerName: "150th Aero Flying Club",
      shortName: "150th Aero",
      fullName: "The 150th Aero Flying Club",
      legalName: "150th Aero Flying Club, Inc.",
      division: "Aviation",
      preset: "150th Aero Style v1",
      founded: "Founded in 1960",
      headerLogoUrl: "https://ocdaohkiwonjmirqkjww.supabase.co/storage/v1/object/public/public-site-assets/150thAero/FINAL_SQUARE_LOGO_TRANSPARENT-p-130x130q80.png",
      footerLogoUrl: "https://ocdaohkiwonjmirqkjww.supabase.co/storage/v1/object/public/public-site-assets/150thAero/FINAL_LOGO_PLANE_ONLY_TRANSPARENT-p-130x130q80.png",
      backgroundUrl: "https://ocdaohkiwonjmirqkjww.supabase.co/storage/v1/object/public/public-site-assets/150thAero/Cockpit.webp",
      bannerTowUrl: "https://ocdaohkiwonjmirqkjww.supabase.co/storage/v1/object/public/public-site-assets/150thAero/Bannertow.png",
      announcement: "Vote results: N150TH will receive avionics upgrades similar to N123GG. Aiming for Winter upgrade.",
      heroSubhead: "A member-operated flying club dedicated to keeping general aviation safe, affordable, and accessible.",
      footerText: "Member-owned flying club based at Morristown Municipal Airport, providing aircraft access, aviation community, and practical member resources.",
      social: {
        youtube: "https://www.youtube.com/@150thAero",
        instagram: "https://www.instagram.com/150thaero/",
        facebook: "https://www.facebook.com/150thAeroFlyingClub/"
      },
      theme: {
        navy: "#12365a",
        navyDark: "#0b2744",
        blue: "#2f80c4",
        sky: "#eaf5ff",
        text: "#1e2933",
        muted: "#5d6b78"
      }
    },
    "Demo Flying Club": {
      customerName: "Demo Flying Club",
      shortName: "Demo Flying Club",
      fullName: "Demo Flying Club",
      legalName: "Demo Flying Club",
      division: "Aviation",
      preset: "Demo Flying Club Style v1",
      founded: "Demo Customer",
      headerLogoUrl: "",
      footerLogoUrl: "",
      backgroundUrl: "",
      bannerTowUrl: "",
      announcement: "Demo site editor preview.",
      heroSubhead: "A sample customer site for testing SyncEtc modules, roles, and customer-specific styling.",
      footerText: "Demo customer footer text. This area should later come from customer configuration.",
      social: {},
      theme: {
        navy: "#153e66",
        navyDark: "#09233d",
        blue: "#327fbd",
        sky: "#edf7ff",
        text: "#1e2933",
        muted: "#5d6b78"
      }
    }
  };

  const KEY_ALIASES = {
    "150th_aero": "150th Aero Flying Club",
    "150th Aero": "150th Aero Flying Club",
    "demo_flying_club": "Demo Flying Club",
    "Demo Flying Club": "Demo Flying Club"
  };

  function clean(v){ return v == null ? "" : String(v).trim(); }

  function resolveCustomerName(keyOrName){
    const raw = clean(keyOrName) || "Demo Flying Club";
    return KEY_ALIASES[raw] || raw;
  }

  function getCustomerConfig(customerKeyOrName, overrides) {
    const name = resolveCustomerName(customerKeyOrName);
    const base = DEFAULT_CUSTOMERS[name] || DEFAULT_CUSTOMERS["Demo Flying Club"];
    const merged = Object.assign({}, base, overrides || {});
    merged.theme = Object.assign({}, base.theme || {}, (overrides && overrides.theme) || {});
    return merged;
  }

  function applyCustomerCssVars(rootEl, customerConfig) {
    const U = window.SyncEtc.Components.Utils;
    const c = U.normalizeCustomerConfig(customerConfig);
    const theme = c.theme || {};
    const target = rootEl || document.documentElement;

    target.style.setProperty("--se-aero-navy", theme.navy || "#12365a");
    target.style.setProperty("--se-aero-navy-dark", theme.navyDark || "#0b2744");
    target.style.setProperty("--se-aero-blue", theme.blue || "#2f80c4");
    target.style.setProperty("--se-aero-sky", theme.sky || "#eaf5ff");
    target.style.setProperty("--se-aero-text", theme.text || "#1e2933");
    target.style.setProperty("--se-aero-muted", theme.muted || "#5d6b78");
    target.style.setProperty("--se-customer-bg", c.backgroundUrl ? "url('" + U.cssUrl(c.backgroundUrl) + "')" : "none");
  }

  window.SyncEtc.Components.CustomerStyle = {
    customers: DEFAULT_CUSTOMERS,
    getCustomerConfig: getCustomerConfig,
    applyCustomerCssVars: applyCustomerCssVars,
    version: "COMPONENT-customer-style-v2"
  };
})();
/* COMPONENT-customer-style-v2.js - END */
