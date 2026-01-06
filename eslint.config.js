/**
 * @fileoverview ESLint flat configuration for Acai Agents Website
 * @version 1.0.0
 * @see https://eslint.org/docs/latest/use/configure/configuration-files-new
 */

import globals from 'globals';
import security from 'eslint-plugin-security';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Base configuration for all JavaScript files
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'script', // Browser scripts, not ES modules
      globals: {
        ...globals.browser,
        ...globals.es2024,
        // Project-specific globals (writable to allow definition)
        Sanitizer: 'writable',
        CSRFManager: 'writable',
        FormValidator: 'writable',
        EventDelegate: 'writable',
        ButtonManager: 'writable',
        AccessibilityManager: 'writable',
        ErrorHandler: 'writable',
        ModeManager: 'writable',
        ChatManager: 'writable',
        ScrollRevealManager: 'writable',
        FormManager: 'writable',
        NavigationManager: 'writable',
        initializeAcaiAgents: 'writable',
        // GSAP globals
        gsap: 'readonly',
        ScrollTrigger: 'readonly',
        GSAPAnimationManager: 'writable',
        SmoothScrollManager: 'writable',
        MagneticButtonManager: 'writable',
      },
    },
    plugins: {
      security,
    },
    rules: {
      // ═══════════════════════════════════════════════════════════════════════
      // ERROR PREVENTION - Catch bugs before they happen
      // ═══════════════════════════════════════════════════════════════════════
      'no-undef': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'off', // Allow console for debugging
      'no-debugger': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-extra-boolean-cast': 'error',
      'no-func-assign': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-unreachable': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',

      // ═══════════════════════════════════════════════════════════════════════
      // BEST PRACTICES - Enforce clean code patterns
      // ═══════════════════════════════════════════════════════════════════════
      curly: ['error', 'multi-line'],
      'default-case': 'warn',
      'dot-notation': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-caller': 'error',
      'no-else-return': 'error',
      'no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-floating-decimal': 'error',
      'no-implied-eval': 'error',
      'no-iterator': 'error',
      'no-lone-blocks': 'error',
      'no-loop-func': 'error',
      'no-multi-str': 'error',
      'no-new': 'warn',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-octal-escape': 'error',
      'no-param-reassign': 'off', // Allow for DOM manipulation
      'no-proto': 'error',
      'no-redeclare': 'error',
      'no-return-assign': 'error',
      'no-script-url': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unused-expressions': 'error',
      'no-useless-call': 'error',
      'no-useless-concat': 'error',
      'no-useless-return': 'error',
      'no-void': 'error',
      'no-with': 'error',
      radix: 'error',
      yoda: 'error',

      // ═══════════════════════════════════════════════════════════════════════
      // SECURITY - Prevent XSS and injection vulnerabilities
      // ═══════════════════════════════════════════════════════════════════════
      'security/detect-eval-with-expression': 'error',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-object-injection': 'off', // Too many false positives
      'security/detect-possible-timing-attacks': 'warn',
      'security/detect-unsafe-regex': 'error',

      // ═══════════════════════════════════════════════════════════════════════
      // CODE STYLE - Consistent formatting (Prettier handles most)
      // ═══════════════════════════════════════════════════════════════════════
      'no-mixed-spaces-and-tabs': 'error',
      'no-trailing-spaces': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
    },
  },

  // Special rules for utils.js and gsap-animations.js - allow redeclaring browser built-ins
  {
    files: ['**/js/utils.js', '**/js/gsap-animations.js'],
    rules: {
      'no-redeclare': 'off', // Allow overriding browser built-ins like Sanitizer
    },
  },

  // Disable rules that conflict with Prettier
  prettierConfig,

  // Ignore patterns
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**', '*.min.js', '*.bundle.js'],
  },
];
