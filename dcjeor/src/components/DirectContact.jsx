import { IconMessage, IconPhone, IconCalendar } from './Icons'
import { site, get, clean } from '../lib/config'

/**
 * Text / call / scheduling buttons.
 *
 * The phone number is deliberately NOT rendered into the markup — not as
 * visible text and not as an href. These are <button> elements; the sms: and
 * tel: URL is assembled from config only at the moment someone clicks. A
 * scraper reading the served HTML finds no phone number to harvest, while a
 * real visitor still gets a one-tap text or call.
 *
 * Set contact.sms.display in site.yml if you *do* want the number printed
 * on screen; leaving it empty keeps it hidden.
 */
export default function DirectContact() {
  const sms = get(site, 'contact.sms', {}) || {}
  const sched = get(site, 'contact.scheduling', {}) || {}

  const raw = clean(sms.number, '')
  const digits = raw.replace(/[^\d+]/g, '')
  const display = clean(sms.display, '')
  const canText = Boolean(digits) && sms.enableText !== false
  const canCall = Boolean(digits) && sms.enableCall !== false
  const prefill = clean(sms.prefilledText, '')

  const openSms = () => {
    // iOS wants ?&body=, Android and desktop accept ?body=. This form works on both.
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent || '')
    const sep = isIos ? '&' : '?'
    const body = prefill ? `${sep}body=${encodeURIComponent(prefill)}` : ''
    window.location.href = `sms:${digits}${body}`
  }

  const openCall = () => {
    window.location.href = `tel:${digits}`
  }

  if (!canText && !canCall && !sched?.enabled) return null

  return (
    <div className="direct">
      {clean(sms.heading) && <h3 className="direct__heading">{clean(sms.heading)}</h3>}
      {clean(sms.blurb) && <p className="direct__blurb">{clean(sms.blurb)}</p>}

      <div className="direct__actions">
        {canText && (
          <button type="button" className="btn btn--lg direct__btn" onClick={openSms}>
            <IconMessage className="btn__icon" />
            Send a text
          </button>
        )}
        {canCall && (
          <button type="button" className="btn btn--lg btn--ghost direct__btn" onClick={openCall}>
            <IconPhone className="btn__icon" />
            Call
          </button>
        )}
      </div>

      {display && <p className="direct__number">{display}</p>}

      {!display && (canText || canCall) && (
        <p className="direct__hint">
          Opens your messaging or phone app with my number already filled in.
        </p>
      )}

      {sched?.enabled && clean(sched.url) && (
        <div className="direct__sched">
          {clean(sched.blurb) && <p className="direct__blurb">{clean(sched.blurb)}</p>}
          <a
            className="btn btn--lg btn--soft direct__btn"
            href={clean(sched.url)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconCalendar className="btn__icon" />
            {clean(sched.label, 'Book a call')}
          </a>
        </div>
      )}
    </div>
  )
}
