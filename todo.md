# WeSee V2 Rebuild — Todo

## Global Design System
- [ ] Remove ALL color accents (#2563EB) — pure black/white/grey only
- [ ] Font: Inter only (weights 300,400,500,600,700) — remove Instrument Sans, DM Sans
- [ ] Typography: exact px sizes per spec (hero 96px, section 48px, etc.)
- [ ] Spacing: 120px section padding desktop, 64px mobile, 80px side padding desktop, 24px mobile
- [ ] Max-width: 1280px
- [ ] ZERO box-shadow, ZERO border-radius, ZERO gradients, ZERO colored backgrounds
- [ ] All images: sharp rectangles
- [ ] Footer: pure white background, not grey

## Header/Nav
- [ ] Remove "Book a Call" button from nav
- [ ] Logo: "WeSee." with period, bold
- [ ] Nav links: 14px, weight 400, hover opacity 0.5
- [ ] On scroll: border-bottom 1px #F0F0F0, backdrop blur
- [ ] Mobile: hamburger → full screen overlay
- [ ] "Filter Services +" button appears ONLY on /services page (left side of nav)

## Loading Screen
- [ ] Top left: "Loading" 11px uppercase #888888 + counter "(0)" to "(100)"
- [ ] Center: "We are builders." / "We are WeSee." — word-by-word fade in
- [ ] Counter: 0→100 over 1.8s
- [ ] Fade out at 100, sessionStorage flag

## Homepage
- [ ] Hero: 55% text left, 45% atmospheric photo right, NO CTA buttons, NO blue accent
- [ ] Hero text: "We are builders. We are WeSee." (not automators)
- [ ] Scroll indicator: "scroll" + animated line at bottom
- [ ] Section 01 Our Work: left text + right image mosaic (18-20 atmospheric images, masonry)
- [ ] Signal Definition Block between 01 and 02
- [ ] Section 02 Our Approach: left text + right stacked images, approach steps with border-top
- [ ] Section 03 Our Services: left text + right plain text list (NO icons), 9 categories
- [ ] Section 04 Our Offices: accordion cards with expand/collapse
- [ ] Section 05 Our Impact: GSAP animated counters (12+, 80+, 35+, 15K+)
- [ ] Section 06 Our Team: left text + right 2x2 image collage
- [ ] Section 07 Our Clients: dual-row marquee with SVG wordmark logos
- [ ] Section 08 CTA: dark background (#1A1A1A), centered, white text

## Services Page
- [ ] Filter panel slides from LEFT (360px wide)
- [ ] Service cards: image + title + category ONLY (no badges, no description, no "Learn more")
- [ ] 3-col grid, 2px gap
- [ ] Each service gets unique atmospheric Unsplash image
- [ ] Image hover: scale(1.04) with overflow hidden

## Service Detail Page
- [ ] Remove sidebar → horizontal metadata strip
- [ ] Full-width hero image with parallax
- [ ] Category as 11px uppercase label (no badge)
- [ ] Inline CTA block at bottom (dark bg)
- [ ] No status badges

## About Page
- [ ] Proper structure: Our Story, Our Values, Our Journey (7 milestones)
- [ ] Timeline with border-left dots
- [ ] Stats strip (same counters)

## Team Page
- [ ] Director cards with Unsplash portrait photos (NOT letter-initial boxes)
- [ ] Bio shown always, not hidden
- [ ] 2x2 collage photos at top

## Blog Page
- [ ] Featured article with large image
- [ ] Article cards with images
- [ ] No colored category badges

## Careers Page
- [ ] Accordion job listings (one open at a time)
- [ ] 4 positions per spec

## Contact Page
- [ ] Email-based primary, form secondary
- [ ] 4 contact type blocks (2x2)
- [ ] Office accordion cards
- [ ] Full-width atmospheric images

## Animations (GSAP)
- [ ] Scroll reveal on every section
- [ ] Image parallax on full-width images
- [ ] Stats counter animation
- [ ] Service card image hover zoom
- [ ] Section number stagger
- [ ] CTA link underline slide
- [ ] Lenis smooth scroll
