import { Link } from 'react-router-dom'
import { site, get, clean } from '../lib/config'

export default function Footer() {
  const name = clean(get(site, 'identity.name'), '')
  const role = clean(get(site, 'identity.targetRole'), '')
  const location = clean(get(site, 'identity.location'), '')
  const note = clean(get(site, 'options.footerNote'), '')
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__name">{name}</p>
          {role && <p className="site-footer__role">{role}</p>}
          {location && <p className="site-footer__loc">{location}</p>}
        </div>

        <nav className="site-footer__links" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>

      <div className="container site-footer__meta">
        <p>
          © {year} {name}
          {note ? ` · ${note}` : ''}
        </p>
      </div>
    </footer>
  )
}
