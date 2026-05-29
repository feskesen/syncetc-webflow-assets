/* COMPONENT-customer-style-v2.js - BEGIN */
(function () {
  "use strict";

  window.SyncEtc = window.SyncEtc || {};
  window.SyncEtc.Components = window.SyncEtc.Components || {};

  const DEFAULT_CUSTOMERS = {
    "150th_aero": {
      customerKey: "150th_aero",
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
      heroHeadline: "Welcome to\nThe 150th Aero Flying Club",
      heroSubhead: "A member-operated flying club dedicated to keeping general aviation safe, affordable, and accessible.",
      announcement: "Vote results: N150TH will receive avionics upgrades similar to N123GG. Aiming for Winter upgrade.",
      bannerPlaneScale: "xl",
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

    "demo_flying_club": {
      customerKey: "demo_flying_club",
      customerName: "Demo Flying Club",
      shortName: "Demo Flying Club",
      fullName: "Demo Flying Club",
      legalName: "Demo Flying Club",
      division: "Aviation",
      preset: "Demo Aviation Style v1",
      founded: "Demo Site",
      headerLogoUrl: "",
      footerLogoUrl: "",
      backgroundUrl: "",
      bannerTowUrl: "",
      heroHeadline: "Welcome to\nDemo Flying Club",
      heroSubhead: "A sample flying club site used for SyncEtc testing and demos.",
      announcement: "Demo site content only. Replace with customer-specific announcements.",
      bannerPlaneScale: "md",
      social: {},
      theme: {
        navy: "#12365a",
        navyDark: "#0b2744",
        blue: "#2f80c4",
        sky: "#eaf5ff",
        text: "#1e2933",
        muted: "#5d6b78"
      }
    }
  };

  function clean(v) {
    return v == null ? "" : String(v).trim();
  }

  function keyify(v) {
    return clean(v).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  }

  function displayNameFromKey(key) {
    const cleanKey = clean(key);
    return cleanKey ? cleanKey.replace(/_/g, " ").replace(/\b\w/g, function (m) { return m.toUpperCase(); }) : "Customer";
  }

  function makeGenericCustomer(keyOrName) {
    const key = keyify(keyOrName) || "demo_flying_club";
    const name = displayNameFromKey(key);
    return {
      customerKey: key,
      customerName: name,
      shortName: name,
      fullName: name,
      legalName: name,
      division: "Aviation",
      preset: "Generic SyncEtc Aviation Style v1",
      founded: "Customer Site",
      headerLogoUrl: "",
      footerLogoUrl: "",
      backgroundUrl: "",
      bannerTowUrl: "",
      heroHeadline: "Welcome to\n" + name,
      heroSubhead: "A customer-powered SyncEtc site.",
      announcement: "",
      bannerPlaneScale: "md",
      social: {},
      theme: {
        navy: "#12365a",
        navyDark: "#0b2744",
        blue: "#2f80c4",
        sky: "#eaf5ff",
        text: "#1e2933",
        muted: "#5d6b78"
      }
    };
  }

  function findCustomer(customerKeyOrName) {
    const raw = clean(customerKeyOrName);
    const key = keyify(raw);

    if (DEFAULT_CUSTOMERS[raw]) return DEFAULT_CUSTOMERS[raw];
    if (DEFAULT_CUSTOMERS[key]) return DEFAULT_CUSTOMERS[key];

    const names = Object.keys(DEFAULT_CUSTOMERS);
    for (let i = 0; i < names.length; i++) {
      const item = DEFAULT_CUSTOMERS[names[i]];
      if (keyify(item.customerName) === key || keyify(item.shortName) === key || keyify(item.fullName) === key) return item;
    }

    return makeGenericCustomer(raw || "demo_flying_club");
  }

  function getCustomerConfig(customerKeyOrName, overrides) {
    const base = findCustomer(customerKeyOrName || "demo_flying_club");
    const merged = Object.assign({}, base, overrides || {});
    merged.theme = Object.assign({}, base.theme || {}, overrides && overrides.theme || {});
    merged.social = Object.assign({}, base.social || {}, overrides && overrides.social || {});
    return merged;
  }

  function applyCustomerCssVars(rootEl, customerConfig) {
    const U = window.SyncEtc.Components.Utils;
    const c = U && U.normalizeCustomerConfig ? U.normalizeCustomerConfig(customerConfig) : customerConfig || {};
    const theme = c.theme || {};
    const target = rootEl || document.documentElement;

    target.style.setProperty("--se-aero-navy", theme.navy || "#12365a");
    target.style.setProperty("--se-aero-navy-dark", theme.navyDark || "#0b2744");
    target.style.setProperty("--se-aero-blue", theme.blue || "#2f80c4");
    target.style.setProperty("--se-aero-sky", theme.sky || "#eaf5ff");
    target.style.setProperty("--se-aero-text", theme.text || "#1e2933");
    target.style.setProperty("--se-aero-muted", theme.muted || "#5d6b78");
    target.style.setProperty("--se-customer-bg", c.backgroundUrl ? "url('" + (U && U.cssUrl ? U.cssUrl(c.backgroundUrl) : clean(c.backgroundUrl).replace(/'/g, "\\'")) + "')" : "none");
  }

  window.SyncEtc.Components.CustomerStyle = {
    customers: DEFAULT_CUSTOMERS,
    getCustomerConfig: getCustomerConfig,
    applyCustomerCssVars: applyCustomerCssVars,
    version: "COMPONENT-customer-style-v2"
  };
})();
/* COMPONENT-customer-style-v2.js - END */
