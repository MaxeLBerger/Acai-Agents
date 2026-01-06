/**
 * ============================================================================
 * ACAISTACK - GSAP ANIMATIONS
 * Professional scroll-triggered animations powered by GSAP & ScrollTrigger
 * Version: 2.0.0
 * Last Updated: 2026-01-06
 *
 * Features:
 * - Scroll-triggered animations with IntersectionObserver fallback
 * - Respects prefers-reduced-motion
 * - Optimized performance with requestAnimationFrame
 * - Comprehensive error handling
 * - Memory-efficient with proper cleanup
 * ============================================================================
 */

'use strict';

/**
 * GSAP Animation Manager
 * Handles all GSAP-powered animations for the AcaiStack website
 * @namespace GSAPAnimationManager
 */
const GSAPAnimationManager = {
  /** @type {boolean} Whether GSAP has been initialized */
  initialized: false,

  /** @type {boolean} Whether user prefers reduced motion */
  prefersReducedMotion: false,

  /** @type {number} Maximum initialization retries */
  maxRetries: 10,

  /** @type {number} Current retry count */
  retryCount: 0,

  /**
   * Initialize GSAP and all animations
   * @returns {void}
   */
  init() {
    try {
      // Check for reduced motion preference
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (this.prefersReducedMotion) {
        console.log('🍇 Reduced motion detected - showing static content');
        this.showAllElements();
        return;
      }

      // Wait for GSAP to load
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        if (this.retryCount < this.maxRetries) {
          this.retryCount++;
          // Retry after a short delay if GSAP isn't loaded yet
          setTimeout(() => this.init(), 100);
          return;
        }

        console.warn('GSAP failed to load after maximum retries. Falling back to CSS animations.');
        this.showAllElements();
        return;
      }

      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      // Set GSAP defaults for smooth animations
      gsap.defaults({
        ease: 'power3.out',
        duration: 1,
      });

      // Initialize all animation modules
      this.initHeroAnimations();
      this.initImageSequence();
      this.initScrollAnimations();
      this.initParallaxEffects();
      this.initCounterAnimations();

      this.initialized = true;

      // Log initialization
      console.log('🍇 AcaiStack - GSAP Animations initialized');
    } catch (error) {
      console.error('Error initializing GSAP animations:', error);
      this.showAllElements();
    }
  },

  /**
   * Hero Section Animations
   * Creates an immersive entrance experience (optimized timing)
   */
  initHeroAnimations() {
    if (this.prefersReducedMotion) {
      this.showAllElements();
      return;
    }

    const heroTimeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
    });

    // Animate hero badge (faster)
    heroTimeline.to('.hero-badge', {
      opacity: 1,
      y: 0,
      duration: 0.4,
    });

    // Animate title lines with stagger (faster)
    heroTimeline.to(
      '.title-line',
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power4.out',
      },
      '-=0.2'
    );

    // Animate subtitle (faster)
    heroTimeline.to(
      '.hero-subtitle',
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
      },
      '-=0.3'
    );

    // Animate CTA buttons with stagger (faster)
    heroTimeline.to(
      '.hero-cta .btn',
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'back.out(1.7)',
      },
      '-=0.2'
    );

    // Animate stats (faster)
    heroTimeline.to(
      '.stat-item',
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.05,
      },
      '-=0.15'
    );

    // Animate floating images (faster)
    heroTimeline.to(
      '.floating-image',
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: {
          amount: 0.4,
          from: 'random',
        },
        ease: 'elastic.out(1, 0.6)',
      },
      '-=0.4'
    );

    // Animate showcase rings (faster)
    heroTimeline.to(
      '.showcase-ring',
      {
        opacity: 0.3,
        duration: 0.5,
        stagger: 0.1,
      },
      '-=0.5'
    );

    // Animate scroll indicator (faster)
    heroTimeline.to(
      '.scroll-indicator',
      {
        opacity: 1,
        duration: 0.3,
      },
      '-=0.25'
    );

    // Continuous floating animation for images
    this.initFloatingAnimation();
  },

  /**
   * Continuous Floating Animation for Hero Images
   * Optimized with single throttled mousemove listener
   */
  initFloatingAnimation() {
    const floatingImages = document.querySelectorAll('.floating-image');
    if (!floatingImages.length) return;

    // Store image data for efficient access
    const imageData = [];

    floatingImages.forEach((image, index) => {
      const speed = parseFloat(image.dataset.speed) || 0.5;
      const delay = index * 0.5;

      // Store speed for mousemove handler
      imageData.push({ element: image, speed });

      // Continuous floating animation
      gsap.to(image, {
        y: `+=${15 * speed}`,
        rotation: 1 * speed,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay,
      });
    });

    // Single throttled mousemove listener for ALL images (performance fix)
    let ticking = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const updateParallax = () => {
      const { innerWidth, innerHeight } = window;

      imageData.forEach(({ element, speed }) => {
        const xPos = (lastMouseX / innerWidth - 0.5) * 20 * speed;
        const yPos = (lastMouseY / innerHeight - 0.5) * 20 * speed;

        gsap.to(element, {
          x: xPos,
          y: yPos,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });

      ticking = false;
    };

    document.addEventListener('mousemove', (e) => {
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;

      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  },

  /**
   * Image Sequence Section with Pinned Scroll
   * Creates a professional scroll-triggered image morph effect
   */
  initImageSequence() {
    if (this.prefersReducedMotion) {
      return;
    }

    const sequenceSection = document.querySelector('.image-sequence-section');
    if (!sequenceSection) {
      return;
    }

    const frames = document.querySelectorAll('.sequence-frame');
    const images = document.querySelectorAll('.stack-image');
    const progressFill = document.querySelector('.progress-fill');
    const progressSteps = document.querySelectorAll('.progress-steps .step');

    // Create the pinned scroll timeline
    const sequenceTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.image-sequence-section',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: '.sequence-container',
        anticipatePin: 1,
        onUpdate: (self) => {
          // Update progress bar
          if (progressFill) {
            progressFill.style.width = `${self.progress * 100}%`;
          }

          // Determine active step based on progress
          const step = Math.min(Math.floor(self.progress * 4), 3);

          // Update frames
          frames.forEach((frame, index) => {
            if (index === step) {
              frame.classList.add('active');
            } else {
              frame.classList.remove('active');
            }
          });

          // Update images
          images.forEach((img, index) => {
            img.classList.remove('active', 'prev', 'next');
            if (index === step) {
              img.classList.add('active');
            } else if (index < step) {
              img.classList.add('prev');
            } else {
              img.classList.add('next');
            }
          });

          // Update progress steps
          progressSteps.forEach((stepEl, index) => {
            if (index <= step) {
              stepEl.classList.add('active');
            } else {
              stepEl.classList.remove('active');
            }
          });
        },
      },
    });

    // Animate sequence title and description
    gsap.to('.sequence-title', {
      opacity: 1,
      x: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.image-sequence-section',
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1,
      },
    });

    gsap.to('.sequence-description', {
      opacity: 1,
      x: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.image-sequence-section',
        start: 'top 70%',
        end: 'top 40%',
        scrub: 1,
      },
    });

    // Set initial state for first image
    if (images[0]) {
      images[0].classList.add('active');
    }
    if (frames[0]) {
      frames[0].classList.add('active');
    }
    if (progressSteps[0]) {
      progressSteps[0].classList.add('active');
    }

    return sequenceTimeline;
  },

  /**
   * General Scroll Animations for All Sections
   */
  initScrollAnimations() {
    if (this.prefersReducedMotion) {
      return;
    }

    // Animate service cards
    gsap.utils.toArray('.service-card').forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Animate portfolio cards
    gsap.utils.toArray('.portfolio-card').forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.15,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Animate team cards
    gsap.utils.toArray('.team-card').forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Animate section titles
    gsap.utils.toArray('.section-title').forEach((title) => {
      gsap.to(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
          onEnter: () => title.classList.add('animated'),
          onLeaveBack: () => title.classList.remove('animated'),
        },
      });
    });

    // Animate tech tags
    gsap.utils.toArray('.tech-list').forEach((list) => {
      const tags = list.querySelectorAll('.tech-tag');
      gsap.fromTo(
        tags,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          scrollTrigger: {
            trigger: list,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Animate benefits cards
    gsap.utils.toArray('.benefit').forEach((benefit, index) => {
      gsap.fromTo(
        benefit,
        { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: benefit,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Contact section animation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      gsap.fromTo(
        contactForm,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: contactForm,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  },

  /**
   * Parallax Effects for Background Elements
   */
  initParallaxEffects() {
    if (this.prefersReducedMotion) {
      return;
    }

    // Parallax for hero orbs
    gsap.to('.hero-orb-1', {
      y: -100,
      scrollTrigger: {
        trigger: '.gsap-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    gsap.to('.hero-orb-2', {
      y: -150,
      scrollTrigger: {
        trigger: '.gsap-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    gsap.to('.hero-orb-3', {
      y: -80,
      scale: 1.2,
      scrollTrigger: {
        trigger: '.gsap-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Fade out scroll indicator on scroll
    gsap.to('.scroll-indicator', {
      opacity: 0,
      y: 20,
      scrollTrigger: {
        trigger: '.gsap-hero',
        start: 'top top',
        end: '20% top',
        scrub: 1,
      },
    });
  },

  /**
   * Counter Animations for Stats
   */
  initCounterAnimations() {
    if (this.prefersReducedMotion) {
      // Just show final values
      document.querySelectorAll('.stat-number').forEach((counter) => {
        const target = parseInt(counter.dataset.target, 10);
        if (!isNaN(target)) {
          counter.textContent = target;
        }
      });
      return;
    }

    const counters = document.querySelectorAll('.stat-number');

    counters.forEach((counter) => {
      const target = parseInt(counter.dataset.target, 10);
      if (isNaN(target)) {
        return;
      }

      gsap.fromTo(
        counter,
        { textContent: 0 },
        {
          textContent: target,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: counter,
            start: 'top 90%',
            once: true,
          },
        }
      );
    });
  },

  /**
   * Show all elements without animation (for reduced motion)
   */
  showAllElements() {
    const elements = [
      '.hero-badge',
      '.title-line',
      '.hero-subtitle',
      '.hero-cta .btn',
      '.stat-item',
      '.floating-image',
      '.showcase-ring',
      '.scroll-indicator',
      '.service-card',
      '.portfolio-card',
      '.team-card',
      '.sequence-title',
      '.sequence-description',
    ];

    elements.forEach((selector) => {
      const els = document.querySelectorAll(selector);
      els.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    });
  },

  /**
   * Refresh ScrollTrigger on resize
   */
  refresh() {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  },

  /**
   * Cleanup all animations
   */
  destroy() {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }
    if (typeof gsap !== 'undefined') {
      gsap.killTweensOf('*');
    }
    this.initialized = false;
  },
};

/**
 * Smooth Scroll Enhancement
 */
const SmoothScrollManager = {
  init() {
    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') {
          return;
        }

        const targetElement = document.querySelector(targetId);
        if (!targetElement) {
          return;
        }

        e.preventDefault();

        // Check if GSAP is available
        if (typeof gsap !== 'undefined') {
          gsap.to(window, {
            scrollTo: {
              y: targetElement,
              offsetY: 80,
            },
            duration: 1,
            ease: 'power3.inOut',
          });
        } else {
          // Fallback to native smooth scroll
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  },
};

/**
 * Magnetic Button Effect
 */
const MagneticButtonManager = {
  init() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const buttons = document.querySelectorAll('.btn-glow, .btn-primary');

    buttons.forEach((button) => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        if (typeof gsap !== 'undefined') {
          gsap.to(button, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      });

      button.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
          });
        }
      });
    });
  },
};

/**
 * Initialize everything when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  GSAPAnimationManager.init();
  SmoothScrollManager.init();
  MagneticButtonManager.init();
});

/**
 * Handle resize events
 */
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    GSAPAnimationManager.refresh();
  }, 250);
});

/**
 * Export for potential module usage
 */
// eslint-disable-next-line no-undef
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  // eslint-disable-next-line no-undef
  module.exports = {
    GSAPAnimationManager,
    SmoothScrollManager,
    MagneticButtonManager,
  };
}
