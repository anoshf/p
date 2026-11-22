import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { IconArrowRight } from '../components/Icons'
import { content, clean } from '../lib/config'

export default function Closing({ id, closing = content?.closing || {}, contactHref } = {}) {
  const c = closing
  const ContactLink = contactHref ? 'a' : Link
  const contactTarget = contactHref ? { href: contactHref } : { to: '/contact' }
  if (!clean(c.heading)) return null

  return (
    <section className="closing" id={id}>
      <div className="container">
        <Reveal className="closing__inner">
          <h2 className="closing__heading">{clean(c.heading)}</h2>
          {clean(c.body) && <p className="closing__body">{clean(c.body)}</p>}
          <ContactLink {...contactTarget} className="btn btn--lg closing__cta">
            {clean(c.ctaLabel, 'Contact me')}
            <IconArrowRight className="btn__icon" />
          </ContactLink>
        </Reveal>
      </div>
    </section>
  )
}
