/* PAGE-ASSETS-v3.js | live Assets page using shared Assets renderer | Generated: 2026-06-02 */
(function(){
"use strict";

var VERSION="PAGE-ASSETS-v3";
var SUPABASE_URL=String(window.SYNCETC_SUPABASE_URL||"https://ocdaohkiwonjmirqkjww.supabase.co").replace(/\/$/,"");
var ANON_KEY=window.SYNCETC_SUPABASE_ANON_KEY||window.SUPABASE_ANON_KEY||"";
var MOUNT_ID="syncetc-webflow-mount";
var ROOT_ID="syncetc-assets-v3-root";
var CUSTOMER_KEY=window.SYNCETC_CUSTOMER_KEY||window.SYNCETC_ACTIVE_CUSTOMER_KEY||"150th-aero";
var PAGE_KEY=window.SYNCETC_PAGE_KEY||"assets";
var RENDERER_URL=window.SYNCETC_ASSETS_RENDERER_URL||"https://feskesen.github.io/syncetc-webflow-assets/COMPONENT-assets-renderer-v1.js";
var PAGE_READ_URL=SUPABASE_URL+"/functions/v1/syncetc-design-studio-page-read";

function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(m){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m];});}
function arr(v){return Array.isArray(v)?v:[];}

function mount(){var m=document.getElementById(MOUNT_ID);if(!m){m=document.createElement("div");m.id=MOUNT_ID;document.body.appendChild(m);}return m;}

function renderShell(html){mount().innerHTML='<div id="'+ROOT_ID+'">'+html+'<div class="se-version">'+esc(VERSION)+'</div></div>';}

function loadScript(src){
  return new Promise(function(resolve,reject){
    if(window.SYNCETC_ASSETS_RENDERER_V1)return resolve();
    var existing=document.querySelector('script[data-syncetc-assets-renderer="v1"]');
    if(existing){existing.addEventListener("load",resolve,{once:true});existing.addEventListener("error",reject,{once:true});return;}
    var s=document.createElement("script");
    s.src=src;
    s.async=true;
    s.dataset.syncetcAssetsRenderer="v1";
    s.onload=resolve;
    s.onerror=function(){reject(new Error("Could not load shared Assets renderer."));};
    document.head.appendChild(s);
  });
}

function fetchPageData(){
  return fetch(PAGE_READ_URL,{
    method:"POST",
    headers:{"Content-Type":"application/json","apikey":ANON_KEY},
    body:JSON.stringify({customer_key:CUSTOMER_KEY,page_key:PAGE_KEY,record_kind:"assets"})
  }).then(function(res){return res.json().then(function(body){if(!res.ok||!body.ok)throw new Error((body&&body.error)||("Page read failed: HTTP "+res.status));return body;});});
}

function valuesFromPayload(payload){
  var values=Object.assign({},payload.page_settings||{});
  values.aircraft=arr(payload.records);
  values.assets=arr(payload.records);
  return values;
}

function boot(){
  renderShell('<div class="aero-empty-message">Loading assets...</div>');
  loadScript(RENDERER_URL).then(fetchPageData).then(function(payload){
    var renderer=window.SYNCETC_ASSETS_RENDERER_V1;
    if(!renderer)throw new Error("Shared Assets renderer missing after load.");
    renderShell(renderer.renderPage(valuesFromPayload(payload),{mode:"live"}));
  }).catch(function(err){
    renderShell('<div class="aero-empty-message">Assets page data could not be loaded. '+esc(err.message||err)+'</div>');
  });
}

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();

})();
/* PAGE-ASSETS-v3.js - END */
