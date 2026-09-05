import { useEffect, useRef, useState } from 'react'
import { IconPalette, IconCheck } from './Icons'

export default function ThemeSwitcher({ themes, themeId, setThemeId }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!Array.isArray(themes) || themes.length < 2) return null

  const current = themes.find((t) => t.id === themeId) || themes[0]

  return (
    <div className="theme-switcher" ref={wrapRef}>
      <button
        ref={btnRef}
        type="button"
        className="theme-switcher__btn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Change theme. Current theme: ${current?.name}`}
        title="Change theme"
      >
        <IconPalette className="theme-switcher__icon" />
        <span className="theme-switcher__label">{current?.name}</span>
      </button>

      {open && (
        <ul className="theme-menu" role="listbox" aria-label="Site theme">
          {themes.map((t) => {
            const selected = t.id === themeId
            return (
              <li key={t.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`theme-menu__item ${selected ? 'is-selected' : ''}`}
                  onClick={() => {
                    setThemeId(t.id)
                    setOpen(false)
                    btnRef.current?.focus()
                  }}
                >
                  <span
                    className="theme-menu__swatch"
                    aria-hidden="true"
                    style={{
                      background: t.colors?.bg,
                      borderColor: t.colors?.borderStrong,
                    }}
                  >
                    <span style={{ background: t.colors?.accent }} />
                    <span style={{ background: t.colors?.bgAlt }} />
                  </span>
                  <span className="theme-menu__text">
                    <span className="theme-menu__name">{t.name}</span>
                    {t.hint && <span className="theme-menu__hint">{t.hint}</span>}
                  </span>
                  {selected && <IconCheck className="theme-menu__check" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
