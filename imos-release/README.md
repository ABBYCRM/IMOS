# IMOS DigitalOcean release

This release packages the tested Replit redesign as prebuilt static assets.
The original repository source is preserved. On the release branch only,
the root Dockerfile serves `imos-release/public` using a dependency-free Node
HTTP server on port 8080, matching the existing DigitalOcean web service.

Includes all six routes, the contact-page photograph, original company logo,
public-domain background video, and the five-page EN590 PDF brochure.
The server supports direct SPA routes and video byte-range requests.
Inquiry forms prepare local briefs, not backend submissions.
No workspace secrets, API keys, restricted source documents, or databases are included.

## Publish from DigitalOcean

1. Open the existing IMOS app in DigitalOcean App Platform.
2. Open Settings, select the `web` component, and edit its source.
3. Select the prepared `imos-redesign-release-2026-10-02` branch.
4. Confirm the source directory remains the repository root and the Dockerfile
   path is `Dockerfile`. Keep port 8080 and the existing app settings.
5. Review and save/deploy. Selecting and saving the new source may initiate
   deployment immediately.
6. Once active, check `/`, `/energy`, `/contact`, video playback, and the PDF link.

This release is merged into `main`, which the DigitalOcean `imos` app deploys
on push. Other hosts that track `main` (the older Vercel project) are not
configured for this release.

## SEO and AI search

`server.mjs` pre-renders one HTML document per route with the head tags from
`site.mjs` and `seo.mjs`: unique title and description, canonical URL, Open
Graph and Twitter tags, favicons, and JSON-LD (`Organization`, `WebSite`, and a
`WebPage`/`AboutPage`/`ContactPage` with a `BreadcrumbList`). It also serves
`/robots.txt`, `/sitemap.xml`, `/llms.txt` and `/llms-full.txt` (from
`llms-full.md`). Unknown routes return HTTP 404; `/index.html`, `/<page>.html`
and trailing-slash URLs redirect (301) to the canonical path.

When adding a page to the SPA, add it to `pages` in `site.mjs` so it is
pre-rendered and listed in the sitemap, and add its text to `llms-full.md`.

Environment variables (both optional, runtime):

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Origin used for canonical, sitemap, Open Graph and llms.txt URLs. Defaults to `https://imos-2mi89.ondigitalocean.app`. Set it to the custom domain once one is attached. |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console HTML-tag token (the `content` value only). When set, `<meta name="google-site-verification">` is added to every page. |

Google Search Console: add a URL-prefix property for the `SITE_URL` origin,
choose the HTML tag method, put the token in `GOOGLE_SITE_VERIFICATION` on the
`web` component, redeploy, then click Verify and submit `/sitemap.xml`.
A Domain property instead needs a DNS TXT record
(`google-site-verification=...`) at the domain's DNS host; that requires a
custom domain, because `ondigitalocean.app` DNS cannot be edited.

Run `node --test imos-release/seo.test.mjs` to check the generated metadata.

## Rebuild

The editable redesign remains in the Replit workspace at `artifacts/imos`.
Build using `PORT=24960 BASE_PATH=/ NODE_ENV=production pnpm --filter @workspace/imos run build`.
Copy `artifacts/imos/dist/public` into `imos-release/public`, excluding the unused
legacy `media/hero.mp4`. Keep this server and the release Dockerfile.
## HD media (2026-10-03)

Content photos are served as `<picture>` (AVIF, WebP, JPG fallback) with `srcset` 640-3840 from
`public/media/hd/`, and `sizes` matching each object-fit:cover box. Because the redesign source is not in
this repo, `scripts/patch-hd-bundle.py` patches the prebuilt bundle (new hashed asset names) and adds an
inline per-route hero preload to `index.html`. Rebuild the images with
`python3 scripts/build-hd-media.py <dir-of-originals>`. Credits: `public/media/credits.txt`.
`server.mjs` only gained `image/avif` and `image/webp` content types.
