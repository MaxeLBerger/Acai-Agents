# AcaiStack Page Specifications

> **Brand:** AcaiStack — Honest AI Startup | 3 Developers in Bavaria **Tone:**
> Direct, transparent, no-BS, technical but approachable **Last Updated:**
> January 7, 2026

---

## Table of Contents

1. [Home Page](#1-home-page)
2. [Services Page](#2-services-page)
3. [Agent Marketplace Page](#3-agent-marketplace-page)
4. [Pricing Page](#4-pricing-page)
5. [Portfolio Page](#5-portfolio-page)
6. [Team Page](#6-team-page)
7. [About Page](#7-about-page)
8. [FAQ Page](#8-faq-page)
9. [Blog Index Page](#9-blog-index-page)
10. [Contact Page](#10-contact-page)

---

## 1. Home Page

**Route:** `/` or `/index.html` **Purpose:** First impression, establish trust
through transparency, convert visitors to leads

### Hero Section

| Element           | Content                                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| **Headline**      | "3 AI Developers. Real Websites. Real Agents. No BS."                                                     |
| **Subheadline**   | "A small team from Bavaria building honest AI solutions for businesses that want results, not buzzwords." |
| **Primary CTA**   | "Get Your Free Quote →" → `/contact.html`                                                                 |
| **Secondary CTA** | "See Our Work" → `/portfolio.html`                                                                        |
| **Trust Badge**   | "🇩🇪 Based in Bavaria • GDPR Compliant • Real Humans"                                                      |

### Stats Bar

```
┌─────────────────┬─────────────────┬─────────────────┐
│   2 Sites       │   6+ AI         │   Starting at   │
│   Built         │   Agents        │   €1,499        │
└─────────────────┴─────────────────┴─────────────────┘
```

**Note:** Update stats dynamically as projects complete

### Sections

#### 1. Services Overview

- **Layout:** 3-column grid (responsive to stacked on mobile)
- **Cards:**
  1. **Websites** — Icon: `<i class="acai-icon-website"></i>` — "Custom sites
     that convert. From €1,499."
  2. **AI Agents** — Icon: `<i class="acai-icon-robot"></i>` — "Automation that
     works. 6 ready-to-deploy agents."
  3. **Bundles** — Icon: `<i class="acai-icon-package"></i>` — "Website + Agent
     combos. Best value."
- **CTA:** "Explore Services →" → `/services.html`

#### 2. Agent Showcase

- **Headline:** "AI Agents That Actually Do Things"
- **Subheadline:** "Pre-built, tested, ready to deploy. No 6-month development
  cycles."
- **Layout:** Horizontal scroll carousel (desktop) / vertical stack (mobile)
- **Featured Agents:** Show 3 most popular
  - Customer Support Bot
  - Appointment Booking Agent
  - Email Automation
- **CTA:** "Browse All Agents →" → `/agents.html`

#### 3. Testimonials (Placeholder)

- **Headline:** "What Our Clients Say"
- **Content:**

  ```
  "We're just getting started. Check back soon for real testimonials
   from real clients. No fake reviews here."

   — The AcaiStack Team
  ```

- **Honest Note:** Display placeholder with transparency message until real
  testimonials are collected

#### 4. Final CTA Section

- **Background:** Gradient or accent color
- **Headline:** "Ready to Build Something Real?"
- **Body:** "No sales calls that waste your time. Just a quick form, honest
  pricing, and a real conversation."
- **CTA Button:** "Get Your Free Quote →" → `/contact.html`
- **Secondary Link:** "Or email us directly: hello@acaistack.com"

### SEO Meta

```html
<title>AcaiStack | AI Websites & Agents from Bavaria | Starting €1,499</title>
<meta
  name="description"
  content="3 AI developers building real websites and AI agents. No BS, no buzzwords. Custom sites from €1,499, pre-built agents from €99/mo. Based in Bavaria, Germany."
/>
<meta
  name="keywords"
  content="AI website development, AI agents, Bavaria web development, German AI startup, affordable AI solutions, business automation"
/>

<!-- Open Graph -->
<meta property="og:title" content="AcaiStack — Real AI Solutions, No BS" />
<meta
  property="og:description"
  content="3 developers from Bavaria building honest AI websites and agents. Starting at €1,499."
/>
<meta property="og:image" content="/assets/og/home-og.jpg" />
<meta property="og:url" content="https://acaistack.com/" />

<!-- Schema.org -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AcaiStack",
    "description": "AI development agency specializing in websites and AI agents",
    "url": "https://acaistack.com",
    "logo": "https://acaistack.com/assets/logo.svg",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Bavaria",
      "addressCountry": "DE"
    },
    "numberOfEmployees": "3"
  }
</script>
```

### GA4 Events

| Event Name              | Trigger                             | Parameters                                |
| ----------------------- | ----------------------------------- | ----------------------------------------- |
| `hero_cta_click`        | Click "Get Your Free Quote" in hero | `location: hero`                          |
| `service_card_click`    | Click any service card              | `service_type: websites\|agents\|bundles` |
| `agent_showcase_scroll` | Scroll through agent carousel       | `agents_viewed: [array]`                  |
| `final_cta_click`       | Click bottom CTA                    | `location: footer_cta`                    |
| `scroll_depth`          | 25%, 50%, 75%, 100% scroll          | `percent_scrolled: number`                |

---

## 2. Services Page

**Route:** `/services.html` **Purpose:** Detail all service offerings, establish
expertise, guide to appropriate solution

### Hero Section

| Element         | Content                                                                    |
| --------------- | -------------------------------------------------------------------------- |
| **Headline**    | "What We Build"                                                            |
| **Subheadline** | "Websites that work. AI that delivers. Transparent pricing on everything." |
| **Breadcrumb**  | Home → Services                                                            |

### Sections

#### 1. Website Development

**Card Layout:** Feature card with expandable details

| Attribute       | Value                               |
| --------------- | ----------------------------------- |
| **Price Range** | €1,499 – €2,999                     |
| **Delivery**    | 3 weeks standard                    |
| **Icon**        | `<i class="acai-icon-website"></i>` |

**Included:**

- ✓ Custom design (no templates)
- ✓ Mobile-first responsive
- ✓ Basic SEO setup
- ✓ GDPR compliance
- ✓ 1 month free support
- ✓ Performance optimized (90+ Lighthouse)

**Deliverables Table:**

| Tier         | Pages     | Features                     | Price  |
| ------------ | --------- | ---------------------------- | ------ |
| Starter      | Up to 5   | Basic SEO, Contact Form      | €1,499 |
| Professional | Up to 10  | + AI Agent, Analytics        | €2,499 |
| Enterprise   | Unlimited | + 2 Agents, Priority Support | €4,999 |

**CTA:** "Get Website Quote →" → `/contact.html?service=website`

---

#### 2. AI Agents

**Card Layout:** Grid of 6 agent cards

| Attribute         | Value                             |
| ----------------- | --------------------------------- |
| **Count**         | 6 Pre-built Agents                |
| **Pricing Model** | One-time OR Monthly subscription  |
| **Icon**          | `<i class="acai-icon-robot"></i>` |

**Agent Quick List:**

| Agent               | One-Time | Monthly | Best For            |
| ------------------- | -------- | ------- | ------------------- |
| Email Automation    | €499     | €99/mo  | Lead nurturing      |
| Appointment Booking | €699     | €149/mo | Service businesses  |
| Customer Support    | €999     | €199/mo | E-commerce, SaaS    |
| Sales Qualification | €1,499   | €299/mo | B2B sales teams     |
| Call Center         | €1,999   | €399/mo | High-volume support |
| Cold Outreach       | €999     | €199/mo | Lead generation     |

**CTA:** "Browse Agent Marketplace →" → `/agents.html`

---

#### 3. Bundles (Best Value)

**Highlight:** Show savings vs. buying separately

| Bundle             | Includes                          | Price  | Savings     |
| ------------------ | --------------------------------- | ------ | ----------- |
| **Starter Bundle** | Starter Website + Email Agent     | €1,899 | Save €99    |
| **Growth Bundle**  | Professional Website + 2 Agents   | €3,499 | Save €298   |
| **Full Stack**     | Enterprise Website + All 6 Agents | €9,999 | Save €2,493 |

**CTA:** "Build Your Bundle →" → `/contact.html?service=bundle`

---

#### 4. Our Process

**Timeline Visualization:**

```
Week 1          Week 2          Week 3          Launch
   │               │               │               │
   ▼               ▼               ▼               ▼
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│Discovery│ → │ Design  │ → │  Build  │ → │ Launch  │
└─────────┘   └─────────┘   └─────────┘   └─────────┘
  30-min        Figma         Dev &          Go live
  call          mockups       testing        + training
```

**Step Details:**

1. **Discovery (Day 1-3)**
   - 30-minute video call
   - Requirements gathering
   - Quote within 24 hours

2. **Design (Day 4-7)**
   - Figma mockups
   - 2 revision rounds
   - Mobile + desktop views

3. **Build (Day 8-18)**
   - Development
   - Testing
   - Your feedback integrated

4. **Launch (Day 19-21)**
   - Deployment
   - 30-min training call
   - Handoff documentation

---

#### 5. Why Choose Us

**3-Column Layout:**

| Trust Point              | Description                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------- |
| **Small Team, Big Care** | "We're 3 people. You'll work directly with the developers who build your project." |
| **Transparent Pricing**  | "No hidden fees. No scope creep surprises. Price locked at quote."                 |
| **Bavaria Based**        | "Real company, real address, GDPR compliant by default."                           |

---

### SEO Meta

```html
<title>Services | AI Websites & Agents | AcaiStack</title>
<meta
  name="description"
  content="Custom website development from €1,499 with 3-week delivery. 6 pre-built AI agents from €99/mo. Transparent pricing, no hidden fees. Bavaria-based team."
/>
<meta
  name="keywords"
  content="AI website development services, AI agent pricing, web development Germany, business automation agents"
/>

<!-- Open Graph -->
<meta property="og:title" content="AcaiStack Services — Websites & AI Agents" />
<meta
  property="og:description"
  content="Custom websites from €1,499, AI agents from €99/mo. 3-week delivery, transparent pricing."
/>
<meta property="og:image" content="/assets/og/services-og.jpg" />
```

### GA4 Events

| Event Name             | Trigger                 | Parameters                                          |
| ---------------------- | ----------------------- | --------------------------------------------------- |
| `service_section_view` | Section enters viewport | `section: websites\|agents\|bundles\|process`       |
| `pricing_table_expand` | Expand pricing details  | `service_type: string`                              |
| `agent_card_click`     | Click agent card        | `agent_name: string, price_type: one-time\|monthly` |
| `bundle_interest`      | Click bundle CTA        | `bundle_tier: starter\|growth\|fullstack`           |
| `process_step_view`    | View process step       | `step: 1\|2\|3\|4`                                  |
| `quote_cta_click`      | Any quote CTA clicked   | `service: string, location: string`                 |

---

## 3. Agent Marketplace Page

**Route:** `/agents.html` **Purpose:** Showcase all AI agents, enable
comparison, drive purchases/inquiries

### Hero Section

| Element         | Content                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------- | --------------- | -------- | -------- |
| **Headline**    | "AI Agents That Work While You Sleep"                                                       |
| **Subheadline** | "6 pre-built, tested, and ready to deploy. Pick one-time purchase or monthly subscription." |
| **Filter Bar**  | All                                                                                         | Customer-Facing | Internal | By Price |

### Agent Cards (Full Detail)

---

#### Agent 1: Email Automation Agent

| Attribute          | Value                                             |
| ------------------ | ------------------------------------------------- |
| **Icon**           | `<i class="acai-icon-email"></i>`                 |
| **One-Time Price** | €499                                              |
| **Monthly Price**  | €99/mo                                            |
| **Setup Time**     | 24 hours                                          |
| **Best For**       | Lead nurturing, Follow-ups, Newsletter automation |

**Features:**

- ✓ Automated email sequences
- ✓ CRM integration (HubSpot, Pipedrive, Airtable)
- ✓ Personalization tokens
- ✓ A/B testing support
- ✓ Analytics dashboard
- ✓ GDPR-compliant unsubscribe

**Use Cases:**

- Welcome sequences for new leads
- Abandoned cart recovery
- Appointment reminders
- Re-engagement campaigns

**CTA:** "Get Email Agent →" | "Book Demo →"

---

#### Agent 2: Appointment Booking Agent

| Attribute          | Value                                   |
| ------------------ | --------------------------------------- |
| **Icon**           | `<i class="acai-icon-calendar"></i>`    |
| **One-Time Price** | €699                                    |
| **Monthly Price**  | €149/mo                                 |
| **Setup Time**     | 48 hours                                |
| **Best For**       | Service businesses, Consultants, Salons |

**Features:**

- ✓ Natural language booking
- ✓ Calendar sync (Google, Outlook, Cal.com)
- ✓ Automatic reminders (email + SMS)
- ✓ Rescheduling & cancellations
- ✓ Multi-timezone support
- ✓ Buffer time between appointments

**Use Cases:**

- Consultation scheduling
- Salon/spa appointments
- Doctor/clinic bookings
- Sales call scheduling

**CTA:** "Get Booking Agent →" | "Book Demo →"

---

#### Agent 3: Customer Support Agent

| Attribute          | Value                                |
| ------------------ | ------------------------------------ |
| **Icon**           | `<i class="acai-icon-support"></i>`  |
| **One-Time Price** | €999                                 |
| **Monthly Price**  | €199/mo                              |
| **Setup Time**     | 72 hours                             |
| **Best For**       | E-commerce, SaaS, Service businesses |

**Features:**

- ✓ 24/7 automated responses
- ✓ Knowledge base learning
- ✓ Human handoff escalation
- ✓ Multi-language (DE, EN, FR, ES)
- ✓ Sentiment analysis
- ✓ Ticket creation integration

**Integrations:**

- Zendesk, Freshdesk, Intercom
- Slack, Discord
- Email, WhatsApp, Website chat

**Use Cases:**

- FAQ automation
- Order status inquiries
- Return/refund requests
- Technical support tier-1

**CTA:** "Get Support Agent →" | "Book Demo →"

---

#### Agent 4: Sales Qualification Agent

| Attribute          | Value                                 |
| ------------------ | ------------------------------------- |
| **Icon**           | `<i class="acai-icon-sales"></i>`     |
| **One-Time Price** | €1,499                                |
| **Monthly Price**  | €299/mo                               |
| **Setup Time**     | 72 hours                              |
| **Best For**       | B2B sales teams, High-ticket services |

**Features:**

- ✓ Lead scoring automation
- ✓ BANT qualification framework
- ✓ Meeting scheduling for qualified leads
- ✓ CRM auto-population
- ✓ Disqualification handling
- ✓ Custom qualification criteria

**Integrations:**

- Salesforce, HubSpot, Pipedrive
- Calendly, Cal.com
- Slack notifications

**Use Cases:**

- Inbound lead qualification
- Demo request processing
- Budget/timeline assessment
- Decision-maker identification

**CTA:** "Get Sales Agent →" | "Book Demo →"

---

#### Agent 5: Call Center Agent

| Attribute          | Value                                     |
| ------------------ | ----------------------------------------- |
| **Icon**           | `<i class="acai-icon-phone"></i>`         |
| **One-Time Price** | €1,999                                    |
| **Monthly Price**  | €399/mo                                   |
| **Setup Time**     | 1 week                                    |
| **Best For**       | High-volume support, After-hours coverage |

**Features:**

- ✓ Voice AI (natural conversation)
- ✓ Call transcription
- ✓ Sentiment analysis
- ✓ Human escalation triggers
- ✓ Multi-language voice
- ✓ Call recording & analytics

**Integrations:**

- Twilio, Vonage
- Aircall, RingCentral
- CRM systems

**Use Cases:**

- After-hours phone support
- Call overflow handling
- Appointment confirmations
- Basic inquiry resolution

**CTA:** "Get Call Center Agent →" | "Book Demo →"

---

#### Agent 6: Cold Outreach Agent

| Attribute          | Value                                |
| ------------------ | ------------------------------------ |
| **Icon**           | `<i class="acai-icon-outreach"></i>` |
| **One-Time Price** | €999                                 |
| **Monthly Price**  | €199/mo                              |
| **Setup Time**     | 48 hours                             |
| **Best For**       | Lead generation, B2B outreach        |

**Features:**

- ✓ Personalized outreach sequences
- ✓ Multi-channel (Email, LinkedIn)
- ✓ Response detection & categorization
- ✓ Follow-up automation
- ✓ A/B testing
- ✓ Do-not-contact list management

**Integrations:**

- Apollo, Lemlist, Instantly
- LinkedIn (via browser automation)
- CRM systems

**Use Cases:**

- Cold email campaigns
- LinkedIn connection requests
- Follow-up sequences
- Meeting booking from cold leads

**CTA:** "Get Outreach Agent →" | "Book Demo →"

---

### Comparison Table

| Feature        | Email | Booking | Support | Sales  | Call   | Outreach |
| -------------- | ----- | ------- | ------- | ------ | ------ | -------- |
| **One-Time**   | €499  | €699    | €999    | €1,499 | €1,999 | €999     |
| **Monthly**    | €99   | €149    | €199    | €299   | €399   | €199     |
| **Setup**      | 24h   | 48h     | 72h     | 72h    | 1wk    | 48h      |
| **24/7**       | ✓     | ✓       | ✓       | ✓      | ✓      | ✓        |
| **Multi-lang** | ✓     | ✓       | ✓       | ✓      | ✓      | ✓        |
| **CRM Sync**   | ✓     | ✓       | ✓       | ✓      | ✓      | ✓        |

### Pricing FAQ Section

**Q: One-time vs. monthly — what's the difference?**

> One-time: You own it. Includes 3 months of updates, then €49/mo for
> maintenance (optional). Monthly: We host, maintain, and update. Cancel
> anytime.

**Q: Can I switch from monthly to one-time?**

> Yes. Your monthly payments (up to 80%) can be credited toward one-time
> purchase.

**Q: What if an agent doesn't work for my use case?**

> 30-day money-back guarantee on all agents. No questions asked.

---

### SEO Meta

```html
<title>AI Agent Marketplace | 6 Pre-Built Agents | AcaiStack</title>
<meta
  name="description"
  content="Browse 6 ready-to-deploy AI agents: Email Automation, Appointment Booking, Customer Support, Sales Qualification, Call Center, Cold Outreach. From €99/mo or one-time purchase."
/>
<meta
  name="keywords"
  content="AI agents, business automation, email automation AI, booking agent, customer support bot, sales AI, call center AI, outreach automation"
/>

<!-- Open Graph -->
<meta property="og:title" content="AI Agent Marketplace — AcaiStack" />
<meta
  property="og:description"
  content="6 pre-built AI agents ready to deploy. From €99/mo. Customer support, sales, booking, and more."
/>
<meta property="og:image" content="/assets/og/agents-og.jpg" />

<!-- Product Schema for each agent -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Customer Support AI Agent",
    "description": "24/7 automated customer support with human handoff",
    "offers": [
      {
        "@type": "Offer",
        "price": "999",
        "priceCurrency": "EUR",
        "priceValidUntil": "2026-12-31"
      },
      {
        "@type": "Offer",
        "price": "199",
        "priceCurrency": "EUR",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "billingDuration": "P1M"
        }
      }
    ]
  }
</script>
```

### GA4 Events

| Event Name              | Trigger                    | Parameters                                               |
| ----------------------- | -------------------------- | -------------------------------------------------------- |
| `agent_card_view`       | Agent card enters viewport | `agent_name: string`                                     |
| `agent_card_expand`     | Click to see details       | `agent_name: string`                                     |
| `agent_demo_request`    | Click "Book Demo"          | `agent_name: string, price_model: one-time\|monthly`     |
| `agent_purchase_click`  | Click "Get Agent"          | `agent_name: string, price: number, price_model: string` |
| `comparison_table_view` | Table enters viewport      | —                                                        |
| `filter_applied`        | Use filter bar             | `filter_type: string, filter_value: string`              |
| `faq_expand`            | Expand FAQ item            | `question_id: string`                                    |

---

## 4. Pricing Page

**Route:** `/pricing.html` **Purpose:** Clear pricing transparency, overcome
objections, convert to inquiry

### Hero Section

| Element         | Content                                                                 |
| --------------- | ----------------------------------------------------------------------- |
| **Headline**    | "Honest Pricing. No Surprises."                                         |
| **Subheadline** | "What you see is what you pay. No hidden fees, no scope creep charges." |
| **Trust Badge** | "💰 30-Day Money-Back Guarantee on Everything"                          |

### Website Pricing Tiers

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           WEBSITE PACKAGES                                   │
├─────────────────────┬─────────────────────┬─────────────────────────────────┤
│       STARTER       │    PROFESSIONAL     │           ENTERPRISE            │
│       €1,499        │       €2,499        │             €4,999              │
│                     │    ★ POPULAR ★      │                                 │
├─────────────────────┼─────────────────────┼─────────────────────────────────┤
│ ✓ Up to 5 pages     │ ✓ Up to 10 pages    │ ✓ Unlimited pages               │
│ ✓ Mobile responsive │ ✓ Mobile responsive │ ✓ Mobile responsive             │
│ ✓ Basic SEO         │ ✓ Advanced SEO      │ ✓ Full SEO suite                │
│ ✓ Contact form      │ ✓ Contact form      │ ✓ Custom forms                  │
│ ✓ 1 month support   │ ✓ 3 months support  │ ✓ 6 months support              │
│ ✓ GDPR compliance   │ ✓ GDPR compliance   │ ✓ GDPR compliance               │
│                     │ ✓ 1 AI Agent        │ ✓ 2 AI Agents                   │
│                     │ ✓ Analytics setup   │ ✓ Analytics + Dashboard         │
│                     │                     │ ✓ Priority support              │
│                     │                     │ ✓ Dedicated Slack channel       │
├─────────────────────┼─────────────────────┼─────────────────────────────────┤
│     3 weeks         │      3 weeks        │           4 weeks               │
│  [Get Started →]    │   [Get Started →]   │      [Contact Us →]             │
└─────────────────────┴─────────────────────┴─────────────────────────────────┘
```

### Agent Pricing Summary

| Agent               | One-Time | Monthly | Break-Even |
| ------------------- | -------- | ------- | ---------- |
| Email Automation    | €499     | €99/mo  | 5 months   |
| Appointment Booking | €699     | €149/mo | 5 months   |
| Customer Support    | €999     | €199/mo | 5 months   |
| Sales Qualification | €1,499   | €299/mo | 5 months   |
| Call Center         | €1,999   | €399/mo | 5 months   |
| Cold Outreach       | €999     | €199/mo | 5 months   |

**Note:** "Break-even" shows when one-time purchase becomes more cost-effective
than monthly.

**CTA:** "Browse All Agents →" → `/agents.html`

---

### Money-Back Guarantee Section

```
┌────────────────────────────────────────────────────────────────────┐
│                    💰 30-DAY MONEY-BACK GUARANTEE                  │
│                                                                    │
│   Not happy? Full refund within 30 days. No questions asked.      │
│   We believe in our work. If it doesn't work for you, you         │
│   shouldn't pay for it.                                           │
│                                                                    │
│   This applies to:                                                 │
│   ✓ All website packages                                          │
│   ✓ All AI agents (one-time and first month of subscription)      │
│   ✓ All bundles                                                   │
└────────────────────────────────────────────────────────────────────┘
```

---

### FAQ Section

**Layout:** Accordion/expandable

#### General Pricing

**Q: Are there any hidden fees?**

> No. The price quoted is the price you pay. We don't charge for:
>
> - Revisions within scope
> - Basic hosting setup help
> - Deployment
> - Training calls

**Q: What's NOT included in the base price?**

> - Third-party costs (domain, hosting, premium plugins)
> - Content writing (we can recommend partners)
> - Photography/videography
> - Ongoing maintenance after included support period

**Q: Do you offer payment plans?**

> Yes. For projects over €2,000:
>
> - 50% upfront
> - 50% on delivery For Enterprise: Custom payment terms available.

#### Website-Specific

**Q: What if I need more than 10 pages but not unlimited?**

> Additional pages are €150/page added to the Professional tier.

**Q: What CMS do you use?**

> We recommend what fits your needs:
>
> - Simple sites: Static (fastest, cheapest hosting)
> - Content-heavy: WordPress or Payload CMS
> - E-commerce: Shopify or WooCommerce

**Q: Can I edit the website myself after delivery?**

> Yes. We provide training and documentation. For CMS sites, you get full admin
> access.

#### Agent-Specific

**Q: What's the difference between one-time and monthly?**

> **One-time:** You own it. We help set up. Includes 3 months of updates.
> **Monthly:** We host, maintain, update, and support. Cancel anytime.

**Q: Can I try an agent before buying?**

> We offer 30-minute demo calls where we show the agent working with your use
> case.

**Q: What happens if I cancel a monthly subscription?**

> Your agent stops working. No data is deleted for 30 days, so you can
> reactivate.

#### Support & Maintenance

**Q: What does "support" include?**

> - Bug fixes
> - Minor text/image updates
> - Technical questions
> - NOT included: New features, redesigns, major changes

**Q: What happens after the support period ends?**

> Optional maintenance plans:
>
> - Basic: €99/mo (bug fixes, security updates)
> - Standard: €199/mo (+ minor updates, priority response)
> - Premium: €399/mo (+ feature additions, same-day response)

---

### Sections

#### Trust Builders

**3-column layout:**

| Element             | Content                                                |
| ------------------- | ------------------------------------------------------ |
| **No Contracts**    | "Month-to-month on subscriptions. Cancel anytime."     |
| **Real Humans**     | "Questions? Email us directly. No chatbot runaround."  |
| **GDPR by Default** | "All solutions built with EU data protection in mind." |

#### Final CTA

- **Headline:** "Still Have Questions?"
- **Body:** "We're happy to explain anything. No pressure, no sales tactics."
- **Primary CTA:** "Get a Custom Quote →" → `/contact.html`
- **Secondary:** "Or email: hello@acaistack.com"

---

### SEO Meta

```html
<title>
  Pricing | Websites from €1,499 | AI Agents from €99/mo | AcaiStack
</title>
<meta
  name="description"
  content="Transparent pricing for AI websites and agents. Website packages: €1,499-€4,999. AI agents: €99-€399/mo or one-time purchase. 30-day money-back guarantee."
/>
<meta
  name="keywords"
  content="AI website pricing, AI agent pricing, web development cost Germany, business automation pricing"
/>

<!-- Open Graph -->
<meta
  property="og:title"
  content="AcaiStack Pricing — Transparent. No Hidden Fees."
/>
<meta
  property="og:description"
  content="Websites from €1,499. AI agents from €99/mo. 30-day money-back guarantee on everything."
/>
<meta property="og:image" content="/assets/og/pricing-og.jpg" />

<!-- Pricing Schema -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "PriceSpecification",
    "name": "Website Development Services",
    "priceCurrency": "EUR",
    "minPrice": "1499",
    "maxPrice": "4999"
  }
</script>
```

### GA4 Events

| Event Name               | Trigger                       | Parameters                                                        |
| ------------------------ | ----------------------------- | ----------------------------------------------------------------- |
| `pricing_tier_view`      | Tier card enters viewport     | `tier: starter\|professional\|enterprise`                         |
| `pricing_tier_click`     | Click "Get Started"           | `tier: string, price: number`                                     |
| `agent_pricing_view`     | Agent table enters viewport   | —                                                                 |
| `faq_expand`             | Expand FAQ item               | `category: general\|website\|agent\|support, question_id: string` |
| `guarantee_section_view` | Guarantee box enters viewport | —                                                                 |
| `quote_request_click`    | Click any quote CTA           | `location: string, tier: string`                                  |
| `email_link_click`       | Click email address           | `location: string`                                                |

---

## 5. Portfolio Page

**Route:** `/portfolio.html` **Purpose:** Showcase real work, build credibility,
set honest expectations

### Hero Section

| Element          | Content                                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| **Headline**     | "Real Projects. Real Results."                                                                       |
| **Subheadline**  | "We're a new team, so our portfolio is small. But every project here is real work for real clients." |
| **Honesty Note** | "No mockups. No fake projects. Just honest work."                                                    |

### Project Cards

---

#### Project 1: maximilianhaak.de

| Attribute     | Value                                          |
| ------------- | ---------------------------------------------- |
| **Type**      | Personal Portfolio Website                     |
| **Client**    | Maximilian Haak (Team Member)                  |
| **URL**       | [maximilianhaak.de](https://maximilianhaak.de) |
| **Thumbnail** | `/assets/portfolio/maximilianhaak-thumb.jpg`   |

**Description:**

> Personal portfolio for one of our founders. Clean, fast, developer-focused
> design with project showcases and blog integration.

**Tech Stack:**

- HTML5 / CSS3 / JavaScript
- GSAP animations
- Responsive design
- Performance optimized

**Highlights:**

- 95+ Lighthouse score
- < 2s load time
- Accessible (WCAG 2.1 AA)

**CTA:** "View Live Site →"

---

#### Project 2: Imkerei Feuerstein

| Attribute     | Value                                                  |
| ------------- | ------------------------------------------------------ |
| **Type**      | E-commerce Website                                     |
| **Client**    | Imkerei Feuerstein (Beekeeping Business)               |
| **URL**       | [imkerei-feuerstein.de](https://imkerei-feuerstein.de) |
| **Thumbnail** | `/assets/portfolio/imkerei-thumb.jpg`                  |

**Description:**

> E-commerce website for a local Bavarian beekeeping business. Features online
> shop for honey products, local delivery booking, and educational content about
> bees.

**Tech Stack:**

- Custom design
- E-commerce integration
- Inventory management
- Local SEO optimization

**Highlights:**

- Online shop with payment integration
- Mobile-first design
- Local SEO for Bavaria region
- GDPR-compliant checkout

**CTA:** "View Live Site →"

---

#### Honest "More Coming Soon" Section

```
┌────────────────────────────────────────────────────────────────────┐
│                      🚀 MORE COMING SOON                           │
│                                                                    │
│   We're a new team, and we're building our portfolio one          │
│   honest project at a time. Check back soon, or better yet—       │
│   let your project be our next case study.                        │
│                                                                    │
│   Current pipeline:                                                │
│   • 2 website projects in development                             │
│   • 3 AI agent implementations ongoing                            │
│                                                                    │
│   [Become Our Next Success Story →]                               │
└────────────────────────────────────────────────────────────────────┘
```

---

### Project Detail Modal/Page Template

For each project, when expanded:

```markdown
## [Project Name]

### The Challenge

[2-3 sentences about what the client needed]

### Our Solution

[2-3 sentences about what we built]

### Results

- Metric 1
- Metric 2
- Client quote (if available)

### Tech Stack

[List of technologies]

### Timeline

[How long it took]

[View Live Site →] [Back to Portfolio]
```

---

### Testimonials Section (When Available)

**Placeholder:**

```
┌────────────────────────────────────────────────────────────────────┐
│                    📝 CLIENT TESTIMONIALS                          │
│                                                                    │
│   Coming soon. We're collecting feedback from our first           │
│   clients. No fake testimonials here—only real words from         │
│   real people.                                                     │
│                                                                    │
│   Want to be featured? Complete a project with us!                │
└────────────────────────────────────────────────────────────────────┘
```

---

### Final CTA Section

- **Headline:** "Ready to Be Our Next Project?"
- **Body:** "We take on a limited number of projects to ensure quality. Let's
  talk about yours."
- **Primary CTA:** "Start Your Project →" → `/contact.html`
- **Secondary:** "View Our Services →" → `/services.html`

---

### SEO Meta

```html
<title>Portfolio | Real AI & Web Projects | AcaiStack</title>
<meta
  name="description"
  content="View real projects by AcaiStack: maximilianhaak.de personal portfolio, Imkerei Feuerstein e-commerce. Honest work from a small Bavarian AI team."
/>
<meta
  name="keywords"
  content="web development portfolio, AI projects, Bavaria web agency portfolio, German developer portfolio"
/>

<!-- Open Graph -->
<meta
  property="og:title"
  content="AcaiStack Portfolio — Real Projects, Real Results"
/>
<meta
  property="og:description"
  content="Our honest portfolio of web and AI projects. No mockups, no fake work."
/>
<meta property="og:image" content="/assets/og/portfolio-og.jpg" />

<!-- Creative Work Schema -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AcaiStack Portfolio",
    "description": "Collection of real web and AI projects",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "WebSite",
            "name": "maximilianhaak.de",
            "url": "https://maximilianhaak.de"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "WebSite",
            "name": "Imkerei Feuerstein",
            "url": "https://imkerei-feuerstein.de"
          }
        }
      ]
    }
  }
</script>
```

### GA4 Events

| Event Name              | Trigger                      | Parameters                                      |
| ----------------------- | ---------------------------- | ----------------------------------------------- |
| `portfolio_card_view`   | Project card enters viewport | `project_name: string`                          |
| `portfolio_card_click`  | Click to expand/view details | `project_name: string`                          |
| `external_site_click`   | Click "View Live Site"       | `project_name: string, destination_url: string` |
| `coming_soon_cta_click` | Click "Become Success Story" | —                                               |
| `project_cta_click`     | Click "Start Your Project"   | `location: string`                              |

---

## 6. Team Page

**Route:** `/team.html` **Purpose:** Build trust through transparency, show real
people behind the brand, reinforce "small but hungry" messaging

### Hero Section

| Element         | Content                                                                                      |
| --------------- | -------------------------------------------------------------------------------------------- |
| **Headline**    | "Small Team. Big Ambition."                                                                  |
| **Subheadline** | "We're 6 real people building real solutions. No corporate masks, no stock photos. Just us." |
| **Trust Badge** | "🇩🇪 Based in Rohrdorf, Bavaria • Building since 2022"                                        |

### Team Grid

**Layout:** 3-column grid (desktop) / 2-column (tablet) / 1-column (mobile)

---

#### Team Member 1: Maximilian H.

| Attribute | Value                             |
| --------- | --------------------------------- |
| **Photo** | `/assets/team/maximilian.jpg`     |
| **Name**  | Maximilian H.                     |
| **Age**   | 24                                |
| **Role**  | Founder & CEO, Frontend Developer |
| **Icon**  | `<i class="acai-icon-code"></i>`  |

**Bio:**

> Software Engineer since 2022. Started AcaiStack to prove that small teams can
> deliver enterprise-quality work. Obsessed with clean code, fast websites, and
> honest business.

**Skills:**

- Frontend Development (React, Vue, Vanilla JS)
- UI/UX Implementation
- Project Management

**Links:** [LinkedIn] [GitHub]

---

#### Team Member 2: Alexander H.

| Attribute | Value                              |
| --------- | ---------------------------------- |
| **Photo** | `/assets/team/alexander.jpg`       |
| **Name**  | Alexander H.                       |
| **Age**   | 21                                 |
| **Role**  | Co-Founder, Backend Developer      |
| **Icon**  | `<i class="acai-icon-server"></i>` |

**Bio:**

> Studying Informatics (5th semester) while building the backend infrastructure
> that powers our AI agents. Brings academic rigor and fresh perspectives to
> every project.

**Skills:**

- Backend Development (Node.js, Python)
- Database Architecture
- AI/ML Integration

**Links:** [LinkedIn] [GitHub]

---

#### Team Member 3: Moritz H.

| Attribute | Value                             |
| --------- | --------------------------------- |
| **Photo** | `/assets/team/moritz.jpg`         |
| **Name**  | Moritz H.                         |
| **Age**   | 20                                |
| **Role**  | Co-Founder, Full Stack Developer  |
| **Icon**  | `<i class="acai-icon-stack"></i>` |

**Bio:**

> 5+ years of coding experience. Java expert who can build anything from
> frontend interfaces to complex backend systems. The team's Swiss Army knife.

**Skills:**

- Full Stack Development
- Java Expert
- System Architecture
- DevOps

**Links:** [LinkedIn] [GitHub]

---

#### Team Member 4: Pharrel S.

| Attribute | Value                              |
| --------- | ---------------------------------- |
| **Photo** | `/assets/team/pharrel.jpg`         |
| **Name**  | Pharrel S.                         |
| **Age**   | 18                                 |
| **Role**  | Junior Developer                   |
| **Icon**  | `<i class="acai-icon-rocket"></i>` |

**Bio:**

> 1st semester student, fastest learner on the team. Proof that talent beats
> experience when you're hungry enough. Growing into a full-stack developer
> every day.

**Skills:**

- Web Development
- Quick Learner
- Problem Solving

**Links:** [LinkedIn] [GitHub]

---

#### Team Member 5: Simon W.

| Attribute | Value                                 |
| --------- | ------------------------------------- |
| **Photo** | `/assets/team/simon.jpg`              |
| **Name**  | Simon W.                              |
| **Age**   | 31                                    |
| **Role**  | Marketing Lead                        |
| **Icon**  | `<i class="acai-icon-megaphone"></i>` |

**Bio:**

> Social media veteran with years of experience building online communities.
> Knows how to tell stories that connect. The team's voice to the world.

**Skills:**

- Social Media Marketing
- Content Strategy
- Community Building
- Brand Development

**Links:** [LinkedIn]

---

#### Team Member 6: Sophie H.

| Attribute | Value                              |
| --------- | ---------------------------------- |
| **Photo** | `/assets/team/sophie.jpg`          |
| **Name**  | Sophie H.                          |
| **Age**   | 29                                 |
| **Role**  | UI/UX Designer                     |
| **Icon**  | `<i class="acai-icon-design"></i>` |

**Bio:**

> Makes things look good AND work well. Bridges the gap between beautiful design
> and practical development. Every pixel has a purpose.

**Skills:**

- UI/UX Design
- Figma & Design Systems
- User Research
- Brand Identity

**Links:** [LinkedIn] [Dribbble]

---

### Sections

#### 1. Our Culture

**Headline:** "How We Work"

**3-Column Layout:**

| Value                    | Description                                                           |
| ------------------------ | --------------------------------------------------------------------- |
| **Remote-First**         | "We work from wherever we do our best work. Rohrdorf HQ for meetups." |
| **Direct Communication** | "No managers between you and the people building your project."       |
| **Continuous Learning**  | "Half the team is still in university. We never stop learning."       |

---

#### 2. Why Small Works

**Headline:** "The Small Team Advantage"

**Content:**

```
┌────────────────────────────────────────────────────────────────────┐
│                    WHY SMALL TEAMS WIN                             │
│                                                                    │
│   ✓ Direct Access                                                  │
│     Talk to the actual developers, not account managers            │
│                                                                    │
│   ✓ Faster Decisions                                               │
│     No committee approvals. We move fast.                          │
│                                                                    │
│   ✓ Personal Investment                                            │
│     Every project is our reputation. We care.                      │
│                                                                    │
│   ✓ Transparent Communication                                      │
│     You know exactly who's working on what                         │
│                                                                    │
│   ✓ Fair Pricing                                                   │
│     No enterprise overhead = savings passed to you                 │
└────────────────────────────────────────────────────────────────────┘
```

---

#### 3. Join Us (Future Hiring)

**Headline:** "Want to Join the Team?"

**Content:**

> We're not actively hiring right now, but we're always interested in meeting
> hungry, talented people. If you share our values—honesty, quality, and
> ambition—drop us a line.

**CTA:** "Say Hello →" → `mailto:careers@acaistack.com`

---

#### 4. Final CTA Section

- **Background:** Gradient or accent color
- **Headline:** "Ready to Work With Us?"
- **Body:** "Now you know who we are. Let's talk about what we can build
  together."
- **Primary CTA:** "Start a Conversation →" → `/contact.html`
- **Secondary:** "See Our Work →" → `/portfolio.html`

---

### SEO Meta

```html
<title>Our Team | Meet the AcaiStack Developers | Bavaria</title>
<meta
  name="description"
  content="Meet the 6-person team behind AcaiStack. Real developers from Bavaria building AI websites and agents. Small team, big ambition."
/>
<meta
  name="keywords"
  content="AcaiStack team, Bavaria developers, AI startup team, web development team Germany"
/>

<!-- Open Graph -->
<meta property="og:title" content="Meet the AcaiStack Team" />
<meta
  property="og:description"
  content="6 real people building real AI solutions from Bavaria. Small team, big ambition."
/>
<meta property="og:image" content="/assets/og/team-og.jpg" />

<!-- Team Schema -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "AcaiStack Team",
    "description": "Meet our team of developers and designers",
    "mainEntity": {
      "@type": "Organization",
      "name": "AcaiStack",
      "employee": [
        {
          "@type": "Person",
          "name": "Maximilian H.",
          "jobTitle": "Founder & CEO, Frontend Developer"
        },
        {
          "@type": "Person",
          "name": "Alexander H.",
          "jobTitle": "Co-Founder, Backend Developer"
        },
        {
          "@type": "Person",
          "name": "Moritz H.",
          "jobTitle": "Co-Founder, Full Stack Developer"
        },
        {
          "@type": "Person",
          "name": "Pharrel S.",
          "jobTitle": "Junior Developer"
        },
        {
          "@type": "Person",
          "name": "Simon W.",
          "jobTitle": "Marketing Lead"
        },
        {
          "@type": "Person",
          "name": "Sophie H.",
          "jobTitle": "UI/UX Designer"
        }
      ]
    }
  }
</script>
```

### GA4 Events

| Event Name             | Trigger                         | Parameters                              |
| ---------------------- | ------------------------------- | --------------------------------------- |
| `team_member_view`     | Member card enters viewport     | `member_name: string, role: string`     |
| `team_member_click`    | Click to expand member details  | `member_name: string`                   |
| `team_social_click`    | Click social link               | `member_name: string, platform: string` |
| `culture_section_view` | Culture section enters viewport | —                                       |
| `hiring_cta_click`     | Click "Say Hello" for careers   | —                                       |
| `team_cta_click`       | Click final CTA                 | `destination: contact\|portfolio`       |

---

## 7. About Page

**Route:** `/about.html` **Purpose:** Tell the founder story, establish trust,
communicate values and mission

### Hero Section

| Element         | Content                                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------------------- |
| **Headline**    | "The Story Behind AcaiStack"                                                                            |
| **Subheadline** | "We're not a faceless agency. We're 6 people who got tired of overpriced, underwhelming web solutions." |
| **Visual**      | Team photo or illustrated timeline                                                                      |

### Sections

---

#### 1. Why We Started

**Headline:** "Why We Started" **Icon:** `<i class="acai-icon-lightbulb"></i>`

**Content:**

```
┌────────────────────────────────────────────────────────────────────┐
│   "We watched small businesses get burned by agencies.            │
│   €10,000 for a template website. 6-month timelines for           │
│   simple projects. Jargon designed to confuse, not help.          │
│                                                                    │
│   We knew we could do better. Not because we're smarter—          │
│   because we actually care about delivering value."               │
│                                                                    │
│   — Maximilian H., Founder                                         │
└────────────────────────────────────────────────────────────────────┘
```

**Supporting Points:**

- Watched friends and family overpay for mediocre websites
- Saw AI being sold as magic instead of practical tools
- Believed transparency could be a competitive advantage

---

#### 2. Our Mission

**Headline:** "Our Mission" **Icon:** `<i class="acai-icon-target"></i>`

**Content:**

> **Bring quality websites and AI solutions to small businesses at fair
> prices.**

**Mission Pillars:**

| Pillar                  | Description                                                         |
| ----------------------- | ------------------------------------------------------------------- |
| **Democratize Quality** | "Enterprise-level work shouldn't require enterprise-level budgets." |
| **Make AI Practical**   | "No buzzwords. No hype. Just AI that solves real problems."         |
| **Stay Human**          | "Technology is the tool. People are the point."                     |

---

#### 3. Our Values

**Headline:** "Our Values" **Layout:** 4-column grid (desktop) / 2x2 (tablet) /
stacked (mobile)

| Value            | Icon                                  | Description                                                                          |
| ---------------- | ------------------------------------- | ------------------------------------------------------------------------------------ |
| **Honesty**      | `<i class="acai-icon-check"></i>`     | "We tell you what we can do, what we can't, and what it costs. No hidden surprises." |
| **Quality**      | `<i class="acai-icon-star"></i>`      | "We'd rather lose a project than deliver something we're not proud of."              |
| **Speed**        | `<i class="acai-icon-lightning"></i>` | "3 weeks for a website. Not because we rush—because we're efficient."                |
| **Fair Pricing** | `<i class="acai-icon-price-tag"></i>` | "Transparent pricing. No scope creep charges. What we quote is what you pay."        |

---

#### 4. Our Journey

**Headline:** "Our Journey" **Layout:** Horizontal timeline (desktop) / Vertical
timeline (mobile)

```
2022                    2023                    2024                    2025                    2026
  │                       │                       │                       │                       │
  ▼                       ▼                       ▼                       ▼                       ▼
┌─────────┐           ┌─────────┐           ┌─────────┐           ┌─────────┐           ┌─────────┐
│ Started │           │ Learning│           │ First   │           │ First   │           │ Official│
│ Coding  │           │ AI/ML   │           │ Projects│           │ Paying  │           │ Launch  │
└─────────┘           └─────────┘           └─────────┘           │ Clients │           └─────────┘
  Max starts            Team forms,           Internal              └─────────┘             AcaiStack
  software              exploring             projects                Getting                goes
  engineering           AI agents             & learning              real                   public
```

**Timeline Details:**

| Year     | Milestone       | Description                                              |
| -------- | --------------- | -------------------------------------------------------- |
| **2022** | Started Coding  | Maximilian begins software engineering journey           |
| **2023** | Team Forms      | Alexander and Moritz join, start exploring AI            |
| **2024** | First Projects  | Internal projects, portfolio building, skill development |
| **2025** | First Clients   | Real paying customers, proof of concept                  |
| **2026** | Official Launch | AcaiStack goes public, focused on growth                 |

---

#### 5. Where We're Going

**Headline:** "Where We're Going"

**Content:**

> We're not trying to become a 500-person agency. We want to stay small, stay
> nimble, and keep doing what we do best: building great things for businesses
> that deserve better.

**Goals:**

- ✓ 20 happy clients by end of 2026
- ✓ 10 AI agents in our marketplace
- ✓ 100% client satisfaction (or money back)
- ✓ Still a team you can actually talk to

---

#### 6. Final CTA Section

- **Background:** Gradient or accent color
- **Headline:** "Work With Us"
- **Body:** "You've heard our story. Now let's write yours. We're looking for
  clients who value honesty as much as we do."
- **Primary CTA:** "Get Your Free Quote →" → `/contact.html`
- **Secondary CTA:** "Meet the Team →" → `/team.html`

---

### SEO Meta

```html
<title>About AcaiStack | Our Story & Mission | Bavaria AI Startup</title>
<meta
  name="description"
  content="Why we started AcaiStack: to bring quality AI websites and agents to small businesses at fair prices. Founded in Bavaria, driven by honesty."
/>
<meta
  name="keywords"
  content="AcaiStack about, AI startup story, Bavaria web agency, honest web development, German AI company"
/>

<!-- Open Graph -->
<meta property="og:title" content="About AcaiStack — Our Story" />
<meta
  property="og:description"
  content="6 people from Bavaria building honest AI solutions. Here's why we started."
/>
<meta property="og:image" content="/assets/og/about-og.jpg" />

<!-- Organization Schema -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About AcaiStack",
    "description": "The story behind AcaiStack, our mission, values, and journey",
    "mainEntity": {
      "@type": "Organization",
      "name": "AcaiStack",
      "foundingDate": "2022",
      "foundingLocation": {
        "@type": "Place",
        "name": "Rohrdorf, Bavaria, Germany"
      },
      "slogan": "Small Team. Big Ambition.",
      "description": "Bring quality websites and AI solutions to small businesses at fair prices."
    }
  }
</script>
```

### GA4 Events

| Event Name                | Trigger                       | Parameters                                               |
| ------------------------- | ----------------------------- | -------------------------------------------------------- |
| `story_section_view`      | Section enters viewport       | `section: why-started\|mission\|values\|journey\|future` |
| `timeline_milestone_view` | Timeline item enters viewport | `year: string, milestone: string`                        |
| `value_card_hover`        | Hover on value card           | `value: honesty\|quality\|speed\|pricing`                |
| `founder_quote_view`      | Quote block enters viewport   | —                                                        |
| `about_cta_click`         | Click any CTA                 | `destination: contact\|team, location: string`           |

---

## 8. FAQ Page

**Route:** `/faq.html` **Purpose:** Address objections, build trust, reduce
support inquiries, convert skeptics

### Hero Section

| Element         | Content                                                        |
| --------------- | -------------------------------------------------------------- |
| **Headline**    | "Got Questions? We've Got Answers."                            |
| **Subheadline** | "No corporate speak. Just straight answers to real questions." |
| **Search Bar**  | "Search FAQs..." with real-time filtering                      |

### FAQ Categories

**Layout:** Tabbed sections or anchor-linked categories

---

#### Category 1: Trust & Credibility

**Q1: Why should I trust a small team with my project?**

> Fair question. Here's why small can be better:
>
> - **Direct communication** — You talk to the people who actually build your
>   project. No account managers playing telephone.
> - **Skin in the game** — Every project is our reputation. We can't afford to
>   do bad work.
> - **Accountability** — If something goes wrong, you know exactly who to talk
>   to.
> - **30-day guarantee** — We put our money where our mouth is. Not happy? Full
>   refund.
>
> We're not asking for blind trust. Start with a small project, see how we work,
> then decide.

**Q2: You're new. How do I know you won't disappear?**

> We're registered in Germany, based in Bavaria, with real names on our website.
> We're not going anywhere. That said:
>
> - We provide full source code ownership
> - No proprietary lock-in
> - Complete documentation so you're never dependent on us
> - If we somehow disappeared, you keep everything

**Q3: Can I see references or talk to past clients?**

> We're building our client base, so references are limited. What we offer
> instead:
>
> - Live portfolio sites you can actually visit
> - 30-day money-back guarantee (you're protected)
> - Small discovery project option (test us risk-free)
>
> As we grow, client references will come. For now, we prove ourselves through
> guarantees and work quality.

**Q4: What happens if I'm not satisfied with the work?**

> Three options:
>
> 1. **Revisions** — We'll fix it. Included in our process (within scope).
> 2. **Escalation** — Talk directly to Max (founder) to resolve issues.
> 3. **Refund** — 30-day money-back guarantee. No questions asked.
>
> Our reputation matters more than any single project's revenue.

---

#### Category 2: Pricing & Payments

**Q5: What's included in the website price?**

> All website packages include:
>
> ✓ Custom design (no templates) ✓ Responsive development ✓ Basic SEO setup ✓
> GDPR compliance ✓ Contact form integration ✓ Performance optimization ✓
> Deployment to your hosting ✓ Training session ✓ Support period (1-6 months
> depending on tier)

**Q6: What's NOT included / costs extra?**

> Transparency is key. Here's what's separate:
>
> - **Domain name** (~€10-15/year)
> - **Hosting** (we recommend options from €5-50/month)
> - **Content writing** (we can recommend partners)
> - **Photography/videography** (you provide or we source)
> - **Premium plugins/integrations** (varies by need)
> - **Maintenance after support period** (optional €99-399/month)

**Q7: Are there hidden fees?**

> No. We quote a price, you pay that price. Specifically:
>
> - No "project management" fees
> - No "technology" fees
> - No "revision" fees (within scope)
> - No surprise charges at delivery
>
> If something changes during the project and costs need to adjust, we discuss
> it BEFORE doing the work.

**Q8: Do you offer payment plans?**

> Yes, for projects over €2,000:
>
> - **Standard:** 50% upfront, 50% on delivery
> - **Extended:** 33% upfront, 33% mid-project, 33% on delivery
> - **Enterprise:** Custom terms available
>
> We're flexible. Just ask.

**Q9: What payment methods do you accept?**

> - Bank transfer (SEPA)
> - Credit card (via Stripe)
> - PayPal
>
> Invoices in EUR, German VAT compliant.

---

#### Category 3: Process & Timelines

**Q10: How long does a website project take?**

> Standard timelines:
>
> | Package                 | Timeline  |
> | ----------------------- | --------- |
> | Starter (5 pages)       | 2-3 weeks |
> | Professional (10 pages) | 3-4 weeks |
> | Enterprise (unlimited)  | 4-6 weeks |
>
> Rush delivery available for +25% (if our schedule allows).

**Q11: What if I need changes after the project is done?**

> Depends on when and what:
>
> **During support period (1-6 months):**
>
> - Bug fixes: Included
> - Minor updates: Included
> - New features: Quoted separately
>
> **After support period:**
>
> - Maintenance plan (€99-399/month), or
> - Pay-per-request basis
>
> You also receive full documentation to make changes yourself or with another
> developer.

**Q12: How do revisions work?**

> Our process includes built-in revision rounds:
>
> 1. **Design phase:** 2 revision rounds on mockups
> 2. **Development phase:** Unlimited bug fixes, 1 round of feedback changes
> 3. **Pre-launch:** Final review and adjustments
>
> "Revisions" means changes within the original scope. New features or scope
> additions are quoted separately.

**Q13: What do I need to provide?**

> To start:
>
> - Access to domain registrar (or we help you buy one)
> - Hosting access (or we recommend options)
> - Content: text, images, logos
> - 30-minute discovery call availability
>
> Don't have content ready? We can work in phases or recommend content partners.

---

#### Category 4: Technical & Hosting

**Q14: Do you provide hosting?**

> We don't host directly, but we:
>
> - Recommend hosting based on your needs and budget
> - Set up deployment pipelines
> - Provide documentation for your hosting
>
> **Our recommendations:**
>
> - Simple sites: Netlify, Vercel (free-€20/month)
> - CMS sites: DigitalOcean, Hetzner (€5-30/month)
> - High-traffic: Cloudflare, AWS (varies)

**Q15: What about maintenance and updates?**

> Post-launch options:
>
> | Plan     | Price   | Includes                                   |
> | -------- | ------- | ------------------------------------------ |
> | Basic    | €99/mo  | Bug fixes, security updates                |
> | Standard | €199/mo | + Minor content updates, priority response |
> | Premium  | €399/mo | + Feature additions, same-day response     |
>
> Or pay per request: €75/hour for ad-hoc work.

**Q16: What technologies do you use?**

> Depends on project needs:
>
> - **Simple sites:** HTML, CSS, JavaScript, Tailwind, GSAP
> - **React/Vue apps:** Next.js, Nuxt, Vite
> - **CMS:** WordPress, Payload CMS, Strapi
> - **E-commerce:** Shopify, WooCommerce
> - **AI Agents:** Python, Node.js, OpenAI API, custom models
>
> We recommend what fits YOUR needs, not what's trendy.

**Q17: Will I own the code?**

> Yes. 100%. You receive:
>
> - Full source code (no obfuscation)
> - Admin access to everything
> - Documentation
> - No proprietary lock-in
>
> It's your project. You own it completely.

---

#### Category 5: Refunds & Guarantees

**Q18: What's your money-back guarantee policy?**

> **30-day satisfaction guarantee** on all services:
>
> **Websites:**
>
> - If you're not happy within 30 days of launch, full refund
> - You keep any completed work (we trust you to be fair)
>
> **AI Agents (one-time):**
>
> - 30-day money-back if the agent doesn't work for your use case
>
> **AI Agents (monthly):**
>
> - First month is effectively a trial
> - Cancel anytime, no refund on partial months
>
> **Exclusions:**
>
> - Third-party costs (hosting, domains, plugins already purchased)
> - Work done after 30-day period

**Q19: What if the project fails or you can't deliver?**

> If we can't complete what we promised:
>
> - Full refund of any unused payments
> - You keep all completed work
> - We help transition to another developer if needed
>
> This has never happened, and we plan to keep it that way.

---

#### Category 6: Support & Communication

**Q20: How do you communicate during projects?**

> Your choice:
>
> - **Email:** Default for async communication
> - **Slack/Discord:** Real-time for active projects (shared channel)
> - **Video calls:** Scheduled check-ins (Zoom, Google Meet)
>
> We respond within 24 hours on business days. Often faster.

**Q21: What are your working hours?**

> We're based in Bavaria, Germany (CET/CEST):
>
> - Monday-Friday: 9:00 - 18:00
> - Weekends: Emergency support only (for premium maintenance clients)
>
> We work with international clients and can accommodate some timezone
> flexibility.

**Q22: Do you speak English?**

> Yes. Fluent English and native German. All documentation available in both.

**Q23: How do I get support after launch?**

> Depends on your plan:
>
> 1. **Included support period:** Email us directly
> 2. **Maintenance plan:** Dedicated support channel (email or Slack)
> 3. **No plan:** Email for quotes on individual requests
>
> We don't leave you hanging.

---

### Didn't Find Your Answer?

```
┌────────────────────────────────────────────────────────────────────┐
│                    📫 STILL HAVE QUESTIONS?                        │
│                                                                    │
│   Can't find what you're looking for? We're happy to help.        │
│                                                                    │
│   [Send Us a Message →]        or email: hello@acaistack.com      │
│                                                                    │
│   We respond within 24 hours. Usually faster.                      │
└────────────────────────────────────────────────────────────────────┘
```

---

### SEO Meta

```html
<title>FAQ | Common Questions About AcaiStack Services</title>
<meta
  name="description"
  content="Get answers about AcaiStack: pricing, guarantees, process, support, and more. No corporate speak—just straight answers to real questions."
/>
<meta
  name="keywords"
  content="AcaiStack FAQ, AI website questions, web development FAQ, AI agent questions, Bavaria agency FAQ"
/>

<!-- Open Graph -->
<meta property="og:title" content="AcaiStack FAQ — Your Questions Answered" />
<meta
  property="og:description"
  content="Common questions about our services, pricing, guarantees, and process. Straight answers, no BS."
/>
<meta property="og:image" content="/assets/og/faq-og.jpg" />

<!-- FAQ Schema -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why should I trust a small team with my project?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Direct communication with developers, accountability, 30-day money-back guarantee, and every project builds our reputation."
        }
      },
      {
        "@type": "Question",
        "name": "Are there hidden fees?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. We quote a price, you pay that price. No project management fees, no technology fees, no surprise charges."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a website project take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "2-3 weeks for Starter (5 pages), 3-4 weeks for Professional (10 pages), 4-6 weeks for Enterprise."
        }
      },
      {
        "@type": "Question",
        "name": "What's your money-back guarantee policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "30-day satisfaction guarantee on all services. Not happy within 30 days of launch? Full refund."
        }
      }
    ]
  }
</script>
```

### GA4 Events

| Event Name              | Trigger                   | Parameters                                                       |
| ----------------------- | ------------------------- | ---------------------------------------------------------------- |
| `faq_category_click`    | Click category tab        | `category: trust\|pricing\|process\|technical\|refunds\|support` |
| `faq_question_expand`   | Expand question           | `question_id: string, category: string`                          |
| `faq_search`            | Use search bar            | `search_term: string, results_count: number`                     |
| `faq_search_no_results` | Search returns 0          | `search_term: string`                                            |
| `faq_helpful_click`     | Click "Was this helpful?" | `question_id: string, helpful: yes\|no`                          |
| `faq_contact_click`     | Click "Send Us a Message" | —                                                                |
| `faq_email_click`       | Click email address       | —                                                                |

---

## 9. Blog Index Page

**Route:** `/blog.html` or `/blog/index.html` **Purpose:** Establish thought
leadership, SEO content hub, newsletter growth, keep visitors engaged

### Hero Section

| Element         | Content                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------- |
| **Headline**    | "Learn. Build. Grow."                                                                         |
| **Subheadline** | "Practical insights on AI, web development, and growing your business. No fluff, just value." |
| **Background**  | Subtle gradient or pattern                                                                    |

### Navigation

**Category Pills:** (Horizontal scrollable on mobile)

```
[All] [AI Agents] [Web Development] [Business Tips] [Tutorials] [Case Studies]
```

---

### Sections

#### 1. Featured Posts

**Layout:** 1 large card + 2 smaller cards (desktop) / stacked (mobile)

**Featured Post Card:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [FEATURED IMAGE]                                                            │
│                                                                             │
│ Category: AI Agents                                           Jan 5, 2026  │
│                                                                             │
│ How We Built a Customer Support Agent That Actually Works                   │
│                                                                             │
│ A deep dive into building AI support that doesn't frustrate your           │
│ customers. Real lessons from real implementations.                          │
│                                                                             │
│ [Read More →]                                          ⏱️ 8 min read       │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Secondary Featured Cards:** 2 smaller cards with thumbnail, title, date, read
time

---

#### 2. Latest Posts Grid

**Layout:** 3-column grid (desktop) / 2-column (tablet) / 1-column (mobile)
**Pagination:** 9 posts per page, load more button or numbered pagination

**Post Card Template:**

```
┌───────────────────────────┐
│ [THUMBNAIL IMAGE]         │
├───────────────────────────┤
│ AI Agents • Jan 3, 2026   │
│                           │
│ Post Title Goes Here      │
│                           │
│ Brief excerpt of the post │
│ content goes here...      │
│                           │
│ [Read More] ⏱️ 5 min     │
└───────────────────────────┘
```

---

#### 3. Newsletter Signup (Inline)

**Position:** After first 3 posts in grid

```
┌────────────────────────────────────────────────────────────────────┐
│              📬 WEEKLY AI & WEB INSIGHTS                           │
│                                                                    │
│  Get practical tips delivered every Friday.                        │
│  No spam. Unsubscribe anytime.                                     │
│                                                                    │
│  [Email address        ] [Subscribe →]                             │
│                                                                    │
│  500+ subscribers already learning with us                         │
└────────────────────────────────────────────────────────────────────┘
```

---

#### 4. Sidebar (Desktop Only)

**Sticky sidebar containing:**

**a) Search**

```
[🔍 Search articles...]
```

**b) Categories**

```
Categories
─────────────────
AI Agents (12)
Web Development (8)
Business Tips (6)
Tutorials (4)
Case Studies (3)
```

**c) Popular Tags**

```
Popular Tags
─────────────────
#automation  #no-code  #ai-tools
#web-design  #seo  #small-business
#javascript  #python  #startup
```

**d) Newsletter (Repeat)**

```
📬 Weekly Insights
[Email] [Subscribe]
```

---

#### 5. Content Categories Description

| Category            | Description                                                                          | Icon                                  |
| ------------------- | ------------------------------------------------------------------------------------ | ------------------------------------- |
| **AI Agents**       | "Deep dives into AI automation, agent development, and practical AI implementations" | `<i class="acai-icon-robot"></i>`     |
| **Web Development** | "Modern web dev techniques, performance optimization, and best practices"            | `<i class="acai-icon-code"></i>`      |
| **Business Tips**   | "Practical advice for small businesses navigating digital transformation"            | `<i class="acai-icon-briefcase"></i>` |
| **Tutorials**       | "Step-by-step guides you can actually follow"                                        | `<i class="acai-icon-book"></i>`      |
| **Case Studies**    | "Real projects, real results, real lessons learned"                                  | `<i class="acai-icon-chart"></i>`     |

---

#### 6. Placeholder State (Initial Launch)

```
┌────────────────────────────────────────────────────────────────────┐
│                    🚀 BLOG LAUNCHING SOON                          │
│                                                                    │
│   We're working on quality content worth reading.                  │
│   Subscribe to be notified when we launch.                         │
│                                                                    │
│   Coming topics:                                                   │
│   • How AI Agents Actually Work (No Buzzwords)                     │
│   • Website Performance: A Real-World Guide                        │
│   • Small Business AI: What's Worth It?                            │
│   • Our Development Process Explained                              │
│                                                                    │
│   [Subscribe for Updates →]                                        │
└────────────────────────────────────────────────────────────────────┘
```

---

### SEO Meta

```html
<title>Blog | AI & Web Development Insights | AcaiStack</title>
<meta
  name="description"
  content="Practical insights on AI agents, web development, and small business growth. No fluff, just value. From the AcaiStack team in Bavaria."
/>
<meta
  name="keywords"
  content="AI blog, web development blog, AI agents tutorials, small business AI, German tech blog"
/>

<!-- Open Graph -->
<meta property="og:title" content="AcaiStack Blog — Learn. Build. Grow." />
<meta
  property="og:description"
  content="Practical AI and web development insights from a small team in Bavaria."
/>
<meta property="og:image" content="/assets/og/blog-og.jpg" />
<meta property="og:type" content="blog" />

<!-- Blog Schema -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "AcaiStack Blog",
    "description": "Practical insights on AI agents, web development, and small business growth",
    "url": "https://acaistack.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "AcaiStack",
      "logo": "https://acaistack.com/assets/logo.svg"
    }
  }
</script>
```

### GA4 Events

| Event Name               | Trigger                | Parameters                                              |
| ------------------------ | ---------------------- | ------------------------------------------------------- |
| `blog_category_click`    | Click category pill    | `category: string`                                      |
| `blog_post_click`        | Click post card        | `post_id: string, post_title: string, category: string` |
| `blog_search`            | Use search bar         | `search_term: string, results_count: number`            |
| `newsletter_signup`      | Submit email           | `location: inline\|sidebar`                             |
| `newsletter_signup_fail` | Email validation fails | `error_type: string`                                    |
| `sidebar_tag_click`      | Click popular tag      | `tag: string`                                           |
| `blog_pagination_click`  | Navigate pages         | `page_number: number`                                   |
| `blog_load_more`         | Click load more        | `posts_loaded: number`                                  |
| `featured_post_click`    | Click featured post    | `post_id: string`                                       |

---

## 10. Contact Page

**Route:** `/contact.html` **Purpose:** Convert visitors to leads, qualify
prospects, provide easy communication path

### Hero Section

| Element           | Content                                                                      |
| ----------------- | ---------------------------------------------------------------------------- |
| **Headline**      | "Let's Build Something Together"                                             |
| **Subheadline**   | "No sales calls, no pressure. Just a real conversation about what you need." |
| **Promise Badge** | "⚡ We respond within 24 hours"                                              |

### Main Content Layout

**Desktop:** 2-column (60% form, 40% info) **Mobile:** Stacked (form first)

---

### Contact Form

**Form ID:** `contact-form`

#### Form Fields

| Field                | Type     | Required | Options/Validation     |
| -------------------- | -------- | -------- | ---------------------- |
| **Full Name**        | Text     | ✓        | Min 2 characters       |
| **Email**            | Email    | ✓        | Valid email format     |
| **Company Name**     | Text     | ○        | Optional               |
| **Budget Range**     | Select   | ✓        | Dropdown options below |
| **Timeline**         | Select   | ✓        | Dropdown options below |
| **Service Interest** | Select   | ✓        | Dropdown options below |
| **Message**          | Textarea | ✓        | Min 20 characters      |
| **Privacy Consent**  | Checkbox | ✓        | GDPR consent           |

#### Dropdown Options

**Budget Range:**

```
- Please select...
- €1,000 - €2,000
- €2,000 - €5,000
- €5,000 - €10,000
- €10,000+
- Not sure yet
```

**Timeline:**

```
- Please select...
- ASAP (Rush possible)
- Within 1 month
- 2-3 months
- Just exploring options
```

**Service Interest:**

```
- Please select...
- Website (New)
- Website (Redesign)
- AI Agent (Pre-built)
- AI Agent (Custom)
- Website + AI Bundle
- Other / Not sure
```

#### Form Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│ LET'S TALK                                                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ Full Name *                                                         │
│ [                                                               ]   │
│                                                                     │
│ Email *                                                             │
│ [                                                               ]   │
│                                                                     │
│ Company Name (optional)                                             │
│ [                                                               ]   │
│                                                                     │
│ Budget Range *                        Timeline *                    │
│ [Please select...        ▼]           [Please select...        ▼]  │
│                                                                     │
│ Service Interest *                                                  │
│ [Please select...                                              ▼]   │
│                                                                     │
│ Your Message *                                                      │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Tell us about your project. What are you looking to build?     │ │
│ │ What problems are you trying to solve?                         │ │
│ │                                                                 │ │
│ │                                                                 │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ [✓] I agree to the Privacy Policy and consent to being contacted   │
│     regarding my inquiry.                                           │
│                                                                     │
│                                       [Send Message →]              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Contact Information Sidebar

```
┌─────────────────────────────────────┐
│ CONTACT INFO                        │
├─────────────────────────────────────┤
│                                     │
│ 📧 Email                            │
│ hello@acaistack.com                 │
│                                     │
│ 📍 Location                         │
│ Rohrdorf, Bavaria                   │
│ Germany                             │
│                                     │
│ 🕐 Response Time                    │
│ Within 24 hours                     │
│ (usually faster)                    │
│                                     │
├─────────────────────────────────────┤
│ PREFER EMAIL?                       │
│                                     │
│ Skip the form and write to us       │
│ directly. We read every email.      │
│                                     │
│ [Email Us Directly →]               │
│ hello@acaistack.com                 │
│                                     │
├─────────────────────────────────────┤
│ CONNECT                             │
│                                     │
│ [LinkedIn] [GitHub]                 │
│                                     │
└─────────────────────────────────────┘
```

---

### Form Success State

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                           ✅                                        │
│                                                                     │
│                    MESSAGE SENT!                                    │
│                                                                     │
│     Thanks for reaching out. We've received your message and       │
│     will get back to you within 24 hours.                           │
│                                                                     │
│     Check your email ({user_email}) for a confirmation.            │
│                                                                     │
│     What happens next:                                              │
│     1. We review your project details                               │
│     2. We send you a personalized response                          │
│     3. If it's a fit, we schedule a brief call                     │
│                                                                     │
│     [Send Another Message] [Return to Home]                         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Form Error States

**Validation Errors:**

- Show inline below each field with error
- Red border on invalid fields
- Clear error message explaining what's wrong

**Submission Error:**

```
┌─────────────────────────────────────────────────────────────────────┐
│ ⚠️ Something went wrong                                            │
│                                                                     │
│ We couldn't send your message. Please try again, or email us       │
│ directly at hello@acaistack.com.                                    │
│                                                                     │
│ [Try Again] [Copy Form Data]                                        │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Sections

#### 1. What to Expect

**Below form, full-width**

```
WHAT HAPPENS AFTER YOU HIT SEND?
─────────────────────────────────

→ Within 24 hours    You'll receive a personal response (not an auto-reply)
→ Within 48 hours    If we're a fit, we'll send a custom quote
→ No obligation      No pushy follow-ups. We respect your inbox.
```

---

#### 2. FAQ Snippet

**Quick answers to common pre-contact questions**

| Question                          | Answer                                                                  |
| --------------------------------- | ----------------------------------------------------------------------- |
| **Do I need a detailed brief?**   | No. Tell us what you can. We'll ask questions to fill gaps.             |
| **How soon can you start?**       | Usually within 1-2 weeks, depending on schedule.                        |
| **Is there a minimum budget?**    | Our smallest project is €1,499. But tell us your budget—we're flexible. |
| **Do you do free consultations?** | Yes. 30-minute video call to discuss your project. No strings.          |

**CTA:** "More Questions? Check our FAQ →" → `/faq.html`

---

### SEO Meta

```html
<title>Contact AcaiStack | Get Your Free Quote</title>
<meta
  name="description"
  content="Ready to start your project? Contact AcaiStack for a free quote. We respond within 24 hours. Based in Rohrdorf, Bavaria, Germany."
/>
<meta
  name="keywords"
  content="contact AcaiStack, AI website quote, web development inquiry, Bavaria web agency contact"
/>

<!-- Open Graph -->
<meta
  property="og:title"
  content="Contact AcaiStack — Let's Build Something Together"
/>
<meta
  property="og:description"
  content="No sales pressure. Just a real conversation about your project. We respond within 24 hours."
/>
<meta property="og:image" content="/assets/og/contact-og.jpg" />

<!-- Contact Schema -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact AcaiStack",
    "description": "Get in touch to discuss your project",
    "url": "https://acaistack.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "AcaiStack",
      "email": "hello@acaistack.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Rohrdorf",
        "addressRegion": "Bavaria",
        "addressCountry": "DE"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "hello@acaistack.com",
        "availableLanguage": ["English", "German"]
      }
    }
  }
</script>
```

### GA4 Events

| Event Name                      | Trigger                      | Parameters                                          |
| ------------------------------- | ---------------------------- | --------------------------------------------------- |
| `contact_form_start`            | Focus on first form field    | —                                                   |
| `contact_form_field`            | Complete any field           | `field_name: string`                                |
| `contact_form_submit`           | Submit form                  | `budget: string, timeline: string, service: string` |
| `contact_form_success`          | Submission successful        | `budget: string, timeline: string, service: string` |
| `contact_form_error`            | Submission failed            | `error_type: string`                                |
| `contact_form_validation_error` | Field validation fails       | `field_name: string, error_type: string`            |
| `direct_email_click`            | Click email address          | `location: sidebar\|error`                          |
| `social_contact_click`          | Click social link            | `platform: linkedin\|github`                        |
| `faq_link_click`                | Click FAQ link               | —                                                   |
| `form_abandonment`              | Leave page with partial form | `fields_completed: array, last_field: string`       |

---

## Appendix: Updated Shared Components

### Updated Navigation Menu

```
Logo | Services | Agents | Pricing | Portfolio | Team | About | Blog | [Get Quote →]
```

### Updated Footer

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ AcaiStack                                                                   │
│ AI Websites & Agents from Bavaria                                           │
├─────────────────────┬─────────────────────┬─────────────────────────────────┤
│ SERVICES            │ COMPANY             │ RESOURCES                       │
│ • Websites          │ • About Us          │ • FAQ                           │
│ • AI Agents         │ • Our Team          │ • Blog                          │
│ • Bundles           │ • Portfolio         │ • Privacy Policy                │
│ • Pricing           │ • Contact           │ • Terms of Service              │
├─────────────────────┴─────────────────────┴─────────────────────────────────┤
│ CONTACT                                                                     │
│ hello@acaistack.com • Rohrdorf, Bavaria, Germany • [LinkedIn] [GitHub]     │
├─────────────────────────────────────────────────────────────────────────────┤
│ © 2026 AcaiStack | Impressum | Datenschutz | Built with ☕ in Bavaria       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Appendix: Shared Components

### Navigation Menu

```
Logo | Services | Agents | Pricing | Portfolio | [Get Quote →]
```

- Logo links to `/`
- "Get Quote" is primary CTA button (accent color)

### Footer

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ AcaiStack                                                                   │
│ AI Websites & Agents from Bavaria                                           │
├─────────────────────┬─────────────────────┬─────────────────────────────────┤
│ SERVICES            │ COMPANY             │ CONTACT                         │
│ • Websites          │ • About Us          │ hello@acaistack.com             │
│ • AI Agents         │ • Portfolio         │ Bavaria, Germany                │
│ • Bundles           │ • Blog (soon)       │                                 │
│ • Pricing           │                     │ [LinkedIn] [GitHub]             │
├─────────────────────┴─────────────────────┴─────────────────────────────────┤
│ © 2026 AcaiStack | Impressum | Datenschutz | Built with ☕ in Bavaria       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Global GA4 Events (All Pages)

| Event Name          | Trigger           | Parameters                               |
| ------------------- | ----------------- | ---------------------------------------- |
| `page_view`         | Page load         | Standard GA4                             |
| `nav_click`         | Click nav item    | `destination: string`                    |
| `footer_link_click` | Click footer link | `link_type: string, destination: string` |
| `social_click`      | Click social icon | `platform: linkedin\|github`             |
| `scroll_depth`      | 25/50/75/100%     | `percent_scrolled: number`               |
| `time_on_page`      | 30s, 60s, 120s+   | `seconds: number`                        |

---

## Change Log

| Date       | Version | Changes                                                 |
| ---------- | ------- | ------------------------------------------------------- |
| 2026-01-07 | 1.0     | Initial specification for pages 1-5                     |
| 2026-01-07 | 2.0     | Added pages 6-10: Team, About, FAQ, Blog Index, Contact |

---

_Document maintained by AcaiStack Development Team_
