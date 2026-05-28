-- syncetc_update_82_current_hosted_asset_and_public_preview_mode_sql_v1 - BEGIN
-- Purpose:
-- Register the stable "current" hosted frontend asset and assign both prototype customers to it.
--
-- RLS STATUS:
-- No new tables.
-- No RLS changes.
-- Registry records only.

insert into public.platform_frontend_asset_versions (
  asset_version_key,
  asset_host_key,
  asset_label,
  asset_type_key,
  semantic_version,
  payload_target_version,
  file_name,
  public_url,
  loader_embed_html,
  expected_mount_id,
  expected_root_id,
  is_current_prototype,
  is_production_candidate,
  is_deprecated,
  cache_bust_strategy_key,
  notes
)
values (
  'syncetc_homepage_current_all_in_one',
  'github_pages_feskesen_syncetc_webflow_assets',
  'SyncEtc Homepage Current All-in-One Hosted JS',
  'all_in_one_js',
  'current_v13',
  'payload_v6',
  'syncetc-homepage-current-all-in-one.js',
  'https://feskesen.github.io/syncetc-webflow-assets/assets/syncetc-homepage-current-all-in-one.js',
  '<div id="syncetc-webflow-mount"></div>' || chr(10) ||
  '<script src="https://feskesen.github.io/syncetc-webflow-assets/assets/syncetc-homepage-current-all-in-one.js"></script>',
  'syncetc-webflow-mount',
  'syncetc-generated-homepage-v2',
  true,
  true,
  false,
  'stable_current_filename_replace_asset',
  'Stable current hosted asset. Adds Prototype / Public preview mode toggle so testers can hide diagnostic/admin panels and evaluate the public-facing page.'
)
on conflict (asset_version_key) do update
set
  asset_host_key = excluded.asset_host_key,
  asset_label = excluded.asset_label,
  asset_type_key = excluded.asset_type_key,
  semantic_version = excluded.semantic_version,
  payload_target_version = excluded.payload_target_version,
  file_name = excluded.file_name,
  public_url = excluded.public_url,
  loader_embed_html = excluded.loader_embed_html,
  expected_mount_id = excluded.expected_mount_id,
  expected_root_id = excluded.expected_root_id,
  is_current_prototype = excluded.is_current_prototype,
  is_production_candidate = excluded.is_production_candidate,
  is_deprecated = excluded.is_deprecated,
  cache_bust_strategy_key = excluded.cache_bust_strategy_key,
  notes = excluded.notes,
  updated_at = now();

update public.platform_frontend_asset_versions
set is_current_prototype = false,
    updated_at = now()
where asset_version_key <> 'syncetc_homepage_current_all_in_one'
  and is_current_prototype = true;

insert into public.customer_frontend_asset_deployments (
  customer_id,
  page_key,
  deployment_context_key,
  asset_version_key,
  webflow_site_label,
  webflow_page_label,
  webflow_embed_location_note,
  deployment_status_key,
  last_verified_at,
  last_verified_by,
  expected_public_url,
  notes,
  config_json
)
select
  c.id,
  'homepage',
  'webflow_prototype',
  'syncetc_homepage_current_all_in_one',
  'SyncEtc Webflow prototype',
  'Generated homepage prototype',
  'Single small Webflow loader using stable current GitHub Pages hosted asset.',
  'active',
  now(),
  'Frank / GPT assisted',
  'https://feskesen.github.io/syncetc-webflow-assets/assets/syncetc-homepage-current-all-in-one.js',
  case
    when c.name = '150th Aero Flying Club' then '150th remains treated as a customer for product architecture even if not commercially billed.'
    when c.name = 'Test Customer' then 'Test Customer remains the modular/admin-ops-only demonstration customer.'
    else 'Hosted current asset deployment.'
  end,
  jsonb_build_object(
    'loader_model', 'one_file_hosted_js',
    'stable_current_filename', true,
    'preview_modes', jsonb_build_array('prototype', 'public_preview'),
    'webflow_embed_size', 'small_loader_only',
    'github_pages_base_url', 'https://feskesen.github.io/syncetc-webflow-assets',
    'go_forward_update_method', 'replace hosted current asset file in GitHub assets folder'
  )
from public.customers c
where c.name in ('150th Aero Flying Club', 'Test Customer')
on conflict (customer_id, page_key, deployment_context_key) do update
set
  asset_version_key = excluded.asset_version_key,
  webflow_site_label = excluded.webflow_site_label,
  webflow_page_label = excluded.webflow_page_label,
  webflow_embed_location_note = excluded.webflow_embed_location_note,
  deployment_status_key = excluded.deployment_status_key,
  last_verified_at = excluded.last_verified_at,
  last_verified_by = excluded.last_verified_by,
  expected_public_url = excluded.expected_public_url,
  notes = excluded.notes,
  config_json = customer_frontend_asset_deployments.config_json || excluded.config_json,
  updated_at = now();

select
  customer_name,
  page_key,
  deployment_context_key,
  semantic_version,
  payload_target_version,
  public_url,
  is_current_prototype
from public.v_customer_frontend_asset_deployment_payload
where customer_name in ('150th Aero Flying Club', 'Test Customer')
order by customer_name, page_key;

-- syncetc_update_82_current_hosted_asset_and_public_preview_mode_sql_v1 - END
