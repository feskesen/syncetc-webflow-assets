/* syncetc-homepage-v22-clean-priority-workbench.js - BEGIN */
/*
  Hosted SyncEtc Webflow asset.
  Update 94 / JS v22: clean versioned priority workbench.
  Upload this file as:
  syncetc-homepage-v22-clean-priority-workbench.js

  This file intentionally uses a versioned filename to avoid same-name GitHub/cache confusion.
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


















/* syncetc_update_94_clean_versioned_priority_workbench_v22 - BEGIN */
(function () {
  const ROOT_ID = "syncetc-generated-homepage-v2";
  const LAB_ID = "syncetc-priority-workbench-v22";
  const STYLE_ID = "syncetc-priority-workbench-v22-style";
  const VERSION_LABEL = "JS v22-clean-priority-workbench";
  const FILE_NAME = "syncetc-homepage-v22-clean-priority-workbench.js";
  const STORAGE_KEY = "syncetc_priority_workbench_state_v22";

  function root() { return document.getElementById(ROOT_ID); }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function readState() {
    const defaults = {
      tab: "content",
      heroEyebrow: "Aviation club operations",
      heroHeadline: "Priority testing workspace",
      heroSubheadline: "This compact panel is the primary test area. Controls and preview stay together near the top.",
      primaryLabel: "View dashboard",
      secondaryLabel: "Contact us",
      theme: "aviation_blue",
      fontScale: "normal",
      cardDensity: "comfortable",
      buttonShape: "pill",
      modulesGallery: true,
      modulesAnnouncements: true,
      modulesResources: true,
      showFullPrototype: false
    };
    try {
      return Object.assign(defaults, JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}"));
    } catch (error) {
      return defaults;
    }
  }

  function writeState(state) {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (error) {}
  }

  function downloadJson(filename, data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
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

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .syncetc-homepage-v2 .se-v22-hidden-info { display:none !important; }
      .syncetc-homepage-v2.se-v22-show-full .se-v22-hidden-info { display:block !important; }
      .se-v22-version-bar { position:sticky; top:0; z-index:999997; background:#0f3558; color:#fff; border-bottom:3px solid #7db7d8; padding:10px 14px; text-align:center; font:900 13px/1.2 Arial,sans-serif; letter-spacing:.02em; }
      .se-v22-version-badge { position:fixed; right:12px; top:12px; z-index:999999; background:#0f3558; color:#fff; border:1px solid rgba(255,255,255,.55); border-radius:999px; padding:8px 11px; box-shadow:0 8px 24px rgba(0,0,0,.24); font:900 12px/1 Arial,sans-serif; pointer-events:none; }
      .syncetc-homepage-v2.has-se-background-underlay::after { background:rgba(246,250,252,.84) !important; opacity:.88 !important; }
      .syncetc-homepage-v2 .se-section, .syncetc-homepage-v2 .se-topbar, .syncetc-homepage-v2 .se-status, .syncetc-homepage-v2 .se-admin-preview-bar { background:rgba(255,255,255,.94) !important; backdrop-filter:blur(14px); }
      .se-pw22 { max-width:1180px; margin:16px auto 18px; border:1px solid rgba(15,53,88,.18); border-radius:22px; overflow:hidden; background:rgba(255,255,255,.95); box-shadow:0 18px 44px rgba(15,53,88,.14); font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
      .se-pw22-head { background:linear-gradient(135deg,#0f3558,#1f6fa8); color:#fff; padding:18px 20px; display:flex; justify-content:space-between; gap:14px; align-items:flex-start; }
      .se-pw22-head h2 { margin:0 0 4px; color:#fff; font-size:22px; line-height:1.08; }
      .se-pw22-head p { margin:0; color:rgba(255,255,255,.88); max-width:760px; line-height:1.35; }
      .se-pw22-badges { display:flex; flex-wrap:wrap; justify-content:flex-end; gap:7px; min-width:220px; }
      .se-pw22-badges span { background:rgba(255,255,255,.94); color:#0f3558; border-radius:999px; padding:7px 9px; font-size:11px; font-weight:950; white-space:nowrap; }
      .se-pw22-tabs { padding:12px 16px; background:#edf6fc; border-bottom:1px solid rgba(15,53,88,.12); display:flex; gap:8px; flex-wrap:wrap; }
      .se-pw22-tab { border:1px solid rgba(15,53,88,.18); background:#fff; color:#0f3558; border-radius:999px; padding:9px 12px; font-weight:950; cursor:pointer; }
      .se-pw22-tab.is-active { background:#0f3558; color:#fff; }
      .se-pw22-body { display:grid; grid-template-columns:minmax(0,1.05fr) minmax(360px,.95fr); gap:14px; padding:16px; }
      .se-pw22-panel { border:1px solid rgba(15,53,88,.13); border-radius:18px; padding:14px; background:#fff; }
      .se-pw22-panel h3 { margin:0 0 5px; color:#0f3558; font-size:16px; }
      .se-pw22-panel p { margin:0 0 12px; color:#5a7084; line-height:1.35; }
      .se-pw22-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; }
      .se-pw22-field { border:1px solid rgba(15,53,88,.12); border-radius:14px; padding:10px; background:#f8fbfd; }
      .se-pw22-field label { display:block; margin-bottom:6px; color:#0f3558; font-size:12px; font-weight:950; }
      .se-pw22-field small { display:block; margin-top:5px; color:#63798a; font-size:11px; line-height:1.25; }
      .se-pw22 input[type="text"], .se-pw22 textarea, .se-pw22 select { width:100%; box-sizing:border-box; border:1px solid rgba(15,53,88,.18); border-radius:12px; padding:9px 10px; font:inherit; color:#0f3558; background:#fff; }
      .se-pw22 textarea { min-height:78px; resize:vertical; }
      .se-pw22-toggle { display:flex; align-items:center; gap:8px; color:#0f3558; font-weight:850; margin:8px 0; }
      .se-pw22-preview { border-radius:18px; border:1px solid rgba(15,53,88,.14); background:linear-gradient(135deg,#eef7ff,#f8fbfd); padding:14px; min-height:360px; }
      .se-pw22-hero { border-radius:18px; background:linear-gradient(135deg,#0f3558,#2f80c4); color:#fff; padding:24px; box-shadow:0 14px 32px rgba(15,53,88,.18); text-shadow:0 1px 2px rgba(0,0,0,.30); }
      .se-pw22-theme-slate .se-pw22-hero { background:linear-gradient(135deg,#263542,#64748b); }
      .se-pw22-theme-sand .se-pw22-hero { background:linear-gradient(135deg,#795119,#c18a2d); }
      .se-pw22-theme-airfield .se-pw22-hero { background:linear-gradient(135deg,#12351f,#3f7d49); }
      .se-pw22-scale-small .se-pw22-preview { font-size:13px; }
      .se-pw22-scale-large .se-pw22-preview { font-size:16px; }
      .se-pw22-scale-xl .se-pw22-preview { font-size:18px; }
      .se-pw22-hero .eyebrow { margin:0 0 7px; color:rgba(255,255,255,.88); font-size:11px; font-weight:950; letter-spacing:.08em; text-transform:uppercase; }
      .se-pw22-hero h4 { margin:0 0 8px; color:#fff; font-size:1.65em; line-height:1.1; }
      .se-pw22-hero p { margin:0 0 14px; color:rgba(255,255,255,.92); line-height:1.4; }
      .se-pw22-actions { display:flex; gap:8px; flex-wrap:wrap; }
      .se-pw22-actions a { display:inline-flex; text-decoration:none; background:#fff; color:#0f3558; border-radius:999px; padding:9px 12px; font-weight:950; }
      .se-pw22-shape-soft .se-pw22-actions a { border-radius:14px; }
      .se-pw22-shape-square .se-pw22-actions a { border-radius:6px; }
      .se-pw22-cards { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; margin-top:12px; }
      .se-pw22-density-compact .se-pw22-cards { gap:7px; }
      .se-pw22-density-spacious .se-pw22-cards { gap:15px; }
      .se-pw22-card { border:1px solid rgba(15,53,88,.12); border-radius:16px; padding:12px; background:#fff; color:#0f3558; }
      .se-pw22-density-compact .se-pw22-card { padding:9px; }
      .se-pw22-density-spacious .se-pw22-card { padding:16px; }
      .se-pw22-card strong { display:block; margin-bottom:4px; }
      .se-pw22-card span { color:#5a7084; font-size:12px; line-height:1.3; }
      .se-pw22-actions-row { display:flex; gap:8px; flex-wrap:wrap; margin-top:12px; }
      .se-pw22-actions-row button { border:1px solid rgba(15,53,88,.18); background:#0f3558; color:#fff; border-radius:999px; padding:9px 12px; font-weight:950; cursor:pointer; }
      .se-pw22-actions-row button.secondary { background:#fff; color:#0f3558; }
      .se-pw22-note { margin:0 16px 16px; padding:10px 12px; border:1px dashed rgba(121,81,25,.42); border-radius:14px; background:#fff9ef; color:#795119; font-weight:850; font-size:12px; }
      @media (max-width:900px) { .se-pw22-body { grid-template-columns:1fr; } .se-pw22-grid { grid-template-columns:1fr; } .se-pw22-cards { grid-template-columns:1fr; } }
    `;
    document.head.appendChild(style);
  }

  function updateVersionMarkers() {
    let bar = document.getElementById("syncetc-v22-version-bar");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "syncetc-v22-version-bar";
      document.body.insertBefore(bar, document.body.firstChild);
    }
    bar.className = "se-v22-version-bar";
    bar.textContent = "SyncEtc Hosted JS " + VERSION_LABEL + " loaded from " + FILE_NAME;
    bar.setAttribute("data-syncetc-version", VERSION_LABEL);

    let badge = document.getElementById("syncetc-v22-version-badge");
    if (!badge) {
      badge = document.createElement("div");
      badge.id = "syncetc-v22-version-badge";
      document.body.appendChild(badge);
    }
    badge.className = "se-v22-version-badge";
    badge.textContent = "JS v22 loaded";
    badge.setAttribute("data-syncetc-version", VERSION_LABEL);
    const r = root();
    if (r) r.setAttribute("data-syncetc-js-version", VERSION_LABEL);
  }

  function hideLowerInfoPanels() {
    const r = root();
    if (!r) return;
    const state = readState();
    r.classList.toggle("se-v22-show-full", !!state.showFullPrototype);
    [
      "[data-se-navigation-preview]",
      "[data-se-backbone-preview]",
      "[data-se-deployment-access-preview]",
      "[data-se-boundary-preview]",
      "[data-se-admin-editing-preview]"
    ].forEach(function (selector) {
      const el = r.querySelector(selector);
      if (el) el.classList.add("se-v22-hidden-info");
    });
  }

  function control(type, key, label, help, options) {
    const state = readState();
    const value = state[key];
    if (type === "textarea") {
      return '<div class="se-pw22-field"><label>' + escapeHtml(label) + '</label><textarea data-se-pw22-field="' + escapeHtml(key) + '">' + escapeHtml(value) + '</textarea><small>' + escapeHtml(help) + '</small></div>';
    }
    if (type === "select") {
      return '<div class="se-pw22-field"><label>' + escapeHtml(label) + '</label><select data-se-pw22-field="' + escapeHtml(key) + '">' + options.map(function (opt) { return '<option value="' + escapeHtml(opt[0]) + '"' + (String(value) === String(opt[0]) ? ' selected' : '') + '>' + escapeHtml(opt[1]) + '</option>'; }).join("") + '</select><small>' + escapeHtml(help) + '</small></div>';
    }
    if (type === "checkbox") {
      return '<label class="se-pw22-toggle"><input type="checkbox" data-se-pw22-field="' + escapeHtml(key) + '"' + (value ? ' checked' : '') + '> ' + escapeHtml(label) + '</label>';
    }
    return '<div class="se-pw22-field"><label>' + escapeHtml(label) + '</label><input type="text" data-se-pw22-field="' + escapeHtml(key) + '" value="' + escapeHtml(value) + '"><small>' + escapeHtml(help) + '</small></div>';
  }

  function controlsHtml(tab) {
    if (tab === "style") {
      return '<h3>Style controls</h3><p>Internal controls for creating curated presets. Customer onboarding should eventually choose from vetted presets, not random free-form values.</p><div class="se-pw22-grid">' +
        control("select", "theme", "Theme preset", "Vetted color language. Blue is the aviation default.", [["aviation_blue","Aviation blue"],["airfield","Airfield green"],["slate","Neutral slate"],["sand","Warm sand"]]) +
        control("select", "fontScale", "Font scale", "Bounded type scale.", [["small","Small"],["normal","Normal"],["large","Large"],["xl","Extra large"]]) +
        control("select", "cardDensity", "Card density", "Bounded padding/density setting.", [["compact","Compact"],["comfortable","Comfortable"],["spacious","Spacious"]]) +
        control("select", "buttonShape", "Button shape", "Bounded button shape.", [["pill","Pill"],["soft","Soft"],["square","Square"]]) +
      '</div>';
    }
    if (tab === "modules") {
      return '<h3>Module controls</h3><p>Toggle preview modules without deleting customer data.</p><div class="se-pw22-grid"><div class="se-pw22-field"><label>Visible modules</label>' +
        control("checkbox", "modulesGallery", "Show gallery", "") +
        control("checkbox", "modulesAnnouncements", "Show announcements", "") +
        control("checkbox", "modulesResources", "Show resources", "") +
        control("checkbox", "showFullPrototype", "Show lower informational prototype panels", "") +
      '</div></div>';
    }
    if (tab === "export") {
      return '<h3>Export</h3><p>Exports the local draft settings to a JSON file. No database write occurs here.</p><div class="se-pw22-actions-row"><button type="button" data-se-pw22-export>Export local JSON</button><button type="button" class="secondary" data-se-pw22-reset>Reset local draft</button></div><pre class="se-master-output" data-se-pw22-output style="white-space:pre-wrap;max-height:240px;overflow:auto;background:#0e2330;color:#ddf8e7;padding:12px;border-radius:12px;margin-top:12px;font-size:11px;"></pre>';
    }
    return '<h3>Content controls</h3><p>Primary editable content stays beside the preview.</p><div class="se-pw22-grid">' +
      control("text", "heroEyebrow", "Hero eyebrow", "Small label above headline.") +
      control("text", "heroHeadline", "Hero headline", "Main homepage headline.") +
      control("textarea", "heroSubheadline", "Hero subheadline", "Short paragraph under headline.") +
      control("text", "primaryLabel", "Primary button label", "Main CTA label.") +
      control("text", "secondaryLabel", "Secondary button label", "Secondary CTA label.") +
    '</div>';
  }

  function previewHtml(state) {
    const cards = [];
    if (state.modulesGallery) cards.push(["Gallery", "Featured customer media."]);
    if (state.modulesAnnouncements) cards.push(["Announcements", "Alerts and notices."]);
    if (state.modulesResources) cards.push(["Resources", "Docs, links, and useful pages."]);
    const cardsHtml = cards.map(function (card) {
      return '<div class="se-pw22-card"><strong>' + escapeHtml(card[0]) + '</strong><span>' + escapeHtml(card[1]) + '</span></div>';
    }).join("");
    return '<div class="se-pw22-preview"><div class="se-pw22-hero"><p class="eyebrow">' + escapeHtml(state.heroEyebrow) + '</p><h4>' + escapeHtml(state.heroHeadline) + '</h4><p>' + escapeHtml(state.heroSubheadline) + '</p><div class="se-pw22-actions"><a href="#">' + escapeHtml(state.primaryLabel) + '</a><a href="#">' + escapeHtml(state.secondaryLabel) + '</a></div></div><div class="se-pw22-cards">' + cardsHtml + '</div></div>';
  }

  function applyStateClasses(wb, state) {
    wb.classList.remove("se-pw22-theme-aviation_blue", "se-pw22-theme-airfield", "se-pw22-theme-slate", "se-pw22-theme-sand", "se-pw22-scale-small", "se-pw22-scale-normal", "se-pw22-scale-large", "se-pw22-scale-xl", "se-pw22-density-compact", "se-pw22-density-comfortable", "se-pw22-density-spacious", "se-pw22-shape-pill", "se-pw22-shape-soft", "se-pw22-shape-square");
    wb.classList.add("se-pw22-theme-" + state.theme);
    wb.classList.add("se-pw22-scale-" + state.fontScale);
    wb.classList.add("se-pw22-density-" + state.cardDensity);
    wb.classList.add("se-pw22-shape-" + state.buttonShape);
  }

  function renderWorkbench() {
    const r = root();
    if (!r) return;
    let wb = document.getElementById(LAB_ID);
    const state = readState();
    if (!wb) {
      wb = document.createElement("section");
      wb.id = LAB_ID;
      wb.className = "se-pw22";
      const shell = r.querySelector(".se-shell") || r;
      const status = r.querySelector("[data-se-status]");
      if (status && status.parentNode === shell) shell.insertBefore(wb, status.nextSibling);
      else shell.insertBefore(wb, shell.firstChild);
    }
    applyStateClasses(wb, state);
    const tabs = [["content","Content"],["style","Style"],["modules","Modules"],["export","Export"]];
    wb.innerHTML = '<div class="se-pw22-head"><div><h2>Clean Priority Testing Workbench</h2><p>Clean v22 file. No stacked legacy patch markers. Controls and preview stay together near the top.</p></div><div class="se-pw22-badges"><span>JS v22</span><span>versioned file</span><span>local export only</span></div></div>' +
      '<div class="se-pw22-tabs">' + tabs.map(function (tab) { return '<button type="button" class="se-pw22-tab ' + (state.tab === tab[0] ? 'is-active' : '') + '" data-se-pw22-tab="' + tab[0] + '">' + tab[1] + '</button>'; }).join("") + '</div>' +
      '<div class="se-pw22-body"><div class="se-pw22-panel">' + controlsHtml(state.tab) + '</div><div class="se-pw22-panel"><h3>Live preview</h3><p>Preview stays beside active controls.</p>' + previewHtml(state) + '</div></div>' +
      '<div class="se-pw22-note">Prototype boundary: this remains a local draft lab. Future production save requires authenticated Supabase functions, customer scoping, RLS, and audit logs.</div>';
    const output = wb.querySelector("[data-se-pw22-output]");
    if (output) output.textContent = JSON.stringify({ version: VERSION_LABEL, file_name: FILE_NAME, state: state }, null, 2);
    hideLowerInfoPanels();
  }

  function bindOnce() {
    if (document.documentElement.getAttribute("data-se-pw22-bound") === "true") return;
    document.documentElement.setAttribute("data-se-pw22-bound", "true");
    document.addEventListener("click", function (event) {
      const tab = event.target.closest("[data-se-pw22-tab]");
      if (tab) {
        const state = readState();
        state.tab = tab.getAttribute("data-se-pw22-tab") || "content";
        writeState(state);
        renderWorkbench();
        event.preventDefault();
        return;
      }
      const exportBtn = event.target.closest("[data-se-pw22-export]");
      if (exportBtn) {
        const state = readState();
        downloadJson("syncetc-priority-workbench-v22-local-draft.json", { version: VERSION_LABEL, file_name: FILE_NAME, exported_at: new Date().toISOString(), state: state });
        exportBtn.textContent = "JSON downloaded";
        window.setTimeout(function () { exportBtn.textContent = "Export local JSON"; }, 1200);
        event.preventDefault();
        return;
      }
      const resetBtn = event.target.closest("[data-se-pw22-reset]");
      if (resetBtn) {
        try { window.localStorage.removeItem(STORAGE_KEY); } catch (error) {}
        renderWorkbench();
        event.preventDefault();
      }
    });
    document.addEventListener("input", function (event) {
      const field = event.target.closest("[data-se-pw22-field]");
      if (!field) return;
      const state = readState();
      const key = field.getAttribute("data-se-pw22-field");
      state[key] = field.type === "checkbox" ? field.checked : field.value;
      writeState(state);
      renderWorkbench();
    });
    document.addEventListener("change", function (event) {
      const field = event.target.closest("[data-se-pw22-field]");
      if (!field) return;
      const state = readState();
      const key = field.getAttribute("data-se-pw22-field");
      state[key] = field.type === "checkbox" ? field.checked : field.value;
      writeState(state);
      renderWorkbench();
    });
  }

  function boot() {
    installStyles();
    updateVersionMarkers();
    bindOnce();
    renderWorkbench();
    [200, 600, 1200, 2500].forEach(function (delay) { window.setTimeout(function () { updateVersionMarkers(); renderWorkbench(); }, delay); });
    console.log("SYNCETC UPDATE 94 CLEAN VERSIONED WORKBENCH LOADED", VERSION_LABEL, FILE_NAME);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
/* syncetc_update_94_clean_versioned_priority_workbench_v22 - END */

/* syncetc-homepage-v22-clean-priority-workbench.js - END */
