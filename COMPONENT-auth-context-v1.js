/* COMPONENT-auth-context-v1.js - BEGIN */
(function () {
  "use strict";

  window.SyncEtc = window.SyncEtc || {};
  window.SyncEtc.Components = window.SyncEtc.Components || {};

  var VERSION = "COMPONENT-auth-context-v1";
  var DEFAULT_SUPABASE_URL = "https://ocdaohkiwonjmirqkjww.supabase.co";
  var DEFAULT_PROFILE_FUNCTION = "syncetc-auth-profile";
  var STORAGE_KEY_ACTIVE_CUSTOMER = "syncetc_active_customer_key";

  var state = {
    initialized: false,
    loading: false,
    busy: false,
    supabaseUrl: DEFAULT_SUPABASE_URL,
    anonKey: "",
    profileEdgeUrl: "",
    client: null,
    session: null,
    user: null,
    context: null,
    lastError: "",
    subscribers: []
  };

  function clean(value) {
    return value == null ? "" : String(value).trim();
  }

  function loadScriptOnce(src) {
    return new Promise(function (resolve, reject) {
      if (window.supabase && typeof window.supabase.createClient === "function") return resolve();
      var existing = Array.prototype.slice.call(document.scripts).find(function (s) { return s.src === src; });
      if (existing) {
        existing.addEventListener("load", function () { resolve(); });
        existing.addEventListener("error", function () { reject(new Error("Could not load " + src)); });
        return;
      }
      var script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = function () { resolve(); };
      script.onerror = function () { reject(new Error("Could not load " + src)); };
      document.head.appendChild(script);
    });
  }

  function clone(obj) {
    return obj ? JSON.parse(JSON.stringify(obj)) : obj;
  }

  function notify() {
    var snapshot = getSnapshot();
    state.subscribers.forEach(function (fn) {
      try { fn(snapshot); } catch (_err) {}
    });
  }

  function getToken() {
    return state.session && state.session.access_token ? state.session.access_token : "";
  }

  function selectedCustomerKey() {
    try {
      return clean(window.localStorage.getItem(STORAGE_KEY_ACTIVE_CUSTOMER));
    } catch (_err) {
      return "";
    }
  }

  function rememberCustomerKey(customerKey) {
    try {
      if (customerKey) window.localStorage.setItem(STORAGE_KEY_ACTIVE_CUSTOMER, customerKey);
      else window.localStorage.removeItem(STORAGE_KEY_ACTIVE_CUSTOMER);
    } catch (_err) {}
  }

  function roleRank(roleKey) {
    var roles = state.context && state.context.role_rank_lookup ? state.context.role_rank_lookup : {};
    return Number(roles[roleKey] || 0);
  }

  function activeCustomer() {
    if (!state.context) return null;
    var memberships = state.context.customer_memberships || [];
    var stored = selectedCustomerKey();

    if (stored) {
      var found = memberships.find(function (m) { return m.customer_key === stored; });
      if (found) return found;
    }

    if (state.context.active_customer) return state.context.active_customer;
    return memberships.find(function (m) { return !!m.is_default_customer; }) || memberships[0] || null;
  }

  function activeCustomerKey() {
    var c = activeCustomer();
    return c && c.customer_key ? c.customer_key : "";
  }

  function activeCustomerRoleKey() {
    var c = activeCustomer();
    return c && c.role_key ? c.role_key : "";
  }

  function activeCustomerRoleRank() {
    var c = activeCustomer();
    if (!c) return 0;
    if (c.syncetc_role_definitions && c.syncetc_role_definitions.role_rank != null) return Number(c.syncetc_role_definitions.role_rank || 0);
    return roleRank(c.role_key);
  }

  function hasPlatformRole(roleKey) {
    var roles = state.context && state.context.platform_roles ? state.context.platform_roles : [];
    return roles.some(function (r) { return r.role_key === roleKey && r.membership_status === "active"; });
  }

  function hasCustomerRoleAtLeast(minRoleKey, customerKey) {
    var memberships = state.context && state.context.customer_memberships ? state.context.customer_memberships : [];
    var key = customerKey || activeCustomerKey();
    var membership = memberships.find(function (m) { return m.customer_key === key && m.membership_status === "active"; });
    if (!membership) return false;
    var memberRank = membership.syncetc_role_definitions && membership.syncetc_role_definitions.role_rank != null
      ? Number(membership.syncetc_role_definitions.role_rank || 0)
      : roleRank(membership.role_key);
    return memberRank >= roleRank(minRoleKey);
  }

  function hasModuleAccess(moduleKey, mode) {
    mode = mode || "view";
    if (!state.context) return false;

    if (hasPlatformRole("syncetc_super_admin")) return true;

    var modules = state.context.active_modules || [];
    var module = modules.find(function (m) { return m.module_key === moduleKey; });
    if (!module) return false;

    if (mode === "manage") return !!module.can_manage;
    return !!module.can_view;
  }

  function getSnapshot() {
    var active = activeCustomer();
    return {
      version: VERSION,
      initialized: state.initialized,
      loading: state.loading,
      busy: state.busy,
      signed_in: !!state.session,
      session: state.session ? {
        access_token_present: !!state.session.access_token,
        expires_at: state.session.expires_at || null
      } : null,
      user: state.user ? {
        id: state.user.id || "",
        email: state.user.email || ""
      } : null,
      profile: state.context && state.context.profile ? clone(state.context.profile) : null,
      platform_roles: state.context && state.context.platform_roles ? clone(state.context.platform_roles) : [],
      customer_memberships: state.context && state.context.customer_memberships ? clone(state.context.customer_memberships) : [],
      active_customer: active ? clone(active) : null,
      active_customer_key: active ? active.customer_key : "",
      active_customer_role_key: active ? active.role_key : "",
      active_customer_role_rank: activeCustomerRoleRank(),
      active_modules: state.context && state.context.active_modules ? clone(state.context.active_modules) : [],
      is_syncetc_super_admin: hasPlatformRole("syncetc_super_admin"),
      last_error: state.lastError || "",
      raw_context: state.context ? clone(state.context) : null
    };
  }

  async function init(options) {
    options = options || {};
    state.loading = true;
    notify();

    state.supabaseUrl = clean(options.supabaseUrl) || DEFAULT_SUPABASE_URL;
    state.anonKey = clean(options.anonKey) || clean(window.SYNCETC_SUPABASE_ANON_KEY) || clean(window.SUPABASE_ANON_KEY);
    state.profileEdgeUrl = clean(options.profileEdgeUrl) || (state.supabaseUrl + "/functions/v1/" + DEFAULT_PROFILE_FUNCTION);

    if (!state.anonKey) {
      state.loading = false;
      state.lastError = "Missing SYNCETC_SUPABASE_ANON_KEY.";
      notify();
      throw new Error(state.lastError);
    }

    await loadScriptOnce("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2");

    state.client = window.supabase.createClient(state.supabaseUrl, state.anonKey);

    var sessionResult = await state.client.auth.getSession();
    state.session = sessionResult.data && sessionResult.data.session ? sessionResult.data.session : null;
    state.user = state.session ? state.session.user : null;

    if (options.activeCustomerKey) rememberCustomerKey(options.activeCustomerKey);

    if (state.session) {
      await resolve();
    }

    if (!state._authListenerInstalled) {
      state.client.auth.onAuthStateChange(function (_event, session) {
        state.session = session || null;
        state.user = state.session ? state.session.user : null;
        if (!state.session) state.context = null;
        notify();
      });
      state._authListenerInstalled = true;
    }

    state.loading = false;
    state.initialized = true;
    notify();
    return getSnapshot();
  }

  async function signIn(email, password) {
    if (!state.client) await init();
    state.busy = true;
    state.lastError = "";
    notify();

    var result = await state.client.auth.signInWithPassword({
      email: clean(email),
      password: password || ""
    });

    if (result.error) {
      state.busy = false;
      state.lastError = result.error.message || String(result.error);
      notify();
      throw result.error;
    }

    state.session = result.data.session || null;
    state.user = state.session ? state.session.user : null;

    if (state.session) await resolve();

    state.busy = false;
    notify();
    return getSnapshot();
  }

  async function signOut() {
    if (!state.client) return getSnapshot();

    state.busy = true;
    notify();

    var result = await state.client.auth.signOut();
    if (result.error) {
      state.busy = false;
      state.lastError = result.error.message || String(result.error);
      notify();
      throw result.error;
    }

    state.session = null;
    state.user = null;
    state.context = null;
    state.busy = false;
    notify();
    return getSnapshot();
  }

  async function resolve() {
    if (!state.session || !state.session.access_token) {
      state.lastError = "No active Supabase session.";
      state.context = null;
      notify();
      return getSnapshot();
    }

    state.busy = true;
    state.lastError = "";
    notify();

    var response = await fetch(state.profileEdgeUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + state.session.access_token
      },
      body: JSON.stringify({
        action: "current_profile",
        active_customer_key: selectedCustomerKey(),
        source: VERSION
      })
    });

    var text = await response.text();
    var body = {};
    try {
      body = text ? JSON.parse(text) : {};
    } catch (_err) {
      state.busy = false;
      state.lastError = "Profile resolver returned non-JSON response.";
      notify();
      throw new Error(state.lastError + " " + text.slice(0, 160));
    }

    if (!response.ok || !body.ok) {
      state.busy = false;
      state.lastError = body.error || ("Profile resolver error " + response.status);
      notify();
      throw new Error(state.lastError);
    }

    // Build local role-rank lookup from returned roles/memberships.
    var lookup = {};
    (body.platform_roles || []).forEach(function (r) {
      if (r.role_key && r.syncetc_role_definitions && r.syncetc_role_definitions.role_rank != null) lookup[r.role_key] = Number(r.syncetc_role_definitions.role_rank || 0);
    });
    (body.customer_memberships || []).forEach(function (r) {
      if (r.role_key && r.syncetc_role_definitions && r.syncetc_role_definitions.role_rank != null) lookup[r.role_key] = Number(r.syncetc_role_definitions.role_rank || 0);
    });
    // Known baseline ranks from Auth v1 seed.
    Object.assign({
      syncetc_super_admin: 1000,
      syncetc_support_admin: 800,
      syncetc_support_viewer: 600,
      customer_owner: 500,
      customer_admin: 400,
      customer_editor: 300,
      customer_member: 200,
      customer_readonly: 100,
      customer_guest: 50,
      public: 0
    }, lookup);
    body.role_rank_lookup = Object.assign({
      syncetc_super_admin: 1000,
      syncetc_support_admin: 800,
      syncetc_support_viewer: 600,
      customer_owner: 500,
      customer_admin: 400,
      customer_editor: 300,
      customer_member: 200,
      customer_readonly: 100,
      customer_guest: 50,
      public: 0
    }, lookup);

    state.context = body;
    state.busy = false;
    notify();
    return getSnapshot();
  }

  async function setActiveCustomer(customerKey) {
    rememberCustomerKey(clean(customerKey));
    // v1 resolver returns modules for the default active customer only.
    // This method still updates local active customer selection for pages that only need membership context.
    // Customer-switcher v1/v2 will later request modules for the selected customer server-side.
    notify();
    return getSnapshot();
  }

  function subscribe(fn) {
    if (typeof fn !== "function") return function () {};
    state.subscribers.push(fn);
    try { fn(getSnapshot()); } catch (_err) {}
    return function () {
      state.subscribers = state.subscribers.filter(function (x) { return x !== fn; });
    };
  }

  window.SyncEtc.AuthContext = {
    version: VERSION,
    init: init,
    signIn: signIn,
    signOut: signOut,
    resolve: resolve,
    getSnapshot: getSnapshot,
    getToken: getToken,
    setActiveCustomer: setActiveCustomer,
    activeCustomer: activeCustomer,
    activeCustomerKey: activeCustomerKey,
    activeCustomerRoleKey: activeCustomerRoleKey,
    activeCustomerRoleRank: activeCustomerRoleRank,
    hasPlatformRole: hasPlatformRole,
    hasCustomerRoleAtLeast: hasCustomerRoleAtLeast,
    hasModuleAccess: hasModuleAccess,
    subscribe: subscribe
  };
})();
/* COMPONENT-auth-context-v1.js - END */
