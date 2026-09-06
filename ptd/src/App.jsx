import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileCta from './components/MobileCta'
import Home from './pages/Home'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { useTheme } from './lib/theme'

export default function App() {
  const themeProps = useTheme()

  // HashRouter is deliberate. GitHub Pages serves static files only, so a
  // BrowserRouter deep link like /contact would 404 on refresh or when shared.
  // With hash routing every URL resolves to index.html, which means the site
  // deploys to a user page, a project page or a custom domain with no changes.
  return (
    <HashRouter>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header themeProps={themeProps} />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MobileCta />
    </HashRouter>
  )
}
