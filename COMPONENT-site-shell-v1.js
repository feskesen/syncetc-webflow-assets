/* COMPONENT-site-shell-v1.js - BEGIN */
(function () {
  "use strict";
  window.SyncEtc = window.SyncEtc || {};
  window.SyncEtc.Components = window.SyncEtc.Components || {};
  var VERSION="COMPONENT-site-shell-v1";
  function clean(v){return v==null?"":String(v).trim();}
  function customerNameFromKey(key){if(key==="150th_aero")return"150th Aero Flying Club";if(key==="demo_flying_club")return"Demo Flying Club";return clean(key).replace(/_/g," ").replace(/\b\w/g,function(m){return m.toUpperCase();})||"Demo Flying Club";}
  function esc(v){return window.SyncEtc.Components.Utils.esc(v);}

  function installDrawerStyles(){
    window.SyncEtc.Components.Utils.installStyle("COMPONENT-site-shell-v10-drawer-style",`
      .syncetc-admin-fab{position:fixed;right:18px;bottom:18px;z-index:99990;display:flex;gap:8px;align-items:center;border:2px solid rgba(255,255,255,.88);background:#b42318;color:#fff;border-radius:999px;padding:12px 15px;font-weight:950;font-size:13px;box-shadow:0 16px 38px rgba(12,38,64,.34),0 0 0 3px rgba(180,35,24,.18);cursor:pointer}
      .syncetc-admin-fab small{font-size:10px;font-weight:950;opacity:.92;text-transform:uppercase;letter-spacing:.05em}
      .syncetc-drawer-overlay{position:fixed;inset:0;background:rgba(8,22,38,.22);z-index:99991;opacity:0;pointer-events:none;transition:opacity .18s ease}
      .syncetc-drawer{position:fixed;right:0;top:0;height:100vh;width:min(480px,94vw);z-index:99992;background:#f8fbff;border-left:1px solid rgba(18,54,90,.14);box-shadow:-20px 0 46px rgba(12,38,64,.22);transform:translateX(102%);transition:transform .22s ease;display:flex;flex-direction:column}
      .syncetc-drawer.is-open{transform:translateX(0)}
      .syncetc-drawer-overlay.is-open{opacity:1;pointer-events:auto}
      .syncetc-drawer-head{padding:15px 16px;border-bottom:1px solid rgba(18,54,90,.12);background:#fff}
      .syncetc-drawer-title{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
      .syncetc-drawer-title h2{margin:0;color:#12365a;font-size:17px;line-height:1.2}
      .syncetc-drawer-sub{margin:5px 0 0;color:#64748b;font-size:12px;font-weight:800;line-height:1.35}
      .syncetc-drawer-close{border:1px solid rgba(18,54,90,.18);background:#fff;color:#12365a;border-radius:999px;padding:8px 10px;font-size:12px;font-weight:950;cursor:pointer}
      .syncetc-drawer-id{margin-top:10px;color:#12365a;font-size:11.5px;font-weight:900;line-height:1.35}
      .syncetc-drawer-id span+span:before{content:' · ';color:#8da0b5;font-weight:900}
      .syncetc-drawer-tabs{display:flex;gap:7px;margin-top:12px}
      .syncetc-drawer-tab{flex:1;border:1px solid rgba(18,54,90,.14);border-radius:999px;background:#f8fbff;color:#12365a;padding:9px 10px;font-size:12px;font-weight:950;cursor:pointer}
      .syncetc-drawer-tab.is-active{background:#12365a;color:#fff;border-color:#12365a}
      .syncetc-drawer-body{padding:16px;overflow:auto;flex:1}
      .syncetc-drawer-panel{display:none}
      .syncetc-drawer-panel.is-active{display:block}
      .syncetc-drawer-signout{border:1px solid rgba(18,54,90,.18);background:#fff;color:#12365a;border-radius:999px;padding:8px 10px;font-size:12px;font-weight:950;cursor:pointer;margin-top:10px}
      @media(max-width:720px){
        .syncetc-admin-fab{position:fixed;right:18px;bottom:18px;z-index:99990;display:flex;gap:8px;align-items:center;border:2px solid rgba(255,255,255,.88);background:#b42318;color:#fff;border-radius:999px;padding:12px 15px;font-weight:950;font-size:13px;box-shadow:0 16px 38px rgba(12,38,64,.34),0 0 0 3px rgba(180,35,24,.18);cursor:pointer}
        .syncetc-drawer{top:auto;bottom:0;right:0;height:min(78vh,720px);width:100vw;border-left:0;border-top:1px solid rgba(18,54,90,.14);border-radius:22px 22px 0 0;transform:translateY(102%)}
        .syncetc-drawer.is-open{transform:translateY(0)}
      }
    `);
  }

  function create(mountId,options){
    var state=Object.assign({customerKey:"demo_flying_club",customerName:"Demo Flying Club",pageKey:"events",audience:"public",viewAs:"public",showControls:true,showBanner:false,siteEditorOpen:false,customerSettingsOpen:false,drawerOpen:false,drawerTab:"site",local:{},version:VERSION},options||{});
    state.local=Object.assign({},state.local||{});
    var qs=new URLSearchParams(window.location.search), q=clean(qs.get("customer_key")||qs.get("customer"));
    if(q){state.customerKey=q;state.customerName=customerNameFromKey(q);}
    var mount=document.getElementById(mountId||"syncetc-webflow-mount");
    if(!mount)throw new Error("SyncEtc mount not found.");

    function effectiveAudience(){if(state.viewAs==="platform"||state.viewAs==="admin")return"admin";if(state.viewAs==="member")return"member";return"public";}
    function customer(){return window.SyncEtc.Components.CustomerStyle.getCustomerConfig(state.customerKey,state.local||{});}
    function loadCustomer(){return window.SyncEtc.Components.CustomerStyle.loadCustomerConfig(state.customerKey).then(function(c){state.customerName=c.customerName||customerNameFromKey(state.customerKey);return c;});}
    function setLocal(field,value){state.local[field]=value;}
    function setViewAs(value){state.viewAs=value||"public";state.audience=effectiveAudience();}
    function setCustomerKey(value){state.customerKey=value||"demo_flying_club";state.customerName=customerNameFromKey(state.customerKey);state.local={};}
    function setEditorOpen(value){state.siteEditorOpen=!!value;state.drawerOpen=!!value;if(value)state.drawerTab="site";}
    function setCustomerSettingsOpen(value){state.customerSettingsOpen=!!value;state.drawerOpen=!!value;if(value)state.drawerTab="customer";}
    function setDrawerOpen(value){state.drawerOpen=!!value;}
    function setDrawerTab(value){state.drawerTab=value||"site";}
    function getState(){return JSON.parse(JSON.stringify(state));}
    function security(){return window.SyncEtc.SecurityContext&&window.SyncEtc.SecurityContext.getSnapshot?window.SyncEtc.SecurityContext.getSnapshot():{};}
    function canSite(){return !!(window.SyncEtc.SecurityContext&&window.SyncEtc.SecurityContext.isPlatformAdmin&&window.SyncEtc.SecurityContext.isPlatformAdmin());}
    function canCustomer(){return !!(window.SyncEtc.SecurityContext&&window.SyncEtc.SecurityContext.isCustomerAdmin&&window.SyncEtc.SecurityContext.isCustomerAdmin(state.customerKey));}
    function signOut(){if(window.SyncEtc.SecurityContext&&window.SyncEtc.SecurityContext.signOutHard)window.SyncEtc.SecurityContext.signOutHard();}

    function getSavePayload(){
      var c=customer(), content=c.content||{}, local=state.local||{};
      return {
        customer_key:state.customerKey,
        style_preset_key:local.stylePresetKey||c.stylePresetKey||"classic-aviation",
        theme_overrides:{},
        brand_overrides:{},
        content_overrides:Object.assign({},content,{calendar:Object.assign({},content.calendar||{},{title:local.calendarTitle==null?(content.calendar&&content.calendar.title)||"Calendar":local.calendarTitle,intro:local.calendarIntro==null?(content.calendar&&content.calendar.intro)||"Upcoming meetings, fly-outs, work sessions, and other events.":local.calendarIntro})}),
        module_overrides:{layout:{preset:local.layoutPresetKey||((c.layout&&c.layout.preset)||"standard-layout")}},
        enabled_modules:c.modules||{},
        is_enabled:true
      };
    }

    function drawerHtml(c,audience){
      installDrawerStyles();
      var site=canSite(), cust=canCustomer();
      if(!state.showControls||(!site&&!cust))return "";
      if(site && state.drawerTab!=="customer") state.drawerTab="site";
      if(!site && cust) state.drawerTab="customer";
      var sec=security(), actor=sec.actor_email||"", platformRole=sec.platform_role||"", customerRole=sec.active_customer_role||"";
      var tab=state.drawerTab|| (site?"site":"customer");
      return `<button type="button" class="syncetc-admin-fab" data-se-drawer-open><span>Edit</span><small>${site?"platform":"customer"}</small></button>
        <div class="syncetc-drawer-overlay ${state.drawerOpen?"is-open":""}" data-se-drawer-close></div>
        <aside class="syncetc-drawer ${state.drawerOpen?"is-open":""}" data-se-drawer>
          <div class="syncetc-drawer-head">
            <div class="syncetc-drawer-title"><div><h2>${tab==="site"?"SyncEtc Site Editor":esc(c.customerName||c.shortName||state.customerName)+" · Calendar Page Settings"}</h2><p class="syncetc-drawer-sub">Controls are available only for authorized admin roles.</p></div><button class="syncetc-drawer-close" type="button" data-se-drawer-close>Close</button></div>
            <div class="syncetc-drawer-id"><span>${esc(actor||"signed-in user")}</span>${platformRole?`<span>${esc(platformRole)}</span>`:""}${customerRole?`<span>${esc(customerRole)}</span>`:""}</div>
            <button class="syncetc-drawer-signout" type="button" data-se-drawer-signout>Not you? Sign out</button>
            <div class="syncetc-drawer-tabs">
              ${site?`<button type="button" class="syncetc-drawer-tab ${tab==="site"?"is-active":""}" data-se-drawer-tab="site">Site Editor</button>`:""}
              ${cust?`<button type="button" class="syncetc-drawer-tab ${tab==="customer"?"is-active":""}" data-se-drawer-tab="customer">Customer Settings</button>`:""}
            </div>
          </div>
          <div class="syncetc-drawer-body">
            ${site?`<section class="syncetc-drawer-panel ${tab==="site"?"is-active":""}" data-se-drawer-panel="site">${window.SyncEtc.Components.MasterControls?window.SyncEtc.Components.MasterControls.render({customer:c,customerKey:state.customerKey,pageKey:state.pageKey,audience:audience,viewAs:state.viewAs,siteEditorOpen:true,showBanner:state.showBanner,local:state.local,version:state.version}):""}</section>`:""}
            ${cust?`<section class="syncetc-drawer-panel ${tab==="customer"?"is-active":""}" data-se-drawer-panel="customer">${window.SyncEtc.Components.CustomerSettings?window.SyncEtc.Components.CustomerSettings.render({customer:c,customerKey:state.customerKey,pageKey:state.pageKey,audience:audience,viewAs:state.viewAs,customerSettingsOpen:true,local:state.local,version:state.version}):""}</section>`:""}
          </div>
        </aside>`;
    }

    function bindDrawer(shell){
      if(!shell||shell.getAttribute("data-se-drawer-bound")==="1")return;
      shell.setAttribute("data-se-drawer-bound","1");
      shell.addEventListener("click",function(e){
        var open=e.target.closest("[data-se-drawer-open]");
        if(open){state.drawerOpen=true;render(shell.querySelector("[data-se-page-body]")?shell.querySelector("[data-se-page-body]").innerHTML:"");return;}
        var close=e.target.closest("[data-se-drawer-close]");
        if(close){state.drawerOpen=false;render(shell.querySelector("[data-se-page-body]")?shell.querySelector("[data-se-page-body]").innerHTML:"");return;}
        var tab=e.target.closest("[data-se-drawer-tab]");
        if(tab){state.drawerTab=tab.getAttribute("data-se-drawer-tab")||state.drawerTab;render(shell.querySelector("[data-se-page-body]")?shell.querySelector("[data-se-page-body]").innerHTML:"");return;}
        var so=e.target.closest("[data-se-drawer-signout]");
        if(so){signOut();return;}
      });
    }

    function render(pageHtml){
      var C=window.SyncEtc.Components,U=C.Utils; C.BaseStyles.install();
      var c=customer(), shellId="syncetc-component-shell", audience=effectiveAudience();
      mount.innerHTML=`<div id="${shellId}" class="syncetc-shell" data-se-customer-key="${U.esc(state.customerKey)}" data-se-view-as="${U.esc(state.viewAs)}">${C.MasterHeader.render({customer:c,pageKey:state.pageKey,audience:audience,viewAs:state.viewAs})}<main data-se-page-body>${pageHtml||""}</main>${C.MasterFooter.render({customer:c,pageKey:state.pageKey,audience:audience,viewAs:state.viewAs})}${drawerHtml(c,audience)}</div>`;
      var shell=document.getElementById(shellId);
      C.CustomerStyle.applyCustomerCssVars(shell,c);
      bindDrawer(shell);
      if(C.MasterControls)C.MasterControls.bind(api,shell);
      if(C.CustomerSettings)C.CustomerSettings.bind(api,shell);
    }

    var api={render:render,customer:customer,loadCustomer:loadCustomer,getState:getState,setLocal:setLocal,setViewAs:setViewAs,setCustomerKey:setCustomerKey,setEditorOpen:setEditorOpen,setCustomerSettingsOpen:setCustomerSettingsOpen,setDrawerOpen:setDrawerOpen,setDrawerTab:setDrawerTab,getSavePayload:getSavePayload};
    return api;
  }
  window.SyncEtc.Components.SiteShell={create:create,version:VERSION};
})();
/* COMPONENT-site-shell-v1.js - END */
