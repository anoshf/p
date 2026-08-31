import { useEffect } from 'react'
import { site, content, get, hasItems, clean } from '../lib/config'

function upsertMeta(attr, key, value) {
  if (!value) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Sets the document title, meta tags and JSON-LD Person schema from site.yml.
 *
 * Everything written here mirrors content that is visible on the page. The
 * <noscript> block in index.html does the same. This is progressive
 * enhancement for crawlers and résumé parsers that don't execute JavaScript —
 * not hidden text: nothing is asserted in metadata that a visitor can't read.
 */
export default function Seo({ title, description }) {
  useEffect(() => {
    const name = clean(get(site, 'identity.name'), '')
    const role = clean(get(site, 'identity.targetRole'), '')
    const location = clean(get(site, 'identity.location'), '')
    const baseTitle = clean(get(site, 'seo.titleTemplate'), `${name} — ${role}`)
    const desc = description || clean(get(site, 'seo.description'), '')
    const siteUrl = clean(get(site, 'seo.siteUrl'), '')
    const keywords = hasItems(get(site, 'seo.keywords')) ? site.seo.keywords : []
    const aliases = hasItems(get(site, 'seo.jobTitleAliases')) ? site.seo.jobTitleAliases : []
    const ogImage = clean(get(site, 'seo.ogImage'), 'headshot.jpg')

    document.title = title ? `${title} · ${name}` : baseTitle

    upsertMeta('name', 'description', desc)
    if (keywords.length) upsertMeta('name', 'keywords', keywords.join(', '))
    upsertMeta('name', 'author', name)
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large')

    upsertMeta('property', 'og:type', 'profile')
    upsertMeta('property', 'og:title', document.title)
    upsertMeta('property', 'og:description', desc)
    upsertMeta('property', 'og:site_name', name)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', document.title)
    upsertMeta('name', 'twitter:description', desc)

    if (siteUrl) {
      const clean_ = siteUrl.replace(/\/+$/, '')
      upsertLink('canonical', clean_ + '/')
      upsertMeta('property', 'og:url', clean_ + '/')
      upsertMeta('property', 'og:image', `${clean_}/${ogImage}`)
      upsertMeta('name', 'twitter:image', `${clean_}/${ogImage}`)
    }

    // ---- JSON-LD Person schema -------------------------------------------
    const employers = (get(content, 'experience.roles', []) || [])
      .map((r) => clean(r?.company))
      .filter(Boolean)

    const personLd = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name,
      jobTitle: role,
      description: desc,
      ...(location ? { address: { '@type': 'PostalAddress', addressLocality: location } } : {}),
      ...(siteUrl ? { url: siteUrl } : {}),
      ...(keywords.length ? { knowsAbout: keywords } : {}),
      ...(aliases.length ? { alternateName: aliases } : {}),
      ...(employers.length
        ? { worksFor: employers.map((c) => ({ '@type': 'Organization', name: c })) }
        : {}),
    }

    let ld = document.getElementById('person-ld')
    if (!ld) {
      ld = document.createElement('script')
      ld.type = 'application/ld+json'
      ld.id = 'person-ld'
      document.head.appendChild(ld)
    }
    ld.textContent = JSON.stringify(personLd)
  }, [title, description])

  return null
}
