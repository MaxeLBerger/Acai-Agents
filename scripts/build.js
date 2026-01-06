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
  console.log('🚀 Starting Production Build...');

  // 1. Clean dist
  console.log('🧹 Cleaning dist directory...');
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(DIST_DIR);
  fs.mkdirSync(path.join(DIST_DIR, 'css'));
  fs.mkdirSync(path.join(DIST_DIR, 'js'));
  fs.mkdirSync(path.join(DIST_DIR, 'pages'));
  // fs.mkdirSync(path.join(DIST_DIR, 'assets')); // handling this in copyDir

  // 2. Build CSS (using PostCSS via CLI)
  console.log('🎨 Building CSS...');
  try {
    // Executing from ROOT_DIR context
    execSync('npx postcss css/*.css --dir dist/css --minify', { stdio: 'inherit', cwd: ROOT_DIR });
  } catch (e) {
    console.error('❌ CSS Build failed');
    process.exit(1);
  }

  // 3. Build JS (using Terser via CLI)
  console.log('📜 Building JS Bundle...');
  try {
    execSync(
      'npx terser js/utils.js js/app.js js/gsap-animations.js -o dist/js/bundle.min.js --compress --mangle',
      { stdio: 'inherit', cwd: ROOT_DIR }
    );
  } catch (e) {
    console.error('❌ JS Build failed');
    process.exit(1);
  }

  // 4. Copy Assets
  console.log('🖼️  Copying Assets...');
  copyDir(ASSETS_DIR, path.join(DIST_DIR, 'assets'));

  // 5. Process HTML
  console.log('📄 Processing HTML...');

  // Index.html
  processHtmlFile(path.join(ROOT_DIR, 'index.html'), 'index.html', false);

  // Pages
  if (fs.existsSync(PAGES_DIR)) {
    const pages = fs.readdirSync(PAGES_DIR);
    pages.forEach((page) => {
      if (page.endsWith('.html')) {
        processHtmlFile(path.join(PAGES_DIR, page), path.join('pages', page), true);
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
  const content = fs.readFileSync(srcPath, 'utf8');

  // Regex to match the block of our local scripts
  // We look for the sequence of scripts we bundled

  // Strategy: Remove specific script tags and append the bundle at the end of body
  // Note: We keep CDN scripts (GSAP) touched.

  let newContent = content;

  // Remove individual local scripts
  newContent = newContent.replace(/<script src="(\.\.\/)?js\/utils\.js" defer><\/script>\s*/g, '');
  newContent = newContent.replace(/<script src="(\.\.\/)?js\/app\.js" defer><\/script>\s*/g, '');
  newContent = newContent.replace(
    /<script src="(\.\.\/)?js\/gsap-animations\.js" defer><\/script>\s*/g,
    ''
  );

  // Inject Bundle
  const bundlePath = isSubdirectory ? '../js/bundle.min.js' : 'js/bundle.min.js';
  const bundleTag = `<script src="${bundlePath}" defer></script>`;

  // Insert before closing body
  newContent = newContent.replace('</body>', `    ${bundleTag}\n  </body>`);

  fs.writeFileSync(path.join(DIST_DIR, destRelPath), newContent);
}

build();
