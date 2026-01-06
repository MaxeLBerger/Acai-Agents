/* ═══════════════════════════════════════════════════════════════════════════
   ACAISTACK UTILITIES - Security, Validation, and Event Handling
   Prevent XSS, CSRF, validate inputs
   Version: 2.0.0
   Last Updated: 2026-01-06
   ═════════════════════════════════════════════════════════════════════════ */

'use strict';

/**
 * SECURITY: Input Sanitizer
 * Prevent XSS attacks by escaping HTML entities and validating inputs
 * @namespace Sanitizer
 */
const Sanitizer = {
  /**
   * Escape HTML special characters to prevent XSS
   * @param {string} text - Raw text to escape
   * @returns {string} - HTML-safe text
   * @example
   * Sanitizer.escapeHTML('<script>alert("XSS")</script>')
   * // Returns: '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
   */
  escapeHTML(text) {
    if (typeof text !== 'string') {
      return '';
    }

    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;',
    };
    return String(text).replace(/[&<>"'`=/]/g, (char) => map[char]);
  },

  /**
   * Sanitize user input for display (prevents DOM-based XSS)
   * @param {string} input - User input
   * @returns {string} - Safe output
   * @example
   * Sanitizer.sanitizeInput('Hello <b>World</b>')
   * // Returns: 'Hello &lt;b&gt;World&lt;/b&gt;'
   */
  sanitizeInput(input) {
    if (!input || typeof input !== 'string') {
      return '';
    }

    // Trim whitespace
    input = input.trim();

    // Escape HTML entities to prevent injection (DOM-independent)
    return this.escapeHTML(input);
  },

  /**
   * Validate email format (RFC 5322 simplified, ReDoS-safe)
   * @param {string} email - Email address
   * @returns {boolean} - Valid email
   * @example
   * Sanitizer.isValidEmail('user@example.com') // true
   * Sanitizer.isValidEmail('invalid.email') // false
   */
  isValidEmail(email) {
    if (!email || typeof email !== 'string') {
      return false;
    }

    // Simple, safe email validation
    const parts = email.split('@');
    if (parts.length !== 2) {
      return false;
    }

    const [localPart, domain] = parts;

    // Basic validation
    if (!localPart || !domain || email.length > 254 || localPart.length > 64) {
      return false;
    }

    // Simple pattern check (safe from ReDoS)
    // Using simple character classes instead of complex quantifiers
    const localPattern = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+$/;
    const domainParts = domain.split('.');

    // Domain must have at least two parts and each part must be valid
    if (domainParts.length < 2) {
      return false;
    }

    // Safe domain validation - each part must be valid
    // Limiting length explicitly to prevent ReDoS
    // eslint-disable-next-line security/detect-unsafe-regex
    const domainPartPattern = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
    const allPartsValid = domainParts.every((part) => {
      // Additional length check for safety
      return part.length <= 63 && domainPartPattern.test(part);
    });

    return localPattern.test(localPart) && allPartsValid;
  },

  /**
   * Validate URL format
   * @param {string} url - URL to validate
   * @returns {boolean} - Valid URL
   */
  isValidURL(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  },

  /**
   * Sanitize URL to prevent javascript: protocol
   * @param {string} url - URL to sanitize
   * @returns {string} - Safe URL or empty string
   */
  sanitizeURL(url) {
    if (!url || typeof url !== 'string') {
      return '';
    }

    // Remove javascript:, data:, vbscript: protocols
    const dangerousProtocols = /^(javascript|data|vbscript):/i;
    if (dangerousProtocols.test(url.trim())) {
      return '';
    }

    return url;
  },
};

/**
 * SECURITY: CSRF Token Manager
 * Generate and include CSRF tokens in forms
 */
const CSRFManager = {
  tokenName: 'csrf-token',

  /**
   * Generate a pseudo-CSRF token (for frontend only)
   * In production, get from server via meta tag or endpoint
   * @returns {string} - CSRF token
   */
  generateToken() {
    // Check if token already exists in page
    const meta = document.querySelector(`meta[name="${this.tokenName}"]`);
    if (meta) {
      return meta.getAttribute('content');
    }

    // Generate random token
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    const token = Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
    return token;
  },

  /**
   * Add CSRF token to form
   * @param {HTMLElement} form - Form element
   */
  addTokenToForm(form) {
    const token = this.generateToken();

    // Check if token field already exists
    if (!form.querySelector(`input[name="${this.tokenName}"]`)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = this.tokenName;
      input.value = token;
      form.appendChild(input);
    }
  },
};

/**
 * VALIDATION: Form Validator
 * Client-side validation with comprehensive feedback
 * @namespace FormValidator
 */
const FormValidator = {
  /**
   * Validate required fields
   * @param {HTMLElement} field - Input field
   * @returns {boolean} - Valid
   */
  validateRequired(field) {
    if (!field || !field.value) {
      return false;
    }
    return field.value.trim().length > 0;
  },

  /**
   * Validate email with comprehensive check
   * @param {HTMLElement} field - Email input
   * @returns {boolean} - Valid
   */
  validateEmail(field) {
    if (!field || !field.value) {
      return false;
    }
    return Sanitizer.isValidEmail(field.value);
  },

  /**
   * Validate minimum length
   * @param {HTMLElement} field - Input field
   * @param {number} minLength - Minimum length
   * @returns {boolean} - Valid
   */
  validateMinLength(field, minLength = 1) {
    if (!field || !field.value) {
      return false;
    }
    return field.value.trim().length >= minLength;
  },

  /**
   * Validate maximum length
   * @param {HTMLElement} field - Input field
   * @param {number} maxLength - Maximum length
   * @returns {boolean} - Valid
   */
  validateMaxLength(field, maxLength) {
    if (!field || !field.value) {
      return true; // Empty is valid for max length
    }
    return field.value.length <= maxLength;
  },

  /**
   * Validate phone number (international format)
   * @param {HTMLElement} field - Phone input
   * @returns {boolean} - Valid
   */
  validatePhone(field) {
    if (!field || !field.value) {
      return false;
    }
    // International phone format (flexible)
    const regex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return regex.test(field.value.trim());
  },

  /**
   * Validate URL
   * @param {HTMLElement} field - URL input
   * @returns {boolean} - Valid
   */
  validateURL(field) {
    if (!field || !field.value) {
      return false;
    }
    return Sanitizer.isValidURL(field.value.trim());
  },

  /**
   * Validate pattern (custom regex)
   * Note: Use with caution - ensure patterns are from trusted sources
   * @param {HTMLElement} field - Input field
   * @param {string} patternString - Regex pattern as string
   * @returns {boolean} - Valid
   */
  validatePattern(field, patternString) {
    if (!field || !field.value || !patternString) {
      return false;
    }

    try {
      // eslint-disable-next-line security/detect-non-literal-regexp
      const regex = new RegExp(patternString);
      return regex.test(field.value);
    } catch (error) {
      console.error('Invalid regex pattern:', error);
      return false;
    }
  },

  /**
   * Show validation error
   * @param {HTMLElement} field - Input field
   * @param {string} message - Error message
   */
  showError(field, message) {
    const group = field.closest('.form-group');
    if (!group) return;

    group.classList.remove('has-success');
    group.classList.add('has-error');

    // Update error message
    let errorEl = group.querySelector('.form-error');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'form-error';
      group.appendChild(errorEl);
    }
    errorEl.textContent = message;
  },

  /**
   * Show validation success
   * @param {HTMLElement} field - Input field
   */
  showSuccess(field) {
    const group = field.closest('.form-group');
    if (!group) return;

    group.classList.remove('has-error');
    group.classList.add('has-success');

    const errorEl = group.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = '';
    }
  },

  /**
   * Clear validation state
   * @param {HTMLElement} field - Input field
   */
  clearValidation(field) {
    const group = field.closest('.form-group');
    if (!group) return;

    group.classList.remove('has-error', 'has-success');

    const errorEl = group.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = '';
    }
  },
};

/**
 * EVENT: Delegate event listener
 * Attach listeners to parent for event bubbling
 */
const EventDelegate = {
  /**
   * Add delegated event listener
   * @param {HTMLElement} parent - Parent element
   * @param {string} eventType - Event type (click, change, etc.)
   * @param {string} selector - CSS selector for target elements
   * @param {Function} handler - Event handler
   */
  on(parent, eventType, selector, handler) {
    parent.addEventListener(eventType, (event) => {
      if (event.target.matches(selector)) {
        handler.call(event.target, event);
      }
    });
  },

  /**
   * Remove delegated event listener (simplified)
   * Note: For actual removal, store the handler function
   */
  off(parent, eventType) {
    parent.removeEventListener(eventType, null);
  },
};

/**
 * LOADING: Button state management
 */
const ButtonManager = {
  /**
   * Set button to loading state
   * @param {HTMLElement} btn - Button element
   * @param {string} loadingText - Text to show while loading
   */
  setLoading(btn, loadingText = 'Loading...') {
    btn.classList.add('btn-loading');
    btn.disabled = true;
    btn.setAttribute('aria-busy', 'true');

    const originalText = btn.textContent;
    btn.dataset.originalText = originalText;
    btn.textContent = loadingText;
  },

  /**
   * Reset button to normal state
   * @param {HTMLElement} btn - Button element
   */
  reset(btn) {
    btn.classList.remove('btn-loading', 'btn-success');
    btn.disabled = false;
    btn.setAttribute('aria-busy', 'false');

    if (btn.dataset.originalText) {
      btn.textContent = btn.dataset.originalText;
      delete btn.dataset.originalText;
    }
  },

  /**
   * Set button to success state
   * @param {HTMLElement} btn - Button element
   * @param {string} successText - Text to show on success
   */
  setSuccess(btn, successText = 'Success!') {
    btn.classList.remove('btn-loading');
    btn.classList.add('btn-success');
    btn.disabled = true;
    btn.textContent = successText;

    // Auto-reset after 2 seconds
    setTimeout(() => this.reset(btn), 2000);
  },

  /**
   * Set button to error state
   * @param {HTMLElement} btn - Button element
   */
  setError(btn) {
    btn.classList.remove('btn-loading');
    btn.disabled = false;
    btn.setAttribute('aria-label', 'Error: Click to retry');
  },
};

/**
 * ACCESSIBILITY: Focus management
 */
const AccessibilityManager = {
  /**
   * Set focus to element with feedback
   * @param {HTMLElement} element - Element to focus
   */
  focus(element) {
    element.focus();
    // Announce to screen readers
    this.announce(`Focus moved to ${element.getAttribute('aria-label') || 'field'}`);
  },

  /**
   * Announce to screen readers
   * @param {string} message - Message to announce
   */
  announce(message) {
    const announcement = document.createElement('div');
    announcement.className = 'sr-only';
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = message;
    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => announcement.remove(), 1000);
  },

  /**
   * Trap focus within element (for modals)
   * @param {HTMLElement} element - Element to trap focus in
   */
  trapFocus(element) {
    const focusables = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];

    element.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    });
  },
};

/**
 * ERROR: Global error handler
 */
const ErrorHandler = {
  /**
   * Handle and display errors
   * @param {Error} error - Error object
   * @param {string} context - Context where error occurred
   */
  handle(error, context = 'unknown') {
    console.error(`Error in ${context}:`, error);

    // Show user-friendly message
    const message = error.message || 'An error occurred. Please try again.';
    this.showNotification(message, 'error');
  },

  /**
   * Show notification to user
   * @param {string} message - Message to display
   * @param {string} type - Type: 'success', 'error', 'warning', 'info'
   */
  showNotification(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.textContent = message;

    document.body.insertBefore(alertDiv, document.body.firstChild);

    // Auto-remove after 5 seconds
    setTimeout(() => alertDiv.remove(), 5000);
  },
};

/**
 * INITIALIZE: Set up common event listeners
 * Call this on page load
 */
function initializeAcaiAgents() {
  // Add CSRF tokens to all forms
  document.querySelectorAll('form').forEach((form) => {
    CSRFManager.addTokenToForm(form);
  });

  // Initialize form validation on input
  document.querySelectorAll('.form-input, .form-textarea').forEach((field) => {
    field.addEventListener('input', (e) => {
      FormValidator.clearValidation(e.target);
    });

    field.addEventListener('blur', (e) => {
      const field = e.target;
      const isRequired = field.hasAttribute('required');

      if (isRequired && !FormValidator.validateRequired(field)) {
        FormValidator.showError(field, 'This field is required');
      } else if (field.type === 'email' && field.value && !FormValidator.validateEmail(field)) {
        FormValidator.showError(field, 'Please enter a valid email');
      } else if (field.value) {
        FormValidator.showSuccess(field);
      }
    });
  });

  // Log initialization
  console.log('Acai Agents Utilities initialized');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAcaiAgents);
} else {
  initializeAcaiAgents();
}

// Export for use in other modules (if using ES modules)
// eslint-disable-next-line no-undef
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  // eslint-disable-next-line no-undef
  module.exports = {
    Sanitizer,
    CSRFManager,
    FormValidator,
    EventDelegate,
    ButtonManager,
    AccessibilityManager,
    ErrorHandler,
  };
}
