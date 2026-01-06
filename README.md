<p align="center">
  <img src="https://img.shields.io/badge/Acai%20Agents-AI%20Powered-00d9ff?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48dGV4dCB5PSI1MCUiIGZvbnQtc2l6ZT0iNTAiIGZpbGw9IiMwMGQ5ZmYiPkE8L3RleHQ+PC9zdmc+" alt="Acai Agents" />
</p>

<h1 align="center">Acai Agents</h1>

<p align="center">
  <strong>AI-Powered Software Development Agency</strong>
</p>

<p align="center">
  <a href="https://github.com/acai-agents/website/actions/workflows/ci.yml">
    <img src="https://github.com/acai-agents/website/actions/workflows/ci.yml/badge.svg" alt="CI Status" />
  </a>
  <a href="https://github.com/acai-agents/website/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" />
  </a>
  <a href="https://acai-agents.dev">
    <img src="https://img.shields.io/badge/website-live-brightgreen.svg" alt="Website" />
  </a>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#development">Development</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## ✨ Features

- 🎨 **Modern Design** - Clean, professional UI with dark/light mode support
- ⚡ **High Performance** - Optimized for speed with lazy loading, resource
  hints, and SRI
- ♿ **WCAG AAA Accessible** - Full keyboard navigation and screen reader
  support
- 🔒 **Security First** - XSS/CSRF protection, input sanitization, CSP headers,
  SRI hashing
- 📱 **Fully Responsive** - Perfect experience on all devices
- 🌙 **Dark Mode** - Automatic detection with manual toggle and localStorage
  persistence
- 💬 **Live Chat Widget** - Integrated customer support chat with XSS protection
- 🔍 **SEO Optimized** - Structured data (JSON-LD), meta tags, canonical URLs
- 📊 **Performance Monitoring** - Built-in performance tracking and analytics
- 🎭 **GSAP Animations** - Professional scroll-triggered animations with
  reduced-motion support
- 🛡️ **Enterprise Security** - Multiple security layers including CSP,
  X-Frame-Options, HTTPS
- 🚀 **Production Ready** - Minification, bundling, and optimization built-in

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/acai-agents/website.git
cd website

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🛠️ Development

### Available Scripts

| Command                | Description                               |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Start development server with live reload |
| `npm run lint`         | Run ESLint for code quality               |
| `npm run lint:fix`     | Fix ESLint errors automatically           |
| `npm run format`       | Format code with Prettier                 |
| `npm run format:check` | Check code formatting                     |
| `npm run build`        | Build for production                      |
| `npm run validate`     | Run all validations                       |

### VS Code Setup

This project includes optimized VS Code settings. Install recommended
extensions:

1. Open the project in VS Code
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type "Show Recommended Extensions"
4. Install all recommended extensions

### Code Quality Tools

- **ESLint** - JavaScript linting with security rules
- **Prettier** - Code formatting
- **EditorConfig** - Consistent coding styles across IDEs

## 📁 Architecture

```
acai-agents-website/
├── index.html              # Entry point (root level)
├── pages/                  # All other HTML pages
│   ├── dashboard.html     # Main dashboard/landing
│   ├── services.html      # Services overview
│   ├── pricing.html       # Pricing plans
│   ├── portfolio.html     # Portfolio/case studies
│   ├── team.html          # Team page
│   └── contact.html       # Contact form
├── css/                    # Stylesheets
│   ├── base.css           # Foundation, CSS variables, utilities
│   ├── components.css     # Reusable UI components
│   ├── animations.css     # Animations and transitions
│   ├── layout.css         # Page structure and grids
│   └── gsap-animations.css # GSAP-specific styles
├── js/                     # JavaScript modules
│   ├── utils.js           # Security, validation, accessibility
│   ├── app.js             # Application logic and managers
│   └── gsap-animations.js # GSAP ScrollTrigger animations
├── assets/                 # Images, fonts, media
├── docs/                   # Documentation
│   ├── IMPLEMENTATION_GUIDE.md
│   └── acai-icons.html
├── .vscode/               # VS Code workspace settings
├── .github/               # GitHub configuration
│   ├── workflows/         # CI/CD pipelines
│   ├── ISSUE_TEMPLATE/    # Issue templates
│   └── instructions/      # Copilot instructions
└── package.json           # Project configuration
```

### Why This Structure?

- **`index.html` in root** - Standard for static sites, easy deployment
- **`pages/` directory** - Clean separation of HTML files, easy to navigate
- **Modular CSS/JS** - Each file has single responsibility
- **`assets/` folder** - All media in one place
- **`docs/` folder** - Documentation separate from source code

### JavaScript Architecture

The codebase follows a **Manager pattern** for organizing functionality:

- `ModeManager` - Developer/Customer mode toggle
- `ChatManager` - Chat widget functionality
- `FormManager` - Contact form handling
- `NavigationManager` - Smooth scrolling and active links
- `ScrollRevealManager` - Scroll animations

### CSS Architecture

Uses a **modular design token system**:

- CSS custom properties for all colors, spacing, typography
- Automatic dark mode via `prefers-color-scheme`
- Mobile-first responsive design
- BEM-inspired class naming

## 🔒 Security

This project implements enterprise-grade security:

| Feature          | Implementation                                              |
| ---------------- | ----------------------------------------------------------- |
| XSS Prevention   | `Sanitizer.sanitizeInput()`, `textContent` over `innerHTML` |
| CSRF Protection  | Automatic token injection via `CSRFManager`                 |
| Input Validation | Client-side validation with `FormValidator`                 |
| CSP Ready        | No inline scripts or styles                                 |
| Secure Headers   | Documentation for server-side headers                       |

## ♿ Accessibility

- **WCAG AAA Compliance** - 4.5:1+ contrast ratios
- **Keyboard Navigation** - Full site navigable via keyboard
- **Screen Reader Support** - Semantic HTML, ARIA labels
- **Focus Management** - Visible focus indicators
- **Reduced Motion** - Respects `prefers-reduced-motion`

## 📊 Performance

| Metric                    | Score |
| ------------------------- | ----- |
| Lighthouse Performance    | 90+   |
| Lighthouse Accessibility  | 100   |
| Lighthouse Best Practices | 100   |
| Lighthouse SEO            | 100   |

## 🤝 Contributing

We welcome contributions! Please see our
[Contributing Guide](.github/CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## 📬 Contact

- **Website**: [acai-agents.dev](https://acai-agents.dev)
- **Email**: [hello@acai-agents.dev](mailto:hello@acai-agents.dev)
- **GitHub**: [@acai-agents](https://github.com/acai-agents)

---

<p align="center">
  Made with ❤️ by the Acai Agents Team
</p>
