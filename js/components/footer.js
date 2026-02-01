/**
 * Shared Footer Component
 * Used across all pages for consistent footer
 */

export function getFooter(_activePage = 'home') {
  // Use clean URLs (Vercel rewrites handle the actual file serving)
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-content grid grid-cols-4 gap-8">
          <div class="footer-section">
            <h4>
              <img src="/assets/logo_small.png" alt="AcaiStack" class="footer-brand-logo" width="20" height="20" />
              AcaiStack
            </h4>
            <p>Beautiful websites powered by intelligent AI agents. You get the control.</p>
          </div>

          <div class="footer-section">
            <h4>Navigation</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/portfolio">Portfolio</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="/team">Our Team</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
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
