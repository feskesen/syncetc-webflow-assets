/* PAGE-EVENT-ADMIN-v1.js - BEGIN */
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
    "COMPONENT-auth-context-v1.js",
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
    return COMPONENT_FILES.reduce(function(p, file){ return p.then(function(){ return loadScriptOnce(base + file); }); }, Promise.resolve());
  }

  var VERSION="PAGE-EVENT-ADMIN-v1";
  var SUPABASE_URL = "https://ocdaohkiwonjmirqkjww.supabase.co";
  var EDGE_ACTION_URL = SUPABASE_URL + "/functions/v1/syncetc-calendar-admin-action";
  var EDGE_READ_URL = SUPABASE_URL + "/functions/v1/syncetc-calendar-admin-read";

  function authSnapshot(){
    return window.SyncEtc && window.SyncEtc.AuthContext ? window.SyncEtc.AuthContext.getSnapshot() : {};
  }

  function activeCustomerKey(){
    var s = authSnapshot();
    return clean(s.active_customer_key || (s.active_customer && s.active_customer.customer_key)) || "demo_flying_club";
  }

  function activeCustomerLabel(){
    var s = authSnapshot();
    var c = s.active_customer || {};
    return clean(c.syncetc_customers && c.syncetc_customers.display_name) || clean(c.customer_key) || "Active Customer";
  }

  function canManageEvents(){
    return !!(window.SyncEtc && window.SyncEtc.AccessGuard && window.SyncEtc.AccessGuard.evaluate({
      moduleKey: "event_admin",
      action: "manage",
      fallback: "deny"
    }).allowed);
  }

  function authToken(){
    return window.SyncEtc && window.SyncEtc.AuthContext ? window.SyncEtc.AuthContext.getToken() : "";
  }
  var FALLBACK_DATA = { customer:{ customer_key:"demo_flying_club", name:"Demo Flying Club" }, eventTypes:[], locations:[], events:[], rsvps:[], settings:{ timezone:"America/New_York", write_mode:"edge", edge_function_name:"syncetc-calendar-admin-action", page_title:"Event Admin Console" }, meta:{ source:"safe_empty_fallback" } };

  var state = {
    data: null,
    tab: "events",
    eventFilter: "upcoming",
    typeFilter: "all",
    search: "",
    selectedEventId: "",
    editingEventId: "",
    editingTypeId: "",
    editingLocationId: "",
    formMode: "create",
    dirty: false,
    writeMode: "staged",
    stagedActions: [],
    rsvpEventId: "",
    eventUploadPreviewUrl: "",
    eventUploadFile: null,
    pendingAction: null,
    repeatSourceId: "",
    uploadPreviewUrl: "",
    uploadFile: null,
    message: ""
  };

  function U(){ return window.SyncEtc.Components.Utils; }
  function esc(v){ return U().esc(v); }
  function clean(v){ return (v == null ? "" : String(v)).trim(); }
  function truthy(v){ var x=clean(v).toLowerCase(); return x==="true"||x==="yes"||x==="1"||x==="on"; }
  function byId(id){ return document.getElementById(id); }
  function val(id){ var el=byId(id); return el ? clean(el.value) : ""; }
  function checked(id){ var el=byId(id); return !!(el && el.checked); }
  function setVal(id,v){ var el=byId(id); if(el) el.value = v == null ? "" : String(v); }
  function setChecked(id,v){ var el=byId(id); if(el) el.checked = !!v; }
  function uid(prefix){ return (prefix || "id") + "_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2,8); }
  function slugify(v){ return clean(v).toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,90) || "item"; }
  function parseDate(v){ var d = new Date(clean(v)); return isNaN(d.getTime()) ? null : d; }
  function z2(n){ return String(n).padStart(2,"0"); }
  function roundToFive(n){ n = parseInt(n || 0, 10) || 0; return Math.round(n / 5) * 5; }
  function toDateInput(v){ var d=parseDate(v); if(!d) return ""; return d.getFullYear()+"-"+z2(d.getMonth()+1)+"-"+z2(d.getDate()); }
  function toTime5Value(v){ var d=parseDate(v); if(!d) return "19:30"; var m=roundToFive(d.getMinutes()); var h=d.getHours(); if(m >= 60){ h = (h + 1) % 24; m = 0; } return z2(h)+":"+z2(m); }
  function fromDateAndTime(dateValue, timeValue, allDay){
    if(!clean(dateValue)) return "";
    var t = allDay ? "00:00" : (clean(timeValue) || "00:00");
    var d = new Date(clean(dateValue) + "T" + t + ":00");
    return isNaN(d.getTime()) ? "" : d.toISOString();
  }
  function timePartsFrom24(value){
    var v = clean(value) || "19:30";
    var parts = v.split(":");
    var h24 = parseInt(parts[0] || "19", 10);
    var m = roundToFive(parseInt(parts[1] || "30", 10));
    if(m >= 60){ h24 = (h24 + 1) % 24; m = 0; }
    var ampm = h24 < 12 ? "AM" : "PM";
    var hour12 = h24 % 12 || 12;
    return { hour: String(hour12), minute: z2(m), ampm: ampm, value: z2(h24)+":"+z2(m) };
  }
  function timePartsHtml(prefix, selected){
    var p = timePartsFrom24(selected);
    var hours = [];
    var minutes = [];
    for(var h=1; h<=12; h++) hours.push('<option value="'+h+'" '+(String(h)===p.hour?'selected':'')+'>'+h+'</option>');
    for(var m=0; m<60; m+=5) minutes.push('<option value="'+z2(m)+'" '+(z2(m)===p.minute?'selected':'')+'>'+z2(m)+'</option>');
    return '<input type="hidden" id="'+prefix+'-time" value="'+esc(p.value)+'">'+
      '<div class="ea-time-parts" data-ea-time-parts="'+prefix+'">'+
        '<select class="ea-select ea-time-part" id="'+prefix+'-hour" aria-label="Hour">'+hours.join("")+'</select>'+
        '<select class="ea-select ea-time-part" id="'+prefix+'-minute" aria-label="Minute">'+minutes.join("")+'</select>'+
        '<select class="ea-select ea-time-part" id="'+prefix+'-ampm" aria-label="AM or PM"><option '+(p.ampm==="AM"?'selected':'')+'>AM</option><option '+(p.ampm==="PM"?'selected':'')+'>PM</option></select>'+
      '</div>';
  }
  function updateTimeHidden(prefix){
    var hour = parseInt(val(prefix+"-hour") || "12", 10);
    var minute = parseInt(val(prefix+"-minute") || "0", 10);
    var ampm = clean(val(prefix+"-ampm")) || "AM";
    if(hour === 12) hour = 0;
    if(ampm === "PM") hour += 12;
    setVal(prefix+"-time", z2(hour)+":"+z2(minute));
  }
  function syncTimeHiddenFields(){
    updateTimeHidden("ea-start");
    updateTimeHidden("ea-end");
  }
  function googleMapsUrlFromAddress(address, locationName){
    var q = clean(address) || clean(locationName);
    return q ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q) : "";
  }
  function dateNoteHtml(ev){
    return clean(ev && ev.date_note) ? '<div class="ea-date-note">'+esc(ev.date_note)+'</div>' : '';
  }
  function rsvpSummaryForEvent(ev){
    var rows=(state.data && state.data.rsvps || []).filter(function(r){ return clean(r.event_id)===clean(ev.event_id) || clean(r.event_name)===clean(ev.name); });
    var yes=rows.filter(function(r){ var s=clean(r.rsvp_status).toLowerCase(); return s==="yes" || clean(r.member_attending).toLowerCase()==="yes"; }).length;
    var total=rows.reduce(function(n,r){ return n+(parseInt(r.total_count||0,10)||0); },0);
    return { rows:rows.length, yes:yes, total:total };
  }
  function dateOnly(v){ var d=parseDate(v); if(!d) return ""; return d.toLocaleDateString(undefined, {weekday:"short", month:"short", day:"numeric", year:"numeric"}); }
  function timeRange(ev){
    var s=parseDate(ev.start_at), e=parseDate(ev.end_at);
    if(!s) return "Date not set";
    if(ev.all_day) return s.toLocaleDateString(undefined, {weekday:"short", month:"short", day:"numeric", year:"numeric"}) + " · All day";
    var a=s.toLocaleString(undefined, {weekday:"short", month:"short", day:"numeric", year:"numeric", hour:"numeric", minute:"2-digit"});
    if(ev.no_end_time || !e) return a;
    if(s.toDateString() === e.toDateString()) return a + " to " + e.toLocaleTimeString(undefined, {hour:"numeric", minute:"2-digit"});
    return a + " to " + e.toLocaleString(undefined, {weekday:"short", month:"short", day:"numeric", year:"numeric", hour:"numeric", minute:"2-digit"});
  }
  function dateParts(ev){ var d=parseDate(ev.start_at); if(!d) return {m:"",d:"",y:""}; return {m:d.toLocaleString(undefined,{month:"short"}),d:d.toLocaleString(undefined,{day:"numeric"}),y:d.toLocaleString(undefined,{year:"numeric"})}; }
  function todayStart(){ var n=new Date(); return new Date(n.getFullYear(),n.getMonth(),n.getDate()); }
  function eventStatus(ev){ var d=parseDate(ev.start_at); if(!d) return "upcoming"; return d < todayStart() ? "past" : "upcoming"; }

  function normalizeEvent(ev){
    ev = Object.assign({}, ev || {});
    ev.event_id = ev.event_id || ev.id || ev.internalId || uid("event");
    ev.name = ev.name || ev.title || "Untitled Event";
    ev.slug = ev.slug || slugify(ev.name);
    ev.event_type_name = ev.event_type_name || ev.eventType || ev.event_type || "Event";
    ev.event_type_key = ev.event_type_key || slugify(ev.event_type_name);
    ev.access_level = ev.access_level || ev.access || "Public";
    ev.start_at = ev.start_at || ev.startAt || ev.start || "";
    ev.end_at = ev.end_at || ev.endAt || ev.end || "";
    ev.timezone = ev.timezone || "America/New_York";
    ev.location_name = ev.location_name || ev.location || "";
    ev.image_url = ev.image_url || ev.image || "";
    ev.short_note = ev.short_note || ev.shortNote || "";
    ev.details_text = ev.details_text || ev.detailsText || "";
    ev.date_note = ev.date_note || ev.dateNote || "";
    ev.venue_note = ev.venue_note || ev.venueNote || "";
    ev.map_url = ev.map_url || ev.mapUrl || "";
    ev.zoom_url = ev.zoom_url || ev.zoomUrl || "";
    ev.document_url = ev.document_url || ev.documentUrl || "";
    ev.rsvp_audience = ev.rsvp_audience || ev.rsvpAudience || "";
    ev.coordinator_requests = ev.coordinator_requests || ev.coordinatorRequests || "";
    ev.coordinator_comment = ev.coordinator_comment || ev.coordinatorComment || "";
    ev.board_notes = ev.board_notes || ev.boardNotes || "";
    ev.admin_note = ev.admin_note || ev.adminNote || "";
    ev.all_day = truthy(ev.all_day);
    ev.no_end_time = truthy(ev.no_end_time);
    ev.rsvp_on = truthy(ev.rsvp_on);
    ev.supplies_on = truthy(ev.supplies_on);
    ev.home_on = truthy(ev.home_on);
    ev.approved = ev.approved !== false && ev.approved !== "false";
    ev.cancelled = truthy(ev.cancelled);
    ev.sort_order = parseInt(ev.sort_order || 999,10) || 999;
    return ev;
  }

  function normalizeData(data){
    data = data || {};
    return {
      eventTypes: (data.eventTypes || data.event_types || []).map(function(t){ return Object.assign({active:true, sort_order:999}, t); }).sort(function(a,b){ return (a.sort_order||999)-(b.sort_order||999) || clean(a.name).localeCompare(clean(b.name)); }),
      locations: (data.locations || data.eventLocations || []).map(function(l){ return Object.assign({active:true, sort_order:999}, l); }).sort(function(a,b){ return (a.sort_order||999)-(b.sort_order||999) || clean(a.name).localeCompare(clean(b.name)); }),
      events: (data.events || []).map(normalizeEvent).sort(function(a,b){ var ad=parseDate(a.start_at), bd=parseDate(b.start_at); return (ad?ad.getTime():9999999999999)-(bd?bd.getTime():9999999999999) || (a.sort_order||999)-(b.sort_order||999); }),
      rsvps: (data.rsvps || data.eventRsvps || []).slice(),
      settings: data.settings || {}
    };
  }

  function restHeaders(){
    var anon = window.SYNCETC_SUPABASE_ANON_KEY || window.SUPABASE_ANON_KEY || "";
    if(!anon) return null;
    var token = authToken() || anon;
    return { apikey: anon, Authorization: "Bearer " + token, "Content-Type":"application/json" };
  }

  function fetchRest(path){
    var h=restHeaders();
    if(!h) return Promise.reject(new Error("No Supabase anon key present."));
    return fetch(SUPABASE_URL + "/rest/v1/" + path, { headers:h }).then(function(r){ if(!r.ok) throw new Error(path + " " + r.status); return r.json(); });
  }

  function fetchData(){
    var token = authToken();
    if(!token) return Promise.reject(new Error("Sign in required before calendar admin read."));

    return fetch(EDGE_READ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        action: "read_calendar_admin_bundle",
        customer_key: activeCustomerKey(),
        source: VERSION
      })
    }).then(function(response){
      return response.json().catch(function(){ return null; }).then(function(body){
        if(!response.ok || !body || body.ok !== true){
          throw new Error((body && body.error) || ("Calendar read failed: " + response.status));
        }
        return normalizeData(body.bundle || FALLBACK_DATA);
      });
    });
  }

  function installStyles(){
    U().installStyle("PAGE-EVENT-ADMIN-v3-style", `
      .event-admin-page { max-width:1180px; margin:34px auto 56px; padding:0 18px; font-family:Arial, Helvetica, sans-serif; color:var(--se-aero-text); }
      .ea-shell { background:var(--se-aero-card); border:1px solid var(--se-aero-border); border-radius:var(--se-aero-radius-xl); box-shadow:var(--se-aero-shadow); overflow:hidden; backdrop-filter:blur(8px); }
      .ea-hero { padding:32px 34px 28px; background:linear-gradient(135deg,var(--se-aero-navy),var(--se-aero-blue)),radial-gradient(circle at top right,rgba(255,255,255,.34),transparent 36%); color:#fff; }
      .ea-eyebrow { display:inline-flex; margin-bottom:12px; padding:6px 12px; border-radius:999px; background:rgba(255,255,255,.16); border:1px solid rgba(255,255,255,.24); font-size:12px; font-weight:900; letter-spacing:.08em; text-transform:uppercase; }
      .ea-hero h1 { margin:0; color:#fff; font-size:clamp(30px,4vw,48px); line-height:1.05; font-weight:900; letter-spacing:-.035em; }
      .ea-hero p { max-width:880px; margin:12px 0 0; color:rgba(255,255,255,.9); font-size:16px; line-height:1.6; }
      .ea-tabs { display:flex; flex-wrap:wrap; gap:8px; padding:16px 24px; background:rgba(255,255,255,.80); border-bottom:1px solid var(--se-aero-border); }
      .ea-tab, .ea-btn { min-height:38px; border:1px solid rgba(18,54,90,.18); border-radius:999px; padding:9px 13px; background:#fff; color:var(--se-aero-navy); font-size:12px; font-weight:900; cursor:pointer; text-decoration:none; display:inline-flex; align-items:center; justify-content:center; gap:6px; }
      .ea-tab.active, .ea-btn.primary { background:var(--se-aero-navy); color:#fff; border-color:var(--se-aero-navy); }
      .ea-btn.danger { background:rgba(157,42,42,.10); color:#8f2424; border-color:rgba(157,42,42,.28); }
      .ea-btn.warning { background:rgba(138,93,19,.10); color:#725d18; border-color:rgba(138,93,19,.28); }
      .ea-btn.small { min-height:31px; padding:6px 10px; font-size:11px; }
      .ea-btn { position:relative; z-index:2; user-select:none; }
      .ea-btn:disabled, .ea-input:disabled, .ea-select:disabled, .ea-textarea:disabled { opacity:.55; cursor:not-allowed; background:#eef2f6!important; color:#66788f!important; }
      .ea-disabled-note { color:#6b7b8d; font-size:12px; font-weight:800; margin-top:-6px; }
      .ea-date-note { margin-top:7px; color:var(--se-aero-alt, #b12a2a); font-size:12px; font-weight:900; line-height:1.35; }
      .ea-date-note-field span { color:var(--se-aero-alt, #b12a2a)!important; }
      .ea-date-note-input { color:var(--se-aero-alt, #b12a2a)!important; font-weight:900; border-color:rgba(177,42,42,.30)!important; }
      .ea-date-note-input::placeholder { color:rgba(177,42,42,.74); }
      .ea-time-disabled { opacity:.58; filter:grayscale(.25); }
      .ea-time-parts { display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; }
      .ea-time-part { min-width:0; }
      .ea-system-note { display:block; margin-top:6px; color:var(--se-aero-muted); font-size:12px; line-height:1.35; font-weight:700; }
      .ea-saving-banner { margin:0 0 12px; padding:11px 13px; border-radius:14px; background:rgba(234,245,255,.92); border:1px solid rgba(18,54,90,.12); color:var(--se-aero-navy); font-size:13px; font-weight:900; }
      .ea-conditional-save[hidden] { display:none!important; }
      .ea-debug-tab { display:none; }
      .ea-inline-tools { display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-top:-5px; margin-bottom:12px; }
      .ea-rsvp-link { margin-top:8px; }

      .ea-main { padding:24px; }
      .ea-toolbar { display:flex; flex-wrap:wrap; gap:10px; align-items:center; justify-content:space-between; margin-bottom:16px; padding:16px; border:1px solid var(--se-aero-border); border-radius:18px; background:rgba(255,255,255,.92); }
      .ea-toolbar-left, .ea-toolbar-right { display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
      .ea-input, .ea-select, .ea-textarea { width:100%; min-height:42px; border:1px solid rgba(18,54,90,.18); border-radius:14px; padding:10px 12px; background:#fff; color:var(--se-aero-text); font:inherit; font-size:14px; outline:none; }
      .ea-textarea { min-height:90px; resize:vertical; line-height:1.45; }
      .ea-field { display:flex; flex-direction:column; gap:7px; min-width:0; margin-bottom:13px; }
      .ea-field span { color:var(--se-aero-navy-dark); font-size:11px; font-weight:900; letter-spacing:.07em; text-transform:uppercase; }
      .ea-grid { display:grid; gap:14px; }
      .ea-grid.two { grid-template-columns:repeat(2,minmax(0,1fr)); }
      .ea-grid.three { grid-template-columns:repeat(3,minmax(0,1fr)); }
      .ea-grid.four { grid-template-columns:repeat(4,minmax(0,1fr)); }
      .ea-panel { padding:18px; border-radius:18px; background:rgba(255,255,255,.94); border:1px solid var(--se-aero-border); box-shadow:0 8px 24px rgba(12,38,64,.08); }
      .ea-panel h2, .ea-panel h3 { margin:0 0 10px; color:var(--se-aero-navy-dark); font-size:24px; line-height:1.15; }
      .ea-panel p { margin:0 0 12px; color:var(--se-aero-muted); line-height:1.5; font-size:14px; }
      .ea-split { display:grid; grid-template-columns:minmax(0,1fr) 330px; gap:18px; align-items:start; }
      .ea-event-list { display:grid; gap:12px; }
      .ea-event-card { display:grid; grid-template-columns:88px minmax(0,1fr) 150px; gap:0; overflow:hidden; border-radius:18px; border:1px solid rgba(18,54,90,.14); background:#fff; box-shadow:0 8px 22px rgba(12,38,64,.08); cursor:pointer; }
      .ea-event-card.selected { outline:3px solid rgba(47,128,196,.26); }
      .ea-event-date { background:var(--se-aero-navy); color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:12px 8px; text-align:center; }
      .ea-event-date b { font-size:32px; line-height:1; } .ea-event-date span { font-size:11px; font-weight:900; letter-spacing:.08em; text-transform:uppercase; }
      .ea-event-main { padding:15px; min-width:0; }
      .ea-pill-row { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:7px; }
      .ea-pill { display:inline-flex; align-items:center; min-height:23px; padding:4px 8px; border-radius:999px; background:var(--se-aero-sky); color:var(--se-aero-navy); font-size:10px; font-weight:900; letter-spacing:.06em; text-transform:uppercase; }
      .ea-pill.warn { background:rgba(157,42,42,.12); color:#8f2424; } .ea-pill.good { background:rgba(36,114,69,.12); color:#247245; } .ea-pill.gray { background:rgba(95,109,123,.12); color:#5f6d7b; }
      .ea-event-title { margin:0 0 6px; color:var(--se-aero-navy-dark); font-size:20px; line-height:1.15; font-weight:900; }
      .ea-event-line { color:#304d73; font-size:13px; line-height:1.4; font-weight:700; }
      .ea-event-actions { display:flex; flex-direction:column; gap:7px; justify-content:center; padding:12px; border-left:1px solid rgba(18,54,90,.10); background:#f8fbff; }
      .ea-side-card { padding:15px; border-radius:18px; background:linear-gradient(180deg,rgba(234,245,255,.92),rgba(255,255,255,.88)); border:1px solid var(--se-aero-border); }
      .ea-preview-img { height:132px; display:flex; align-items:center; justify-content:center; border-radius:14px; background:#fff; border:1px solid rgba(18,54,90,.10); margin-bottom:12px; overflow:hidden; color:var(--se-aero-muted); font-size:12px; font-weight:900; }
      .ea-preview-img img { max-width:100%; max-height:112px; object-fit:contain; }
      .ea-dropzone { display:flex; align-items:center; justify-content:center; min-height:120px; border:2px dashed rgba(18,54,90,.25); border-radius:18px; background:#fff; color:var(--se-aero-muted); text-align:center; padding:16px; font-size:13px; font-weight:800; cursor:pointer; }
      .ea-dropzone.dragover { border-color:var(--se-aero-blue); background:var(--se-aero-sky); color:var(--se-aero-navy); }
      .ea-card-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px; }
      .ea-mini-card { padding:15px; border-radius:18px; background:#fff; border:1px solid var(--se-aero-border); box-shadow:0 8px 20px rgba(12,38,64,.07); }
      .ea-mini-card h3 { margin:0 0 6px; color:var(--se-aero-navy-dark); font-size:18px; }
      .ea-actions { display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; }
      .ea-message { margin:0 0 16px; padding:12px 14px; border-radius:16px; background:rgba(234,245,255,.92); border:1px solid var(--se-aero-border); color:var(--se-aero-navy-dark); font-size:13px; line-height:1.45; font-weight:800; }
      .ea-message:empty { display:none; }
      .ea-payload { white-space:pre-wrap; word-break:break-word; max-height:260px; overflow:auto; background:#0e1e33; color:#fff; padding:12px; border-radius:14px; font-size:11px; line-height:1.4; }
      .ea-modal-overlay { position:fixed; inset:0; z-index:999999; display:none; align-items:center; justify-content:center; padding:18px; background:rgba(5,15,30,.72); }
      .ea-modal-overlay.visible { display:flex; }
      .ea-modal { width:100%; max-width:680px; max-height:92vh; overflow:auto; border-radius:24px; background:#fff; box-shadow:0 18px 60px rgba(0,0,0,.36); }
      .ea-modal-head { padding:20px; background:linear-gradient(135deg,var(--se-aero-navy),var(--se-aero-blue)); color:#fff; }
      .ea-modal-head h2 { margin:0 0 6px; color:#fff; }
      .ea-modal-body { padding:20px; }
      #ea-confirm-body { white-space:pre-line; }
      .ea-hidden { display:none!important; }
      @media(max-width:980px){ .ea-split,.ea-grid.two,.ea-grid.three,.ea-grid.four,.ea-card-grid{grid-template-columns:1fr;} .ea-event-card{grid-template-columns:80px minmax(0,1fr);} .ea-event-actions{grid-column:1/-1; border-left:0; border-top:1px solid rgba(18,54,90,.10); flex-direction:row; flex-wrap:wrap; justify-content:flex-start;} }
      @media(max-width:720px){ .event-admin-page{padding:0 12px;} .ea-main{padding:16px;} .ea-hero{padding:26px 20px;} }
    `);
  }

  function eventById(id){ return (state.data.events||[]).find(function(e){return String(e.event_id)===String(id);}) || null; }
  function typeKeyOf(t){ return clean(t && (t.event_type_key || t.slug || t.name)); }
  function locationKeyOf(l){ return clean(l && (l.location_key || l.slug || l.name)); }
  function typeByKey(key){ return (state.data.eventTypes||[]).find(function(t){ return typeKeyOf(t)===clean(key) || clean(t.name)===clean(key); }); }
  function locationById(id){ return (state.data.locations||[]).find(function(l){ return locationKeyOf(l)===clean(id) || clean(l.name)===clean(id) || clean(l.slug)===clean(id); }); }
  function activeTypes(){ return (state.data.eventTypes||[]).filter(function(t){ return t.active !== false && t.active !== "false"; }); }
  function activeLocations(){ return (state.data.locations||[]).filter(function(l){ return l.active !== false && l.active !== "false"; }); }
  function savingAttr(){ return state.saving ? ' disabled aria-busy="true"' : ''; }
  function findDuplicateType(row){
    var key = clean(row && row.event_type_key);
    var name = normalizedCompare(row && row.name);
    var current = clean(state.editingTypeId);
    return activeTypes().find(function(t){
      if(current && (clean(t.event_type_id)===current || typeKeyOf(t)===current)) return false;
      return (key && typeKeyOf(t)===key) || (name && normalizedCompare(t.name)===name);
    });
  }
  function findDuplicateLocation(row){
    var key = clean(row && row.location_key);
    var name = normalizedCompare(row && row.name);
    var label = normalizedCompare(row && row.location_label);
    var address = normalizedCompare(row && row.address);
    var current = clean(state.editingLocationId);
    return activeLocations().find(function(l){
      if(current && (locationKeyOf(l)===current || clean(l.name)===current)) return false;
      return (key && locationKeyOf(l)===key) ||
        (name && normalizedCompare(l.name)===name) ||
        (label && normalizedCompare(l.location_label)===label) ||
        (address && normalizedCompare(l.address)===address);
    });
  }

  function filteredEvents(){
    var q=clean(state.search).toLowerCase();
    return (state.data.events||[]).filter(function(ev){
      if(state.eventFilter==="upcoming" && (eventStatus(ev)!=="upcoming" || ev.approved===false)) return false;
      if(state.eventFilter==="past" && eventStatus(ev)!=="past") return false;
      if(state.eventFilter==="cancelled" && !ev.cancelled) return false;
      if(state.eventFilter==="removed" && ev.approved!==false) return false;
      if(state.eventFilter==="rsvp" && !ev.rsvp_on) return false;
      if(state.typeFilter !== "all" && clean(ev.event_type_name) !== clean(state.typeFilter)) return false;
      if(q && [ev.name,ev.event_type_name,ev.location_name,ev.address,ev.short_note,ev.details_text].join(" ").toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
  }

  function renderTabs(){
    var tabs = [
      ["events","Events"],
      ["create","Create / Edit"],
      ["types","Event Types"],
      ["locations","Locations"],
      ["rsvp","RSVP / Attendance"]
    ];
    return '<div class="ea-tabs">' + tabs.map(function(t){ return '<button type="button" class="ea-tab '+(state.tab===t[0]?'active':'')+'" data-ea-tab="'+t[0]+'">'+esc(t[1])+'</button>'; }).join("") + '</div>';
  }

  function renderHero(){
    return '<section class="ea-hero"><div class="ea-eyebrow">Admin Tool · '+esc(activeCustomerLabel())+'</div><h1>Event Admin Console</h1><p>Create, edit, duplicate, repeat, cancel, remove, restore, and manage RSVP settings, event types, saved locations, and event images from one combined workflow.</p></section>';
  }

  function statusPills(ev){
    var out=[];
    out.push('<span class="ea-pill '+(ev.approved===false?'gray':'good')+'">'+(ev.approved===false?'Removed':'Published')+'</span>');
    if(ev.cancelled) out.push('<span class="ea-pill warn">Cancelled</span>');
    if(ev.rsvp_on) out.push('<span class="ea-pill">RSVP On</span>');
    if(ev.rsvp_audience) out.push('<span class="ea-pill">'+esc(ev.rsvp_audience)+'</span>');
    if(ev.home_on) out.push('<span class="ea-pill">Home</span>');
    out.push('<span class="ea-pill gray">'+esc(ev.access_level||"Public")+'</span>');
    return out.join("");
  }

  function renderEventCard(ev){
    var p=dateParts(ev);
    var rs = rsvpSummaryForEvent(ev);
    return '<article class="ea-event-card '+(state.selectedEventId===ev.event_id?'selected':'')+'" data-ea-select-event="'+esc(ev.event_id)+'">'+
      '<div class="ea-event-date"><span>'+esc(p.m)+'</span><b>'+esc(p.d)+'</b><span>'+esc(p.y)+'</span></div>'+
      '<div class="ea-event-main"><div class="ea-pill-row">'+statusPills(ev)+'</div><h3 class="ea-event-title">'+esc(ev.name)+'</h3><div class="ea-event-line">'+esc(timeRange(ev))+'</div>'+dateNoteHtml(ev)+(ev.location_name?'<div class="ea-event-line">'+esc(ev.location_name)+'</div>':'')+(ev.short_note?'<div class="ea-event-line" style="font-weight:400;margin-top:6px">'+esc(ev.short_note)+'</div>':'')+(ev.rsvp_on?'<div class="ea-rsvp-link"><button type="button" class="ea-btn small" data-ea-rsvp-event="'+esc(ev.event_id)+'">RSVP: '+esc(rs.yes)+' yes · '+esc(rs.total)+' total</button></div>':'')+'</div>'+
      '<div class="ea-event-actions"><button type="button" class="ea-btn small primary" data-ea-edit="'+esc(ev.event_id)+'">Edit</button><button type="button" class="ea-btn small" data-ea-clone="'+esc(ev.event_id)+'">Clone</button><button type="button" class="ea-btn small" data-ea-repeat="'+esc(ev.event_id)+'">Repeat</button></div>'+
    '</article>';
  }

  function renderEventsTab(){
    var events = filteredEvents();
    var typeNames = activeTypes().map(function(t){ return t.name; }).filter(Boolean);
    return '<section class="ea-panel">'+
      '<div class="ea-toolbar"><div class="ea-toolbar-left"><input class="ea-input" id="ea-search" placeholder="Search title, type, location, address, or notes" value="'+esc(state.search)+'" style="min-width:280px"><select class="ea-select" id="ea-filter" style="width:auto"><option value="upcoming">Upcoming</option><option value="all">All</option><option value="past">Past</option><option value="cancelled">Cancelled</option><option value="removed">Removed</option><option value="rsvp">RSVP On</option></select><select class="ea-select" id="ea-type-filter" style="width:auto"><option value="all">All Types</option>'+typeNames.map(function(n){ return '<option value="'+esc(n)+'">'+esc(n)+'</option>'; }).join("")+'</select></div><div class="ea-toolbar-right"><button class="ea-btn primary" data-ea-new-event>New Event</button><button class="ea-btn" data-ea-from-existing>Create from Existing</button></div></div>'+
      '<div class="ea-split"><div class="ea-event-list">'+(events.length?events.map(renderEventCard).join(""):'<div class="ea-message">No events match the current filters.</div>')+'</div>'+renderEventSide()+'</div>'+
    '</section>';
  }

  function renderEventSide(){
    var ev = eventById(state.selectedEventId) || filteredEvents()[0] || null;
    if(!ev) return '<aside class="ea-side-card"><h3>No event selected</h3><p>Select an event to preview details and available actions.</p></aside>';
    var img = ev.image_url ? '<img src="'+esc(ev.image_url)+'" alt="Event image">' : 'No image';
    var rs = rsvpSummaryForEvent(ev);
    return '<aside class="ea-side-card"><div class="ea-preview-img">'+img+'</div><h3>'+esc(ev.name)+'</h3><p><strong>'+esc(timeRange(ev))+'</strong></p>'+dateNoteHtml(ev)+'<p>'+esc(ev.location_name||"No location posted")+'</p><div class="ea-pill-row">'+statusPills(ev)+'</div>'+(ev.rsvp_on?'<p><strong>RSVP:</strong> '+esc(rs.yes)+' yes · '+esc(rs.total)+' total · '+esc(rs.rows)+' records</p>':'')+'<div class="ea-actions"><button type="button" class="ea-btn primary" data-ea-edit="'+esc(ev.event_id)+'">Edit Event</button><button type="button" class="ea-btn" data-ea-clone="'+esc(ev.event_id)+'">Clone</button><button type="button" class="ea-btn" data-ea-repeat="'+esc(ev.event_id)+'">Repeat</button>'+(ev.rsvp_on?'<button type="button" class="ea-btn" data-ea-rsvp-event="'+esc(ev.event_id)+'">Open RSVP</button>':'')+'<button type="button" class="ea-btn '+(ev.cancelled?'':'danger')+'" data-ea-toggle-cancel="'+esc(ev.event_id)+'">'+(ev.cancelled?'Restore Event':'Cancel Event')+'</button><button type="button" class="ea-btn warning" data-ea-toggle-approval="'+esc(ev.event_id)+'">'+(ev.approved===false?'Restore to Calendar':'Remove from Calendar')+'</button></div></aside>';
  }

  function blankEvent(){
    return { event_id:"", name:"", slug:"", event_type_key:"", event_type_name:"", access_level:"Public", rsvp_audience:"", start_at:"", end_at:"", all_day:false, no_end_time:true, timezone:"America/New_York", date_note:"", location_name:"", address:"", map_url:"", venue_note:"", short_note:"", details_text:"", image_url:"", zoom_url:"", document_url:"", rsvp_on:false, supplies_on:false, home_on:false, approved:true, cancelled:false, sort_order:999, admin_note:"", coordinator_requests:"", coordinator_comment:"", board_notes:"" };
  }

  function currentFormEvent(){
    if(state.formMode==="edit" && state.editingEventId) return eventById(state.editingEventId) || blankEvent();
    if(state.editingEventId && state.formMode==="clone") {
      var src=eventById(state.editingEventId) || blankEvent();
      return Object.assign({}, src, { event_id:"", name:src.name + " Copy", slug:"", approved:false, cancelled:false });
    }
    return blankEvent();
  }

  function selectOptions(items, valueKey, labelKey, selected){
    return items.map(function(item){ var v=item[valueKey], l=item[labelKey]; return '<option value="'+esc(v)+'" '+(clean(v)===clean(selected)?'selected':'')+'>'+esc(l)+'</option>'; }).join("");
  }

  function renderCreateTab(){
    var ev=currentFormEvent();
    var isEdit = state.formMode === "edit";
    var img = state.eventUploadPreviewUrl || ev.image_url || "";
    var typeOptions = '<option value="">Select event type</option>' + activeTypes().map(function(t){ return '<option value="'+esc(t.event_type_key)+'" '+(clean(t.event_type_key)===clean(ev.event_type_key)?'selected':'')+'>'+esc(t.name)+'</option>'; }).join("");
    var locOptions = '<option value="">Custom / no saved location</option>' + activeLocations().map(function(l){ return '<option value="'+esc(l.location_id || l.slug || l.name)+'">'+esc(l.name)+'</option>'; }).join("");
    var priorOptions = '<option value="">Select prior event as template</option>' + (state.data.events||[]).map(function(e){ return '<option value="'+esc(e.event_id)+'">'+esc(e.name)+' · '+esc(dateOnly(e.start_at))+'</option>'; }).join("");
    return '<section class="ea-panel"><div class="ea-toolbar"><div><h2>'+(isEdit?'Edit Event':'Create Event')+'</h2><p>Use a blank event, a saved event type/location, or preselect from a prior event.</p></div><div class="ea-toolbar-right"><button type="button" class="ea-btn" data-ea-clear-form>Blank Event</button><button type="button" class="ea-btn primary" data-ea-save-event'+savingAttr()+'>'+(isEdit?'Save Changes':'Create Event')+'</button></div></div>'+ 
      '<div class="ea-message">'+(state.dirty?'Unsaved changes in this event form.':'Create/edit form ready.')+'</div>'+ 
      '<div class="ea-grid two"><label class="ea-field"><span>Create from prior event</span><select class="ea-select" id="ea-prior-template">'+priorOptions+'</select></label><label class="ea-field"><span>Event title</span><input class="ea-input" id="ea-event-name" value="'+esc(ev.name)+'" placeholder="Example: June Member Meeting"></label></div>'+ 
      '<div class="ea-grid two"><label class="ea-field"><span>Event type</span><select class="ea-select" id="ea-event-type">'+typeOptions+'</select></label><label class="ea-field"><span>Visibility</span><select class="ea-select" id="ea-access"><option>Public</option><option>Member</option><option>Committee</option><option>Board</option></select></label></div>'+ 
      '<div class="ea-grid two"><label class="ea-field"><span>New Event Type Name</span><input class="ea-input" id="ea-new-type-name" placeholder="Only if this is a new type"></label><div class="ea-field"><span>Save Type</span><button type="button" class="ea-btn ea-conditional-save" id="ea-save-new-type-inline" data-ea-save-new-type-from-event hidden'+savingAttr()+'>Save as New Event Type</button></div></div>'+ 
      '<div class="ea-grid four"><label class="ea-field"><span>Start Date</span><input class="ea-input" id="ea-start-date" type="date" value="'+esc(toDateInput(ev.start_at))+'"></label><label class="ea-field" id="ea-start-time-field"><span>Start Time</span>'+timePartsHtml("ea-start", toTime5Value(ev.start_at))+'</label><label class="ea-field" id="ea-end-date-field"><span>End Date</span><input class="ea-input" id="ea-end-date" type="date" value="'+esc(toDateInput(ev.end_at || ev.start_at))+'"></label><label class="ea-field" id="ea-end-time-field"><span>End Time</span>'+timePartsHtml("ea-end", toTime5Value(ev.end_at || ev.start_at))+'</label></div>'+ 
      '<div class="ea-grid three"><label class="ea-field ea-date-note-field"><span>Date Notes (changes or extra attention)</span><input class="ea-input ea-date-note-input" id="ea-date-note" value="'+esc(ev.date_note)+'" placeholder="Example: Location change, weather backup, special timing note"></label><label><input type="checkbox" id="ea-all-day" '+(ev.all_day?'checked':'')+'> All day</label><label><input type="checkbox" id="ea-no-end-time" '+(ev.no_end_time?'checked':'')+'> Do not display end time</label></div>'+ 
      '<div class="ea-grid three"><label><input type="checkbox" id="ea-approved" '+(ev.approved!==false?'checked':'')+'> Published / approved</label></div>'+ 
      '<div class="ea-grid two"><label class="ea-field"><span>Saved location</span><select class="ea-select" id="ea-location-preset">'+locOptions+'</select></label><label class="ea-field"><span>Location</span><input class="ea-input" id="ea-location" value="'+esc(ev.location_name)+'"></label></div>'+ 
      '<label class="ea-field"><span>Address</span><input class="ea-input" id="ea-address" value="'+esc(ev.address)+'"></label><div class="ea-inline-tools"><button type="button" class="ea-btn" data-ea-event-map-from-address>Get Google Maps URL from location/address</button><button type="button" class="ea-btn ea-conditional-save" id="ea-save-new-location-inline" data-ea-save-new-location-from-event hidden'+savingAttr()+'>Save as New Location</button></div>'+ 
      '<div class="ea-grid two"><label class="ea-field"><span>Map URL</span><input class="ea-input" id="ea-map-url" value="'+esc(ev.map_url)+'"></label><label class="ea-field"><span>Image URL</span><input class="ea-input" id="ea-image-url" value="'+esc(img)+'"></label></div>'+ 
      '<div class="ea-dropzone" data-ea-dropzone="event"><div>Drag and drop one event image here, or click to choose.<br><small>For now this previews locally / stages the image reference. Supabase Storage wiring comes later.</small></div><input type="file" id="ea-event-file" accept="image/*" class="ea-hidden"></div>'+(img?'<div class="ea-preview-img" style="margin-top:12px"><img src="'+esc(img)+'" alt="Event image preview"></div>':'')+ 
      '<label class="ea-field"><span>Venue note</span><textarea class="ea-textarea" id="ea-venue-note">'+esc(ev.venue_note)+'</textarea></label><label class="ea-field"><span>Short note</span><input class="ea-input" id="ea-short-note" value="'+esc(ev.short_note)+'"></label><label class="ea-field"><span>Details text</span><textarea class="ea-textarea" id="ea-details-text">'+esc(ev.details_text)+'</textarea></label>'+ 
      '<div class="ea-grid two"><label class="ea-field"><span>Zoom URL</span><input class="ea-input" id="ea-zoom-url" value="'+esc(ev.zoom_url)+'"></label><label class="ea-field"><span>Document URL</span><input class="ea-input" id="ea-document-url" value="'+esc(ev.document_url)+'"></label></div>'+ 
      '<div class="ea-panel"><h3>RSVP Controls</h3><div class="ea-grid two"><label><input type="checkbox" id="ea-rsvp-on" '+(ev.rsvp_on?'checked':'')+'> RSVP On</label><label class="ea-field"><span>RSVP Audience</span><select class="ea-select" id="ea-rsvp-audience"><option value="">Select one...</option><option>All Eligible Members</option><option>Board Members Only</option></select></label></div><label class="ea-field"><span>Requested / Helpful Items</span><textarea class="ea-textarea" id="ea-coordinator-requests">'+esc(ev.coordinator_requests)+'</textarea></label><label class="ea-field"><span>Coordinator Note</span><textarea class="ea-textarea" id="ea-coordinator-comment">'+esc(ev.coordinator_comment)+'</textarea></label><label class="ea-field"><span>Administrator RSVP Note</span><textarea class="ea-textarea" id="ea-board-notes">'+esc(ev.board_notes)+'</textarea></label></div>'+ 
      '<label class="ea-field"><span>Administrator-only event note</span><textarea class="ea-textarea" id="ea-admin-note">'+esc(ev.admin_note)+'</textarea></label>'+ 
      '<div class="ea-actions"><button type="button" class="ea-btn primary" data-ea-save-event'+savingAttr()+'>'+(isEdit?'Save Changes':'Create Event')+'</button><button type="button" class="ea-btn" data-ea-clear-form>Reset Form</button></div>'+ 
    '</section>';
  }

  function readEventForm(){
    var type=typeByKey(val("ea-event-type"));
    var payload = {
      customer_key:activeCustomerKey(),
      event_id: state.formMode==="edit" ? state.editingEventId : uid("event"),
      name: val("ea-event-name"),
      slug: slugify(val("ea-event-name")),
      event_type_key: val("ea-event-type"),
      event_type_name: type ? type.name : val("ea-event-type"),
      access_level: val("ea-access") || "Public",
      start_at: fromDateAndTime(val("ea-start-date"), val("ea-start-time"), checked("ea-all-day")),
      end_at: (checked("ea-no-end-time") || checked("ea-all-day")) ? "" : fromDateAndTime(val("ea-end-date") || val("ea-start-date"), val("ea-end-time"), false),
      all_day: checked("ea-all-day"),
      no_end_time: checked("ea-no-end-time") || checked("ea-all-day"),
      timezone: "America/New_York",
      date_note: val("ea-date-note"),
      location_name: val("ea-location"),
      address: val("ea-address"),
      map_url: val("ea-map-url"),
      venue_note: val("ea-venue-note"),
      short_note: val("ea-short-note"),
      details_text: val("ea-details-text"),
      image_url: val("ea-image-url"),
      zoom_url: val("ea-zoom-url"),
      document_url: val("ea-document-url"),
      approved: checked("ea-approved"),
      cancelled: false,
      rsvp_on: checked("ea-rsvp-on"),
      rsvp_audience: val("ea-rsvp-audience"),
      coordinator_requests: val("ea-coordinator-requests"),
      coordinator_comment: val("ea-coordinator-comment"),
      board_notes: val("ea-board-notes"),
      admin_note: val("ea-admin-note"),
      sort_order: 999
    };
    return normalizeEvent(payload);
  }

  function validateEvent(ev){
    var errors=[];
    if(!clean(ev.name)) errors.push("Event title is required.");
    if(!clean(ev.event_type_key)) errors.push("Event type is required.");
    if(!clean(ev.start_at)) errors.push("Start date is required.");
    if(!clean(ev.location_name)) errors.push("Location is required.");
    if(ev.rsvp_on && !clean(ev.rsvp_audience)) errors.push("RSVP Audience is required when RSVP is on.");
    return errors;
  }

  function readTypeFromEventForm(){
    var typed = val("ea-new-type-name");
    var selected = typeByKey(val("ea-event-type"));
    var name = typed || (selected ? selected.name : val("ea-event-name"));
    return {
      customer_key:activeCustomerKey(),
      event_type_id: uid("type"),
      name: name,
      event_type_key: slugify(name),
      slug: slugify(name),
      default_access: val("ea-access") || "Public",
      default_short_note: val("ea-short-note"),
      default_details_text: val("ea-details-text"),
      default_image_url: val("ea-image-url"),
      active:true,
      sort_order:999
    };
  }

  function readLocationFromEventForm(){
    var name = val("ea-location");
    return {
      customer_key:activeCustomerKey(),
      location_key: slugify(name),
      name:name,
      slug:slugify(name),
      location_label:name,
      address:val("ea-address"),
      map_url:val("ea-map-url") || googleMapsUrlFromAddress(val("ea-address"), name),
      venue_note:val("ea-venue-note"),
      active:true,
      sort_order:999
    };
  }


  function renderTypesTab(){
    var active = activeTypes();
    return '<section class="ea-panel"><div class="ea-toolbar"><div><h2>Event Types</h2><p>Saved type presets control default access, notes, and images for future events.</p></div><button class="ea-btn primary" data-ea-new-type>New Event Type</button></div><div class="ea-split"><div class="ea-card-grid">'+active.map(renderTypeCard).join("")+'</div>'+renderTypeForm()+'</div></section>';
  }

  function renderTypeCard(t){
    return '<article class="ea-mini-card"><h3>'+esc(t.name)+'</h3><p>'+esc(t.default_short_note || "No default short note.")+'</p><div class="ea-pill-row"><span class="ea-pill">'+esc(t.default_access || "Public")+'</span><span class="ea-pill gray">'+esc(t.event_type_key)+'</span></div><div class="ea-actions"><button class="ea-btn small primary" data-ea-edit-type="'+esc(t.event_type_id || t.event_type_key)+'">Edit</button><button class="ea-btn small danger" data-ea-delete-type="'+esc(t.event_type_id || t.event_type_key)+'">Deactivate</button></div></article>';
  }

  function currentTypeForm(){
    var id=state.editingTypeId;
    return activeTypes().find(function(t){ return clean(t.event_type_id)===clean(id) || typeKeyOf(t)===clean(id); }) || {event_type_id:"", name:"", event_type_key:"", default_access:"Public", default_short_note:"", default_details_text:"", default_image_url:"", active:true, sort_order:999};
  }

  function renderTypeForm(){
    var t=currentTypeForm();
    var img = state.uploadPreviewUrl || t.default_image_url || "";
    return '<aside class="ea-side-card"><h3>'+(t.event_type_id?'Edit Event Type':'New Event Type')+'</h3><label class="ea-field"><span>Name</span><input class="ea-input" id="ea-type-name" value="'+esc(t.name)+'"><small class="ea-system-note">Type key is generated by the system.</small></label><label class="ea-field"><span>Default Access</span><select class="ea-select" id="ea-type-access"><option>Public</option><option>Member</option><option>Committee</option><option>Board</option></select></label><label class="ea-field"><span>Default Short Note</span><input class="ea-input" id="ea-type-short" value="'+esc(t.default_short_note)+'"></label><label class="ea-field"><span>Default Details Text</span><textarea class="ea-textarea" id="ea-type-details">'+esc(t.default_details_text)+'</textarea></label><label class="ea-field"><span>Default Image URL</span><input class="ea-input" id="ea-type-image" value="'+esc(img)+'"></label><div class="ea-dropzone" data-ea-dropzone><div>Drag and drop one image here, or click to choose.<br><small>Uploads through Edge workflow after wiring storage.</small></div><input type="file" id="ea-type-file" accept="image/*" class="ea-hidden"></div>'+(img?'<div class="ea-preview-img" style="margin-top:12px"><img src="'+esc(img)+'" alt="Event type image preview"></div>':'')+'<div class="ea-actions"><button class="ea-btn primary" data-ea-save-type'+savingAttr()+'>Save Type</button><button class="ea-btn" data-ea-new-type'+savingAttr()+'>Clear</button></div></aside>';
  }

  function readTypeForm(){
    return {
      customer_key:activeCustomerKey(),
      event_type_id: (currentTypeForm().event_type_id || state.editingTypeId || uid("type")),
      name: val("ea-type-name"),
      event_type_key: (currentTypeForm().event_type_key || slugify(val("ea-type-name"))),
      slug: slugify(val("ea-type-name")),
      default_access: val("ea-type-access") || "Public",
      default_short_note: val("ea-type-short"),
      default_details_text: val("ea-type-details"),
      default_image_url: val("ea-type-image"),
      active: true,
      sort_order: 999
    };
  }

  function renderLocationsTab(){
    return '<section class="ea-panel"><div class="ea-toolbar"><div><h2>Locations</h2><p>Saved locations keep addresses, maps, and venue notes consistent.</p></div><button class="ea-btn primary" data-ea-new-location>New Location</button></div><div class="ea-split"><div class="ea-card-grid">'+activeLocations().map(renderLocationCard).join("")+'</div>'+renderLocationForm()+'</div></section>';
  }

  function renderLocationCard(l){
    return '<article class="ea-mini-card"><h3>'+esc(l.name)+'</h3><p>'+esc(l.location_label || l.address || "No address posted.")+'</p><div class="ea-pill-row"><span class="ea-pill gray">'+esc(locationKeyOf(l))+'</span></div><div class="ea-actions"><button class="ea-btn small primary" data-ea-edit-location="'+esc(locationKeyOf(l))+'">Edit</button><button class="ea-btn small danger" data-ea-delete-location="'+esc(locationKeyOf(l))+'">Deactivate</button></div></article>';
  }

  function currentLocationForm(){
    var id=state.editingLocationId;
    return activeLocations().find(function(l){ return locationKeyOf(l)===clean(id) || clean(l.slug)===clean(id) || clean(l.name)===clean(id); }) || {location_key:"", name:"", slug:"", location_label:"", address:"", map_url:"", venue_note:"", active:true, sort_order:999};
  }

  function renderLocationForm(){
    var l=currentLocationForm();
    return '<aside class="ea-side-card"><h3>'+(locationKeyOf(l)?'Edit Location':'New Location')+'</h3><label class="ea-field"><span>Name</span><input class="ea-input" id="ea-location-name" value="'+esc(l.name)+'"><small class="ea-system-note">Location key is generated by the system.</small></label><label class="ea-field"><span>Location Label</span><input class="ea-input" id="ea-location-label" value="'+esc(l.location_label)+'"></label><label class="ea-field"><span>Address</span><input class="ea-input" id="ea-location-address" value="'+esc(l.address)+'"></label><div class="ea-actions"><button class="ea-btn" data-ea-create-map-link'+savingAttr()+'>Create Map Link</button></div><label class="ea-field"><span>Map URL</span><input class="ea-input" id="ea-location-map" value="'+esc(l.map_url)+'"></label><label class="ea-field"><span>Venue Note</span><textarea class="ea-textarea" id="ea-location-note">'+esc(l.venue_note)+'</textarea></label><div class="ea-actions"><button class="ea-btn primary" data-ea-save-location'+savingAttr()+'>Save Location</button><button class="ea-btn" data-ea-new-location'+savingAttr()+'>Clear</button></div></aside>';
  }

  function readLocationForm(){
    var current = currentLocationForm();
    var key = locationKeyOf(current) || slugify(val("ea-location-name"));
    return { customer_key:activeCustomerKey(), location_key: key, name: val("ea-location-name"), slug: key, location_label: val("ea-location-label") || val("ea-location-name"), address: val("ea-location-address"), map_url: val("ea-location-map"), venue_note: val("ea-location-note"), active:true, sort_order:999 };
  }

  function renderRsvpTab(){
    var eventRows=(state.data.events||[]).filter(function(e){ return e.rsvp_on && (!state.rsvpEventId || clean(e.event_id)===clean(state.rsvpEventId)); });
    var eventOptions = '<option value="">All RSVP Events</option>' + (state.data.events||[]).filter(function(e){return e.rsvp_on;}).map(function(e){ return '<option value="'+esc(e.event_id)+'" '+(clean(e.event_id)===clean(state.rsvpEventId)?'selected':'')+'>'+esc(e.name)+' · '+esc(dateOnly(e.start_at))+'</option>'; }).join("");
    return '<section class="ea-panel"><div class="ea-toolbar"><div><h2>RSVP / Attendance</h2><p>Summary view for RSVP-enabled events. Individual records remain admin-only.</p></div><div class="ea-toolbar-right"><select class="ea-select" id="ea-rsvp-filter" style="width:auto">'+eventOptions+'</select><button type="button" class="ea-btn" data-ea-rsvp-clear>Show All</button></div></div><div class="ea-card-grid">'+(eventRows.length?eventRows.map(function(ev){ var rows=(state.data.rsvps||[]).filter(function(r){return clean(r.event_id)===clean(ev.event_id) || clean(r.event_name)===clean(ev.name);}); var yes=rows.filter(function(r){return clean(r.rsvp_status).toLowerCase()==="yes" || clean(r.member_attending).toLowerCase()==="yes";}).length; var no=rows.filter(function(r){return clean(r.rsvp_status).toLowerCase()==="no";}).length; var total=rows.reduce(function(n,r){return n+(parseInt(r.total_count||0,10)||0);},0); return '<article class="ea-mini-card"><h3>'+esc(ev.name)+'</h3><p>'+esc(timeRange(ev))+'</p>'+dateNoteHtml(ev)+'<div class="ea-pill-row"><span class="ea-pill">Rows '+rows.length+'</span><span class="ea-pill good">Yes '+yes+'</span><span class="ea-pill warn">No '+no+'</span><span class="ea-pill">Total '+total+'</span></div><div class="ea-actions"><button type="button" class="ea-btn small primary" data-ea-edit="'+esc(ev.event_id)+'">Edit RSVP Settings</button><button type="button" class="ea-btn small" data-ea-select-event="'+esc(ev.event_id)+'" data-ea-tab-go="events">Back to Event</button></div></article>'; }).join(""):'<div class="ea-message">No RSVP-enabled events match this filter.</div>')+'</div></section>';
  }

  function renderPayloadsTab(){
    return '<section class="ea-panel"><div class="ea-toolbar"><div><h2>Staged Payloads</h2><p>Actions are staged here unless Edge write mode is enabled.</p></div><div class="ea-toolbar-right"><button class="ea-btn" data-ea-clear-payloads>Clear</button><button class="ea-btn primary" data-ea-export-payloads>Export JSON</button></div></div>'+(state.stagedActions.length?state.stagedActions.map(function(a,i){ return '<div class="ea-mini-card" style="margin-bottom:10px"><h3>'+esc(i+1)+'. '+esc(a.action)+'</h3><pre class="ea-payload">'+esc(JSON.stringify(a,null,2))+'</pre></div>'; }).join(""):'<div class="ea-message">No staged payloads yet.</div>')+'</section>';
  }

  function renderBody(){
    installStyles();
    var signedIn = !!(window.SyncEtc && window.SyncEtc.AuthContext && window.SyncEtc.AuthContext.getSnapshot().signed_in);
    var allowed = canManageEvents();
    var body = '<div class="event-admin-page"><div class="ea-shell">'+renderHero();
    if(!signedIn){
      body += '<main class="ea-main"><div class="ea-message">Sign in required. Use the header Login button to access Event Admin.</div></main></div></div>';
      return body;
    }
    if(!allowed){
      body += '<main class="ea-main"><div class="ea-message">Access denied. This account does not have Event Admin management access for the active customer.</div></main></div></div>';
      return body;
    }
    body += renderTabs()+'<main class="ea-main">'+(state.saving?'<div class="ea-saving-banner">Saving. Please wait...</div>':'')+'<div class="ea-message">'+esc(state.message)+'</div>';
    if(state.tab==="events") body += renderEventsTab();
    if(state.tab==="create") body += renderCreateTab();
    if(state.tab==="types") body += renderTypesTab();
    if(state.tab==="locations") body += renderLocationsTab();
    if(state.tab==="rsvp") body += renderRsvpTab();
    if(state.tab==="payloads") body += renderPayloadsTab();
    body += '</main></div></div>'+renderConfirmModal()+renderRepeatModal();
    return body;
  }

  function renderConfirmModal(){
    return '<div id="ea-confirm-modal" class="ea-modal-overlay"><div class="ea-modal"><div class="ea-modal-head"><h2 id="ea-confirm-title">Confirm Action</h2><p id="ea-confirm-body">Confirm this action.</p></div><div class="ea-modal-body"><div class="ea-actions"><button class="ea-btn danger" data-ea-confirm-yes>Confirm</button><button class="ea-btn" data-ea-confirm-no>Cancel</button></div></div></div></div>';
  }

  function renderRepeatModal(){
    return '<div id="ea-repeat-modal" class="ea-modal-overlay"><div class="ea-modal"><div class="ea-modal-head"><h2>Repeat Event</h2><p>Create a single duplicate or monthly repeated events from the selected event.</p></div><div class="ea-modal-body"><div class="ea-grid two"><label class="ea-field"><span>First New Date</span><input class="ea-input" id="ea-repeat-date" type="date"></label><label class="ea-field"><span>Number of Events</span><input class="ea-input" id="ea-repeat-count" type="number" min="1" max="24" value="1"></label></div><div class="ea-grid two"><label class="ea-field"><span>Pattern</span><select class="ea-select" id="ea-repeat-pattern"><option value="single">Single Duplicate</option><option value="monthly-same-day">Monthly - Same Day</option><option value="monthly-ordinal-weekday">Monthly - Same Weekday Pattern</option></select></label><label class="ea-field"><span>Display End Time</span><select class="ea-select" id="ea-repeat-end"><option value="same">Same as Source</option><option value="none">No End Time</option></select></label></div><div class="ea-actions"><button class="ea-btn primary" data-ea-repeat-create>Create Repeats</button><button class="ea-btn" data-ea-repeat-cancel>Cancel</button></div></div></div></div>';
  }

  function confirmEventDetails(ev, actionNote){
    if(!ev) return actionNote || "";
    var lines = [];
    lines.push(clean(ev.name));
    lines.push(timeRange(ev));
    if(clean(ev.location_name)) lines.push(clean(ev.location_name));
    if(clean(actionNote)) lines.push("");
    if(clean(actionNote)) lines.push(clean(actionNote));
    return lines.filter(function(line){ return line !== null && line !== undefined; }).join("\n");
  }

  function showConfirm(title, body, action){
    state.pendingAction = action;
    byId("ea-confirm-title").textContent = title;
    byId("ea-confirm-body").textContent = body;
    byId("ea-confirm-modal").classList.add("visible");
  }
  function hideConfirm(){ var m=byId("ea-confirm-modal"); if(m) m.classList.remove("visible"); state.pendingAction=null; }

  function setMessage(msg){ state.message = msg || ""; rerender(); }
  function rerender(){
    if(!state.shell) return;
    state.shell.render(renderBody());
    afterRender();
  }

  function afterRender(){
    setVal("ea-filter", state.eventFilter);
    setVal("ea-type-filter", state.typeFilter);
    var ev=currentFormEvent();
    setVal("ea-access", ev.access_level || "Public");
    setVal("ea-rsvp-audience", ev.rsvp_audience || "");
    updateTimeFieldState();
    var t=currentTypeForm();
    setVal("ea-type-access", t.default_access || "Public");
  }

  function applyLocal(action, payload){
    if(action==="create_event") state.data.events.push(normalizeEvent(payload));
    if(action==="update_event" || action==="cancel_event" || action==="restore_event" || action==="remove_from_calendar" || action==="restore_to_calendar") {
      if(action==="cancel_event") payload.cancelled = true;
      if(action==="restore_event") payload.cancelled = false;
      if(action==="remove_from_calendar") payload.approved = false;
      if(action==="restore_to_calendar") payload.approved = true;
      state.data.events = state.data.events.map(function(e){ return clean(e.event_id)===clean(payload.event_id) ? normalizeEvent(Object.assign({},e,payload)) : e; });
    }
    if(action==="create_event_type" || action==="update_event_type") {
      state.data.eventTypes = state.data.eventTypes.filter(function(t){ return clean(t.event_type_id)!==clean(payload.event_type_id) && clean(t.event_type_key)!==clean(payload.event_type_key); });
      state.data.eventTypes.push(payload);
    }
    if(action==="deactivate_event_type") state.data.eventTypes = state.data.eventTypes.map(function(t){ return clean(t.event_type_id)===clean(payload.event_type_id)||clean(t.event_type_key)===clean(payload.event_type_key) ? Object.assign({},t,{active:false}) : t; });
    if(action==="create_location" || action==="update_location") {
      state.data.locations = state.data.locations.filter(function(l){ return locationKeyOf(l)!==locationKeyOf(payload); });
      state.data.locations.push(payload);
    }
    if(action==="deactivate_location") state.data.locations = state.data.locations.map(function(l){ return locationKeyOf(l)===locationKeyOf(payload) ? Object.assign({},l,{active:false}) : l; });
    state.data = normalizeData(state.data);
  }

  function sendAction(action, payload){
    if(state.saving) return;
    var envelope={ action:action, customer_key:activeCustomerKey(), payload:payload, sent_at:new Date().toISOString(), source:VERSION };
    if(state.writeMode !== "edge" || !restHeaders()){
      state.stagedActions.push(envelope);
      applyLocal(action, payload);
      state.message = "Change staged: " + action + ". Live Supabase write is still off for this test page.";
      state.dirty=false;
      rerender();
      return;
    }
    state.saving = true;
    state.message = "Saving " + action + "...";
    rerender();
    fetch(EDGE_ACTION_URL, {method:"POST", headers:restHeaders(), body:JSON.stringify(envelope)})
      .then(function(r){ return r.json().catch(function(){ return null; }).then(function(body){ if(!r.ok || (body && body.ok === false)) throw new Error((body && body.error) || ("Edge returned " + r.status)); return body; }); })
      .then(function(body){ var saved = body && body.result ? body.result : payload; applyLocal(action,saved); state.message="Saved: "+action; state.dirty=false; state.saving=false; rerender(); })
      .catch(function(err){ state.saving=false; state.message="Save failed. No local-only change was applied: "+err.message; rerender(); });
  }

  function fillFromEvent(ev, clone){
    state.formMode = clone ? "clone" : "edit";
    state.editingEventId = ev.event_id;
    state.tab = "create";
    state.dirty = false;
    rerender();
  }

  function bind(){
    document.addEventListener("beforeunload", function(e){ if(state.dirty){ e.preventDefault(); e.returnValue=""; return ""; } });
    document.addEventListener("input", function(e){ if(e.target && e.target.closest && e.target.closest(".event-admin-page")){ state.dirty=true; updateInlineSaveButtons(); } });
    document.addEventListener("click", function(e){
      if(state.saving) return;
      var el=e.target;
      var tab=el.closest && el.closest("[data-ea-tab]"); if(tab){ state.tab=tab.getAttribute("data-ea-tab"); rerender(); return; }
      var edit=el.closest && el.closest("[data-ea-edit]"); if(edit){ e.preventDefault(); e.stopPropagation(); var ev=eventById(edit.getAttribute("data-ea-edit")); if(ev) fillFromEvent(ev,false); return; }
      var clone=el.closest && el.closest("[data-ea-clone]"); if(clone){ e.preventDefault(); e.stopPropagation(); var ev2=eventById(clone.getAttribute("data-ea-clone")); if(ev2) fillFromEvent(ev2,true); return; }
      var rep=el.closest && el.closest("[data-ea-repeat]"); if(rep){ e.preventDefault(); e.stopPropagation(); state.repeatSourceId=rep.getAttribute("data-ea-repeat"); byId("ea-repeat-modal").classList.add("visible"); return; }
      var rsvp=el.closest && el.closest("[data-ea-rsvp-event]"); if(rsvp){ e.preventDefault(); e.stopPropagation(); state.rsvpEventId=rsvp.getAttribute("data-ea-rsvp-event"); state.tab="rsvp"; rerender(); return; }
      var togCancel=el.closest && el.closest("[data-ea-toggle-cancel]"); if(togCancel){ e.preventDefault(); e.stopPropagation(); var ce=eventById(togCancel.getAttribute("data-ea-toggle-cancel")); if(ce) showConfirm(ce.cancelled?"Restore event?":"Cancel event?", confirmEventDetails(ce, ce.cancelled?"This will restore the event to normal calendar status.":"This will mark the event as cancelled but keep it available for restore."), function(){ sendAction(ce.cancelled?"restore_event":"cancel_event", Object.assign({},ce,{cancelled:!ce.cancelled})); }); return; }
      var togApproval=el.closest && el.closest("[data-ea-toggle-approval]"); if(togApproval){ e.preventDefault(); e.stopPropagation(); var ae=eventById(togApproval.getAttribute("data-ea-toggle-approval")); if(ae) showConfirm(ae.approved===false?"Restore to calendar?":"Remove from calendar?", confirmEventDetails(ae, ae.approved===false?"This will restore the event to the normal calendar list.":"This will remove the event from the normal calendar list without deleting the record."), function(){ sendAction(ae.approved===false?"restore_to_calendar":"remove_from_calendar", Object.assign({},ae,{approved:!(ae.approved!==false)})); }); return; }
      var select=el.closest && el.closest("[data-ea-select-event]"); if(select){ state.selectedEventId=select.getAttribute("data-ea-select-event"); if(select.getAttribute("data-ea-tab-go")) state.tab=select.getAttribute("data-ea-tab-go"); rerender(); return; }
      if(el.closest && el.closest("[data-ea-new-event]")){ state.formMode="create"; state.editingEventId=""; state.eventUploadPreviewUrl=""; state.tab="create"; state.dirty=false; rerender(); return; }
      if(el.closest && el.closest("[data-ea-clear-form]")){ if(state.dirty) return showConfirm("Reset event form?","Unsaved event form changes will be lost.",function(){ state.formMode="create"; state.editingEventId=""; state.eventUploadPreviewUrl=""; state.dirty=false; rerender(); }); state.formMode="create"; state.editingEventId=""; state.eventUploadPreviewUrl=""; rerender(); return; }
      if(el.closest && el.closest("[data-ea-save-event]")){ var ev=readEventForm(); var errors=validateEvent(ev); if(errors.length){ state.message=errors.join(" "); rerender(); return; } sendAction(state.formMode==="edit"?"update_event":"create_event",ev); return; }
      if(el.closest && el.closest("[data-ea-save-new-type-from-event]")){ var tf=readTypeFromEventForm(); if(!tf.name){ state.message="Enter a new event type name first."; rerender(); return; } var dupInlineType=findDuplicateType(tf); if(dupInlineType){ state.message="That event type already exists: "+dupInlineType.name; rerender(); return; } sendAction("create_event_type", tf); return; }
      if(el.closest && el.closest("[data-ea-save-new-location-from-event]")){ var lf=readLocationFromEventForm(); if(!lf.name){ state.message="Enter a location name first."; rerender(); return; } lf.location_key = lf.location_key || slugify(lf.name); var dupInlineLoc=findDuplicateLocation(lf); if(dupInlineLoc){ state.message="That location already exists: "+dupInlineLoc.name; rerender(); return; } sendAction("create_location", lf); return; }
      if(el.closest && el.closest("[data-ea-event-map-from-address]")){ var url=googleMapsUrlFromAddress(val("ea-address"), val("ea-location")); if(url) setVal("ea-map-url", url); return; }
      if(el.closest && el.closest("[data-ea-repeat-cancel]")){ byId("ea-repeat-modal").classList.remove("visible"); return; }
      if(el.closest && el.closest("[data-ea-repeat-create]")){ createRepeats(); return; }
      if(el.closest && el.closest("[data-ea-new-type]")){ state.editingTypeId=""; state.uploadPreviewUrl=""; rerender(); return; }
      var et=el.closest && el.closest("[data-ea-edit-type]"); if(et){ state.editingTypeId=et.getAttribute("data-ea-edit-type"); state.uploadPreviewUrl=""; rerender(); return; }
      var dt=el.closest && el.closest("[data-ea-delete-type]"); if(dt){ var tt=activeTypes().find(function(t){return clean(t.event_type_id)===clean(dt.getAttribute("data-ea-delete-type"))||clean(t.event_type_key)===clean(dt.getAttribute("data-ea-delete-type"));}); if(tt) showConfirm("Deactivate event type?", tt.name + "\n\nThis will hide the event type from future selection but will not delete existing events.", function(){ sendAction("deactivate_event_type", tt); }); return; }
      if(el.closest && el.closest("[data-ea-save-type]")){ var tf2=readTypeForm(); if(!tf2.name){ state.message="Event Type Name is required."; rerender(); return; } var dupType=findDuplicateType(tf2); if(dupType){ state.message="That event type already exists: "+dupType.name; rerender(); return; } sendAction(state.editingTypeId?"update_event_type":"create_event_type", tf2); return; }
      if(el.closest && el.closest("[data-ea-new-location]")){ state.editingLocationId=""; rerender(); return; }
      var eloc=el.closest && el.closest("[data-ea-edit-location]"); if(eloc){ state.editingLocationId=eloc.getAttribute("data-ea-edit-location"); rerender(); return; }
      var dloc=el.closest && el.closest("[data-ea-delete-location]"); if(dloc){ var ll=locationById(dloc.getAttribute("data-ea-delete-location")); if(ll) showConfirm("Deactivate location?", ll.name + (ll.address ? "\n" + ll.address : "") + "\n\nThis will hide the location from future selection but will not delete existing events.", function(){ sendAction("deactivate_location", ll); }); return; }
      if(el.closest && el.closest("[data-ea-create-map-link]")){ var addr=val("ea-location-address"); var lname=val("ea-location-name"); var mu=googleMapsUrlFromAddress(addr,lname); if(mu) setVal("ea-location-map", mu); return; }
      if(el.closest && el.closest("[data-ea-save-location]")){ var lf2=readLocationForm(); if(!lf2.name){ state.message="Location Name is required."; rerender(); return; } var dupLoc=findDuplicateLocation(lf2); if(dupLoc){ state.message="That location already exists: "+dupLoc.name; rerender(); return; } sendAction(state.editingLocationId?"update_location":"create_location", lf2); return; }
      if(el.closest && el.closest("[data-ea-clear-payloads]")){ state.stagedActions=[]; rerender(); return; }
      if(el.closest && el.closest("[data-ea-export-payloads]")){ exportJson(state.stagedActions, "syncetc-event-admin-staged-payloads.json"); return; }
      if(el.closest && el.closest("[data-ea-rsvp-clear]")){ state.rsvpEventId=""; rerender(); return; }
      if(el.closest && el.closest("[data-ea-confirm-yes]")){ var act=state.pendingAction; hideConfirm(); if(typeof act==="function") act(); return; }
      if(el.closest && el.closest("[data-ea-confirm-no]")){ hideConfirm(); return; }
      if(el.closest && el.closest("[data-ea-from-existing]")){ state.tab="create"; rerender(); return; }
      var dz=el.closest && el.closest("[data-ea-dropzone]"); if(dz){ var kind=dz.getAttribute("data-ea-dropzone") || "type"; var fi=kind==="event" ? byId("ea-event-file") : byId("ea-type-file"); if(fi) fi.click(); return; }
    });

    document.addEventListener("change", function(e){
      if(e.target && e.target.id==="ea-search"){ state.search=e.target.value; rerender(); }
      if(e.target && e.target.id==="ea-filter"){ state.eventFilter=e.target.value; rerender(); }
      if(e.target && e.target.id==="ea-type-filter"){ state.typeFilter=e.target.value; rerender(); }
      if(e.target && e.target.id==="ea-rsvp-filter"){ state.rsvpEventId=e.target.value; rerender(); }
      if(e.target && e.target.id==="ea-event-type"){ applyTypeDefaults(e.target.value); }
      if(e.target && e.target.id==="ea-location-preset"){ applyLocationPreset(e.target.value); }
      if(e.target && e.target.id==="ea-prior-template" && e.target.value){ var ev=eventById(e.target.value); if(ev) fillFromEvent(ev,true); }
      if(e.target && e.target.id==="ea-type-file"){ handleFile(e.target.files && e.target.files[0], "type"); }
      if(e.target && e.target.id==="ea-event-file"){ handleFile(e.target.files && e.target.files[0], "event"); }
      if(e.target && (e.target.id==="ea-start-hour" || e.target.id==="ea-start-minute" || e.target.id==="ea-start-ampm")){ updateTimeHidden("ea-start"); }
      if(e.target && (e.target.id==="ea-end-hour" || e.target.id==="ea-end-minute" || e.target.id==="ea-end-ampm")){ updateTimeHidden("ea-end"); }
      if(e.target && (e.target.id==="ea-no-end-time" || e.target.id==="ea-all-day")){ updateTimeFieldState(); }
      if(e.target && (e.target.id==="ea-location" || e.target.id==="ea-location-preset" || e.target.id==="ea-new-type-name")){ updateInlineSaveButtons(); }
    });

    document.addEventListener("dragover", function(e){ var dz=e.target.closest && e.target.closest("[data-ea-dropzone]"); if(dz){ e.preventDefault(); dz.classList.add("dragover"); } });
    document.addEventListener("dragleave", function(e){ var dz=e.target.closest && e.target.closest("[data-ea-dropzone]"); if(dz) dz.classList.remove("dragover"); });
    document.addEventListener("drop", function(e){ var dz=e.target.closest && e.target.closest("[data-ea-dropzone]"); if(dz){ e.preventDefault(); dz.classList.remove("dragover"); handleFile(e.dataTransfer.files && e.dataTransfer.files[0], dz.getAttribute("data-ea-dropzone") || "type"); } });
  }

  function normalizedCompare(v){ return clean(v).toLowerCase().replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim(); }
  function eventTypeNeedsSave(){
    var proposed = normalizedCompare(val("ea-new-type-name"));
    if(!proposed) return false;
    return !activeTypes().some(function(t){ return normalizedCompare(t.name)===proposed || normalizedCompare(t.event_type_key)===proposed; });
  }
  function locationNeedsSave(){
    var proposed = normalizedCompare(val("ea-location"));
    if(!proposed) return false;
    var preset = val("ea-location-preset");
    if(preset){
      var loc = locationById(preset);
      if(loc && (normalizedCompare(loc.location_label || loc.name)===proposed || normalizedCompare(loc.name)===proposed)) return false;
    }
    return !activeLocations().some(function(l){ return normalizedCompare(l.location_label || l.name)===proposed || normalizedCompare(l.name)===proposed; });
  }
  function updateInlineSaveButtons(){
    var typeBtn = byId("ea-save-new-type-inline");
    if(typeBtn) typeBtn.hidden = !eventTypeNeedsSave();
    var locBtn = byId("ea-save-new-location-inline");
    if(locBtn) locBtn.hidden = !locationNeedsSave();
  }

  function handleFile(file, kind){
    if(!file) return;
    kind = kind || "type";
    if(!/^image\//i.test(file.type||"")){ state.message="Choose one image file."; rerender(); return; }
    if(file.size > 5*1024*1024){ state.message="Choose an image under 5 MB."; rerender(); return; }
    var url = URL.createObjectURL(file);
    if(kind === "event"){
      state.eventUploadFile=file;
      state.eventUploadPreviewUrl=url;
      setVal("ea-image-url", url);
      state.message="Event image selected locally. Supabase Storage upload will be wired later.";
    } else {
      state.uploadFile=file;
      state.uploadPreviewUrl=url;
      setVal("ea-type-image", url);
      state.message="Event type image selected locally. Supabase Storage upload will be wired later.";
    }
    rerender();
  }

  function updateTimeFieldState(){
    var allDay = checked("ea-all-day");
    var noEnd = checked("ea-no-end-time") || allDay;
    var startTime = byId("ea-start-time");
    var startHour = byId("ea-start-hour");
    var startMinute = byId("ea-start-minute");
    var startAmpm = byId("ea-start-ampm");
    var endDate = byId("ea-end-date");
    var endTime = byId("ea-end-time");
    var endHour = byId("ea-end-hour");
    var endMinute = byId("ea-end-minute");
    var endAmpm = byId("ea-end-ampm");
    var startTimeField = byId("ea-start-time-field");
    var endDateField = byId("ea-end-date-field");
    var endTimeField = byId("ea-end-time-field");
    if(startTime) startTime.disabled = allDay;
    if(startHour) startHour.disabled = allDay;
    if(startMinute) startMinute.disabled = allDay;
    if(startAmpm) startAmpm.disabled = allDay;
    if(endDate) endDate.disabled = noEnd;
    if(endTime) endTime.disabled = noEnd;
    if(endHour) endHour.disabled = noEnd;
    if(endMinute) endMinute.disabled = noEnd;
    if(endAmpm) endAmpm.disabled = noEnd;
    if(startTimeField) startTimeField.classList.toggle("ea-time-disabled", allDay);
    if(endDateField) endDateField.classList.toggle("ea-time-disabled", noEnd);
    if(endTimeField) endTimeField.classList.toggle("ea-time-disabled", noEnd);
  }

  function applyTypeDefaults(key){
    var t=typeByKey(key); if(!t) return;
    if(!val("ea-event-name")) setVal("ea-event-name", t.name);
    setVal("ea-access", t.default_access || "Public");
    if(!val("ea-short-note")) setVal("ea-short-note", t.default_short_note || "");
    if(!val("ea-details-text")) setVal("ea-details-text", t.default_details_text || "");
    if(!val("ea-image-url")) setVal("ea-image-url", t.default_image_url || "");
  }

  function applyLocationPreset(id){
    var l=locationById(id); if(!l) return;
    setVal("ea-location", l.location_label || l.name);
    setVal("ea-address", l.address || "");
    setVal("ea-map-url", l.map_url || "");
    setVal("ea-venue-note", l.venue_note || "");
    updateInlineSaveButtons();
  }

  function createRepeats(){
    var src=eventById(state.repeatSourceId); if(!src) return;
    var count=parseInt(val("ea-repeat-count")||"1",10); if(isNaN(count)||count<1) count=1; if(count>24) count=24;
    var date=val("ea-repeat-date"); if(!date){ state.message="Choose a first new date for repeat events."; byId("ea-repeat-modal").classList.remove("visible"); rerender(); return; }
    var pattern=val("ea-repeat-pattern");
    var first=new Date(date+"T00:00:00");
    var sourceStart=parseDate(src.start_at);
    var startHour=sourceStart?sourceStart.getHours():19, startMin=sourceStart?sourceStart.getMinutes():30;
    var created=[];
    for(var i=0;i<count;i++){
      var d=new Date(first.getTime());
      if(pattern.indexOf("monthly")===0) d.setMonth(first.getMonth()+i);
      d.setHours(startHour,startMin,0,0);
      var ev=Object.assign({}, src, { event_id:uid("event"), slug:uid("repeat"), start_at:d.toISOString(), end_at:"", approved:false, cancelled:false, name:src.name });
      created.push(ev);
      sendAction("create_event", ev);
    }
    byId("ea-repeat-modal").classList.remove("visible");
    state.message="Repeat payloads created: "+created.length;
    rerender();
  }

  function exportJson(data, filename){
    var blob=new Blob([JSON.stringify(data,null,2)], {type:"application/json;charset=utf-8"});
    var url=URL.createObjectURL(blob);
    var a=document.createElement("a");
    a.href=url; a.download=filename;
    document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(url); a.remove(); }, 500);
  }

  function init(){
    ensureComponents().then(function(){
      var mountId = "syncetc-webflow-mount";
      var mount = document.getElementById(mountId);
      if(!mount){ mount=document.createElement("div"); mount.id=mountId; document.body.appendChild(mount); }
      if(window.SyncEtc && window.SyncEtc.AuthModal) window.SyncEtc.AuthModal.init();
      state.shell = window.SyncEtc.Components.SiteShell.create(mountId, { pageKey:"admin", audience:"admin", version:VERSION, showBanner:false });
      state.writeMode = window.SYNCETC_EVENT_ADMIN_WRITE_MODE || "edge";

      if(window.SyncEtc && window.SyncEtc.AuthContext){
        window.SyncEtc.AuthContext.subscribe(function(){
          if(state.shell){
            state.shell.render(renderBody());
            afterRender();
          }
        });
        return window.SyncEtc.AuthContext.init();
      }
    }).then(function(){
      if(!canManageEvents()){
        state.data = normalizeData(FALLBACK_DATA);
        state.shell.render(renderBody());
        afterRender();
        bind();
        return null;
      }
      return fetchData();
    }).then(function(data){
      if(data) state.data=data;
      else state.data = normalizeData(FALLBACK_DATA);
      state.shell.render(renderBody());
      afterRender();
      bind();
      console.log(VERSION + " loaded");
    }).catch(function(err){
      var mount=document.getElementById("syncetc-webflow-mount") || document.body;
      mount.innerHTML='<div style="max-width:900px;margin:30px auto;padding:20px;border:1px solid #c44;border-radius:14px;color:#722;background:#fff">Could not load Event Admin: '+String(err.message||err)+'</div>';
    });
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
/* PAGE-EVENT-ADMIN-v1.js - END */
