import { useState } from 'react'
import Reveal from '../components/Reveal'
import { content, hasItems, clean } from '../lib/config'

function Role({ role, index }) {
  // Long stack lists are collapsed on first paint so the timeline stays
  // scannable; the full list is one tap away and always in the DOM for search.
  const [showStack, setShowStack] = useState(false)
  const bullets = hasItems(role.bullets) ? role.bullets : []
  const stack = hasItems(role.stack) ? role.stack : []
  const stackId = `stack-${index}`

  return (
    <Reveal as="li" className="job" delay={index * 50}>
      <div className="job__marker" aria-hidden="true" />

      <div className="job__head">
        <div>
          <h3 className="job__title">{clean(role.title)}</h3>
          <p className="job__company">
            {clean(role.company)}
            {clean(role.location) && <span className="job__loc"> · {clean(role.location)}</span>}
          </p>
        </div>
        <p className="job__period">{clean(role.period)}</p>
      </div>

      {clean(role.summary) && <p className="job__summary">{clean(role.summary)}</p>}

      {bullets.length > 0 && (
        <ul className="job__bullets">
          {bullets.map((b, i) => (
            <li key={i}>{clean(b)}</li>
          ))}
        </ul>
      )}

      {stack.length > 0 && (
        <div className="job__stack">
          <button
            type="button"
            className="job__stack-toggle"
            onClick={() => setShowStack((v) => !v)}
            aria-expanded={showStack}
            aria-controls={stackId}
          >
            {showStack ? 'Hide stack' : `Stack (${stack.length})`}
          </button>
          <ul className="job__stack-list" id={stackId} hidden={!showStack}>
            {stack.map((t, i) => (
              <li className="skill-tag skill-tag--sm" key={i}>
                {clean(t)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Reveal>
  )
}

export default function Experience() {
  const e = content?.experience || {}
  const roles = (hasItems(e.roles) ? e.roles : []).filter((r) => clean(r?.company))
  if (!roles.length) return null

  return (
    <section className="section" id="experience">
      <div className="container">
        <Reveal className="section__head">
          {clean(e.heading) && <h2 className="section__title">{clean(e.heading)}</h2>}
          {clean(e.subheading) && <p className="section__sub">{clean(e.subheading)}</p>}
        </Reveal>

        <ol className="timeline">
          {roles.map((role, i) => (
            <Role role={role} index={i} key={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}
