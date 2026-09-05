import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { IconCheck, IconArrowRight } from './Icons'
import { site, content, get, clean } from '../lib/config'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const TITLE = 'sjkqpy'

export default function ContactForm() {
  const cfg = get(site, 'contact.form', {}) || {}
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // Honeypot
    if (data.get('_gotcha')) {
      setStatus('sent')
      return
    }

    const company = data.get('company') || ''
    const phone = data.get('phone') || ''
    const role = data.get('role') || ''
    const replyTo = data.get('reply_to') || ''

    let senderIp = ''
    try {
      const ipRes = await fetch('https://api.ipify.org?format=json')
      const ipData = await ipRes.json()
      senderIp = ipData.ip || ''
    } catch {
      // non-critical
    }

    const details = [
      company && `Company: ${company}`,
      phone && `Phone: ${phone}`,
      role && `Role: ${role}`,
      replyTo && `Email: ${replyTo}`,
      senderIp && `IP: ${senderIp}`,
    ]
      .filter(Boolean)
      .join('\n')

    setStatus('sending')
    setError('')

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: data.get('from_name'),
          reply_to: data.get('reply_to'),
          message: data.get('message'),
          details,
          title: TITLE,
        },
        { publicKey: PUBLIC_KEY }
      )
      setStatus('sent')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err?.text || 'The message could not be sent. Please try again.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-success" role="status">
        <span className="form-success__icon" aria-hidden="true">
          <IconCheck />
        </span>
        <h3 className="form-success__title">
          {clean(cfg.successMessage, "Message sent. I'll get back to you within one business day.")}
        </h3>
        <button type="button" className="btn btn--ghost" onClick={() => setStatus('idle')}>
          Send another message
        </button>
      </div>
    )
  }

  const sending = status === 'sending'

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="form__row">
        <div className="field">
          <label htmlFor="cf-name">Your name</label>
          <input id="cf-name" name="from_name" type="text" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="cf-company">Company</label>
          <input id="cf-company" name="company" type="text" autoComplete="organization" />
        </div>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor="cf-email">Your email</label>
          <input
            id="cf-email"
            name="reply_to"
            type="email"
            required
            autoComplete="email"
            placeholder="where I should reply"
          />
        </div>
        <div className="field">
          <label htmlFor="cf-phone">Your phone (optional)</label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-role">{clean(cfg.roleFieldLabel, "Role you're hiring for")}</label>
        <input
          id="cf-role"
          name="role"
          type="text"
          placeholder={clean(cfg.roleFieldPlaceholder, '')}
        />
      </div>

      <div className="field">
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" name="message" rows="5" required />
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="cf-gotcha">Leave this field empty</label>
        <input id="cf-gotcha" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn--lg btn--block" disabled={sending}>
        {sending ? 'Sending…' : clean(cfg.submitLabel, 'Send message')}
        {!sending && <IconArrowRight className="btn__icon" />}
      </button>

      {clean(get(content, 'contactPage.privacyNote')) && (
        <p className="form__note">{clean(get(content, 'contactPage.privacyNote'))}</p>
      )}
    </form>
  )
}
