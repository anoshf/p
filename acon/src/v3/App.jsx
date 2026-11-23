import { useEffect, useRef, useState } from 'react';
import Footer from '../../../pyj/src/components/Footer';
import { MobileContactBar } from '../../../pyj/src/components/MobileCta';
import { IconClose, IconMenu } from '../../../pyj/src/components/Icons';
import { content, site } from '../../../pyj/src/lib/config';
import Hero from '../../../pyj/src/sections/Hero';
import Positioning from '../../../pyj/src/sections/Positioning';
import Highlights from '../../../pyj/src/sections/Highlights';
import Skills from '../../../pyj/src/sections/Skills';
import Projects from '../../../pyj/src/sections/Projects';
import Recommendations from '../../../pyj/src/sections/Recommendations';
import Credentials from '../../../pyj/src/sections/Credentials';
import { Contact, Process, Services } from '../consulting';
import headshot from '../assets/headshot.jpg';
import { credentials, hero, positioning, role, skills } from './content';
import '../../../pyj/src/styles/global.css';
import '../../../pyj/src/styles/layout.css';
import '../../../pyj/src/styles/sections.css';
import './style.css';

const consultingNavigation = [
  { label: 'Services', id: 'services' },
  { label: 'How it works', id: 'process' },
];
const contactLink = { label: "Let's connect", id: 'contact' };
const recommendationsLink = { label: 'Recommendations', id: 'recommendations' };
const workLink = { label: content.projects.heading, id: 'projects' };
const credentialsLink = { label: credentials.heading, id: 'credentials' };
const desktopNavigation = [
  { label: 'Metrics', id: 'highlights' },
  { label: 'Skills', id: 'skills' },
  workLink,
  recommendationsLink,
  credentialsLink,
  ...consultingNavigation,
];
const navigation = metricsHeading => [
  { label: 'Home', id: 'top' },
  { label: positioning.heading, id: 'positioning' },
  { label: metricsHeading, id: 'highlights' },
  { label: content.skills.heading, id: 'skills' },
  workLink,
  recommendationsLink,
  credentialsLink,
  ...consultingNavigation,
  contactLink,
];

function Header({ metricsHeading }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const header = useRef(null);
  const toggle = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    function closeOnOutsidePress(event) {
      if (!header.current?.contains(event.target)) setOpen(false);
    }

    function closeOnEscape(event) {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggle.current?.focus();
    }

    document.addEventListener('pointerdown', closeOnOutsidePress);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePress);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  return (
    <header ref={header} className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <span className="brand__mark" aria-hidden="true">{site.identity.initials}</span>
          <span className="brand__name">{site.identity.name}</span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          <ul className="site-nav__list">
            {desktopNavigation.map(({ label, id }) => (
              <li key={id}><a href={`#${id}`} onClick={() => setOpen(false)}>{label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="site-header__actions">
          <a href={`#${contactLink.id}`} className="btn site-header__cta" onClick={() => setOpen(false)}>{contactLink.label}</a>
          <button ref={toggle} className="site-header__burger v3-menu-toggle" type="button"
            aria-expanded={open} aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>
      <nav className="mobile-menu" id="site-menu" aria-label="Site menu" hidden={!open}>
        <ul className="mobile-menu__list">
          {navigation(metricsHeading).map(({ label, id }) => (
            <li key={id}>
              <a href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default function App({ highlights = content.highlights, heroContent = hero } = {}) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header metricsHeading={highlights.heading} />
      <main id="main">
        <Hero hero={heroContent} photoSrc={headshot} contactHref="#contact" />
        <Positioning positioning={positioning} />
        <div className="v3-featured">
          <Highlights highlights={highlights} />
          <Skills skills={skills} />
          <Projects />
          <Recommendations heading={recommendationsLink.label} />
          <Credentials credentials={credentials} />
        </div>
        <div className="v3-consulting">
          <Services />
          <Process />
          <Contact />
        </div>
      </main>
      <Footer targetRole={role} homeHref="#top" contactHref="#contact" />
      <MobileContactBar contactHref="#contact" />
    </>
  );
}

