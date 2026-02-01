# AcaiStack Components Code

> Production-ready vanilla HTML/CSS/JS components No frameworks, just clean code

---

## Component 1: Money-Back Guarantee Badge

### HTML

```html
<div class="guarantee-badge">
  <span class="guarantee-badge__icon">🛡️</span>
  <div class="guarantee-badge__content">
    <strong class="guarantee-badge__title">30-Day Money-Back Guarantee</strong>
    <p class="guarantee-badge__text">
      Not satisfied? Full refund, no questions asked.
    </p>
  </div>
</div>
```

### CSS

```css
.guarantee-badge {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
}

.guarantee-badge:hover {
  background: rgba(34, 197, 94, 0.15);
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
  transform: translateY(-2px);
}

.guarantee-badge__icon {
  font-size: 2rem;
}

.guarantee-badge__title {
  display: block;
  color: #22c55e;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.guarantee-badge__text {
  color: var(--color-text-muted, #94a3b8);
  font-size: 0.875rem;
  margin: 0;
}
```

---

## Component 2: Agent Showcase Card

### HTML

```html
<article class="agent-card">
  <div class="agent-card__header">
    <span class="agent-card__icon">📧</span>
    <div>
      <h3 class="agent-card__name">Email Automation Agent</h3>
      <p class="agent-card__tagline">Your inbox, finally under control.</p>
    </div>
  </div>

  <ul class="agent-card__features">
    <li>✓ Automatically sorts and prioritizes emails</li>
    <li>✓ Drafts personalized responses in your voice</li>
    <li>✓ Schedules follow-ups so nothing slips</li>
    <li>✓ Integrates with Gmail, Outlook, and 50+ tools</li>
  </ul>

  <div class="agent-card__pricing">
    <span class="agent-card__price"
      >€99<span class="agent-card__period">/month</span></span
    >
    <span class="agent-card__or">or</span>
    <span class="agent-card__price-alt">€499 one-time</span>
  </div>

  <div class="agent-card__actions">
    <button class="agent-card__btn agent-card__btn--secondary">
      View Demo
    </button>
    <button class="agent-card__btn agent-card__btn--primary">
      Get Agent →
    </button>
  </div>
</article>
```

### CSS

```css
.agent-card {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.agent-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(6, 182, 212, 0.3);
}

.agent-card__header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.agent-card__icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.agent-card__name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text, #f8fafc);
  margin: 0 0 0.25rem;
}

.agent-card__tagline {
  color: var(--color-text-muted, #94a3b8);
  font-size: 0.875rem;
  margin: 0;
}

.agent-card__features {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.agent-card__features li {
  font-size: 0.875rem;
  color: var(--color-text-muted, #94a3b8);
}

.agent-card__pricing {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.agent-card__price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary, #06b6d4);
}

.agent-card__period {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-text-muted, #94a3b8);
}

.agent-card__or {
  color: var(--color-text-muted, #94a3b8);
  font-size: 0.875rem;
}

.agent-card__price-alt {
  font-size: 1rem;
  color: var(--color-text-muted, #94a3b8);
}

.agent-card__actions {
  display: flex;
  gap: 0.75rem;
}

.agent-card__btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-size: 0.875rem;
}

.agent-card__btn--secondary {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-text, #f8fafc);
}

.agent-card__btn--secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}

.agent-card__btn--primary {
  background: linear-gradient(
    135deg,
    var(--color-primary, #06b6d4),
    var(--color-accent, #8b5cf6)
  );
  color: white;
}

.agent-card__btn--primary:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4);
}
```

---

## Component 3: Pricing Table

### HTML

```html
<div class="pricing-grid">
  <!-- Starter -->
  <div class="pricing-card">
    <div class="pricing-card__header">
      <h3 class="pricing-card__name">Starter</h3>
      <div class="pricing-card__price">
        <span class="pricing-card__amount">€1,499</span>
      </div>
      <p class="pricing-card__desc">Perfect for small businesses</p>
    </div>
    <ul class="pricing-card__features">
      <li class="pricing-card__feature pricing-card__feature--included">
        Up to 5 pages
      </li>
      <li class="pricing-card__feature pricing-card__feature--included">
        Mobile-responsive
      </li>
      <li class="pricing-card__feature pricing-card__feature--included">
        Basic SEO setup
      </li>
      <li class="pricing-card__feature pricing-card__feature--included">
        Contact form
      </li>
      <li class="pricing-card__feature pricing-card__feature--included">
        1 month support
      </li>
      <li class="pricing-card__feature pricing-card__feature--excluded">
        AI agent
      </li>
      <li class="pricing-card__feature pricing-card__feature--excluded">
        CMS integration
      </li>
    </ul>
    <button class="pricing-card__cta">Get Starter</button>
  </div>

  <!-- Professional -->
  <div class="pricing-card pricing-card--popular">
    <span class="pricing-card__badge">Most Popular</span>
    <div class="pricing-card__header">
      <h3 class="pricing-card__name">Professional</h3>
      <div class="pricing-card__price">
        <span class="pricing-card__amount">€2,499</span>
      </div>
      <p class="pricing-card__desc">Best value for growing businesses</p>
    </div>
    <ul class="pricing-card__features">
      <li class="pricing-card__feature pricing-card__feature--included">
        Up to 10 pages
      </li>
      <li class="pricing-card__feature pricing-card__feature--included">
        Custom animations
      </li>
      <li class="pricing-card__feature pricing-card__feature--included">
        Advanced SEO
      </li>
      <li class="pricing-card__feature pricing-card__feature--included">
        1 AI agent included
      </li>
      <li class="pricing-card__feature pricing-card__feature--included">
        CMS integration
      </li>
      <li class="pricing-card__feature pricing-card__feature--included">
        3 months support
      </li>
      <li class="pricing-card__feature pricing-card__feature--excluded">
        E-commerce
      </li>
    </ul>
    <button class="pricing-card__cta pricing-card__cta--primary">
      Get Professional
    </button>
  </div>

  <!-- Enterprise -->
  <div class="pricing-card">
    <div class="pricing-card__header">
      <h3 class="pricing-card__name">Enterprise</h3>
      <div class="pricing-card__price">
        <span class="pricing-card__amount">€4,999</span>
      </div>
      <p class="pricing-card__desc">Full-featured solution</p>
    </div>
    <ul class="pricing-card__features">
      <li class="pricing-card__feature pricing-card__feature--included">
        Unlimited pages
      </li>
      <li class="pricing-card__feature pricing-card__feature--included">
        E-commerce ready
      </li>
      <li class="pricing-card__feature pricing-card__feature--included">
        2 AI agents included
      </li>
      <li class="pricing-card__feature pricing-card__feature--included">
        Custom integrations
      </li>
      <li class="pricing-card__feature pricing-card__feature--included">
        Priority support
      </li>
      <li class="pricing-card__feature pricing-card__feature--included">
        12 months support
      </li>
      <li class="pricing-card__feature pricing-card__feature--included">
        Dedicated contact
      </li>
    </ul>
    <button class="pricing-card__cta">Get Enterprise</button>
  </div>
</div>
```

### CSS

```css
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.pricing-card {
  position: relative;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.pricing-card--popular {
  border-color: var(--color-primary, #06b6d4);
  transform: scale(1.05);
  box-shadow: 0 0 40px rgba(6, 182, 212, 0.2);
}

.pricing-card__badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(
    135deg,
    var(--color-primary, #06b6d4),
    var(--color-accent, #8b5cf6)
  );
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.pricing-card__header {
  text-align: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.pricing-card__name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text, #f8fafc);
  margin: 0 0 0.5rem;
}

.pricing-card__amount {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary, #06b6d4);
}

.pricing-card__desc {
  color: var(--color-text-muted, #94a3b8);
  font-size: 0.875rem;
  margin: 0.5rem 0 0;
}

.pricing-card__features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  flex-grow: 1;
}

.pricing-card__feature {
  padding: 0.5rem 0;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pricing-card__feature--included::before {
  content: '✓';
  color: #22c55e;
  font-weight: bold;
}

.pricing-card__feature--excluded {
  color: var(--color-text-muted, #94a3b8);
  opacity: 0.5;
}

.pricing-card__feature--excluded::before {
  content: '–';
  color: var(--color-text-muted, #94a3b8);
}

.pricing-card__cta {
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: var(--color-text, #f8fafc);
}

.pricing-card__cta:hover {
  background: rgba(255, 255, 255, 0.1);
}

.pricing-card__cta--primary {
  background: linear-gradient(
    135deg,
    var(--color-primary, #06b6d4),
    var(--color-accent, #8b5cf6)
  );
  border: none;
  color: white;
}

.pricing-card__cta--primary:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4);
}

@media (max-width: 768px) {
  .pricing-card--popular {
    transform: none;
    order: -1;
  }
}
```

---

## Component 4: FAQ Accordion

### HTML

```html
<div class="faq-accordion">
  <div class="faq-item">
    <button class="faq-item__question" aria-expanded="false">
      <span>How much does a website cost?</span>
      <span class="faq-item__icon">+</span>
    </button>
    <div class="faq-item__answer">
      <p>
        Our websites range from €1,499 to €2,999 depending on complexity. A
        simple landing page or small business site starts at €1,499. More
        complex sites with custom features, integrations, or e-commerce
        functionality fall in the higher range. We'll give you an exact quote
        after understanding your needs—no surprises later.
      </p>
    </div>
  </div>

  <div class="faq-item">
    <button class="faq-item__question" aria-expanded="false">
      <span>How long does it take to build a website?</span>
      <span class="faq-item__icon">+</span>
    </button>
    <div class="faq-item__answer">
      <p>
        Most projects take 2-3 weeks from kickoff to launch. Simple sites can be
        ready in 2 weeks, while more complex builds may take 4 weeks. We'll give
        you a realistic timeline upfront and keep you updated throughout the
        process.
      </p>
    </div>
  </div>

  <div class="faq-item">
    <button class="faq-item__question" aria-expanded="false">
      <span>Do you offer a money-back guarantee?</span>
      <span class="faq-item__icon">+</span>
    </button>
    <div class="faq-item__answer">
      <p>
        Yes. If you're not satisfied with the initial design concept, we'll
        refund your deposit—no questions asked. We'd rather part ways honestly
        than force a project that isn't working.
      </p>
    </div>
  </div>
</div>
```

### CSS

```css
.faq-accordion {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.3s ease;
}

.faq-item:hover {
  border-color: rgba(6, 182, 212, 0.3);
}

.faq-item__question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background: transparent;
  border: none;
  color: var(--color-text, #f8fafc);
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
}

.faq-item__question:hover {
  background: rgba(255, 255, 255, 0.05);
}

.faq-item__icon {
  font-size: 1.5rem;
  color: var(--color-primary, #06b6d4);
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.faq-item--open .faq-item__icon {
  transform: rotate(45deg);
}

.faq-item__answer {
  max-height: 0;
  overflow: hidden;
  transition:
    max-height 0.3s ease,
    padding 0.3s ease;
}

.faq-item--open .faq-item__answer {
  max-height: 500px;
}

.faq-item__answer p {
  padding: 0 1.5rem 1.25rem;
  margin: 0;
  color: var(--color-text-muted, #94a3b8);
  line-height: 1.7;
}
```

### JavaScript

```javascript
/**
 * FAQ Accordion - Only one open at a time
 */
const FAQAccordion = {
  init() {
    const accordions = document.querySelectorAll('.faq-accordion');
    accordions.forEach((accordion) => this.setup(accordion));
  },

  setup(accordion) {
    const items = accordion.querySelectorAll('.faq-item');

    items.forEach((item) => {
      const question = item.querySelector('.faq-item__question');

      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('faq-item--open');

        // Close all items in this accordion
        items.forEach((i) => {
          i.classList.remove('faq-item--open');
          i.querySelector('.faq-item__question').setAttribute(
            'aria-expanded',
            'false'
          );
        });

        // Open clicked item if it wasn't open
        if (!isOpen) {
          item.classList.add('faq-item--open');
          question.setAttribute('aria-expanded', 'true');
        }
      });

      // Keyboard support
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
    });
  },
};

// Auto-init
document.addEventListener('DOMContentLoaded', () => FAQAccordion.init());
```

---

## Component 5: ROI Calculator

### HTML

```html
<div class="roi-calculator">
  <h3 class="roi-calculator__title">Calculate Your ROI</h3>
  <p class="roi-calculator__subtitle">
    See how much more revenue you could generate
  </p>

  <div class="roi-calculator__inputs">
    <div class="roi-calculator__field">
      <label for="leads">Monthly Leads</label>
      <input type="number" id="leads" value="100" min="1" />
    </div>
    <div class="roi-calculator__field">
      <label for="conversion">Conversion Rate (%)</label>
      <input
        type="number"
        id="conversion"
        value="5"
        min="0"
        max="100"
        step="0.1"
      />
    </div>
    <div class="roi-calculator__field">
      <label for="dealValue">Average Deal Value (€)</label>
      <input type="number" id="dealValue" value="1000" min="1" />
    </div>
  </div>

  <div class="roi-calculator__results">
    <div class="roi-calculator__result">
      <span class="roi-calculator__label">Current Monthly Revenue</span>
      <span class="roi-calculator__value" id="currentRevenue">€5,000</span>
    </div>
    <div class="roi-calculator__result roi-calculator__result--highlight">
      <span class="roi-calculator__label">With AcaiStack (+30%)</span>
      <span class="roi-calculator__value" id="projectedRevenue">€6,500</span>
    </div>
    <div class="roi-calculator__result roi-calculator__result--gain">
      <span class="roi-calculator__label">Additional Monthly Revenue</span>
      <span class="roi-calculator__value" id="additionalRevenue">+€1,500</span>
    </div>
  </div>

  <button class="roi-calculator__cta">Get This ROI →</button>
</div>
```

### CSS

```css
.roi-calculator {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
}

.roi-calculator__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text, #f8fafc);
  margin: 0 0 0.5rem;
  text-align: center;
}

.roi-calculator__subtitle {
  color: var(--color-text-muted, #94a3b8);
  text-align: center;
  margin: 0 0 2rem;
}

.roi-calculator__inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.roi-calculator__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.roi-calculator__field label {
  font-size: 0.875rem;
  color: var(--color-text-muted, #94a3b8);
}

.roi-calculator__field input {
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--color-text, #f8fafc);
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.roi-calculator__field input:focus {
  outline: none;
  border-color: var(--color-primary, #06b6d4);
}

.roi-calculator__results {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.roi-calculator__result {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.roi-calculator__label {
  font-size: 0.875rem;
  color: var(--color-text-muted, #94a3b8);
}

.roi-calculator__value {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text, #f8fafc);
}

.roi-calculator__result--highlight .roi-calculator__value {
  color: var(--color-primary, #06b6d4);
  font-size: 1.5rem;
}

.roi-calculator__result--gain .roi-calculator__value {
  color: #22c55e;
}

.roi-calculator__cta {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(
    135deg,
    var(--color-primary, #06b6d4),
    var(--color-accent, #8b5cf6)
  );
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.roi-calculator__cta:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 20px rgba(6, 182, 212, 0.4);
}
```

### JavaScript

```javascript
/**
 * ROI Calculator - Real-time calculation
 */
const ROICalculator = {
  init() {
    const calculator = document.querySelector('.roi-calculator');
    if (!calculator) return;

    const inputs = calculator.querySelectorAll('input');
    inputs.forEach((input) => {
      input.addEventListener('input', () => this.calculate(calculator));
    });

    // Initial calculation
    this.calculate(calculator);
  },

  calculate(calculator) {
    const leads = parseFloat(calculator.querySelector('#leads').value) || 0;
    const conversion =
      parseFloat(calculator.querySelector('#conversion').value) || 0;
    const dealValue =
      parseFloat(calculator.querySelector('#dealValue').value) || 0;

    const currentRevenue = leads * (conversion / 100) * dealValue;
    const improvementFactor = 1.3; // 30% improvement
    const projectedRevenue = currentRevenue * improvementFactor;
    const additionalRevenue = projectedRevenue - currentRevenue;

    calculator.querySelector('#currentRevenue').textContent =
      this.formatCurrency(currentRevenue);
    calculator.querySelector('#projectedRevenue').textContent =
      this.formatCurrency(projectedRevenue);
    calculator.querySelector('#additionalRevenue').textContent =
      '+' + this.formatCurrency(additionalRevenue);
  },

  formatCurrency(value) {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  },
};

document.addEventListener('DOMContentLoaded', () => ROICalculator.init());
```

---

## Component 6: Testimonial Carousel

### HTML

```html
<div class="testimonial-carousel">
  <div class="testimonial-carousel__track">
    <div class="testimonial-carousel__slides">
      <!-- Slide 1 -->
      <div class="testimonial-slide">
        <div class="testimonial-card">
          <span class="testimonial-card__quote-icon">"</span>
          <p class="testimonial-card__text">
            The team delivered exactly what they promised. Our new website loads
            in under 2 seconds and conversions are up 40%.
          </p>
          <div class="testimonial-card__author">
            <div class="testimonial-card__avatar">TM</div>
            <div class="testimonial-card__info">
              <h4 class="testimonial-card__name">Thomas M.</h4>
              <p class="testimonial-card__role">CEO</p>
              <p class="testimonial-card__company">TechStart GmbH</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Slide 2 -->
      <div class="testimonial-slide">
        <div class="testimonial-card">
          <span class="testimonial-card__quote-icon">"</span>
          <p class="testimonial-card__text">
            Finally, developers who communicate clearly and deliver on time. The
            AI agent handles 80% of our support tickets now.
          </p>
          <div class="testimonial-card__author">
            <div class="testimonial-card__avatar">SK</div>
            <div class="testimonial-card__info">
              <h4 class="testimonial-card__name">Sarah K.</h4>
              <p class="testimonial-card__role">Operations Manager</p>
              <p class="testimonial-card__company">Digital Solutions AG</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Slide 3 -->
      <div class="testimonial-slide">
        <div class="testimonial-card">
          <span class="testimonial-card__quote-icon">"</span>
          <p class="testimonial-card__text">
            Best investment we made this year. The booking agent saves us 15
            hours per week in admin work.
          </p>
          <div class="testimonial-card__author">
            <div class="testimonial-card__avatar">MF</div>
            <div class="testimonial-card__info">
              <h4 class="testimonial-card__name">Michael F.</h4>
              <p class="testimonial-card__role">Founder</p>
              <p class="testimonial-card__company">Praxis am See</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="testimonial-carousel__nav">
    <button
      class="testimonial-carousel__arrow testimonial-carousel__arrow--prev"
      aria-label="Previous"
    >
      ←
    </button>
    <div class="testimonial-carousel__dots">
      <button
        class="testimonial-carousel__dot testimonial-carousel__dot--active"
        aria-label="Slide 1"
      ></button>
      <button class="testimonial-carousel__dot" aria-label="Slide 2"></button>
      <button class="testimonial-carousel__dot" aria-label="Slide 3"></button>
    </div>
    <button
      class="testimonial-carousel__arrow testimonial-carousel__arrow--next"
      aria-label="Next"
    >
      →
    </button>
  </div>
</div>
```

### CSS

```css
.testimonial-carousel {
  max-width: 700px;
  margin: 0 auto;
  position: relative;
}

.testimonial-carousel__track {
  overflow: hidden;
  border-radius: 16px;
}

.testimonial-carousel__slides {
  display: flex;
  transition: transform 0.5s ease;
}

.testimonial-slide {
  min-width: 100%;
  padding: 0 1rem;
}

.testimonial-card {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  position: relative;
}

.testimonial-card__quote-icon {
  position: absolute;
  top: 1rem;
  left: 1.5rem;
  font-size: 4rem;
  color: var(--color-primary, #06b6d4);
  opacity: 0.3;
  font-family: Georgia, serif;
  line-height: 1;
}

.testimonial-card__text {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-text, #f8fafc);
  margin: 0 0 1.5rem;
  padding-top: 1rem;
}

.testimonial-card__author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.testimonial-card__avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--color-primary, #06b6d4),
    var(--color-accent, #8b5cf6)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: white;
  flex-shrink: 0;
}

.testimonial-card__name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text, #f8fafc);
  margin: 0;
}

.testimonial-card__role,
.testimonial-card__company {
  font-size: 0.875rem;
  color: var(--color-text-muted, #94a3b8);
  margin: 0;
}

.testimonial-carousel__nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.testimonial-carousel__arrow {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-text, #f8fafc);
  cursor: pointer;
  transition: all 0.2s ease;
}

.testimonial-carousel__arrow:hover {
  background: var(--color-primary, #06b6d4);
  border-color: var(--color-primary, #06b6d4);
}

.testimonial-carousel__dots {
  display: flex;
  gap: 0.5rem;
}

.testimonial-carousel__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.testimonial-carousel__dot--active {
  background: var(--color-primary, #06b6d4);
  transform: scale(1.2);
}
```

### JavaScript

```javascript
/**
 * Testimonial Carousel - Auto-play with pause on hover
 */
const TestimonialCarousel = {
  init() {
    const carousels = document.querySelectorAll('.testimonial-carousel');
    carousels.forEach((carousel) => this.setup(carousel));
  },

  setup(carousel) {
    const slides = carousel.querySelector('.testimonial-carousel__slides');
    const slideElements = carousel.querySelectorAll('.testimonial-slide');
    const dots = carousel.querySelectorAll('.testimonial-carousel__dot');
    const prevBtn = carousel.querySelector(
      '.testimonial-carousel__arrow--prev'
    );
    const nextBtn = carousel.querySelector(
      '.testimonial-carousel__arrow--next'
    );

    let currentIndex = 0;
    let autoplayInterval = null;
    const totalSlides = slideElements.length;

    const goToSlide = (index) => {
      currentIndex = (index + totalSlides) % totalSlides;
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle(
          'testimonial-carousel__dot--active',
          i === currentIndex
        );
      });
    };

    const startAutoplay = () => {
      autoplayInterval = setInterval(() => goToSlide(currentIndex + 1), 5000);
    };

    const stopAutoplay = () => {
      clearInterval(autoplayInterval);
    };

    // Event listeners
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goToSlide(i));
    });

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Touch support
    let touchStartX = 0;
    slides.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      stopAutoplay();
    });

    slides.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        goToSlide(diff > 0 ? currentIndex + 1 : currentIndex - 1);
      }
      startAutoplay();
    });

    startAutoplay();
  },
};

document.addEventListener('DOMContentLoaded', () => TestimonialCarousel.init());
```

---

## Component 7: Hero Section

### HTML

```html
<section class="hero-section">
  <div class="hero-section__bg"></div>
  <div class="hero-section__container">
    <div class="hero-section__content">
      <h1 class="hero-section__headline">
        Launch Your
        <span class="hero-section__highlight">AI-Powered Website</span> in 3
        Weeks
      </h1>
      <p class="hero-section__subhead">
        We're 3 developers in Bavaria who build fast websites with AI that
        actually works. No agency fluff, just honest work.
      </p>
      <div class="hero-section__cta-group">
        <a
          href="/pages/contact.html"
          class="hero-section__cta hero-section__cta--primary"
        >
          Get My Free Quote <span class="hero-section__arrow">→</span>
        </a>
        <a
          href="/pages/portfolio.html"
          class="hero-section__cta hero-section__cta--secondary"
        >
          See Our Work
        </a>
      </div>
      <div class="hero-section__trust">
        <div class="hero-section__trust-item">
          <span class="hero-section__trust-icon">✓</span>
          <span>30-Day Guarantee</span>
        </div>
        <div class="hero-section__trust-item">
          <span class="hero-section__trust-icon">✓</span>
          <span>1-Week Response</span>
        </div>
        <div class="hero-section__trust-item">
          <span class="hero-section__trust-icon">✓</span>
          <span>Made in Germany</span>
        </div>
      </div>
    </div>
    <div class="hero-section__visual">
      <div class="hero-section__visual-inner">
        <span class="hero-section__visual-icon">🚀</span>
      </div>
    </div>
  </div>
</section>
```

### CSS

```css
.hero-section {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  padding: 6rem 2rem;
  overflow: hidden;
}

.hero-section__bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      ellipse at 20% 50%,
      rgba(6, 182, 212, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 80% 50%,
      rgba(139, 92, 246, 0.15) 0%,
      transparent 50%
    );
  z-index: 0;
}

.hero-section__container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-section__headline {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text, #f8fafc);
  margin: 0 0 1.5rem;
}

.hero-section__highlight {
  background: linear-gradient(
    135deg,
    var(--color-primary, #06b6d4),
    var(--color-accent, #8b5cf6)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-section__subhead {
  font-size: 1.25rem;
  color: var(--color-text-muted, #94a3b8);
  line-height: 1.7;
  margin: 0 0 2rem;
}

.hero-section__cta-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.hero-section__cta {
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.hero-section__cta--primary {
  background: linear-gradient(
    135deg,
    var(--color-primary, #06b6d4),
    var(--color-accent, #8b5cf6)
  );
  color: white;
}

.hero-section__cta--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(6, 182, 212, 0.4);
}

.hero-section__cta--secondary {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-text, #f8fafc);
}

.hero-section__cta--secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}

.hero-section__arrow {
  display: inline-block;
  transition: transform 0.2s ease;
}

.hero-section__cta--primary:hover .hero-section__arrow {
  transform: translateX(4px);
}

.hero-section__trust {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.hero-section__trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text-muted, #94a3b8);
}

.hero-section__trust-icon {
  color: #22c55e;
}

.hero-section__visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-section__visual-inner {
  width: 300px;
  height: 300px;
  background: linear-gradient(
    135deg,
    rgba(6, 182, 212, 0.2),
    rgba(139, 92, 246, 0.2)
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 6s ease-in-out infinite;
}

.hero-section__visual-icon {
  font-size: 6rem;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@media (max-width: 768px) {
  .hero-section__container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-section__cta-group,
  .hero-section__trust {
    justify-content: center;
  }

  .hero-section__visual {
    order: -1;
  }

  .hero-section__visual-inner {
    width: 200px;
    height: 200px;
  }
}
```

---

## Component 8: Trust Bar

### HTML

```html
<section class="trust-bar">
  <div class="trust-bar__container">
    <div class="trust-bar__item">
      <span class="trust-bar__icon">💰</span>
      <span class="trust-bar__text">30-Day Money-Back Guarantee</span>
    </div>
    <div class="trust-bar__item">
      <span class="trust-bar__icon">📍</span>
      <span class="trust-bar__text">Local Team in Bavaria</span>
    </div>
    <div class="trust-bar__item">
      <span class="trust-bar__icon">⚡</span>
      <span class="trust-bar__text">3-Week Delivery</span>
    </div>
    <div class="trust-bar__item">
      <span class="trust-bar__icon">🛟</span>
      <span class="trust-bar__text">Free Support Included</span>
    </div>
  </div>
</section>
```

### CSS

```css
.trust-bar {
  background: rgba(6, 182, 212, 0.05);
  border-top: 1px solid rgba(6, 182, 212, 0.1);
  border-bottom: 1px solid rgba(6, 182, 212, 0.1);
  padding: 1.5rem 2rem;
}

.trust-bar__container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.trust-bar__item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  animation: subtle-float 4s ease-in-out infinite;
}

.trust-bar__item:nth-child(2) {
  animation-delay: 0.5s;
}
.trust-bar__item:nth-child(3) {
  animation-delay: 1s;
}
.trust-bar__item:nth-child(4) {
  animation-delay: 1.5s;
}

@keyframes subtle-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.trust-bar__icon {
  font-size: 1.5rem;
}

.trust-bar__text {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text, #f8fafc);
}

@media (max-width: 768px) {
  .trust-bar__container {
    gap: 1.5rem;
  }

  .trust-bar__item {
    flex-basis: calc(50% - 0.75rem);
    justify-content: center;
  }
}
```

---

## Component 9: Contact Form

### HTML

```html
<div class="contact-form">
  <div class="contact-form__header">
    <h3 class="contact-form__title">Get Your Free Quote</h3>
    <p class="contact-form__subtitle">
      Tell us about your project and we'll get back to you within 24 hours.
    </p>
  </div>

  <form class="contact-form__body" id="contactForm">
    <!-- Honeypot -->
    <div class="contact-form__honeypot" aria-hidden="true">
      <input type="text" name="website" tabindex="-1" autocomplete="off" />
    </div>

    <div class="contact-form__row">
      <div class="contact-form__field">
        <label class="contact-form__label"
          >Name <span class="contact-form__required">*</span></label
        >
        <input type="text" name="name" class="contact-form__input" required />
        <span class="contact-form__error"></span>
      </div>
      <div class="contact-form__field">
        <label class="contact-form__label"
          >Email <span class="contact-form__required">*</span></label
        >
        <input type="email" name="email" class="contact-form__input" required />
        <span class="contact-form__error"></span>
      </div>
    </div>

    <div class="contact-form__field">
      <label class="contact-form__label">Company</label>
      <input type="text" name="company" class="contact-form__input" />
    </div>

    <div class="contact-form__row">
      <div class="contact-form__field">
        <label class="contact-form__label">Budget</label>
        <select name="budget" class="contact-form__select">
          <option value="">Select budget</option>
          <option value="under-2k">Under €2,000</option>
          <option value="2k-5k">€2,000 - €5,000</option>
          <option value="5k-10k">€5,000 - €10,000</option>
          <option value="10k+">€10,000+</option>
        </select>
      </div>
      <div class="contact-form__field">
        <label class="contact-form__label">Timeline</label>
        <select name="timeline" class="contact-form__select">
          <option value="">Select timeline</option>
          <option value="asap">ASAP</option>
          <option value="1-3months">1-3 months</option>
          <option value="3-6months">3-6 months</option>
          <option value="exploring">Just exploring</option>
        </select>
      </div>
    </div>

    <div class="contact-form__field">
      <label class="contact-form__label"
        >Message <span class="contact-form__required">*</span></label
      >
      <textarea
        name="message"
        class="contact-form__textarea"
        rows="4"
        required
      ></textarea>
      <span class="contact-form__error"></span>
    </div>

    <button type="submit" class="contact-form__submit">
      <span class="contact-form__submit-text">Send Message →</span>
      <span class="contact-form__spinner"></span>
    </button>
  </form>

  <div class="contact-form__message"></div>
</div>
```

### CSS

```css
.contact-form {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.contact-form__header {
  text-align: center;
  margin-bottom: 2rem;
}

.contact-form__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text, #f8fafc);
  margin: 0 0 0.5rem;
}

.contact-form__subtitle {
  color: var(--color-text-muted, #94a3b8);
  margin: 0;
}

.contact-form__honeypot {
  position: absolute;
  left: -9999px;
}

.contact-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.contact-form__field {
  margin-bottom: 1rem;
}

.contact-form__label {
  display: block;
  font-size: 0.875rem;
  color: var(--color-text-muted, #94a3b8);
  margin-bottom: 0.5rem;
}

.contact-form__required {
  color: #ef4444;
}

.contact-form__input,
.contact-form__select,
.contact-form__textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--color-text, #f8fafc);
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.contact-form__input:focus,
.contact-form__select:focus,
.contact-form__textarea:focus {
  outline: none;
  border-color: var(--color-primary, #06b6d4);
}

.contact-form__input--error {
  border-color: #ef4444;
}

.contact-form__error {
  display: block;
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 0.25rem;
  min-height: 1rem;
}

.contact-form__submit {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(
    135deg,
    var(--color-primary, #06b6d4),
    var(--color-accent, #8b5cf6)
  );
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.contact-form__submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(6, 182, 212, 0.4);
}

.contact-form__submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.contact-form__spinner {
  display: none;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
}

.contact-form__submit--loading .contact-form__spinner {
  display: block;
}

@keyframes spin {
  to {
    transform: translateY(-50%) rotate(360deg);
  }
}

.contact-form__message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  display: none;
}

.contact-form__message--success {
  display: block;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #22c55e;
}

.contact-form__message--error {
  display: block;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

@media (max-width: 768px) {
  .contact-form__row {
    grid-template-columns: 1fr;
  }
}
```

### JavaScript

```javascript
/**
 * Contact Form - Validation & submission
 */
const ContactForm = {
  init() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => this.handleSubmit(e, form));

    // Real-time validation
    form
      .querySelectorAll('.contact-form__input, .contact-form__textarea')
      .forEach((input) => {
        input.addEventListener('blur', () => this.validateField(input));
      });
  },

  validateField(input) {
    const error = input.parentElement.querySelector('.contact-form__error');

    if (input.required && !input.value.trim()) {
      input.classList.add('contact-form__input--error');
      error.textContent = 'This field is required';
      return false;
    }

    if (input.type === 'email' && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        input.classList.add('contact-form__input--error');
        error.textContent = 'Please enter a valid email';
        return false;
      }
    }

    input.classList.remove('contact-form__input--error');
    error.textContent = '';
    return true;
  },

  async handleSubmit(e, form) {
    e.preventDefault();

    // Check honeypot
    if (form.querySelector('[name="website"]').value) {
      return; // Bot detected
    }

    // Validate all fields
    let isValid = true;
    form.querySelectorAll('[required]').forEach((input) => {
      if (!this.validateField(input)) isValid = false;
    });

    if (!isValid) return;

    const submitBtn = form.querySelector('.contact-form__submit');
    const messageEl = form.parentElement.querySelector(
      '.contact-form__message'
    );

    // Show loading
    submitBtn.disabled = true;
    submitBtn.classList.add('contact-form__submit--loading');

    try {
      // Collect form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      delete data.website; // Remove honeypot

      // Dispatch custom event for handling
      const event = new CustomEvent('contact-form-submit', {
        detail: { formData: data },
      });
      document.dispatchEvent(event);

      // Simulate API call (replace with actual endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      messageEl.className =
        'contact-form__message contact-form__message--success';
      messageEl.textContent =
        "Thank you! We'll get back to you within 24 hours.";
      form.reset();

      document.dispatchEvent(
        new CustomEvent('contact-form-success', { detail: { formData: data } })
      );
    } catch (error) {
      messageEl.className =
        'contact-form__message contact-form__message--error';
      messageEl.textContent =
        'Something went wrong. Please try again or email us directly.';

      document.dispatchEvent(
        new CustomEvent('contact-form-error', { detail: { error } })
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('contact-form__submit--loading');
    }
  },
};

document.addEventListener('DOMContentLoaded', () => ContactForm.init());
```

---

## Usage Summary

Add all CSS to `css/acaistack-components.css` and JS to
`js/acaistack-components.js`.

```html
<!-- In HTML head -->
<link rel="stylesheet" href="css/acaistack-components.css" />

<!-- Before closing body -->
<script src="js/acaistack-components.js"></script>
```

All components use these CSS variables:

- `--color-primary: #06b6d4` (teal)
- `--color-accent: #8b5cf6` (purple)
- `--color-text: #f8fafc` (light)
- `--color-text-muted: #94a3b8` (gray)
