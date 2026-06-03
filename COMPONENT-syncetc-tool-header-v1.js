/* COMPONENT-syncetc-tool-header-v1.js | Shared SyncEtc tool header renderer | Generated: 2026-06-03 */
(function(){
  "use strict";

  var LOGO_URL="https://ocdaohkiwonjmirqkjww.supabase.co/storage/v1/object/public/public-site-assets/!SyncEtc-branding/SyncEtc-logo-compact.png";

  function clean(v){return String(v==null?"":v).trim();}
  function esc(s){return clean(s).replace(/[&<>"']/g,function(ch){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[ch];});}

  function button(label,href,active){
    return '<a class="syncetc-tool-header-btn '+(active?'is-active':'')+'" href="'+esc(href)+'">'+esc(label)+'</a>';
  }

  function render(options){
    options=options||{};
    var active=clean(options.active);
    var title=clean(options.title||"SyncEtc");
    var eyebrow=clean(options.eyebrow||"SYNCETC PLATFORM TOOL");
    var description=clean(options.description||"Company tools for customer setup, layout design, and page setup.");
    var logo=clean(options.logoUrl||LOGO_URL);

    return '<section class="syncetc-tool-header">'
      + '<div class="syncetc-tool-header-brand"><img class="syncetc-tool-header-logo" src="'+esc(logo)+'" alt="SyncEtc"></div>'
      + '<div class="syncetc-tool-header-body">'
      + '<div><div class="syncetc-tool-header-eyebrow">'+esc(eyebrow)+'</div><h1 class="syncetc-tool-header-title">'+esc(title)+'</h1><p class="syncetc-tool-header-description">'+esc(description)+'</p></div>'
      + '<nav class="syncetc-tool-header-nav" aria-label="SyncEtc tools">'
      + button("Hub","/syncetc-landing-page",active==="hub")
      + button("Customer Manager","/customer-manager",active==="customer-manager")
      + button("Layout Designer","/design-studio",active==="layout-designer")
      + button("Page Setup","/page-builder",active==="page-setup")
      + '</nav></div></section>';
  }

  function css(){
    return [
      ".syncetc-tool-header{position:relative;overflow:hidden;border:1px solid rgba(7,22,51,.12);border-radius:34px;background:linear-gradient(135deg,rgba(255,255,255,.96),rgba(239,248,255,.96));padding:28px 30px;box-shadow:0 24px 70px rgba(7,22,51,.10);margin-bottom:18px}",
      ".syncetc-tool-header:before{content:'';position:absolute;inset:auto -100px -150px auto;width:360px;height:360px;border-radius:999px;background:linear-gradient(135deg,rgba(0,164,224,.18),rgba(255,91,0,.16));filter:blur(4px)}",
      ".syncetc-tool-header-brand{position:relative;margin-bottom:14px}",
      ".syncetc-tool-header-logo{display:block;width:min(280px,72vw);height:auto}",
      ".syncetc-tool-header-body{position:relative;display:flex;align-items:flex-end;justify-content:space-between;gap:18px;flex-wrap:wrap}",
      ".syncetc-tool-header-eyebrow{font-size:12px;font-weight:950;letter-spacing:.14em;text-transform:uppercase;color:#0072bc;margin-bottom:8px}",
      ".syncetc-tool-header-title{font-size:34px;line-height:1.05;margin:0;letter-spacing:-.035em;color:#071633}",
      ".syncetc-tool-header-description{max-width:760px;margin:10px 0 0;color:rgba(7,22,51,.72);font-size:15px;line-height:1.55}",
      ".syncetc-tool-header-nav{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:flex-end}",
      ".syncetc-tool-header-btn{display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(7,22,51,.16);border-radius:999px;padding:10px 14px;background:#fff;color:#071633;text-decoration:none;font-weight:950;font-size:13px;box-shadow:0 8px 22px rgba(7,22,51,.08);white-space:nowrap}",
      ".syncetc-tool-header-btn.is-active{background:#071633;color:#fff;border-color:#071633;box-shadow:0 10px 24px rgba(7,22,51,.16)}",
      ".syncetc-tool-header-btn:focus{outline:3px solid rgba(0,164,224,.30);outline-offset:2px}",
      "@media(max-width:760px){.syncetc-tool-header{padding:22px}.syncetc-tool-header-title{font-size:28px}.syncetc-tool-header-body{align-items:flex-start}.syncetc-tool-header-nav{justify-content:flex-start}}"
    ].join("\n");
  }

  window.SyncEtcToolHeader={render:render,css:css,logoUrl:LOGO_URL};
})();

/* COMPONENT-syncetc-tool-header-v1.js - END */
