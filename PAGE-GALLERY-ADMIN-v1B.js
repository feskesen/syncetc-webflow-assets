/* PAGE-GALLERY-ADMIN-v1B.js - BEGIN */
(function () {
  "use strict";

  var VERSION = "PAGE-GALLERY-ADMIN-v1B";
  var CUSTOMER_KEY = "150th_aero";
  var SUPABASE_URL = "https://ocdaohkiwonjmirqkjww.supabase.co";
  var EDGE_URL = SUPABASE_URL + "/functions/v1/syncetc-gallery-admin-action";

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
    message: "",
    items: [],
    alert: null,
    quality: null,
    tab: "review",
    search: "",
    page: 1,
    pageSize: 25,
    selected: {},
    modalOpen: false,
    modalItemId: "",
    modalDraft: null,
    modalDirty: false,
    confirm: null
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
          .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
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
  function bool(v) {
    if (typeof v === "boolean") return v;
    var s = clean(v).toLowerCase();
    return s === "true" || s === "1" || s === "yes";
  }
  function byId(id) { return document.getElementById(id); }
  function val(id) { var el = byId(id); return el ? clean(el.value) : ""; }
  function checked(id) { var el = byId(id); return !!(el && el.checked); }
  function setVal(id, value) { var el = byId(id); if (el) el.value = value == null ? "" : String(value); }
  function setChecked(id, value) { var el = byId(id); if (el) el.checked = !!value; }

  function edgeHeaders() {
    /*
      PAGE-GALLERY-ADMIN-v1B:
      Use a simple request to avoid browser CORS preflight.
      The Edge Function must have Verify JWT turned OFF for this testing/admin prototype.
    */
    return { "Content-Type": "text/plain;charset=UTF-8" };
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

  function displayAsset(item) {
    return clean(item.current_asset_url || item.legacy_photo_url || item.webflow_image_file || "");
  }

  function isVideo(item) {
    return clean(item.media_type).toLowerCase().indexOf("video") !== -1;
  }

  function youtubeId(raw) {
    var s = clean(raw);
    var m = s.match(/(?:youtube\.com\/(?:embed\/|shorts\/|watch\?v=)|youtu\.be\/)([A-Za-z0-9_-]{6,20})/) || s.match(/[?&]v=([A-Za-z0-9_-]{6,20})/);
    if (m && m[1]) return m[1];
    var id = s.match(/([A-Za-z0-9_-]{11})/);
    return id && id[1] ? id[1] : "";
  }

  function videoThumb(item) {
    var id = youtubeId(item.video_embed_url || item.video_url || "");
    return id ? "https://img.youtube.com/vi/" + encodeURIComponent(id) + "/hqdefault.jpg" : "";
  }

  function thumb(item) {
    return isVideo(item) ? (displayAsset(item) || videoThumb(item)) : displayAsset(item);
  }

  function displayCredit(item) {
    return clean(item.attribution_display_name || item.display_credit || item.submitted_by_display || "Unattributed");
  }

  function status(item) {
    if (bool(item.archived)) return "Archived";
    if (bool(item.rejected)) return "Rejected";
    if (bool(item.approved)) return "Approved";
    return "Needs Review";
  }

  function callEdge(action, payload) {
    return fetch(EDGE_URL, {
      method: "POST",
      mode: "cors",
      headers: edgeHeaders(),
      body: JSON.stringify({
        action: action,
        customer_key: CUSTOMER_KEY,
        payload: payload || {},
        actor_email: window.SYNCETC_ACTOR_EMAIL || "admin@syncetc.com",
        source: VERSION
      })
    }).then(function (r) {
      return r.text().then(function (txt) {
        var body = {};
        try {
          body = txt ? JSON.parse(txt) : {};
        } catch (err) {
          throw new Error("Edge returned non-JSON response: " + txt.slice(0, 180));
        }
        if (!r.ok || !body.ok) throw new Error(body.error || ("Edge error " + r.status));
        return body;
      });
    });
  }

  function loadItems() {
    state.loading = true;
    state.error = "";
    renderPage();

    return callEdge("list_gallery_items", {}).then(function (body) {
      state.items = body.items || [];
      state.alert = body.alert || null;
      state.quality = body.quality || null;
      state.loading = false;
      state.error = "";
      renderPage();
    }).catch(function (err) {
      state.loading = false;
      state.error = (err.message || String(err)) + " — v1B uses preflight-free text/plain Edge Function fetch.";
      renderPage();
    });
  }

  function installStyles() {
    U().installStyle("PAGE-GALLERY-ADMIN-v1B-style", `
      .se-ga-page { max-width:1180px; margin:34px auto 56px; padding:0 18px; font-family:Arial,Helvetica,sans-serif; color:var(--se-aero-text,#1e2933); }
      .se-ga-shell { background:var(--se-aero-card,rgba(255,255,255,.94)); border:1px solid var(--se-aero-border,rgba(18,54,90,.16)); border-radius:var(--se-aero-radius-xl,26px); box-shadow:var(--se-aero-shadow,0 18px 50px rgba(12,38,64,.22)); overflow:hidden; }
      .se-ga-hero { padding:28px 32px 24px; background:linear-gradient(135deg,var(--se-aero-navy,#12365a),var(--se-aero-blue,#2f80c4)); color:#fff; }
      .se-ga-eyebrow { display:inline-flex; margin-bottom:10px; padding:6px 12px; border-radius:999px; background:rgba(255,255,255,.16); border:1px solid rgba(255,255,255,.24); font-size:12px; font-weight:900; letter-spacing:.08em; text-transform:uppercase; }
      .se-ga-hero h1 { margin:0; color:#fff; font-size:clamp(30px,4vw,48px); line-height:1.05; font-weight:900; letter-spacing:-.035em; }
      .se-ga-hero p { max-width:900px; margin:12px 0 0; color:rgba(255,255,255,.9); font-size:15px; line-height:1.6; }
      .se-ga-alert { margin-top:18px; display:inline-flex; gap:8px; align-items:center; padding:10px 14px; border-radius:999px; background:rgba(255,255,255,.17); border:1px solid rgba(255,255,255,.28); color:#fff; font-weight:900; }
      .se-ga-alert .accent { color:var(--se-aero-accent,#c0392b); background:#fff; border-radius:999px; padding:2px 8px; }
      .se-ga-main { padding:20px 24px 28px; background:linear-gradient(180deg,rgba(234,245,255,.55),rgba(255,255,255,.86)); }
      .se-ga-tabs, .se-ga-toolbar, .se-ga-quality { display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-bottom:14px; padding:12px; border-radius:20px; background:rgba(255,255,255,.88); border:1px solid var(--se-aero-border,rgba(18,54,90,.16)); box-shadow:0 8px 20px rgba(12,38,64,.08); }
      .se-ga-toolbar { justify-content:space-between; }
      .se-ga-left, .se-ga-right { display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
      .se-ga-btn { display:inline-flex; min-height:36px; align-items:center; justify-content:center; padding:8px 13px; border-radius:999px; border:1px solid rgba(18,54,90,.22); background:#fff; color:var(--se-aero-navy,#12365a); font-size:12px; font-weight:900; cursor:pointer; text-decoration:none; line-height:1.1; }
      .se-ga-btn:hover { background:var(--se-aero-sky,#eaf5ff); transform:translateY(-1px); }
      .se-ga-btn.active, .se-ga-btn.primary { background:var(--se-aero-navy,#12365a); color:#fff; border-color:var(--se-aero-navy,#12365a); }
      .se-ga-btn.danger { background:#fee2e2; color:#991b1b; border-color:#f0c8c8; }
      .se-ga-btn.warning { background:#fff7ec; color:#8a4d00; border-color:rgba(138,77,0,.25); }
      .se-ga-btn[disabled] { opacity:.45; pointer-events:none; }
      .se-ga-input, .se-ga-select, .se-ga-textarea { border:1px solid rgba(18,54,90,.22); border-radius:14px; padding:9px 12px; background:#fff; color:var(--se-aero-text,#1e2933); font:inherit; font-size:13px; outline:none; }
      .se-ga-input { min-width:270px; }
      .se-ga-textarea { width:100%; min-height:90px; resize:vertical; line-height:1.45; }
      .se-ga-quality { color:#294968; font-size:13px; font-weight:900; line-height:1.35; }
      .se-ga-qcard { padding:8px 10px; border-radius:12px; background:#fff; border:1px solid rgba(18,54,90,.12); }
      .se-ga-qcard strong { color:var(--se-aero-accent,#c0392b); }
      .se-ga-message { margin:0 0 14px; padding:11px 13px; border-radius:14px; background:#fff; border:1px solid rgba(18,54,90,.14); color:#294968; font-size:13px; font-weight:800; }
      .se-ga-message:empty { display:none; }
      .se-ga-grid { display:flex; flex-direction:column; border-radius:20px; background:#fff; border:1px solid var(--se-aero-border,rgba(18,54,90,.16)); overflow:hidden; box-shadow:0 8px 20px rgba(12,38,64,.08); }
      .se-ga-row { display:grid; grid-template-columns:40px 88px minmax(170px,.75fr) minmax(240px,1.2fr) 190px; gap:12px; align-items:center; padding:12px 14px; border-bottom:1px solid rgba(18,54,90,.12); cursor:pointer; }
      .se-ga-row:last-child { border-bottom:0; }
      .se-ga-row:hover { background:rgba(234,245,255,.72); }
      .se-ga-check { width:17px; height:17px; accent-color:var(--se-aero-navy,#12365a); }
      .se-ga-thumb { width:78px; height:78px; border-radius:14px; background:#eaf5ff; border:1px solid rgba(18,54,90,.14); display:flex; align-items:center; justify-content:center; overflow:hidden; position:relative; }
      .se-ga-thumb img { width:100%; height:100%; object-fit:contain; display:block; background:#fff; }
      .se-ga-play { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; pointer-events:none; }
      .se-ga-play span { width:36px; height:36px; border-radius:50%; background:rgba(18,54,90,.80); position:relative; display:block; }
      .se-ga-play span:after { content:""; position:absolute; left:14px; top:9px; border-top:8px solid transparent; border-bottom:8px solid transparent; border-left:12px solid #fff; }
      .se-ga-title { color:var(--se-aero-navy-dark,#0b2744); font-size:14px; font-weight:900; line-height:1.3; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; }
      .se-ga-sub { margin-top:4px; color:#53759b; font-size:12px; font-weight:700; line-height:1.35; }
      .se-ga-caption { padding:9px 10px; border-radius:12px; background:#f4f9fd; border:1px solid rgba(18,54,90,.12); color:#4a6685; font-size:13px; line-height:1.38; overflow-wrap:anywhere; }
      .se-ga-pills { display:flex; flex-wrap:wrap; justify-content:flex-start; gap:6px; }
      .se-ga-pill { display:inline-flex; align-items:center; min-height:22px; padding:4px 8px; border-radius:999px; background:var(--se-aero-sky,#eaf5ff); color:var(--se-aero-navy,#12365a); font-size:10px; line-height:1; font-weight:900; letter-spacing:.05em; text-transform:uppercase; }
      .se-ga-pill.pending { background:#fff7ec; color:#8a4d00; }
      .se-ga-pill.approved { background:#e7f6ec; color:#15803d; }
      .se-ga-pill.rejected { background:#fee2e2; color:#991b1b; }
      .se-ga-empty { padding:28px; text-align:center; color:#5d6b78; font-weight:900; }
      .se-ga-pagination { display:flex; justify-content:center; align-items:center; gap:10px; margin-top:16px; padding:12px; border-radius:18px; background:rgba(255,255,255,.88); border:1px solid rgba(18,54,90,.14); }
      .se-ga-pagination span { color:#53759b; font-size:13px; font-weight:900; }
      .se-ga-modal-backdrop, .se-ga-confirm-backdrop { position:fixed; inset:0; display:none; z-index:2147483000; align-items:center; justify-content:center; padding:22px; background:rgba(5,15,30,.72); overflow:auto; }
      .se-ga-modal-backdrop.open, .se-ga-confirm-backdrop.open { display:flex; }
      .se-ga-modal { width:min(980px,calc(100vw - 44px)); max-height:calc(100vh - 44px); overflow:auto; border-radius:24px; background:#fff; box-shadow:0 20px 70px rgba(0,0,0,.42); }
      .se-ga-modal-head { display:flex; justify-content:space-between; gap:12px; align-items:center; padding:18px 20px; background:linear-gradient(135deg,var(--se-aero-navy,#12365a),var(--se-aero-blue,#2f80c4)); color:#fff; }
      .se-ga-modal-head h2 { margin:0; color:#fff; font-size:20px; line-height:1.2; }
      .se-ga-x { width:34px; height:34px; border:0; border-radius:50%; background:rgba(255,255,255,.18); color:#fff; font-size:22px; cursor:pointer; }
      .se-ga-modal-body { padding:18px 20px; background:linear-gradient(180deg,rgba(234,245,255,.70),rgba(255,255,255,.90)); }
      .se-ga-modal-grid { display:grid; grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr); gap:18px; align-items:start; }
      .se-ga-preview { background:#0f172a; border-radius:18px; min-height:300px; display:flex; align-items:center; justify-content:center; overflow:hidden; }
      .se-ga-preview img { max-width:100%; max-height:420px; object-fit:contain; display:block; }
      .se-ga-preview iframe { width:100%; min-height:360px; border:0; background:#000; }
      .se-ga-field { display:flex; flex-direction:column; gap:6px; margin-bottom:12px; }
      .se-ga-field span { color:#53759b; font-size:10.5px; line-height:1.1; font-weight:900; letter-spacing:.08em; text-transform:uppercase; }
      .se-ga-row2 { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
      .se-ga-modal-actions { display:flex; flex-wrap:wrap; gap:8px; padding:14px 20px 18px; border-top:1px solid rgba(18,54,90,.14); justify-content:flex-end; }
      .se-ga-confirm { width:min(580px,calc(100vw - 44px)); border-radius:22px; background:#fff; overflow:hidden; box-shadow:0 20px 70px rgba(0,0,0,.42); }
      .se-ga-confirm-head { padding:18px 20px; background:linear-gradient(135deg,#991b1b,#8a4d00); color:#fff; }
      .se-ga-confirm-head h2 { margin:0; color:#fff; font-size:20px; }
      .se-ga-confirm-body { padding:18px 20px; color:#294968; font-size:14px; line-height:1.5; }
      .se-ga-confirm-actions { display:flex; justify-content:flex-end; gap:8px; padding:14px 20px 18px; border-top:1px solid rgba(18,54,90,.14); }
      @media(max-width:900px){ .se-ga-row{grid-template-columns:34px 74px minmax(0,1fr);}.se-ga-caption,.se-ga-pills{grid-column:3/-1}.se-ga-modal-grid{grid-template-columns:1fr;} }
      @media(max-width:600px){ .se-ga-page{padding:0 12px;margin-top:20px}.se-ga-main{padding:16px 14px}.se-ga-row{grid-template-columns:30px 68px minmax(0,1fr);padding:11px}.se-ga-toolbar,.se-ga-tabs,.se-ga-quality{align-items:stretch}.se-ga-left,.se-ga-right,.se-ga-btn,.se-ga-input,.se-ga-select{width:100%;}.se-ga-row2{grid-template-columns:1fr}.se-ga-modal-backdrop,.se-ga-confirm-backdrop{padding:12px}.se-ga-modal,.se-ga-confirm{width:100%;max-height:calc(100vh - 24px);border-radius:18px;} }
    `);
  }

  function tabCount(key) {
    return filterForTab(state.items, key).length;
  }

  function renderHero() {
    var count = state.alert ? state.alert.attention_count : 0;
    return '<section class="se-ga-hero">' +
      '<div class="se-ga-eyebrow">Board Tool</div>' +
      '<h1>Gallery Management</h1>' +
      '<p>Review, approve, reject, feature, and clean up gallery photos and videos. Attribution/photo credit remains separate from the submitted-by/uploader record.</p>' +
      '<div class="se-ga-alert">Gallery: <span class="accent">' + esc(count) + '</span> item' + (count === 1 ? '' : 's') + ' need attention</div>' +
    '</section>';
  }

  function renderTabs() {
    var tabs = [
      ["review", "Needs Review"],
      ["approved", "Approved / Live"],
      ["featured", "Featured"],
      ["rejected", "Rejected / Archived"],
      ["videos", "Videos"],
      ["quality", "Data Quality"],
      ["all", "All Items"]
    ];
    return '<div class="se-ga-tabs">' + tabs.map(function (t) {
      return '<button type="button" class="se-ga-btn ' + (state.tab === t[0] ? "active" : "") + '" data-se-ga-tab="' + esc(t[0]) + '">' + esc(t[1]) + ' (' + esc(tabCount(t[0])) + ')</button>';
    }).join("") + '</div>';
  }

  function renderQuality() {
    var q = state.quality || {};
    return '<div class="se-ga-quality">' +
      '<div class="se-ga-qcard">Pending: <strong>' + esc(q.pending || 0) + '</strong></div>' +
      '<div class="se-ga-qcard">Missing credit: <strong>' + esc(q.missing_credit || 0) + '</strong></div>' +
      '<div class="se-ga-qcard">Legacy unattributed text: <strong>' + esc(q.legacy_unattributed || 0) + '</strong></div>' +
      '<div class="se-ga-qcard">Missing caption: <strong>' + esc(q.missing_caption || 0) + '</strong></div>' +
      '<div class="se-ga-qcard">Not migrated: <strong>' + esc(q.not_migrated || 0) + '</strong></div>' +
      '<div class="se-ga-qcard">Videos: <strong>' + esc(q.videos || 0) + '</strong></div>' +
    '</div>';
  }

  function renderToolbar() {
    var selectedCount = Object.keys(state.selected).filter(function (id) { return state.selected[id]; }).length;
    return '<div class="se-ga-toolbar">' +
      '<div class="se-ga-left"><input class="se-ga-input" id="se-ga-search" value="' + esc(state.search) + '" placeholder="Search caption, credit, uploader, category"><button type="button" class="se-ga-btn" data-se-ga-refresh>Refresh</button></div>' +
      '<div class="se-ga-right">' +
        '<button type="button" class="se-ga-btn" data-se-ga-select-page>Select page</button>' +
        '<button type="button" class="se-ga-btn" data-se-ga-clear-selection>Clear</button>' +
        '<button type="button" class="se-ga-btn primary" data-se-ga-bulk="approve" ' + (!selectedCount ? "disabled" : "") + '>Approve selected</button>' +
        '<button type="button" class="se-ga-btn danger" data-se-ga-bulk="reject" ' + (!selectedCount ? "disabled" : "") + '>Reject selected</button>' +
        '<span class="se-ga-qcard">' + esc(selectedCount) + ' selected</span>' +
      '</div>' +
    '</div>';
  }

  function filterForTab(items, tab) {
    return (items || []).filter(function (it) {
      if (tab === "review") return !bool(it.approved) && !bool(it.rejected) && !bool(it.archived) && !bool(it.draft);
      if (tab === "approved") return bool(it.approved) && !bool(it.rejected) && !bool(it.archived);
      if (tab === "featured") return bool(it.approved) && !bool(it.rejected) && !bool(it.archived) && bool(it.featured);
      if (tab === "rejected") return bool(it.rejected) || bool(it.archived);
      if (tab === "videos") return isVideo(it);
      if (tab === "quality") {
        var blob = [it.name, it.caption, it.attribution_display_name, it.display_credit, it.submitted_by_display].join(" ").toLowerCase();
        return !clean(it.caption || it.name) || !clean(it.attribution_display_name || it.submitted_by_display) || blob.indexOf("unattributed") !== -1 || (!isVideo(it) && !clean(it.supabase_storage_path));
      }
      return true;
    });
  }

  function visibleItems() {
    var q = clean(state.search).toLowerCase();
    return filterForTab(state.items, state.tab).filter(function (it) {
      if (!q) return true;
      var blob = [it.name, it.caption, it.attribution_display_name, it.display_credit, it.submitted_by_display, it.category, it.gallery_item_id].join(" ").toLowerCase();
      return blob.indexOf(q) !== -1;
    });
  }

  function statusPill(it) {
    var s = status(it);
    var cls = s === "Approved" ? "approved" : s === "Rejected" || s === "Archived" ? "rejected" : "pending";
    return '<span class="se-ga-pill ' + cls + '">' + esc(s) + '</span>';
  }

  function renderRow(it) {
    var img = thumb(it);
    var id = clean(it.gallery_item_id);
    var selected = !!state.selected[id];
    var assetOk = clean(it.supabase_storage_path) ? "Migrated" : (isVideo(it) ? "Video" : "Legacy URL");
    return '<div class="se-ga-row" data-se-ga-open="' + esc(id) + '">' +
      '<div><input class="se-ga-check" type="checkbox" data-se-ga-select="' + esc(id) + '" ' + (selected ? "checked" : "") + '></div>' +
      '<div class="se-ga-thumb">' + (img ? '<img src="' + esc(img) + '" alt="">' : '') + (isVideo(it) ? '<div class="se-ga-play"><span></span></div>' : '') + '</div>' +
      '<div><div class="se-ga-title">' + esc(displayCredit(it)) + '</div><div class="se-ga-sub">Submitted by: ' + esc(clean(it.submitted_by_display) || "Unknown") + '<br>' + esc(formatDate(it.date_submitted)) + '</div></div>' +
      '<div class="se-ga-caption">' + esc(clean(it.caption || it.name) || "No caption.") + '</div>' +
      '<div class="se-ga-pills">' + statusPill(it) + '<span class="se-ga-pill">' + esc(isVideo(it) ? "video" : "photo") + '</span>' + (bool(it.featured) ? '<span class="se-ga-pill">Featured</span>' : '') + '<span class="se-ga-pill">' + esc(assetOk) + '</span></div>' +
    '</div>';
  }

  function renderGrid() {
    if (state.loading) return '<div class="se-ga-empty">Loading gallery manager…</div>';
    if (state.error) return '<div class="se-ga-empty">' + esc(state.error) + '</div>';
    var list = visibleItems();
    var totalPages = Math.max(1, Math.ceil(list.length / state.pageSize));
    if (state.page > totalPages) state.page = totalPages;
    if (state.page < 1) state.page = 1;
    var start = (state.page - 1) * state.pageSize;
    var pageItems = list.slice(start, start + state.pageSize);
    return (pageItems.length ? '<div class="se-ga-grid">' + pageItems.map(renderRow).join("") + '</div>' : '<div class="se-ga-empty">No items match this view.</div>') +
      '<div class="se-ga-pagination"><button type="button" class="se-ga-btn" data-se-ga-page="prev" ' + (state.page <= 1 ? "disabled" : "") + '>Previous</button><span>Page ' + esc(state.page) + ' of ' + esc(totalPages) + ' · ' + esc(list.length) + ' item' + (list.length === 1 ? '' : 's') + '</span><button type="button" class="se-ga-btn" data-se-ga-page="next" ' + (state.page >= totalPages ? "disabled" : "") + '>Next</button></div>';
  }

  function itemById(id) {
    return state.items.find(function (it) { return clean(it.gallery_item_id) === clean(id); }) || null;
  }

  function renderModal() {
    if (!state.modalOpen || !state.modalDraft) return "";
    var it = state.modalDraft;
    var video = isVideo(it);
    var media = video
      ? '<iframe src="' + esc(it.video_embed_url || it.video_url || "") + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      : '<img src="' + esc(displayAsset(it)) + '" alt="">';

    return '<div class="se-ga-modal-backdrop open"><div class="se-ga-modal" role="dialog" aria-modal="true">' +
      '<div class="se-ga-modal-head"><h2>Edit Gallery Item</h2><button type="button" class="se-ga-x" data-se-ga-close>&times;</button></div>' +
      '<div class="se-ga-modal-body"><div class="se-ga-modal-grid">' +
        '<div><div class="se-ga-preview">' + media + '</div><div class="se-ga-message" style="margin-top:12px">Submitted by/uploader is preserved separately from public photo credit.</div></div>' +
        '<div>' +
          '<label class="se-ga-field"><span>Photo Credit / Attribution</span><input class="se-ga-input" id="se-ga-credit" value="' + esc(it.attribution_display_name || "") + '" placeholder="Public display credit"></label>' +
          '<label class="se-ga-field"><span>Submitted By / Uploader</span><input class="se-ga-input" id="se-ga-submitted" value="' + esc(it.submitted_by_display || "") + '" disabled></label>' +
          '<label class="se-ga-field"><span>Caption</span><textarea class="se-ga-textarea" id="se-ga-caption">' + esc(it.caption || it.name || "") + '</textarea></label>' +
          '<div class="se-ga-row2"><label class="se-ga-field"><span>Category</span><input class="se-ga-input" id="se-ga-category" value="' + esc(it.category || "") + '"></label><label class="se-ga-field"><span>Status</span><input class="se-ga-input" value="' + esc(status(it)) + '" disabled></label></div>' +
          '<label class="se-ga-field"><span>Public Display Credit</span><input class="se-ga-input" value="' + esc(displayCredit(it)) + '" disabled></label>' +
          '<label class="se-ga-field"><span>Homepage Featured</span><label style="display:flex;gap:8px;align-items:center;font-weight:800;color:#294968"><input id="se-ga-featured" type="checkbox" ' + (bool(it.featured) ? "checked" : "") + ' ' + (video || bool(it.rejected) ? "disabled" : "") + '> Featured photos may appear in homepage/gallery highlights.</label></label>' +
        '</div>' +
      '</div></div>' +
      '<div class="se-ga-modal-actions">' +
        '<button type="button" class="se-ga-btn" data-se-ga-save>Save Metadata</button>' +
        '<button type="button" class="se-ga-btn primary" data-se-ga-action="approve_gallery_item">Approve</button>' +
        '<button type="button" class="se-ga-btn danger" data-se-ga-action="reject_gallery_item">Reject</button>' +
        '<button type="button" class="se-ga-btn warning" data-se-ga-action="restore_gallery_item">Restore to Review</button>' +
        '<button type="button" class="se-ga-btn" data-se-ga-close>Close</button>' +
      '</div>' +
    '</div></div>';
  }

  function renderConfirm() {
    if (!state.confirm) return "";
    return '<div class="se-ga-confirm-backdrop open"><div class="se-ga-confirm"><div class="se-ga-confirm-head"><h2>' + esc(state.confirm.title || "Confirm") + '</h2></div><div class="se-ga-confirm-body">' + esc(state.confirm.message || "") + '</div><div class="se-ga-confirm-actions"><button type="button" class="se-ga-btn" data-se-ga-confirm-no>Cancel</button><button type="button" class="se-ga-btn danger" data-se-ga-confirm-yes>Confirm</button></div></div></div>';
  }

  function renderPage() {
    installStyles();
    var html = '<div class="se-ga-page"><div class="se-ga-shell">' + renderHero() +
      '<main class="se-ga-main">' +
        renderTabs() +
        renderQuality() +
        '<div class="se-ga-message">' + esc(state.message) + '</div>' +
        renderToolbar() +
        renderGrid() +
      '</main>' +
    '</div></div>' + renderModal() + renderConfirm();

    if (state.shell) state.shell.render(html);
    else {
      var mount = byId("syncetc-webflow-mount") || document.body;
      mount.innerHTML = html;
    }
    afterRender();
  }

  function afterRender() {
    var search = byId("se-ga-search");
    if (search) search.value = state.search;
    document.body.style.overflow = state.modalOpen || state.confirm ? "hidden" : "";
  }

  function openModal(id) {
    var item = itemById(id);
    if (!item) return;
    state.modalItemId = id;
    state.modalDraft = JSON.parse(JSON.stringify(item));
    state.modalOpen = true;
    state.modalDirty = false;
    renderPage();
  }

  function closeModal() {
    if (state.modalDirty) {
      state.confirm = {
        title: "Discard unsaved gallery edits?",
        message: "This will close the item without saving the metadata changes.",
        onConfirm: function () {
          state.modalOpen = false;
          state.modalDraft = null;
          state.modalDirty = false;
          state.confirm = null;
          renderPage();
        }
      };
      renderPage();
      return;
    }
    state.modalOpen = false;
    state.modalDraft = null;
    state.modalDirty = false;
    renderPage();
  }

  function updateDraftFromFields() {
    if (!state.modalDraft) return;
    state.modalDraft.attribution_display_name = val("se-ga-credit");
    state.modalDraft.display_credit = val("se-ga-credit") || state.modalDraft.submitted_by_display || "Unattributed";
    state.modalDraft.caption = val("se-ga-caption");
    state.modalDraft.name = val("se-ga-caption") || state.modalDraft.name;
    state.modalDraft.category = val("se-ga-category");
    state.modalDraft.featured = checked("se-ga-featured") && !isVideo(state.modalDraft) && !bool(state.modalDraft.rejected);
  }

  function confirmAction(title, message, callback) {
    state.confirm = { title: title, message: message, onConfirm: callback };
    renderPage();
  }

  function applyLocal(updated) {
    if (!updated || !updated.gallery_item_id) return;
    state.items = state.items.map(function (it) {
      return clean(it.gallery_item_id) === clean(updated.gallery_item_id) ? updated : it;
    });
  }

  function runItemAction(action, id) {
    var item = itemById(id || state.modalItemId);
    if (!item) return;
    var verb = action.replace(/_/g, " ");
    confirmAction("Confirm " + verb, (item.caption || item.name || displayCredit(item)) + " · " + status(item), function () {
      state.confirm = null;
      callEdge(action, { gallery_item_id: item.gallery_item_id }).then(function (body) {
        applyLocal(body.result);
        if (body.alert) state.alert = body.alert;
        state.message = "Gallery item updated.";
        state.modalOpen = false;
        state.modalDraft = null;
        state.modalDirty = false;
        return loadItems();
      }).catch(function (err) {
        state.message = err.message || String(err);
        renderPage();
      });
    });
  }

  function saveMetadata() {
    updateDraftFromFields();
    var d = state.modalDraft;
    if (!d) return;
    callEdge("update_gallery_item", {
      gallery_item_id: d.gallery_item_id,
      name: d.name,
      caption: d.caption,
      attribution_display_name: d.attribution_display_name,
      display_credit: d.display_credit,
      category: d.category,
      featured: d.featured,
      last_admin_action: "update_gallery_metadata"
    }).then(function (body) {
      applyLocal(body.result);
      if (body.alert) state.alert = body.alert;
      state.modalDirty = false;
      state.modalOpen = false;
      state.modalDraft = null;
      state.message = "Gallery metadata saved.";
      return loadItems();
    }).catch(function (err) {
      state.message = err.message || String(err);
      renderPage();
    });
  }

  function bulk(action) {
    var ids = Object.keys(state.selected).filter(function (id) { return state.selected[id]; });
    if (!ids.length) return;
    confirmAction("Confirm bulk " + action, "This will update " + ids.length + " selected gallery item" + (ids.length === 1 ? "" : "s") + ".", function () {
      state.confirm = null;
      callEdge("bulk_gallery_action", { gallery_item_ids: ids, bulk_action: action }).then(function () {
        state.selected = {};
        state.message = "Bulk action completed.";
        return loadItems();
      }).catch(function (err) {
        state.message = err.message || String(err);
        renderPage();
      });
    });
  }

  function currentPageItems() {
    var list = visibleItems();
    var start = (state.page - 1) * state.pageSize;
    return list.slice(start, start + state.pageSize);
  }

  function bind() {
    document.addEventListener("click", function (e) {
      var tab = e.target.closest && e.target.closest("[data-se-ga-tab]");
      if (tab) {
        state.tab = tab.getAttribute("data-se-ga-tab") || "review";
        state.page = 1;
        state.selected = {};
        renderPage();
        return;
      }

      if (e.target.closest && e.target.closest("[data-se-ga-refresh]")) {
        loadItems();
        return;
      }

      var page = e.target.closest && e.target.closest("[data-se-ga-page]");
      if (page) {
        var dir = page.getAttribute("data-se-ga-page");
        if (dir === "prev") state.page -= 1;
        if (dir === "next") state.page += 1;
        renderPage();
        return;
      }

      var checkbox = e.target.closest && e.target.closest("[data-se-ga-select]");
      if (checkbox) {
        e.stopPropagation();
        var id = checkbox.getAttribute("data-se-ga-select");
        state.selected[id] = checkbox.checked;
        renderPage();
        return;
      }

      if (e.target.closest && e.target.closest("[data-se-ga-select-page]")) {
        currentPageItems().forEach(function (it) { state.selected[it.gallery_item_id] = true; });
        renderPage();
        return;
      }

      if (e.target.closest && e.target.closest("[data-se-ga-clear-selection]")) {
        state.selected = {};
        renderPage();
        return;
      }

      var bulkBtn = e.target.closest && e.target.closest("[data-se-ga-bulk]");
      if (bulkBtn) {
        bulk(bulkBtn.getAttribute("data-se-ga-bulk"));
        return;
      }

      var open = e.target.closest && e.target.closest("[data-se-ga-open]");
      if (open) {
        openModal(open.getAttribute("data-se-ga-open"));
        return;
      }

      if (e.target.closest && e.target.closest("[data-se-ga-close]")) {
        closeModal();
        return;
      }

      if (e.target.closest && e.target.closest("[data-se-ga-save]")) {
        saveMetadata();
        return;
      }

      var action = e.target.closest && e.target.closest("[data-se-ga-action]");
      if (action) {
        runItemAction(action.getAttribute("data-se-ga-action"));
        return;
      }

      if (e.target.closest && e.target.closest("[data-se-ga-confirm-no]")) {
        state.confirm = null;
        renderPage();
        return;
      }

      if (e.target.closest && e.target.closest("[data-se-ga-confirm-yes]")) {
        var fn = state.confirm && state.confirm.onConfirm;
        if (typeof fn === "function") fn();
        return;
      }
    });

    document.addEventListener("input", function (e) {
      if (e.target && e.target.id === "se-ga-search") {
        state.search = e.target.value || "";
        state.page = 1;
        renderPage();
        return;
      }
      if (e.target && e.target.closest && e.target.closest(".se-ga-modal")) {
        state.modalDirty = true;
      }
    });

    document.addEventListener("change", function (e) {
      if (e.target && e.target.closest && e.target.closest(".se-ga-modal")) {
        state.modalDirty = true;
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (state.confirm) {
          state.confirm = null;
          renderPage();
        } else if (state.modalOpen) {
          closeModal();
        }
      }
    });

    window.addEventListener("beforeunload", function (e) {
      if (!state.modalDirty) return;
      e.preventDefault();
      e.returnValue = "";
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
          pageKey: "gallery-admin",
          audience: "board",
          version: VERSION,
          showBanner: false
        });
      }

      renderPage();
      bind();
      return loadItems();
    }).catch(function (err) {
      state.loading = false;
      state.error = err.message || String(err);
      renderPage();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
/* PAGE-GALLERY-ADMIN-v1B.js - END */
