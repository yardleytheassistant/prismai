# PrismAI — Brand & Website Specification

## 1. Brand Identity

**Company Name:** PrismAI
**Tagline:** "Unifying the Spectrum of Intelligent Solutions."
**Domain:** prismai.co (primary), prismai.com (backup)
**Business:** AI Adoption Consulting — helping enterprise companies move from AI hype to AI execution

## 2. Design Direction

### Aesthetic
Premium, futuristic-minimal — the kind of site that makes Fortune 500 execs nod and say "these people know what they're doing." Think deep space meets clean data visualization. Dark theme with refracted light/prism motifs throughout.

### Color Palette
- **Background:** `#050811` (deep space navy)
- **Surface:** `#0D1424` (elevated dark)
- **Primary/Accent:** `#7B5CFF` (electric violet — the "prism" core)
- **Secondary:** `#00D4FF` (cyan refraction)
- **Tertiary:** `#FF6B6B` (warm red edge of spectrum)
- **Text Primary:** `#FFFFFF`
- **Text Secondary:** `#8892B0`
- **Gradient:** Linear from violet → cyan across hero sections

### Typography
- **Headings:** Inter (700, 800) — authoritative, modern
- **Body:** Inter (400, 500) — clean readability
- **Mono/Accent:** JetBrains Mono — for stats, code snippets, tech elements

### Motion Philosophy
- **Scroll-driven reveals:** Sections fade + slide up on scroll (staggered)
- **Prism refraction effects:** Gradient borders that shift on hover/movement
- **Floating ambient elements:** Slow-drifting geometric shapes in hero
- **Micro-interactions:** Buttons glow + lift on hover, cards tilt subtly on mouse move
- **Counter animations:** Stats count up when scrolled into view
- **No jarring motion** — everything smooth, purposeful, premium

## 3. Page Structure — Single Landing Page

### Hero Section
- Full-viewport dark background with animated gradient mesh
- Floating geometric prism shapes (CSS/SVG, subtle parallax on mouse move)
- Large headline: "From AI Potential to AI Reality."
- Subheadline: "PrismAI helps enterprise teams cut through the noise — building the strategy, infrastructure, and culture to make AI actually work."
- Two CTAs: "Book a Strategy Call" (primary, glowing violet), "See Our Work" (secondary, ghost)
- Social proof ticker: "Trusted by teams at [logos of 5 fictional enterprise companies]"
- Scroll indicator (animated chevron)

### Services Section
- Section title: "What We Deliver"
- 3-column card grid, each card with:
  - Icon (SVG, gradient-filled)
  - Title
  - 2-sentence description
  - Subtle hover: lift + prism border glow
- Services:
  1. **AI Readiness Assessment** — Audit your data, processes, and culture to identify where AI will actually move the needle.
  2. **Transformation Roadmap** — A phased, practical blueprint from pilot to production — with milestones, owners, and KPIs.
  3. **Implementation Partner** — Hands-on guidance through vendor selection, integration, change management, and go-live.

### Stats Section
- Dark band with gradient border top/bottom
- 4 large animated counters:
  - "47" enterprises transformed
  - "$2.3B" in AI-driven value unlocked
  - "89%" average productivity gain
  - "6 months" avg. time to measurable ROI
- Subtext: Numbers that speak louder than promises.

### Process Section
- Section title: "How We Work"
- Horizontal timeline/stepper (desktop) / vertical (mobile)
- 4 steps with icons:
  1. **Discovery** — Deep-dive workshops to understand your business, data, and goals
  2. **Assessment** — Rigorous analysis of readiness, gaps, and highest-value AI opportunities
  3. **Roadmap** — Custom transformation plan with clear phases, timelines, and success metrics
  4. **Execution** — Embedded partnership through implementation, not just advice
- Each step: icon + title + 1-sentence description + connector line

### Testimonials Section
- Section title: "What Leaders Say"
- 3 testimonial cards in a row
- Each: quote, name, title, company, small avatar placeholder
- Carousel dots below (swipeable on mobile)
- Subtle parallax on mouse move

### Contact Section
- Split layout: left = copy/cta, right = form
- Left: "Ready to Stop Experimenting and Start Executing?" + 2-3 lines of copy + email/phone
- Right: Name, Company, Email, Message, Submit button
- Form has validation, loading state, success/error feedback
- Background: subtle grid pattern + prism glow

### Footer
- Logo + tagline
- 3 columns: Services, Company, Connect
- Copyright line
- Social links (LinkedIn, Twitter/X)

## 4. Technical Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + custom CSS for advanced effects
- **Animations:** Framer Motion
- **Forms:** React Hook Form (or native with JS validation)
- **Deployment:** Vercel (CI/CD from GitHub)
- **Domain:** Configured after Vercel deploy (prismai.co)

## 5. Interactivity Requirements

- **Mouse-follow gradient** on hero section
- **Scroll-triggered section reveals** (Intersection Observer)
- **Animated counters** (CountUp.js or Framer Motion)
- **Form validation** with error states and success confirmation
- **Smooth scroll** navigation
- **Mobile-responsive** at all breakpoints
- **Performance:** < 3s load, no layout shift, Lighthouse 90+

## 6. GitHub Repo

- Private repo: `yardleytheassistant/prismai`
- Chris granted access after build

## 7. Success Criteria

- [ ] Premium, impressive design that makes enterprise clients take notice
- [ ] All interactive elements work (no dead buttons, no broken forms)
- [ ] Fast load, smooth animations, no jank
- [ ] Live on Vercel with custom domain
- [ ] GitHub repo handed off to Chris
