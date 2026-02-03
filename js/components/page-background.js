/**
 * Shared Page Background Component
 * Provides consistent background effects (grid, orbs) across all pages
 */

/**
 * Get the page background HTML with optional subtle orbs for subpages
 * @param {Object} options - Configuration options
 * @param {boolean} options.includeHeroOrbs - Include hero-specific orbs (default: true)
 * @param {boolean} options.subtle - Use subtle/reduced intensity orbs for subpages (default: false)
 * @returns {string} HTML string for background elements
 */
export function getPageBackground(options = {}) {
  const { includeHeroOrbs = true, subtle = false } = options;

  const subtleClass = subtle ? ' hero-orb--subtle' : '';

  const heroOrbsHTML = includeHeroOrbs
    ? `
      <div class="hero-background" aria-hidden="true">
        <div class="hero-orb hero-orb-1${subtleClass}"></div>
        <div class="hero-orb hero-orb-2${subtleClass}"></div>
        <div class="hero-orb hero-orb-3${subtleClass}"></div>
      </div>
    `
    : '';

  return `
    <!-- Background Effects -->
    <div class="hero-grid" aria-hidden="true"></div>
    <div class="glow-orb glow-orb-1" aria-hidden="true"></div>
    <div class="glow-orb glow-orb-2" aria-hidden="true"></div>
    ${heroOrbsHTML}
  `;
}

/**
 * Inject background elements into the page
 * Call this early in the page lifecycle (before main content renders)
 * @param {Object} options - Configuration options
 * @param {boolean} options.includeHeroOrbs - Include hero-specific orbs
 * @param {boolean} options.subtle - Use subtle/reduced intensity orbs
 */
export function injectPageBackground(options = {}) {
  // Prevent double injection
  if (document.querySelector('.hero-grid')) {
    return;
  }

  const backgroundHTML = getPageBackground(options);

  // Insert at the beginning of body
  document.body.insertAdjacentHTML('afterbegin', backgroundHTML);
}
