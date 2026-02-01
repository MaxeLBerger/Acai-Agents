# AcaiStack Refactoring Plan

> Analysis based on LLM/AI Coding Principles Generated: January 9, 2026 **Last
> Updated: January 10, 2026**

---

## Summary

After analyzing the codebase against LLM/AI coding principles (flat code, no
duplication, simple entry points, regenerability), I found **~2,900 lines** of
redundant code that can be removed and several structural issues to fix.

### ✅ Completed Refactoring

| Task                            | Lines Removed | Status  |
| ------------------------------- | ------------- | ------- |
| CSS Variables Consolidation     | ~900 lines    | ✅ Done |
| Duplicate MagneticButtonManager | ~40 lines     | ✅ Done |
| Inline Styles → External CSS    | ~2,037 lines  | ✅ Done |

**Total lines of redundant code addressed: ~2,977 lines**

**New files created:**

- `css/pages/pricing.css` (383 lines)
- `css/pages/portfolio.css` (343 lines)
- `css/pages/team.css` (365 lines)
- `css/pages/contact.css` (340 lines)
- `css/pages/services.css` (196 lines)
- `css/pages/legal.css` (shared by privacy.html + terms.html, ~200 lines)
- `css/pages/faq.css` (50 lines)

**What's Already Good:**

- Shared navbar/footer component system works well
- Security utilities (XSS, CSRF) are solid
- Accessibility (ARIA, skip links) is properly implemented
- Modern JS/CSS practices are used throughout

---

## 🔴 High Priority

These issues significantly impact maintainability and violate core principles.

### 1. CSS Variables Duplicated 4 Times (~900 lines) ✅ FIXED

**Problem:** The `:root` CSS variables block (~300 lines) was copy-pasted in 4
files.

**Fix Applied:** Kept variables only in `base.css`. Removed from
`components.css`, `layout.css`, and `animations.css`.

---

### 2. Duplicate MagneticButtonManager (~40 lines) ✅ FIXED

**Problem:** Two magnetic button effect implementations existed in
`gsap-animations.js`:

- `initMicroInteractions()` (lines 719-760) - comprehensive with ripple and 3D
  tilt
- Standalone `MagneticButtonManager` object (lines 889-925) - simpler duplicate

**Fix Applied:** Removed the duplicate `MagneticButtonManager`. Kept the more
complete version inside `initMicroInteractions()`.

---

### 3. Inline Styles in HTML (~2,037 lines) ✅ FIXED

**Problem:** 8 HTML pages had inline `<style>` blocks, violating separation of
concerns.

**Fix Applied:** Created `css/pages/` directory with page-specific CSS files:

- pricing.css, portfolio.css, team.css, contact.css, services.css, faq.css,
  legal.css

---

## 🟠 Medium Priority (Remaining)

### 4. Two Contact Form Handlers

**Problem:** Two separate form handlers exist:

- `FormManager` in `js/utils.js` → handles `#contactForm`
- `ContactForm` in `js/acaistack-components.js` → handles `.contact-form`

Both do the same thing (validate, submit, honeypot check).

**Fix:** Keep `ContactForm` in `acaistack-components.js` (more complete). Remove
`FormManager` from `utils.js`.

---

### 5. Two Initialization Entry Points

- `css/base.css` ✅ (keep here)
- `css/components.css` ❌ (remove)
- `css/layout.css` ❌ (remove)
- `css/animations.css` ❌ (remove)

**Fix:** Keep variables only in `base.css`. Remove from other files.

**Why:** Changing a color requires editing 4 files. This is the biggest source
of duplication.

---

### 2. Two Contact Form Handlers

**Problem:** Two separate form handlers exist:

- `FormManager` in `js/utils.js` → handles `#contactForm`
- `ContactForm` in `js/acaistack-components.js` → handles `.contact-form`

Both do the same thing (validate, submit, honeypot check).

**Fix:** Keep `ContactForm` in `acaistack-components.js` (more complete). Remove
`FormManager` from `utils.js`.

---

### 3. Two Initialization Entry Points

**Problem:** Two DOMContentLoaded handlers run on page load:

- `initializeAcaiAgents()` in `js/utils.js` (line ~531)
- `DOMContentLoaded` handler in `js/acaistack-components.js` (line ~751)

This creates race conditions and confusion about what runs when.

**Fix:** Merge into a single `app.js` initialization. Have other files export
utilities only.

---

### 4. Duplicate Magnetic Button Effect

**Problem:** The magnetic hover effect for buttons is implemented twice in
`js/gsap-animations.js`:

- Inside `MagneticButtonManager` (lines 786-838)
- Standalone `MagneticButtonManager` again (lines 889-930)

**Fix:** Delete the duplicate. Keep only one implementation.

---

### 5. Inline Styles in HTML Pages (~300 lines)

**Problem:** Several pages have large `<style>` blocks:

- `pages/services.html` - 100+ lines
- `pages/contact.html` - 100+ lines
- `pages/pricing.html` - 100+ lines

**Fix:** Move page-specific styles to `css/acaistack-components.css` or create
`css/pages.css`.

---

## 🟠 Medium Priority

These issues add complexity but don't break functionality.

### 6. Remove Logger Abstraction

**Problem:** `js/utils.js` has a custom `Logger` object that wraps `console.log`
but adds no real value. The debug flag is always `false`.

**Fix:** Use `console.log` directly. Delete the `Logger` object.

---

### 7. Two Scroll Animation Systems

**Problem:** Two systems animate elements on scroll:

- `ScrollRevealManager` in `js/utils.js` uses native IntersectionObserver
- GSAP ScrollTrigger in `js/gsap-animations.js`

Both target similar elements, potentially conflicting.

**Fix:** Use GSAP only (more powerful, already loaded). Remove
`ScrollRevealManager` from utils.js.

---

### 8. Over-Documented Simple Functions

**Problem:** Many obvious functions have verbose JSDoc blocks:

```javascript
/**
 * Log info message
 * @param {string} message - Message to log
 */
info(message) {
  console.log(message);
}
```

**Fix:** Remove JSDoc from self-explanatory functions. Keep only for complex
logic.

---

### 9. Dark Mode Defined in Multiple CSS Files

**Problem:** Dark mode styles (`@media prefers-color-scheme`, `.dark-mode`,
`.light-mode`) are defined in:

- `css/base.css` ✅ (keep here)
- `css/layout.css` ❌ (remove)
- `css/components.css` ❌ (remove)

**Fix:** Keep dark mode only in `base.css`.

---

### 10. Inconsistent Module Pattern

**Problem:** The codebase mixes:

- ES6 modules (`export function`)
- Global objects (`window.Sanitizer = {}`)
- CommonJS checks (`typeof module !== 'undefined'`)

**Fix:** Standardize on ES6 modules. Remove global assignments and CommonJS
checks.

---

## 🟡 Low Priority

Nice to fix but low impact.

### 11. Scattered Inline Styles

**Problem:** A few HTML elements have inline `style=""` attributes.

**Fix:** Move to CSS classes.

---

### 12. Documentation Overlap

**Problem:** Multiple docs cover similar ground:

- `IMPLEMENTATION_GUIDE.md`
- `04-IMPLEMENTATION-ROADMAP.md`
- `PAGE_SPECIFICATIONS.md`

**Fix:** Consolidate into fewer files or archive outdated ones.

---

### 13. Demo HTML Files in docs/

**Files:**

- `docs/acai-icons.html`
- `docs/premium-dashboard-demo.html` (if exists)

**Fix:** Move to `dev/` folder or delete if unused.

---

### 14. Team.txt Format

**Problem:** `docs/Team.txt` is plain text among markdown files.

**Fix:** Convert to `Team.md` or merge into `README.md` team section.

---

## Files to Delete

| File/Code                               | Reason                          |
| --------------------------------------- | ------------------------------- |
| Duplicate `:root` blocks in 3 CSS files | Redundant (~900 lines)          |
| `FormManager` in utils.js               | Duplicate of ContactForm        |
| `ScrollRevealManager` in utils.js       | Duplicate of GSAP ScrollTrigger |
| `Logger` in utils.js                    | Over-abstraction                |
| Duplicate `MagneticButtonManager`       | Copy-paste error                |
| Inline `<style>` blocks in HTML pages   | Should be external CSS          |

---

## Files to Rename/Restructure

| Current                      | Proposed                 | Reason             |
| ---------------------------- | ------------------------ | ------------------ |
| `docs/Team.txt`              | `docs/Team.md`           | Consistent format  |
| Inline page styles           | `css/pages.css`          | Externalize styles |
| Multiple implementation docs | Single `ARCHITECTURE.md` | Consolidate        |

---

## What NOT to Change

These are fine as-is:

- **Shared component system** (`navbar.js`, `footer.js`,
  `components-loader.js`) - Works correctly
- **Security utilities** (`Sanitizer`, `CSRFManager`) - Well implemented
- **Accessibility features** - Properly done
- **GSAP animation system** - Good architecture
- **File naming conventions** - Already clear
- **HTML page structure** - Consistent pattern

---

## Estimated Impact

| Priority  | Lines Removed | Files Affected |
| --------- | ------------- | -------------- |
| High      | ~1,200        | 8 files        |
| Medium    | ~400          | 5 files        |
| Low       | ~100          | 4 files        |
| **Total** | **~1,700**    | **17 files**   |

---

## Recommended Order of Execution

1. **CSS consolidation** - Biggest win, lowest risk
2. **Remove duplicate JS functions** - High impact
3. **Merge initialization** - Simplifies entry point
4. **Extract inline styles** - Cleaner HTML
5. **Documentation cleanup** - Last priority
