import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand, Kicker, Shell, Still, TextLink, VideoCover } from "@/components/site/chrome";
import { pillars, principles } from "@/lib/imos";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <Shell>
      <header className="relative flex min-h-dvh items-end overflow-hidden bg-navy">
        <VideoCover
          src="/media/hero.mp4"
          poster="/media/terminal.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/45 to-navy/25" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-32 pb-16 md:pb-20">
          <p className="text-xs tracking-widest text-sand uppercase">Energy and infrastructure</p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl text-paper md:text-7xl">
            Powering progress. Building connections. Advancing the future.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-sand">
            IMOS connects opportunity with execution across energy, infrastructure, and the relationships that move both forward.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/energy"
              className="inline-flex min-h-12 items-center justify-center bg-copper px-6 text-sm tracking-widest text-paper uppercase transition-colors hover:bg-copper-deep active:scale-[0.96]"
            >
              Explore EN590 and energy supply
            </Link>
            <Link
              to="/about"
              className="inline-flex min-h-12 items-center justify-center border border-paper/50 px-6 text-sm tracking-widest text-paper uppercase transition-colors hover:bg-paper/10"
            >
              Our approach
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block" aria-hidden="true">
          <div className="scroll-rule h-14 w-px bg-paper/70" />
        </div>
      </header>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-6xl md:grid-cols-4">
          {pillars.map((item) => (
            <Link
              key={item.index}
              to={item.href}
              className="group border-b border-line px-6 py-8 transition-colors last:border-b-0 hover:bg-paper-2 md:border-r md:border-b-0 md:last:border-r-0"
            >
              <p className="text-xs tracking-widest text-copper">{item.index}</p>
              <p className="mt-6 text-xs tracking-widest text-steel uppercase">{item.kicker}</p>
              <p className="mt-2 font-serif text-2xl text-navy group-hover:text-copper">{item.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:py-32">
        <div className="relative aspect-portrait overflow-hidden bg-navy">
          <Still src="/media/terminal.jpg" alt="Fuel terminal and tanker at dusk" className="absolute inset-0" />
        </div>
        <div>
          <Kicker>Our lead product</Kicker>
          <h2 className="mt-4 font-serif text-4xl text-navy md:text-6xl">EN590 is at the center of everything we supply.</h2>
          <p className="mt-6 max-w-xl text-ink/80">
            IMOS operates within the global energy marketplace, supporting the sourcing, supply, and strategic movement of EN590 diesel for qualified commercial and industrial customers — backed by dependable supply relationships, regulatory awareness, and long-term partnerships.
          </p>
          <dl className="mt-8 border-t border-line">
            {[
              ["Basis", "CIF"],
              ["Lift", "50,000 – 500,000 MT"],
              ["Counterparties", "Qualified commercial and industrial"],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-2 gap-4 border-b border-line py-4 text-sm">
                <dt className="tracking-widest text-steel uppercase">{label}</dt>
                <dd className="text-navy">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <TextLink to="/contact">Request EN590 supply</TextLink>
          </div>
        </div>
      </section>

      <section className="relative min-h-[88vh] overflow-hidden bg-navy text-paper">
        <VideoCover
          src="/media/bridge.mp4"
          poster="/media/highway.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/60" />
        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-6 py-20">
          <Kicker tone="sand">Infrastructure</Kicker>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl md:text-6xl">
            Building the infrastructure that moves the world forward.
          </h2>
          <p className="mt-6 max-w-xl text-sand">
            Bridge and highway construction, transportation infrastructure, and large-scale development — with qualified contractors, engineering firms, and government entities.
          </p>
          <div className="mt-8">
            <TextLink to="/infrastructure" tone="paper">
              View infrastructure focus
            </TextLink>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:py-32">
        <div className="order-2 lg:order-1">
          <Kicker>Our vision</Kicker>
          <h2 className="mt-4 font-serif text-4xl text-navy md:text-6xl">Connecting opportunity with execution.</h2>
          <p className="mt-6 text-ink/80">
            IMOS was established to connect opportunity with execution across industries essential to economic growth — from energy and fuel solutions to renewable energy development, infrastructure construction, and strategic government and corporate relations.
          </p>
          <p className="mt-4 text-ink/80">
            Progress is built through strong relationships, responsible execution, strategic thinking, and a commitment to long-term value.
          </p>
        </div>
        <div className="relative order-1 aspect-video overflow-hidden bg-navy lg:order-2 lg:aspect-portrait">
          <VideoCover
            src="/media/renewable.mp4"
            poster="/media/renewable.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="bg-navy text-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
          <div className="relative aspect-frame overflow-hidden">
            <Still src="/media/chamber.jpg" alt="Quiet assembly chamber" className="absolute inset-0" />
          </div>
          <div>
            <Kicker tone="sand">Government and corporate relations</Kicker>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">Connecting business with opportunity.</h2>
            <p className="mt-6 text-sand">
              Successful projects depend on more than capital and resources. They require strong relationships, effective communication, and an understanding of the environments in which organizations operate.
            </p>
            <div className="mt-8">
              <TextLink to="/relations" tone="paper">
                Learn about our approach
              </TextLink>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Kicker>How we work</Kicker>
        <h2 className="mt-4 max-w-2xl font-serif text-4xl text-navy md:text-5xl">Four standards. No exceptions.</h2>
        <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((item, i) => (
            <article key={item.title} className="bg-paper p-6">
              <p className="text-xs tracking-widest text-copper">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-8 font-serif text-3xl text-navy">{item.title}</h3>
              <p className="mt-3 text-sm text-ink/80">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBand title="The future is built through action. IMOS is building toward it." to="/contact" label="Start a conversation" />
    </Shell>
  );
}
