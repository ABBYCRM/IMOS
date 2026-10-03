import { createServer } from 'node:http';
import { createReadStream, readFileSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { llmsFullTxt, llmsTxt, loadLlmsFull, notFoundPage, pages, renderHtml, robotsTxt, siteUrl, sitemapXml } from './seo.mjs';

const root = path.resolve(process.env.STATIC_ROOT || path.join(import.meta.dirname, 'public'));
const base = siteUrl();

// Pre-render one HTML document per route so crawlers get unique metadata without running JS.
const template = readFileSync(path.join(root, 'index.html'), 'utf8');
const html = new Map(pages.map((p) => [p.path, renderHtml(template, base, p)]));
const notFoundHtml = renderHtml(template, base, notFoundPage);
const text = new Map([
  ['/robots.txt', ['text/plain; charset=utf-8', robotsTxt(base)]],
  ['/sitemap.xml', ['application/xml; charset=utf-8', sitemapXml(base)]],
  ['/llms.txt', ['text/plain; charset=utf-8', llmsTxt(base)]],
  ['/llms-full.txt', ['text/plain; charset=utf-8', llmsFullTxt(loadLlmsFull(import.meta.dirname), base)]],
]);
const redirects = new Map([['/index.html', '/'], ...pages.filter((p) => p.path !== '/').map((p) => [`${p.path}.html`, p.path])]);

function send(req, res, status, type, body, cache = 'no-cache') {
  const buf = Buffer.from(body);
  res.writeHead(status, { 'Content-Type': type, 'Content-Length': buf.length, 'Cache-Control': cache });
  res.end(req.method === 'HEAD' ? undefined : buf);
}
const types = { '.xml': 'application/xml; charset=utf-8', '.ico': 'image/x-icon', '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png', '.avif': 'image/avif', '.webp': 'image/webp',
  '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.webm': 'video/webm',
  '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8', '.woff2': 'font/woff2' };
const server = createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end(); return;
  }
  let pathname, rawPath, query;
  try {
    const u = new URL('http://localhost' + (req.url.startsWith('/') ? req.url : '/' + req.url));
    rawPath = u.pathname; query = u.search;
    pathname = decodeURIComponent(rawPath);
  } catch { res.writeHead(400).end(); return; }
  if (pathname.length > 1 && pathname.endsWith('/')) {
    // Same-origin only: collapse leading slashes so "//host/" cannot become an open redirect.
    const target = '/' + rawPath.replace(/^\/+/, '').replace(/\/+$/, '');
    res.writeHead(301, { Location: target + query }).end(); return;
  }
  if (redirects.has(pathname)) { res.writeHead(301, { Location: redirects.get(pathname) + query }).end(); return; }
  if (html.has(pathname)) { send(req, res, 200, 'text/html; charset=utf-8', html.get(pathname)); return; }
  if (text.has(pathname)) { const [type, body] = text.get(pathname); send(req, res, 200, type, body, 'public, max-age=3600'); return; }
  let file = path.resolve(root, `.${pathname}`);
  if (pathname.includes('\0') || (file !== root && !file.startsWith(root + path.sep))) {
    res.writeHead(400).end(); return;
  }
  let info;
  try { info = await stat(file); } catch { /* SPA routes are handled below. */ }
  if (info?.isDirectory()) { file = path.join(file, 'index.html'); info = await stat(file).catch(() => null); }
  if (!info?.isFile() || path.basename(file) === 'index.html') {
    if (path.extname(pathname) && path.extname(pathname) !== '.html') { send(req, res, 404, 'text/plain; charset=utf-8', 'Not found'); return; }
    // Unknown routes still render the SPA (which shows its not-found view) but return a real 404.
    send(req, res, 404, 'text/html; charset=utf-8', notFoundHtml); return;
  }
  const ext = path.extname(file);
  res.setHeader('Content-Type', types[ext] || 'application/octet-stream');
  res.setHeader('Cache-Control', ext === '.html' ? 'no-cache' : file.includes(`${path.sep}assets${path.sep}`) ? 'public, max-age=31536000, immutable' : 'public, max-age=3600');
  res.setHeader('Accept-Ranges', 'bytes');
  let start = 0, end = info.size - 1, status = 200;
  if (req.headers.range) {
    const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
    if (!range || (!range[1] && !range[2])) {
      res.writeHead(416, { 'Content-Range': `bytes */${info.size}` }).end(); return;
    }
    start = range[1] ? Number(range[1]) : Math.max(0, info.size - Number(range[2]));
    end = range[1] && range[2] ? Math.min(Number(range[2]), end) : end;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= info.size) {
      res.writeHead(416, { 'Content-Range': `bytes */${info.size}` }).end(); return;
    }
    status = 206;
    res.setHeader('Content-Range', `bytes ${start}-${end}/${info.size}`);
  }
  res.setHeader('Content-Length', Math.max(0, end - start + 1));
  res.writeHead(status);
  if (req.method === 'HEAD' || info.size === 0) { res.end(); return; }
  const stream = createReadStream(file, { start, end });
  stream.on('error', () => res.destroy());
  res.on('close', () => stream.destroy());
  stream.pipe(res);
});
server.listen(Number(process.env.PORT || 8080), '0.0.0.0', () => console.log('IMOS static server ready'));
process.on('SIGTERM', () => server.close(() => process.exit(0)));