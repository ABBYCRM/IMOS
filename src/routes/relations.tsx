import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, Kicker, PageHero, Shell, Still } from "@/components/site/chrome";

export const Route = createFileRoute("/relations")({ component: RelationsPage });

const steps = [
  {
    title: "Listen",
    body: "Understand the commercial objective, the institutional setting, and who must be in the room.",
  },
  {
    title: "Introduce",
    body: "Facilitate relationships among corporations, government stakeholders, investors, contractors, and institutional partners.",
  },
  {
    title: "Coordinate",
    body: "Keep communication precise so qualified organizations can evaluate an opportunity without noise.",
  },
  {
    title: "Stay",
    body: "Treat the relationship as the asset. A single introduction is not a practice.",
  },
];

function RelationsPage() {
  return (
    <Shell>
      <PageHero
        kicker="Government and corporate relations"
        title="Connecting business with opportunity."
        image="/media/chamber.jpg"
        alt="Assembly chamber in quiet daylight"
      />

      <section className="mx-auto max-w-3xl px-4 py-24 lg:px-6">
        <p className="text-title leading-snug">Successful projects often depend on more than capital and resources.</p>
        <p className="mt-6 text-cream-dim">
          They require strong relationships, effective communication, strategic coordination, and an understanding of the environments in which organizations operate.
        </p>
        <p className="mt-4 text-cream-dim">
          IMOS works to develop and facilitate relationships among corporations, government stakeholders, institutional partners, investors, contractors, and other qualified organizations.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-8 lg:grid-cols-2 lg:px-6">
        <div className="relative aspect-wide overflow-hidden rounded-frame">
          <Still src="/media/chamber.jpg" alt="Institutional chamber" className="absolute inset-0" />
          <div className="noise-overlay pointer-events-none absolute inset-0" />
        </div>
        <div>
          <Kicker>Approach</Kicker>
          <h2 className="mt-4 text-display">Professionalism. Transparency. Strategic communication.</h2>
          <p className="mt-6 text-cream-dim">
            We help organizations identify opportunities, establish productive partnerships, and navigate complex commercial and institutional environments. The work is relationship development — conducted in the open, with the people who are actually accountable.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24 lg:px-6">
        <Kicker>How a relationship moves</Kicker>
        <div className="mt-10 grid gap-10 border-t border-line pt-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <article key={step.title}>
              <p className="text-xs tracking-widest text-mute">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-title">{step.title}</h3>
              <p className="mt-3 text-sm text-cream-dim">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBand title="Looking to establish a strategic partnership with IMOS?" label="Contact IMOS" interest="relations" />
    </Shell>
  );
}
