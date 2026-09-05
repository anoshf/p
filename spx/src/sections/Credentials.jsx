import Reveal from '../components/Reveal'
import { content, hasItems, clean } from '../lib/config'

export default function Credentials() {
  const c = content?.credentials || {}
  const certs = (hasItems(c.certifications) ? c.certifications : []).filter((x) => clean(x?.name))
  const edu = (hasItems(c.education) ? c.education : []).filter((x) => clean(x?.degree))
  if (!certs.length && !edu.length) return null

  return (
    <section className="section section--alt" id="credentials">
      <div className="container">
        <Reveal className="section__head">
          {clean(c.heading) && <h2 className="section__title">{clean(c.heading)}</h2>}
          {clean(c.subheading) && <p className="section__sub">{clean(c.subheading)}</p>}
        </Reveal>

        <div className="creds">
          {edu.length > 0 && (
            <Reveal className="card creds__col">
              <h3 className="creds__title">Education</h3>
              <ul className="creds__list">
                {edu.map((e, i) => (
                  <li className="cred" key={i}>
                    <p className="cred__primary">{clean(e.degree)}</p>
                    <p className="cred__secondary">
                      {clean(e.school)}
                      {clean(e.year) && <span className="cred__year"> · {clean(e.year)}</span>}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {certs.length > 0 && (
            <Reveal className="card creds__col" delay={70}>
              <h3 className="creds__title">Certifications &amp; focus areas</h3>
              <ul className="creds__list">
                {certs.map((x, i) => (
                  <li className="cred" key={i}>
                    <p className="cred__primary">{clean(x.name)}</p>
                    {(clean(x.issuer) || clean(x.year)) && (
                      <p className="cred__secondary">
                        {clean(x.issuer)}
                        {clean(x.year) && <span className="cred__year"> · {clean(x.year)}</span>}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
