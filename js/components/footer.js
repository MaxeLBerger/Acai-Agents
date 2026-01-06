/**
 * Shared Footer Component
 * Used across all pages for consistent footer
 */

export function getFooter() {
  const isSubpage = window.location.pathname.includes('/pages/');
  const pathPrefix = isSubpage ? '../' : '';
  
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-content grid grid-cols-4 gap-8">
          <div class="footer-section">
            <h4>
              <img src="${pathPrefix}assets/logo_small.png" alt="AcaiStack" class="footer-brand-logo" width="20" height="20" />
              AcaiStack
            </h4>
            <p>Beautiful websites powered by intelligent AI agents. You get the control.</p>
          </div>

          <div class="footer-section">
            <h4>Navigation</h4>
            <ul>
              <li><a href="${pathPrefix}">Home</a></li>
              <li><a href="${pathPrefix}pages/services.html">Services</a></li>
              <li><a href="${pathPrefix}pages/pricing.html">Pricing</a></li>
              <li><a href="${pathPrefix}pages/portfolio.html">Portfolio</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="${pathPrefix}pages/team.html">Our Team</a></li>
              <li><a href="${pathPrefix}pages/contact.html">Contact Us</a></li>
              <li><a href="${pathPrefix}pages/contact.html#careers">Careers</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Connect</h4>
            <ul>
              <li><a href="https://github.com" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://twitter.com" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://linkedin.com" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="mailto:hello@acaistack.dev">Email Us</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2026 AcaiStack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}
