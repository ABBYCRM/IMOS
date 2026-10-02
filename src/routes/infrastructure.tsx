import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, IndexList, Kicker, PageHero, Shell, Still } from "@/components/site/chrome";
import { infraLines } from "@/lib/imos";

export const Route = createFileRoute("/infrastructure")({ component: InfrastructurePage });

function InfrastructurePage() {
  return (
    <Shell>
      <PageHero
        kicker="Infrastructure"
        title="Building the infrastructure that moves the world forward."
        image="/media/highway.jpg"
        alt="Highway and bridge at dawn"
        video="/media/bridge.mp4"
        poster="/media/highway.jpg"
      />

      <section className="mx-auto max-w-3xl px-6 py-24">
        <p className="font-serif text-2xl leading-snug text-navy md:text-3xl">
          Strong infrastructure is the foundation of a strong economy.
        </p>
        <p className="mt-6 text-ink/80">
          IMOS is involved in infrastructure opportunities including bridge and highway construction, transportation infrastructure, and large-scale development projects. We seek to collaborate with qualified contractors, engineering firms, developers, government entities, and strategic partners to support projects that improve transportation, connectivity, safety, and economic development.
        </p>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-screen overflow-hidden bg-navy">
          <Still src="/media/highway.jpg" alt="Aerial of a highway interchange and bridge" className="absolute inset-0" />
        </div>
        <div className="flex flex-col justify-center px-6 py-20 lg:px-16">
          <Kicker>Our infrastructure focus</Kicker>
          <h2 className="mt-4 font-serif text-4xl text-navy md:text-5xl">Lasting performance. Community benefit.</h2>
          <p className="mt-6 text-ink/80">
            The goal is to support infrastructure projects designed for lasting performance, economic impact, and community benefit — not one-off construction for its own sake.
          </p>
        </div>
      </section>

      <section className="bg-navy py-24 text-paper">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker tone="sand">Infrastructure portfolio</Kicker>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl md:text-5xl">
            Areas of interest across transportation and development.
          </h2>
          <div className="mt-12">
            <IndexList items={infraLines} tone="navy" />
          </div>
        </div>
      </section>

      <CtaBand
        title="Have an infrastructure project or partnership to discuss?"
        to="/contact"
        label="Contact IMOS"
      />
    </Shell>
  );
}
