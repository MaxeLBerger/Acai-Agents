/**
 * Update all HTML/JS image references from PNG/JPG to WebP
 * Run: node scripts/update-image-refs.js
 */
import { readFile, writeFile, readdir } from 'fs/promises';
import { join, extname } from 'path';

const ROOT = '.';

// Files to process
const HTML_FILES = [
  'index.html',
  'pages/agents.html',
  'pages/services.html',
  'pages/pricing.html',
  'pages/contact.html',
  'pages/portfolio.html',
  'pages/team.html',
  'pages/faq.html',
  'pages/privacy.html',
  'pages/terms.html',
];

const JS_FILES = ['js/components/navbar.js', 'js/components/footer.js'];

// Patterns to skip (keep PNGs for external URLs, og:image, structured data, etc.)
const SKIP_PATTERNS = [
  'https://acaistack.dev/', // external URLs for meta tags / structured data
  'type="image/png"', // favicon type declarations (we'll handle separately)
];

function shouldSkip(line) {
  return SKIP_PATTERNS.some((p) => line.includes(p));
}

async function processFile(filePath) {
  const content = await readFile(filePath, 'utf-8');
  const lines = content.split('\n');
  let changes = 0;

  const updated = lines.map((line) => {
    if (shouldSkip(line)) return line;

    // Replace .png and .jpg/.jpeg references in src, href (for images), data-* attributes
    const newLine = line.replace(
      /(src|data-blue|data-yellow|data-green|data-purple)="([^"]+)\.(png|jpg|jpeg)"/g,
      (match, attr, path, ext) => {
        // Skip external URLs
        if (path.startsWith('http')) return match;
        changes++;
        return `${attr}="${path}.webp"`;
      }
    );
    return newLine;
  });

  if (changes > 0) {
    await writeFile(filePath, updated.join('\n'), 'utf-8');
    console.log(`✅ ${filePath}: ${changes} references updated to WebP`);
  } else {
    console.log(`⏭️  ${filePath}: no changes needed`);
  }
}

async function updateFavicons() {
  // Update favicon references to use the optimized 32px version
  for (const filePath of [...HTML_FILES]) {
    let content = await readFile(filePath, 'utf-8');
    let changed = false;

    // Update favicon in index.html (has special sizes attributes)
    if (filePath === 'index.html') {
      if (content.includes('href="assets/favicon.png"')) {
        content = content.replace(
          'href="assets/favicon.png" />',
          'href="assets/favicon-32.png" />'
        );
        // Fix apple-touch-icon
        content = content.replace(
          '<link rel="apple-touch-icon" sizes="180x180" href="assets/favicon.png" />',
          '<link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png" />'
        );
        changed = true;
      }
    }

    // Update preload for emblem to WebP
    if (content.includes('preload" href="assets/acai_emblem.png"')) {
      content = content.replace(
        'href="assets/acai_emblem.png" as="image" type="image/png"',
        'href="assets/acai_emblem.webp" as="image" type="image/webp"'
      );
      // Keep old preload line but change to webp
      changed = true;
    }

    // Update subpage favicons to use small version
    if (content.includes('href="/assets/favicon.png"')) {
      content = content.replace('href="/assets/favicon.png"', 'href="/assets/favicon-32.png"');
      changed = true;
    }

    if (changed) {
      await writeFile(filePath, content, 'utf-8');
      console.log(`🎯 ${filePath}: favicon/preload updated`);
    }
  }
}

async function main() {
  console.log('🔄 Updating image references to WebP...\n');

  // Process HTML files
  for (const file of HTML_FILES) {
    await processFile(file);
  }

  // Process JS files
  console.log('');
  for (const file of JS_FILES) {
    await processFile(file);
  }

  // Update favicons
  console.log('');
  await updateFavicons();

  console.log('\n✨ All image references updated to WebP!');
}

main();
