import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { IconArrowRight } from '../components/Icons'
import { content, clean } from '../lib/config'

export default function Closing() {
  const c = content?.closing || {}
  if (!clean(c.heading)) return null

  return (
    <section className="closing">
      <div className="container">
        <Reveal className="closing__inner">
          <h2 className="closing__heading">{clean(c.heading)}</h2>
          {clean(c.body) && <p className="closing__body">{clean(c.body)}</p>}
          <Link to="/contact" className="btn btn--lg closing__cta">
            {clean(c.ctaLabel, 'Contact me')}
            <IconArrowRight className="btn__icon" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
