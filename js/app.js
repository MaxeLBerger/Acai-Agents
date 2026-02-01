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
          text: 'Hello! How can we help you today?',
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
 * PROJECT THEME SLIDER MANAGER - Hero section project showcase with theme switching
 * Handles slide transitions and dynamic color theme changes across the entire site
 *
 * TO ADD A NEW PROJECT:
 * 1. Add the project config to the 'projects' object below
 * 2. Add the corresponding CSS theme in base.css under PROJECT THEMES section
 * 3. Create a new slide in index.html with id="slide-{projectId}"
 * 4. Add a navigation button with data-project="{projectId}"
 *
/**
 * PROJECT THEME SLIDER MANAGER
 * Premium slider with Apple-like animations and smooth transitions
 * @namespace ProjectThemeSliderManager
 */
const ProjectThemeSliderManager = {
  currentProject: 'acaistack',
  currentIndex: 0,
  isAnimating: false,
  autoPlayInterval: null,
  autoPlayDelay: 6000,
  progressAnimation: null,
  slidesContainer: null,

  // Premium easing curves (Apple-like)
  ease: {
    smooth: 'power3.out',
    smoother: 'power4.out',
    elastic: 'elastic.out(1, 0.5)',
    bounce: 'back.out(1.4)',
    inOut: 'power2.inOut',
  },

  /**
   * Project configurations
   */
  projects: {
    acaistack: {
      name: 'AcaiStack',
      theme: 'acaistack',
    },
    imkerei: {
      name: 'Imkerei Feuerstein',
      theme: 'imkerei',
    },
    project3: {
      name: 'Your Project',
      theme: 'project3',
    },
    project4: {
      name: 'Next Client',
      theme: 'project4',
    },
  },

  /**
   * Initialize the project theme slider
   * @returns {void}
   */
  init() {
    const navButtons = document.querySelectorAll('.project-nav-btn');
    const heroSection = document.querySelector('.hero-section');
    const arrowLeft = document.querySelector('.slider-arrow-left');
    const arrowRight = document.querySelector('.slider-arrow-right');
    const slidesContainer = document.querySelector('.hero-slides-container');

    if (!navButtons.length || !heroSection) {
      Logger.info('Project theme slider not found on this page');
      return;
    }

    // Store references
    this.slidesContainer = slidesContainer;
    this.heroSection = heroSection;
    this.navButtons = navButtons;
    this.arrowLeft = arrowLeft;
    this.arrowRight = arrowRight;

    // Initialize arrow visibility observer
    this.initArrowVisibility();

    // Set initial container height
    this.updateContainerHeight();

    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.updateContainerHeight(), 100);
    });

    // Set initial theme
    this.applyTheme(this.currentProject);

    // Initialize progress indicator
    this.initProgressIndicator();

    // Navigation button clicks with visual feedback
    navButtons.forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        const project = e.currentTarget.dataset.project;
        if (project && project !== this.currentProject && !this.isAnimating) {
          this.stopAutoPlay();
          this.switchProject(project);
          this.startAutoPlay();
        }
      });

      // Store index for quick access
      btn.dataset.index = index;
    });

    // Arrow navigation
    if (arrowLeft) {
      arrowLeft.addEventListener('click', () => {
        if (this.isAnimating) return;
        this.stopAutoPlay();
        this.navigatePrev();
        this.startAutoPlay();
      });
    }

    if (arrowRight) {
      arrowRight.addEventListener('click', () => {
        if (this.isAnimating) return;
        this.stopAutoPlay();
        this.navigateNext();
        this.startAutoPlay();
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!heroSection.matches(':hover') || this.isAnimating) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.stopAutoPlay();
        this.navigateNext();
        this.startAutoPlay();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.stopAutoPlay();
        this.navigatePrev();
        this.startAutoPlay();
      }
    });

    // Touch/Swipe support
    this.initTouchSupport(slidesContainer);

    // Start autoplay
    this.startAutoPlay();

    // Pause on hover
    heroSection.addEventListener('mouseenter', () => this.pauseAutoPlay());
    heroSection.addEventListener('mouseleave', () => this.resumeAutoPlay());

    Logger.info('ProjectThemeSlider initialized');
  },

  /**
   * Initialize touch/swipe support for mobile
   */
  initTouchSupport(container) {
    if (!container) return;

    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    container.addEventListener(
      'touchstart',
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    container.addEventListener(
      'touchend',
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const distance = touchEndX - touchStartX;

        if (Math.abs(distance) > minSwipeDistance && !this.isAnimating) {
          this.stopAutoPlay();
          if (distance > 0) {
            this.navigatePrev();
          } else {
            this.navigateNext();
          }
          this.startAutoPlay();
        }
      },
      { passive: true }
    );
  },

  /**
   * Initialize arrow visibility based on hero section visibility
   * Uses IntersectionObserver for performance
   */
  initArrowVisibility() {
    if (!this.arrowLeft || !this.arrowRight || !this.heroSection) return;

    // Initially hide arrows
    this.arrowLeft.classList.remove('visible');
    this.arrowRight.classList.remove('visible');

    // Use IntersectionObserver for efficient visibility tracking
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -100px 0px',
      threshold: 0.3,
    };

    const arrowObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.arrowLeft?.classList.add('visible');
          this.arrowRight?.classList.add('visible');
        } else {
          this.arrowLeft?.classList.remove('visible');
          this.arrowRight?.classList.remove('visible');
        }
      });
    }, observerOptions);

    arrowObserver.observe(this.heroSection);
  },

  /**
   * Initialize progress indicator on nav buttons
   */
  initProgressIndicator() {
    // Add progress bar to each nav button
    this.navButtons.forEach((btn) => {
      if (!btn.querySelector('.nav-progress')) {
        const progress = document.createElement('div');
        progress.className = 'nav-progress';
        btn.appendChild(progress);
      }
    });
  },

  /**
   * Navigate to next project
   */
  navigateNext() {
    const projectIds = Object.keys(this.projects);
    const nextIndex = (this.currentIndex + 1) % projectIds.length;
    this.switchProject(projectIds[nextIndex]);
  },

  /**
   * Navigate to previous project
   */
  navigatePrev() {
    const projectIds = Object.keys(this.projects);
    const prevIndex = (this.currentIndex - 1 + projectIds.length) % projectIds.length;
    this.switchProject(projectIds[prevIndex]);
  },

  /**
   * Update container height - set once based on tallest slide, no animation
   * This prevents layout shift during transitions
   */
  updateContainerHeight() {
    if (!this.slidesContainer) return;

    // Find the tallest slide to prevent any layout shift
    const slides = this.slidesContainer.querySelectorAll('.hero-slide');
    let maxHeight = 0;

    slides.forEach((slide) => {
      // Temporarily make visible to measure
      const wasHidden = slide.hidden;
      const wasVisible = slide.style.visibility;

      slide.hidden = false;
      slide.style.visibility = 'visible';

      const height = slide.scrollHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }

      // Restore original state
      slide.hidden = wasHidden;
      slide.style.visibility = wasVisible;
    });

    // Set height instantly without animation to prevent shift
    if (maxHeight > 0) {
      this.slidesContainer.style.minHeight = `${maxHeight}px`;
    }
  },

  /**
   * Apply theme with smooth transition
   */
  applyTheme(projectId) {
    const project = this.projects[projectId];
    if (!project) return;

    document.documentElement.dataset.projectTheme = project.theme;

    if (this.heroSection) {
      this.heroSection.dataset.projectTheme = project.theme;
    }
  },

  /**
   * Pause autoplay (keeps state)
   */
  pauseAutoPlay() {
    if (this.progressAnimation) {
      this.progressAnimation.pause();
    }
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  },

  /**
   * Resume autoplay
   */
  resumeAutoPlay() {
    if (this.progressAnimation) {
      this.progressAnimation.resume();
    }
    this.startAutoPlay();
  },

  /**
   * Switch to a different project with premium animation
   */
  switchProject(projectId) {
    if (this.isAnimating || !this.projects[projectId]) return;
    if (projectId === this.currentProject) return;

    this.isAnimating = true;

    const projectIds = Object.keys(this.projects);
    const oldProject = this.currentProject;
    const newProject = projectId;
    const oldIndex = this.currentIndex;
    const newIndex = projectIds.indexOf(newProject);
    const direction = newIndex > oldIndex ? 'next' : 'prev';

    // Get slide elements
    const oldSlide = document.getElementById(`slide-${oldProject}`);
    const newSlide = document.getElementById(`slide-${newProject}`);

    if (!oldSlide || !newSlide) {
      this.isAnimating = false;
      return;
    }

    // Update state
    this.currentProject = newProject;
    this.currentIndex = newIndex;

    // Update nav buttons with animation
    this.updateNavButtons(newProject);

    // Apply theme
    this.applyTheme(newProject);

    // Animate slides
    this.animatePremiumTransition(oldSlide, newSlide, direction);
  },

  /**
   * Get slide direction
   */
  getDirection(from, to) {
    const projectOrder = Object.keys(this.projects);
    return projectOrder.indexOf(to) > projectOrder.indexOf(from) ? 'next' : 'prev';
  },

  /**
   * Update navigation button states with animation
   */
  updateNavButtons(activeProject) {
    if (!this.navButtons) return;

    this.navButtons.forEach((btn) => {
      const isActive = btn.dataset.project === activeProject;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');

      // Animate the active indicator
      const dot = btn.querySelector('.nav-dot');
      if (dot && typeof gsap !== 'undefined') {
        if (isActive) {
          gsap.to(dot, { scale: 1.3, duration: 0.3, ease: this.ease.bounce });
        } else {
          gsap.to(dot, { scale: 1, duration: 0.2, ease: this.ease.smooth });
        }
      }
    });
  },

  /**
   * Premium slide transition with parallax effect
   */
  animatePremiumTransition(oldSlide, newSlide, direction) {
    if (typeof gsap === 'undefined') {
      this.animateWithCSS(oldSlide, newSlide, direction);
      return;
    }

    // Animation config
    const config = {
      duration: 0.7,
      stagger: 0.05,
      xOffset: 120,
      parallaxRatio: 0.5, // Text moves slower than images
    };

    const xOut = direction === 'next' ? -config.xOffset : config.xOffset;
    const xIn = direction === 'next' ? config.xOffset : -config.xOffset;

    // Kill existing animations
    gsap.killTweensOf([oldSlide, newSlide]);
    gsap.killTweensOf(oldSlide.querySelectorAll('*'));
    gsap.killTweensOf(newSlide.querySelectorAll('*'));

    // Prepare new slide
    newSlide.hidden = false;
    gsap.set(newSlide, {
      x: xIn,
      opacity: 0,
      visibility: 'visible',
      zIndex: 3,
    });

    // Get elements for parallax
    const oldContent = {
      text: oldSlide.querySelector('.hero-text-content'),
      visual: oldSlide.querySelector('.hero-visual-showcase'),
    };

    const newContent = {
      text: newSlide.querySelector('.hero-text-content'),
      visual: newSlide.querySelector('.hero-visual-showcase'),
      titleLines: newSlide.querySelectorAll('.title-line'),
      subtitle: newSlide.querySelector('.hero-subtitle'),
      cta: newSlide.querySelectorAll('.hero-cta .btn'),
      badges: newSlide.querySelector('.hero-trust-badges'),
    };

    // Set initial states for new content
    if (newContent.text) {
      gsap.set(newContent.text, { x: xIn * config.parallaxRatio, opacity: 0 });
    }
    if (newContent.visual) {
      gsap.set(newContent.visual, { x: xIn * 1.2, opacity: 0, scale: 0.95 });
    }

    // Master timeline
    const master = gsap.timeline({
      onComplete: () => {
        // Cleanup - keep transform properties to prevent layout shift
        oldSlide.classList.remove('active');
        oldSlide.hidden = true;

        // Reset only the properties we animated, don't use clearProps
        gsap.set(oldSlide, {
          x: 0,
          opacity: 0,
          visibility: 'hidden',
          zIndex: 1,
        });

        // Reset old content transforms
        if (oldContent.text) {
          gsap.set(oldContent.text, { x: 0, opacity: 1 });
        }
        if (oldContent.visual) {
          gsap.set(oldContent.visual, { x: 0, opacity: 1, scale: 1 });
        }

        newSlide.classList.add('active');
        // Set final state explicitly instead of clearing props
        gsap.set(newSlide, {
          x: 0,
          opacity: 1,
          visibility: 'visible',
          zIndex: 2,
        });

        // Reset new content to natural state
        if (newContent.text) {
          gsap.set(newContent.text, { x: 0, opacity: 1 });
        }
        if (newContent.visual) {
          gsap.set(newContent.visual, { x: 0, opacity: 1, scale: 1 });
        }

        this.isAnimating = false;
      },
    });

    // === OLD SLIDE OUT ===
    // Parallax exit - visual moves faster than text
    if (oldContent.visual) {
      master.to(
        oldContent.visual,
        {
          x: xOut * 1.2,
          opacity: 0,
          scale: 0.95,
          duration: config.duration * 0.8,
          ease: this.ease.inOut,
        },
        0
      );
    }

    if (oldContent.text) {
      master.to(
        oldContent.text,
        {
          x: xOut * config.parallaxRatio,
          opacity: 0,
          duration: config.duration * 0.7,
          ease: this.ease.inOut,
        },
        0.05
      );
    }

    // Fade out the slide container
    master.to(
      oldSlide,
      {
        opacity: 0,
        duration: config.duration * 0.5,
        ease: 'power2.in',
      },
      0.1
    );

    // === NEW SLIDE IN ===
    master.to(
      newSlide,
      {
        x: 0,
        opacity: 1,
        duration: config.duration,
        ease: this.ease.smooth,
      },
      0.2
    );

    // Parallax entrance - staggered
    if (newContent.text) {
      master.to(
        newContent.text,
        {
          x: 0,
          opacity: 1,
          duration: config.duration * 0.9,
          ease: this.ease.smoother,
        },
        0.25
      );
    }

    if (newContent.visual) {
      master.to(
        newContent.visual,
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: config.duration,
          ease: this.ease.smoother,
        },
        0.3
      );
    }

    // === CONTENT REVEAL ===
    // Staggered text animation
    if (newContent.titleLines.length) {
      master.fromTo(
        newContent.titleLines,
        { y: 30, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
        {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0 0 0% 0)',
          stagger: 0.1,
          duration: 0.6,
          ease: this.ease.smoother,
        },
        0.35
      );
    }

    if (newContent.subtitle) {
      master.fromTo(
        newContent.subtitle,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: this.ease.smooth },
        0.55
      );
    }

    if (newContent.cta.length) {
      master.fromTo(
        newContent.cta,
        { y: 15, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.4,
          ease: this.ease.bounce,
        },
        0.65
      );
    }

    if (newContent.badges) {
      master.fromTo(
        newContent.badges,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: this.ease.smooth },
        0.75
      );
    }

    // Animate showcase elements
    this.animateShowcaseElements(newSlide, master);
  },

  /**
   * Animate showcase elements (browser mockup, emblem, placeholder)
   */
  animateShowcaseElements(slide, timeline) {
    const frame = slide.querySelector('.portfolio-showcase-frame');
    const emblem = slide.querySelector('.emblem-frame');
    const placeholder = slide.querySelector('.placeholder-content');
    const badge = slide.querySelector('.portfolio-showcase-badge, .emblem-badge');

    if (frame) {
      // Browser mockup with 3D tilt
      timeline.fromTo(
        frame,
        { opacity: 0, rotateY: -15, rotateX: 8, scale: 0.9 },
        {
          opacity: 1,
          rotateY: -5,
          rotateX: 2,
          scale: 1,
          duration: 0.8,
          ease: this.ease.smoother,
        },
        0.4
      );

      // Browser dots
      const dots = frame.querySelectorAll('.browser-dots .dot');
      if (dots.length) {
        timeline.fromTo(
          dots,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.06,
            duration: 0.3,
            ease: this.ease.elastic,
          },
          0.7
        );
      }

      // Image reveal
      const img = frame.querySelector('.portfolio-showcase-image');
      if (img) {
        timeline.fromTo(
          img,
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 0.6, ease: this.ease.smooth },
          0.5
        );
      }
    }

    if (emblem) {
      timeline.fromTo(
        emblem,
        { opacity: 0, scale: 0.7, rotation: -10 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.9,
          ease: this.ease.elastic,
        },
        0.35
      );
    }

    if (placeholder) {
      timeline.fromTo(
        placeholder,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: this.ease.smooth },
        0.4
      );
    }

    if (badge) {
      timeline.fromTo(
        badge,
        { opacity: 0, y: -20, scale: 0.7 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: this.ease.bounce,
        },
        0.8
      );
    }
  },

  /**
   * CSS fallback animation
   */
  animateWithCSS(oldSlide, newSlide) {
    newSlide.hidden = false;
    newSlide.style.opacity = '0';
    newSlide.style.transform = 'translateX(60px)';

    requestAnimationFrame(() => {
      newSlide.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      oldSlide.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

      newSlide.style.opacity = '1';
      newSlide.style.transform = 'translateX(0)';
      oldSlide.style.opacity = '0';
      oldSlide.style.transform = 'translateX(-60px)';
    });

    setTimeout(() => {
      oldSlide.classList.remove('active');
      oldSlide.hidden = true;
      oldSlide.style.cssText = '';
      newSlide.classList.add('active');
      newSlide.style.cssText = '';
      this.isAnimating = false;
    }, 500);
  },

  /**
   * Start autoplay rotation with progress indicator
   */
  startAutoPlay() {
    this.stopAutoPlay();

    // Animate progress bar on active nav button
    const activeBtn = document.querySelector('.project-nav-btn.active .nav-progress');
    if (activeBtn && typeof gsap !== 'undefined') {
      this.progressAnimation = gsap.fromTo(
        activeBtn,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: this.autoPlayDelay / 1000,
          ease: 'none',
          onComplete: () => {
            this.navigateNext();
            this.startAutoPlay();
          },
        }
      );
    } else {
      // Fallback without progress animation
      this.autoPlayInterval = setInterval(() => {
        this.navigateNext();
      }, this.autoPlayDelay);
    }
  },

  /**
   * Stop autoplay rotation
   */
  stopAutoPlay() {
    if (this.progressAnimation) {
      this.progressAnimation.kill();
      this.progressAnimation = null;
    }
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }

    // Reset all progress bars
    document.querySelectorAll('.nav-progress').forEach((bar) => {
      if (typeof gsap !== 'undefined') {
        gsap.set(bar, { scaleX: 0 });
      }
    });
  },
};

/**
 * PORTFOLIO SLIDER MANAGER - Homepage website preview slider
 * Handles previous/next navigation and dot indicators
 */
const PortfolioSliderManager = {
  currentIndex: 0,
  slides: [],
  track: null,
  dots: [],

  /**
   * Initialize slider if present on page
   * @returns {void}
   */
  init() {
    const slider = document.querySelector('[data-portfolio-slider]');
    if (!slider) return;

    this.track = slider.querySelector('.portfolio-slider-track');
    this.slides = Array.from(slider.querySelectorAll('.portfolio-slide'));
    this.dots = Array.from(document.querySelectorAll('[data-portfolio-dot]'));

    if (!this.track || this.slides.length === 0) {
      Logger.warn('Portfolio slider: no slides found');
      return;
    }

    const prevBtn = slider.querySelector('[data-portfolio-prev]');
    const nextBtn = slider.querySelector('[data-portfolio-next]');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.goTo(this.currentIndex - 1));
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.goTo(this.currentIndex + 1));
    }

    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goTo(index));
    });

    this.update();
  },

  /**
   * Navigate to a given slide index (wraps around)
   * @param {number} index - Target slide index
   * @returns {void}
   */
  goTo(index) {
    const total = this.slides.length;
    if (total === 0) return;

    const normalizedIndex = ((index % total) + total) % total;
    this.currentIndex = normalizedIndex;
    this.update();
  },

  /**
   * Apply transform and active states
   * @returns {void}
   */
  update() {
    const offset = -this.currentIndex * 100;
    if (this.track) {
      this.track.style.transform = `translateX(${offset}%)`;
    }

    this.slides.forEach((slide, index) => {
      slide.classList.toggle('is-active', index === this.currentIndex);
    });

    this.dots.forEach((dot, index) => {
      const isActive = index === this.currentIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      dot.setAttribute('tabindex', isActive ? '0' : '-1');
    });
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
  Logger.info('Initializing AcaiStack Application...');

  try {
    // Critical managers - initialize immediately for core functionality
    const criticalManagers = [
      { name: 'DarkMode', instance: DarkModeManager },
      { name: 'MobileMenu', instance: MobileMenuManager },
      { name: 'Navigation', instance: NavigationHandler },
      { name: 'ContactForm', instance: ContactFormManager },
    ];

    criticalManagers.forEach(({ name, instance }) => {
      try {
        instance.init();
        Logger.info(`${name} initialized`);
      } catch (error) {
        Logger.error(`${name} initialization failed`, error);
        ErrorHandler.handle(error, `${name}Manager.init`);
      }
    });

    // Non-critical managers - defer to idle time for better performance
    const deferredManagers = [
      { name: 'ChatWidget', instance: ChatWidgetManager },
      { name: 'ScrollAnimation', instance: ScrollAnimationManager },
      { name: 'ProjectThemeSlider', instance: ProjectThemeSliderManager },
      { name: 'PortfolioSlider', instance: PortfolioSliderManager },
    ];

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
    Logger.info(`AcaiStack Application initialized in ${loadTime}ms`);

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
