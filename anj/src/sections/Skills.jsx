import Reveal from '../components/Reveal'
import { content, hasItems, clean } from '../lib/config'

export default function Skills() {
  const s = content?.skills || {}
  const groups = (hasItems(s.groups) ? s.groups : []).filter(
    (g) => clean(g?.name) && hasItems(g?.items)
  )
  if (!groups.length) return null

  return (
    <section className="section section--alt" id="skills">
      <div className="container">
        <Reveal className="section__head">
          {clean(s.heading) && <h2 className="section__title">{clean(s.heading)}</h2>}
          {clean(s.subheading) && <p className="section__sub">{clean(s.subheading)}</p>}
        </Reveal>

        <div className="skill-grid">
          {groups.map((g, i) => (
            <Reveal
              className={`card skill-group ${g.primary ? 'skill-group--primary' : ''}`}
              key={i}
              delay={i * 55}
            >
              <div className="skill-group__head">
                <h3 className="skill-group__name">{clean(g.name)}</h3>
                {g.primary && <span className="chip skill-group__flag">Core for this role</span>}
              </div>
              {clean(g.note) && <p className="skill-group__note">{clean(g.note)}</p>}
              <ul className="skill-group__items">
                {g.items.map((item, j) => (
                  <li className="skill-tag" key={j}>
                    {clean(item)}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
