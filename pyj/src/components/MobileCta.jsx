import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { site, get } from '../lib/config'

/** Sticky bottom bar on phones. Appears once the visitor scrolls past the hero
 *  so it never covers the first impression, and never on the contact page. */
export default function MobileCta() {
  const { pathname } = useLocation()
  return pathname === '/contact' ? null : <MobileContactBar />
}

export function MobileContactBar({ contactHref } = {}) {
  const enabled = get(site, 'options.showMobileStickyCta', true)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const onScroll = () => setShow(window.scrollY > 640)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [enabled])

  if (!enabled) return null
  const ContactLink = contactHref ? 'a' : Link
  const contactTarget = contactHref ? { href: contactHref } : { to: '/contact' }

  return (
    <div className={`mobile-cta ${show ? 'is-visible' : ''}`} aria-hidden={!show}>
      <ContactLink {...contactTarget} className="btn btn--block" tabIndex={show ? 0 : -1}>
        Contact me
      </ContactLink>
    </div>
  )
}
