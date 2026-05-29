/* PAGE-GALLERY-v1.js - BEGIN */
(function () {
  "use strict";

  var VERSION = "PAGE-GALLERY-v1";
  var CUSTOMER_KEY = "150th_aero";
  var SUPABASE_URL = "https://ocdaohkiwonjmirqkjww.supabase.co";

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

  var state = {
    shell: null,
    loading: true,
    error: "",
    items: [],
    filter: "all",
    search: "",
    sort: "newest",
    page: 1,
    pageSize: 16,
    modalOpen: false,
    modalIndex: 0,
    activeList: [],
    touchStartX: 0,
    touchStartY: 0
  };

  function componentBaseUrl() {
    if (window.SYNCETC_COMPONENT_BASE_URL) return String(window.SYNCETC_COMPONENT_BASE_URL).replace(/\/?$/, "/");
    if (CURRENT_SCRIPT_SRC) return CURRENT_SCRIPT_SRC.substring(0, CURRENT_SCRIPT_SRC.lastIndexOf("/") + 1);
    return "https://feskesen.github.io/syncetc-webflow-assets/";
  }

  function loadScriptOnce(src) {
    return new Promise(function (resolve, reject) {
      var existing = Array.prototype.slice.call(document.scripts).find(function (s) { return s.src === src; });
      if (existing) return resolve();
      var script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = function () { resolve(); };
      script.onerror = function () { reject(new Error("Could not load " + src)); };
      document.head.appendChild(script);
    });
  }

  function ensureComponents() {
    if (window.SyncEtc && window.SyncEtc.Components && window.SyncEtc.Components.SiteShell) return Promise.resolve();
    var base = componentBaseUrl();
    return COMPONENT_FILES.reduce(function (p, file) {
      return p.then(function () { return loadScriptOnce(base + file); });
    }, Promise.resolve());
  }

  function U() {
    if (window.SyncEtc && window.SyncEtc.Components && window.SyncEtc.Components.Utils) return window.SyncEtc.Components.Utils;
    return {
      esc: function (v) {
        return String(v == null ? "" : v)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
      },
      installStyle: function (id, css) {
        var existing = document.getElementById(id);
        if (existing) existing.remove();
        var style = document.createElement("style");
        style.id = id;
        style.textContent = css;
        document.head.appendChild(style);
      }
    };
  }

  function esc(v) { return U().esc(v); }
  function clean(v) { return (v == null ? "" : String(v)).trim(); }
  function byId(id) { return document.getElementById(id); }

  function restHeaders() {
    var anon = window.SYNCETC_SUPABASE_ANON_KEY || window.SUPABASE_ANON_KEY || "";
    if (!anon) return null;
    return { apikey: anon, Authorization: "Bearer " + anon, "Content-Type": "application/json" };
  }

  function parseDate(v) {
    var d = new Date(clean(v));
    return isNaN(d.getTime()) ? null : d;
  }

  function formatDate(v) {
    var d = parseDate(v);
    if (!d) return "";
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  }

  function normalizeMediaType(v) {
    return clean(v).toLowerCase().indexOf("video") !== -1 ? "video" : "photo";
  }

  function extractYoutubeId(raw) {
    var cleaned = clean(raw);
    if (!cleaned) return "";

    cleaned = cleaned
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"')
      .replace(/&#x27;/gi, "'")
      .replace(/&#39;/gi, "'")
      .replace(/&#x2F;/gi, "/")
      .replace(/&#47;/gi, "/");

    var srcMatch = cleaned.match(/src=["']([^"']+)["']/i);
    if (srcMatch && srcMatch[1]) cleaned = srcMatch[1];

    try {
      var parsed = new URL(cleaned, window.location.origin);
      var host = parsed.hostname.replace(/^www\./i, "").toLowerCase();
      var pathParts = parsed.pathname.split("/").filter(Boolean);

      if (host === "youtu.be") return pathParts[0] || "";

      if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
        if (parsed.searchParams.get("v")) return parsed.searchParams.get("v");

        var embedIndex = pathParts.indexOf("embed");
        if (embedIndex !== -1 && pathParts[embedIndex + 1]) return pathParts[embedIndex + 1];

        var shortsIndex = pathParts.indexOf("shorts");
        if (shortsIndex !== -1 && pathParts[shortsIndex + 1]) return pathParts[shortsIndex + 1];

        var liveIndex = pathParts.indexOf("live");
        if (liveIndex !== -1 && pathParts[liveIndex + 1]) return pathParts[liveIndex + 1];
      }
    } catch (e) {}

    var patterns = [
      /youtube\.com\/embed\/([^?&"'<>/\s]+)/i,
      /youtube\.com\/watch\?[^"'<>]*v=([^?&"'<>/\s]+)/i,
      /youtube\.com\/shorts\/([^?&"'<>/\s]+)/i,
      /youtube\.com\/live\/([^?&"'<>/\s]+)/i,
      /youtu\.be\/([^?&"'<>/\s]+)/i
    ];

    for (var i = 0; i < patterns.length; i++) {
      var match = cleaned.match(patterns[i]);
      if (match && match[1]) return match[1];
    }

    if (/^[a-zA-Z0-9_-]{8,20}$/.test(cleaned)) return cleaned;
    return "";
  }

  function youtubeMeta(raw) {
    var id = extractYoutubeId(raw);
    if (!id) return { id: "", embedUrl: clean(raw), watchUrl: clean(raw), thumbUrl: "" };
    return {
      id: id,
      embedUrl: "https://www.youtube.com/embed/" + encodeURIComponent(id),
      watchUrl: "https://www.youtube.com/watch?v=" + encodeURIComponent(id),
      thumbUrl: "https://img.youtube.com/vi/" + encodeURIComponent(id) + "/hqdefault.jpg"
    };
  }

  function normalizeItem(row, index) {
    row = row || {};
    var mediaType = normalizeMediaType(row.media_type);
    var yt = mediaType === "video" ? youtubeMeta(row.video_embed_url || row.video_url) : { id: "", embedUrl: "", watchUrl: "", thumbUrl: "" };
    var assetUrl = clean(row.display_asset_url || row.current_asset_url || row.legacy_photo_url || row.webflow_image_file || "");
    return {
      index: index,
      id: clean(row.gallery_item_id || row.id || "gallery-" + index),
      name: clean(row.name || row.caption || "Gallery Item"),
      caption: clean(row.caption || row.name || ""),
      slug: clean(row.slug || ""),
      mediaType: mediaType,
      assetUrl: mediaType === "video" && !assetUrl ? yt.thumbUrl : assetUrl,
      imageUrl: assetUrl,
      videoUrl: yt.embedUrl || clean(row.video_embed_url || row.video_url || ""),
      videoWatchUrl: yt.watchUrl || clean(row.video_url || ""),
      youtubeId: yt.id,
      videoThumbUrl: yt.thumbUrl,
      credit: clean(row.display_credit || row.attribution_display_name || row.submitted_by_display || "Unattributed"),
      attribution: clean(row.attribution_display_name || ""),
      submittedBy: clean(row.submitted_by_display || [row.submitted_by_first, row.submitted_by_last].filter(Boolean).join(" ")),
      dateSubmitted: clean(row.date_submitted || ""),
      category: clean(row.category || ""),
      featured: row.featured === true || row.featured === "true",
      sortOrder: row.sort_order == null ? 999999 : parseInt(row.sort_order, 10) || 999999,
      orientation: clean(row.media_orientation || "")
    };
  }

  function fetchGalleryItems() {
    var h = restHeaders();
    if (!h) {
      return Promise.reject(new Error("Missing Supabase anon key. Define window.SYNCETC_SUPABASE_ANON_KEY before loading this page."));
    }

    var params = [
      "customer_key=eq." + encodeURIComponent(CUSTOMER_KEY),
      "select=*",
      "order=sort_order.asc.nullslast,date_submitted.desc.nullslast"
    ].join("&");

    return fetch(SUPABASE_URL + "/rest/v1/syncetc_gallery_public_view?" + params, {
      headers: h
    }).then(function (r) {
      if (!r.ok) throw new Error("Supabase gallery read failed: " + r.status);
      return r.json();
    }).then(function (rows) {
      return (rows || []).map(normalizeItem);
    });
  }

  function installStyles() {
    U().installStyle("PAGE-GALLERY-v1-style", `
      .se-gallery-page { max-width:1180px; margin:34px auto 56px; padding:0 18px; font-family:Arial,Helvetica,sans-serif; color:var(--se-aero-text,#1e2933); }
      .se-gallery-shell { background:var(--se-aero-card,rgba(255,255,255,.94)); border:1px solid var(--se-aero-border,rgba(18,54,90,.16)); border-radius:var(--se-aero-radius-xl,26px); box-shadow:var(--se-aero-shadow,0 18px 50px rgba(12,38,64,.22)); overflow:hidden; backdrop-filter:blur(8px); }
      .se-gallery-hero { padding:34px 34px 28px; background:linear-gradient(135deg,var(--se-aero-navy,#12365a),var(--se-aero-blue,#2f80c4)),radial-gradient(circle at top right,rgba(255,255,255,.34),transparent 36%); color:#fff; }
      .se-gallery-eyebrow { display:inline-flex; align-items:center; margin-bottom:12px; padding:6px 12px; border-radius:999px; background:rgba(255,255,255,.16); border:1px solid rgba(255,255,255,.24); font-size:12px; font-weight:900; letter-spacing:.08em; text-transform:uppercase; }
      .se-gallery-hero h1 { margin:0; color:#fff; font-size:clamp(30px,4vw,48px); line-height:1.05; font-weight:900; letter-spacing:-.035em; }
      .se-gallery-hero p { max-width:850px; margin:14px 0 0; color:rgba(255,255,255,.9); font-size:16px; line-height:1.65; }
      .se-gallery-stats { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; margin-top:24px; }
      .se-gallery-stat { padding:13px 15px; border-radius:14px; background:rgba(255,255,255,.14); border:1px solid rgba(255,255,255,.22); }
      .se-gallery-stat strong { display:block; color:#fff; font-size:22px; line-height:1; margin-bottom:4px; }
      .se-gallery-stat span { color:rgba(255,255,255,.82); font-size:12px; line-height:1.35; font-weight:800; }
      .se-gallery-main { padding:22px 28px 30px; background:linear-gradient(180deg,rgba(234,245,255,.50),rgba(255,255,255,.82)); }
      .se-gallery-toolbar { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px; margin-bottom:18px; padding:14px; border-radius:20px; background:rgba(255,255,255,.88); border:1px solid var(--se-aero-border,rgba(18,54,90,.16)); box-shadow:0 8px 20px rgba(12,38,64,.08); }
      .se-gallery-filters, .se-gallery-tools { display:flex; flex-wrap:wrap; align-items:center; gap:8px; }
      .se-gallery-btn { display:inline-flex; min-height:38px; align-items:center; justify-content:center; padding:8px 13px; border-radius:999px; border:1px solid rgba(18,54,90,.22); background:#fff; color:var(--se-aero-navy,#12365a); font-size:12px; font-weight:900; cursor:pointer; text-decoration:none; line-height:1.1; }
      .se-gallery-btn:hover { background:var(--se-aero-sky,#eaf5ff); transform:translateY(-1px); }
      .se-gallery-btn.active { background:var(--se-aero-navy,#12365a); color:#fff; border-color:var(--se-aero-navy,#12365a); }
      .se-gallery-input, .se-gallery-select { min-height:38px; border:1px solid rgba(18,54,90,.22); border-radius:999px; padding:8px 13px; background:#fff; color:var(--se-aero-text,#1e2933); font:inherit; font-size:13px; outline:none; }
      .se-gallery-input { width:min(320px,100%); }
      .se-gallery-meta-line { margin:0 0 16px; color:var(--se-aero-muted,#5d6b78); font-size:13px; line-height:1.45; font-weight:800; }
      .se-gallery-grid { display:grid; gap:18px; grid-template-columns:repeat(var(--se-gallery-cols,4),minmax(0,1fr)); }
      .se-gallery-card { position:relative; overflow:hidden; min-width:0; border-radius:18px; background:#fff; border:1px solid rgba(18,54,90,.16); box-shadow:0 8px 20px rgba(12,38,64,.08); cursor:pointer; transition:transform 180ms ease, box-shadow 180ms ease, filter 180ms ease; }
      .se-gallery-card:hover { transform:translateY(-3px); box-shadow:0 14px 30px rgba(12,38,64,.18); filter:brightness(1.03); }
      .se-gallery-thumb-wrap { position:relative; display:flex; align-items:center; justify-content:center; height:var(--se-gallery-thumb-height,220px); padding:10px; background:linear-gradient(180deg,rgba(234,245,255,.92),rgba(255,255,255,.86)); }
      .se-gallery-thumb { width:100%; height:100%; object-fit:contain; display:block; }
      .se-gallery-play { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; pointer-events:none; }
      .se-gallery-play-circle { width:58px; height:58px; border-radius:50%; background:rgba(18,54,90,.82); display:flex; align-items:center; justify-content:center; box-shadow:0 8px 24px rgba(0,0,0,.28); border:1px solid rgba(255,255,255,.24); }
      .se-gallery-play-triangle { margin-left:4px; width:0; height:0; border-top:10px solid transparent; border-bottom:10px solid transparent; border-left:16px solid #fff; }
      .se-gallery-card-info { padding:11px 12px 13px; border-top:1px solid rgba(18,54,90,.08); }
      .se-gallery-card-title { margin:0 0 5px; color:var(--se-aero-navy-dark,#0b2744); font-size:13px; line-height:1.3; font-weight:900; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; min-height:2.6em; }
      .se-gallery-card-credit { color:var(--se-aero-muted,#5d6b78); font-size:11.5px; line-height:1.35; font-weight:700; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
      .se-gallery-pill-row { display:flex; gap:6px; flex-wrap:wrap; margin-top:8px; }
      .se-gallery-pill { display:inline-flex; align-items:center; min-height:22px; padding:4px 8px; border-radius:999px; background:var(--se-aero-sky,#eaf5ff); color:var(--se-aero-navy,#12365a); font-size:10px; line-height:1; font-weight:900; letter-spacing:.06em; text-transform:uppercase; }
      .se-gallery-empty, .se-gallery-error { padding:28px; text-align:center; border-radius:20px; background:#fff; border:1px solid rgba(18,54,90,.16); color:var(--se-aero-muted,#5d6b78); font-weight:800; }
      .se-gallery-pagination { display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:10px; margin-top:20px; padding:14px; border-radius:18px; background:rgba(255,255,255,.88); border:1px solid var(--se-aero-border,rgba(18,54,90,.16)); }
      .se-gallery-pagination span { color:#53759b; font-size:13px; font-weight:900; }
      .se-gallery-btn[disabled] { opacity:.45; pointer-events:none; }
      .se-gallery-modal-backdrop { position:fixed; inset:0; z-index:2147483000; display:none; align-items:center; justify-content:center; padding:26px; background:rgba(5,15,30,.84); overflow:auto; overscroll-behavior:contain; }
      .se-gallery-modal-backdrop.open { display:flex; }
      .se-gallery-modal { position:relative; width:min(1160px,calc(100vw - 52px)); max-width:1160px; background:rgba(255,255,255,.96); border-radius:24px; border:1px solid rgba(255,255,255,.58); box-shadow:0 20px 70px rgba(0,0,0,.42); overflow:visible; }
      .se-gallery-modal-media { position:relative; min-height:280px; padding:22px 72px; border-radius:24px 24px 0 0; background:linear-gradient(135deg,rgba(11,39,68,.98),rgba(18,54,90,.96)); display:flex; align-items:center; justify-content:center; }
      .se-gallery-modal-img { display:block; max-width:100%; max-height:calc(100dvh - 230px); width:auto; height:auto; object-fit:contain; border-radius:12px; box-shadow:0 12px 32px rgba(0,0,0,.30); }
      .se-gallery-modal-video { display:block; width:100%; height:min(58vw,calc(100dvh - 230px)); min-height:360px; border:0; border-radius:12px; background:#000; box-shadow:0 12px 32px rgba(0,0,0,.30); }
      .se-gallery-modal-footer { padding:16px 20px 18px; background:linear-gradient(180deg,rgba(234,245,255,.96),rgba(255,255,255,.94)); border-top:1px solid var(--se-aero-border,rgba(18,54,90,.16)); border-radius:0 0 24px 24px; }
      .se-gallery-modal-title { margin:0 0 6px; color:var(--se-aero-navy-dark,#0b2744); font-size:18px; line-height:1.3; font-weight:900; }
      .se-gallery-modal-credit, .se-gallery-modal-meta { margin-top:5px; color:var(--se-aero-muted,#5d6b78); font-size:13px; line-height:1.45; }
      .se-gallery-modal-meta { font-size:12px; }
      .se-gallery-modal-close, .se-gallery-modal-arrow { position:absolute; border:none; border-radius:50%; background:rgba(18,54,90,.92); color:#fff; cursor:pointer; z-index:5; box-shadow:0 8px 20px rgba(0,0,0,.34); }
      .se-gallery-modal-close { top:-18px; right:-18px; width:42px; height:42px; font-size:26px; line-height:1; }
      .se-gallery-modal-arrow { top:50%; transform:translateY(-50%); width:44px; height:44px; font-size:21px; }
      .se-gallery-modal-arrow.left { left:16px; }
      .se-gallery-modal-arrow.right { right:16px; }
      .se-gallery-modal-counter { position:absolute; left:18px; top:16px; z-index:4; color:#fff; background:rgba(0,0,0,.30); border:1px solid rgba(255,255,255,.24); border-radius:999px; padding:5px 10px; font-size:12px; font-weight:900; }
      .se-gallery-filmstrip { display:flex; gap:8px; overflow:auto; padding:10px 20px 0; background:rgba(234,245,255,.96); border-top:1px solid rgba(18,54,90,.10); }
      .se-gallery-film-thumb { flex:0 0 auto; width:62px; height:46px; border-radius:9px; border:2px solid transparent; background:#fff; object-fit:cover; cursor:pointer; opacity:.72; }
      .se-gallery-film-thumb.active { border-color:var(--se-aero-blue,#2f80c4); opacity:1; }
      @media(max-width:991px){ .se-gallery-stats{grid-template-columns:repeat(2,1fr);} .se-gallery-main{padding:20px;} .se-gallery-modal-media{padding-left:58px;padding-right:58px;} }
      @media(max-width:767px){ .se-gallery-page{margin-top:20px;padding:0 12px;} .se-gallery-hero{padding:26px 20px 22px;} .se-gallery-stats{grid-template-columns:1fr;} .se-gallery-main{padding:16px;} .se-gallery-toolbar{align-items:stretch;} .se-gallery-filters,.se-gallery-tools{width:100%;} .se-gallery-btn,.se-gallery-select,.se-gallery-input{flex:1 1 auto;} .se-gallery-grid{gap:14px;} .se-gallery-modal-backdrop{align-items:flex-start;padding:18px 12px 28px;} .se-gallery-modal{width:100%; margin-top:10px; border-radius:18px;} .se-gallery-modal-media{min-height:220px;padding:16px 44px;border-radius:18px 18px 0 0;} .se-gallery-modal-video{height:54vw;min-height:240px;border-radius:10px;} .se-gallery-modal-img{max-height:none;border-radius:10px;} .se-gallery-modal-arrow{width:36px;height:36px;font-size:17px;} .se-gallery-modal-arrow.left{left:8px;} .se-gallery-modal-arrow.right{right:8px;} .se-gallery-modal-close{top:-12px;right:-8px;width:36px;height:36px;font-size:22px;} .se-gallery-filmstrip{display:none;} }
    `);
  }

  function calculatePageSize() {
    var width = window.innerWidth || 1180;
    var height = window.innerHeight || 800;
    var cols = 4;
    if (width >= 1180) cols = 5;
    else if (width >= 900) cols = 4;
    else if (width >= 640) cols = 3;
    else if (width >= 430) cols = 2;
    else cols = 1;

    var visibleRows = 4;
    if (height < 680) visibleRows = 3;
    if (height > 920) visibleRows = 5;

    var size = cols * visibleRows;
    size = Math.max(6, Math.min(25, size));
    state.pageSize = size;
    return { cols: cols, pageSize: size };
  }

  function sortedItems(items) {
    var arr = items.slice();
    arr.sort(function (a, b) {
      if (state.sort === "oldest") {
        var ad = parseDate(a.dateSubmitted), bd = parseDate(b.dateSubmitted);
        return (ad ? ad.getTime() : 9999999999999) - (bd ? bd.getTime() : 9999999999999);
      }
      if (state.sort === "az") return a.name.localeCompare(b.name);
      if (state.sort === "featured") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.sortOrder - b.sortOrder;
      var ad2 = parseDate(a.dateSubmitted), bd2 = parseDate(b.dateSubmitted);
      return (bd2 ? bd2.getTime() : 0) - (ad2 ? ad2.getTime() : 0) || a.sortOrder - b.sortOrder;
    });
    return arr;
  }

  function filteredItems() {
    var q = clean(state.search).toLowerCase();
    var cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 90);

    return sortedItems(state.items.filter(function (it) {
      if (state.filter === "photos" && it.mediaType !== "photo") return false;
      if (state.filter === "videos" && it.mediaType !== "video") return false;
      if (state.filter === "featured" && !it.featured) return false;
      if (state.filter === "recent") {
        var d = parseDate(it.dateSubmitted);
        if (!d || d < cutoff) return false;
      }
      if (q) {
        var blob = [it.name, it.caption, it.credit, it.attribution, it.submittedBy, it.category, it.slug].join(" ").toLowerCase();
        if (blob.indexOf(q) === -1) return false;
      }
      return true;
    }));
  }

  function stats() {
    return {
      all: state.items.length,
      photos: state.items.filter(function (i) { return i.mediaType === "photo"; }).length,
      videos: state.items.filter(function (i) { return i.mediaType === "video"; }).length,
      featured: state.items.filter(function (i) { return i.featured; }).length
    };
  }

  function renderHero() {
    var s = stats();
    return '<section class="se-gallery-hero">' +
      '<div class="se-gallery-eyebrow">Club Gallery</div>' +
      '<h1>Member Submitted Media</h1>' +
      '<p>Photos and videos from Club aircraft, members, destinations, events, and aviation activity. Click any thumbnail to enlarge and move through the gallery without refreshing the page.</p>' +
      '<div class="se-gallery-stats">' +
        '<div class="se-gallery-stat"><strong>' + esc(s.all) + '</strong><span>Public items</span></div>' +
        '<div class="se-gallery-stat"><strong>' + esc(s.photos) + '</strong><span>Photos</span></div>' +
        '<div class="se-gallery-stat"><strong>' + esc(s.videos) + '</strong><span>Videos</span></div>' +
        '<div class="se-gallery-stat"><strong>' + esc(s.featured) + '</strong><span>Featured</span></div>' +
      '</div>' +
    '</section>';
  }

  function filterButton(key, label) {
    return '<button type="button" class="se-gallery-btn ' + (state.filter === key ? "active" : "") + '" data-se-gallery-filter="' + esc(key) + '">' + esc(label) + '</button>';
  }

  function renderToolbar() {
    return '<div class="se-gallery-toolbar">' +
      '<div class="se-gallery-filters">' +
        filterButton("all", "All") +
        filterButton("recent", "Recent") +
        filterButton("photos", "Photos") +
        filterButton("videos", "Videos") +
        filterButton("featured", "Featured") +
      '</div>' +
      '<div class="se-gallery-tools">' +
        '<input class="se-gallery-input" id="se-gallery-search" value="' + esc(state.search) + '" placeholder="Search caption, credit, category">' +
        '<select class="se-gallery-select" id="se-gallery-sort">' +
          '<option value="newest">Newest first</option>' +
          '<option value="oldest">Oldest first</option>' +
          '<option value="az">A-Z</option>' +
          '<option value="featured">Featured first</option>' +
        '</select>' +
      '</div>' +
    '</div>';
  }

  function renderCard(it, absoluteIndex) {
    var thumb = it.mediaType === "video" ? (it.assetUrl || it.videoThumbUrl) : it.assetUrl;
    return '<article class="se-gallery-card" data-se-gallery-open="' + esc(absoluteIndex) + '">' +
      '<div class="se-gallery-thumb-wrap">' +
        (thumb ? '<img class="se-gallery-thumb" loading="lazy" decoding="async" src="' + esc(thumb) + '" alt="' + esc(it.caption || it.name || "Gallery media") + '">' : '<div class="se-gallery-empty">No image</div>') +
        (it.mediaType === "video" ? '<div class="se-gallery-play"><div class="se-gallery-play-circle"><div class="se-gallery-play-triangle"></div></div></div>' : '') +
      '</div>' +
      '<div class="se-gallery-card-info">' +
        '<h3 class="se-gallery-card-title">' + esc(it.caption || it.name || "Gallery item") + '</h3>' +
        '<div class="se-gallery-card-credit">' + esc(it.credit || "Unattributed") + '</div>' +
        '<div class="se-gallery-pill-row">' +
          '<span class="se-gallery-pill">' + esc(it.mediaType) + '</span>' +
          (it.featured ? '<span class="se-gallery-pill">Featured</span>' : '') +
          (it.dateSubmitted ? '<span class="se-gallery-pill">' + esc(formatDate(it.dateSubmitted)) + '</span>' : '') +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function renderGalleryContent() {
    if (state.loading) return '<div class="se-gallery-empty">Loading gallery…</div>';
    if (state.error) return '<div class="se-gallery-error">' + esc(state.error) + '</div>';

    var layout = calculatePageSize();
    var list = filteredItems();
    state.activeList = list;
    var totalPages = Math.max(1, Math.ceil(list.length / state.pageSize));
    if (state.page > totalPages) state.page = totalPages;
    if (state.page < 1) state.page = 1;

    var start = (state.page - 1) * state.pageSize;
    var pageItems = list.slice(start, start + state.pageSize);

    var meta = list.length + " item" + (list.length === 1 ? "" : "s") + " shown";
    if (state.search) meta += " for search: “" + state.search + "”";
    meta += ". Page " + state.page + " of " + totalPages + ".";

    return renderToolbar() +
      '<p class="se-gallery-meta-line">' + esc(meta) + '</p>' +
      (pageItems.length ? '<div class="se-gallery-grid" style="--se-gallery-cols:' + layout.cols + '">' + pageItems.map(function (it, localIndex) {
        return renderCard(it, start + localIndex);
      }).join("") + '</div>' : '<div class="se-gallery-empty">No gallery items match this view.</div>') +
      '<div class="se-gallery-pagination">' +
        '<button type="button" class="se-gallery-btn" data-se-gallery-page="prev" ' + (state.page <= 1 ? "disabled" : "") + '>Previous</button>' +
        '<span>Page ' + esc(state.page) + ' of ' + esc(totalPages) + '</span>' +
        '<button type="button" class="se-gallery-btn" data-se-gallery-page="next" ' + (state.page >= totalPages ? "disabled" : "") + '>Next</button>' +
      '</div>';
  }

  function renderModal() {
    if (!state.modalOpen || !state.activeList.length) return "";
    var idx = Math.max(0, Math.min(state.modalIndex, state.activeList.length - 1));
    var it = state.activeList[idx];
    var isVideo = it.mediaType === "video" && it.videoUrl;
    var media = isVideo
      ? '<iframe class="se-gallery-modal-video" src="' + esc(it.videoUrl) + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      : '<img class="se-gallery-modal-img" src="' + esc(it.imageUrl || it.assetUrl || "") + '" alt="' + esc(it.caption || it.name || "Gallery image") + '">';

    return '<div class="se-gallery-modal-backdrop open" id="se-gallery-modal-backdrop" aria-hidden="false">' +
      '<div class="se-gallery-modal" role="dialog" aria-modal="true">' +
        '<button type="button" class="se-gallery-modal-close" data-se-gallery-close aria-label="Close">&times;</button>' +
        '<button type="button" class="se-gallery-modal-arrow left" data-se-gallery-modal-prev aria-label="Previous">&#9664;</button>' +
        '<button type="button" class="se-gallery-modal-arrow right" data-se-gallery-modal-next aria-label="Next">&#9654;</button>' +
        '<div class="se-gallery-modal-media">' +
          '<div class="se-gallery-modal-counter">' + esc(idx + 1) + ' of ' + esc(state.activeList.length) + '</div>' +
          media +
        '</div>' +
        '<div class="se-gallery-filmstrip">' + renderFilmstrip(idx) + '</div>' +
        '<div class="se-gallery-modal-footer">' +
          '<h2 class="se-gallery-modal-title">' + esc(it.caption || it.name || "Gallery item") + '</h2>' +
          '<div class="se-gallery-modal-credit">Credit: ' + esc(it.credit || "Unattributed") + '</div>' +
          '<div class="se-gallery-modal-meta">' + renderModalMeta(it) + '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function renderModalMeta(it) {
    var parts = [];
    if (it.dateSubmitted) parts.push("Date Submitted: " + formatDate(it.dateSubmitted));
    if (it.category) parts.push("Category: " + it.category);
    if (it.mediaType) parts.push(it.mediaType.charAt(0).toUpperCase() + it.mediaType.slice(1));
    if (it.attribution && it.submittedBy && it.attribution !== it.submittedBy) {
      parts.push("Uploaded by: " + it.submittedBy);
    }
    return esc(parts.join(" • "));
  }

  function renderFilmstrip(activeIndex) {
    var max = state.activeList.length;
    var start = Math.max(0, activeIndex - 10);
    var end = Math.min(max, activeIndex + 11);
    return state.activeList.slice(start, end).map(function (it, i) {
      var absolute = start + i;
      var thumb = it.mediaType === "video" ? (it.assetUrl || it.videoThumbUrl) : it.assetUrl;
      return '<img class="se-gallery-film-thumb ' + (absolute === activeIndex ? "active" : "") + '" data-se-gallery-film="' + esc(absolute) + '" src="' + esc(thumb || "") + '" alt="">';
    }).join("");
  }

  function renderPage() {
    installStyles();

    var html = '<div class="se-gallery-page"><div class="se-gallery-shell">' +
      renderHero() +
      '<main class="se-gallery-main">' + renderGalleryContent() + '</main>' +
    '</div></div>' + renderModal();

    if (state.shell) state.shell.render(html);
    else {
      var mount = byId("syncetc-webflow-mount") || document.body;
      mount.innerHTML = html;
    }

    afterRender();
  }

  function afterRender() {
    var sort = byId("se-gallery-sort");
    if (sort) sort.value = state.sort;

    document.body.style.overflow = state.modalOpen ? "hidden" : "";

    if (state.modalOpen) {
      preloadAroundModal();
      var modal = byId("se-gallery-modal-backdrop");
      if (modal) modal.focus && modal.focus();
    }
  }

  function openModal(index) {
    state.activeList = filteredItems();
    if (!state.activeList.length) return;
    state.modalIndex = Math.max(0, Math.min(index, state.activeList.length - 1));
    state.modalOpen = true;
    renderPage();
  }

  function closeModal() {
    state.modalOpen = false;
    renderPage();
  }

  function modalMove(delta) {
    if (!state.activeList.length) return;
    var next = state.modalIndex + delta;
    if (next < 0) next = state.activeList.length - 1;
    if (next >= state.activeList.length) next = 0;
    state.modalIndex = next;
    renderPage();
  }

  function preloadAroundModal() {
    [-1, 1, 2].forEach(function (delta) {
      var idx = state.modalIndex + delta;
      if (idx < 0 || idx >= state.activeList.length) return;
      var it = state.activeList[idx];
      if (it && it.mediaType === "photo" && (it.imageUrl || it.assetUrl)) {
        var img = new Image();
        img.src = it.imageUrl || it.assetUrl;
      }
    });
  }

  function bind() {
    document.addEventListener("click", function (e) {
      var filter = e.target.closest && e.target.closest("[data-se-gallery-filter]");
      if (filter) {
        state.filter = filter.getAttribute("data-se-gallery-filter") || "all";
        state.page = 1;
        renderPage();
        return;
      }

      var page = e.target.closest && e.target.closest("[data-se-gallery-page]");
      if (page) {
        var dir = page.getAttribute("data-se-gallery-page");
        if (dir === "prev") state.page -= 1;
        if (dir === "next") state.page += 1;
        renderPage();
        return;
      }

      var open = e.target.closest && e.target.closest("[data-se-gallery-open]");
      if (open) {
        openModal(parseInt(open.getAttribute("data-se-gallery-open"), 10) || 0);
        return;
      }

      if (e.target.closest && e.target.closest("[data-se-gallery-close]")) {
        closeModal();
        return;
      }

      if (e.target.closest && e.target.closest("[data-se-gallery-modal-prev]")) {
        modalMove(-1);
        return;
      }

      if (e.target.closest && e.target.closest("[data-se-gallery-modal-next]")) {
        modalMove(1);
        return;
      }

      var film = e.target.closest && e.target.closest("[data-se-gallery-film]");
      if (film) {
        state.modalIndex = parseInt(film.getAttribute("data-se-gallery-film"), 10) || 0;
        renderPage();
        return;
      }

      var modalBackdrop = e.target && e.target.id === "se-gallery-modal-backdrop";
      if (modalBackdrop) closeModal();
    });

    document.addEventListener("input", function (e) {
      if (e.target && e.target.id === "se-gallery-search") {
        state.search = e.target.value || "";
        state.page = 1;
        renderPage();
      }
    });

    document.addEventListener("change", function (e) {
      if (e.target && e.target.id === "se-gallery-sort") {
        state.sort = e.target.value || "newest";
        state.page = 1;
        renderPage();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (!state.modalOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") modalMove(-1);
      if (e.key === "ArrowRight") modalMove(1);
    });

    document.addEventListener("touchstart", function (e) {
      if (!state.modalOpen || !e.touches || !e.touches.length) return;
      state.touchStartX = e.touches[0].clientX;
      state.touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener("touchend", function (e) {
      if (!state.modalOpen || !e.changedTouches || !e.changedTouches.length) return;
      var dx = e.changedTouches[0].clientX - state.touchStartX;
      var dy = e.changedTouches[0].clientY - state.touchStartY;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        modalMove(dx < 0 ? 1 : -1);
      }
    }, { passive: true });

    var resizeTimer = null;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        var oldSize = state.pageSize;
        calculatePageSize();
        if (oldSize !== state.pageSize) {
          state.page = 1;
          renderPage();
        }
      }, 180);
    });
  }

  function init() {
    ensureComponents().then(function () {
      var mountId = "syncetc-webflow-mount";
      var mount = byId(mountId);
      if (!mount) {
        mount = document.createElement("div");
        mount.id = mountId;
        document.body.appendChild(mount);
      }

      if (window.SyncEtc && window.SyncEtc.Components && window.SyncEtc.Components.SiteShell) {
        state.shell = window.SyncEtc.Components.SiteShell.create(mountId, {
          pageKey: "gallery",
          audience: "public",
          version: VERSION,
          showBanner: false
        });
      }

      renderPage();
      bind();

      return fetchGalleryItems();
    }).then(function (items) {
      state.items = items;
      state.loading = false;
      state.error = "";
      calculatePageSize();
      renderPage();
      console.log(VERSION + " loaded", items.length, "items");
    }).catch(function (err) {
      state.loading = false;
      state.error = err.message || String(err);
      renderPage();
      console.error(VERSION, err);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
/* PAGE-GALLERY-v1.js - END */
