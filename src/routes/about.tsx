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

      <section className="mx-auto max-w-3xl px-6 py-24">
        <p className="font-serif text-2xl leading-snug text-navy md:text-3xl">
          Meaningful growth is built through collaboration.
        </p>
        <p className="mt-6 text-ink/80">
          At IMOS, we bring together resources, relationships, industry knowledge, and strategic opportunities to support projects across energy, fuels, renewable energy, and infrastructure.
        </p>
      </section>

      <section className="border-y border-line">
        <div className="mx-auto grid max-w-6xl md:grid-cols-2 lg:grid-cols-4">
          {principles.map((item, i) => (
            <article key={item.title} className="border-b border-line px-6 py-10 md:border-r md:border-b-0 last:border-b-0 lg:last:border-r-0">
              <p className="text-xs tracking-widest text-copper">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-8 font-serif text-3xl text-navy">{item.title}</h2>
              <p className="mt-3 text-sm text-ink/80">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
        <div className="relative aspect-frame overflow-hidden bg-navy">
          <Still src="/media/engineers.jpg" alt="Engineers on a refinery catwalk at sunset" className="absolute inset-0" />
        </div>
        <div>
          <Kicker>Building for the future</Kicker>
          <h2 className="mt-4 font-serif text-4xl text-navy md:text-5xl">Energy. Infrastructure. Opportunity.</h2>
          <p className="mt-6 text-ink/80">
            Energy systems are evolving. Infrastructure needs are growing. Businesses and governments are seeking partnerships for increasingly complex challenges.
          </p>
          <p className="mt-4 text-ink/80">
            IMOS intends to be part of that transformation. We don’t simply look at where the market is today — we look at where it is going next.
          </p>
        </div>
      </section>

      <section className="grid bg-navy text-paper lg:grid-cols-2">
        <div className="relative min-h-screen overflow-hidden">
          <VideoCover src="/media/renewable.mp4" poster="/media/solar.jpg" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center px-6 py-20 lg:px-16">
          <Kicker tone="sand">Sustainability</Kicker>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">Progress with purpose.</h2>
          <p className="mt-6 text-sand">
            Economic development and environmental responsibility have to work together. That means exploring renewable energy opportunities, supporting more efficient energy solutions, and encouraging responsible approaches to infrastructure development.
          </p>
          <p className="mt-4 text-sand">
            Sustainable growth creates value beyond a single transaction. It builds solutions that can benefit businesses, communities, and the people who inherit them.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24">
        <Kicker>Our commitment</Kicker>
        <h2 className="mt-4 font-serif text-4xl text-navy md:text-5xl">Built on trust. Driven by opportunity.</h2>
        <p className="mt-6 text-ink/80">
          Every relationship is a chance to create something that lasts. Whether the counterparty is a corporation, a government stakeholder, an energy supplier, an infrastructure company, an investor, or a strategic partner, IMOS conducts the work with professionalism and respect.
        </p>
        <p className="mt-4 text-ink/80">
          Success is measured not only by the opportunities pursued, but by the relationships built and the lasting value those relationships help create.
        </p>
      </section>

      <CtaBand title="IMOS is a global company building toward the future." to="/contact" label="Contact IMOS" />
    </Shell>
  );
}
