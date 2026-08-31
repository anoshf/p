import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { site, get } from '../lib/config'

/** Sticky bottom bar on phones. Appears once the visitor scrolls past the hero
 *  so it never covers the first impression, and never on the contact page. */
export default function MobileCta() {
  const enabled = get(site, 'options.showMobileStickyCta', true)
  const [show, setShow] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    if (!enabled) return
    const onScroll = () => setShow(window.scrollY > 640)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [enabled])

  if (!enabled || pathname === '/contact') return null

  return (
    <div className={`mobile-cta ${show ? 'is-visible' : ''}`} aria-hidden={!show}>
      <Link to="/contact" className="btn btn--block" tabIndex={show ? 0 : -1}>
        Set up an interview
      </Link>
    </div>
  )
}
