/* COMPONENT-customer-switcher-v1.js - BEGIN */
(function () {
  "use strict";

  window.SyncEtc = window.SyncEtc || {};

  var VERSION="COMPONENT-customer-switcher-v1";

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  function customerLabel(row) {
    return row && row.syncetc_customers && row.syncetc_customers.display_name
      ? row.syncetc_customers.display_name
      : (row && row.customer_key ? row.customer_key : "");
  }

  function roleLabel(row) {
    return row && row.syncetc_role_definitions && row.syncetc_role_definitions.role_label
      ? row.syncetc_role_definitions.role_label
      : (row && row.role_key ? row.role_key : "");
  }

  function installStyle() {
    if (document.getElementById("COMPONENT-customer-switcher-v1-style")) return;
    var style = document.createElement("style");
    style.id = "COMPONENT-customer-switcher-v1-style";
    style.textContent = `
      .se-csw { display:grid; gap:10px; }
      .se-csw label { color:var(--se-aero-navy-dark,#0b2744); font-size:13px; font-weight:900; line-height:1.25; }
      .se-csw-row { display:grid; grid-template-columns:1fr auto; gap:10px; align-items:center; }
      .se-csw-select { width:100%; min-height:42px; padding:10px 13px; border:1px solid rgba(18,54,90,.18); border-radius:14px; background:#fff; color:var(--se-aero-text,#1e2933); font:inherit; font-size:14px; outline:none; }
      .se-csw-btn { display:inline-flex; align-items:center; justify-content:center; min-height:42px; padding:10px 14px; border-radius:999px; background:var(--se-aero-navy,#12365a); color:#fff; border:1px solid rgba(255,255,255,.14); box-shadow:0 8px 18px rgba(18,54,90,.18); font:inherit; font-size:13px; font-weight:900; cursor:pointer; white-space:nowrap; }
      .se-csw-btn.secondary { background:#fff; color:var(--se-aero-navy,#12365a); border:1px solid rgba(18,54,90,.22); box-shadow:none; }
      .se-csw-meta { color:var(--se-aero-muted,#5d6b78); font-size:13px; line-height:1.45; }
      .se-csw-pill { display:inline-flex; align-items:center; padding:6px 10px; border-radius:999px; background:var(--se-aero-sky,#eaf5ff); color:var(--se-aero-navy,#12365a); border:1px solid rgba(18,54,90,.12); font-size:12px; line-height:1.1; font-weight:900; }
      @media(max-width:620px){ .se-csw-row{grid-template-columns:1fr}.se-csw-btn{width:100%} }
    `;
    document.head.appendChild(style);
  }

  function render(mount, options) {
    installStyle();
    options = options || {};
    var Auth = window.SyncEtc && window.SyncEtc.AuthContext ? window.SyncEtc.AuthContext : null;
    if (!Auth) {
      mount.innerHTML = '<div class="se-csw-meta">AuthContext is not loaded.</div>';
      return;
    }

    var snapshot = Auth.getSnapshot();
    var memberships = snapshot.customer_memberships || [];
    var activeKey = snapshot.active_customer_key || "";

    if (!snapshot.signed_in) {
      mount.innerHTML = '<div class="se-csw-meta">Sign in to choose a customer.</div>';
      return;
    }

    if (!memberships.length) {
      mount.innerHTML = '<div class="se-csw-meta">No customer memberships found.</div>';
      return;
    }

    var optionsHtml = memberships.map(function (m) {
      return '<option value="' + esc(m.customer_key) + '" ' + (m.customer_key === activeKey ? "selected" : "") + '>' +
        esc(customerLabel(m)) + ' · ' + esc(roleLabel(m)) +
      '</option>';
    }).join("");

    var active = memberships.find(function (m) { return m.customer_key === activeKey; }) || memberships[0];
    var html = '<div class="se-csw">' +
      '<label for="se-csw-select-' + esc(options.instanceId || "main") + '">' + esc(options.label || "Active customer") + '</label>' +
      '<div class="se-csw-row">' +
        '<select class="se-csw-select" id="se-csw-select-' + esc(options.instanceId || "main") + '" data-se-csw-select>' + optionsHtml + '</select>' +
        '<button type="button" class="se-csw-btn secondary" data-se-csw-refresh>Refresh</button>' +
      '</div>' +
      '<div class="se-csw-meta">Current context: <span class="se-csw-pill">' + esc(customerLabel(active)) + ' · ' + esc(roleLabel(active)) + '</span></div>' +
    '</div>';

    mount.innerHTML = html;

    var select = mount.querySelector("[data-se-csw-select]");
    if (select) {
      select.addEventListener("change", async function () {
        var nextKey = select.value;
        select.disabled = true;
        try {
          await Auth.setActiveCustomer(nextKey);
          if (typeof options.onChange === "function") options.onChange(Auth.getSnapshot());
          render(mount, options);
        } catch (err) {
          mount.innerHTML = '<div class="se-csw-meta">Could not switch customer: ' + esc(err.message || String(err)) + '</div>';
        }
      });
    }

    var refresh = mount.querySelector("[data-se-csw-refresh]");
    if (refresh) {
      refresh.addEventListener("click", async function () {
        refresh.disabled = true;
        try {
          await Auth.resolve();
          if (typeof options.onChange === "function") options.onChange(Auth.getSnapshot());
          render(mount, options);
        } catch (err) {
          mount.innerHTML = '<div class="se-csw-meta">Could not refresh customer context: ' + esc(err.message || String(err)) + '</div>';
        }
      });
    }
  }

  function mount(target, options) {
    var el = typeof target === "string" ? document.querySelector(target) : target;
    if (!el) throw new Error("Customer switcher mount not found.");
    render(el, options || {});
    return {
      refresh: function () { render(el, options || {}); }
    };
  }

  window.SyncEtc.CustomerSwitcher = {
    version: VERSION,
    mount: mount
  };
})();
/* COMPONENT-customer-switcher-v1.js - END */
