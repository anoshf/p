import yaml from 'js-yaml'

// The three YAML files are pulled in as raw strings by Vite (`?raw`) and parsed
// at module load. That keeps YAML as the single source of truth while still
// producing a fully static bundle — no fetch, no backend, no runtime config.
import contentRaw from '../config/content.yml?raw'
import siteRaw from '../config/site.yml?raw'
import themesRaw from '../config/themes.yml?raw'

function parse(raw, label) {
  try {
    return yaml.load(raw) || {}
  } catch (err) {
    // A YAML syntax error is the single most likely thing to go wrong when
    // someone edits these files, so fail loudly and usefully.
    console.error(
      `[config] Could not parse ${label}.yml — the site will render with ` +
        `defaults for this file.\n\n${err.message}`
    )
    return {}
  }
}

export const content = parse(contentRaw, 'content')
export const site = parse(siteRaw, 'site')
export const themeConfig = parse(themesRaw, 'themes')

export const themes = Array.isArray(themeConfig.themes) ? themeConfig.themes : []

/** Safe nested read: get(site, 'contact.form.endpointId', '') */
export function get(obj, path, fallback = undefined) {
  const value = String(path)
    .split('.')
    .reduce((acc, key) => (acc == null ? undefined : acc[key]), obj)
  return value === undefined || value === null || value === '' ? fallback : value
}

/** True when a config list actually has something to render. */
export function hasItems(list) {
  return Array.isArray(list) && list.length > 0
}

/** Replaces __TOKEN__ placeholders that were never filled in with a visible flag. */
export function isPlaceholder(value) {
  return typeof value === 'string' && /^__[A-Z0-9_]+__$/.test(value.trim())
}

export function clean(value, fallback = '') {
  if (value === undefined || value === null) return fallback
  if (isPlaceholder(value)) return fallback
  return typeof value === 'string' ? value.trim() : value
}
