import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, IndexList, Kicker, PageHero, Shell, Still, TextLink, VideoCover } from "@/components/site/chrome";
import { energyLines } from "@/lib/imos";

export const Route = createFileRoute("/energy")({ component: EnergyPage });

function EnergyPage() {
  return (
    <Shell>
      <PageHero
        kicker="Energy and fuel solutions"
        title="EN590 leads everything we supply."
        image="/media/refinery.jpg"
        alt="Refinery complex at night"
      />

      <section className="mx-auto grid max-w-6xl items-start gap-12 px-6 py-24 lg:grid-cols-2">
        <div>
          <Kicker>Our lead product</Kicker>
          <h2 className="mt-4 font-serif text-5xl text-navy">EN590 diesel</h2>
          <p className="mt-6 text-ink/80">
            EN590 is the core of the energy business and the product IMOS intends most of its revenue to come from. IMOS supports the sourcing, supply, and strategic movement of EN590 for qualified commercial and industrial buyers, backed by dependable supply relationships, regulatory awareness, and long-term partnerships built for repeat, high-volume business.
          </p>
          <p className="mt-4 text-sm text-steel">
            EN 590 is the European specification for automotive diesel. IMOS discusses supply only with qualified counterparties.
          </p>
          <div className="mt-8">
            <TextLink to="/contact">Request EN590 pricing</TextLink>
          </div>
        </div>
        <div className="border border-line bg-paper-2 p-6 md:p-8">
          <p className="text-xs tracking-widest text-copper uppercase">Commercial outline</p>
          <h3 className="mt-3 font-serif text-3xl text-navy">Indicative supply frame</h3>
          <dl className="mt-8">
            {[
              ["Product", "EN590 diesel"],
              ["Basis", "CIF"],
              ["Lift", "50,000 to 500,000 metric tons"],
              ["Buyer profile", "Qualified commercial and industrial"],
              ["Posture", "Repeat, high-volume business"],
              ["What this is not", "A published price or a standing offer"],
            ].map(([label, value]) => (
              <div key={label} className="grid gap-1 border-t border-line py-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-xs tracking-widest text-steel uppercase">{label}</dt>
                <dd className="text-navy sm:col-span-2">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-navy py-24 text-paper">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker tone="sand">Our focus</Kicker>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl md:text-5xl">IMOS operates within the global energy marketplace.</h2>
          <div className="mt-12">
            <IndexList items={energyLines} tone="navy" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
        <div className="relative aspect-frame overflow-hidden bg-navy">
          <Still src="/media/engineers.jpg" alt="Engineers reviewing a refinery at sunset" className="absolute inset-0" />
        </div>
        <div>
          <Kicker>Our approach</Kicker>
          <h2 className="mt-4 font-serif text-4xl text-navy md:text-5xl">Dependable supply. Responsible practice.</h2>
          <p className="mt-6 text-ink/80">
            The standard across every energy product we move, starting with EN590: dependable supply relationships, responsible commercial practices, regulatory awareness, and long-term partnerships.
          </p>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[70vh] overflow-hidden bg-navy">
          <VideoCover
            src="/media/renewable.mp4"
            poster="/media/renewable.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center bg-navy-2 px-6 py-20 text-paper lg:px-16">
          <Kicker tone="sand">Renewable energy</Kicker>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">Building toward a more sustainable future.</h2>
          <p className="mt-6 text-sand">
            The transition toward cleaner energy is reshaping industries. IMOS identifies and supports opportunities in renewable energy and clean-energy infrastructure, including projects designed to support future economic growth.
          </p>
          <p className="mt-4 text-sand">
            The energy systems of tomorrow must balance reliability, affordability, innovation, and environmental responsibility.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
        <div>
          <Kicker>Also on the desk</Kicker>
          <h2 className="mt-4 font-serif text-4xl text-navy">Jet fuel and conventional products sit beside the lead line.</h2>
          <p className="mt-6 text-ink/80">
            Beyond EN590, IMOS supports qualified opportunities in jet fuel, diesel products, and the infrastructure required to move energy from origin to use.
          </p>
        </div>
        <div className="relative aspect-wide overflow-hidden bg-navy">
          <Still src="/media/aviation.jpg" alt="Aviation fuel infrastructure at dawn" className="absolute inset-0" />
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <Kicker>Long-term objective</Kicker>
          <h2 className="mt-4 font-serif text-4xl text-navy md:text-5xl">Expanding access to sustainable energy.</h2>
          <p className="mt-6 text-ink/80">
            The long-term objective is to participate in projects and partnerships that help expand access to sustainable energy while strengthening the communities and economies they serve.
          </p>
        </div>
      </section>

      <CtaBand title="Ready to talk EN590 supply, or another energy product?" to="/contact" label="Contact IMOS" />
    </Shell>
  );
}
