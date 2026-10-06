// Post-build: emit a per-route HTML file (dist/about/index.html, ...) whose <head> carries
// that page's title, description, canonical and social tags. This lets
// crawlers and link-preview bots that don't execute JavaScript see correct metadata.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, SITE_URL, canonicalFor } from '../src/config/seo.js';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const template = readFileSync(join(dist, 'index.html'), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function render(path, page) {
  const url = canonicalFor(path);
  const t = esc(page.title);
  const d = esc(page.description);
  const swap = (re, replacement) => {
    if (!re.test(template)) throw new Error(`index.html is missing a tag matching ${re}`);
    return replacement;
  };
  return template
    .replace(/<title>.*?<\/title>/, swap(/<title>.*?<\/title>/, `<title>${t}</title>`))
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${d}"`)
    .replace(/(<meta name="robots" content=")[^"]*"/, `$1${page.noindex ? 'noindex, follow' : 'index, follow'}"`)
    .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${t}"`)
    .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${d}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
    .replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${t}"`)
    .replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${d}"`);
}

for (const [path, page] of Object.entries(PAGES)) {
  const html = render(path, page);
  if (path === '/') writeFileSync(join(dist, 'index.html'), html);
  else {
    mkdirSync(join(dist, path), { recursive: true });
    writeFileSync(join(dist, path, 'index.html'), html);
  }
}

console.log(`prerender-meta: wrote ${Object.keys(PAGES).length} pages for ${SITE_URL}`);
