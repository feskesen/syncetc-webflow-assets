/* COMPONENT-shared-utils-v1.js - BEGIN */
(function () {
  "use strict";

  window.SyncEtc = window.SyncEtc || {};
  window.SyncEtc.Components = window.SyncEtc.Components || {};

  const Utils = {
    esc(value) {
      return String(value == null ? "" : value).replace(/[&<>"']/g, function (m) {
        return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m];
      });
    },

    cssUrl(value) {
      return String(value || "").replace(/"/g, "%22").replace(/'/g, "%27");
    },

    bool(value, fallback) {
      if (value === undefined || value === null || value === "") return !!fallback;
      if (typeof value === "boolean") return value;
      const v = String(value).trim().toLowerCase();
      return v === "true" || v === "yes" || v === "1" || v === "on";
    },

    installStyle(styleId, cssText) {
      if (document.getElementById(styleId)) return;
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = cssText;
      document.head.appendChild(style);
    },

    dispatch(name, detail) {
      document.dispatchEvent(new CustomEvent(name, { detail: detail || {} }));
    },

    pageLabel(pageKey, pages) {
      const found = (pages || []).find(function (p) { return p.key === pageKey; });
      return found ? found.label : pageKey;
    },

    normalizeCustomerConfig(customerConfig) {
      const c = customerConfig || {};
      c.shortName = c.shortName || c.customerName || "Customer";
      c.fullName = c.fullName || c.customerName || c.shortName;
      c.founded = c.founded || "";
      c.division = c.division || "";
      c.preset = c.preset || "Default Style";
      c.headerLogoUrl = c.headerLogoUrl || "";
      c.footerLogoUrl = c.footerLogoUrl || c.headerLogoUrl || "";
      c.backgroundUrl = c.backgroundUrl || "";
      c.announcement = c.announcement || "";
      c.bannerTowUrl = c.bannerTowUrl || "";
      c.bannerPlaneScale = c.bannerPlaneScale || "large";
      c.social = c.social || {};
      return c;
    }
  };

  window.SyncEtc.Components.Utils = Utils;
})();
/* COMPONENT-shared-utils-v1.js - END */
