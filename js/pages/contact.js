/* ═══════════════════════════════════════════════════════════════════════════
   CONTACT PAGE - Dedicated form handling for pages/contact.html
   Validates fields, sanitizes input, shows thank-you message on success.
   Static site — no backend submission.
   ═════════════════════════════════════════════════════════════════════════ */

'use strict';

/**
 * ContactPageManager — owns the #contactForm lifecycle on the contact page.
 * It clones the form element on init so that any duplicate submit listeners
 * registered by generic scripts (e.g. app.js ContactFormManager) are removed.
 *
 * @namespace ContactPageManager
 */
const ContactPageManager = {
  /** @type {HTMLFormElement|null} */
  form: null,

  /** @type {boolean} */
  isSubmitting: false,

  /* ── Initialisation ──────────────────────────────────────────────────── */

  /**
   * Bootstrap the contact-page form handler.
   * Clones the form node to strip previously-attached listeners, then
   * re-attaches CSRF token and fresh validation / submit handlers.
   * @returns {void}
   */
  init() {
    const originalForm = document.getElementById('contactForm');
    if (!originalForm) return;

    // Clone the form to remove any listeners added by other scripts (app.js)
    this.form = /** @type {HTMLFormElement} */ (originalForm.cloneNode(true));
    originalForm.parentNode.replaceChild(this.form, originalForm);

    // Re-add CSRF token (the clone keeps the hidden input value, but ensure
    // a fresh token is present in case the original was empty)
    if (typeof CSRFManager !== 'undefined') {
      const existingToken = this.form.querySelector('input[name="csrf-token"]');
      if (existingToken) existingToken.remove();
      CSRFManager.addTokenToForm(this.form);
    }

    // Submit handler
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Real-time validation on blur, clear errors on input
    const fields = this.form.querySelectorAll('.form-input, .form-textarea');
    fields.forEach((field) => {
      field.addEventListener('blur', () => this.validateField(field));
      field.addEventListener('input', () => this.clearFieldError(field));
    });
  },

  /* ── Field-level validation ──────────────────────────────────────────── */

  /**
   * Validate a single form field and show inline feedback.
   * @param {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} field
   * @returns {boolean} Whether the field is valid
   */
  validateField(field) {
    const { name, value } = field;

    // Required check
    if (field.hasAttribute('required') && !FormValidator.validateRequired(field)) {
      FormValidator.showError(field, 'This field is required');
      return false;
    }

    // Email format
    if (name === 'email' && value.trim() && !FormValidator.validateEmail(field)) {
      FormValidator.showError(field, 'Please enter a valid email address');
      return false;
    }

    // Name minimum length
    if (name === 'name' && value.trim() && !FormValidator.validateMinLength(field, 2)) {
      FormValidator.showError(field, 'Name must be at least 2 characters');
      return false;
    }

    // Message minimum length
    if (name === 'message' && value.trim() && !FormValidator.validateMinLength(field, 10)) {
      FormValidator.showError(field, 'Please write at least 10 characters');
      return false;
    }

    // Show success indicator when the field has content
    if (value.trim()) {
      FormValidator.showSuccess(field);
    }

    return true;
  },

  /**
   * Clear the error state for a field while the user is typing.
   * @param {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} field
   * @returns {void}
   */
  clearFieldError(field) {
    const group = field.closest('.form-group');
    if (group?.classList.contains('has-error')) {
      FormValidator.clearValidation(field);
    }
  },

  /* ── Form submission ─────────────────────────────────────────────────── */

  /**
   * Handle the form submit event.
   * Validates every required field, sanitises input, then shows a
   * thank-you message (no real network request on a static site).
   * @param {SubmitEvent} event
   * @returns {void}
   */
  handleSubmit(event) {
    event.preventDefault();

    if (this.isSubmitting) return;

    // Validate all required fields
    const requiredFields = this.form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      const firstError = this.form.querySelector(
        '.has-error .form-input, .has-error .form-textarea'
      );
      if (firstError) firstError.focus();

      if (typeof AccessibilityManager !== 'undefined') {
        AccessibilityManager.announce('Please fix the errors in the form before submitting');
      }
      return;
    }

    // Collect and sanitise data
    const formData = new FormData(this.form);
    const data = {
      name: Sanitizer.sanitizeInput(formData.get('name')),
      email: Sanitizer.sanitizeInput(formData.get('email')),
      projectType: Sanitizer.sanitizeInput(formData.get('projectType') || ''),
      budget: Sanitizer.sanitizeInput(formData.get('budget') || ''),
      message: Sanitizer.sanitizeInput(formData.get('message')),
    };

    this.processSubmission(data);
  },

  /**
   * Process the (simulated) submission — show loading state, then success.
   * @param {Object} data - Sanitised form data
   * @returns {void}
   */
  processSubmission(data) {
    this.isSubmitting = true;

    const submitBtn = this.form.querySelector('button[type="submit"]');

    // Loading state
    if (typeof ButtonManager !== 'undefined' && submitBtn) {
      ButtonManager.setLoading(submitBtn, 'Sending...');
    }

    // Simulate a short network delay for natural UX
    setTimeout(() => {
      // Reset the form fields
      this.form.reset();
      this.form.querySelectorAll('.form-group').forEach((group) => {
        group.classList.remove('has-error', 'has-success');
      });

      // Show the in-form thank-you message
      this.showThankYouMessage();

      // Update button
      if (typeof ButtonManager !== 'undefined' && submitBtn) {
        ButtonManager.setSuccess(submitBtn, 'Sent!');
      }

      // Announce to screen readers
      if (typeof AccessibilityManager !== 'undefined') {
        AccessibilityManager.announce(
          'Your message has been sent successfully. Thank you for reaching out!'
        );
      }

      this.isSubmitting = false;

      // Debug log (no PII)
      console.log('[ContactPage] Form submitted', {
        nameLength: data.name.length,
        messageLength: data.message.length,
        projectType: data.projectType || '(none)',
      });
    }, 1500);
  },

  /* ── Thank-you UI ────────────────────────────────────────────────────── */

  /**
   * Replace the form with a friendly thank-you card.
   * Uses textContent throughout to prevent XSS.
   * @returns {void}
   */
  showThankYouMessage() {
    const formCard = this.form.closest('.contact-form-card');
    if (!formCard) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'contact-thank-you';
    wrapper.setAttribute('role', 'status');
    wrapper.setAttribute('aria-live', 'polite');

    const icon = document.createElement('div');
    icon.className = 'contact-thank-you-icon';
    icon.textContent = '✓';

    const heading = document.createElement('h3');
    heading.className = 'contact-thank-you-title';
    heading.textContent = 'Message Sent!';

    const text = document.createElement('p');
    text.className = 'contact-thank-you-text';
    text.textContent = "Thanks for reaching out! We'll get back to you within 24 hours.";

    const subtext = document.createElement('p');
    subtext.className = 'contact-thank-you-subtext';
    subtext.textContent = 'Check your inbox for a confirmation email.';

    const resetBtn = document.createElement('button');
    resetBtn.className = 'form-submit-btn contact-thank-you-reset';
    resetBtn.type = 'button';
    resetBtn.textContent = 'Send Another Message';
    resetBtn.setAttribute('aria-label', 'Send another message');
    resetBtn.addEventListener('click', () => this.resetToForm(formCard, wrapper));

    wrapper.appendChild(icon);
    wrapper.appendChild(heading);
    wrapper.appendChild(text);
    wrapper.appendChild(subtext);
    wrapper.appendChild(resetBtn);

    // Hide form, show thank-you
    this.form.style.display = 'none';
    formCard.appendChild(wrapper);
  },

  /**
   * Remove the thank-you card and bring the form back.
   * @param {HTMLElement} formCard  - The .contact-form-card container
   * @param {HTMLElement} thankYouEl - The thank-you element to remove
   * @returns {void}
   */
  resetToForm(formCard, thankYouEl) {
    thankYouEl.remove();
    this.form.style.display = '';

    // Ensure a fresh CSRF token is present for the next submission
    if (typeof CSRFManager !== 'undefined') {
      const existing = this.form.querySelector('input[name="csrf-token"]');
      if (existing) existing.remove();
      CSRFManager.addTokenToForm(this.form);
    }

    // Focus the first input for convenience
    const firstInput = this.form.querySelector('.form-input');
    if (firstInput) firstInput.focus();
  },
};

// ── Auto-initialise ──────────────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ContactPageManager.init());
} else {
  ContactPageManager.init();
}
