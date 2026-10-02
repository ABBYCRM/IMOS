import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { nav, ticker } from "@/lib/imos";

export function Mark({ tone = "light" }: { tone?: "light" | "dark" }) {
  const id = useId();
  const ink = tone === "light" ? "text-paper" : "text-navy";
  return (
    <span className={`wordmark inline-flex items-center ${ink}`} aria-label="IMOS">
      <span>IM</span>
      <svg viewBox="0 0 36 36" className="mx-1 h-5 w-5" aria-hidden="true">
        <defs>
          <clipPath id={id}>
            <circle cx="18" cy="18" r="15.2" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${id})`}>
          <rect width="36" height="36" fill="var(--color-navy-3)" />
          <rect y="18" width="36" height="18" fill="var(--color-globe)" />
          <ellipse cx="18" cy="18" rx="6.5" ry="15" fill="none" stroke="var(--color-paper)" strokeWidth="0.8" opacity="0.75" />
          <path d="M2 18h32" stroke="var(--color-copper)" strokeWidth="1.3" />
        </g>
        <circle cx="18" cy="18" r="15.2" fill="none" stroke="currentColor" strokeWidth="1.1" />
      </svg>
      <span>S</span>
    </span>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [solid, setSolid] = useState(path !== "/");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    const onScroll = () => setSolid(path !== "/" || window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          solid || open ? "bg-navy" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 md:px-6">
          <Link to="/" aria-label="IMOS home" className="relative z-50">
            <Mark />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-sm tracking-wide text-paper/80 transition-colors hover:text-paper ${
                    active ? "text-paper" : ""
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/contact"
              search={{ interest: "" }}
              className="inline-flex min-h-11 items-center bg-copper px-5 text-sm font-medium tracking-widest text-paper uppercase transition-colors duration-200 hover:bg-copper-deep active:scale-[0.96]"
            >
              Inquire
            </Link>
          </nav>
          <button
            type="button"
            className="relative z-50 inline-flex size-11 items-center justify-center text-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {open ? (
        <div id="mobile-nav" className="fixed inset-0 z-30 flex flex-col bg-navy px-6 pt-24 text-paper lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="border-b border-paper/15 py-4 font-serif text-4xl"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact" search={{ interest: "" }} className="mt-8 inline-flex min-h-12 items-center justify-center bg-copper text-sm tracking-widest uppercase">
              Inquire
            </Link>
          </nav>
        </div>
      ) : null}

      <main id="content">{children}</main>
      <Ticker />
      <Footer />
    </div>
  );
}

function Ticker() {
  const row = [...ticker, ...ticker];
  return (
    <div className="overflow-hidden border-y border-line bg-paper-2 text-navy">
      <div className="marquee-track flex w-max gap-10 py-3">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="text-xs tracking-widest uppercase">
            {item}
            <span className="ml-10 text-copper" aria-hidden="true">
              /
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Mark />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-sand">
            Connecting energy. Building infrastructure. Creating opportunity.
          </p>
          <p className="mt-4 text-xs tracking-widest text-steel uppercase">
            Energy / Infrastructure / Opportunity
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs tracking-widest text-steel uppercase">Company</p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link to="/about" className="hover:text-sand">
              Our approach
            </Link>
            <Link to="/relations" className="hover:text-sand">
              Government and corporate relations
            </Link>
            <Link to="/contact" search={{ interest: "" }} className="hover:text-sand">
              Contact
            </Link>
          </div>
        </div>
        <div className="md:col-span-4">
          <p className="text-xs tracking-widest text-steel uppercase">Focus</p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link to="/energy" className="hover:text-sand">
              Energy and fuel
            </Link>
            <Link to="/infrastructure" className="hover:text-sand">
              Infrastructure
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-paper/10 px-6 py-6 text-xs text-steel md:flex-row md:items-center md:justify-between">
        <p>© {year} IMOS. All rights reserved.</p>
        <p className="max-w-xl md:text-right">
          Conversations are with qualified commercial, industrial, and institutional counterparties. Nothing on this site is an offer or a solicitation.
        </p>
      </div>
    </footer>
  );
}

export function Kicker({ children, tone = "copper" }: { children: React.ReactNode; tone?: "copper" | "sand" }) {
  return (
    <p className={`text-xs font-medium tracking-widest uppercase ${tone === "sand" ? "text-sand" : "text-copper"}`}>
      {children}
    </p>
  );
}

export function TextLink({
  to,
  children,
  tone = "copper",
}: {
  to: string;
  children: React.ReactNode;
  tone?: "copper" | "paper" | "navy";
}) {
  const color =
    tone === "paper" ? "text-paper border-paper/40 hover:border-paper" : tone === "navy" ? "text-navy border-navy/30 hover:border-navy" : "text-copper border-copper/40 hover:border-copper";
  return (
    <Link to={to} className={`inline-flex min-h-11 items-center border-b text-sm tracking-widest uppercase ${color}`}>
      {children}
    </Link>
  );
}

export function VideoCover({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  return (
    <video className={className} autoPlay muted loop playsInline poster={poster} preload="metadata">
      <source src={src} type="video/mp4" />
    </video>
  );
}

export function Still({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={`ken h-full w-full object-cover ${className ?? ""}`} />;
}

export function PageHero({
  kicker,
  title,
  image,
  alt,
  video,
  poster,
}: {
  kicker: string;
  title: string;
  image: string;
  alt: string;
  video?: string;
  poster?: string;
}) {
  return (
    <header className="relative flex min-h-[78vh] items-end overflow-hidden bg-navy">
      {video ? (
        <VideoCover src={video} poster={poster ?? image} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <Still src={image} alt={alt} className="absolute inset-0" />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/50 to-navy/20" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-32 pb-16">
        <Kicker tone="sand">{kicker}</Kicker>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl text-paper md:text-7xl">{title}</h1>
      </div>
    </header>
  );
}

export function CtaBand({ title, to, label }: { title: string; to: string; label: string }) {
  return (
    <section className="bg-navy-2 text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-3xl font-serif text-4xl md:text-5xl">{title}</h2>
        <Link
          to={to}
          className="inline-flex min-h-12 shrink-0 items-center justify-center border border-paper/50 px-6 text-sm tracking-widest uppercase transition-colors hover:bg-paper hover:text-navy"
        >
          {label}
        </Link>
      </div>
    </section>
  );
}

export function IndexList({
  items,
  tone = "paper",
}: {
  items: readonly { title: string; body: string }[];
  tone?: "paper" | "navy";
}) {
  const dark = tone === "navy";
  return (
    <div>
      {items.map((item, i) => (
        <article
          key={item.title}
          className={`grid gap-3 border-t py-8 md:grid-cols-12 md:gap-8 ${dark ? "border-paper/15" : "border-line"}`}
        >
          <p className={`text-sm tracking-widest md:col-span-2 ${dark ? "text-sand" : "text-copper"}`}>
            {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className={`font-serif text-3xl md:col-span-4 ${dark ? "text-paper" : "text-navy"}`}>{item.title}</h3>
          <p className={`md:col-span-6 ${dark ? "text-sand" : "text-ink/80"}`}>{item.body}</p>
        </article>
      ))}
    </div>
  );
}
