/* COMPONENT-customer-style-v1.js - BEGIN */
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
    }
  };

  function getCustomerConfig(customerKeyOrName, overrides) {
    const key = customerKeyOrName || "150th Aero Flying Club";
    const base = DEFAULT_CUSTOMERS[key] || DEFAULT_CUSTOMERS["150th Aero Flying Club"];
    return Object.assign({}, base, overrides || {});
  }

  function applyCustomerCssVars(rootEl, customerConfig) {
    const c = window.SyncEtc.Components.Utils.normalizeCustomerConfig(customerConfig);
    const theme = c.theme || {};
    const target = rootEl || document.documentElement;

    target.style.setProperty("--se-aero-navy", theme.navy || "#12365a");
    target.style.setProperty("--se-aero-navy-dark", theme.navyDark || "#0b2744");
    target.style.setProperty("--se-aero-blue", theme.blue || "#2f80c4");
    target.style.setProperty("--se-aero-sky", theme.sky || "#eaf5ff");
    target.style.setProperty("--se-aero-text", theme.text || "#1e2933");
    target.style.setProperty("--se-aero-muted", theme.muted || "#5d6b78");
    target.style.setProperty("--se-customer-bg", c.backgroundUrl ? "url('" + window.SyncEtc.Components.Utils.cssUrl(c.backgroundUrl) + "')" : "none");
  }

  window.SyncEtc.Components.CustomerStyle = {
    customers: DEFAULT_CUSTOMERS,
    getCustomerConfig: getCustomerConfig,
    applyCustomerCssVars: applyCustomerCssVars
  };
})();
/* COMPONENT-customer-style-v1.js - END */
