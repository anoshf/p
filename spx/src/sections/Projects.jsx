import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { content, hasItems, clean } from '../lib/config'

export default function Projects() {
  const p = content?.projects || {}
  const items = (hasItems(p.items) ? p.items : []).filter((x) => clean(x?.title))
  if (!items.length) return null

  return (
    <section className="section section--alt" id="projects">
      <div className="container">
        <Reveal className="section__head">
          {clean(p.heading) && <h2 className="section__title">{clean(p.heading)}</h2>}
          {clean(p.subheading) && <p className="section__sub">{clean(p.subheading)}</p>}
        </Reveal>

        <ul className="cases">
          {items.map((item, i) => {
            const slug = clean(item.slug)
            const image = clean(item.image)
            const externalUrl = clean(item.url)

            return (
              <Reveal as="li" className="card card--hover case" key={i} delay={i * 60}>
                {image && (
                  <div className="case__media">
                    {slug ? (
                      <Link to={`/projects/${slug}`}>
                        <img src={`${import.meta.env.BASE_URL}${image}`} alt={clean(item.imageAlt) || clean(item.title)} loading="lazy" />
                      </Link>
                    ) : (
                      <img src={`${import.meta.env.BASE_URL}${image}`} alt={clean(item.imageAlt) || clean(item.title)} loading="lazy" />
                    )}
                  </div>
                )}
                <div className="case__head">
                  <h3 className="case__title">
                    {slug ? (
                      <Link to={`/projects/${slug}`}>{clean(item.title)}</Link>
                    ) : externalUrl ? (
                      <a href={externalUrl} target="_blank" rel="noopener noreferrer">{clean(item.title)}</a>
                    ) : (
                      clean(item.title)
                    )}
                  </h3>
                  {clean(item.org) && <p className="case__org">{clean(item.org)}</p>}
                </div>

                {clean(item.tagline) && <p className="case__tagline">{clean(item.tagline)}</p>}

                <dl className="case__body">
                  {clean(item.problem) && (
                    <div className="case__row">
                      <dt>Problem</dt>
                      <dd>{clean(item.problem)}</dd>
                    </div>
                  )}
                  {clean(item.approach) && (
                    <div className="case__row">
                      <dt>Approach</dt>
                      <dd>{clean(item.approach)}</dd>
                    </div>
                  )}
                  {clean(item.outcome) && (
                    <div className="case__row case__row--outcome">
                      <dt>Outcome</dt>
                      <dd>{clean(item.outcome)}</dd>
                    </div>
                  )}
                </dl>

                {hasItems(item.tags) && (
                  <ul className="chip-row case__tags">
                    {item.tags.map((t, j) => (
                      <li key={j}>
                        <span className="chip">{clean(t)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {slug && (
                  <Link to={`/projects/${slug}`} className="case__more">
                    View project details →
                  </Link>
                )}
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
