# Anosh — Engineering Consulting Website

Responsive React + Vite consulting landing page, designed for GitHub Pages. No backend or server is needed for the website itself.

## Run locally

1. Install Node.js 20.19+ or 22.12+.
2. Run `npm install`.
3. Run `npm run dev` and open the URL shown.
4. Run `npm run build` to generate `dist/`.

## Publish to GitHub Pages (recommended: dedicated repository)

1. Create a public GitHub repository, e.g. `consulting`.
2. Push **the contents of this folder** to the repository.
3. In GitHub: Settings → Pages → Build and deployment → Source: **GitHub Actions**.
4. The included workflow builds and publishes automatically after each push to `main`.
5. Website address will be `https://anoshf.github.io/consulting/` if the repository is named `consulting` under the `anoshf` account.

Alternatively deploy `dist/` to Netlify, Vercel or another static host.

## IMPORTANT: Contact form setup

The form sends requests using FormSubmit (https://formsubmit.co/) to `anoshf@outlook.com`. **The first submission triggers an activation email to that inbox. You must click its activation link before the form can deliver future inquiries.** Check junk mail. FormSubmit is a third-party processor; review its privacy terms before publishing. Test a real submission and verify delivery after activation. A successful browser response alone does not prove inbox delivery.

There is no guaranteed server-side delivery, spam filtering, or CRM integration. For production-grade reliability, use a dedicated email provider/serverless API. The fallback email link remains available if submission fails.

## Contact actions

- Email: `mailto:anoshf@outlook.com`
- Text: `sms:2132827919`
- Call: `tel:+12132827919`

These invoke supported apps on the visitor's device. Desktop SMS requires a configured messaging app; some desktop environments will not support it. A website cannot force an OS-level choice between calling and texting, so both buttons are provided.

## Accuracy and customization

Google, Intuit, Medtronic, ADP, Ticketmaster and Disney/ABC refer to prior professional experience, **not clients, endorsements, or consulting testimonials**. No fabricated client outcomes, logos, certifications, or performance metrics are included. Before publishing, confirm the service descriptions, availability, and portfolio project claims reflect your actual experience.

Edit `src/main.jsx` for services, wording, email, phone, and portfolio links. Edit `src/style.css` for visual styles. Edit `index.html` for title and search description.

## Quality checks

- `npm run build` validates production bundling.
- Manually test the deployed form, email, SMS and phone links on actual devices.
- Check GitHub Pages URL, mobile navigation, and all six portfolio links.

## November 2026 content update

- Updated to 20+ years of engineering experience, as supplied by the site owner.
- Added Google and Intuit to the previous-employer experience section. Company names are not presented as endorsements or consulting clients.
- Added Node.js, Go (Golang), Ruby and C# to programming technologies.
- Expanded secure web development, identity/SSO, live reporting and multi-region high-availability messaging.
- Review all first-person claims before publishing; this update uses the owner-provided descriptions and does not independently verify employment or individual technologies.
