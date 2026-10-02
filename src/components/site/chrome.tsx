import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { TextReveal } from "@/components/ui/text-reveal";
import { nav, ticker, type InterestId } from "@/lib/imos";

const pillClass =
  "group inline-flex min-h-11 items-center gap-3 self-start rounded-full bg-cream py-1 pr-1 pl-5 text-sm font-medium text-ink transition-all duration-200 hover:gap-4 active:scale-95";

function ArrowDisc() {
  return (
    <span className="flex size-10 items-center justify-center rounded-full bg-void text-cream transition-transform duration-200 group-hover:scale-105">
      <ArrowRight className="size-4" strokeWidth={1.75} />
    </span>
  );
}

export function Mark() {
  const id = useId();
  return (
    <span className="wordmark inline-flex items-center text-cream" aria-label="IMOS">
      <span>IM</span>
      <svg viewBox="0 0 36 36" className="mx-1 h-4 w-4" aria-hidden="true">
        <defs>
          <clipPath id={id}>
            <circle cx="18" cy="18" r="15.2" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${id})`}>
          <rect width="36" height="36" fill="var(--color-void-2)" />
          <rect y="18" width="36" height="18" fill="var(--color-globe)" />
          <ellipse cx="18" cy="18" rx="6.5" ry="15" fill="none" stroke="var(--color-cream)" strokeWidth="0.8" opacity="0.8" />
          <path d="M2 18h32" stroke="var(--color-cream)" strokeWidth="1.2" />
        </g>
        <circle cx="18" cy="18" r="15.2" fill="none" stroke="currentColor" strokeWidth="1.1" />
      </svg>
      <span>S</span>
    </span>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const links = nav.filter((item) => item.to !== "/");

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="min-h-dvh bg-void text-cream">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-cream focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
        <div className="hidden justify-center md:flex">
          <nav
            className="pointer-events-auto flex items-center gap-8 rounded-b-nav bg-void px-8 py-4"
            aria-label="Primary"
          >
            <Link to="/" aria-label="IMOS home">
              <Mark />
            </Link>
            {links.map((item) => {
              const active = path.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-sm transition-colors ${active ? "text-cream" : "text-cream-dim hover:text-cream"}`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/contact"
              search={{ interest: "" }}
              className={`text-sm transition-colors ${path.startsWith("/contact") ? "text-cream" : "text-cream-dim hover:text-cream"}`}
            >
              Inquire
            </Link>
          </nav>
        </div>

        <div className="pointer-events-auto flex items-center justify-between px-3 pt-3 md:hidden">
          <Link to="/" aria-label="IMOS home" className="rounded-full bg-void px-4 py-3">
            <Mark />
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full bg-void text-cream"
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
        <div id="mobile-nav" className="fixed inset-0 z-30 flex flex-col bg-void px-6 pt-24 md:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {nav.map((item) => (
              <Link key={item.to} to={item.to} className="border-b border-line py-4 font-display text-display">
                {item.label}
              </Link>
            ))}
            <div className="mt-8">
              <Pill to="/contact">Inquire</Pill>
            </div>
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
    <div className="overflow-hidden border-y border-line">
      <div className="marquee-track flex w-max gap-10 py-3">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="text-xs tracking-widest text-mute uppercase">
            {item}
            <span className="ml-10 text-cream-dim" aria-hidden="true">
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
    <footer className="bg-void">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Mark />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream-dim">
            Connecting energy. Building infrastructure. Creating opportunity.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs tracking-widest text-mute uppercase">Company</p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link to="/about" className="text-cream-dim hover:text-cream">
              Our approach
            </Link>
            <Link to="/relations" className="text-cream-dim hover:text-cream">
              Government and corporate relations
            </Link>
            <Link to="/contact" search={{ interest: "" }} className="text-cream-dim hover:text-cream">
              Contact
            </Link>
          </div>
        </div>
        <div className="md:col-span-4">
          <p className="text-xs tracking-widest text-mute uppercase">Focus</p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link to="/energy" className="text-cream-dim hover:text-cream">
              Energy and fuel
            </Link>
            <Link to="/infrastructure" className="text-cream-dim hover:text-cream">
              Infrastructure
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 pt-12 text-xs text-mute md:flex-row md:items-center md:justify-between">
        <p>© {year} IMOS. All rights reserved.</p>
        <p className="max-w-xl md:text-right">
          Conversations are with qualified commercial, industrial, and institutional counterparties. Nothing on this site is an offer or a solicitation.
        </p>
      </div>
      <div className="mega-bleed mt-10 overflow-hidden px-2">
        <p className="text-center font-display text-mega text-cream select-none">IMOS</p>
      </div>
    </footer>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-medium tracking-widest text-mute uppercase">{children}</p>;
}

type PillTo = "/energy" | "/infrastructure" | "/relations" | "/about" | "/contact";

export function Pill({
  to,
  interest = "",
  children,
}: {
  to: PillTo;
  interest?: InterestId | "";
  children: React.ReactNode;
}) {
  if (to === "/contact") {
    return (
      <Link to="/contact" search={{ interest }} className={pillClass}>
        {children}
        <ArrowDisc />
      </Link>
    );
  }
  return (
    <Link to={to} className={pillClass}>
      {children}
      <ArrowDisc />
    </Link>
  );
}

export function PillButton({
  children,
  type = "button",
  onClick,
}: {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  return (
    <button type={type} onClick={onClick} className={pillClass}>
      {children}
      <ArrowDisc />
    </button>
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
  return <img src={src} alt={alt} className={`h-full w-full object-cover ${className ?? ""}`} />;
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
    <section className="p-2 md:p-3">
      <header className="relative flex min-h-dvh items-end overflow-hidden rounded-frame bg-void-2">
        {video ? (
          <VideoCover src={video} poster={poster ?? image} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <Still src={image} alt={alt} className="absolute inset-0" />
        )}
        <div className="noise-overlay pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-void via-void/45 to-void/25" />
        <div className="relative z-10 w-full px-5 pt-28 pb-10 md:px-10 md:pb-14">
          <Kicker>{kicker}</Kicker>
          <h1 className="mt-4 max-w-5xl text-display text-cream">
            <TextReveal text={title} startOnView={false} className="text-cream" />
          </h1>
        </div>
      </header>
    </section>
  );
}

export function CtaBand({ title, label, interest = "" }: { title: string; label: string; interest?: InterestId | "" }) {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-24 md:flex-row md:items-end md:justify-between">
      <h2 className="max-w-3xl text-display">{title}</h2>
      <Pill to="/contact" interest={interest}>
        {label}
      </Pill>
    </section>
  );
}

export function IndexList({ items }: { items: readonly { title: string; body: string }[] }) {
  return (
    <div>
      {items.map((item, i) => (
        <article key={item.title} className="grid gap-3 border-t border-line py-8 md:grid-cols-12 md:gap-8">
          <p className="text-sm tracking-widest text-mute md:col-span-2">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="text-title md:col-span-4">{item.title}</h3>
          <p className="text-cream-dim md:col-span-6">{item.body}</p>
        </article>
      ))}
    </div>
  );
}
