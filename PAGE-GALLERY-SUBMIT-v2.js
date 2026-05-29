/* PAGE-GALLERY-SUBMIT-v2.js - BEGIN */
(function () {
  "use strict";

  var VERSION = "PAGE-GALLERY-SUBMIT-v2";
  var CUSTOMER_KEY = "demo_flying_club";
  var CUSTOMER_LABEL = "Demo Flying Club";
  var SUPABASE_URL = "https://ocdaohkiwonjmirqkjww.supabase.co";
  var SUPABASE_ANON_KEY = window.SYNCETC_SUPABASE_ANON_KEY || window.SUPABASE_ANON_KEY || "";
  var PROFILE_EDGE_URL = SUPABASE_URL + "/functions/v1/syncetc-auth-profile";
  var SUBMIT_EDGE_URL = SUPABASE_URL + "/functions/v1/syncetc-gallery-submit";
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
    client: null,
    loading: true,
    busy: false,
    session: null,
    profile: null,
    resolved: null,
    selectedPhotos: [],
    message: "",
    messageType: "info",
    modalOpen: false,
    modalTitle: "",
    modalMessage: "",
    modalProgress: "",
    modalPercent: 8,
    modalClose: false
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
    return COMPONENT_FILES.reduce(function (p, file) { return p.then(function () { return loadScriptOnce(base + file); }); }, Promise.resolve());
  }

  function ensureSupabaseClient() {
    if (window.supabase && typeof window.supabase.createClient === "function") return Promise.resolve();
    return loadScriptOnce("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2");
  }

  function U() {
    if (window.SyncEtc && window.SyncEtc.Components && window.SyncEtc.Components.Utils) return window.SyncEtc.Components.Utils;
    return {
      esc: function (v) { return String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;"); },
      installStyle: function (id, css) { var existing = document.getElementById(id); if (existing) existing.remove(); var style = document.createElement("style"); style.id = id; style.textContent = css; document.head.appendChild(style); }
    };
  }

  function esc(v) { return U().esc(v); }
  function clean(v) { return (v == null ? "" : String(v)).trim(); }
  function byId(id) { return document.getElementById(id); }
  function token() { return state.session && state.session.access_token ? state.session.access_token : ""; }
  function currentEmail() { return state.session && state.session.user ? state.session.user.email || "" : ""; }

  function setMessage(type, msg) { state.messageType = type || "info"; state.message = msg || ""; render(); }
  function uuid() { return crypto && crypto.randomUUID ? crypto.randomUUID() : "photo-" + Date.now() + "-" + Math.random().toString(36).slice(2); }

  function formatBytes(bytes) {
    var units = ["B", "KB", "MB", "GB"], size = bytes || 0, i = 0;
    while (size >= 1024 && i < units.length - 1) { size /= 1024; i += 1; }
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

  function submittedByDisplay() {
    var active = state.resolved && state.resolved.active_customer ? state.resolved.active_customer : null;
    return clean(active && active.display_name_for_customer) || clean(state.profile && state.profile.display_name) || currentEmail();
  }

  function hasDemoAccess() {
    var memberships = state.resolved && state.resolved.customer_memberships ? state.resolved.customer_memberships : [];
    return memberships.some(function (m) { return m.customer_key === CUSTOMER_KEY; });
  }

  function inspectImage(photo) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () { photo.width = img.naturalWidth || 0; photo.height = img.naturalHeight || 0; resolve(photo); };
      img.onerror = function () { photo.width = 0; photo.height = 0; resolve(photo); };
      img.src = photo.previewUrl;
    });
  }

  function revokeAll() { state.selectedPhotos.forEach(function (p) { if (p.previewUrl) URL.revokeObjectURL(p.previewUrl); }); }

  function addFiles(fileList) {
    var files = Array.prototype.slice.call(fileList || []);
    if (!files.length) return;
    if (files.some(function (file) { return !(file && file.type && file.type.indexOf("image/") === 0); })) return setMessage("error", "Please choose image files only.");
    var oversized = files.filter(function (file) { return file && file.size > MAX_PHOTO_BYTES; });
    if (oversized.length) return setMessage("error", "Photos must be 10 MB or smaller. Oversized file: " + (oversized[0].name || "unnamed file"));
    var slots = MAX_PHOTOS - state.selectedPhotos.length;
    if (slots <= 0) return setMessage("error", "You already selected the maximum of " + MAX_PHOTOS + " photos.");
    if (files.length > slots) return setMessage("error", "You can upload up to " + MAX_PHOTOS + " photos per submission. You have " + slots + " open slot" + (slots === 1 ? "" : "s") + ".");

    var existing = {};
    state.selectedPhotos.forEach(function (p) { existing[p.localId] = true; });
    var additions = [];
    files.forEach(function (file) {
      var localId = [file.name, file.size, file.lastModified].join("|");
      if (existing[localId]) return;
      var photo = { localId: localId, galleryItemId: uuid(), file: file, name: file.name || "photo", size: file.size || 0, type: file.type || "", width: 0, height: 0, previewUrl: URL.createObjectURL(file) };
      additions.push(photo);
      state.selectedPhotos.push(photo);
      existing[localId] = true;
    });
    Promise.all(additions.map(inspectImage)).then(function () { setMessage("info", state.selectedPhotos.length + " photo" + (state.selectedPhotos.length === 1 ? "" : "s") + " selected."); });
    render();
  }

  function removePhoto(localId) {
    var next = [];
    state.selectedPhotos.forEach(function (p) { if (p.localId === localId) { if (p.previewUrl) URL.revokeObjectURL(p.previewUrl); } else next.push(p); });
    state.selectedPhotos = next;
    render();
  }

  async function resolveProfile() {
    if (!token()) return;
    var response = await fetch(PROFILE_EDGE_URL, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token() },
      body: JSON.stringify({ action: "current_profile", source: VERSION })
    });
    var body = await response.json();
    if (!response.ok || !body.ok) throw new Error(body.error || "Could not resolve SyncEtc profile");
    state.resolved = body;
    state.profile = body.profile || null;
  }

  async function refreshSession() {
    state.loading = true;
    render();
    var result = await state.client.auth.getSession();
    state.session = result.data && result.data.session ? result.data.session : null;
    if (state.session) await resolveProfile();
    state.loading = false;
    render();
  }

  async function login(email, password) {
    state.busy = true;
    setMessage("info", "Signing in...");
    try {
      var result = await state.client.auth.signInWithPassword({ email: email, password: password });
      if (result.error) throw result.error;
      state.session = result.data.session || null;
      await resolveProfile();
      state.busy = false;
      setMessage("success", "Signed in. Demo Flying Club access resolved.");
    } catch (err) {
      state.busy = false;
      setMessage("error", err.message || String(err));
    }
  }

  async function logout() {
    state.busy = true;
    try {
      await state.client.auth.signOut();
      state.session = null;
      state.profile = null;
      state.resolved = null;
      state.busy = false;
      setMessage("success", "Signed out.");
    } catch (err) {
      state.busy = false;
      setMessage("error", err.message || String(err));
    }
  }

  async function uploadPhotoToStorage(photo) {
    var fileName = safeFileName(photo.name);
    var path = CUSTOMER_KEY + "/pending/" + photo.galleryItemId + "/" + fileName;
    var result = await state.client.storage.from(STORAGE_BUCKET).upload(path, photo.file, {
      cacheControl: "3600",
      upsert: false,
      contentType: photo.type || "image/jpeg"
    });
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
  }

  async function submitPhotos() {
    var caption = clean(byId("se-gs2-caption") && byId("se-gs2-caption").value);
    var credit = clean(byId("se-gs2-credit") && byId("se-gs2-credit").value);
    var consent = byId("se-gs2-consent") && byId("se-gs2-consent").checked;

    if (!state.session) return setMessage("error", "Sign in before submitting photos.");
    if (!hasDemoAccess()) return setMessage("error", "This login does not have Demo Flying Club access.");
    if (!state.selectedPhotos.length) return setMessage("error", "Select at least one photo before submitting.");
    if (!caption) return setMessage("error", "Enter a caption before submitting.");
    if (!consent) return setMessage("error", "Confirm that you may submit this media before continuing.");

    state.busy = true;
    state.modalOpen = true;
    state.modalClose = false;
    state.modalTitle = "Submitting to " + CUSTOMER_LABEL;
    state.modalMessage = "Keep this page open while SyncEtc uploads your photos.";
    state.modalProgress = "Preparing upload...";
    state.modalPercent = 8;
    render();

    try {
      var uploaded = [];
      for (var i = 0; i < state.selectedPhotos.length; i += 1) {
        state.modalProgress = "Uploading photo " + (i + 1) + " of " + state.selectedPhotos.length + "...";
        state.modalPercent = Math.max(10, Math.round(((i + 0.25) / state.selectedPhotos.length) * 80));
        render();
        var meta = await uploadPhotoToStorage(state.selectedPhotos[i]);
        meta.photo_index = i + 1;
        meta.photo_count = state.selectedPhotos.length;
        uploaded.push(meta);
        state.modalPercent = Math.max(15, Math.round(((i + 1) / state.selectedPhotos.length) * 84));
        render();
      }

      state.modalProgress = "Creating pending Gallery Manager item" + (uploaded.length === 1 ? "" : "s") + "...";
      state.modalPercent = 90;
      render();

      var response = await fetch(SUBMIT_EDGE_URL, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token() },
        body: JSON.stringify({
          action: "create_photo_gallery_items",
          customer_key: CUSTOMER_KEY,
          payload: { customer_key: CUSTOMER_KEY, caption: caption, attribution_display_name: credit, photos: uploaded },
          source: VERSION
        })
      });
      var body = await response.json();
      if (!response.ok || !body.ok) throw new Error(body.error || "Submission failed");

      state.busy = false;
      state.modalTitle = "Submission received";
      state.modalMessage = "Your photo submission was added to the Demo Flying Club review queue.";
      state.modalProgress = body.alert && body.alert.alert_text ? body.alert.alert_text : "Gallery Manager should now show the pending item.";
      state.modalPercent = 100;
      state.modalClose = true;
      revokeAll();
      state.selectedPhotos = [];
      setMessage("success", "Submission received for " + CUSTOMER_LABEL + ".");
      render();
    } catch (err) {
      state.busy = false;
      state.modalTitle = "Submission failed";
      state.modalMessage = "The submission could not be completed.";
      state.modalProgress = err.message || String(err);
      state.modalPercent = 100;
      state.modalClose = true;
      setMessage("error", err.message || String(err));
      render();
    }
  }

  function installStyles() {
    U().installStyle("PAGE-GALLERY-SUBMIT-v2-style", `
      .se-gs2-page{max-width:1180px;margin:34px auto 56px;padding:0 18px;font-family:Arial,Helvetica,sans-serif;color:var(--se-aero-text,#1e2933)}
      .se-gs2-shell{background:rgba(255,255,255,.94);border:1px solid rgba(18,54,90,.16);border-radius:26px;box-shadow:0 18px 50px rgba(12,38,64,.22);overflow:hidden}
      .se-gs2-hero{padding:30px 34px 26px;background:linear-gradient(135deg,var(--se-aero-navy,#12365a),var(--se-aero-blue,#2f80c4));color:#fff}
      .se-gs2-eyebrow{display:inline-flex;margin-bottom:12px;padding:6px 12px;border-radius:999px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.24);font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:#fff}
      .se-gs2-hero h1{margin:0;color:#fff;font-size:clamp(30px,4vw,46px);line-height:1.05;font-weight:900;letter-spacing:-.035em}.se-gs2-hero p{max-width:850px;margin:14px 0 0;color:rgba(255,255,255,.9);font-size:16px;line-height:1.6}
      .se-gs2-main{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(320px,.92fr);gap:22px;padding:26px;background:linear-gradient(180deg,rgba(234,245,255,.55),rgba(255,255,255,.86))}
      .se-gs2-panel{padding:22px;border-radius:20px;background:rgba(255,255,255,.88);border:1px solid rgba(18,54,90,.16);box-shadow:0 8px 24px rgba(12,38,64,.08)}
      .se-gs2-label{display:inline-flex;margin-bottom:10px;padding:5px 10px;border-radius:999px;background:var(--se-aero-sky,#eaf5ff);color:var(--se-aero-navy,#12365a);font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
      .se-gs2-panel h2{margin:0 0 12px;color:var(--se-aero-navy-dark,#0b2744);font-size:25px;line-height:1.18;font-weight:900;letter-spacing:-.02em}.se-gs2-panel p{margin:0 0 15px;font-size:14px;line-height:1.65;color:var(--se-aero-text,#1e2933)}
      .se-gs2-form{display:grid;gap:14px}.se-gs2-field{display:grid;gap:7px}.se-gs2-field label{color:var(--se-aero-navy-dark,#0b2744);font-size:13px;font-weight:900}.se-gs2-help{color:var(--se-aero-muted,#5d6b78);font-size:13px;line-height:1.5}
      .se-gs2-input,.se-gs2-textarea,.se-gs2-readonly{width:100%;border:1px solid rgba(18,54,90,.18);border-radius:14px;background:#fff;color:var(--se-aero-text,#1e2933);font:inherit;font-size:14px;line-height:1.4;outline:none}.se-gs2-input{min-height:44px;padding:11px 13px}.se-gs2-textarea{min-height:104px;padding:12px 13px;resize:vertical}.se-gs2-readonly{min-height:44px;display:flex;align-items:center;padding:11px 13px;background:rgba(234,245,255,.82);color:var(--se-aero-navy-dark,#0b2744);font-weight:900}
      .se-gs2-drop{position:relative;min-height:168px;padding:24px 18px;border-radius:16px;border:2px dashed rgba(18,54,90,.28);background:linear-gradient(180deg,rgba(234,245,255,.86),rgba(255,255,255,.92));display:flex;align-items:center;justify-content:center;text-align:center;cursor:pointer}.se-gs2-drop.drag{border-color:var(--se-aero-blue,#2f80c4)}.se-gs2-drop input{position:absolute;inset:0;opacity:0;cursor:pointer}.se-gs2-drop-inner{pointer-events:none;display:grid;gap:7px;justify-items:center}.se-gs2-drop-icon{width:52px;height:52px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;background:var(--se-aero-navy,#12365a);color:#fff;font-size:24px;font-weight:900}
      .se-gs2-preview{display:grid;gap:12px;margin-top:14px}.se-gs2-preview-item{display:grid;grid-template-columns:74px 1fr auto;gap:12px;align-items:center;padding:11px 13px;border-radius:14px;background:#fff;border:1px solid rgba(18,54,90,.11)}.se-gs2-thumb{width:74px;height:56px;border-radius:10px;background:var(--se-aero-sky,#eaf5ff);border:1px solid rgba(18,54,90,.12);object-fit:contain;padding:3px}.se-gs2-title{margin:0;color:var(--se-aero-navy-dark,#0b2744);font-size:13px;font-weight:900;word-break:break-word}.se-gs2-meta{margin-top:3px;color:var(--se-aero-muted,#5d6b78);font-size:12px}.se-gs2-warning{margin-top:4px;color:#8a4d00;font-size:12px;font-weight:900}
      .se-gs2-consent{display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;padding:14px 15px;border-radius:16px;background:rgba(234,245,255,.72);border:1px solid rgba(18,54,90,.16)}.se-gs2-consent input{width:18px;height:18px;margin-top:2px}.se-gs2-consent label{color:var(--se-aero-navy-dark,#0b2744);font-size:13px;font-weight:900;line-height:1.45}
      .se-gs2-btn{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:10px 16px;border-radius:999px;background:var(--se-aero-navy,#12365a);color:#fff;border:1px solid rgba(255,255,255,.14);box-shadow:0 8px 18px rgba(18,54,90,.18);text-decoration:none;font:inherit;font-size:13px;font-weight:900;cursor:pointer}.se-gs2-btn.secondary{background:#fff;color:var(--se-aero-navy,#12365a);border:1px solid rgba(18,54,90,.22);box-shadow:none}.se-gs2-btn.small{min-height:36px;padding:8px 12px;font-size:12px}.se-gs2-btn[disabled]{opacity:.55;cursor:not-allowed}
      .se-gs2-actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center}.se-gs2-status{display:none;margin-top:14px;padding:14px 16px;border-radius:16px;border:1px solid rgba(18,54,90,.12);font-size:13px;line-height:1.55;font-weight:800}.se-gs2-status.show{display:block}.se-gs2-status.info{background:rgba(234,245,255,.92);color:var(--se-aero-navy-dark,#0b2744)}.se-gs2-status.success{background:rgba(235,249,239,.96);border-color:rgba(25,128,62,.22);color:#14532d}.se-gs2-status.error{background:rgba(255,241,241,.96);border-color:rgba(180,35,24,.24);color:#7a1d16}
      .se-gs2-note{margin-top:14px;padding:14px 16px;border-radius:16px;background:rgba(18,54,90,.06);border:1px solid rgba(18,54,90,.12);color:var(--se-aero-muted,#5d6b78);font-size:13px;line-height:1.55}.se-gs2-list{display:grid;gap:12px}.se-gs2-row{padding:13px;border-radius:14px;background:#fff;border:1px solid rgba(18,54,90,.11)}.se-gs2-row strong{display:block;color:var(--se-aero-navy-dark,#0b2744);font-size:13px;margin-bottom:4px}.se-gs2-row span{display:block;color:var(--se-aero-muted,#5d6b78);font-size:13px;line-height:1.5}
      .se-gs2-modal{position:fixed;inset:0;z-index:2147483000;display:none;align-items:center;justify-content:center;padding:22px;background:rgba(7,24,42,.58);backdrop-filter:blur(4px)}.se-gs2-modal.open{display:flex}.se-gs2-modal-card{width:min(520px,100%);border-radius:24px;background:#fff;box-shadow:0 24px 70px rgba(0,0,0,.28);overflow:hidden}.se-gs2-modal-head{padding:22px 24px;background:linear-gradient(135deg,var(--se-aero-navy,#12365a),var(--se-aero-blue,#2f80c4));color:#fff}.se-gs2-modal-head h3{margin:0;color:#fff;font-size:24px}.se-gs2-modal-body{padding:22px 24px}.se-gs2-progress-text{margin-top:14px;padding:13px 14px;border-radius:14px;background:rgba(234,245,255,.92);font-size:13px;font-weight:900}.se-gs2-progress-track{width:100%;height:10px;margin-top:14px;border-radius:999px;background:rgba(18,54,90,.12);overflow:hidden}.se-gs2-progress-bar{height:100%;background:var(--se-aero-blue,#2f80c4)}.se-gs2-modal-actions{display:none;margin-top:18px;justify-content:flex-end}.se-gs2-modal-actions.show{display:flex}
      @media(max-width:980px){.se-gs2-main{grid-template-columns:1fr}}@media(max-width:720px){.se-gs2-page{margin:24px auto 42px;padding:0 12px}.se-gs2-hero{padding:26px 20px}.se-gs2-main{padding:18px}.se-gs2-panel{padding:18px}.se-gs2-preview-item{grid-template-columns:1fr}.se-gs2-thumb{width:100%;height:130px}.se-gs2-btn{width:100%}}
    `);
  }

  function renderPreview() {
    if (!state.selectedPhotos.length) return "";
    return '<div class="se-gs2-preview">' + state.selectedPhotos.map(function (p, index) {
      var dimensions = p.width && p.height ? p.width + " × " + p.height + " px | " : "";
      var warn = p.width && p.width < MIN_RECOMMENDED_WIDTH ? '<div class="se-gs2-warning">This image is under ' + MIN_RECOMMENDED_WIDTH + ' px wide and may look soft when enlarged.</div>' : "";
      return '<div class="se-gs2-preview-item"><img class="se-gs2-thumb" src="' + esc(p.previewUrl) + '" alt="Selected photo preview"><div><p class="se-gs2-title">Photo ' + esc(index + 1) + ': ' + esc(p.name) + '</p><div class="se-gs2-meta">' + esc(dimensions + formatBytes(p.size)) + '</div>' + warn + '</div><button type="button" class="se-gs2-btn secondary small" data-se-gs2-remove="' + esc(p.localId) + '">Remove</button></div>';
    }).join("") + '</div>';
  }

  function renderModal() {
    return '<div class="se-gs2-modal ' + (state.modalOpen ? "open" : "") + '"><div class="se-gs2-modal-card" role="dialog" aria-modal="true"><div class="se-gs2-modal-head"><h3>' + esc(state.modalTitle || "Submitting") + '</h3></div><div class="se-gs2-modal-body"><p>' + esc(state.modalMessage || "") + '</p><div class="se-gs2-progress-text">' + esc(state.modalProgress || "") + '</div><div class="se-gs2-progress-track"><div class="se-gs2-progress-bar" style="width:' + esc(state.modalPercent || 8) + '%"></div></div><div class="se-gs2-modal-actions ' + (state.modalClose ? "show" : "") + '"><button type="button" class="se-gs2-btn" data-se-gs2-close-modal>Close</button></div></div></div></div>';
  }

  function renderLoginPanel() {
    return '<span class="se-gs2-label">SyncEtc Login</span><h2>Sign in to ' + esc(CUSTOMER_LABEL) + '</h2><p>This test uses Supabase Auth, not Memberstack.</p><form class="se-gs2-form" id="se-gs2-login"><div class="se-gs2-field"><label>Email</label><input id="se-gs2-email" class="se-gs2-input" type="email" value="frank@syncetc.com" autocomplete="username"></div><div class="se-gs2-field"><label>Password</label><input id="se-gs2-password" class="se-gs2-input" type="password" autocomplete="current-password"></div><div class="se-gs2-actions"><button class="se-gs2-btn" type="submit" ' + (state.busy ? "disabled" : "") + '>Sign In</button></div></form>';
  }

  function renderSubmitPanel() {
    var access = hasDemoAccess();
    return '<span class="se-gs2-label">Gallery Submit</span><h2>Submit photos to ' + esc(CUSTOMER_LABEL) + '</h2><p>Add a caption, use attribution only if someone else created the photo, then submit for review.</p>' +
      '<div class="se-gs2-form"><div class="se-gs2-field"><label>Submitted by</label><div class="se-gs2-readonly">' + esc(submittedByDisplay() || currentEmail()) + '</div><div class="se-gs2-help">Resolved from Supabase Auth and SyncEtc profile/membership tables.</div></div>' +
      (access ? '' : '<div class="se-gs2-status show error">This login does not have Demo Flying Club access.</div>') +
      '<div class="se-gs2-field"><label>Photo upload</label><div class="se-gs2-drop" id="se-gs2-drop"><input id="se-gs2-file" type="file" accept="image/*" multiple><div class="se-gs2-drop-inner"><div class="se-gs2-drop-icon">+</div><div><strong>Drag photos here or click to choose files</strong></div><div class="se-gs2-help">Images only. Up to 10 photos. Each photo must be 10 MB or smaller.</div></div></div>' + renderPreview() + '</div>' +
      '<div class="se-gs2-field"><label>Caption</label><textarea id="se-gs2-caption" class="se-gs2-textarea" maxlength="500" placeholder="Briefly describe the photo."></textarea><div class="se-gs2-help">For photo batches, this caption will be copied to each uploaded photo.</div></div>' +
      '<div class="se-gs2-field"><label>Attribution / credit override</label><input id="se-gs2-credit" class="se-gs2-input" type="text" maxlength="120" placeholder="Optional. Example: Photo by Jane Smith"><div class="se-gs2-help">Use only when submitting someone else’s photo with permission.</div></div>' +
      '<div class="se-gs2-consent"><input type="checkbox" id="se-gs2-consent"><label for="se-gs2-consent">I confirm that I am the creator/copyright holder of this photo or have permission to submit it, and that it may be reviewed and published for this demo customer.</label></div>' +
      '<div class="se-gs2-actions"><button type="button" class="se-gs2-btn" data-se-gs2-submit ' + (state.busy || !access ? "disabled" : "") + '>Submit to Gallery</button><button type="button" class="se-gs2-btn secondary" data-se-gs2-logout>Sign Out</button></div></div>';
  }

  function render() {
    installStyles();
    var statusClass = state.message ? "se-gs2-status show " + state.messageType : "se-gs2-status";
    var html = '<div class="se-gs2-page"><div class="se-gs2-shell"><header class="se-gs2-hero"><div class="se-gs2-eyebrow">Supabase Auth Gallery Submit</div><h1>' + esc(CUSTOMER_LABEL) + ' Photo Submit</h1><p>Test member-side gallery submission using SyncEtc/Supabase login and fake demo-customer data.</p></header><main class="se-gs2-main"><section class="se-gs2-panel">' + (state.session ? renderSubmitPanel() : renderLoginPanel()) + '<div class="' + esc(statusClass) + '">' + esc(state.message) + '</div></section><aside class="se-gs2-panel"><span class="se-gs2-label">Test Scope</span><h2>What this verifies</h2><div class="se-gs2-list"><div class="se-gs2-row"><strong>Customer</strong><span>Rows are created under demo_flying_club, not 150th Aero.</span></div><div class="se-gs2-row"><strong>Identity</strong><span>Submitted-by is resolved from Supabase Auth, not Memberstack.</span></div><div class="se-gs2-row"><strong>Review queue</strong><span>Rows are pending: approved=false, rejected=false, archived=false, draft=false.</span></div><div class="se-gs2-row"><strong>Videos</strong><span>Video/YouTube workflow remains deferred.</span></div></div><div class="se-gs2-note">Current login: ' + esc(currentEmail() || "not signed in") + '</div></aside></main></div></div>' + renderModal();

    if (state.shell) state.shell.render(html);
    else {
      var mount = byId("syncetc-webflow-mount") || document.body;
      mount.innerHTML = html;
    }
  }

  function bind() {
    document.addEventListener("submit", function (e) {
      if (e.target && e.target.id === "se-gs2-login") {
        e.preventDefault();
        login(clean(byId("se-gs2-email").value), byId("se-gs2-password").value || "");
      }
    });
    document.addEventListener("change", function (e) {
      if (e.target && e.target.id === "se-gs2-file") { addFiles(e.target.files); e.target.value = ""; }
    });
    document.addEventListener("click", function (e) {
      var rem = e.target.closest && e.target.closest("[data-se-gs2-remove]");
      if (rem) return removePhoto(rem.getAttribute("data-se-gs2-remove"));
      if (e.target.closest && e.target.closest("[data-se-gs2-submit]")) return submitPhotos();
      if (e.target.closest && e.target.closest("[data-se-gs2-logout]")) return logout();
      if (e.target.closest && e.target.closest("[data-se-gs2-close-modal]")) { state.modalOpen = false; render(); return; }
    });
    document.addEventListener("dragover", function (e) { var drop = e.target.closest && e.target.closest("#se-gs2-drop"); if (drop) { e.preventDefault(); drop.classList.add("drag"); } });
    document.addEventListener("dragleave", function (e) { var drop = e.target.closest && e.target.closest("#se-gs2-drop"); if (drop) { e.preventDefault(); drop.classList.remove("drag"); } });
    document.addEventListener("drop", function (e) { var drop = e.target.closest && e.target.closest("#se-gs2-drop"); if (drop) { e.preventDefault(); drop.classList.remove("drag"); if (e.dataTransfer && e.dataTransfer.files) addFiles(e.dataTransfer.files); } });
    window.addEventListener("beforeunload", function (e) { if (!state.selectedPhotos.length || state.modalClose) return; e.preventDefault(); e.returnValue = ""; });
  }

  function init() {
    ensureComponents().then(ensureSupabaseClient).then(function () {
      if (!SUPABASE_ANON_KEY) throw new Error("Missing SYNCETC_SUPABASE_ANON_KEY on this page.");
      state.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      var mountId = "syncetc-webflow-mount";
      var mount = byId(mountId);
      if (!mount) { mount = document.createElement("div"); mount.id = mountId; document.body.appendChild(mount); }
      if (window.SyncEtc && window.SyncEtc.Components && window.SyncEtc.Components.SiteShell) {
        state.shell = window.SyncEtc.Components.SiteShell.create(mountId, { pageKey: "gallery-submit", audience: "customer_member", version: VERSION, showBanner: false });
      }
      bind();
      return refreshSession();
    }).catch(function (err) {
      state.loading = false;
      state.busy = false;
      setMessage("error", err.message || String(err));
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
/* PAGE-GALLERY-SUBMIT-v2.js - END */
