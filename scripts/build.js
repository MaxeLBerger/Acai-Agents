import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Configuration
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const ASSETS_DIR = path.join(ROOT_DIR, 'assets');
const PAGES_DIR = path.join(ROOT_DIR, 'pages');
const CSS_DIR = path.join(ROOT_DIR, 'css'); // Added as source for css
const JS_DIR = path.join(ROOT_DIR, 'js'); // Added as source for js

/**
 * Main Build Function
 */
function build() {
  console.log('Starting Production Build...');

  // 1. Clean dist
  console.log('🧹 Cleaning dist directory...');
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(DIST_DIR);
  fs.mkdirSync(path.join(DIST_DIR, 'css'));
  fs.mkdirSync(path.join(DIST_DIR, 'js'));
  // Pages now go directly to dist/ root for clean URLs
  // fs.mkdirSync(path.join(DIST_DIR, 'assets')); // handling this in copyDir

  // 2. Build CSS (using PostCSS via CLI)
  console.log('Building CSS...');
  try {
    // Executing from ROOT_DIR context
    // Processes all CSS files including subdirectories, maintaining structure
    execSync('npx postcss css/**/*.css --dir dist/css --base css', {
      stdio: 'inherit',
      cwd: ROOT_DIR,
    });
  } catch (e) {
    console.error('CSS Build failed');
    process.exit(1);
  }

  // 3. Build JS (using Terser via CLI)
  // Re-ordered bundle: Utils first, then Animations & Components, finally Main App logic.
  console.log('📜 Building JS Bundle...');
  try {
    execSync(
      'npx terser js/utils.js js/gsap-animations.js js/acaistack-components.js js/app.js -o dist/js/bundle.min.js --compress --mangle',
      { stdio: 'inherit', cwd: ROOT_DIR }
    );
  } catch (e) {
    console.error('JS Build failed');
    process.exit(1);
  }

  // 4. Copy Assets and Modular scripts
  console.log('🖼️  Copying Assets...');
  copyDir(ASSETS_DIR, path.join(DIST_DIR, 'assets'));

  console.log('🧩 Copying Modular JS components...');
  const JS_COMPONENTS_DIR = path.join(JS_DIR, 'components');
  if (fs.existsSync(JS_COMPONENTS_DIR)) {
    copyDir(JS_COMPONENTS_DIR, path.join(DIST_DIR, 'js', 'components'));
  }
  if (fs.existsSync(path.join(JS_DIR, 'components-loader.js'))) {
    fs.copyFileSync(
      path.join(JS_DIR, 'components-loader.js'),
      path.join(DIST_DIR, 'js', 'components-loader.js')
    );
  }

  // 5. Process HTML
  console.log('📄 Processing HTML...');

  // Index.html
  processHtmlFile(path.join(ROOT_DIR, 'index.html'), 'index.html', false);

  // Pages - output directly to dist/ root for Vercel cleanUrls to work
  // This allows /services to automatically serve services.html
  if (fs.existsSync(PAGES_DIR)) {
    const pages = fs.readdirSync(PAGES_DIR);
    pages.forEach((page) => {
      if (page.endsWith('.html')) {
        // Output directly to dist/services.html instead of dist/pages/services.html
        processHtmlFile(path.join(PAGES_DIR, page), page, false);
      }
    });
  }

  console.log('✅ Build Complete! Output in /dist');
}

/**
 * Copy directory recursively
 */
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Process HTML file to replace script tags
 */
function processHtmlFile(srcPath, destRelPath, isSubdirectory) {
  let content = fs.readFileSync(srcPath, 'utf8');

  // 1. Remove individual local scripts with more robust regex (handles different attribute orders and spaces)
  const scriptsToRemove = [
    'js/utils.js',
    'js/app.js',
    'js/gsap-animations.js',
    'js/acaistack-components.js',
  ];

  scriptsToRemove.forEach((script) => {
    // Matches: <script src="...js/utils.js" ...></script> or variations
    const regex = new RegExp(
      `<script[^>]*src=["'][^"']*${script}["'][^>]*>\\s*<\\/script>\\s*`,
      'gi'
    );
    content = content.replace(regex, '');
  });

  // 2. Fix/Remove preload tags for bundled scripts
  scriptsToRemove.forEach((script) => {
    const preloadRegex = new RegExp(
      `<link[^>]*rel=["']preload["'][^>]*href=["'][^"']*${script}["'][^>]*>\\s*`,
      'gi'
    );
    content = content.replace(preloadRegex, '');
  });

  // 3. Inject the bundle before </body> - use absolute path for Vercel
  const bundleTag = `<script src="/js/bundle.min.js" defer></script>`;

  if (content.includes('</body>')) {
    content = content.replace('</body>', `    ${bundleTag}\n  </body>`);
  } else {
    content += bundleTag;
  }

  // 4. Remove the deferred CSS loading pattern and noscript tags
  // We want styles to load immediately in production to prevent layout shift of unstyled content
  content = content.replace(/media=["']print["']/gi, '');
  content = content.replace(/onload=["']this\.media\s*=\s*['"]all['"]["']/gi, '');
  content = content.replace(/<noscript>[\s\S]*?<\/noscript>/gi, '');

  // 5. Convert relative paths to absolute paths for Vercel deployment
  // This ensures CSS/JS/assets work correctly with clean URLs and rewrites
  // For index.html: href="css/base.css" -> href="/css/base.css"
  // For subpages: Already using absolute paths from source files
  if (!isSubdirectory) {
    // Fix CSS links
    content = content.replace(/href="css\//g, 'href="/css/');
    // Fix JS links
    content = content.replace(/src="js\//g, 'src="/js/');
    // Fix asset links
    content = content.replace(/href="assets\//g, 'href="/assets/');
    content = content.replace(/src="assets\//g, 'src="/assets/');
  }

  // Cleanup any double spaces or trailing spaces left by replacements
  content = content.replace(/\s\s+/g, ' ');

  fs.writeFileSync(path.join(DIST_DIR, destRelPath), content);
}

build();
