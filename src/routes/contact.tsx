import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Kicker, PillButton, Shell } from "@/components/site/chrome";
import { interests, isInterest, lifts, type InterestId } from "@/lib/imos";

type Search = { interest: InterestId | "" };

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const raw = typeof search.interest === "string" ? search.interest : "";
    return { interest: isInterest(raw) ? raw : "" };
  },
  component: ContactPage,
});

type Fields = {
  name: string;
  organization: string;
  role: string;
  email: string;
  phone: string;
  interest: InterestId | "";
  lift: string;
  message: string;
  qualified: boolean;
};

type Errors = Partial<Record<keyof Fields, string>>;

const empty = (interest: InterestId | ""): Fields => ({
  name: "",
  organization: "",
  role: "",
  email: "",
  phone: "",
  interest,
  lift: interest === "en590" || interest === "diesel" || interest === "jet" ? "50,000 – 100,000 MT" : "Not applicable",
  message: "",
  qualified: false,
});

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (fields.name.trim().length < 2) errors.name = "Enter the name of the person responsible.";
  if (fields.organization.trim().length < 2) errors.organization = "Enter the organization.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errors.email = "Enter a working email.";
  if (!fields.interest) errors.interest = "Choose what this inquiry concerns.";
  if (fields.message.trim().length < 24) errors.message = "Give enough context for a serious reply — at least a few sentences.";
  if (!fields.qualified) errors.qualified = "Confirm you represent a qualified counterparty.";
  return errors;
}

function briefText(fields: Fields, reference: string) {
  const interest = interests.find((item) => item.id === fields.interest)?.label ?? fields.interest;
  return [
    "IMOS COMMERCIAL INQUIRY",
    `Reference: ${reference}`,
    `Name: ${fields.name.trim()}`,
    `Organization: ${fields.organization.trim()}`,
    `Role: ${fields.role.trim() || "—"}`,
    `Email: ${fields.email.trim()}`,
    `Phone: ${fields.phone.trim() || "—"}`,
    `Interest: ${interest}`,
    `Indicative lift: ${fields.lift}`,
    "",
    fields.message.trim(),
    "",
    "Counterparty confirmation: qualified commercial, industrial, or institutional.",
  ].join("\n");
}

function ContactPage() {
  const search = Route.useSearch();
  const initial = useMemo(() => empty(search.interest), [search.interest]);
  const [fields, setFields] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [reference, setReference] = useState("");
  const [copied, setCopied] = useState(false);

  function set<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next = validate(fields);
    setErrors(next);
    if (Object.keys(next).length) return;
    const year = new Date().getFullYear();
    const token = crypto.getRandomValues(new Uint32Array(1))[0].toString(16).slice(0, 4).toUpperCase();
    const ref = `IMOS-${year}-${token}`;
    setReference(ref);
    setCopied(false);
    try {
      localStorage.setItem("imos.inquiry", JSON.stringify({ ref, fields }));
    } catch {
      /* private mode */
    }
  }

  const brief = reference ? briefText(fields, reference) : "";

  return (
    <Shell>
      <section className="px-3 pt-24 md:px-6 md:pt-28">
        <div className="mx-auto grid max-w-6xl gap-12 py-10 lg:grid-cols-12 lg:py-16">
          <div className="lg:col-span-5">
            <Kicker>Commercial desk</Kicker>
            <h1 className="mt-4 text-display">Start a conversation.</h1>
            <p className="mt-6 text-cream-dim">
              EN590 and fuel supply, infrastructure partnerships, and government or corporate introductions. Tell us who you are and what you need considered. Pricing is not published here.
            </p>
            <dl className="mt-10 border-t border-line text-sm">
              {[
                ["Lead product", "EN590 diesel, CIF"],
                ["Lift frame", "50,000 – 500,000 MT"],
                ["Also", "Jet fuel, diesel, renewables, infrastructure, relations"],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-2 gap-4 border-b border-line py-4">
                  <dt className="tracking-widest text-mute uppercase">{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-frame bg-void-2 p-6 md:p-10 lg:col-span-7">
            {reference ? (
              <div>
                <Kicker>Inquiry brief</Kicker>
                <h2 className="mt-3 text-title">Prepared for the desk.</h2>
                <p className="mt-3 text-sm text-cream-dim">
                  Reference <span className="font-medium text-cream">{reference}</span>. Copy the brief and send it to your IMOS contact. This page does not transmit mail on its own.
                </p>
                <pre className="mt-6 max-h-80 overflow-auto rounded-nav border border-line bg-void p-4 font-sans text-sm leading-relaxed whitespace-pre-wrap text-cream">
                  {brief}
                </pre>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <PillButton
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(brief);
                        setCopied(true);
                      } catch {
                        setCopied(false);
                      }
                    }}
                  >
                    {copied ? "Copied" : "Copy brief"}
                  </PillButton>
                  <button
                    type="button"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-line px-5 text-sm text-cream"
                    onClick={() => {
                      setReference("");
                      setFields(empty(search.interest));
                      setErrors({});
                    }}
                  >
                    Prepare another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <Kicker>Inquiry</Kicker>
                <h2 className="mt-3 text-title">Tell us what to consider.</h2>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <Field label="Name" error={errors.name}>
                    <input value={fields.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" className={inputClass} />
                  </Field>
                  <Field label="Organization" error={errors.organization}>
                    <input value={fields.organization} onChange={(e) => set("organization", e.target.value)} autoComplete="organization" className={inputClass} />
                  </Field>
                  <Field label="Role" error={errors.role}>
                    <input value={fields.role} onChange={(e) => set("role", e.target.value)} autoComplete="organization-title" className={inputClass} />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input type="email" value={fields.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" className={inputClass} />
                  </Field>
                  <Field label="Phone" error={errors.phone}>
                    <input value={fields.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" className={inputClass} />
                  </Field>
                  <Field label="Interest" error={errors.interest}>
                    <select
                      value={fields.interest}
                      onChange={(e) => set("interest", e.target.value as InterestId | "")}
                      className={inputClass}
                    >
                      <option value="">Select</option>
                      {interests.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Indicative lift" error={undefined} className="sm:col-span-2">
                    <select value={fields.lift} onChange={(e) => set("lift", e.target.value)} className={inputClass}>
                      {lifts.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Context" error={errors.message} className="sm:col-span-2">
                    <textarea
                      value={fields.message}
                      onChange={(e) => set("message", e.target.value)}
                      rows={5}
                      className={`${inputClass} resize-y`}
                    />
                  </Field>
                </div>
                <label className="mt-6 flex items-start gap-3 text-sm text-cream-dim">
                  <input
                    type="checkbox"
                    checked={fields.qualified}
                    onChange={(e) => set("qualified", e.target.checked)}
                    className="mt-1 size-4 accent-cream"
                  />
                  <span>I represent a qualified commercial, industrial, or institutional counterparty.</span>
                </label>
                {errors.qualified ? <p className="mt-2 text-sm text-cream">{errors.qualified}</p> : null}
                <div className="mt-8">
                  <PillButton type="submit">Prepare inquiry brief</PillButton>
                </div>
                <p className="mt-4 text-xs text-mute">
                  The brief stays with you until you send it. Nothing on this page is an offer to sell product.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </Shell>
  );
}

const inputClass =
  "w-full border-b border-line bg-transparent py-3 text-cream outline-none transition-colors focus:border-cream";

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="text-xs tracking-widest text-mute uppercase">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm text-cream">{error}</span> : null}
    </label>
  );
}
