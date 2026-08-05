# Hannah's Hands — Website Build & Operations Guide

Everything about how this website is built, which services it connects to, how the
pages are laid out, and how to update it. Written for both the owner (non-technical)
and any future developer.

- **Live site:** https://hannahshands.netlify.app
- **Edit the site (CMS):** https://hannahshands.netlify.app/keystatic
- **Code repository:** https://github.com/HannahsHands/hannahshands-web (public)
- **Founder / editor:** Olajumoke H. Osadola

---

## 1. What this is (the short version)

A fast, static marketing website with a built-in content editor. You (the owner)
edit events, testimonials, services and settings through a simple admin screen; every
save automatically rebuilds and publishes the live site a minute or two later. No code
is needed for day-to-day updates.

**Technology used:**

| Layer | Technology | Why |
|-------|-----------|-----|
| Website framework | [Astro](https://astro.build) 7 | Fast, static, great for content sites |
| Content editor (CMS) | [Keystatic](https://keystatic.com) + Keystatic Cloud | Edit the live site with a friendly UI |
| Code + content storage | GitHub | Single source of truth |
| Hosting & builds | Netlify | Auto-publishes on every change |
| Contact form | Netlify Forms | No server needed |
| Booking | Calendly (embedded) | Discovery-call scheduling |
| Analytics | Cloudflare Web Analytics | Privacy-friendly, optional |
| Fonts | Playfair Display + Poppins (self-hosted) | On-brand, fast, no external calls |

---

## 2. Connected services — what each does, and how/when to connect

### GitHub — the code + content home
- **What it does:** stores all the website code *and* your content (events, testimonials,
  etc.). Every edit — whether by a developer or by you in the CMS — becomes a saved change
  ("commit") here.
- **Repo:** `HannahsHands/hannahshands-web`.
- **When connected:** at launch. Netlify and Keystatic Cloud both link to this repo.
- **⚠️ Must stay PUBLIC.** Netlify's free plan allows only one contributor on *private*
  repos, and this project has two (the developer + the AI co-author), which makes builds
  fail with *"unrecognized Git contributor."* Keeping the repo public avoids this. Do not
  switch it back to private unless you upgrade Netlify.

### Netlify — hosting and builds
- **What it does:** watches the GitHub repo, rebuilds the site on every change, and serves
  it to the world. Also handles the **contact form**.
- **When connected:** at launch, via *Add new site → Import an existing project → GitHub →
  pick `hannahshands-web`*. Build settings are read automatically from `netlify.toml`.
- **Build settings** (already configured in `netlify.toml`): build command `npm run build`,
  publish directory `dist`, Node version `22`.
- **To do (recommended): turn on form notifications.** Netlify → your site → **Forms** →
  `contact` → **Settings & notifications** → add an **email notification** so enquiries land
  in your inbox. Without this, submissions are only visible in the Netlify dashboard.
- **Optional env variable:** `PUBLIC_CF_BEACON_TOKEN` (see Analytics below). Set it under
  Site configuration → Environment variables.

### Keystatic + Keystatic Cloud — the content editor
- **What it does:** the `/keystatic` screen where you edit content. **Keystatic Cloud**
  handles the GitHub login so there are no passwords or secret keys to manage.
- **When connected:** at launch. A project was created at [keystatic.cloud](https://keystatic.cloud)
  (team/project = `hannahs-hands/hannahshands-web`) and linked to the GitHub repo, with the
  site URL `https://hannahshands.netlify.app` added as an allowed login URL.
- **How login works:** visit `/keystatic` → *Log in with GitHub* → authorise → you're in.
- **Config note (for developers):** in `keystatic.config.ts`, production uses
  `storage: { kind: 'cloud' }` + `cloud: { project: 'hannahs-hands/hannahshands-web' }`.
  **Do not** change this to `storage: { kind: 'github' }` alongside `cloud` — that combo
  falls back to self-hosted GitHub auth and breaks login with a 500 error. Dev uses
  `storage: { kind: 'local' }`.
- **If you add a custom domain later:** add that new URL in the Keystatic Cloud project's
  *Project URLs* so login still works from it.

### Calendly — booking
- **What it does:** the "Book a Consultation" calendar embedded on the Contact page.
- **When connected:** already live. The booking link is stored in the CMS (Site settings →
  *Calendly booking URL*): `https://calendly.com/olajumokeh-osadola-hannahshandseventsco/discovery-consultation`.
- **To change it:** edit *Calendly booking URL* in the CMS. The embed only appears when a
  URL is set. No code needed.

### Cloudflare Web Analytics — visitor stats (optional, not yet on)
- **What it does:** privacy-friendly visitor analytics. Off until a token is provided.
- **How to turn on:** create a free site in Cloudflare → Web Analytics → copy the token →
  in Netlify, set env variable `PUBLIC_CF_BEACON_TOKEN` to that token → redeploy. Nothing
  loads for visitors until this is set.

### Custom domain (future)
- **When ready:** register the domain (e.g. `hannahshands.co.uk`), then in Netlify →
  Domain management → add the domain and follow the DNS instructions. After it's live,
  also add the new URL to the Keystatic Cloud *Project URLs*. Optionally update `site:` in
  `astro.config.mjs` to the new domain for perfect canonical/SEO links.

---

## 3. Website layout (page by page)

Every page shares the same **header** (logo + nav: About, Services, Portfolio,
Testimonials, Contact, and a gold *Book a Consultation* button) and **footer** (logo,
links, social handles, email). Brand look: deep forest green + cream + gold, elegant
serif headings (Playfair Display), clean body text (Poppins).

| Page | URL | What's on it | Content source |
|------|-----|--------------|----------------|
| **Home** | `/` | Hero, stat band, About teaser, Services, Portfolio grid, Testimonials, call-to-action, contact form | CMS (events, testimonials, services, settings) |
| **About** | `/about` | Story, Vision & Mission, six Values | Mostly fixed copy + logo |
| **Services** | `/services` | All services as cards | CMS (services) |
| **Portfolio** | `/portfolio` | Filterable grid of all events (by category) | CMS (events) |
| **Case study** | `/portfolio/<event>` | One page per event: cover, details, summary/story | CMS (events) |
| **Contact** | `/contact` | Enquiry form + details + Calendly booking embed | CMS (settings) + Netlify Forms + Calendly |
| **CMS** | `/keystatic` | The content editor (login required) | — |

The homepage's Portfolio section shows events marked **"Feature on homepage."** The full
list lives on `/portfolio`. Testimonials marked **"Feature on homepage"** show on the home
page; all can be managed in the CMS.

---

## 4. How to update the website (no code) — the everyday guide

1. Go to **https://hannahshands.netlify.app/keystatic** and click **Log in with GitHub**.
2. You'll see four sections:
   - **Events** — your portfolio. Add a new event, set its **category**, **year**,
     **location**, upload a **cover image**, write a **summary**, and tick **Feature on
     homepage** if you want it on the front page.
   - **Testimonials** — client quotes. Add the **author**, their **event/role**, the
     **quote**, and whether to feature it.
   - **Services** — the services you offer (number, title, description).
   - **Site settings** — your **tagline**, **email**, **Instagram/Facebook** handles,
     **Calendly URL**, and the **hero stat blocks** (e.g. "8+ Years").
3. Make your change and click **Save**.
4. That's it. Netlify rebuilds automatically; your change is live in ~1–2 minutes.

**Adding event photos:** open the event → upload a **Cover image** (landscape shots look
best). Keystatic stores it and updates the page for you.

**Tip:** the site is only as good as its photos — high-resolution, well-lit event shots
make the biggest difference.

---

## 5. How the code and build work (for a developer)

### Repo structure (`hannahshands-web/`)
```
astro.config.mjs      Astro + integrations (react, keystatic, sitemap, netlify)
keystatic.config.ts   CMS content model + storage (local in dev, cloud in prod)
netlify.toml          Build command / publish dir / Node version
src/
  layouts/Layout.astro      HTML shell, fonts, SEO/OG meta, analytics hook
  components/                Header, Footer, EventCard, ServiceCard,
                             TestimonialCard, PageHero, CtaBand, ContactSection
  pages/                     index, about, services, contact,
                             portfolio/index, portfolio/[slug], keystatic/[...]
  styles/global.css          Brand design tokens (colours, type, buttons)
  lib/reader.ts              Reads CMS content at build time
  content/                   The content itself (edited via the CMS)
    events/*.yaml            one file per event
    testimonials/*.yaml
    services/*.yaml
    settings.yaml            site-wide settings singleton
public/
  logo.png, og-image.png, images/, deck/  Static assets
```

### Content model (Keystatic collections)
- **events**: title, category (enum), year, location, client, coverImage, summary, story,
  featured, order
- **testimonials**: author, context, quote, featured, order
- **services**: title, number, description, order
- **settings** (singleton): tagline, email, instagram, facebook, phone, calendlyUrl, stats[]

Pages read this content at build time via `src/lib/reader.ts`
(`@keystatic/core/reader`), so the published pages are fully static and fast.

### Build & deploy pipeline
```
Edit (CMS or code) ──▶ commit to GitHub ──▶ Netlify builds `npm run build`
                                              ──▶ static pages + `contact` form
                                              ──▶ published to hannahshands.netlify.app
```
The only non-static route is `/keystatic` (the editor), which runs as a Netlify function.

### Local development
```bash
cd hannahshands-web
npm install
npm run dev        # http://localhost:4321  (CMS at /keystatic uses local files)
npm run build      # production build into dist/
```

---

## 6. Gotchas & troubleshooting

- **Keep the GitHub repo public.** Private + Netlify free plan = builds fail with
  *"unrecognized Git contributor"* (two contributors on the commits).
- **Keystatic storage must be `cloud` in production** (not `github` + `cloud`). The wrong
  combo makes `/keystatic` login return a 500 / "download a file" behaviour.
- **Old system git (2.10.1)** on the build machine fails HTTPS pushes with
  `RPC failed; HTTP 400 / curl 56`. Fix (already applied to the repo):
  `git config http.postBuffer 524288000`.
- **Contact form (Netlify Forms) needs two things** with our Astro SSR adapter, or POSTs
  404: (1) **Form detection** must be **enabled** in Netlify (Site configuration → Forms —
  off by default on newer sites), and (2) the static `public/__forms.html` file registers
  the `contact` form and its fields. Both are in place. After that, set the **email
  notification** (Netlify → Forms → contact) or you won't be emailed enquiries. The form
  also has a spam honeypot and an email-fallback link if a submission ever fails.
- **Email address:** the deck listed `hannah'shands@gmail.com`, which is not a valid Gmail
  (apostrophes aren't allowed). The site currently uses
  `olajumokeh.osadola@hannahshandseventco.com` — confirm that inbox receives mail, or
  change it in the CMS (Site settings → email).
- **Pushes** currently authenticate as the collaborator account `conceptson84-svg`.

---

## 7. Remaining / optional tasks

- [ ] Netlify **Forms → email notification** (so enquiries reach the inbox).
- [ ] Confirm the **contact email** actually receives mail.
- [ ] **Custom domain** (register + connect in Netlify + add to Keystatic Cloud URLs).
- [ ] **Analytics** token (`PUBLIC_CF_BEACON_TOKEN`) if you want visitor stats.
- [ ] Photos for **Kingdom Leaders Camp** and **Peterborough Alive** (still placeholders).
- [ ] Decide **VLC vs "Visioning Retreat London 2026"** (same event or a new one?) and pick
      a stronger VLC cover.
- [ ] Optional: **photo galleries** on case-study pages (extra shots already gathered).

---

## 8. Quick reference

| Item | Value |
|------|-------|
| Live site | https://hannahshands.netlify.app |
| CMS | https://hannahshands.netlify.app/keystatic |
| GitHub repo | https://github.com/HannahsHands/hannahshands-web (public) |
| Keystatic Cloud project | `hannahs-hands/hannahshands-web` |
| Calendly | https://calendly.com/olajumokeh-osadola-hannahshandseventsco/discovery-consultation |
| Contact email (current) | olajumokeh.osadola@hannahshandseventco.com |
| Netlify form name | `contact` |
| Analytics env var | `PUBLIC_CF_BEACON_TOKEN` (unset = off) |
| Local project path | `Hannahs-Hands/HH-Web` |
| Planning docs | `Hannahs-Hands/CEO-PLAN.md`, `Hannahs-Hands/ENG-PLAN.md` |

---

*This site was designed and built end to end: strategy → design → CMS-driven build →
deploy. For day-to-day changes you never need to touch code — just log into `/keystatic`.*
