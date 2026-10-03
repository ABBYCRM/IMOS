import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { llmsTxt, pages, renderHtml, robotsTxt, siteUrl, sitemapXml } from './seo.mjs';

const template = readFileSync(path.join(import.meta.dirname, 'public', 'index.html'), 'utf8');
const base = 'https://imos.example';

test('siteUrl normalises SITE_URL and falls back to the DigitalOcean URL', () => {
  assert.equal(siteUrl({ SITE_URL: 'https://imos.example/' }), base);
  assert.equal(siteUrl({}), 'https://imos-2mi89.ondigitalocean.app');
});

test('every page gets unique head metadata, a self canonical and valid JSON-LD', () => {
  const titles = new Set();
  for (const page of pages) {
    const html = renderHtml(template, base, page, {});
    const url = page.path === '/' ? `${base}/` : `${base}${page.path}`;
    assert.equal((html.match(/<title>/g) || []).length, 1);
    assert.equal((html.match(/name="description"/g) || []).length, 1);
    assert.ok(html.includes(`<link rel="canonical" href="${url}" />`));
    assert.ok(html.includes(`property="og:url" content="${url}"`));
    assert.ok(html.includes('name="twitter:card"'));
    assert.ok(html.includes('rel="icon"'));
    assert.ok(!/noindex/i.test(html));
    assert.ok(!html.includes('google-site-verification'));
    const ld = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const types = ld['@graph'].map((n) => n['@type']);
    assert.ok(types.includes('Organization') && types.includes('WebSite'));
    titles.add(page.title);
  }
  assert.equal(titles.size, pages.length);
});

test('verification meta tag is only emitted when GOOGLE_SITE_VERIFICATION is set', () => {
  const html = renderHtml(template, base, pages[0], { GOOGLE_SITE_VERIFICATION: 'abc' });
  assert.ok(html.includes('<meta name="google-site-verification" content="abc" />'));
});

test('robots, sitemap and llms.txt use absolute URLs on the site origin', () => {
  assert.match(robotsTxt(base), /Allow: \/\n\nSitemap: https:\/\/imos\.example\/sitemap\.xml/);
  const locs = [...sitemapXml(base).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.equal(locs.length, pages.length);
  assert.ok(locs.every((l) => l.startsWith(`${base}/`)));
  assert.ok(llmsTxt(base).startsWith('# IMOS\n\n> '));
});
