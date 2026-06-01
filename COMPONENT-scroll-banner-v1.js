/* COMPONENT-scroll-banner-v1.js - BEGIN */
(function () {
  "use strict";

  window.SyncEtc = window.SyncEtc || {};
  window.SyncEtc.Components = window.SyncEtc.Components || {};

  function installStyles() {
    const U = window.SyncEtc.Components.Utils;
    U.installStyle("COMPONENT-scroll-banner-v1-style", `
      .aero-marquee { position:relative; left:50%; width:100vw; max-width:100vw; margin:-2px 0 18px -50vw; padding:0; overflow:hidden; }
      .aero-marquee-view { width:100%; max-width:100%; overflow:hidden; position:relative; min-height:92px; display:flex; align-items:center; }
      .aero-marquee-track { display:inline-flex; align-items:center; width:max-content; min-width:max-content; white-space:nowrap; animation:aeroMarqueeTrackMovePause 34s linear infinite; will-change:transform; }
      .aero-marquee:hover .aero-marquee-track { animation-play-state:paused; }
      .aero-marquee-plane { height:112px; width:auto; margin-right:18px; flex:0 0 auto; filter:drop-shadow(0 7px 9px rgba(12,38,64,.24)); transform:translateY(2px); }
      .aero-marquee-plane.scale-medium { height:82px; }
      .aero-marquee-plane.scale-large { height:112px; }
      .aero-marquee-plane.scale-xl { height:132px; }
      .aero-marquee-text { display:inline-flex; align-items:center; padding:10px 24px; min-height:40px; border-radius:2px; background:rgba(207,220,228,.92); border:1px solid rgba(18,54,90,.38); color:#31465a; font-size:17px; font-weight:900; letter-spacing:.02em; box-shadow:0 5px 12px rgba(12,38,64,.14); }

      @keyframes aeroMarqueeTrackMovePause {
        0%{transform:translateX(100vw);}
        17%{transform:translateX(calc(50vw - 50%));}
        73%{transform:translateX(calc(50vw - 50%));}
        100%{transform:translateX(-125%);}
      }

      @media (max-width:720px){
        .aero-marquee-view{min-height:76px;}
        .aero-marquee-plane{height:86px;}
        .aero-marquee-plane.scale-medium{height:68px;}
        .aero-marquee-plane.scale-large{height:86px;}
        .aero-marquee-plane.scale-xl{height:98px;}
        .aero-marquee-text{font-size:14px;min-height:34px;padding:8px 14px;}
      }
    `);
  }

  function render(ctx) {
    installStyles();
    const U = window.SyncEtc.Components.Utils;
    const customer = U.normalizeCustomerConfig(ctx.customer || {});
    if (ctx.showBanner === false) return "";
    const scale = ["medium", "large", "xl"].indexOf(String(customer.bannerPlaneScale || "large")) >= 0 ? String(customer.bannerPlaneScale || "large") : "large";
    const img = customer.bannerTowUrl ? '<img class="aero-marquee-plane scale-' + U.esc(scale) + '" src="' + U.esc(customer.bannerTowUrl) + '" alt="Banner tow plane">' : "";
    return `<div class="aero-marquee" data-se-component="scroll-banner"><div class="aero-marquee-view"><div class="aero-marquee-track">${img}<div class="aero-marquee-text">${U.esc(customer.announcement)}</div></div></div></div>`;
  }

  window.SyncEtc.Components.ScrollBanner = { render: render, installStyles: installStyles };
})();
/* COMPONENT-scroll-banner-v1.js - END */
