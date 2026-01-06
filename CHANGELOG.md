# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned

- Contact form backend integration
- Blog section
- Case studies page
- Service worker for offline support
- Unit and E2E tests

---

## [2.0.0] - 2026-01-06

### 🎉 Senior-Level Code Optimization

Major overhaul achieving production-ready, enterprise-grade quality standards.

### Added

#### Project Structure Improvement

- **`pages/` Directory** - Organized all HTML pages into dedicated folder
- **Clean Root** - Only `index.html` remains in root for standard deployment
- **Logical Separation** - Pages, styles, scripts, assets in separate
  directories
- **Scalable Architecture** - Easy to add new pages and maintain structure

#### Security Enhancements

- **Content Security Policy (CSP)** - Strict CSP headers to prevent XSS
- **Subresource Integrity (SRI)** - SRI hashing for all CDN resources
- **Enhanced Input Sanitization** - ReDoS-safe email validation
- **Security Headers** - X-Frame-Options, X-Content-Type-Options,
  X-XSS-Protection
- **URL Sanitization** - Protection against javascript: protocol attacks

#### Performance Optimizations

- **Resource Hints** - Preconnect and DNS-prefetch for CDN
- **Critical Asset Preloading** - CSS and JS preloading for faster FCP
- **Performance Monitoring** - Built-in performance tracking with Navigation
  Timing API
- **Optimized Animations** - Reduced-motion support and performance-conscious
  GSAP implementation

#### SEO Improvements

- **Structured Data (JSON-LD)** - Complete schema.org Organization markup
- **Open Graph Tags** - Full OG and Twitter Card support
- **Canonical URLs** - Proper canonical link implementation
- **Enhanced Meta Tags** - Comprehensive meta descriptions and keywords
- **Favicon Variants** - Multiple sizes including Apple Touch Icon

#### Code Quality

- **Comprehensive JSDoc** - Full JSDoc documentation for all functions
- **Error Handling** - Try-catch blocks and error logging throughout
- **Type Safety** - Parameter validation and type checking
- **Logger Utility** - Centralized logging with debug mode
- **Configuration Object** - Centralized app configuration
- **ESLint Compliance** - All linting errors fixed
- **Prettier Formatting** - Consistent code formatting

#### Accessibility

- **Escape Key Support** - Close chat widget with Escape key
- **Enhanced ARIA** - Improved ARIA labels and roles
- **Keyboard Navigation** - Better focus management
- **Screen Reader Support** - Announcements for state changes

### Changed

- **Language Consistency** - Fixed German text in English navigation
  (index.html)
- **Dark Mode Manager** - Enhanced with better error handling and system
  preference detection
- **Chat Widget** - Improved with message validation and error handling
- **Email Validation** - Upgraded to ReDoS-safe implementation with domain part
  validation
- **GSAP Initialization** - Added retry logic and graceful fallbacks
- **File Structure** - Better organization of utilities and managers

### Fixed

- **CSS Syntax Error** - Fixed unclosed block in layout.css
- **ESLint Errors** - Resolved all unsafe regex and undefined variable warnings
- **Code Duplication** - Removed duplicate code in app.js

### Security

- **XSS Protection** - Multiple layers of XSS prevention
- **CSRF Tokens** - Auto-generated CSRF tokens for all forms
- **Input Validation** - Maximum length checks and safe regex patterns
- **Secure Dependencies** - Using integrity hashes for CDN resources

---

## [1.1.0] - 2026-01-05

### ✨ Professional GSAP Animations

Added high-end, professional-grade animations powered by GSAP and ScrollTrigger
for a truly immersive user experience.

### Added

#### GSAP Integration

- **GSAP 3.12.5** - Professional animation library via CDN
- **ScrollTrigger Plugin** - Scroll-based animation triggers
- **Immersive Hero Section** - Redesigned with animated text, floating images,
  and parallax effects
- **Image Sequence Section** - Pinned scroll animation showcasing our process
- **Counter Animations** - Animated statistics in hero section
- **Magnetic Button Effects** - Interactive hover effects on buttons
- **Mouse Parallax** - Images respond to cursor movement

#### Visual Enhancements

- **Animated Orbs** - Gradient orbs with floating animation
- **Gradient Text Animation** - Animated color-shifting text
- **Showcase Rings** - Pulsing decorative rings
- **Staggered Reveals** - Cards and elements animate in sequence
- **Section Title Underlines** - Animated underlines on scroll

#### Performance

- **Image Preloading** - Critical images preloaded for faster LCP
- **GPU Acceleration** - Using `will-change` for smooth 60fps animations
- **Reduced Motion Support** - Respects `prefers-reduced-motion` preference
- **Lazy Loading** - Non-critical images load on demand

### Changed

- **Hero Section** - Complete redesign with split layout (text + visual
  showcase)
- **Favicon** - Updated to grape emoji (🍇) for brand consistency
- **CSS Architecture** - Added dedicated `gsap-animations.css` file
- **JS Architecture** - Added dedicated `gsap-animations.js` module

### Technical

- ESLint configuration updated for GSAP globals
- All animations respect accessibility preferences
- Smooth scroll enhancement for anchor links
- Responsive design for all new components

---

## [1.0.0] - 2026-01-05

### 🎉 Initial Release

This is the first official release of the Acai Agents website, featuring a
complete rebranding from APEX to Acai Agents.

### Added

#### Core Features

- **Homepage** with hero section, services, portfolio, technology, team, and
  contact sections
- **Developer/Customer Mode Toggle** - Switch between technical and
  business-focused content
- **Live Chat Widget** - Integrated customer support chat
- **Contact Form** - With client-side validation and CSRF protection
- **Smooth Scroll Navigation** - Enhanced UX with scroll reveal animations

#### Security

- XSS prevention with input sanitization (`Sanitizer` utility)
- CSRF token management (`CSRFManager` utility)
- Form validation (`FormValidator` utility)
- No inline scripts or event handlers
- CSP-ready architecture

#### Accessibility

- WCAG AAA compliant color contrast
- Full keyboard navigation support
- Screen reader optimizations with ARIA labels
- Focus management utilities
- Reduced motion support

#### Developer Experience

- ESLint 9 flat config with security rules
- Prettier code formatting
- EditorConfig for consistent styling
- VS Code workspace settings and recommended extensions
- GitHub Actions CI/CD pipeline
- Issue templates for bugs and features
- GitHub Copilot instructions

#### Architecture

- Modular CSS with design tokens
- Manager pattern for JavaScript organization
- Event delegation for performance
- Lazy loading for images

### Technical Details

- **CSS Files**: 4 modular files (base, components, animations, layout)
- **JS Files**: 2 files (utils, app)
- **Performance**: Lighthouse 90+ score
- **Accessibility**: Lighthouse 100 score
- **Browser Support**: Chrome, Firefox, Safari, Edge (last 2 versions)

---

## Version History Summary

| Version | Date       | Description                               |
| ------- | ---------- | ----------------------------------------- |
| 1.0.0   | 2026-01-05 | Initial release with Acai Agents branding |

---

## Upgrade Guide

### From APEX to Acai Agents

If you had any customizations based on the APEX version:

1. Update all `apex` references to `acai-agents`
2. Update localStorage key from `apex-mode` to `acai-mode`
3. Update email addresses from `@apex.dev` to `@acai-agents.dev`
4. Update any bookmarked URLs

---

[Unreleased]: https://github.com/acai-agents/website/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/acai-agents/website/releases/tag/v1.0.0
