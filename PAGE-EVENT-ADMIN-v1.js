/* PAGE-EVENT-ADMIN-v1.js - BEGIN */
(function(){
  "use strict";

  var COMPONENT_FILES = [
    "COMPONENT-shared-utils-v1.js",
    "COMPONENT-customer-style-v1.js",
    "COMPONENT-base-styles-v1.js",
    "COMPONENT-master-controls-v1.js",
    "COMPONENT-master-header-v1.js",
    "COMPONENT-scroll-banner-v1.js",
    "COMPONENT-master-footer-v1.js",
    "COMPONENT-site-shell-v1.js"
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

  var VERSION = "PAGE-EVENT-ADMIN-v1";
  var CUSTOMER_KEY = "150th_aero";
  var SUPABASE_URL = "https://ocdaohkiwonjmirqkjww.supabase.co";
  var EDGE_ACTION_URL = SUPABASE_URL + "/functions/v1/syncetc-calendar-admin-action";
  var FALLBACK_DATA = {"customer": {"customer_key": "150th_aero", "name": "150th Aero Flying Club"}, "eventTypes": [{"customer_key": "150th_aero", "event_type_id": "6a10ce0b74962341d7f52d96", "event_type_key": "member-meeting", "name": "Member Meeting", "slug": "member-meeting", "default_access": "Public", "default_short_note": "Regular member meeting.", "default_details_text": "Regular Club member meeting. Members are encouraged to attend, participate in Club business, and stay current on aircraft, operations, events, and other Club matters. Zoom access may be available when posted.", "default_image_url": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/6a10ce3d1910a87136bc2285_square_272x272.png", "active": true, "sort_order": 10, "legacy_webflow_id": "6a10ce0b74962341d7f52d96", "updated_at": "2026-05-23T04:17:34Z"}, {"customer_key": "150th_aero", "event_type_id": "6a10cea4a8b791bfcb825bf6", "event_type_key": "board-meeting", "name": "Board Meeting", "slug": "board-meeting", "default_access": "Public", "default_short_note": "Regular Board meeting.", "default_details_text": "Stay tuned here for agenda details that may be posted.", "default_image_url": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/6a10ce94b3781e8fe458b698_square_272x272.jpg", "active": true, "sort_order": 20, "legacy_webflow_id": "6a10cea4a8b791bfcb825bf6", "updated_at": "2026-05-23T04:17:34Z"}, {"customer_key": "150th_aero", "event_type_id": "6a10cfc05233de4a5e67296b", "event_type_key": "fly-out", "name": "Fly-Out", "slug": "fly-out", "default_access": "Public", "default_short_note": "Planned club fly-out to [DESTINATION].", "default_details_text": "Join us for a planned club fly-out to [DESTINATION]. This event is intended to promote safe flying, good planning, and club camaraderie. Members who wish to participate should coordinate in advance with the event organizer or the Board so aircraft availability, passenger arrangements, timing, and any other logistics can be confirmed. Please do not assume a seat or aircraft assignment is available unless arrangements have been made.", "default_image_url": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/6a10cf2463d57768f1f58fca_square_272x272.png", "active": true, "sort_order": 60, "legacy_webflow_id": "6a10cfc05233de4a5e67296b", "updated_at": "2026-05-23T04:17:34Z"}, {"customer_key": "150th_aero", "event_type_id": "6a10d0e91910a87136bd9510", "event_type_key": "barbecue", "name": "Barbecue", "slug": "barbecue", "default_access": "Public", "default_short_note": "Club barbecue and social event.", "default_details_text": "Join us for a Club barbecue and social event. This is an opportunity for members to spend time together, meet newer members, and enjoy the Club community outside of regular meetings and flying schedules. Additional details, timing, and any requested items may be posted as the event gets closer.", "default_image_url": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/6a10d0e5229b0390cf33f256_square_272x272.jpg", "active": true, "sort_order": 30, "legacy_webflow_id": "6a10d0e91910a87136bd9510", "updated_at": "2026-05-23T04:17:34Z"}, {"customer_key": "150th_aero", "event_type_id": "6a10d14695761dd47eff0ef9", "event_type_key": "dinner", "name": "Dinner", "slug": "dinner", "default_access": "Public", "default_short_note": "Club dinner and social gathering.", "default_details_text": "Join us for a Club dinner and social gathering. This event is intended to give members a relaxed opportunity to connect, talk aviation (or maybe anything but aviation), and strengthen Club camaraderie. Please review any posted details and RSVP instructions so the organizer can plan appropriately.", "default_image_url": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/6a10d15310c3f72466d0bdea_square_272x272.jpg", "active": true, "sort_order": 50, "legacy_webflow_id": "6a10d14695761dd47eff0ef9", "updated_at": "2026-05-23T04:17:34Z"}, {"customer_key": "150th_aero", "event_type_id": "6a10d193355d70e504e733d5", "event_type_key": "wash-and-wax", "name": "Wash and Wax", "slug": "wash-and-wax", "default_access": "Public", "default_short_note": "Aircraft wash and wax work party.", "default_details_text": "Join us for a Club aircraft wash and wax work party. This event helps keep the fleet looking sharp and gives members a chance to contribute directly to aircraft care. Members should review posted details for timing, location, and any requested supplies or assignments.", "default_image_url": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/6a10d18d63d57768f1f642ea_square_272x272.jpg", "active": true, "sort_order": 40, "legacy_webflow_id": "6a10d193355d70e504e733d5", "updated_at": "2026-05-23T04:17:34Z"}, {"customer_key": "150th_aero", "event_type_id": "6a10d39bb483e45e5ce2eeb6", "event_type_key": "ww-bbq", "name": "Wash And Wax with BBQ", "slug": "wash-and-wax-with-bbq", "default_access": "Public", "default_short_note": "Aircraft wash, wax, and Club barbecue.", "default_details_text": "Join us for a Club aircraft wash and wax work party followed by a barbecue/social gathering. This event helps keep the fleet looking sharp while giving members a chance to contribute directly to aircraft care and spend time together as a Club. Members should review posted details for timing, location, any requested supplies, and food or RSVP instructions.", "default_image_url": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/6a10d391229b0390cf34cb48_Screenshot%202026-05-22%20180620.jpg", "active": true, "sort_order": 40, "legacy_webflow_id": "6a10d39bb483e45e5ce2eeb6", "updated_at": "2026-05-23T04:17:34Z"}, {"customer_key": "150th_aero", "event_type_id": "6a10d48c1f2190a1d3a5e437", "event_type_key": "other", "name": "Other Event", "slug": "other-event", "default_access": "Public", "default_short_note": "Club event.", "default_details_text": "Details for this Club event will be posted as they become available. Please check the calendar entry for updates, location information, and any participation instructions.", "default_image_url": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/6a10d4892f248245f7ae73d8_square_272x272.png", "active": true, "sort_order": 99, "legacy_webflow_id": "6a10d48c1f2190a1d3a5e437", "updated_at": "2026-05-23T04:17:34Z"}], "locations": [{"customer_key": "150th_aero", "location_id": "6a10d6ec1ef7f6d333de56ae", "name": "Fairleigh Dickinson", "slug": "fairleigh-dickinson", "location_label": "Fairleigh Dickinson University - Madison Campus - Ferguson Recreation Center", "address": "230 Park Avenue, Rutherford Room, 2nd Floor, Florham Park, NJ 07932", "map_url": "https://maps.app.goo.gl/TLzdhzXx6PcegvPp8", "venue_note": "", "active": true, "sort_order": 1, "legacy_webflow_id": "6a10d6ec1ef7f6d333de56ae", "updated_at": "2026-05-23T01:38:45Z"}, {"customer_key": "150th_aero", "location_id": "6a10d8d0db4bcaefb2eb35ae", "name": "Atlantic Aviation - KMMU", "slug": "atlantic-aviation---kmmu", "location_label": "Atlantic Aviation - Morristown Airport - KMMU", "address": "50 Airport Rd suite 180, Morristown, NJ 07960", "map_url": "https://maps.app.goo.gl/Dzi4quV5dFhiLqpW8", "venue_note": "", "active": true, "sort_order": 20, "legacy_webflow_id": "6a10d8d0db4bcaefb2eb35ae", "updated_at": "2026-05-23T01:38:45Z"}, {"customer_key": "150th_aero", "location_id": "6a10da2a2751238ea065ff94", "name": "Club Hangars", "slug": "club-hangars", "location_label": "Club Hangars - Somerset Airport - KSMQ", "address": "150 Airport Rd, Bedminster, NJ 07921", "map_url": "https://maps.app.goo.gl/GQyjkMvV1LfHGyVDA", "venue_note": "", "active": true, "sort_order": 30, "legacy_webflow_id": "6a10da2a2751238ea065ff94", "updated_at": "2026-05-23T01:38:45Z"}], "events": [{"customer_key": "150th_aero", "event_id": "6a139017673e8ab69612574a", "name": "Board Meeting", "slug": "001a8858-cd02-40c2-b264-389c120b05c0", "event_type_key": "board-meeting", "event_type_name": "Board Meeting", "access_level": "Public", "rsvp_audience": "Board Members Only", "start_at": "2026-06-01T23:30:00Z", "end_at": "", "all_day": false, "no_end_time": true, "timezone": "America/New_York", "date_note": "", "location_name": "Atlantic Aviation - Morristown Airport - KMMU", "address": "50 Airport Rd suite 180, Morristown, NJ 07960", "map_url": "https://maps.app.goo.gl/Dzi4quV5dFhiLqpW8", "venue_note": "", "short_note": "Regular Board meeting.", "details_text": "Stay tuned here for agenda details that may be posted.", "image_url": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/6a139016673e8ab696125740_6a10ce94b3781e8fe458b698_square_272x272.jpeg", "zoom_url": "", "document_url": "", "rsvp_on": true, "supplies_on": false, "home_on": false, "approved": true, "cancelled": false, "sort_order": 999, "admin_note": "", "coordinator_requests": "", "coordinator_comment": "", "board_notes": "", "created_by": "Frank Eskesen", "created_by_email": "frank@nypifirm.com", "updated_at": "2026-05-25T01:48:47Z"}, {"customer_key": "150th_aero", "event_id": "6a13a1176c365f00a5b14b8e", "name": "Board Meeting", "slug": "ee566ba8-9a1a-4043-b3f5-2976292d883b", "event_type_key": "board-meeting", "event_type_name": "Board Meeting", "access_level": "Public", "rsvp_audience": "Board Members Only", "start_at": "2026-12-08T00:30:00Z", "end_at": "", "all_day": false, "no_end_time": true, "timezone": "America/New_York", "date_note": "", "location_name": "Atlantic Aviation - Morristown Airport - KMMU", "address": "50 Airport Rd suite 180, Morristown, NJ 07960", "map_url": "https://maps.app.goo.gl/Dzi4quV5dFhiLqpW8", "venue_note": "", "short_note": "Regular Board meeting.", "details_text": "Stay tuned here for agenda details that may be posted.", "image_url": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/6a139016673e8ab696125740_6a10ce94b3781e8fe458b698_square_272x272.jpeg", "zoom_url": "", "document_url": "", "rsvp_on": true, "supplies_on": false, "home_on": false, "approved": true, "cancelled": false, "sort_order": 999, "admin_note": "", "coordinator_requests": "", "coordinator_comment": "", "board_notes": "", "created_by": "Frank Eskesen", "created_by_email": "frank@nypifirm.com", "updated_at": "2026-05-25T01:49:41Z"}, {"customer_key": "150th_aero", "event_id": "6a13a1176cf5271478c9898b", "name": "Board Meeting", "slug": "69fe9636-cd9a-4a95-bd97-3020a585ddde", "event_type_key": "board-meeting", "event_type_name": "Board Meeting", "access_level": "Public", "rsvp_audience": "Board Members Only", "start_at": "2026-11-03T00:30:00Z", "end_at": "", "all_day": false, "no_end_time": true, "timezone": "America/New_York", "date_note": "", "location_name": "Atlantic Aviation - Morristown Airport - KMMU", "address": "50 Airport Rd suite 180, Morristown, NJ 07960", "map_url": "https://maps.app.goo.gl/Dzi4quV5dFhiLqpW8", "venue_note": "", "short_note": "Regular Board meeting.", "details_text": "Stay tuned here for agenda details that may be posted.", "image_url": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/6a139016673e8ab696125740_6a10ce94b3781e8fe458b698_square_272x272.jpeg", "zoom_url": "", "document_url": "", "rsvp_on": true, "supplies_on": false, "home_on": false, "approved": true, "cancelled": false, "sort_order": 999, "admin_note": "", "coordinator_requests": "", "coordinator_comment": "", "board_notes": "", "created_by": "Frank Eskesen", "created_by_email": "frank@nypifirm.com", "updated_at": "2026-05-25T01:49:29Z"}, {"customer_key": "150th_aero", "event_id": "6a13a11779db061ef2f14a08", "name": "Board Meeting", "slug": "431dd4d3-b7a7-414f-8a8e-f9b877c2a079", "event_type_key": "board-meeting", "event_type_name": "Board Meeting", "access_level": "Public", "rsvp_audience": "Board Members Only", "start_at": "2026-07-13T23:30:00Z", "end_at": "", "all_day": false, "no_end_time": true, "timezone": "America/New_York", "date_note": "Date changed due to July 4 holiday weekend.", "location_name": "Atlantic Aviation - Morristown Airport - KMMU", "address": "50 Airport Rd suite 180, Morristown, NJ 07960", "map_url": "https://maps.app.goo.gl/Dzi4quV5dFhiLqpW8", "venue_note": "", "short_note": "Regular Board meeting.", "details_text": "Stay tuned here for agenda details that may be posted.", "image_url": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/6a139016673e8ab696125740_6a10ce94b3781e8fe458b698_square_272x272.jpeg", "zoom_url": "", "document_url": "", "rsvp_on": true, "supplies_on": false, "home_on": false, "approved": true, "cancelled": false, "sort_order": 999, "admin_note": "", "coordinator_requests": "", "coordinator_comment": "", "board_notes": "", "created_by": "Frank Eskesen", "created_by_email": "frank@nypifirm.com", "updated_at": "2026-05-25T01:48:56Z"}, {"customer_key": "150th_aero", "event_id": "6a13a117b91794e7611132c5", "name": "Board Meeting", "slug": "4e83dd8d-35d7-4ff4-b1e6-6e56d1a1d474", "event_type_key": "board-meeting", "event_type_name": "Board Meeting", "access_level": "Public", "rsvp_audience": "Board Members Only", "start_at": "2026-10-05T23:30:00Z", "end_at": "", "all_day": false, "no_end_time": true, "timezone": "America/New_York", "date_note": "", "location_name": "Atlantic Aviation - Morristown Airport - KMMU", "address": "50 Airport Rd suite 180, Morristown, NJ 07960", "map_url": "https://maps.app.goo.gl/Dzi4quV5dFhiLqpW8", "venue_note": "", "short_note": "Regular Board meeting.", "details_text": "Stay tuned here for agenda details that may be posted.", "image_url": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/6a139016673e8ab696125740_6a10ce94b3781e8fe458b698_square_272x272.jpeg", "zoom_url": "", "document_url": "", "rsvp_on": true, "supplies_on": false, "home_on": false, "approved": true, "cancelled": false, "sort_order": 999, "admin_note": "", "coordinator_requests": "", "coordinator_comment": "", "board_notes": "", "created_by": "Frank Eskesen", "created_by_email": "frank@nypifirm.com", "updated_at": "2026-05-25T01:49:24Z"}, {"customer_key": "150th_aero", "event_id": "6a13a117c1296d802ed898a0", "name": "Board Meeting", "slug": "dbac7117-e9c0-4412-808d-b73f4b07f941", "event_type_key": "board-meeting", "event_type_name": "Board Meeting", "access_level": "Public", "rsvp_audience": "Board Members Only", "start_at": "2026-09-07T23:30:00Z", "end_at": "", "all_day": false, "no_end_time": true, "timezone": "America/New_York", "date_note": "", "location_name": "Atlantic Aviation - Morristown Airport - KMMU", "address": "50 Airport Rd suite 180, Morristown, NJ 07960", "map_url": "https://maps.app.goo.gl/Dzi4quV5dFhiLqpW8", "venue_note": "", "short_note": "Regular Board meeting.", "details_text": "Stay tuned here for agenda details that may be posted.", "image_url": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/6a139016673e8ab696125740_6a10ce94b3781e8fe458b698_square_272x272.jpeg", "zoom_url": "", "document_url": "", "rsvp_on": true, "supplies_on": false, "home_on": false, "approved": true, "cancelled": false, "sort_order": 999, "admin_note": "", "coordinator_requests": "", "coordinator_comment": "", "board_notes": "", "created_by": "Frank Eskesen", "created_by_email": "frank@nypifirm.com", "updated_at": "2026-05-25T01:49:09Z"}, {"customer_key": "150th_aero", "event_id": "6a13a117fdba499d310856b1", "name": "Board Meeting", "slug": "4cb69e5b-fb5e-4e1d-853e-1f1dd9e91d32", "event_type_key": "board-meeting", "event_type_name": "Board Meeting", "access_level": "Public", "rsvp_audience": "Board Members Only", "start_at": "2026-08-03T23:30:00Z", "end_at": "", "all_day": false, "no_end_time": true, "timezone": "America/New_York", "date_note": "", "location_name": "Atlantic Aviation - Morristown Airport - KMMU", "address": "50 Airport Rd suite 180, Morristown, NJ 07960", "map_url": "https://maps.app.goo.gl/Dzi4quV5dFhiLqpW8", "venue_note": "", "short_note": "Regular Board meeting.", "details_text": "Stay tuned here for agenda details that may be posted.", "image_url": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/6a139016673e8ab696125740_6a10ce94b3781e8fe458b698_square_272x272.jpeg", "zoom_url": "", "document_url": "", "rsvp_on": true, "supplies_on": false, "home_on": false, "approved": true, "cancelled": false, "sort_order": 999, "admin_note": "", "coordinator_requests": "", "coordinator_comment": "", "board_notes": "", "created_by": "Frank Eskesen", "created_by_email": "frank@nypifirm.com", "updated_at": "2026-05-25T01:49:02Z"}, {"customer_key": "150th_aero", "event_id": "6a13a3f1559e27db8918491d", "name": "Member Meeting", "slug": "738e6ce8-401a-4064-854b-fd890a043cd2", "event_type_key": "member-meeting", "event_type_name": "Member Meeting", "access_level": "Public", "rsvp_audience": "", "start_at": "2026-05-21T23:30:00Z", "end_at": "2026-05-24T04:00:00Z", "all_day": false, "no_end_time": true, "timezone": "America/New_York", "date_note": "", "location_name": "Fairleigh Dickinson University - Madison Campus - Ferguson Recreation Center", "address": "230 Park Avenue, Rutherford Room, 2nd Floor, Florham Park, NJ 07932", "map_url": "https://maps.app.goo.gl/TLzdhzXx6PcegvPp8", "venue_note": "", "short_note": "With financial report and avionics upgrade vote on agenda as announced by email.", "details_text": "Regular Club member meeting. Members are encouraged to attend, participate in Club business, and stay current on aircraft, operations, events, and other Club matters. Zoom access may be available when posted.", "image_url": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/6a13a3f1559e27db89184919_6a10ce3d1910a87136bc2285_square_272x272.png", "zoom_url": "", "document_url": "", "rsvp_on": false, "supplies_on": false, "home_on": false, "approved": true, "cancelled": false, "sort_order": 999, "admin_note": "", "coordinator_requests": "", "coordinator_comment": "", "board_notes": "", "created_by": "Frank Eskesen", "created_by_email": "frank@nypifirm.com", "updated_at": "2026-05-25T01:20:50Z"}, {"customer_key": "150th_aero", "event_id": "6a13ad1ddf6dee0b5f3e7c57", "name": "Member Meeting", "slug": "b382d39c-0129-4eaf-a46e-2a6ca2479399", "event_type_key": "member-meeting", "event_type_name": "Member Meeting", "access_level": "Public", "rsvp_audience": "All Eligible Members", "start_at": "2026-06-18T23:30:00Z", "end_at": "", "all_day": false, "no_end_time": true, "timezone": "America/New_York", "date_note": "", "location_name": "Fairleigh Dickinson University - Madison Campus - Ferguson Recreation Center", "address": "230 Park Avenue, Rutherford Room, 2nd Floor, Florham Park, NJ 07932", "map_url": "https://maps.app.goo.gl/TLzdhzXx6PcegvPp8", "venue_note": "Be alert to possible change of Location.  If weather is nice, we may move to SMQ.", "short_note": "Regular member meeting.", "details_text": "Regular Club member meeting. Members are encouraged to attend, participate in Club business, and stay current on aircraft, operations, events, and other Club matters. Zoom access may be available when posted.", "image_url": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/6a13a3f1559e27db89184919_6a10ce3d1910a87136bc2285_square_272x272.png", "zoom_url": "", "document_url": "", "rsvp_on": true, "supplies_on": false, "home_on": false, "approved": true, "cancelled": false, "sort_order": 999, "admin_note": "", "coordinator_requests": "", "coordinator_comment": "", "board_notes": "", "created_by": "Frank Eskesen", "created_by_email": "frank@nypifirm.com", "updated_at": "2026-05-25T02:00:45Z"}, {"customer_key": "150th_aero", "event_id": "6a13ada2227cb9be7f248e6d", "name": "Member Meeting", "slug": "471d8de0-f15b-4256-81b7-a8c5a8e09d64", "event_type_key": "member-meeting", "event_type_name": "Member Meeting", "access_level": "Public", "rsvp_audience": "All Eligible Members", "start_at": "2026-09-17T23:30:00Z", "end_at": "", "all_day": false, "no_end_time": true, "timezone": "America/New_York", "date_note": "", "location_name": "TBD", "address": "", "map_url": "", "venue_note": "Scouting New Venue Locations", "short_note": "Regular member meeting.", "details_text": "Regular Club member meeting. Members are encouraged to attend, participate in Club business, and stay current on aircraft, operations, events, and other Club matters. Zoom access may be available when posted.", "image_url": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/6a13a3f1559e27db89184919_6a10ce3d1910a87136bc2285_square_272x272.png", "zoom_url": "", "document_url": "", "rsvp_on": true, "supplies_on": false, "home_on": false, "approved": true, "cancelled": false, "sort_order": 999, "admin_note": "", "coordinator_requests": "", "coordinator_comment": "", "board_notes": "", "created_by": "Frank Eskesen", "created_by_email": "frank@nypifirm.com", "updated_at": "2026-05-25T02:03:29Z"}, {"customer_key": "150th_aero", "event_id": "6a13c64f673e8ab69624ea44", "name": "Wash And Wax with BBQ", "slug": "984ba5b5-e734-4f99-a78a-4c7e8c8af82f", "event_type_key": "ww-bbq", "event_type_name": "Wash And Wax with BBQ", "access_level": "Public", "rsvp_audience": "Board Members Only", "start_at": "2026-05-24T18:15:00Z", "end_at": "", "all_day": false, "no_end_time": true, "timezone": "America/New_York", "date_note": "", "location_name": "My town", "address": "123 main street, saugerties ny 12477", "map_url": "https://www.google.com/maps/search/?api=1&query=123%20main%20street%2C%20saugerties%20ny%2012477", "venue_note": "", "short_note": "Aircraft wash, wax, and Club barbecue.", "details_text": "Join us for a Club aircraft wash and wax work party followed by a barbecue/social gathering. This event helps keep the fleet looking sharp while giving members a chance to contribute directly to aircraft care and spend time together as a Club. Members should review posted details for timing, location, any requested supplies, and food or RSVP instructions.", "image_url": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/6a13c64f673e8ab69624ea36_6a10d391229b0390cf34cb48_Screenshot%25202026-05-22%2520180620.jpeg", "zoom_url": "", "document_url": "", "rsvp_on": true, "supplies_on": false, "home_on": false, "approved": false, "cancelled": false, "sort_order": 999, "admin_note": "", "coordinator_requests": "1\n2\n3\n4\n5\n6\n7\n8 items", "coordinator_comment": "", "board_notes": "", "created_by": "Frank Eskesen", "created_by_email": "frank@nypifirm.com", "updated_at": "2026-05-25T05:00:21Z"}], "rsvps": [{"customer_key": "150th_aero", "rsvp_id": "6a13d74013f6eadc554c0583", "event_id": "6a13c64f673e8ab69624ea44", "event_name": "Wash And Wax with BBQ", "memberstack_id": "mem_cmc1bgjmd02ti0wwv09nfgiju", "member_name": "Frank Eskesen", "member_email": "frank@nypifirm.com", "member_type": "Full Member", "rsvp_status": "No", "member_attending": "Yes", "additional_adults": 0, "additional_children": 0, "total_count": 0, "bringing_note": "The Club is in good shape overall. Aircraft usage has remained steady, the waitlist continues to be strong, and we continue to receive interest from prospective members. That said, we should remain focused on the same basic priorities: keeping the aircraft safe and available, keeping members informed, and making our administrative systems easier to manage.", "member_comment": "", "last_updated": "2026-05-25T04:59:44.160Z", "rsvp_key": "6a13c64f673e8ab69624ea44-mem_cmc1bgjmd02ti0wwv09nfgiju"}, {"customer_key": "150th_aero", "rsvp_id": "6a15bd5b4303cce454eb761a", "event_id": "6a139017673e8ab69612574a", "event_name": "Board Meeting", "memberstack_id": "mem_cmc1bgjmd02ti0wwv09nfgiju", "member_name": "Frank Eskesen", "member_email": "frank@nypifirm.com", "member_type": "Full Member", "rsvp_status": "Yes", "member_attending": "Yes", "additional_adults": 0, "additional_children": 0, "total_count": 1, "bringing_note": "", "member_comment": "", "last_updated": "2026-05-26T15:33:46.977Z", "rsvp_key": "6a139017673e8ab69612574a-mem_cmc1bgjmd02ti0wwv09nfgiju"}], "settings": {"timezone": "America/New_York", "write_mode": "staged", "edge_function_name": "syncetc-calendar-admin-action", "page_title": "Event Admin Console"}, "meta": {"source": "embedded_admin_seed", "generated_at": "2026-05-29T04:05:51.892161+00:00"}};

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
  function toDatetimeLocal(v){ var d=parseDate(v); if(!d) return ""; var z=function(n){return String(n).padStart(2,"0");}; return d.getFullYear()+"-"+z(d.getMonth()+1)+"-"+z(d.getDate())+"T"+z(d.getHours())+":"+z(d.getMinutes()); }
  function fromDatetimeLocal(v){ return clean(v) ? new Date(v).toISOString() : ""; }
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
    return { apikey: anon, Authorization: "Bearer " + anon, "Content-Type":"application/json" };
  }

  function fetchRest(path){
    var h=restHeaders();
    if(!h) return Promise.reject(new Error("No Supabase anon key present."));
    return fetch(SUPABASE_URL + "/rest/v1/" + path, { headers:h }).then(function(r){ if(!r.ok) throw new Error(path + " " + r.status); return r.json(); });
  }

  function fetchData(){
    return Promise.all([
      fetchRest("syncetc_calendar_events?customer_key=eq."+encodeURIComponent(CUSTOMER_KEY)+"&select=*&order=start_at.asc.nullslast"),
      fetchRest("syncetc_calendar_event_types?customer_key=eq."+encodeURIComponent(CUSTOMER_KEY)+"&select=*&order=sort_order.asc"),
      fetchRest("syncetc_calendar_locations?customer_key=eq."+encodeURIComponent(CUSTOMER_KEY)+"&select=*&order=sort_order.asc"),
      fetchRest("syncetc_calendar_rsvps?customer_key=eq."+encodeURIComponent(CUSTOMER_KEY)+"&select=*")
    ]).then(function(parts){ return normalizeData({events:parts[0], eventTypes:parts[1], locations:parts[2], rsvps:parts[3]}); }).catch(function(){ return normalizeData(FALLBACK_DATA); });
  }

  function installStyles(){
    U().installStyle("PAGE-EVENT-ADMIN-v1-style", `
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
      .ea-hidden { display:none!important; }
      @media(max-width:980px){ .ea-split,.ea-grid.two,.ea-grid.three,.ea-card-grid{grid-template-columns:1fr;} .ea-event-card{grid-template-columns:80px minmax(0,1fr);} .ea-event-actions{grid-column:1/-1; border-left:0; border-top:1px solid rgba(18,54,90,.10); flex-direction:row; flex-wrap:wrap; justify-content:flex-start;} }
      @media(max-width:720px){ .event-admin-page{padding:0 12px;} .ea-main{padding:16px;} .ea-hero{padding:26px 20px;} }
    `);
  }

  function eventById(id){ return (state.data.events||[]).find(function(e){return String(e.event_id)===String(id);}) || null; }
  function typeByKey(key){ return (state.data.eventTypes||[]).find(function(t){ return clean(t.event_type_key)===clean(key) || clean(t.name)===clean(key); }); }
  function locationById(id){ return (state.data.locations||[]).find(function(l){ return clean(l.location_id)===clean(id) || clean(l.name)===clean(id) || clean(l.slug)===clean(id); }); }
  function activeTypes(){ return (state.data.eventTypes||[]).filter(function(t){ return t.active !== false && t.active !== "false"; }); }
  function activeLocations(){ return (state.data.locations||[]).filter(function(l){ return l.active !== false && l.active !== "false"; }); }

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
      ["rsvp","RSVP / Attendance"],
      ["payloads","Staged Payloads"]
    ];
    return '<div class="ea-tabs">' + tabs.map(function(t){ return '<button type="button" class="ea-tab '+(state.tab===t[0]?'active':'')+'" data-ea-tab="'+t[0]+'">'+esc(t[1])+'</button>'; }).join("") + '</div>';
  }

  function renderHero(){
    return '<section class="ea-hero"><div class="ea-eyebrow">Admin Tool</div><h1>Event Admin Console</h1><p>Create, edit, duplicate, repeat, cancel, remove, restore, and manage RSVP settings, event types, saved locations, and event images from one combined workflow.</p></section>';
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
    return '<article class="ea-event-card '+(state.selectedEventId===ev.event_id?'selected':'')+'" data-ea-select-event="'+esc(ev.event_id)+'">'+
      '<div class="ea-event-date"><span>'+esc(p.m)+'</span><b>'+esc(p.d)+'</b><span>'+esc(p.y)+'</span></div>'+
      '<div class="ea-event-main"><div class="ea-pill-row">'+statusPills(ev)+'</div><h3 class="ea-event-title">'+esc(ev.name)+'</h3><div class="ea-event-line">'+esc(timeRange(ev))+'</div>'+(ev.location_name?'<div class="ea-event-line">'+esc(ev.location_name)+'</div>':'')+(ev.short_note?'<div class="ea-event-line" style="font-weight:400;margin-top:6px">'+esc(ev.short_note)+'</div>':'')+'</div>'+
      '<div class="ea-event-actions"><button class="ea-btn small primary" data-ea-edit="'+esc(ev.event_id)+'">Edit</button><button class="ea-btn small" data-ea-clone="'+esc(ev.event_id)+'">Clone</button><button class="ea-btn small" data-ea-repeat="'+esc(ev.event_id)+'">Repeat</button></div>'+
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
    return '<aside class="ea-side-card"><div class="ea-preview-img">'+img+'</div><h3>'+esc(ev.name)+'</h3><p><strong>'+esc(timeRange(ev))+'</strong></p><p>'+esc(ev.location_name||"No location posted")+'</p><div class="ea-pill-row">'+statusPills(ev)+'</div><div class="ea-actions"><button class="ea-btn primary" data-ea-edit="'+esc(ev.event_id)+'">Edit Event</button><button class="ea-btn" data-ea-clone="'+esc(ev.event_id)+'">Clone</button><button class="ea-btn" data-ea-repeat="'+esc(ev.event_id)+'">Repeat</button><button class="ea-btn '+(ev.cancelled?'':'danger')+'" data-ea-toggle-cancel="'+esc(ev.event_id)+'">'+(ev.cancelled?'Restore Event':'Cancel Event')+'</button><button class="ea-btn warning" data-ea-toggle-approval="'+esc(ev.event_id)+'">'+(ev.approved===false?'Restore to Calendar':'Remove from Calendar')+'</button></div></aside>';
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
    var typeOptions = '<option value="">Select event type</option>' + activeTypes().map(function(t){ return '<option value="'+esc(t.event_type_key)+'" '+(clean(t.event_type_key)===clean(ev.event_type_key)?'selected':'')+'>'+esc(t.name)+'</option>'; }).join("");
    var locOptions = '<option value="">Custom / no saved location</option>' + activeLocations().map(function(l){ return '<option value="'+esc(l.location_id || l.slug || l.name)+'">'+esc(l.name)+'</option>'; }).join("");
    var priorOptions = '<option value="">Select prior event as template</option>' + (state.data.events||[]).map(function(e){ return '<option value="'+esc(e.event_id)+'">'+esc(e.name)+' · '+esc(dateOnly(e.start_at))+'</option>'; }).join("");
    return '<section class="ea-panel"><div class="ea-toolbar"><div><h2>'+(isEdit?'Edit Event':'Create Event')+'</h2><p>Use a blank event, a saved event type/location, or preselect from a prior event.</p></div><div class="ea-toolbar-right"><button class="ea-btn" data-ea-clear-form>Blank Event</button><button class="ea-btn primary" data-ea-save-event>'+(isEdit?'Save Changes':'Create Event')+'</button></div></div>'+
      '<div class="ea-message">'+(state.dirty?'Unsaved changes in this event form.':'Create/edit form ready.')+'</div>'+
      '<div class="ea-grid two"><label class="ea-field"><span>Create from prior event</span><select class="ea-select" id="ea-prior-template">'+priorOptions+'</select></label><label class="ea-field"><span>Event title</span><input class="ea-input" id="ea-event-name" value="'+esc(ev.name)+'" placeholder="Example: June Member Meeting"></label></div>'+
      '<div class="ea-grid two"><label class="ea-field"><span>Event type</span><select class="ea-select" id="ea-event-type">'+typeOptions+'</select></label><label class="ea-field"><span>Visibility</span><select class="ea-select" id="ea-access"><option>Public</option><option>Member</option><option>Committee</option><option>Board</option></select></label></div>'+
      '<div class="ea-grid three"><label class="ea-field"><span>Start</span><input class="ea-input" id="ea-start" type="datetime-local" value="'+esc(toDatetimeLocal(ev.start_at))+'"></label><label class="ea-field"><span>End</span><input class="ea-input" id="ea-end" type="datetime-local" value="'+esc(toDatetimeLocal(ev.end_at))+'"></label><label class="ea-field"><span>Date note</span><input class="ea-input" id="ea-date-note" value="'+esc(ev.date_note)+'"></label></div>'+
      '<div class="ea-grid three"><label><input type="checkbox" id="ea-all-day" '+(ev.all_day?'checked':'')+'> All day</label><label><input type="checkbox" id="ea-no-end-time" '+(ev.no_end_time?'checked':'')+'> Do not display end time</label><label><input type="checkbox" id="ea-approved" '+(ev.approved!==false?'checked':'')+'> Published / approved</label></div>'+
      '<div class="ea-grid two"><label class="ea-field"><span>Saved location</span><select class="ea-select" id="ea-location-preset">'+locOptions+'</select></label><label class="ea-field"><span>Location</span><input class="ea-input" id="ea-location" value="'+esc(ev.location_name)+'"></label></div>'+
      '<label class="ea-field"><span>Address</span><input class="ea-input" id="ea-address" value="'+esc(ev.address)+'"></label><div class="ea-grid two"><label class="ea-field"><span>Map URL</span><input class="ea-input" id="ea-map-url" value="'+esc(ev.map_url)+'"></label><label class="ea-field"><span>Image URL</span><input class="ea-input" id="ea-image-url" value="'+esc(ev.image_url)+'"></label></div>'+
      '<label class="ea-field"><span>Venue note</span><textarea class="ea-textarea" id="ea-venue-note">'+esc(ev.venue_note)+'</textarea></label><label class="ea-field"><span>Short note</span><input class="ea-input" id="ea-short-note" value="'+esc(ev.short_note)+'"></label><label class="ea-field"><span>Details text</span><textarea class="ea-textarea" id="ea-details-text">'+esc(ev.details_text)+'</textarea></label>'+
      '<div class="ea-grid two"><label class="ea-field"><span>Zoom URL</span><input class="ea-input" id="ea-zoom-url" value="'+esc(ev.zoom_url)+'"></label><label class="ea-field"><span>Document URL</span><input class="ea-input" id="ea-document-url" value="'+esc(ev.document_url)+'"></label></div>'+
      '<div class="ea-panel"><h3>RSVP Controls</h3><div class="ea-grid two"><label><input type="checkbox" id="ea-rsvp-on" '+(ev.rsvp_on?'checked':'')+'> RSVP On</label><label class="ea-field"><span>RSVP Audience</span><select class="ea-select" id="ea-rsvp-audience"><option value="">Select one...</option><option>All Eligible Members</option><option>Board Members Only</option></select></label></div><label class="ea-field"><span>Requested / Helpful Items</span><textarea class="ea-textarea" id="ea-coordinator-requests">'+esc(ev.coordinator_requests)+'</textarea></label><label class="ea-field"><span>Coordinator Note</span><textarea class="ea-textarea" id="ea-coordinator-comment">'+esc(ev.coordinator_comment)+'</textarea></label><label class="ea-field"><span>Administrator RSVP Note</span><textarea class="ea-textarea" id="ea-board-notes">'+esc(ev.board_notes)+'</textarea></label></div>'+
      '<label class="ea-field"><span>Administrator-only event note</span><textarea class="ea-textarea" id="ea-admin-note">'+esc(ev.admin_note)+'</textarea></label>'+
      '<div class="ea-actions"><button class="ea-btn primary" data-ea-save-event>'+(isEdit?'Save Changes':'Create Event')+'</button><button class="ea-btn" data-ea-preview-payload>Preview Payload</button><button class="ea-btn" data-ea-clear-form>Reset Form</button></div>'+
    '</section>';
  }

  function readEventForm(){
    var type=typeByKey(val("ea-event-type"));
    var payload = {
      customer_key:CUSTOMER_KEY,
      event_id: state.formMode==="edit" ? state.editingEventId : uid("event"),
      name: val("ea-event-name"),
      slug: slugify(val("ea-event-name")),
      event_type_key: val("ea-event-type"),
      event_type_name: type ? type.name : val("ea-event-type"),
      access_level: val("ea-access") || "Public",
      start_at: fromDatetimeLocal(val("ea-start")),
      end_at: checked("ea-no-end-time") ? "" : fromDatetimeLocal(val("ea-end")),
      all_day: checked("ea-all-day"),
      no_end_time: checked("ea-no-end-time"),
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
    if(!clean(ev.start_at)) errors.push("Start date/time is required.");
    if(!clean(ev.location_name)) errors.push("Location is required.");
    if(ev.rsvp_on && !clean(ev.rsvp_audience)) errors.push("RSVP Audience is required when RSVP is on.");
    return errors;
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
    return activeTypes().find(function(t){ return clean(t.event_type_id)===clean(id) || clean(t.event_type_key)===clean(id); }) || {event_type_id:"", name:"", event_type_key:"", default_access:"Public", default_short_note:"", default_details_text:"", default_image_url:"", active:true, sort_order:999};
  }

  function renderTypeForm(){
    var t=currentTypeForm();
    var img = state.uploadPreviewUrl || t.default_image_url || "";
    return '<aside class="ea-side-card"><h3>'+(t.event_type_id?'Edit Event Type':'New Event Type')+'</h3><label class="ea-field"><span>Name</span><input class="ea-input" id="ea-type-name" value="'+esc(t.name)+'"></label><label class="ea-field"><span>Type Key</span><input class="ea-input" id="ea-type-key" value="'+esc(t.event_type_key)+'"></label><label class="ea-field"><span>Default Access</span><select class="ea-select" id="ea-type-access"><option>Public</option><option>Member</option><option>Committee</option><option>Board</option></select></label><label class="ea-field"><span>Default Short Note</span><input class="ea-input" id="ea-type-short" value="'+esc(t.default_short_note)+'"></label><label class="ea-field"><span>Default Details Text</span><textarea class="ea-textarea" id="ea-type-details">'+esc(t.default_details_text)+'</textarea></label><label class="ea-field"><span>Default Image URL</span><input class="ea-input" id="ea-type-image" value="'+esc(img)+'"></label><div class="ea-dropzone" data-ea-dropzone><div>Drag and drop one image here, or click to choose.<br><small>Uploads through Edge workflow after wiring storage.</small></div><input type="file" id="ea-type-file" accept="image/*" class="ea-hidden"></div>'+(img?'<div class="ea-preview-img" style="margin-top:12px"><img src="'+esc(img)+'" alt="Event type image preview"></div>':'')+'<div class="ea-actions"><button class="ea-btn primary" data-ea-save-type>Save Type</button><button class="ea-btn" data-ea-new-type>Clear</button></div></aside>';
  }

  function readTypeForm(){
    return {
      customer_key:CUSTOMER_KEY,
      event_type_id: state.editingTypeId || uid("type"),
      name: val("ea-type-name"),
      event_type_key: val("ea-type-key") || slugify(val("ea-type-name")),
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
    return '<article class="ea-mini-card"><h3>'+esc(l.name)+'</h3><p>'+esc(l.location_label || l.address || "No address posted.")+'</p><div class="ea-pill-row"><span class="ea-pill gray">'+esc(l.slug || l.location_id)+'</span></div><div class="ea-actions"><button class="ea-btn small primary" data-ea-edit-location="'+esc(l.location_id || l.slug || l.name)+'">Edit</button><button class="ea-btn small danger" data-ea-delete-location="'+esc(l.location_id || l.slug || l.name)+'">Deactivate</button></div></article>';
  }

  function currentLocationForm(){
    var id=state.editingLocationId;
    return activeLocations().find(function(l){ return clean(l.location_id)===clean(id) || clean(l.slug)===clean(id) || clean(l.name)===clean(id); }) || {location_id:"", name:"", slug:"", location_label:"", address:"", map_url:"", venue_note:"", active:true, sort_order:999};
  }

  function renderLocationForm(){
    var l=currentLocationForm();
    return '<aside class="ea-side-card"><h3>'+(l.location_id?'Edit Location':'New Location')+'</h3><label class="ea-field"><span>Name</span><input class="ea-input" id="ea-location-name" value="'+esc(l.name)+'"></label><label class="ea-field"><span>Location Label</span><input class="ea-input" id="ea-location-label" value="'+esc(l.location_label)+'"></label><label class="ea-field"><span>Address</span><input class="ea-input" id="ea-location-address" value="'+esc(l.address)+'"></label><div class="ea-actions"><button class="ea-btn" data-ea-create-map-link>Create Map Link</button></div><label class="ea-field"><span>Map URL</span><input class="ea-input" id="ea-location-map" value="'+esc(l.map_url)+'"></label><label class="ea-field"><span>Venue Note</span><textarea class="ea-textarea" id="ea-location-note">'+esc(l.venue_note)+'</textarea></label><div class="ea-actions"><button class="ea-btn primary" data-ea-save-location>Save Location</button><button class="ea-btn" data-ea-new-location>Clear</button></div></aside>';
  }

  function readLocationForm(){
    return { customer_key:CUSTOMER_KEY, location_id: state.editingLocationId || uid("loc"), name: val("ea-location-name"), slug: slugify(val("ea-location-name")), location_label: val("ea-location-label") || val("ea-location-name"), address: val("ea-location-address"), map_url: val("ea-location-map"), venue_note: val("ea-location-note"), active:true, sort_order:999 };
  }

  function renderRsvpTab(){
    var eventRows=(state.data.events||[]).filter(function(e){return e.rsvp_on;});
    return '<section class="ea-panel"><h2>RSVP / Attendance</h2><p>Summary view for RSVP-enabled events. Individual records remain admin-only.</p><div class="ea-card-grid">'+eventRows.map(function(ev){ var rows=(state.data.rsvps||[]).filter(function(r){return clean(r.event_id)===clean(ev.event_id);}); var yes=rows.filter(function(r){return clean(r.rsvp_status).toLowerCase()==="yes" || clean(r.member_attending).toLowerCase()==="yes";}).length; var no=rows.filter(function(r){return clean(r.rsvp_status).toLowerCase()==="no";}).length; var total=rows.reduce(function(n,r){return n+(parseInt(r.total_count||0,10)||0);},0); return '<article class="ea-mini-card"><h3>'+esc(ev.name)+'</h3><p>'+esc(timeRange(ev))+'</p><div class="ea-pill-row"><span class="ea-pill">Rows '+rows.length+'</span><span class="ea-pill good">Yes '+yes+'</span><span class="ea-pill warn">No '+no+'</span><span class="ea-pill">Total '+total+'</span></div><div class="ea-actions"><button class="ea-btn small primary" data-ea-edit="'+esc(ev.event_id)+'">Edit RSVP Settings</button></div></article>'; }).join("")+'</div></section>';
  }

  function renderPayloadsTab(){
    return '<section class="ea-panel"><div class="ea-toolbar"><div><h2>Staged Payloads</h2><p>Actions are staged here unless Edge write mode is enabled.</p></div><div class="ea-toolbar-right"><button class="ea-btn" data-ea-clear-payloads>Clear</button><button class="ea-btn primary" data-ea-export-payloads>Export JSON</button></div></div>'+(state.stagedActions.length?state.stagedActions.map(function(a,i){ return '<div class="ea-mini-card" style="margin-bottom:10px"><h3>'+esc(i+1)+'. '+esc(a.action)+'</h3><pre class="ea-payload">'+esc(JSON.stringify(a,null,2))+'</pre></div>'; }).join(""):'<div class="ea-message">No staged payloads yet.</div>')+'</section>';
  }

  function renderBody(){
    installStyles();
    var body = '<div class="event-admin-page"><div class="ea-shell">'+renderHero()+renderTabs()+'<main class="ea-main"><div class="ea-message">'+esc(state.message)+'</div>';
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
    var t=currentTypeForm();
    setVal("ea-type-access", t.default_access || "Public");
  }

  function applyLocal(action, payload){
    if(action==="create_event") state.data.events.push(normalizeEvent(payload));
    if(action==="update_event") state.data.events = state.data.events.map(function(e){ return clean(e.event_id)===clean(payload.event_id) ? normalizeEvent(Object.assign({},e,payload)) : e; });
    if(action==="create_event_type" || action==="update_event_type") {
      state.data.eventTypes = state.data.eventTypes.filter(function(t){ return clean(t.event_type_id)!==clean(payload.event_type_id) && clean(t.event_type_key)!==clean(payload.event_type_key); });
      state.data.eventTypes.push(payload);
    }
    if(action==="deactivate_event_type") state.data.eventTypes = state.data.eventTypes.map(function(t){ return clean(t.event_type_id)===clean(payload.event_type_id)||clean(t.event_type_key)===clean(payload.event_type_key) ? Object.assign({},t,{active:false}) : t; });
    if(action==="create_location" || action==="update_location") {
      state.data.locations = state.data.locations.filter(function(l){ return clean(l.location_id)!==clean(payload.location_id); });
      state.data.locations.push(payload);
    }
    if(action==="deactivate_location") state.data.locations = state.data.locations.map(function(l){ return clean(l.location_id)===clean(payload.location_id) ? Object.assign({},l,{active:false}) : l; });
    state.data = normalizeData(state.data);
  }

  function sendAction(action, payload){
    var envelope={ action:action, customer_key:CUSTOMER_KEY, payload:payload, sent_at:new Date().toISOString(), source:VERSION };
    if(state.writeMode !== "edge" || !restHeaders()){
      state.stagedActions.push(envelope);
      applyLocal(action, payload);
      state.message = "Payload staged locally: " + action + ". Edge mode is not enabled yet.";
      state.dirty=false;
      rerender();
      return;
    }
    fetch(EDGE_ACTION_URL, {method:"POST", headers:restHeaders(), body:JSON.stringify(envelope)})
      .then(function(r){ if(!r.ok) throw new Error("Edge returned " + r.status); return r.json(); })
      .then(function(){ applyLocal(action,payload); state.message="Edge action completed: "+action; state.dirty=false; rerender(); })
      .catch(function(err){ state.stagedActions.push(envelope); state.message="Edge action failed and was staged locally: "+err.message; rerender(); });
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
    document.addEventListener("input", function(e){ if(e.target && e.target.closest && e.target.closest(".event-admin-page")) state.dirty=true; });
    document.addEventListener("click", function(e){
      var el=e.target;
      var tab=el.closest && el.closest("[data-ea-tab]"); if(tab){ state.tab=tab.getAttribute("data-ea-tab"); rerender(); return; }
      var select=el.closest && el.closest("[data-ea-select-event]"); if(select){ state.selectedEventId=select.getAttribute("data-ea-select-event"); rerender(); return; }
      var edit=el.closest && el.closest("[data-ea-edit]"); if(edit){ var ev=eventById(edit.getAttribute("data-ea-edit")); if(ev) fillFromEvent(ev,false); return; }
      var clone=el.closest && el.closest("[data-ea-clone]"); if(clone){ var ev2=eventById(clone.getAttribute("data-ea-clone")); if(ev2) fillFromEvent(ev2,true); return; }
      if(el.closest && el.closest("[data-ea-new-event]")){ state.formMode="create"; state.editingEventId=""; state.tab="create"; state.dirty=false; rerender(); return; }
      if(el.closest && el.closest("[data-ea-clear-form]")){ if(state.dirty) return showConfirm("Reset event form?","Unsaved event form changes will be lost.",function(){ state.formMode="create"; state.editingEventId=""; state.dirty=false; rerender(); }); state.formMode="create"; state.editingEventId=""; rerender(); return; }
      if(el.closest && el.closest("[data-ea-save-event]")){ var ev=readEventForm(); var errors=validateEvent(ev); if(errors.length){ state.message=errors.join(" "); rerender(); return; } sendAction(state.formMode==="edit"?"update_event":"create_event",ev); return; }
      if(el.closest && el.closest("[data-ea-preview-payload]")){ var pe=readEventForm(); state.stagedActions.push({ action:"preview_event_payload", payload:pe, created_at:new Date().toISOString() }); state.tab="payloads"; rerender(); return; }
      var togCancel=el.closest && el.closest("[data-ea-toggle-cancel]"); if(togCancel){ var ce=eventById(togCancel.getAttribute("data-ea-toggle-cancel")); if(ce) showConfirm(ce.cancelled?"Restore event?":"Cancel event?", ce.name, function(){ sendAction(ce.cancelled?"restore_event":"cancel_event", Object.assign({},ce,{cancelled:!ce.cancelled})); }); return; }
      var togApproval=el.closest && el.closest("[data-ea-toggle-approval]"); if(togApproval){ var ae=eventById(togApproval.getAttribute("data-ea-toggle-approval")); if(ae) showConfirm(ae.approved===false?"Restore to calendar?":"Remove from calendar?", ae.name, function(){ sendAction(ae.approved===false?"restore_to_calendar":"remove_from_calendar", Object.assign({},ae,{approved:!(ae.approved!==false)})); }); return; }
      var rep=el.closest && el.closest("[data-ea-repeat]"); if(rep){ state.repeatSourceId=rep.getAttribute("data-ea-repeat"); byId("ea-repeat-modal").classList.add("visible"); return; }
      if(el.closest && el.closest("[data-ea-repeat-cancel]")){ byId("ea-repeat-modal").classList.remove("visible"); return; }
      if(el.closest && el.closest("[data-ea-repeat-create]")){ createRepeats(); return; }
      if(el.closest && el.closest("[data-ea-new-type]")){ state.editingTypeId=""; state.uploadPreviewUrl=""; rerender(); return; }
      var et=el.closest && el.closest("[data-ea-edit-type]"); if(et){ state.editingTypeId=et.getAttribute("data-ea-edit-type"); state.uploadPreviewUrl=""; rerender(); return; }
      var dt=el.closest && el.closest("[data-ea-delete-type]"); if(dt){ var tt=activeTypes().find(function(t){return clean(t.event_type_id)===clean(dt.getAttribute("data-ea-delete-type"))||clean(t.event_type_key)===clean(dt.getAttribute("data-ea-delete-type"));}); if(tt) showConfirm("Deactivate event type?", tt.name, function(){ sendAction("deactivate_event_type", tt); }); return; }
      if(el.closest && el.closest("[data-ea-save-type]")){ var tf=readTypeForm(); if(!tf.name){ state.message="Event Type Name is required."; rerender(); return; } sendAction(state.editingTypeId?"update_event_type":"create_event_type", tf); return; }
      if(el.closest && el.closest("[data-ea-new-location]")){ state.editingLocationId=""; rerender(); return; }
      var eloc=el.closest && el.closest("[data-ea-edit-location]"); if(eloc){ state.editingLocationId=eloc.getAttribute("data-ea-edit-location"); rerender(); return; }
      var dloc=el.closest && el.closest("[data-ea-delete-location]"); if(dloc){ var ll=locationById(dloc.getAttribute("data-ea-delete-location")); if(ll) showConfirm("Deactivate location?", ll.name, function(){ sendAction("deactivate_location", ll); }); return; }
      if(el.closest && el.closest("[data-ea-create-map-link]")){ var addr=val("ea-location-address"); if(addr) setVal("ea-location-map", "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(addr)); return; }
      if(el.closest && el.closest("[data-ea-save-location]")){ var lf=readLocationForm(); if(!lf.name){ state.message="Location Name is required."; rerender(); return; } sendAction(state.editingLocationId?"update_location":"create_location", lf); return; }
      if(el.closest && el.closest("[data-ea-clear-payloads]")){ state.stagedActions=[]; rerender(); return; }
      if(el.closest && el.closest("[data-ea-export-payloads]")){ exportJson(state.stagedActions, "syncetc-event-admin-staged-payloads.json"); return; }
      if(el.closest && el.closest("[data-ea-confirm-yes]")){ var act=state.pendingAction; hideConfirm(); if(typeof act==="function") act(); return; }
      if(el.closest && el.closest("[data-ea-confirm-no]")){ hideConfirm(); return; }
      if(el.closest && el.closest("[data-ea-from-existing]")){ state.tab="create"; rerender(); return; }
      var dz=el.closest && el.closest("[data-ea-dropzone]"); if(dz){ var fi=byId("ea-type-file"); if(fi) fi.click(); return; }
    });

    document.addEventListener("change", function(e){
      if(e.target && e.target.id==="ea-search"){ state.search=e.target.value; rerender(); }
      if(e.target && e.target.id==="ea-filter"){ state.eventFilter=e.target.value; rerender(); }
      if(e.target && e.target.id==="ea-type-filter"){ state.typeFilter=e.target.value; rerender(); }
      if(e.target && e.target.id==="ea-event-type"){ applyTypeDefaults(e.target.value); }
      if(e.target && e.target.id==="ea-location-preset"){ applyLocationPreset(e.target.value); }
      if(e.target && e.target.id==="ea-prior-template" && e.target.value){ var ev=eventById(e.target.value); if(ev) fillFromEvent(ev,true); }
      if(e.target && e.target.id==="ea-type-file"){ handleFile(e.target.files && e.target.files[0]); }
    });

    document.addEventListener("dragover", function(e){ var dz=e.target.closest && e.target.closest("[data-ea-dropzone]"); if(dz){ e.preventDefault(); dz.classList.add("dragover"); } });
    document.addEventListener("dragleave", function(e){ var dz=e.target.closest && e.target.closest("[data-ea-dropzone]"); if(dz) dz.classList.remove("dragover"); });
    document.addEventListener("drop", function(e){ var dz=e.target.closest && e.target.closest("[data-ea-dropzone]"); if(dz){ e.preventDefault(); dz.classList.remove("dragover"); handleFile(e.dataTransfer.files && e.dataTransfer.files[0]); } });
  }

  function handleFile(file){
    if(!file) return;
    if(!/^image\//i.test(file.type||"")){ state.message="Choose one image file."; rerender(); return; }
    if(file.size > 5*1024*1024){ state.message="Choose an image under 5 MB."; rerender(); return; }
    state.uploadFile=file;
    state.uploadPreviewUrl=URL.createObjectURL(file);
    setVal("ea-type-image", state.uploadPreviewUrl);
    state.message="Image selected locally. Storage upload will run through the Edge/storage workflow when wired.";
    rerender();
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
      return fetchData();
    }).then(function(data){
      state.data=data;
      state.writeMode = window.SYNCETC_EVENT_ADMIN_WRITE_MODE || "staged";
      var mountId = "syncetc-webflow-mount";
      var mount = document.getElementById(mountId);
      if(!mount){ mount=document.createElement("div"); mount.id=mountId; document.body.appendChild(mount); }
      state.shell = window.SyncEtc.Components.SiteShell.create(mountId, { pageKey:"admin", audience:"admin", version:VERSION, showBanner:false });
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
