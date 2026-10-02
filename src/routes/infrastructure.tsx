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

      <section className="mx-auto max-w-3xl px-4 py-24 lg:px-6">
        <p className="text-title leading-snug">Strong infrastructure is the foundation of a strong economy.</p>
        <p className="mt-6 text-cream-dim">
          IMOS is involved in infrastructure opportunities including bridge and highway construction, transportation infrastructure, and large-scale development projects. We seek to collaborate with qualified contractors, engineering firms, developers, government entities, and strategic partners to support projects that improve transportation, connectivity, safety, and economic development.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-3 lg:grid-cols-2 lg:px-6">
        <div className="relative min-h-dvh overflow-hidden rounded-frame bg-void-2">
          <Still src="/media/highway.jpg" alt="Aerial of a highway interchange and bridge" className="absolute inset-0" />
          <div className="noise-overlay pointer-events-none absolute inset-0" />
        </div>
        <div className="px-3 py-12 lg:px-10">
          <Kicker>Infrastructure focus</Kicker>
          <h2 className="mt-4 text-display">Lasting performance. Community benefit.</h2>
          <p className="mt-6 text-cream-dim">
            The goal is to support infrastructure projects designed for lasting performance, economic impact, and community benefit — not one-off construction for its own sake.
          </p>
        </div>
      </section>

      <section className="bg-void-2 py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <Kicker>Portfolio</Kicker>
          <h2 className="mt-4 max-w-3xl text-display">Areas of interest across transportation and development.</h2>
          <div className="mt-12">
            <IndexList items={infraLines} />
          </div>
        </div>
      </section>

      <CtaBand title="Have an infrastructure project or partnership to discuss?" label="Contact IMOS" interest="infrastructure" />
    </Shell>
  );
}
