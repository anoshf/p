# Anosh Fallah — role-targeted portfolio sites

Four separate portfolio sites in one repository, each tailored to a different job title, all
published together by a single GitHub Actions workflow.

| Folder | Role | Published at |
|---|---|---|
| `anjquy/` | AI Cloud & Software Architect | `https://USERNAME.github.io/anjquy/` |
| `ptstfc/` | AI Platform Engineer | `https://USERNAME.github.io/ptstfc/` |
| `sjkqpy/` | AI Python Developer | `https://USERNAME.github.io/sjkqpy/` |
| `dcjeor/` | AI Data Engineer | `https://USERNAME.github.io/dcjeor/` |
| `root/` | Neutral landing card | `https://USERNAME.github.io/` |

Replace `USERNAME` with your GitHub username throughout.

The folder names are deliberately opaque, so a link you send for one role gives away nothing
about the others. **Keep a note of which is which** — nothing in the URL will remind you:

```
anjquy  →  Architect
ptstfc  →  Platform
sjkqpy  →  Software / Python
dcjeor  →  Data
```

---

## First-time setup

### 1. Create the repository

On GitHub, create a **public** repository named exactly:

```
USERNAME.github.io
```

If your username is `john123`, the repository must be `john123.github.io`. Don't add a README,
.gitignore or licence — this project already has them.

### 2. Push this folder

Unzip, rename the unzipped folder to `USERNAME.github.io`, open a terminal inside it, and run:

```bash
git init
git add .
git commit -m "Add four role-targeted portfolio sites"
git branch -M main
git remote add origin https://github.com/USERNAME/USERNAME.github.io.git
git push -u origin main
```

### 3. Point Pages at Actions

In the repository: **Settings → Pages → Build and deployment → Source: `GitHub Actions`**.

This is the one setting that matters. Do **not** choose "Deploy from a branch" — these are React
apps that have to be built, and the branch option would publish the unbuilt source.

### 4. Wait for the first build

Open the **Actions** tab. The "Build and deploy role sites" run takes roughly two to three
minutes: it installs and builds all four sites, assembles them into one folder, and publishes.

When it's green, all five URLs above are live.

From then on, **every push to `main` rebuilds and republishes all four automatically.**

---

## What the workflow does

`.github/workflows/deploy.yml`, in one job:

```
for each of anjquy, ptstfc, sjkqpy, dcjeor:
    npm ci        (install from the committed lockfile)
    npm run build (Vite → <folder>/dist)
    verify dist/index.html exists, else fail the run
    copy dist → _site/<folder>/
copy root/ → _site/
publish _site as the Pages artifact
```

The `test -f` check means a broken build fails the run loudly instead of quietly publishing an
empty folder.

### Why the sub-paths just work

Each site is built with `base: './'` (relative asset paths) and uses hash-based routing. So a
site built once works at `/anjquy/`, at the domain root, or at a custom domain, with no rebuild
and no base-path setting. Deep links like `/dcjeor/#/contact` never 404, because every URL
resolves to that folder's `index.html`.

This is also why **renaming a folder needs no code change** — rename it, update the four places
listed under "Renaming a folder" below, and push.

---

## Repository layout

```
USERNAME.github.io/
│
├── .github/workflows/
│   └── deploy.yml          builds all four, publishes once
│
├── root/                   the landing page at the domain root
│   ├── index.html          plain HTML — no build step
│   ├── headshot.jpg
│   └── favicon.svg
│
├── anjquy/                 AI Cloud & Software Architect
│   ├── src/config/         ← the only files you'll normally edit
│   │   ├── content.yml         all the words
│   │   ├── themes.yml          the 5 colour palettes
│   │   └── site.yml            contact, SEO, navigation
│   ├── src/                React app (identical across all four)
│   ├── public/             headshot, favicon, robots.txt
│   ├── package.json
│   ├── package-lock.json   committed — npm ci needs it
│   └── README.md           full guide for this site
│
├── ptstfc/                 AI Platform Engineer   (same structure)
├── sjkqpy/                 AI Python Developer    (same structure)
├── dcjeor/                 AI Data Engineer       (same structure)
│
├── .gitignore
└── README.md               this file
```

Each role folder has its **own detailed README** covering content editing, themes, contact
options, ATS notes and troubleshooting. Start there when you want to change what a site says.

---

## Working on a site locally

You need [Node.js 18 or newer](https://nodejs.org).

```bash
cd dcjeor          # or anjquy, ptstfc, sjkqpy
npm install
npm run dev        # http://localhost:5173, live reload
```

Each folder is independent — you don't need the other three installed.

To check a production build before pushing:

```bash
npm run build
npm run preview
```

---

## Current configuration

Applied identically across all four sites:

- **Theme:** locked to **Light Beige**. `showThemeSwitcher: false` in `themes.yml`, so the
  switcher is hidden and every visitor sees the same palette. Any theme a visitor stored on an
  earlier visit is ignored while the switcher is off.
- **Phone:** `+1 619 354 0646`, in `src/config/site.yml` under `contact.sms.number`. It is never
  rendered as visible text, never placed in an `href`, and never appears in `index.html` — the
  `sms:` / `tel:` URL is assembled in JavaScript at the moment someone taps the button. The root
  landing page does the same thing with its own inline copy of the number.
- **Contact channels:** `contact.methods: [form, sms]` — message form plus text/call buttons.
  Change to `[form]`, `[sms]` or `[]` per site.
- **No email address** appears anywhere in any page source.
- **No LinkedIn link** anywhere.

### To change the theme

Edit `themes.yml` in **each** of the four folders:

```yaml
defaultTheme: soft-blue        # clean-white | soft-gray | warm-cream | soft-blue | light-beige
showThemeSwitcher: true        # true puts the switcher back in the header
```

### To change the phone number

Two places: `contact.sms.number` in each of the four `site.yml` files, and the `parts` array in
the script at the bottom of `root/index.html`.

### Renaming a folder

Four places, all plain text — no code changes:

1. Rename the directory itself
2. `.github/workflows/deploy.yml` — the `for folder in …` line (and the comment header)
3. That site's `src/config/site.yml` — `seo.siteUrl`, once you've set it
4. This README, so you don't lose track of which slug is which role

---

## Before you share the links

Three things are worth doing first.

**1. Connect the contact form** (about two minutes, one time). Create a free form at
<https://formspree.io>, point it at your inbox, then paste the id into each `site.yml`:

```yaml
contact:
  form:
    endpointId: "mabcdefg"
```

Until you do, the form shows a "not connected yet" notice on screen and the text/call buttons
carry the load. You can use the same Formspree form for all four, or four separate ones if you
want to know which site a message came from — with opaque folder names, four separate forms is
the easier way to tell.

**2. Set the site URL** in each `site.yml` so link previews and canonical tags resolve:

```yaml
seo:
  siteUrl: "https://USERNAME.github.io/dcjeor"      # matching folder per site
```

**3. Optionally add a resume PDF.** Drop a role-tailored PDF at `<folder>/public/resume.pdf` and
set `resume.enabled: true` in that site's `site.yml`.

---

## About the root landing page

`root/index.html` is what someone sees if they trim a URL back to the domain root. It is a plain
HTML file with no build step.

It deliberately **does not link to the four role sites**. Each site is tailored to one job, and a
recruiter who arrived for one role shouldn't be shown that three other versions exist — that
reads as scattered rather than focused. With opaque folder names the four are effectively
unlisted: they aren't linked from anywhere, so they're reachable only by the exact URL you send.

To change it, edit the file. To remove it, delete the "Add the root landing page and its assets"
step from the workflow; the four role sites are unaffected either way.

---

## Troubleshooting

**The Actions run fails at `npm ci`**
A `package-lock.json` is missing or out of sync with its `package.json`. Run `npm install` in
that folder and commit the updated lockfile.

**Pages published, but the URLs 404**
Check **Settings → Pages → Source** is `GitHub Actions`, not "Deploy from a branch". Also confirm
the repository is named exactly `USERNAME.github.io` and is public. Then check the folder name in
the URL matches the directory exactly — these slugs are easy to mistype.

**A site loads but is unstyled, or the photo is missing**
Something replaced the relative asset paths. Confirm `base: './'` is still in that folder's
`vite.config.js`.

**One site is blank after a content edit**
A YAML syntax error in `content.yml`. Open the browser console (F12) — the app prints the exact
parse error and line number. Usually a tab instead of spaces, misaligned indentation, or an
unquoted value containing a colon.

**The changes didn't appear**
Check the Actions tab for a failed or still-running deploy, then hard-refresh (Cmd/Ctrl + Shift +
R). GitHub Pages also caches for a few minutes.

**The text button does nothing on a desktop browser**
Expected — `sms:` needs a messaging app, and most desktops have none. It works on phones.
