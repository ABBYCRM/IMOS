import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.env.STATIC_ROOT || path.join(import.meta.dirname, 'public'));
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png',
  '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.webm': 'video/webm',
  '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8', '.woff2': 'font/woff2' };
const server = createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end(); return;
  }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400).end(); return; }
  let file = path.resolve(root, `.${pathname}`);
  if (pathname.includes('\0') || (file !== root && !file.startsWith(root + path.sep))) {
    res.writeHead(400).end(); return;
  }
  let info;
  try { info = await stat(file); } catch { /* SPA routes are handled below. */ }
  if (info?.isDirectory()) { file = path.join(file, 'index.html'); info = await stat(file).catch(() => null); }
  if (!info?.isFile()) {
    if (path.extname(pathname)) { res.writeHead(404).end('Not found'); return; }
    file = path.join(root, 'index.html');
    info = await stat(file).catch(() => null);
    if (!info) { res.writeHead(503).end('Site build unavailable'); return; }
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