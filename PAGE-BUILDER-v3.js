/* PAGE-BUILDER-v3.js | Customer Page Builder status/action model | Generated: 2026-06-02 */
(function(){
  "use strict";

  var VERSION="PAGE-BUILDER-v3";
  var ROOT_ID="syncetc-webflow-mount";
  var STYLE_ID="syncetc-page-builder-v3-style";
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

  var state={customer_key:"demo_flying_club",page_key:"assets",saving:false,checking:false,status:null,lastResult:null,error:"",notice:""};

  function clean(v){return String(v==null?"":v).trim();}
  function esc(s){return clean(s).replace(/[&<>"']/g,function(ch){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[ch];});}
  function byKey(list,keyField,value){return list.find(function(x){return x[keyField]===value;})||list[0];}
  function token(){return window.SYNCETC_SUPABASE_ANON_KEY||window.SUPABASE_ANON_KEY||"";}
  function selected(){return {customer:byKey(CUSTOMERS,"customer_key",state.customer_key),page:byKey(PAGE_TEMPLATES,"page_key",state.page_key)};}

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
      ".pb-msg.warn{background:#fff8e6;color:#6f4b00;border:1px solid rgba(111,75,0,.2)}",
      ".pb-code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12px;background:#f7fafc;border:1px solid rgba(11,31,51,.12);border-radius:12px;padding:10px;overflow:auto;margin-top:10px}",
      "@media(max-width:840px){.pb-grid,.pb-status{grid-template-columns:1fr}.pb-title{font-size:28px}}"
    ].join("\n");
    document.head.appendChild(css);
  }

  function optionHtml(list,keyField,labelField,selectedValue){
    return list.map(function(item){var key=item[keyField];return '<option value="'+esc(key)+'" '+(key===selectedValue?'selected':'')+'>'+esc(item[labelField])+'</option>';}).join("");
  }

  function statusLabel(){
    if(state.checking)return "Checking...";
    if(!state.status)return "Unknown";
    if(state.status.exists&&state.status.is_enabled)return "Exists and enabled";
    if(state.status.exists&&!state.status.is_enabled)return "Exists but disabled";
    return "Missing";
  }

  function canInitialize(){
    var x=selected();
    return !state.saving&&!state.checking&&state.status&&state.status.exists===false&&x.page.status==="Ready to initialize";
  }

  function render(){
    installStyle();
    var root=document.getElementById(ROOT_ID);
    if(!root)return;
    var x=selected();
    root.innerHTML=
      '<main class="pb-shell">'+
        '<section class="pb-hero"><div class="pb-title-row"><div><div class="pb-kicker">SyncEtc Platform Tool</div><h1 class="pb-title">Page Builder</h1><p class="pb-sub">Create missing customer pages from approved templates. Existing pages are protected from overwrite.</p></div><a class="pb-link" href="/design-studio">← Design Studio</a></div></section>'+
        '<section class="pb-grid">'+
          '<div class="pb-card"><h3>1. Customer</h3><select class="pb-select" data-pb-field="customer_key">'+optionHtml(CUSTOMERS,"customer_key","customer_name",state.customer_key)+'</select><div class="pb-note">'+esc(x.customer.status)+'</div></div>'+
          '<div class="pb-card"><h3>2. Page Template</h3><select class="pb-select" data-pb-field="page_key">'+optionHtml(PAGE_TEMPLATES,"page_key","page_label",state.page_key)+'</select><div class="pb-note">Source: '+esc(x.page.source)+'</div></div>'+
          '<div class="pb-card"><h3>3. Page Status / Action</h3><div class="pb-note"><strong>'+esc(statusLabel())+'</strong></div><div class="pb-note">'+(state.status&&state.status.exists?'This page already exists. Initialize is blocked to protect existing work.':'This page is missing and may be initialized if the template is ready.')+'</div></div>'+
        '</section>'+
        '<section class="pb-status"><div class="pb-pill"><strong>Customer</strong>'+esc(x.customer.customer_name)+'</div><div class="pb-pill"><strong>Page</strong>'+esc(x.page.page_label)+'</div><div class="pb-pill"><strong>Template Status</strong>'+esc(x.page.status)+'</div><div class="pb-pill"><strong>Current Status</strong>'+esc(statusLabel())+'</div></section>'+
        '<section class="pb-preview"><h2>'+esc(x.customer.customer_name)+' · '+esc(x.page.page_label)+'</h2><p class="pb-note">Initialize creates a missing customer/page settings row. It does not overwrite existing pages and does not create customer records such as aircraft cards.</p><div class="pb-actions"><button class="pb-btn" type="button" data-pb-action="initialize" '+(canInitialize()?'':'disabled')+'>'+(state.saving?'Initializing...':'Initialize Missing Page')+'</button><button class="pb-btn secondary" type="button" data-pb-action="refresh" '+(state.saving?'disabled':'')+'>Refresh Status</button><button class="pb-btn secondary" type="button" disabled>Open Page Settings · later</button><button class="pb-btn secondary" type="button" disabled>Enable / Disable · later</button></div>'+
          (state.notice?'<div class="pb-msg ok">'+esc(state.notice)+'</div>':'')+
          (state.error?'<div class="pb-msg err">'+esc(state.error)+'</div>':'')+
          (state.status&&state.status.exists?'<div class="pb-msg warn">Existing customer/page row detected. Initialize is disabled for safety.</div>':'')+
          (state.lastResult?'<div class="pb-code">'+esc(JSON.stringify(state.lastResult,null,2))+'</div>':'')+
        '</section>'+
      '</main>';
    bind();
  }

  function bind(){
    document.querySelectorAll("[data-pb-field]").forEach(function(el){el.addEventListener("change",function(){state[el.getAttribute("data-pb-field")]=el.value;state.error="";state.notice="";state.lastResult=null;state.status=null;render();checkStatus();});});
    document.querySelectorAll("[data-pb-action]").forEach(function(btn){btn.addEventListener("click",function(){var action=btn.getAttribute("data-pb-action");if(action==="initialize")initializePage();if(action==="refresh")checkStatus();});});
  }

  function api(action,payload){
    return fetch(ACTION_URL,{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token(),"apikey":token()},body:JSON.stringify({action:action,customer_key:state.customer_key,payload:payload||{}})})
      .then(function(res){return res.text().then(function(text){var data=null;try{data=text?JSON.parse(text):null;}catch(_err){data={ok:false,error:text||"Non-JSON response"};}if(!res.ok||!data||data.ok===false)throw new Error((data&&data.error)||("HTTP "+res.status));return data;});});
  }

  function checkStatus(){
    if(state.checking)return;
    var x=selected();
    state.checking=true;state.error="";render();
    api("get_customer_page_status",{page_key:x.page.page_key}).then(function(data){state.checking=false;state.status=data;render();}).catch(function(err){state.checking=false;state.error=err&&err.message?err.message:String(err);render();});
  }

  function initializePage(){
    if(!canInitialize())return;
    var x=selected();
    state.saving=true;state.error="";state.notice="";render();
    api("initialize_customer_page",{page_key:x.page.page_key,page_label:x.page.page_label,template_key:x.page.template_key,starter_settings_json:starterSettingsFor(x.page),fields_json:fieldsFor(x.page),is_enabled:true,note:"Initialized from Page Builder "+VERSION})
      .then(function(data){state.saving=false;state.lastResult=data;if(data.blocked){state.notice="Initialization blocked because the page already exists.";}else{state.notice="Initialized "+x.customer.customer_name+" · "+x.page.page_label+".";}render();checkStatus();})
      .catch(function(err){state.saving=false;state.error=err&&err.message?err.message:String(err);render();});
  }

  window.SYNCETC_PAGE_BUILDER_V3_STATE=function(){var out={version:VERSION,state:JSON.parse(JSON.stringify(state)),actionUrl:ACTION_URL};console.log("SYNCETC_PAGE_BUILDER_V3_STATE",out);return out;};

  function start(){render();checkStatus();}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();

/* PAGE-BUILDER-v3.js - END */
