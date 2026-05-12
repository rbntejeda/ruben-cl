import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const configPath = resolve(root, 'seo.routes.json');
const outputPath = resolve(root, 'public', 'sitemap.xml');

const config = JSON.parse(await readFile(configPath, 'utf8'));
const baseUrl = String(config.baseUrl || 'https://ruben.cl').replace(/\/$/, '');
const routes = Array.isArray(config.routes) ? config.routes : [];
const today = new Date().toISOString().slice(0, 10);

const urls = routes
  .map((route) => {
    const loc = String(route.loc || '').trim();
    if (!loc) return null;

    const normalizedLoc = loc.startsWith('http://') || loc.startsWith('https://')
      ? loc
      : `${baseUrl}${loc.startsWith('/') ? '' : '/'}${loc}`;

    return [
      '  <url>',
      `    <loc>${normalizedLoc}</loc>`,
      `    <lastmod>${route.lastmod || today}</lastmod>`,
      `    <changefreq>${route.changefreq || 'monthly'}</changefreq>`,
      `    <priority>${route.priority ?? 0.7}</priority>`,
      '  </url>'
    ].join('\n');
  })
  .filter(Boolean)
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

await writeFile(outputPath, sitemap, 'utf8');
console.log(`Wrote ${outputPath}`);
