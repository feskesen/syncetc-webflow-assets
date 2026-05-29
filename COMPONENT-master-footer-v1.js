/* COMPONENT-master-footer-v1.js - BEGIN */
(function () {
  "use strict";

  window.SyncEtc = window.SyncEtc || {};
  window.SyncEtc.Components = window.SyncEtc.Components || {};

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
      .aero-footer-bottom { padding:16px 24px; background:linear-gradient(135deg,var(--se-aero-navy),var(--se-aero-blue)); color:rgba(255,255,255,.88); display:grid; grid-template-columns:minmax(0,1fr) auto; gap:16px; align-items:center; font-size:12px; line-height:1.55; font-weight:700; }
      .aero-footer-disclaimer { margin:0; }
      .aero-footer-copyright { white-space:nowrap; text-align:right; }

      @media (max-width:980px){
        .aero-footer-top,.aero-footer-bottom{grid-template-columns:1fr;}
        .aero-footer-copyright{text-align:left;white-space:normal;}
      }

      @media (max-width:720px){
        .aero-footer-wrapper{padding-left:12px;padding-right:12px;}
      }
    `);
  }

  function logoMarkup(customer) {
    const U = window.SyncEtc.Components.Utils;
    const url = customer.footerLogoUrl || customer.headerLogoUrl || "";
    if (url) return '<img src="' + U.esc(url) + '" alt="' + U.esc(customer.shortName) + ' logo" class="aero-footer-logo">';
    return '<div style="width:62px;height:46px;border-radius:14px;background:linear-gradient(135deg,var(--se-aero-navy),var(--se-aero-blue));"></div>';
  }

  function render(ctx) {
    installStyles();
    const U = window.SyncEtc.Components.Utils;
    const customer = U.normalizeCustomerConfig(ctx.customer || {});
    const social = customer.social || {};
    return `<section class="aero-footer-wrapper"><footer class="aero-footer-shell">
      <div class="aero-footer-top">
        <div class="aero-footer-brand-card">
          <div class="aero-footer-brand-row"><div class="aero-footer-logo-wrap">${logoMarkup(customer)}</div><div><h2 class="aero-footer-title">${U.esc(customer.legalName || customer.fullName || customer.shortName)}</h2><div class="aero-footer-founded">${U.esc(customer.founded)}</div></div></div>
          <p class="aero-footer-text">${U.esc(customer.footerText || "Member-owned flying club based at Morristown Municipal Airport, providing aircraft access, aviation community, and practical member resources.")}</p>
          <div style="margin-top:18px"><div class="aero-footer-kicker">Find us on socials</div><div class="aero-footer-social-grid"><a class="aero-footer-social-link" href="${U.esc(social.youtube || '#')}">YouTube</a><a class="aero-footer-social-link" href="${U.esc(social.instagram || '#')}">Instagram</a><a class="aero-footer-social-link" href="${U.esc(social.facebook || '#')}">Facebook</a></div></div>
        </div>
        <div class="aero-footer-links-card">
          <div class="aero-footer-kicker">Site Links</div>
          <div class="aero-footer-link-grid"><a class="aero-footer-link" href="#" data-se-page-link="home">Home</a><a class="aero-footer-link" href="#" data-se-page-link="info">Info</a><a class="aero-footer-link" href="#" data-se-page-link="aircraft">Aircraft</a><a class="aero-footer-link" href="#" data-se-page-link="events">Calendar</a><a class="aero-footer-link" href="#" data-se-page-link="gallery">Gallery</a><a class="aero-footer-link" href="#">Apply</a><a class="aero-footer-link" href="#">Contact</a></div>
          <div style="margin-top:16px"><div class="aero-footer-kicker">Member Links</div><div class="aero-footer-link-grid"><a class="aero-footer-link" data-se-page-link="member" href="#">Dashboard</a><a class="aero-footer-link" data-se-page-link="roster" href="#">Roster</a><a class="aero-footer-link" href="#">Forum</a><a class="aero-footer-link" data-se-page-link="documents" href="#">Resources</a></div></div>
        </div>
      </div>
      <div class="aero-footer-bottom"><p class="aero-footer-disclaimer">${U.esc(customer.footerDisclaimer || "Website materials are provided for club communication and member convenience. Aircraft operation is governed by FAA regulations, club rules, aircraft documents, and applicable operating procedures.")}</p><div class="aero-footer-copyright">${U.esc(customer.copyright || "© 2025-2026 150th Aero Flying Club, Inc. All rights reserved.")}</div></div>
    </footer></section>`;
  }

  window.SyncEtc.Components.MasterFooter = { render: render, installStyles: installStyles };
})();
/* COMPONENT-master-footer-v1.js - END */
