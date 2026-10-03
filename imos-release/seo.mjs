import { readFileSync } from 'node:fs';
import path from 'node:path';
import { DEFAULT_SITE_URL, LAST_MODIFIED, LOGO, OG_IMAGE, ORG_DESCRIPTION, SITE_NAME, notFoundPage, pages } from './site.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// JSON inside <script> must not be able to close the tag.
const jsonLd = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

export function siteUrl(env = process.env) {
  const raw = (env.SITE_URL || DEFAULT_SITE_URL).trim();
  const u = new URL(raw);
  return `${u.protocol}//${u.host}`;
}

const abs = (base, p) => (p === '/' ? `${base}/` : `${base}${p}`);

function structuredData(base, page) {
  const orgId = `${base}/#organization`;
  const siteId = `${base}/#website`;
  const graph = [
    { '@type': 'Organization', '@id': orgId, name: SITE_NAME, url: `${base}/`, logo: { '@type': 'ImageObject', url: `${base}${LOGO}` }, description: ORG_DESCRIPTION },
    { '@type': 'WebSite', '@id': siteId, name: SITE_NAME, url: `${base}/`, description: ORG_DESCRIPTION, publisher: { '@id': orgId }, inLanguage: 'en' },
  ];
  if (page.path) {
    const url = abs(base, page.path);
    graph.push({
      '@type': page.type || 'WebPage', '@id': `${url}#webpage`, url, name: page.title, description: page.description,
      isPartOf: { '@id': siteId }, about: { '@id': orgId }, inLanguage: 'en',
      primaryImageOfPage: { '@type': 'ImageObject', url: `${base}${OG_IMAGE}` },
      breadcrumb: { '@id': `${url}#breadcrumb` },
    });
    const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` }];
    if (page.path !== '/') items.push({ '@type': 'ListItem', position: 2, name: page.name, item: url });
    graph.push({ '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: items });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

export function headFor(base, page, env = process.env) {
  const url = page.path ? abs(base, page.path) : null;
  const image = `${base}${OG_IMAGE}`;
  const verification = (env.GOOGLE_SITE_VERIFICATION || '').trim();
  const lines = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    url && `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    url && `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="IMOS logo over a port and refinery skyline at sunrise" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    `<link rel="icon" href="/favicon.ico" sizes="any" />`,
    `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />`,
    `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`,
    `<meta name="theme-color" content="#0a2a35" />`,
    `<link rel="alternate" type="text/plain" title="llms.txt" href="/llms.txt" />`,
    verification && `<meta name="google-site-verification" content="${esc(verification)}" />`,
    `<script type="application/ld+json">${jsonLd(structuredData(base, page))}</script>`,
    // Keep canonical and og:url in sync when the SPA navigates client-side.
    `<script>(function(){var b=${JSON.stringify(base)};function s(){var p=location.pathname==='/'?'/':location.pathname.replace(/\\/$/,'');var c=document.querySelector('link[rel="canonical"]');if(!c){c=document.createElement('link');c.rel='canonical';document.head.appendChild(c);}c.href=b+p;var o=document.querySelector('meta[property="og:url"]');if(o)o.content=b+p;}['pushState','replaceState'].forEach(function(m){var f=history[m];history[m]=function(){var r=f.apply(this,arguments);s();return r;};});addEventListener('popstate',s);})();</script>`,
  ].filter(Boolean);
  return lines.map((l) => `    ${l}`).join('\n');
}

// Remove head tags the generator owns, then inject the generated block.
export function renderHtml(template, base, page, env = process.env) {
  const stripped = template
    .replace(/\s*<title>[\s\S]*?<\/title>/i, '')
    .replace(/\s*<meta\s+(name|property)="(description|robots|og:[^"]+|twitter:[^"]+|google-site-verification)"[^>]*>/gi, '')
    .replace(/\s*<link\s+rel="(icon|canonical|apple-touch-icon)"[^>]*>/gi, '')
    .replace(/<meta name="viewport"[^>]*>/i, '<meta name="viewport" content="width=device-width, initial-scale=1" />');
  return stripped.replace(/(<meta name="viewport"[^>]*>)/i, `$1\n${headFor(base, page, env)}`);
}

export function robotsTxt(base) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`;
}

export function sitemapXml(base) {
  const urls = pages.map((p) => `  <url>\n    <loc>${abs(base, p.path)}</loc>\n    <lastmod>${LAST_MODIFIED}</lastmod>\n    <priority>${p.priority}</priority>\n  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function llmsTxt(base) {
  const list = pages.map((p) => `- [${p.name}](${abs(base, p.path)}): ${p.description}`).join('\n');
  return `# IMOS\n\n> ${ORG_DESCRIPTION}\n\nIMOS works across energy (EN590 diesel as the leading product, plus jet fuel, conventional and renewable energy), infrastructure (bridges, highways, transportation, development) and institutional relations between corporations, governments, institutions, investors and contractors. The website is an informational brochure; its inquiry form prepares a brief on the visitor's device and does not send or store messages.\n\n## Pages\n\n${list}\n\n## Documents\n\n- [EN590 buyer brochure (PDF)](${base}/documents/IMOS-EN590-Buyer-Brochure.pdf): Five-page summary of the EN590 10PPM ULSD buyer procedure.\n\n## Optional\n\n- [Full text for language models](${base}/llms-full.txt): Plain-text content of every page.\n- [Sitemap](${base}/sitemap.xml)\n`;
}

export function loadLlmsFull(dir) {
  return readFileSync(path.join(dir, 'llms-full.md'), 'utf8');
}

export function llmsFullTxt(template, base) {
  return template.replaceAll('{{SITE_URL}}', base);
}

export { pages, notFoundPage };
