import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { TextReveal } from "@/components/ui/text-reveal";
import { nav, ticker, type InterestId } from "@/lib/imos";

const pillClass =
  "group inline-flex min-h-11 items-center gap-3 self-start rounded-full bg-ocean py-1 pr-1 pl-5 text-sm font-medium tracking-wide text-paper uppercase transition-all duration-200 hover:gap-4 active:scale-95";

function ArrowDisc() {
  return (
    <span className="flex size-10 items-center justify-center rounded-full bg-void text-paper transition-transform duration-200 group-hover:scale-105">
      <ArrowRight className="size-4" strokeWidth={1.75} />
    </span>
  );
}

export function Mark({ className = "h-12 md:h-14" }: { className?: string }) {
  return <img src="/media/imos-logo.png" alt="IMOS" className={`w-auto ${className}`} />;
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

      <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-void/85 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 md:px-6">
          <Link to="/" aria-label="IMOS home" className="shrink-0">
            <Mark className="h-11 md:h-14" />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {links.map((item) => {
              const active = path.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-sm font-medium tracking-widest uppercase transition-colors ${active ? "text-cream" : "text-cream-dim hover:text-cream"}`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/contact"
              search={{ interest: "" }}
              className="inline-flex min-h-11 items-center rounded-full bg-ocean px-5 text-sm font-medium tracking-widest text-paper uppercase"
            >
              Inquire
            </Link>
          </nav>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-cream lg:hidden"
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
        <div id="mobile-nav" className="fixed inset-0 z-30 flex flex-col bg-void px-6 pt-28 lg:hidden">
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
            <span className="ml-10 text-land" aria-hidden="true">
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
          <Mark className="h-16 md:h-20" />
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
    <section>
      <header className="relative flex min-h-dvh items-end overflow-hidden bg-void-2">
        {video ? (
          <VideoCover src={video} poster={poster ?? image} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <Still src={image} alt={alt} className="absolute inset-0" />
        )}
        <div className="noise-overlay pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-void via-void/35 to-void/20" />
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
