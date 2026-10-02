export const interests = [
  { id: "en590", label: "EN590 diesel" },
  { id: "diesel", label: "Diesel fuel products" },
  { id: "jet", label: "Jet fuel" },
  { id: "renewable", label: "Renewable and alternative energy" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "relations", label: "Government and corporate relations" },
  { id: "other", label: "Another matter" },
] as const;

export type InterestId = (typeof interests)[number]["id"];

export const lifts = [
  "Not applicable",
  "Under 50,000 MT",
  "50,000 – 100,000 MT",
  "100,000 – 250,000 MT",
  "250,000 – 500,000 MT",
  "Above 500,000 MT",
] as const;

export const nav = [
  { to: "/", label: "Home" },
  { to: "/energy", label: "Energy" },
  { to: "/infrastructure", label: "Infrastructure" },
  { to: "/relations", label: "Relations" },
  { to: "/about", label: "Approach" },
] as const;

export const pillars = [
  { index: "01", kicker: "Lead product", title: "EN590 diesel supply", href: "/energy" },
  { index: "02", kicker: "Energy", title: "Jet fuel and diesel", href: "/energy" },
  { index: "03", kicker: "Infrastructure", title: "Bridges and highways", href: "/infrastructure" },
  { index: "04", kicker: "Relations", title: "Government and corporate", href: "/relations" },
] as const;

export const energyLines = [
  {
    title: "EN590 diesel",
    body: "The leading product line — sourcing, supply, and strategic movement for qualified commercial and industrial customers.",
  },
  {
    title: "Diesel fuel products",
    body: "Supporting commercial opportunities involving diesel and other petroleum-based products.",
  },
  {
    title: "Jet fuel",
    body: "Supporting qualified opportunities involving jet fuel and aviation energy supply.",
  },
  {
    title: "Conventional energy",
    body: "Sourcing and supply relationships across established petroleum-based energy products.",
  },
  {
    title: "Renewable and alternative energy",
    body: "Identifying and supporting opportunities in renewable and clean-energy solutions.",
  },
  {
    title: "Energy infrastructure",
    body: "Supporting the infrastructure required to produce, transport, store, and distribute energy.",
  },
] as const;

export const infraLines = [
  {
    title: "Bridges",
    body: "Supporting the development and construction of critical bridge infrastructure.",
  },
  {
    title: "Highways",
    body: "Participating in transportation projects designed to improve mobility and connectivity.",
  },
  {
    title: "Infrastructure development",
    body: "Connecting qualified project partners, resources, and opportunities to support large-scale development.",
  },
  {
    title: "Project partnerships",
    body: "Collaborating with contractors, engineering firms, developers, and government entities on strategic construction opportunities.",
  },
] as const;

export const principles = [
  {
    title: "Integrity",
    body: "We conduct business with professionalism, transparency, and accountability.",
  },
  {
    title: "Relationships",
    body: "Strong, long-term relationships are fundamental to sustainable business growth.",
  },
  {
    title: "Innovation",
    body: "We remain open to new technologies, emerging energy solutions, and evolving approaches to infrastructure.",
  },
  {
    title: "Execution",
    body: "Ideas create value only when they are executed. We turn opportunities into practical outcomes.",
  },
] as const;

export const ticker = [
  "EN590",
  "Jet fuel",
  "Diesel",
  "Renewables",
  "Bridges",
  "Highways",
  "Government relations",
  "Corporate partnerships",
] as const;

export function isInterest(value: string): value is InterestId {
  return interests.some((item) => item.id === value);
}
