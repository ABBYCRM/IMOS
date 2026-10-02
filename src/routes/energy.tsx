import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, IndexList, Kicker, PageHero, Pill, Shell, Still, VideoCover } from "@/components/site/chrome";
import { TextReveal } from "@/components/ui/text-reveal";
import { energyLines } from "@/lib/imos";

export const Route = createFileRoute("/energy")({ component: EnergyPage });

const frame = [
  ["Product", "EN590 diesel"],
  ["Basis", "CIF"],
  ["Lift", "50,000 to 500,000 metric tons"],
  ["Buyer profile", "Qualified commercial and industrial"],
  ["Posture", "Repeat, high-volume business"],
  ["What this is not", "A published price or a standing offer"],
] as const;

function EnergyPage() {
  return (
    <Shell>
      <PageHero
        kicker="Energy and fuel solutions"
        title="EN590 leads everything we supply."
        image="/media/refinery.jpg"
        alt="Refinery complex at night"
      />

      <section className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-24 lg:grid-cols-2 lg:px-6">
        <div>
          <Kicker>Lead product</Kicker>
          <h2 className="mt-4 text-display">
            <TextReveal text="EN590 diesel." />
          </h2>
          <p className="mt-6 text-cream-dim">
            EN590 is the core of the energy business and the product IMOS intends most of its revenue to come from. IMOS supports the sourcing, supply, and strategic movement of EN590 for qualified commercial and industrial buyers, backed by dependable supply relationships, regulatory awareness, and long-term partnerships built for repeat, high-volume business.
          </p>
          <p className="mt-4 text-sm text-mute">
            EN 590 is the European specification for automotive diesel. IMOS discusses supply only with qualified counterparties.
          </p>
          <div className="mt-8">
            <Pill to="/contact" interest="en590">
              Request EN590 pricing
            </Pill>
          </div>
        </div>
        <div className="rounded-frame border border-line bg-void-2 p-6 md:p-8">
          <p className="text-xs tracking-widest text-mute uppercase">Commercial outline</p>
          <h3 className="mt-3 text-title">Indicative supply frame</h3>
          <dl className="mt-8">
            {frame.map(([label, value]) => (
              <div key={label} className="grid gap-1 border-t border-line py-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-xs tracking-widest text-mute uppercase">{label}</dt>
                <dd className="sm:col-span-2">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-void-2 py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <Kicker>Focus</Kicker>
          <h2 className="mt-4 max-w-3xl text-display">IMOS operates within the global energy marketplace.</h2>
          <div className="mt-12">
            <IndexList items={energyLines} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 lg:grid-cols-2 lg:px-6">
        <div className="relative aspect-frame overflow-hidden rounded-frame bg-void-2">
          <Still src="/media/engineers.jpg" alt="Engineers reviewing a refinery at sunset" className="absolute inset-0" />
          <div className="noise-overlay pointer-events-none absolute inset-0" />
        </div>
        <div>
          <Kicker>Approach</Kicker>
          <h2 className="mt-4 text-display">Dependable supply. Responsible practice.</h2>
          <p className="mt-6 text-cream-dim">
            The standard across every energy product we move, starting with EN590: dependable supply relationships, responsible commercial practices, regulatory awareness, and long-term partnerships.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-3 pb-6 lg:grid-cols-2 lg:px-6">
        <div className="relative min-h-dvh overflow-hidden rounded-frame bg-void-2">
          <VideoCover
            src="/media/renewable.mp4"
            poster="/media/renewable.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="noise-overlay pointer-events-none absolute inset-0" />
        </div>
        <div className="px-3 py-10 lg:px-8">
          <Kicker>Renewable energy</Kicker>
          <h2 className="mt-4 text-display">Building toward a more sustainable future.</h2>
          <p className="mt-6 text-cream-dim">
            The transition toward cleaner energy is reshaping industries. IMOS identifies and supports opportunities in renewable energy and clean-energy infrastructure, including projects designed to support future economic growth.
          </p>
          <p className="mt-4 text-cream-dim">
            The energy systems of tomorrow must balance reliability, affordability, innovation, and environmental responsibility.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 lg:grid-cols-2 lg:px-6">
        <div>
          <Kicker>Also on the desk</Kicker>
          <h2 className="mt-4 text-display">Jet fuel and conventional products sit beside the lead line.</h2>
          <p className="mt-6 text-cream-dim">
            Beyond EN590, IMOS supports qualified opportunities in jet fuel, diesel products, and the infrastructure required to move energy from origin to use.
          </p>
        </div>
        <div className="relative aspect-wide overflow-hidden rounded-frame bg-void-2">
          <Still src="/media/aviation.jpg" alt="Aviation fuel infrastructure at dawn" className="absolute inset-0" />
          <div className="noise-overlay pointer-events-none absolute inset-0" />
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-3xl px-4 py-24 lg:px-6">
          <Kicker>Long-term objective</Kicker>
          <h2 className="mt-4 text-display">Expanding access to sustainable energy.</h2>
          <p className="mt-6 text-cream-dim">
            The long-term objective is to participate in projects and partnerships that help expand access to sustainable energy while strengthening the communities and economies they serve.
          </p>
        </div>
      </section>

      <CtaBand title="Ready to talk EN590 supply, or another energy product?" label="Contact IMOS" interest="en590" />
    </Shell>
  );
}
