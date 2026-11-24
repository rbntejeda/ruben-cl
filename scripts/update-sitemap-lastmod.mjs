// Actualiza <lastmod> del sitemap generado con la fecha del build (YYYY-MM-DD).
import { readFileSync, writeFileSync } from 'node:fs';

const sitemapPath = new URL('../dist/ruben-cl/browser/sitemap.xml', import.meta.url);
const today = new Date().toISOString().slice(0, 10);

const sitemap = readFileSync(sitemapPath, 'utf8');
const updated = sitemap.replace(/<lastmod>[^<]*<\/lastmod>/g, `<lastmod>${today}</lastmod>`);

writeFileSync(sitemapPath, updated);
console.log(`sitemap.xml lastmod -> ${today}`);
