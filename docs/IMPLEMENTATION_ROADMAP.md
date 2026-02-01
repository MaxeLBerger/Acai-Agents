# AcaiStack Website Implementation Roadmap

> **Version:** 2.0 | **Last Updated:** January 8, 2026 **Goal:** First 3-5
> customers in 30 days **Brand:** AcaiStack — Honest AI Startup | 3 Developers
> in Bavaria

---

## Table of Contents

1. [Technical Stack Summary](#1-technical-stack-summary)
2. [File Structure](#2-file-structure)
3. [Database Schema](#3-database-schema)
4. [API Integrations](#4-api-integrations)
5. [Week-by-Week Implementation Timeline](#5-week-by-week-implementation-timeline)
6. [GA4 Events to Track](#6-ga4-events-to-track)
7. [Launch Checklist](#7-launch-checklist)
8. [SEO Requirements](#8-seo-requirements)
9. [Performance Targets](#9-performance-targets)

---

## 1. Technical Stack Summary

### Frontend

| Technology | Version | Purpose                                 |
| ---------- | ------- | --------------------------------------- |
| HTML5      | Latest  | Semantic markup, accessibility          |
| CSS3       | Latest  | Custom properties, Grid, Flexbox        |
| JavaScript | ES2024  | Modules, async/await, optional chaining |
| GSAP       | 3.12+   | Scroll animations, page transitions     |

### CSS Architecture

```
css/
├── base.css              # Reset, typography, CSS variables
├── layout.css            # Grid system, containers, spacing
├── components.css        # Buttons, cards, forms, badges
├── animations.css        # Keyframes, transition utilities
├── gsap-animations.css   # GSAP-specific animation classes
└── acaistack-components.css  # Custom component library
```

### JavaScript Architecture

```
js/
├── utils.js              # Helper functions, DOM utilities
├── app.js                # Main application, initialization
├── gsap-animations.js    # GSAP ScrollTrigger, timelines
├── acaistack-components.js   # Web components library
├── components-loader.js  # Dynamic component loading
└── components/
    ├── navbar.js         # Navigation component
    └── footer.js         # Footer component
```

### Backend Needs (Serverless/Third-Party)

| Need                    | Recommended Solution  | Backup Option       |
| ----------------------- | --------------------- | ------------------- |
| **Form Handling**       | Formspree ($10/mo)    | Netlify Forms       |
| **Email Transactional** | SendGrid (Free tier)  | Mailgun             |
| **Email Marketing**     | Mailchimp (Free tier) | ConvertKit          |
| **Scheduling**          | Calendly (Free)       | Cal.com             |
| **Payments**            | Stripe                | Paddle (EU-focused) |
| **CRM**                 | HubSpot (Free)        | Pipedrive           |
| **Analytics**           | Google Analytics 4    | Plausible           |
| **Hosting**             | Netlify (Free)        | Vercel              |

### Recommended Integration Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        VISITOR JOURNEY                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Landing ──► Browse ──► Pricing ──► Contact ──► Conversion      │
│     │           │          │           │            │           │
│     ▼           ▼          ▼           ▼            ▼           │
│   GA4        GA4         GA4      Formspree     Stripe          │
│   Event      Event       Event       │          Checkout        │
│                                       ▼                         │
│                                   SendGrid ──► Mailchimp        │
│                                   (notify)    (nurture)         │
│                                       │                         │
│                                       ▼                         │
│                                   HubSpot CRM                   │
│                                   (track lead)                  │
│                                       │                         │
│                                       ▼                         │
│                                   Calendly                      │
│                                   (book call)                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. File Structure

### Complete Project Structure

```
acaistack/
│
├── index.html                    # Home page
├── robots.txt                    # SEO crawler instructions
├── sitemap.xml                   # SEO sitemap
├── manifest.json                 # PWA manifest
├── sw.js                         # Service worker (optional)
│
├── pages/
│   ├── services.html             # Services overview
│   ├── agents.html               # AI Agent marketplace
│   ├── pricing.html              # Pricing tables
│   ├── portfolio.html            # Case studies/projects
│   ├── team.html                 # Team page
│   ├── about.html                # About/story page
│   ├── contact.html              # Contact form
│   ├── faq.html                  # FAQ page
│   ├── blog/
│   │   ├── index.html            # Blog listing
│   │   └── [slug].html           # Individual posts
│   ├── legal/
│   │   ├── privacy.html          # Privacy policy (GDPR)
│   │   ├── terms.html            # Terms of service
│   │   └── imprint.html          # Impressum (German law)
│   └── success/
│       ├── contact-success.html  # Form submission success
│       └── payment-success.html  # Payment success
│
├── assets/
│   ├── images/
│   │   ├── hero/                 # Hero section images
│   │   ├── team/                 # Team photos
│   │   ├── portfolio/            # Project screenshots
│   │   ├── agents/               # Agent illustrations
│   │   └── icons/                # Custom icons (if not icon font)
│   ├── og/                       # Open Graph images (1200x630)
│   │   ├── home-og.jpg
│   │   ├── services-og.jpg
│   │   └── [page]-og.jpg
│   ├── fonts/                    # Self-hosted fonts (if any)
│   └── videos/                   # Demo videos, backgrounds
│
├── css/
│   ├── base.css                  # Reset, variables, typography
│   ├── layout.css                # Grid, containers, spacing
│   ├── components.css            # UI components
│   ├── animations.css            # CSS animations
│   ├── gsap-animations.css       # GSAP utility classes
│   ├── acaistack-components.css  # Component library styles
│   └── pages/                    # Page-specific styles (optional)
│       ├── home.css
│       ├── agents.css
│       └── pricing.css
│
├── js/
│   ├── utils.js                  # Utility functions
│   ├── app.js                    # Main application
│   ├── gsap-animations.js        # GSAP configurations
│   ├── acaistack-components.js   # Web components
│   ├── components-loader.js      # Component loader
│   ├── components/
│   │   ├── navbar.js             # Navigation
│   │   ├── footer.js             # Footer
│   │   └── cookie-banner.js      # GDPR cookie consent
│   ├── integrations/
│   │   ├── analytics.js          # GA4 tracking
│   │   ├── stripe.js             # Stripe integration
│   │   └── calendly.js           # Calendly embed
│   └── pages/
│       ├── pricing.js            # Pricing calculator
│       ├── agents.js             # Agent marketplace logic
│       └── contact.js            # Form validation/submission
│
├── docs/
│   ├── PAGE_SPECIFICATIONS.md    # Content specs
│   ├── SHARED_COMPONENTS.md      # Component docs
│   ├── IMPLEMENTATION_ROADMAP.md # This document
│   └── API_DOCUMENTATION.md      # Integration docs
│
├── scripts/
│   ├── build.js                  # Production build
│   ├── fix_urls.js               # URL fixing utility
│   └── generate-sitemap.js       # Sitemap generator
│
├── dist/                         # Production build output
│   ├── css/
│   ├── js/
│   └── assets/
│
├── .env.example                  # Environment variables template
├── package.json
├── eslint.config.js
├── .prettierrc
└── README.md
```

### New Files to Create

| File                             | Priority | Week |
| -------------------------------- | -------- | ---- |
| `pages/agents.html`              | High     | 2    |
| `pages/about.html`               | Medium   | 2    |
| `pages/faq.html`                 | Medium   | 3    |
| `pages/blog/index.html`          | Low      | 4    |
| `pages/legal/privacy.html`       | High     | 3    |
| `pages/legal/terms.html`         | High     | 3    |
| `pages/legal/imprint.html`       | High     | 3    |
| `js/integrations/analytics.js`   | High     | 1    |
| `js/integrations/stripe.js`      | Medium   | 3    |
| `js/components/cookie-banner.js` | High     | 3    |
| `sitemap.xml`                    | High     | 4    |
| `robots.txt`                     | High     | 4    |

---

## 3. Database Schema

For a static site with serverless backend, data is managed via third-party
services. Here's the conceptual schema:

### Leads Table (HubSpot/CRM)

```javascript
// Lead object structure
const Lead = {
  id: 'uuid',
  created_at: 'timestamp',
  updated_at: 'timestamp',

  // Contact Info
  email: 'string (required)',
  name: 'string',
  company: 'string',
  phone: 'string',

  // Lead Details
  source: 'enum: [organic, referral, social, ads, direct]',
  source_page: 'string (URL where they converted)',
  utm_source: 'string',
  utm_medium: 'string',
  utm_campaign: 'string',

  // Interest
  service_interest: 'enum: [website, agent, bundle]',
  budget_range: 'enum: [starter, professional, enterprise, custom]',
  timeline: 'enum: [asap, 1-month, 3-months, exploring]',

  // Engagement
  lifecycle_stage: 'enum: [subscriber, lead, mql, sql, opportunity, customer]',
  lead_score: 'integer (0-100)',

  // Notes
  message: 'text',
  internal_notes: 'text',
};
```

### Contact Submissions (Formspree/Database)

```javascript
// Contact form submission
const ContactSubmission = {
  id: 'uuid',
  submitted_at: 'timestamp',

  // Form Data
  name: 'string (required)',
  email: 'string (required)',
  company: 'string',
  phone: 'string',

  // Inquiry Details
  service_type: 'enum: [website, agent, bundle, custom, other]',
  budget: 'enum: [1499-2499, 2500-4999, 5000+, not-sure]',
  message: 'text (required)',

  // Context
  page_url: 'string',
  referrer: 'string',
  user_agent: 'string',

  // Processing
  status: 'enum: [new, contacted, qualified, converted, closed]',
  assigned_to: 'string',
  response_time: 'integer (minutes)',
};
```

### Agent Purchases (Stripe)

```javascript
// Agent purchase/subscription
const AgentPurchase = {
  id: 'uuid',
  stripe_customer_id: 'string',
  stripe_subscription_id: 'string (if subscription)',
  stripe_payment_intent_id: 'string (if one-time)',

  created_at: 'timestamp',

  // Customer
  customer_email: 'string',
  customer_name: 'string',
  company: 'string',

  // Product
  agent_id: 'string',
  agent_name: 'string',
  purchase_type: 'enum: [subscription, one-time, trial]',

  // Pricing
  amount: 'integer (cents)',
  currency: 'string (EUR)',
  billing_period: 'enum: [monthly, yearly, one-time]',

  // Status
  status: 'enum: [active, cancelled, paused, expired, trial]',
  trial_ends_at: 'timestamp',
  current_period_end: 'timestamp',

  // Metadata
  setup_status: 'enum: [pending, in-progress, complete]',
  deployment_url: 'string',
};

// Product Catalog
const AgentProducts = [
  {
    id: 'agent-support',
    name: 'Customer Support Bot',
    stripe_price_monthly: 'price_xxxxx', // €99/mo
    stripe_price_yearly: 'price_xxxxx', // €990/yr (17% off)
    stripe_price_onetime: 'price_xxxxx', // €499 one-time
    features: ['24/7 availability', 'Multi-language', 'FAQ training'],
  },
  {
    id: 'agent-booking',
    name: 'Appointment Booking Agent',
    stripe_price_monthly: 'price_xxxxx', // €149/mo
    stripe_price_yearly: 'price_xxxxx', // €1490/yr
    stripe_price_onetime: 'price_xxxxx', // €749 one-time
    features: ['Calendar sync', 'Reminders', 'Rescheduling'],
  },
  {
    id: 'agent-email',
    name: 'Email Automation Agent',
    stripe_price_monthly: 'price_xxxxx', // €199/mo
    stripe_price_yearly: 'price_xxxxx', // €1990/yr
    stripe_price_onetime: 'price_xxxxx', // €999 one-time
    features: ['Lead nurturing', 'Follow-ups', 'Personalization'],
  },
  {
    id: 'agent-lead',
    name: 'Lead Qualification Agent',
    stripe_price_monthly: 'price_xxxxx', // €249/mo
    stripe_price_yearly: 'price_xxxxx', // €2490/yr
    stripe_price_onetime: 'price_xxxxx', // €1249 one-time
    features: ['Scoring', 'Routing', 'CRM sync'],
  },
  {
    id: 'agent-analytics',
    name: 'Analytics & Reporting Agent',
    stripe_price_monthly: 'price_xxxxx', // €299/mo
    stripe_price_yearly: 'price_xxxxx', // €2990/yr
    stripe_price_onetime: 'price_xxxxx', // €1499 one-time
    features: ['Real-time dashboards', 'Insights', 'Exports'],
  },
  {
    id: 'agent-social',
    name: 'Social Media Manager Agent',
    stripe_price_monthly: 'price_xxxxx', // €399/mo
    stripe_price_yearly: 'price_xxxxx', // €3990/yr
    stripe_price_onetime: 'price_xxxxx', // €1999 one-time
    features: ['Scheduling', 'Engagement', 'Analytics'],
  },
];
```

---

## 4. API Integrations

### 4.1 Stripe for Payments

#### Setup

```bash
# Add to .env
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx  # Server-side only
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

#### Frontend Integration (`js/integrations/stripe.js`)

```javascript
// Stripe Checkout Integration
class StripeIntegration {
  constructor(publishableKey) {
    this.stripe = Stripe(publishableKey);
  }

  async createCheckoutSession(priceId, mode = 'subscription') {
    // For static sites, redirect to Stripe-hosted checkout
    // Products and prices configured in Stripe Dashboard
    const response = await fetch('/.netlify/functions/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId,
        mode, // 'subscription' or 'payment'
        successUrl: `${window.location.origin}/pages/success/payment-success.html`,
        cancelUrl: `${window.location.origin}/pages/pricing.html`,
      }),
    });

    const { sessionId } = await response.json();
    await this.stripe.redirectToCheckout({ sessionId });
  }

  // Simple payment link (no serverless function needed)
  redirectToPaymentLink(paymentLinkId) {
    window.location.href = `https://buy.stripe.com/${paymentLinkId}`;
  }
}

// Usage
const stripe = new StripeIntegration('pk_live_xxxxx');

// Agent subscription button
document.querySelectorAll('[data-stripe-price]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const priceId = btn.dataset.stripePrice;
    const mode = btn.dataset.stripeMode || 'subscription';
    stripe.createCheckoutSession(priceId, mode);
  });
});
```

#### Stripe Products to Create

| Product         | Monthly | Yearly | One-Time |
| --------------- | ------- | ------ | -------- |
| Support Bot     | €99     | €990   | €499     |
| Booking Agent   | €149    | €1,490 | €749     |
| Email Agent     | €199    | €1,990 | €999     |
| Lead Agent      | €249    | €2,490 | €1,249   |
| Analytics Agent | €299    | €2,990 | €1,499   |
| Social Agent    | €399    | €3,990 | €1,999   |

---

### 4.2 Calendly for Booking

#### Embed Integration

```html
<!-- Inline Embed -->
<div
  class="calendly-inline-widget"
  data-url="https://calendly.com/acaistack/30min?hide_gdpr_banner=1"
  style="min-width:320px;height:700px;"
></div>
<script
  src="https://assets.calendly.com/assets/external/widget.js"
  async
></script>

<!-- Popup Widget -->
<link
  href="https://assets.calendly.com/assets/external/widget.css"
  rel="stylesheet"
/>
<script
  src="https://assets.calendly.com/assets/external/widget.js"
  async
></script>

<button
  onclick="Calendly.initPopupWidget({url: 'https://calendly.com/acaistack/30min'})"
>
  Book a Call
</button>
```

#### JavaScript Integration (`js/integrations/calendly.js`)

```javascript
// Calendly Integration with GA4 tracking
class CalendlyIntegration {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.init();
  }

  init() {
    // Listen for Calendly events
    window.addEventListener('message', (e) => {
      if (this.isCalendlyEvent(e)) {
        this.handleCalendlyEvent(e.data.event, e.data.payload);
      }
    });
  }

  isCalendlyEvent(e) {
    return (
      e.origin === 'https://calendly.com' &&
      e.data.event &&
      e.data.event.indexOf('calendly') === 0
    );
  }

  handleCalendlyEvent(event, payload) {
    switch (event) {
      case 'calendly.profile_page_viewed':
        this.trackEvent('calendly_viewed');
        break;
      case 'calendly.event_type_viewed':
        this.trackEvent('calendly_event_type_viewed', {
          event_type: payload.event_type?.name,
        });
        break;
      case 'calendly.date_and_time_selected':
        this.trackEvent('calendly_time_selected');
        break;
      case 'calendly.event_scheduled':
        this.trackEvent('calendly_booked', {
          event_type: payload.event_type?.name,
          invitee_email: payload.invitee?.email,
        });
        break;
    }
  }

  trackEvent(eventName, params = {}) {
    if (window.gtag) {
      gtag('event', eventName, params);
    }
  }

  openPopup(eventType = '30min', prefill = {}) {
    const url = new URL(`${this.baseUrl}/${eventType}`);

    if (prefill.name) url.searchParams.set('name', prefill.name);
    if (prefill.email) url.searchParams.set('email', prefill.email);

    Calendly.initPopupWidget({ url: url.toString() });
  }
}

// Initialize
const calendly = new CalendlyIntegration('https://calendly.com/acaistack');
```

---

### 4.3 SendGrid/Mailchimp for Email

#### Form Submission with Email Notification

```javascript
// Contact form handler with SendGrid notification
async function handleContactSubmission(formData) {
  // 1. Submit to Formspree
  const formResponse = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' },
  });

  if (!formResponse.ok) throw new Error('Form submission failed');

  // 2. Add to Mailchimp (via serverless function or Zapier)
  await fetch('/.netlify/functions/add-subscriber', {
    method: 'POST',
    body: JSON.stringify({
      email: formData.get('email'),
      firstName: formData.get('name').split(' ')[0],
      tags: ['website-lead', formData.get('service_type')],
    }),
  });

  // 3. Track conversion
  gtag('event', 'form_submit', {
    form_name: 'contact',
    service_type: formData.get('service_type'),
  });

  return { success: true };
}
```

#### Mailchimp Signup Form

```html
<!-- Newsletter signup -->
<form
  action="https://acaistack.us21.list-manage.com/subscribe/post"
  method="POST"
  class="newsletter-form"
>
  <input type="hidden" name="u" value="YOUR_USER_ID" />
  <input type="hidden" name="id" value="YOUR_LIST_ID" />

  <input type="email" name="EMAIL" placeholder="your@email.com" required />
  <button type="submit">Subscribe</button>
</form>
```

---

### 4.4 Google Analytics 4

#### Base Installation

```html
<!-- In <head> of all pages -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    // Enhanced measurement
    page_title: document.title,
    page_location: window.location.href,
    // Custom dimensions
    content_group: 'marketing', // or 'product', 'legal', etc.
  });
</script>
```

#### Analytics Module (`js/integrations/analytics.js`)

```javascript
// GA4 Analytics Wrapper
class Analytics {
  constructor(measurementId) {
    this.measurementId = measurementId;
    this.initialized = false;
    this.queue = [];
  }

  init() {
    if (this.initialized) return;

    // Check for consent
    if (!this.hasConsent()) {
      console.log('Analytics: Waiting for consent');
      return;
    }

    // Load gtag
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      dataLayer.push(arguments);
    };
    gtag('js', new Date());
    gtag('config', this.measurementId);

    this.initialized = true;

    // Process queued events
    this.queue.forEach(({ event, params }) => this.track(event, params));
    this.queue = [];
  }

  hasConsent() {
    return localStorage.getItem('cookie-consent') === 'accepted';
  }

  track(event, params = {}) {
    if (!this.initialized) {
      this.queue.push({ event, params });
      return;
    }

    gtag('event', event, {
      ...params,
      timestamp: new Date().toISOString(),
    });
  }

  // Convenience methods
  trackPageView(pageName) {
    this.track('page_view', { page_title: pageName });
  }

  trackCTAClick(location, text) {
    this.track('cta_click', {
      cta_location: location,
      cta_text: text,
    });
  }

  trackFormSubmit(formName, success = true) {
    this.track('form_submit', {
      form_name: formName,
      success,
    });
  }

  trackAgentDemo(agentId, agentName) {
    this.track('agent_demo_view', {
      agent_id: agentId,
      agent_name: agentName,
    });
  }

  trackPricingView(tier) {
    this.track('pricing_view', { pricing_tier: tier });
  }

  trackScrollDepth(percent) {
    this.track('scroll_depth', { percent_scrolled: percent });
  }

  trackError(errorType, errorMessage) {
    this.track('exception', {
      description: errorMessage,
      fatal: false,
      error_type: errorType,
    });
  }
}

// Initialize
const analytics = new Analytics('G-XXXXXXXXXX');

// Auto-track scroll depth
let scrollMarkers = [25, 50, 75, 100];
window.addEventListener(
  'scroll',
  () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );

    scrollMarkers = scrollMarkers.filter((marker) => {
      if (scrollPercent >= marker) {
        analytics.trackScrollDepth(marker);
        return false;
      }
      return true;
    });
  },
  { passive: true }
);

export default analytics;
```

---

## 5. Week-by-Week Implementation Timeline

### Week 1: Foundation & Core Pages

#### Day 1-2: Project Setup & Navigation

- [ ] Audit existing codebase, document what exists
- [ ] Set up proper CSS variables in `base.css`
- [ ] Finalize responsive navigation component
- [ ] Create reusable header/footer components
- [ ] Set up live-server development environment

#### Day 3-4: Home Page Hero & Above-the-Fold

- [ ] Design and implement hero section
- [ ] Add trust badges and stats bar
- [ ] Implement GSAP entrance animations
- [ ] Mobile-responsive hero testing
- [ ] Add primary/secondary CTAs

#### Day 5-7: Home Page Sections

- [ ] Services overview section (3 cards)
- [ ] Agent showcase section (carousel)
- [ ] Testimonials placeholder section
- [ ] Final CTA section
- [ ] Footer with all links

**Week 1 Deliverables:**

- ✅ Fully functional home page
- ✅ Responsive navigation
- ✅ GSAP animations working
- ✅ Mobile-first responsive

---

### Week 2: Product Pages & Components

#### Day 8-9: Services Page

- [ ] Hero with breadcrumbs
- [ ] Website development section with pricing
- [ ] AI Agents section
- [ ] Bundle packages section
- [ ] Comparison table
- [ ] CTAs linking to contact

#### Day 10-11: AI Agents Marketplace Page

- [ ] Agent grid/list layout
- [ ] Individual agent cards with:
  - Icon/illustration
  - Name and description
  - Key features
  - Pricing (subscription + one-time)
  - CTA buttons
- [ ] Agent filtering (by category, price)
- [ ] Demo modal/preview functionality

#### Day 12-13: Pricing Page

- [ ] Pricing toggle (Monthly/Yearly/One-time)
- [ ] Website pricing tiers
- [ ] Agent pricing comparison
- [ ] Bundle deals section
- [ ] FAQ accordion
- [ ] "Need custom?" CTA

#### Day 14: Portfolio & Team

- [ ] Portfolio page layout (placeholder for projects)
- [ ] Team page with 3 team members
- [ ] About page (optional, if time)

**Week 2 Deliverables:**

- ✅ Services page complete
- ✅ Agents marketplace page
- ✅ Pricing page with calculator
- ✅ Team page

---

### Week 3: Forms, Integrations & Legal

#### Day 15-16: Contact Form

- [ ] Multi-step or single-page contact form
- [ ] Form validation (client-side)
- [ ] Formspree integration
- [ ] Success/error states
- [ ] Auto-fill from URL params (`?service=website`)

#### Day 17-18: Third-Party Integrations

- [ ] Google Analytics 4 setup
- [ ] Calendly embed on contact page
- [ ] Stripe payment links (or checkout)
- [ ] Mailchimp newsletter signup
- [ ] Cookie consent banner (GDPR)

#### Day 19-20: Legal Pages (GDPR Required)

- [ ] Privacy Policy page
- [ ] Terms of Service page
- [ ] Impressum page (German legal requirement)
- [ ] Cookie policy
- [ ] Update footer with legal links

#### Day 21: FAQ & Help

- [ ] FAQ page with accordion
- [ ] Common questions (10-15 items)
- [ ] Search functionality (optional)

**Week 3 Deliverables:**

- ✅ Contact form working
- ✅ All integrations live
- ✅ Legal compliance (GDPR)
- ✅ Cookie consent

---

### Week 4: Testing, SEO & Launch

#### Day 22-23: Testing & QA

- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS Safari, Android Chrome)
- [ ] Form submission testing
- [ ] Payment flow testing (test mode)
- [ ] 404 page
- [ ] Error handling

#### Day 24-25: SEO Optimization

- [ ] Meta tags on all pages
- [ ] Open Graph images created
- [ ] Schema.org markup
- [ ] Generate sitemap.xml
- [ ] Create robots.txt
- [ ] Image optimization (WebP, lazy loading)
- [ ] Performance audit (Lighthouse)

#### Day 26-27: Performance & Polish

- [ ] Achieve Lighthouse 90+ score
- [ ] Critical CSS inlining
- [ ] JavaScript defer/async
- [ ] Font optimization
- [ ] Fix any a11y issues
- [ ] Final responsive tweaks

#### Day 28: Launch Prep

- [ ] Domain DNS configuration
- [ ] SSL certificate (auto via Netlify)
- [ ] Environment variables set
- [ ] Analytics verification
- [ ] Final content review
- [ ] Backup of codebase
- [ ] Launch checklist complete

**Week 4 Deliverables:**

- ✅ All pages tested
- ✅ SEO optimized
- ✅ Lighthouse 90+
- ✅ Ready for launch

---

## 6. GA4 Events to Track

### Core Events

| Event Name     | Trigger              | Parameters                                     |
| -------------- | -------------------- | ---------------------------------------------- |
| `page_view`    | Page load            | `page_title`, `page_location`, `content_group` |
| `cta_click`    | Any CTA button       | `cta_location`, `cta_text`, `destination_url`  |
| `form_submit`  | Form submission      | `form_name`, `service_type`, `success`         |
| `form_start`   | First field focus    | `form_name`                                    |
| `scroll_depth` | 25/50/75/100% scroll | `percent_scrolled`                             |

### Product Events

| Event Name         | Trigger               | Parameters                         |
| ------------------ | --------------------- | ---------------------------------- |
| `agent_demo_view`  | Demo modal opened     | `agent_id`, `agent_name`           |
| `agent_card_click` | Agent card click      | `agent_id`, `agent_name`, `action` |
| `pricing_view`     | Pricing page view     | `pricing_tier`                     |
| `pricing_toggle`   | Monthly/Yearly switch | `billing_period`                   |
| `checkout_start`   | Stripe checkout init  | `product_id`, `price`, `currency`  |

### Engagement Events

| Event Name            | Trigger               | Parameters                      |
| --------------------- | --------------------- | ------------------------------- |
| `calendly_booked`     | Meeting scheduled     | `event_type`, `invitee_email`   |
| `newsletter_signup`   | Email submitted       | `source_page`                   |
| `external_link_click` | Outbound link         | `link_url`, `link_text`         |
| `file_download`       | PDF/resource download | `file_name`, `file_type`        |
| `video_play`          | Video started         | `video_title`, `video_duration` |

### Error Events

| Event Name      | Trigger                 | Parameters                               |
| --------------- | ----------------------- | ---------------------------------------- |
| `form_error`    | Validation/submit error | `form_name`, `error_type`, `error_field` |
| `payment_error` | Payment failed          | `error_code`, `error_message`            |
| `page_error`    | 404 or JS error         | `error_type`, `error_message`            |

### Implementation Example

```javascript
// Event tracking setup
document.addEventListener('DOMContentLoaded', () => {
  // Track all CTA clicks
  document.querySelectorAll('[data-track-cta]').forEach((el) => {
    el.addEventListener('click', () => {
      analytics.trackCTAClick(
        el.dataset.ctaLocation || 'unknown',
        el.textContent.trim()
      );
    });
  });

  // Track form starts
  document.querySelectorAll('form').forEach((form) => {
    let started = false;
    form.addEventListener('focusin', () => {
      if (!started) {
        analytics.track('form_start', {
          form_name: form.dataset.formName || form.id,
        });
        started = true;
      }
    });
  });

  // Track external links
  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    if (!link.href.includes(window.location.hostname)) {
      link.addEventListener('click', () => {
        analytics.track('external_link_click', {
          link_url: link.href,
          link_text: link.textContent.trim(),
        });
      });
    }
  });
});
```

---

## 7. Launch Checklist

### Pre-Launch Checks (20 Items)

#### Content & Design

- [ ] All placeholder text replaced with real content
- [ ] All images optimized and have alt text
- [ ] Favicon and app icons configured
- [ ] Open Graph images for each page
- [ ] Team photos uploaded
- [ ] Portfolio projects added (even if 1-2)

#### Technical

- [ ] All pages load without console errors
- [ ] All links working (no 404s)
- [ ] Forms submit correctly
- [ ] Email notifications arriving
- [ ] Stripe payments work (test mode verified)
- [ ] Calendly booking works
- [ ] Mobile responsive on all pages
- [ ] HTTPS working with valid SSL

#### SEO & Performance

- [ ] Meta titles and descriptions on all pages
- [ ] sitemap.xml generated and accessible
- [ ] robots.txt configured
- [ ] Lighthouse score 90+ on mobile
- [ ] Google Analytics tracking verified

#### Legal & Compliance

- [ ] Cookie consent banner working
- [ ] Privacy policy published
- [ ] Impressum published
- [ ] Terms of service published
- [ ] GDPR-compliant forms

---

### Day 1 Launch Tasks

| Time  | Task                                    | Owner     |
| ----- | --------------------------------------- | --------- |
| 09:00 | Final backup of staging                 | Dev       |
| 09:30 | Deploy to production                    | Dev       |
| 10:00 | Verify DNS propagation                  | Dev       |
| 10:30 | Test all forms on production            | QA        |
| 11:00 | Test payment flow (small test charge)   | QA        |
| 11:30 | Verify analytics tracking               | Marketing |
| 12:00 | Submit sitemap to Google Search Console | SEO       |
| 14:00 | Announce on social media                | Marketing |
| 14:30 | Send email to existing contacts         | Marketing |
| 16:00 | Monitor for errors/issues               | Dev       |
| 18:00 | Day 1 metrics review                    | Team      |

### Day 1 Monitoring

```javascript
// Error monitoring snippet
window.addEventListener('error', (e) => {
  analytics.trackError('javascript', e.message);

  // Also log to console for debugging
  console.error('Error caught:', e.message, e.filename, e.lineno);
});

window.addEventListener('unhandledrejection', (e) => {
  analytics.trackError(
    'promise',
    e.reason?.message || 'Unknown promise rejection'
  );
});
```

---

### Week 1 Post-Launch

#### Day 1-2

- [ ] Monitor real-time analytics
- [ ] Check error logs
- [ ] Respond to any contact form submissions
- [ ] Fix any critical bugs

#### Day 3-4

- [ ] Review initial traffic sources
- [ ] Check bounce rates per page
- [ ] Analyze form abandonment
- [ ] A/B test opportunities identified

#### Day 5-7

- [ ] First week metrics report
- [ ] Gather initial user feedback
- [ ] Prioritize quick wins
- [ ] Plan iteration #1

#### Metrics to Track Week 1

| Metric                   | Target | Source    |
| ------------------------ | ------ | --------- |
| Unique visitors          | 500+   | GA4       |
| Pages per session        | 2.5+   | GA4       |
| Avg session duration     | 2+ min | GA4       |
| Bounce rate              | < 60%  | GA4       |
| Contact form submissions | 10+    | Formspree |
| Calendly bookings        | 3+     | Calendly  |
| Newsletter signups       | 20+    | Mailchimp |

---

## 8. SEO Requirements

### Meta Tags Per Page

```html
<!-- Base template for all pages -->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Primary Meta Tags -->
  <title>{Page Title} | AcaiStack</title>
  <meta name="title" content="{Page Title} | AcaiStack" />
  <meta name="description" content="{150-160 char description}" />
  <meta name="keywords" content="{5-10 relevant keywords}" />
  <meta name="author" content="AcaiStack" />
  <meta name="robots" content="index, follow" />

  <!-- Canonical -->
  <link rel="canonical" href="https://acaistack.com/{page-path}" />

  <!-- Language -->
  <meta name="language" content="English" />
  <link rel="alternate" hreflang="en" href="https://acaistack.com/{page}" />
  <link rel="alternate" hreflang="de" href="https://acaistack.com/de/{page}" />
</head>
```

### Page-Specific Meta Tags

| Page          | Title                                                              | Description                                                                                                                                          |
| ------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Home**      | AcaiStack \| AI Websites & Agents from Bavaria \| Starting €1,499  | 3 AI developers building real websites and AI agents. No BS, no buzzwords. Custom sites from €1,499, pre-built agents from €99/mo. Bavaria, Germany. |
| **Services**  | Our Services \| Web Development & AI Agents \| AcaiStack           | Custom website development from €1,499 and AI agents from €99/mo. Transparent pricing, 3-week delivery. See what we build.                           |
| **Agents**    | AI Agent Marketplace \| Pre-Built Business Automation \| AcaiStack | 6 ready-to-deploy AI agents for customer support, booking, email, and more. Monthly subscription or one-time purchase. No coding required.           |
| **Pricing**   | Transparent Pricing \| Websites from €1,499 \| AcaiStack           | Clear, honest pricing for websites and AI agents. No hidden fees. Starter €1,499, Professional €2,499, Enterprise €4,999.                            |
| **Portfolio** | Our Work \| Website & AI Projects \| AcaiStack                     | Real projects from a real team. See websites and AI agents we've built for clients across Germany and Europe.                                        |
| **Team**      | Meet the Team \| 3 AI Developers from Bavaria \| AcaiStack         | The humans behind AcaiStack. 3 developers, no sales team, no corporate BS. Direct access to the people building your product.                        |
| **Contact**   | Contact Us \| Get Your Free Quote \| AcaiStack                     | Start your project with a free quote. No sales calls, just honest conversation. Response within 24 hours.                                            |
| **FAQ**       | FAQ \| Common Questions Answered \| AcaiStack                      | Answers to frequently asked questions about our websites, AI agents, pricing, and process.                                                           |

### Open Graph Tags

```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://acaistack.com/{page}" />
<meta property="og:title" content="{Page Title}" />
<meta property="og:description" content="{Description}" />
<meta
  property="og:image"
  content="https://acaistack.com/assets/og/{page}-og.jpg"
/>
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="AcaiStack" />
<meta property="og:locale" content="en_US" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="https://acaistack.com/{page}" />
<meta name="twitter:title" content="{Page Title}" />
<meta name="twitter:description" content="{Description}" />
<meta
  name="twitter:image"
  content="https://acaistack.com/assets/og/{page}-og.jpg"
/>
<meta name="twitter:creator" content="@acaistack" />
```

### Schema.org Markup

#### Organization (Home Page)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AcaiStack",
  "alternateName": "Acai Stack",
  "url": "https://acaistack.com",
  "logo": "https://acaistack.com/assets/images/logo.svg",
  "description": "AI development agency specializing in websites and AI agents",
  "foundingDate": "2025",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": 3
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bavaria",
    "addressCountry": "DE"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "hello@acaistack.com"
  },
  "sameAs": [
    "https://twitter.com/acaistack",
    "https://linkedin.com/company/acaistack",
    "https://github.com/acaistack"
  ]
}
```

#### Service (Services Page)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Website Development",
  "provider": {
    "@type": "Organization",
    "name": "AcaiStack"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Europe"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Website Packages",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Starter Website"
        },
        "price": "1499",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Professional Website"
        },
        "price": "2499",
        "priceCurrency": "EUR"
      }
    ]
  }
}
```

#### Product (Agents Page)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Customer Support AI Agent",
  "description": "24/7 AI-powered customer support bot with multi-language support",
  "brand": {
    "@type": "Brand",
    "name": "AcaiStack"
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "Monthly Subscription",
      "price": "99",
      "priceCurrency": "EUR",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "name": "One-Time Purchase",
      "price": "499",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    }
  ]
}
```

#### FAQ Page

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does it take to build a website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our standard delivery time is 3 weeks for most projects. Complex enterprise sites may take 4-6 weeks."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer ongoing support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all projects include 1 month of free support. Extended support packages are available."
      }
    }
  ]
}
```

### Sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://acaistack.com/</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://acaistack.com/pages/services.html</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://acaistack.com/pages/agents.html</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://acaistack.com/pages/pricing.html</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://acaistack.com/pages/portfolio.html</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://acaistack.com/pages/team.html</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://acaistack.com/pages/contact.html</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://acaistack.com/pages/faq.html</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

### Robots.txt

```txt
# robots.txt for acaistack.com

User-agent: *
Allow: /

# Disallow admin/system paths
Disallow: /dist/
Disallow: /scripts/
Disallow: /node_modules/
Disallow: /.git/
Disallow: /.vscode/

# Sitemap
Sitemap: https://acaistack.com/sitemap.xml

# Crawl-delay (optional, be careful with this)
# Crawl-delay: 1
```

---

## 9. Performance Targets

### Core Web Vitals Targets

| Metric                             | Target  | Current | Tool        |
| ---------------------------------- | ------- | ------- | ----------- |
| **LCP** (Largest Contentful Paint) | < 2.5s  | TBD     | Lighthouse  |
| **FID** (First Input Delay)        | < 100ms | TBD     | Lighthouse  |
| **CLS** (Cumulative Layout Shift)  | < 0.1   | TBD     | Lighthouse  |
| **TTFB** (Time to First Byte)      | < 600ms | TBD     | WebPageTest |
| **FCP** (First Contentful Paint)   | < 1.8s  | TBD     | Lighthouse  |

### Lighthouse Score Targets

| Category       | Target | Minimum |
| -------------- | ------ | ------- |
| Performance    | 95+    | 90      |
| Accessibility  | 100    | 95      |
| Best Practices | 100    | 95      |
| SEO            | 100    | 95      |

### Performance Optimization Checklist

#### Images

- [ ] Use WebP format with JPEG/PNG fallbacks
- [ ] Implement lazy loading (`loading="lazy"`)
- [ ] Responsive images with `srcset`
- [ ] Proper sizing (no oversized images)
- [ ] Compress all images (TinyPNG/Squoosh)

```html
<!-- Responsive image example -->
<picture>
  <source
    srcset="
      /assets/images/hero-800.webp   800w,
      /assets/images/hero-1200.webp 1200w,
      /assets/images/hero-1600.webp 1600w
    "
    type="image/webp"
  />
  <img
    src="/assets/images/hero-1200.jpg"
    srcset="
      /assets/images/hero-800.jpg   800w,
      /assets/images/hero-1200.jpg 1200w,
      /assets/images/hero-1600.jpg 1600w
    "
    sizes="(max-width: 800px) 100vw, 80vw"
    alt="Hero image description"
    loading="lazy"
    decoding="async"
  />
</picture>
```

#### CSS

- [ ] Critical CSS inlined in `<head>`
- [ ] Non-critical CSS loaded async
- [ ] Minified for production
- [ ] Remove unused CSS (PurgeCSS)
- [ ] Use CSS containment where applicable

```html
<!-- Critical CSS inline -->
<style>
  /* Critical above-the-fold styles */
  :root {
    --primary: #6366f1;
  }
  body {
    font-family: system-ui, sans-serif;
  }
  .hero {
    min-height: 100vh;
  }
</style>

<!-- Non-critical CSS async -->
<link
  rel="preload"
  href="/css/styles.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript><link rel="stylesheet" href="/css/styles.css" /></noscript>
```

#### JavaScript

- [ ] Defer non-critical JS
- [ ] Async external scripts
- [ ] Code splitting (if applicable)
- [ ] Minified for production
- [ ] Tree-shaking unused code

```html
<!-- Script loading strategy -->
<script src="/js/app.js" defer></script>
<script src="https://www.googletagmanager.com/gtag/js" async></script>
<script src="/js/gsap.min.js" defer></script>
```

#### Fonts

- [ ] Self-host fonts or use `font-display: swap`
- [ ] Preload critical fonts
- [ ] Subset fonts if possible
- [ ] Use system fonts for body text

```html
<!-- Font optimization -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="preload"
  as="style"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
/>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  media="print"
  onload="this.media='all'"
/>
```

#### Caching

- [ ] Set proper cache headers (via Netlify/hosting)
- [ ] Version static assets
- [ ] Service worker for offline (optional)

```toml
# netlify.toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

### Performance Budget

| Resource Type         | Max Size  | Max Requests |
| --------------------- | --------- | ------------ |
| HTML                  | 50KB      | 1            |
| CSS (total)           | 100KB     | 3            |
| JavaScript (total)    | 150KB     | 5            |
| Images (above fold)   | 200KB     | 5            |
| Fonts                 | 100KB     | 2            |
| **Total Page Weight** | **< 1MB** | **< 30**     |

### Testing Tools

| Tool               | Purpose               | URL               |
| ------------------ | --------------------- | ----------------- |
| Lighthouse         | Overall performance   | Chrome DevTools   |
| PageSpeed Insights | Real-world data       | pagespeed.web.dev |
| WebPageTest        | Detailed waterfall    | webpagetest.org   |
| GTmetrix           | Performance history   | gtmetrix.com      |
| Calibre            | Continuous monitoring | calibreapp.com    |

### Performance Monitoring Script

```javascript
// Report Core Web Vitals to GA4
import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

function sendToAnalytics({ name, delta, value, id }) {
  gtag('event', name, {
    event_category: 'Web Vitals',
    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    event_label: id,
    non_interaction: true,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
getFCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

---

## Quick Reference Card

### Key URLs

| Resource         | URL                                  |
| ---------------- | ------------------------------------ |
| Production       | https://acaistack.com                |
| Staging          | https://staging.acaistack.com        |
| GitHub           | https://github.com/acaistack/website |
| Formspree        | https://formspree.io/forms/xxxxx     |
| Stripe Dashboard | https://dashboard.stripe.com         |
| GA4              | https://analytics.google.com         |
| Calendly         | https://calendly.com/acaistack       |

### Contact Info

| Channel | Detail                |
| ------- | --------------------- |
| Email   | hello@acaistack.com   |
| Support | support@acaistack.com |
| Sales   | sales@acaistack.com   |

### Team Assignments

| Area                 | Owner       |
| -------------------- | ----------- |
| Frontend Development | Developer 1 |
| Integrations/Backend | Developer 2 |
| Design/Content       | Developer 3 |
| SEO/Marketing        | Shared      |

---

_Document Version: 2.0 | Last Updated: January 8, 2026_
