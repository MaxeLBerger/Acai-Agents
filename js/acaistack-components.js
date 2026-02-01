/**
 * AcaiStack Components JavaScript
 * Production-ready interactive components for AI Agent website
 * @module acaistack-components
 * @version 2.0.0
 */

/* ==========================================================================
   1. FAQ Accordion
   ========================================================================== */

/**
 * FAQAccordion - Accessible accordion component with single-open behavior
 * @namespace FAQAccordion
 */
const FAQAccordion = {
  /** @type {NodeListOf<Element>|null} */
  items: null,

  /**
   * Initialize the FAQ accordion
   * @returns {void}
   */
  init() {
    this.items = document.querySelectorAll('.faq-item');
    if (!this.items.length) return;

    this.items.forEach((item) => {
      const question = item.querySelector('.faq-question');
      if (!question) return;

      // Set initial ARIA attributes
      const answer = item.querySelector('.faq-answer');
      const isExpanded = item.classList.contains('active');
      question.setAttribute('aria-expanded', isExpanded.toString());
      if (answer) {
        answer.setAttribute('aria-hidden', (!isExpanded).toString());
      }

      // Click handler
      question.addEventListener('click', () => this.toggle(item));

      // Keyboard handler
      question.addEventListener('keydown', (e) => this.handleKeydown(e, item));
    });
  },

  /**
   * Toggle an accordion item
   * @param {Element} targetItem - The item to toggle
   * @returns {void}
   */
  toggle(targetItem) {
    const isCurrentlyActive = targetItem.classList.contains('active');

    // Close all items first (single-open behavior)
    this.items.forEach((item) => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      item.classList.remove('active');
      if (question) question.setAttribute('aria-expanded', 'false');
      if (answer) answer.setAttribute('aria-hidden', 'true');
    });

    // Open the target item if it wasn't already open
    if (!isCurrentlyActive) {
      const question = targetItem.querySelector('.faq-question');
      const answer = targetItem.querySelector('.faq-answer');

      targetItem.classList.add('active');
      if (question) question.setAttribute('aria-expanded', 'true');
      if (answer) answer.setAttribute('aria-hidden', 'false');
    }
  },

  /**
   * Handle keyboard navigation
   * @param {KeyboardEvent} e - The keyboard event
   * @param {Element} item - The FAQ item
   * @returns {void}
   */
  handleKeydown(e, item) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.toggle(item);
    }
  },
};

/* ==========================================================================
   2. ROI Calculator
   ========================================================================== */

/**
 * ROICalculator - Real-time ROI calculation with currency formatting
 * @namespace ROICalculator
 */
const ROICalculator = {
  /** @type {HTMLElement|null} */
  container: null,

  /** @type {HTMLInputElement|null} */
  leadsInput: null,

  /** @type {HTMLInputElement|null} */
  conversionInput: null,

  /** @type {HTMLInputElement|null} */
  dealValueInput: null,

  /** @type {Intl.NumberFormat} */
  currencyFormatter: new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }),

  /**
   * Initialize the ROI calculator
   * @returns {void}
   */
  init() {
    this.container = document.querySelector('.roi-calculator');
    if (!this.container) return;

    this.leadsInput = this.container.querySelector('[data-roi-leads]');
    this.conversionInput = this.container.querySelector('[data-roi-conversion]');
    this.dealValueInput = this.container.querySelector('[data-roi-deal-value]');

    // Bind input events
    const inputs = [this.leadsInput, this.conversionInput, this.dealValueInput];
    inputs.forEach((input) => {
      if (input) {
        input.addEventListener('input', () => this.calculate());
        // Update displayed value for range sliders
        input.addEventListener('input', (e) => this.updateSliderValue(e.target));
      }
    });

    // Initial calculation
    this.calculate();
  },

  /**
   * Update the displayed value for a slider input
   * @param {HTMLInputElement} input - The input element
   * @returns {void}
   */
  updateSliderValue(input) {
    const valueDisplay = this.container?.querySelector(
      `[data-roi-value="${input.dataset.roiLeads || input.dataset.roiConversion || input.dataset.roiDealValue}"]`
    );
    if (valueDisplay) {
      let value = input.value;
      if (input.dataset.roiDealValue !== undefined) {
        value = this.currencyFormatter.format(Number(input.value));
      } else if (input.dataset.roiConversion !== undefined) {
        value = `${input.value}%`;
      }
      valueDisplay.textContent = value;
    }
  },

  /**
   * Calculate ROI based on current inputs
   * @returns {void}
   */
  calculate() {
    const leads = Number(this.leadsInput?.value) || 0;
    const conversion = Number(this.conversionInput?.value) || 0;
    const dealValue = Number(this.dealValueInput?.value) || 0;

    // Current revenue calculation
    const currentRevenue = leads * (conversion / 100) * dealValue;

    // Projected revenue with 30% improvement
    const improvementRate = 0.3;
    const projectedRevenue = currentRevenue * (1 + improvementRate);

    // Additional revenue gained
    const additionalRevenue = projectedRevenue - currentRevenue;

    // Update result displays
    this.updateResult('current-revenue', this.currencyFormatter.format(currentRevenue));
    this.updateResult('projected-revenue', this.currencyFormatter.format(projectedRevenue));
    this.updateResult('additional-revenue', this.currencyFormatter.format(additionalRevenue));
    this.updateResult('improvement-rate', `+${Math.round(improvementRate * 100)}%`);
  },

  /**
   * Update a result element
   * @param {string} key - The data attribute key
   * @param {string} value - The formatted value
   * @returns {void}
   */
  updateResult(key, value) {
    const element = this.container?.querySelector(`[data-roi-result="${key}"]`);
    if (element) {
      element.textContent = value;
    }
  },
};

/* ==========================================================================
   3. Testimonial Carousel
   ========================================================================== */

/**
 * TestimonialCarousel - Auto-playing carousel with touch support
 * @namespace TestimonialCarousel
 */
const TestimonialCarousel = {
  /** @type {HTMLElement|null} */
  container: null,

  /** @type {HTMLElement|null} */
  track: null,

  /** @type {NodeListOf<Element>|null} */
  slides: null,

  /** @type {NodeListOf<Element>|null} */
  dots: null,

  /** @type {HTMLButtonElement|null} */
  prevBtn: null,

  /** @type {HTMLButtonElement|null} */
  nextBtn: null,

  /** @type {number} */
  currentIndex: 0,

  /** @type {number|null} */
  autoplayInterval: null,

  /** @type {number} */
  autoplayDelay: 5000,

  /** @type {boolean} */
  isPaused: false,

  /** @type {number} */
  touchStartX: 0,

  /** @type {number} */
  touchEndX: 0,

  /** @type {number} */
  minSwipeDistance: 50,

  /**
   * Initialize the testimonial carousel
   * @returns {void}
   */
  init() {
    this.container = document.querySelector('.testimonial-carousel');
    if (!this.container) return;

    this.track = this.container.querySelector('.testimonial-carousel-slides');
    this.slides = this.container.querySelectorAll('.testimonial-slide');
    this.dots = this.container.querySelectorAll('.testimonial-nav-dot');
    this.prevBtn = this.container.querySelector('.testimonial-nav-arrow[data-direction="prev"]');
    this.nextBtn = this.container.querySelector('.testimonial-nav-arrow[data-direction="next"]');

    if (!this.slides?.length) return;

    // Bind navigation events
    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());

    // Bind dot navigation
    this.dots?.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goTo(index));
    });

    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.pause());
    this.container.addEventListener('mouseleave', () => this.resume());

    // Touch support
    this.container.addEventListener('touchstart', (e) => this.handleTouchStart(e), {
      passive: true,
    });
    this.container.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });

    // Keyboard support
    this.container.addEventListener('keydown', (e) => this.handleKeydown(e));

    // Start autoplay
    this.startAutoplay();

    // Initial state
    this.updateUI();
  },

  /**
   * Go to previous slide
   * @returns {void}
   */
  prev() {
    const newIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.slides.length - 1;
    this.goTo(newIndex);
  },

  /**
   * Go to next slide
   * @returns {void}
   */
  next() {
    const newIndex = this.currentIndex < this.slides.length - 1 ? this.currentIndex + 1 : 0;
    this.goTo(newIndex);
  },

  /**
   * Go to a specific slide
   * @param {number} index - The slide index
   * @returns {void}
   */
  goTo(index) {
    if (index < 0 || index >= this.slides.length) return;

    this.currentIndex = index;
    this.updateUI();

    // Reset autoplay timer
    if (!this.isPaused) {
      this.startAutoplay();
    }
  },

  /**
   * Update the carousel UI
   * @returns {void}
   */
  updateUI() {
    // Update track position
    if (this.track) {
      this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }

    // Update dots
    this.dots?.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
      dot.setAttribute('aria-selected', (index === this.currentIndex).toString());
    });
  },

  /**
   * Start autoplay
   * @returns {void}
   */
  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, this.autoplayDelay);
  },

  /**
   * Stop autoplay
   * @returns {void}
   */
  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  },

  /**
   * Pause autoplay
   * @returns {void}
   */
  pause() {
    this.isPaused = true;
  },

  /**
   * Resume autoplay
   * @returns {void}
   */
  resume() {
    this.isPaused = false;
  },

  /**
   * Handle touch start
   * @param {TouchEvent} e - The touch event
   * @returns {void}
   */
  handleTouchStart(e) {
    this.touchStartX = e.changedTouches[0].screenX;
  },

  /**
   * Handle touch end
   * @param {TouchEvent} e - The touch event
   * @returns {void}
   */
  handleTouchEnd(e) {
    this.touchEndX = e.changedTouches[0].screenX;
    this.handleSwipe();
  },

  /**
   * Handle swipe gesture
   * @returns {void}
   */
  handleSwipe() {
    const distance = this.touchStartX - this.touchEndX;

    if (Math.abs(distance) >= this.minSwipeDistance) {
      if (distance > 0) {
        this.next(); // Swipe left
      } else {
        this.prev(); // Swipe right
      }
    }
  },

  /**
   * Handle keyboard navigation
   * @param {KeyboardEvent} e - The keyboard event
   * @returns {void}
   */
  handleKeydown(e) {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this.prev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.next();
        break;
      default:
        // Ignore other keys
        break;
    }
  },
};

/* ==========================================================================
   4. Contact Form
   ========================================================================== */

/**
 * ContactForm - Form validation with honeypot spam protection
 * @namespace ContactForm
 */
const ContactForm = {
  /** @type {HTMLFormElement|null} */
  form: null,

  /** @type {HTMLButtonElement|null} */
  submitBtn: null,

  /** @type {Object.<string, RegExp>} */
  patterns: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
    name: /^.{2,}$/,
  },

  /**
   * Initialize the contact form
   * @returns {void}
   */
  init() {
    this.form = document.querySelector('.contact-form');
    if (!this.form) return;

    this.submitBtn = this.form.querySelector('.contact-form-submit');

    // Add honeypot field if not present
    this.addHoneypot();

    // Bind validation on blur
    const inputs = this.form.querySelectorAll(
      '.contact-form-input, .contact-form-textarea, .contact-form-select'
    );
    inputs.forEach((input) => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });

    // Bind form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  },

  /**
   * Add honeypot field for spam protection
   * @returns {void}
   */
  addHoneypot() {
    if (this.form?.querySelector('[data-honeypot]')) return;

    const honeypot = document.createElement('div');
    honeypot.setAttribute('aria-hidden', 'true');
    honeypot.style.cssText = 'position: absolute; left: -9999px; top: -9999px;';
    honeypot.innerHTML = `
      <label for="website">Website</label>
      <input type="text" id="website" name="website" data-honeypot tabindex="-1" autocomplete="off">
    `;
    this.form?.appendChild(honeypot);
  },

  /**
   * Validate a single field
   * @param {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} field - The field to validate
   * @returns {boolean} Whether the field is valid
   */
  validateField(field) {
    const group = field.closest('.contact-form-group');
    if (!group) return true;

    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    const type = field.type || field.tagName.toLowerCase();
    const name = field.name || field.id;

    let isValid = true;
    let errorMessage = '';

    // Required check
    if (isRequired && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }
    // Email validation
    else if (type === 'email' && value && !this.patterns.email.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
    // Phone validation
    else if (type === 'tel' && value && !this.patterns.phone.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number';
    }
    // Name validation (minimum length)
    else if (name === 'name' && value && !this.patterns.name.test(value)) {
      isValid = false;
      errorMessage = 'Please enter at least 2 characters';
    }
    // Select validation
    else if (type === 'select-one' && isRequired && !value) {
      isValid = false;
      errorMessage = 'Please select an option';
    }

    // Update UI
    this.setFieldState(group, isValid, errorMessage);

    return isValid;
  },

  /**
   * Set field validation state
   * @param {HTMLElement} group - The form group element
   * @param {boolean} isValid - Whether the field is valid
   * @param {string} errorMessage - The error message to display
   * @returns {void}
   */
  setFieldState(group, isValid, errorMessage) {
    group.classList.remove('success', 'error');

    if (isValid) {
      const input = group.querySelector(
        '.contact-form-input, .contact-form-textarea, .contact-form-select'
      );
      if (input?.value.trim()) {
        group.classList.add('success');
      }
    } else {
      group.classList.add('error');
      const errorEl = group.querySelector('.contact-form-error');
      if (errorEl) {
        errorEl.textContent = errorMessage;
      }
    }
  },

  /**
   * Clear field error state on input
   * @param {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} field - The field
   * @returns {void}
   */
  clearFieldError(field) {
    const group = field.closest('.contact-form-group');
    if (group?.classList.contains('error')) {
      group.classList.remove('error');
    }
  },

  /**
   * Validate all form fields
   * @returns {boolean} Whether all fields are valid
   */
  validateAll() {
    const inputs =
      this.form?.querySelectorAll(
        '.contact-form-input, .contact-form-textarea, .contact-form-select'
      ) || [];
    let allValid = true;

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        allValid = false;
      }
    });

    return allValid;
  },

  /**
   * Check honeypot field
   * @returns {boolean} Whether the honeypot is empty (valid submission)
   */
  checkHoneypot() {
    const honeypot = this.form?.querySelector('[data-honeypot]');
    return !honeypot?.value;
  },

  /**
   * Handle form submission
   * @param {SubmitEvent} e - The submit event
   * @returns {Promise<void>}
   */
  async handleSubmit(e) {
    e.preventDefault();

    // Check honeypot
    if (!this.checkHoneypot()) {
      console.warn('Spam submission detected');
      return;
    }

    // Validate all fields
    if (!this.validateAll()) {
      this.dispatchEvent('contact-form-error', { reason: 'validation' });
      return;
    }

    // Set loading state
    this.setLoadingState(true);

    // Collect form data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());

    // Remove honeypot from data
    delete data.website;

    // Dispatch submit event
    this.dispatchEvent('contact-form-submit', { data });

    try {
      // Simulate form submission (replace with actual API call)
      await this.simulateSubmission(data);

      // Success
      this.setLoadingState(false);
      this.showSuccessMessage();
      this.dispatchEvent('contact-form-success', { data });

      // Reset form
      this.form?.reset();
      this.clearAllStates();
    } catch (error) {
      // Error
      this.setLoadingState(false);
      this.showErrorMessage(error.message);
      this.dispatchEvent('contact-form-error', { reason: 'submission', error: error.message });
    }
  },

  /**
   * Simulate form submission
   * @param {Object} _data - The form data (unused in simulation)
   * @returns {Promise<void>}
   */
  simulateSubmission(_data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success (90% of the time)
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Network error. Please try again.'));
        }
      }, 1500);
    });
  },

  /**
   * Set loading state
   * @param {boolean} isLoading - Whether the form is loading
   * @returns {void}
   */
  setLoadingState(isLoading) {
    if (this.submitBtn) {
      this.submitBtn.disabled = isLoading;
      this.submitBtn.classList.toggle('loading', isLoading);
    }
  },

  /**
   * Show success message
   * @returns {void}
   */
  showSuccessMessage() {
    this.showMessage('Thank you! Your message has been sent successfully.', 'success');
  },

  /**
   * Show error message
   * @param {string} message - The error message
   * @returns {void}
   */
  showErrorMessage(message) {
    this.showMessage(message || 'An error occurred. Please try again.', 'error');
  },

  /**
   * Show a message in the form
   * @param {string} text - The message text
   * @param {string} type - The message type ('success' or 'error')
   * @returns {void}
   */
  showMessage(text, type) {
    // Remove existing message
    const existingMessage = this.form?.querySelector('.contact-form-message');
    existingMessage?.remove();

    // Create message element
    const message = document.createElement('div');
    message.className = `contact-form-message contact-form-message-${type}`;
    message.textContent = text;
    message.style.cssText = `
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 8px;
      font-size: 0.9375rem;
      font-weight: 500;
      text-align: center;
      background: ${type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)'};
      color: ${type === 'success' ? '#22c55e' : '#ef4444'};
      border: 1px solid ${type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
    `;

    // Insert at top of form
    this.form?.prepend(message);

    // Auto-remove after 5 seconds
    setTimeout(() => message.remove(), 5000);
  },

  /**
   * Clear all field states
   * @returns {void}
   */
  clearAllStates() {
    const groups = this.form?.querySelectorAll('.contact-form-group');
    groups?.forEach((group) => {
      group.classList.remove('success', 'error');
    });
  },

  /**
   * Dispatch a custom event
   * @param {string} eventName - The event name
   * @param {Object} detail - The event detail
   * @returns {void}
   */
  dispatchEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      cancelable: true,
      detail,
    });
    this.form?.dispatchEvent(event);
  },
};

/* ==========================================================================
   Auto-initialization
   ========================================================================== */

/**
 * Initialize all components when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  FAQAccordion.init();
  ROICalculator.init();
  TestimonialCarousel.init();
  ContactForm.init();
});

/* ==========================================================================
   Make components available globally (for non-module usage)
   ========================================================================== */

if (typeof window !== 'undefined') {
  window.FAQAccordion = FAQAccordion;
  window.ROICalculator = ROICalculator;
  window.TestimonialCarousel = TestimonialCarousel;
  window.ContactForm = ContactForm;
}
