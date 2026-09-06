import { useCallback, useEffect, useMemo, useState } from 'react'
import { themes, themeConfig, get } from './config'

const STORAGE_KEY = 'site-theme'

const CAMEL_TO_KEBAB = (s) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)

/** True when visitors are allowed to pick a theme at all. */
export const switcherEnabled = get(themeConfig, 'showThemeSwitcher', true) !== false

export function resolveInitialTheme() {
  const configured = get(themeConfig, 'defaultTheme', themes[0]?.id)

  // With the switcher turned off the site is locked to `defaultTheme`. A theme
  // a visitor happened to store on an earlier visit must not keep overriding
  // it, so storage is ignored entirely in that mode.
  if (!switcherEnabled) return configured

  // Otherwise respect a returning visitor's choice, but never crash if storage
  // is unavailable (private windows, embedded webviews, blocked site data).
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && themes.some((t) => t.id === stored)) return stored
  } catch {
    /* storage unavailable — fall through to the configured default */
  }
  return configured
}

/** Writes a theme's colour tokens onto :root as CSS custom properties. */
export function applyTheme(themeId) {
  const theme = themes.find((t) => t.id === themeId) || themes[0]
  if (!theme) return
  const root = document.documentElement
  Object.entries(theme.colors || {}).forEach(([key, value]) => {
    root.style.setProperty(`--c-${CAMEL_TO_KEBAB(key)}`, String(value))
  })
  root.setAttribute('data-theme', theme.id)
  // Tells the browser to paint scrollbars and native form controls to match.
  root.style.colorScheme = theme.isDark ? 'dark' : 'light'
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme.colors?.bg || '#ffffff')
}

export function useTheme() {
  const [themeId, setThemeId] = useState(resolveInitialTheme)

  useEffect(() => {
    applyTheme(themeId)
    if (!switcherEnabled) return
    try {
      window.localStorage.setItem(STORAGE_KEY, themeId)
    } catch {
      /* non-fatal: the theme still applies for this visit */
    }
  }, [themeId])

  const current = useMemo(
    () => themes.find((t) => t.id === themeId) || themes[0],
    [themeId]
  )

  const cycle = useCallback(() => {
    const i = themes.findIndex((t) => t.id === themeId)
    setThemeId(themes[(i + 1) % themes.length]?.id)
  }, [themeId])

  return { themeId, setThemeId, current, themes, cycle }
}
