import Reveal from '../components/Reveal'
import { content, hasItems, clean } from '../lib/config'

export default function Positioning() {
  const p = content?.positioning || {}
  const pillars = (hasItems(p.pillars) ? p.pillars : []).filter((x) => clean(x?.title))
  if (!pillars.length) return null

  return (
    <section className="section section--alt" id="positioning">
      <div className="container">
        <Reveal className="section__head">
          {clean(p.heading) && <h2 className="section__title">{clean(p.heading)}</h2>}
          {clean(p.subheading) && <p className="section__sub">{clean(p.subheading)}</p>}
        </Reveal>

        <ul className="pillars">
          {pillars.map((pillar, i) => (
            <Reveal as="li" className="card card--hover pillar" key={i} delay={i * 70}>
              <span className="pillar__index" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="pillar__title">{clean(pillar.title)}</h3>
              <p className="pillar__body">{clean(pillar.body)}</p>
              {hasItems(pillar.tags) && (
                <ul className="chip-row pillar__tags">
                  {pillar.tags.map((t, j) => (
                    <li key={j}>
                      <span className="chip chip--outline">{clean(t)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
