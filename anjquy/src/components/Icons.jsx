/* Inline SVG icons — no icon library, no network request, theme-aware
   because they inherit `currentColor`. */

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
}

export const IconMessage = (p) => (
  <svg {...base} className={p.className}>
    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.9 8.9 0 0 1-4-.9L3 20l1.2-3.6A8.4 8.4 0 0 1 3 11.5 8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z" />
  </svg>
)

export const IconPhone = (p) => (
  <svg {...base} className={p.className}>
    <path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 3.2 2 2 0 0 1 4 1h2a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.1 8.9a16 16 0 0 0 6 6l1.3-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </svg>
)

export const IconMail = (p) => (
  <svg {...base} className={p.className}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2.5 6.5 8.4 5.7a2 2 0 0 0 2.2 0l8.4-5.7" />
  </svg>
)

export const IconCalendar = (p) => (
  <svg {...base} className={p.className}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
)

export const IconArrowRight = (p) => (
  <svg {...base} className={p.className}>
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
)

export const IconCheck = (p) => (
  <svg {...base} className={p.className}>
    <path d="m4 12.5 5 5L20 6.5" />
  </svg>
)

export const IconDownload = (p) => (
  <svg {...base} className={p.className}>
    <path d="M12 3v12M7 11l5 5 5-5M4 20h16" />
  </svg>
)

export const IconPalette = (p) => (
  <svg {...base} className={p.className}>
    <path d="M12 21a9 9 0 1 1 9-9c0 1.7-1.3 3-3 3h-1.5a2 2 0 0 0-1.4 3.4A2 2 0 0 1 13.7 21H12Z" />
    <circle cx="7.5" cy="12" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="9.8" cy="7.8" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="14.4" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
  </svg>
)

export const IconMenu = (p) => (
  <svg {...base} className={p.className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const IconClose = (p) => (
  <svg {...base} className={p.className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const IconQuote = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={p.className}>
    <path d="M9.3 5.5C6.2 7 4.5 9.6 4.5 13v5.5h6.2V13H7.6c0-2.3.9-3.9 2.8-5l-1.1-2.5Zm9.4 0C15.6 7 13.9 9.6 13.9 13v5.5h6.2V13H17c0-2.3.9-3.9 2.8-5l-1.1-2.5Z" />
  </svg>
)

export const IconSpark = (p) => (
  <svg {...base} className={p.className}>
    <path d="M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21M5.6 5.6l2.5 2.5M15.9 15.9l2.5 2.5M18.4 5.6l-2.5 2.5M8.1 15.9l-2.5 2.5" />
  </svg>
)

export const IconPin = (p) => (
  <svg {...base} className={p.className}>
    <path d="M20 10c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
)
