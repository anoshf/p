import { useEffect } from 'react'
import Seo from '../components/Seo'
import ContactForm from '../components/ContactForm'
import DirectContact from '../components/DirectContact'
import Reveal from '../components/Reveal'
import { IconCheck } from '../components/Icons'
import { site, content, get, hasItems, clean } from '../lib/config'

export default function Contact() {
  const page = content?.contactPage || {}
  const methods = hasItems(get(site, 'contact.methods'))
    ? site.contact.methods.map((m) => String(m).toLowerCase())
    : []
  const showForm = methods.includes('form')
  const showDirect = methods.includes('sms')
  const promise = clean(get(site, 'contact.responsePromise'), '')
  const expect = (hasItems(page.whatToExpect) ? page.whatToExpect : []).map(clean).filter(Boolean)
  const bothColumns = showForm && showDirect

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Seo
        title="Contact"
        description={`Get in touch with ${clean(get(site, 'identity.name'), '')} about ${clean(
          get(site, 'identity.targetRole'),
          'engineering'
        )} roles.`}
      />

      <section className="section contact-page">
        <div className="container">
          <Reveal className="contact-page__head">
            <h1 className="contact-page__title">{clean(page.heading, "Let's talk about the role")}</h1>
            {clean(page.intro) && <p className="contact-page__intro">{clean(page.intro)}</p>}
            {promise && (
              <p className="contact-page__promise">
                <span className="contact-page__promise-dot" aria-hidden="true" />
                {promise}
              </p>
            )}
          </Reveal>

          {expect.length > 0 && (
            <Reveal as="ul" className="expect" delay={60}>
              {expect.map((item, i) => (
                <li className="expect__item" key={i}>
                  <IconCheck className="expect__icon" />
                  <span>{item}</span>
                </li>
              ))}
            </Reveal>
          )}

          {methods.length === 0 ? (
            <Reveal className="card contact-empty" delay={80}>
              <p>
                Contact channels are turned off right now. Set{' '}
                <code>contact.methods</code> in <code>src/config/site.yml</code> to{' '}
                <code>[form]</code>, <code>[sms]</code>, or <code>[form, sms]</code> to switch them
                back on.
              </p>
            </Reveal>
          ) : (
            <div className={`contact-grid ${bothColumns ? 'contact-grid--split' : ''}`}>
              {showForm && (
                <Reveal className="card contact-card" delay={80}>
                  <h2 className="contact-card__title">
                    {clean(get(site, 'contact.form.heading'), 'Send a message')}
                  </h2>
                  {clean(get(site, 'contact.form.blurb')) && (
                    <p className="contact-card__blurb">{clean(get(site, 'contact.form.blurb'))}</p>
                  )}
                  <ContactForm />
                </Reveal>
              )}

              {showDirect && (
                <Reveal className="card contact-card contact-card--direct" delay={120}>
                  <DirectContact />
                </Reveal>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
