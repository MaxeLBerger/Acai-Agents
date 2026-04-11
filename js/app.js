/* ═══════════════════════════════════════════════════════════════════════════
   ACAISTACK MAIN APPLICATION - Event handlers, chat, scroll reveal
   All handlers use event delegation (NO inline onclick)
   Version: 2.0.0
   Last Updated: 2026-01-06
   ═════════════════════════════════════════════════════════════════════════ */

'use strict';

/**
 * Application Configuration
 * @const {Object}
 */
const APP_CONFIG = {
  version: '2.0.0',
  debug: false,
  chatResponseDelay: 500,
  notificationDuration: 5000,
  formSubmitTimeout: 1500,
};

/**
 * Logger utility for debugging
 * @const {Object}
 */
const Logger = {
  /**
   * Log info message
   * @param {string} message - Message to log
   * @param {...any} args - Additional arguments
   */
  info(message, ...args) {
    if (APP_CONFIG.debug) {
      console.log(`[INFO] ${message}`, ...args);
    }
  },

  /**
   * Log warning message
   * @param {string} message - Warning message
   * @param {...any} args - Additional arguments
   */
  warn(message, ...args) {
    console.warn(`[WARN] ${message}`, ...args);
  },

  /**
   * Log error message
   * @param {string} message - Error message
   * @param {Error} error - Error object
   */
  error(message, error) {
    console.error(`[ERROR] ${message}`, error);
  },
};

/**
 * DARK MODE MANAGER - Toggle between light and dark theme
 * Respects system preferences and saves user choice
 * @namespace DarkModeManager
 */
const DarkModeManager = {
  storageKey: 'acaistack-dark-mode',
  isEnabled: false,

  /**
   * Initialize Dark mode with system preference fallback
   * @returns {void}
   */
  init() {
    try {
      const toggle = document.getElementById('bwModeToggle');
      console.log('[DEBUG] DarkModeManager.init() - toggle button:', toggle);
      if (!toggle) {
        Logger.warn('Dark mode toggle button not found');
        return;
      }

      // Load saved preference or check system preference
      const saved = localStorage.getItem(this.storageKey);
      if (saved !== null) {
        this.isEnabled = saved === 'true';
      } else {
        // Check system preference
        this.isEnabled = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      this.applyMode();

      // Bind event listener
      console.log('[DEBUG] Binding click listener to toggle button');
      toggle.addEventListener('click', () => {
        console.log('[DEBUG] Toggle button clicked!');
        this.toggle();
      });

      // Listen for system preference changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem(this.storageKey) === null) {
          this.isEnabled = e.matches;
          this.applyMode();
        }
      });

      Logger.info('Dark mode initialized', { isEnabled: this.isEnabled });
    } catch (error) {
      ErrorHandler.handle(error, 'DarkModeManager.init');
    }
  },

  /**
   * Toggle Dark mode
   * @returns {void}
   */
  toggle() {
    try {
      this.isEnabled = !this.isEnabled;
      console.log('[DEBUG] toggle() - isEnabled now:', this.isEnabled);
      this.applyMode();
      this.savePreference();

      // Announce to screen readers
      const message = this.isEnabled ? 'Dark mode enabled' : 'Light mode enabled';
      AccessibilityManager.announce(message);

      Logger.info('Dark mode toggled', { isEnabled: this.isEnabled });
    } catch (error) {
      console.error('[DEBUG] toggle() error:', error);
      ErrorHandler.handle(error, 'DarkModeManager.toggle');
    }
  },

  /**
   * Apply Dark mode to the document
   * @returns {void}
   */
  applyMode() {
    const html = document.documentElement;
    const toggle = document.getElementById('bwModeToggle');

    console.log(
      '[DEBUG] applyMode() - isEnabled:',
      this.isEnabled,
      'current attr:',
      html.getAttribute('data-color-scheme')
    );

    if (this.isEnabled) {
      html.setAttribute('data-color-scheme', 'dark');
      if (toggle) toggle.setAttribute('aria-pressed', 'true');
    } else {
      html.setAttribute('data-color-scheme', 'light');
      if (toggle) toggle.setAttribute('aria-pressed', 'false');
    }

    console.log('[DEBUG] applyMode() - new attr:', html.getAttribute('data-color-scheme'));

    // Force repaint and log computed styles
    requestAnimationFrame(() => {
      const bodyStyles = getComputedStyle(document.body);
      const htmlStyles = getComputedStyle(html);
      console.log('[DEBUG] COMPUTED body background-color:', bodyStyles.backgroundColor);
      console.log('[DEBUG] COMPUTED body color:', bodyStyles.color);
      console.log('[DEBUG] COMPUTED html background-color:', htmlStyles.backgroundColor);
      console.log(
        '[DEBUG] COMPUTED --color-background on html:',
        htmlStyles.getPropertyValue('--color-background')
      );
      console.log(
        '[DEBUG] COMPUTED --color-text on html:',
        htmlStyles.getPropertyValue('--color-text')
      );
    });
  },

  /**
   * Save preference to localStorage
   * @returns {void}
   */
  savePreference() {
    try {
      localStorage.setItem(this.storageKey, this.isEnabled.toString());
    } catch (error) {
      // localStorage not available (private mode, quota exceeded, etc.)
      Logger.warn('Could not save Dark mode preference:', error);
    }
  },
};

/**
 * SCROLL REVEAL MANAGER - Show elements as they scroll into view
 */
const ScrollAnimationManager = {
  /**
   * Initialize scroll reveal
   */
  init() {
    this.observeElements();
  },

  /**
   * Use Intersection Observer for performance
   */
  observeElements() {
    const elements = document.querySelectorAll('.scroll-reveal');

    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    elements.forEach((el) => observer.observe(el));
  },
};

/**
 * FORM MANAGER - Handle contact form submission (SECURITY: CSRF + Validation)
 */
const ContactFormManager = {
  /**
   * Initialize form handlers
   */
  init() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Add real-time validation
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach((input) => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => {
        // Clear error on input
        const group = input.closest('.form-group');
        if (group?.classList.contains('has-error')) {
          FormValidator.clearValidation(input);
        }
      });
    });
  },

  /**
   * Validate individual field
   */
  validateField(field) {
    const name = field.name;
    let isValid = false;
    let errorMsg = '';

    if (!FormValidator.validateRequired(field)) {
      errorMsg = 'This field is required';
    } else if (name === 'email' && !FormValidator.validateEmail(field)) {
      errorMsg = 'Please enter a valid email address';
    } else {
      isValid = true;
    }

    if (!isValid) {
      FormValidator.showError(field, errorMsg);
    } else {
      FormValidator.showSuccess(field);
    }

    return isValid;
  },

  /**
   * Handle form submission (SECURITY: Validate + Sanitize)
   */
  handleSubmit(event) {
    event.preventDefault();
    const form = event.target;

    // Validate all fields
    const inputs = form.querySelectorAll('[required]');
    let isValid = true;

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      ErrorHandler.showNotification('Please fix the errors above', 'error');
      return;
    }

    // Get form data and sanitize
    const formData = new FormData(form);
    const data = {
      name: Sanitizer.sanitizeInput(formData.get('name')),
      email: formData.get('email'), // Already validated
      company: Sanitizer.sanitizeInput(formData.get('company') || ''),
      message: Sanitizer.sanitizeInput(formData.get('message')),
      csrf_token: formData.get('csrf-token'),
    };

    // Validate CSRF token exists (even if we can't verify server-side in frontend)
    if (!data.csrf_token) {
      ErrorHandler.handle(new Error('CSRF token missing'), 'form submission');
      return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    ButtonManager.setLoading(submitBtn, 'Sending...');

    // Simulate form submission (in production, call API)
    setTimeout(() => {
      // Success
      ButtonManager.setSuccess(submitBtn, 'Message sent!');
      form.reset();

      // Clear validation states
      form.querySelectorAll('.form-group').forEach((group) => {
        group.classList.remove('has-error', 'has-success');
      });

      ErrorHandler.showNotification("Thanks for reaching out! We'll be in touch soon.", 'success');

      // Reset button after 2 seconds
      setTimeout(() => ButtonManager.reset(submitBtn), 2000);
    }, 1500);

    // Log minimal metadata (debug-only) to avoid leaking PII
    Logger.info('Contact form submitted', {
      hasCompany: Boolean(data.company),
      nameLength: String(data.name ?? '').length,
      messageLength: String(data.message ?? '').length,
    });
  },
};

/**
 * NAVIGATION HANDLER - Smooth scroll and active link highlighting
 */
const NavigationHandler = {
  /**
   * Initialize navigation
   */
  init() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#' || href === '#main-content' || href === '#home') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });

          // Update active link
          links.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    });

    // Highlight active link on scroll (throttled via rAF)
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          this.updateActiveLink();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    });
  },

  /**
   * Update active link based on scroll position
   * Caches DOM queries for performance
   */
  updateActiveLink() {
    if (!this._cachedSections) {
      this._cachedSections = document.querySelectorAll('section[id]');
      this._cachedLinks = document.querySelectorAll('a.navbar-link');
    }
    const sections = this._cachedSections;
    const links = this._cachedLinks;

    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    links.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  },
};

/**
 * MOBILE MENU MANAGER - Handles responsive hamburger menu
 * Manages mobile navigation toggle, overlay, and accessibility
 * @namespace MobileMenuManager
 */
const MobileMenuManager = {
  isOpen: false,
  toggle: null,
  menu: null,
  overlay: null,

  /**
   * Initialize mobile menu
   * @returns {void}
   */
  init() {
    try {
      this.toggle = document.getElementById('mobileMenuToggle');
      this.menu = document.getElementById('navbarMenu');

      if (!this.toggle || !this.menu) {
        Logger.warn('Mobile menu elements not found');
        return;
      }

      // Create overlay element
      this.createOverlay();

      // Bind event listeners
      this.toggle.addEventListener('click', () => this.toggleMenu());

      // Close menu when clicking a link
      this.menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          if (this.isOpen) {
            this.closeMenu();
          }
        });
      });

      // Close menu on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeMenu();
          this.toggle.focus();
        }
      });

      // Close menu on window resize (when going to desktop)
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && this.isOpen) {
          this.closeMenu();
        }
      });

      Logger.info('Mobile menu initialized');
    } catch (error) {
      ErrorHandler.handle(error, 'MobileMenuManager.init');
    }
  },

  /**
   * Create overlay element for mobile menu
   * @returns {void}
   */
  createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'mobile-menu-overlay';
    this.overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(this.overlay);

    // Close menu when clicking overlay
    this.overlay.addEventListener('click', () => this.closeMenu());
  },

  /**
   * Toggle mobile menu open/closed
   * @returns {void}
   */
  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  },

  /**
   * Open mobile menu
   * @returns {void}
   */
  openMenu() {
    this.isOpen = true;
    this.menu.classList.add('open');
    this.toggle.setAttribute('aria-expanded', 'true');
    this.overlay.classList.add('active');
    document.body.classList.add('menu-open');

    // Trap focus within menu
    const firstLink = this.menu.querySelector('a, button');
    if (firstLink) firstLink.focus();

    // Announce to screen readers
    if (typeof AccessibilityManager !== 'undefined') {
      AccessibilityManager.announce('Navigation menu opened');
    }

    Logger.info('Mobile menu opened');
  },

  /**
   * Close mobile menu
   * @returns {void}
   */
  closeMenu() {
    this.isOpen = false;
    this.menu.classList.remove('open');
    this.toggle.setAttribute('aria-expanded', 'false');
    this.overlay.classList.remove('active');
    document.body.classList.remove('menu-open');

    // Announce to screen readers
    if (typeof AccessibilityManager !== 'undefined') {
      AccessibilityManager.announce('Navigation menu closed');
    }

    Logger.info('Mobile menu closed');
  },
};

/**
 * INITIALIZATION - Bootstrap the application
 * Phase 1: Managers that do NOT depend on navbar/footer (run on DOMContentLoaded)
 * Phase 2: Managers that depend on navbar/footer (run on 'components-loaded' event)
 * @returns {void}
 */
function initializeApp() {
  const startTime = performance.now();
  Logger.info('Initializing AcaiStack Application (Phase 1 - DOM ready)...');

  try {
    // Phase 1: Managers that do NOT depend on navbar/footer elements
    const domReadyManagers = [{ name: 'ContactForm', instance: ContactFormManager }];

    domReadyManagers.forEach(({ name, instance }) => {
      try {
        instance.init();
        Logger.info(`${name} initialized`);
      } catch (error) {
        Logger.error(`${name} initialization failed`, error);
        ErrorHandler.handle(error, `${name}Manager.init`);
      }
    });

    // Non-critical managers - defer to idle time for better performance
    const deferredManagers = [{ name: 'ScrollAnimation', instance: ScrollAnimationManager }];

    const initDeferredManagers = () => {
      deferredManagers.forEach(({ name, instance }) => {
        try {
          instance.init();
          Logger.info(`${name} initialized (deferred)`);
        } catch (error) {
          Logger.error(`${name} initialization failed`, error);
          ErrorHandler.handle(error, `${name}Manager.init`);
        }
      });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(initDeferredManagers, { timeout: 2000 });
    } else {
      setTimeout(initDeferredManagers, 1000);
    }

    const endTime = performance.now();
    const loadTime = Math.round(endTime - startTime);
    Logger.info(`AcaiStack Phase 1 initialized in ${loadTime}ms`);

    // Track initialization in analytics (if available)
    if (typeof gtag !== 'undefined') {
      // eslint-disable-next-line no-undef
      gtag('event', 'app_initialized', {
        event_category: 'performance',
        event_label: 'load_time',
        value: loadTime,
      });
    }
  } catch (error) {
    Logger.error('Critical error during app initialization', error);
    ErrorHandler.handle(error, 'initializeApp');
  }
}

/**
 * Phase 2: Initialize managers that depend on navbar/footer elements
 * Runs after components-loader.js has injected the shared components
 * @returns {void}
 */
function initializeComponentDependentManagers() {
  Logger.info('Initializing AcaiStack Application (Phase 2 - components loaded)...');

  try {
    const navbarManagers = [
      { name: 'DarkMode', instance: DarkModeManager },
      { name: 'MobileMenu', instance: MobileMenuManager },
      { name: 'Navigation', instance: NavigationHandler },
    ];

    navbarManagers.forEach(({ name, instance }) => {
      try {
        instance.init();
        Logger.info(`${name} initialized (after components loaded)`);
      } catch (error) {
        Logger.error(`${name} initialization failed`, error);
        ErrorHandler.handle(error, `${name}Manager.init`);
      }
    });

    // Announce to screen readers
    if (typeof AccessibilityManager !== 'undefined') {
      AccessibilityManager.announce('AcaiStack website loaded. Welcome!');
    }

    Logger.info('AcaiStack Phase 2 initialization complete');
  } catch (error) {
    Logger.error('Critical error during component-dependent initialization', error);
    ErrorHandler.handle(error, 'initializeComponentDependentManagers');
  }
}

// Phase 1: Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Phase 2: Start when navbar/footer components are injected
// The execution order between type="module" (components-loader.js) and defer
// scripts (this file) varies by browser. Use a guard to handle all timing:
// 1. Components already loaded → runs immediately
// 2. Components not yet loaded → event listener catches it
// 3. Both paths fire → guard prevents double initialization
let _componentManagersReady = false;
function _safeInitComponentManagers() {
  console.log(
    '[DEBUG] _safeInitComponentManagers called, ready:',
    _componentManagersReady,
    'button:',
    !!document.getElementById('bwModeToggle')
  );
  if (_componentManagersReady) return;
  if (!document.getElementById('bwModeToggle')) return;
  _componentManagersReady = true;
  initializeComponentDependentManagers();
}
_safeInitComponentManagers();
document.addEventListener('components-loaded', _safeInitComponentManagers);

// Global error handling
window.addEventListener('error', (event) => {
  ErrorHandler.handle(event.error, 'global error');
});

window.addEventListener('unhandledrejection', (event) => {
  ErrorHandler.handle(event.reason, 'unhandled promise rejection');
});

// Log performance metrics
window.addEventListener('load', () => {
  try {
    if (window.performance && window.performance.timing) {
      const perf = window.performance.timing;
      const pageLoadTime = perf.loadEventEnd - perf.navigationStart;
      const domContentLoaded = perf.domContentLoadedEventEnd - perf.navigationStart;
      const domInteractive = perf.domInteractive - perf.navigationStart;

      Logger.info('Performance Metrics:', {
        pageLoad: `${pageLoadTime}ms`,
        domContentLoaded: `${domContentLoaded}ms`,
        domInteractive: `${domInteractive}ms`,
      });

      // Track in analytics if available
      if (typeof gtag !== 'undefined') {
        // eslint-disable-next-line no-undef
        gtag('event', 'timing_complete', {
          name: 'page_load',
          value: pageLoadTime,
          event_category: 'Performance',
        });
      }

      // Warn if performance is poor
      if (pageLoadTime > 3000) {
        Logger.warn('Page load time exceeds 3 seconds. Consider optimization.');
      }
    }

    // Check for performance API v2 (Navigation Timing Level 2)
    if (window.performance && typeof window.performance.getEntriesByType === 'function') {
      const navigationEntries = window.performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const nav = navigationEntries[0];
        Logger.info('Detailed Navigation Timing:', {
          dns: `${Math.round(nav.domainLookupEnd - nav.domainLookupStart)}ms`,
          tcp: `${Math.round(nav.connectEnd - nav.connectStart)}ms`,
          request: `${Math.round(nav.responseStart - nav.requestStart)}ms`,
          response: `${Math.round(nav.responseEnd - nav.responseStart)}ms`,
          domProcessing: `${Math.round(nav.domComplete - nav.domInteractive)}ms`,
        });
      }
    }
  } catch (error) {
    Logger.error('Error logging performance metrics', error);
  }
});
