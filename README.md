# CHACMA BJJ website

Production website for CHACMA BJJ — private Jiu-Jitsu and martial-arts coaching with Saul Abelson in Cape Town and the Winelands.

## Production

- Canonical domain: `https://www.chacmabjj.co.za/`
- GitHub Pages fallback: `https://chacmabjj.github.io/bjj/`
- Main enquiry route: `/request-session.html`

The site is static HTML, CSS and JavaScript. It uses no build step or front-end framework. Deployment is from the repository root through GitHub Pages.

## Structure

- `index.html` — homepage
- `request-session.html` — request-to-confirm session flow
- `styles.css` — shared site and responsive styles
- `session.css` — request-page styles
- `script.js` — navigation, testimonial dialogs and conversion event hooks
- `session.js` — local request-message preparation
- `assets/images/` — production imagery and brand assets
- `assets/icons/` — favicon and manifest icons
- `CNAME`, `robots.txt`, `sitemap.xml`, `site.webmanifest` — deployment and discovery configuration

## Deployment check

After replacing repository contents, confirm the custom domain remains configured in GitHub Pages, then verify `/`, `/request-session.html`, WhatsApp links and the responsive mobile navigation.
