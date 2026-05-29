/* PAGE-GALLERY-SUBMIT-v1.js - BEGIN */
(function () {
  "use strict";

  var VERSION = "PAGE-GALLERY-SUBMIT-v1";
  var CUSTOMER_KEY = "150th_aero";
  var SUPABASE_URL = "https://ocdaohkiwonjmirqkjww.supabase.co";
  var SUPABASE_ANON_KEY = window.SYNCETC_SUPABASE_ANON_KEY || window.SUPABASE_ANON_KEY || "";
  var EDGE_URL = SUPABASE_URL + "/functions/v1/syncetc-gallery-submit";
  var STORAGE_BUCKET = "gallery";

  var MAX_PHOTOS = 10;
  var MAX_PHOTO_BYTES = 10 * 1024 * 1024;
  var MIN_RECOMMENDED_WIDTH = 800;

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
    loadingMember: true,
    busy: false,
    message: "",
    messageType: "info",
    selectedPhotos: [],
    modalOpen: false,
    modalTitle: "",
    modalMessage: "",
    modalProgress: "",
    modalPercent: 8,
    modalClose: false,
    currentMember: {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      displayName: ""
    }
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

  function ensureSupabaseClient() {
    if (window.supabase && typeof window.supabase.createClient === "function") return Promise.resolve();
    return loadScriptOnce("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2");
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
  function byId(id) { return document.getElementById(id); }

  function setMessage(type, msg) {
    state.messageType = type || "info";
    state.message = msg || "";
    renderPage();
  }

  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "photo-" + Date.now() + "-" + Math.random().toString(36).slice(2);
  }

  function formatBytes(bytes) {
    var units = ["B", "KB", "MB", "GB"];
    var size = bytes || 0;
    var i = 0;
    while (size >= 1024 && i < units.length - 1) {
      size = size / 1024;
      i += 1;
    }
    return size.toFixed(i === 0 ? 0 : 1) + " " + units[i];
  }

  function safeFileName(name) {
    var parts = clean(name || "photo").split(".");
    var ext = parts.length > 1 ? "." + parts.pop().toLowerCase().replace(/[^a-z0-9]/g, "") : ".jpg";
    var base = parts.join(".").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "photo";
    return base + ext;
  }

  function publicStorageUrl(path) {
    return SUPABASE_URL + "/storage/v1/object/public/" + encodeURIComponent(STORAGE_BUCKET) + "/" + path.split("/").map(encodeURIComponent).join("/");
  }

  function currentSubmittedBy() {
    return clean(state.currentMember.displayName || state.currentMember.email);
  }

  function inspectImage(photo) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () {
        photo.width = img.naturalWidth || 0;
        photo.height = img.naturalHeight || 0;
        resolve(photo);
      };
      img.onerror = function () {
        photo.width = 0;
        photo.height = 0;
        resolve(photo);
      };
      img.src = photo.previewUrl;
    });
  }

  function revokeAll() {
    state.selectedPhotos.forEach(function (p) {
      if (p.previewUrl) URL.revokeObjectURL(p.previewUrl);
    });
  }

  function addFiles(fileList) {
    var files = Array.prototype.slice.call(fileList || []);
    if (!files.length) return;

    var nonImages = files.filter(function (file) { return !(file && file.type && file.type.indexOf("image/") === 0); });
    if (nonImages.length) {
      setMessage("error", "Please choose image files only.");
      return;
    }

    var oversized = files.filter(function (file) { return file && file.size > MAX_PHOTO_BYTES; });
    if (oversized.length) {
      setMessage("error", "Photos must be 10 MB or smaller. Oversized file: " + (oversized[0].name || "unnamed file"));
      return;
    }

    var slots = MAX_PHOTOS - state.selectedPhotos.length;
    if (slots <= 0) {
      setMessage("error", "You already selected the maximum of " + MAX_PHOTOS + " photos.");
      return;
    }
    if (files.length > slots) {
      setMessage("error", "You can upload up to " + MAX_PHOTOS + " photos per submission. You have " + slots + " open slot" + (slots === 1 ? "" : "s") + ".");
      return;
    }

    var existing = {};
    state.selectedPhotos.forEach(function (p) { existing[p.localId] = true; });

    var additions = [];
    files.forEach(function (file) {
      var localId = [file.name, file.size, file.lastModified].join("|");
      if (existing[localId]) return;
      var photo = {
        localId: localId,
        galleryItemId: uuid(),
        file: file,
        name: file.name || "photo",
        size: file.size || 0,
        type: file.type || "",
        width: 0,
        height: 0,
        previewUrl: URL.createObjectURL(file)
      };
      additions.push(photo);
      state.selectedPhotos.push(photo);
      existing[localId] = true;
    });

    if (!additions.length) {
      setMessage("info", "Those photos are already selected.");
      return;
    }

    Promise.all(additions.map(inspectImage)).then(function () {
      setMessage("info", state.selectedPhotos.length + " photo" + (state.selectedPhotos.length === 1 ? "" : "s") + " selected.");
    });
    renderPage();
  }

  function removePhoto(localId) {
    var next = [];
    state.selectedPhotos.forEach(function (p) {
      if (p.localId === localId) {
        if (p.previewUrl) URL.revokeObjectURL(p.previewUrl);
      } else {
        next.push(p);
      }
    });
    state.selectedPhotos = next;
    renderPage();
  }

  function resetForm() {
    revokeAll();
    state.selectedPhotos = [];
    state.busy = false;
    state.modalOpen = false;
    state.modalClose = false;
    state.message = "";
    renderPage();
  }

  function loadCurrentMember() {
    state.loadingMember = true;
    renderPage();

    if (!window.$memberstackDom || typeof window.$memberstackDom.getCurrentMember !== "function") {
      state.loadingMember = false;
      state.currentMember = { id: "", email: "", firstName: "", lastName: "", displayName: "" };
      setMessage("error", "Member login could not be read. Confirm you are logged in before submitting.");
      return Promise.resolve();
    }

    return window.$memberstackDom.getCurrentMember().then(function (result) {
      var member = result && result.data ? result.data : null;
      if (!member) throw new Error("No current member.");

      var custom = member.customFields || member.custom_fields || {};
      var firstName = member.firstName || member.first_name || custom["first-name"] || custom.first_name || custom.firstName || "";
      var lastName = member.lastName || member.last_name || custom["last-name"] || custom.last_name || custom.lastName || "";
      var email = member.auth && member.auth.email ? member.auth.email : member.email || "";
      var displayName = member.name || custom.display_name || custom.displayName || custom["display-name"] || [firstName, lastName].filter(Boolean).join(" ") || email;

      state.currentMember = {
        id: member.id || "",
        email: email,
        firstName: firstName,
        lastName: lastName,
        displayName: displayName
      };
      state.loadingMember = false;
      state.message = "";
      renderPage();
    }).catch(function () {
      state.loadingMember = false;
      state.currentMember = { id: "", email: "", firstName: "", lastName: "", displayName: "" };
      setMessage("error", "Your member name could not be loaded. Confirm you are logged in before submitting.");
    });
  }

  function edgeHeaders() {
    return { "Content-Type": "text/plain;charset=UTF-8" };
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
        actor_email: state.currentMember.email || "member-gallery-submit",
        source: VERSION
      })
    }).then(function (r) {
      return r.text().then(function (txt) {
        var body = {};
        try { body = txt ? JSON.parse(txt) : {}; }
        catch (_err) { throw new Error("Edge returned non-JSON response: " + txt.slice(0, 160)); }
        if (!r.ok || !body.ok) throw new Error(body.error || ("Edge error " + r.status));
        return body;
      });
    });
  }

  function uploadPhotoToStorage(client, photo) {
    var fileName = safeFileName(photo.name);
    var path = CUSTOMER_KEY + "/pending/" + photo.galleryItemId + "/" + fileName;

    return client.storage.from(STORAGE_BUCKET).upload(path, photo.file, {
      cacheControl: "3600",
      upsert: false,
      contentType: photo.type || "image/jpeg"
    }).then(function (result) {
      if (result.error) throw result.error;
      return {
        gallery_item_id: photo.galleryItemId,
        storage_path: path,
        current_asset_url: publicStorageUrl(path),
        original_file_name: photo.name,
        original_file_size: photo.size,
        original_file_type: photo.type,
        original_width: photo.width || 0,
        original_height: photo.height || 0
      };
    });
  }

  async function submitPhotos() {
    var captionEl = byId("se-gs-caption");
    var creditEl = byId("se-gs-credit");
    var consentEl = byId("se-gs-consent");

    var caption = clean(captionEl && captionEl.value);
    var credit = clean(creditEl && creditEl.value);
    var submittedBy = currentSubmittedBy();

    if (!SUPABASE_ANON_KEY) {
      setMessage("error", "Missing Supabase publishable key on this page.");
      return;
    }
    if (!submittedBy) {
      setMessage("error", "Your member name could not be loaded. Confirm you are logged in before submitting.");
      return;
    }
    if (!state.selectedPhotos.length) {
      setMessage("error", "Select at least one photo before submitting.");
      return;
    }
    if (!caption) {
      setMessage("error", "Enter a caption before submitting.");
      return;
    }
    if (!consentEl || !consentEl.checked) {
      setMessage("error", "Confirm that you may submit this media before continuing.");
      return;
    }

    state.busy = true;
    state.modalOpen = true;
    state.modalClose = false;
    state.modalTitle = "Submitting your photos...";
    state.modalMessage = "Keep this page open while your photos upload to SyncEtc.";
    state.modalProgress = "Preparing upload...";
    state.modalPercent = 8;
    renderPage();

    try {
      await ensureSupabaseClient();
      var client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      var uploaded = [];

      for (var i = 0; i < state.selectedPhotos.length; i += 1) {
        var p = state.selectedPhotos[i];
        state.modalProgress = "Uploading photo " + (i + 1) + " of " + state.selectedPhotos.length + "...";
        state.modalPercent = Math.max(10, Math.round(((i + 0.25) / state.selectedPhotos.length) * 80));
        renderPage();

        var meta = await uploadPhotoToStorage(client, p);
        meta.photo_index = i + 1;
        meta.photo_count = state.selectedPhotos.length;
        uploaded.push(meta);

        state.modalPercent = Math.max(15, Math.round(((i + 1) / state.selectedPhotos.length) * 84));
        renderPage();
      }

      state.modalProgress = "Creating pending gallery review item" + (uploaded.length === 1 ? "" : "s") + "...";
      state.modalPercent = 90;
      renderPage();

      var body = await callEdge("create_photo_gallery_items", {
        caption: caption,
        attribution_display_name: credit,
        submitted_by_first: state.currentMember.firstName,
        submitted_by_last: state.currentMember.lastName,
        submitted_by_display: submittedBy,
        submitted_by_email: state.currentMember.email,
        memberstack_id: state.currentMember.id,
        photos: uploaded
      });

      state.busy = false;
      state.modalTitle = "Submission received";
      state.modalMessage = "Your photo submission was added to the Gallery review queue.";
      state.modalProgress = body.alert && body.alert.alert_text ? body.alert.alert_text : "Gallery Manager should now show the new pending item.";
      state.modalPercent = 100;
      state.modalClose = true;
      setMessage("success", "Submission received. Open Gallery Manager to review the pending item.");
      revokeAll();
      state.selectedPhotos = [];
      renderPage();
    } catch (err) {
      state.busy = false;
      state.modalTitle = "Submission failed";
      state.modalMessage = "The photo submission could not be completed.";
      state.modalProgress = err.message || String(err);
      state.modalPercent = 100;
      state.modalClose = true;
      setMessage("error", err.message || String(err));
      renderPage();
    }
  }

  function installStyles() {
    U().installStyle("PAGE-GALLERY-SUBMIT-v1-style", `
      .se-gs-page { max-width:1180px; margin:34px auto 56px; padding:0 18px; font-family:Arial,Helvetica,sans-serif; color:var(--se-aero-text,#1e2933); }
      .se-gs-shell { background:var(--se-aero-card,rgba(255,255,255,.94)); border:1px solid var(--se-aero-border,rgba(18,54,90,.16)); border-radius:var(--se-aero-radius-xl,26px); box-shadow:var(--se-aero-shadow,0 18px 50px rgba(12,38,64,.22)); overflow:hidden; }
      .se-gs-hero { padding:32px 34px 28px; background:linear-gradient(135deg,var(--se-aero-navy,#12365a),var(--se-aero-blue,#2f80c4)); color:#fff; }
      .se-gs-eyebrow { display:inline-flex; align-items:center; margin-bottom:12px; padding:6px 12px; border-radius:999px; background:rgba(255,255,255,.16); border:1px solid rgba(255,255,255,.24); font-size:12px; font-weight:900; letter-spacing:.08em; text-transform:uppercase; color:#fff; }
      .se-gs-hero h1 { margin:0; color:#fff; font-size:clamp(30px,4vw,48px); line-height:1.05; font-weight:900; letter-spacing:-.035em; }
      .se-gs-hero p { max-width:850px; margin:14px 0 0; color:rgba(255,255,255,.9); font-size:16px; line-height:1.6; }
      .se-gs-stats { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; margin-top:22px; }
      .se-gs-stat { padding:14px 16px; border-radius:14px; background:rgba(255,255,255,.14); border:1px solid rgba(255,255,255,.22); }
      .se-gs-stat strong { display:block; color:#fff; font-size:20px; line-height:1.1; }
      .se-gs-stat span { display:block; margin-top:5px; color:rgba(255,255,255,.82); font-size:13px; line-height:1.35; }
      .se-gs-main { display:grid; grid-template-columns:minmax(0,1.08fr) minmax(320px,.92fr); gap:22px; padding:26px; background:linear-gradient(180deg,rgba(234,245,255,.55),rgba(255,255,255,.86)); }
      .se-gs-panel { padding:22px; border-radius:20px; background:rgba(255,255,255,.86); border:1px solid var(--se-aero-border,rgba(18,54,90,.16)); box-shadow:0 8px 24px rgba(12,38,64,.08); }
      .se-gs-label { display:inline-flex; margin-bottom:10px; padding:5px 10px; border-radius:999px; background:var(--se-aero-sky,#eaf5ff); color:var(--se-aero-navy,#12365a); font-size:11px; font-weight:900; letter-spacing:.08em; text-transform:uppercase; }
      .se-gs-panel h2 { margin:0 0 10px; color:var(--se-aero-navy-dark,#0b2744); font-size:26px; line-height:1.18; font-weight:900; letter-spacing:-.02em; }
      .se-gs-panel p { margin:0 0 16px; font-size:14px; line-height:1.65; color:var(--se-aero-text,#1e2933); }
      .se-gs-form { display:grid; gap:16px; }
      .se-gs-field { display:grid; gap:7px; }
      .se-gs-field label { color:var(--se-aero-navy-dark,#0b2744); font-size:13px; font-weight:900; line-height:1.25; }
      .se-gs-help { color:var(--se-aero-muted,#5d6b78); font-size:13px; line-height:1.5; }
      .se-gs-input, .se-gs-textarea, .se-gs-readonly { width:100%; border:1px solid rgba(18,54,90,.18); border-radius:14px; background:#fff; color:var(--se-aero-text,#1e2933); font:inherit; font-size:14px; line-height:1.4; outline:none; }
      .se-gs-input { min-height:44px; padding:11px 13px; }
      .se-gs-textarea { min-height:104px; padding:12px 13px; resize:vertical; }
      .se-gs-readonly { min-height:44px; display:flex; align-items:center; padding:11px 13px; background:rgba(234,245,255,.82); color:var(--se-aero-navy-dark,#0b2744); font-weight:900; }
      .se-gs-input:focus, .se-gs-textarea:focus { border-color:rgba(47,128,196,.62); box-shadow:0 0 0 4px rgba(47,128,196,.12); }
      .se-gs-drop { position:relative; min-height:168px; padding:24px 18px; border-radius:16px; border:2px dashed rgba(18,54,90,.28); background:linear-gradient(180deg,rgba(234,245,255,.86),rgba(255,255,255,.92)); display:flex; align-items:center; justify-content:center; text-align:center; transition:.18s ease; cursor:pointer; }
      .se-gs-drop.drag { border-color:var(--se-aero-blue,#2f80c4); transform:translateY(-1px); }
      .se-gs-drop input { position:absolute; inset:0; opacity:0; cursor:pointer; }
      .se-gs-drop-inner { pointer-events:none; display:grid; gap:7px; justify-items:center; }
      .se-gs-drop-icon { width:52px; height:52px; border-radius:999px; display:inline-flex; align-items:center; justify-content:center; background:var(--se-aero-navy,#12365a); color:#fff; font-size:24px; font-weight:900; box-shadow:0 8px 18px rgba(18,54,90,.18); }
      .se-gs-drop-title { color:var(--se-aero-navy-dark,#0b2744); font-size:15px; line-height:1.35; font-weight:900; }
      .se-gs-drop-sub { color:var(--se-aero-muted,#5d6b78); font-size:13px; line-height:1.45; }
      .se-gs-preview { display:grid; gap:12px; margin-top:14px; }
      .se-gs-preview-item { display:grid; grid-template-columns:74px 1fr auto; gap:12px; align-items:center; padding:11px 13px; border-radius:14px; background:#fff; border:1px solid rgba(18,54,90,.11); }
      .se-gs-thumb { width:74px; height:56px; border-radius:10px; background:var(--se-aero-sky,#eaf5ff); border:1px solid rgba(18,54,90,.12); object-fit:contain; display:block; padding:3px; }
      .se-gs-title { margin:0; color:var(--se-aero-navy-dark,#0b2744); font-size:13px; font-weight:900; line-height:1.3; word-break:break-word; }
      .se-gs-meta { margin-top:3px; color:var(--se-aero-muted,#5d6b78); font-size:12px; line-height:1.35; word-break:break-word; }
      .se-gs-warning { margin-top:4px; color:#8a4d00; font-size:12px; line-height:1.35; font-weight:900; }
      .se-gs-consent { display:grid; grid-template-columns:auto 1fr; gap:10px; align-items:start; padding:14px 15px; border-radius:16px; background:rgba(234,245,255,.72); border:1px solid rgba(18,54,90,.16); }
      .se-gs-consent input { width:18px; height:18px; margin-top:2px; accent-color:var(--se-aero-navy,#12365a); }
      .se-gs-consent label { color:var(--se-aero-navy-dark,#0b2744); font-size:13px; font-weight:900; line-height:1.45; }
      .se-gs-note { margin-top:2px; padding:16px 18px; border-radius:16px; background:rgba(18,54,90,.06); border:1px solid rgba(18,54,90,.12); color:var(--se-aero-muted,#5d6b78); font-size:13px; line-height:1.55; }
      .se-gs-actions { display:flex; flex-wrap:wrap; gap:10px; align-items:center; margin-top:4px; }
      .se-gs-btn { display:inline-flex; align-items:center; justify-content:center; min-height:42px; padding:10px 16px; border-radius:999px; background:var(--se-aero-navy,#12365a); color:#fff; border:1px solid rgba(255,255,255,.14); box-shadow:0 8px 18px rgba(18,54,90,.18); text-decoration:none; font:inherit; font-size:13px; font-weight:900; line-height:1.1; cursor:pointer; transition:.18s ease; }
      .se-gs-btn:hover { transform:translateY(-1px); background:var(--se-aero-navy-dark,#0b2744); }
      .se-gs-btn.secondary { background:#fff; color:var(--se-aero-navy,#12365a); border:1px solid rgba(18,54,90,.22); box-shadow:none; }
      .se-gs-btn.secondary:hover { background:var(--se-aero-sky,#eaf5ff); color:var(--se-aero-navy,#12365a); box-shadow:none; }
      .se-gs-btn.small { min-height:36px; padding:8px 12px; font-size:12px; }
      .se-gs-btn[disabled] { opacity:.55; cursor:not-allowed; transform:none; box-shadow:none; }
      .se-gs-status { display:none; margin-top:2px; padding:14px 16px; border-radius:16px; border:1px solid rgba(18,54,90,.12); font-size:13px; line-height:1.55; font-weight:800; }
      .se-gs-status.show { display:block; }
      .se-gs-status.info { background:rgba(234,245,255,.92); color:var(--se-aero-navy-dark,#0b2744); }
      .se-gs-status.success { background:rgba(235,249,239,.96); border-color:rgba(25,128,62,.22); color:#14532d; }
      .se-gs-status.error { background:rgba(255,241,241,.96); border-color:rgba(180,35,24,.24); color:#7a1d16; }
      .se-gs-side-list { display:grid; gap:12px; margin-top:14px; }
      .se-gs-info-row { display:grid; grid-template-columns:42px 1fr; gap:12px; align-items:start; padding:13px; border-radius:14px; background:#fff; border:1px solid rgba(18,54,90,.11); }
      .se-gs-num { display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:999px; background:var(--se-aero-sky,#eaf5ff); color:var(--se-aero-navy,#12365a); font-size:13px; font-weight:900; }
      .se-gs-info-row strong { display:block; color:var(--se-aero-navy-dark,#0b2744); font-size:13px; line-height:1.35; margin-bottom:3px; }
      .se-gs-info-row span { display:block; color:var(--se-aero-muted,#5d6b78); font-size:13px; line-height:1.5; }
      .se-gs-modal { position:fixed; inset:0; z-index:2147483000; display:none; align-items:center; justify-content:center; padding:22px; background:rgba(7,24,42,.58); backdrop-filter:blur(4px); }
      .se-gs-modal.open { display:flex; }
      .se-gs-modal-card { width:min(520px,100%); border-radius:24px; background:#fff; border:1px solid rgba(18,54,90,.18); box-shadow:0 24px 70px rgba(0,0,0,.28); overflow:hidden; }
      .se-gs-modal-head { padding:22px 24px; background:linear-gradient(135deg,var(--se-aero-navy,#12365a),var(--se-aero-blue,#2f80c4)); color:#fff; }
      .se-gs-modal-head h3 { margin:0; color:#fff; font-size:24px; line-height:1.15; font-weight:900; letter-spacing:-.025em; }
      .se-gs-modal-body { padding:22px 24px 24px; }
      .se-gs-modal-body p { margin:0; color:var(--se-aero-text,#1e2933); font-size:14px; line-height:1.6; }
      .se-gs-progress-text { margin-top:14px; padding:13px 14px; border-radius:14px; background:rgba(234,245,255,.92); border:1px solid rgba(18,54,90,.12); color:var(--se-aero-navy-dark,#0b2744); font-size:13px; line-height:1.5; font-weight:900; }
      .se-gs-progress-track { width:100%; height:10px; margin-top:14px; border-radius:999px; background:rgba(18,54,90,.12); overflow:hidden; }
      .se-gs-progress-bar { height:100%; border-radius:999px; background:var(--se-aero-blue,#2f80c4); transition:width .22s ease; }
      .se-gs-modal-actions { display:none; margin-top:18px; justify-content:flex-end; gap:10px; }
      .se-gs-modal-actions.show { display:flex; }
      @media(max-width:980px){ .se-gs-main{grid-template-columns:1fr}.se-gs-stats{grid-template-columns:1fr} }
      @media(max-width:720px){ .se-gs-page{margin:24px auto 42px;padding:0 12px}.se-gs-hero{padding:26px 20px 22px}.se-gs-main{padding:18px}.se-gs-panel{padding:18px}.se-gs-preview-item{grid-template-columns:1fr}.se-gs-thumb{width:100%;height:130px;padding:6px}.se-gs-btn{width:100%} }
    `);
  }

  function renderPreview() {
    if (!state.selectedPhotos.length) return "";
    return '<div class="se-gs-preview">' + state.selectedPhotos.map(function (p, index) {
      var dimensions = p.width && p.height ? p.width + " × " + p.height + " px | " : "";
      var warn = p.width && p.width < MIN_RECOMMENDED_WIDTH ? '<div class="se-gs-warning">This image is under ' + MIN_RECOMMENDED_WIDTH + ' px wide and may look soft when enlarged.</div>' : "";
      return '<div class="se-gs-preview-item">' +
        '<img class="se-gs-thumb" src="' + esc(p.previewUrl) + '" alt="Selected photo preview">' +
        '<div><p class="se-gs-title">Photo ' + esc(index + 1) + ': ' + esc(p.name) + '</p><div class="se-gs-meta">' + esc(dimensions + formatBytes(p.size)) + '</div>' + warn + '</div>' +
        '<button type="button" class="se-gs-btn secondary small" data-se-gs-remove="' + esc(p.localId) + '">Remove</button>' +
      '</div>';
    }).join("") + '</div>';
  }

  function renderModal() {
    return '<div class="se-gs-modal ' + (state.modalOpen ? "open" : "") + '">' +
      '<div class="se-gs-modal-card" role="dialog" aria-modal="true">' +
        '<div class="se-gs-modal-head"><h3>' + esc(state.modalTitle || "Submitting your photos...") + '</h3></div>' +
        '<div class="se-gs-modal-body">' +
          '<p>' + esc(state.modalMessage || "Please keep this page open while your submission is processed.") + '</p>' +
          '<div class="se-gs-progress-text">' + esc(state.modalProgress || "Preparing upload...") + '</div>' +
          '<div class="se-gs-progress-track"><div class="se-gs-progress-bar" style="width:' + esc(state.modalPercent || 8) + '%"></div></div>' +
          '<div class="se-gs-modal-actions ' + (state.modalClose ? "show" : "") + '"><button type="button" class="se-gs-btn secondary" data-se-gs-close-modal>Close</button><button type="button" class="se-gs-btn" data-se-gs-open-admin>Open Gallery Manager</button></div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function renderPage() {
    installStyles();
    var submittedBy = state.loadingMember ? "Loading member name..." : (currentSubmittedBy() || "Member name unavailable");
    var statusClass = state.message ? "se-gs-status show " + state.messageType : "se-gs-status";
    var html = '<div class="se-gs-page"><div class="se-gs-shell">' +
      '<header class="se-gs-hero"><div class="se-gs-eyebrow">Member Gallery Submission</div><h1>Submit Photos</h1><p>Share club-appropriate photos for review and possible inclusion in the public gallery.</p>' +
      '<div class="se-gs-stats"><div class="se-gs-stat"><strong>Photos</strong><span>Upload up to 10 image files directly to SyncEtc.</span></div><div class="se-gs-stat"><strong>Review</strong><span>Submissions enter the Gallery Manager review queue.</span></div><div class="se-gs-stat"><strong>Videos later</strong><span>Video/YouTube workflow is deferred to the next layer.</span></div></div></header>' +
      '<main class="se-gs-main">' +
        '<section class="se-gs-panel"><span class="se-gs-label">Submission Form</span><h2>Share media with the club</h2><p>Add a short caption, use attribution only if someone else created the media, then submit the photos for review.</p>' +
          '<form class="se-gs-form" id="se-gs-form">' +
            '<div class="se-gs-field"><label>Submitted by</label><div class="se-gs-readonly">' + esc(submittedBy) + '</div><div class="se-gs-help">Pulled from the member login and preserved as the uploader/submission record.</div></div>' +
            '<div class="se-gs-field"><label>Photo upload</label><div class="se-gs-drop" id="se-gs-drop"><input id="se-gs-file" type="file" accept="image/*" multiple><div class="se-gs-drop-inner"><div class="se-gs-drop-icon">+</div><div class="se-gs-drop-title">Drag photos here or click to choose files</div><div class="se-gs-drop-sub">Images only. Up to 10 photos per submission. Each photo must be 10 MB or smaller.</div></div></div>' + renderPreview() + '</div>' +
            '<div class="se-gs-field"><label for="se-gs-caption">Caption</label><textarea id="se-gs-caption" class="se-gs-textarea" maxlength="500" placeholder="Briefly describe the photo. Example: Sunset approach into Morristown after a club flight."></textarea><div class="se-gs-help">For photo batches, this caption will be copied to each uploaded photo.</div></div>' +
            '<div class="se-gs-field"><label for="se-gs-credit">Attribution / credit override</label><input id="se-gs-credit" class="se-gs-input" type="text" maxlength="120" placeholder="Optional. Example: Photo by Jane Smith"><div class="se-gs-help">Use only when submitting someone else’s photo with permission. This overrides the public display credit, not the submitted-by record.</div></div>' +
            '<div class="se-gs-consent"><input type="checkbox" id="se-gs-consent"><label for="se-gs-consent">I confirm that I am the creator/copyright holder of this photo or have permission of the original creator/copyright holder to submit it, and that the club may review, publish, edit display details, and use it for club website, gallery, video, and social media purposes.</label></div>' +
            '<div class="se-gs-note">Do not submit anything unsafe, private, copyrighted by someone else without permission, or inappropriate for public display. Submissions may be reviewed, edited for display details, approved, or rejected.</div>' +
            '<div class="se-gs-actions"><button type="submit" class="se-gs-btn" ' + (state.busy ? "disabled" : "") + '>Submit to Gallery</button><button type="button" class="se-gs-btn secondary" data-se-gs-reset ' + (state.busy ? "disabled" : "") + '>Reset Form</button></div>' +
            '<div class="' + esc(statusClass) + '">' + esc(state.message) + '</div>' +
          '</form></section>' +
        '<aside class="se-gs-panel"><span class="se-gs-label">Before You Submit</span><h2>Quick checklist</h2><p>Use this page for club-appropriate gallery material only. The review process keeps the public gallery clean and organized.</p>' +
          '<div class="se-gs-side-list">' +
            '<div class="se-gs-info-row"><div class="se-gs-num">1</div><div><strong>Use clear, club-relevant media.</strong><span>Aircraft, airport, training, events, members, and club flying activity are good fits.</span></div></div>' +
            '<div class="se-gs-info-row"><div class="se-gs-num">2</div><div><strong>Submitted by is automatic.</strong><span>The submitting member is pulled from the logged-in account and cannot be overwritten.</span></div></div>' +
            '<div class="se-gs-info-row"><div class="se-gs-num">3</div><div><strong>Use attribution only for someone else’s work.</strong><span>If another person took the photo and gave permission, enter that person’s name for public credit.</span></div></div>' +
            '<div class="se-gs-info-row"><div class="se-gs-num">4</div><div><strong>Allow time for review.</strong><span>Submitted photos appear in Gallery Manager first, then become public after approval.</span></div></div>' +
          '</div><div class="se-gs-note">Public gallery credit order: attribution first, submitted-by member name second.</div></aside>' +
      '</main></div></div>' + renderModal();

    if (state.shell) state.shell.render(html);
    else {
      var mount = byId("syncetc-webflow-mount") || document.body;
      mount.innerHTML = html;
    }
  }

  function bind() {
    document.addEventListener("change", function (e) {
      if (e.target && e.target.id === "se-gs-file") {
        addFiles(e.target.files);
        e.target.value = "";
      }
    });

    document.addEventListener("dragenter", function (e) {
      var drop = e.target.closest && e.target.closest("#se-gs-drop");
      if (drop) { e.preventDefault(); drop.classList.add("drag"); }
    });
    document.addEventListener("dragover", function (e) {
      var drop = e.target.closest && e.target.closest("#se-gs-drop");
      if (drop) { e.preventDefault(); drop.classList.add("drag"); }
    });
    document.addEventListener("dragleave", function (e) {
      var drop = e.target.closest && e.target.closest("#se-gs-drop");
      if (drop) { e.preventDefault(); drop.classList.remove("drag"); }
    });
    document.addEventListener("drop", function (e) {
      var drop = e.target.closest && e.target.closest("#se-gs-drop");
      if (drop) {
        e.preventDefault();
        drop.classList.remove("drag");
        if (e.dataTransfer && e.dataTransfer.files) addFiles(e.dataTransfer.files);
      }
    });

    document.addEventListener("click", function (e) {
      var rem = e.target.closest && e.target.closest("[data-se-gs-remove]");
      if (rem) {
        removePhoto(rem.getAttribute("data-se-gs-remove"));
        return;
      }
      if (e.target.closest && e.target.closest("[data-se-gs-reset]")) {
        resetForm();
        return;
      }
      if (e.target.closest && e.target.closest("[data-se-gs-close-modal]")) {
        state.modalOpen = false;
        renderPage();
        return;
      }
      if (e.target.closest && e.target.closest("[data-se-gs-open-admin]")) {
        window.prompt("SyncEtc JS file to load:", "PAGE-GALLERY-ADMIN-v1B.js");
        return;
      }
    });

    document.addEventListener("submit", function (e) {
      if (e.target && e.target.id === "se-gs-form") {
        e.preventDefault();
        submitPhotos();
      }
    });

    window.addEventListener("beforeunload", function (e) {
      if (!state.selectedPhotos.length || state.modalClose) return;
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
          pageKey: "gallery-submit",
          audience: "member",
          version: VERSION,
          showBanner: false
        });
      }

      bind();
      renderPage();
      loadCurrentMember();
    }).catch(function (err) {
      state.messageType = "error";
      state.message = err.message || String(err);
      renderPage();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
/* PAGE-GALLERY-SUBMIT-v1.js - END */
