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
      toggle.addEventListener('click', () => this.toggle());

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
      this.applyMode();
      this.savePreference();

      // Announce to screen readers
      const message = this.isEnabled ? 'Dark mode enabled' : 'Light mode enabled';
      AccessibilityManager.announce(message);

      Logger.info('Dark mode toggled', { isEnabled: this.isEnabled });
    } catch (error) {
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

    if (this.isEnabled) {
      html.setAttribute('data-color-scheme', 'dark');
      if (toggle) toggle.setAttribute('aria-pressed', 'true');
    } else {
      html.setAttribute('data-color-scheme', 'light');
      if (toggle) toggle.setAttribute('aria-pressed', 'false');
    }
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
 * CHAT WIDGET MANAGER - Floating chat widget with sanitization
 * Implements secure chat functionality with XSS protection
 * @namespace ChatWidgetManager
 */
const ChatWidgetManager = {
  isOpen: false,
  messages: [],

  /**
   * Initialize chat widget
   * @returns {void}
   */
  init() {
    try {
      // Add default welcome message
      this.messages = [
        {
          type: 'bot',
          text: 'Hello! 👋 How can we help you today?',
          timestamp: Date.now(),
        },
      ];

      const toggle = document.getElementById('chatToggle');
      const closeBtn = document.getElementById('closeChatBtn');
      const form = document.getElementById('chatForm');

      if (toggle) toggle.addEventListener('click', () => this.toggle());
      if (closeBtn) closeBtn.addEventListener('click', () => this.close());
      if (form) form.addEventListener('submit', (e) => this.handleSubmit(e));

      // Handle Escape key to close chat
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });

      this.render();
      Logger.info('Chat widget initialized');
    } catch (error) {
      ErrorHandler.handle(error, 'ChatWidgetManager.init');
    }
  },

  /**
   * Toggle chat widget
   */
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  },

  /**
   * Open chat widget
   */
  open() {
    this.isOpen = true;
    const widget = document.getElementById('chatWidget');
    if (widget) {
      widget.classList.add('open');
      widget.setAttribute('aria-hidden', 'false');
      const input = document.getElementById('chatInput');
      if (input) input.focus();
    }
  },

  /**
   * Close chat widget
   */
  close() {
    this.isOpen = false;
    const widget = document.getElementById('chatWidget');
    if (widget) {
      widget.classList.remove('open');
      widget.setAttribute('aria-hidden', 'true');
    }
  },

  /**
   * Handle form submission (SECURITY: Render with textContent)
   * @param {Event} event - Form submit event
   * @returns {void}
   */
  handleSubmit(event) {
    event.preventDefault();

    try {
      const input = document.getElementById('chatInput');
      if (!input || !input.value.trim()) {
        Logger.warn('Empty chat message submitted');
        return;
      }

      // Validate message length
      const maxLength = 500;
      if (input.value.length > maxLength) {
        ErrorHandler.showNotification(
          `Message too long. Maximum ${maxLength} characters.`,
          'warning'
        );
        return;
      }

      // Store raw text and render via textContent to prevent XSS
      const userMessage = input.value.trim();

      // Add user message
      this.messages.push({
        type: 'user',
        text: userMessage,
        timestamp: Date.now(),
      });

      // Clear input
      input.value = '';

      // Simulate bot response (in production, call API)
      setTimeout(() => {
        const responses = [
          "That's a great question! Our team would love to discuss this further.",
          'Thanks for reaching out! Email us at hello@acaistack.dev for detailed information.',
          "We're here to help. Schedule a call at calendly.com/acaistack",
          "Interesting! Our experts specialize in exactly that. Let's chat soon!",
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        this.messages.push({
          type: 'bot',
          text: randomResponse,
          timestamp: Date.now(),
        });
        this.render();
      }, APP_CONFIG.chatResponseDelay);

      this.render();
      Logger.info('Chat message sent', { messageLength: userMessage.length });
    } catch (error) {
      ErrorHandler.handle(error, 'ChatWidgetManager.handleSubmit');
    }
  },

  /**
   * Render chat messages (SECURITY: HTML-safe rendering)
   */
  render() {
    const messagesDiv = document.getElementById('chatMessages');
    if (!messagesDiv) return;

    messagesDiv.replaceChildren();

    this.messages.forEach((msg) => {
      const div = document.createElement('div');
      div.className = `chat-message ${msg.type}`;
      // Use textContent (safe) instead of innerHTML (XSS risk)
      div.textContent = msg.text;
      div.setAttribute('role', msg.type === 'bot' ? 'article' : 'status');
      messagesDiv.appendChild(div);
    });

    // Auto-scroll to latest message
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
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
      ButtonManager.setSuccess(submitBtn, 'Message sent! 🎉');
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

    // Highlight active link on scroll
    window.addEventListener('scroll', () => this.updateActiveLink());
  },

  /**
   * Update active link based on scroll position
   */
  updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('a.navbar-link');

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
 * Initializes all managers with proper error handling
 * @returns {void}
 */
function initializeApp() {
  const startTime = performance.now();
  Logger.info('🚀 Initializing AcaiStack Application...');

  try {
    // Initialize all managers in order
    const managers = [
      { name: 'DarkMode', instance: DarkModeManager },
      { name: 'MobileMenu', instance: MobileMenuManager },
      { name: 'ChatWidget', instance: ChatWidgetManager },
      { name: 'ScrollAnimation', instance: ScrollAnimationManager },
      { name: 'ContactForm', instance: ContactFormManager },
      { name: 'Navigation', instance: NavigationHandler },
    ];

    managers.forEach(({ name, instance }) => {
      try {
        instance.init();
        Logger.info(`✓ ${name} initialized`);
      } catch (error) {
        Logger.error(`✗ ${name} initialization failed`, error);
        ErrorHandler.handle(error, `${name}Manager.init`);
      }
    });

    const endTime = performance.now();
    const loadTime = Math.round(endTime - startTime);
    Logger.info(`✅ AcaiStack Application initialized in ${loadTime}ms`);

    // Announce to screen readers
    if (typeof AccessibilityManager !== 'undefined') {
      AccessibilityManager.announce('AcaiStack website loaded. Welcome!');
    }

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

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

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

      Logger.info('⚡ Performance Metrics:', {
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
        Logger.info('📊 Detailed Navigation Timing:', {
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
