/* PAGE-BUILDER-v2.js | Customer Page Builder initialize-page wiring | Generated: 2026-06-02 */
(function(){
  "use strict";

  var VERSION="PAGE-BUILDER-v2";
  var ROOT_ID="syncetc-webflow-mount";
  var STYLE_ID="syncetc-page-builder-v2-style";
  var ACTION_URL="https://ocdaohkiwonjmirqkjww.supabase.co/functions/v1/syncetc-site-settings-action";

  var CUSTOMERS=[
    {customer_key:"150th_aero",customer_name:"150th Aero Flying Club",status:"Working customer"},
    {customer_key:"demo_flying_club",customer_name:"Demo Flying Club",status:"Demo customer"}
  ];

  var PAGE_TEMPLATES=[
    {page_key:"assets",page_label:"Assets",template_key:"assets",source:"150th Aircraft / Assets page",status:"Ready to initialize"},
    {page_key:"info",page_label:"Info / About",template_key:"info",source:"150th About / Info page",status:"Template extraction pending"},
    {page_key:"calendar",page_label:"Calendar",template_key:"calendar",source:"150th Calendar page",status:"Template extraction pending"},
    {page_key:"gallery",page_label:"Gallery",template_key:"gallery",source:"150th Gallery page",status:"Template extraction pending"},
    {page_key:"documents",page_label:"Documents",template_key:"documents",source:"150th Documents pages",status:"Template extraction pending"}
  ];

  var DESIGN_PROFILES=[
    {profile_key:"default",profile_label:"Default SyncEtc"},
    {profile_key:"aviation_blue",profile_label:"Aviation Blue"},
    {profile_key:"forest_ops",profile_label:"Forest Ops Dashboard"},
    {profile_key:"high_contrast",profile_label:"High Contrast"},
    {profile_key:"compact_ops",profile_label:"Compact Operations"}
  ];

  var state={customer_key:"demo_flying_club",page_key:"assets",design_profile_key:"default",saving:false,lastResult:null,error:"",notice:""};

  function clean(v){return String(v==null?"":v).trim();}
  function byKey(list,keyField,value){return list.find(function(x){return x[keyField]===value;})||list[0];}
  function esc(s){return clean(s).replace(/[&<>"']/g,function(ch){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[ch];});}
  function token(){return window.SYNCETC_SUPABASE_ANON_KEY||window.SUPABASE_ANON_KEY||"";}

  function starterSettingsFor(page){
    if(page.page_key==="assets"){
      return {"aircraft.heroEyebrow":"Assets","aircraft.heroTitle":"Customer Assets","aircraft.heroIntro":"This customer page has been initialized. Add customer-specific copy and connect asset records when ready.","aircraft.introLabel":"Overview","aircraft.introTitle":"Assets overview","aircraft.introText":"Use Page Settings to customize this text for the customer.","aircraft.note":"No asset records have been connected yet."};
    }
    return {"hero_eyebrow":page.page_label,"hero_title":page.page_label,"hero_intro":"This page has been initialized for this customer.","intro_label":"Overview","intro_title":page.page_label+" overview","intro_text":"Use Page Settings to customize this text for the customer.","bottom_note":"Customer page initialized by SyncEtc Page Builder."};
  }

  function fieldsFor(page){
    if(page.page_key==="assets"){
      return [
        {key:"aircraft.heroEyebrow",label:"Hero Eyebrow",type:"text"},
        {key:"aircraft.heroTitle",label:"Hero Title",type:"text"},
        {key:"aircraft.heroIntro",label:"Hero Intro",type:"textarea"},
        {key:"aircraft.introLabel",label:"Intro Label",type:"text"},
        {key:"aircraft.introTitle",label:"Intro Title",type:"text"},
        {key:"aircraft.introText",label:"Intro Text",type:"textarea"},
        {key:"aircraft.note",label:"Bottom Note",type:"textarea"}
      ];
    }
    return [
      {key:"hero_eyebrow",label:"Hero Eyebrow",type:"text"},
      {key:"hero_title",label:"Hero Title",type:"text"},
      {key:"hero_intro",label:"Hero Intro",type:"textarea"},
      {key:"intro_label",label:"Intro Label",type:"text"},
      {key:"intro_title",label:"Intro Title",type:"text"},
      {key:"intro_text",label:"Intro Text",type:"textarea"},
      {key:"bottom_note",label:"Bottom Note",type:"textarea"}
    ];
  }

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
      ".pb-btn[disabled]{opacity:.55;cursor:not-allowed}",
      ".pb-note{font-size:13px;line-height:1.5;color:rgba(11,31,51,.72);margin-top:10px}",
      ".pb-msg{margin-top:14px;border-radius:16px;padding:12px 14px;font-size:13px;font-weight:750}",
      ".pb-msg.ok{background:#ecfdf3;color:#13522b;border:1px solid rgba(19,82,43,.2)}",
      ".pb-msg.err{background:#fff1f1;color:#8a1f1f;border:1px solid rgba(138,31,31,.2)}",
      ".pb-code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12px;background:#f7fafc;border:1px solid rgba(11,31,51,.12);border-radius:12px;padding:10px;overflow:auto;margin-top:10px}",
      "@media(max-width:840px){.pb-grid,.pb-status{grid-template-columns:1fr}.pb-title{font-size:28px}}"
    ].join("\n");
    document.head.appendChild(css);
  }

  function optionHtml(list,keyField,labelField,selected){
    return list.map(function(item){var key=item[keyField];return '<option value="'+esc(key)+'" '+(key===selected?'selected':'')+'>'+esc(item[labelField])+'</option>';}).join("");
  }

  function selected(){return {customer:byKey(CUSTOMERS,"customer_key",state.customer_key),page:byKey(PAGE_TEMPLATES,"page_key",state.page_key),profile:byKey(DESIGN_PROFILES,"profile_key",state.design_profile_key)};}

  function render(){
    installStyle();
    var root=document.getElementById(ROOT_ID);
    if(!root)return;
    var x=selected();
    var savedKeys=state.lastResult&&state.lastResult.saved_page_keys;
    root.innerHTML=
      '<main class="pb-shell">'+
        '<section class="pb-hero"><div class="pb-title-row"><div><div class="pb-kicker">SyncEtc Platform Tool</div><h1 class="pb-title">Page Builder</h1><p class="pb-sub">Create customer pages from approved SyncEtc templates. Design Studio controls look-and-feel. Page Builder initializes real customer/page records.</p></div><a class="pb-link" href="/design-studio">← Design Studio</a></div></section>'+
        '<section class="pb-grid">'+
          '<div class="pb-card"><h3>1. Customer</h3><select class="pb-select" data-pb-field="customer_key">'+optionHtml(CUSTOMERS,"customer_key","customer_name",state.customer_key)+'</select><div class="pb-note">'+esc(x.customer.status)+'</div></div>'+
          '<div class="pb-card"><h3>2. Page Template</h3><select class="pb-select" data-pb-field="page_key">'+optionHtml(PAGE_TEMPLATES,"page_key","page_label",state.page_key)+'</select><div class="pb-note">Source: '+esc(x.page.source)+'</div></div>'+
          '<div class="pb-card"><h3>3. Design Profile</h3><select class="pb-select" data-pb-field="design_profile_key">'+optionHtml(DESIGN_PROFILES,"profile_key","profile_label",state.design_profile_key)+'</select><div class="pb-note">Applies visual rules without changing customer records.</div></div>'+
        '</section>'+
        '<section class="pb-status"><div class="pb-pill"><strong>Customer</strong>'+esc(x.customer.customer_name)+'</div><div class="pb-pill"><strong>Page</strong>'+esc(x.page.page_label)+'</div><div class="pb-pill"><strong>Template Status</strong>'+esc(x.page.status)+'</div><div class="pb-pill"><strong>Last Result</strong>'+(state.lastResult?'Initialized':'Not initialized in this session')+'</div></section>'+
        '<section class="pb-preview"><h2>'+esc(x.customer.customer_name)+' · '+esc(x.page.page_label)+'</h2><p class="pb-note">Initialize creates or updates the customer/page settings row. It seeds starter page text and assigns the selected design profile. It does not create customer records such as aircraft cards.</p><div class="pb-actions"><button class="pb-btn" type="button" data-pb-action="initialize" '+(state.saving?'disabled':'')+'>'+(state.saving?'Initializing...':'Initialize Page for Customer')+'</button><button class="pb-btn secondary" type="button" data-pb-action="clear" '+(state.saving?'disabled':'')+'>Clear Result</button></div>'+
          (state.notice?'<div class="pb-msg ok">'+esc(state.notice)+'</div>':'')+
          (state.error?'<div class="pb-msg err">'+esc(state.error)+'</div>':'')+
          (state.lastResult?'<div class="pb-code">saved_page_keys: '+esc(JSON.stringify(savedKeys||[state.lastResult.initialized_page_key||state.page_key]))+'</div>':'')+
        '</section>'+
      '</main>';
    bind();
  }

  function bind(){
    document.querySelectorAll("[data-pb-field]").forEach(function(el){el.addEventListener("change",function(){state[el.getAttribute("data-pb-field")]=el.value;state.error="";state.notice="";state.lastResult=null;render();});});
    document.querySelectorAll("[data-pb-action]").forEach(function(btn){btn.addEventListener("click",function(){var action=btn.getAttribute("data-pb-action");if(action==="initialize")initializePage();if(action==="clear"){state.lastResult=null;state.error="";state.notice="";render();}});});
  }

  function requestBody(){
    var x=selected();
    return {action:"initialize_customer_page",customer_key:state.customer_key,payload:{customer_key:state.customer_key,page_key:x.page.page_key,page_label:x.page.page_label,template_key:x.page.template_key,design_profile_key:x.profile.profile_key,starter_settings_json:starterSettingsFor(x.page),fields_json:fieldsFor(x.page),is_enabled:true,note:"Initialized from Page Builder "+VERSION}};
  }

  function initializePage(){
    if(state.saving)return;
    state.saving=true;state.error="";state.notice="";render();
    fetch(ACTION_URL,{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token(),"apikey":token()},body:JSON.stringify(requestBody())})
      .then(function(res){return res.text().then(function(text){var data=null;try{data=text?JSON.parse(text):null;}catch(_err){data={ok:false,error:text||"Non-JSON response"};}if(!res.ok||!data||data.ok===false)throw new Error((data&&data.error)||("HTTP "+res.status));return data;});})
      .then(function(data){state.saving=false;state.lastResult=data;state.notice="Initialized "+selected().customer.customer_name+" · "+selected().page.page_label+".";render();})
      .catch(function(err){state.saving=false;state.error=err&&err.message?err.message:String(err);render();});
  }

  window.SYNCETC_PAGE_BUILDER_V2_STATE=function(){var out={version:VERSION,state:JSON.parse(JSON.stringify(state)),requestBody:requestBody(),actionUrl:ACTION_URL};console.log("SYNCETC_PAGE_BUILDER_V2_STATE",out);return out;};

  function start(){render();}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();

/* PAGE-BUILDER-v2.js - END */
