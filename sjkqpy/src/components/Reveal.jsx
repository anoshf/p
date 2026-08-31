import { useEffect, useRef, useState } from 'react'
import { site, get } from '../lib/config'

/**
 * Fades content in as it enters the viewport.
 * Falls back to "always visible" when animations are disabled in site.yml,
 * when the visitor prefers reduced motion, or when IntersectionObserver is
 * missing — the content must never be hidden by a failed enhancement.
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const enabled = get(site, 'options.animateOnScroll', true)
  const ref = useRef(null)
  const [visible, setVisible] = useState(!enabled)

  useEffect(() => {
    if (!enabled) return
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const el = ref.current
    if (!el) return

    // Anything already on screen (or just below it) reveals straight away.
    // Without this, content can sit invisible if the observer's first
    // callback is delayed — an unacceptable failure mode for a page whose
    // whole job is being read.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 1.2) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)

    // Backstop: if the element is on screen but the observer never reported
    // it, reveal it anyway. Content is never left hidden by a failed effect.
    const backstop = window.setTimeout(() => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) setVisible(true)
    }, 1200)

    return () => {
      observer.disconnect()
      window.clearTimeout(backstop)
    }
  }, [enabled])

  return (
    <Tag
      ref={ref}
      className={`${enabled ? 'reveal' : ''} ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={visible && delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
