/**
 * Component Loader
 * Loads shared navbar and footer components
 */

import { getNavbar } from './components/navbar.js';
import { getFooter } from './components/footer.js';

/**
 * Initialize shared components on page load
 */
export function initComponents() {
  // Determine active page from current location
  const path = window.location.pathname;
  let activePage = 'home';

  if (path.includes('services')) activePage = 'services';
  else if (path.includes('agents')) activePage = 'agents';
  else if (path.includes('pricing')) activePage = 'pricing';
  else if (path.includes('portfolio')) activePage = 'portfolio';
  else if (path.includes('team')) activePage = 'team';
  else if (path.includes('contact')) activePage = 'contact';
  else if (path.includes('faq')) activePage = 'faq';
  else if (path.includes('privacy')) activePage = 'privacy';
  else if (path.includes('terms')) activePage = 'terms';

  // Load navbar
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  if (navbarPlaceholder) {
    navbarPlaceholder.outerHTML = getNavbar(activePage);
  }

  // Load footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = getFooter(activePage);
  }
}

// Auto-initialize on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComponents);
} else {
  initComponents();
}
