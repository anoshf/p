import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" />
      <section className="section notfound">
        <div className="container notfound__inner">
          <p className="notfound__code">404</p>
          <h1 className="notfound__title">That page doesn't exist</h1>
          <p className="notfound__body">
            The link may be out of date. Everything lives on the home page.
          </p>
          <div className="notfound__actions">
            <Link to="/" className="btn btn--lg">
              Back to home
            </Link>
            <Link to="/contact" className="btn btn--lg btn--ghost">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
