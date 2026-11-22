import { useState } from 'react';
import {
  ArrowUpRight,
  Bot,
  Cloud,
  Code2,
  Database,
  Gauge,
  Mail,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react';

const EMAIL = 'anoshf@outlook.com',
  PHONE = '2132827919';
const links = [
  ['Python engineering', 'https://anoshf.github.io/p/pyj/'],
  ['Data engineering', 'https://anoshf.github.io/p/dcr/'],
  ['Software engineering', 'https://anoshf.github.io/p/spx/'],
  ['Platform engineering', 'https://anoshf.github.io/p/dts/'],
  ['Architecture', 'https://anoshf.github.io/p/anj/'],
  ['Web development', 'https://anoshf.github.io/p/wnx/'],
];
const services = [
  {
    icon: Code2,
    title: 'Python & API development',
    desc: 'Automate manual workflows, connect services, repair integrations and ship maintainable backend functionality.',
    tags: ['Python', 'Node.js', 'Go (Golang)', 'Ruby', 'C#', 'REST / GraphQL'],
  },
  {
    icon: Code2,
    title: 'Secure web applications & identity',
    desc: 'Build responsive websites and enterprise web apps with secure authentication, SSO and modern identity integrations.',
    tags: [
      'PHP',
      'React',
      'TypeScript',
      'Angular',
      'HTML5',
      'SAML',
      'Okta',
      'OpenID Connect',
      'Microsoft Entra ID',
      'Google / Facebook login',
    ],
  },
  {
    icon: Database,
    title: 'SQL & data engineering',
    desc: 'Investigate slow queries, design reliable data pipelines and improve reporting accuracy and observability.',
    tags: ['SQL', 'ETL / ELT', 'Kafka', 'Live reporting'],
  },
  {
    icon: Cloud,
    title: 'AWS & cloud platforms',
    desc: 'Troubleshoot deployments, improve reliability and review cloud infrastructure for cost, security and performance.',
    tags: ['AWS', 'Docker', 'Terraform', 'Multi-region'],
  },
  {
    icon: Bot,
    title: 'Practical AI automation',
    desc: 'Evaluate AI-assisted workflows, integrate APIs and build human-reviewed automation around real business tasks.',
    tags: ['LLM integrations', 'Automation', 'Testing'],
  },
  {
    icon: Gauge,
    title: 'Performance troubleshooting',
    desc: 'Trace latency and production bottlenecks across applications, databases and distributed services.',
    tags: [
      'High-volume workloads',
      'Distributed processing',
      'Multi-region compute',
      'Reliability',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Architecture & technical reviews',
    desc: 'Get an experienced second opinion on scalability, technical debt, data models and delivery risks.',
    tags: ['Architecture', 'Security-minded', 'Roadmaps'],
  },
];

export function Services() {
  return (
    <section className="section container" id="services">
      <div className="section-label">01 / WHAT I CAN HELP WITH</div>
      <div className="section-head">
        <h2>
          20+ years of engineering expertise.
          <br />
          <span>From secure web apps to multi-region systems.</span>
        </h2>
        <p>
          Practical, scoped help for startups, growing businesses and
          engineering teams.
        </p>
      </div>
      <div className="service-grid">
        {services.map((s) => (
          <article className="service" key={s.title}>
            <div className="service-icon">
              <s.icon size={23} />
            </div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <div className="tags">
              {s.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Portfolio() {
  return (
    <section className="section container" id="work">
      <div className="section-label">03 / EXPLORE MY WORK</div>
      <div className="section-head">
        <h2>
          Relevant work.
          <br />
          <span>Different specialties.</span>
        </h2>
        <p>
          Explore my existing technical portfolios for more detail about my
          engineering background.
        </p>
      </div>
      <div className="portfolio-grid">
        {links.map(([name, url], i) => (
          <a
            className="portfolio"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            key={name}
          >
            <span className="port-num">0{i + 1}</span>
            <strong>{name}</strong>
            <ArrowUpRight size={22} />
          </a>
        ))}
      </div>
      <p className="footnote">
        Portfolio pages describe professional work and technical experience;
        they are not presented as independent client engagements.
      </p>
    </section>
  );
}

export function Process() {
  return (
    <section className="process-wrap" id="process">
      <div className="container section">
        <div className="section-label">04 / SIMPLE PROCESS</div>
        <div className="section-head">
          <h2>
            From problem to progress.
            <br />
            <span>Three clear steps.</span>
          </h2>
        </div>
        <div className="steps">
          <div>
            <b>01</b>
            <h3>Tell me what's stuck</h3>
            <p>
              Send a short description of the issue, goal, deadline and
              technical stack.
            </p>
          </div>
          <div>
            <b>02</b>
            <h3>Get a practical plan</h3>
            <p>
              We'll align on scope, approach, deliverables and pricing before
              work begins.
            </p>
          </div>
          <div>
            <b>03</b>
            <h3>Ship the solution</h3>
            <p>
              I investigate, implement and document the agreed work, with clear
              communication.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setStatus('');
    const form = event.currentTarget;
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      const result = await response.json();
      if (
        !response.ok ||
        result.success === false ||
        result.success === 'false'
      ) {
        throw new Error('Submission not accepted');
      }
      setStatus(
        'Thanks — your message was submitted. I’ll respond as soon as I can.',
      );
      form.reset();
    } catch {
      setStatus(
        'The form could not send your message. Please use the email link below instead.',
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="section container contact-section" id="contact">
      <div className="contact-copy">
        <div className="section-label">05 / GET IN TOUCH</div>
        <h2>
          Have a technical
          <br />
          <span>problem to solve?</span>
        </h2>
        <p>
          Tell me what you're working on. Whether it's a production issue, a new
          integration or a project that needs experienced hands, I'd be glad to
          hear about it.
        </p>
        <div className="contact-methods">
          <a href={`mailto:${EMAIL}`}>
            <span>
              <Mail size={20} />
            </span>
            <div>
              <small>EMAIL</small>
              <strong>{EMAIL}</strong>
            </div>
            <ArrowUpRight size={18} />
          </a>
          <a href={`sms:${PHONE}`}>
            <span>
              <MessageSquare size={20} />
            </span>
            <div>
              <small>TEXT MESSAGE</small>
              <strong>213.282.7919</strong>
            </div>
            <ArrowUpRight size={18} />
          </a>
          <a href={`tel:+1${PHONE}`}>
            <span>
              <Phone size={20} />
            </span>
            <div>
              <small>CALL DIRECTLY</small>
              <strong>213.282.7919</strong>
            </div>
            <ArrowUpRight size={18} />
          </a>
        </div>
        <p className="device-note">
          Text and call links open your device's supported messaging or calling
          app. On some computers, an app must be configured first.
        </p>
      </div>
      <form className="contact-form" onSubmit={submit}>
        <div className="form-top">
          <h3>Start a conversation</h3>
          <p>Share a few details and I'll get back to you.</p>
        </div>
        <input
          type="hidden"
          name="_subject"
          value="New consulting inquiry from website"
        />
        <input type="hidden" name="_captcha" value="true" />
        <label htmlFor="name">Your name *</label>
        <input
          id="name"
          name="name"
          placeholder="Jane Smith"
          required
          maxLength="100"
        />
        <label htmlFor="email">Email address *</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="jane@company.com"
          required
          maxLength="200"
        />
        <label htmlFor="company">
          Company / organization <span>(optional)</span>
        </label>
        <input
          id="company"
          name="company"
          placeholder="Your company or project"
          maxLength="150"
        />
        <label htmlFor="service">What do you need help with? *</label>
        <select id="service" name="service" required defaultValue="">
          <option value="" disabled>
            Select a service
          </option>
          {services.map((s) => (
            <option key={s.title} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Other / not sure">Other / not sure</option>
        </select>
        <label htmlFor="message">Tell me about your project *</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          placeholder="What's the problem, your timeline, and what would success look like?"
          required
          maxLength="5000"
        />
        <button className="btn primary send" type="submit" disabled={busy}>
          {busy ? 'Sending…' : 'Send project inquiry'} <Send size={17} />
        </button>
        <p className="form-note">
          No obligation. Please don't include passwords, credentials or
          confidential customer data.
        </p>
        {status && (
          <p role="status" className="status">
            {status}{' '}
            {status.startsWith('The form') && (
              <a href={`mailto:${EMAIL}`}>Email me directly</a>
            )}
          </p>
        )}
      </form>
    </section>
  );
}
