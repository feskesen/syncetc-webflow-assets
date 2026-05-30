/* COMPONENT-master-footer-v1.js - BEGIN */
(function () {
  "use strict";

  window.SyncEtc = window.SyncEtc || {};
  window.SyncEtc.Components = window.SyncEtc.Components || {};

  var VERSION = "COMPONENT-master-footer-v1";
  var SYNCETC_HOME_URL = "https://www.syncetc.com";
  var SYNCETC_LOGO_URL = "https://ocdaohkiwonjmirqkjww.supabase.co/storage/v1/object/public/public-site-assets/!SyncEtc-branding/SyncEtc%20logo.png";

  function installStyles() {
    const U = window.SyncEtc.Components.Utils;
    U.installStyle("COMPONENT-master-footer-v1-style", `
      .aero-footer-wrapper { max-width:1180px; margin:0 auto; padding:0 18px; }
      .aero-footer-shell { background:var(--se-aero-card); border:1px solid var(--se-aero-border); border-radius:var(--se-aero-radius-xl); box-shadow:var(--se-aero-shadow); overflow:hidden; backdrop-filter:blur(8px); }
      .aero-footer-top { display:grid; grid-template-columns:minmax(0,1.15fr) minmax(0,1fr); gap:22px; padding:24px; background:rgba(255,255,255,.72); }
      .aero-footer-brand-card, .aero-footer-links-card { background:var(--se-aero-card-soft); border:1px solid var(--se-aero-border); border-radius:var(--se-aero-radius-lg); padding:20px; box-shadow:0 8px 24px rgba(12,38,64,.08); }
      .aero-footer-brand-row { display:flex; align-items:center; gap:16px; }
      .aero-footer-logo-wrap { display:flex; align-items:center; justify-content:center; width:88px; height:68px; border-radius:18px; background:#fff; border:1px solid var(--se-aero-border); box-shadow:0 8px 20px rgba(12,38,64,.12); overflow:hidden; flex:0 0 auto; }
      .aero-footer-logo { max-width:78px; max-height:58px; object-fit:contain; }
      .aero-footer-title { margin:0; color:var(--se-aero-navy-dark); font-size:24px; line-height:1.08; font-weight:800; letter-spacing:-.025em; }
      .aero-footer-founded { display:inline-flex; margin-top:7px; padding:5px 10px; border-radius:999px; background:var(--se-aero-sky); color:var(--se-aero-navy); font-size:11px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
      .aero-footer-text { margin:16px 0 0; color:var(--se-aero-muted); font-size:14px; line-height:1.7; }
      .aero-footer-kicker { display:inline-flex; margin-bottom:10px; padding:5px 10px; border-radius:999px; background:var(--se-aero-sky); color:var(--se-aero-navy); font-size:11px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
      .aero-footer-link-grid, .aero-footer-social-grid { display:flex; flex-wrap:wrap; gap:8px; }
      .aero-footer-link, .aero-footer-social-link { display:inline-flex; align-items:center; justify-content:center; min-height:32px; padding:7px 11px; border-radius:999px; background:#fff; border:1px solid rgba(18,54,90,.16); color:var(--se-aero-navy); font-size:13px; font-weight:800; text-decoration:none; white-space:nowrap; }
      .aero-footer-bottom { padding:15px 20px; background:linear-gradient(135deg,var(--se-aero-navy),var(--se-aero-blue)); color:rgba(255,255,255,.88); display:grid; grid-template-columns:minmax(0,1fr) auto; gap:14px; align-items:center; font-size:12px; line-height:1.55; font-weight:700; }
      .aero-footer-disclaimer { margin:0; }
      .aero-footer-legal-stack { display:flex; align-items:center; justify-content:flex-end; flex-wrap:wrap; gap:10px; }
      .aero-footer-copyright { white-space:nowrap; text-align:right; }
      .syncetc-powered-badge {
        display:inline-flex;
        align-items:center;
        gap:8px;
        min-height:34px;
        padding:6px 10px;
        border-radius:999px;
        background:rgba(255,255,255,.96);
        border:1px solid rgba(255,255,255,.75);
        box-shadow:0 7px 18px rgba(8,22,38,.18);
        color:#12365a !important;
        text-decoration:none;
        font-size:11px;
        font-weight:900;
        white-space:nowrap;
      }
      .syncetc-powered-badge:hover { transform:translateY(-1px); box-shadow:0 10px 24px rgba(8,22,38,.22); }
      .syncetc-powered-badge span { color:#12365a; opacity:.88; }
      .syncetc-powered-logo {
        display:block;
        height:22px;
        width:auto;
        max-width:94px;
        object-fit:contain;
      }

      @media (max-width:980px){
        .aero-footer-top,.aero-footer-bottom{grid-template-columns:1fr;}
        .aero-footer-copyright{text-align:left;white-space:normal;}
        .aero-footer-legal-stack{justify-content:flex-start;}
      }

      @media (max-width:720px){
        .aero-footer-wrapper{padding-left:12px;padding-right:12px;}
        .syncetc-powered-badge{border-radius:16px;}
      }
    `);
  }

  function logoMarkup(customer) {
    const U = window.SyncEtc.Components.Utils;
    const url = customer.footerLogoUrl || customer.headerLogoUrl || "";
    if (url) return '<img src="' + U.esc(url) + '" alt="' + U.esc(customer.shortName) + ' logo" class="aero-footer-logo">';
    return '<div style="width:62px;height:46px;border-radius:14px;background:linear-gradient(135deg,var(--se-aero-navy),var(--se-aero-blue));"></div>';
  }

  function currentYear() {
    return new Date().getFullYear();
  }

  function parseYear(value) {
    var n = parseInt(String(value || "").replace(/[^0-9]/g, ""), 10);
    if (!n || n < 1900 || n > 3000) return null;
    return n;
  }

  function customerLegalName(customer) {
    return customer.legalName || customer.fullName || customer.customerName || customer.shortName || "Customer";
  }

  function generatedCopyright(customer) {
    const U = window.SyncEtc.Components.Utils;
    if (customer.copyright) return String(customer.copyright);
    var name = customerLegalName(customer);
    var now = currentYear();
    var start = parseYear(customer.copyrightStartYear || customer.customerStartYear || customer.signupYear || customer.createdYear);
    var yearText = start && start < now ? String(start) + "–" + String(now) : String(start || now);
    return "© " + yearText + " " + name + ". All rights reserved.";
  }

  function poweredByMarkup() {
    const U = window.SyncEtc.Components.Utils;
    return '<a class="syncetc-powered-badge" href="' + U.esc(SYNCETC_HOME_URL) + '" target="_blank" rel="noopener noreferrer" aria-label="Powered by SyncEtc"><span>Powered by</span><img class="syncetc-powered-logo" src="' + U.esc(SYNCETC_LOGO_URL) + '" alt="SyncEtc"></a>';
  }

  function render(ctx) {
    installStyles();
    const U = window.SyncEtc.Components.Utils;
    const customer = U.normalizeCustomerConfig(ctx.customer || {});
    const social = customer.social || {};
    return `<section class="aero-footer-wrapper"><footer class="aero-footer-shell">
      <div class="aero-footer-top">
        <div class="aero-footer-brand-card">
          <div class="aero-footer-brand-row"><div class="aero-footer-logo-wrap">${logoMarkup(customer)}</div><div><h2 class="aero-footer-title">${U.esc(customerLegalName(customer))}</h2><div class="aero-footer-founded">${U.esc(customer.founded)}</div></div></div>
          <p class="aero-footer-text">${U.esc(customer.footerText || "Customer site materials, announcements, records, and public information are provided for customer communication and member convenience.")}</p>
          <div style="margin-top:18px"><div class="aero-footer-kicker">Find us on socials</div><div class="aero-footer-social-grid"><a class="aero-footer-social-link" href="${U.esc(social.youtube || '#')}">YouTube</a><a class="aero-footer-social-link" href="${U.esc(social.instagram || '#')}">Instagram</a><a class="aero-footer-social-link" href="${U.esc(social.facebook || '#')}">Facebook</a></div></div>
        </div>
        <div class="aero-footer-links-card">
          <div class="aero-footer-kicker">Site Links</div>
          <div class="aero-footer-link-grid"><a class="aero-footer-link" href="#" data-se-page-link="home">Home</a><a class="aero-footer-link" href="#" data-se-page-link="info">Info</a><a class="aero-footer-link" href="#" data-se-page-link="aircraft">Aircraft</a><a class="aero-footer-link" href="#" data-se-page-link="events">Calendar</a><a class="aero-footer-link" href="#" data-se-page-link="gallery">Gallery</a><a class="aero-footer-link" href="#">Apply</a><a class="aero-footer-link" href="#">Contact</a></div>
          <div style="margin-top:16px"><div class="aero-footer-kicker">Member Links</div><div class="aero-footer-link-grid"><a class="aero-footer-link" data-se-page-link="member" href="#">Dashboard</a><a class="aero-footer-link" data-se-page-link="roster" href="#">Roster</a><a class="aero-footer-link" href="#">Forum</a><a class="aero-footer-link" data-se-page-link="documents" href="#">Resources</a></div></div>
        </div>
      </div>
      <div class="aero-footer-bottom"><p class="aero-footer-disclaimer">${U.esc(customer.footerDisclaimer || "Website materials are provided for customer communication and member convenience. Operational use is governed by current customer documents, applicable rules, and official procedures.")}</p><div class="aero-footer-legal-stack"><div class="aero-footer-copyright">${U.esc(generatedCopyright(customer))}</div>${poweredByMarkup()}</div></div>
    </footer></section>`;
  }

  window.SyncEtc.Components.MasterFooter = { render: render, installStyles: installStyles, version: VERSION };
})();
/* COMPONENT-master-footer-v1.js - END */
