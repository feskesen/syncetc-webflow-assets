/* COMPONENT-master-header-v3.js - BEGIN */
(function () {
  "use strict";

  window.SyncEtc = window.SyncEtc || {};
  window.SyncEtc.Components = window.SyncEtc.Components || {};

  var VERSION = "COMPONENT-master-header-v3";
  var wired = false;

  function installStyles() {
    const U = window.SyncEtc.Components.Utils;
    U.installStyle("COMPONENT-master-header-v3-style", `
      .club-header-wrapper { max-width:1180px; margin:0 auto 16px; padding:0 18px; color:var(--se-aero-text); }
      .club-header-card { display:grid; grid-template-columns:168px minmax(0,1fr); background:var(--se-aero-card); border:1px solid var(--se-aero-border); border-radius:var(--se-aero-radius-xl); box-shadow:var(--se-aero-shadow); overflow:visible; backdrop-filter:blur(8px); }
      .club-logo-column { display:flex; align-items:center; justify-content:center; padding:10px; border-right:1px solid var(--se-aero-border); background:linear-gradient(180deg,rgba(234,245,255,.96),rgba(255,255,255,.86)); border-radius:var(--se-aero-radius-xl) 0 0 var(--se-aero-radius-xl); }
      .club-logo-panel { width:100%; min-height:100%; display:flex; align-items:center; justify-content:center; padding:10px; border-radius:18px; background:#fff; border:1px solid rgba(18,54,90,.14); box-shadow:0 8px 20px rgba(12,38,64,.11); }
      .club-logo { max-width:130px; max-height:146px; object-fit:contain; }
      .club-header-top { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:14px; align-items:center; padding:7px 16px; background:linear-gradient(135deg,var(--se-aero-navy),var(--se-aero-blue)); border-radius:0 var(--se-aero-radius-xl) 13px 0; color:#fff; }
      .club-brand-line { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
      .club-name { color:#fff; font-size:clamp(22px,2.55vw,32px); font-weight:800; letter-spacing:-.035em; line-height:.98; }
      .club-founded { display:inline-flex; padding:4px 10px; border-radius:999px; background:rgba(255,255,255,.16); border:1px solid rgba(255,255,255,.24); color:rgba(255,255,255,.90); font-size:10px; font-weight:900; letter-spacing:.08em; text-transform:uppercase; white-space:nowrap; }
      .club-auth-buttons { display:flex; justify-content:flex-end; align-items:center; gap:7px; flex-wrap:wrap; }
      .club-auth-user { display:inline-flex; max-width:240px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:6px 10px; border-radius:999px; background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.22); color:rgba(255,255,255,.92); font-size:11.5px; font-weight:900; }
      .club-auth-btn { min-height:31px; padding:6px 13px; border-radius:999px; border:1px solid rgba(255,255,255,.32); font-weight:800; font-size:12.5px; cursor:pointer; }
      .club-auth-btn.login { background:#fff; color:var(--se-aero-navy); }
      .club-auth-btn.logout { background:rgba(255,255,255,.14); color:#fff; }
      .club-nav-stack { display:flex; flex-direction:column; gap:4px; padding:7px 10px 8px; background:rgba(255,255,255,.72); border-radius:0 0 var(--se-aero-radius-xl) 0; }
      .club-nav-row { display:flex; justify-content:center; }
      .club-nav-inner { width:100%; display:flex; align-items:center; gap:8px; padding:4px 8px; border-radius:999px; border:1px solid var(--se-aero-border); box-shadow:0 3px 9px rgba(12,38,64,.045); }
      .club-nav-label { display:inline-flex; min-width:58px; justify-content:center; padding:3px 8px; border-radius:999px; font-size:9.5px; font-weight:900; letter-spacing:.08em; text-transform:uppercase; }
      .club-nav-links { display:flex; flex:1; flex-wrap:wrap; gap:3px 6px; justify-content:center; align-items:center; }
      .club-nav-link { display:inline-flex; min-height:22px; align-items:center; padding:3px 8px; border-radius:999px; color:var(--se-aero-navy); font-size:12.5px; font-weight:800; text-decoration:none; white-space:nowrap; }
      .club-nav-link.is-active { background:var(--se-aero-navy); color:#fff !important; box-shadow:0 5px 13px rgba(18,54,90,.16); }
      .club-nav-row.public .club-nav-inner { background:rgba(255,255,255,.92); }
      .club-nav-row.public .club-nav-label { background:var(--se-aero-sky); color:var(--se-aero-navy); }
      .club-nav-row.member .club-nav-inner { background:linear-gradient(180deg,rgba(234,245,255,.96),rgba(255,255,255,.88)); }
      .club-nav-row.member .club-nav-label { background:var(--se-aero-navy); color:#fff; }
      .club-nav-row.board .club-nav-inner { background:linear-gradient(180deg,rgba(255,247,236,.98),rgba(255,255,255,.90)); border-color:rgba(138,77,0,.18); }
      .club-nav-row.board .club-nav-label { background:#8a4d00; color:#fff; }
      .club-nav-row.board .club-nav-link { color:#7a4300; }
      .se-hidden-by-audience { display:none !important; }

      @media (max-width:980px) {
        .club-header-card { grid-template-columns:136px minmax(0,1fr); }
      }

      @media (max-width:720px) {
        .club-header-wrapper { padding-left:12px; padding-right:12px; }
        .club-header-card { display:block; }
        .club-logo-column { border-right:none; border-radius:22px 22px 0 0; background:linear-gradient(135deg,var(--se-aero-navy),var(--se-aero-blue)); }
        .club-logo { max-width:92px; max-height:70px; }
        .club-header-top { grid-template-columns:1fr; border-radius:0; }
        .club-auth-buttons { justify-content:flex-start; }
        .club-nav-inner { align-items:flex-start; flex-direction:column; border-radius:16px; }
        .club-nav-links { justify-content:flex-start; }
      }
    `);
  }

  function snapshot() {
    return window.SyncEtc.AuthContext ? window.SyncEtc.AuthContext.getSnapshot() : {};
  }

  function logoMarkup(customer) {
    const U = window.SyncEtc.Components.Utils;
    const url = customer.headerLogoUrl || "";
    if (url) return '<img src="' + U.esc(url) + '" alt="' + U.esc(customer.shortName) + ' logo" class="club-logo">';
    return '<div style="width:62px;height:62px;border-radius:18px;background:linear-gradient(135deg,var(--se-aero-navy),var(--se-aero-blue));"></div>';
  }

  function roleAllowsMember(s, audience) {
    if (audience === "member" || audience === "admin") return true;
    return !!(s && s.signed_in);
  }

  function roleAllowsAdmin(s, audience) {
    if (audience === "admin") return true;
    if (!s || !s.signed_in) return false;
    if (s.is_syncetc_super_admin) return true;
    return Number(s.active_customer_role_rank || 0) >= 400;
  }

  function navRows(ctx) {
    const U = window.SyncEtc.Components.Utils;
    const page = ctx.pageKey || "home";
    const audience = ctx.audience || "public";
    const s = snapshot();
    const showMember = roleAllowsMember(s, audience);
    const showAdmin = roleAllowsAdmin(s, audience);

    const routeMap = {
      home: "/",
      info: "/info",
      aircraft: "/aircraft",
      events: "/calendar",
      calendar: "/calendar"
    };

    function navLink(label) {
      return '<a class="club-nav-link" href="#">' + U.esc(label) + '</a>';
    }

    function link(key, label) {
      var href = routeMap[key] || "#";
      var active = page === key || (key === "events" && page === "calendar") || (key === "calendar" && page === "events");
      return '<a class="club-nav-link ' + (active ? 'is-active' : '') + '" href="' + U.esc(href) + '" data-se-page-link="' + U.esc(key) + '">' + U.esc(label) + '</a>';
    }

    return `
      <nav class="club-nav-row public"><div class="club-nav-inner"><div class="club-nav-label">Public</div><div class="club-nav-links">
        ${link("home","Home")}${link("info","Info")}${link("aircraft","Aircraft")}${link("events","Calendar")}${link("gallery","Gallery")}${navLink("Scheduler")}${navLink("Apply")}${navLink("Contact")}
      </div></div></nav>
      <nav class="club-nav-row member ${showMember ? '' : 'se-hidden-by-audience'}"><div class="club-nav-inner"><div class="club-nav-label">Member</div><div class="club-nav-links">
        ${link("member","Dashboard")}${link("roster","Roster")}${navLink("Submit to Gallery")}${navLink("Fun ▾")}${link("documents","Reference ▾")}${navLink("My Profile")}
      </div></div></nav>
      <nav class="club-nav-row board ${showAdmin ? '' : 'se-hidden-by-audience'}"><div class="club-nav-inner"><div class="club-nav-label">Admin</div><div class="club-nav-links">
        ${navLink("People ▾")}${link("events","Events ▾")}${navLink("Communications ▾")}${navLink("Aircraft ▾")}${link("documents","Records ▾")}${navLink("System ▾")}
      </div></div></nav>`;
  }

  function authButtons(customer) {
    const U = window.SyncEtc.Components.Utils;
    const s = snapshot();
    const signedIn = !!s.signed_in;
    const email = signedIn && s.user ? s.user.email || "" : "";
    const activeCustomer = s.active_customer && s.active_customer.syncetc_customers ? s.active_customer.syncetc_customers.display_name : "";
    const label = activeCustomer || customer.fullName || customer.shortName || "SyncEtc";
    return '<div class="club-auth-buttons">' +
      (signedIn ? '<span class="club-auth-user">' + U.esc(email) + (label ? ' · ' + U.esc(label) : '') + '</span>' : '') +
      (!signedIn ? '<button class="club-auth-btn login" type="button" data-se-auth-open>Login</button>' : '') +
      (signedIn ? '<button class="club-auth-btn logout" type="button" data-se-auth-logout>Logout</button>' : '') +
    '</div>';
  }

  function wire() {
    if (wired) return;
    wired = true;

    document.addEventListener("click", async function (e) {
      if (e.target.closest && e.target.closest("[data-se-auth-open]")) {
        e.preventDefault();
        if (window.SyncEtc.AuthModal) window.SyncEtc.AuthModal.open();
        return;
      }

      if (e.target.closest && e.target.closest("[data-se-auth-logout]")) {
        e.preventDefault();
        try {
          if (window.SyncEtc.AuthContext) await window.SyncEtc.AuthContext.signOut();
        } catch (err) {
          if (window.SyncEtc.AuthModal) window.SyncEtc.AuthModal.open();
          console.warn("SyncEtc sign out failed:", err);
        }
      }
    });
  }

  function render(ctx) {
    installStyles();
    wire();

    const U = window.SyncEtc.Components.Utils;
    const customer = U.normalizeCustomerConfig(ctx.customer || {});
    return `<div class="club-header-wrapper"><header class="club-header-card">
      <div class="club-logo-column"><div class="club-logo-panel">${logoMarkup(customer)}</div></div>
      <div class="club-header-main">
        <div class="club-header-top">
          <div class="club-brand-text"><div class="club-brand-line"><div class="club-name">${U.esc(customer.fullName || customer.shortName)}</div><div class="club-founded">${U.esc(customer.founded)}</div></div></div>
          ${authButtons(customer)}
        </div>
        <div class="club-nav-stack">${navRows(ctx)}</div>
      </div>
    </header></div>`;
  }

  window.SyncEtc.Components.MasterHeader = { render: render, installStyles: installStyles, version: VERSION };
})();
/* COMPONENT-master-header-v3.js - END */
