/* syncetc-homepage-current-all-in-one.js - BEGIN */
/*
  Hosted SyncEtc Webflow asset.
  Update 90 / v18: expanded homepage admin workspace plus master controls test lab.
  Upload this single file to the current hosted root file for now:
  syncetc-homepage-current-all-in-one.js

  Current Webflow loader should use cache-buster:
  ?v=14-admin-edit-preview
*/
(function syncetcInjectHostedShell() {
  const STYLE_ID = "syncetc-homepage-current-style";
  const ROOT_ID = "syncetc-generated-homepage-v2";
  const MOUNT_ID = "syncetc-webflow-mount";

  const css = "/* syncetc_generated_homepage_css_v10_deployment_access_preview - BEGIN */\n\n.syncetc-homepage-v2 {\n  --se-bg-underlay-image: none;\n  --se-bg-underlay-opacity: 0;\n  --se-bg-underlay-overlay-color: transparent;\n  --se-bg-underlay-overlay-opacity: 0;\n  --se-bg-underlay-blur: 0px;\n  --se-bg-underlay-position: center center;\n  --se-bg-underlay-size: cover;\n  --se-bg-underlay-repeat: no-repeat;\n  --se-bg-underlay-attachment: scroll;\n  --se-bg: #f4f8fb;\n  --se-surface: rgba(255, 255, 255, 0.86);\n  --se-surface-solid: #ffffff;\n  --se-text: #15324a;\n  --se-muted: #5d7285;\n  --se-primary: #12365a;\n  --se-accent: #2f80c4;\n  --se-border: rgba(18, 54, 90, 0.14);\n  --se-shadow: 0 18px 50px rgba(18, 54, 90, 0.12);\n  --se-radius: 24px;\n  --se-radius-small: 16px;\n  --se-max-width: 1180px;\n\n  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif;\n  color: var(--se-text);\n  background:\n    radial-gradient(circle at top left, rgba(47, 128, 196, 0.16), transparent 32rem),\n    linear-gradient(180deg, #f8fbff 0%, var(--se-bg) 100%);\n  padding: 32px 18px 44px;\n  box-sizing: border-box;\n}\n\n.syncetc-homepage-v2.is-underlay-enabled {\n  position: relative;\n  isolation: isolate;\n  overflow: hidden;\n}\n\n.syncetc-homepage-v2.is-underlay-enabled::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  z-index: -2;\n  background-image: var(--se-bg-underlay-image);\n  background-position: var(--se-bg-underlay-position);\n  background-size: var(--se-bg-underlay-size);\n  background-repeat: var(--se-bg-underlay-repeat);\n  background-attachment: var(--se-bg-underlay-attachment);\n  opacity: var(--se-bg-underlay-opacity);\n  filter: blur(var(--se-bg-underlay-blur));\n  transform: scale(1.02);\n}\n\n.syncetc-homepage-v2.is-underlay-enabled::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  background: var(--se-bg-underlay-overlay-color);\n  opacity: var(--se-bg-underlay-overlay-opacity);\n  pointer-events: none;\n}\n\n.syncetc-homepage-v2.is-underlay-disabled::before,\n.syncetc-homepage-v2.is-underlay-disabled::after {\n  content: none;\n}\n\n\n\n.syncetc-homepage-v2.has-se-background-underlay {\n  position: relative;\n  isolation: isolate;\n  background:\n    linear-gradient(\n      rgba(255,255,255, calc(1 - var(--se-underlay-overlay-opacity, 0.55))),\n      rgba(255,255,255, calc(1 - var(--se-underlay-overlay-opacity, 0.55)))\n    ),\n    var(--se-underlay-image),\n    radial-gradient(circle at top left, rgba(47, 128, 196, 0.16), transparent 32rem),\n    linear-gradient(180deg, #f8fbff 0%, var(--se-bg) 100%);\n  background-position: center center, var(--se-underlay-position, center center), center center, center center;\n  background-size: auto, var(--se-underlay-size, cover), auto, auto;\n  background-repeat: no-repeat, var(--se-underlay-repeat, no-repeat), no-repeat, no-repeat;\n  background-attachment: scroll, var(--se-underlay-attachment, scroll), scroll, scroll;\n}\n\n.syncetc-homepage-v2.has-se-background-underlay::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  z-index: -2;\n  background-image: var(--se-underlay-image);\n  background-position: var(--se-underlay-position, center center);\n  background-size: var(--se-underlay-size, cover);\n  background-repeat: var(--se-underlay-repeat, no-repeat);\n  background-attachment: var(--se-underlay-attachment, scroll);\n  opacity: var(--se-underlay-opacity, 0.22);\n  filter: blur(var(--se-underlay-blur, 0px));\n}\n\n.syncetc-homepage-v2.has-se-background-underlay::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  background: var(--se-underlay-overlay-color, transparent);\n  opacity: var(--se-underlay-overlay-opacity, 0.55);\n}\n\n.syncetc-homepage-v2 *,\n.syncetc-homepage-v2 *::before,\n.syncetc-homepage-v2 *::after {\n  box-sizing: border-box;\n}\n\n.syncetc-homepage-v2 .se-shell {\n  max-width: var(--se-max-width);\n  margin: 0 auto;\n}\n\n.syncetc-homepage-v2 .se-topbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 14px;\n  margin-bottom: 18px;\n  padding: 14px 16px;\n  border: 1px solid var(--se-border);\n  background: var(--se-surface);\n  border-radius: var(--se-radius-small);\n  box-shadow: 0 8px 22px rgba(18, 54, 90, 0.08);\n  backdrop-filter: blur(12px);\n}\n\n.syncetc-homepage-v2 .se-brand-lockup {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  min-width: 0;\n}\n\n.syncetc-homepage-v2 .se-logo-mark {\n  width: 42px;\n  height: 42px;\n  flex: 0 0 auto;\n  border-radius: 14px;\n  background:\n    linear-gradient(135deg, var(--se-primary), var(--se-accent));\n  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.28);\n}\n\n.syncetc-homepage-v2 .se-brand-text {\n  min-width: 0;\n}\n\n.syncetc-homepage-v2 .se-customer-name {\n  font-size: 16px;\n  line-height: 1.15;\n  font-weight: 800;\n  color: var(--se-primary);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.syncetc-homepage-v2 .se-customer-subtitle {\n  font-size: 12px;\n  color: var(--se-muted);\n  margin-top: 3px;\n}\n\n.syncetc-homepage-v2 .se-switcher {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n}\n\n.syncetc-homepage-v2 .se-switcher button,\n.syncetc-homepage-v2 .se-button {\n  border: 1px solid var(--se-border);\n  border-radius: 999px;\n  background: var(--se-surface-solid);\n  color: var(--se-primary);\n  font-weight: 750;\n  font-size: 13px;\n  line-height: 1;\n  padding: 11px 14px;\n  cursor: pointer;\n  transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;\n}\n\n.syncetc-homepage-v2 .se-switcher button:hover,\n.syncetc-homepage-v2 .se-button:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 10px 22px rgba(18, 54, 90, 0.14);\n}\n\n.syncetc-homepage-v2 .se-switcher button.is-active,\n.syncetc-homepage-v2 .se-button-primary {\n  background: var(--se-primary);\n  color: #ffffff;\n  border-color: var(--se-primary);\n}\n\n.syncetc-homepage-v2 .se-status {\n  margin: 0 0 16px;\n  padding: 11px 14px;\n  border-radius: 999px;\n  display: inline-flex;\n  align-items: center;\n  gap: 9px;\n  font-size: 12px;\n  font-weight: 750;\n  color: var(--se-primary);\n  background: rgba(255,255,255,0.72);\n  border: 1px solid var(--se-border);\n}\n\n.syncetc-homepage-v2 .se-status-dot {\n  width: 9px;\n  height: 9px;\n  border-radius: 999px;\n  background: var(--se-accent);\n}\n\n.syncetc-homepage-v2 .se-section {\n  margin: 18px 0;\n  border: 1px solid var(--se-border);\n  background: var(--se-surface);\n  border-radius: var(--se-radius);\n  box-shadow: var(--se-shadow);\n  overflow: hidden;\n  backdrop-filter: blur(12px);\n}\n\n.syncetc-homepage-v2 .se-section-inner {\n  padding: 28px;\n}\n\n.syncetc-homepage-v2 .se-eyebrow {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 12px;\n  font-size: 11px;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  font-weight: 850;\n  color: var(--se-accent);\n}\n\n.syncetc-homepage-v2 h1,\n.syncetc-homepage-v2 h2,\n.syncetc-homepage-v2 h3 {\n  margin: 0;\n  color: var(--se-primary);\n  letter-spacing: -0.03em;\n}\n\n.syncetc-homepage-v2 h1 {\n  font-size: clamp(34px, 5vw, 62px);\n  line-height: 0.98;\n}\n\n.syncetc-homepage-v2 h2 {\n  font-size: clamp(24px, 3vw, 38px);\n  line-height: 1.05;\n}\n\n.syncetc-homepage-v2 h3 {\n  font-size: 18px;\n  line-height: 1.2;\n}\n\n.syncetc-homepage-v2 p {\n  margin: 10px 0 0;\n  color: var(--se-muted);\n  line-height: 1.58;\n  font-size: 16px;\n}\n\n.syncetc-homepage-v2 .se-hero-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1.18fr) minmax(280px, 0.82fr);\n  gap: 28px;\n  align-items: center;\n}\n\n.syncetc-homepage-v2 .se-hero-card {\n  min-height: 260px;\n  border-radius: calc(var(--se-radius) - 4px);\n  background:\n    linear-gradient(135deg, rgba(18,54,90,0.92), rgba(47,128,196,0.78)),\n    radial-gradient(circle at 30% 20%, rgba(255,255,255,0.38), transparent 14rem);\n  color: #ffffff;\n  padding: 26px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  overflow: hidden;\n  position: relative;\n}\n\n.syncetc-homepage-v2 .se-hero-card::after {\n  content: \"\";\n  position: absolute;\n  inset: auto -30px -80px auto;\n  width: 210px;\n  height: 210px;\n  border-radius: 999px;\n  background: rgba(255,255,255,0.14);\n}\n\n.syncetc-homepage-v2 .se-hero-card-title {\n  position: relative;\n  z-index: 1;\n  font-size: 15px;\n  font-weight: 850;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.syncetc-homepage-v2 .se-hero-card-grid {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  gap: 10px;\n}\n\n.syncetc-homepage-v2 .se-mini-metric {\n  border: 1px solid rgba(255,255,255,0.26);\n  border-radius: 16px;\n  padding: 12px;\n  background: rgba(255,255,255,0.13);\n}\n\n.syncetc-homepage-v2 .se-mini-metric strong {\n  display: block;\n  font-size: 22px;\n  line-height: 1;\n}\n\n.syncetc-homepage-v2 .se-mini-metric span {\n  display: block;\n  margin-top: 5px;\n  font-size: 12px;\n  opacity: 0.86;\n}\n\n.syncetc-homepage-v2 .se-button-row {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin-top: 18px;\n}\n\n.syncetc-homepage-v2 .se-banner {\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n.syncetc-homepage-v2 .se-banner-track {\n  display: inline-block;\n  min-width: 100%;\n  animation: se-marquee 22s linear infinite;\n  color: var(--se-primary);\n  font-weight: 800;\n}\n\n@keyframes se-marquee {\n  from { transform: translateX(0); }\n  to { transform: translateX(-50%); }\n}\n\n.syncetc-homepage-v2 .se-card-grid {\n  display: grid;\n  grid-template-columns: repeat(var(--se-grid-columns, 3), minmax(0, 1fr));\n  gap: 14px;\n  margin-top: 18px;\n}\n\n.syncetc-homepage-v2 .se-card {\n  border: 1px solid var(--se-border);\n  background: rgba(255,255,255,0.72);\n  border-radius: var(--se-radius-small);\n  padding: 18px;\n  min-height: 132px;\n}\n\n.syncetc-homepage-v2 .se-card-kicker {\n  font-size: 11px;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  font-weight: 850;\n  color: var(--se-accent);\n  margin-bottom: 9px;\n}\n\n\n.syncetc-homepage-v2 .se-card-badge {\n  display: inline-flex;\n  width: fit-content;\n  margin-top: 12px;\n  padding: 7px 9px;\n  border-radius: 999px;\n  background: rgba(47, 128, 196, 0.10);\n  border: 1px solid rgba(47, 128, 196, 0.18);\n  color: var(--se-primary);\n  font-size: 11px;\n  font-weight: 850;\n}\n\n.syncetc-homepage-v2 .se-placeholder {\n  min-height: 190px;\n  border: 1px dashed rgba(18,54,90,0.24);\n  border-radius: var(--se-radius-small);\n  display: grid;\n  place-items: center;\n  text-align: center;\n  padding: 24px;\n  margin-top: 18px;\n  color: var(--se-muted);\n  background: rgba(255,255,255,0.52);\n}\n\n\n\n\n\n.syncetc-homepage-v2 .se-deployment-preview {\n  margin: 0 0 18px;\n  border: 1px solid var(--se-border);\n  border-radius: var(--se-radius);\n  background: rgba(255,255,255,0.82);\n  box-shadow: 0 14px 34px rgba(18,54,90,0.10);\n  overflow: hidden;\n  backdrop-filter: blur(10px);\n}\n\n.syncetc-homepage-v2 .se-deployment-inner {\n  padding: 18px;\n}\n\n.syncetc-homepage-v2 .se-deployment-head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 14px;\n  margin-bottom: 14px;\n}\n\n.syncetc-homepage-v2 .se-deployment-title {\n  margin: 0;\n  font-size: 18px;\n  line-height: 1.1;\n  color: var(--se-primary);\n  font-weight: 950;\n  letter-spacing: -0.02em;\n}\n\n.syncetc-homepage-v2 .se-deployment-note {\n  margin-top: 5px;\n  color: var(--se-muted);\n  font-size: 13px;\n  line-height: 1.45;\n}\n\n.syncetc-homepage-v2 .se-deployment-grid {\n  display: grid;\n  grid-template-columns: minmax(270px, 0.95fr) minmax(300px, 1.2fr);\n  gap: 12px;\n}\n\n.syncetc-homepage-v2 .se-deployment-card {\n  border: 1px solid rgba(18,54,90,0.13);\n  border-radius: 18px;\n  padding: 13px;\n  background: rgba(255,255,255,0.72);\n}\n\n.syncetc-homepage-v2 .se-deployment-card-title {\n  margin: 0 0 8px;\n  color: var(--se-primary);\n  font-size: 13px;\n  font-weight: 950;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.syncetc-homepage-v2 .se-mode-flags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-top: 9px;\n}\n\n.syncetc-homepage-v2 .se-mode-flag {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 24px;\n  padding: 5px 8px;\n  border-radius: 999px;\n  border: 1px solid rgba(18,54,90,0.12);\n  background: rgba(234,245,255,0.75);\n  color: var(--se-primary);\n  font-size: 10px;\n  font-weight: 950;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n\n.syncetc-homepage-v2 .se-mode-flag.off {\n  background: rgba(241,245,249,0.78);\n  color: #7b8794;\n  opacity: 0.78;\n}\n\n.syncetc-homepage-v2 .se-module-cloud {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n}\n\n.syncetc-homepage-v2 .se-module-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  min-height: 30px;\n  padding: 7px 9px;\n  border-radius: 999px;\n  border: 1px solid rgba(18,54,90,0.12);\n  background: rgba(255,255,255,0.82);\n  color: var(--se-primary);\n  font-size: 12px;\n  font-weight: 850;\n}\n\n.syncetc-homepage-v2 .se-module-mini {\n  color: var(--se-muted);\n  font-size: 10px;\n  font-weight: 950;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n\n.syncetc-homepage-v2 .se-role-matrix {\n  margin-top: 12px;\n  border: 1px solid rgba(18,54,90,0.13);\n  border-radius: 18px;\n  padding: 13px;\n  background: rgba(255,255,255,0.72);\n}\n\n.syncetc-homepage-v2 .se-role-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 9px;\n}\n\n.syncetc-homepage-v2 .se-role-card {\n  border: 1px solid rgba(18,54,90,0.11);\n  border-radius: 15px;\n  padding: 10px;\n  background: rgba(255,255,255,0.70);\n}\n\n.syncetc-homepage-v2 .se-role-title {\n  color: var(--se-primary);\n  font-size: 12px;\n  font-weight: 950;\n  margin-bottom: 5px;\n}\n\n.syncetc-homepage-v2 .se-role-desc {\n  color: var(--se-muted);\n  font-size: 11px;\n  line-height: 1.35;\n  font-weight: 700;\n  margin-bottom: 7px;\n}\n\n.syncetc-homepage-v2 .se-role-capabilities {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n}\n\n.syncetc-homepage-v2 .se-role-cap {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 20px;\n  padding: 4px 6px;\n  border-radius: 999px;\n  background: rgba(234,245,255,0.75);\n  color: var(--se-primary);\n  font-size: 9.5px;\n  font-weight: 950;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n\n.syncetc-homepage-v2 .se-role-cap.write {\n  background: rgba(255,247,236,0.92);\n  color: #8a4d00;\n}\n\n.syncetc-homepage-v2 .se-role-cap.support {\n  background: rgba(245,243,255,0.92);\n  color: #5b21b6;\n}\n\n@media (max-width: 820px) {\n  .syncetc-homepage-v2 .se-deployment-grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n.syncetc-homepage-v2 .se-backbone-preview {\n  margin: 0 0 18px;\n  border: 1px solid var(--se-border);\n  border-radius: var(--se-radius);\n  background: rgba(255,255,255,0.80);\n  box-shadow: 0 14px 34px rgba(18,54,90,0.10);\n  overflow: hidden;\n  backdrop-filter: blur(10px);\n}\n\n.syncetc-homepage-v2 .se-backbone-inner {\n  padding: 18px;\n}\n\n.syncetc-homepage-v2 .se-backbone-head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 14px;\n  margin-bottom: 14px;\n}\n\n.syncetc-homepage-v2 .se-backbone-title {\n  margin: 0;\n  font-size: 18px;\n  line-height: 1.1;\n  color: var(--se-primary);\n  font-weight: 950;\n  letter-spacing: -0.02em;\n}\n\n.syncetc-homepage-v2 .se-backbone-note {\n  margin-top: 5px;\n  color: var(--se-muted);\n  font-size: 13px;\n  line-height: 1.45;\n}\n\n.syncetc-homepage-v2 .se-backbone-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(245px, 1fr));\n  gap: 12px;\n}\n\n.syncetc-homepage-v2 .se-backbone-card {\n  border: 1px solid rgba(18,54,90,0.13);\n  border-radius: 18px;\n  padding: 13px;\n  background: rgba(255,255,255,0.72);\n}\n\n.syncetc-homepage-v2 .se-backbone-card-title {\n  margin: 0 0 8px;\n  color: var(--se-primary);\n  font-size: 13px;\n  font-weight: 950;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.syncetc-homepage-v2 .se-backbone-list {\n  display: grid;\n  gap: 7px;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n.syncetc-homepage-v2 .se-backbone-line {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 8px;\n  padding: 8px 9px;\n  border: 1px solid rgba(18,54,90,0.10);\n  border-radius: 13px;\n  background: rgba(255,255,255,0.70);\n  color: var(--se-text);\n  font-size: 12px;\n  line-height: 1.25;\n  font-weight: 800;\n}\n\n.syncetc-homepage-v2 .se-backbone-subline {\n  display: block;\n  margin-top: 3px;\n  color: var(--se-muted);\n  font-size: 11px;\n  font-weight: 700;\n}\n\n.syncetc-homepage-v2 .se-backbone-badge {\n  flex: 0 0 auto;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 20px;\n  padding: 4px 7px;\n  border-radius: 999px;\n  border: 1px solid rgba(18,54,90,0.12);\n  background: rgba(234,245,255,0.82);\n  color: var(--se-primary);\n  font-size: 10px;\n  font-weight: 950;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n\n.syncetc-homepage-v2 .se-backbone-badge.warning,\n.syncetc-homepage-v2 .se-backbone-badge.restricted {\n  background: rgba(255,247,236,0.92);\n  color: #8a4d00;\n  border-color: rgba(138,77,0,0.20);\n}\n\n.syncetc-homepage-v2 .se-backbone-badge.error,\n.syncetc-homepage-v2 .se-backbone-badge.critical {\n  background: rgba(255,247,247,0.94);\n  color: #991b1b;\n  border-color: rgba(153,27,27,0.24);\n}\n\n.syncetc-homepage-v2 .se-backbone-empty {\n  color: var(--se-muted);\n  font-size: 12px;\n  font-weight: 750;\n  padding: 8px 0;\n}\n\n.syncetc-homepage-v2 .se-nav-preview {\n  margin: 0 0 18px;\n  border: 1px solid var(--se-border);\n  border-radius: var(--se-radius);\n  background: rgba(255,255,255,0.78);\n  box-shadow: 0 14px 34px rgba(18,54,90,0.10);\n  overflow: hidden;\n  backdrop-filter: blur(10px);\n}\n\n.syncetc-homepage-v2 .se-nav-preview-inner {\n  padding: 18px;\n}\n\n.syncetc-homepage-v2 .se-nav-preview-head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 14px;\n  margin-bottom: 12px;\n}\n\n.syncetc-homepage-v2 .se-nav-preview-title {\n  margin: 0;\n  font-size: 18px;\n  line-height: 1.1;\n  color: var(--se-primary);\n  font-weight: 900;\n  letter-spacing: -0.02em;\n}\n\n.syncetc-homepage-v2 .se-nav-preview-note {\n  margin-top: 5px;\n  color: var(--se-muted);\n  font-size: 13px;\n  line-height: 1.45;\n}\n\n.syncetc-homepage-v2 .se-nav-menu-stack {\n  display: grid;\n  gap: 10px;\n}\n\n.syncetc-homepage-v2 .se-nav-menu-row {\n  border: 1px solid var(--se-border);\n  border-radius: 18px;\n  padding: 10px;\n  background: rgba(255,255,255,0.72);\n}\n\n.syncetc-homepage-v2 .se-nav-menu-header {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 8px;\n}\n\n.syncetc-homepage-v2 .se-nav-menu-label {\n  display: inline-flex;\n  min-width: 70px;\n  justify-content: center;\n  padding: 5px 9px;\n  border-radius: 999px;\n  background: var(--se-primary);\n  color: #ffffff;\n  font-size: 11px;\n  font-weight: 900;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n}\n\n.syncetc-homepage-v2 .se-nav-menu-audience {\n  color: var(--se-muted);\n  font-size: 12px;\n  font-weight: 800;\n}\n\n.syncetc-homepage-v2 .se-nav-item-wrap,\n.syncetc-homepage-v2 .se-nav-group-items {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n\n.syncetc-homepage-v2 .se-nav-item {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 28px;\n  padding: 7px 10px;\n  border-radius: 999px;\n  border: 1px solid var(--se-border);\n  background: rgba(255,255,255,0.92);\n  color: var(--se-primary);\n  font-size: 12px;\n  font-weight: 850;\n  text-decoration: none;\n}\n\n.syncetc-homepage-v2 .se-nav-item.is-placeholder {\n  color: var(--se-muted);\n  opacity: 0.72;\n  cursor: default;\n}\n\n.syncetc-homepage-v2 .se-nav-groups {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));\n  gap: 9px;\n  margin-top: 8px;\n}\n\n.syncetc-homepage-v2 .se-nav-group {\n  border: 1px solid rgba(18,54,90,0.11);\n  border-radius: 15px;\n  padding: 10px;\n  background: rgba(255,255,255,0.58);\n}\n\n.syncetc-homepage-v2 .se-nav-group-title {\n  margin-bottom: 8px;\n  color: var(--se-primary);\n  font-size: 12px;\n  font-weight: 950;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.syncetc-homepage-v2 .se-nav-alerts {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n  margin-top: 12px;\n  padding-top: 12px;\n  border-top: 1px solid var(--se-border);\n}\n\n.syncetc-homepage-v2 .se-nav-alert {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  min-height: 30px;\n  padding: 7px 10px;\n  border-radius: 999px;\n  border: 1px solid rgba(153,27,27,0.26);\n  background: rgba(255,247,247,0.92);\n  color: #991b1b;\n  font-size: 12px;\n  font-weight: 900;\n  text-decoration: none;\n}\n\n.syncetc-homepage-v2 .se-nav-alert-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 999px;\n  background: #dc2626;\n  box-shadow: 0 0 0 3px rgba(220,38,38,0.12);\n}\n\n.syncetc-homepage-v2 .se-admin-preview-bar {\n  position: sticky;\n  top: 10px;\n  z-index: 50;\n  margin: 0 0 16px;\n  padding: 10px;\n  border: 1px solid rgba(138, 77, 0, 0.22);\n  border-radius: 18px;\n  background: rgba(255, 247, 236, 0.92);\n  box-shadow: 0 12px 26px rgba(138, 77, 0, 0.12);\n  backdrop-filter: blur(10px);\n}\n\n.syncetc-homepage-v2 .se-admin-preview-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  margin-bottom: 8px;\n  color: #7a4300;\n  font-size: 12px;\n  font-weight: 900;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.syncetc-homepage-v2 .se-admin-preview-links {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n\n.syncetc-homepage-v2 .se-admin-preview-link {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 30px;\n  padding: 7px 10px;\n  border-radius: 999px;\n  border: 1px solid rgba(138, 77, 0, 0.20);\n  background: #ffffff;\n  color: #7a4300;\n  font-size: 12px;\n  line-height: 1.1;\n  font-weight: 850;\n  text-decoration: none;\n}\n\n.syncetc-homepage-v2 .se-admin-preview-link:hover {\n  background: #8a4d00;\n  color: #ffffff;\n  text-decoration: none;\n}\n\n.syncetc-homepage-v2 .se-metadata-pill {\n  display: inline-flex;\n  margin-top: 8px;\n  padding: 7px 10px;\n  border-radius: 999px;\n  background: rgba(255,255,255,0.68);\n  border: 1px solid var(--se-border);\n  color: var(--se-muted);\n  font-size: 11px;\n  font-weight: 800;\n}\n\n.syncetc-homepage-v2 .se-footer-powered {\n  text-align: center;\n  font-size: 12px;\n  color: var(--se-muted);\n  margin-top: 24px;\n}\n\n.syncetc-homepage-v2 .se-error {\n  border-color: rgba(180, 35, 24, 0.26);\n  background: rgba(255, 245, 242, 0.9);\n}\n\n.syncetc-homepage-v2 .se-error h2 {\n  color: #9f1d12;\n}\n\n\n.syncetc-homepage-v2 .se-managed-asset-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  margin-left: 8px;\n  padding: 6px 9px;\n  border-radius: 999px;\n  border: 1px solid var(--se-border);\n  background: rgba(255,255,255,0.64);\n  color: var(--se-primary);\n  font-size: 11px;\n  font-weight: 800;\n}\n\n\n.syncetc-homepage-v2.is-se-bg-loading .se-status-dot {\n  animation: se-bg-pulse 1s ease-in-out infinite alternate;\n}\n\n.syncetc-homepage-v2.is-se-bg-ready .se-status-dot {\n  box-shadow: 0 0 0 5px rgba(47, 128, 196, 0.12);\n}\n\n@keyframes se-bg-pulse {\n  from { opacity: 0.45; transform: scale(0.9); }\n  to { opacity: 1; transform: scale(1.12); }\n}\n\n@media (max-width: 900px) {\n  .syncetc-homepage-v2 {\n  --se-bg-underlay-image: none;\n  --se-bg-underlay-opacity: 0;\n  --se-bg-underlay-overlay-color: transparent;\n  --se-bg-underlay-overlay-opacity: 0;\n  --se-bg-underlay-blur: 0px;\n  --se-bg-underlay-position: center center;\n  --se-bg-underlay-size: cover;\n  --se-bg-underlay-repeat: no-repeat;\n  --se-bg-underlay-attachment: scroll;\n    padding: 20px 12px 34px;\n  }\n\n  .syncetc-homepage-v2 .se-topbar {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n\n  .syncetc-homepage-v2 .se-switcher {\n    justify-content: flex-start;\n  }\n\n  .syncetc-homepage-v2 .se-hero-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .syncetc-homepage-v2 .se-card-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .syncetc-homepage-v2.is-underlay-enabled[data-se-mobile-underlay=\"simplified_gradient\"]::before {\n    content: none;\n  }\n\n  .syncetc-homepage-v2.is-underlay-enabled[data-se-mobile-underlay=\"disabled\"]::before,\n  .syncetc-homepage-v2.is-underlay-enabled[data-se-mobile-underlay=\"disabled\"]::after {\n    content: none;\n  }\n\n  .syncetc-homepage-v2.is-underlay-enabled[data-se-mobile-underlay=\"same_image\"]::before,\n  .syncetc-homepage-v2.is-underlay-enabled[data-se-mobile-underlay=\"alternate_image\"]::before {\n    background-attachment: scroll;\n  }\n\n  .syncetc-homepage-v2 .se-section-inner {\n    padding: 22px;\n  }\n}\n\n/* syncetc_generated_homepage_css_v10_deployment_access_preview - END */\n\n/* syncetc_generated_homepage_css_v11_prototype_health_strip */\n.syncetc-homepage-v2 .se-health-strip {\n  margin: 0 0 14px;\n  border: 1px solid rgba(18,54,90,0.14);\n  border-radius: 18px;\n  background:\n    linear-gradient(135deg, rgba(234,245,255,0.94), rgba(255,255,255,0.86)),\n    radial-gradient(circle at top right, rgba(47,128,196,0.14), transparent 40%);\n  box-shadow: 0 12px 28px rgba(18,54,90,0.10);\n  overflow: hidden;\n  backdrop-filter: blur(10px);\n}\n\n.syncetc-homepage-v2 .se-health-inner {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr);\n  gap: 12px;\n  align-items: center;\n  padding: 11px 14px;\n}\n\n.syncetc-homepage-v2 .se-health-label {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 28px;\n  padding: 6px 10px;\n  border-radius: 999px;\n  background: var(--se-primary);\n  color: #ffffff;\n  font-size: 10px;\n  line-height: 1;\n  font-weight: 950;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n\n.syncetc-homepage-v2 .se-health-items {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n  align-items: center;\n  min-width: 0;\n}\n\n.syncetc-homepage-v2 .se-health-pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 27px;\n  padding: 6px 9px;\n  border-radius: 999px;\n  border: 1px solid rgba(18,54,90,0.12);\n  background: rgba(255,255,255,0.82);\n  color: var(--se-primary);\n  font-size: 11px;\n  font-weight: 900;\n  white-space: nowrap;\n}\n\n.syncetc-homepage-v2 .se-health-pill.muted {\n  color: var(--se-muted);\n}\n\n.syncetc-homepage-v2 .se-health-pill.good {\n  background: rgba(236,253,245,0.80);\n  border-color: rgba(16,185,129,0.22);\n  color: #047857;\n}\n\n.syncetc-homepage-v2 .se-health-pill.warn {\n  background: rgba(255,247,236,0.92);\n  border-color: rgba(138,77,0,0.20);\n  color: #8a4d00;\n}\n\n@media (max-width: 720px) {\n  .syncetc-homepage-v2 .se-health-inner {\n    grid-template-columns: 1fr;\n    gap: 8px;\n  }\n\n  .syncetc-homepage-v2 .se-health-label {\n    justify-self: start;\n  }\n}\n/* /syncetc_generated_homepage_css_v11_prototype_health_strip */\n\n\n/* syncetc_generated_homepage_css_v12_payload_boundary_preview */\n.syncetc-homepage-v2 .se-boundary-preview {\n  margin: 0 0 18px;\n  border: 1px solid var(--se-border);\n  border-radius: var(--se-radius);\n  background: rgba(255,255,255,0.84);\n  box-shadow: 0 14px 34px rgba(18,54,90,0.10);\n  overflow: hidden;\n  backdrop-filter: blur(10px);\n}\n\n.syncetc-homepage-v2 .se-boundary-inner {\n  padding: 18px;\n}\n\n.syncetc-homepage-v2 .se-boundary-head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 14px;\n  margin-bottom: 14px;\n}\n\n.syncetc-homepage-v2 .se-boundary-title {\n  margin: 0;\n  font-size: 18px;\n  line-height: 1.1;\n  color: var(--se-primary);\n  font-weight: 950;\n  letter-spacing: -0.02em;\n}\n\n.syncetc-homepage-v2 .se-boundary-note {\n  margin-top: 5px;\n  color: var(--se-muted);\n  font-size: 13px;\n  line-height: 1.45;\n}\n\n.syncetc-homepage-v2 .se-boundary-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(235px, 1fr));\n  gap: 10px;\n}\n\n.syncetc-homepage-v2 .se-boundary-surface {\n  border: 1px solid rgba(18,54,90,0.12);\n  border-radius: 16px;\n  padding: 11px;\n  background: rgba(255,255,255,0.72);\n}\n\n.syncetc-homepage-v2 .se-boundary-surface-title {\n  margin: 0 0 5px;\n  color: var(--se-primary);\n  font-size: 12px;\n  font-weight: 950;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n\n.syncetc-homepage-v2 .se-boundary-surface-sub {\n  color: var(--se-muted);\n  font-size: 11px;\n  line-height: 1.35;\n  font-weight: 750;\n  margin-bottom: 8px;\n}\n\n.syncetc-homepage-v2 .se-boundary-pills {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n}\n\n.syncetc-homepage-v2 .se-boundary-pill {\n  display: inline-flex;\n  min-height: 21px;\n  padding: 4px 7px;\n  border-radius: 999px;\n  border: 1px solid rgba(18,54,90,0.12);\n  background: rgba(234,245,255,0.78);\n  color: var(--se-primary);\n  font-size: 10px;\n  font-weight: 950;\n  letter-spacing: 0.03em;\n  text-transform: uppercase;\n}\n\n.syncetc-homepage-v2 .se-boundary-pill.warn {\n  background: rgba(255,247,236,0.92);\n  color: #8a4d00;\n  border-color: rgba(138,77,0,0.20);\n}\n\n.syncetc-homepage-v2 .se-boundary-pill.lock {\n  background: rgba(245,243,255,0.92);\n  color: #5b21b6;\n  border-color: rgba(91,33,182,0.18);\n}\n\n.syncetc-homepage-v2 .se-boundary-pill.off {\n  background: rgba(241,245,249,0.78);\n  color: #7b8794;\n}\n/* /syncetc_generated_homepage_css_v12_payload_boundary_preview */\n\n/* syncetc_update_86_homepage_admin_editing_preview_css - BEGIN */\n.syncetc-homepage-v2 .se-admin-editing-preview {\n  margin: 18px 0;\n  border: 1px solid rgba(18,54,90,0.14);\n  background: rgba(255,255,255,0.86);\n  border-radius: var(--se-radius);\n  box-shadow: var(--se-shadow);\n  overflow: hidden;\n  backdrop-filter: blur(12px);\n}\n\n.syncetc-homepage-v2 .se-admin-editing-inner {\n  padding: 22px;\n}\n\n.syncetc-homepage-v2 .se-admin-editing-header {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  align-items: flex-start;\n  margin-bottom: 14px;\n}\n\n.syncetc-homepage-v2 .se-admin-editing-title {\n  font-size: 18px;\n  line-height: 1.2;\n  font-weight: 900;\n  color: var(--se-primary);\n}\n\n.syncetc-homepage-v2 .se-admin-editing-note {\n  margin-top: 4px;\n  font-size: 12px;\n  line-height: 1.45;\n  color: var(--se-muted);\n}\n\n.syncetc-homepage-v2 .se-admin-editing-counts {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  justify-content: flex-end;\n}\n\n.syncetc-homepage-v2 .se-admin-editing-pill {\n  display: inline-flex;\n  align-items: center;\n  min-height: 22px;\n  padding: 5px 8px;\n  border-radius: 999px;\n  border: 1px solid rgba(18,54,90,0.12);\n  background: rgba(234,245,255,0.78);\n  color: var(--se-primary);\n  font-size: 10px;\n  font-weight: 950;\n  letter-spacing: 0.03em;\n  text-transform: uppercase;\n}\n\n.syncetc-homepage-v2 .se-admin-editing-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 10px;\n}\n\n.syncetc-homepage-v2 .se-admin-editing-field {\n  border: 1px solid rgba(18,54,90,0.12);\n  background: rgba(255,255,255,0.70);\n  border-radius: 16px;\n  padding: 12px;\n}\n\n.syncetc-homepage-v2 .se-admin-editing-field-label {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 8px;\n  color: var(--se-primary);\n  font-size: 12px;\n  font-weight: 900;\n}\n\n.syncetc-homepage-v2 .se-admin-editing-field-meta {\n  color: var(--se-muted);\n  font-size: 10px;\n  font-weight: 850;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  white-space: nowrap;\n}\n\n.syncetc-homepage-v2 .se-admin-editing-value {\n  min-height: 36px;\n  padding: 9px 10px;\n  border-radius: 12px;\n  background: rgba(241,245,249,0.88);\n  border: 1px solid rgba(18,54,90,0.10);\n  color: var(--se-text);\n  font-size: 13px;\n  line-height: 1.45;\n  word-break: break-word;\n}\n\n.syncetc-homepage-v2 .se-admin-editing-help {\n  margin-top: 7px;\n  color: var(--se-muted);\n  font-size: 11px;\n  line-height: 1.35;\n}\n\n.syncetc-homepage-v2 .se-admin-editing-empty {\n  padding: 14px;\n  border-radius: 16px;\n  background: rgba(255,247,236,0.88);\n  color: #8a4d00;\n  font-size: 13px;\n  font-weight: 800;\n}\n\n@media (max-width: 760px) {\n  .syncetc-homepage-v2 .se-admin-editing-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/* syncetc_update_86_homepage_admin_editing_preview_css - END */\n\n/* syncetc_current_public_preview_mode_toggle_v14 - BEGIN */\n.syncetc-homepage-v2 .se-mode-switcher {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  margin-bottom: 12px;\n}\n\n.syncetc-homepage-v2 .se-mode-switcher button {\n  border: 1px solid var(--se-border);\n  border-radius: 999px;\n  background: rgba(255,255,255,0.82);\n  color: var(--se-primary);\n  font-weight: 850;\n  font-size: 12px;\n  line-height: 1;\n  padding: 9px 12px;\n  cursor: pointer;\n}\n\n.syncetc-homepage-v2 .se-mode-switcher button.is-active {\n  background: var(--se-primary);\n  color: #ffffff;\n  border-color: var(--se-primary);\n}\n\n.syncetc-homepage-v2.is-se-public-preview [data-se-health-strip],\n.syncetc-homepage-v2.is-se-public-preview [data-se-admin-preview],\n.syncetc-homepage-v2.is-se-public-preview [data-se-admin-editing-preview],\n.syncetc-homepage-v2.is-se-public-preview [data-se-navigation-preview],\n.syncetc-homepage-v2.is-se-public-preview [data-se-backbone-preview],\n.syncetc-homepage-v2.is-se-public-preview [data-se-deployment-access-preview],\n.syncetc-homepage-v2.is-se-public-preview [data-se-boundary-preview] {\n  display: none !important;\n}\n\n.syncetc-homepage-v2.is-se-public-preview [data-se-customer-subtitle]::after {\n  content: \" \u2022 public preview mode\";\n}\n/* syncetc_current_public_preview_mode_toggle_v14 - END */";
  const html = "<!-- syncetc_generated_homepage_html_v10_deployment_access_preview - BEGIN -->\n<div id=\"syncetc-generated-homepage-v2\" class=\"syncetc-homepage-v2\" data-default-customer=\"150th Aero Flying Club\">\n\n  <div data-se-health-strip></div>\n  <div class=\"se-shell\">\n    <div class=\"se-topbar\">\n      <div class=\"se-brand-lockup\">\n        <div class=\"se-logo-mark\" aria-hidden=\"true\"></div>\n        <div class=\"se-brand-text\">\n          <div class=\"se-customer-name\" data-se-customer-name>Loading SyncEtc site...</div>\n          <div class=\"se-customer-subtitle\" data-se-customer-subtitle>Public render payload demo</div>\n        </div>\n      </div>\n\n      <div class=\"se-switcher\" aria-label=\"Customer preview switcher\">\n        <button type=\"button\" data-se-customer-switch=\"150th Aero Flying Club\" class=\"is-active\">150th Aero</button>\n        <button type=\"button\" data-se-customer-switch=\"Test Customer\">Test Customer</button>\n      </div>\n    </div>\n\n    <div class=\"se-status\" data-se-status>\n      <span class=\"se-status-dot\" aria-hidden=\"true\"></span>\n      <span>Waiting for payload...</span>\n    </div>\n\n    <div data-se-admin-preview></div>\n\n    <div data-se-navigation-preview></div>\n\n    <div data-se-backbone-preview></div>\n\n    <div data-se-deployment-access-preview></div>\n\n    <div data-se-boundary-preview></div>\n\n    <main data-se-homepage-sections aria-live=\"polite\"></main>\n\n    <div class=\"se-footer-powered\" data-se-powered-footer>\n      Powered by SyncEtc\n    </div>\n  </div>\n</div>\n<!-- syncetc_generated_homepage_html_v10_deployment_access_preview - END -->";

  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  let mount = document.getElementById(MOUNT_ID);
  if (!mount) {
    mount = document.createElement("div");
    mount.id = MOUNT_ID;
    const currentScript = document.currentScript;
    if (currentScript && currentScript.parentNode) {
      currentScript.parentNode.insertBefore(mount, currentScript);
    } else {
      document.body.appendChild(mount);
    }
  }

  if (!document.getElementById(ROOT_ID)) {
    mount.innerHTML = html;
  }
})();

/* syncetc_generated_homepage_js_v12_payload_boundary_preview - BEGIN */
(function () {
  const ROOT_ID = "syncetc-generated-homepage-v2";
  const ENDPOINT = "https://ocdaohkiwonjmirqkjww.supabase.co/functions/v1/customer-site-payload";

  const root = document.getElementById(ROOT_ID);
  if (!root) return;

  const customerNameEl = root.querySelector("[data-se-customer-name]");
  const customerSubtitleEl = root.querySelector("[data-se-customer-subtitle]");
  const statusEl = root.querySelector("[data-se-status]");
  const sectionsEl = root.querySelector("[data-se-homepage-sections]");
  const adminPreviewEl = root.querySelector("[data-se-admin-preview]");
  const navigationPreviewEl = root.querySelector("[data-se-navigation-preview]");
  const backbonePreviewEl = root.querySelector("[data-se-backbone-preview]");
  const deploymentAccessPreviewEl = root.querySelector("[data-se-deployment-access-preview]");
  const healthStripEl = root.querySelector("[data-se-health-strip]");
  const boundaryPreviewEl = root.querySelector("[data-se-boundary-preview]");
  const poweredFooterEl = root.querySelector("[data-se-powered-footer]");
  const switchButtons = Array.from(root.querySelectorAll("[data-se-customer-switch]"));

  const state = {
    currentCustomer: root.getAttribute("data-default-customer") || "150th Aero Flying Club",
    lastPayload: null
  };

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function asBool(value, fallback) {
    if (value === undefined || value === null) return fallback;
    if (typeof value === "boolean") return value;
    if (typeof value === "string") return value.toLowerCase() === "true";
    return Boolean(value);
  }

  function setCssVariables(payload) {
    const prefs = payload.render_visual_preferences || {};
    const assets = Array.isArray(payload.brand_assets) ? payload.brand_assets : [];
    const primaryLogo = assets.find((item) => item.type === "logo_primary") || {};
    const pattern = assets.find((item) => item.type === "brand_pattern") || {};

    const primary = primaryLogo.dominant_color || pattern.dominant_color || "#12365A";
    const accent = pattern.dominant_color || primaryLogo.dominant_color || "#2F80C4";
    const bg = pattern.background_color || primaryLogo.background_color || "#F4F8FB";

    root.style.setProperty("--se-primary", primary);
    root.style.setProperty("--se-accent", accent);
    root.style.setProperty("--se-bg", bg);

    const gridCount = parseInt(prefs.grid_column_count || "3", 10);
    root.style.setProperty("--se-grid-columns", String(Number.isFinite(gridCount) ? Math.max(1, Math.min(gridCount, 4)) : 3));

    const widthPreset = prefs.site_max_width_preset || prefs.content_width_preset || "normal";
    const maxWidthMap = {
      narrow: "980px",
      normal: "1080px",
      wide: "1180px",
      full: "1320px"
    };
    root.style.setProperty("--se-max-width", maxWidthMap[widthPreset] || "1180px");

    const shape = prefs.card_shape || "soft";
    const radiusMap = {
      square: "8px",
      rounded: "18px",
      soft: "24px",
      pill: "30px"
    };
    root.style.setProperty("--se-radius", radiusMap[shape] || "24px");
  }

  function setStatus(message) {
    if (!statusEl) return;
    statusEl.innerHTML = '<span class="se-status-dot" aria-hidden="true"></span><span>' + escapeHtml(message) + '</span>';
  }

  function sectionShell(section, innerHtml, extraClass) {
    const label = section.section_label || section.section_kind || "Homepage section";
    const sectionClass = extraClass ? " se-section " + extraClass : " se-section";
    return (
      '<section class="' + sectionClass.trim() + '" data-section-key="' + escapeHtml(section.section_key) + '" data-section-kind="' + escapeHtml(section.section_kind) + '">' +
        '<div class="se-section-inner">' +
          '<div class="se-eyebrow">' + escapeHtml(label) + '</div>' +
          innerHtml +
        '</div>' +
      '</section>'
    );
  }

  function renderHero(section, payload, settings) {
    const heading = section.heading || payload.customer_name || "Customer homepage";
    const subheading = section.subheading || settings.mission_body || "A configurable homepage rendered from the SyncEtc public payload.";
    const contactVisible = asBool(settings.show_contact_button, true);
    const contactLabel = settings.contact_button_label || "Contact Us";
    const contactUrl = settings.contact_button_url || "#";
    const presetLabel = payload.homepage_config?.page_layout_preset_label || "Homepage preset";
    const verticalLabel = payload.homepage_config?.intended_vertical_label || "Customer site";

    return sectionShell(section,
      '<div class="se-hero-grid">' +
        '<div>' +
          '<h1>' + escapeHtml(heading) + '</h1>' +
          '<p>' + escapeHtml(subheading) + '</p>' +
          '<div class="se-button-row">' +
            (contactVisible ? '<a class="se-button se-button-primary" href="' + escapeHtml(contactUrl) + '">' + escapeHtml(contactLabel) + '</a>' : '') +
            '<span class="se-button" aria-label="Layout preset">' + escapeHtml(presetLabel) + '</span>' +
          '</div>' +
        '</div>' +
        '<aside class="se-hero-card">' +
          '<div class="se-hero-card-title">' + escapeHtml(verticalLabel) + '</div>' +
          '<div class="se-hero-card-grid">' +
            '<div class="se-mini-metric"><strong>v2</strong><span>Payload version</span></div>' +
            '<div class="se-mini-metric"><strong>' + escapeHtml((payload.homepage_config?.homepage_sections || []).length) + '</strong><span>Configured sections</span></div>' +
            '<div class="se-mini-metric"><strong>Live</strong><span>Supabase Edge Function</span></div>' +
          '</div>' +
        '</aside>' +
      '</div>'
    );
  }

  function renderMission(section, settings) {
    if (!asBool(settings.show_mission_section, true)) return "";
    const heading = section.heading || settings.mission_heading || "Our Mission";
    const body = section.body_text || settings.mission_body || "Mission copy is controlled by homepage page-specific settings.";
    return sectionShell(section,
      '<h2>' + escapeHtml(heading) + '</h2>' +
      '<p>' + escapeHtml(body) + '</p>'
    );
  }

  function renderScrollingBanner(section, settings) {
    if (!asBool(settings.show_scrolling_banner, true)) return "";
    const text = settings.scrolling_banner_text || section.heading || "Updates • Resources • Events";
    return sectionShell(section,
      '<div class="se-banner" aria-label="Scrolling announcement banner">' +
        '<div class="se-banner-track">' + escapeHtml(text + " • " + text + " • ") + '</div>' +
      '</div>'
    );
  }

  function getConfigCards(section) {
    const config = section.config || {};
    const possibleLists = [
      config.cards,
      config.summary_cards,
      config.document_cards,
      config.resource_cards,
      config.feature_cards,
      config.cta_cards
    ];

    const rawCards = possibleLists.find(function (list) {
      return Array.isArray(list) && list.length > 0;
    });

    if (!rawCards) return null;

    return rawCards.map(function (card, index) {
      if (Array.isArray(card)) {
        return {
          kicker: card[0] || "Configured",
          title: card[0] || "Configured",
          body: card[1] || "",
          badge: card[2] || ""
        };
      }

      return {
        kicker: card.kicker || card.label || card.category || ("Card " + (index + 1)),
        title: card.title || card.heading || card.label || ("Card " + (index + 1)),
        body: card.body || card.text || card.description || card.summary || "",
        badge: card.badge || card.status || card.tag || "",
        cta_label: card.cta_label || card.ctaLabel || "",
        cta_url: card.cta_url || card.ctaUrl || ""
      };
    });
  }

  function getFallbackCards(section) {
    const kind = section.section_kind || "feature_cards";
    const cardsByKind = {
      feature_cards: [
        { kicker: "Configurable", title: "Configurable", body: "Cards render because this section exists in homepage_config.", badge: "Fallback" },
        { kicker: "Reusable", title: "Reusable", body: "Same frontend structure supports different customer verticals.", badge: "Fallback" },
        { kicker: "Portable", title: "Portable", body: "Payload can move from Webflow to another frontend later.", badge: "Fallback" }
      ],
      status_summary: [
        { kicker: "Public payload", title: "Public payload", body: "Render-safe customer status and visual settings.", badge: "Fallback" },
        { kicker: "Customer-specific", title: "Customer-specific", body: "Test Customer uses a different preset and style profile.", badge: "Fallback" },
        { kicker: "Bounded controls", title: "Bounded controls", body: "Safe settings prevent customers from breaking layouts.", badge: "Fallback" }
      ],
      documents: [
        { kicker: "Documents", title: "Documents", body: "Future document/resource cards will come from Supabase records.", badge: "Fallback" },
        { kicker: "Rich text", title: "Rich text", body: "Future editable text fields can use controlled onscreen editors.", badge: "Fallback" },
        { kicker: "Storage", title: "Storage", body: "Future files can move toward Supabase Storage.", badge: "Fallback" }
      ],
      events: [
        { kicker: "Events", title: "Events", body: "Future event cards can render from Supabase event records.", badge: "Fallback" },
        { kicker: "RSVP", title: "RSVP", body: "RSVP and attendance workflows can be customer-scoped.", badge: "Fallback" },
        { kicker: "Not hard-coded", title: "Not hard-coded", body: "This section appears because homepage_config includes it.", badge: "Fallback" }
      ]
    };

    return cardsByKind[kind] || [
      { kicker: "Configured section", title: "Configured section", body: "This section was rendered from homepage_config.", badge: "Fallback" },
      { kicker: "Section kind", title: "Section kind", body: kind, badge: "Fallback" },
      { kicker: "Display mode", title: "Display mode", body: section.display_mode || "standard", badge: "Fallback" }
    ];
  }

  function renderCardGrid(cards) {
    if (!cards || !cards.length) return "";

    return '<div class="se-card-grid">' +
      cards.map(function (card) {
        const cta = card.cta_label && card.cta_url
          ? '<div class="se-button-row"><a class="se-button" href="' + escapeHtml(card.cta_url) + '">' + escapeHtml(card.cta_label) + '</a></div>'
          : "";

        return (
          '<article class="se-card">' +
            '<div class="se-card-kicker">' + escapeHtml(card.kicker || "Configured") + '</div>' +
            '<h3>' + escapeHtml(card.title || card.kicker || "Configured Card") + '</h3>' +
            (card.body ? '<p>' + escapeHtml(card.body) + '</p>' : '') +
            (card.badge ? '<span class="se-card-badge">' + escapeHtml(card.badge) + '</span>' : '') +
            cta +
          '</article>'
        );
      }).join("") +
    '</div>';
  }

  function renderCards(section, payload) {
    const configuredCards = getConfigCards(section);
    const cards = configuredCards || getFallbackCards(section);
    const sourceLabel = configuredCards ? "Supabase-configured cards" : "Fallback cards";

    return sectionShell(section,
      '<h2>' + escapeHtml(section.heading || section.section_label || "Configured Section") + '</h2>' +
      (section.subheading ? '<p>' + escapeHtml(section.subheading) + '</p>' : '') +
      (section.body_text ? '<p>' + escapeHtml(section.body_text) + '</p>' : '') +
      '<div class="se-status" style="margin-top:16px;margin-bottom:0;"><span class="se-status-dot" aria-hidden="true"></span><span>' + escapeHtml(sourceLabel) + '</span></div>' +
      renderCardGrid(cards)
    );
  }

  function renderGallery(section, settings) {
    if (!asBool(settings.show_rotating_gallery, true)) return "";
    return sectionShell(section,
      '<h2>' + escapeHtml(section.heading || "Gallery") + '</h2>' +
      '<div class="se-placeholder">Rotating gallery placeholder. Future version should connect this section to approved media records or Supabase Storage-backed assets.</div>'
    );
  }

  function renderContactCta(section, settings) {
    if (!asBool(settings.show_contact_button, true)) return "";
    const heading = section.heading || "Contact Us";
    const body = section.body_text || "This CTA is controlled by page-specific homepage settings.";
    const label = section.cta_label || settings.contact_button_label || "Contact Us";
    const url = section.cta_url || settings.contact_button_url || "#";
    const configuredCards = getConfigCards(section);

    return sectionShell(section,
      '<h2>' + escapeHtml(heading) + '</h2>' +
      '<p>' + escapeHtml(body) + '</p>' +
      '<div class="se-button-row"><a class="se-button se-button-primary" href="' + escapeHtml(url) + '">' + escapeHtml(label) + '</a></div>' +
      (configuredCards ? renderCardGrid(configuredCards) : '')
    );
  }

  function renderPoweredBy(section, payload) {
    const division = payload.powered_by_syncetc?.powered_by_division_label || payload.homepage_config?.intended_vertical_label || "";
    return sectionShell(section,
      '<h2>Powered by SyncEtc</h2>' +
      '<p>Public site payload, customer configuration, page sections, and style controls are rendered from Supabase.</p>' +
      (division ? '<p><strong>Division:</strong> ' + escapeHtml(division) + '</p>' : '')
    );
  }

  function renderGeneric(section) {
    return sectionShell(section,
      '<h2>' + escapeHtml(section.heading || section.section_label || "Configured Section") + '</h2>' +
      '<p>This configured section is present in homepage_config. A specialized renderer can be added later for section kind: <strong>' + escapeHtml(section.section_kind || "unknown") + '</strong>.</p>'
    );
  }

  function renderSection(section, payload, settings) {
    if (!asBool(section.enabled, true)) return "";

    switch (section.section_kind) {
      case "hero":
        return renderHero(section, payload, settings);
      case "mission":
        return renderMission(section, settings);
      case "scrolling_banner":
        return renderScrollingBanner(section, settings);
      case "feature_cards":
      case "status_summary":
      case "documents":
      case "events":
        return renderCards(section, payload);
      case "rotating_gallery":
        return renderGallery(section, settings);
      case "contact_cta":
        return renderContactCta(section, settings);
      case "powered_by":
        return renderPoweredBy(section, payload);
      default:
        return renderGeneric(section);
    }
  }



  function getBackgroundUnderlay(settings) {
    const pageConfig = settings.homepage_config || {};
    const underlay = pageConfig.background_underlay || {};
    const managedAsset = underlay.managed_asset || {};
    const managedUrl = managedAsset.asset_url || managedAsset.url || "";
    const directUrl = underlay.asset_url || "";
    return {
      ...underlay,
      resolved_asset_url: managedUrl || directUrl,
      resolved_alt_text: managedAsset.alt_text || underlay.asset_alt_text || "",
      resolved_asset_label: managedAsset.asset_label || "",
      has_managed_asset: Boolean(managedAsset.id),
      managed_asset_id: managedAsset.id || ""
    };
  }

  function chooseResponsiveTransformWidth(transformConfig) {
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if (viewportWidth <= 760) return Number(transformConfig.phone_width || 900);
    if (viewportWidth <= 1100) return Number(transformConfig.tablet_width || 1200);
    return Number(transformConfig.desktop_width || 1800);
  }

  function buildSupabaseTransformUrl(assetUrl, transformConfig) {
    if (!assetUrl || !asBool(transformConfig.enabled, false)) return assetUrl;
    if (!assetUrl.includes("/storage/v1/object/public/")) return assetUrl;

    const width = chooseResponsiveTransformWidth(transformConfig);
    const quality = Number(transformConfig.quality || 76);
    const resize = transformConfig.resize || "cover";
    const format = transformConfig.format || "webp";

    const transformedBase = assetUrl.replace("/storage/v1/object/public/", "/storage/v1/render/image/public/");
    const separator = transformedBase.includes("?") ? "&" : "?";
    const params = new URLSearchParams();

    if (Number.isFinite(width) && width > 0) params.set("width", String(width));
    if (Number.isFinite(quality) && quality >= 20 && quality <= 100) params.set("quality", String(quality));
    if (resize) params.set("resize", resize);
    if (format) params.set("format", format);

    return transformedBase + separator + params.toString();
  }

  function clearBackgroundUnderlay(underlay) {
    root.classList.remove("has-se-background-underlay", "is-se-bg-loading", "is-se-bg-ready");
    root.style.removeProperty("--se-underlay-image");
    root.style.removeProperty("--se-underlay-opacity");
    root.style.removeProperty("--se-underlay-overlay-color");
    root.style.removeProperty("--se-underlay-overlay-opacity");
    root.style.removeProperty("--se-underlay-blur");
    root.style.removeProperty("--se-underlay-position");
    root.style.removeProperty("--se-underlay-size");
    root.style.removeProperty("--se-underlay-repeat");
    root.style.removeProperty("--se-underlay-attachment");
    root.setAttribute("data-se-background-source-mode", underlay?.source_mode || "none");
    root.setAttribute("data-se-managed-asset", underlay?.has_managed_asset ? "true" : "false");
    root.setAttribute("data-se-transform-enabled", "false");
  }

  function applyBackgroundCssVariables(underlay, assetUrl) {
    root.style.setProperty("--se-underlay-image", 'url("' + assetUrl.replaceAll('"', "%22") + '")');
    root.style.setProperty("--se-underlay-opacity", String(underlay.opacity ?? 0.22));
    root.style.setProperty("--se-underlay-overlay-color", underlay.overlay_color || "transparent");
    root.style.setProperty("--se-underlay-overlay-opacity", String(underlay.overlay_opacity ?? 0.55));
    root.style.setProperty("--se-underlay-blur", String(underlay.blur_px ?? 0) + "px");
    root.style.setProperty("--se-underlay-position", underlay.position || "center center");
    root.style.setProperty("--se-underlay-size", underlay.size_mode || "cover");
    root.style.setProperty("--se-underlay-repeat", underlay.repeat_mode || "no-repeat");
    root.style.setProperty("--se-underlay-attachment", underlay.attachment || "scroll");
    root.classList.add("has-se-background-underlay", "is-se-bg-ready");
    root.classList.remove("is-se-bg-loading");
    root.setAttribute("data-se-background-source-mode", underlay.source_mode || "unknown");
    root.setAttribute("data-se-managed-asset", underlay.has_managed_asset ? "true" : "false");
    root.setAttribute("data-se-transform-enabled", asBool(underlay.image_transform?.enabled, false) ? "true" : "false");
  }

  function applyBackgroundUnderlay(settings) {
    const underlay = getBackgroundUnderlay(settings);
    const enabled = asBool(underlay.enabled, false);
    const transformConfig = underlay.image_transform || {};
    const preloadConfig = underlay.frontend_preload || {};
    const originalUrl = underlay.resolved_asset_url;
    const finalUrl = buildSupabaseTransformUrl(originalUrl, transformConfig);

    if (!enabled || !finalUrl) {
      clearBackgroundUnderlay(underlay);
      return underlay;
    }

    underlay.final_asset_url = finalUrl;
    underlay.transform_applied = finalUrl !== originalUrl;

    if (!asBool(preloadConfig.enabled, true)) {
      applyBackgroundCssVariables(underlay, finalUrl);
      return underlay;
    }

    root.classList.add("is-se-bg-loading");
    root.classList.remove("is-se-bg-ready");

    const timeoutMs = Number(preloadConfig.fallback_timeout_ms || 3500);
    let settled = false;

    const applyOnce = function () {
      if (settled) return;
      settled = true;
      applyBackgroundCssVariables(underlay, finalUrl);
    };

    const img = new Image();
    img.onload = applyOnce;
    img.onerror = function () {
      if (asBool(transformConfig.fallback_to_original_url, true) && finalUrl !== originalUrl) {
        const fallbackImg = new Image();
        fallbackImg.onload = function () {
          if (!settled) {
            settled = true;
            underlay.final_asset_url = originalUrl;
            underlay.transform_applied = false;
            applyBackgroundCssVariables(underlay, originalUrl);
          }
        };
        fallbackImg.onerror = applyOnce;
        fallbackImg.src = originalUrl;
      } else {
        applyOnce();
      }
    };
    img.src = finalUrl;

    window.setTimeout(applyOnce, timeoutMs);
    return underlay;
  }


  function findPageMetadata(payload, pageKey) {
    const list = Array.isArray(payload.page_metadata_preview) ? payload.page_metadata_preview : [];
    return list.find(function (item) {
      return item.page_key === pageKey;
    }) || null;
  }

  function applyPageMetadata(payload) {
    const metadata = findPageMetadata(payload, "homepage");
    if (!metadata) return null;

    if (metadata.computed_browser_title) {
      document.title = metadata.computed_browser_title;
    }

    const fav = metadata.favicon_asset || {};
    if (fav.asset_url && fav.is_publicly_usable !== false) {
      let link = document.querySelector('link[data-syncetc-favicon="true"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "icon");
        link.setAttribute("data-syncetc-favicon", "true");
        document.head.appendChild(link);
      }
      link.setAttribute("href", fav.asset_url);
    }

    return metadata;
  }

  function renderAdminPreviewControls(payload) {
    if (!adminPreviewEl) return;

    const controls = (Array.isArray(payload.page_admin_controls_preview) ? payload.page_admin_controls_preview : [])
      .filter(function (control) {
        return control.page_key === "homepage" && control.display_surface_key === "floating_page_admin_bar";
      })
      .sort(function (a, b) {
        return Number(a.sort_order || 0) - Number(b.sort_order || 0);
      });

    const metadata = findPageMetadata(payload, "homepage");
    const titleText = metadata && metadata.computed_browser_title ? metadata.computed_browser_title : "";

    if (!controls.length) {
      adminPreviewEl.innerHTML = "";
      return;
    }

    adminPreviewEl.innerHTML =
      '<div class="se-admin-preview-bar" role="region" aria-label="Admin preview controls">' +
        '<div class="se-admin-preview-header">' +
          '<span>Admin preview controls</span>' +
          '<span>Prototype only</span>' +
        '</div>' +
        '<div class="se-admin-preview-links">' +
          controls.map(function (control) {
            return '<a class="se-admin-preview-link" href="' + escapeHtml(control.control_url || "#") + '" title="' + escapeHtml(control.control_description || "") + '">' + escapeHtml(control.control_label || control.control_key) + '</a>';
          }).join("") +
        '</div>' +
        (titleText ? '<div class="se-metadata-pill">Browser title: ' + escapeHtml(titleText) + '</div>' : '') +
      '</div>';
  }



  function valueToDisplay(value) {
    if (value === null || typeof value === "undefined") return "";
    if (typeof value === "string") return value;
    if (typeof value === "boolean") return value ? "true" : "false";
    if (typeof value === "number") return String(value);
    try {
      return JSON.stringify(value);
    } catch (error) {
      return String(value);
    }
  }

  function ensureAdminEditingPreviewEl() {
    let existing = root.querySelector("[data-se-admin-editing-preview]");
    if (existing) return existing;
    if (!adminPreviewEl || !adminPreviewEl.parentNode) return null;
    existing = document.createElement("div");
    existing.setAttribute("data-se-admin-editing-preview", "");
    adminPreviewEl.parentNode.insertBefore(existing, adminPreviewEl.nextSibling);
    return existing;
  }

  function renderHomepageAdminEditingPreview(payload) {
    const target = ensureAdminEditingPreviewEl();
    if (!target) return;

    const preview = payload.homepage_admin_editing_preview || {};
    const fields = Array.isArray(preview.editable_fields) ? preview.editable_fields : [];
    const summary = preview.admin_editing_summary || {};

    if (!fields.length) {
      target.innerHTML =
        '<section class="se-admin-editing-preview se-admin-editing-workspace" aria-label="Homepage admin editing workspace">' +
          '<div class="se-admin-editing-inner">' +
            '<div class="se-admin-editing-empty">Homepage admin editing payload is not available yet. Run the latest admin editing SQL, then refresh with the current cache-busted JS.</div>' +
          '</div>' +
        '</section>';
      return;
    }

    const sortedFields = fields
      .slice()
      .sort(function (a, b) { return Number(a.sort_order || 0) - Number(b.sort_order || 0); });

    const customerFacing = summary.customer_facing_field_count || sortedFields.filter(function (field) { return field.is_customer_editable && !field.is_builder_only; }).length;
    const builderOnly = summary.builder_only_field_count || sortedFields.filter(function (field) { return field.is_builder_only; }).length;
    const draftValues = summary.draft_value_count || sortedFields.length;
    const visibleFields = sortedFields.slice(0, 14);

    function controlFor(field, index) {
      const key = field.field_key || ('field_' + index);
      const label = field.field_label || key;
      const valueText = valueToDisplay(field.value);
      const type = String(field.control_key || field.value_type_key || 'text').toLowerCase();
      const disabledReason = field.is_builder_only ? 'Builder only' : (field.is_customer_editable ? 'Customer editable' : 'Locked');
      const disabled = field.is_customer_editable || field.is_builder_only ? '' : ' disabled';
      const common = ' data-se-edit-field="' + escapeHtml(key) + '" data-se-edit-label="' + escapeHtml(label) + '"';
      let control = '';

      if (type.indexOf('textarea') >= 0 || String(valueText).length > 90) {
        control = '<textarea class="se-admin-form-control" rows="3"' + common + disabled + '>' + escapeHtml(valueText || '') + '</textarea>';
      } else if (type.indexOf('boolean') >= 0 || type.indexOf('toggle') >= 0 || type.indexOf('switch') >= 0) {
        const checked = valueText === 'true' ? ' checked' : '';
        control = '<label class="se-admin-toggle"><input type="checkbox"' + common + checked + disabled + '><span>' + escapeHtml(valueText === 'true' ? 'On' : 'Off') + '</span></label>';
      } else {
        control = '<input class="se-admin-form-control" type="text" value="' + escapeHtml(valueText || '') + '"' + common + disabled + '>';
      }

      return '<div class="se-admin-form-row" data-se-admin-form-row>' +
        '<div class="se-admin-form-label-line">' +
          '<label>' + escapeHtml(label) + '</label>' +
          '<span>' + escapeHtml(disabledReason) + '</span>' +
        '</div>' +
        control +
        (field.help_text ? '<div class="se-admin-editing-help">' + escapeHtml(field.help_text) + '</div>' : '') +
      '</div>';
    }

    target.innerHTML =
      '<section class="se-admin-editing-preview se-admin-editing-workspace" aria-label="Homepage admin editing workspace">' +
        '<div class="se-admin-editing-inner">' +
          '<div class="se-admin-editing-header">' +
            '<div>' +
              '<div class="se-admin-editing-title">Homepage admin editing workspace</div>' +
              '<div class="se-admin-editing-note">Interactive prototype form. Local changes update the draft preview below, but Save Draft and Publish are intentionally disabled until authenticated write actions are built.</div>' +
            '</div>' +
            '<div class="se-admin-editing-counts">' +
              '<span class="se-admin-editing-pill">' + escapeHtml(String(customerFacing)) + ' customer fields</span>' +
              '<span class="se-admin-editing-pill">' + escapeHtml(String(builderOnly)) + ' builder-only</span>' +
              '<span class="se-admin-editing-pill">' + escapeHtml(String(draftValues)) + ' draft values</span>' +
              '<span class="se-admin-editing-pill">JS v17</span>' +
            '</div>' +
          '</div>' +
          '<div class="se-admin-workspace-actions">' +
            '<span data-se-unsaved-count>Unsaved local changes: 0</span>' +
            '<button type="button" disabled>Save draft - future</button>' +
            '<button type="button" disabled>Publish changes - future</button>' +
          '</div>' +
          '<div class="se-admin-form-grid">' + visibleFields.map(controlFor).join('') + '</div>' +
          '<details class="se-admin-draft-preview" open>' +
            '<summary>Local draft preview</summary>' +
            '<pre data-se-draft-json>{}</pre>' +
          '</details>' +
        '</div>' +
      '</section>';

    const changeMap = {};
    const countEl = target.querySelector('[data-se-unsaved-count]');
    const jsonEl = target.querySelector('[data-se-draft-json]');

    function updateDraftPreview() {
      if (countEl) {
        countEl.textContent = 'Unsaved local changes: ' + Object.keys(changeMap).length;
      }
      if (jsonEl) {
        jsonEl.textContent = JSON.stringify(changeMap, null, 2);
      }
    }

    target.querySelectorAll('[data-se-edit-field]').forEach(function (control) {
      control.addEventListener('input', function () {
        const key = control.getAttribute('data-se-edit-field');
        const label = control.getAttribute('data-se-edit-label') || key;
        const value = control.type === 'checkbox' ? control.checked : control.value;
        changeMap[key] = { label: label, value: value };
        updateDraftPreview();
      });
      control.addEventListener('change', function () {
        const key = control.getAttribute('data-se-edit-field');
        const label = control.getAttribute('data-se-edit-label') || key;
        const value = control.type === 'checkbox' ? control.checked : control.value;
        changeMap[key] = { label: label, value: value };
        updateDraftPreview();
      });
    });

    updateDraftPreview();
  }

  function renderNavigationItem(item) {
    const label = item.item_label || item.item_key || "Item";
    const href = item.href || "#";
    const placeholderClass = item.is_placeholder || item.item_type_key === "note" ? " is-placeholder" : "";
    const target = item.target ? ' target="' + escapeHtml(item.target) + '"' : "";
    const rel = item.rel ? ' rel="' + escapeHtml(item.rel) + '"' : "";

    if (item.is_placeholder || item.item_type_key === "note") {
      return '<span class="se-nav-item' + placeholderClass + '">' + escapeHtml(label) + '</span>';
    }

    return '<a class="se-nav-item' + placeholderClass + '" href="' + escapeHtml(href) + '"' + target + rel + '>' + escapeHtml(label) + '</a>';
  }

  function renderNavigationPreview(payload) {
    if (!navigationPreviewEl) return;

    const menus = Array.isArray(payload.navigation_preview) ? payload.navigation_preview : [];
    const alerts = Array.isArray(payload.navigation_alerts_preview) ? payload.navigation_alerts_preview : [];

    if (!menus.length) {
      navigationPreviewEl.innerHTML = "";
      return;
    }

    const menuHtml = menus
      .slice()
      .sort(function (a, b) { return Number(a.sort_order || 0) - Number(b.sort_order || 0); })
      .map(function (menu) {
        const items = Array.isArray(menu.items) ? menu.items : [];
        const groups = Array.isArray(menu.groups) ? menu.groups : [];

        const topItemsHtml = items.length
          ? '<div class="se-nav-item-wrap">' + items.map(renderNavigationItem).join("") + '</div>'
          : "";

        const groupsHtml = groups.length
          ? '<div class="se-nav-groups">' + groups.map(function (group) {
              const groupItems = Array.isArray(group.items) ? group.items : [];
              return (
                '<div class="se-nav-group">' +
                  '<div class="se-nav-group-title">' + escapeHtml(group.group_label || group.group_key) + '</div>' +
                  '<div class="se-nav-group-items">' + groupItems.map(renderNavigationItem).join("") + '</div>' +
                '</div>'
              );
            }).join("") + '</div>'
          : "";

        return (
          '<div class="se-nav-menu-row">' +
            '<div class="se-nav-menu-header">' +
              '<span class="se-nav-menu-label">' + escapeHtml(menu.menu_label || menu.menu_key) + '</span>' +
              '<span class="se-nav-menu-audience">Audience: ' + escapeHtml(menu.audience_key || "public") + ' • Mode: ' + escapeHtml(menu.display_mode_key || "row") + '</span>' +
            '</div>' +
            topItemsHtml +
            groupsHtml +
          '</div>'
        );
      }).join("");

    const alertsHtml = alerts.length
      ? '<div class="se-nav-alerts">' + alerts.map(function (alert) {
          return '<a class="se-nav-alert" href="' + escapeHtml(alert.href || "#") + '"><span class="se-nav-alert-dot"></span><span>' + escapeHtml(alert.alert_text_template || alert.alert_label || alert.alert_key) + '</span></a>';
        }).join("") + '</div>'
      : "";

    navigationPreviewEl.innerHTML =
      '<section class="se-nav-preview" aria-label="Navigation preview">' +
        '<div class="se-nav-preview-inner">' +
          '<div class="se-nav-preview-head">' +
            '<div>' +
              '<h2 class="se-nav-preview-title">Navigation payload preview</h2>' +
              '<div class="se-nav-preview-note">Prototype view of public, member/team, admin menus, dropdown groups, and alerts from Supabase. Final production member/admin menus must be authenticated and scoped.</div>' +
            '</div>' +
            '<span class="se-managed-asset-pill">' + escapeHtml(menus.length) + ' menus</span>' +
          '</div>' +
          '<div class="se-nav-menu-stack">' + menuHtml + '</div>' +
          alertsHtml +
        '</div>' +
      '</section>';
  }



  function takeItems(list, limit) {
    return (Array.isArray(list) ? list : []).slice(0, limit || 4);
  }

  function lineWithBadge(label, subline, badge, badgeClass) {
    return (
      '<li class="se-backbone-line">' +
        '<span>' + escapeHtml(label || "Item") + (subline ? '<span class="se-backbone-subline">' + escapeHtml(subline) + '</span>' : '') + '</span>' +
        (badge ? '<span class="se-backbone-badge ' + escapeHtml(badgeClass || "") + '">' + escapeHtml(badge) + '</span>' : '') +
      '</li>'
    );
  }

  function renderBackbonePreview(payload) {
    if (!backbonePreviewEl) return;

    const alerts = Array.isArray(payload.alert_settings_preview) ? payload.alert_settings_preview : [];
    const email = payload.email_domain_integration_preview || {};
    const docs = payload.editable_document_archive_preview || {};
    const integrations = Array.isArray(payload.platform_integration_concepts_preview) ? payload.platform_integration_concepts_preview : [];

    const domains = Array.isArray(email.domain_profiles) ? email.domain_profiles : [];
    const providers = Array.isArray(email.email_provider_profiles) ? email.email_provider_profiles : [];
    const senders = Array.isArray(email.sender_identities) ? email.sender_identities : [];
    const dnsChecks = Array.isArray(email.dns_checks) ? email.dns_checks : [];
    const archives = Array.isArray(docs.archive_periods) ? docs.archive_periods : [];
    const editDocs = Array.isArray(docs.editable_documents) ? docs.editable_documents : [];

    if (!alerts.length && !domains.length && !providers.length && !senders.length && !editDocs.length && !integrations.length) {
      backbonePreviewEl.innerHTML = "";
      return;
    }

    const enabledAlerts = alerts.filter(function (a) { return a.is_enabled !== false; });
    const futureAlerts = alerts.filter(function (a) { return a.is_enabled === false; });

    const alertHtml = enabledAlerts.length
      ? takeItems(enabledAlerts, 6).map(function (a) {
          return lineWithBadge(a.label || a.alert_concept_key, a.text_template || a.module_key || "", a.severity_key || "alert", a.severity_key || "");
        }).join("")
      : '<div class="se-backbone-empty">No enabled alert settings.</div>';

    const futureAlertHtml = futureAlerts.length
      ? takeItems(futureAlerts, 4).map(function (a) {
          return lineWithBadge(a.label || a.alert_concept_key, a.text_template || "", "future", "warning");
        }).join("")
      : "";

    const emailHtml =
      takeItems(domains, 2).map(function (d) {
        return lineWithBadge(d.domain_name, "DNS: " + (d.dns_status_key || "unknown") + " • SSL: " + (d.ssl_status_key || "unknown"), d.current_mx_provider_key || "domain", "");
      }).join("") +
      takeItems(providers, 2).map(function (p) {
        return lineWithBadge(p.provider_label, "Status: " + (p.integration_status_key || "planned"), p.provider_key || "provider", "");
      }).join("") +
      takeItems(senders, 4).map(function (s) {
        return lineWithBadge(s.email_address, s.display_name || s.sender_role_key || "", s.verification_status_key || "identity", "");
      }).join("") +
      (dnsChecks.length ? lineWithBadge("DNS checks tracked", dnsChecks.length + " MX/SPF/DKIM/DMARC readiness checks", "checks", "warning") : "");

    const docHtml =
      takeItems(archives, 3).map(function (a) {
        return lineWithBadge(a.archive_label || a.archive_year, "Admin archive: " + (a.admin_archive_path || "planned"), String(a.archive_year || "year"), "");
      }).join("") +
      takeItems(editDocs, 4).map(function (d) {
        return lineWithBadge(d.document_title, "Versions: " + (d.version_count || 0) + " • " + (d.audience_key || "admin"), d.document_status_key || "draft", "");
      }).join("");

    const integrationGroups = integrations.reduce(function (acc, item) {
      const key = item.integration_category_key || "other";
      acc[key] = acc[key] || [];
      acc[key].push(item);
      return acc;
    }, {});

    const integrationHtml = Object.keys(integrationGroups).sort().slice(0, 6).map(function (key) {
      const group = integrationGroups[key];
      const labels = group.slice(0, 3).map(function (item) { return item.integration_label; }).join(", ");
      const sensitivity = group.some(function (item) { return item.production_sensitivity_key === "restricted"; }) ? "restricted" : "planned";
      return lineWithBadge(key, labels, sensitivity, sensitivity);
    }).join("");

    backbonePreviewEl.innerHTML =
      '<section class="se-backbone-preview" aria-label="Admin backbone preview">' +
        '<div class="se-backbone-inner">' +
          '<div class="se-backbone-head">' +
            '<div>' +
              '<h2 class="se-backbone-title">Admin backbone preview</h2>' +
              '<div class="se-backbone-note">Prototype view of alert settings, email/domain readiness, editable document archive, and integration concepts. Production versions must be authenticated and scoped.</div>' +
            '</div>' +
            '<span class="se-managed-asset-pill">payload v' + escapeHtml((payload.payload_meta && payload.payload_meta.payload_version) || "?") + '</span>' +
          '</div>' +
          '<div class="se-backbone-grid">' +
            '<article class="se-backbone-card">' +
              '<h3 class="se-backbone-card-title">Alerts</h3>' +
              '<ul class="se-backbone-list">' + alertHtml + futureAlertHtml + '</ul>' +
            '</article>' +
            '<article class="se-backbone-card">' +
              '<h3 class="se-backbone-card-title">Email / Domain</h3>' +
              '<ul class="se-backbone-list">' + (emailHtml || '<div class="se-backbone-empty">No email/domain profile yet.</div>') + '</ul>' +
            '</article>' +
            '<article class="se-backbone-card">' +
              '<h3 class="se-backbone-card-title">Documents / Archive</h3>' +
              '<ul class="se-backbone-list">' + (docHtml || '<div class="se-backbone-empty">No editable documents yet.</div>') + '</ul>' +
            '</article>' +
            '<article class="se-backbone-card">' +
              '<h3 class="se-backbone-card-title">Integration Concepts</h3>' +
              '<ul class="se-backbone-list">' + (integrationHtml || '<div class="se-backbone-empty">No integration concepts yet.</div>') + '</ul>' +
            '</article>' +
          '</div>' +
        '</div>' +
      '</section>';
  }



  function boolFlag(label, value) {
    return '<span class="se-mode-flag ' + (value ? '' : 'off') + '">' + escapeHtml(label) + ': ' + (value ? 'on' : 'off') + '</span>';
  }

  function renderDeploymentAccessPreview(payload) {
    if (!deploymentAccessPreviewEl) return;

    const deployment = payload.deployment_module_preview || {};
    const access = payload.access_role_matrix_preview || {};
    const profiles = Array.isArray(deployment.deployment_profiles) ? deployment.deployment_profiles : [];
    const modules = Array.isArray(deployment.enabled_modules) ? deployment.enabled_modules : [];
    const roles = Array.isArray(access.access_roles) ? access.access_roles : [];
    const actions = Array.isArray(access.permission_actions) ? access.permission_actions : [];

    if (!profiles.length && !modules.length && !roles.length) {
      deploymentAccessPreviewEl.innerHTML = "";
      return;
    }

    const profile = profiles[0] || {};
    const modulesByCategory = modules.reduce(function (acc, mod) {
      const key = mod.module_category_key || "other";
      acc[key] = acc[key] || [];
      acc[key].push(mod);
      return acc;
    }, {});

    const profileHtml = profile.deployment_mode_key
      ? (
        '<div class="se-backbone-line">' +
          '<span>' +
            escapeHtml(profile.deployment_mode_label || profile.deployment_mode_key) +
            '<span class="se-backbone-subline">' + escapeHtml(profile.description || profile.profile_label || "") + '</span>' +
          '</span>' +
          '<span class="se-backbone-badge">' + escapeHtml(profile.onboarding_status_key || "planning") + '</span>' +
        '</div>' +
        '<div class="se-mode-flags">' +
          boolFlag("public site", profile.public_site_enabled) +
          boolFlag("portal", profile.member_portal_enabled) +
          boolFlag("admin", profile.admin_tools_enabled) +
          boolFlag("embeds", profile.embed_tools_enabled) +
          boolFlag("api", profile.api_access_enabled) +
          boolFlag("SyncEtc homepage", profile.use_syncetc_homepage) +
          boolFlag("existing site", profile.use_customer_existing_public_site) +
        '</div>'
      )
      : '<div class="se-backbone-empty">No deployment profile.</div>';

    const moduleHtml = Object.keys(modulesByCategory).sort().map(function (category) {
      const group = modulesByCategory[category];
      return group.slice(0, 10).map(function (mod) {
        const modes = [
          mod.public_enabled ? "public" : null,
          mod.member_enabled ? "member" : null,
          mod.admin_enabled ? "admin" : null,
          mod.embed_enabled ? "embed" : null,
          mod.api_enabled ? "api" : null
        ].filter(Boolean).join("/");
        return '<span class="se-module-pill">' + escapeHtml(mod.module_label || mod.module_key) + '<span class="se-module-mini">' + escapeHtml(modes || category) + '</span></span>';
      }).join("");
    }).join("");

    const filteredRoles = roles.filter(function (role) {
      return [
        "customer_admin_viewer",
        "customer_admin_editor",
        "customer_admin_manager",
        "customer_owner",
        "syncetc_support_viewer",
        "syncetc_support_operator"
      ].indexOf(role.role_key) !== -1;
    });

    const roleHtml = filteredRoles.map(function (role) {
      const caps = role.capabilities || {};
      const capHtml = [
        caps.can_view ? '<span class="se-role-cap">view</span>' : '',
        caps.can_create ? '<span class="se-role-cap write">create</span>' : '',
        caps.can_edit ? '<span class="se-role-cap write">edit</span>' : '',
        caps.can_delete ? '<span class="se-role-cap write">delete</span>' : '',
        caps.can_approve ? '<span class="se-role-cap write">approve</span>' : '',
        caps.can_manage_users ? '<span class="se-role-cap write">users</span>' : '',
        caps.can_manage_billing ? '<span class="se-role-cap write">billing</span>' : '',
        caps.can_manage_security ? '<span class="se-role-cap write">security</span>' : '',
        caps.can_impersonate_view_as ? '<span class="se-role-cap support">view as</span>' : '',
        caps.can_support_view ? '<span class="se-role-cap support">support view</span>' : '',
        caps.can_support_operate ? '<span class="se-role-cap support">support ops</span>' : ''
      ].join("");

      return (
        '<article class="se-role-card">' +
          '<div class="se-role-title">' + escapeHtml(role.role_label || role.role_key) + '</div>' +
          '<div class="se-role-desc">' + escapeHtml(role.description || "") + '</div>' +
          '<div class="se-role-capabilities">' + capHtml + '</div>' +
        '</article>'
      );
    }).join("");

    deploymentAccessPreviewEl.innerHTML =
      '<section class="se-deployment-preview" aria-label="Deployment and access preview">' +
        '<div class="se-deployment-inner">' +
          '<div class="se-deployment-head">' +
            '<div>' +
              '<h2 class="se-deployment-title">Deployment and access preview</h2>' +
              '<div class="se-deployment-note">Prototype view of modular deployment mode, enabled modules, and read-only/write/support roles. This proves SyncEtc can be a full site, portal, embedded toolset, admin-only tool, or API/integration layer.</div>' +
            '</div>' +
            '<span class="se-managed-asset-pill">' + escapeHtml(modules.length) + ' modules</span>' +
          '</div>' +
          '<div class="se-deployment-grid">' +
            '<article class="se-deployment-card">' +
              '<h3 class="se-deployment-card-title">Deployment profile</h3>' +
              profileHtml +
            '</article>' +
            '<article class="se-deployment-card">' +
              '<h3 class="se-deployment-card-title">Enabled modules</h3>' +
              '<div class="se-module-cloud">' + (moduleHtml || '<div class="se-backbone-empty">No enabled modules.</div>') + '</div>' +
            '</article>' +
          '</div>' +
          '<div class="se-role-matrix">' +
            '<h3 class="se-deployment-card-title">Access roles: view-only, write, owner, support</h3>' +
            '<div class="se-role-grid">' + roleHtml + '</div>' +
            '<div class="se-backbone-subline" style="margin-top:10px;">' + escapeHtml(actions.length) + ' permission actions tracked. Real enforcement later requires Auth, RLS, server checks, and audit logs.</div>' +
          '</div>' +
        '</div>' +
      '</section>';
  }



  function countArray(value) {
    return Array.isArray(value) ? value.length : 0;
  }

  function countObjectArray(obj, key) {
    return obj && Array.isArray(obj[key]) ? obj[key].length : 0;
  }

  function getFirstDeploymentMode(payload) {
    const dep = payload.deployment_module_preview || {};
    const profiles = Array.isArray(dep.deployment_profiles) ? dep.deployment_profiles : [];
    const profile = profiles[0] || {};
    return profile.deployment_mode_label || profile.deployment_mode_key || "mode unknown";
  }

  function renderPrototypeHealthStrip(payload) {
    if (!healthStripEl) return;

    const meta = payload.payload_meta || {};
    const deployment = payload.deployment_module_preview || {};
    const access = payload.access_role_matrix_preview || {};
    const email = payload.email_domain_integration_preview || {};
    const docs = payload.editable_document_archive_preview || {};

    const customerName = payload.customer_short_name || payload.customer_name || "Customer";
    const payloadVersion = meta.payload_version || "?";
    const mode = getFirstDeploymentMode(payload);
    const moduleCount = countObjectArray(deployment, "enabled_modules");
    const navCount = countArray(payload.navigation_preview);
    const alertCount = countArray(payload.alert_settings_preview);
    const adminControlCount = countArray(payload.page_admin_controls_preview);
    const roleCount = countObjectArray(access, "access_roles");
    const senderCount = countObjectArray(email, "sender_identities");
    const docCount = countObjectArray(docs, "editable_documents");
    const metadataLoaded = countArray(payload.page_metadata_preview) > 0;

    const statusClass = moduleCount && navCount && adminControlCount && roleCount ? "good" : "warn";
    const statusText = moduleCount && navCount && adminControlCount && roleCount ? "quick check pass" : "check payload";

    healthStripEl.innerHTML =
      '<section class="se-health-strip" aria-label="Prototype diagnostic health strip">' +
        '<div class="se-health-inner">' +
          '<div class="se-health-label">Prototype diagnostic</div>' +
          '<div class="se-health-items">' +
            '<span class="se-health-pill good">' + escapeHtml(customerName) + '</span>' +
            '<span class="se-health-pill">payload v' + escapeHtml(payloadVersion) + '</span>' +
            '<span class="se-health-pill">' + escapeHtml(mode) + '</span>' +
            '<span class="se-health-pill">' + escapeHtml(moduleCount) + ' modules</span>' +
            '<span class="se-health-pill">' + escapeHtml(navCount) + ' nav menus</span>' +
            '<span class="se-health-pill">' + escapeHtml(alertCount) + ' alerts</span>' +
            '<span class="se-health-pill">' + escapeHtml(adminControlCount) + ' admin controls</span>' +
            '<span class="se-health-pill">' + escapeHtml(roleCount) + ' roles</span>' +
            '<span class="se-health-pill muted">' + escapeHtml(senderCount) + ' senders</span>' +
            '<span class="se-health-pill muted">' + escapeHtml(docCount) + ' docs</span>' +
            '<span class="se-health-pill ' + (metadataLoaded ? "good" : "warn") + '">' + (metadataLoaded ? "title loaded" : "title missing") + '</span>' +
            '<span class="se-health-pill ' + statusClass + '">' + statusText + '</span>' +
          '</div>' +
        '</div>' +
      '</section>';
  }



  function renderPayloadBoundaryPreview(payload) {
    if (!boundaryPreviewEl) return;

    const boundary = payload.auth_boundary_preview || {};
    const surfaces = Array.isArray(boundary.payload_surfaces) ? boundary.payload_surfaces : [];
    const settings = boundary.auth_boundary_settings || {};
    const status = boundary.split_candidate_status || {};

    if (!surfaces.length) {
      boundaryPreviewEl.innerHTML = "";
      return;
    }

    const surfaceHtml = surfaces.map(function (surface) {
      const jwtLabel = surface.allow_no_jwt ? "no JWT" : "auth";
      const protoLabel = surface.is_prototype_only ? "prototype" : "production";
      const filterClass = Number(surface.server_filter_field_count || 0) > 0 ? "lock" : "";
      const redactClass = Number(surface.redaction_field_count || 0) > 0 ? "warn" : "";

      return (
        '<article class="se-boundary-surface">' +
          '<h3 class="se-boundary-surface-title">' + escapeHtml(surface.payload_surface_label || surface.payload_surface_key) + '</h3>' +
          '<div class="se-boundary-surface-sub">' + escapeHtml(surface.auth_scope_key || "scope") + '</div>' +
          '<div class="se-boundary-pills">' +
            '<span class="se-boundary-pill">' + escapeHtml(jwtLabel) + '</span>' +
            '<span class="se-boundary-pill ' + (surface.is_prototype_only ? "warn" : "") + '">' + escapeHtml(protoLabel) + '</span>' +
            '<span class="se-boundary-pill">' + escapeHtml(surface.included_field_count || 0) + ' fields</span>' +
            '<span class="se-boundary-pill ' + filterClass + '">' + escapeHtml(surface.server_filter_field_count || 0) + ' server-filter</span>' +
            '<span class="se-boundary-pill ' + redactClass + '">' + escapeHtml(surface.redaction_field_count || 0) + ' redact</span>' +
          '</div>' +
        '</article>'
      );
    }).join("");

    boundaryPreviewEl.innerHTML =
      '<section class="se-boundary-preview" aria-label="Payload boundary preview">' +
        '<div class="se-boundary-inner">' +
          '<div class="se-boundary-head">' +
            '<div>' +
              '<h2 class="se-boundary-title">Payload boundary preview</h2>' +
              '<div class="se-boundary-note">Prototype map of what later becomes public, member, admin, owner, and SyncEtc support payloads. Enforcement is not active yet.</div>' +
            '</div>' +
            '<span class="se-managed-asset-pill">' + escapeHtml(status.prototype_status || "candidate split") + '</span>' +
          '</div>' +
          '<div class="se-mode-flags" style="margin-bottom:12px;">' +
            boolFlag("auth before private data", settings.require_auth_before_private_data) +
            boolFlag("admin audit logs", settings.require_audit_logs_for_admin_actions) +
            boolFlag("support logging", settings.require_support_access_logging) +
            boolFlag("support time limit", settings.require_support_access_time_limit) +
            boolFlag("production auth enforced", status.production_auth_enforced) +
            boolFlag("RLS enforced", status.rls_enforced) +
          '</div>' +
          '<div class="se-boundary-grid">' + surfaceHtml + '</div>' +
        '</div>' +
      '</section>';
  }


  function renderPayload(response) {
    const payload = response.payload || {};
    const homepageConfig = payload.homepage_config || {};
    const settings = homepageConfig.page_specific_settings || {};
    const sections = Array.isArray(homepageConfig.homepage_sections) ? homepageConfig.homepage_sections : [];

    state.lastPayload = payload;
    const appliedMetadata = applyPageMetadata(payload);
    renderAdminPreviewControls(payload);
    renderHomepageAdminEditingPreview(payload);
    renderNavigationPreview(payload);
    renderBackbonePreview(payload);
    renderDeploymentAccessPreview(payload);
    renderPrototypeHealthStrip(payload);
    renderPayloadBoundaryPreview(payload);
    setCssVariables(payload);
    const appliedUnderlay = applyBackgroundUnderlay(settings);

    customerNameEl.textContent = payload.customer_name || response.customer_name || "SyncEtc Customer";
    customerSubtitleEl.textContent = (homepageConfig.page_layout_preset_label || "Generated homepage") + " • " + (homepageConfig.intended_vertical_label || "Public site");
    poweredFooterEl.textContent = "Powered by SyncEtc" + (payload.powered_by_syncetc?.powered_by_division_label ? " • " + payload.powered_by_syncetc.powered_by_division_label : "");

    const sortedSections = sections
      .slice()
      .sort(function (a, b) {
        return Number(a.sort_order || 0) - Number(b.sort_order || 0);
      });

    if (!sortedSections.length) {
      sectionsEl.innerHTML = sectionShell(
        { section_key: "missing_homepage_config", section_kind: "error", section_label: "Payload Check" },
        '<h2>No homepage sections found</h2><p>The payload loaded, but homepage_config.homepage_sections was empty or missing.</p>',
        "se-error"
      );
      return;
    }

    sectionsEl.innerHTML = sortedSections.map(function (section) {
      return renderSection(section, payload, settings);
    }).join("");

    setStatus("Loaded prototype diagnostic, payload boundary preview, homepage_config, navigation, alerts, email/domain, documents/archive, integrations, deployment/modules, access roles, background_underlay, data-driven cards, page metadata, and admin controls and homepage admin editing preview from Supabase payload • " + sortedSections.length + " sections" + (appliedUnderlay && appliedUnderlay.has_managed_asset ? " • managed asset" : "") + (appliedUnderlay && appliedUnderlay.frontend_preload ? " • preload ready" : "") + (appliedMetadata ? " • browser title" : "") + (appliedUnderlay && appliedUnderlay.transform_applied ? " • transformed image" : ""));
  }

  async function loadCustomer(customerName) {
    state.currentCustomer = customerName;
    setStatus("Loading " + customerName + "...");
    sectionsEl.innerHTML = "";

    switchButtons.forEach(function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-se-customer-switch") === customerName);
    });

    const url = ENDPOINT + "?customer_name=" + encodeURIComponent(customerName);

    try {
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }

      const data = await response.json();

      if (!data.ok || !data.payload) {
        throw new Error("Payload returned without ok:true or payload object.");
      }

      renderPayload(data);
    } catch (error) {
      console.error("SyncEtc homepage payload error:", error);
      setStatus("Payload load failed");
      sectionsEl.innerHTML = sectionShell(
        { section_key: "payload_error", section_kind: "error", section_label: "Payload Error" },
        '<h2>Could not load customer payload</h2><p>' + escapeHtml(error.message || error) + '</p>',
        "se-error"
      );
    }
  }

  switchButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      loadCustomer(button.getAttribute("data-se-customer-switch"));
    });
  });

  loadCustomer(state.currentCustomer);
})();
/* syncetc_generated_homepage_js_v12_payload_boundary_preview - END */

/* syncetc_current_public_preview_mode_toggle_v14 - BEGIN */
(function () {
  const ROOT_ID = "syncetc-generated-homepage-v2";
  const root = document.getElementById(ROOT_ID);
  if (!root) return;

  const shell = root.querySelector(".se-shell");
  if (!shell) return;

  if (root.querySelector("[data-se-mode-switcher]")) return;

  const wrap = document.createElement("div");
  wrap.className = "se-mode-switcher";
  wrap.setAttribute("data-se-mode-switcher", "");

  const prototypeButton = document.createElement("button");
  prototypeButton.type = "button";
  prototypeButton.textContent = "Prototype view";

  const publicButton = document.createElement("button");
  publicButton.type = "button";
  publicButton.textContent = "Public preview";

  function setMode(mode) {
    const isPublic = mode === "public";
    root.classList.toggle("is-se-public-preview", isPublic);
    root.classList.toggle("is-se-prototype-preview", !isPublic);
    prototypeButton.classList.toggle("is-active", !isPublic);
    publicButton.classList.toggle("is-active", isPublic);
    try {
      window.localStorage.setItem("syncetc_preview_mode", isPublic ? "public" : "prototype");
    } catch (error) {}
  }

  prototypeButton.addEventListener("click", function () {
    setMode("prototype");
  });

  publicButton.addEventListener("click", function () {
    setMode("public");
  });

  wrap.appendChild(prototypeButton);
  wrap.appendChild(publicButton);
  shell.insertBefore(wrap, shell.firstChild);

  let savedMode = "prototype";
  try {
    savedMode = window.localStorage.getItem("syncetc_preview_mode") || "prototype";
  } catch (error) {}

  setMode(savedMode === "public" ? "public" : "prototype");
})();
/* syncetc_current_public_preview_mode_toggle_v14 - END */

/* syncetc_update_89_admin_edit_workspace_styles - BEGIN */
(function () {
  const STYLE_ID = "syncetc-update-89-admin-edit-workspace-style";
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .se-admin-editing-workspace .se-admin-workspace-actions {
      display:flex; flex-wrap:wrap; align-items:center; gap:10px; margin:14px 0 16px;
      padding:10px; border:1px solid rgba(18,53,31,.16); border-radius:16px; background:rgba(255,255,255,.72);
      color:#12351f; font-weight:850; font-size:12px;
    }
    .se-admin-editing-workspace .se-admin-workspace-actions button {
      border:1px solid rgba(18,53,31,.18); background:#f5f0e6; color:#795119; border-radius:999px;
      padding:8px 11px; font-weight:850; cursor:not-allowed; opacity:.85;
    }
    .se-admin-editing-workspace .se-admin-form-grid {
      display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:12px; margin-top:10px;
    }
    .se-admin-editing-workspace .se-admin-form-row {
      border:1px solid rgba(18,53,31,.13); border-radius:16px; padding:12px; background:rgba(255,255,255,.84);
    }
    .se-admin-editing-workspace .se-admin-form-label-line {
      display:flex; justify-content:space-between; gap:8px; align-items:center; margin-bottom:7px;
      color:#12351f; font-weight:900; font-size:12px;
    }
    .se-admin-editing-workspace .se-admin-form-label-line span { color:#795119; font-size:10px; text-transform:uppercase; letter-spacing:.05em; }
    .se-admin-editing-workspace .se-admin-form-control {
      width:100%; box-sizing:border-box; border:1px solid rgba(18,53,31,.18); border-radius:12px; padding:9px 10px;
      font:inherit; color:#12351f; background:#ffffff; outline:none;
    }
    .se-admin-editing-workspace .se-admin-form-control:focus { border-color:#2f6537; box-shadow:0 0 0 3px rgba(47,101,55,.12); }
    .se-admin-editing-workspace .se-admin-toggle { display:flex; align-items:center; gap:8px; color:#12351f; font-weight:850; }
    .se-admin-editing-workspace .se-admin-draft-preview { margin-top:14px; border:1px solid rgba(18,53,31,.13); border-radius:16px; padding:10px 12px; background:rgba(255,255,255,.72); }
    .se-admin-editing-workspace .se-admin-draft-preview summary { cursor:pointer; color:#12351f; font-weight:900; }
    .se-admin-editing-workspace .se-admin-draft-preview pre { white-space:pre-wrap; overflow:auto; max-height:220px; margin:10px 0 0; font-size:11px; color:#12351f; }
    @media (max-width: 760px) { .se-admin-editing-workspace .se-admin-form-grid { grid-template-columns:1fr; } }
  `;
  document.head.appendChild(style);
})();
/* syncetc_update_89_admin_edit_workspace_styles - END */


/* syncetc_update_91_lab_usability_contrast - BEGIN */
(function () {
  const ROOT_ID = "syncetc-generated-homepage-v2";
  const STYLE_ID = "syncetc-update-90-big-admin-controls-lab-style";
  const LAB_ID = "syncetc-master-controls-test-lab";
  const VERSION_LABEL = "SyncEtc Hosted JS v19-admin-controls-lab";
  const CACHE_BUSTER = "?v=19-lab-usability-contrast";

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .syncetc-homepage-v2 {
        --se-lab-primary:#12351f;
        --se-lab-accent:#75b66a;
        --se-lab-bg:#f5f8f4;
        --se-lab-card:#ffffff;
        --se-lab-radius:18px;
        --se-lab-font-scale:1;
        --se-lab-density:1;
        --se-lab-shadow:0 16px 36px rgba(18,53,31,.12);
        --se-lab-max-width:980px;
      }
      .syncetc-homepage-v2.se-lab-theme-navy { --se-lab-primary:#0f2942; --se-lab-accent:#7db7d8; --se-lab-bg:#eef5fa; }
      .syncetc-homepage-v2.se-lab-theme-slate { --se-lab-primary:#27323a; --se-lab-accent:#9ba8b1; --se-lab-bg:#f1f4f6; }
      .syncetc-homepage-v2.se-lab-theme-sand { --se-lab-primary:#795119; --se-lab-accent:#d0a24a; --se-lab-bg:#fbf5e9; }
      .syncetc-homepage-v2.se-lab-width-narrow { --se-lab-max-width:860px; }
      .syncetc-homepage-v2.se-lab-width-normal { --se-lab-max-width:980px; }
      .syncetc-homepage-v2.se-lab-width-wide { --se-lab-max-width:1180px; }
      .syncetc-homepage-v2.se-lab-density-compact { --se-lab-density:.82; }
      .syncetc-homepage-v2.se-lab-density-comfortable { --se-lab-density:1; }
      .syncetc-homepage-v2.se-lab-density-spacious { --se-lab-density:1.18; }
      .syncetc-homepage-v2.se-lab-radius-square { --se-lab-radius:6px; }
      .syncetc-homepage-v2.se-lab-radius-soft { --se-lab-radius:18px; }
      .syncetc-homepage-v2.se-lab-radius-round { --se-lab-radius:30px; }
      .syncetc-homepage-v2.se-lab-shadow-none { --se-lab-shadow:none; }
      .syncetc-homepage-v2.se-lab-shadow-soft { --se-lab-shadow:0 16px 36px rgba(18,53,31,.12); }
      .syncetc-homepage-v2.se-lab-shadow-strong { --se-lab-shadow:0 22px 60px rgba(18,53,31,.24); }
      .se-master-controls-lab { max-width:var(--se-lab-max-width); margin:18px auto; border:1px solid rgba(18,53,31,.14); border-radius:22px; background:rgba(255,255,255,.90); box-shadow:var(--se-lab-shadow); overflow:hidden; font-size:calc(14px * var(--se-lab-font-scale)); }
      .se-master-lab-head { padding:calc(16px * var(--se-lab-density)) calc(18px * var(--se-lab-density)); background:linear-gradient(135deg, var(--se-lab-primary), #234c2f); color:#fff; display:flex; justify-content:space-between; gap:16px; align-items:flex-start; }
      .se-master-lab-head h2 { margin:0 0 4px; font-size:20px; letter-spacing:.01em; }
      .se-master-lab-head p { margin:0; max-width:760px; opacity:.88; line-height:1.35; }
      .se-master-lab-badges { display:flex; flex-wrap:wrap; justify-content:flex-end; gap:6px; min-width:180px; }
      .se-master-lab-badges span { background:rgba(255,255,255,.15); border:1px solid rgba(255,255,255,.25); border-radius:999px; padding:6px 8px; font-size:11px; font-weight:900; white-space:nowrap; }
      .se-master-lab-tabs { display:flex; gap:8px; flex-wrap:wrap; padding:12px 14px; border-bottom:1px solid rgba(18,53,31,.12); background:var(--se-lab-bg); }
      .se-master-lab-tab { border:1px solid rgba(18,53,31,.18); border-radius:999px; padding:8px 11px; background:#fff; color:var(--se-lab-primary); font-weight:900; cursor:pointer; }
      .se-master-lab-tab.is-active { background:var(--se-lab-primary); color:#fff; }
      .se-master-lab-body { display:grid; grid-template-columns:minmax(0, 1.05fr) minmax(320px, .95fr); gap:14px; padding:14px; }
      .se-master-lab-panel { border:1px solid rgba(18,53,31,.12); border-radius:18px; background:#fff; padding:calc(12px * var(--se-lab-density)); }
      .se-master-lab-panel h3 { margin:0 0 4px; color:var(--se-lab-primary); font-size:15px; }
      .se-master-lab-panel p { margin:0 0 10px; color:#50605a; line-height:1.35; }
      .se-master-control-grid { display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:10px; }
      .se-master-control { border:1px solid rgba(18,53,31,.10); border-radius:14px; background:#fbfcfb; padding:10px; }
      .se-master-control label { display:block; margin-bottom:6px; color:var(--se-lab-primary); font-weight:900; font-size:12px; }
      .se-master-control small { display:block; margin-top:5px; color:#64736d; font-size:11px; line-height:1.25; }
      .se-master-control input[type="text"], .se-master-control input[type="url"], .se-master-control select, .se-master-control textarea { width:100%; box-sizing:border-box; border:1px solid rgba(18,53,31,.18); border-radius:12px; padding:8px 9px; color:#12351f; background:#fff; font:inherit; }
      .se-master-control textarea { min-height:70px; resize:vertical; }
      .se-master-toggle-row { display:flex; align-items:center; gap:8px; padding:7px 0; color:#12351f; font-weight:850; }
      .se-master-preview-shell { border-radius:var(--se-lab-radius); border:1px solid rgba(18,53,31,.13); background:var(--se-lab-bg); padding:14px; min-height:420px; }
      .se-master-preview-hero { border-radius:var(--se-lab-radius); background:linear-gradient(135deg, var(--se-lab-primary), #3d6e46); color:#fff; padding:calc(20px * var(--se-lab-density)); box-shadow:var(--se-lab-shadow); }
      .se-master-preview-hero .eyebrow { margin:0 0 6px; color:rgba(255,255,255,.75); font-weight:900; text-transform:uppercase; letter-spacing:.06em; font-size:11px; }
      .se-master-preview-hero h4 { margin:0 0 8px; font-size:calc(22px * var(--se-lab-font-scale)); }
      .se-master-preview-hero p { margin:0 0 14px; color:rgba(255,255,255,.85); line-height:1.4; }
      .se-master-preview-actions { display:flex; gap:8px; flex-wrap:wrap; }
      .se-master-preview-actions a { display:inline-flex; text-decoration:none; border-radius:999px; padding:9px 12px; font-weight:900; background:#fff; color:var(--se-lab-primary); border:1px solid rgba(255,255,255,.38); }
      .se-master-preview-actions a.secondary { background:rgba(255,255,255,.12); color:#fff; }
      .syncetc-homepage-v2.se-lab-button-square .se-master-preview-actions a { border-radius:7px; }
      .syncetc-homepage-v2.se-lab-button-soft .se-master-preview-actions a { border-radius:14px; }
      .syncetc-homepage-v2.se-lab-button-pill .se-master-preview-actions a { border-radius:999px; }
      .se-master-preview-card-grid { display:grid; gap:10px; grid-template-columns:repeat(var(--se-lab-card-cols,3), minmax(0,1fr)); margin-top:12px; }
      .se-master-preview-card { border-radius:var(--se-lab-radius); background:#fff; border:1px solid rgba(18,53,31,.12); padding:12px; box-shadow:var(--se-lab-shadow); color:#12351f; }
      .se-master-preview-card strong { display:block; color:var(--se-lab-primary); margin-bottom:4px; }
      .se-master-preview-card span { color:#5b6b63; font-size:12px; line-height:1.3; }
      .se-master-output { white-space:pre-wrap; max-height:220px; overflow:auto; font-size:11px; background:#10291a; color:#e5f3e8; padding:10px; border-radius:14px; margin-top:10px; }
      .se-master-lab-actions { display:flex; gap:8px; flex-wrap:wrap; margin-top:10px; }
      .se-master-lab-actions button { border:1px solid rgba(18,53,31,.18); background:var(--se-lab-primary); color:#fff; border-radius:999px; padding:8px 11px; font-weight:900; cursor:pointer; }
      .se-master-lab-actions button.secondary { background:#fff; color:var(--se-lab-primary); }
      .se-master-lab-warning { margin:10px 14px 14px; padding:10px 12px; border:1px dashed rgba(121,81,25,.45); border-radius:14px; background:#fff9ef; color:#795119; font-weight:850; font-size:12px; }
      @media (max-width:900px) { .se-master-lab-body { grid-template-columns:1fr; } .se-master-control-grid { grid-template-columns:1fr; } .se-master-preview-card-grid { grid-template-columns:1fr; } }
    `;
    document.head.appendChild(style);
  }

  function defaultsFromPage() {
    const title = (document.querySelector('.se-admin-editing-workspace input[value]') || {}).value || "150th Aero homepage draft controls";
    return {
      labTab: "theme",
      theme: "green",
      width: "normal",
      density: "comfortable",
      radius: "soft",
      shadow: "soft",
      buttonShape: "pill",
      fontScale: "1",
      cardColumns: "3",
      heroSize: "medium",
      heroEyebrow: "Aviation club operations",
      heroHeadline: title,
      heroSubheadline: "Preview safe, bounded controls before they become customer-facing settings.",
      primaryLabel: "View dashboard",
      secondaryLabel: "Contact us",
      showPrimary: true,
      showSecondary: true,
      showGallery: true,
      showAnnouncements: true,
      showAdminNav: false,
      showPoweredBy: true,
      backgroundMode: "image-muted",
      metadataTitle: "Home | SyncEtc Customer Site",
      navStyle: "grouped",
      customerFacing: "selected",
      builderOnly: "advanced"
    };
  }

  function readState() {
    const root = document.getElementById(ROOT_ID);
    const raw = root && root.getAttribute("data-se-lab-state");
    if (raw) {
      try { return Object.assign(defaultsFromPage(), JSON.parse(raw)); } catch (error) {}
    }
    return defaultsFromPage();
  }

  function writeState(state) {
    const root = document.getElementById(ROOT_ID);
    if (root) root.setAttribute("data-se-lab-state", JSON.stringify(state));
    try { window.localStorage.setItem("syncetc_master_controls_lab_state", JSON.stringify(state)); } catch (error) {}
  }

  function applyState(state) {
    const root = document.getElementById(ROOT_ID);
    if (!root) return;
    const classGroups = [
      "se-lab-theme-green","se-lab-theme-navy","se-lab-theme-slate","se-lab-theme-sand",
      "se-lab-width-narrow","se-lab-width-normal","se-lab-width-wide",
      "se-lab-density-compact","se-lab-density-comfortable","se-lab-density-spacious",
      "se-lab-radius-square","se-lab-radius-soft","se-lab-radius-round",
      "se-lab-shadow-none","se-lab-shadow-soft","se-lab-shadow-strong",
      "se-lab-button-square","se-lab-button-soft","se-lab-button-pill"
    ];
    root.classList.remove.apply(root.classList, classGroups);
    root.classList.add("se-lab-theme-" + state.theme);
    root.classList.add("se-lab-width-" + state.width);
    root.classList.add("se-lab-density-" + state.density);
    root.classList.add("se-lab-radius-" + state.radius);
    root.classList.add("se-lab-shadow-" + state.shadow);
    root.classList.add("se-lab-button-" + state.buttonShape);
    root.style.setProperty("--se-lab-font-scale", state.fontScale || "1");
    root.style.setProperty("--se-lab-card-cols", state.cardColumns || "3");
    writeState(state);
  }

  function field(kind, key, label, help, options) {
    const state = readState();
    const value = state[key];
    if (kind === "textarea") {
      return '<div class="se-master-control"><label for="se-lab-' + key + '">' + escapeHtml(label) + '</label><textarea id="se-lab-' + key + '" data-se-lab-field="' + key + '">' + escapeHtml(value) + '</textarea><small>' + escapeHtml(help) + '</small></div>';
    }
    if (kind === "select") {
      const opts = (options || []).map(function (item) {
        return '<option value="' + escapeHtml(item[0]) + '"' + (String(value) === String(item[0]) ? ' selected' : '') + '>' + escapeHtml(item[1]) + '</option>';
      }).join('');
      return '<div class="se-master-control"><label for="se-lab-' + key + '">' + escapeHtml(label) + '</label><select id="se-lab-' + key + '" data-se-lab-field="' + key + '">' + opts + '</select><small>' + escapeHtml(help) + '</small></div>';
    }
    if (kind === "checkbox") {
      return '<label class="se-master-toggle-row"><input type="checkbox" data-se-lab-field="' + key + '"' + (value ? ' checked' : '') + '> ' + escapeHtml(label) + '</label>';
    }
    const inputType = kind === "url" ? "url" : "text";
    return '<div class="se-master-control"><label for="se-lab-' + key + '">' + escapeHtml(label) + '</label><input type="' + inputType + '" id="se-lab-' + key + '" data-se-lab-field="' + key + '" value="' + escapeHtml(value) + '"><small>' + escapeHtml(help) + '</small></div>';
  }

  function panelHtml(tab) {
    const themeOptions = [["green","Airfield green"],["navy","Aviation blue"],["slate","Neutral slate"],["sand","Warm sand"]];
    const widthOptions = [["narrow","Narrow"],["normal","Normal"],["wide","Wide"]];
    const densityOptions = [["compact","Compact"],["comfortable","Comfortable"],["spacious","Spacious"]];
    const radiusOptions = [["square","Square"],["soft","Soft"],["round","Round"]];
    const shadowOptions = [["none","None"],["soft","Soft"],["strong","Strong"]];
    const shapeOptions = [["square","Square"],["soft","Soft"],["pill","Pill"]];
    const scaleOptions = [["0.92","Small"],["1","Normal"],["1.08","Large"],["1.16","Extra large"]];
    const columnsOptions = [["2","2 columns"],["3","3 columns"],["4","4 columns"]];
    const heroSizeOptions = [["small","Small"],["medium","Medium"],["large","Large"]];
    const navOptions = [["row","Simple row"],["grouped","Grouped"],["dropdowns","Grouped dropdowns"]];

    if (tab === "content") {
      return '<h3>Homepage content controls</h3><p>Draft visible home-page copy and calls to action without touching production publish logic.</p><div class="se-master-control-grid">' +
        field("text", "heroEyebrow", "Hero eyebrow", "Small label above the main headline.") +
        field("text", "heroHeadline", "Hero headline", "Main homepage headline.") +
        field("textarea", "heroSubheadline", "Hero subheadline", "Short paragraph under the headline.") +
        field("text", "primaryLabel", "Primary button label", "Main CTA label.") +
        field("text", "secondaryLabel", "Secondary button label", "Secondary CTA label.") +
        field("select", "heroSize", "Hero size", "Bounded hero height choice.", heroSizeOptions) +
      '</div>';
    }
    if (tab === "layout") {
      return '<h3>Layout and component controls</h3><p>Safe layout controls use bounded choices instead of arbitrary destructive values.</p><div class="se-master-control-grid">' +
        field("select", "width", "Page width", "Narrow, normal, or wide container.", widthOptions) +
        field("select", "density", "Density", "Compact or spacious component padding.", densityOptions) +
        field("select", "radius", "Card radius", "Controls card corner treatment.", radiusOptions) +
        field("select", "shadow", "Shadow strength", "Controls visual depth.", shadowOptions) +
        field("select", "cardColumns", "Card columns", "Preview 2, 3, or 4 columns.", columnsOptions) +
        field("select", "fontScale", "Font scale", "Bounded page text scale.", scaleOptions) +
      '</div>';
    }
    if (tab === "buttons") {
      return '<h3>Button and navigation controls</h3><p>Preview button style, CTA visibility, and menu presentation rules.</p><div class="se-master-control-grid">' +
        field("select", "buttonShape", "Button shape", "Square, soft, or pill buttons.", shapeOptions) +
        field("select", "navStyle", "Navigation style", "Future menu rendering model.", navOptions) +
        '<div class="se-master-control"><label>CTA visibility</label>' + field("checkbox", "showPrimary", "Show primary CTA", "") + field("checkbox", "showSecondary", "Show secondary CTA", "") + '</div>' +
        '<div class="se-master-control"><label>Navigation visibility</label>' + field("checkbox", "showAdminNav", "Show admin nav in preview", "") + field("checkbox", "showPoweredBy", "Show Powered by SyncEtc", "") + '</div>' +
      '</div>';
    }
    if (tab === "modules") {
      return '<h3>Module visibility controls</h3><p>Prototype how customers or builders turn sections on and off without deleting data.</p><div class="se-master-control-grid">' +
        '<div class="se-master-control"><label>Homepage modules</label>' + field("checkbox", "showGallery", "Show gallery feature", "") + field("checkbox", "showAnnouncements", "Show announcements", "") + '</div>' +
        field("select", "customerFacing", "Customer-facing controls", "Which controls can customer admins see.", [["minimal","Minimal"],["selected","Selected safe controls"],["expanded","Expanded safe controls"]]) +
        field("select", "builderOnly", "Builder-only controls", "Which controls remain SyncEtc/builder only.", [["basic","Basic"],["advanced","Advanced"],["platform","Platform only"]]) +
        field("select", "backgroundMode", "Background treatment", "Safe background/underlay handling.", [["none","None"],["image-muted","Muted image"],["color-soft","Soft color"],["pattern","Pattern placeholder"]]) +
      '</div>';
    }
    if (tab === "metadata") {
      return '<h3>Page metadata and publishing controls</h3><p>Preview metadata and eventual publish-state concepts. Publishing remains disabled in this prototype.</p><div class="se-master-control-grid">' +
        field("text", "metadataTitle", "Browser title", "Future page title/SEO/browser title control.") +
        field("text", "heroHeadline", "Draft page name", "Reusable value shown in the preview.") +
      '</div><div class="se-master-lab-actions"><button type="button" data-se-lab-action="export">Export draft JSON</button><button type="button" class="secondary" data-se-lab-action="reset">Reset local lab</button></div><pre class="se-master-output" data-se-lab-output></pre>';
    }
    return '<h3>Theme controls</h3><p>Preview high-level brand styling with safe bounded values and contrast protection.</p><div class="se-master-control-grid">' +
      field("select", "theme", "Theme preset", "Bounded brand palette choice.", themeOptions) +
      field("select", "backgroundMode", "Background mode", "Preview-safe background treatment. This is now wired to the mini-preview only.", [["none","None"],["image-muted","Muted image"],["color-soft","Soft color"],["pattern","Pattern placeholder"]]) +
      field("select", "fontScale", "Font scale", "Bounded type scale.", scaleOptions) +
      field("select", "shadow", "Shadow", "Depth preset.", shadowOptions) +
    '</div>';
  }

  function previewHtml(state) {
    const cards = [];
    if (state.showGallery) cards.push(["Gallery", "Featured media and rotating visual modules."]);
    if (state.showAnnouncements) cards.push(["Announcements", "Current notices, alerts, and homepage strips."]);
    cards.push(["Resources", "Documents, links, and customer-specific sections."]);
    if (state.showAdminNav) cards.push(["Admin", "Admin navigation visible in this preview only."]);
    const cardHtml = cards.map(function (card) {
      return '<div class="se-master-preview-card"><strong>' + escapeHtml(card[0]) + '</strong><span>' + escapeHtml(card[1]) + '</span></div>';
    }).join('');
    return '<div class="se-master-preview-shell"><div class="se-master-preview-hero"><p class="eyebrow">' + escapeHtml(state.heroEyebrow) + '</p><h4>' + escapeHtml(state.heroHeadline) + '</h4><p>' + escapeHtml(state.heroSubheadline) + '</p><div class="se-master-preview-actions">' +
      (state.showPrimary ? '<a href="#">' + escapeHtml(state.primaryLabel) + '</a>' : '') +
      (state.showSecondary ? '<a class="secondary" href="#">' + escapeHtml(state.secondaryLabel) + '</a>' : '') +
      '</div></div><div class="se-master-preview-card-grid">' + cardHtml + '</div>' +
      (state.showPoweredBy ? '<div style="margin-top:10px;color:#50605a;font-weight:800;font-size:12px;">Powered by SyncEtc · preview only</div>' : '') +
      '</div>';
  }

  function renderLab() {
    const root = document.getElementById(ROOT_ID);
    if (!root || document.getElementById(LAB_ID)) return;
    let saved = null;
    try { saved = JSON.parse(window.localStorage.getItem("syncetc_master_controls_lab_state") || "null"); } catch (error) {}
    const state = Object.assign(defaultsFromPage(), saved || {});
    applyState(state);

    const lab = document.createElement("section");
    lab.id = LAB_ID;
    lab.className = "se-master-controls-lab";
    lab.setAttribute("data-se-master-controls", "");
    lab.innerHTML = '<div class="se-master-lab-head"><div><h2>Master Variables / Controls Test Lab</h2><p>Primary test workspace. Customer-facing and builder-only controls are intentionally shown near the top so test changes are easy to see.</p></div><div class="se-master-lab-badges"><span>JS v19</span><span>local draft only</span><span>no production save</span></div></div>' +
      '<div class="se-master-lab-tabs" data-se-lab-tabs>' +
        '<button class="se-master-lab-tab" data-se-lab-tab="theme">Theme</button>' +
        '<button class="se-master-lab-tab" data-se-lab-tab="content">Content</button>' +
        '<button class="se-master-lab-tab" data-se-lab-tab="layout">Layout</button>' +
        '<button class="se-master-lab-tab" data-se-lab-tab="buttons">Buttons/Nav</button>' +
        '<button class="se-master-lab-tab" data-se-lab-tab="modules">Modules</button>' +
        '<button class="se-master-lab-tab" data-se-lab-tab="metadata">Metadata/Export</button>' +
      '</div>' +
      '<div class="se-master-lab-body"><div class="se-master-lab-panel" data-se-lab-panel></div><div class="se-master-lab-panel"><h3>Live bounded-preview output</h3><p>This preview changes immediately. Export now copies the draft JSON locally. No database write occurs here yet.</p><div data-se-lab-preview></div></div></div>' +
      '<div class="se-master-lab-warning">Prototype boundary: this is intentionally a local draft test lab. The next production step is wiring controlled save actions to authenticated Supabase functions with customer scoping and audit logs.</div>';

    const shell = root.querySelector(".se-shell") || root;
    shell.appendChild(lab);
    updateLab(lab, state.labTab || "theme");
  }

  function updateLab(lab, tab) {
    const state = readState();
    state.labTab = tab;
    applyState(state);
    lab.querySelectorAll('[data-se-lab-tab]').forEach(function (button) {
      button.classList.toggle('is-active', button.getAttribute('data-se-lab-tab') === tab);
    });
    const panel = lab.querySelector('[data-se-lab-panel]');
    const preview = lab.querySelector('[data-se-lab-preview]');
    if (panel) panel.innerHTML = panelHtml(tab);
    if (preview) preview.innerHTML = previewHtml(state);
    const output = lab.querySelector('[data-se-lab-output]');
    if (output) output.textContent = JSON.stringify(state, null, 2);
  }

  function bindLab() {
    document.addEventListener('click', function (event) {
      const tabButton = event.target.closest('[data-se-lab-tab]');
      if (tabButton) {
        const lab = document.getElementById(LAB_ID);
        if (lab) updateLab(lab, tabButton.getAttribute('data-se-lab-tab'));
        return;
      }
      const action = event.target.closest('[data-se-lab-action]');
      if (action) {
        const lab = document.getElementById(LAB_ID);
        const state = readState();
        if (action.getAttribute('data-se-lab-action') === 'reset') {
          try { window.localStorage.removeItem('syncetc_master_controls_lab_state'); } catch (error) {}
          applyState(defaultsFromPage());
          if (lab) updateLab(lab, 'theme');
        }
        if (action.getAttribute('data-se-lab-action') === 'export') {
          const output = lab && lab.querySelector('[data-se-lab-output]');
          if (output) output.textContent = JSON.stringify(state, null, 2);
        }
      }
    });

    document.addEventListener('input', function (event) {
      const fieldEl = event.target.closest('[data-se-lab-field]');
      if (!fieldEl) return;
      const key = fieldEl.getAttribute('data-se-lab-field');
      const state = readState();
      state[key] = fieldEl.type === 'checkbox' ? fieldEl.checked : fieldEl.value;
      applyState(state);
      const lab = document.getElementById(LAB_ID);
      if (lab) updateLab(lab, state.labTab || 'theme');
    });

    document.addEventListener('change', function (event) {
      const fieldEl = event.target.closest('[data-se-lab-field]');
      if (!fieldEl) return;
      const key = fieldEl.getAttribute('data-se-lab-field');
      const state = readState();
      state[key] = fieldEl.type === 'checkbox' ? fieldEl.checked : fieldEl.value;
      applyState(state);
      const lab = document.getElementById(LAB_ID);
      if (lab) updateLab(lab, state.labTab || 'theme');
    });
  }

  function installVersionMarkers() {
    const TOP_BAR_ID = "syncetc-hosted-version-topbar";
    const FLOAT_BADGE_ID = "syncetc-visible-version-badge";
    let bar = document.getElementById(TOP_BAR_ID);
    if (!bar) {
      bar = document.createElement("div");
      bar.id = TOP_BAR_ID;
      document.body.insertBefore(bar, document.body.firstChild);
    }
    bar.textContent = VERSION_LABEL + " loaded " + CACHE_BUSTER;
    bar.setAttribute("data-syncetc-version", VERSION_LABEL);
    bar.setAttribute("data-syncetc-cache-buster", CACHE_BUSTER);
    bar.style.cssText = "display:block;width:100%;box-sizing:border-box;padding:10px 14px;margin:0;background:#12351f;color:#ffffff;font-family:Arial,sans-serif;font-size:13px;font-weight:900;letter-spacing:.03em;text-align:center;border-bottom:3px solid #75b66a;position:relative;z-index:999998";

    let badge = document.getElementById(FLOAT_BADGE_ID);
    if (!badge) {
      badge = document.createElement("div");
      badge.id = FLOAT_BADGE_ID;
      document.body.appendChild(badge);
    }
    badge.textContent = "JS v19 loaded";
    badge.setAttribute("data-syncetc-version", VERSION_LABEL);
    badge.setAttribute("data-syncetc-cache-buster", CACHE_BUSTER);
    badge.style.cssText = "position:fixed;right:12px;top:12px;z-index:999999;background:#12351f;color:#ffffff;font-family:Arial,sans-serif;font-size:12px;font-weight:900;letter-spacing:.02em;padding:8px 11px;border-radius:999px;box-shadow:0 8px 24px rgba(0,0,0,.24);border:1px solid rgba(255,255,255,.55);pointer-events:none";
    const root = document.getElementById(ROOT_ID);
    if (root) {
      root.setAttribute("data-syncetc-js-version", VERSION_LABEL);
      root.setAttribute("data-syncetc-cache-buster", CACHE_BUSTER);
    }
  }

  function boot() {
    installStyles();
    installVersionMarkers();
    bindLab();
    renderLab();
    console.log("SYNCETC UPDATE 91 MASTER CONTROLS LAB USABILITY LOADED", VERSION_LABEL, CACHE_BUSTER);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
/* syncetc_update_91_lab_usability_contrast - END */


/* syncetc_update_91_lab_usability_contrast_patch - BEGIN */
(function () {
  const ROOT_ID = "syncetc-generated-homepage-v2";
  const LAB_ID = "syncetc-master-controls-lab";
  const VERSION_LABEL = "JS v20A-safe-draft-export";

  function injectPatchStyles() {
    if (document.getElementById("syncetc-update-91-lab-usability-styles")) return;
    const style = document.createElement("style");
    style.id = "syncetc-update-91-lab-usability-styles";
    style.textContent = `
      /* Update 91: contrast protection and lab-first testing layout */
      .syncetc-homepage-v2.has-se-background-underlay::after { opacity: max(var(--se-underlay-overlay-opacity, .55), .68); background: rgba(246,250,252,.82); }
      .syncetc-homepage-v2 .se-section,
      .syncetc-homepage-v2 .se-topbar,
      .syncetc-homepage-v2 .se-status,
      .syncetc-homepage-v2 .se-admin-preview-bar,
      .syncetc-homepage-v2 .se-admin-editing-preview,
      .syncetc-homepage-v2 .se-master-controls-lab { background: rgba(255,255,255,.93) !important; backdrop-filter: blur(16px); }
      .syncetc-homepage-v2 .se-master-controls-lab { margin-top: 14px; border: 2px solid rgba(18,54,90,.18); }
      .syncetc-homepage-v2 .se-master-lab-head { background: linear-gradient(135deg, #12365a, #245c8d) !important; }
      .syncetc-homepage-v2 .se-master-lab-head h2,
      .syncetc-homepage-v2 .se-master-lab-head p { color:#fff !important; }
      .syncetc-homepage-v2 .se-master-lab-badges span { background: rgba(255,255,255,.92) !important; color:#12365a !important; }
      .syncetc-homepage-v2 .se-master-lab-panel h3::before { content: "Testing area · "; color:#2f80c4; font-weight:950; }
      .syncetc-homepage-v2 .se-master-preview-shell { transition: all 160ms ease; }
      .syncetc-homepage-v2[data-se-lab-background="none"] .se-master-preview-shell { background:#f7fafc; }
      .syncetc-homepage-v2[data-se-lab-background="color-soft"] .se-master-preview-shell { background:linear-gradient(135deg,#eef7ff,#f7fbf1); }
      .syncetc-homepage-v2[data-se-lab-background="pattern"] .se-master-preview-shell { background:repeating-linear-gradient(135deg,#f7fafc 0,#f7fafc 12px,#eef4f8 12px,#eef4f8 24px); }
      .syncetc-homepage-v2[data-se-lab-background="image-muted"] .se-master-preview-shell { background:linear-gradient(rgba(255,255,255,.78),rgba(255,255,255,.78)), radial-gradient(circle at 25% 30%, rgba(47,128,196,.35), transparent 16rem), radial-gradient(circle at 80% 70%, rgba(18,54,90,.18), transparent 18rem), #eef4f8; }
      .syncetc-homepage-v2[data-se-lab-hero-size="small"] .se-master-preview-hero { padding:14px !important; }
      .syncetc-homepage-v2[data-se-lab-hero-size="medium"] .se-master-preview-hero { padding:24px !important; }
      .syncetc-homepage-v2[data-se-lab-hero-size="large"] .se-master-preview-hero { padding:38px !important; }
      .syncetc-homepage-v2 .se-master-preview-hero { background:linear-gradient(135deg, rgba(18,54,90,.98), rgba(47,128,196,.88)) !important; text-shadow:0 1px 2px rgba(0,0,0,.28); }
      .syncetc-homepage-v2 .se-master-preview-hero .eyebrow,
      .syncetc-homepage-v2 .se-master-preview-hero p { color:rgba(255,255,255,.94) !important; }
      .syncetc-homepage-v2 .se-master-output::before { content:"Export preview / copied JSON target"; display:block; margin-bottom:6px; color:#bde5c8; font-weight:950; }
      .syncetc-homepage-v2 .se-lab-export-status { margin-top:8px; padding:8px 10px; border-radius:12px; background:#eef7ff; color:#12365a; font-size:12px; font-weight:900; }
      .syncetc-homepage-v2 .se-master-control small::after { content:""; }
    `;
    document.head.appendChild(style);
  }

  function getRoot() { return document.getElementById(ROOT_ID); }

  function readState() {
    const root = getRoot();
    if (!root) return {};
    try { return JSON.parse(root.getAttribute("data-se-lab-state") || "{}"); } catch (e) { return {}; }
  }

  function applyPreviewAttributes() {
    const root = getRoot();
    if (!root) return;
    const state = readState();
    root.setAttribute("data-se-lab-background", state.backgroundMode || "image-muted");
    root.setAttribute("data-se-lab-hero-size", state.heroSize || "medium");
    const lab = document.getElementById(LAB_ID);
    if (lab) {
      lab.setAttribute("data-se-update", "91");
      const title = lab.querySelector(".se-master-lab-head h2");
      if (title && !title.textContent.includes("Top Test Area")) title.textContent = "Master Variables / Controls Test Lab · Top Test Area";
      lab.querySelectorAll(".se-master-lab-badges span").forEach(function (span) {
        if (span.textContent === "JS v19") span.textContent = VERSION_LABEL;
      });
    }
  }

  function moveLabUp() {
    const root = getRoot();
    const lab = document.getElementById(LAB_ID);
    if (!root || !lab) return;
    const status = root.querySelector("[data-se-status]");
    const shell = root.querySelector(".se-shell") || root;
    if (status && status.parentNode === shell && status.nextSibling !== lab) {
      shell.insertBefore(lab, status.nextSibling);
    }
  }

  function upgradeExportButton() {
    document.addEventListener("click", function (event) {
      const action = event.target.closest('[data-se-lab-action="export"]');
      if (!action) return;
      const lab = document.getElementById(LAB_ID);
      if (!lab) return;
      const state = readState();
      const json = JSON.stringify(state, null, 2);
      const output = lab.querySelector("[data-se-lab-output]");
      if (output) output.textContent = json;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(json).catch(function () {});
      }
      let status = lab.querySelector(".se-lab-export-status");
      if (!status) {
        status = document.createElement("div");
        status.className = "se-lab-export-status";
        const actions = lab.querySelector(".se-master-lab-actions");
        if (actions) actions.insertAdjacentElement("afterend", status);
      }
      if (status) status.textContent = "Export JSON refreshed and copy attempted locally. No production save occurred.";
      const original = action.textContent;
      action.textContent = "Export refreshed";
      setTimeout(function () { action.textContent = original || "Export draft JSON"; }, 1200);
    }, true);
  }

  function observeRoot() {
    const root = getRoot();
    if (!root || root.getAttribute("data-se-update-91-observing") === "true") return;
    root.setAttribute("data-se-update-91-observing", "true");
    const observer = new MutationObserver(function () {
      applyPreviewAttributes();
      moveLabUp();
    });
    observer.observe(root, { attributes:true, childList:true, subtree:true, attributeFilter:["data-se-lab-state"] });
  }

  function boot() {
    injectPatchStyles();
    applyPreviewAttributes();
    moveLabUp();
    observeRoot();
    upgradeExportButton();
    let tries = 0;
    const timer = setInterval(function () {
      tries += 1;
      applyPreviewAttributes();
      moveLabUp();
      if (document.getElementById(LAB_ID) || tries > 30) clearInterval(timer);
    }, 250);
    console.log("SYNCETC UPDATE 91 LAB USABILITY PATCH LOADED", VERSION_LABEL);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
/* syncetc_update_91_lab_usability_contrast_patch - END */




/* syncetc_update_92A_safe_draft_preview_export_patch - BEGIN */
(function () {
  const ROOT_ID = "syncetc-generated-homepage-v2";
  const LAB_ID = "syncetc-master-controls-lab";
  const VERSION_LABEL = "JS v20A-safe-draft-export";
  const CACHE_BUSTER = "?v=20A-safe-draft-export";

  function root() { return document.getElementById(ROOT_ID); }

  function jsonParse(text, fallback) {
    try { return JSON.parse(text || "{}"); } catch (error) { return fallback || {}; }
  }

  function timestamp() {
    return new Date().toISOString().replace(/[:.]/g, "-");
  }

  function downloadJson(filename, data) {
    const text = typeof data === "string" ? data : JSON.stringify(data, null, 2);
    const blob = new Blob([text], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
      if (a.parentNode) a.parentNode.removeChild(a);
    }, 500);
  }

  function injectStyles() {
    if (document.getElementById("syncetc-update-92A-safe-export-styles")) return;
    const style = document.createElement("style");
    style.id = "syncetc-update-92A-safe-export-styles";
    style.textContent = `
      .syncetc-homepage-v2 .se-admin-editing-workspace {
        border: 2px solid rgba(47,128,196,.18) !important;
      }
      .syncetc-homepage-v2 .se-admin-editing-title::after {
        content: " · safe draft/export v20A";
        color: #2f80c4;
        font-size: 12px;
        font-weight: 950;
      }
      .syncetc-homepage-v2 .se-admin-workspace-draft-layout {
        display: grid;
        grid-template-columns: minmax(0,1.18fr) minmax(300px,.82fr);
        gap: 14px;
        align-items: start;
      }
      .syncetc-homepage-v2 .se-admin-workspace-draft-layout .se-admin-form-grid {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 12px;
      }
      .syncetc-homepage-v2 .se-admin-draft-preview {
        margin-top: 0 !important;
        position: sticky;
        top: 18px;
        align-self: start;
        background: rgba(247,250,252,.96) !important;
        border: 1px solid rgba(18,54,90,.16) !important;
        border-radius: 16px !important;
        padding: 12px !important;
        box-shadow: 0 12px 26px rgba(18,54,90,.08);
      }
      .syncetc-homepage-v2 .se-admin-draft-preview pre {
        max-height: 360px !important;
        overflow: auto !important;
        background: #0e2330 !important;
        color: #ddf8e7 !important;
        border-radius: 12px !important;
        padding: 12px !important;
        font-size: 11px !important;
        line-height: 1.45 !important;
      }
      .syncetc-homepage-v2 .se-admin-export-status,
      .syncetc-homepage-v2 .se-lab-export-status {
        margin-top: 8px;
        padding: 8px 10px;
        border-radius: 12px;
        background: #eaf6ff;
        color: #12365a;
        font-size: 12px;
        font-weight: 900;
      }
      .syncetc-homepage-v2 .se-admin-workspace-actions button[data-se-admin-export-draft],
      .syncetc-homepage-v2 .se-master-lab-actions button[data-se-lab-action="export"] {
        background: #12365a !important;
        color: #fff !important;
        border-color: #12365a !important;
        cursor: pointer !important;
      }
      .syncetc-homepage-v2 .se-admin-workspace-actions button[data-se-admin-copy-draft] {
        background: #fff !important;
        color: #12365a !important;
        cursor: pointer !important;
      }
      @media (max-width: 900px) {
        .syncetc-homepage-v2 .se-admin-workspace-draft-layout { grid-template-columns: 1fr; }
        .syncetc-homepage-v2 .se-admin-workspace-draft-layout .se-admin-form-grid { grid-template-columns: 1fr; }
        .syncetc-homepage-v2 .se-admin-draft-preview { position: static; }
      }
    `;
    document.head.appendChild(style);
  }

  function updateVersionMarkers() {
    const r = root();
    if (r) {
      r.setAttribute("data-syncetc-js-version", VERSION_LABEL);
      r.setAttribute("data-syncetc-cache-buster", CACHE_BUSTER);
    }
    document.querySelectorAll("[data-syncetc-version]").forEach(function (el) {
      const suffix = el.classList && el.classList.contains("se-js-version-badge") ? " loaded" : " loaded " + CACHE_BUSTER;
      el.textContent = VERSION_LABEL + suffix;
      el.setAttribute("data-syncetc-version", VERSION_LABEL);
      el.setAttribute("data-syncetc-cache-buster", CACHE_BUSTER);
    });
    document.querySelectorAll(".se-master-lab-badges span, .se-admin-editing-pill").forEach(function (span) {
      if (/JS v\d+/i.test(span.textContent)) span.textContent = "JS v20A";
    });
  }

  function moveAdminWorkspaceNearLab() {
    const r = root();
    if (!r) return;
    const shell = r.querySelector(".se-shell") || r;
    const workspace = r.querySelector("[data-se-admin-editing-preview]");
    const lab = document.getElementById(LAB_ID);
    const status = r.querySelector("[data-se-status]");
    if (!workspace || !shell) return;
    const anchor = lab || status;
    if (anchor && workspace.parentNode === shell && anchor.nextSibling !== workspace) {
      shell.insertBefore(workspace, anchor.nextSibling);
    }
  }

  function upgradeAdminWorkspace() {
    const r = root();
    if (!r) return;
    const workspace = r.querySelector(".se-admin-editing-workspace");
    if (!workspace) return;
    const actions = workspace.querySelector(".se-admin-workspace-actions");
    const grid = workspace.querySelector(".se-admin-form-grid");
    const preview = workspace.querySelector(".se-admin-draft-preview");
    if (!actions || !grid || !preview) return;

    let layout = workspace.querySelector(".se-admin-workspace-draft-layout");
    if (!layout && grid.parentNode) {
      layout = document.createElement("div");
      layout.className = "se-admin-workspace-draft-layout";
      grid.parentNode.insertBefore(layout, grid);
      layout.appendChild(grid);
      layout.appendChild(preview);
    }

    if (!actions.querySelector("[data-se-admin-export-draft]")) {
      const exportBtn = document.createElement("button");
      exportBtn.type = "button";
      exportBtn.setAttribute("data-se-admin-export-draft", "");
      exportBtn.textContent = "Export local draft JSON";
      actions.appendChild(exportBtn);
    }

    if (!actions.querySelector("[data-se-admin-copy-draft]")) {
      const copyBtn = document.createElement("button");
      copyBtn.type = "button";
      copyBtn.setAttribute("data-se-admin-copy-draft", "");
      copyBtn.textContent = "Copy draft JSON";
      actions.appendChild(copyBtn);
    }
  }

  function readAdminDraftJson() {
    const r = root();
    const pre = r && r.querySelector("[data-se-draft-json]");
    const values = jsonParse(pre ? pre.textContent : "{}", {});
    return JSON.stringify({
      export_type: "homepage_admin_local_draft",
      version: VERSION_LABEL,
      exported_at: new Date().toISOString(),
      draft_values: values
    }, null, 2);
  }

  function setStatus(afterEl, className, text) {
    if (!afterEl) return;
    let status = afterEl.parentNode && afterEl.parentNode.querySelector("." + className);
    if (!status) {
      status = document.createElement("div");
      status.className = className;
      afterEl.insertAdjacentElement("afterend", status);
    }
    status.textContent = text;
  }

  function readLabState() {
    const r = root();
    if (!r) return {};
    return jsonParse(r.getAttribute("data-se-lab-state") || "{}", {});
  }

  function bindClicksOnce() {
    if (document.documentElement.getAttribute("data-se-update-92A-bound") === "true") return;
    document.documentElement.setAttribute("data-se-update-92A-bound", "true");
    document.addEventListener("click", function (event) {
      const adminExport = event.target.closest("[data-se-admin-export-draft]");
      const adminCopy = event.target.closest("[data-se-admin-copy-draft]");
      const labExport = event.target.closest('[data-se-lab-action="export"]');

      if (!adminExport && !adminCopy && !labExport) return;

      if (adminExport || adminCopy) {
        const json = readAdminDraftJson();
        if (adminCopy && navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(json).catch(function () {});
          setStatus(adminCopy, "se-admin-export-status", "Draft JSON copy attempted locally. No production save occurred.");
        } else {
          downloadJson("syncetc-homepage-admin-local-draft-" + timestamp() + ".json", json);
          setStatus(adminExport, "se-admin-export-status", "Draft JSON downloaded locally. No production save occurred.");
        }
        event.preventDefault();
        event.stopPropagation();
        if (event.stopImmediatePropagation) event.stopImmediatePropagation();
        return;
      }

      if (labExport) {
        const lab = document.getElementById(LAB_ID);
        const json = JSON.stringify({
          export_type: "master_controls_lab_local_draft",
          version: VERSION_LABEL,
          exported_at: new Date().toISOString(),
          lab_state: readLabState()
        }, null, 2);
        const output = lab && lab.querySelector("[data-se-lab-output]");
        if (output) output.textContent = json;
        downloadJson("syncetc-master-controls-lab-local-draft-" + timestamp() + ".json", json);
        setStatus(labExport, "se-lab-export-status", "Draft JSON downloaded locally. No production save occurred.");
        const original = labExport.textContent;
        labExport.textContent = "JSON downloaded";
        window.setTimeout(function () { labExport.textContent = original || "Export draft JSON"; }, 1200);
        event.preventDefault();
        event.stopPropagation();
        if (event.stopImmediatePropagation) event.stopImmediatePropagation();
      }
    }, true);
  }

  function runOnce() {
    injectStyles();
    updateVersionMarkers();
    moveAdminWorkspaceNearLab();
    upgradeAdminWorkspace();
    bindClicksOnce();
  }

  function boot() {
    runOnce();
    // Finite retry only. No MutationObserver, no recurring page-wide loop.
    [120, 350, 700, 1200, 2000, 3200].forEach(function (delay) {
      window.setTimeout(runOnce, delay);
    });
    console.log("SYNCETC UPDATE 92A SAFE DRAFT EXPORT PATCH LOADED", VERSION_LABEL, CACHE_BUSTER);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
/* syncetc_update_92A_safe_draft_preview_export_patch - END */


/* syncetc-homepage-current-all-in-one.js - END */
