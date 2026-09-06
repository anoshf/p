import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import { content, hasItems, clean, get, site } from '../lib/config'

export default function ProjectDetail() {
  const { slug } = useParams()
  const items = hasItems(get(content, 'projects.items')) ? content.projects.items : []
  const project = items.find((x) => clean(x?.slug) === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) {
    return (
      <>
        <Seo title="Project not found" />
        <section className="section notfound">
          <div className="container notfound__inner">
            <p className="notfound__code">404</p>
            <h1 className="notfound__title">That project doesn't exist</h1>
            <p className="notfound__body">The link may be out of date. Everything lives on the home page.</p>
            <div className="notfound__actions">
              <Link to="/" className="btn btn--lg">← Back to home</Link>
            </div>
          </div>
        </section>
      </>
    )
  }

  const images = hasItems(project.images) ? project.images : clean(project.image) ? [{ src: project.image, alt: project.imageAlt, caption: '' }] : []

  return (
    <>
      <Seo
        title={clean(project.title)}
        description={clean(project.tagline) || `${clean(project.title)} — ${clean(get(site, 'identity.name'), '')}`}
      />

      <section className="section project-detail">
        <div className="container project-detail__inner">
          <Link to="/" className="project-detail__back">← Back to home</Link>

          <Reveal className="project-detail__head">
            {clean(project.org) && <p className="case__org">{clean(project.org)}</p>}
            <h1 className="project-detail__title">{clean(project.title)}</h1>
            {clean(project.tagline) && <p className="project-detail__tagline">{clean(project.tagline)}</p>}
            {clean(project.url) && (
              <a className="project-detail__link" href={clean(project.url)} target="_blank" rel="noopener noreferrer">
                Visit the live site ↗
              </a>
            )}
          </Reveal>

          {images.length > 0 && (
            <Reveal className="project-detail__gallery" delay={60}>
              {images.map((img, i) => (
                <figure className="project-detail__figure" key={i}>
                  <img
                    src={`${import.meta.env.BASE_URL}${clean(img.src)}`}
                    alt={clean(img.alt) || clean(project.title)}
                    loading="lazy"
                  />
                  {clean(img.caption) && <figcaption>{clean(img.caption)}</figcaption>}
                </figure>
              ))}
            </Reveal>
          )}

          <Reveal className="project-detail__body" delay={100}>
            <dl className="case__body project-detail__dl">
              {clean(project.problem) && (
                <div className="case__row">
                  <dt>Problem</dt>
                  <dd>{clean(project.problem)}</dd>
                </div>
              )}
              {clean(project.approach) && (
                <div className="case__row">
                  <dt>Approach</dt>
                  <dd>{clean(project.approach)}</dd>
                </div>
              )}
              {clean(project.outcome) && (
                <div className="case__row case__row--outcome">
                  <dt>Outcome</dt>
                  <dd>{clean(project.outcome)}</dd>
                </div>
              )}
            </dl>

            {hasItems(project.tags) && (
              <ul className="chip-row case__tags">
                {project.tags.map((t, j) => (
                  <li key={j}>
                    <span className="chip">{clean(t)}</span>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>

          <Reveal className="project-detail__footer" delay={140}>
            <Link to="/" className="btn btn--lg">← Back to home</Link>
            <Link to="/contact" className="btn btn--lg btn--ghost">Contact me</Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
