import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, Kicker, PageHero, Shell, Still, VideoCover } from "@/components/site/chrome";
import { principles } from "@/lib/imos";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  return (
    <Shell>
      <PageHero
        kicker="Our approach"
        title="Creating value through strategic partnerships."
        image="/media/refinery.jpg"
        alt="Refinery at night"
      />

      <section className="mx-auto max-w-3xl px-4 py-24 lg:px-6">
        <p className="text-title leading-snug">Meaningful growth is built through collaboration.</p>
        <p className="mt-6 text-cream-dim">
          At IMOS, we bring together resources, relationships, industry knowledge, and strategic opportunities to support projects across energy, fuels, renewable energy, and infrastructure.
        </p>
      </section>

      <section className="border-y border-line">
        <div className="mx-auto grid max-w-6xl md:grid-cols-2 lg:grid-cols-4">
          {principles.map((item, i) => (
            <article key={item.title} className="border-b border-line px-6 py-10 last:border-b-0 md:border-r lg:border-b-0 lg:last:border-r-0">
              <p className="text-xs tracking-widest text-mute">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-8 text-title">{item.title}</h2>
              <p className="mt-3 text-sm text-cream-dim">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 lg:grid-cols-2 lg:px-6">
        <div className="relative aspect-frame overflow-hidden rounded-frame bg-void-2">
          <Still src="/media/engineers.jpg" alt="Engineers on a refinery catwalk at sunset" className="absolute inset-0" />
          <div className="noise-overlay pointer-events-none absolute inset-0" />
        </div>
        <div>
          <Kicker>Building for the future</Kicker>
          <h2 className="mt-4 text-display">Energy. Infrastructure. Opportunity.</h2>
          <p className="mt-6 text-cream-dim">
            Energy systems are evolving. Infrastructure needs are growing. Businesses and governments are seeking partnerships for increasingly complex challenges.
          </p>
          <p className="mt-4 text-cream-dim">
            IMOS intends to be part of that transformation. We don’t simply look at where the market is today — we look at where it is going next.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-3 lg:grid-cols-2 lg:px-6">
        <div className="relative min-h-dvh overflow-hidden rounded-frame">
          <VideoCover src="/media/renewable.mp4" poster="/media/solar.jpg" className="absolute inset-0 h-full w-full object-cover" />
          <div className="noise-overlay pointer-events-none absolute inset-0" />
        </div>
        <div className="px-3 py-12 lg:px-10">
          <Kicker>Sustainability</Kicker>
          <h2 className="mt-4 text-display">Progress with purpose.</h2>
          <p className="mt-6 text-cream-dim">
            Economic development and environmental responsibility have to work together. That means exploring renewable energy opportunities, supporting more efficient energy solutions, and encouraging responsible approaches to infrastructure development.
          </p>
          <p className="mt-4 text-cream-dim">
            Sustainable growth creates value beyond a single transaction. It builds solutions that can benefit businesses, communities, and the people who inherit them.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-24 lg:px-6">
        <Kicker>Commitment</Kicker>
        <h2 className="mt-4 text-display">Built on trust. Driven by opportunity.</h2>
        <p className="mt-6 text-cream-dim">
          Every relationship is a chance to create something that lasts. Whether the counterparty is a corporation, a government stakeholder, an energy supplier, an infrastructure company, an investor, or a strategic partner, IMOS conducts the work with professionalism and respect.
        </p>
        <p className="mt-4 text-cream-dim">
          Success is measured not only by the opportunities pursued, but by the relationships built and the lasting value those relationships help create.
        </p>
      </section>

      <CtaBand title="IMOS is a global company building toward the future." label="Contact IMOS" />
    </Shell>
  );
}
