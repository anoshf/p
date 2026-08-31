import { useState } from 'react'
import { IconCheck, IconArrowRight } from './Icons'
import { site, content, get, clean } from '../lib/config'

/** Builds the POST target from site.yml without ever putting an email address
 *  in the project. Returns '' when the form hasn't been connected yet. */
function resolveEndpoint() {
  const provider = String(get(site, 'contact.form.provider', 'formspree')).toLowerCase()
  const id = clean(get(site, 'contact.form.endpointId'), '')
  const custom = clean(get(site, 'contact.form.customEndpoint'), '')
  if (provider === 'custom') return custom
  if (!id) return ''
  if (provider === 'getform') return `https://getform.io/f/${id}`
  return `https://formspree.io/f/${id}`
}

export default function ContactForm() {
  const endpoint = resolveEndpoint()
  const cfg = get(site, 'contact.form', {}) || {}
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // Honeypot: real people never fill a field they cannot see.
    if (data.get('_gotcha')) {
      setStatus('sent')
      return
    }

    if (!endpoint) {
      setStatus('error')
      setError(
        'This form is not connected to an inbox yet. Add your form endpoint id to src/config/site.yml (contact.form.endpointId) and redeploy.'
      )
      return
    }

    setStatus('sending')
    setError('')

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        const body = await res.json().catch(() => ({}))
        setStatus('error')
        setError(
          body?.errors?.[0]?.message ||
            'The message could not be sent. Please try the text option instead.'
        )
      }
    } catch {
      setStatus('error')
      setError('Network error. Please check your connection, or use the text option instead.')
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
      {!endpoint && (
        <p className="form-notice" role="note">
          <strong>Form not connected yet.</strong> Add your endpoint id to{' '}
          <code>src/config/site.yml</code> → <code>contact.form.endpointId</code>. Until then the
          text and call buttons still work.
        </p>
      )}

      <div className="form__row">
        <div className="field">
          <label htmlFor="cf-name">Your name</label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" />
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
            name="email"
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
        <textarea
          id="cf-message"
          name="message"
          rows="5"
          required
          placeholder="A sentence or two about the role and the team is plenty."
        />
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="cf-gotcha">Leave this field empty</label>
        <input id="cf-gotcha" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Gives the notification email a useful subject line. */}
      <input
        type="hidden"
        name="_subject"
        value={`Interview enquiry — ${clean(get(site, 'identity.targetRole'), 'portfolio site')}`}
      />

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
