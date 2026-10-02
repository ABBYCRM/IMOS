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

This branch is staged only. The main branch and DigitalOcean app settings
have not been changed. To restore the previous version, select `main` again.
Do not merge this release into main unless you also intend to update other
hosts that track main, including the existing Vercel deployment.

## Rebuild

The editable redesign remains in the Replit workspace at `artifacts/imos`.
Build using `PORT=24960 BASE_PATH=/ NODE_ENV=production pnpm --filter @workspace/imos run build`.
Copy `artifacts/imos/dist/public` into `imos-release/public`, excluding the unused
legacy `media/hero.mp4`. Keep this server and the release Dockerfile.