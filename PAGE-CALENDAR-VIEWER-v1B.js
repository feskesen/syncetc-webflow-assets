/* PAGE-CALENDAR-VIEWER-v1B.js - BEGIN */
(function () {
  "use strict";

  var VERSION = "PAGE-CALENDAR-VIEWER-v1B";
  var SUPABASE_URL = "https://ocdaohkiwonjmirqkjww.supabase.co";
  var VIEWER_ENDPOINT = SUPABASE_URL + "/functions/v1/syncetc-calendar-viewer-read";
  var DEFAULT_CUSTOMER_KEY = "demo_flying_club";

  var CURRENT_SCRIPT_SRC = document.currentScript && document.currentScript.src ? document.currentScript.src : "";
  var COMPONENT_FILES = [
    "COMPONENT-shared-utils-v1.js",
    "COMPONENT-customer-style-v1.js",
    "COMPONENT-base-styles-v1.js",
    "COMPONENT-auth-context-v1B.js",
    "COMPONENT-auth-modal-v1.js",
    "COMPONENT-customer-switcher-v1.js",
    "COMPONENT-access-guard-v1.js",
    "COMPONENT-master-header-v2.js",
    "COMPONENT-scroll-banner-v1.js",
    "COMPONENT-master-footer-v1.js",
    "COMPONENT-site-shell-v1.js"
  ];

  var state = {
    customerKey: "",
    customerName: "",
    customerConfig: null,
    authReady: false,
    authState: null,
    userEmail: "",
    userLabel: "",
    roleLabel: "",
    events: [],
    visibleEvents: [],
    view: "list",
    dateFilter: "upcoming",
    typeFilter: "all",
    search: "",
    monthCursor: null,
    loading: true,
    error: "",
    shellMode: "integrated"
  };

  function clean(v) { return v == null ? "" : String(v).trim(); }
  function esc(v) {
    return clean(v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  function getNested(obj, path) {
    try { return path.split(".").reduce(function (o, k) { return o && o[k]; }, obj); }
    catch (e) { return ""; }
  }
  function titleFromKey(key) {
    return clean(key).replace(/_/g, " ").replace(/\b\w/g, function (m) { return m.toUpperCase(); }) || "Calendar";
  }
  function cssUrl(url) {
    return clean(url).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
  }
  function dateObj(v) {
    if (!v) return null;
    var d = v instanceof Date ? v : new Date(String(v));
    return isNaN(d.getTime()) ? null : d;
  }
  function todayStart() {
    var n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  }
  function addDays(d, n) {
    var x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    x.setDate(x.getDate() + n);
    return x;
  }
  function ymd(d) {
    return d ? [d.getFullYear(), String(d.getMonth() + 1).padStart(2, "0"), String(d.getDate()).padStart(2, "0")].join("-") : "";
  }
  function sameDay(a, b) {
    return !!(a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate());
  }
  function slug(s) {
    return clean(s).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").substring(0, 60) || "calendar";
  }

  function componentBaseUrl() {
    if (window.SYNCETC_COMPONENT_BASE_URL) return String(window.SYNCETC_COMPONENT_BASE_URL).replace(/\/?$/, "/");
    if (CURRENT_SCRIPT_SRC) return CURRENT_SCRIPT_SRC.substring(0, CURRENT_SCRIPT_SRC.lastIndexOf("/") + 1);
    return "https://feskesen.github.io/syncetc-webflow-assets/assets/";
  }
  function loadScriptOnce(src) {
    return new Promise(function (resolve) {
      var scripts = Array.prototype.slice.call(document.scripts || []);
      var existing = scripts.find(function (s) { return s.src === src; });
      if (existing) return resolve({ ok: true, src: src, existing: true });
      var script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = function () { resolve({ ok: true, src: src }); };
      script.onerror = function () { resolve({ ok: false, src: src }); };
      document.head.appendChild(script);
    });
  }
  function ensureComponents() {
    var baseUrl = componentBaseUrl();
    return COMPONENT_FILES.reduce(function (p, file) {
      return p.then(function () { return loadScriptOnce(baseUrl + file); });
    }, Promise.resolve()).then(function () { return true; });
  }

  function callIf(fn, args) {
    try {
      if (typeof fn === "function") return fn.apply(null, args || []);
    } catch (e) {}
    return null;
  }
  function authComponent() {
    return getNested(window, "SyncEtc.Components.AuthContext") ||
      getNested(window, "SyncEtc.AuthContext") ||
      getNested(window, "SyncEtc.Auth") ||
      null;
  }
  function authStateCandidates() {
    var ac = authComponent() || {};
    return [
      ac.state,
      ac.current,
      ac.context,
      callIf(ac.getState, []),
      callIf(ac.getContext, []),
      callIf(ac.readState, []),
      getNested(window, "SyncEtc.AuthContext.state"),
      getNested(window, "SyncEtc.Components.AuthContext.state"),
      getNested(window, "SyncEtc.authState")
    ];
  }
  function normalizeCustomer(raw) {
    if (!raw) return null;
    return {
      customer_key: clean(raw.customer_key || raw.customerKey || raw.key || raw.id),
      name: clean(raw.name || raw.customer_name || raw.customerName || raw.display_name || raw.displayName),
      role: clean(raw.role || raw.customer_role || raw.customerRole || raw.role_name || raw.roleName)
    };
  }
  function getMembershipCustomers(authState) {
    var raw = [];
    if (authState) {
      raw = raw.concat(authState.customers || []);
      raw = raw.concat(authState.memberships || []);
      raw = raw.concat(authState.customerMemberships || []);
      raw = raw.concat(authState.customer_memberships || []);
    }
    var seen = {};
    return raw.map(normalizeCustomer).filter(function (c) {
      if (!c || !c.customer_key || seen[c.customer_key]) return false;
      seen[c.customer_key] = true;
      return true;
    });
  }
  function readActiveCustomerFromStorage() {
    var keys = ["syncetc_active_customer", "syncetc.activeCustomer", "syncetc_active_customer_key", "syncetc.activeCustomerKey"];
    for (var i = 0; i < keys.length; i++) {
      try {
        var raw = localStorage.getItem(keys[i]);
        if (!raw) continue;
        if (raw.charAt(0) === "{") {
          var parsed = JSON.parse(raw);
          var k = parsed.customer_key || parsed.customerKey || parsed.key;
          if (k) return clean(k);
        }
        if (/^[a-z0-9_-]+$/i.test(raw)) return clean(raw);
      } catch (e) {}
    }
    return "";
  }
  function writeActiveCustomerToStorage(key, name) {
    try {
      localStorage.setItem("syncetc_active_customer_key", key);
      localStorage.setItem("syncetc_active_customer", JSON.stringify({ customer_key: key, name: name || titleFromKey(key) }));
    } catch (e) {}
  }
  function resolveAuthState() {
    var candidates = authStateCandidates();
    for (var i = 0; i < candidates.length; i++) {
      if (candidates[i] && typeof candidates[i] === "object") return candidates[i];
    }
    return null;
  }
  function resolveActiveCustomer() {
    var qs = new URLSearchParams(window.location.search);
    var urlKey = clean(qs.get("customer_key") || qs.get("customer"));
    var authState = resolveAuthState();
    var active = normalizeCustomer(authState && (authState.activeCustomer || authState.active_customer || authState.customer));
    var memberships = getMembershipCustomers(authState);
    var storedKey = readActiveCustomerFromStorage();
    var key = urlKey || (active && active.customer_key) || storedKey || clean(window.SYNCETC_ACTIVE_CUSTOMER_KEY || window.SYNCETC_CUSTOMER_KEY) || DEFAULT_CUSTOMER_KEY;
    var match = memberships.find(function (c) { return c.customer_key === key; });
    var name = (match && match.name) || (active && active.customer_key === key && active.name) || titleFromKey(key);
    return { customer_key: key, name: name, role: (match && match.role) || (active && active.customer_key === key && active.role) || "" };
  }
  function refreshAuthSnapshot() {
    state.authState = resolveAuthState();
    var auth = state.authState || {};
    var user = auth.user || auth.profile || auth.session && auth.session.user || {};
    state.userEmail = clean(user.email || auth.email || getNested(auth, "session.user.email"));
    state.userLabel = clean(user.full_name || user.name || user.display_name || user.first_name || state.userEmail || "");
    state.roleLabel = clean(auth.platformRole || auth.platform_role || auth.role || "");
    var customer = resolveActiveCustomer();
    state.customerKey = customer.customer_key || DEFAULT_CUSTOMER_KEY;
    state.customerName = customer.name || titleFromKey(state.customerKey);
    if (customer.role) state.roleLabel = customer.role;
    if (!state.roleLabel && state.userEmail) state.roleLabel = "Signed in";
  }
  function initAuthContext() {
    var ac = authComponent();
    if (!ac) {
      refreshAuthSnapshot();
      state.authReady = true;
      return Promise.resolve();
    }
    var p = callIf(ac.initialize, []) || callIf(ac.init, []) || callIf(ac.bootstrap, []) || callIf(ac.ready, []);
    return Promise.resolve(p).catch(function () {}).then(function () {
      refreshAuthSnapshot();
      state.authReady = true;
    });
  }
  function openLogin() {
    var modal = getNested(window, "SyncEtc.Components.AuthModal") || getNested(window, "SyncEtc.AuthModal") || {};
    if (callIf(modal.open, [])) return;
    if (callIf(modal.show, [])) return;
    var ac = authComponent() || {};
    if (callIf(ac.openLogin, [])) return;
    alert("Login modal is not available on this page yet. Confirm COMPONENT-auth-modal-v1.js is loaded.");
  }
  function logout() {
    var ac = authComponent() || {};
    var p = callIf(ac.signOut, []) || callIf(ac.logout, []);
    Promise.resolve(p).catch(function () {}).then(function () {
      refreshAuthSnapshot();
      reloadForCustomer(state.customerKey, state.customerName);
    });
  }

  function applyCustomerStyle() {
    var comps = window.SyncEtc && window.SyncEtc.Components ? window.SyncEtc.Components : {};
    var cfg = null;
    try {
      if (comps.CustomerStyle && typeof comps.CustomerStyle.getCustomerConfig === "function") {
        cfg = comps.CustomerStyle.getCustomerConfig(state.customerName || state.customerKey);
      }
    } catch (e) {}
    state.customerConfig = cfg || {
      customerName: state.customerName,
      shortName: state.customerName,
      fullName: state.customerName,
      division: "Aviation",
      theme: { navy: "#12365a", navyDark: "#0b2744", blue: "#2f80c4", sky: "#eaf5ff", text: "#1e2933", muted: "#5d6b78" }
    };
    try {
      if (comps.CustomerStyle && typeof comps.CustomerStyle.applyCustomerCssVars === "function") {
        comps.CustomerStyle.applyCustomerCssVars(document.documentElement, state.customerConfig);
      }
    } catch (e) {}
  }

  function fetchCalendar() {
    state.loading = true;
    state.error = "";
    refreshAuthSnapshot();
    applyCustomerStyle();
    writeActiveCustomerToStorage(state.customerKey, state.customerName);
    var url = VIEWER_ENDPOINT + "?customer_key=" + encodeURIComponent(state.customerKey);
    return fetch(url, { credentials: "omit" }).then(function (r) {
      if (!r.ok) throw new Error("Calendar read failed: " + r.status);
      return r.json();
    }).then(function (payload) {
      if (!payload || payload.ok === false) throw new Error((payload && payload.error) || "Calendar read failed.");
      state.customerName = clean(payload.customer && payload.customer.name) || state.customerName || titleFromKey(state.customerKey);
      state.events = (payload.events || []).map(normalizeEvent).sort(sortEvents);
      var firstUpcoming = state.events.map(function (e) { return dateObj(e.start_at); }).filter(function (d) { return d && d >= todayStart(); }).sort(function (a, b) { return a - b; })[0];
      var firstAny = state.events.map(function (e) { return dateObj(e.start_at); }).filter(Boolean).sort(function (a, b) { return a - b; })[0];
      var base = firstUpcoming || firstAny || new Date();
      state.monthCursor = new Date(base.getFullYear(), base.getMonth(), 1);
      state.loading = false;
    }).catch(function (err) {
      state.loading = false;
      state.error = err && err.message ? err.message : "Calendar could not load.";
    });
  }

  function normalizeEvent(original) {
    var ev = Object.assign({}, original || {});
    ev.event_id = ev.event_id || ev.id || ev.slug || "";
    ev.access_level = ev.access_level || "Public";
    ev.event_type_name = ev.event_type_name || ev.event_type_key || "Event";
    ev.image_url = ev.image_url || "";
    ev.location_name = ev.location_name || "";
    ev.short_note = ev.short_note || "";
    ev.details_text = ev.details_text || "";
    ev.date_note = ev.date_note || "";
    ev.venue_note = ev.venue_note || "";
    ev.document_url = ev.document_url || "";
    ev.zoom_url = ev.zoom_url || "";
    ev.map_url = ev.map_url || "";
    ev.all_day = !!ev.all_day;
    ev.no_end_time = !!ev.no_end_time;
    ev.rsvp_on = !!ev.rsvp_on;
    ev.supplies_on = !!ev.supplies_on;
    ev.home_on = !!ev.home_on;
    ev.approved = ev.approved !== false && ev.approved !== "false";
    ev.cancelled = !!ev.cancelled;
    ev.sort_order = parseInt(ev.sort_order || "999", 10) || 999;
    return ev;
  }
  function sortEvents(a, b) {
    var ad = dateObj(a.start_at), bd = dateObj(b.start_at);
    var at = ad ? ad.getTime() : 9999999999999;
    var bt = bd ? bd.getTime() : 9999999999999;
    return at - bt || (a.sort_order || 999) - (b.sort_order || 999) || clean(a.name).localeCompare(clean(b.name));
  }
  function normalizeAccess(v) {
    var s = clean(v).toLowerCase();
    if (!s || s.indexOf("public") >= 0) return "Public";
    if (s.indexOf("member") >= 0) return "Member";
    if (s.indexOf("committee") >= 0) return "Committee";
    if (s.indexOf("board") >= 0) return "Board";
    return clean(v) || "Public";
  }
  function eventStatus(ev) {
    var s = dateObj(ev.start_at);
    if (!s) return "upcoming";
    return s < todayStart() ? "past" : "upcoming";
  }
  function accent(type) {
    var t = clean(type).toLowerCase();
    if (t.indexOf("board") >= 0) return "#b4232a";
    if (t.indexOf("member") >= 0) return "#2f80c4";
    if (t.indexOf("fly") >= 0 || t.indexOf("flight") >= 0) return "#188269";
    if (t.indexOf("bbq") >= 0 || t.indexOf("barbecue") >= 0) return "#c77718";
    if (t.indexOf("wash") >= 0 || t.indexOf("wax") >= 0) return "#66788a";
    return "#2f80c4";
  }
  function fmtRange(ev) {
    var s = dateObj(ev.start_at), e = dateObj(ev.end_at);
    if (!s) return "Date not set";
    if (ev.all_day) return s.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" }) + " · All day";
    var a = s.toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
    if (ev.no_end_time || !e) return a;
    if (sameDay(s, e)) return a + " to " + e.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
    return a + " to " + e.toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
  }
  function dateParts(ev) {
    var d = dateObj(ev.start_at);
    if (!d) return { m: "", d: "", y: "" };
    return { m: d.toLocaleString(undefined, { month: "short" }), d: d.toLocaleString(undefined, { day: "numeric" }), y: d.toLocaleString(undefined, { year: "numeric" }) };
  }
  function imgHtml(ev) {
    return ev.image_url ? '<img src="' + esc(ev.image_url) + '" alt="' + esc(ev.name || "Event image") + '">' : '<div class="se-cal-img-ph">Event</div>';
  }
  function searchText(ev) {
    return [ev.name, ev.event_type_name, ev.location_name, ev.address, ev.short_note, ev.details_text, ev.date_note, ev.venue_note].join(" ").toLowerCase();
  }

  function injectCss() {
    if (document.getElementById("se-calendar-viewer-v1b-css")) return;
    var css = document.createElement("style");
    css.id = "se-calendar-viewer-v1b-css";
    css.textContent = `
      :root{--se-navy:#12365a;--se-navy2:#0b2744;--se-blue:#2f80c4;--se-sky:#eaf5ff;--se-border:rgba(18,54,90,.14);--se-text:#1f2b36;--se-muted:#5f6d7b}
      body{background:linear-gradient(rgba(255,255,255,.76),rgba(255,255,255,.76)),var(--se-customer-bg,none) center/cover fixed no-repeat}
      #syncetc-webflow-mount,.syncetc-calendar-viewer{font-family:Arial,Helvetica,sans-serif;color:var(--se-text)}
      .se-shell{max-width:1180px;margin:22px auto 56px;padding:0 18px}
      .se-header{display:grid;grid-template-columns:1fr auto;gap:16px;align-items:center;margin:0 0 18px;border-radius:20px;background:rgba(255,255,255,.94);border:1px solid var(--se-border);box-shadow:0 14px 34px rgba(12,38,64,.12);overflow:hidden}
      .se-brand{padding:16px 20px;background:linear-gradient(135deg,var(--se-navy),var(--se-blue));color:#fff}
      .se-brand span{display:inline-flex;margin-bottom:8px;padding:5px 10px;border-radius:999px;background:rgba(255,255,255,.16);font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
      .se-brand h1{margin:0;color:#fff;font-size:26px;line-height:1.1}.se-brand p{margin:6px 0 0;color:rgba(255,255,255,.88);font-size:13px}
      .se-head-tools{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;gap:8px;padding:14px 16px}
      .se-status-pill,.se-head-tools button,.se-head-tools select{min-height:36px;border:1px solid rgba(18,54,90,.18);border-radius:999px;background:#fff;color:var(--se-navy);font-size:12px;font-weight:900;padding:8px 12px}
      .se-head-tools select{border-radius:12px;max-width:230px}.se-status-pill{background:rgba(234,245,255,.72)}
      .se-nav{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 18px;padding:10px;border-radius:18px;background:rgba(255,255,255,.9);border:1px solid var(--se-border);box-shadow:0 8px 22px rgba(12,38,64,.08)}
      .se-nav a{padding:8px 13px;border-radius:999px;color:var(--se-navy);text-decoration:none;font-size:13px;font-weight:900}.se-nav a.active{background:var(--se-navy);color:#fff}
      .se-cal-wrap{margin:0 auto 22px}.se-cal-hero{display:grid;grid-template-columns:1fr auto;gap:22px;align-items:start;padding:34px;border-radius:26px 26px 0 0;background:linear-gradient(135deg,rgba(18,54,90,.96),rgba(47,128,196,.88));color:#fff;box-shadow:0 18px 50px rgba(12,38,64,.22)}
      .se-cal-kicker,.se-modal header span{display:inline-flex;margin-bottom:10px;padding:6px 12px;border-radius:999px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.24);font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
      .se-cal-hero h2{margin:0;font-size:clamp(30px,4vw,48px);line-height:1.05;color:#fff}.se-cal-hero p{max-width:780px;margin:14px 0 0;color:rgba(255,255,255,.9);line-height:1.6}.se-cal-note{font-size:14px!important;color:rgba(255,255,255,.82)!important}
      .se-cal-actions,.se-cal-filters,.se-cal-export{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end}
      button.se-view,.se-filter,.se-cal-export button,.se-month-controls button,.se-links a,.se-links button{min-height:38px;border:1px solid rgba(18,54,90,.18);border-radius:999px;padding:9px 13px;background:#fff;color:var(--se-navy);font-size:12px;font-weight:900;text-decoration:none;cursor:pointer}
      .se-view.active,.se-filter.active,.se-links .primary{background:var(--se-navy);border-color:var(--se-navy);color:#fff}
      .se-cal-toolbar{display:grid;grid-template-columns:minmax(280px,360px) 1fr;gap:16px;align-items:end;padding:18px 30px;background:rgba(255,255,255,.95);border:1px solid var(--se-border);border-top:none}
      .se-cal-toolbar label{display:block;margin-bottom:6px;color:var(--se-navy2);font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.se-cal-toolbar input{width:100%;min-height:42px;border:1px solid rgba(18,54,90,.18);border-radius:14px;padding:10px 13px;font-size:14px}
      .se-cal-meta{display:grid;grid-template-columns:1fr auto auto;gap:16px;align-items:center;padding:16px 30px;background:#fff;border-left:1px solid var(--se-border);border-right:1px solid var(--se-border)}#se-cal-status{color:var(--se-muted);font-size:14px;font-weight:900}.se-month-controls{display:none;align-items:center;gap:10px}.se-month-controls strong{min-width:150px;text-align:center}
      .se-cal-grid{padding:24px 30px 32px;background:rgba(255,255,255,.96);border:1px solid var(--se-border);border-radius:0 0 26px 26px;box-shadow:0 18px 50px rgba(12,38,64,.16)}.se-cal-grid.list,.se-cal-grid.compact-list{display:grid;gap:14px}
      .se-card{--accent:#2f80c4;display:grid;grid-template-columns:112px 1fr 150px;min-height:154px;width:100%;padding:0;text-align:left;background:#fff;border:1px solid rgba(18,54,90,.14);border-left:6px solid var(--accent);border-radius:18px;box-shadow:0 10px 26px rgba(12,38,64,.10);overflow:hidden;cursor:pointer}.se-card.cancelled{border-left-color:#9d2a2a;background:linear-gradient(0deg,rgba(157,42,42,.04),rgba(157,42,42,.04)),#fff}
      .se-date{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:2px;background:var(--se-navy);color:#fff;padding:18px 10px;text-align:center}.se-date b{font-size:13px;letter-spacing:.08em;text-transform:uppercase}.se-date strong{font-size:40px;line-height:1}.se-date span{font-size:13px;font-weight:800;opacity:.86}
      .se-body{padding:22px 16px;min-width:0}.se-pills{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:8px}.se-pills span{display:inline-flex;border-radius:999px;padding:5px 9px;background:rgba(18,54,90,.08);color:var(--se-navy);font-size:10px;font-weight:900;letter-spacing:.06em;text-transform:uppercase}.se-pills .warn,.se-date-note,.se-cancel{color:#9d2a2a}.se-body h3{margin:0;color:var(--se-navy2);font-size:23px;line-height:1.18}.se-line{margin-top:8px;color:#213f68;font-size:13px;line-height:1.45;font-weight:800}.se-body p{margin:8px 0 0;color:#304d73;font-size:14px;line-height:1.45}.se-body em{display:block;margin-top:10px;color:var(--se-muted);font-style:normal;font-size:11px;font-weight:900;letter-spacing:.06em;text-transform:uppercase}
      .se-thumb{display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(234,245,255,.42);border-left:1px solid rgba(18,54,90,.10)}.se-thumb img,.se-modal-img img{max-width:118px;max-height:118px;object-fit:contain;border-radius:14px;background:#fff;border:1px solid rgba(18,54,90,.10);padding:8px}.se-cal-grid.compact-list .se-card{grid-template-columns:86px 1fr 96px;min-height:104px}.se-cal-grid.compact-list .se-date strong{font-size:30px}.se-cal-grid.compact-list .se-body{padding:14px}.se-cal-grid.compact-list .se-body h3{font-size:19px}.se-cal-grid.compact-list .se-body p,.se-cal-grid.compact-list .se-body em{display:none}.se-cal-grid.compact-list .se-thumb img,.se-cal-grid.compact-list .se-cal-img-ph{max-width:72px;max-height:72px}
      .se-cal-img-ph{width:118px;height:118px;border-radius:14px;border:1px dashed rgba(18,54,90,.22);display:flex;align-items:center;justify-content:center;color:var(--se-muted);font-size:12px;font-weight:900;background:rgba(255,255,255,.7)}
      .se-weekdays,.se-month-grid{display:grid;grid-template-columns:repeat(7,1fr)}.se-weekdays div{padding:0 8px 8px;text-align:center;color:var(--se-muted);font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.se-month-grid{border:1px solid rgba(18,54,90,.12);border-radius:18px;overflow:hidden}.se-month-day{min-height:124px;padding:8px;border-right:1px solid rgba(18,54,90,.10);border-bottom:1px solid rgba(18,54,90,.10);background:#fff}.se-month-day.muted{background:rgba(234,245,255,.44)}.se-month-day>b{display:block;margin-bottom:6px;color:var(--se-navy2);font-size:12px}.se-chip{display:block;width:100%;margin:5px 0;padding:6px 7px;border:0;border-bottom:4px solid var(--accent);border-radius:9px;background:rgba(234,245,255,.95);color:var(--se-navy2);font-size:11px;line-height:1.25;font-weight:900;text-align:left;cursor:pointer}.se-chip span{display:block;margin-top:2px;color:var(--se-muted);font-size:10px}
      .se-empty,.se-error{padding:22px;border-radius:18px;background:#fff;border:1px solid rgba(18,54,90,.12);color:var(--se-muted)}.se-error{border-color:#d44;color:#8a1f1f}
      .se-footer{margin-top:18px;padding:16px 20px;border-radius:18px;background:rgba(255,255,255,.92);border:1px solid var(--se-border);color:var(--se-muted);font-size:12px;font-weight:800;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}.se-footer b{color:var(--se-navy)}
      .se-modal{position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(5,15,30,.72);z-index:999999;padding:18px}.se-modal.show{display:flex}.se-modal-card{width:100%;max-width:1060px;max-height:92vh;overflow:hidden;border-radius:24px;background:#fff;box-shadow:0 18px 60px rgba(0,0,0,.36);display:flex;flex-direction:column}.se-modal header{display:flex;justify-content:space-between;gap:18px;padding:22px;background:linear-gradient(135deg,rgba(18,54,90,.96),rgba(47,128,196,.88));color:#fff}.se-modal header h2{margin:0 0 8px;font-size:30px;color:#fff}.se-modal header p{margin:0;color:rgba(255,255,255,.88)}.se-modal header button{width:38px;height:38px;border-radius:999px;border:0;background:rgba(255,255,255,.14);color:#fff;font-size:24px;cursor:pointer}.se-modal main{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:18px;padding:22px;overflow:auto}.se-modal-img,.se-panel,.se-fact{padding:16px;border-radius:16px;border:1px solid rgba(18,54,90,.12);background:#fff;margin-bottom:12px}.se-modal-img{display:flex;align-items:center;justify-content:center;min-height:230px;background:#f8fbff}.se-modal-img img{max-width:100%;max-height:220px}.se-panel>b,.se-fact b{display:block;margin-bottom:8px;color:var(--se-navy2);font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.se-fact span{display:block;color:#304d73;font-size:13px;line-height:1.5;font-weight:700}.se-links{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}.se-map{width:100%;height:220px;border:0;border-radius:16px}.se-version{margin-top:10px;text-align:right;color:rgba(18,54,90,.55);font-size:11px;font-weight:800}
      @media(max-width:980px){.se-header,.se-cal-hero,.se-cal-toolbar,.se-modal main{grid-template-columns:1fr}.se-head-tools,.se-cal-actions,.se-cal-filters,.se-cal-export{justify-content:flex-start}.se-cal-meta{grid-template-columns:1fr}.se-card{grid-template-columns:92px 1fr}.se-thumb{grid-column:1/-1;border-left:0;border-top:1px solid rgba(18,54,90,.10)}}
      @media(max-width:720px){.se-shell{width:calc(100% - 24px);padding:0;margin:18px auto 42px}.se-card,.se-cal-grid.compact-list .se-card{grid-template-columns:1fr}.se-date{min-height:auto;flex-direction:row;justify-content:flex-start;gap:8px;padding:14px 16px}.se-month-day{min-height:92px;padding:5px}.se-chip{font-size:10px;padding:5px}}
    `;
    document.head.appendChild(css);
  }

  function availableCustomersHtml() {
    var authState = state.authState || resolveAuthState();
    var customers = getMembershipCustomers(authState);
    var current = state.customerKey || DEFAULT_CUSTOMER_KEY;
    if (!customers.some(function (c) { return c.customer_key === current; })) {
      customers.unshift({ customer_key: current, name: state.customerName || titleFromKey(current), role: "" });
    }
    return '<select id="se-customer-select" aria-label="Active customer">' +
      customers.map(function (c) {
        return '<option value="' + esc(c.customer_key) + '"' + (c.customer_key === current ? ' selected' : '') + '>' + esc(c.name || titleFromKey(c.customer_key)) + '</option>';
      }).join("") +
      '</select>';
  }
  function authControlsHtml() {
    var status = state.userEmail ? esc(state.userLabel || state.userEmail) : "Guest";
    var role = state.roleLabel ? " · " + esc(state.roleLabel) : "";
    return '' +
      '<span class="se-status-pill">' + status + role + '</span>' +
      availableCustomersHtml() +
      (state.userEmail ? '<button id="se-logout">Logout</button>' : '<button id="se-login">Login</button>');
  }
  function navHtml() {
    return '' +
      '<nav class="se-nav" aria-label="SyncEtc navigation">' +
      '<a href="/syncetc-home">Home</a>' +
      '<a href="/syncetc-info">Info</a>' +
      '<a href="/syncetc-aircraft">Aircraft</a>' +
      '<a class="active" href="/syncetc-calendar">Calendar</a>' +
      '<a href="/syncetc-gallery-submit">Gallery Submit</a>' +
      '<a href="/syncetc-gallery-admin">Gallery Admin</a>' +
      '<a href="/syncetc-event-admin">Event Admin</a>' +
      '</nav>';
  }
  function pageHtml() {
    var title = "Calendar";
    var intro = "Upcoming meetings, fly-outs, work sessions, and other events.";
    return '' +
      '<div class="se-shell">' +
        '<header class="se-header">' +
          '<div class="se-brand"><span>' + esc(state.customerName || titleFromKey(state.customerKey)) + '</span><h1>SyncEtc</h1><p>Customer-aware portal shell. Header, login, customer context, and page styling should remain reusable across modules.</p></div>' +
          '<div class="se-head-tools">' + authControlsHtml() + '</div>' +
        '</header>' +
        navHtml() +
        '<section class="se-cal-wrap">' +
          '<section class="se-cal-hero"><div><div class="se-cal-kicker">' + esc(state.customerName || titleFromKey(state.customerKey)) + '</div><h2>' + esc(title) + '</h2><p>' + esc(intro) + '</p><p class="se-cal-note">Select an event card for details, links, notes, and location information.</p></div><div class="se-cal-actions"><button data-view="list" class="se-view active">List</button><button data-view="compact" class="se-view">Compact</button><button data-view="month" class="se-view">Month</button></div></section>' +
          '<section class="se-cal-toolbar"><div><label>Search events</label><input id="se-cal-search" type="search" placeholder="Search title, type, location, address, or notes"></div><div id="se-cal-filters" class="se-cal-filters"></div></section>' +
          '<section class="se-cal-meta"><div id="se-cal-status">Loading events...</div><div id="se-month-controls" class="se-month-controls"><button id="se-prev-month">‹</button><strong id="se-month-label">Month</strong><button id="se-next-month">›</button></div><div class="se-cal-export"><button id="se-download-visible">Download .ics</button></div></section>' +
          '<main id="se-cal-grid" class="se-cal-grid"></main><div class="se-version">' + VERSION + ' · ' + esc(state.customerKey) + '</div>' +
        '</section>' +
        '<footer class="se-footer"><span><b>Powered by SyncEtc</b> · Customer-aware calendar viewer</span><span>Public-safe v1B: approved public events only</span></footer>' +
      '</div><div id="se-cal-modal" class="se-modal" aria-hidden="true"></div>';
  }

  function createFilters() {
    var box = document.getElementById("se-cal-filters");
    if (!box) return;
    var types = {};
    state.events.forEach(function (ev) { if (ev.event_type_name) types[ev.event_type_name] = true; });
    box.innerHTML = '<button class="se-filter active" data-date="upcoming">Upcoming</button><button class="se-filter" data-date="past">Past</button><button class="se-filter" data-date="all">All Dates</button><span></span><button class="se-filter active" data-type="all">All Types</button>' +
      Object.keys(types).sort().map(function (t) { return '<button class="se-filter" data-type="' + esc(t) + '">' + esc(t) + '</button>'; }).join("");
    box.querySelectorAll("[data-date]").forEach(function (b) {
      b.onclick = function () {
        state.dateFilter = b.getAttribute("data-date");
        box.querySelectorAll("[data-date]").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        applyFilters();
      };
    });
    box.querySelectorAll("[data-type]").forEach(function (b) {
      b.onclick = function () {
        state.typeFilter = b.getAttribute("data-type");
        box.querySelectorAll("[data-type]").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        applyFilters();
      };
    });
  }
  function applyFilters() {
    state.visibleEvents = state.events.filter(function (ev) {
      if (!ev.approved) return false;
      var status = eventStatus(ev);
      if (state.dateFilter !== "all" && status !== state.dateFilter) return false;
      if (state.typeFilter !== "all" && clean(ev.event_type_name) !== state.typeFilter) return false;
      if (state.search && searchText(ev).indexOf(state.search.toLowerCase()) < 0) return false;
      return true;
    }).sort(sortEvents);
    renderEvents();
  }
  function card(ev, compact) {
    var p = dateParts(ev), st = fmtRange(ev), acc = normalizeAccess(ev.access_level), ac = ev.cancelled ? "#9d2a2a" : accent(ev.event_type_name);
    return '<button class="se-card ' + (compact ? "compact " : "") + (ev.cancelled ? "cancelled" : "") + '" style="--accent:' + ac + '" data-id="' + esc(ev.event_id) + '"><div class="se-date"><b>' + esc(p.m) + '</b><strong>' + esc(p.d) + '</strong><span>' + esc(p.y) + '</span></div><div class="se-body"><div class="se-pills"><span>' + esc(ev.event_type_name || "Event") + '</span>' + (acc === "Public" ? "" : '<span class="warn">' + esc(acc) + '</span>') + (ev.rsvp_on && !ev.cancelled ? "<span>RSVP Open</span>" : "") + (ev.cancelled ? '<span class="warn">Cancelled</span>' : "") + '</div><h3>' + esc(ev.name || "Untitled Event") + '</h3>' + (ev.date_note ? '<div class="se-date-note">' + esc(ev.date_note) + '</div>' : '') + '<div class="se-line">' + esc(st) + '</div>' + (ev.location_name ? '<div class="se-line">' + esc(ev.location_name) + '</div>' : '') + (ev.short_note ? '<p>' + esc(ev.short_note) + '</p>' : '') + '<em>Click for details</em></div><div class="se-thumb">' + imgHtml(ev) + '</div></button>';
  }
  function renderList(compact) {
    var grid = document.getElementById("se-cal-grid");
    if (!grid) return;
    grid.className = "se-cal-grid " + (compact ? "compact-list" : "list");
    if (state.error) {
      grid.innerHTML = '<div class="se-error">' + esc(state.error) + '</div>';
      return;
    }
    if (state.loading) {
      grid.innerHTML = '<div class="se-empty">Loading events...</div>';
      return;
    }
    grid.innerHTML = state.visibleEvents.length ? state.visibleEvents.map(function (ev) { return card(ev, compact); }).join("") : '<div class="se-empty">No events match the current filters.</div>';
    grid.querySelectorAll("[data-id]").forEach(function (el) { el.onclick = function () { openModal(el.getAttribute("data-id")); }; });
  }
  function renderMonth() {
    var grid = document.getElementById("se-cal-grid");
    if (!grid) return;
    grid.className = "se-cal-grid month";
    if (state.error) { grid.innerHTML = '<div class="se-error">' + esc(state.error) + '</div>'; return; }
    var d = state.monthCursor || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    state.monthCursor = d;
    var start = new Date(d.getFullYear(), d.getMonth(), 1);
    var calendarStart = addDays(start, -start.getDay());
    var html = '<div class="se-weekdays">' + ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(function (x) { return "<div>" + x + "</div>"; }).join("") + '</div><div class="se-month-grid">';
    for (var i = 0; i < 42; i++) {
      var day = addDays(calendarStart, i);
      var key = ymd(day);
      var muted = day.getMonth() !== d.getMonth();
      var evs = state.visibleEvents.filter(function (ev) { var s = dateObj(ev.start_at); return s && ymd(s) === key; });
      html += '<div class="se-month-day ' + (muted ? "muted" : "") + '"><b>' + day.getDate() + '</b>' + evs.map(function (ev) {
        var time = dateObj(ev.start_at) ? dateObj(ev.start_at).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }) : "";
        return '<button class="se-chip ' + (ev.cancelled ? "cancelled" : "") + '" data-id="' + esc(ev.event_id) + '" style="--accent:' + accent(ev.event_type_name) + '">' + esc(ev.name) + '<span>' + esc(time) + '</span></button>';
      }).join("") + '</div>';
    }
    html += "</div>";
    grid.innerHTML = html;
    grid.querySelectorAll("[data-id]").forEach(function (el) { el.onclick = function () { openModal(el.getAttribute("data-id")); }; });
  }
  function renderEvents() {
    var status = document.getElementById("se-cal-status");
    if (status) {
      if (state.error) status.textContent = "Calendar unavailable.";
      else if (state.loading) status.textContent = "Loading events...";
      else status.textContent = state.visibleEvents.length + " visible event" + (state.visibleEvents.length === 1 ? "" : "s") + ".";
    }
    var mc = document.getElementById("se-month-controls");
    if (mc) mc.style.display = state.view === "month" ? "flex" : "none";
    var ml = document.getElementById("se-month-label");
    if (ml && state.monthCursor) ml.textContent = state.monthCursor.toLocaleDateString(undefined, { month: "long", year: "numeric" });
    if (state.view === "month") renderMonth(); else renderList(state.view === "compact");
  }

  function icsDate(dt, allDay) {
    var d = dateObj(dt);
    if (!d) return "";
    if (allDay) return d.getFullYear() + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0");
    return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  }
  function icsEscape(s) {
    return clean(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").split("\n").join("\\n");
  }
  function buildIcs(events) {
    var lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//SyncEtc//Calendar Viewer v1B//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "X-WR-CALNAME:" + icsEscape(state.customerName + " Calendar")];
    events.forEach(function (ev) {
      var all = !!ev.all_day;
      lines.push("BEGIN:VEVENT");
      lines.push("UID:" + icsEscape(ev.ics_uid || (ev.event_id + "@syncetc.com")));
      lines.push("DTSTAMP:" + icsDate(new Date().toISOString(), false));
      if (ev.start_at) lines.push((all ? "DTSTART;VALUE=DATE:" : "DTSTART:") + icsDate(ev.start_at, all));
      if (ev.end_at && !ev.no_end_time) lines.push((all ? "DTEND;VALUE=DATE:" : "DTEND:") + icsDate(ev.end_at, all));
      lines.push("SUMMARY:" + icsEscape(ev.name));
      if (ev.location_name || ev.address) lines.push("LOCATION:" + icsEscape([ev.location_name, ev.address].filter(Boolean).join(" - ")));
      if (ev.short_note || ev.details_text) lines.push("DESCRIPTION:" + icsEscape([ev.short_note, ev.details_text].filter(Boolean).join("\n\n")));
      if (ev.map_url) lines.push("URL:" + icsEscape(ev.map_url));
      lines.push("STATUS:" + (ev.cancelled ? "CANCELLED" : "CONFIRMED"));
      lines.push("END:VEVENT");
    });
    lines.push("END:VCALENDAR");
    return lines.join("\r\n");
  }
  function downloadIcs(events, filename) {
    var blob = new Blob([buildIcs(events)], { type: "text/calendar;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename || "calendar.ics";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }
  function openModal(id) {
    var ev = state.events.find(function (x) { return String(x.event_id) === String(id); });
    if (!ev) return;
    var modal = document.getElementById("se-cal-modal");
    if (!modal) return;
    var map = ev.address || ev.location_name;
    var links = [];
    if (ev.rsvp_on && !ev.cancelled) links.push('<a class="primary" href="/member/event-rsvp?event=' + encodeURIComponent(ev.event_id) + '">RSVP / View Attendees</a>');
    if (ev.zoom_url) links.push('<a href="' + esc(ev.zoom_url) + '" target="_blank" rel="noopener">Join Zoom</a>');
    if (ev.document_url) links.push('<a href="' + esc(ev.document_url) + '" target="_blank" rel="noopener">Open Document</a>');
    links.push('<button id="se-one-ics">Download this event</button>');
    modal.innerHTML = '<div class="se-modal-card"><header><div><span>' + esc(ev.event_type_name || "Event") + '</span><h2>' + esc(ev.name || "Event") + '</h2><p>' + esc(fmtRange(ev)) + (ev.location_name ? " · " + esc(ev.location_name) : "") + '</p></div><button id="se-close">×</button></header><main><section><div class="se-modal-img">' + imgHtml(ev) + '</div><div class="se-panel"><b>Details</b>' + (ev.cancelled ? '<p class="se-cancel">This event has been cancelled.</p>' : '') + (ev.short_note ? '<p><strong>' + esc(ev.short_note) + '</strong></p>' : '') + (ev.details_text ? '<p>' + esc(ev.details_text).split("\n").join("<br>") + '</p>' : '<p>No additional details have been posted yet.</p>') + (ev.venue_note ? '<p><strong>Venue note:</strong> ' + esc(ev.venue_note) + '</p>' : '') + '</div></section><aside><div class="se-fact"><b>Date and Time</b><span>' + esc(fmtRange(ev)) + '</span></div>' + (ev.location_name ? '<div class="se-fact"><b>Location</b><span>' + esc(ev.location_name) + '</span></div>' : '') + (ev.address ? '<div class="se-fact"><b>Address</b><span>' + esc(ev.address) + '</span></div>' : '') + '<div class="se-links">' + links.join("") + '</div>' + (map ? '<iframe class="se-map" loading="lazy" src="https://www.google.com/maps?q=' + encodeURIComponent(map) + '&output=embed"></iframe>' : '') + '</aside></main></div>';
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    var close = document.getElementById("se-close");
    if (close) close.onclick = closeModal;
    var one = document.getElementById("se-one-ics");
    if (one) one.onclick = function () { downloadIcs([ev], slug(ev.name || "event") + ".ics"); };
  }
  function closeModal() {
    var modal = document.getElementById("se-cal-modal");
    if (modal) {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    }
  }

  function reloadForCustomer(key, name) {
    state.customerKey = key || DEFAULT_CUSTOMER_KEY;
    state.customerName = name || titleFromKey(state.customerKey);
    writeActiveCustomerToStorage(state.customerKey, state.customerName);
    renderPage(true);
    fetchCalendar().then(function () {
      renderPage(false);
    });
  }
  function bind() {
    var root = document.getElementById("syncetc-webflow-mount") || document;
    root.querySelectorAll(".se-view").forEach(function (b) {
      b.onclick = function () {
        state.view = b.getAttribute("data-view");
        root.querySelectorAll(".se-view").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        renderEvents();
      };
    });
    var search = document.getElementById("se-cal-search");
    if (search) search.oninput = function () { state.search = search.value || ""; applyFilters(); };
    var prev = document.getElementById("se-prev-month"), next = document.getElementById("se-next-month");
    if (prev) prev.onclick = function () { state.monthCursor = new Date(state.monthCursor.getFullYear(), state.monthCursor.getMonth() - 1, 1); renderEvents(); };
    if (next) next.onclick = function () { state.monthCursor = new Date(state.monthCursor.getFullYear(), state.monthCursor.getMonth() + 1, 1); renderEvents(); };
    var dl = document.getElementById("se-download-visible");
    if (dl) dl.onclick = function () { downloadIcs(state.visibleEvents, slug(state.customerName || state.customerKey) + "-visible-calendar.ics"); };
    var login = document.getElementById("se-login");
    if (login) login.onclick = openLogin;
    var logoutBtn = document.getElementById("se-logout");
    if (logoutBtn) logoutBtn.onclick = logout;
    var sel = document.getElementById("se-customer-select");
    if (sel) sel.onchange = function () {
      var opt = sel.options[sel.selectedIndex];
      reloadForCustomer(sel.value, opt ? opt.text : titleFromKey(sel.value));
    };
    var modal = document.getElementById("se-cal-modal");
    if (modal) modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  }
  function renderPage(preserveFilters) {
    var mount = document.getElementById("syncetc-webflow-mount") || document.getElementById("syncetc-app");
    if (!mount) {
      mount = document.createElement("div");
      mount.id = "syncetc-webflow-mount";
      document.body.appendChild(mount);
    }
    mount.classList.add("syncetc-calendar-viewer");
    mount.innerHTML = pageHtml();
    createFilters();
    bind();
    if (!preserveFilters) {
      state.dateFilter = state.dateFilter || "upcoming";
      state.typeFilter = state.typeFilter || "all";
    }
    applyFilters();
  }

  function init() {
    injectCss();
    ensureComponents()
      .then(initAuthContext)
      .then(function () { return fetchCalendar(); })
      .then(function () { renderPage(false); })
      .catch(function (err) {
        state.loading = false;
        state.error = err && err.message ? err.message : "Calendar could not initialize.";
        renderPage(false);
      });
  }

  document.addEventListener("syncetc:auth-context-change", function () {
    refreshAuthSnapshot();
    reloadForCustomer(resolveActiveCustomer().customer_key, resolveActiveCustomer().name);
  });
  document.addEventListener("syncetc:customer-change", function (e) {
    var c = normalizeCustomer(e && e.detail && (e.detail.customer || e.detail.activeCustomer || e.detail));
    if (c && c.customer_key) reloadForCustomer(c.customer_key, c.name);
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
/* PAGE-CALENDAR-VIEWER-v1B.js - END */
