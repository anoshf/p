# Anosh Fallah — AI Data Engineer

A single-page React site targeted at **AI Data Engineer** roles. No backend, no database, no
build-time secrets. Every word, colour and setting lives in three YAML files, so updating the
site never means touching React code.

Deploys to GitHub Pages with no configuration changes.

---

## Table of contents

1. [Quick start](#1-quick-start)
2. [What's in here](#2-whats-in-here)
3. [Editing the content](#3-editing-the-content) ← the file you'll use most
4. [Changing the theme](#4-changing-the-theme)
5. [Site settings](#5-site-settings)
6. [Setting up the contact form](#6-setting-up-the-contact-form-2-minutes)
7. [Your phone number and privacy](#7-your-phone-number-and-privacy)
8. [Deploying to GitHub Pages](#8-deploying-to-github-pages)
9. [Replacing the photo and resume](#9-replacing-the-photo-and-resume)
10. [ATS and SEO notes](#10-ats-and-seo-notes)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Quick start

You need [Node.js 18 or newer](https://nodejs.org). Check with `node --version`.

```bash
npm install     # once, after unzipping
npm run dev     # http://localhost:5173 — live reload as you edit
```

To produce the deployable files:

```bash
npm run build   # writes the site to dist/
npm run preview # serves dist/ so you can check the production build
```

That's the whole toolchain. There is nothing else to install or configure.

---

## 2. What's in here

```
anosh-ai-data-engineer/
├── src/
│   ├── config/
│   │   ├── content.yml     ← ALL the words on the site
│   │   ├── themes.yml      ← the 5 colour themes
│   │   └── site.yml        ← contact, SEO, navigation, behaviour
│   ├── components/         reusable UI (header, form, theme switcher …)
│   ├── sections/           one file per page section
│   ├── pages/              Home, Contact, 404
│   ├── styles/             CSS — colours come from themes.yml, not from here
│   ├── lib/                YAML loading + theme handling
│   ├── App.jsx
│   └── main.jsx
├── public/
│   ├── headshot.jpg        your photo
│   ├── favicon.svg         browser-tab icon
│   └── robots.txt
├── .github/workflows/
│   └── deploy.yml          builds and publishes on every push
├── index.html
├── vite.config.js
└── package.json
```

**You only ever need to edit the three files in `src/config/`.** Everything else is machinery.

---

## 3. Editing the content

Open `src/config/content.yml`. It is heavily commented and organised in page order.

### YAML rules — worth 30 seconds

| Rule | Why |
|---|---|
| Keep the keys (the words before `:`), change the values | The app looks up content by key |
| Indent with **two spaces**, never tabs | YAML rejects tabs outright |
| Quote any value containing `:` or `#`, or starting with a number | Otherwise YAML misreads it |
| `-` starts a list item | Lines must line up with their siblings |
| `>` starts a folded block for long text | Indent the following lines under it |

Deleting a list item removes it from the page; the layout re-flows on its own. Deleting a whole
top-level section (`projects:`, `credentials:` …) removes that section entirely.

### The sections, in page order

| Key | What it controls |
|---|---|
| `hero` | The first screen: badge, name, headline, 4 proof numbers, buttons, fact pills, scrolling tech strip |
| `positioning` | Three "why me for this role" cards |
| `highlights` | The quantified-outcome grid |
| `skills` | Grouped skill lists — **this section carries most of the keyword weight** |
| `experience` | The role timeline, with collapsible stack lists |
| `projects` | Case studies in problem → approach → outcome form |
| `recommendations` | The 15 LinkedIn recommendations |
| `credentials` | Education and focus areas |
| `contactPage` | Headline and bullets on the contact page |
| `closing` | The call-to-action band above the footer |

### Common edits

**Change a hero number:**

```yaml
proofPoints:
  - { value: "18+ yrs", label: "Production data engineering" }
```

Keep `value` under about 10 characters and `label` under about 28 — longer text wraps awkwardly
on phones.

**Add a skill** (put it in the group where a hiring manager would expect it):

```yaml
skills:
  groups:
    - name: "AI & LLM data engineering"
      primary: true          # gives this group the highlighted border
      items:
        - "Retrieval-Augmented Generation (RAG)"
        - "Your new skill here"
```

**Add a job:**

```yaml
experience:
  roles:
    - company: "Company Name"
      title: "Your Title"
      period: "Jan 2020 – Dec 2022"
      summary: >
        One or two sentences of context.
      bullets:
        - "Outcome first, then how you achieved it, with a number if you have one"
      stack: ["Python", "AWS", "Kafka"]
```

**Feature a different recommendation** — move it up the `items:` list and add `featured: true`.
Six show by default; the rest appear behind a "show more" button.

**Remove a section** — delete the whole top-level key, or empty its list:

```yaml
projects:
  heading: "Selected work"
  items: []      # section disappears
```

---

## 4. Changing the theme

`src/config/themes.yml` holds five light palettes:

| id | Name | Feel |
|---|---|---|
| `clean-white` | Clean White | Crisp, minimal — the default |
| `soft-gray` | Soft Gray | Light-grey page, white cards |
| `warm-cream` | Warm Cream | Warm and refined |
| `soft-blue` | Soft Blue | Bright, calm, trustworthy |
| `light-beige` | Light Beige | Premium, editorial |

**Change which theme loads first:**

```yaml
defaultTheme: soft-blue
```

**Hide the theme switcher** (locks the site to `defaultTheme`):

```yaml
showThemeSwitcher: false
```

**Recolour a theme** — change hex values under its `colors:` block. Nothing else needs editing;
every colour on the site reads from these tokens.

**Add a sixth theme** — copy any theme block, give it a new `id`, and it appears in the switcher
automatically.

### Contrast

All five palettes are contrast-checked: body text at least 7:1 against its background, muted text
at least 4.5:1, and every accent/contrast pair at least 4.5:1. If you change `accent`, also check
`accentContrast` (the text colour that sits on top of buttons) still reads clearly. Any online
contrast checker will tell you in seconds.

A visitor's theme choice is remembered in their own browser and never leaves their device.

---

## 5. Site settings

`src/config/site.yml` controls behaviour rather than words.

| Key | What it does |
|---|---|
| `identity` | Name, initials, target role, location, photo path |
| `contact.methods` | Which contact channels appear — see below |
| `contact.form` | Form endpoint and wording |
| `contact.sms` | Phone number, button labels, pre-filled text |
| `contact.scheduling` | Optional Calendly / Cal.com button |
| `resume` | Enable a "Download resume" button |
| `nav` | Header navigation items and order |
| `seo` | Title, description, keywords, canonical URL |
| `options` | Scroll animation, availability badge, sticky mobile bar |

### Choosing contact channels

`contact.methods` accepts any combination:

```yaml
contact:
  methods: [form, sms]   # message form AND text/call buttons (both)
  # methods: [form]      # message form only              (option 1)
  # methods: [sms]       # text and call buttons only      (option 2)
  # methods: []          # neither — the page shows a short notice
```

---

## 6. Setting up the contact form (2 minutes)

The form posts to a third-party endpoint that forwards messages to your inbox. **Your email
address is never written into this project and never appears in the page source.**

1. Create a free account at <https://formspree.io>
2. Create a new form and point it at whichever inbox you want messages delivered to
3. Formspree gives you an endpoint like `https://formspree.io/f/mabcdefg`
4. Paste **only the part after `/f/`** into `src/config/site.yml`:

```yaml
contact:
  form:
    provider: formspree
    endpointId: "mabcdefg"
```

5. Rebuild and redeploy

Formspree's free tier covers 50 submissions a month, which is plenty for a job search. Getform
works identically — set `provider: getform`. For anything else, set `provider: custom` and put
the full URL in `customEndpoint`.

**Before you connect it**, the form renders in a clearly-labelled "not connected yet" state rather
than silently swallowing messages. The text and call buttons keep working regardless.

The form includes a hidden honeypot field that catches most spam bots without a CAPTCHA.

---

## 7. Your phone number and privacy

Your number lives in `src/config/site.yml` under `contact.sms.number` and is handled carefully:

- **It is never rendered as visible text** — `display: ""` keeps it off screen
- **It is never placed in an `href`** — the buttons are `<button>` elements, not links
- **The `sms:` / `tel:` URL is assembled in JavaScript only when someone taps the button**

A scraper reading the served HTML finds no phone number to harvest, while a real visitor still
gets one-tap texting.

To show the number on screen anyway:

```yaml
contact:
  sms:
    display: "(323) 970-9658"
```

To turn off calling but keep texting:

```yaml
    enableCall: false
```

To remove the number entirely, set `methods: [form]` and clear `number: ""`.

**Also by design:** there is no LinkedIn link anywhere on the site, and no email address appears
in the source of any page.

---

## 8. Deploying to GitHub Pages

**This folder is one of four sites inside a single repository.** You don't deploy it on its
own — the workflow at the repository root builds all four and publishes them together.

```
YOUR-USERNAME.github.io/
├── .github/workflows/deploy.yml   ← builds all four, publishes once
├── anjquy/   AI Cloud & Software Architect  →  /anjquy/
├── ptstfc/   AI Platform Engineer           →  /ptstfc/
├── sjkqpy/   AI Python Developer            →  /sjkqpy/
├── dcjeor/   AI Data Engineer               →  /dcjeor/
└── root/index.html                          →  /
```

To publish a change you made in this folder:

```bash
git add .
git commit -m "Update dcjeor content"
git push
```

The workflow rebuilds all four sites and republishes. This site lands at:

```
https://YOUR-USERNAME.github.io/dcjeor/
```

Full deployment instructions, including first-time setup, are in the **README at the repository
root**. Building this folder locally (`npm run dev`) works exactly as described in section 1 and
does not require the other three.

### After the first deploy

Set the URL in `src/config/site.yml` so link previews and canonical tags work:

```yaml
seo:
  siteUrl: "https://YOUR-USERNAME.github.io/dcjeor"
```


---

## 9. Replacing the photo and resume

**Photo:** replace `public/headshot.jpg`. Use a square-ish image at least 600×600px. Keep the
filename, or update `identity.photo` in `site.yml`. The image is used in three places — the hero,
the mobile avatar, and link previews.

**Resume:** drop your PDF at `public/resume.pdf`, then in `site.yml`:

```yaml
resume:
  enabled: true
  file: "resume.pdf"
  label: "Download resume (PDF)"
```

A download button appears in the hero. Tailor the PDF to this role before you enable it — the
whole point of four separate sites is that each one matches its target job.

**Favicon:** replace `public/favicon.svg`, or edit the initials and colour inside it.

---

## 10. ATS and SEO notes

Worth understanding so you know what this does and doesn't do.

**What this site does:**

- Renders every keyword as real, visible text a recruiter can read
- Emits a JSON-LD `Person` schema with `knowsAbout` (your skills) and `alternateName`
  (job-title variants recruiters search for)
- Sets meta description, keywords, Open Graph and Twitter card tags
- Includes a `<noscript>` block mirroring the visible content, so crawlers that don't run
  JavaScript still read a complete and accurate summary
- Is fully readable when printed to PDF

**What it doesn't do:** applicant tracking systems parse the *resume file you upload*, not your
website. This site's job is to convert a recruiter who has already found you — from a search, a
LinkedIn message, or the link in your application. Keep the resume PDF keyword-aligned separately.

**Keyword editing** — `seo.keywords` in `site.yml` feeds both the meta tag and the JSON-LD
`knowsAbout` array. Add terms you see repeatedly in postings you're targeting. Only add skills you
actually have; a recruiter will ask about anything listed here, and the visible skills section
should always match.

---

## 11. Troubleshooting

**The site is blank after editing `content.yml`**
A YAML syntax error. Open the browser console (F12) — the app prints the exact parse error and
line. The usual causes: a tab character instead of spaces, misaligned indentation, or an unquoted
value containing a colon.

**`npm install` fails**
Check `node --version` is 18 or newer. If it still fails, delete `node_modules` and
`package-lock.json` and try again.

**Site works locally but is blank on GitHub Pages**
Almost always a Pages configuration issue rather than a build issue. Confirm **Settings → Pages →
Source** is set to **GitHub Actions**, and check the **Actions** tab for a failed run. This project
needs no base path change — if you added one, remove it.

**The contact form does nothing**
`endpointId` is still empty in `site.yml`. See section 6. The page tells you this on screen too.

**The text button does nothing on desktop**
Expected. `sms:` links need a messaging app; most desktops have none. On phones it opens the
messaging app with your number and a pre-filled message.

**Theme changes aren't showing**
Your browser remembered a previous choice. Pick the theme again from the switcher, or clear site
data for the domain.

**Sections look invisible in a screenshot tool**
Sections fade in on scroll. Automated tools that jump the page can outrun the effect. Set
`options.animateOnScroll: false` in `site.yml` to disable it. Printing is unaffected — the print
stylesheet always shows everything.

---

## Licence

Personal portfolio content. The code is yours to modify freely.
