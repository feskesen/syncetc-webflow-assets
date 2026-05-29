/* PAGE-CALENDAR-VIEWER-v1D.js - BEGIN */
(function(){
  "use strict";

  var COMPONENT_FILES = [
    "COMPONENT-shared-utils-v1.js",
    "COMPONENT-customer-style-v2.js",
    "COMPONENT-base-styles-v1.js",
    "COMPONENT-master-controls-v2.js",
    "COMPONENT-master-header-v2.js",
    "COMPONENT-scroll-banner-v1.js",
    "COMPONENT-master-footer-v1.js",
    "COMPONENT-site-shell-v2.js",
    "COMPONENT-auth-context-v1B.js",
    "COMPONENT-auth-modal-v1.js",
    "COMPONENT-customer-switcher-v1.js",
    "COMPONENT-access-guard-v1.js"
  ];

  var CURRENT_SCRIPT_SRC = document.currentScript && document.currentScript.src ? document.currentScript.src : "";

  function componentBaseUrl(){
    if(window.SYNCETC_COMPONENT_BASE_URL) return String(window.SYNCETC_COMPONENT_BASE_URL).replace(/\/?$/, "/");
    if(CURRENT_SCRIPT_SRC) return CURRENT_SCRIPT_SRC.substring(0, CURRENT_SCRIPT_SRC.lastIndexOf("/") + 1);
    return "https://feskesen.github.io/syncetc-webflow-assets/";
  }

  function loadScriptOnce(src){
    return new Promise(function(resolve, reject){
      var existing = Array.prototype.slice.call(document.scripts).find(function(s){ return s.src === src; });
      if(existing) return resolve();
      var script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = function(){ resolve(); };
      script.onerror = function(){ reject(new Error("Could not load " + src)); };
      document.head.appendChild(script);
    });
  }

  function ensureComponents(){
    if(window.SyncEtc && window.SyncEtc.Components && window.SyncEtc.Components.SiteShell) return Promise.resolve();
    var base = componentBaseUrl();
    return COMPONENT_FILES.reduce(function(p, file){
      return p.then(function(){ return loadScriptOnce(base + file); });
    }, Promise.resolve());
  }

  var VERSION = "PAGE-CALENDAR-VIEWER-v1D";
  var SUPABASE_URL = "https://ocdaohkiwonjmirqkjww.supabase.co";
  var EDGE_READ_URL = SUPABASE_URL + "/functions/v1/syncetc-calendar-viewer-read";

  var state = {
    shell: null,
    data: null,
    events: [],
    visibleEvents: [],
    view: "list",
    dateFilter: "upcoming",
    typeFilter: "all",
    search: "",
    monthCursor: null,
    loading: true,
    message: "",
    error: ""
  };

  function U(){ return window.SyncEtc && window.SyncEtc.Components ? window.SyncEtc.Components.Utils : null; }
  function esc(v){
    if(U() && U().esc) return U().esc(v);
    return (v == null ? "" : String(v)).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
  }
  function clean(v){ return (v == null ? "" : String(v)).trim(); }
  function truthy(v){ var x=clean(v).toLowerCase(); return x==="true"||x==="yes"||x==="1"||x==="on"; }
  function byId(id){ return document.getElementById(id); }

  function authSnapshot(){
    return window.SyncEtc && window.SyncEtc.AuthContext && window.SyncEtc.AuthContext.getSnapshot ? window.SyncEtc.AuthContext.getSnapshot() : {};
  }

  function activeCustomerKey(){
    var qs = new URLSearchParams(window.location.search);
    var q = clean(qs.get("customer_key") || qs.get("customer"));
    if(q) return q;
    var s = authSnapshot();
    return clean(s.active_customer_key || (s.active_customer && s.active_customer.customer_key)) || "demo_flying_club";
  }

  function activeCustomerLabel(){
    var s = authSnapshot();
    var c = s.active_customer || {};
    return clean(c.syncetc_customers && (c.syncetc_customers.display_name || c.syncetc_customers.name)) ||
      clean(c.display_name || c.name) ||
      clean(c.customer_key) ||
      activeCustomerKey().replace(/_/g, " ").replace(/\b\w/g, function(m){ return m.toUpperCase(); });
  }

  function installStyles(){
    var utils = U();
    if(!utils || !utils.installStyle) return;
    utils.installStyle("PAGE-CALENDAR-VIEWER-v1D-style", `
      .calendar-viewer-page { max-width:1180px; margin:34px auto 56px; padding:0 18px; font-family:Arial, Helvetica, sans-serif; color:var(--se-aero-text); }
      .cv-shell { background:var(--se-aero-card); border:1px solid var(--se-aero-border); border-radius:var(--se-aero-radius-xl); box-shadow:var(--se-aero-shadow); overflow:hidden; backdrop-filter:blur(8px); }
      .cv-hero { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:22px; align-items:start; padding:32px 34px 28px; background:linear-gradient(135deg,var(--se-aero-navy),var(--se-aero-blue)),radial-gradient(circle at top right,rgba(255,255,255,.34),transparent 36%); color:#fff; }
      .cv-eyebrow { display:inline-flex; margin-bottom:12px; padding:6px 12px; border-radius:999px; background:rgba(255,255,255,.16); border:1px solid rgba(255,255,255,.24); font-size:12px; font-weight:900; letter-spacing:.08em; text-transform:uppercase; }
      .cv-hero h1 { margin:0; color:#fff; font-size:clamp(30px,4vw,48px); line-height:1.05; font-weight:900; letter-spacing:-.035em; }
      .cv-hero p { max-width:880px; margin:12px 0 0; color:rgba(255,255,255,.9); font-size:16px; line-height:1.6; }
      .cv-view-actions { display:flex; flex-wrap:wrap; gap:8px; justify-content:flex-end; align-items:flex-start; }
      .cv-btn, .cv-filter, .cv-view, .cv-month-controls button, .cv-links a, .cv-links button { min-height:38px; border:1px solid rgba(18,54,90,.18); border-radius:999px; padding:9px 13px; background:#fff; color:var(--se-aero-navy); font-size:12px; font-weight:900; cursor:pointer; text-decoration:none; display:inline-flex; align-items:center; justify-content:center; gap:6px; }
      .cv-view.active, .cv-filter.active, .cv-btn.primary, .cv-links .primary { background:var(--se-aero-navy); color:#fff; border-color:var(--se-aero-navy); }
      .cv-toolbar { display:grid; grid-template-columns:minmax(280px,360px) 1fr; gap:16px; align-items:end; padding:18px 30px; background:rgba(255,255,255,.88); border-bottom:1px solid var(--se-aero-border); }
      .cv-toolbar label { display:block; margin-bottom:6px; color:var(--se-aero-navy-dark); font-size:11px; font-weight:900; letter-spacing:.07em; text-transform:uppercase; }
      .cv-input { width:100%; min-height:42px; border:1px solid rgba(18,54,90,.18); border-radius:14px; padding:10px 12px; background:#fff; color:var(--se-aero-text); font:inherit; font-size:14px; outline:none; }
      .cv-filters { display:flex; flex-wrap:wrap; gap:8px; justify-content:flex-end; }
      .cv-meta { display:grid; grid-template-columns:minmax(0,1fr) auto auto; gap:16px; align-items:center; padding:16px 30px; background:#fff; border-bottom:1px solid var(--se-aero-border); }
      .cv-status { color:var(--se-aero-muted); font-size:14px; font-weight:900; }
      .cv-month-controls { display:none; align-items:center; gap:10px; }
      .cv-month-controls strong { min-width:150px; text-align:center; color:var(--se-aero-navy-dark); }
      .cv-grid { padding:24px 30px 32px; background:rgba(255,255,255,.96); }
      .cv-grid.list, .cv-grid.compact-list { display:grid; gap:14px; }
      .cv-card { --accent:var(--se-aero-blue); display:grid; grid-template-columns:112px minmax(0,1fr) 150px; min-height:154px; width:100%; padding:0; text-align:left; background:#fff; border:1px solid rgba(18,54,90,.14); border-left:6px solid var(--accent); border-radius:18px; box-shadow:0 10px 26px rgba(12,38,64,.10); overflow:hidden; cursor:pointer; }
      .cv-card.cancelled { border-left-color:#9d2a2a; background:linear-gradient(0deg,rgba(157,42,42,.04),rgba(157,42,42,.04)),#fff; }
      .cv-date { display:flex; flex-direction:column; justify-content:center; align-items:center; gap:2px; background:var(--se-aero-navy); color:#fff; padding:18px 10px; text-align:center; }
      .cv-date b { font-size:13px; letter-spacing:.08em; text-transform:uppercase; }
      .cv-date strong { font-size:40px; line-height:1; }
      .cv-date span { font-size:13px; font-weight:800; opacity:.86; }
      .cv-body { padding:22px 16px; min-width:0; }
      .cv-pills { display:flex; flex-wrap:wrap; gap:7px; margin-bottom:8px; }
      .cv-pill { display:inline-flex; border-radius:999px; padding:5px 9px; background:var(--se-aero-sky); color:var(--se-aero-navy); font-size:10px; font-weight:900; letter-spacing:.06em; text-transform:uppercase; }
      .cv-pill.warn, .cv-date-note, .cv-cancel { color:#9d2a2a; }
      .cv-body h2 { margin:0; color:var(--se-aero-navy-dark); font-size:23px; line-height:1.18; }
      .cv-line { margin-top:8px; color:#304d73; font-size:13px; line-height:1.45; font-weight:800; }
      .cv-body p { margin:8px 0 0; color:#304d73; font-size:14px; line-height:1.45; }
      .cv-body em { display:block; margin-top:10px; color:var(--se-aero-muted); font-style:normal; font-size:11px; font-weight:900; letter-spacing:.06em; text-transform:uppercase; }
      .cv-thumb { display:flex; align-items:center; justify-content:center; padding:16px; background:rgba(234,245,255,.42); border-left:1px solid rgba(18,54,90,.10); }
      .cv-thumb img, .cv-modal-img img { max-width:118px; max-height:118px; object-fit:contain; border-radius:14px; background:#fff; border:1px solid rgba(18,54,90,.10); padding:8px; }
      .cv-img-ph { width:118px; height:118px; border-radius:14px; border:1px dashed rgba(18,54,90,.22); display:flex; align-items:center; justify-content:center; color:var(--se-aero-muted); font-size:12px; font-weight:900; background:rgba(255,255,255,.7); }
      .cv-grid.compact-list .cv-card { grid-template-columns:86px minmax(0,1fr) 96px; min-height:104px; }
      .cv-grid.compact-list .cv-date strong { font-size:30px; }
      .cv-grid.compact-list .cv-body { padding:14px; }
      .cv-grid.compact-list .cv-body h2 { font-size:19px; }
      .cv-grid.compact-list .cv-body p, .cv-grid.compact-list .cv-body em { display:none; }
      .cv-grid.compact-list .cv-thumb img, .cv-grid.compact-list .cv-img-ph { max-width:72px; max-height:72px; }
      .cv-weekdays, .cv-month-grid { display:grid; grid-template-columns:repeat(7,1fr); }
      .cv-weekdays div { padding:0 8px 8px; text-align:center; color:var(--se-aero-muted); font-size:11px; font-weight:900; letter-spacing:.08em; text-transform:uppercase; }
      .cv-month-grid { border:1px solid rgba(18,54,90,.12); border-radius:18px; overflow:hidden; }
      .cv-month-day { min-height:124px; padding:8px; border-right:1px solid rgba(18,54,90,.10); border-bottom:1px solid rgba(18,54,90,.10); background:#fff; }
      .cv-month-day.muted { background:rgba(234,245,255,.44); }
      .cv-month-day > b { display:block; margin-bottom:6px; color:var(--se-aero-navy-dark); font-size:12px; }
      .cv-chip { display:block; width:100%; margin:5px 0; padding:6px 7px; border:0; border-bottom:4px solid var(--accent); border-radius:9px; background:rgba(234,245,255,.95); color:var(--se-aero-navy-dark); font-size:11px; line-height:1.25; font-weight:900; text-align:left; cursor:pointer; }
      .cv-chip span { display:block; margin-top:2px; color:var(--se-aero-muted); font-size:10px; }
      .cv-empty, .cv-error { padding:22px; border-radius:18px; background:#fff; border:1px solid rgba(18,54,90,.12); color:var(--se-aero-muted); }
      .cv-error { color:#8f2424; border-color:rgba(157,42,42,.28); background:rgba(157,42,42,.06); }
      .cv-version { margin-top:10px; text-align:right; color:rgba(18,54,90,.55); font-size:11px; font-weight:800; }
      .cv-modal-overlay { position:fixed; inset:0; z-index:999999; display:none; align-items:center; justify-content:center; padding:18px; background:rgba(5,15,30,.72); }
      .cv-modal-overlay.visible { display:flex; }
      .cv-modal { width:100%; max-width:1060px; max-height:92vh; overflow:hidden; border-radius:24px; background:#fff; box-shadow:0 18px 60px rgba(0,0,0,.36); display:flex; flex-direction:column; }
      .cv-modal-head { display:flex; justify-content:space-between; gap:18px; padding:22px; background:linear-gradient(135deg,var(--se-aero-navy),var(--se-aero-blue)); color:#fff; }
      .cv-modal-head h2 { margin:0 0 8px; font-size:30px; color:#fff; }
      .cv-modal-head p { margin:0; color:rgba(255,255,255,.88); }
      .cv-modal-head button { width:38px; height:38px; border-radius:999px; border:0; background:rgba(255,255,255,.14); color:#fff; font-size:24px; cursor:pointer; }
      .cv-modal-main { display:grid; grid-template-columns:minmax(0,1fr) 330px; gap:18px; padding:22px; overflow:auto; }
      .cv-modal-img, .cv-panel, .cv-fact { padding:16px; border-radius:16px; border:1px solid rgba(18,54,90,.12); background:#fff; margin-bottom:12px; }
      .cv-modal-img { display:flex; align-items:center; justify-content:center; min-height:230px; background:#f8fbff; }
      .cv-modal-img img { max-width:100%; max-height:220px; }
      .cv-panel > b, .cv-fact b { display:block; margin-bottom:8px; color:var(--se-aero-navy-dark); font-size:11px; font-weight:900; letter-spacing:.08em; text-transform:uppercase; }
      .cv-fact span { display:block; color:#304d73; font-size:13px; line-height:1.5; font-weight:700; }
      .cv-links { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:12px; }
      .cv-map { width:100%; height:220px; border:0; border-radius:16px; }
      @media(max-width:980px){ .cv-hero,.cv-toolbar,.cv-modal-main{grid-template-columns:1fr;} .cv-view-actions,.cv-filters{justify-content:flex-start;} .cv-meta{grid-template-columns:1fr;} .cv-card{grid-template-columns:92px minmax(0,1fr);} .cv-thumb{grid-column:1/-1; border-left:0; border-top:1px solid rgba(18,54,90,.10);} }
      @media(max-width:720px){ .calendar-viewer-page{padding:0 12px;} .cv-hero{padding:26px 20px;} .cv-card,.cv-grid.compact-list .cv-card{grid-template-columns:1fr;} .cv-date{min-height:auto; flex-direction:row; justify-content:flex-start; gap:8px; padding:14px 16px;} .cv-month-day{min-height:92px; padding:5px;} .cv-chip{font-size:10px; padding:5px;} }
    `);
  }

  function parseDate(v){
    var d = new Date(clean(v));
    return isNaN(d.getTime()) ? null : d;
  }
  function todayStart(){
    var n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  }
  function addDays(d,n){
    var x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    x.setDate(x.getDate()+n);
    return x;
  }
  function ymd(d){
    return d ? [d.getFullYear(), String(d.getMonth()+1).padStart(2,"0"), String(d.getDate()).padStart(2,"0")].join("-") : "";
  }
  function sameDay(a,b){
    return !!(a && b && a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate());
  }
  function slugify(v){
    return clean(v).toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80) || "calendar";
  }

  function normalizeEvent(original){
    var ev = Object.assign({}, original || {});
    ev.event_id = ev.event_id || ev.id || ev.slug || "";
    ev.name = ev.name || "Untitled Event";
    ev.event_type_key = ev.event_type_key || "";
    ev.event_type_name = ev.event_type_name || ev.event_type_key || "Event";
    ev.access_level = ev.access_level || "Public";
    ev.start_at = ev.start_at || "";
    ev.end_at = ev.end_at || "";
    ev.all_day = truthy(ev.all_day);
    ev.no_end_time = truthy(ev.no_end_time);
    ev.timezone = ev.timezone || "America/New_York";
    ev.date_note = ev.date_note || "";
    ev.location_name = ev.location_name || "";
    ev.address = ev.address || "";
    ev.map_url = ev.map_url || "";
    ev.venue_note = ev.venue_note || "";
    ev.short_note = ev.short_note || "";
    ev.details_text = ev.details_text || "";
    ev.image_url = ev.image_url || "";
    ev.zoom_url = ev.zoom_url || "";
    ev.document_url = ev.document_url || "";
    ev.rsvp_on = truthy(ev.rsvp_on);
    ev.supplies_on = truthy(ev.supplies_on);
    ev.home_on = truthy(ev.home_on);
    ev.approved = ev.approved !== false && ev.approved !== "false";
    ev.cancelled = truthy(ev.cancelled);
    ev.sort_order = parseInt(ev.sort_order || 999,10) || 999;
    ev.ics_uid = ev.ics_uid || (ev.event_id ? ev.event_id + "@syncetc.com" : "");
    return ev;
  }

  function sortEvents(a,b){
    var ad=parseDate(a.start_at), bd=parseDate(b.start_at);
    return (ad?ad.getTime():9999999999999) - (bd?bd.getTime():9999999999999) ||
      (a.sort_order||999) - (b.sort_order||999) ||
      clean(a.name).localeCompare(clean(b.name));
  }

  function eventStatus(ev){
    var d=parseDate(ev.start_at);
    if(!d) return "upcoming";
    return d < todayStart() ? "past" : "upcoming";
  }

  function normalizeAccess(v){
    var s=clean(v).toLowerCase();
    if(!s || s.indexOf("public")>=0) return "Public";
    if(s.indexOf("member")>=0) return "Member";
    if(s.indexOf("committee")>=0) return "Committee";
    if(s.indexOf("board")>=0) return "Board";
    return clean(v) || "Public";
  }

  function accent(type){
    var t=clean(type).toLowerCase();
    if(t.indexOf("board")>=0) return "#b4232a";
    if(t.indexOf("member")>=0) return "#2f80c4";
    if(t.indexOf("fly")>=0 || t.indexOf("flight")>=0) return "#188269";
    if(t.indexOf("bbq")>=0 || t.indexOf("barbecue")>=0) return "#c77718";
    if(t.indexOf("wash")>=0 || t.indexOf("wax")>=0) return "#66788a";
    return "#2f80c4";
  }

  function timeRange(ev){
    var s=parseDate(ev.start_at), e=parseDate(ev.end_at);
    if(!s) return "Date not set";
    if(ev.all_day) return s.toLocaleDateString(undefined, {weekday:"short", month:"short", day:"numeric", year:"numeric"}) + " · All day";
    var a=s.toLocaleString(undefined, {weekday:"short", month:"short", day:"numeric", year:"numeric", hour:"numeric", minute:"2-digit"});
    if(ev.no_end_time || !e) return a;
    if(sameDay(s,e)) return a + " to " + e.toLocaleTimeString(undefined, {hour:"numeric", minute:"2-digit"});
    return a + " to " + e.toLocaleString(undefined, {weekday:"short", month:"short", day:"numeric", year:"numeric", hour:"numeric", minute:"2-digit"});
  }

  function dateParts(ev){
    var d=parseDate(ev.start_at);
    if(!d) return {m:"", d:"", y:""};
    return {m:d.toLocaleString(undefined,{month:"short"}), d:d.toLocaleString(undefined,{day:"numeric"}), y:d.toLocaleString(undefined,{year:"numeric"})};
  }

  function imgHtml(ev){
    return ev.image_url ? '<img src="'+esc(ev.image_url)+'" alt="'+esc(ev.name || "Event image")+'">' : '<div class="cv-img-ph">Event</div>';
  }

  function searchText(ev){
    return [ev.name, ev.event_type_name, ev.location_name, ev.address, ev.short_note, ev.details_text, ev.date_note, ev.venue_note].join(" ").toLowerCase();
  }

  function fetchData(){
    state.loading = true;
    state.error = "";
    state.message = "Loading calendar...";
    var key = activeCustomerKey();
    return fetch(EDGE_READ_URL + "?customer_key=" + encodeURIComponent(key), { credentials:"omit" })
      .then(function(r){
        return r.json().catch(function(){ return null; }).then(function(body){
          if(!r.ok || !body || body.ok === false) throw new Error((body && body.error) || ("Calendar read failed: " + r.status));
          return body;
        });
      })
      .then(function(body){
        state.data = body || {};
        state.events = (body.events || []).map(normalizeEvent).sort(sortEvents);
        var firstUpcoming = state.events.map(function(e){ return parseDate(e.start_at); }).filter(function(d){ return d && d >= todayStart(); }).sort(function(a,b){ return a-b; })[0];
        var firstAny = state.events.map(function(e){ return parseDate(e.start_at); }).filter(Boolean).sort(function(a,b){ return a-b; })[0];
        var base = firstUpcoming || firstAny || new Date();
        state.monthCursor = new Date(base.getFullYear(), base.getMonth(), 1);
        state.loading = false;
        state.message = "";
      })
      .catch(function(err){
        state.loading = false;
        state.error = err && err.message ? err.message : "Calendar could not load.";
        state.message = "";
      });
  }

  function renderHero(){
    return '<section class="cv-hero">'+
      '<div><div class="cv-eyebrow">'+esc(activeCustomerLabel())+'</div><h1>Calendar</h1><p>Upcoming meetings, fly-outs, work sessions, and other events.</p><p>Select an event card for details, links, notes, and location information.</p></div>'+
      '<div class="cv-view-actions"><button type="button" data-cv-view="list" class="cv-view '+(state.view==="list"?"active":"")+'">List</button><button type="button" data-cv-view="compact" class="cv-view '+(state.view==="compact"?"active":"")+'">Compact</button><button type="button" data-cv-view="month" class="cv-view '+(state.view==="month"?"active":"")+'">Month</button></div>'+
    '</section>';
  }

  function renderToolbar(){
    return '<section class="cv-toolbar"><div><label>Search Events</label><input id="cv-search" class="cv-input" type="search" placeholder="Search title, type, location, address, or notes" value="'+esc(state.search)+'"></div><div id="cv-filters" class="cv-filters"></div></section>';
  }

  function renderMeta(){
    return '<section class="cv-meta"><div id="cv-status" class="cv-status">Loading events...</div><div id="cv-month-controls" class="cv-month-controls"><button type="button" id="cv-prev-month">‹</button><strong id="cv-month-label">Month</strong><button type="button" id="cv-next-month">›</button></div><div><button type="button" id="cv-download-visible" class="cv-btn">Download .ics</button></div></section>';
  }

  function renderBody(){
    installStyles();
    return '<div class="calendar-viewer-page"><div class="cv-shell">'+renderHero()+renderToolbar()+renderMeta()+'<main id="cv-grid" class="cv-grid"></main></div><div class="cv-version">'+VERSION+' · '+esc(activeCustomerKey())+'</div></div>'+renderModal();
  }

  function renderModal(){
    return '<div id="cv-modal" class="cv-modal-overlay" aria-hidden="true"></div>';
  }

  function createFilters(){
    var box = byId("cv-filters");
    if(!box) return;
    var types = {};
    state.events.forEach(function(ev){ if(ev.event_type_name) types[ev.event_type_name] = true; });
    box.innerHTML = '<button type="button" class="cv-filter '+(state.dateFilter==="upcoming"?"active":"")+'" data-cv-date="upcoming">Upcoming</button><button type="button" class="cv-filter '+(state.dateFilter==="past"?"active":"")+'" data-cv-date="past">Past</button><button type="button" class="cv-filter '+(state.dateFilter==="all"?"active":"")+'" data-cv-date="all">All Dates</button><span></span><button type="button" class="cv-filter '+(state.typeFilter==="all"?"active":"")+'" data-cv-type="all">All Types</button>' +
      Object.keys(types).sort().map(function(t){ return '<button type="button" class="cv-filter '+(state.typeFilter===t?"active":"")+'" data-cv-type="'+esc(t)+'">'+esc(t)+'</button>'; }).join("");
  }

  function applyFilters(){
    state.visibleEvents = state.events.filter(function(ev){
      if(!ev.approved) return false;
      var status = eventStatus(ev);
      if(state.dateFilter !== "all" && status !== state.dateFilter) return false;
      if(state.typeFilter !== "all" && clean(ev.event_type_name) !== state.typeFilter) return false;
      if(state.search && searchText(ev).indexOf(state.search.toLowerCase()) < 0) return false;
      return true;
    }).sort(sortEvents);
    renderEvents();
  }

  function renderEvents(){
    var status = byId("cv-status");
    if(status){
      if(state.error) status.textContent = "Calendar unavailable.";
      else if(state.loading) status.textContent = "Loading events...";
      else status.textContent = state.visibleEvents.length + " visible event" + (state.visibleEvents.length === 1 ? "" : "s") + ".";
    }
    var mc = byId("cv-month-controls");
    if(mc) mc.style.display = state.view === "month" ? "flex" : "none";
    var ml = byId("cv-month-label");
    if(ml && state.monthCursor) ml.textContent = state.monthCursor.toLocaleDateString(undefined,{month:"long", year:"numeric"});
    if(state.view === "month") renderMonth();
    else renderList(state.view === "compact");
  }

  function renderList(compact){
    var grid = byId("cv-grid");
    if(!grid) return;
    grid.className = "cv-grid " + (compact ? "compact-list" : "list");
    if(state.error){ grid.innerHTML = '<div class="cv-error">'+esc(state.error)+'</div>'; return; }
    if(state.loading){ grid.innerHTML = '<div class="cv-empty">Loading events...</div>'; return; }
    grid.innerHTML = state.visibleEvents.length ? state.visibleEvents.map(function(ev){ return card(ev, compact); }).join("") : '<div class="cv-empty">No events match the current filters.</div>';
  }

  function card(ev, compact){
    var p = dateParts(ev);
    var acc = normalizeAccess(ev.access_level);
    var ac = ev.cancelled ? "#9d2a2a" : accent(ev.event_type_name);
    return '<button type="button" class="cv-card '+(compact?"compact ":"")+(ev.cancelled?"cancelled":"")+'" style="--accent:'+ac+'" data-cv-open="'+esc(ev.event_id)+'">'+
      '<div class="cv-date"><b>'+esc(p.m)+'</b><strong>'+esc(p.d)+'</strong><span>'+esc(p.y)+'</span></div>'+
      '<div class="cv-body"><div class="cv-pills"><span class="cv-pill">'+esc(ev.event_type_name || "Event")+'</span>'+(acc==="Public" ? "" : '<span class="cv-pill warn">'+esc(acc)+'</span>')+(ev.rsvp_on && !ev.cancelled ? '<span class="cv-pill">RSVP Open</span>' : '')+(ev.cancelled ? '<span class="cv-pill warn">Cancelled</span>' : '')+'</div><h2>'+esc(ev.name || "Untitled Event")+'</h2>'+(ev.date_note ? '<div class="cv-date-note">'+esc(ev.date_note)+'</div>' : '')+'<div class="cv-line">'+esc(timeRange(ev))+'</div>'+(ev.location_name ? '<div class="cv-line">'+esc(ev.location_name)+'</div>' : '')+(ev.short_note ? '<p>'+esc(ev.short_note)+'</p>' : '')+'<em>Click for details</em></div>'+
      '<div class="cv-thumb">'+imgHtml(ev)+'</div>'+
    '</button>';
  }

  function renderMonth(){
    var grid = byId("cv-grid");
    if(!grid) return;
    grid.className = "cv-grid month";
    if(state.error){ grid.innerHTML = '<div class="cv-error">'+esc(state.error)+'</div>'; return; }
    if(state.loading){ grid.innerHTML = '<div class="cv-empty">Loading events...</div>'; return; }
    var d = state.monthCursor || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    state.monthCursor = d;
    var start = new Date(d.getFullYear(), d.getMonth(), 1);
    var calendarStart = addDays(start, -start.getDay());
    var html = '<div class="cv-weekdays">' + ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(function(x){ return '<div>'+x+'</div>'; }).join("") + '</div><div class="cv-month-grid">';
    for(var i=0; i<42; i++){
      var day = addDays(calendarStart, i);
      var key = ymd(day);
      var muted = day.getMonth() !== d.getMonth();
      var evs = state.visibleEvents.filter(function(ev){ var s=parseDate(ev.start_at); return s && ymd(s) === key; });
      html += '<div class="cv-month-day '+(muted?"muted":"")+'"><b>'+day.getDate()+'</b>' + evs.map(function(ev){
        var dt = parseDate(ev.start_at);
        var time = dt ? dt.toLocaleTimeString(undefined,{hour:"numeric", minute:"2-digit"}) : "";
        return '<button type="button" class="cv-chip '+(ev.cancelled?"cancelled":"")+'" data-cv-open="'+esc(ev.event_id)+'" style="--accent:'+accent(ev.event_type_name)+'">'+esc(ev.name)+'<span>'+esc(time)+'</span></button>';
      }).join("") + '</div>';
    }
    html += '</div>';
    grid.innerHTML = html;
  }

  function eventById(id){
    return state.events.find(function(ev){ return String(ev.event_id) === String(id); }) || null;
  }

  function openModal(id){
    var ev = eventById(id);
    if(!ev) return;
    var modal = byId("cv-modal");
    if(!modal) return;
    var map = ev.address || ev.location_name;
    var links = [];
    if(ev.rsvp_on && !ev.cancelled) links.push('<a class="primary" href="/member/event-rsvp?event='+encodeURIComponent(ev.event_id)+'">RSVP / View Attendees</a>');
    if(ev.zoom_url) links.push('<a href="'+esc(ev.zoom_url)+'" target="_blank" rel="noopener">Join Zoom</a>');
    if(ev.document_url) links.push('<a href="'+esc(ev.document_url)+'" target="_blank" rel="noopener">Open Document</a>');
    links.push('<button type="button" id="cv-one-ics">Download this event</button>');
    modal.innerHTML = '<div class="cv-modal"><header class="cv-modal-head"><div><span class="cv-eyebrow">'+esc(ev.event_type_name || "Event")+'</span><h2>'+esc(ev.name || "Event")+'</h2><p>'+esc(timeRange(ev))+(ev.location_name ? " · "+esc(ev.location_name) : "")+'</p></div><button type="button" id="cv-close">×</button></header><main class="cv-modal-main"><section><div class="cv-modal-img">'+imgHtml(ev)+'</div><div class="cv-panel"><b>Details</b>'+(ev.cancelled ? '<p class="cv-cancel">This event has been cancelled.</p>' : '')+(ev.short_note ? '<p><strong>'+esc(ev.short_note)+'</strong></p>' : '')+(ev.details_text ? '<p>'+esc(ev.details_text).split("\\n").join("<br>")+'</p>' : '<p>No additional details have been posted yet.</p>')+(ev.venue_note ? '<p><strong>Venue note:</strong> '+esc(ev.venue_note)+'</p>' : '')+'</div></section><aside><div class="cv-fact"><b>Date and Time</b><span>'+esc(timeRange(ev))+'</span></div>'+(ev.location_name ? '<div class="cv-fact"><b>Location</b><span>'+esc(ev.location_name)+'</span></div>' : '')+(ev.address ? '<div class="cv-fact"><b>Address</b><span>'+esc(ev.address)+'</span></div>' : '')+'<div class="cv-links">'+links.join("")+'</div>'+(map ? '<iframe class="cv-map" loading="lazy" src="https://www.google.com/maps?q='+encodeURIComponent(map)+'&output=embed"></iframe>' : '')+'</aside></main></div>';
    modal.classList.add("visible");
    modal.setAttribute("aria-hidden", "false");
    var close = byId("cv-close");
    if(close) close.onclick = closeModal;
    var one = byId("cv-one-ics");
    if(one) one.onclick = function(){ downloadIcs([ev], slugify(ev.name || "event") + ".ics"); };
  }

  function closeModal(){
    var modal = byId("cv-modal");
    if(modal){
      modal.classList.remove("visible");
      modal.setAttribute("aria-hidden", "true");
    }
  }

  function icsDate(dt, allDay){
    var d=parseDate(dt);
    if(!d) return "";
    if(allDay) return d.getFullYear()+String(d.getMonth()+1).padStart(2,"0")+String(d.getDate()).padStart(2,"0");
    return d.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}Z$/,"Z");
  }
  function icsEscape(s){
    return clean(s).replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,").split("\\n").join("\\n");
  }
  function buildIcs(events){
    var lines = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//SyncEtc//Calendar Viewer v1C//EN","CALSCALE:GREGORIAN","METHOD:PUBLISH","X-WR-CALNAME:"+icsEscape(activeCustomerLabel()+" Calendar")];
    events.forEach(function(ev){
      var all = !!ev.all_day;
      lines.push("BEGIN:VEVENT");
      lines.push("UID:"+icsEscape(ev.ics_uid || (ev.event_id+"@syncetc.com")));
      lines.push("DTSTAMP:"+icsDate(new Date().toISOString(), false));
      if(ev.start_at) lines.push((all ? "DTSTART;VALUE=DATE:" : "DTSTART:") + icsDate(ev.start_at, all));
      if(ev.end_at && !ev.no_end_time) lines.push((all ? "DTEND;VALUE=DATE:" : "DTEND:") + icsDate(ev.end_at, all));
      lines.push("SUMMARY:"+icsEscape(ev.name));
      if(ev.location_name || ev.address) lines.push("LOCATION:"+icsEscape([ev.location_name, ev.address].filter(Boolean).join(" - ")));
      if(ev.short_note || ev.details_text) lines.push("DESCRIPTION:"+icsEscape([ev.short_note, ev.details_text].filter(Boolean).join("\\n\\n")));
      if(ev.map_url) lines.push("URL:"+icsEscape(ev.map_url));
      lines.push("STATUS:"+(ev.cancelled ? "CANCELLED" : "CONFIRMED"));
      lines.push("END:VEVENT");
    });
    lines.push("END:VCALENDAR");
    return lines.join("\\r\\n");
  }
  function downloadIcs(events, filename){
    var blob = new Blob([buildIcs(events)], { type:"text/calendar;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename || "calendar.ics";
    document.body.appendChild(a);
    a.click();
    setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  function rerender(){
    if(!state.shell) return;
    state.shell.render(renderBody());
    afterRender();
  }

  function afterRender(){
    createFilters();
    applyFilters();
    var search = byId("cv-search");
    if(search) search.value = state.search;
  }

  function bind(){
    document.addEventListener("click", function(e){
      var view = e.target.closest && e.target.closest("[data-cv-view]");
      if(view){
        state.view = view.getAttribute("data-cv-view") || "list";
        rerender();
        return;
      }
      var df = e.target.closest && e.target.closest("[data-cv-date]");
      if(df){
        state.dateFilter = df.getAttribute("data-cv-date") || "upcoming";
        rerender();
        return;
      }
      var tf = e.target.closest && e.target.closest("[data-cv-type]");
      if(tf){
        state.typeFilter = tf.getAttribute("data-cv-type") || "all";
        rerender();
        return;
      }
      var open = e.target.closest && e.target.closest("[data-cv-open]");
      if(open){
        openModal(open.getAttribute("data-cv-open"));
        return;
      }
      if(e.target && e.target.id === "cv-download-visible"){
        downloadIcs(state.visibleEvents, slugify(activeCustomerLabel()) + "-visible-calendar.ics");
        return;
      }
      if(e.target && e.target.id === "cv-prev-month"){
        state.monthCursor = new Date(state.monthCursor.getFullYear(), state.monthCursor.getMonth()-1, 1);
        renderEvents();
        return;
      }
      if(e.target && e.target.id === "cv-next-month"){
        state.monthCursor = new Date(state.monthCursor.getFullYear(), state.monthCursor.getMonth()+1, 1);
        renderEvents();
        return;
      }
      var modal = byId("cv-modal");
      if(modal && e.target === modal) closeModal();
    });

    document.addEventListener("input", function(e){
      if(e.target && e.target.id === "cv-search"){
        state.search = e.target.value || "";
        applyFilters();
      }
    });

    document.addEventListener("keydown", function(e){
      if(e.key === "Escape") closeModal();
    });

    document.addEventListener("syncetc:shell-structural-change", function(){
      reloadCalendar();
    });
    document.addEventListener("syncetc:customer-change", function(){
      reloadCalendar();
    });
  }

  function reloadCalendar(){
    fetchData().then(function(){ rerender(); });
  }

  function init(){
    ensureComponents().then(function(){
      var mountId = "syncetc-webflow-mount";
      var mount = document.getElementById(mountId);
      if(!mount){
        mount = document.createElement("div");
        mount.id = mountId;
        document.body.appendChild(mount);
      }

      if(window.SyncEtc && window.SyncEtc.AuthModal && window.SyncEtc.AuthModal.init) window.SyncEtc.AuthModal.init();

      state.shell = window.SyncEtc.Components.SiteShell.create(mountId, {
        pageKey:"events",
        audience:"public",
        version:VERSION,
        showBanner:false
      });

      if(window.SyncEtc && window.SyncEtc.AuthContext && window.SyncEtc.AuthContext.subscribe){
        window.SyncEtc.AuthContext.subscribe(function(){
          reloadCalendar();
        });
        return window.SyncEtc.AuthContext.init ? window.SyncEtc.AuthContext.init() : null;
      }
      return null;
    }).then(function(){
      bind();
      return fetchData();
    }).then(function(){
      rerender();
      console.log(VERSION + " loaded");
    }).catch(function(err){
      var mount = document.getElementById("syncetc-webflow-mount") || document.body;
      mount.innerHTML = '<div style="max-width:900px;margin:30px auto;padding:20px;border:1px solid #c44;border-radius:14px;color:#722;background:#fff">Could not load Calendar Viewer: '+esc(err.message || err)+'</div>';
    });
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
/* PAGE-CALENDAR-VIEWER-v1D.js - END */
