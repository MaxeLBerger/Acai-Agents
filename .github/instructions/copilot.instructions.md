---
applyTo: '**'
---

# Acai Agents - GitHub Copilot Instructions

## Project Overview

This is the official website for **AcaiStack** (repo: **Acai Agents**) - an
AI-Powered Software Development Agency. The website is built with vanilla HTML,
CSS, JavaScript, and GSAP with a focus on security, accessibility, performance,
and immersive animations.

## Language Requirements

**IMPORTANT: The entire website must be in English only.**

- All UI text, labels, buttons, and navigation must be in English
- All comments in code should be in English
- All aria-labels and accessibility text must be in English
- Never mix languages (e.g., no German text in an English website)
- This applies to: HTML content, JavaScript strings, CSS comments, error
  messages

## Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES2024)
- **Animations**: GSAP (GreenSock) + ScrollTrigger
- **Styling**: Custom CSS with design tokens and CSS custom properties
- **Build Tools**: PostCSS, Terser, Live Server
- **Linting**: ESLint 9+ (flat config), Prettier
- **Architecture**: Modular, component-based vanilla JS

## Project Structure

```
Acai-Agents/
├── index.html              # Entry point (often redirects to dashboard)
├── dashboard.html          # Main Landing/Dashboard page
├── services.html           # Services & Solutions
├── pricing.html            # Pricing Plans
├── portfolio.html          # Case Studies/Portfolio
├── team.html               # Team & Company Info
├── contact.html            # Contact Form
├── css/
│   ├── base.css           # Foundation, variables, utilities
│   ├── components.css     # Reusable UI components
│   ├── animations.css     # CSS-based animations
│   ├── layout.css         # Page structure and grids
│   └── gsap-animations.css # GSAP-specific styles
├── js/
│   ├── utils.js           # Security, validation, accessibility utilities
│   ├── app.js             # General App logic (Dark mode, UI)
│   └── gsap-animations.js # GSAP ScrollTrigger setup
├── .vscode/               # VS Code workspace settings
├── .github/               # GitHub templates and workflows
└── package.json           # Project configuration
```

## Coding Standards

### JavaScript

1. **Use modern ES2024 features** - const/let (no var), arrow functions,
   template literals, optional chaining, nullish coalescing
2. **Follow the Manager pattern** - Encapsulate related functionality in Manager
   objects (e.g., `ModeManager`, `ChatManager`)
3. **Use event delegation** - Attach listeners to parent elements, NOT inline
   onclick handlers
4. **Sanitize all user input** - Use `Sanitizer.sanitizeInput()` for any
   user-provided content
5. **Use textContent over innerHTML** - Prevent XSS vulnerabilities
6. **Document with JSDoc** - All public functions should have JSDoc comments
7. **Single responsibility** - Each function should do one thing well

### Animations (GSAP)

1.  **Use GSAP for complex sequences** - Scroll-triggered effects, staggering,
    and path movement.
2.  **Respect Reduced Motion** - Always check
    `window.matchMedia('(prefers-reduced-motion: reduce)')` before playing
    animations.
3.  **Clean up ScrollTriggers** - Ensure triggers are refreshed or killed on
    page transitions if applicable (SPA behavior), though this is MPA.
4.  **Use GSAPAnimationManager** - Keep animation logic centralized.

### CSS

1. **Use CSS custom properties** - All colors, spacing, and typography should
   use design tokens
2. **Mobile-first responsive** - Start with mobile styles, enhance for larger
   screens
3. **BEM-inspired naming** - Use clear, descriptive class names
4. **Modular architecture** - Separate concerns into base, components,
   animations, layout
5. **WCAG AAA contrast** - All text must meet 4.5:1 contrast ratio minimum

### HTML

1. **Semantic markup** - Use appropriate HTML5 elements (section, article, nav,
   main)
2. **Accessibility first** - All interactive elements need aria-labels, proper
   focus management
3. **No inline styles or scripts** - All styling in CSS files, all JS in JS
   files
4. **Lazy loading** - Images should use `loading="lazy"`

## Security Requirements

When generating code, always consider:

1. **XSS Prevention** - Never insert untrusted data into HTML without escaping
2. **CSRF Protection** - All forms should have CSRF tokens via `CSRFManager`
3. **Input Validation** - Validate all user inputs client-side with
   `FormValidator`
4. **No eval()** - Never use eval or Function constructor with user input
5. **Content Security Policy** - Code should be compatible with strict CSP

## Accessibility Requirements

1. **Keyboard navigation** - All interactive elements must be keyboard
   accessible
2. **Screen reader support** - Use ARIA labels and roles appropriately
3. **Focus management** - Visible focus indicators, logical tab order
4. **Reduced motion** - Respect `prefers-reduced-motion` media query
5. **Color contrast** - WCAG AAA compliance (4.5:1 minimum)

## Available Utilities

When writing JavaScript, these utilities are available globally:

```javascript
// Security
Sanitizer.sanitizeInput(input); // Escape HTML special characters
Sanitizer.escapeHTML(text); // Prevent XSS
Sanitizer.isValidEmail(email); // Validate email format

// Forms
CSRFManager.addTokenToForm(form); // Add CSRF token to form
FormValidator.validateRequired(field);
FormValidator.validateEmail(field);
FormValidator.showError(field, message);
FormValidator.showSuccess(field);

// UI
ButtonManager.setLoading(btn, text);
ButtonManager.setSuccess(btn, text);
ButtonManager.reset(btn);

// Accessibility
AccessibilityManager.focus(element);
AccessibilityManager.announce(message); // Screen reader announcement
AccessibilityManager.trapFocus(element);

// Animations
// GSAP is available on window.gsap and window.ScrollTrigger
// Use GSAPAnimationManager to handle setup
GSAPAnimationManager.init();

// Events
EventDelegate.on(parent, eventType, selector, handler);

// Errors
ErrorHandler.handle(error, context);
ErrorHandler.showNotification(message, type);
```

## Code Examples

### Adding a New Manager

```javascript
/**
 * EXAMPLE MANAGER - Description of what this manages
 */
const ExampleManager = {
  /**
   * Initialize the manager
   */
  init() {
    // Bind event listeners using delegation
    const container = document.getElementById('container');
    if (container) {
      container.addEventListener('click', (e) => this.handleClick(e));
    }
  },

  /**
   * Handle click events
   * @param {Event} event - The click event
   */
  handleClick(event) {
    if (event.target.matches('.target-class')) {
      // Handle the click
    }
  },
};
```

### Safe User Input Handling

```javascript
// ALWAYS sanitize user input before displaying
const userInput = document.getElementById('input').value;
const safeInput = Sanitizer.sanitizeInput(userInput);

// Use textContent, NOT innerHTML
element.textContent = safeInput;
```

## Don't Do

- ❌ Use `innerHTML` with user data
- ❌ Use inline event handlers (`onclick=""`)
- ❌ Use `var` (use `const` or `let`)
- ❌ Skip ARIA labels on interactive elements
- ❌ Use magic numbers without CSS variables
- ❌ Mix concerns (JS in HTML, CSS in JS)
- ❌ Ignore error handling

## Do

- ✅ Use event delegation
- ✅ Sanitize all user input
- ✅ Use semantic HTML
- ✅ Include ARIA labels
- ✅ Use CSS custom properties
- ✅ Handle errors gracefully
- ✅ Write JSDoc comments
- ✅ Test keyboard navigation
