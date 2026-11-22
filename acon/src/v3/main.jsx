import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Footer from '../../../pyj/src/components/Footer';
import { MobileContactBar } from '../../../pyj/src/components/MobileCta';
import { IconClose, IconMenu } from '../../../pyj/src/components/Icons';
import { content, site } from '../../../pyj/src/lib/config';
import { applyTheme, resolveInitialTheme } from '../../../pyj/src/lib/theme';
import Hero from '../../../pyj/src/sections/Hero';
import Positioning from '../../../pyj/src/sections/Positioning';
import Highlights from '../../../pyj/src/sections/Highlights';
import Skills from '../../../pyj/src/sections/Skills';
import Projects from '../../../pyj/src/sections/Projects';
import Recommendations from '../../../pyj/src/sections/Recommendations';
import Credentials from '../../../pyj/src/sections/Credentials';
import Closing from '../../../pyj/src/sections/Closing';
import { Contact, Portfolio, Process, Services } from '../consulting';
import headshot from '../assets/headshot.jpg';
import '../../../pyj/src/styles/global.css';
import '../../../pyj/src/styles/layout.css';
import '../../../pyj/src/styles/sections.css';
import './style.css';

const consultingNavigation = [
  { label: 'Services', id: 'services' },
  { label: 'Portfolio', id: 'work' },
  { label: 'How it works', id: 'process' },
  { label: "Let's talk", id: 'contact' },
];
const navigation = [
  { label: 'Home', id: 'top' },
  { label: content.positioning.heading, id: 'positioning' },
  { label: content.highlights.heading, id: 'highlights' },
  { label: content.skills.heading, id: 'skills' },
  { label: content.projects.heading, id: 'projects' },
  { label: content.recommendations.heading, id: 'recommendations' },
  { label: content.credentials.heading, id: 'credentials' },
  ...consultingNavigation,
  { label: content.closing.heading, id: 'hiring' },
];

const updateYears = text => text.replace(/\b(?:15|18)\+ (?:years|yrs)\b/gi, '20+ years');
const hero = {
  ...content.hero,
  eyebrow: updateYears(content.hero.eyebrow),
  subheadline: updateYears(content.hero.subheadline),
  proofPoints: content.hero.proofPoints.map(point => ({ ...point, value: updateYears(point.value) })),
};
const closing = { ...content.closing, body: updateYears(content.closing.body) };

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function closeOnEscape(event) {
    if (event.key !== 'Escape' || !open) return;
    setOpen(false);
    toggle.current?.focus();
  }

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} onKeyDown={closeOnEscape}>
      <div className="container site-header__inner">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <span className="brand__mark" aria-hidden="true">{site.identity.initials}</span>
          <span className="brand__name">{site.identity.name}</span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          <ul className="site-nav__list">
            {consultingNavigation.slice(0, -1).map(({ label, id }) => (
              <li key={id}><a href={`#${id}`} onClick={() => setOpen(false)}>{label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="site-header__actions">
          <a href="#contact" className="btn site-header__cta" onClick={() => setOpen(false)}>Let's talk</a>
          <button ref={toggle} className="site-header__burger v3-sections-toggle" type="button"
            aria-expanded={open} aria-controls="section-menu"
            aria-label={open ? 'Close sections menu' : 'Open sections menu'} onClick={() => setOpen(!open)}>
            <span>Sections</span>
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>
      <nav className="mobile-menu" id="section-menu" aria-label="All sections" hidden={!open}>
        <ul className="container mobile-menu__list">
          {navigation.map(({ label, id }) => (
            <li key={id}><a href={`#${id}`} onClick={() => setOpen(false)}>{label}</a></li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero hero={hero} photoSrc={headshot} contactHref="#contact" />
        <Positioning />
        <div className="v3-featured">
          <Highlights />
          <Skills />
          <Projects />
          <Recommendations />
          <Credentials />
        </div>
        <div className="v3-consulting">
          <Services />
          <Portfolio />
          <Process />
          <Contact />
        </div>
        <Closing id="hiring" closing={closing} contactHref="#contact" />
      </main>
      <Footer homeHref="#top" contactHref="#contact" />
      <MobileContactBar contactHref="#contact" />
    </>
  );
}

applyTheme(resolveInitialTheme());
createRoot(document.getElementById('root')).render(<App />);
