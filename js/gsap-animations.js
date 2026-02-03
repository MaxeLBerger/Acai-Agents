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
 * Centralized Mouse Tracker
 * Single throttled mousemove listener for all mouse-following effects
 * @namespace MouseTracker
 */
const MouseTracker = {
  x: 0,
  y: 0,
  normalizedX: 0, // -0.5 to 0.5
  normalizedY: 0, // -0.5 to 0.5
  listeners: [],
  initialized: false,

  init() {
    if (this.initialized) return;

    let ticking = false;
    document.addEventListener(
      'mousemove',
      (e) => {
        this.x = e.clientX;
        this.y = e.clientY;
        this.normalizedX = e.clientX / window.innerWidth - 0.5;
        this.normalizedY = e.clientY / window.innerHeight - 0.5;

        if (!ticking) {
          requestAnimationFrame(() => {
            this.listeners.forEach((fn) => fn(this.x, this.y, this.normalizedX, this.normalizedY));
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );

    this.initialized = true;
  },

  subscribe(fn) {
    if (!this.initialized) this.init();
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  },
};

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

      // Configure ScrollTrigger for mobile optimization
      ScrollTrigger.config({
        ignoreMobileResize: true,
      });

      // Set GSAP defaults for smooth animations
      gsap.defaults({
        ease: 'power3.out',
        duration: 1,
        overwrite: 'auto',
      });

      // Initialize all animation modules
      this.initHeroAnimations();
      this.initPageHeroAnimations();
      this.initImageSequence();
      this.initScrollAnimations();
      this.initParallaxEffects();
      this.initCounterAnimations();
      this.initTestimonialsAnimations();
      this.initHowItWorksAnimations();
      this.initMicroInteractions();

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
   * Now supports hero slider system
   */
  initHeroAnimations() {
    if (this.prefersReducedMotion) {
      this.showAllElements();
      return;
    }

    // Target only the active slide's elements, or fall back to direct children
    const activeSlide =
      document.querySelector('.hero-slide.active') || document.querySelector('.gsap-hero');
    if (!activeSlide) return;

    const heroTimeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
    });

    // Animate hero badge (faster) - only if element exists
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
      heroTimeline.to('.hero-badge', {
        opacity: 1,
        y: 0,
        duration: 0.4,
      });
    }

    // Animate title lines with stagger (faster) - only in active slide
    heroTimeline.to(
      activeSlide.querySelectorAll('.title-line'),
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
      activeSlide.querySelectorAll('.hero-subtitle'),
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
      },
      '-=0.3'
    );

    // Animate CTA buttons with stagger (faster)
    heroTimeline.to(
      activeSlide.querySelectorAll('.hero-cta .btn'),
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'back.out(1.7)',
      },
      '-=0.2'
    );

    // Animate stats (faster) - only if elements exist
    const statItems = document.querySelectorAll('.stat-item');
    if (statItems.length > 0) {
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
    }

    // Animate Portfolio Showcase (NEW)
    this.initPortfolioShowcaseAnimation(heroTimeline);

    // Animate floating images (faster) - only if elements exist
    const floatingImages = document.querySelectorAll('.floating-image');
    if (floatingImages.length > 0) {
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
    }

    // Animate showcase rings (faster) - only if elements exist
    const showcaseRings = document.querySelectorAll('.showcase-ring');
    if (showcaseRings.length > 0) {
      heroTimeline.to(
        '.showcase-ring',
        {
          opacity: 0.3,
          duration: 0.5,
          stagger: 0.1,
        },
        '-=0.5'
      );
    }

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
   * Page Hero Section Animations
   * Animates the page headers on subpages with the same style as the main hero
   */
  initPageHeroAnimations() {
    if (this.prefersReducedMotion) {
      return;
    }

    // Check if we're on a subpage with a page-hero
    const pageHero = document.querySelector('.gsap-page-hero');
    if (!pageHero) {
      return;
    }

    // Don't run if the main hero exists (we're on the home page)
    const mainHero = document.querySelector('.gsap-hero');
    if (mainHero) {
      return;
    }

    const pageHeroTimeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
    });

    // Animate title lines with stagger (same as main hero)
    pageHeroTimeline.to(
      '.gsap-page-hero .title-line',
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power4.out',
      },
      '+=0.1'
    );
  },

  /**
   * Portfolio Showcase Animation
   * Creates a professional 3D reveal animation for the featured project in the hero
   * Also handles emblem showcase for AcaiStack slide
   * @param {gsap.core.Timeline} parentTimeline - The parent timeline to add animations to
   */
  initPortfolioShowcaseAnimation(parentTimeline) {
    // Handle Portfolio Showcase (Imkerei slide)
    const portfolioShowcase = document.querySelector('.hero-slide.active .hero-portfolio-showcase');

    // Handle Emblem Showcase (AcaiStack slide)
    const emblemShowcase = document.querySelector('.hero-slide.active .hero-emblem-showcase');

    // Create showcase timeline
    const showcaseTimeline = gsap.timeline();

    // Animate Emblem Showcase if present
    if (emblemShowcase) {
      this.animateEmblemShowcase(showcaseTimeline);
    }

    // Animate Portfolio Showcase if present
    if (portfolioShowcase) {
      portfolioShowcase.classList.add('is-visible');
      this.animatePortfolioFrame(showcaseTimeline);
    }

    // Add to parent timeline if provided
    if (parentTimeline && (emblemShowcase || portfolioShowcase)) {
      parentTimeline.add(showcaseTimeline, '-=0.6');
    }

    // Add continuous floating animation
    if (portfolioShowcase) {
      gsap.to('.hero-slide.active .portfolio-showcase-frame', {
        y: -10,
        rotateY: -3,
        rotateX: 1,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      });
    }

    if (emblemShowcase) {
      gsap.to('.hero-slide.active .emblem-frame', {
        y: -15,
        rotation: 2,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });
    }

    // Add mouse parallax effect
    this.initShowcaseParallax();
  },

  /**
   * Animate the emblem showcase for AcaiStack slide
   * @param {gsap.core.Timeline} timeline - The timeline to add animations to
   */
  animateEmblemShowcase(timeline) {
    // Animate emblem with scale and rotation
    timeline.fromTo(
      '.hero-slide.active .emblem-frame',
      {
        opacity: 0,
        scale: 0.5,
        rotation: -15,
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
      }
    );

    // Animate glow ring
    timeline.fromTo(
      '.hero-slide.active .emblem-glow-ring',
      {
        opacity: 0,
        scale: 0.5,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
      },
      '-=0.8'
    );

    // Animate badge
    timeline.fromTo(
      '.hero-slide.active .emblem-badge',
      {
        opacity: 0,
        y: -20,
        scale: 0.5,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(2)',
      },
      '-=0.5'
    );

    // Animate glow
    timeline.fromTo(
      '.hero-slide.active .portfolio-showcase-glow',
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 0.5,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
      },
      '-=0.8'
    );
  },

  /**
   * Animate the portfolio frame showcase
   * @param {gsap.core.Timeline} timeline - The timeline to add animations to
   */
  animatePortfolioFrame(timeline) {
    // Animate the main frame with 3D perspective
    timeline.fromTo(
      '.hero-slide.active .portfolio-showcase-frame',
      {
        opacity: 0,
        rotateY: -25,
        rotateX: 10,
        y: 60,
        scale: 0.85,
      },
      {
        opacity: 1,
        rotateY: -5,
        rotateX: 2,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
      }
    );

    // Animate browser dots with stagger
    timeline.fromTo(
      '.hero-slide.active .browser-dots .dot',
      {
        opacity: 0,
        scale: 0,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: 0.1,
        ease: 'back.out(2)',
      },
      '-=0.8'
    );

    // Animate browser URL
    timeline.fromTo(
      '.hero-slide.active .browser-url',
      {
        opacity: 0,
        y: -10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      },
      '-=0.5'
    );

    // Reveal the image with a clip-path animation
    timeline.fromTo(
      '.hero-slide.active .portfolio-showcase-image',
      {
        opacity: 0,
        scale: 1.2,
        clipPath: 'inset(100% 0% 0% 0%)',
      },
      {
        opacity: 1,
        scale: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.8,
        ease: 'power3.inOut',
      },
      '-=0.4'
    );

    // Animate the shine effect
    timeline.fromTo(
      '.hero-slide.active .portfolio-showcase-shine',
      {
        x: '-100%',
      },
      {
        x: '200%',
        duration: 1.2,
        ease: 'power2.inOut',
      },
      '-=0.4'
    );

    // Animate the featured badge with bounce
    timeline.fromTo(
      '.hero-slide.active .portfolio-showcase-badge',
      {
        opacity: 0,
        y: -30,
        scale: 0.5,
        rotation: -10,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      },
      '-=0.8'
    );

    // Animate the glow
    timeline.fromTo(
      '.hero-slide.active .portfolio-showcase-glow',
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 0.5,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
      },
      '-=1'
    );
  },

  /**
   * Showcase Parallax Effect
   * Adds subtle mouse-following effect to the portfolio and emblem showcases
   */
  initShowcaseParallax() {
    const portfolioShowcase = document.querySelector('.hero-portfolio-showcase');
    const emblemShowcase = document.querySelector('.hero-emblem-showcase');

    if (!portfolioShowcase && !emblemShowcase) return;

    // Subscribe to centralized mouse tracker
    MouseTracker.subscribe((x, y, normX, normY) => {
      const xPos = normX * 20; // Convert to -10 to 10 range
      const yPos = normY * 20;

      // Parallax for portfolio frame
      if (portfolioShowcase) {
        gsap.to('.hero-slide.active .portfolio-showcase-frame', {
          rotateY: -5 + xPos * 0.5,
          rotateX: 2 - yPos * 0.3,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      // Parallax for emblem frame
      if (emblemShowcase) {
        gsap.to('.hero-slide.active .emblem-frame', {
          x: xPos * 0.5,
          y: yPos * 0.3,
          rotation: xPos * 0.2,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    });
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

      // Continuous floating animation (pauses when off-screen for performance)
      gsap.to(image, {
        y: `+=${15 * speed}`,
        rotation: 1 * speed,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay,
        scrollTrigger: {
          trigger: image,
          toggleActions: 'play pause resume pause',
        },
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
    const visualStack = document.querySelector('.visual-stack');

    // Track current step for smooth transitions
    let currentStep = 0;

    // Glow colors for each phase (matching CSS)
    const glowColors = [
      'rgba(33, 128, 141, 0.3)',  // Teal - Discovery
      'rgba(139, 92, 246, 0.3)',  // Purple - Design
      'rgba(34, 197, 94, 0.3)',   // Green - Development
      'rgba(251, 191, 36, 0.3)',  // Amber - Launch
    ];

    // Create the pinned scroll timeline
    const sequenceTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.image-sequence-section',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        pin: '.sequence-container',
        anticipatePin: 1,
        onUpdate: (self) => {
          // Smooth progress bar update
          if (progressFill) {
            gsap.to(progressFill, {
              width: `${self.progress * 100}%`,
              duration: 0.3,
              ease: 'power2.out',
            });
          }

          // Calculate step with buffer zones for smoother transitions
          const rawProgress = self.progress * 4;
          const newStep = Math.min(Math.floor(rawProgress), 3);

          // Only update if step changed
          if (newStep !== currentStep) {
            currentStep = newStep;

            // Update background glow color
            if (visualStack) {
              gsap.to(visualStack, {
                '--glow-color': glowColors[currentStep],
                duration: 0.6,
                ease: 'power2.out',
              });
            }

            // Update frames with staggered animation
            frames.forEach((frame, index) => {
              if (index === currentStep) {
                frame.classList.add('active');
                gsap.fromTo(frame, 
                  { opacity: 0.5, x: -10 },
                  { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
                );
              } else {
                frame.classList.remove('active');
              }
            });

            // Update images with smooth GSAP transitions
            images.forEach((img, index) => {
              img.classList.remove('active', 'prev', 'next');
              
              if (index === currentStep) {
                img.classList.add('active');
              } else if (index < currentStep) {
                img.classList.add('prev');
              } else {
                img.classList.add('next');
              }
            });

            // Update progress steps
            progressSteps.forEach((stepEl, index) => {
              if (index <= currentStep) {
                stepEl.classList.add('active');
              } else {
                stepEl.classList.remove('active');
              }
            });
          }
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

    // Use ScrollTrigger.batch for efficient card animations
    // Combines service, portfolio, and team cards into one batch observer
    // Reduces ScrollTrigger instances from 18+ to 1 for better performance
    ScrollTrigger.batch('.service-card, .portfolio-card, .team-card', {
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 30, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
          }
        );
      },
      onLeaveBack: (elements) => {
        gsap.to(elements, {
          opacity: 0,
          y: 30,
          filter: 'blur(8px)',
          duration: 0.4,
          stagger: 0.05,
        });
      },
      start: 'top 85%',
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

  /**   * Testimonials Section Animations
   * Premium stagger reveals with blur effect
   */
  initTestimonialsAnimations() {
    if (this.prefersReducedMotion) return;

    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (!testimonialCards.length) return;

    // Stagger reveal with blur
    gsap.from(testimonialCards, {
      y: 60,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 0.8,
      ease: 'power3.out',
      stagger: {
        amount: 0.4,
        from: 'start',
      },
      scrollTrigger: {
        trigger: '.testimonials-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Spotlight effect follows cursor
    testimonialCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    });
  },

  /**
   * How It Works Section Animations
   * Step-by-step reveal with number pop
   */
  initHowItWorksAnimations() {
    if (this.prefersReducedMotion) return;

    const stepCards = document.querySelectorAll('.step-card');
    if (!stepCards.length) return;

    // Animate step cards with stagger
    gsap.from(stepCards, {
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.steps-grid',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    // Animate step numbers with pop effect
    const stepNumbers = document.querySelectorAll('.step-number');
    gsap.from(stepNumbers, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(2)',
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.steps-grid',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    // Animate icons with bounce
    const stepIcons = document.querySelectorAll('.step-icon');
    gsap.from(stepIcons, {
      y: -20,
      opacity: 0,
      duration: 0.6,
      ease: 'bounce.out',
      stagger: 0.15,
      delay: 0.3,
      scrollTrigger: {
        trigger: '.steps-grid',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });
  },

  /**
   * Premium Micro-interactions
   * Magnetic buttons, tilt cards, ripple effects
   */
  initMicroInteractions() {
    if (this.prefersReducedMotion) return;

    // Magnetic button effect
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary');
    magneticBtns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)',
        });
      });
    });

    // Ripple effect position tracking
    const rippleBtns = document.querySelectorAll('.btn-ripple');
    rippleBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        btn.style.setProperty('--ripple-x', `${x}px`);
        btn.style.setProperty('--ripple-y', `${y}px`);
      });
    });

    // 3D Tilt effect for cards
    const tiltCards = document.querySelectorAll('.service-card, .testimonial-card, .step-card');
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        gsap.to(card, {
          rotateX,
          rotateY,
          transformPerspective: 1000,
          duration: 0.4,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: 'power3.out',
        });
      });
    });
  },

  /**   * Show all elements without animation (for reduced motion)
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
 * Initialize everything when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  GSAPAnimationManager.init();
  SmoothScrollManager.init();
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
  };
}
