/**
 * Shared Navigation Component
 * Used across all pages for consistent navigation
 */

export function getNavbar(activePage = 'home') {
  const isSubpage = activePage !== 'home';
  const pathPrefix = isSubpage ? '../' : '';
  
  return `
    <header class="navbar" role="banner">
      <div class="navbar-content container">
        <a href="${pathPrefix}" class="navbar-brand">
          <img src="${pathPrefix}assets/acai_stack_logo_clean.png" alt="AcaiStack Logo" class="brand-logo" />
          <span class="brand-text">AcaiStack</span>
        </a>

        <button
          id="mobileMenuToggle"
          class="mobile-menu-toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded="false"
          aria-controls="navbarMenu"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>

        <nav role="navigation" aria-label="Main navigation">
          <ul id="navbarMenu" class="navbar-menu">
            <li><a href="${pathPrefix}" class="navbar-link ${activePage === 'home' ? 'active' : ''}">Home</a></li>
            <li><a href="${pathPrefix}pages/services.html" class="navbar-link ${activePage === 'services' ? 'active' : ''}">Services</a></li>
            <li><a href="${pathPrefix}pages/pricing.html" class="navbar-link ${activePage === 'pricing' ? 'active' : ''}">Pricing</a></li>
            <li><a href="${pathPrefix}pages/portfolio.html" class="navbar-link ${activePage === 'portfolio' ? 'active' : ''}">Portfolio</a></li>
            <li><a href="${pathPrefix}pages/team.html" class="navbar-link ${activePage === 'team' ? 'active' : ''}">Team</a></li>
            <li>
              <button
                id="bwModeToggle"
                class="mode-toggle-btn"
                type="button"
                aria-label="Toggle dark mode"
                aria-pressed="false"
                title="Toggle dark mode"
              >
                <svg
                  class="mode-icon mode-icon-dark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path
                    d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                  />
                </svg>
                <svg
                  class="mode-icon mode-icon-light"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
                </svg>
              </button>
            </li>
            <li><a href="${pathPrefix}pages/contact.html" class="navbar-cta">Get Started</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `;
}
