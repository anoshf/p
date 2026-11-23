import { version } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { IconArrowRight, IconDownload, IconPin } from '../components/Icons'
import { content, site, get, hasItems, clean } from '../lib/config'

// React 18 forwards the lowercase attribute. React 19 exposes it as a DOM prop.
const priority = { [parseInt(version, 10) >= 19 ? 'fetchPriority' : 'fetchpriority']: 'high' }

export default function Hero({ hero = content?.hero || {}, photoSrc, contactHref } = {}) {
  const h = hero
  const photo = photoSrc || clean(get(site, 'identity.photo'), '')
  const photoAlt = clean(get(site, 'identity.photoAlt'), clean(h.name, 'Profile photo'))
  const location = clean(get(site, 'identity.location'), '')
  const showBadge = get(site, 'options.showAvailabilityBadge', true)
  const resumeOn = get(site, 'resume.enabled', false)
  const resumeFile = clean(get(site, 'resume.file'), 'resume.pdf')
  const resumeLabel = clean(get(site, 'resume.label'), 'Download resume')

  const proofPoints = (hasItems(h.proofPoints) ? h.proofPoints : []).filter(
    (p) => clean(p?.value) && clean(p?.label)
  )
  const quickFacts = (hasItems(h.quickFacts) ? h.quickFacts : []).map(clean).filter(Boolean)
  const marquee = (hasItems(h.techMarquee) ? h.techMarquee : []).map(clean).filter(Boolean)

  const primary = h.primaryCta || { label: 'Contact me', to: '/contact' }
  const secondary = h.secondaryCta
  const sectionLinks = hasItems(h.sectionLinks) ? h.sectionLinks : []
  const ContactLink = contactHref ? 'a' : Link
  const contactTarget = contactHref ? { href: contactHref } : { to: primary.to || '/contact' }

  const scrollTo = (e, hash) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    document
      .getElementById(String(hash).replace('#', ''))
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__content">
          {showBadge && clean(h.availabilityBadge) && (
            <Reveal as="p" className="hero__badge">
              <span className="hero__badge-dot" aria-hidden="true" />
              {clean(h.availabilityBadge)}
            </Reveal>
          )}

          {/* Identity block. On phones the photo sits inline here so the face,
              the name and the target role all land above the fold; on wider
              screens this avatar is hidden and the large framed photo on the
              right takes over. Same src either way — no second download. */}
          <Reveal className="hero__identity" delay={40}>
            {photo && (
              <img
                className="hero__avatar"
                src={photo}
                alt={photoAlt}
                width="160"
                height="160"
                {...priority}
                decoding="async"
              />
            )}
            <span className="hero__identity-text">
              {clean(h.eyebrow) && <span className="hero__eyebrow">{clean(h.eyebrow)}</span>}
              <h1 className="hero__name">{clean(h.name)}</h1>
            </span>
          </Reveal>

          {clean(h.headline) && (
            <Reveal as="p" className="hero__headline" delay={90}>
              {clean(h.headline)}
            </Reveal>
          )}

          {clean(h.subheadline) && (
            <Reveal as="p" className="hero__sub" delay={120}>
              {clean(h.subheadline)}
            </Reveal>
          )}

          {proofPoints.length > 0 && (
            <Reveal as="dl" className="hero__proof" delay={150}>
              {proofPoints.map((p, i) => (
                <div className="hero__proof-item" key={i}>
                  <dt className="hero__proof-value">{clean(p.value)}</dt>
                  <dd className="hero__proof-label">{clean(p.label)}</dd>
                </div>
              ))}
            </Reveal>
          )}

          {sectionLinks.length > 0 ? (
            <Reveal as="nav" aria-label="Explore this page" className="hero__actions hero__section-links" delay={180}>
              {sectionLinks.map(({ label, to }, index) => (
                <a key={to} href={to} className={`btn btn--lg${index === 0 ? '' : ' btn--ghost'}`}>
                  {label}
                </a>
              ))}
            </Reveal>
          ) : (
            <Reveal className="hero__actions" delay={180}>
              <ContactLink {...contactTarget} className="btn btn--lg">
                {clean(primary.label, 'Contact me')}
                <IconArrowRight className="btn__icon" />
              </ContactLink>

              {secondary && clean(secondary.label) && (
                <a
                  href={secondary.to}
                  className="btn btn--lg btn--ghost"
                  onClick={
                    String(secondary.to || '').startsWith('#')
                      ? (e) => scrollTo(e, secondary.to)
                      : undefined
                  }
                >
                  {clean(secondary.label)}
                </a>
              )}

              {resumeOn && (
                <a href={resumeFile} className="btn btn--lg btn--ghost" download>
                  <IconDownload className="btn__icon" />
                  {resumeLabel}
                </a>
              )}
            </Reveal>
          )}

          {(quickFacts.length > 0 || location) && (
            <Reveal as="ul" className="hero__facts" delay={210}>
              {location && (
                <li className="hero__fact">
                  <IconPin className="hero__fact-icon" />
                  {location}
                </li>
              )}
              {quickFacts.map((f, i) => (
                <li className="hero__fact" key={i}>
                  {f}
                </li>
              ))}
            </Reveal>
          )}
        </div>

        {photo && (
          <Reveal className="hero__media" delay={100}>
            <div className="hero__photo-frame">
              <img
                className="hero__photo"
                src={photo}
                alt={photoAlt}
                width="576"
                height="626"
                {...priority}
                decoding="async"
              />
            </div>
          </Reveal>
        )}
      </div>

      {marquee.length > 0 && (
        <div className="hero__marquee" aria-hidden="true">
          <div className="hero__marquee-track">
            {[0, 1].map((copy) => (
              <ul className="hero__marquee-group" key={copy}>
                {marquee.map((t, i) => (
                  <li key={`${copy}-${i}`}>{t}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
