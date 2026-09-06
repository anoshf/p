import Reveal from '../components/Reveal'
import { content, hasItems, clean } from '../lib/config'

export default function Highlights() {
  const h = content?.highlights || {}
  const items = (hasItems(h.items) ? h.items : []).filter((x) => clean(x?.value))
  if (!items.length) return null

  return (
    <section className="section" id="highlights">
      <div className="container">
        <Reveal className="section__head">
          {clean(h.heading) && <h2 className="section__title">{clean(h.heading)}</h2>}
          {clean(h.subheading) && <p className="section__sub">{clean(h.subheading)}</p>}
        </Reveal>

        <ul className="metrics">
          {items.map((m, i) => (
            <Reveal as="li" className="card card--hover metric" key={i} delay={i * 60}>
              <p className="metric__value">{clean(m.value)}</p>
              <p className="metric__label">{clean(m.label)}</p>
              {clean(m.detail) && <p className="metric__detail">{clean(m.detail)}</p>}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
