# Contributing to Acai Agents

First off, thank you for considering contributing to Acai Agents! 🎉

This document provides guidelines and best practices for contributing to the
project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

By participating in this project, you agree to maintain a welcoming, inclusive,
and harassment-free environment. Be respectful, constructive, and collaborative.

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- Git
- VS Code (recommended)

### Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**:

   ```bash
   git clone https://github.com/YOUR_USERNAME/website.git
   cd website
   ```

3. **Add upstream remote**:

   ```bash
   git remote add upstream https://github.com/acai-agents/website.git
   ```

4. **Install dependencies**:

   ```bash
   npm install
   ```

5. **Install VS Code extensions** (recommended):
   - Open project in VS Code
   - Accept prompt to install recommended extensions

6. **Start development server**:
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming

Use descriptive branch names:

- `feature/add-testimonials-section`
- `fix/chat-widget-accessibility`
- `docs/update-readme`
- `refactor/form-validation`

### Before You Start

1. **Sync with upstream**:

   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### While Developing

1. **Make small, focused commits**
2. **Run validations before committing**:
   ```bash
   npm run validate
   ```
3. **Test your changes** in multiple browsers
4. **Check accessibility** with keyboard navigation

## Coding Standards

### JavaScript

```javascript
// ✅ DO: Use const/let, arrow functions, template literals
const formatMessage = (name) => `Hello, ${name}!`;

// ❌ DON'T: Use var, concatenation
var formatMessage = function (name) {
  return 'Hello, ' + name + '!';
};

// ✅ DO: Use event delegation
document.addEventListener('click', (e) => {
  if (e.target.matches('.btn')) handleClick(e);
});

// ❌ DON'T: Use inline handlers
// <button onclick="handleClick()">

// ✅ DO: Sanitize user input
element.textContent = Sanitizer.sanitizeInput(userInput);

// ❌ DON'T: Use innerHTML with user data
element.innerHTML = userInput; // XSS vulnerability!
```

### CSS

```css
/* ✅ DO: Use CSS custom properties */
.button {
  background: var(--color-primary);
  padding: var(--space-12) var(--space-24);
}

/* ❌ DON'T: Use magic numbers */
.button {
  background: #208396;
  padding: 12px 24px;
}

/* ✅ DO: Use mobile-first responsive */
.container {
  width: 100%;
}

@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
```

### HTML

```html
<!-- ✅ DO: Use semantic HTML with ARIA -->
<button type="button" aria-label="Open navigation menu" aria-expanded="false">
  Menu
</button>

<!-- ❌ DON'T: Use divs for everything -->
<div onclick="openMenu()">Menu</div>
```

## Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type       | Description                |
| ---------- | -------------------------- |
| `feat`     | New feature                |
| `fix`      | Bug fix                    |
| `docs`     | Documentation only         |
| `style`    | Formatting, no code change |
| `refactor` | Code refactoring           |
| `perf`     | Performance improvement    |
| `test`     | Adding tests               |
| `chore`    | Maintenance tasks          |
| `a11y`     | Accessibility improvements |
| `security` | Security improvements      |

### Examples

```bash
feat(chat): add typing indicator animation
fix(form): resolve email validation regex issue
docs(readme): add deployment instructions
a11y(nav): improve keyboard navigation focus states
security(form): add additional XSS sanitization
```

## Pull Request Process

### Before Submitting

1. **Run all validations**:

   ```bash
   npm run validate
   ```

2. **Update documentation** if needed

3. **Add yourself to CONTRIBUTORS.md** (if first contribution)

### PR Template

When creating a PR, please include:

```markdown
## Description

[Describe what this PR does]

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

[Describe how you tested your changes]

## Checklist

- [ ] My code follows the project's coding standards
- [ ] I have run `npm run validate` successfully
- [ ] I have tested in multiple browsers
- [ ] I have tested keyboard navigation
- [ ] I have updated documentation if needed
```

### Review Process

1. A maintainer will review your PR
2. Address any feedback
3. Once approved, a maintainer will merge

## Reporting Bugs

Use the
[Bug Report template](https://github.com/acai-agents/website/issues/new?template=bug_report.yml)
and include:

- Clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Browser and device information
- Screenshots or console errors

## Suggesting Features

Use the
[Feature Request template](https://github.com/acai-agents/website/issues/new?template=feature_request.yml)
and include:

- Problem statement
- Proposed solution
- Alternatives considered
- Mockups (if applicable)

---

## Questions?

- Open a [Discussion](https://github.com/acai-agents/website/discussions)
- Email: [hello@acai-agents.dev](mailto:hello@acai-agents.dev)

Thank you for contributing! 🚀
