/**
 * Local Development Server with Routing
 * Mimics Vercel's clean URL routing for local development.
 * Features: gzip compression, cache headers, streaming, ETag support.
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';
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
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.md': 'text/markdown',
};

// File types that benefit from gzip compression
const COMPRESSIBLE = new Set([
  'text/html',
  'text/css',
  'text/javascript',
  'application/json',
  'image/svg+xml',
  'text/markdown',
]);

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

// ETag cache: filePath -> { mtime, etag }
const etagCache = new Map();

/**
 * Generate a weak ETag based on file size and mtime
 * @param {fs.Stats} stat - File stats
 * @returns {string} ETag value
 */
function generateETag(stat) {
  return `W/"${stat.size.toString(16)}-${stat.mtimeMs.toString(16)}"`;
}

/**
 * Get or compute the ETag for a file
 * @param {string} filePath - Path to the file
 * @param {fs.Stats} stat - File stats
 * @returns {string} ETag value
 */
function getETag(filePath, stat) {
  const cached = etagCache.get(filePath);
  if (cached && cached.mtime === stat.mtimeMs) {
    return cached.etag;
  }
  const etag = generateETag(stat);
  etagCache.set(filePath, { mtime: stat.mtimeMs, etag });
  return etag;
}

/**
 * Check if the client accepts gzip encoding
 * @param {http.IncomingMessage} req - HTTP request
 * @returns {boolean}
 */
function acceptsGzip(req) {
  const accept = req.headers['accept-encoding'] || '';
  return accept.includes('gzip');
}

/**
 * Serve a file with streaming, compression, and caching
 * @param {string} filePath - Path to the file
 * @param {http.IncomingMessage} req - HTTP request
 * @param {http.ServerResponse} res - HTTP response
 */
async function serveFile(filePath, req, res) {
  let stat;
  try {
    stat = await fs.promises.stat(filePath);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - Not Found</h1>');
    console.log(`  404: ${filePath}`);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const mimeType = MIME_TYPES[ext] || 'application/octet-stream';
  const etag = getETag(filePath, stat);

  // Check If-None-Match for 304 response
  if (req.headers['if-none-match'] === etag) {
    res.writeHead(304);
    res.end();
    return;
  }

  const headers = {
    'Content-Type': mimeType,
    ETag: etag,
    // HTML and CSS: no-cache (always revalidate during dev), assets: cache 1 hour with revalidation
    'Cache-Control': ext === '.html' || ext === '.css' || ext === '.js' ? 'no-cache' : 'public, max-age=3600, must-revalidate',
  };

  const shouldCompress = COMPRESSIBLE.has(mimeType) && acceptsGzip(req);

  if (shouldCompress) {
    headers['Content-Encoding'] = 'gzip';
    // Vary header so proxies/browsers cache correctly per encoding
    headers['Vary'] = 'Accept-Encoding';
    res.writeHead(200, headers);
    try {
      await pipeline(fs.createReadStream(filePath), createGzip(), res);
    } catch {
      // Client likely disconnected, ignore
    }
  } else {
    headers['Content-Length'] = stat.size;
    res.writeHead(200, headers);
    try {
      await pipeline(fs.createReadStream(filePath), res);
    } catch {
      // Client likely disconnected, ignore
    }
  }
}

/**
 * Resolve the file path for a request URL
 * @param {string} urlPath - The URL path
 * @returns {string} Resolved file path
 */
function resolveFilePath(urlPath) {
  let filePath = path.join(ROOT, urlPath);

  // Prevent directory traversal
  if (!filePath.startsWith(ROOT)) {
    return path.join(ROOT, 'index.html');
  }

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

  return filePath;
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

  const filePath = resolveFilePath(urlPath);
  serveFile(filePath, req, res);
});

// Start server
server.listen(PORT, () => {
  console.log(`\n🚀 Development server running at:`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`\n⚡ Features: gzip, ETag caching, streaming`);
  console.log(`📁 Serving from: ${ROOT}`);
  console.log(`\n🔗 Available routes:`);
  console.log(`   /           → index.html`);
  Object.entries(REWRITES).forEach(([src, dest]) => {
    console.log(`   ${src.padEnd(12)} → ${dest}`);
  });
  console.log(`\nPress Ctrl+C to stop.\n`);
});
