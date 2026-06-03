/* PAGE-BUILDER-v1.js | Customer Page Builder skeleton | Generated: 2026-06-02 */
(function(){
  "use strict";

  var VERSION="PAGE-BUILDER-v1";
  var ROOT_ID="syncetc-webflow-mount";
  var STYLE_ID="syncetc-page-builder-v1-style";

  var CUSTOMERS=[
    {customer_key:"150th_aero",customer_name:"150th Aero Flying Club",status:"Working customer"},
    {customer_key:"demo_flying_club",customer_name:"Demo Flying Club",status:"Demo customer"}
  ];

  var PAGE_TEMPLATES=[
    {page_key:"assets",page_label:"Assets",source:"150th Aircraft / Assets page",status:"Ready to convert"},
    {page_key:"info",page_label:"Info / About",source:"150th About / Info page",status:"Needs template extraction"},
    {page_key:"calendar",page_label:"Calendar",source:"150th Calendar page",status:"Needs template extraction"},
    {page_key:"gallery",page_label:"Gallery",source:"150th Gallery page",status:"Needs template extraction"},
    {page_key:"documents",page_label:"Documents",source:"150th Documents pages",status:"Needs template extraction"}
  ];

  var DESIGN_PROFILES=[
    {profile_key:"default",profile_label:"Default SyncEtc"},
    {profile_key:"aviation_blue",profile_label:"Aviation Blue"},
    {profile_key:"high_contrast",profile_label:"High Contrast"},
    {profile_key:"compact_ops",profile_label:"Compact Operations"}
  ];

  var state={
    customer_key:"demo_flying_club",
    page_key:"assets",
    design_profile_key:"default",
    initialized:false
  };

  function clean(v){return String(v==null?"":v).trim();}
  function byKey(list,keyField,value){return list.find(function(x){return x[keyField]===value;})||list[0];}
  function esc(s){return clean(s).replace(/[&<>"']/g,function(ch){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[ch];});}

  function installStyle(){
    if(document.getElementById(STYLE_ID))return;
    var css=document.createElement("style");
    css.id=STYLE_ID;
    css.textContent=[
      "#"+ROOT_ID+"{font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0b1f33}",
      ".pb-shell{max-width:1180px;margin:0 auto;padding:28px 18px 60px}",
      ".pb-hero{border:1px solid rgba(11,31,51,.12);border-radius:28px;background:linear-gradient(135deg,#eef6ff,#ffffff);padding:28px;box-shadow:0 18px 50px rgba(11,31,51,.08)}",
      ".pb-kicker{font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:#356b9a;margin-bottom:8px}",
      ".pb-title-row{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap}",
      ".pb-title{font-size:34px;line-height:1.05;margin:0;color:#0b1f33}",
      ".pb-sub{max-width:760px;color:rgba(11,31,51,.72);font-size:15px;line-height:1.55;margin:12px 0 0}",
      ".pb-link{display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(11,31,51,.18);border-radius:999px;padding:10px 14px;background:#fff;color:#0b1f33;text-decoration:none;font-weight:850;font-size:13px;box-shadow:0 8px 20px rgba(11,31,51,.08);white-space:nowrap}",
      ".pb-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:18px}",
      ".pb-card{border:1px solid rgba(11,31,51,.12);border-radius:22px;background:#fff;padding:18px;box-shadow:0 12px 32px rgba(11,31,51,.06)}",
      ".pb-card h3{margin:0 0 10px;font-size:15px}",
      ".pb-select{width:100%;border:1px solid rgba(11,31,51,.18);border-radius:14px;padding:11px 12px;font-weight:750;background:#fff;color:#0b1f33}",
      ".pb-status{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:18px}",
      ".pb-pill{border:1px solid rgba(11,31,51,.12);border-radius:18px;background:#f8fbff;padding:14px;font-size:13px}",
      ".pb-pill strong{display:block;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#356b9a;margin-bottom:5px}",
      ".pb-preview{margin-top:18px;border:1px dashed rgba(11,31,51,.22);border-radius:26px;background:#fff;padding:24px}",
      ".pb-preview h2{margin:0 0 8px;font-size:24px}",
      ".pb-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}",
      ".pb-btn{border:0;border-radius:999px;padding:11px 15px;font-weight:900;background:#0b1f33;color:#fff;cursor:pointer}",
      ".pb-btn.secondary{background:#fff;color:#0b1f33;border:1px solid rgba(11,31,51,.18)}",
      ".pb-note{font-size:13px;line-height:1.5;color:rgba(11,31,51,.72);margin-top:10px}",
      "@media(max-width:840px){.pb-grid,.pb-status{grid-template-columns:1fr}.pb-title{font-size:28px}}"
    ].join("\n");
    document.head.appendChild(css);
  }

  function optionHtml(list,keyField,labelField,selected){
    return list.map(function(item){
      var key=item[keyField];
      return '<option value="'+esc(key)+'" '+(key===selected?'selected':'')+'>'+esc(item[labelField])+'</option>';
    }).join("");
  }

  function render(){
    installStyle();
    var root=document.getElementById(ROOT_ID);
    if(!root)return;
    var customer=byKey(CUSTOMERS,"customer_key",state.customer_key);
    var page=byKey(PAGE_TEMPLATES,"page_key",state.page_key);
    var profile=byKey(DESIGN_PROFILES,"profile_key",state.design_profile_key);

    root.innerHTML=
      '<main class="pb-shell">'+
        '<section class="pb-hero">'+
          '<div class="pb-title-row">'+
            '<div>'+
              '<div class="pb-kicker">SyncEtc Platform Tool</div>'+
              '<h1 class="pb-title">Page Builder</h1>'+
              '<p class="pb-sub">Create customer pages from approved SyncEtc templates. This is separate from Design Studio, which controls look-and-feel design profiles.</p>'+
            '</div>'+
            '<a class="pb-link" href="/design-studio">← Design Studio</a>'+
          '</div>'+
        '</section>'+

        '<section class="pb-grid">'+
          '<div class="pb-card"><h3>1. Customer</h3><select class="pb-select" data-pb-field="customer_key">'+optionHtml(CUSTOMERS,"customer_key","customer_name",state.customer_key)+'</select><div class="pb-note">'+esc(customer.status)+'</div></div>'+
          '<div class="pb-card"><h3>2. Page Template</h3><select class="pb-select" data-pb-field="page_key">'+optionHtml(PAGE_TEMPLATES,"page_key","page_label",state.page_key)+'</select><div class="pb-note">Source: '+esc(page.source)+'</div></div>'+
          '<div class="pb-card"><h3>3. Design Profile</h3><select class="pb-select" data-pb-field="design_profile_key">'+optionHtml(DESIGN_PROFILES,"profile_key","profile_label",state.design_profile_key)+'</select><div class="pb-note">Applies visual rules without changing customer records.</div></div>'+
        '</section>'+

        '<section class="pb-status">'+
          '<div class="pb-pill"><strong>Customer</strong>'+esc(customer.customer_name)+'</div>'+
          '<div class="pb-pill"><strong>Page</strong>'+esc(page.page_label)+'</div>'+
          '<div class="pb-pill"><strong>Template Status</strong>'+esc(page.status)+'</div>'+
          '<div class="pb-pill"><strong>Initialization</strong>'+(state.initialized?'Draft initialized in UI only':'Not initialized yet')+'</div>'+
        '</section>'+

        '<section class="pb-preview">'+
          '<h2>'+esc(customer.customer_name)+' · '+esc(page.page_label)+'</h2>'+
          '<p class="pb-note">This is the Page Builder v1 skeleton. The next wiring step will create the customer/page settings row, seed starter page text, attach a design profile, and then reload the real customer preview.</p>'+
          '<div class="pb-actions">'+
            '<button class="pb-btn" type="button" data-pb-action="initialize">Initialize Page Draft</button>'+
            '<button class="pb-btn secondary" type="button" data-pb-action="clear">Reset Draft State</button>'+
          '</div>'+
        '</section>'+
      '</main>';

    bind();
  }

  function bind(){
    document.querySelectorAll("[data-pb-field]").forEach(function(el){
      el.addEventListener("change",function(){
        state[el.getAttribute("data-pb-field")]=el.value;
        state.initialized=false;
        render();
      });
    });
    document.querySelectorAll("[data-pb-action]").forEach(function(btn){
      btn.addEventListener("click",function(){
        var action=btn.getAttribute("data-pb-action");
        if(action==="initialize")state.initialized=true;
        if(action==="clear")state.initialized=false;
        render();
      });
    });
  }

  window.SYNCETC_PAGE_BUILDER_V1_STATE=function(){
    var out={version:VERSION,state:JSON.parse(JSON.stringify(state))};
    console.log("SYNCETC_PAGE_BUILDER_V1_STATE",out);
    return out;
  };

  function start(){render();}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();

/* PAGE-BUILDER-v1.js - END */
