import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
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
import './inquiry.css';

const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_320fibg';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_fnoa2ah';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '6Xr0XTpA3jjbIpFpJ';
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY?.trim();
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
  const [status, setStatus] = useState('idle');
  const [emailError, setEmailError] = useState(false);
  const [captchaError, setCaptchaError] = useState('');
  const sending = useRef(false);
  const confirmation = useRef(null);
  const captchaContainer = useRef(null);
  const captchaWidget = useRef(null);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;

    let active = true;
    const container = captchaContainer.current;
    const script = document.createElement('script');
    function showCaptchaError() {
      if (active) setCaptchaError('Verification is unavailable. Reload the page or email me directly.');
    }
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
    script.async = true;
    script.onerror = showCaptchaError;
    script.onload = () => {
      if (!window.grecaptcha?.ready) {
        showCaptchaError();
        return;
      }
      window.grecaptcha.ready(() => {
        if (!active) return;
        try {
          captchaWidget.current = window.grecaptcha.render(container, {
            sitekey: RECAPTCHA_SITE_KEY,
            type: 'image',
            size: 'compact',
            callback: () => setCaptchaError(''),
            'expired-callback': () => setCaptchaError('Verification expired. Please complete it again.'),
            'error-callback': showCaptchaError,
          });
        } catch {
          showCaptchaError();
        }
      });
    };
    document.head.append(script);
    return () => {
      active = false;
      script.remove();
      container.replaceChildren();
    };
  }, []);

  useEffect(() => {
    if (status === 'sent') confirmation.current?.focus({ preventScroll: true });
  }, [status]);

  async function submit(event) {
    event.preventDefault();
    if (sending.current) return;
    const captchaResponse = captchaWidget.current === null
      ? ''
      : window.grecaptcha.getResponse(captchaWidget.current);
    if (RECAPTCHA_SITE_KEY && !captchaResponse) {
      setCaptchaError(current => current || 'Please complete the CAPTCHA before sending.');
      return;
    }
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email')).trim();
    const details = [
      `Email: ${email}`,
      data.get('company') && `Company: ${data.get('company')}`,
      `Service: ${data.get('service')}`,
    ].filter(Boolean).join('\n');

    sending.current = true;
    setStatus('sending');
    try {
      const response = await fetch(EMAILJS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name: data.get('name'),
            reply_to: email,
            message: data.get('message'),
            details,
            title: 'Consulting project inquiry',
            ...(captchaResponse && { 'g-recaptcha-response': captchaResponse }),
          },
        }),
      });
      if (!response.ok) throw new Error('Submission not accepted');
      setStatus('sent');
    } catch {
      setStatus('error');
      if (captchaWidget.current !== null) window.grecaptcha.reset(captchaWidget.current);
    } finally {
      sending.current = false;
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
      {status === 'sent' ? (
        <div className="contact-form inquiry-success" role="status" tabIndex={-1} ref={confirmation}>
          <CheckCircle2 aria-hidden="true" size={30} />
          <span>email sent!</span>
        </div>
      ) : (
        <form className="contact-form" onSubmit={submit}>
          <div className="form-top">
            <h3>Start a conversation</h3>
            <p>Share a few details and I'll get back to you.</p>
          </div>
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
            autoComplete="email"
            pattern="[^@]+@[^@]+[.][^@.]+"
            placeholder="jane@company.com"
            required
            maxLength="200"
            aria-invalid={emailError || undefined}
            aria-describedby={emailError ? 'inquiry-email-error' : undefined}
            onInvalid={(event) => {
              event.preventDefault();
              setEmailError(true);
              event.currentTarget.focus();
            }}
            onChange={() => setEmailError(false)}
          />
          {emailError && (
            <p id="inquiry-email-error" className="inquiry-error" role="alert">
              please enter valid email address
            </p>
          )}
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
          {RECAPTCHA_SITE_KEY && (
            <div className="inquiry-captcha">
              <div ref={captchaContainer} />
              {captchaError && <p className="inquiry-error" role="alert">{captchaError}</p>}
            </div>
          )}
          <button className="btn primary send" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send project inquiry'} <Send size={17} />
          </button>
          <p className="form-note">
            No obligation. Please don't include passwords, credentials or
            confidential customer data.
          </p>
          {status === 'error' && (
            <p role="alert" className="inquiry-error">
              Your message could not be sent. <a href={`mailto:${EMAIL}`}>Email me directly</a>.
            </p>
          )}
        </form>
      )}
    </section>
  );
}
