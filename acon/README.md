# Anosh Fallah | Engineering Consulting

[Live consulting site](https://anoshf.github.io/p/consulting/)

A React 19 and Vite 7 site for independent software, cloud, and AI engineering consulting. GitHub Pages serves the static build, and EmailJS handles project inquiries.

## Run locally

Use Node.js 26 to match the GitHub Actions build. From the repository root:

```bash
npm ci --prefix acon
npm run dev --prefix acon
```

Open [v4 on localhost](http://localhost:5173/v4/), or append `/v4/` to the URL Vite prints if it uses a different port. Keep `acon/` in the repository checkout because v3 and v4 import shared components and styles from `pyj/src/`.

Build and preview the production output:

```bash
npm run build --prefix acon
npm run preview --prefix acon
```

Open `/v4/` on the preview server. The local root URL opens the legacy entry.

## Versions

| Version | What changed |
| --- | --- |
| [v1](v1/index.html) and [v2](v2/index.html) | Legacy routes that share the original consulting entry in `src/main.jsx`. |
| [v3](v3/index.html) | Updated consulting layout, expanded engineering expertise, desktop section links in page order, and a touch-friendly dropdown. |
| [v4](v4/index.html) | Adds 12 attributed modernization benchmarks covering latency, throughput, deployments, scaling and rollback, costs, availability, incident recovery, defects, and stream processing. Each card links to its publication. |

## Project inquiries

**Start a conversation** sends through EmailJS. The form checks the email address format and replaces itself with an animated **email sent!** confirmation when EmailJS accepts the request. Check the recipient inbox separately when verifying delivery.

The consulting form has built-in EmailJS defaults. Override them locally in `acon/.env.local` or in GitHub Actions using `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY`. Vite includes these values in the browser bundle.

To enable reCAPTCHA v2, set the public site key as `VITE_RECAPTCHA_SITE_KEY` in `acon/.env.local` and as a GitHub Actions repository variable for deployed builds. Enable reCAPTCHA v2 on the matching EmailJS template and enter the secret key directly in EmailJS. The CAPTCHA appears when the site key is configured. [EmailJS reCAPTCHA setup](https://www.emailjs.com/docs/user-guide/adding-captcha-verification/)

## Edit the site

- [src/v4/benchmarks.js](src/v4/benchmarks.js) contains v4 metrics and source links.
- [src/v3/content.js](src/v3/content.js) contains the shared consulting hero, positioning, skills, and credentials. The [v4 entry](src/v4/main.jsx) controls which hero proof points it displays.
- [src/v3/App.jsx](src/v3/App.jsx) contains the shared layout and navigation for v3 and v4.
- [src/consulting.jsx](src/consulting.jsx) contains services, process, contact links, and the inquiry form.
- [v4/index.html](v4/index.html) contains the v4 page title and description.

## Publish to GitHub Pages

The [repository workflow](../.github/workflows/deploy.yml) builds the consulting site alongside the role sites on pushes to `main` and on manual runs. It publishes the highest numbered consulting build at [the live consulting URL](https://anoshf.github.io/p/consulting/) and keeps the numbered routes available. GitHub Pages uses **GitHub Actions** as its deployment source.
