/* PAGE-CALENDAR-VIEWER-v14.js - BEGIN */
(function(){
"use strict";
var COMPONENT_FILES = ["COMPONENT-shared-utils-v1.js","COMPONENT-customer-style-v1.js","COMPONENT-base-styles-v1.js","COMPONENT-auth-context-v1.js","COMPONENT-auth-modal-v1.js","COMPONENT-security-context-v1.js","COMPONENT-auth-soft-bridge-v1.js","COMPONENT-master-controls-v1.js","COMPONENT-customer-settings-v1.js","COMPONENT-master-header-v1.js","COMPONENT-scroll-banner-v1.js","COMPONENT-master-footer-v1.js","COMPONENT-site-shell-v14.js","COMPONENT-customer-switcher-v1.js","COMPONENT-access-guard-v1.js"];
var CURRENT_SCRIPT_SRC=document.currentScript&&document.currentScript.src?document.currentScript.src:"";
function componentBaseUrl(){if(window.SYNCETC_COMPONENT_BASE_URL)return String(window.SYNCETC_COMPONENT_BASE_URL).replace(/\/?$/,"/");if(CURRENT_SCRIPT_SRC)return CURRENT_SCRIPT_SRC.substring(0,CURRENT_SCRIPT_SRC.lastIndexOf("/")+1);return"https://feskesen.github.io/syncetc-webflow-assets/";}
function loadScriptOnce(src){return new Promise(function(resolve,reject){var existing=Array.prototype.slice.call(document.scripts).find(function(s){return s.src===src;});if(existing)return resolve();var script=document.createElement("script");script.src=src;script.async=false;script.onload=function(){resolve();};script.onerror=function(){reject(new Error("Could not load "+src));};document.head.appendChild(script);});}
function ensureComponents(){var base=componentBaseUrl();return COMPONENT_FILES.reduce(function(p,file){return p.then(function(){return loadScriptOnce(base + file + "?v=calendar-viewer-admin-layer-v14");});},Promise.resolve());}
var VERSION="PAGE-CALENDAR-VIEWER-v14",EDGE_READ_URL="https://ocdaohkiwonjmirqkjww.supabase.co/functions/v1/syncetc-calendar-viewer-read";
var state={shell:null,events:[],visibleEvents:[],selectedEvent:null,viewMode:"compact",currentMonth:null,dateFilter:"upcoming",typeFilter:"all",search:"",loading:true,error:"",loadedEver:false,lastCustomerKey:"",refreshTimer:null,refreshBusy:false,refreshQueued:false,startupComplete:false,startupFrozen:true,firstRenderDone:false,initialFetchDone:false,initialFallbackTimer:null,lastRefreshAt:0};
function U(){return window.SyncEtc&&window.SyncEtc.Components?window.SyncEtc.Components.Utils:null;}function esc(v){if(U()&&U().esc)return U().esc(v);return(v==null?"":String(v)).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");}function clean(v){return(v==null?"":String(v)).trim();}function truthy(v){var x=clean(v).toLowerCase();return x==="true"||x==="yes"||x==="1"||x==="on";}function byId(id){return document.getElementById(id);}function customerConfig(){return state.shell&&state.shell.customer?state.shell.customer():{};}function activeCustomerKey(){return state.shell&&state.shell.getState?state.shell.getState().customerKey:"demo_flying_club";}function activeCustomerLabel(){var c=customerConfig();return clean(c.fullName||c.customerName||activeCustomerKey());}function content(path,fallback){var c=customerConfig(),obj=c.content||{};try{return clean(path.split(".").reduce(function(o,k){return o&&o[k];},obj))||fallback;}catch(e){return fallback;}}
function shellLocal(){try{return state.shell&&state.shell.getState?(state.shell.getState().local||{}):{};}catch(e){return {};}}
function pageValue(path,fallback){var local=shellLocal();if(Object.prototype.hasOwnProperty.call(local,path))return local[path];return content(path,fallback);}
function registerPageSettings(){
  if(!(window.SyncEtc&&window.SyncEtc.Components&&window.SyncEtc.Components.CustomerSettings))return;
  window.SyncEtc.Components.CustomerSettings.registerPage({
    pageKey:"events",
    pageLabel:"Calendar",
    note:"Customer-owned Calendar page copy and display controls. Event records themselves belong in Event Admin, not in this page settings drawer.",
    getDefaults:function(){
      return {
        "calendar.title":content("calendar.title","Calendar"),
        "calendar.intro":content("calendar.intro","Upcoming meetings, fly-outs, work sessions, and other events."),
        "calendar.helperText":content("calendar.helperText","Select an event card for details, links, notes, and location information.")
      };
    },
    fields:[
      {section:"Hero",key:"calendar.title",label:"Calendar Hero Title",type:"text"},
      {section:"Hero",key:"calendar.intro",label:"Calendar Intro",type:"textarea"},
      {section:"Hero",key:"calendar.helperText",label:"Helper Text",type:"textarea"}
    ],
    managerLink:{label:"Manage Events",pageKey:"event-admin"}
  });
}

function installStyles(){if(!U()||!U().installStyle)return;U().installStyle("PAGE-CALENDAR-VIEWER-v14-style",`.calendar-viewer-page{max-width:1180px;margin:34px auto 56px;padding:0 18px;font-family:Arial,Helvetica,sans-serif;color:var(--se-aero-text)}.cv-shell{background:var(--se-aero-card);border:1px solid var(--se-aero-border);border-radius:var(--se-aero-radius-xl);box-shadow:var(--se-aero-shadow);overflow:hidden}.cv-hero{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:22px;align-items:start;padding:32px 34px 28px;background:linear-gradient(135deg,var(--se-aero-navy),var(--se-aero-blue));color:#fff}.cv-eyebrow{display:inline-flex;margin-bottom:12px;padding:6px 12px;border-radius:999px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.24);font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.cv-hero h1{margin:0;color:#fff;font-size:clamp(30px,4vw,48px);line-height:1.05;font-weight:900}.cv-hero p{max-width:880px;margin:12px 0 0;color:rgba(255,255,255,.9);font-size:16px;line-height:1.6}.cv-filters{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end}.cv-filter{min-height:38px;border:1px solid rgba(18,54,90,.18);border-radius:999px;padding:9px 13px;background:#fff;color:var(--se-aero-navy);font-size:12px;font-weight:900;cursor:pointer}.cv-filter.active{background:var(--se-aero-navy);color:#fff;border-color:var(--se-aero-navy)}.cv-toolbar{display:grid;grid-template-columns:minmax(280px,360px) 1fr;gap:16px;align-items:end;padding:18px 30px;background:rgba(255,255,255,.88);border-bottom:1px solid var(--se-aero-border)}.cv-toolbar label{display:block;margin-bottom:6px;color:var(--se-aero-navy-dark);font-size:11px;font-weight:900;text-transform:uppercase}.cv-input{width:100%;min-height:42px;border:1px solid rgba(18,54,90,.18);border-radius:14px;padding:10px 12px;font:inherit}.cv-meta{padding:16px 30px;background:#fff;border-bottom:1px solid var(--se-aero-border);color:var(--se-aero-muted);font-weight:900}.cv-grid{padding:24px 30px 32px;background:rgba(255,255,255,.96);display:grid;gap:14px}.cv-card{display:grid;grid-template-columns:112px 1fr 150px;min-height:154px;width:100%;padding:0;text-align:left;background:#fff;border:1px solid rgba(18,54,90,.14);border-left:6px solid var(--se-aero-blue);border-radius:18px;box-shadow:0 10px 26px rgba(12,38,64,.10);overflow:hidden;cursor:pointer}.cv-date{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:2px;background:var(--se-aero-navy);color:#fff;padding:18px 10px;text-align:center}.cv-date b{font-size:13px;text-transform:uppercase}.cv-date strong{font-size:40px;line-height:1}.cv-body{padding:22px 16px}.cv-pill{display:inline-flex;border-radius:999px;padding:5px 9px;background:var(--se-aero-sky);color:var(--se-aero-navy);font-size:10px;font-weight:900;text-transform:uppercase}.cv-body h2{margin:8px 0 0;color:var(--se-aero-navy-dark);font-size:23px}.cv-line{margin-top:8px;color:#304d73;font-size:13px;font-weight:800}.cv-body p{margin:8px 0 0;color:#304d73;font-size:14px}.cv-body em{display:block;margin-top:10px;color:var(--se-aero-muted);font-style:normal;font-size:11px;font-weight:900;text-transform:uppercase}.cv-thumb{display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(234,245,255,.42);border-left:1px solid rgba(18,54,90,.10)}.cv-thumb img{max-width:118px;max-height:118px;object-fit:contain;border-radius:14px;background:#fff;border:1px solid rgba(18,54,90,.10);padding:8px}.cv-img-ph{width:118px;height:118px;border-radius:14px;border:1px dashed rgba(18,54,90,.22);display:flex;align-items:center;justify-content:center;color:var(--se-aero-muted);font-size:12px;font-weight:900;background:rgba(255,255,255,.7)}.cv-empty,.cv-error{padding:22px;border-radius:18px;background:#fff;border:1px solid rgba(18,54,90,.12);color:var(--se-aero-muted)}.cv-version{display:none!important}

.cv-view-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between;padding:14px 30px;background:rgba(255,255,255,.92);border-bottom:1px solid var(--se-aero-border)}
.cv-view-buttons{display:flex;flex-wrap:wrap;gap:8px}
.cv-month-nav{display:flex;align-items:center;gap:8px}
.cv-month-title{min-width:170px;text-align:center;color:var(--se-aero-navy-dark);font-size:13px;font-weight:950;text-transform:uppercase;letter-spacing:.04em}
.cv-month-grid{padding:24px 30px 32px;background:rgba(255,255,255,.96);display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:8px}
.cv-month-dow{padding:8px;color:var(--se-aero-navy);font-size:11px;font-weight:950;text-align:center;text-transform:uppercase;letter-spacing:.06em}
.cv-month-cell{min-height:112px;border:1px solid rgba(18,54,90,.12);border-radius:14px;background:#fff;padding:8px;box-shadow:0 6px 14px rgba(12,38,64,.06)}
.cv-month-cell.out{opacity:.42;background:rgba(234,245,255,.25)}
.cv-month-num{color:var(--se-aero-navy-dark);font-size:12px;font-weight:950}
.cv-month-event{display:block;width:100%;margin-top:6px;padding:6px 7px;border:0;border-radius:10px;background:var(--se-aero-sky);color:var(--se-aero-navy);font-size:11px;font-weight:900;text-align:left;cursor:pointer}
.cv-expanded-grid{padding:24px 30px 32px;background:rgba(255,255,255,.96);display:grid;gap:18px}
.cv-expanded-card{display:grid;grid-template-columns:180px 1fr 210px;gap:0;width:100%;padding:0;text-align:left;background:#fff;border:1px solid rgba(18,54,90,.14);border-left:6px solid var(--se-aero-blue);border-radius:20px;box-shadow:0 12px 28px rgba(12,38,64,.11);overflow:hidden;cursor:pointer}
.cv-expanded-card .cv-body{padding:24px 20px}
.cv-expanded-card .cv-thumb img,.cv-expanded-card .cv-img-ph{max-width:170px;max-height:160px;width:170px;height:160px}
@media(max-width:980px){.cv-expanded-card{grid-template-columns:112px 1fr}.cv-expanded-card .cv-thumb{grid-column:1/-1;border-left:0;border-top:1px solid rgba(18,54,90,.10)}.cv-month-grid{grid-template-columns:1fr}.cv-month-dow{display:none}.cv-month-cell{min-height:auto}.cv-month-cell.out{display:none}}
.cv-modal-backdrop{position:fixed;inset:0;z-index:99990;background:rgba(8,22,38,.58);display:flex;align-items:center;justify-content:center;padding:24px}
.cv-modal{width:min(920px,96vw);max-height:90vh;overflow:auto;background:#fff;border-radius:24px;box-shadow:0 26px 80px rgba(0,0,0,.28);border:1px solid rgba(255,255,255,.55)}
.cv-modal-head{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;padding:24px 26px 18px;background:linear-gradient(135deg,var(--se-aero-navy),var(--se-aero-blue));color:#fff}
.cv-modal-title{margin:0;color:#fff;font-size:30px;line-height:1.08;font-weight:900}
.cv-modal-close{width:42px;height:42px;border-radius:999px;border:1px solid rgba(255,255,255,.35);background:rgba(255,255,255,.12);color:#fff;font-size:28px;line-height:1;cursor:pointer}
.cv-modal-body{display:grid;grid-template-columns:minmax(0,1fr) 250px;gap:22px;padding:24px 26px 26px}
.cv-modal-main{min-width:0}
.cv-modal-side{display:flex;flex-direction:column;gap:12px}
.cv-modal-img{width:100%;max-height:210px;object-fit:contain;border-radius:18px;background:rgba(234,245,255,.62);border:1px solid rgba(18,54,90,.12);padding:10px}
.cv-modal-card{border:1px solid rgba(18,54,90,.12);border-radius:18px;background:rgba(234,245,255,.34);padding:14px}
.cv-modal-label{display:block;margin-bottom:5px;color:var(--se-aero-navy);font-size:10px;font-weight:950;text-transform:uppercase;letter-spacing:.08em}
.cv-modal-text{color:#304d73;font-size:14px;line-height:1.55;font-weight:700;white-space:pre-wrap}
.cv-modal-note{margin-top:14px;color:#304d73;font-size:15px;line-height:1.65;white-space:pre-wrap}
.cv-modal-actions{display:flex;flex-wrap:wrap;gap:9px;margin-top:18px}
.cv-modal-link{display:inline-flex;align-items:center;justify-content:center;min-height:38px;padding:9px 13px;border-radius:999px;background:var(--se-aero-navy);color:#fff!important;text-decoration:none;font-size:12px;font-weight:900}
.cv-modal-link.secondary{background:#fff;color:var(--se-aero-navy)!important;border:1px solid rgba(18,54,90,.18)}
@media(max-width:780px){.cv-modal-body{grid-template-columns:1fr}.cv-modal-head{padding:20px}.cv-modal-title{font-size:24px}.cv-modal-backdrop{padding:14px}.cv-modal-side{order:-1}}
@media(max-width:980px){.cv-hero,.cv-toolbar{grid-template-columns:1fr}.cv-card{grid-template-columns:92px 1fr}.cv-thumb{grid-column:1/-1;border-left:0;border-top:1px solid rgba(18,54,90,.10)}}@media(max-width:720px){.calendar-viewer-page{padding:0 12px}.cv-card{grid-template-columns:1fr}}`);}
function parseDate(v){var d=new Date(clean(v));return isNaN(d.getTime())?null:d;}function todayStart(){var n=new Date();return new Date(n.getFullYear(),n.getMonth(),n.getDate());}function normalizeEvent(o){var ev=Object.assign({},o||{});ev.event_id=ev.event_id||ev.id||ev.slug||"";ev.name=ev.name||"Untitled Event";ev.event_type_name=ev.event_type_name||ev.event_type_key||"Event";ev.all_day=truthy(ev.all_day);ev.no_end_time=truthy(ev.no_end_time);ev.rsvp_on=truthy(ev.rsvp_on);ev.approved=ev.approved!==false&&ev.approved!=="false";ev.cancelled=truthy(ev.cancelled);ev.sort_order=parseInt(ev.sort_order||999,10)||999;return ev;}function sortEvents(a,b){var ad=parseDate(a.start_at),bd=parseDate(b.start_at);return(ad?ad.getTime():9999999999999)-(bd?bd.getTime():9999999999999)||(a.sort_order||999)-(b.sort_order||999)||clean(a.name).localeCompare(clean(b.name));}function eventStatus(ev){var d=parseDate(ev.start_at);return !d||d>=todayStart()?"upcoming":"past";}function timeRange(ev){var s=parseDate(ev.start_at);if(!s)return"Date not set";if(ev.all_day)return s.toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric",year:"numeric"})+" · All day";return s.toLocaleString(undefined,{weekday:"short",month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit"});}function dateParts(ev){var d=parseDate(ev.start_at);if(!d)return{m:"",d:"",y:""};return{m:d.toLocaleString(undefined,{month:"short"}),d:d.toLocaleString(undefined,{day:"numeric"}),y:d.toLocaleString(undefined,{year:"numeric"})};}function imgHtml(ev){return ev.image_url?'<img src="'+esc(ev.image_url)+'" alt="'+esc(ev.name||"Event image")+'">':'<div class="cv-img-ph">Event</div>';}function searchText(ev){return[ev.name,ev.event_type_name,ev.location_name,ev.address,ev.short_note,ev.details_text].join(" ").toLowerCase();}
function fetchData(){state.loading=!state.loadedEver;state.error="";return fetch(EDGE_READ_URL+"?customer_key="+encodeURIComponent(activeCustomerKey()),{credentials:"omit"}).then(function(r){return r.json().catch(function(){return null;}).then(function(body){if(!r.ok||!body||body.ok===false)throw new Error((body&&body.error)||"Calendar read failed");return body;});}).then(function(body){state.events=(body.events||[]).map(normalizeEvent).sort(sortEvents);state.loading=false;state.loadedEver=true;return state.events;}).catch(function(err){state.loading=false;state.error=err&&err.message?err.message:"Calendar could not load.";return state.events;});}
function findEvent(id){id=clean(id);return state.events.find(function(ev){return clean(ev.event_id)===id||clean(ev.id)===id||clean(ev.slug)===id;})||null;}
function eventId(ev){return clean(ev.event_id||ev.id||ev.slug||ev.name||"");}
function urlHtml(label,url,secondary){url=clean(url);if(!url)return"";return '<a class="cv-modal-link '+(secondary?"secondary":"")+'" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+'</a>';}
function modalField(label,value){value=clean(value);if(!value)return"";return '<div class="cv-modal-card"><span class="cv-modal-label">'+esc(label)+'</span><div class="cv-modal-text">'+esc(value)+'</div></div>';}
function openEventModal(id){var ev=findEvent(id);if(!ev)return;state.selectedEvent=ev;renderModal();}
function closeEventModal(){state.selectedEvent=null;var el=byId("cv-modal-root");if(el)el.innerHTML="";}
function eventDetailsText(ev){return clean(ev.details_text||ev.details||ev.description||ev.long_note||"");}
function eventLocationText(ev){return clean(ev.location_name||ev.location_label||ev.location||"");}
function eventAddressText(ev){return clean(ev.address||ev.location_address||"");}
function eventMapUrl(ev){return clean(ev.map_url||ev.google_map_url||ev.maps_url||"");}
function eventZoomUrl(ev){return clean(ev.zoom_url||ev.meeting_url||ev.virtual_url||"");}
function eventDocumentUrl(ev){return clean(ev.document_url||ev.doc_url||ev.agenda_url||"");}
function renderModal(){
  var root=byId("cv-modal-root");if(!root)return;
  var ev=state.selectedEvent;if(!ev){root.innerHTML="";return;}
  var loc=eventLocationText(ev), addr=eventAddressText(ev), details=eventDetailsText(ev), map=eventMapUrl(ev), zoom=eventZoomUrl(ev), doc=eventDocumentUrl(ev);
  root.innerHTML='<div class="cv-modal-backdrop" data-cv-modal-backdrop="1" role="presentation"><section class="cv-modal" role="dialog" aria-modal="true" aria-label="'+esc(ev.name||"Event details")+'"><header class="cv-modal-head"><div><span class="cv-pill">'+esc(ev.event_type_name||"Event")+'</span><h2 class="cv-modal-title">'+esc(ev.name||"Untitled Event")+'</h2></div><button type="button" class="cv-modal-close" data-cv-close-modal="1" aria-label="Close event details">×</button></header><div class="cv-modal-body"><div class="cv-modal-main">'+modalField("Date and Time",timeRange(ev))+modalField("Location",loc)+modalField("Address",addr)+(ev.short_note?'<div class="cv-modal-note">'+esc(ev.short_note)+'</div>':'')+(details?'<div class="cv-modal-note">'+esc(details)+'</div>':'')+'<div class="cv-modal-actions">'+urlHtml("Map",map,false)+urlHtml("Zoom",zoom,true)+urlHtml("Document",doc,true)+'</div></div><aside class="cv-modal-side">'+(ev.image_url?'<img class="cv-modal-img" src="'+esc(ev.image_url)+'" alt="'+esc(ev.name||"Event image")+'">':'')+modalField("Access",ev.access_label||ev.access_opt||ev.access||"")+modalField("RSVP",ev.rsvp_on?"RSVP system pending":"Not enabled")+'</aside></div></section></div>';
}

function renderBody(){installStyles();return '<div class="calendar-viewer-page"><div class="cv-shell"><section class="cv-hero"><div><div class="cv-eyebrow">'+esc(activeCustomerLabel())+'</div><h1 data-cv-live-title>'+esc(pageValue("calendar.title","Calendar"))+'</h1><p data-cv-live-intro>'+esc(pageValue("calendar.intro","Upcoming meetings, fly-outs, work sessions, and other events."))+'</p><p>'+esc(pageValue("calendar.helperText","Select an event card for details, links, notes, and location information."))+'</p></div></section><section class="cv-toolbar"><div><label>Search Events</label><input id="cv-search" class="cv-input" type="search" placeholder="Search title, type, location, address, or notes" value="'+esc(state.search)+'"></div><div id="cv-filters" class="cv-filters"></div></section><section class="cv-view-row"><div class="cv-view-buttons" id="cv-view-buttons"></div><div class="cv-month-nav" id="cv-month-nav"></div></section><section id="cv-status" class="cv-meta">Loading events...</section><main id="cv-grid" class="cv-grid"></main></div><div id="cv-modal-root"></div></div>';}

function ensureMonthBase(){
  if(state.currentMonth)return;
  var first=null;
  var candidates=state.events.filter(function(ev){return eventStatus(ev)==="upcoming";});
  if(!candidates.length)candidates=state.events;
  candidates.some(function(ev){var d=parseDate(ev.start_at);if(d){first=new Date(d.getFullYear(),d.getMonth(),1);return true;}return false;});
  var n=new Date();
  state.currentMonth=first||new Date(n.getFullYear(),n.getMonth(),1);
}
function renderViewButtons(){
  var box=byId("cv-view-buttons");if(!box)return;
  var modes=[["month","Month"],["compact","Compact"],["expanded","Expanded"]];
  box.innerHTML=modes.map(function(m){return '<button type="button" class="cv-filter '+(state.viewMode===m[0]?"active":"")+'" data-cv-view="'+m[0]+'">'+m[1]+'</button>';}).join("");
}
function renderMonthNav(){
  var box=byId("cv-month-nav");if(!box)return;
  if(state.viewMode!=="month"){box.innerHTML="";return;}
  ensureMonthBase();
  var title=state.currentMonth.toLocaleString(undefined,{month:"long",year:"numeric"});
  box.innerHTML='<button type="button" class="cv-filter" data-cv-month="-1">‹</button><div class="cv-month-title">'+esc(title)+'</div><button type="button" class="cv-filter" data-cv-month="1">›</button>';
}
function createFilters(){var box=byId("cv-filters");if(!box)return;var types={};state.events.forEach(function(ev){var t=clean(ev.event_type_name||ev.event_type_key||"");if(t)types[t]=true;});var html='<button type="button" class="cv-filter '+(state.dateFilter==="upcoming"?"active":"")+'" data-cv-date="upcoming">Upcoming</button><button type="button" class="cv-filter '+(state.dateFilter==="past"?"active":"")+'" data-cv-date="past">Past</button><button type="button" class="cv-filter '+(state.dateFilter==="all"?"active":"")+'" data-cv-date="all">All Dates</button><button type="button" class="cv-filter '+(state.typeFilter==="all"?"active":"")+'" data-cv-type="all">All Types</button>';html+=Object.keys(types).sort().map(function(t){return'<button type="button" class="cv-filter '+(state.typeFilter===t?"active":"")+'" data-cv-type="'+esc(t)+'">'+esc(t)+'</button>';}).join("");box.innerHTML=html;renderViewButtons();renderMonthNav();}
function applyFilters(){state.visibleEvents=state.events.filter(function(ev){if(!ev.approved)return false;var status=eventStatus(ev);if(state.dateFilter!=="all"&&status!==state.dateFilter)return false;if(state.typeFilter!=="all"&&clean(ev.event_type_name)!==state.typeFilter)return false;if(state.search&&searchText(ev).indexOf(state.search.toLowerCase())<0)return false;return true;}).sort(sortEvents);renderEvents();}
function renderEvents(){var status=byId("cv-status");if(status){status.textContent=state.error?"Calendar unavailable.":(state.loading&&!state.loadedEver)?"Loading events...":state.visibleEvents.length+" visible event"+(state.visibleEvents.length===1?"":"s")+".";}var grid=byId("cv-grid");if(!grid)return;if(state.error){grid.className="cv-grid";grid.innerHTML='<div class="cv-error">'+esc(state.error)+'</div>';return;}if(state.loading&&!state.loadedEver){grid.className="cv-grid";grid.innerHTML='<div class="cv-empty">Loading events...</div>';return;}if(!state.visibleEvents.length){grid.className="cv-grid";grid.innerHTML='<div class="cv-empty">No events match the current filters.</div>';return;}if(state.viewMode==="month"){renderMonthView(grid);return;}if(state.viewMode==="expanded"){grid.className="cv-expanded-grid";grid.innerHTML=state.visibleEvents.map(expandedCard).join("");return;}grid.className="cv-grid";grid.innerHTML=state.visibleEvents.map(card).join("");}
function card(ev){var p=dateParts(ev),id=eventId(ev);return '<button type="button" class="cv-card" data-cv-event-id="'+esc(id)+'"><div class="cv-date"><b>'+esc(p.m)+'</b><strong>'+esc(p.d)+'</strong><span>'+esc(p.y)+'</span></div><div class="cv-body"><span class="cv-pill">'+esc(ev.event_type_name||"Event")+'</span><h2>'+esc(ev.name||"Untitled Event")+'</h2><div class="cv-line">'+esc(timeRange(ev))+'</div>'+(ev.location_name?'<div class="cv-line">'+esc(ev.location_name)+'</div>':'')+(ev.short_note?'<p>'+esc(ev.short_note)+'</p>':'')+'<em>Click for details</em></div><div class="cv-thumb">'+imgHtml(ev)+'</div></button>';}

function expandedCard(ev){var p=dateParts(ev),id=eventId(ev);return '<button type="button" class="cv-expanded-card" data-cv-event-id="'+esc(id)+'"><div class="cv-date"><b>'+esc(p.m)+'</b><strong>'+esc(p.d)+'</strong><span>'+esc(p.y)+'</span></div><div class="cv-body"><span class="cv-pill">'+esc(ev.event_type_name||"Event")+'</span><h2>'+esc(ev.name||"Untitled Event")+'</h2><div class="cv-line">'+esc(timeRange(ev))+'</div>'+(ev.location_name?'<div class="cv-line">'+esc(ev.location_name)+'</div>':'')+(ev.address?'<div class="cv-line">'+esc(ev.address)+'</div>':'')+(ev.short_note?'<p>'+esc(ev.short_note)+'</p>':'')+(ev.details_text?'<p>'+esc(ev.details_text)+'</p>':'')+'<em>Click for details</em></div><div class="cv-thumb">'+imgHtml(ev)+'</div></button>';}
function sameDay(a,b){return a&&b&&a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();}
function renderMonthView(grid){ensureMonthBase();grid.className="cv-month-grid";var m=state.currentMonth;var first=new Date(m.getFullYear(),m.getMonth(),1);var start=new Date(first);start.setDate(first.getDate()-first.getDay());var days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];var html=days.map(function(d){return'<div class="cv-month-dow">'+d+'</div>';}).join("");for(var i=0;i<42;i++){var d=new Date(start);d.setDate(start.getDate()+i);var out=d.getMonth()!==m.getMonth();var evs=state.visibleEvents.filter(function(ev){return sameDay(parseDate(ev.start_at),d);});html+='<div class="cv-month-cell '+(out?"out":"")+'"><div class="cv-month-num">'+d.getDate()+'</div>'+evs.slice(0,4).map(function(ev){return'<button type="button" class="cv-month-event" data-cv-event-id="'+esc(eventId(ev))+'">'+esc(ev.name||"Event")+'</button>';}).join("")+(evs.length>4?'<div class="cv-month-num">+'+(evs.length-4)+' more</div>':'')+'</div>';}grid.innerHTML=html;}

function rerender(){if(!state.shell)return;state.shell.render(renderBody());afterRender();}
function afterRender(){createFilters();applyFilters();var search=byId("cv-search");if(search)search.value=state.search;if(state.selectedEvent)renderModal();}
function renderCalendarOnly(){installStyles();createFilters();applyFilters();var search=byId("cv-search");if(search)search.value=state.search;if(state.selectedEvent)renderModal();}
function scheduleRefresh(reason){
  reason=reason||"scheduled";
  if(state.startupFrozen || !state.firstRenderDone){
    return;
  }
  if(reason==="auth-soft-change"||reason==="view-as-hard-change"){
    return;
  }
  var now=Date.now();
  if(now-state.lastRefreshAt<1200){
    state.refreshQueued=true;
    return;
  }
  if(state.refreshTimer)clearTimeout(state.refreshTimer);
  state.refreshTimer=setTimeout(function(){runStableRefresh(reason);},500);
}
function runStableRefresh(reason){
  reason=reason||"manual";
  if(state.startupFrozen || !state.firstRenderDone){return;}
  if(reason==="auth-soft-change"||reason==="view-as-hard-change"){return;}
  if(state.refreshBusy){state.refreshQueued=true;return;}
  state.refreshBusy=true;
  state.lastRefreshAt=Date.now();
  var beforeKey=activeCustomerKey();
  Promise.resolve()
    .then(function(){
      if(reason==="customer-hard-change" && state.shell && state.shell.loadCustomer){
        return state.shell.loadCustomer().then(function(){registerPageSettings();});
      }
    })
    .then(function(){
      var afterKey=activeCustomerKey();
      if(reason==="customer-hard-change" && afterKey!==state.lastCustomerKey){
        state.lastCustomerKey=afterKey;
        return fetchData().then(rerender);
      }
      state.lastCustomerKey=afterKey||beforeKey||state.lastCustomerKey;
      return fetchData().then(renderCalendarOnly);
    })
    .catch(function(){
      renderCalendarOnly();
    })
    .finally(function(){
      state.refreshBusy=false;
      if(state.refreshQueued){
        state.refreshQueued=false;
        if(!state.startupFrozen && state.firstRenderDone){setTimeout(function(){scheduleRefresh("queued");},900);}
      }
    });
}
function initialCalendarLoad(){
  state.loading=true;
  state.error="";
  state.initialFetchDone=false;
  return fetchData().then(function(){
    state.initialFetchDone=true;
  }).catch(function(){
    state.initialFetchDone=true;
    state.loading=false;
    state.error="Calendar could not load.";
  });
}
function bind(){document.addEventListener("click",function(e){var df=e.target.closest&&e.target.closest("[data-cv-date]");if(df){state.dateFilter=df.getAttribute("data-cv-date")||"upcoming";rerender();return;}var tf=e.target.closest&&e.target.closest("[data-cv-type]");if(tf){state.typeFilter=tf.getAttribute("data-cv-type")||"all";rerender();return;}var vw=e.target.closest&&e.target.closest("[data-cv-view]");if(vw){state.viewMode=vw.getAttribute("data-cv-view")||"compact";ensureMonthBase();rerender();return;}var mn=e.target.closest&&e.target.closest("[data-cv-month]");if(mn){ensureMonthBase();state.currentMonth=new Date(state.currentMonth.getFullYear(),state.currentMonth.getMonth()+parseInt(mn.getAttribute("data-cv-month")||"0",10),1);rerender();return;}var close=e.target.closest&&e.target.closest("[data-cv-close-modal]");if(close){closeEventModal();return;}if(e.target&&e.target.getAttribute&&e.target.getAttribute("data-cv-modal-backdrop")){closeEventModal();return;}var card=e.target.closest&&e.target.closest("[data-cv-event-id]");if(card){openEventModal(card.getAttribute("data-cv-event-id"));return;}});document.addEventListener("input",function(e){if(e.target&&e.target.id==="cv-search"){state.search=e.target.value||"";applyFilters();}});document.addEventListener("keydown",function(e){if(e.key==="Escape")closeEventModal();});document.addEventListener("syncetc:customer-hard-change",function(){scheduleRefresh("customer-hard-change");});document.addEventListener("syncetc:view-as-hard-change",function(){scheduleRefresh("view-as-hard-change");});document.addEventListener("syncetc:customer-settings-local-change",function(e){if(!e.detail||e.detail.pageKey==="events"){rerender();}});
document.addEventListener("syncetc:auth-soft-change",function(){scheduleRefresh("auth-soft-change");});}
function init(){ensureComponents().then(function(){var mountId="syncetc-webflow-mount";var mount=document.getElementById(mountId);if(!mount){mount=document.createElement("div");mount.id=mountId;document.body.appendChild(mount);}if(window.SyncEtc&&window.SyncEtc.AuthModal&&window.SyncEtc.AuthModal.init)window.SyncEtc.AuthModal.init();if(window.SyncEtc&&window.SyncEtc.AuthSoftBridge&&window.SyncEtc.AuthSoftBridge.start)window.SyncEtc.AuthSoftBridge.start();if(window.SyncEtc&&window.SyncEtc.AuthContext&&window.SyncEtc.AuthContext.subscribe){window.SyncEtc.AuthContext.subscribe(function(){document.dispatchEvent(new CustomEvent("syncetc:auth-soft-change",{detail:{reason:"auth-context-subscribe"}}));});}state.shell=window.SyncEtc.Components.SiteShell.create(mountId,{pageKey:"events",audience:"public",viewAs:"public",version:VERSION,showBanner:false});return state.shell.loadCustomer();}).then(function(){registerPageSettings();state.lastCustomerKey=activeCustomerKey();return window.SyncEtc.SecurityContext.refresh(activeCustomerKey());}).then(function(){bind();rerender();return initialCalendarLoad();}).then(function(){renderCalendarOnly();state.firstRenderDone=true;state.startupFrozen=false;state.startupComplete=true;state.refreshQueued=false;state.lastRefreshAt=Date.now();console.log(VERSION+" loaded");}).catch(function(err){state.startupFrozen=false;state.startupComplete=true;state.loading=false;state.error=err&&err.message?err.message:"Calendar could not load.";if(state.shell){rerender();}else{var mount=document.getElementById("syncetc-webflow-mount")||document.body;mount.innerHTML='<div style="max-width:900px;margin:30px auto;padding:20px;border:1px solid #c44;border-radius:14px;color:#722;background:#fff">Could not load Calendar Viewer: '+esc(err.message||err)+'</div>';}});}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
/* PAGE-CALENDAR-VIEWER-v14.js - END */
