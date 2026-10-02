import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const base = process.argv[2] || "http://127.0.0.1:8080";
const routes = ["/", "/energy", "/infrastructure", "/relations", "/about", "/contact"];
const viewports = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "mobile", width: 390, height: 844 },
];

mkdirSync("/workspace/screenshots", { recursive: true });
const browser = await chromium.launch({ headless: true });
const failures = [];

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  const errors = [];
  page.on("pageerror", (err) => errors.push(String(err)));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  for (const route of routes) {
    const res = await page.goto(base + route, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(900);
    const status = res?.status() ?? 0;
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    const logo = await page.locator('img[src="/media/imos-logo.png"]').count();
    const shot = `/workspace/screenshots/pass-${route === "/" ? "home" : route.slice(1)}-${vp.name}.png`;
    await page.screenshot({ path: shot });
    const row = { route, viewport: vp.name, status, overflow, logo, errors: [...errors] };
    if (status !== 200 || overflow || logo < 1 || errors.length) failures.push(row);
    console.log(JSON.stringify(row));
    errors.length = 0;
  }
  await page.close();
}

await browser.close();
if (failures.length) {
  console.error(JSON.stringify({ ok: false, failures }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ ok: true }));
