/* PAGE-INFO-v1.js - BEGIN */
(function () {
  "use strict";

  const COMPONENT_FILES = ["COMPONENT-shared-utils-v1.js", "COMPONENT-customer-style-v1.js", "COMPONENT-base-styles-v1.js", "COMPONENT-master-controls-v1.js", "COMPONENT-master-header-v1.js", "COMPONENT-scroll-banner-v1.js", "COMPONENT-master-footer-v1.js", "COMPONENT-site-shell-v1.js"];
  const CURRENT_SCRIPT_SRC = document.currentScript && document.currentScript.src ? document.currentScript.src : "";

  function componentBaseUrl() {
    if (window.SYNCETC_COMPONENT_BASE_URL) return String(window.SYNCETC_COMPONENT_BASE_URL).replace(/\/?$/, "/");
    if (CURRENT_SCRIPT_SRC) return CURRENT_SCRIPT_SRC.substring(0, CURRENT_SCRIPT_SRC.lastIndexOf("/") + 1);
    return "https://feskesen.github.io/syncetc-webflow-assets/assets/";
  }

  function loadScriptOnce(src) {
    return new Promise(function(resolve, reject) {
      var existing = Array.prototype.slice.call(document.scripts).find(function(s){ return s.src === src; });
      if (existing) return resolve();
      var script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = function(){ resolve(); };
      script.onerror = function(){ reject(new Error("Could not load " + src)); };
      document.head.appendChild(script);
    });
  }

  function ensureComponents() {
    if (window.SyncEtc && window.SyncEtc.Components && window.SyncEtc.Components.SiteShell) return Promise.resolve();
    var base = componentBaseUrl();
    return COMPONENT_FILES.reduce(function(p, file){
      return p.then(function(){ return loadScriptOnce(base + file); });
    }, Promise.resolve());
  }


  const VERSION = "PAGE-INFO-v1";
  const FILE_NAME = "PAGE-INFO-v1.js";
  const MOUNT_ID = "syncetc-webflow-mount";
  const ROOT_ID = "syncetc-v31-root";
  const STYLE_ID = "syncetc-v31-style";

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

  const INFO_PAGE_DEFAULTS = {
    "150th Aero Flying Club": {
      heroEyebrow: "About & FAQs",
      heroTitle: "About 150th Aero Flying Club",
      heroIntro: "The 150th Aero Flying Club is a member-run, not-for-profit flying organization based in northern New Jersey. We are built around safe aircraft operation, shared responsibility, practical training, and a strong community of pilots.",
      sections: [
        { key:"history", label:"Our History", title:"A long-running New Jersey flying club", body:[
          "The 150th Aero Flying Club was founded in 1960 by a group of general aviation pilots affiliated with the 150th Air National Guard. Although originally linked to the Guard, the Club now operates independently as a member-run, not-for-profit flying organization.",
          "The Club was initially based at Hanover Airport in Hanover, New Jersey, and later relocated to Morristown Municipal Airport. The Club now operates from Morristown Municipal Airport and Somerset Airport."
        ]},
        { key:"membership", label:"Membership", title:"Shared aircraft, shared responsibility", body:[
          "Membership in the Club is open to certificated pilots holding at least a private pilot certificate. The Club is intentionally structured around active participation, careful aircraft use, and a cooperative safety culture.",
          "Members are expected to operate within FAA requirements, Club rules, and practical safety expectations. Annual flight reviews, currency, aircraft checkout requirements, and ongoing proficiency are central to how the Club operates."
        ], actions:[{ label:"Apply for Membership", page:"apply" },{ label:"View Club Gallery", page:"gallery", secondary:true }]}
      ],
      officers: [{"title": "President", "name": "Frank Eskesen"}, {"title": "Vice President", "name": "Frank Generoso"}, {"title": "Treasurer", "name": "Bryan Barhydt"}, {"title": "Maintenance Officer", "name": "Flavio Coste"}, {"title": "Assistant Maintenance Officer", "name": "Karl Bearnarth"}, {"title": "Safety Officer", "name": "Jonathan Friedman"}, {"title": "Secretary", "name": "Tomasz Surowiecki"}],
      faqs: [{"q": "What qualifications must I have?", "a": "The Club currently requires candidates to have obtained their PPL, logged at least 100 total flight hours, and at least 10 total hours in a Cessna 172 before being admitted into membership. As we currently only fly Cessna 172s, we prefer, but do not strictly require, candidates with at least 5 hours in a C172 within the last 6 months."}, {"q": "What are the initial costs to join the Club?", "a": "Within thirty (30) days of acceptance into the club, accepted prospective members are required to submit a total of $3,600 to activate their membership. This includes a one-time, non-refundable initiation fee of $700, a one-time non-refundable $500 initial contribution to the Club’s Incident/Damage Fund, and a bond share deposit of $2,400 (refundable upon resignation in good standing)."}, {"q": "What are the monthly dues?", "a": "Members pay low monthly dues of $95. As a 501(c)(7) not-for-profit flying club, our goal is to keep flying costs as fair and predictable as possible for our members."}, {"q": "What is the hourly rate for flight time?", "a": "The current hourly rate for our Cessna 172SP aircraft is $165 per hour. Unlike typical FBOs that charge based on Hobbs time and add fuel surcharges, our rate is calculated using tachometer time. It also includes the cost of fuel and has all the benefits of a 501(c)(7) not-for-profit entity."}, {"q": "Are there additional costs beyond dues and flight time?", "a": "The Club maintains an Incident/Damage Fund. If the Fund falls below a required threshold due to expenditures, Club Rules require Membership to replenish it. While other assessments are rare, the Board reserves the right to levy them as necessary and always strives to keep them minimal."}, {"q": "What other responsibilities do members have?", "a": "Unlike renting from a fixed-base operator (FBO), being part of a member-run flying club means taking a hands-on role in the care and management of our aircraft. Members are expected to contribute to the upkeep and success of the Club — from participating in club meetings, wash & wax events to assisting with administrative or operational needs. This shared responsibility is a point of pride and helps keep flying safe, affordable, and community-driven. The result is a higher level of aircraft availability and reliability, supported directly by the members who use them."}, {"q": "How will I receive billing information?", "a": "Members receive a monthly statement detailing dues, flying time, and payments. Balances are due by the 20th of each month."}, {"q": "What aircraft are currently in the Club's fleet?", "a": "Our fleet consists of well-maintained Cessna 172SP aircraft, chosen for their reliability, performance, and versatility. Each aircraft is carefully maintained to high standards to ensure safety and availability. For detailed specifications and photos, please visit our Aircraft page."}, {"q": "Are your aircraft hangared?", "a": "We base two of our aircraft at KMMU, where hangar space is extremely limited. Those aircraft are parked outdoors on the new \"Based General Aviation Ramp\" (formerly the West Tie-Down). Our remaining aircraft are based at KSMQ and are fully hangared. Several of our planes are equipped with engine heaters. If you call KSMQ the day before your flight, the line crew will plug in the heater overnight so the aircraft can be started safely on cold winter mornings."}, {"q": "Do I have to have my own insurance to fly Club aircraft?", "a": "No. Each Member is covered by the Club’s comprehensive insurance policy, which includes $1,000,000 in liability coverage ($100,000 per passenger seat) and full hull coverage on all aircraft. This insurance is included in the cost of membership. However, Members may choose to purchase additional insurance at their own expense as they see fit."}, {"q": "Can I fly with passengers or bring guests?", "a": "Absolutely! Members are welcome to bring non-commercial passengers or guests on their flights, provided all applicable FAA regulations and Club rules are followed. As pilot-in-command, you are responsible for ensuring the safety and suitability of every flight. Many of our members enjoy introducing friends and family to general aviation this way."}, {"q": "Can I fly at night?", "a": "Yes, night operations are permitted; however, a Club night checkout is required. Moreover the Member must meet Club-specific recency requirements -- in addition to any FAA requirements -- to act as Pilot in Command after dark. These policies are designed to ensure safety and maintain proficiency in night flying conditions."}, {"q": "Can I fly in actual Instrument Meteorological Conditions (IMC)?", "a": "Yes, members are permitted to operate Club aircraft in actual Instrument Meteorological Conditions (IMC), provided they hold a current instrument rating and meet all applicable FAA currency requirements. The Club encourages safe IFR operations and expects members to exercise sound judgment when flying in weather conditions requiring instrument procedures."}, {"q": "Can I land on unpaved surfaces?", "a": "No. Club rules require all landings to be conducted on paved runways, except in the case of an emergency."}, {"q": "Can I use Club aircraft for weekend or vacation trips?", "a": "Yes. The Club’s reservation system offers members generous flexibility for personal trips, including weekends and extended travel up to 14 days. To ensure fair access for all, reservations are subject to specific limits regarding duration, number of entries, and weekend usage. These guidelines allow members to enjoy up to two weeks of continuous access while helping to maintain availability for others. Full reservation policies are detailed in the Club’s Operating Instructions."}, {"q": "How do I schedule aircraft time?", "a": "Scheduling is managed through Flightcircle, a secure web-based system, accessible to all current members. The Club system settings allows up to four future reservations at a time, including one of up to 14 days and two that include weekends. Reservation policies are outlined in the Club’s Operating Instructions (OIs)."}, {"q": "What kind of meetings and social activities does the Club hold?", "a": "The Club holds regular meetings on the third Thursday of each month at 7:30 p.m., except in July and August. The December meeting, held on the second Thursday, includes the annual election of Club Officers. Members also participate in picnics, wash and wax events, fly-ins, and social gatherings throughout the year. Upcoming events can be found in the Calendar at the top of each page."}, {"q": "Can I come to one of your events?", "a": "Yes! We welcome non-members to our monthly meetings, which are held every month except July and August. The meeting dates are all published on our club calendar. No prior permission is required to attend member meeting, but you might consider making your presence known to the Board Members before or during the meeting. Many other events are typically open to non-members as well, such as our Spring and Fall Wash and Wax, BBQs, and other events. For those events we suggest you contact us to let us know you would like to come. We rarely turn down extra hands at a Wash and Wax. Contact the club Vice President at vicepres@150aero.org."}, {"q": "Wow, this sounds amazing! How do I apply?", "a": "To apply, please complete press Apply link, which can be found at the top of every page."}, {"q": "I am ready to apply. How long is the typical waitlist for membership?", "a": "Now you've found the catch. Let’s just say, if we had a dollar for every pilot on our waitlist, we could probably buy another airplane (Ok, it's not that long). But due to high demand and limited membership slots, the wait can be substantial. While we understand this can be frustrating, it’s also a testament to the Club’s strong community, well-maintained aircraft, and unmatched value. The best way to move up the list is simply to get on it. So don’t wait to apply!"}],
      note: "This page is intended as a general overview. Membership requirements, costs, aircraft availability, and operating rules may change and should be confirmed through current Club documents or the Board."
    },
    "Test Customer": {
      heroEyebrow: "Info & FAQs",
      heroTitle: "About Test Customer",
      heroIntro: "This prototype proves the Info page can render from customer-specific records while sharing the same SyncEtc page model.",
      sections: [
        { key:"overview", label:"Overview", title:"Customer-specific information", body:["This section will later render from Supabase records imported from the customer's current website or onboarding questionnaire."]},
        { key:"operations", label:"Operations", title:"Reusable page structure", body:["The same Info page renderer can support a club, school, FBO, rental operator, or other organization."]}
      ],
      officers: [
        { title:"Owner", name:"Sample Owner" },
        { title:"Operations Manager", name:"Sample Manager" }
      ],
      faqs: [
        { q:"Can this page use customer-specific data?", a:"Yes. The page is built to read customer-specific sections, people, and FAQs." },
        { q:"Can assets migrate later?", a:"Yes. Legacy Webflow URLs can be tracked first, then replaced with Supabase Storage URLs later." }
      ],
      note: "Prototype customer data."
    }
  };

  const AIRCRAFT_PAGE_DEFAULTS = {
  "150th Aero Flying Club": {
    "heroEyebrow": "Aircraft Fleet",
    "heroTitle": "Our Aircraft",
    "heroIntro": "The 150th Aero Flying Club maintains a practical fleet of Cessna aircraft for qualified members. Aircraft access depends on membership status, Club checkout requirements, pilot currency, and compliance with FAA and Club rules.",
    "stats": [
      {
        "value": "FOUR",
        "text": "Club aircraft currently available to qualified members."
      },
      {
        "value": "KMMU / KSMQ",
        "text": "Aircraft are based at Morristown Municipal Airport and Somerset Airport."
      },
      {
        "value": "C172",
        "text": "A practical training and travel platform familiar to many general aviation pilots."
      }
    ],
    "introLabel": "Fleet Overview",
    "introTitle": "Well-equipped aircraft for Club flying",
    "introText": "Each aircraft has its own equipment profile and avionics package. The descriptions below are intended as a general overview for members and prospective members. Current availability, rates, squawks, and operating limitations should be confirmed through Club systems and current Club rules.",
    "note": "Aircraft information shown on this page is for general orientation only. Members should confirm current aircraft status, operating limitations, equipment status, squawks, reservations, and checkout requirements through current Club systems before flight.",
    "aircraft": [
      {
        "tailNumber": "N150TH",
        "slug": "n150th",
        "aircraftType": "Cessna 172SP",
        "modelYear": "2003",
        "details": "With the vanity “150TH” tail number, this aircraft is considered the 150th’s flagship aircraft. || 180HP fuel-injected Lycoming engine || SureFly SIM4P electronic ignition || Dual King KX155A NAV/COM radios || KCS-55A compass system with HSI || JPI EDM 730 engine monitor || Marker beacon receiver || KLN-94 IFR-certified GPS || GTX-327 transponder with Mode C || Dual vacuum pumps || KMA-28 4-place intercom || KAP-140 2-axis autopilot with altitude pre-select || KMD-550 multifunction display || 406 MHz ELT || FreeFlight FDL-978 ADS-B IN / OUT || Rosen sun visors || CiES fuel level sending units || TA102 Mid-Continent dual USB power port || HID 85W landing/taxi light || Reiff electric engine preheat system",
        "aircraftPhoto": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/68334b3c5e73bf3f5e38b4d5_0th.jpg",
        "panelPhoto": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/68334b70b33146129bcdb65f_N150TH-scaled.jpg",
        "sortOrder": 1,
        "homeBase": "KMMU - Morristown, NJ",
        "hourlyRate": "155",
        "status": "Active",
        "current": true,
        "adminTitle": "N150TH · 2003 Cessna 172SP"
      },
      {
        "tailNumber": "N123GG",
        "slug": "n123gg",
        "aircraftType": "Cessna 172SP",
        "modelYear": "2004",
        "details": "The Club’s newest aircraft, and currently equipped with the most modern avionics in our fleet. *2023 avionics upgrade.* || 180HP fuel-injected Lycoming engine || Reiff electric engine preheat system || GTN 650Xi WAAS GPS navigation/com || Dual Garmin GI 275s || Flight Stream 210 wireless communicator || Marker beacon receiver || King KX155A NAV/COM || GTX-327 transponder with Mode C || KMA-28 4-place intercom || KAP-140 2-axis autopilot with altitude pre-select || 406 MHz ELT || FreeFlight FDL-978 ADS-B IN / OUT || Rosen sun visors || CiES fuel level sending units || TA102 Mid-Continent dual USB power port || HID 35W landing/taxi light upgrade installed || Whelen wingtip LED strobes || SureFly SIM4P electronic ignition",
        "aircraftPhoto": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/68334ceb8e547d803b8c8229_123gg.jpg",
        "panelPhoto": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/68334cfedf5f1f8dd46c4203_N123GG-GTN-650-scaled.jpg",
        "sortOrder": 2,
        "homeBase": "KSMQ - Somerset, NJ",
        "hourlyRate": "155",
        "status": "Active",
        "current": true,
        "adminTitle": "N123GG · 2004 Cessna 172SP"
      },
      {
        "tailNumber": "N792MD",
        "slug": "n792md",
        "aircraftType": "Cessna 172SP",
        "modelYear": "2004",
        "details": "The only aircraft in our fleet with installed air conditioning, 792MD tends to be popular in the summer months. Though with the accompanying reduction in useful load, this is likely not the plane to take four adults on long trips. || 180HP fuel-injected Lycoming engine || Reiff electric engine preheat system || Dual King KX155A NAV/COM radios || KCS-55A compass system with HSI || Keith air conditioning || Marker beacon receiver || KLN-94 IFR-certified GPS || GTX-327 transponder with Mode C || Dual vacuum pumps || KMA-28 4-place intercom || KAP-140 2-axis autopilot with altitude pre-select || KMD-550 multifunction display || 406 MHz ELT || FreeFlight FDL-978 ADS-B IN / OUT || Rosen sun visors || CiES fuel level sending units || TA102 Mid-Continent dual USB power port || SureFly SIM4P electronic ignition || Whelen Parmetheus Pro LED landing light",
        "aircraftPhoto": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/68334ffd74d1d2ed562c4ebd_792md.jpg",
        "panelPhoto": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/6833501edd31e21371e10d8b_792panel.jpg",
        "sortOrder": 3,
        "homeBase": "KSMQ - Somerset, NJ",
        "hourlyRate": "155",
        "status": "Active",
        "current": true,
        "adminTitle": "N792MD · 2004 Cessna 172SP"
      },
      {
        "tailNumber": "N645PD",
        "slug": "n645pd",
        "aircraftType": "Cessna 172",
        "modelYear": "2000",
        "details": "One of the Club’s workhorses. When maintenance issues keep other planes out of service, 645PD seems to always be there when we need her. || 180HP fuel-injected Lycoming engine || SureFly SIM4P electronic ignition || Dual King KX155A NAV/COM radios || KLN-94 IFR-certified GPS || GTX-327 transponder with Mode C || Dual vacuum pumps || KMA-26 4-place intercom || KAP-140 2-axis autopilot with altitude pre-select || KMD-550 multifunction display || 406 MHz ELT || FreeFlight FDL-978 ADS-B IN / OUT || CiES fuel level sending units || TA102 Mid-Continent dual USB power port || HID 85W landing/taxi light upgrade installed",
        "aircraftPhoto": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/68334dcae4a085dddde0d7cb_645pd.jpg",
        "panelPhoto": "https://cdn.prod.website-files.com/68323e4a92b6ed77ec5c49a5/68334de9e42a265d3db5b904_5PDpanel-ADS-1.jpg",
        "sortOrder": 4,
        "homeBase": "KMMU - Morristown, NJ",
        "hourlyRate": "155",
        "status": "Active",
        "current": true,
        "adminTitle": "N645PD · 2000 Cessna 172"
      }
    ]
  },
  "Test Customer": {
    "heroEyebrow": "Assets",
    "heroTitle": "Equipment / Assets",
    "heroIntro": "A public asset page can list aircraft, vehicles, equipment, rooms, or other customer-managed resources.",
    "stats": [
      {
        "value": "DATA",
        "text": "Rendered from reusable records."
      },
      {
        "value": "MEDIA",
        "text": "Photos can remain legacy URLs until migrated."
      },
      {
        "value": "SAFE",
        "text": "Public display only."
      }
    ],
    "introLabel": "Overview",
    "introTitle": "Reusable asset-page model",
    "introText": "The same page structure can support a non-aviation customer later.",
    "note": "Prototype display only.",
    "aircraft": []
  }
};

  const state = {
    customer: "150th Aero Flying Club",
    page: "info",
    audience: "public",
    controlsSide: "left",
    showControls: true,
    showBanner: true,
    local: {}
  };

  const pages = [
    ["home", "Home"],
    ["info", "Info"],
    ["aircraft", "Aircraft"],
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
      .syncetc-v31 { min-height:100vh; font-family:Arial, Helvetica, sans-serif; color:var(--aero-text); background:linear-gradient(rgba(240,247,252,.78),rgba(240,247,252,.80)), var(--se-customer-bg); background-position:center; background-size:cover; background-attachment:fixed; padding:10px 0 48px; box-sizing:border-box; }
      .syncetc-v31 * { box-sizing:border-box; }
      .se-v31-version { position:fixed; right:12px; top:12px; z-index:999999; padding:8px 11px; border-radius:999px; background:#12365a; color:#fff; font-size:12px; font-weight:900; box-shadow:0 8px 24px rgba(0,0,0,.25); pointer-events:none; }
      .se-v31-topline { max-width:1180px; margin:0 auto 8px; padding:0 18px; display:flex; justify-content:space-between; align-items:center; gap:10px; color:#12365a; font-size:11px; font-weight:900; }
      .se-v31-topline span { background:rgba(255,255,255,.72); border:1px solid var(--aero-border); border-radius:999px; padding:6px 9px; }

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

      .aero-info-page { max-width:1180px; margin:34px auto 56px; padding:0 18px; font-family:Arial, Helvetica, sans-serif; color:var(--aero-text); }
      .aero-info-shell { background:var(--aero-card); border:1px solid var(--aero-border); border-radius:var(--aero-radius-xl); box-shadow:var(--aero-shadow); overflow:hidden; backdrop-filter:blur(8px); }
      .aero-info-hero { position:relative; padding:34px 34px 28px; background:linear-gradient(135deg,rgba(18,54,90,.96),rgba(47,128,196,.88)),radial-gradient(circle at top right,rgba(255,255,255,.34),transparent 36%); color:#fff; }
      .aero-info-eyebrow { display:inline-flex; align-items:center; gap:8px; margin-bottom:12px; padding:6px 12px; border-radius:999px; background:rgba(255,255,255,.16); border:1px solid rgba(255,255,255,.24); font-size:12px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
      .aero-info-hero h1 { margin:0; font-size:clamp(30px,4vw,48px); line-height:1.05; font-weight:800; letter-spacing:-.035em; color:#fff; }
      .aero-info-hero p { max-width:780px; margin:14px 0 0; font-size:17px; line-height:1.65; color:rgba(255,255,255,.9); }
      .aero-info-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-top:26px; }
      .aero-info-stat { padding:14px 16px; border-radius:var(--aero-radius-md); background:rgba(255,255,255,.14); border:1px solid rgba(255,255,255,.22); }
      .aero-info-stat strong { display:block; margin-bottom:3px; font-size:22px; line-height:1; color:#fff; }
      .aero-info-stat span { display:block; font-size:13px; line-height:1.35; color:rgba(255,255,255,.82); }
      .aero-info-main { display:grid; grid-template-columns:minmax(0,1.05fr) minmax(340px,.95fr); gap:22px; padding:26px; }
      .aero-info-column { min-width:0; }
      .aero-section-card { margin-bottom:18px; padding:22px; border-radius:var(--aero-radius-lg); background:var(--aero-card-soft); border:1px solid var(--aero-border); box-shadow:0 8px 24px rgba(12,38,64,.08); }
      .aero-section-card:last-child { margin-bottom:0; }
      .aero-section-card h2 { margin:0 0 10px; color:var(--aero-navy-dark); font-size:23px; line-height:1.18; font-weight:800; letter-spacing:-.02em; }
      .aero-section-card p { margin:0 0 13px; font-size:15px; line-height:1.7; color:var(--aero-text); }
      .aero-officer-grid { display:grid; gap:10px; margin-top:14px; }
      .aero-officer-row { display:grid; grid-template-columns:180px 1fr; gap:12px; align-items:center; padding:11px 13px; border-radius:12px; background:#fff; border:1px solid rgba(18,54,90,.11); }
      .aero-officer-title { color:var(--aero-navy); font-size:13px; line-height:1.25; font-weight:800; }
      .aero-officer-name { color:var(--aero-text); font-size:14px; line-height:1.25; font-weight:700; }
      .aero-info-actions { display:flex; flex-wrap:wrap; gap:10px; margin-top:18px; }
      .aero-faq-panel { position:sticky; top:18px; padding:22px; border-radius:var(--aero-radius-lg); background:linear-gradient(180deg,rgba(234,245,255,.92),rgba(255,255,255,.86)); border:1px solid var(--aero-border); box-shadow:0 8px 24px rgba(12,38,64,.08); }
      .aero-faq-header { margin-bottom:15px; }
      .aero-faq-header h2 { margin:0 0 7px; color:var(--aero-navy-dark); font-size:28px; line-height:1.1; font-weight:800; letter-spacing:-.025em; }
      .aero-faq-header p { margin:0; color:var(--aero-muted); font-size:14px; line-height:1.55; }
      .aero-faq-list { display:grid; gap:10px; }
      .aero-faq-item { border-radius:14px; background:#fff; border:1px solid rgba(18,54,90,.13); overflow:hidden; }
      .aero-faq-question { width:100%; display:grid; grid-template-columns:1fr auto; gap:12px; align-items:center; padding:15px; border:0; background:transparent; color:var(--aero-navy-dark); text-align:left; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.3; font-weight:800; cursor:pointer; }
      .aero-faq-icon { width:26px; height:26px; display:inline-flex; align-items:center; justify-content:center; border-radius:50%; background:var(--aero-sky); color:var(--aero-navy); font-size:18px; font-weight:800; transition:transform 180ms ease, background 180ms ease; }
      .aero-faq-item.is-open .aero-faq-icon { transform:rotate(45deg); background:var(--aero-sky-strong); }
      .aero-faq-answer { max-height:0; overflow:hidden; padding:0 15px; color:var(--aero-text); font-size:14px; line-height:1.65; opacity:.0; transition:max-height 260ms ease, padding 260ms ease, opacity 220ms ease; }
      .aero-faq-item.is-open .aero-faq-answer { max-height:560px; padding:0 15px 16px; opacity:1; }
      .aero-faq-answer p { margin:0 0 10px; }
      /* Update 102C aircraft public page styles - BEGIN */

      .aero-fleet-page { max-width:1180px; margin:34px auto 56px; padding:0 18px; font-family:Arial, Helvetica, sans-serif; color:var(--aero-text); }
      .aero-fleet-shell { background:var(--aero-card); border:1px solid var(--aero-border); border-radius:var(--aero-radius-xl); box-shadow:var(--aero-shadow); overflow:hidden; backdrop-filter:blur(8px); }
      .aero-fleet-hero { position:relative; padding:34px 34px 28px; background:linear-gradient(135deg,rgba(18,54,90,.96),rgba(47,128,196,.88)),radial-gradient(circle at top right,rgba(255,255,255,.34),transparent 36%); color:#fff; }
      .aero-fleet-eyebrow { display:inline-flex; align-items:center; gap:8px; margin-bottom:12px; padding:6px 12px; border-radius:999px; background:rgba(255,255,255,.16); border:1px solid rgba(255,255,255,.24); font-size:12px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
      .aero-fleet-hero h1 { margin:0; font-size:clamp(30px,4vw,48px); line-height:1.05; font-weight:800; letter-spacing:-.035em; color:#fff; }
      .aero-fleet-hero p { max-width:820px; margin:14px 0 0; font-size:17px; line-height:1.65; color:rgba(255,255,255,.9); }
      .aero-fleet-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-top:26px; }
      .aero-fleet-stat { padding:14px 16px; border-radius:var(--aero-radius-md); background:rgba(255,255,255,.14); border:1px solid rgba(255,255,255,.22); }
      .aero-fleet-stat strong { display:block; margin-bottom:3px; font-size:22px; line-height:1; color:#fff; }
      .aero-fleet-stat span { display:block; font-size:13px; line-height:1.35; color:rgba(255,255,255,.82); }
      .aero-fleet-main { padding:26px; }
      .aero-fleet-intro-card { margin-bottom:18px; padding:22px; border-radius:var(--aero-radius-lg); background:rgba(255,255,255,.82); border:1px solid var(--aero-border); box-shadow:0 8px 24px rgba(12,38,64,.08); }
      .aero-fleet-intro-card h2, .aero-aircraft-copy h2 { margin:0 0 10px; color:var(--aero-navy-dark); font-size:23px; line-height:1.18; font-weight:800; letter-spacing:-.02em; }
      .aero-fleet-intro-card p { margin:0; font-size:15px; line-height:1.7; color:var(--aero-text); }
      .aero-aircraft-list { display:grid; gap:22px; }
      .aero-aircraft-card { display:grid; grid-template-columns:minmax(0,1.08fr) minmax(300px,.92fr); gap:22px; align-items:start; padding:22px; border-radius:var(--aero-radius-lg); background:var(--aero-card-soft); border:1px solid var(--aero-border); box-shadow:0 8px 24px rgba(12,38,64,.08); }
      .aero-aircraft-header { display:flex; flex-wrap:wrap; align-items:baseline; gap:8px 12px; margin-bottom:8px; }
      .aero-tail-number { margin:0; color:var(--aero-navy-dark); font-size:28px; line-height:1.05; font-weight:800; letter-spacing:-.025em; }
      .aero-aircraft-meta { color:var(--aero-muted); font-size:14px; line-height:1.2; font-weight:800; letter-spacing:.03em; text-transform:uppercase; }
      .aero-aircraft-copy { min-width:0; }
      .aero-aircraft-copy p { margin:0 0 13px; font-size:15px; line-height:1.7; color:var(--aero-text); }
      .aero-aircraft-copy ul { margin:12px 0 0 20px; padding:0; color:var(--aero-text); font-size:14px; line-height:1.55; }
      .aero-aircraft-copy li { margin-bottom:4px; }
      .aero-aircraft-copy em { color:var(--aero-navy-dark); }
      .aero-aircraft-media { display:grid; gap:14px; }
      .aero-aircraft-photo-card { overflow:hidden; border-radius:16px; background:#fff; border:1px solid rgba(18,54,90,.16); box-shadow:0 8px 20px rgba(12,38,64,.08); }
      .aero-aircraft-photo-card img { display:block; width:100%; height:230px; object-fit:cover; object-position:center center; }
      .aero-aircraft-photo-label { padding:9px 12px; color:var(--aero-muted); font-size:12px; line-height:1.25; font-weight:800; letter-spacing:.08em; text-transform:uppercase; background:rgba(234,245,255,.72); border-top:1px solid rgba(18,54,90,.10); }
      .aero-aircraft-placeholder { display:flex; align-items:center; justify-content:center; min-height:230px; padding:22px; background:linear-gradient(135deg,rgba(234,245,255,.96),rgba(255,255,255,.88)); color:var(--aero-muted); font-size:13px; line-height:1.45; font-weight:800; text-align:center; }
      .aero-empty-message { padding:18px; border-radius:16px; background:#fff; border:1px dashed rgba(18,54,90,.24); color:var(--aero-muted); font-size:14px; line-height:1.55; }
      .aero-fleet-page .aero-note-strip { margin-top:18px; }
      @media (max-width:980px){ .aero-aircraft-card{grid-template-columns:1fr;} .aero-aircraft-media{grid-template-columns:repeat(2,minmax(0,1fr));} }
      @media (max-width:720px){ .aero-fleet-page{margin-top:20px;padding:0 12px;} .aero-fleet-hero{padding:26px 20px 22px;} .aero-fleet-main{padding:18px;} .aero-fleet-stats{grid-template-columns:1fr;} .aero-fleet-intro-card,.aero-aircraft-card{padding:18px;} .aero-aircraft-media{grid-template-columns:1fr;} .aero-aircraft-photo-card img,.aero-aircraft-placeholder{height:210px;min-height:210px;} .aero-tail-number{font-size:25px;} }

      /* Update 102C aircraft public page styles - END */

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
        ${link("home","Home")}${link("info","Info")}${link("aircraft","Aircraft")}${link("events","Calendar")}${link("gallery","Gallery")}${navLink("Scheduler")}${navLink("Apply")}${navLink("Contact")}
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


  function infoConfig(base) {
    return INFO_PAGE_DEFAULTS[state.customer] || INFO_PAGE_DEFAULTS["150th Aero Flying Club"];
  }

  function renderInfoPage(base) {
    const info = infoConfig(base);
    const stats = [
      [base.statOne, base.statOneText],
      [base.statTwo, base.statTwoText],
      [base.statThree, base.statThreeText]
    ];
    const sections = Array.isArray(info.sections) ? info.sections : [];
    const officers = Array.isArray(info.officers) ? info.officers : [];
    const faqs = Array.isArray(info.faqs) ? info.faqs : [];
    const sectionHtml = sections.map(function (section) {
      const body = Array.isArray(section.body) ? section.body : [section.body || ""];
      const actionHtml = Array.isArray(section.actions) && section.actions.length
        ? '<div class="aero-info-actions">' + section.actions.map(function (a) {
            const secondary = a.secondary ? ' secondary' : '';
            const pageAttr = a.page ? ' data-se-page-link="' + esc(a.page) + '"' : '';
            return '<a class="aero-button' + secondary + '" href="#"' + pageAttr + '>' + esc(a.label || 'Open') + '</a>';
          }).join('') + '</div>'
        : '';
      return '<section class="aero-section-card"><div class="aero-section-label">' + esc(section.label || section.key || 'Section') + '</div><h2>' + esc(section.title || '') + '</h2>' + body.filter(Boolean).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + actionHtml + '</section>';
    }).join('');
    const officerHtml = officers.length
      ? officers.map(function (o) { return '<div class="aero-officer-row"><div class="aero-officer-title">' + esc(o.title) + '</div><div class="aero-officer-name">' + esc(o.name) + '</div></div>'; }).join('')
      : '<div class="aero-empty-message">Current officer information is not available at this time.</div>';
    const faqHtml = faqs.length
      ? faqs.map(function (f, i) { return '<div class="aero-faq-item ' + (i === 3 ? 'is-open' : '') + '"><button class="aero-faq-question" type="button"><span>' + esc(f.q) + '</span><span class="aero-faq-icon">+</span></button><div class="aero-faq-answer"><p>' + esc(f.a || 'Additional information is not available at this time.') + '</p></div></div>'; }).join('')
      : '<div class="aero-empty-message">Frequently asked questions are not available at this time.</div>';

    return '<div class="aero-info-page"><div class="aero-info-shell">' +
      '<section class="aero-info-hero"><div class="aero-info-eyebrow">' + esc(info.heroEyebrow) + '</div><h1>' + esc(info.heroTitle) + '</h1><p>' + esc(info.heroIntro) + '</p><div class="aero-info-stats">' +
        stats.map(function (s) { return '<div class="aero-info-stat"><strong>' + esc(s[0]) + '</strong><span>' + esc(s[1]) + '</span></div>'; }).join('') +
      '</div></section>' +
      '<main class="aero-info-main"><div class="aero-info-column">' + sectionHtml +
        '<section class="aero-section-card"><div class="aero-section-label">Board & Officers</div><h2>Current club officers</h2><p>The Club is governed by a volunteer Board of Directors, made up of elected Club officers. The Board helps manage Club operations, aircraft, membership, safety, finances, and long-term planning.</p><div class="aero-officer-grid">' + officerHtml + '</div><div class="aero-info-actions"><a class="aero-button" href="#" data-se-page-link="contact">Contact the Board</a></div></section>' +
      '</div><aside class="aero-info-column"><section class="aero-faq-panel"><div class="aero-faq-header"><div class="aero-section-label">FAQs</div><h2>Frequently Asked Questions</h2><p>Common questions about membership, costs, aircraft use, training expectations, and the application process.</p></div><div class="aero-faq-list">' + faqHtml + '</div></section></aside></main>' +
      '<div class="aero-note-strip"><strong>Note:</strong> ' + esc(info.note || '') + '</div>' +
    '</div></div>';
  }


  function renderAircraftPage(base) {
    const cfg = AIRCRAFT_PAGE_DEFAULTS[state.customer] || AIRCRAFT_PAGE_DEFAULTS["150th Aero Flying Club"];
    const stats = cfg.stats || [];
    const rows = (cfg.aircraft || []).slice().sort(function(a,b){ return (a.sortOrder || 999) - (b.sortOrder || 999); });
    function statMarkup(s){ return '<div class="aero-fleet-stat"><strong>' + esc(s.value || '') + '</strong><span>' + esc(s.text || '') + '</span></div>'; }
    function labelFor(ac){ return (String(ac.tailNumber || '').toUpperCase() === 'N150TH') ? 'Flagship Aircraft' : 'Club Aircraft'; }
    function metaFor(ac){ return [ac.modelYear, ac.aircraftType].filter(Boolean).join(' '); }
    function inlineText(v){ return esc(v).replace(/\*([^*]+)\*/g, '<em>$1</em>'); }
    function detailsMarkup(ac){
      const parts = String(ac.details || '').split('||').map(function(x){ return x.trim(); }).filter(Boolean);
      if (!parts.length) return '<p>Aircraft details are not available at this time.</p>';
      const intro = parts.shift();
      return (intro ? '<p>' + inlineText(intro) + '</p>' : '') + (parts.length ? '<ul>' + parts.map(function(x){ return '<li>' + inlineText(x) + '</li>'; }).join('') + '</ul>' : '');
    }
    function photoCard(url, label, alt){
      return '<div class="aero-aircraft-photo-card">' + (url ? '<img src="' + esc(url) + '" alt="' + esc(alt || label) + '">' : '<div class="aero-aircraft-placeholder">' + esc(label) + ' photo not available</div>') + '<div class="aero-aircraft-photo-label">' + esc(label) + '</div></div>';
    }
    function aircraftCard(ac){
      return '<article class="aero-aircraft-card"><div class="aero-aircraft-copy"><div class="aero-section-label">' + esc(labelFor(ac)) + '</div><div class="aero-aircraft-header"><h2 class="aero-tail-number">' + esc(ac.tailNumber || 'Aircraft') + '</h2><div class="aero-aircraft-meta">' + esc(metaFor(ac) || 'Aircraft Details') + '</div></div>' + detailsMarkup(ac) + '</div><div class="aero-aircraft-media">' + photoCard(ac.aircraftPhoto, 'Exterior', (ac.tailNumber || 'Aircraft') + ' exterior aircraft photo') + photoCard(ac.panelPhoto, 'Panel', (ac.tailNumber || 'Aircraft') + ' panel photo') + '</div></article>';
    }
    return '<div class="aero-fleet-page"><div class="aero-fleet-shell"><section class="aero-fleet-hero"><div class="aero-fleet-eyebrow">' + esc(cfg.heroEyebrow) + '</div><h1>' + esc(cfg.heroTitle) + '</h1><p>' + esc(cfg.heroIntro) + '</p><div class="aero-fleet-stats">' + stats.map(statMarkup).join('') + '</div></section><main class="aero-fleet-main"><section class="aero-fleet-intro-card"><div class="aero-section-label">' + esc(cfg.introLabel) + '</div><h2>' + esc(cfg.introTitle) + '</h2><p>' + esc(cfg.introText) + '</p></section><section class="aero-aircraft-list">' + (rows.length ? rows.map(aircraftCard).join('') : '<div class="aero-empty-message">Aircraft information is not available at this time.</div>') + '</section><div class="aero-note-strip"><strong>Note:</strong> ' + esc(cfg.note) + '</div></main></div></div>';
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
    return ({ info:"About, FAQ, public officer list, and membership overview rendered from customer-specific Supabase-style records.", aircraft:"Aircraft fleet page rendered from customer-specific aircraft records and legacy media URLs while Supabase asset migration is staged.", events:"Events, calendar, RSVP, and meeting workflows rendered with the same 150th Aero style system.", documents:"Documents, minutes, rules, resources, and future editable source-document workflows.", gallery:"Public gallery, featured media, member upload, and admin review concepts.", roster:"Member directory and people pages with scoped visibility.", member:"Member portal landing page after login.", admin:"Customer admin dashboard concept for managing people, content, documents, events, and settings." })[key] || "";
  }

  function renderFooter(base) {
    return `<section class="aero-footer-wrapper"><footer class="aero-footer-shell"><div class="aero-footer-top"><div class="aero-footer-brand-card"><div class="aero-footer-brand-row"><div class="aero-footer-logo-wrap">${logoMarkup(base, "footer")}</div><div><h2 class="aero-footer-title">${esc(base.shortName === "150th Aero" ? "150th Aero Flying Club, Inc." : base.shortName)}</h2><div class="aero-footer-founded">${esc(base.founded)}</div></div></div><p class="aero-footer-text">Member-owned flying club based at Morristown Municipal Airport, providing aircraft access, aviation community, and practical member resources.</p><div style="margin-top:18px"><div class="aero-footer-kicker">Find us on socials</div><div class="aero-footer-social-grid"><a class="aero-footer-social-link" href="${esc(base.social.youtube || '#')}">YouTube</a><a class="aero-footer-social-link" href="${esc(base.social.instagram || '#')}">Instagram</a><a class="aero-footer-social-link" href="${esc(base.social.facebook || '#')}">Facebook</a></div></div></div><div class="aero-footer-links-card"><div class="aero-footer-kicker">Site Links</div><div class="aero-footer-link-grid"><a class="aero-footer-link" href="#" data-se-page-link="home">Home</a><a class="aero-footer-link" href="#" data-se-page-link="info">Info</a><a class="aero-footer-link" href="#">Aircraft</a><a class="aero-footer-link" href="#" data-se-page-link="events">Calendar</a><a class="aero-footer-link" href="#" data-se-page-link="gallery">Gallery</a><a class="aero-footer-link" href="#">Apply</a><a class="aero-footer-link" href="#">Contact</a></div><div style="margin-top:16px"><div class="aero-footer-kicker">Member Links</div><div class="aero-footer-link-grid"><a class="aero-footer-link" data-se-page-link="member" href="#">Dashboard</a><a class="aero-footer-link" data-se-page-link="roster" href="#">Roster</a><a class="aero-footer-link" href="#">Forum</a><a class="aero-footer-link" data-se-page-link="documents" href="#">Resources</a></div></div></div></div><div class="aero-footer-bottom"><p class="aero-footer-disclaimer">Website materials are provided for club communication and member convenience. Aircraft operation is governed by FAA regulations, club rules, aircraft documents, and applicable operating procedures.</p><div class="aero-footer-copyright">© 2025-2026 150th Aero Flying Club, Inc. All rights reserved.</div></div></footer></section>`;
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


  function renderComponentPageBody(base) {
    if (state.page !== "info") {
      return '<div class="site-page-wrap"><section class="page-placeholder"><section class="aero-home-hero"><div class="aero-home-eyebrow">Component baseline</div><h1>' + esc(currentPageLabel()) + '</h1><p>This page file is ' + esc(FILE_NAME) + '. Load the matching PAGE file to render the selected page body with the shared component shell.</p></section></section></div>';
    }
    if ("info" === "home") return renderHome(base);
    if ("info" === "info") return renderInfoPage(base);
    if ("info" === "aircraft") return renderAircraftPage(base);
    return renderPageModules(base);
  }

  function updateBodyOnly() {
    const body = document.querySelector('[data-se-page-body]');
    if (body) body.innerHTML = renderComponentPageBody(currentBase());
    const bannerText = document.querySelector('.aero-marquee-text');
    if (bannerText) bannerText.textContent = currentBase().announcement || '';
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
    mount.innerHTML = `<div id="${ROOT_ID}" class="syncetc-v31" style="--se-customer-bg:url('${cssUrl(base.backgroundUrl)}')"><div class="se-v31-version">${esc(VERSION)} loaded</div><div class="se-v31-topline"><span>SyncEtc versioned renderer · ${esc(FILE_NAME)}</span><span>${esc(state.customer)} · ${esc(currentPageLabel())}</span></div>${renderWorkbench(base)}${renderHeader(base)}${state.page === 'home' ? renderMarquee(base) : ""}${state.page === 'home' ? renderHome(base) : (state.page === 'info' ? renderInfoPage(base) : (state.page === 'aircraft' ? renderAircraftPage(base) : renderPageModules(base)))}${renderFooter(base)}</div>`;
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
      const faqButton = e.target.closest && e.target.closest(".aero-faq-question");
      if (faqButton) { const item = faqButton.closest(".aero-faq-item"); const list = faqButton.closest(".aero-faq-list"); const wasOpen = item && item.classList.contains("is-open"); if (list) list.querySelectorAll(".aero-faq-item").forEach(function(x){x.classList.remove("is-open");}); if (item && !wasOpen) item.classList.add("is-open"); return; }
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
    a.download = "syncetc-v30-display-settings-" + Date.now() + ".json";
    document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(url); a.remove(); }, 500);
  }

  
  function boot() {
    state.page = "info";
    installStyles();
    ensureComponents().then(function(){
      const mountId = MOUNT_ID;
      let mount = document.getElementById(mountId);
      if (!mount) {
        mount = document.createElement("div");
        mount.id = mountId;
        document.body.appendChild(mount);
      }
      const shell = window.SyncEtc.Components.SiteShell.create(mountId, {
        customerName: state.customer,
        pageKey: state.page,
        audience: state.audience,
        controlsSide: state.controlsSide,
        showControls: state.showControls,
        showBanner: state.showBanner,
        local: state.local,
        version: VERSION
      });

      function renderAll() {
        shell.updateState({
          customerName: state.customer,
          pageKey: state.page,
          audience: state.audience,
          controlsSide: state.controlsSide,
          showControls: state.showControls,
          showBanner: state.showBanner,
          local: state.local,
          version: VERSION
        });
        shell.render(renderComponentPageBody(currentBase()));
      }

      document.addEventListener("syncetc:shell-structural-change", function(e){
        const s = e.detail && e.detail.state ? e.detail.state : {};
        state.customer = s.customerName || state.customer;
        state.page = s.pageKey || state.page;
        state.audience = s.audience || state.audience;
        state.controlsSide = s.controlsSide || state.controlsSide;
        state.showBanner = s.showBanner !== false;
        state.local = s.local || state.local || {};
        renderAll();
      });

      document.addEventListener("syncetc:shell-local-change", function(e){
        const s = e.detail && e.detail.state ? e.detail.state : {};
        state.local = s.local || state.local || {};
        updateBodyOnly();
      });

      renderAll();
      console.log("SYNCETC COMPONENT PAGE LOADED", VERSION, FILE_NAME);
    }).catch(function(err){
      console.error(err);
      document.body.insertAdjacentHTML('afterbegin', '<div style="max-width:900px;margin:30px auto;padding:20px;border:1px solid #c44;border-radius:14px;background:#fff;color:#722;font-family:Arial">Could not load SyncEtc components: '+esc(err.message)+'</div>');
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
/* PAGE-INFO-v1.js - END */
