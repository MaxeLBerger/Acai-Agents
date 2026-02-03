/**
 * Local Development Server with Routing
 * Mimics Vercel's clean URL routing for local development
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PORT = process.env.PORT || 3000;

// MIME types
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.md': 'text/markdown',
};

// Route rewrites (mirrors vercel.json)
const REWRITES = {
  '/services': '/pages/services.html',
  '/agents': '/pages/agents.html',
  '/pricing': '/pages/pricing.html',
  '/portfolio': '/pages/portfolio.html',
  '/team': '/pages/team.html',
  '/faq': '/pages/faq.html',
  '/contact': '/pages/contact.html',
  '/privacy': '/pages/privacy.html',
  '/terms': '/pages/terms.html',
};

/**
 * Serve a file from the filesystem
 * @param {string} filePath - Path to the file
 * @param {http.ServerResponse} res - HTTP response
 */
function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Not Found</h1>');
      console.log(`  404: ${filePath}`);
      return;
    }

    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
  });
}

/**
 * Handle incoming HTTP requests
 */
const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0]; // Remove query string

  // Log request
  console.log(`${req.method} ${urlPath}`);

  // Apply rewrites
  if (REWRITES[urlPath]) {
    urlPath = REWRITES[urlPath];
  }

  // Handle root
  if (urlPath === '/') {
    urlPath = '/index.html';
  }

  // Build file path
  let filePath = path.join(ROOT, urlPath);

  // Check if path is a directory, serve index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // If no extension and file doesn't exist, try .html
  if (!path.extname(filePath) && !fs.existsSync(filePath)) {
    const htmlPath = filePath + '.html';
    if (fs.existsSync(htmlPath)) {
      filePath = htmlPath;
    }
  }

  serveFile(filePath, res);
});

// Start server
server.listen(PORT, () => {
  console.log(`\n🚀 Development server running at:`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`\n📁 Serving from: ${ROOT}`);
  console.log(`\n🔗 Available routes:`);
  console.log(`   /           → index.html`);
  Object.entries(REWRITES).forEach(([src, dest]) => {
    console.log(`   ${src.padEnd(12)} → ${dest}`);
  });
  console.log(`\nPress Ctrl+C to stop.\n`);
});
