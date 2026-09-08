# CHACMA BJJ website

Static GitHub Pages build for `chacmabjj/bjj`.

## Current structural revision

This revision specifically corrects the live page against the approved visual mock-up:

- much wider fluid desktop canvas (`max-width: 1760px`) instead of the previous narrow 1200px shell
- desktop hero restored to a wide left-copy / right-image composition
- hero type scaled down so the main proposition stays compact instead of breaking into many lines
- compact six-item credential strip
- `Why private?` restored to a landscape block plus four benefits in one horizontal row on desktop
- six compact training cards in one row on desktop
- three-column `Meet Saul` band retained at normal desktop widths
- compact horizontal locations band
- homepage testimonial compressed to a short featured quote with the full approved testimonial available via disclosure
- compact WhatsApp CTA/footer
- responsive breakpoints moved lower so ordinary desktop/tablet widths do not prematurely collapse into a narrow/mobile layout
- red/crimson accents retained throughout

## Production values already configured

- WhatsApp: `+27 76 885 8313`
- Google tag: `G-R0LVV5Y407`
- Google tag appears exactly once, immediately after `<head>`
- relative asset paths are GitHub Pages-safe when deployed from repository root

## Image status

Hero/about imagery is intentionally temporary while the final Saul image set is being prepared. The structural layout is the priority in this revision.

## Deployment

Upload the contents of this folder to the root of the `main` branch. GitHub Pages should be configured to deploy from `main` / root.
