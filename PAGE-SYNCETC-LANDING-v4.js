/* PAGE-SYNCETC-LANDING-v4.js | SyncEtc Hub compact brand-only header | Generated: 2026-06-03 */
(function(){
  "use strict";

  var VERSION="PAGE-SYNCETC-LANDING-v4";
  var ROOT_ID="syncetc-webflow-mount";
  var STYLE_ID="syncetc-landing-v4-style";
  var SUPABASE_URL="https://ocdaohkiwonjmirqkjww.supabase.co";
  var ANON_KEY=window.SYNCETC_SUPABASE_ANON_KEY||window.SUPABASE_ANON_KEY||"";
  var LOGO_URL="https://ocdaohkiwonjmirqkjww.supabase.co/storage/v1/object/public/public-site-assets/!SyncEtc-branding/SyncEtc-logo-compact.png";

  var state={authEmail:"",authToken:"",authRefreshToken:"",authExpiresAt:0,authBusy:false,error:"",notice:""};

  function clean(v){return String(v==null?"":v).trim();}
  function esc(s){return clean(s).replace(/[&<>"']/g,function(ch){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[ch];});}
  function looksLikeJwt(token){token=clean(token);return /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(token);}
  function decodeJwtPayload(token){try{if(!looksLikeJwt(token))return {};var part=token.split(".")[1]||"";part=part.replace(/-/g,"+").replace(/_/g,"/");while(part.length%4)part+="=";return JSON.parse(atob(part));}catch(e){return {};}}
  function looksLikeSupabaseUserJwt(token){if(!looksLikeJwt(token))return false;var p=decodeJwtPayload(token);if(!p||typeof p!=="object")return false;if(p.exp&&Number(p.exp)*1000<Date.now())return false;return !!(p.sub&&(p.aud==="authenticated"||p.role==="authenticated"||(p.iss&&String(p.iss).indexOf("supabase")>=0)));}
  function findAccessToken(value,depth){if(!value||depth>6)return "";if(typeof value==="string"){if(looksLikeSupabaseUserJwt(value))return value;try{return findAccessToken(JSON.parse(value),depth+1);}catch(e){return "";}}if(typeof value!=="object")return "";if(value.access_token&&looksLikeSupabaseUserJwt(value.access_token))return value.access_token;if(value.session&&value.session.access_token&&looksLikeSupabaseUserJwt(value.session.access_token))return value.session.access_token;if(value.data&&value.data.session&&value.data.session.access_token&&looksLikeSupabaseUserJwt(value.data.session.access_token))return value.data.session.access_token;var keys=Object.keys(value);for(var i=0;i<keys.length;i++){var found=findAccessToken(value[keys[i]],depth+1);if(found)return found;}return "";}
  function authStorageKey(){return "syncetc.platformAdminSession.v1";}
  function saveAuthSession(session){try{if(!session||!session.access_token)return;var expiresAt=0;if(session.expires_at)expiresAt=Number(session.expires_at)*1000;if(!expiresAt&&session.expires_in)expiresAt=Date.now()+Number(session.expires_in)*1000;var email=clean(session.user&&session.user.email);var record={access_token:session.access_token,refresh_token:session.refresh_token||"",expires_at:expiresAt,email:email};localStorage.setItem(authStorageKey(),JSON.stringify(record));state.authToken=record.access_token;state.authRefreshToken=record.refresh_token;state.authExpiresAt=record.expires_at;state.authEmail=record.email;}catch(e){}}
  function clearAuthSession(){try{localStorage.removeItem(authStorageKey());}catch(e){}state.authToken="";state.authRefreshToken="";state.authExpiresAt=0;state.authEmail="";}
  function loadAuthSession(){try{var raw=localStorage.getItem(authStorageKey());if(!raw)return false;var record=JSON.parse(raw);if(!record||!looksLikeSupabaseUserJwt(record.access_token))return false;if(record.expires_at&&Number(record.expires_at)<Date.now()){clearAuthSession();return false;}state.authToken=record.access_token;state.authRefreshToken=record.refresh_token||"";state.authExpiresAt=Number(record.expires_at||0);state.authEmail=clean(record.email);return true;}catch(e){return false;}}
  function getToken(){if(state.authToken&&looksLikeSupabaseUserJwt(state.authToken))return state.authToken;if(loadAuthSession()&&state.authToken&&looksLikeSupabaseUserJwt(state.authToken))return state.authToken;try{for(var i=0;i<localStorage.length;i++){var key=localStorage.key(i)||"";if(key.indexOf("auth")>=0||key.indexOf("sb-")===0||key.indexOf("supabase")>=0){var found=findAccessToken(localStorage.getItem(key),0);if(found)return found;}}}catch(e){}return "";}
  function isAuthed(){return !!getToken();}

  function toolHeaderButton(label,href,active){return '<a class="syncetc-tool-header-btn '+(active?'is-active':'')+'" href="'+esc(href)+'">'+esc(label)+'</a>';}
  function renderToolHeader(){return '<section class="syncetc-tool-header"><div class="syncetc-tool-header-main"><div class="syncetc-tool-header-brandline"><img class="syncetc-tool-header-logo" src="'+esc(LOGO_URL)+'" alt="SyncEtc"><h1 class="syncetc-tool-header-title">Hub</h1></div></div><nav class="syncetc-tool-header-nav" aria-label="SyncEtc tools">'+toolHeaderButton("Hub","/syncetc-landing-page",true)+toolHeaderButton("Customer Manager","/customer-manager",false)+toolHeaderButton("Layout Designer","/design-studio",false)+toolHeaderButton("Page Setup","/page-builder",false)+'</nav></section>';}

  function installStyle(){if(document.getElementById(STYLE_ID))return;var css=document.createElement("style");css.id=STYLE_ID;css.textContent=[
    "#"+ROOT_ID+"{font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#071633;min-height:100vh;background:radial-gradient(circle at 10% 5%,rgba(0,164,224,.10),transparent 30%),radial-gradient(circle at 90% 15%,rgba(255,91,0,.10),transparent 28%),linear-gradient(180deg,#f7fbff,#ffffff 52%,#f9fbff)}",
    ".se-hub{max-width:1180px;margin:0 auto;padding:42px 18px 70px}",
    ".syncetc-tool-header{position:relative;overflow:hidden;border:1px solid rgba(7,22,51,.12);border-radius:30px;background:linear-gradient(135deg,rgba(255,255,255,.97),rgba(239,248,255,.97));padding:24px 28px;box-shadow:0 20px 60px rgba(7,22,51,.09);margin-bottom:18px;display:flex;align-items:flex-end;justify-content:space-between;gap:18px;flex-wrap:wrap}",
    ".syncetc-tool-header:before{content:'';position:absolute;inset:auto -120px -160px auto;width:340px;height:340px;border-radius:999px;background:linear-gradient(135deg,rgba(0,164,224,.14),rgba(255,91,0,.13));filter:blur(4px)}",
    ".syncetc-tool-header-main{position:relative;min-width:260px;flex:1}",
    ".syncetc-tool-header-brandline{display:flex;align-items:center;gap:20px;flex-wrap:wrap;margin-bottom:0}",
    ".syncetc-tool-header-logo{display:block;width:180px;max-width:46vw;height:auto}",
    ".syncetc-tool-header-title{font-size:42px;line-height:1;margin:0;letter-spacing:-.04em;color:#071633;font-style:italic;font-weight:950}",
    ".syncetc-tool-header-eyebrow{font-size:12px;font-weight:950;letter-spacing:.14em;text-transform:uppercase;color:#0072bc;margin-bottom:8px}",
    ".syncetc-tool-header-description{max-width:760px;margin:0;color:rgba(7,22,51,.72);font-size:15px;line-height:1.55}",
    ".syncetc-tool-header-nav{position:relative;display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:flex-end}",
    ".syncetc-tool-header-btn{display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(7,22,51,.16);border-radius:999px;padding:10px 14px;background:#fff;color:#071633!important;text-decoration:none!important;font-weight:950;font-size:13px;box-shadow:0 8px 22px rgba(7,22,51,.08);white-space:nowrap}",
    ".syncetc-tool-header-btn.is-active{background:#071633;color:#fff!important;border-color:#071633;box-shadow:0 10px 24px rgba(7,22,51,.16)}",
    ".se-panel{position:relative;overflow:hidden;border:1px solid rgba(7,22,51,.12);border-radius:30px;background:linear-gradient(135deg,rgba(255,255,255,.97),rgba(239,248,255,.97));padding:30px;box-shadow:0 20px 60px rgba(7,22,51,.08)}",
    ".se-panel:before{content:'';position:absolute;inset:auto -130px -170px auto;width:350px;height:350px;border-radius:999px;background:linear-gradient(135deg,rgba(0,164,224,.13),rgba(255,91,0,.12));filter:blur(4px)}",
    ".se-panel-inner{position:relative}",
    ".se-signout-row{display:flex;justify-content:flex-end;margin-bottom:16px}",
    ".se-pill{display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(7,22,51,.14);border-radius:999px;padding:10px 14px;background:#fff;color:#071633!important;text-decoration:none!important;font-weight:900;font-size:13px;box-shadow:0 8px 22px rgba(7,22,51,.08);cursor:pointer}",
    ".se-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:6px}",
    ".se-card{position:relative;border:1px solid rgba(7,22,51,.12);border-radius:26px;background:#fff;padding:22px;text-decoration:none!important;color:#071633!important;box-shadow:0 14px 38px rgba(7,22,51,.07);overflow:hidden;min-height:158px;display:flex;flex-direction:column;justify-content:space-between}",
    ".se-card:before{content:'';position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(90deg,#0072bc,#00a4e0,#ff5b00)}",
    ".se-card h2{margin:0;font-size:22px;letter-spacing:-.02em;color:#071633}",
    ".se-card p{margin:10px 0 18px;color:rgba(7,22,51,.68);font-size:14px;line-height:1.5}",
    ".se-arrow{font-weight:950;color:#ff5b00}",
    ".se-login{max-width:520px;border:1px solid rgba(7,22,51,.12);border-radius:26px;background:#fff;padding:22px;box-shadow:0 14px 38px rgba(7,22,51,.07)}",
    ".se-input{width:100%;box-sizing:border-box;border:1px solid rgba(7,22,51,.18);border-radius:16px;padding:12px 13px;font-weight:750;background:#fff;color:#071633;margin:6px 0 11px}",
    ".se-btn{display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(7,22,51,.18);border-radius:999px;padding:11px 16px;background:#071633;color:#fff;text-decoration:none;font-weight:950;font-size:14px;box-shadow:0 10px 24px rgba(7,22,51,.12);cursor:pointer}",
    ".se-msg{margin:0 0 14px;border-radius:16px;padding:12px 14px;font-size:13px;font-weight:800}",
    ".se-msg.err{background:#fff1f1;color:#8a1f1f;border:1px solid rgba(138,31,31,.2)}",
    ".se-msg.ok{background:#ecfdf3;color:#13522b;border:1px solid rgba(19,82,43,.2)}",
    ".se-foot{margin-top:18px;color:rgba(7,22,51,.55);font-size:12px;font-weight:800}",
    "@media(max-width:900px){.se-grid{grid-template-columns:1fr}.se-panel{padding:22px}}",
    "@media(max-width:760px){.syncetc-tool-header{padding:22px;align-items:flex-start}.syncetc-tool-header-logo{width:150px}.syncetc-tool-header-title{font-size:34px}.syncetc-tool-header-nav{justify-content:flex-start}}"
  ].join("\n");document.head.appendChild(css);}

  function renderLoggedOut(){return '<section class="se-login"><h2 style="margin:0 0 8px;font-size:22px;">Login</h2><p style="margin:0 0 14px;color:rgba(7,22,51,.68);line-height:1.5;">Sign in to access SyncEtc company tools.</p><input class="se-input" type="email" autocomplete="username" placeholder="Email" data-se-email value="'+esc(state.authEmail||"")+'"><input class="se-input" type="password" autocomplete="current-password" placeholder="Password" data-se-password><button class="se-btn" type="button" data-se-action="signin">'+(state.authBusy?"Logging in...":"Login")+'</button></section>';}
  function renderTools(){return '<div class="se-grid"><a class="se-card" href="/customer-manager"><div><h2>Customer Manager</h2><p>Create customers, manage customer status, archive/recover records, and run guarded delete testing.</p></div><div class="se-arrow">Open Customer Manager →</div></a><a class="se-card" href="/design-studio"><div><h2>Layout Designer</h2><p>Adjust customer-wide appearance, brand styling, design profiles, and layout behavior.</p></div><div class="se-arrow">Open Layout Designer →</div></a><a class="se-card" href="/page-builder"><div><h2>Page Setup</h2><p>Initialize missing pages, protect existing customer pages, and prepare page-level configuration.</p></div><div class="se-arrow">Open Page Setup →</div></a></div>';}
  function render(){installStyle();var root=document.getElementById(ROOT_ID);if(!root)return;var logged=isAuthed();root.innerHTML='<main class="se-hub">'+renderToolHeader()+'<section class="se-panel"><div class="se-panel-inner">'+(logged?'<div class="se-signout-row"><button class="se-pill" type="button" data-se-action="signout">Sign out</button></div>':'')+(state.notice?'<div class="se-msg ok">'+esc(state.notice)+'</div>':'')+(state.error?'<div class="se-msg err">'+esc(state.error)+'</div>':'')+(logged?renderTools():renderLoggedOut())+'<div class="se-foot">'+esc(VERSION)+'</div></div></section></main>';bind();}
  function bind(){document.querySelectorAll("[data-se-action]").forEach(function(btn){btn.addEventListener("click",function(){var a=btn.getAttribute("data-se-action");if(a==="signin")signIn();if(a==="signout"){clearAuthSession();state.notice="Signed out.";state.error="";render();}});});var pass=document.querySelector("[data-se-password]");if(pass)pass.addEventListener("keydown",function(e){if(e.key==="Enter")signIn();});}
  function signIn(){var email=clean(document.querySelector("[data-se-email]")&&document.querySelector("[data-se-email]").value);var password=String((document.querySelector("[data-se-password]")&&document.querySelector("[data-se-password]").value)||"");if(!email||!password){state.error="Enter email and password.";state.notice="";render();return;}state.authBusy=true;state.error="";state.notice="Logging in...";render();fetch(SUPABASE_URL+"/auth/v1/token?grant_type=password",{method:"POST",headers:{"Content-Type":"application/json","apikey":ANON_KEY},body:JSON.stringify({email:email,password:password})}).then(function(res){return res.json().catch(function(){return null;}).then(function(body){if(!res.ok||!body||!body.access_token)throw new Error((body&&(body.error_description||body.msg||body.error))||("HTTP "+res.status));return body;});}).then(function(session){saveAuthSession(session);state.authBusy=false;state.error="";state.notice="Logged in.";render();}).catch(function(err){state.authBusy=false;state.error="Login failed. "+(err&&err.message?err.message:String(err));state.notice="";render();});}
  window.SYNCETC_LANDING_V4_STATE=function(){var out={version:VERSION,authed:isAuthed(),authEmail:state.authEmail,logo:LOGO_URL};console.log("SYNCETC_LANDING_V4_STATE",out);return out;};
  function start(){loadAuthSession();render();}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();

/* PAGE-SYNCETC-LANDING-v4.js - END */
