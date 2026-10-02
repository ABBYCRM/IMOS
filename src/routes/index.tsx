import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { CtaBand, Kicker, Pill, Shell, Still, VideoCover } from "@/components/site/chrome";
import { WordsPullUp } from "@/components/ui/words-pull-up";
import { TextReveal } from "@/components/ui/text-reveal";
import { pillars, principles } from "@/lib/imos";

export const Route = createFileRoute("/")({ component: Home });

const films = [
  {
    href: "/energy",
    kicker: "Energy",
    title: "EN590 and fuel supply",
    poster: "/media/refinery.jpg",
    video: "",
  },
  {
    href: "/infrastructure",
    kicker: "Infrastructure",
    title: "Bridges and highways",
    video: "/media/bridge.mp4",
    poster: "/media/highway.jpg",
  },
  {
    href: "/energy",
    kicker: "Renewables",
    title: "Cleaner systems, same standard",
    video: "/media/renewable.mp4",
    poster: "/media/renewable.jpg",
  },
] as const;

function Home() {
  const reduce = useReducedMotion();
  return (
    <Shell>
      <section className="h-dvh p-2 md:p-3">
        <div className="relative h-full overflow-hidden rounded-frame bg-void-2">
          <VideoCover
            src="/media/hero.mp4"
            poster="/media/terminal.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="noise-overlay pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-void/40 via-transparent to-void/75" />
          <div className="absolute inset-x-0 bottom-0 px-4 pb-4 md:px-8 md:pb-6">
            <div className="grid items-end gap-6 lg:grid-cols-12">
              <h1 className="text-mega text-cream lg:col-span-8">
                <WordsPullUp text="IMOS" />
              </h1>
              <div className="flex flex-col gap-5 pb-2 lg:col-span-4 lg:pb-6">
                <motion.p
                  initial={reduce ? false : { y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-sm text-sm leading-snug text-cream-dim md:text-base"
                >
                  Powering progress. Building connections. Advancing the future. EN590 diesel, CIF, for qualified commercial and industrial counterparties.
                </motion.p>
                <motion.div
                  initial={reduce ? false : { y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Pill to="/contact" interest="en590">
                    Discuss EN590
                  </Pill>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl md:grid-cols-4">
        {pillars.map((item) => (
          <Link
            key={item.index}
            to={item.href}
            className="group border-b border-line px-6 py-8 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0"
          >
            <p className="text-xs tracking-widest text-mute">{item.index}</p>
            <p className="mt-8 text-xs tracking-widest text-cream-dim uppercase">{item.kicker}</p>
            <p className="mt-2 text-2xl group-hover:text-cream-dim">{item.title}</p>
          </Link>
        ))}
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-24 lg:grid-cols-2 lg:px-6 lg:py-32">
        <div className="relative aspect-portrait overflow-hidden rounded-frame bg-void-2">
          <Still src="/media/terminal.jpg" alt="Fuel terminal and tanker at dusk" className="absolute inset-0" />
          <div className="noise-overlay pointer-events-none absolute inset-0" />
        </div>
        <div>
          <Kicker>Lead product</Kicker>
          <h2 className="mt-4 text-display">
            <TextReveal text="EN590 is the center of the supply." />
          </h2>
          <p className="mt-6 max-w-xl text-cream-dim">
            IMOS operates within the global energy marketplace, supporting the sourcing, supply, and strategic movement of EN590 diesel for qualified commercial and industrial customers — backed by dependable supply relationships, regulatory awareness, and long-term partnerships.
          </p>
          <dl className="mt-8 border-t border-line">
            {[
              ["Basis", "CIF"],
              ["Lift", "50,000 – 500,000 MT"],
              ["Counterparties", "Qualified commercial and industrial"],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-2 gap-4 border-b border-line py-4 text-sm">
                <dt className="tracking-widest text-mute uppercase">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <Pill to="/contact" interest="en590">
              Request EN590 supply
            </Pill>
          </div>
        </div>
      </section>

      <section className="px-3 pb-6 md:px-6">
        <div className="mx-auto max-w-6xl">
          <Kicker>Where IMOS operates</Kicker>
          <h2 className="mt-4 max-w-xl text-title">Energy, infrastructure, and the relationships that move both.</h2>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {films.map((film) => (
              <Link key={film.title} to={film.href} className="group relative block aspect-portrait overflow-hidden rounded-frame bg-void-2 md:aspect-frame">
                {film.video ? (
                  <VideoCover src={film.video} poster={film.poster} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <Still src={film.poster} alt={film.title} className="absolute inset-0" />
                )}
                <div className="noise-overlay pointer-events-none absolute inset-0" />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-void via-void/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs tracking-widest text-cream-dim uppercase">{film.kicker}</p>
                  <p className="mt-2 text-2xl">{film.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-24 lg:grid-cols-2 lg:px-6">
        <div className="relative aspect-wide overflow-hidden rounded-frame lg:order-2 lg:aspect-portrait">
          <Still src="/media/chamber.jpg" alt="Quiet assembly chamber" className="absolute inset-0" />
          <div className="noise-overlay pointer-events-none absolute inset-0" />
        </div>
        <div>
          <Kicker>Government and corporate relations</Kicker>
          <h2 className="mt-4 text-display">
            <TextReveal text="Connecting business with opportunity." />
          </h2>
          <p className="mt-6 text-cream-dim">
            Successful projects depend on more than capital and resources. They require strong relationships, effective communication, and an understanding of the environments in which organizations operate.
          </p>
          <div className="mt-8">
            <Pill to="/relations">Our approach to relations</Pill>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 lg:px-6">
        <Kicker>How we work</Kicker>
        <h2 className="mt-4 max-w-2xl text-display">Four standards. No exceptions.</h2>
        <div className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((item, i) => (
            <article key={item.title} className="border-b border-line py-8 sm:border-r sm:px-6 sm:last:border-r-0 lg:border-b-0">
              <p className="text-xs tracking-widest text-mute">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-8 text-title">{item.title}</h3>
              <p className="mt-3 text-sm text-cream-dim">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        title="The future is built through action. IMOS is building toward it."
        label="Start a conversation"
      />
    </Shell>
  );
}
