/* COMPONENT-base-styles-v1.js - BEGIN */
(function () {
  "use strict";

  window.SyncEtc = window.SyncEtc || {};
  window.SyncEtc.Components = window.SyncEtc.Components || {};

  function install() {
    const U = window.SyncEtc.Components.Utils;
    U.installStyle("COMPONENT-base-styles-v1", `
      :root {
        --se-aero-navy:#12365a;
        --se-aero-navy-dark:#0b2744;
        --se-aero-blue:#2f80c4;
        --se-aero-sky:#eaf5ff;
        --se-aero-card:rgba(255,255,255,.94);
        --se-aero-card-soft:rgba(255,255,255,.84);
        --se-aero-border:rgba(18,54,90,.16);
        --se-aero-text:#1e2933;
        --se-aero-muted:#5d6b78;
        --se-aero-shadow:0 18px 50px rgba(12,38,64,.22);
        --se-aero-radius-xl:26px;
        --se-aero-radius-lg:18px;
        --se-aero-radius-md:12px;
      }

      .syncetc-shell {
        min-height:100vh;
        font-family:Arial, Helvetica, sans-serif;
        color:var(--se-aero-text);
        background:linear-gradient(rgba(240,247,252,.78),rgba(240,247,252,.80)), var(--se-customer-bg);
        background-position:center;
        background-size:cover;
        background-attachment:fixed;
        padding:10px 0 48px;
        box-sizing:border-box;
      }

      .syncetc-shell * { box-sizing:border-box; }

      .se-component-version {
        position:fixed;
        right:12px;
        top:12px;
        z-index:999999;
        padding:8px 11px;
        border-radius:999px;
        background:var(--se-aero-navy);
        color:#fff;
        font-size:12px;
        font-weight:900;
        box-shadow:0 8px 24px rgba(0,0,0,.25);
        pointer-events:none;
      }

      .se-topline {
        max-width:1180px;
        margin:0 auto 8px;
        padding:0 18px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:10px;
        color:var(--se-aero-navy);
        font-size:11px;
        font-weight:900;
      }

      .se-topline span {
        background:rgba(255,255,255,.72);
        border:1px solid var(--se-aero-border);
        border-radius:999px;
        padding:6px 9px;
      }

      .site-page-wrap {
        max-width:1180px;
        margin:0 auto 26px;
        padding:0 18px;
      }

      @media (max-width:720px) {
        .site-page-wrap { padding-left:12px; padding-right:12px; }
      }
    `);
  }

  window.SyncEtc.Components.BaseStyles = { install: install };
})();
/* COMPONENT-base-styles-v1.js - END */
