/* PAGE-INFO-v2.js | SyncEtc Info/About page using Supabase-first inherited style model | Generated: 2026-06-01 */
(function () {
  "use strict";

  const COMPONENT_FILES = [
    "COMPONENT-shared-utils-v1.js",
    "COMPONENT-customer-style-v1.js",
    "COMPONENT-base-styles-v1.js",
    "COMPONENT-auth-context-v1.js",
    "COMPONENT-auth-modal-v1.js",
    "COMPONENT-security-context-v1.js",
    "COMPONENT-auth-soft-bridge-v1.js",
    "COMPONENT-master-controls-v1.js",
    "COMPONENT-customer-settings-v1.js",
    "COMPONENT-master-header-v1.js",
    "COMPONENT-scroll-banner-v1.js",
    "COMPONENT-master-footer-v1.js",
    "COMPONENT-site-shell-v1.js",
    "COMPONENT-customer-switcher-v1.js",
    "COMPONENT-access-guard-v1.js"
  ];

  const CURRENT_SCRIPT_SRC = document.currentScript && document.currentScript.src ? document.currentScript.src : "";
  const VERSION = "PAGE-INFO-v2";
  const FILE_NAME = "PAGE-INFO-v2.js";
  const MOUNT_ID = "syncetc-webflow-mount";
  const ROOT_ID = "syncetc-info-v2-root";
  const STYLE_ID = "syncetc-info-v2-style";
  const PAGE_KEY = "info";
  const PAGE_ACCESS_SCOPE = "public";
  const SUPABASE_STYLE_MISSING_TEXT = "SUPABASE STYLE VARIABLES MISSING";

  function componentBaseUrl() {
    if (window.SYNCETC_COMPONENT_BASE_URL) return String(window.SYNCETC_COMPONENT_BASE_URL).replace(/\/?$/, "/");
    if (CURRENT_SCRIPT_SRC) return CURRENT_SCRIPT_SRC.substring(0, CURRENT_SCRIPT_SRC.lastIndexOf("/") + 1);
    return "https://feskesen.github.io/syncetc-webflow-assets/";
  }

  function loadScriptOnce(src) {
    return new Promise(function(resolve, reject) {
      var existing = Array.prototype.slice.call(document.scripts).find(function(s) { return s.src === src; });
      if (existing) return resolve();
      var script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = function() { resolve(); };
      script.onerror = function() { reject(new Error("Could not load " + src)); };
      document.head.appendChild(script);
    });
  }

  function ensureComponents() {
    if (window.SyncEtc && window.SyncEtc.Components && window.SyncEtc.Components.SiteShell) return Promise.resolve();
    var base = componentBaseUrl();
    return COMPONENT_FILES.reduce(function(p, file) {
      return p.then(function() { return loadScriptOnce(base + file + "?v=info-v2-supabase-style-inheritance"); });
    }, Promise.resolve());
  }

  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>\"']/g, function(m) {
      return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m];
    });
  }

  function clean(v) { return String(v == null ? "" : v).trim(); }
  function arr(v) { return Array.isArray(v) ? v : []; }

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

  const INFO_PAGE_FIELD_DEFS = [
    { key:"info.heroEyebrow", label:"Hero eyebrow", type:"text" },
    { key:"info.heroTitle", label:"Hero title", type:"text" },
    { key:"info.heroIntro", label:"Hero intro", type:"textarea" },
    { key:"info.sections.0.label", label:"Section 1 label", type:"text" },
    { key:"info.sections.0.title", label:"Section 1 title", type:"text" },
    { key:"info.sections.0.body.0", label:"Section 1 body paragraph 1", type:"textarea" },
    { key:"info.sections.0.body.1", label:"Section 1 body paragraph 2", type:"textarea" },
    { key:"info.sections.1.label", label:"Section 2 label", type:"text" },
    { key:"info.sections.1.title", label:"Section 2 title", type:"text" },
    { key:"info.sections.1.body.0", label:"Section 2 body paragraph 1", type:"textarea" },
    { key:"info.sections.1.body.1", label:"Section 2 body paragraph 2", type:"textarea" },
    { key:"info.boardLabel", label:"Board/officers label", type:"text" },
    { key:"info.boardTitle", label:"Board/officers title", type:"text" },
    { key:"info.boardIntro", label:"Board/officers intro", type:"textarea" },
    { key:"info.faqLabel", label:"FAQ label", type:"text" },
    { key:"info.faqTitle", label:"FAQ title", type:"text" },
    { key:"info.faqIntro", label:"FAQ intro", type:"textarea" },
    { key:"info.note", label:"Bottom note", type:"textarea" }
  ];

  function deepClone(v) {
    return JSON.parse(JSON.stringify(v || {}));
  }

  function getByPath(obj, path) {
    return String(path || "").split(".").reduce(function(cur, part) {
      if (cur == null) return undefined;
      return /^\d+$/.test(part) ? cur[Number(part)] : cur[part];
    }, obj);
  }

  function setByPath(obj, path, value) {
    var parts = String(path || "").split(".");
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i];
      var key = /^\d+$/.test(part) ? Number(part) : part;
      var last = i === parts.length - 1;
      var next = parts[i + 1];
      if (last) {
        cur[key] = value;
      } else {
        if (cur[key] == null) cur[key] = /^\d+$/.test(next) ? [] : {};
        cur = cur[key];
      }
    }
  }

  function getCustomerName() {
    return clean(window.SYNCETC_CUSTOMER_NAME || window.SYNCETC_CUSTOMER_KEY || window.SYNCETC_ACTIVE_CUSTOMER_NAME || "150th Aero Flying Club");
  }

  function defaultInfoConfig() {
    var customer = getCustomerName();
    return deepClone(INFO_PAGE_DEFAULTS[customer] || INFO_PAGE_DEFAULTS["150th Aero Flying Club"]);
  }

  function normalizePageSettings(raw) {
    var base = defaultInfoConfig();
    var settings = raw && typeof raw === "object" ? raw : {};
    var src = settings.info && typeof settings.info === "object" ? settings.info : settings;

    INFO_PAGE_FIELD_DEFS.forEach(function(field) {
      var direct = getByPath(settings, field.key);
      var relative = field.key.indexOf("info.") === 0 ? getByPath(src, field.key.slice(5)) : undefined;
      var flat = settings[field.key] != null ? settings[field.key] : settings[field.key.replace(/^info\./, "")];
      var value = direct != null ? direct : (relative != null ? relative : flat);
      if (value != null && value !== "") {
        var wrapper = { info: base };
        setByPath(wrapper, field.key, value);
        base = wrapper.info;
      }
    });

    base.boardLabel = base.boardLabel || "Board & Officers";
    base.boardTitle = base.boardTitle || "Current club officers";
    base.boardIntro = base.boardIntro || "The Club is governed by a volunteer Board of Directors, made up of elected Club officers. The Board helps manage Club operations, aircraft, membership, safety, finances, and long-term planning.";
    base.faqLabel = base.faqLabel || "FAQs";
    base.faqTitle = base.faqTitle || "Frequently Asked Questions";
    base.faqIntro = base.faqIntro || "Common questions about membership, costs, aircraft use, training expectations, and the application process.";
    return base;
  }

  const state = {
    customerName: getCustomerName(),
    info: defaultInfoConfig(),
    styleDiagnostic: null
  };

  function computeStyleDiagnostic() {
    var styles = getComputedStyle(document.documentElement);
    var required = ["--aero-navy","--aero-blue","--aero-card","--aero-border","--aero-text","--aero-muted","--aero-shadow","--aero-radius-xl"];
    var missing = required.filter(function(name) { return !clean(styles.getPropertyValue(name)); });
    state.styleDiagnostic = { ok: missing.length === 0, missing: missing };
    return state.styleDiagnostic;
  }

  function diagnosticHtml() {
    var d = state.styleDiagnostic || computeStyleDiagnostic();
    if (d.ok || !window.SYNCETC_SHOW_STYLE_DIAGNOSTIC) return "";
    return '<div class="syncetc-info-style-warning">'+
      '<strong>'+SUPABASE_STYLE_MISSING_TEXT+'</strong>'+
      '<span>Build/test diagnostic: this page is using emergency fallback CSS because inherited customer style variables were not detected.</span>'+
      '<code>'+esc(d.missing.join(", "))+'</code>'+
    '</div>';
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      :root {
        --aero-navy:#12365a;
        --aero-navy-dark:#0b2744;
        --aero-blue:#2f80c4;
        --aero-sky:#eaf5ff;
        --aero-card:rgba(255,255,255,.94);
        --aero-card-soft:rgba(255,255,255,.84);
        --aero-border:rgba(18,54,90,.16);
        --aero-text:#1e2933;
        --aero-muted:#5d6b78;
        --aero-shadow:0 18px 50px rgba(12,38,64,.22);
        --aero-radius-xl:26px;
        --aero-radius-lg:18px;
        --aero-radius-md:12px;
      }
      #${ROOT_ID} { font-family:Arial, Helvetica, sans-serif; color:var(--aero-text); }
      #${ROOT_ID} * { box-sizing:border-box; }
      #${ROOT_ID} .syncetc-info-style-warning { max-width:1180px; margin:18px auto; border:3px solid #991b1b; border-radius:18px; background:repeating-linear-gradient(45deg,#fee2e2 0,#fee2e2 12px,#fff 12px,#fff 24px); color:#7f1d1d; padding:16px 18px; box-shadow:0 14px 34px rgba(127,29,29,.18); font-weight:950; }
      #${ROOT_ID} .syncetc-info-style-warning strong { display:block; font-size:17px; letter-spacing:.06em; text-transform:uppercase; margin-bottom:6px; }
      #${ROOT_ID} .syncetc-info-style-warning span { display:block; font-size:12px; line-height:1.45; margin-bottom:8px; }
      #${ROOT_ID} .syncetc-info-style-warning code { display:block; white-space:normal; word-break:break-word; border:1px solid rgba(127,29,29,.25); border-radius:10px; background:rgba(255,255,255,.8); padding:8px; font-size:12px; }
      #${ROOT_ID} .syncetc-info-page { max-width:1180px; margin:34px auto 56px; padding:0 18px; }
      #${ROOT_ID} .syncetc-info-shell { background:var(--aero-card); border:1px solid var(--aero-border); border-radius:var(--aero-radius-xl); box-shadow:var(--aero-shadow); overflow:hidden; backdrop-filter:blur(8px); }
      #${ROOT_ID} .syncetc-info-hero { position:relative; padding:34px 34px 28px; background:linear-gradient(135deg,rgba(18,54,90,.96),rgba(47,128,196,.88)),radial-gradient(circle at top right,rgba(255,255,255,.34),transparent 36%); color:#fff; }
      #${ROOT_ID} .syncetc-info-eyebrow, #${ROOT_ID} .syncetc-section-label { display:inline-flex; align-items:center; gap:8px; margin-bottom:12px; padding:6px 12px; border-radius:999px; background:rgba(255,255,255,.16); border:1px solid rgba(255,255,255,.24); font-size:12px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
      #${ROOT_ID} .syncetc-section-label { margin-bottom:10px; padding:5px 10px; background:var(--aero-sky); color:var(--aero-navy); border:0; font-size:11px; }
      #${ROOT_ID} .syncetc-info-hero h1 { margin:0; font-size:clamp(30px,4vw,48px); line-height:1.05; font-weight:800; letter-spacing:-.035em; color:#fff; }
      #${ROOT_ID} .syncetc-info-hero p { max-width:780px; margin:14px 0 0; font-size:17px; line-height:1.65; color:rgba(255,255,255,.9); }
      #${ROOT_ID} .syncetc-info-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-top:26px; }
      #${ROOT_ID} .syncetc-info-stat { padding:14px 16px; border-radius:var(--aero-radius-md); background:rgba(255,255,255,.14); border:1px solid rgba(255,255,255,.22); }
      #${ROOT_ID} .syncetc-info-stat strong { display:block; margin-bottom:3px; font-size:22px; line-height:1; color:#fff; }
      #${ROOT_ID} .syncetc-info-stat span { display:block; font-size:13px; line-height:1.35; color:rgba(255,255,255,.82); }
      #${ROOT_ID} .syncetc-info-main { display:grid; grid-template-columns:minmax(0,1.05fr) minmax(340px,.95fr); gap:22px; padding:26px; }
      #${ROOT_ID} .syncetc-section-card, #${ROOT_ID} .syncetc-faq-panel { border-radius:var(--aero-radius-lg); background:var(--aero-card-soft); border:1px solid var(--aero-border); box-shadow:0 8px 24px rgba(12,38,64,.08); }
      #${ROOT_ID} .syncetc-section-card { margin-bottom:18px; padding:22px; }
      #${ROOT_ID} .syncetc-section-card:last-child { margin-bottom:0; }
      #${ROOT_ID} .syncetc-section-card h2, #${ROOT_ID} .syncetc-faq-panel h2 { margin:0 0 10px; color:var(--aero-navy-dark); font-size:23px; line-height:1.18; font-weight:800; letter-spacing:-.02em; }
      #${ROOT_ID} .syncetc-faq-panel h2 { font-size:28px; line-height:1.1; }
      #${ROOT_ID} .syncetc-section-card p, #${ROOT_ID} .syncetc-faq-panel p { margin:0 0 13px; font-size:15px; line-height:1.7; color:var(--aero-text); }
      #${ROOT_ID} .syncetc-actions { display:flex; flex-wrap:wrap; gap:10px; margin-top:18px; }
      #${ROOT_ID} .syncetc-button { display:inline-flex; align-items:center; justify-content:center; min-height:42px; padding:10px 16px; border-radius:999px; background:var(--aero-navy); color:#fff !important; border:1px solid rgba(255,255,255,.14); box-shadow:0 8px 18px rgba(18,54,90,.18); text-decoration:none; font-size:13px; font-weight:800; }
      #${ROOT_ID} .syncetc-button.secondary { background:#fff; color:var(--aero-navy)!important; border:1px solid rgba(18,54,90,.22); box-shadow:none; }
      #${ROOT_ID} .syncetc-officer-grid { display:grid; gap:10px; margin-top:14px; }
      #${ROOT_ID} .syncetc-officer-row { display:grid; grid-template-columns:180px 1fr; gap:12px; align-items:center; padding:11px 13px; border-radius:12px; background:#fff; border:1px solid rgba(18,54,90,.11); }
      #${ROOT_ID} .syncetc-officer-title { color:var(--aero-navy); font-size:13px; line-height:1.25; font-weight:800; }
      #${ROOT_ID} .syncetc-officer-name { color:var(--aero-text); font-size:14px; line-height:1.25; font-weight:700; }
      #${ROOT_ID} .syncetc-faq-panel { position:sticky; top:18px; padding:22px; background:linear-gradient(180deg,rgba(234,245,255,.92),rgba(255,255,255,.86)); }
      #${ROOT_ID} .syncetc-faq-header { margin-bottom:15px; }
      #${ROOT_ID} .syncetc-faq-list { display:grid; gap:10px; }
      #${ROOT_ID} .syncetc-faq-item { border-radius:14px; background:#fff; border:1px solid rgba(18,54,90,.13); overflow:hidden; }
      #${ROOT_ID} .syncetc-faq-question { width:100%; display:grid; grid-template-columns:1fr auto; gap:12px; align-items:center; padding:15px; border:0; background:transparent; color:var(--aero-navy-dark); text-align:left; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.3; font-weight:800; cursor:pointer; }
      #${ROOT_ID} .syncetc-faq-icon { width:26px; height:26px; display:inline-flex; align-items:center; justify-content:center; border-radius:50%; background:var(--aero-sky); color:var(--aero-navy); font-size:18px; font-weight:800; transition:transform 180ms ease; }
      #${ROOT_ID} .syncetc-faq-item.is-open .syncetc-faq-icon { transform:rotate(45deg); }
      #${ROOT_ID} .syncetc-faq-answer { max-height:0; overflow:hidden; padding:0 15px; color:var(--aero-text); font-size:14px; line-height:1.65; opacity:0; transition:max-height 260ms ease, padding 260ms ease, opacity 220ms ease; }
      #${ROOT_ID} .syncetc-faq-item.is-open .syncetc-faq-answer { max-height:620px; padding:0 15px 16px; opacity:1; }
      #${ROOT_ID} .syncetc-note-strip { margin:0 26px 26px; padding:16px 18px; border-radius:16px; background:rgba(18,54,90,.06); border:1px solid rgba(18,54,90,.12); color:var(--aero-muted); font-size:13px; line-height:1.55; }
      #${ROOT_ID} .syncetc-empty-message { padding:18px; border-radius:16px; background:#fff; border:1px dashed rgba(18,54,90,.24); color:var(--aero-muted); font-size:14px; line-height:1.55; }
      #${ROOT_ID} .syncetc-version-badge { position:fixed; right:12px; bottom:12px; z-index:99999; border-radius:999px; background:var(--aero-navy); color:#fff; font-size:11px; font-weight:900; padding:7px 10px; box-shadow:0 8px 22px rgba(0,0,0,.2); pointer-events:none; }
      @media (max-width:980px) { #${ROOT_ID} .syncetc-info-main { grid-template-columns:1fr; } #${ROOT_ID} .syncetc-faq-panel { position:relative; top:auto; } }
      @media (max-width:720px) { #${ROOT_ID} .syncetc-info-page { margin-top:20px; padding:0 12px; } #${ROOT_ID} .syncetc-info-hero { padding:26px 20px 22px; } #${ROOT_ID} .syncetc-info-main { padding:18px; } #${ROOT_ID} .syncetc-info-stats { grid-template-columns:1fr; } #${ROOT_ID} .syncetc-section-card, #${ROOT_ID} .syncetc-faq-panel { padding:18px; } #${ROOT_ID} .syncetc-officer-row { grid-template-columns:1fr; gap:4px; } }
    `;
    document.head.appendChild(style);
  }

  function actionLink(action) {
    var label = action && action.label ? action.label : "Open";
    var page = action && action.page ? action.page : "";
    var secondary = action && action.secondary ? " secondary" : "";
    var attr = page ? ' data-se-page-link="'+esc(page)+'"' : "";
    return '<a class="syncetc-button'+secondary+'" href="#"'+attr+'>'+esc(label)+'</a>';
  }

  function renderSections(info) {
    return arr(info.sections).map(function(section) {
      var body = arr(section.body).length ? arr(section.body) : [section.body || ""];
      var actions = arr(section.actions);
      return '<section class="syncetc-section-card">'+
        '<div class="syncetc-section-label">'+esc(section.label || section.key || "Section")+'</div>'+
        '<h2>'+esc(section.title || "")+'</h2>'+
        body.filter(Boolean).map(function(p) { return '<p>'+esc(p)+'</p>'; }).join("")+
        (actions.length ? '<div class="syncetc-actions">'+actions.map(actionLink).join("")+'</div>' : "")+
      '</section>';
    }).join("");
  }

  function renderOfficers(info) {
    var officers = arr(info.officers);
    if (!officers.length) return '<div class="syncetc-empty-message">Current officer information is not available at this time.</div>';
    return officers.map(function(o) {
      return '<div class="syncetc-officer-row">'+
        '<div class="syncetc-officer-title">'+esc(o.title || "")+'</div>'+
        '<div class="syncetc-officer-name">'+esc(o.name || "")+'</div>'+
      '</div>';
    }).join("");
  }

  function renderFaqs(info) {
    var faqs = arr(info.faqs);
    if (!faqs.length) return '<div class="syncetc-empty-message">Frequently asked questions are not available at this time.</div>';
    return faqs.map(function(f, i) {
      return '<div class="syncetc-faq-item '+(i === 0 ? "is-open" : "")+'">'+
        '<button class="syncetc-faq-question" type="button"><span>'+esc(f.q || "")+'</span><span class="syncetc-faq-icon">+</span></button>'+
        '<div class="syncetc-faq-answer"><p>'+esc(f.a || "Additional information is not available at this time.")+'</p></div>'+
      '</div>';
    }).join("");
  }

  function statRows() {
    return getCustomerName() === "Test Customer"
      ? [["INFO","Reusable content page."],["FAQ","Customer-specific questions."],["SAFE","Public access metadata."]]
      : [["1960","Founded by aviation-minded members of the 150th Air National Guard."],["KMMU / KSMQ","Operating from Morristown Municipal Airport and Somerset Airport."],["FOUR","Club aircraft currently available to qualified members."]];
  }

  function renderInfoBody() {
    var info = state.info || defaultInfoConfig();
    var stats = statRows();
    return '<div id="'+ROOT_ID+'" class="syncetc-info-v2" data-page-key="'+PAGE_KEY+'" data-page-access-scope="'+PAGE_ACCESS_SCOPE+'">'+
      diagnosticHtml()+
      '<div class="syncetc-version-badge">'+VERSION+'</div>'+
      '<div class="syncetc-info-page"><div class="syncetc-info-shell">'+
        '<section class="syncetc-info-hero">'+
          '<div class="syncetc-info-eyebrow">'+esc(info.heroEyebrow || "Info")+'</div>'+
          '<h1>'+esc(info.heroTitle || "Information")+'</h1>'+
          '<p>'+esc(info.heroIntro || "")+'</p>'+
          '<div class="syncetc-info-stats">'+stats.map(function(s) { return '<div class="syncetc-info-stat"><strong>'+esc(s[0])+'</strong><span>'+esc(s[1])+'</span></div>'; }).join("")+'</div>'+
        '</section>'+
        '<main class="syncetc-info-main">'+
          '<div class="syncetc-info-column">'+
            renderSections(info)+
            '<section class="syncetc-section-card">'+
              '<div class="syncetc-section-label">'+esc(info.boardLabel || "Board & Officers")+'</div>'+
              '<h2>'+esc(info.boardTitle || "Current officers")+'</h2>'+
              '<p>'+esc(info.boardIntro || "")+'</p>'+
              '<div class="syncetc-officer-grid">'+renderOfficers(info)+'</div>'+
              '<div class="syncetc-actions"><a class="syncetc-button" href="#" data-se-page-link="contact">Contact</a></div>'+
            '</section>'+
          '</div>'+
          '<aside class="syncetc-info-column">'+
            '<section class="syncetc-faq-panel">'+
              '<div class="syncetc-faq-header">'+
                '<div class="syncetc-section-label">'+esc(info.faqLabel || "FAQs")+'</div>'+
                '<h2>'+esc(info.faqTitle || "Frequently Asked Questions")+'</h2>'+
                '<p>'+esc(info.faqIntro || "")+'</p>'+
              '</div>'+
              '<div class="syncetc-faq-list">'+renderFaqs(info)+'</div>'+
            '</section>'+
          '</aside>'+
        '</main>'+
        '<div class="syncetc-note-strip"><strong>Note:</strong> '+esc(info.note || "")+'</div>'+
      '</div></div>'+
    '</div>';
  }

  function bindFaqs(scope) {
    (scope || document).querySelectorAll(".syncetc-faq-question").forEach(function(button) {
      button.addEventListener("click", function() {
        var item = button.closest(".syncetc-faq-item");
        var list = button.closest(".syncetc-faq-list");
        var wasOpen = item && item.classList.contains("is-open");
        if (list) list.querySelectorAll(".syncetc-faq-item").forEach(function(x) { x.classList.remove("is-open"); });
        if (item && !wasOpen) item.classList.add("is-open");
      });
    });
  }

  function renderStandalone() {
    installStyles();
    computeStyleDiagnostic();
    var mount = document.getElementById(MOUNT_ID);
    if (!mount) {
      mount = document.createElement("div");
      mount.id = MOUNT_ID;
      document.body.appendChild(mount);
    }
    mount.innerHTML = renderInfoBody();
    bindFaqs(mount);
  }

  function renderWithShell() {
    installStyles();
    computeStyleDiagnostic();
    var mount = document.getElementById(MOUNT_ID);
    if (!mount) {
      mount = document.createElement("div");
      mount.id = MOUNT_ID;
      document.body.appendChild(mount);
    }
    if (!(window.SyncEtc && window.SyncEtc.Components && window.SyncEtc.Components.SiteShell)) {
      renderStandalone();
      return;
    }
    var shell = window.SyncEtc.Components.SiteShell.create(MOUNT_ID, {
      customerName: state.customerName,
      pageKey: PAGE_KEY,
      audience: PAGE_ACCESS_SCOPE,
      showControls: false,
      showBanner: true,
      version: VERSION
    });
    shell.render(renderInfoBody());
    bindFaqs(mount);
  }

  function boot() {
    ensureComponents().then(function() {
      if (window.SyncEtc && window.SyncEtc.AuthModal && window.SyncEtc.AuthModal.init) window.SyncEtc.AuthModal.init();
      if (window.SyncEtc && window.SyncEtc.AuthSoftBridge && window.SyncEtc.AuthSoftBridge.start) window.SyncEtc.AuthSoftBridge.start();

      var suppliedSettings =
        window.SYNCETC_PAGE_SETTINGS && (window.SYNCETC_PAGE_SETTINGS.info || window.SYNCETC_PAGE_SETTINGS[PAGE_KEY] || window.SYNCETC_PAGE_SETTINGS);
      state.info = normalizePageSettings(suppliedSettings || null);
      renderWithShell();
      console.log("SYNCETC PAGE LOADED", VERSION, FILE_NAME);
    }).catch(function(err) {
      console.error(err);
      renderStandalone();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
/* PAGE-INFO-v2.js - END */
