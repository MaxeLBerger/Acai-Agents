import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const files = [
  'index.html',
  'pages/contact.html',
  'pages/portfolio.html',
  'pages/pricing.html',
  'pages/services.html',
  'pages/team.html'
];

files.forEach(file => {
  const p = path.join(root, file);
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    let nc = c.replace(/href="index\.html"/g, 'href="/"').replace(/href="\.\.\/index\.html"/g, 'href="/"');
    if (c !== nc) {
      fs.writeFileSync(p, nc);
      console.log('Fixed: ' + file);
    }
  }
});
