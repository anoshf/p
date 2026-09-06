import { useState } from 'react'
import Reveal from '../components/Reveal'
import { IconQuote } from '../components/Icons'
import { content, hasItems, clean } from '../lib/config'

const INITIAL_SHOWN = 6

function firstNameOf(name = '') {
  return name.trim().split(/\s+/)[0] || name
}

function initialsOf(name = '') {
  const first = firstNameOf(name)
  return first[0]?.toUpperCase() || ''
}

function Quote({ item, featured }) {
  const quote = clean(item.quote)
  // Very long quotes get clamped with a native <details>-free toggle so the
  // grid stays even; the full text is always present for search and print.
  const isLong = quote.length > 420
  const [expanded, setExpanded] = useState(false)

  return (
    <li className={`card rec ${featured ? 'rec--featured' : ''}`}>
      <IconQuote className="rec__mark" />

      <blockquote className={`rec__quote ${isLong && !expanded ? 'is-clamped' : ''}`}>
        <p>{quote}</p>
      </blockquote>

      {isLong && (
        <button
          type="button"
          className="rec__more"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : 'Read full recommendation'}
        </button>
      )}

      <figcaption className="rec__person">
        <span className="rec__avatar" aria-hidden="true">
          {initialsOf(clean(item.name))}
        </span>
        <span className="rec__meta">
          <span className="rec__name">{firstNameOf(clean(item.name))}</span>
          {clean(item.title) && <span className="rec__title">{clean(item.title)}</span>}
          {clean(item.relationship) && (
            <span className="rec__rel">{clean(item.relationship)}</span>
          )}
        </span>
      </figcaption>
    </li>
  )
}

export default function Recommendations() {
  const r = content?.recommendations || {}
  const all = (hasItems(r.items) ? r.items : []).filter((x) => clean(x?.quote))
  const [showAll, setShowAll] = useState(false)

  if (!all.length) return null

  const featured = all.filter((x) => x.featured)
  const rest = all.filter((x) => !x.featured)
  const ordered = [...featured, ...rest]
  const visible = showAll ? ordered : ordered.slice(0, INITIAL_SHOWN)
  const hidden = ordered.length - visible.length

  return (
    <section className="section" id="recommendations">
      <div className="container">
        <Reveal className="section__head">
          {clean(r.heading) && <h2 className="section__title">{clean(r.heading)}</h2>}
          {clean(r.subheading) && <p className="section__sub">{clean(r.subheading)}</p>}
        </Reveal>

        <ul className="recs">
          {visible.map((item, i) => (
            <Quote item={item} featured={Boolean(item.featured)} key={i} />
          ))}
        </ul>

        {hidden > 0 && (
          <div className="recs__more">
            <button type="button" className="btn btn--ghost" onClick={() => setShowAll(true)}>
              Show {hidden} more {hidden === 1 ? 'recommendation' : 'recommendations'}
            </button>
          </div>
        )}

        {clean(r.footnote) && <p className="recs__foot">{clean(r.footnote)}</p>}
      </div>
    </section>
  )
}
