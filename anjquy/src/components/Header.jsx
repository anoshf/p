import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ThemeSwitcher from './ThemeSwitcher'
import { IconMenu, IconClose } from './Icons'
import { site, themeConfig, get, hasItems, clean } from '../lib/config'

export default function Header({ themeProps }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const name = clean(get(site, 'identity.name'), '')
  const initials = clean(get(site, 'identity.initials'), '')
  const navItems = hasItems(site?.nav) ? site.nav : []
  const showSwitcher = get(themeConfig, 'showThemeSwitcher', true)
  const onHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [location.pathname])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  /* Section links must work from any route: from /contact we navigate home
     first, then scroll. */
  const goToSection = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <Link to="/" className="brand" aria-label={`${name} — home`}>
          <span className="brand__mark" aria-hidden="true">
            {initials}
          </span>
          <span className="brand__name">{name}</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <ul className="site-nav__list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={(e) => goToSection(e, item.id)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          {showSwitcher && <ThemeSwitcher {...themeProps} />}
          <Link to="/contact" className="btn site-header__cta">
            Contact
          </Link>
          <button
            type="button"
            className="site-header__burger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu" id="mobile-menu">
          <ul className="mobile-menu__list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={(e) => goToSection(e, item.id)}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
          <Link to="/contact" className="btn btn--lg btn--block" onClick={() => setMenuOpen(false)}>
            Set up an interview
          </Link>
        </div>
      )}
    </header>
  )
}
