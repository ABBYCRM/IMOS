#!/usr/bin/env python3
"""Build responsive HD media for the IMOS static release.

usage: python3 scripts/build-hd-media.py <source-dir>
<source-dir> holds the full-resolution originals named <role>.jpg (see imos-release/public/media/credits.txt).
Writes imos-release/public/media/hd/<role>-<w>.{avif,webp,jpg} (Lanczos downscale only, never upscaled,
sRGB, metadata stripped) and refreshes the legacy imos-release/public/media/<role>.jpg at 2560 px.
"""
import io, os, sys
from PIL import Image, ImageCms, ImageFilter

ROLES = ["terminal", "refinery", "highway", "chamber", "engineers", "aviation", "solar", "renewable", "contact-port"]
WIDTHS = [640, 960, 1280, 1920, 2560, 3840]
OUT = os.path.join(os.path.dirname(__file__), "..", "imos-release", "public", "media")

def to_srgb(im):
    icc = im.info.get("icc_profile")
    if icc:
        try:
            src = ImageCms.ImageCmsProfile(io.BytesIO(icc))
            im = ImageCms.profileToProfile(im, src, ImageCms.createProfile("sRGB"), outputMode="RGB")
        except Exception:
            pass
    return im.convert("RGB")

def main(src_dir):
    os.makedirs(os.path.join(OUT, "hd"), exist_ok=True)
    print(f"{'file':34} {'size':>10}")
    for role in ROLES:
        im = to_srgb(Image.open(os.path.join(src_dir, role + ".jpg")))
        widths = [w for w in WIDTHS if w <= im.width] or [im.width]
        for w in widths:
            h = round(im.height * w / im.width)
            r = im.resize((w, h), Image.LANCZOS) if w != im.width else im.copy()
            if w < 3840 and w != im.width:
                r = r.filter(ImageFilter.UnsharpMask(radius=0.6, percent=40, threshold=2))
            base = os.path.join(OUT, "hd", f"{role}-{w}")
            r.save(base + ".avif", quality=55, speed=6)
            r.save(base + ".webp", quality=80, method=6)
            r.save(base + ".jpg", quality=82, progressive=True, optimize=True)
            for ext in ("avif", "webp", "jpg"):
                print(f"hd/{role}-{w}.{ext:5} {os.path.getsize(base + '.' + ext)//1024:>8} KB")
        if role != "contact-port":
            w = min(2560, im.width)
            im.resize((w, round(im.height * w / im.width)), Image.LANCZOS).save(
                os.path.join(OUT, role + ".jpg"), quality=82, progressive=True, optimize=True)

if __name__ == "__main__":
    main(sys.argv[1])
