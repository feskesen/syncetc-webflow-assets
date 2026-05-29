/* COMPONENT-site-shell-v6.js - BEGIN */
(function () {
  "use strict";
  window.SyncEtc = window.SyncEtc || {};
  window.SyncEtc.Components = window.SyncEtc.Components || {};
  var VERSION="COMPONENT-site-shell-v6";
  function clean(v){return v==null?"":String(v).trim();}
  function customerNameFromKey(key){if(key==="150th_aero")return"150th Aero Flying Club";if(key==="demo_flying_club")return"Demo Flying Club";return clean(key).replace(/_/g," ").replace(/\b\w/g,function(m){return m.toUpperCase();})||"Demo Flying Club";}

  function create(mountId,options){
    var state=Object.assign({customerKey:"demo_flying_club",customerName:"Demo Flying Club",pageKey:"events",audience:"public",viewAs:"public",showControls:true,showBanner:false,siteEditorOpen:false,local:{},version:VERSION},options||{});
    state.local=Object.assign({},state.local||{});
    var qs=new URLSearchParams(window.location.search);
    var q=clean(qs.get("customer_key")||qs.get("customer"));
    if(q){state.customerKey=q;state.customerName=customerNameFromKey(q);}
    var mount=document.getElementById(mountId||"syncetc-webflow-mount");
    if(!mount)throw new Error("SyncEtc mount not found.");

    function effectiveAudience(){if(state.viewAs==="platform"||state.viewAs==="admin")return"admin";if(state.viewAs==="member")return"member";return"public";}
    function customer(){return window.SyncEtc.Components.CustomerStyle.getCustomerConfig(state.customerKey,state.local||{});}
    function loadCustomer(){return window.SyncEtc.Components.CustomerStyle.loadCustomerConfig(state.customerKey).then(function(c){state.customerName=c.customerName||customerNameFromKey(state.customerKey);return c;});}
    function setLocal(field,value){state.local[field]=value;}
    function setViewAs(value){state.viewAs=value||"public";state.audience=effectiveAudience();}
    function setCustomerKey(value){state.customerKey=value||"demo_flying_club";state.customerName=customerNameFromKey(state.customerKey);state.local={};}
    function setEditorOpen(value){state.siteEditorOpen=!!value;}
    function getState(){return JSON.parse(JSON.stringify(state));}
    function getSavePayload(){
      var c=customer(), content=c.content||{}, local=state.local||{};
      return {
        customer_key:state.customerKey,
        style_preset_key:local.stylePresetKey||c.stylePresetKey||"classic-aviation",
        theme_overrides:{},
        brand_overrides:{announcement:local.announcement||c.announcement||""},
        content_overrides:Object.assign({},content,{calendar:Object.assign({},content.calendar||{},{title:local.calendarTitle||(content.calendar&&content.calendar.title)||"Calendar",intro:local.calendarIntro||(content.calendar&&content.calendar.intro)||"Upcoming meetings, fly-outs, work sessions, and other events."})}),
        module_overrides:{},
        enabled_modules:c.modules||{},
        is_enabled:true
      };
    }

    function render(pageHtml){
      var C=window.SyncEtc.Components,U=C.Utils;
      C.BaseStyles.install();
      var c=customer(), shellId="syncetc-component-shell", audience=effectiveAudience();
      mount.innerHTML=`<div id="${shellId}" class="syncetc-shell" data-se-customer-key="${U.esc(state.customerKey)}" data-se-view-as="${U.esc(state.viewAs)}">${state.showControls&&C.MasterControls?C.MasterControls.render({customer:c,customerKey:state.customerKey,pageKey:state.pageKey,audience:audience,viewAs:state.viewAs,siteEditorOpen:state.siteEditorOpen,showBanner:state.showBanner,local:state.local,version:state.version}):""}${C.MasterHeader.render({customer:c,pageKey:state.pageKey,audience:audience,viewAs:state.viewAs})}<main data-se-page-body>${pageHtml||""}</main>${C.MasterFooter.render({customer:c,pageKey:state.pageKey,audience:audience,viewAs:state.viewAs})}</div>`;
      var shell=document.getElementById(shellId);
      C.CustomerStyle.applyCustomerCssVars(shell,c);
      if(C.MasterControls)C.MasterControls.bind(api,shell);
    }

    var api={render:render,customer:customer,loadCustomer:loadCustomer,getState:getState,setLocal:setLocal,setViewAs:setViewAs,setCustomerKey:setCustomerKey,setEditorOpen:setEditorOpen,getSavePayload:getSavePayload};
    return api;
  }
  window.SyncEtc.Components.SiteShell={create:create,version:VERSION};
})();
/* COMPONENT-site-shell-v6.js - END */
