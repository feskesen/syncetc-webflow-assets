/* syncetc-homepage-v27-media-quality-banner-center.js - BEGIN */
(function () {
  "use strict";

  const VERSION = "JS v27-media-quality-banner-center";
  const FILE_NAME = "syncetc-homepage-v27-media-quality-banner-center.js";
  const MOUNT_ID = "syncetc-webflow-mount";
  const ROOT_ID = "syncetc-v27-root";
  const STYLE_ID = "syncetc-v27-style";

  const CUSTOMER_DEFAULTS = {
    "150th Aero Flying Club": {
      shortName: "150th Aero",
      division: "Aviation",
      preset: "150th Aero Style v1",
      founded: "Founded in 1960",
      headerLogoUrl: "https://ocdaohkiwonjmirqkjww.supabase.co/storage/v1/object/public/public-site-assets/150thAero/FINAL_SQUARE_LOGO_TRANSPARENT-p-130x130q80.png",
      footerLogoUrl: "https://ocdaohkiwonjmirqkjww.supabase.co/storage/v1/object/public/public-site-assets/150thAero/FINAL_LOGO_PLANE_ONLY_TRANSPARENT-p-130x130q80.png",
      backgroundUrl: "https://ocdaohkiwonjmirqkjww.supabase.co/storage/v1/object/public/public-site-assets/150thAero/Cockpit.webp",
      featuredImageUrl: "https://ocdaohkiwonjmirqkjww.supabase.co/storage/v1/object/public/public-site-assets/150thAero/About.png",
      featuredImageFit: "cover",
      featuredImageHeight: "tall",
      featuredImagePosition: "center center",
      featuredImageCaptionVisible: "true",
      bannerPlaneScale: "xl",
      bannerPauseMode: "center",
      bannerTowUrl: "https://ocdaohkiwonjmirqkjww.supabase.co/storage/v1/object/public/public-site-assets/150thAero/Bannertow.png",
      heroEyebrow: "Founded in 1960",
      heroHeadline: "Welcome to\nThe 150th Aero Flying Club",
      heroSubhead: "A member-operated flying club dedicated to keeping general aviation safe, affordable, and accessible.",
      missionText: "The 150th Aero Flying Club, Inc. is a 501(c)(7) not-for-profit flying club dedicated to keeping general aviation safe, affordable, and accessible. Since 1960, we’ve built a strong community of qualified aviators committed to excellence in flight through shared access to well-maintained aircraft, continuing engagement, and active participation in Club operations.",
      statOne: "1960",
      statOneText: "Founded by aviation-minded members of the 150th Air National Guard.",
      statTwo: "KMMU / KSMQ",
      statTwoText: "Operating from Morristown Municipal Airport and Somerset Airport.",
      statThree: "FOUR",
      statThreeText: "Club aircraft currently available to qualified members.",
      announcement: "Vote results: N150TH will receive avionics upgrades similar to N123GG. Aiming for Winter upgrade.",
      social: {
        youtube: "https://www.youtube.com/@150thAero",
        instagram: "https://www.instagram.com/150thaero/",
        facebook: "https://www.facebook.com/150thAeroFlyingClub/"
      }
    },
    "Test Customer": {
      shortName: "Test Customer",
      division: "Operations",
      preset: "Operations Demo Style",
      founded: "Prototype customer",
      headerLogoUrl: "",
      footerLogoUrl: "",
      backgroundUrl: "https://ocdaohkiwonjmirqkjww.supabase.co/storage/v1/object/public/public-site-assets/TestCustomer/Background-smart.jpeg",
      featuredImageUrl: "https://ocdaohkiwonjmirqkjww.supabase.co/storage/v1/object/public/public-site-assets/TestCustomer/Background-smart.jpeg",
      featuredImageFit: "cover",
      featuredImageHeight: "normal",
      featuredImagePosition: "center center",
      featuredImageCaptionVisible: "true",
      bannerPlaneScale: "medium",
      bannerPauseMode: "center",
      bannerTowUrl: "",
      heroEyebrow: "Operations portal",
      heroHeadline: "A configurable operations site",
      heroSubhead: "The same renderer supports a different customer, different background asset, and different page focus.",
      missionText: "This customer demonstrates that visual assets and page settings can change independently of the renderer.",
      statOne: "1",
      statOneText: "Shared renderer.",
      statTwo: "MANY",
      statTwoText: "Possible verticals.",
      statThree: "SAFE",
      statThreeText: "Bounded controls only.",
      announcement: "Test Customer announcement banner. This proves the banner module is reusable, not hardcoded to 150th Aero.",
      social: {}
    }
  };

  const state = {
    customer: "150th Aero Flying Club",
    page: "home",
    audience: "public",
    controlsSide: "left",
    showControls: true,
    showBanner: true,
    local: {}
  };

  const pages = [
    ["home", "Home"],
    ["events", "Events"],
    ["documents", "Documents"],
    ["gallery", "Gallery"],
    ["roster", "Roster"],
    ["member", "Member Dashboard"],
    ["admin", "Admin Dashboard"]
  ];

  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>\"']/g, function (m) {
      return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m];
    });
  }

  function cssUrl(v) { return String(v || "").replace(/\"/g, "%22"); }
  function currentBase() { return Object.assign({}, CUSTOMER_DEFAULTS[state.customer] || CUSTOMER_DEFAULTS["150th Aero Flying Club"], state.local); }
  function currentPageLabel() { const p = pages.find(x => x[0] === state.page); return p ? p[1] : "Home"; }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      :root { --aero-navy:#12365a; --aero-navy-dark:#0b2744; --aero-blue:#2f80c4; --aero-sky:#eaf5ff; --aero-card:rgba(255,255,255,.94); --aero-card-soft:rgba(255,255,255,.84); --aero-border:rgba(18,54,90,.16); --aero-text:#1e2933; --aero-muted:#5d6b78; --aero-shadow:0 18px 50px rgba(12,38,64,.22); --aero-radius-xl:26px; --aero-radius-lg:18px; --aero-radius-md:12px; }
      .syncetc-v27 { min-height:100vh; font-family:Arial, Helvetica, sans-serif; color:var(--aero-text); background:linear-gradient(rgba(240,247,252,.78),rgba(240,247,252,.80)), var(--se-customer-bg); background-position:center; background-size:cover; background-attachment:fixed; padding:10px 0 48px; box-sizing:border-box; }
      .syncetc-v27 * { box-sizing:border-box; }
      .se-v27-version { position:fixed; right:12px; top:12px; z-index:999999; padding:8px 11px; border-radius:999px; background:#12365a; color:#fff; font-size:12px; font-weight:900; box-shadow:0 8px 24px rgba(0,0,0,.25); pointer-events:none; }
      .se-v27-topline { max-width:1180px; margin:0 auto 8px; padding:0 18px; display:flex; justify-content:space-between; align-items:center; gap:10px; color:#12365a; font-size:11px; font-weight:900; }
      .se-v27-topline span { background:rgba(255,255,255,.72); border:1px solid var(--aero-border); border-radius:999px; padding:6px 9px; }

      .se-workbench { max-width:1180px; margin:8px auto 16px; padding:0 18px; }
      .se-workbench-shell { background:rgba(255,255,255,.96); border:1px solid var(--aero-border); border-radius:22px; box-shadow:var(--aero-shadow); overflow:hidden; }
      .se-workbench-head { display:flex; justify-content:space-between; gap:16px; align-items:flex-start; padding:16px 18px; background:linear-gradient(135deg,#12365a,#2f80c4); color:#fff; }
      .se-workbench-head h2 { margin:0; font-size:20px; line-height:1.1; color:#fff; }
      .se-workbench-head p { margin:5px 0 0; color:rgba(255,255,255,.88); font-size:13px; line-height:1.35; }
      .se-workbench-badges { display:flex; flex-wrap:wrap; gap:6px; justify-content:flex-end; }
      .se-workbench-badges span { background:rgba(255,255,255,.90); color:#12365a; border-radius:999px; padding:6px 9px; font-size:11px; font-weight:900; white-space:nowrap; }
      .se-workbench-grid { display:grid; grid-template-columns:minmax(300px,.45fr) minmax(0,.55fr); gap:0; }
      .se-workbench-grid.right { grid-template-columns:minmax(0,.55fr) minmax(300px,.45fr); }
      .se-controls { padding:16px; border-right:1px solid var(--aero-border); background:#f8fbff; }
      .se-workbench-grid.right .se-controls { border-right:none; border-left:1px solid var(--aero-border); order:2; }
      .se-mini-preview { padding:16px; background:#fff; }
      .se-controls h3, .se-mini-preview h3 { margin:0 0 8px; color:#12365a; font-size:15px; }
      .se-control-row { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px; }
      .se-control { display:block; }
      .se-control label { display:block; margin-bottom:5px; color:#12365a; font-size:11px; font-weight:900; letter-spacing:.02em; text-transform:uppercase; }
      .se-control input, .se-control select, .se-control textarea { width:100%; border:1px solid rgba(18,54,90,.20); border-radius:11px; padding:9px 10px; font:inherit; font-size:13px; background:#fff; color:#1e2933; }
      .se-control textarea { min-height:74px; resize:vertical; }
      .se-control small { display:block; margin-top:4px; color:#657789; font-size:11px; line-height:1.25; }
      .se-action-row { display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; }
      .se-action-row button { border:1px solid rgba(18,54,90,.20); border-radius:999px; padding:9px 12px; background:#12365a; color:#fff; font-weight:900; cursor:pointer; }
      .se-action-row button.secondary { background:#fff; color:#12365a; }
      .se-preview-card { border:1px solid var(--aero-border); border-radius:18px; overflow:hidden; background:var(--aero-card); box-shadow:0 10px 28px rgba(12,38,64,.12); }
      .se-preview-hero { padding:20px; color:#fff; background:linear-gradient(135deg,rgba(18,54,90,.96),rgba(47,128,196,.88)); }
      .se-preview-hero h4 { margin:5px 0 8px; font-size:25px; line-height:1.05; letter-spacing:-.035em; white-space:pre-line; color:#fff; }
      .se-preview-hero p { margin:0; line-height:1.5; color:rgba(255,255,255,.92); }
      .se-preview-body { padding:14px; }
      .se-preview-pills { display:flex; gap:8px; flex-wrap:wrap; }
      .se-preview-pills span { border:1px solid var(--aero-border); border-radius:999px; padding:7px 9px; background:#fff; color:#12365a; font-size:12px; font-weight:900; }

      .club-header-wrapper { max-width:1180px; margin:0 auto 16px; padding:0 18px; color:var(--aero-text); }
      .club-header-card { display:grid; grid-template-columns:168px minmax(0,1fr); background:var(--aero-card); border:1px solid var(--aero-border); border-radius:var(--aero-radius-xl); box-shadow:var(--aero-shadow); overflow:visible; backdrop-filter:blur(8px); }
      .club-logo-column { display:flex; align-items:center; justify-content:center; padding:10px; border-right:1px solid var(--aero-border); background:linear-gradient(180deg,rgba(234,245,255,.96),rgba(255,255,255,.86)); border-radius:var(--aero-radius-xl) 0 0 var(--aero-radius-xl); }
      .club-logo-panel { width:100%; min-height:100%; display:flex; align-items:center; justify-content:center; padding:10px; border-radius:18px; background:#fff; border:1px solid rgba(18,54,90,.14); box-shadow:0 8px 20px rgba(12,38,64,.11); }
      .club-logo { max-width:130px; max-height:146px; object-fit:contain; }
      .club-header-top { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:14px; align-items:center; padding:7px 16px; background:linear-gradient(135deg,rgba(18,54,90,.96),rgba(47,128,196,.88)); border-radius:0 var(--aero-radius-xl) 13px 0; color:#fff; }
      .club-brand-line { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
      .club-name { color:#fff; font-size:clamp(22px,2.55vw,32px); font-weight:800; letter-spacing:-.035em; line-height:.98; }
      .club-founded { display:inline-flex; padding:4px 10px; border-radius:999px; background:rgba(255,255,255,.16); border:1px solid rgba(255,255,255,.24); color:rgba(255,255,255,.90); font-size:10px; font-weight:900; letter-spacing:.08em; text-transform:uppercase; white-space:nowrap; }
      .club-auth-buttons { display:flex; justify-content:flex-end; gap:7px; flex-wrap:wrap; }
      .club-auth-btn { min-height:31px; padding:6px 13px; border-radius:999px; border:1px solid rgba(255,255,255,.32); font-weight:800; font-size:12.5px; }
      .club-auth-btn.login { background:#fff; color:#12365a; } .club-auth-btn.logout { background:rgba(255,255,255,.14); color:#fff; }
      .club-nav-stack { display:flex; flex-direction:column; gap:4px; padding:7px 10px 8px; background:rgba(255,255,255,.72); border-radius:0 0 var(--aero-radius-xl) 0; }
      .club-nav-row { display:flex; justify-content:center; }
      .club-nav-inner { width:100%; display:flex; align-items:center; gap:8px; padding:4px 8px; border-radius:999px; border:1px solid var(--aero-border); box-shadow:0 3px 9px rgba(12,38,64,.045); }
      .club-nav-label { display:inline-flex; min-width:58px; justify-content:center; padding:3px 8px; border-radius:999px; font-size:9.5px; font-weight:900; letter-spacing:.08em; text-transform:uppercase; }
      .club-nav-links { display:flex; flex:1; flex-wrap:wrap; gap:3px 6px; justify-content:center; align-items:center; }
      .club-nav-link { display:inline-flex; min-height:22px; align-items:center; padding:3px 8px; border-radius:999px; color:var(--aero-navy); font-size:12.5px; font-weight:800; text-decoration:none; white-space:nowrap; }
      .club-nav-link.is-active { background:var(--aero-navy); color:#fff !important; box-shadow:0 5px 13px rgba(18,54,90,.16); }
      .club-nav-row.public .club-nav-inner { background:rgba(255,255,255,.92); } .club-nav-row.public .club-nav-label { background:var(--aero-sky); color:var(--aero-navy); }
      .club-nav-row.member .club-nav-inner { background:linear-gradient(180deg,rgba(234,245,255,.96),rgba(255,255,255,.88)); } .club-nav-row.member .club-nav-label { background:var(--aero-navy); color:#fff; }
      .club-nav-row.board .club-nav-inner { background:linear-gradient(180deg,rgba(255,247,236,.98),rgba(255,255,255,.90)); border-color:rgba(138,77,0,.18); } .club-nav-row.board .club-nav-label { background:#8a4d00; color:#fff; } .club-nav-row.board .club-nav-link { color:#7a4300; }
      .club-board-alert-row .club-nav-inner { background:linear-gradient(180deg,rgba(254,226,226,.98),rgba(255,247,247,.94)); border-color:rgba(153,27,27,.28); border-radius:16px; }
      .club-board-alert-row .club-nav-label { background:#991b1b; color:#fff; }
      .club-board-alert-row .club-nav-link { color:#991b1b; background:#fff; border:1px solid rgba(153,27,27,.25); }
      .se-hidden-by-audience { display:none !important; }

      .aero-marquee { position:relative; left:50%; width:100vw; max-width:100vw; margin:-2px 0 18px -50vw; padding:0; overflow:hidden; }
      .aero-marquee-view { width:100%; max-width:100%; overflow:hidden; position:relative; min-height:92px; display:flex; align-items:center; }
      .aero-marquee-track { display:inline-flex; align-items:center; width:max-content; min-width:max-content; white-space:nowrap; animation:aeroMarqueeTrackMovePause 34s linear infinite; will-change:transform; }
      .aero-marquee:hover .aero-marquee-track { animation-play-state:paused; }
      .aero-marquee-plane { height:112px; width:auto; margin-right:18px; flex:0 0 auto; filter:drop-shadow(0 7px 9px rgba(12,38,64,.24)); transform:translateY(2px); }
      .aero-marquee-plane.scale-medium { height:82px; }
      .aero-marquee-plane.scale-large { height:112px; }
      .aero-marquee-plane.scale-xl { height:132px; }
      .aero-marquee-text { display:inline-flex; align-items:center; padding:10px 24px; min-height:40px; border-radius:2px; background:rgba(207,220,228,.92); border:1px solid rgba(18,54,90,.38); color:#31465a; font-size:17px; font-weight:900; letter-spacing:.02em; box-shadow:0 5px 12px rgba(12,38,64,.14); }
      @keyframes aeroMarqueeTrackMovePause { 0%{transform:translateX(100vw);} 17%{transform:translateX(calc(50vw - 50%));} 73%{transform:translateX(calc(50vw - 50%));} 100%{transform:translateX(-125%);} }

      .site-page-wrap { max-width:1180px; margin:0 auto 26px; padding:0 18px; }
      .aero-home-shell { background:var(--aero-card); border:1px solid var(--aero-border); border-radius:var(--aero-radius-xl); box-shadow:var(--aero-shadow); overflow:hidden; backdrop-filter:blur(8px); }
      .aero-home-hero { padding:34px; color:#fff; background:linear-gradient(135deg,rgba(18,54,90,.96),rgba(47,128,196,.88)), radial-gradient(circle at top right,rgba(255,255,255,.34),transparent 36%); }
      .aero-home-eyebrow { display:inline-flex; margin-bottom:12px; padding:6px 12px; border-radius:999px; background:rgba(255,255,255,.16); border:1px solid rgba(255,255,255,.24); font-size:12px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; }
      .aero-home-hero h1 { margin:0; font-size:clamp(34px,5vw,58px); line-height:1.04; font-weight:800; letter-spacing:-.04em; color:#fff; white-space:pre-line; }
      .aero-home-hero p { max-width:820px; margin:14px 0 0; font-size:17px; line-height:1.65; color:rgba(255,255,255,.90); }
      .aero-home-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-top:26px; }
      .aero-home-stat { padding:14px 16px; border-radius:var(--aero-radius-md); background:rgba(255,255,255,.14); border:1px solid rgba(255,255,255,.22); }
      .aero-home-stat strong { display:block; margin-bottom:3px; font-size:22px; line-height:1; color:#fff; }
      .aero-home-stat span { display:block; font-size:13px; line-height:1.35; color:rgba(255,255,255,.82); }
      .aero-home-main { padding:26px; }
      .aero-section-label { display:inline-flex; margin-bottom:10px; padding:5px 10px; border-radius:999px; background:var(--aero-sky); color:var(--aero-navy); font-size:11px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
      .aero-featured-card, .aero-home-card { border-radius:var(--aero-radius-lg); background:var(--aero-card-soft); border:1px solid var(--aero-border); box-shadow:0 8px 24px rgba(12,38,64,.08); }
      .aero-featured-card { padding:22px; margin-bottom:22px; }
      .aero-featured-header { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:18px; align-items:start; margin-bottom:18px; }
      .aero-featured-header h2, .aero-home-card h2 { margin:0 0 10px; color:var(--aero-navy-dark); font-size:28px; line-height:1.12; font-weight:800; letter-spacing:-.025em; }
      .aero-featured-header p, .aero-home-card p { margin:0; font-size:15px; line-height:1.7; color:var(--aero-text); }
      .homepage-featured-slot { width:100%; height:var(--se-featured-height, 430px); min-height:320px; max-height:62vh; display:flex; align-items:center; justify-content:center; padding:14px; background:linear-gradient(180deg,rgba(234,245,255,.92),rgba(255,255,255,.86)); border:1px solid rgba(18,54,90,.13); border-radius:18px; overflow:hidden; }
      .homepage-featured-slot.featured-height-compact { --se-featured-height:320px; }
      .homepage-featured-slot.featured-height-normal { --se-featured-height:430px; }
      .homepage-featured-slot.featured-height-tall { --se-featured-height:540px; }
      .homepage-featured-image { display:block; width:100%; height:100%; max-width:100%; max-height:none; object-fit:var(--se-featured-fit, cover); object-position:var(--se-featured-position, center center); border-radius:16px; box-shadow:0 12px 30px rgba(12,38,64,.22); background:#fff; }
      .aero-home-grid { display:grid; grid-template-columns:minmax(0,1fr) minmax(360px,1fr); gap:22px; align-items:stretch; }
      .aero-home-card { padding:22px; display:flex; flex-direction:column; }
      .aero-button { display:inline-flex; align-items:center; justify-content:center; min-height:42px; padding:10px 16px; border-radius:999px; background:var(--aero-navy); color:#fff !important; border:1px solid rgba(255,255,255,.14); box-shadow:0 8px 18px rgba(18,54,90,.18); text-decoration:none; font-size:13px; font-weight:800; }
      .aero-button-secondary { background:#fff; color:var(--aero-navy)!important; border:1px solid rgba(18,54,90,.22); box-shadow:none; }
      .aero-note-strip { margin-top:22px; padding:16px 18px; border-radius:16px; background:rgba(18,54,90,.06); border:1px solid rgba(18,54,90,.12); color:var(--aero-muted); font-size:13px; line-height:1.55; }
      .page-placeholder { background:var(--aero-card); border:1px solid var(--aero-border); border-radius:var(--aero-radius-xl); box-shadow:var(--aero-shadow); overflow:hidden; }
      .page-placeholder .aero-home-hero { padding:30px; }
      .page-module-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:16px; padding:24px; }
      .page-module-card { border:1px solid var(--aero-border); border-radius:18px; padding:18px; background:var(--aero-card-soft); }
      .page-module-card h3 { margin:0 0 8px; color:var(--aero-navy-dark); font-size:18px; }
      .page-module-card p { margin:0; color:var(--aero-muted); line-height:1.5; font-size:14px; }
      .aero-footer-wrapper { max-width:1180px; margin:0 auto; padding:0 18px; }
      .aero-footer-shell { background:var(--aero-card); border:1px solid var(--aero-border); border-radius:var(--aero-radius-xl); box-shadow:var(--aero-shadow); overflow:hidden; backdrop-filter:blur(8px); }
      .aero-footer-top { display:grid; grid-template-columns:minmax(0,1.15fr) minmax(0,1fr); gap:22px; padding:24px; background:rgba(255,255,255,.72); }
      .aero-footer-brand-card, .aero-footer-links-card { background:var(--aero-card-soft); border:1px solid var(--aero-border); border-radius:var(--aero-radius-lg); padding:20px; box-shadow:0 8px 24px rgba(12,38,64,.08); }
      .aero-footer-brand-row { display:flex; align-items:center; gap:16px; }
      .aero-footer-logo-wrap { display:flex; align-items:center; justify-content:center; width:88px; height:68px; border-radius:18px; background:#fff; border:1px solid var(--aero-border); box-shadow:0 8px 20px rgba(12,38,64,.12); overflow:hidden; flex:0 0 auto; }
      .aero-footer-logo { max-width:78px; max-height:58px; object-fit:contain; }
      .aero-footer-title { margin:0; color:var(--aero-navy-dark); font-size:24px; line-height:1.08; font-weight:800; letter-spacing:-.025em; }
      .aero-footer-founded { display:inline-flex; margin-top:7px; padding:5px 10px; border-radius:999px; background:var(--aero-sky); color:var(--aero-navy); font-size:11px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
      .aero-footer-text { margin:16px 0 0; color:var(--aero-muted); font-size:14px; line-height:1.7; }
      .aero-footer-kicker { display:inline-flex; margin-bottom:10px; padding:5px 10px; border-radius:999px; background:var(--aero-sky); color:var(--aero-navy); font-size:11px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
      .aero-footer-link-grid, .aero-footer-social-grid { display:flex; flex-wrap:wrap; gap:8px; }
      .aero-footer-link, .aero-footer-social-link { display:inline-flex; align-items:center; justify-content:center; min-height:32px; padding:7px 11px; border-radius:999px; background:#fff; border:1px solid rgba(18,54,90,.16); color:var(--aero-navy); font-size:13px; font-weight:800; text-decoration:none; white-space:nowrap; }
      .aero-footer-bottom { padding:16px 24px; background:linear-gradient(135deg,rgba(18,54,90,.96),rgba(47,128,196,.88)); color:rgba(255,255,255,.88); display:grid; grid-template-columns:minmax(0,1fr) auto; gap:16px; align-items:center; font-size:12px; line-height:1.55; font-weight:700; }
      .aero-footer-disclaimer { margin:0; } .aero-footer-copyright { white-space:nowrap; text-align:right; }
      @media (max-width:980px){ .se-workbench-grid,.se-workbench-grid.right{grid-template-columns:1fr}.se-workbench-grid.right .se-controls{order:0;border-left:none}.se-controls{border-right:none;border-bottom:1px solid var(--aero-border)}.club-header-card{grid-template-columns:136px minmax(0,1fr)}.aero-home-grid,.aero-footer-top,.aero-footer-bottom{grid-template-columns:1fr}.aero-footer-copyright{text-align:left;white-space:normal}.page-module-grid{grid-template-columns:1fr 1fr} }
      @media (max-width:720px){ .club-header-card{display:block}.club-logo-column{border-right:none;border-radius:22px 22px 0 0;background:linear-gradient(135deg,rgba(18,54,90,.96),rgba(47,128,196,.88))}.club-logo{max-width:92px;max-height:70px}.club-header-top{grid-template-columns:1fr;border-radius:0}.club-nav-inner{align-items:flex-start;flex-direction:column;border-radius:16px}.club-nav-links{justify-content:flex-start}.aero-home-stats,.page-module-grid{grid-template-columns:1fr}.aero-featured-header{grid-template-columns:1fr}.se-control-row{grid-template-columns:1fr}.aero-home-hero{padding:26px 20px}.aero-home-main{padding:18px}.homepage-featured-slot{min-height:240px}.aero-footer-wrapper,.site-page-wrap,.club-header-wrapper,.se-workbench{padding-left:12px;padding-right:12px}.aero-marquee-view{min-height:76px}.aero-marquee-plane{height:86px}.aero-marquee-plane.scale-medium{height:68px}.aero-marquee-plane.scale-large{height:86px}.aero-marquee-plane.scale-xl{height:98px}.aero-marquee-text{font-size:14px;min-height:34px;padding:8px 14px} }
    `;
    document.head.appendChild(style);
  }

  function logoMarkup(base, which) {
    const url = which === "footer" ? base.footerLogoUrl : base.headerLogoUrl;
    if (url) return '<img src="' + esc(url) + '" alt="' + esc(base.shortName) + ' logo" class="' + (which === "footer" ? 'aero-footer-logo' : 'club-logo') + '">';
    return '<div style="width:62px;height:62px;border-radius:18px;background:linear-gradient(135deg,#12365a,#2f80c4);"></div>';
  }

  function navRows() {
    const page = state.page;
    const showMember = state.audience === "member" || state.audience === "admin";
    const showAdmin = state.audience === "admin";
    return `
      <nav class="club-nav-row public"><div class="club-nav-inner"><div class="club-nav-label">Public</div><div class="club-nav-links">
        ${link("home","Home")}${navLink("Info")}${navLink("Aircraft")}${link("events","Calendar")}${link("gallery","Gallery")}${navLink("Scheduler")}${navLink("Apply")}${navLink("Contact")}
      </div></div></nav>
      <nav class="club-nav-row member ${showMember ? '' : 'se-hidden-by-audience'}"><div class="club-nav-inner"><div class="club-nav-label">Member</div><div class="club-nav-links">
        ${link("member","Dashboard")}${link("roster","Roster")}${navLink("Submit to Gallery")}${navLink("Fun ▾")}${link("documents","Reference ▾")}${navLink("My Profile")}
      </div></div></nav>
      <nav class="club-nav-row board ${showAdmin ? '' : 'se-hidden-by-audience'}"><div class="club-nav-inner"><div class="club-nav-label">Admin</div><div class="club-nav-links">
        ${navLink("People ▾")}${link("events","Events ▾")}${navLink("Communications ▾")}${navLink("Aircraft ▾")}${link("documents","Records ▾")}${navLink("System ▾")}
      </div></div></nav>
      <nav class="club-board-alert-row ${showAdmin ? '' : 'se-hidden-by-audience'}"><div class="club-nav-inner"><div class="club-nav-label">Alerts</div><div class="club-nav-links"><a class="club-nav-link" href="#">Contact tracker needs attention (1)</a></div></div></nav>`;

    function navLink(label) { return '<a class="club-nav-link" href="#">' + esc(label) + '</a>'; }
    function link(key, label) { return '<a class="club-nav-link ' + (page === key ? 'is-active' : '') + '" href="#" data-se-page-link="' + esc(key) + '">' + esc(label) + '</a>'; }
  }

  function renderHeader(base) {
    return `<div class="club-header-wrapper"><header class="club-header-card">
      <div class="club-logo-column"><div class="club-logo-panel">${logoMarkup(base, "header")}</div></div>
      <div class="club-header-main"><div class="club-header-top"><div class="club-brand-text"><div class="club-brand-line"><div class="club-name">${esc(base.shortName === "150th Aero" ? "The 150th Aero Flying Club" : base.shortName)}</div><div class="club-founded">${esc(base.founded)}</div></div></div><div class="club-auth-buttons"><button class="club-auth-btn login">Login</button><button class="club-auth-btn logout">Logout</button></div></div>
      <div class="club-nav-stack">${navRows()}</div></div>
    </header></div>`;
  }

  function featuredHeightClass(base) {
    const value = String(base.featuredImageHeight || "tall").toLowerCase();
    return "featured-height-" + (["compact", "normal", "tall"].indexOf(value) >= 0 ? value : "tall");
  }

  function featuredFit(base) {
    const value = String(base.featuredImageFit || "cover").toLowerCase();
    return ["cover", "contain", "fill"].indexOf(value) >= 0 ? value : "cover";
  }

  function featuredPosition(base) {
    return String(base.featuredImagePosition || "center center");
  }

  function renderMarquee(base) {
    if (!state.showBanner) return "";
    const scale = ["medium", "large", "xl"].indexOf(String(base.bannerPlaneScale || "large")) >= 0 ? String(base.bannerPlaneScale || "large") : "large";
    const img = base.bannerTowUrl ? '<img class="aero-marquee-plane scale-' + esc(scale) + '" src="' + esc(base.bannerTowUrl) + '" alt="Banner tow plane">' : '';
    return `<div class="aero-marquee" data-se-banner-module="tow-plane"><div class="aero-marquee-view"><div class="aero-marquee-track">${img}<div class="aero-marquee-text">${esc(base.announcement)}</div></div></div></div>`;
  }

  function renderHome(base) {
    return `<div class="site-page-wrap"><section class="aero-home-shell">
      <section class="aero-home-hero"><div class="aero-home-eyebrow">${esc(base.heroEyebrow)}</div><h1>${esc(base.heroHeadline)}</h1><p>${esc(base.heroSubhead)}</p><div class="aero-home-stats">
        <div class="aero-home-stat"><strong>${esc(base.statOne)}</strong><span>${esc(base.statOneText)}</span></div>
        <div class="aero-home-stat"><strong>${esc(base.statTwo)}</strong><span>${esc(base.statTwoText)}</span></div>
        <div class="aero-home-stat"><strong>${esc(base.statThree)}</strong><span>${esc(base.statThreeText)}</span></div>
      </div></section>
      <main class="aero-home-main">
        <section class="aero-featured-card"><div class="aero-section-label">From Our Gallery</div><div class="aero-featured-header"><div><h2>Featured Photo</h2><p>A rotating look at Club aircraft, members, destinations, and flying activity.</p></div><a href="#" class="aero-button aero-button-secondary">View Full Gallery</a></div><div class="homepage-featured-slot ${featuredHeightClass(base)}" style="--se-featured-fit:${esc(featuredFit(base))};--se-featured-position:${esc(featuredPosition(base))};"><img class="homepage-featured-image" src="${esc(base.featuredImageUrl)}" alt="Featured photo"></div>${String(base.featuredImageCaptionVisible) === "true" ? `<div class="homepage-featured-meta" style="display:block;">Featured image display: ${esc(featuredFit(base))} / ${esc(base.featuredImageHeight || "tall")}</div>` : ""}</section>
        <section class="aero-home-grid"><article class="aero-home-card"><div class="aero-section-label">Club Mission</div><h2>Our Mission</h2><p>${esc(base.missionText)}</p><div style="margin-top:auto;padding-top:18px"><a href="#" class="aero-button">Apply for Membership</a></div></article><article class="aero-home-card"><div class="aero-section-label">Questions</div><h2>Contact Us</h2><p>For other inquiries, send us a message below.</p><div style="display:grid;gap:12px;margin-top:16px"><input class="se-control input" placeholder="Name"><input class="se-control input" placeholder="Email"><textarea class="se-control input" placeholder="Message" style="min-height:112px"></textarea><a href="#" class="aero-button">Send Message</a></div></article></section>
        <div class="aero-note-strip"><strong>Note:</strong> This site is intended as a general information resource for members, prospective members, and visitors. Current Club rules, aircraft status, membership requirements, and operating procedures should be confirmed through current Club documents or the Board.</div>
      </main></section></div>`;
  }

  function renderPageModules(base) {
    const label = currentPageLabel();
    const modules = {
      events: [["Calendar", "Meeting and fly-out listings with RSVP concepts."], ["RSVP", "Event attendance and supply planning workflows."], ["Admin event tools", "Create, duplicate, and manage event records."]],
      documents: [["Member Minutes", "Public/member/admin document visibility."], ["Rules & Resources", "Structured resources instead of static scattered files."], ["Document Editor", "Future SyncEtc editable source documents and published snapshots."]],
      gallery: [["Featured Gallery", "Approved public gallery media."], ["Member Upload", "Submission flow with board review."], ["Review Queue", "Admin approval and rejection workflow."]],
      roster: [["Member Directory", "Permission-aware roster and contact display."], ["Profiles", "Member-managed profile information."], ["Board Contacts", "Role-based public/member contact sections."]],
      member: [["Quick Links", "Dashboard cards for members."], ["Fun Modules", "Forum, heatmap, geography, and future club-specific tools."], ["Profile", "Self-service profile and settings area."]],
      admin: [["People", "Applicants, members, non-members."], ["Operations", "Events, aircraft, records, communications."], ["Settings", "Customer-scoped site and module settings."]]
    }[state.page] || [];
    return `<div class="site-page-wrap"><section class="page-placeholder"><section class="aero-home-hero"><div class="aero-home-eyebrow">${esc(base.preset)}</div><h1>${esc(label)}</h1><p>${esc(pageText(state.page))}</p></section><div class="page-module-grid">${modules.map(m => '<article class="page-module-card"><h3>' + esc(m[0]) + '</h3><p>' + esc(m[1]) + '</p></article>').join('')}</div></section></div>`;
  }

  function pageText(key) {
    return ({ events:"Events, calendar, RSVP, and meeting workflows rendered with the same 150th Aero style system.", documents:"Documents, minutes, rules, resources, and future editable source-document workflows.", gallery:"Public gallery, featured media, member upload, and admin review concepts.", roster:"Member directory and people pages with scoped visibility.", member:"Member portal landing page after login.", admin:"Customer admin dashboard concept for managing people, content, documents, events, and settings." })[key] || "";
  }

  function renderFooter(base) {
    return `<section class="aero-footer-wrapper"><footer class="aero-footer-shell"><div class="aero-footer-top"><div class="aero-footer-brand-card"><div class="aero-footer-brand-row"><div class="aero-footer-logo-wrap">${logoMarkup(base, "footer")}</div><div><h2 class="aero-footer-title">${esc(base.shortName === "150th Aero" ? "150th Aero Flying Club, Inc." : base.shortName)}</h2><div class="aero-footer-founded">${esc(base.founded)}</div></div></div><p class="aero-footer-text">Member-owned flying club based at Morristown Municipal Airport, providing aircraft access, aviation community, and practical member resources.</p><div style="margin-top:18px"><div class="aero-footer-kicker">Find us on socials</div><div class="aero-footer-social-grid"><a class="aero-footer-social-link" href="${esc(base.social.youtube || '#')}">YouTube</a><a class="aero-footer-social-link" href="${esc(base.social.instagram || '#')}">Instagram</a><a class="aero-footer-social-link" href="${esc(base.social.facebook || '#')}">Facebook</a></div></div></div><div class="aero-footer-links-card"><div class="aero-footer-kicker">Site Links</div><div class="aero-footer-link-grid"><a class="aero-footer-link" href="#" data-se-page-link="home">Home</a><a class="aero-footer-link" href="#">Info</a><a class="aero-footer-link" href="#">Aircraft</a><a class="aero-footer-link" href="#" data-se-page-link="events">Calendar</a><a class="aero-footer-link" href="#" data-se-page-link="gallery">Gallery</a><a class="aero-footer-link" href="#">Apply</a><a class="aero-footer-link" href="#">Contact</a></div><div style="margin-top:16px"><div class="aero-footer-kicker">Member Links</div><div class="aero-footer-link-grid"><a class="aero-footer-link" data-se-page-link="member" href="#">Dashboard</a><a class="aero-footer-link" data-se-page-link="roster" href="#">Roster</a><a class="aero-footer-link" href="#">Forum</a><a class="aero-footer-link" data-se-page-link="documents" href="#">Resources</a></div></div></div></div><div class="aero-footer-bottom"><p class="aero-footer-disclaimer">Website materials are provided for club communication and member convenience. Aircraft operation is governed by FAA regulations, club rules, aircraft documents, and applicable operating procedures.</p><div class="aero-footer-copyright">© 2025-2026 150th Aero Flying Club, Inc. All rights reserved.</div></div></footer></section>`;
  }

  function renderControls(base) {
    return `<div class="se-controls"><h3>Customer display controls</h3><div class="se-control-row"><label class="se-control"><label>Customer</label><select data-se-field="customer"><option ${state.customer === '150th Aero Flying Club' ? 'selected' : ''}>150th Aero Flying Club</option><option ${state.customer === 'Test Customer' ? 'selected' : ''}>Test Customer</option></select><small>Switches the customer-specific asset variables and copy.</small></label><label class="se-control"><label>Page</label><select data-se-field="page">${pages.map(p => '<option value="' + p[0] + '" ' + (state.page === p[0] ? 'selected' : '') + '>' + p[1] + '</option>').join('')}</select><small>Changes the rendered page body.</small></label></div><div class="se-control-row"><label class="se-control"><label>Audience</label><select data-se-field="audience"><option value="public" ${state.audience === 'public' ? 'selected' : ''}>Public</option><option value="member" ${state.audience === 'member' ? 'selected' : ''}>Member</option><option value="admin" ${state.audience === 'admin' ? 'selected' : ''}>Admin</option></select><small>Changes visible nav rows.</small></label><label class="se-control"><label>Controls side</label><select data-se-field="controlsSide"><option value="left" ${state.controlsSide === 'left' ? 'selected' : ''}>Left</option><option value="right" ${state.controlsSide === 'right' ? 'selected' : ''}>Right</option></select><small>Proof that the interface layout can change.</small></label></div><div class="se-control-row"><label class="se-control"><label>Style preset</label><select disabled><option>150th Aero Style v1</option><option>Future preset 2</option><option>Future preset 3</option><option>Future preset 4</option></select><small>Preset slots exist, but only v1 is active now.</small></label><label class="se-control"><label>Scrolling banner</label><select data-se-field="showBanner"><option value="true" ${state.showBanner ? 'selected' : ''}>On</option><option value="false" ${!state.showBanner ? 'selected' : ''}>Off</option></select><small>Reusable SyncEtc banner module.</small></label></div><div class="se-control-row"><label class="se-control"><label>Hero headline</label><textarea data-se-local="heroHeadline">${esc(base.heroHeadline)}</textarea><small>Changes immediately in customer view.</small></label><label class="se-control"><label>Customer-editable announcement text</label><textarea data-se-local="announcement">${esc(base.announcement)}</textarea><small>Feeds the banner text. This is a customer content setting, not a raw style-builder field.</small></label></div><div class="se-control-row"><label class="se-control"><label>Featured photo fit</label><select data-se-local="featuredImageFit"><option value="cover" ${base.featuredImageFit === 'cover' ? 'selected' : ''}>Cover frame</option><option value="contain" ${base.featuredImageFit === 'contain' ? 'selected' : ''}>Contain full image</option><option value="fill" ${base.featuredImageFit === 'fill' ? 'selected' : ''}>Stretch/fill</option></select><small>150th default is cover so the feature area feels intentional.</small></label><label class="se-control"><label>Featured photo height</label><select data-se-local="featuredImageHeight"><option value="compact" ${base.featuredImageHeight === 'compact' ? 'selected' : ''}>Compact</option><option value="normal" ${base.featuredImageHeight === 'normal' ? 'selected' : ''}>Normal</option><option value="tall" ${base.featuredImageHeight === 'tall' ? 'selected' : ''}>Tall</option></select><small>Page-specific display setting layered over the 150th style preset.</small></label></div><div class="se-control-row"><label class="se-control"><label>Featured photo position</label><input data-se-local="featuredImagePosition" value="${esc(base.featuredImagePosition)}"><small>Examples: center center, center top, 50% 35%.</small></label><label class="se-control"><label>Banner plane scale</label><select data-se-local="bannerPlaneScale"><option value="medium" ${base.bannerPlaneScale === 'medium' ? 'selected' : ''}>Medium</option><option value="large" ${base.bannerPlaneScale === 'large' ? 'selected' : ''}>Large</option><option value="xl" ${base.bannerPlaneScale === 'xl' ? 'selected' : ''}>Extra large</option></select><small>150th default is large to read as a banner tow.</small></label></div><div class="se-control-row"><label class="se-control"><label>Background URL</label><input data-se-local="backgroundUrl" value="${esc(base.backgroundUrl)}"><small>Customer/style asset variable.</small></label><label class="se-control"><label>Header logo URL</label><input data-se-local="headerLogoUrl" value="${esc(base.headerLogoUrl)}"><small>Customer/style asset variable.</small></label></div><div class="se-action-row"><button type="button" data-se-export>Export current settings JSON</button><button type="button" class="secondary" data-se-reset>Reset local changes</button></div></div>`;
  }

  function renderMini(base) {
    return `<div class="se-mini-preview"><h3>Immediate customer-view preview</h3><div class="se-preview-card"><div class="se-preview-hero"><div style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;font-weight:900;color:rgba(255,255,255,.80)">${esc(base.heroEyebrow)}</div><h4>${esc(base.heroHeadline)}</h4><p>${esc(base.heroSubhead)}</p></div><div class="se-preview-body"><div class="se-preview-pills"><span>${esc(base.preset)}</span><span>${esc(currentPageLabel())}</span><span>${esc(state.audience)}</span><span>${state.showBanner ? 'banner on' : 'banner off'}</span></div></div></div></div>`;
  }

  function renderWorkbench(base) {
    const gridClass = state.controlsSide === "right" ? "se-workbench-grid right" : "se-workbench-grid";
    return `<section class="se-workbench"><div class="se-workbench-shell"><div class="se-workbench-head"><div><h2>150th Aero rendered-site controls</h2><p>The left/right control area is intentionally utilitarian. The preview and rendered page below show what the customer-facing site will look like.</p></div><div class="se-workbench-badges"><span>${VERSION}</span><span>${esc(base.preset)}</span><span>Supabase asset variables</span></div></div><div class="${gridClass}">${renderControls(base)}${renderMini(base)}</div></div></section>`;
  }

  function render() {
    installStyles();
    let mount = document.getElementById(MOUNT_ID);
    if (!mount) {
      mount = document.createElement("div");
      mount.id = MOUNT_ID;
      document.body.appendChild(mount);
    }
    const base = currentBase();
    mount.innerHTML = `<div id="${ROOT_ID}" class="syncetc-v27" style="--se-customer-bg:url('${cssUrl(base.backgroundUrl)}')"><div class="se-v27-version">JS v27 loaded</div><div class="se-v27-topline"><span>SyncEtc versioned renderer · ${esc(FILE_NAME)}</span><span>${esc(state.customer)} · ${esc(currentPageLabel())}</span></div>${renderWorkbench(base)}${renderHeader(base)}${renderMarquee(base)}${state.page === 'home' ? renderHome(base) : renderPageModules(base)}${renderFooter(base)}</div>`;
  }

  function bind() {
    document.addEventListener("change", function (e) {
      const field = e.target && e.target.getAttribute && e.target.getAttribute("data-se-field");
      const local = e.target && e.target.getAttribute && e.target.getAttribute("data-se-local");
      if (field) {
        let value = e.target.value;
        if (field === "showBanner") value = value === "true";
        state[field] = value;
        if (field === "customer") state.local = {};
        render();
      }
      if (local) {
        state.local[local] = e.target.value;
        render();
      }
    });
    document.addEventListener("input", function (e) {
      const local = e.target && e.target.getAttribute && e.target.getAttribute("data-se-local");
      if (local) {
        state.local[local] = e.target.value;
        render();
      }
    });
    document.addEventListener("click", function (e) {
      const pageLink = e.target.closest && e.target.closest("[data-se-page-link]");
      if (pageLink) { e.preventDefault(); state.page = pageLink.getAttribute("data-se-page-link"); render(); return; }
      if (e.target.closest && e.target.closest("[data-se-reset]")) { state.local = {}; render(); return; }
      if (e.target.closest && e.target.closest("[data-se-export]")) { exportJson(); return; }
    });
  }

  function exportJson() {
    const base = currentBase();
    const data = { export_type:"syncetc_customer_display_settings_prototype", version:VERSION, file_name:FILE_NAME, exported_at:new Date().toISOString(), customer:state.customer, page:state.page, audience:state.audience, controls_side:state.controlsSide, show_banner:state.showBanner, current_customer_assets:{ header_logo_url:base.headerLogoUrl, footer_logo_url:base.footerLogoUrl, homepage_background_url:base.backgroundUrl, homepage_fallback_image_url:base.featuredImageUrl, banner_tow_image_url:base.bannerTowUrl }, display_settings:{ featured_image_fit:base.featuredImageFit, featured_image_height:base.featuredImageHeight, featured_image_position:base.featuredImagePosition, featured_image_caption_visible:base.featuredImageCaptionVisible, banner_plane_scale:base.bannerPlaneScale, banner_pause_mode:base.bannerPauseMode }, local_overrides:state.local };
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:"application/json;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "syncetc-v27-display-settings-" + Date.now() + ".json";
    document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(url); a.remove(); }, 500);
  }

  function boot() { render(); bind(); console.log("SYNCETC UPDATE 99 LOADED", VERSION, FILE_NAME); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
/* syncetc-homepage-v27-media-quality-banner-center.js - END */
