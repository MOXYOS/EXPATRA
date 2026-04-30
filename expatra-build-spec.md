# Expatra — Full Website Build Specification
> For: Antigravity Development Team  
> Client: Expatra  
> Reference Site: https://expatgroup.co  
> Version: 1.0 | May 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Design System & Brand](#3-design-system--brand)
4. [Animation System (Framer Motion)](#4-animation-system-framer-motion)
5. [Site Architecture & All Pages](#5-site-architecture--all-pages)
6. [Navigation — Mega Menu Structure](#6-navigation--mega-menu-structure)
7. [Homepage Sections (Detailed)](#7-homepage-sections-detailed)
8. [Inner Pages (Detailed)](#8-inner-pages-detailed)
9. [New Features](#9-new-features)
10. [Database Schema (Supabase)](#10-database-schema-supabase)
11. [Authentication](#11-authentication)
12. [Payments (Stripe)](#12-payments-stripe)
13. [Internationalisation — Language Switcher](#13-internationalisation--language-switcher)
14. [SEO & Performance](#14-seo--performance)
15. [Folder Structure](#15-folder-structure)
16. [Environment Variables](#16-environment-variables)
17. [Deployment (Vercel)](#17-deployment-vercel)
18. [Page-by-Page Checklist](#18-page-by-page-checklist)

---

## 1. Project Overview

**Expatra** is a full-service expat advisory platform targeting foreigners who want to live, work, invest, retire, or travel in Colombia. It is a spiritual clone of expatgroup.co, rebuilt from scratch with a unique Expatra brand identity, modern animation-heavy UI, and an extended feature set including:

- **Colombia Tour** booking module
- **Lost Passport** emergency assistance service
- **Language Switcher** (EN / ES)
- Stripe-powered payments for services
- Supabase-backed auth, database, and file storage
- Hosted on Vercel with Next.js App Router

The aesthetic should feel premium, vibrant, and Latin-inspired — not a pixel copy of expatgroup.co but a spiritual upgrade with better animations, colour depth, and interaction design.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 14+ (App Router)** |
| Styling | **Tailwind CSS v3** |
| UI Components | **ShadCN/UI + Radix UI primitives** |
| Animations | **Framer Motion v11** |
| Backend / DB | **Supabase** (PostgreSQL + Auth + Storage) |
| Payments | **Stripe** (Checkout Sessions + Webhooks) |
| Hosting | **Vercel** |
| Email | **Resend** (transactional emails) |
| Forms | **React Hook Form + Zod** |
| i18n | **next-intl** |
| Icons | **Lucide React + React Icons** |
| Maps | **React Leaflet or Google Maps Embed** |
| CMS (Blog) | **Supabase DB as headless CMS** OR **Contentlayer MDX** |
| Analytics | **Vercel Analytics + PostHog** |

---

## 3. Design System & Brand

### 3.1 Colour Palette

```
--color-primary:       #1D71B8   /* Deep Blue — primary CTAs, headings */
--color-primary-dark:  #012F6B   /* Navy — dark sections, footer */
--color-accent:        #009FE3   /* Sky Blue — highlights, badges */
--color-gold:          #F5A623   /* Gold — star ratings, premium badges */
--color-surface:       #F8FAFC   /* Off-white background */
--color-dark:          #2E2D2C   /* Near-black text */
--color-muted:         #64748B   /* Muted text */
--color-success:       #22C55E
--color-danger:        #EF4444
--color-colombia-yellow: #FCD116
--color-colombia-blue:   #003087
--color-colombia-red:    #CE1126
```

### 3.2 Typography

- **Display / Hero:** `Playfair Display` (Google Fonts) — elegant serif for headlines
- **Body:** `Inter` — clean sans-serif for body copy
- **Mono / Label:** `JetBrains Mono` — for price tags, codes

```css
font-display: Playfair Display, serif     /* H1, H2 */
font-body:    Inter, sans-serif           /* p, nav, buttons */
```

### 3.3 Spacing & Radius

- Border radius: `rounded-xl` (12px) for cards, `rounded-2xl` (16px) for modals
- Section padding: `py-20 lg:py-32`
- Container max-width: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

### 3.4 Component Library Notes (ShadCN)

Install and use: `Button`, `Card`, `Dialog`, `Sheet`, `Tabs`, `Accordion`, `Badge`, `Input`, `Select`, `Tooltip`, `NavigationMenu`, `DropdownMenu`, `Avatar`, `Skeleton`, `Progress`, `Carousel`.

Customise all ShadCN tokens to match the Expatra colour palette in `globals.css`.

---

## 4. Animation System (Framer Motion)

All animations must feel fluid and intentional. Use `AnimatePresence` for mount/unmount transitions everywhere.

### 4.1 Global Animation Variants (create `/lib/animations.ts`)

```typescript
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut" } }
}

export const counterVariant = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200 } }
}
```

### 4.2 Specific Animations Required

| Element | Animation |
|---|---|
| Hero headline | Words fade up one-by-one (word-splitting with `motion.span`) |
| Hero background | Slow Ken Burns zoom (CSS + Framer `scale` from 1 → 1.08 over 8s) |
| Hero CTA buttons | Slide up with spring delay |
| Navbar | Slides down from top on load, shrinks + gains shadow on scroll |
| Mega menu | `AnimatePresence` scale+opacity from top |
| Service cards | `whileHover={{ y: -8, boxShadow: "..." }}` |
| Stats counters | Animated number count-up (use `useInView` + `useMotionValue`) |
| Section reveals | `useInView` + `fadeUp` for every section |
| Testimonial slider | Drag-enabled `motion.div` with `useAnimation` |
| Tab switcher | `AnimatePresence` layout transition |
| Partner logos | Infinite horizontal scroll marquee animation |
| Tour gallery | Lightbox with shared layout animation |
| Page transitions | `AnimatePresence` in root layout with `motion.main` |
| Mobile menu | Slide in from right as a `Sheet` with staggered nav links |
| Floating WhatsApp button | Pulse animation + `whileHover` scale |
| Form submission | Loading spinner with `motion` + success checkmark animation |
| Colombia Tour cards | Parallax scroll effect on card image |

### 4.3 Scroll-Triggered Animations

Wrap all sections with a `<ScrollReveal>` component:

```tsx
// components/ui/ScrollReveal.tsx
"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { fadeUp } from "@/lib/animations"

export function ScrollReveal({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
```

---

## 5. Site Architecture & All Pages

### 5.1 Complete URL Map

```
/                               → Homepage
/services                       → All Services Overview
/colombia-visas                 → Visa Hub (all visa types)
  /colombia-visas/digital-nomad-visa
  /colombia-visas/retirement-visa
  /colombia-visas/business-owner-visa
  /colombia-visas/real-estate-visa
  /colombia-visas/tourism-stamp-extension
  /colombia-visas/work-visa
/business-in-colombia           → Business Services Hub
  /business-in-colombia/company-incorporation
  /business-in-colombia/foreign-direct-investment
/insurance-colombia             → Health Insurance Hub
  /insurance-colombia/tourism-policy
  /insurance-colombia/visa-policy
/real-estate                    → Real Estate Hub
  /real-estate/property-listings
  /real-estate/legal-services
/other-services                 → Other Services
  /other-services/fbi-background-check
  /other-services/us-apostille
  /other-services/official-translations
  /other-services/passport-renewal
/digital-nomad-in-colombia      → Digital Nomad Hub
/retirement-colombia            → Retirement Hub
/us-citizens-services           → US Citizens Hub
/colombia-investment            → Investment Hub

/* NEW PAGES */
/colombia-tour                  → Colombia Tour Booking
  /colombia-tour/[slug]         → Individual Tour Detail
/lost-passport                  → Lost Passport Emergency Service

/blog                           → Blog Index
  /blog/[slug]                  → Blog Post
  /blog/category/[category]     → Category Archive
/about-us                       → About Us
/faqs                           → FAQ Page
/contact-us                     → Contact Page
/quote-now                      → Quote Request Form
/book-an-appointment            → Appointment Booking
/become-a-partner               → Partner Page
/integration-guide              → Relocation Integration Guide

/* AUTH */
/auth/login
/auth/register
/auth/forgot-password

/* DASHBOARD (authenticated) */
/dashboard                      → User Dashboard
/dashboard/my-applications      → Track visa applications
/dashboard/documents            → Uploaded documents
/dashboard/appointments         → Booked appointments
/dashboard/payments             → Payment history
/dashboard/profile              → Profile settings

/* ADMIN */
/admin                          → Admin panel (role-gated)

/* LEGAL */
/privacy-policy
/terms-and-conditions
/pqr                            → Complaints / PQR form
```

---

## 6. Navigation — Mega Menu Structure

### 6.1 Top Bar (Above Main Nav)

- Left: Phone number with flag icon `+1 (954) 799-3692` | Email icon `contact@expatra.com`
- Right: Language Switcher (EN 🇺🇸 / ES 🇨🇴) | Social icons (Facebook, Instagram, LinkedIn, YouTube)

### 6.2 Main Navigation Bar

Sticky on scroll. Background transitions from `transparent` → `white/95 backdrop-blur-md` with `motion.nav`.

**Desktop Nav Links:**

```
[Logo]  [I'm a Digital Nomad ▾]  [I Want to Invest ▾]  [I'm Retired ▾]  [Get Health Policy ▾]  [US Citizens Services ▾]    [Get Advice Now →]
```

Secondary row (smaller, below):
```
[Services ▾]  [Blog]  [About Us]  [FAQs]  [Contact]  [Quote Now]  [Work With Us]  [Become a Partner]
```

### 6.3 Mega Menu — "I'm a Digital Nomad"

Triggers on hover. Three-column layout with animated entrance.

**Column 1: Legal Stay in Colombia**
- Tourism Stamp Extension → `/colombia-visas/tourism-stamp-extension`
- Digital Nomad Visa → `/colombia-visas/digital-nomad-visa`
  - Sub-badges: As a Worker | As an Entrepreneur | As a Socio-Owner
- Health Policy → `/insurance-colombia`

**Column 2: Documentation Services**
- FBI Background Check → `/other-services/fbi-background-check`
- US Apostille → `/other-services/us-apostille`
- Official Translations → `/other-services/official-translations`

**Column 3: Looking for Help + Blog Preview**
- Specialized Advice → `/book-an-appointment`
- Start a Business → `/business-in-colombia/company-incorporation`
- FAQs → `/faqs`
- Blog preview: 2 latest blog posts (fetched from Supabase)

### 6.4 Mega Menu — "I Want to Invest in Colombia"

**Column 1: Company Investment**
- Company Creation → `/business-in-colombia/company-incorporation`
- Business Visa → `/colombia-visas/business-owner-visa`
- Foreign Investment Certificate → `/business-in-colombia/foreign-direct-investment`

**Column 2: Real Estate Investment**
- Property Purchase → `/real-estate/property-listings`
- Real Estate Investment Visa → `/colombia-visas/real-estate-visa`
- Legal Real Estate Services → `/real-estate/legal-services`

**Column 3: Help + Blog Preview**
- Specialized Advice → `/book-an-appointment`
- FAQs → `/faqs`
- 2 latest blog posts

### 6.5 Mega Menu — "I'm Retired"

**Column 1: Legal Stay**
- Tourism Stamp Extension
- Retirement Visa → `/colombia-visas/retirement-visa`
- Health Policy

**Column 2: Documentation**
- FBI Background Check
- US Apostille
- Official Translations

**Column 3: Help + Blog**
- Specialized Advice
- FAQs
- 2 blog posts

### 6.6 Mega Menu — "Get Health Policy"

**Column 1: Type of Insurance**
- Health Policy for Tourism
- Health Policy for Visa Application
- Sub-badges: Digital Nomads | Retirees | Investors | Students | Other Visa Types

**Column 2: Looking for Help**
- Quote & Get it Now → Stripe Checkout
- Health Policy Advice (WhatsApp CTA)
- FAQs

**Column 3: Blog Preview**

### 6.7 Mega Menu — "US Citizens Services"

**Column 1: Legal Stay**
- Tourism Stamp Extension
- Get a Colombian Visa
- Health Policy

**Column 2: Documentation Services**
- American Passport Renewal → `/other-services/passport-renewal`
- FBI Background Check
- US Apostille
- Official Translations

**Column 3: Help + Blog**
- Specialized Advice
- FAQs
- 2 blog posts

### 6.8 Mobile Navigation

Full-screen slide-in `Sheet` (Radix UI). Accordion for each mega menu category. Language switcher at top. Social links at bottom.

---

## 7. Homepage Sections (Detailed)

### 7.1 Hero Section

**Layout:** Full-viewport height. Background: rotating cinematic images of Colombia (Cartagena, Medellín, Bogotá, Coffee Region) with Ken Burns zoom effect.

**Dark overlay:** `bg-gradient-to-r from-primary-dark/80 to-primary/60`

**Content (centered or left-aligned, alternating on auto-scroll):**
- Pre-headline badge: `✦ Your Gateway to the Colombian Dream`
- H1 (animated word-by-word): e.g. "Colombian Dream" / "Expat Advisors" / "Business for Expats" / "Colombian Home Awaits" / "Stay Healthy"
- Subtitle paragraph
- Two CTA buttons: Primary `Get Advice Now →` + Secondary `Quote Now`
- Scroll indicator arrow (bouncing animation)

**Auto-slides:** 5 slides cycling every 6 seconds with `AnimatePresence` crossfade.

### 7.2 Persona Cards Section ("Discover Colombia")

**Headline:** "Navigating Your New Life with Expert Guidance"

**5 Animated Tab/Card Switcher:**

| Tab | Colour Accent | Title | Bullet Points |
|---|---|---|---|
| Digital Nomad | `#1D71B8` | "Achieve Your Digital Nomad Dream" | Digital Nomad Visa, Tourism Extension, FBI Check, Apostille, Health Policy, Advice |
| Invest | `#2E2D2C` | "Simplifying Investments for Expats" | Real Estate, Company Investment |
| Retired | `#1D71B8` | "Enhancing Your Retirement Experience" | Retirement Visa, FBI Check, Health Policy, Extension, Advice |
| Health Policy | `#009FE3` | "Stay Protected, Live Worry-Free" | Tourism Policy, Visa Policy, Free Advice |
| US Citizens | `#012F6B` | "Your Trusted Partner in Colombia" | Colombian Visa, FBI Check, Passport Renewal |

Each card: large icon, coloured left border, bullet list, `See More →` link. Framer Motion `layoutId` shared between desktop cards and mobile accordion tabs.

### 7.3 Stats Counter Section

**4 animated counters** (count up when in view):

| Stat | Value | Label |
|---|---|---|
| Foreigners Advised | 10K+ | "Expats have trusted us for expert guidance" |
| Visas Approved | 97%+ | "Visa approval rate" |
| Foreign Direct Investment | $121.2M | "In successful FDI" |
| Health Policies Issued | 5K+ | "Stress-free health coverage" |

Background: dark blue (`#012F6B`) with subtle Colombia flag colour strip at top. Animated number count-up using `useMotionValue` and `useTransform`.

### 7.4 "Your Best Ally" Section

Two-column layout:
- Left: Large bold text, description, two CTA buttons
- Right: Image of Expatra team / Medellín skyline with floating trust badges (5-star rating, Google Reviews badge, Medellín Guru badge)

Use `motion.div` with `whileInView` parallax on the image.

### 7.5 "Your Experience, Our Priority" Section

**3 top trust pillars (horizontal):**
- Experience | Personalized Attention | English Consulting

**Org Chart / Department Wheel:**
Animated interactive org chart. On hover, each department card expands to show description. Use Framer Motion `layout` + `AnimatePresence`. Departments:
- Management | Legal & Accounting | Visas | Sales | Support | Customer Service | CTIC | External Advisors | HR | Business & Real Estate

### 7.6 Best-Rated Services Section

**Carousel of Service Cards** (drag-enabled with Framer Motion `drag="x"`):

Each card shows:
- Service image (from Supabase Storage)
- Service name
- Starting price in USD
- Star rating (5.0)
- `Apply Now` + `More Info` buttons

Services: Digital Nomad Visa ($330), FBI Background Check ($400), Company Incorporation ($750), Retirement Visa, Real Estate Visa, Tourism Stamp Extension.

### 7.7 Testimonials / "Colombian Dreams Come True"

Horizontal drag-scroll testimonial carousel. Each card:
- Client avatar
- Name
- Star rating (5 stars animated in sequence)
- Review text (truncated, expandable)
- Service type badge

Reviews sourced from Supabase `testimonials` table. Admin can add/remove via dashboard.

Below carousel: Google Reviews badge + Medellín Guru badge with rating.

### 7.8 Expat Stories Section

Video testimonial section. 4 cards with thumbnail + play button overlay. On click, opens `Dialog` with embedded YouTube video.

Stories: Joseph Manier (Digital Nomad Visa), Janet & Craig (Retirement Visa), Shane Fraizer (Digital Nomad), Simeon Lagier (Business Visa).

### 7.9 Community / Facebook Group CTA

Dark gradient card:
- Left: "Join Our Partner Facebook Community for the Latest Updates"
- Stat badge: `+7K Expats in Community`
- CTA: `Join Colombia Expats Networking Hub →`
- Right: Collage of community member avatars (animated)

### 7.10 Appointment Booking CTA

Split card section:
- Professional Guidance Booking
- FAQ Center
- Blog
- Follow on Facebook
- Quote Now

Each mini-card with icon, title, description, button.

### 7.11 Strategic Partners / Logos

Infinite scroll marquee of partner logos. Framer Motion `x` keyframe animation looping. Partners: Medellín Guru, EG Assist, and others.

### 7.12 Footer

**4-column layout:**

Column 1: Expatra logo, tagline, contact info (phone, email, address), social icons

Column 2: "Services for Expats in Colombia"
- All Services, Colombia Visas, Business in Colombia, Other Services, Health Policy, Real Estate

Column 3: "Comprehensive Guide for Foreigners"
- Blog, Facebook Community, FAQ Center

Column 4: "Looking For"
- Quote Now, Become a Partner, Visa Consultation, Real Estate Consultation, Business Consultation, Contact, PQR, About Us, Integration Guide

**Bottom bar:** Terms | Privacy Policy | © 2024 Expatra. All rights reserved.

---

## 8. Inner Pages (Detailed)

### 8.1 Colombia Visas Hub (`/colombia-visas`)

Hero with headline "Your Visa Journey Starts Here". Grid of all visa type cards, each linking to individual service page.

### 8.2 Individual Visa Service Pages (e.g. `/colombia-visas/digital-nomad-visa`)

Standard service page layout:
- **Hero:** Full-width banner, breadcrumb, service title, starting price badge, `Apply Now` CTA
- **Overview tab:** What it is, who qualifies, benefits
- **Requirements tab:** Accordion list of document requirements (fetched from Supabase `service_requirements`)
- **Process tab:** Animated step-by-step numbered timeline
- **Pricing tab:** Pricing table (from Supabase), `Pay Now via Stripe` button
- **FAQ tab:** Accordion of common questions
- **Apply Now form:** Multi-step form (React Hook Form + Zod), file upload to Supabase Storage, Stripe payment trigger on submit

### 8.3 Business in Colombia Hub (`/business-in-colombia`)

Similar to Visas hub. Features:
- Company Incorporation (SAS) — $750 starting
- Foreign Direct Investment Certificate
- Business Visa

### 8.4 Insurance Colombia (`/insurance-colombia`)

Features health insurance plans in a pricing card grid. Toggle: Tourism vs Visa policy. Each plan has a Stripe Checkout button.

### 8.5 Real Estate (`/real-estate`)

- Property listing grid (cards with image, location, price, type)
- Filter sidebar (type, city, price range) — all from Supabase
- Individual property detail page with image gallery, map embed, enquiry form

### 8.6 Other Services (`/other-services`)

Grid of service cards: FBI Background Check, US Apostille, Official Translations, Passport Renewal.

### 8.7 Digital Nomad Hub (`/digital-nomad-in-colombia`)

Long-form landing page targeting digital nomads. Sections: Why Colombia, All relevant services, FAQ, CTA.

### 8.8 Retirement Hub (`/retirement-colombia`)

Similar to Digital Nomad hub, targeting retirees.

### 8.9 US Citizens Services (`/us-citizens-services`)

Targeted landing for US citizens. Includes Passport Renewal highlight.

### 8.10 Investment Hub (`/colombia-investment`)

Two tabs: Company Investment | Real Estate Investment. Each tab shows relevant services + stats.

### 8.11 About Us (`/about-us`)

- Hero + company story
- Interactive org chart (same as homepage but full-page)
- Team grid (photos from Supabase Storage)
- Timeline of company milestones (Framer Motion scroll-linked)
- Values section

### 8.12 Blog (`/blog`)

- Hero search bar
- Category filter tabs (Framer Motion `layoutId` underline indicator)
- Blog card grid (image, title, category badge, date, author avatar, read time)
- Pagination

### 8.13 Blog Post (`/blog/[slug]`)

- Hero image with title overlay
- Table of contents (sticky sidebar on desktop)
- MDX or Supabase rich text content
- Author card
- Related posts (3 cards)
- Social share buttons

### 8.14 FAQs (`/faqs`)

- Search input (filters questions client-side)
- Accordion grouped by category (Visas, Business, Insurance, Real Estate, General)
- Data from Supabase `faqs` table

### 8.15 Quote Now (`/quote-now`)

Multi-step form:
1. Select service type
2. Personal details
3. Specific service details
4. File uploads (if needed)
5. Confirmation + Stripe payment (if required)

Built with React Hook Form, Zod validation, Framer Motion step transitions.

### 8.16 Book an Appointment (`/book-an-appointment`)

- Service selector (Visa Consulting | Real Estate | Business/Legal)
- Date + time picker (Supabase `appointments` table)
- Stripe payment for consultation fees (variable by type)
- Confirmation email via Resend

### 8.17 Contact Us (`/contact-us`)

- Hero with map embed (Medellín office location)
- Contact form (name, email, phone, subject, message) → saves to Supabase `contact_messages`, triggers Resend email
- WhatsApp floating CTA

### 8.18 Become a Partner (`/become-a-partner`)

Partner benefits, partner application form, Supabase `partner_applications` table.

### 8.19 PQR (`/pqr`)

Complaints and suggestions form → Supabase `pqr_submissions`.

### 8.20 Integration Guide (`/integration-guide`)

Long-form guide page. Sections: Banking, Healthcare, Housing, Transport, Schools, Culture. Rich content from Supabase or MDX.

---

## 9. New Features

### 9.1 Colombia Tour (`/colombia-tour`)

**Purpose:** Allow expats and tourists to book curated tours of Colombia directly on Expatra.

**Tour Index Page (`/colombia-tour`):**
- Hero: "Explore Colombia Like Never Before" with cinematic video background
- Filter bar: City, Duration, Category (Adventure, Culture, Coffee, Beaches, City)
- Tour card grid: Image, tour name, duration badge, price badge, rating, `Book Now` CTA
- Animated card hover with image zoom + overlay

**Tour Detail Page (`/colombia-tour/[slug]`):**
- Full-width hero image gallery (Framer Motion shared layout lightbox)
- Tour title, rating, duration, group size, city
- Tabs: Overview | Itinerary | Inclusions | Meeting Point | Reviews
- Itinerary: animated day-by-day accordion
- Sidebar: Price box with date picker, number of people selector, total calculator
- `Book Now` → Stripe Checkout
- Map embed of starting point

**Supabase Tables:**
- `tours` (id, slug, title, description, city, duration_days, price_usd, category, images[], is_active)
- `tour_bookings` (id, tour_id, user_id, booking_date, num_people, total_amount, stripe_payment_id, status)
- `tour_reviews` (id, tour_id, user_id, rating, comment, created_at)

### 9.2 Lost Passport Service (`/lost-passport`)

**Purpose:** Emergency assistance for expats who have lost their passport in Colombia.

**Page Layout:**
- **Hero (urgent red/amber tone):** "Lost Your Passport in Colombia? We're Here to Help — 24/7" with emergency CTA
- **Emergency contact bar:** WhatsApp button + phone number at very top of page, sticky
- **Step-by-step guide section:**
  1. Report to Colombian police (Denuncia)
  2. Contact your embassy
  3. Get emergency travel document
  4. Expatra assists with all paperwork
- **Service Card:** What Expatra does:
  - Police report assistance
  - Embassy appointment scheduling
  - Emergency travel document guidance
  - Translation services
  - Replacement visa coordination
- **Pricing:** Transparent flat fee + Stripe payment button
- **Emergency Form:** Name, nationality, current city, passport number (last known), contact number — submits to Supabase `lost_passport_requests` table + triggers SMS/email alert to Expatra team
- **FAQ Accordion:** Common questions about losing a passport in Colombia
- **Testimonial:** One or two relevant client stories

**Supabase Table:**
- `lost_passport_requests` (id, full_name, nationality, city, passport_last_known, phone, email, status, created_at, notes)

**Admin alert:** When a new lost passport form is submitted, trigger a Supabase Edge Function → Resend email to ops team with `[URGENT]` subject line.

### 9.3 Language Switcher (EN / ES)

**Tech:** `next-intl` library with locale routing.

**Implementation:**
- Locales: `en` (default), `es`
- Routing: `/` for English, `/es/...` for Spanish (OR use `next-intl` middleware with subdomain/path prefix)
- All strings in `/messages/en.json` and `/messages/es.json`
- Navbar switcher: flag emoji + language code buttons (`🇺🇸 EN` | `🇨🇴 ES`)
- On switch: `router.push()` to equivalent locale path, persist preference in `localStorage`
- All page metadata (title, description) also translated

**Content Strategy:** All static UI strings translated. Blog posts and service descriptions stored in Supabase with `content_en` and `content_es` columns, displayed based on active locale.

**Framer Motion:** Language switcher button has a `whileTap={{ scale: 0.9 }}` + `AnimatePresence` flag crossfade.

---

## 10. Database Schema (Supabase)

### Core Tables

```sql
-- Users (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  nationality TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user', -- 'user' | 'admin' | 'partner'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL, -- 'visa' | 'business' | 'insurance' | 'documentation' | 'real_estate'
  title_en TEXT NOT NULL,
  title_es TEXT,
  description_en TEXT,
  description_es TEXT,
  starting_price_usd DECIMAL,
  stripe_price_id TEXT,
  requirements_en JSONB, -- array of requirement strings
  requirements_es JSONB,
  process_steps_en JSONB, -- array of step objects
  process_steps_es JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service Applications
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  service_id UUID REFERENCES services(id),
  status TEXT DEFAULT 'pending', -- 'pending' | 'in_review' | 'approved' | 'rejected' | 'completed'
  form_data JSONB,
  documents_urls TEXT[],
  stripe_payment_id TEXT,
  amount_paid_usd DECIMAL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointments
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  appointment_type TEXT, -- 'visa' | 'real_estate' | 'business' | 'tax'
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INT DEFAULT 60,
  status TEXT DEFAULT 'pending',
  stripe_payment_id TEXT,
  fee_usd DECIMAL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  avatar_url TEXT,
  service_type TEXT,
  rating INT DEFAULT 5,
  review_en TEXT NOT NULL,
  review_es TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_es TEXT,
  content_en TEXT,
  content_es TEXT,
  excerpt_en TEXT,
  excerpt_es TEXT,
  cover_image_url TEXT,
  author_id UUID REFERENCES profiles(id),
  category TEXT,
  tags TEXT[],
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAQs
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_en TEXT NOT NULL,
  question_es TEXT,
  answer_en TEXT NOT NULL,
  answer_es TEXT,
  category TEXT,
  sort_order INT,
  is_active BOOLEAN DEFAULT TRUE
);

-- Tours
CREATE TABLE tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_es TEXT,
  description_en TEXT,
  description_es TEXT,
  city TEXT,
  duration_days INT,
  price_usd DECIMAL NOT NULL,
  category TEXT,
  images TEXT[],
  itinerary_en JSONB,
  itinerary_es JSONB,
  inclusions_en TEXT[],
  inclusions_es TEXT[],
  max_group_size INT,
  meeting_point TEXT,
  stripe_price_id TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tour Bookings
CREATE TABLE tour_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID REFERENCES tours(id),
  user_id UUID REFERENCES profiles(id),
  booking_date DATE NOT NULL,
  num_people INT DEFAULT 1,
  total_usd DECIMAL NOT NULL,
  stripe_payment_id TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lost Passport Requests
CREATE TABLE lost_passport_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  nationality TEXT,
  current_city TEXT,
  passport_last_known TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT DEFAULT 'new', -- 'new' | 'contacted' | 'resolved'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Messages
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  phone TEXT,
  subject TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partner Applications
CREATE TABLE partner_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Real Estate Properties
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE,
  title TEXT,
  description_en TEXT,
  description_es TEXT,
  city TEXT,
  neighborhood TEXT,
  price_usd DECIMAL,
  type TEXT, -- 'apartment' | 'house' | 'commercial' | 'land'
  bedrooms INT,
  bathrooms INT,
  area_sqm DECIMAL,
  images TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Supabase Storage Buckets

```
expatra-avatars       (public)   — User profile photos
expatra-service-docs  (private)  — Application document uploads
expatra-blog-images   (public)   — Blog post images
expatra-tour-images   (public)   — Tour gallery images
expatra-property-imgs (public)   — Real estate photos
```

### Row Level Security (RLS)

- `profiles`: Users can read/update their own row
- `applications`: Users can read/insert their own; admins can read all
- `appointments`: Users own rows; admins full access
- `lost_passport_requests`: Anyone can insert; only admins can read
- `testimonials`, `faqs`, `blog_posts`, `services`, `tours`: Public read; admin write

---

## 11. Authentication

**Provider:** Supabase Auth

**Methods:**
- Email + Password
- Google OAuth
- Magic Link (optional)

**Flow:**
1. `/auth/register` → Supabase `signUp` → email confirmation → redirect to `/dashboard`
2. `/auth/login` → Supabase `signInWithPassword` or OAuth
3. Middleware (`middleware.ts`) protects `/dashboard/*` and `/admin/*` routes

**Role System:**
- `user` — default, access to own dashboard
- `admin` — access to `/admin` panel, can manage all records
- `partner` — can view partner-specific content

---

## 12. Payments (Stripe)

### 12.1 Products to Create in Stripe

| Product | Price | Type |
|---|---|---|
| Digital Nomad Visa Service | $330 | one_time |
| Retirement Visa Service | $350 | one_time |
| FBI Background Check | $400 | one_time |
| Company Incorporation | $750 | one_time |
| Business Owner Visa | $450 | one_time |
| Real Estate Visa | $500 | one_time |
| Tourism Stamp Extension | $150 | one_time |
| Health Policy for Visa (1yr) | Variable | recurring |
| Visa Consulting Call | $75 | one_time |
| Real Estate Consulting Call | $100 | one_time |
| Colombia Tour (varies per tour) | Variable | one_time |
| Lost Passport Service | $200 | one_time |

### 12.2 Implementation

**Checkout flow (`/api/stripe/checkout`):**
```typescript
// POST /api/stripe/checkout
// Body: { priceId, quantity, metadata: { service_id, user_id, ... } }
// Returns: { url } → redirect to Stripe Checkout
```

**Webhook (`/api/stripe/webhook`):**
- `checkout.session.completed` → update `applications` or `tour_bookings` or `appointments` status to `paid`; trigger Resend confirmation email

**Success/Cancel pages:**
- `/payment/success?session_id={id}` — animated success with confetti (Framer Motion)
- `/payment/cancel` — gentle message with retry CTA

---

## 13. Internationalisation — Language Switcher

### 13.1 Setup

```bash
npm install next-intl
```

**`/middleware.ts`:**
```typescript
import createMiddleware from 'next-intl/middleware'
export default createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en'
})
export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] }
```

**File structure:**
```
/messages/
  en.json
  es.json
/app/
  [locale]/
    layout.tsx
    page.tsx
    ...
```

### 13.2 Sample Translation Keys (`en.json`)

```json
{
  "nav": {
    "digitalNomad": "I'm a Digital Nomad",
    "invest": "I Want to Invest",
    "retired": "I'm Retired",
    "health": "Get Health Policy",
    "usCitizens": "US Citizens Services",
    "getAdvice": "Get Advice Now"
  },
  "hero": {
    "badge": "Your Gateway to the Colombian Dream",
    "cta_primary": "Get Advice Now",
    "cta_secondary": "Quote Now"
  },
  "stats": {
    "advised": "Foreigners Advised",
    "visas": "Visas Approved",
    "fdi": "Foreign Direct Investment",
    "health": "Health Policies Issued"
  },
  "lostPassport": {
    "hero_title": "Lost Your Passport in Colombia?",
    "hero_sub": "We're Here to Help — 24/7",
    "emergency_cta": "Contact Us Now on WhatsApp"
  },
  "tour": {
    "hero_title": "Explore Colombia Like Never Before",
    "book_now": "Book This Tour"
  }
}
```

### 13.3 Switcher Component

```tsx
// components/LanguageSwitcher.tsx
"use client"
import { useLocale } from "next-intl"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

const langs = [
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "es", label: "ES", flag: "🇨🇴" }
]

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <div className="flex items-center gap-1 border rounded-full p-1">
      {langs.map(lang => (
        <motion.button
          key={lang.code}
          onClick={() => switchLocale(lang.code)}
          whileTap={{ scale: 0.9 }}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            locale === lang.code 
              ? "bg-primary text-white" 
              : "text-muted hover:text-dark"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={lang.code}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {lang.flag} {lang.label}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      ))}
    </div>
  )
}
```

---

## 14. SEO & Performance

- Next.js `generateMetadata()` for all pages — dynamic title, description, OG image
- `sitemap.xml` generated via `next-sitemap` or App Router `sitemap.ts`
- `robots.txt` configured
- Structured data (JSON-LD) for: Organization, Service, FAQPage, BreadcrumbList
- All images: Next.js `<Image>` with priority on LCP images, `sizes` prop, WebP format
- Lazy loading with `loading="lazy"` for below-fold images
- Core Web Vitals target: LCP < 2.5s, CLS < 0.1, FID < 100ms
- Vercel Edge Network for global CDN
- ISR (Incremental Static Regeneration) for blog and service pages (`revalidate: 3600`)

---

## 15. Folder Structure

```
expatra/
├── app/
│   └── [locale]/
│       ├── layout.tsx                    # Root layout with Providers, Navbar, Footer
│       ├── page.tsx                      # Homepage
│       ├── services/
│       ├── colombia-visas/
│       │   ├── page.tsx
│       │   └── [slug]/page.tsx
│       ├── business-in-colombia/
│       ├── insurance-colombia/
│       ├── real-estate/
│       ├── other-services/
│       ├── colombia-tour/
│       │   ├── page.tsx
│       │   └── [slug]/page.tsx
│       ├── lost-passport/
│       │   └── page.tsx
│       ├── blog/
│       │   ├── page.tsx
│       │   └── [slug]/page.tsx
│       ├── about-us/
│       ├── faqs/
│       ├── contact-us/
│       ├── quote-now/
│       ├── book-an-appointment/
│       ├── become-a-partner/
│       ├── dashboard/
│       │   ├── layout.tsx               # Protected layout
│       │   ├── page.tsx
│       │   ├── my-applications/
│       │   ├── documents/
│       │   ├── appointments/
│       │   ├── payments/
│       │   └── profile/
│       ├── admin/
│       │   └── layout.tsx               # Admin-role-gated
│       └── auth/
│           ├── login/
│           ├── register/
│           └── forgot-password/
├── api/
│   ├── stripe/
│   │   ├── checkout/route.ts
│   │   └── webhook/route.ts
│   └── send-email/route.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── MegaMenu.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Footer.tsx
│   │   └── TopBar.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── PersonaCards.tsx
│   │   ├── StatsSection.tsx
│   │   ├── ServicesCarousel.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── ExpatStories.tsx
│   │   ├── CommunitySection.tsx
│   │   └── PartnersMarquee.tsx
│   ├── tour/
│   │   ├── TourCard.tsx
│   │   ├── TourGallery.tsx
│   │   ├── TourBookingWidget.tsx
│   │   └── TourItinerary.tsx
│   ├── lost-passport/
│   │   ├── EmergencyBanner.tsx
│   │   └── LostPassportForm.tsx
│   ├── ui/                              # ShadCN + custom
│   │   ├── ScrollReveal.tsx
│   │   ├── AnimatedCounter.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── StepTimeline.tsx
│   │   └── ...
│   └── forms/
│       ├── QuoteForm.tsx
│       ├── ContactForm.tsx
│       ├── AppointmentForm.tsx
│       └── ApplicationForm.tsx
├── lib/
│   ├── animations.ts
│   ├── supabase.ts
│   ├── stripe.ts
│   ├── resend.ts
│   └── utils.ts
├── messages/
│   ├── en.json
│   └── es.json
├── public/
│   ├── images/
│   └── fonts/
├── styles/
│   └── globals.css
├── middleware.ts
├── next.config.ts
├── tailwind.config.ts
└── .env.local
```

---

## 16. Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Resend (Email)
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=https://expatra.com
NEXT_PUBLIC_WHATSAPP_NUMBER=+19547993692

# Google Maps (optional)
NEXT_PUBLIC_GOOGLE_MAPS_KEY=
```

---

## 17. Deployment (Vercel)

1. Connect GitHub repo to Vercel
2. Set all environment variables in Vercel dashboard
3. Set `Root Directory` to `/` (or `/apps/web` if monorepo)
4. Framework: Next.js (auto-detected)
5. Configure custom domain: `expatra.com` and `www.expatra.com`
6. Enable Vercel Analytics
7. Set up Vercel Cron Job for ISR revalidation if needed
8. Stripe webhook endpoint: `https://expatra.com/api/stripe/webhook` — register in Stripe dashboard

### Vercel Edge Config (optional)
Use Vercel Edge Config for feature flags (e.g., toggle new features without redeploy).

---

## 18. Page-by-Page Checklist

| Page | Mega Menu | Framer Motion | Stripe | Supabase | i18n | Auth Required |
|---|---|---|---|---|---|---|
| Homepage | ✅ | ✅ Hero, Counters, Cards, Carousel, Testimonials, Marquee | — | Testimonials, Blog preview | ✅ | ❌ |
| Colombia Visas Hub | ✅ | ✅ Card grid reveal | — | Services | ✅ | ❌ |
| Visa Detail Page | ✅ | ✅ Timeline, Tabs | ✅ | Service data, Requirements | ✅ | ❌ |
| Business Hub | ✅ | ✅ | ✅ | Services | ✅ | ❌ |
| Insurance | ✅ | ✅ Pricing toggle | ✅ | Plans | ✅ | ❌ |
| Real Estate | ✅ | ✅ Property cards | — | Properties | ✅ | ❌ |
| Colombia Tour | ✅ | ✅ Gallery, Cards, Booking | ✅ | Tours, Bookings | ✅ | ❌ |
| Lost Passport | ✅ | ✅ Emergency banner pulse | ✅ | LP Requests | ✅ | ❌ |
| Blog | ✅ | ✅ Category tabs | — | Blog Posts | ✅ | ❌ |
| About Us | ✅ | ✅ Org chart, Timeline | — | Team, Milestones | ✅ | ❌ |
| FAQs | ✅ | ✅ Accordion | — | FAQs | ✅ | ❌ |
| Contact | ✅ | ✅ | — | Contact messages | ✅ | ❌ |
| Quote Now | ✅ | ✅ Multi-step form | ✅ | Applications | ✅ | ❌ |
| Book Appointment | ✅ | ✅ Calendar | ✅ | Appointments | ✅ | ❌ |
| Dashboard | — | ✅ Page transitions | — | Full profile | ✅ | ✅ |
| Auth Pages | — | ✅ Form transitions | — | Auth | ✅ | ❌ |

---

## Developer Notes

- **Always use `"use client"` only on leaf components** that need interactivity. Keep layouts and data-fetching components as Server Components.
- **Framer Motion:** Import from `framer-motion` — do NOT use `motion` from `framer-motion/react` (different package).
- **ShadCN:** Init with `npx shadcn@latest init` — use New York style, CSS variables enabled.
- **Supabase SSR:** Use `@supabase/ssr` package for server-side auth cookie handling in Next.js App Router.
- **Stripe:** Never expose `STRIPE_SECRET_KEY` client-side. All checkout logic in `/api` route handlers.
- **i18n:** Wrap the entire `app/` directory in `[locale]` folder and use `next-intl` provider in root layout.
- **Lost Passport form** should also send an immediate WhatsApp message via Twilio (optional enhancement) or Resend email marked urgent.
- All forms must have loading states with Framer Motion animated spinner + disabled submit button on submission.
- Run `npx next build` locally before every PR to catch type errors early.

---

*Document prepared for Antigravity development team. All questions: contact@expatra.com*
