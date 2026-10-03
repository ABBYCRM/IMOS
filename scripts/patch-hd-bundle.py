#!/usr/bin/env python3
"""Patch the prebuilt IMOS release bundle to serve responsive HD photos (style/asset change only).

The redesign source lives outside this repo, so the release bundle is patched in place:
every content photo becomes <picture> (AVIF, WebP, JPG fallback; srcset 640-3840 from media/hd/),
with `sizes` matching the rendered object-fit:cover box at each breakpoint. Forms, routing,
and server code are untouched. The patched JS/CSS get new content-hashed names (the old ones are
cached immutable) and index.html gets an inline per-route hero preload.
usage: python3 scripts/patch-hd-bundle.py
"""
import hashlib, os, re

PUB = os.path.join(os.path.dirname(__file__), "..", "imos-release", "public")
HERO = "(max-width: 767px) 270vw, 106vw"
CONTACT = "(max-width: 767px) 180vw, 100vw"
ROUTE_HERO = {"/energy": "terminal", "/infrastructure": "highway", "/relations": "chamber", "/about": "refinery"}

HELPER = (
    ',__hdN=["terminal","refinery","highway","chamber","engineers","aviation","solar","renewable","contact-port"]'
    ',__hdW=[640,960,1280,1920,2560,3840]'
    ',__hd=(a,s)=>{const m=/^\\/media\\/([a-z-]+)\\.jpg$/.exec(a.src||""),'
    'n=m&&(m[1]==="port-savannah-poster"?"contact-port":m[1]);'
    'if(!n||!__hdN.includes(n))return d.jsx("img",a);'
    'const f=e=>__hdW.map(w=>`/media/hd/${n}-${w}.${e} ${w}w`).join(", ");'
    'return d.jsxs("picture",{className:"hd-pic",children:['
    'd.jsx("source",{type:"image/avif",srcSet:f("avif"),sizes:s}),'
    'd.jsx("source",{type:"image/webp",srcSet:f("webp"),sizes:s}),'
    'd.jsx("img",{...a,src:`/media/hd/${n}-1920.jpg`,srcSet:f("jpg"),sizes:s})]})}'
)

# (old, new) pairs; each old string must occur exactly once.
JS_EDITS = [
    ("const jt=a=>`/media/${a}`,", "const jt=a=>`/media/${a}`" + HELPER + ","),
    # home sector carousel cards
    ('d.jsx("img",{src:i(p.img),alt:"",loading:"lazy"})',
     '__hd({src:i(p.img),alt:"",loading:"lazy"},"(min-width: 1024px) 640px, 60vw")'),
    # page hero (energy, infrastructure, relations, about)
    ('d.jsx("img",{src:jt(o),alt:"",className:"hero-media"})',
     '__hd({src:jt(o),alt:"",className:"hero-media"},"%s")' % HERO),
    # home: leading product 4:5
    ('d.jsx("img",{src:jt("terminal.jpg"),alt:"Fuel storage terminal at dusk",loading:"lazy"})',
     '__hd({src:jt("terminal.jpg"),alt:"Fuel storage tanks at a refinery at night",loading:"lazy"},"(min-width: 1024px) 940px, 170vw")'),
    # home: highway parallax band
    ('d.jsx("img",{src:jt("highway.jpg"),alt:"",loading:"lazy"})',
     '__hd({src:jt("highway.jpg"),alt:"",loading:"lazy"},"(max-width: 767px) 285vw, 100vw")'),
    # energy: three 4:5 cards
    ('d.jsx("img",{src:jt(f),alt:"",loading:"lazy"})',
     '__hd({src:jt(f),alt:"",loading:"lazy"},"(min-width: 768px) 720px, 170vw")'),
    # 4:3 section images
    ('d.jsx("img",{src:jt("engineers.jpg"),alt:"Engineers reviewing plans on site",loading:"lazy"})',
     '__hd({src:jt("engineers.jpg"),alt:"Engineers in hard hats on site",loading:"lazy"},"(min-width: 768px) 780px, 120vw")'),
    ('d.jsx("img",{src:jt("solar.jpg"),alt:"Solar installation",loading:"lazy"})',
     '__hd({src:jt("solar.jpg"),alt:"Solar installation",loading:"lazy"},"(min-width: 768px) 780px, 120vw")'),
    ('d.jsx("img",{src:jt("chamber.jpg"),alt:"Institutional chamber",loading:"lazy"})',
     '__hd({src:jt("chamber.jpg"),alt:"Institutional chamber",loading:"lazy"},"(min-width: 768px) 780px, 120vw")'),
    ('d.jsx("img",{src:jt("renewable.jpg"),alt:"Renewable energy installation",loading:"lazy"})',
     '__hd({src:jt("renewable.jpg"),alt:"Renewable energy installation",loading:"lazy"},"(min-width: 768px) 780px, 120vw")'),
    # contact hero (was the 1280px video still)
    ('d.jsx("img",{src:jt("port-savannah-poster.jpg"),alt:"",fetchPriority:"high",',
     '__hd({src:jt("port-savannah-poster.jpg"),alt:"",fetchPriority:"high",'),
]
CONTACT_TAIL = (r'(__hd\(\{src:jt\("port-savannah-poster\.jpg"\),alt:"",fetchPriority:"high",className:"[^"]*"\})\)',
                r'\1,"%s")' % CONTACT)
CSS_ADD = (".hd-pic{display:contents}.parallax-layer>.hd-pic>img{width:100%;height:100%;object-fit:cover}"
           # mobile home hero: the video sky sits behind the small orange eyebrow (pre-existing 3.7:1); deepen the top of the shade
           "@media (max-width:767px){.min-h-\\[100dvh\\]>.bg-gradient-to-t{background-image:linear-gradient(to top,hsl(197 58% 8%) 0%,hsl(197 58% 8%/.6) 50%,hsl(197 58% 8%/.62) 100%)}}")

def preload_script():
    srcset = lambda n: ", ".join(f"/media/hd/{n}-{w}.avif {w}w" for w in [640, 960, 1280, 1920, 2560, 3840])
    table = {p: [srcset(n), HERO] for p, n in ROUTE_HERO.items()}
    table["/contact"] = [srcset("contact-port"), CONTACT]
    import json
    return ("<script>(function(){var p=location.pathname.replace(/\\/+$/,'')||'/',t=%s,l=document.createElement('link');"
            "l.rel='preload';l.as='image';l.setAttribute('fetchpriority','high');"
            "if(p==='/'){l.href='/media/port-savannah-poster.jpg';}else if(t[p]){l.type='image/avif';"
            "l.setAttribute('imagesrcset',t[p][0]);l.setAttribute('imagesizes',t[p][1]);}else{return;}"
            "document.head.appendChild(l);})();</script>") % json.dumps(table, separators=(",", ":"))

def main():
    idx_path = os.path.join(PUB, "index.html")
    html = open(idx_path).read()
    js_name = re.search(r'src="/assets/(index-[^"]+\.js)"', html).group(1)
    css_name = re.search(r'href="/assets/(index-[^"]+\.css)"', html).group(1)
    js = open(os.path.join(PUB, "assets", js_name)).read()
    css = open(os.path.join(PUB, "assets", css_name)).read()
    assert "__hd(" not in js, "bundle already patched"
    for old, new in JS_EDITS:
        assert js.count(old) == 1, f"expected exactly one match for: {old[:70]}"
        js = js.replace(old, new)
    js, n = re.subn(CONTACT_TAIL[0], CONTACT_TAIL[1], js)
    assert n == 1, "contact hero tail"
    css = css + CSS_ADD
    h = lambda b: hashlib.sha256(b.encode()).hexdigest()[:8]
    new_js, new_css = f"index-hd{h(js)}.js", f"index-hd{h(css)}.css"
    open(os.path.join(PUB, "assets", new_js), "w").write(js)
    open(os.path.join(PUB, "assets", new_css), "w").write(css)
    os.remove(os.path.join(PUB, "assets", js_name)); os.remove(os.path.join(PUB, "assets", css_name))
    html = html.replace(f"/assets/{js_name}", f"/assets/{new_js}").replace(f"/assets/{css_name}", f"/assets/{new_css}")
    html = html.replace('    <script type="module"', "    " + preload_script() + '\n    <script type="module"', 1)
    open(idx_path, "w").write(html)
    print("js ", js_name, "->", new_js); print("css", css_name, "->", new_css); print("index.html: preload script added")

if __name__ == "__main__":
    main()
