# AcaiStack Implementation Roadmap

> 4-Week Plan to First 3-5 Customers Tech: Vanilla HTML/CSS/JS + GSAP

---

## 1. Technical Stack

### Frontend

| Layer      | Technology                    |
| ---------- | ----------------------------- |
| Markup     | HTML5 (semantic)              |
| Styling    | CSS3 + Custom Properties      |
| Scripts    | ES2024 JavaScript (vanilla)   |
| Animations | GSAP 3.12+ with ScrollTrigger |
| Build      | PostCSS, Terser               |
| Dev Server | live-server                   |

### Backend (External Services)

| Need      | Service                    | Cost         |
| --------- | -------------------------- | ------------ |
| Forms     | Formspree or Netlify Forms | Free tier    |
| Email     | SendGrid or Mailchimp      | Free tier    |
| Booking   | Calendly                   | Free tier    |
| Payments  | Stripe                     | 2.9% + €0.25 |
| CRM       | HubSpot Free               | Free         |
| Analytics | Google Analytics 4         | Free         |

### Hosting

| Option           | Cost | Best For       |
| ---------------- | ---- | -------------- |
| Vercel           | Free | Static sites   |
| Netlify          | Free | Static + Forms |
| Cloudflare Pages | Free | Global CDN     |

---

## 2. Complete File Structure

```
Acai-Agents/
├── index.html                    # Home page
├── pages/
│   ├── services.html            # Services overview
│   ├── agents.html              # Agent marketplace (NEW)
│   ├── pricing.html             # Pricing tables
│   ├── portfolio.html           # Case studies
│   ├── team.html                # Team page
│   ├── about.html               # About/story (NEW)
│   ├── contact.html             # Contact form
│   ├── faq.html                 # FAQ accordion (NEW)
│   ├── blog.html                # Blog index (NEW)
│   ├── privacy.html             # Privacy policy (NEW)
│   ├── terms.html               # Terms of service (NEW)
│   └── imprint.html             # Impressum (NEW)
├── css/
│   ├── base.css                 # Variables, reset, typography
│   ├── components.css           # UI components
│   ├── layout.css               # Page layouts, grids
│   ├── animations.css           # CSS animations
│   ├── gsap-animations.css      # GSAP-specific styles
│   └── acaistack-components.css # New component library (NEW)
├── js/
│   ├── app.js                   # Main app logic
│   ├── utils.js                 # Utilities, sanitization
│   ├── gsap-animations.js       # GSAP setup
│   ├── components-loader.js     # Navbar/footer loader
│   ├── acaistack-components.js  # New components JS (NEW)
│   └── components/
│       ├── navbar.js            # Navigation
│       └── footer.js            # Footer
├── assets/
│   ├── images/                  # Site images
│   ├── portfolio/               # Portfolio screenshots
│   ├── icons/                   # SVG icons
│   └── og/                      # Open Graph images (NEW)
├── docs/
│   └── implementation/
│       ├── 01-PAGES-COMPLETE.md
│       ├── 02-COMPONENTS-CODE.md
│       ├── 03-COPY-MESSAGING.md
│       └── 04-IMPLEMENTATION-ROADMAP.md
├── robots.txt                   # (NEW)
├── sitemap.xml                  # (NEW)
└── _redirects                   # Netlify redirects (NEW)
```

### Priority: Files to Create

| Priority | File               | Purpose           |
| -------- | ------------------ | ----------------- |
| P0       | pages/agents.html  | Agent marketplace |
| P0       | pages/faq.html     | FAQ accordion     |
| P1       | pages/about.html   | Origin story      |
| P1       | pages/privacy.html | GDPR compliance   |
| P1       | pages/terms.html   | Legal protection  |
| P1       | pages/imprint.html | German law        |
| P2       | pages/blog.html    | SEO content       |
| P2       | sitemap.xml        | SEO               |
| P2       | robots.txt         | SEO               |

---

## 3. Database Schema (If Needed)

For MVP, use external services. If you need a database later:

### Leads Table

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  budget VARCHAR(50),
  timeline VARCHAR(50),
  message TEXT,
  source VARCHAR(100),         -- page, utm_source
  utm_campaign VARCHAR(100),
  utm_medium VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  status ENUM('new', 'contacted', 'qualified', 'closed') DEFAULT 'new'
);
```

### Agent Purchases Table

```sql
CREATE TABLE agent_purchases (
  id UUID PRIMARY KEY,
  customer_email VARCHAR(255) NOT NULL,
  agent_type ENUM('email', 'booking', 'support', 'sales', 'callcenter', 'outreach'),
  pricing_model ENUM('monthly', 'onetime'),
  amount_eur DECIMAL(10,2),
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  status ENUM('active', 'cancelled', 'paused'),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 4. API Integrations

### Stripe (Payments)

```javascript
// Create checkout session for agent purchase
const createCheckoutSession = async (agentType, pricingModel) => {
  const prices = {
    email: { monthly: 'price_xxx', onetime: 'price_yyy' },
    booking: { monthly: 'price_xxx', onetime: 'price_yyy' },
    // ... etc
  };

  const response = await fetch('/api/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      priceId: prices[agentType][pricingModel],
      successUrl: window.location.origin + '/success',
      cancelUrl: window.location.origin + '/pricing',
    }),
  });

  const { url } = await response.json();
  window.location.href = url;
};
```

### Calendly (Booking)

```html
<!-- Inline embed -->
<div
  class="calendly-inline-widget"
  data-url="https://calendly.com/acaistack/discovery"
  style="min-width:320px;height:630px;"
></div>
<script
  src="https://assets.calendly.com/assets/external/widget.js"
  async
></script>

<!-- Popup trigger -->
<a
  href="#"
  onclick="Calendly.initPopupWidget({url: 'https://calendly.com/acaistack/discovery'});return false;"
>
  Book a Free Call
</a>
```

### Formspree (Contact Form)

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send Message →</button>
</form>
```

### Google Analytics 4

```javascript
/**
 * GA4 Analytics Wrapper
 */
const Analytics = {
  init() {
    // GA4 is loaded via gtag.js in <head>
  },

  trackEvent(eventName, params = {}) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }
  },

  trackCTA(location, text) {
    this.trackEvent('cta_click', {
      cta_location: location,
      cta_text: text,
    });
  },

  trackFormSubmit(formName) {
    this.trackEvent('form_submit', {
      form_name: formName,
    });
  },

  trackAgentView(agentType) {
    this.trackEvent('agent_demo_view', {
      agent_type: agentType,
    });
  },

  trackScrollDepth(percentage) {
    this.trackEvent('scroll_depth', {
      percent: percentage,
    });
  },
};
```

---

## 5. Week-by-Week Timeline

### Week 1: Foundation

**Day 1-2: Core Setup**

- [ ] Update index.html with new hero section
- [ ] Add trust bar component
- [ ] Integrate new CSS components
- [ ] Test responsive breakpoints

**Day 3-4: Navigation & Structure**

- [ ] Update navbar with new pages
- [ ] Create pages/agents.html skeleton
- [ ] Create pages/faq.html skeleton
- [ ] Update footer links

**Day 5-7: Home Page Complete**

- [ ] Add testimonial carousel
- [ ] Add how-it-works section
- [ ] Add team preview section
- [ ] Add final CTA section
- [ ] GSAP animations for all sections

**Deliverable:** Fully functional home page with all new components

---

### Week 2: Product Pages

**Day 8-9: Services Page**

- [ ] Rewrite services.html with new copy
- [ ] Add comparison table
- [ ] Add process timeline
- [ ] Link to pricing

**Day 10-11: Agent Marketplace**

- [ ] Build pages/agents.html
- [ ] 6 agent cards with full details
- [ ] ROI calculator
- [ ] Agent FAQ section
- [ ] Demo request flow

**Day 12-14: Pricing Page**

- [ ] Update pricing tiers (new copy)
- [ ] Add monthly/one-time toggle for agents
- [ ] Bundle savings display
- [ ] Guarantee badge prominent
- [ ] Connect Stripe checkout (if ready)

**Deliverable:** Services, agents, and pricing pages complete

---

### Week 3: Trust & Conversion

**Day 15-16: Portfolio Page**

- [ ] Update with real projects
- [ ] Add case study format
- [ ] Results/metrics display
- [ ] Testimonial integration

**Day 17-18: Team & About**

- [ ] Update team.html with full bios
- [ ] Create pages/about.html
- [ ] Origin story section
- [ ] Values section

**Day 19-21: Contact & FAQ**

- [ ] Upgrade contact form (new fields)
- [ ] Calendly integration
- [ ] Create pages/faq.html
- [ ] 20+ FAQ items with accordion
- [ ] Legal pages (privacy, terms, imprint)

**Deliverable:** All trust-building pages complete

---

### Week 4: Launch Prep

**Day 22-23: SEO & Performance**

- [ ] Add meta tags to all pages
- [ ] Create Open Graph images
- [ ] Build sitemap.xml
- [ ] Add robots.txt
- [ ] Schema.org markup
- [ ] Lighthouse audit (target 90+)

**Day 24-25: Analytics & Tracking**

- [ ] GA4 setup with all events
- [ ] Form tracking
- [ ] CTA click tracking
- [ ] Scroll depth tracking
- [ ] Console check (no errors)

**Day 26-27: Testing**

- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS Safari, Android Chrome)
- [ ] Form submission testing
- [ ] Calendly booking test
- [ ] Link audit (no 404s)

**Day 28: Launch**

- [ ] Final content review
- [ ] Deploy to production
- [ ] DNS verification
- [ ] SSL certificate check
- [ ] Submit to Google Search Console
- [ ] Announce on LinkedIn

**Deliverable:** Production-ready website

---

## 6. GA4 Events to Track

### Core Events

| Event        | Parameters                | Trigger           |
| ------------ | ------------------------- | ----------------- |
| page_view    | page_title, page_location | Every page load   |
| cta_click    | cta_location, cta_text    | Any CTA button    |
| form_submit  | form_name, form_location  | Form submission   |
| scroll_depth | percent (25, 50, 75, 100) | Scroll milestones |

### Product Events

| Event                | Parameters                | Trigger           |
| -------------------- | ------------------------- | ----------------- |
| agent_demo_view      | agent_type                | View Demo click   |
| agent_purchase_start | agent_type, pricing_model | Get Agent click   |
| pricing_view         | tier_name                 | View pricing tier |
| checkout_start       | product_type, amount      | Stripe redirect   |

### Engagement Events

| Event            | Parameters                | Trigger          |
| ---------------- | ------------------------- | ---------------- |
| calendly_opened  | source_page               | Calendly popup   |
| calendly_booked  | source_page, meeting_type | Booking complete |
| faq_expand       | question_text             | FAQ item opened  |
| testimonial_view | testimonial_id            | Carousel slide   |

### Implementation

```javascript
// Track CTA clicks
document.querySelectorAll('[data-cta]').forEach((btn) => {
  btn.addEventListener('click', () => {
    Analytics.trackCTA(btn.dataset.ctaLocation, btn.textContent.trim());
  });
});

// Track scroll depth
let scrollMilestones = [25, 50, 75, 100];
let reached = [];

window.addEventListener('scroll', () => {
  const scrollPercent = Math.round(
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
  );

  scrollMilestones.forEach((milestone) => {
    if (scrollPercent >= milestone && !reached.includes(milestone)) {
      reached.push(milestone);
      Analytics.trackScrollDepth(milestone);
    }
  });
});
```

---

## 7. Launch Checklist

### Content (Pre-Launch)

- [ ] All pages have final copy (no Lorem ipsum)
- [ ] All images optimized and have alt text
- [ ] Contact email is real and monitored
- [ ] Phone number (if shown) is correct
- [ ] Team bios are accurate
- [ ] Pricing is finalized
- [ ] Legal pages reviewed by someone

### Technical (Pre-Launch)

- [ ] Favicon and app icons set
- [ ] Open Graph images for all pages
- [ ] No console errors or warnings
- [ ] All forms submit successfully
- [ ] Calendly embed works
- [ ] All links work (no 404s)
- [ ] Site works without JavaScript (basic)
- [ ] Print stylesheet (optional)

### SEO (Pre-Launch)

- [ ] Unique title/description per page
- [ ] Heading hierarchy (H1 → H2 → H3)
- [ ] sitemap.xml generated
- [ ] robots.txt in place
- [ ] Schema.org markup added
- [ ] Canonical URLs set
- [ ] No duplicate content

### Performance (Pre-Launch)

- [ ] Lighthouse score 90+ (all categories)
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Images in WebP/AVIF
- [ ] CSS/JS minified
- [ ] Fonts preloaded

### Legal (Pre-Launch)

- [ ] Privacy policy complete
- [ ] Terms of service complete
- [ ] Imprint (Impressum) complete
- [ ] Cookie banner if needed
- [ ] GDPR form consent

### Launch Day

| Time  | Task                            |
| ----- | ------------------------------- |
| 09:00 | Final deploy to production      |
| 09:30 | Verify DNS and SSL              |
| 10:00 | Test all forms (production)     |
| 10:30 | Submit to Google Search Console |
| 11:00 | Submit sitemap                  |
| 12:00 | LinkedIn announcement post      |
| 14:00 | Email existing contacts         |
| 16:00 | Monitor analytics               |
| 18:00 | Check for any errors/issues     |

### Week 1 Post-Launch

- [ ] Monitor GA4 for traffic patterns
- [ ] Check form submissions daily
- [ ] Respond to all inquiries within 24h
- [ ] Fix any reported bugs immediately
- [ ] Gather feedback from first visitors
- [ ] Adjust copy based on questions
- [ ] Plan first blog post

---

## 8. SEO Requirements

### Meta Tags Template

```html
<!-- Primary -->
<title>Page Title | AcaiStack</title>
<meta name="description" content="160 characters max describing the page." />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://acaistack.com/page" />
<meta property="og:title" content="Page Title | AcaiStack" />
<meta property="og:description" content="Same as meta description" />
<meta property="og:image" content="https://acaistack.com/assets/og/page.jpg" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Page Title | AcaiStack" />
<meta name="twitter:description" content="Same as meta description" />
<meta name="twitter:image" content="https://acaistack.com/assets/og/page.jpg" />

<!-- Canonical -->
<link rel="canonical" href="https://acaistack.com/page" />
```

### Schema.org Markup

**Organization (on all pages)**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AcaiStack",
  "url": "https://acaistack.com",
  "logo": "https://acaistack.com/assets/logo.png",
  "description": "AI-Powered Websites & Agents",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Rohrdorf",
    "addressRegion": "Bavaria",
    "addressCountry": "DE"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@acaistack.com",
    "contactType": "customer service"
  }
}
```

**FAQ Page**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a website cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our websites range from €1,499 to €2,999..."
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
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://acaistack.com/pages/services.html</loc>
    <lastmod>2026-01-08</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://acaistack.com/pages/agents.html</loc>
    <lastmod>2026-01-08</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://acaistack.com/pages/pricing.html</loc>
    <lastmod>2026-01-08</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://acaistack.com/pages/portfolio.html</loc>
    <lastmod>2026-01-08</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://acaistack.com/pages/team.html</loc>
    <lastmod>2026-01-08</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://acaistack.com/pages/contact.html</loc>
    <lastmod>2026-01-08</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://acaistack.com/pages/faq.html</loc>
    <lastmod>2026-01-08</lastmod>
    <priority>0.7</priority>
  </url>
</urlset>
```

### robots.txt

```
User-agent: *
Allow: /

Sitemap: https://acaistack.com/sitemap.xml

# Block admin/dev pages if any
Disallow: /admin/
Disallow: /_dev/
```

---

## 9. Performance Targets

### Core Web Vitals

| Metric                         | Target  | Tool        |
| ------------------------------ | ------- | ----------- |
| LCP (Largest Contentful Paint) | < 2.5s  | Lighthouse  |
| FID (First Input Delay)        | < 100ms | Lighthouse  |
| CLS (Cumulative Layout Shift)  | < 0.1   | Lighthouse  |
| TTFB (Time to First Byte)      | < 600ms | WebPageTest |

### Lighthouse Scores

| Category       | Target |
| -------------- | ------ |
| Performance    | 90+    |
| Accessibility  | 95+    |
| Best Practices | 95+    |
| SEO            | 100    |

### Performance Budget

| Resource          | Limit   |
| ----------------- | ------- |
| Total page weight | < 1MB   |
| JavaScript        | < 200KB |
| CSS               | < 100KB |
| Images            | < 500KB |
| Fonts             | < 100KB |
| HTTP requests     | < 30    |

### Optimization Checklist

- [ ] Images in WebP with JPEG fallback
- [ ] Lazy load below-fold images
- [ ] Preload critical CSS
- [ ] Preload hero image
- [ ] Defer non-critical JS
- [ ] Minify CSS and JS
- [ ] Enable gzip/brotli compression
- [ ] Set cache headers (1 year for assets)
- [ ] Use font-display: swap
- [ ] Subset fonts (Latin only)

---

## 10. Success Metrics

### Week 1 Targets

| Metric                   | Target  |
| ------------------------ | ------- |
| Unique visitors          | 100+    |
| Form submissions         | 5+      |
| Calendly bookings        | 2+      |
| Average session duration | > 2 min |
| Bounce rate              | < 50%   |

### Month 1 Targets

| Metric           | Target  |
| ---------------- | ------- |
| Unique visitors  | 500+    |
| Form submissions | 20+     |
| Qualified leads  | 10+     |
| Proposals sent   | 5+      |
| Customers signed | 3-5     |
| Revenue          | €5,000+ |

### Key Conversion Points

1. **Hero CTA click rate** → Target 5%+
2. **Contact form start rate** → Target 10%+
3. **Contact form completion rate** → Target 60%+
4. **Calendly booking rate** → Target 30% of qualified leads
5. **Proposal acceptance rate** → Target 50%+

---

## Summary

This roadmap takes you from current state to customer-ready in 4 weeks:

1. **Week 1:** Foundation and home page
2. **Week 2:** Product pages (services, agents, pricing)
3. **Week 3:** Trust pages (portfolio, team, FAQ, legal)
4. **Week 4:** Polish, SEO, analytics, launch

**Critical success factors:**

- Ship fast, iterate based on feedback
- Respond to every inquiry within 24 hours
- Track everything with GA4
- Be honest and transparent in all communications

**First customer goal:** Within 14 days of launch
