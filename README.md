# CHACMA BJJ Website Skeleton

Static GitHub Pages-ready website for `chacmabjj/bjj`.

## Deployment

The repository currently uses `main` as its default branch. This bundle is designed to be copied directly into the repository root so that `index.html` sits at the top level.

Expected root:

```text
/
├── index.html
├── styles.css
├── script.js
├── .nojekyll
├── robots.txt
├── site.webmanifest
└── assets/
    ├── icons/
    └── images/
```

For GitHub Pages, configure **Settings → Pages → Deploy from a branch → main → /(root)** if that is not already enabled.

## WhatsApp

The skeleton deliberately does **not** invent Saul's phone number. Open `script.js` and set:

```js
const WHATSAPP_NUMBER = '27XXXXXXXXX';
```

Use digits only, including the South African country code `27`. Once set, every `data-whatsapp` button automatically points to the same working WhatsApp conversation URL.

## Image privacy

The included training still derived from the uploaded video has the other participant's identifying facial area deliberately obscured. Replace it later with an approved client image or an AI-generated composite if preferred.

## Content state

This is a working skeleton, not final copy. The testimonial text and one Saul quote are explicitly marked as placeholders. Credentials should be final-verified before public launch, especially the exact BJJ degree/rank wording if it changes.

## Design baseline

- Brand: CHACMA
- Primary message: **Private Jiu-Jitsu. Built around you.**
- Visual system: dark forest/charcoal, ivory, Snapdragon-derived crimson red
- No brown accent
- Core positioning: private, flexible, discreet, technically credible, mobile, adaptable to different clients and needs


## Configured production integrations

- WhatsApp: +27 76 885 8313 (`27768858313` for wa.me links)
- Google Analytics / Google tag: `G-R0LVV5Y407`
- Google tag is inserted once, immediately after the opening `<head>` element in `index.html`.
- The first approved testimonial from David has replaced the original placeholder testimonials.
