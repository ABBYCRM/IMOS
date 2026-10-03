// SEO and AI-search configuration for the IMOS static release.
// Page titles and descriptions match the ones the client bundle sets at runtime.

export const SITE_NAME = 'IMOS';
export const DEFAULT_SITE_URL = 'https://imos-2mi89.ondigitalocean.app';
export const LAST_MODIFIED = '2026-10-02';
export const OG_IMAGE = '/media/og-image.jpg';
export const LOGO = '/media/imos-logo.png';
export const ORG_DESCRIPTION =
  'IMOS connects qualified commercial energy buyers and strategic partners with EN590 diesel sourcing, infrastructure opportunities and government and corporate relationships.';

export const pages = [
  {
    path: '/',
    name: 'Home',
    type: 'WebPage',
    priority: '1.0',
    title: 'IMOS | Connecting opportunity with execution',
    description:
      'IMOS connects qualified commercial energy buyers and strategic partners with EN590 diesel sourcing, infrastructure opportunities and government and corporate relationships.',
  },
  {
    path: '/energy',
    name: 'Energy and EN590 Diesel',
    type: 'WebPage',
    priority: '0.9',
    title: 'Energy and EN590 Diesel | IMOS',
    description:
      'EN590 10PPM ULSD from Azerbaijan, CIF any safe port, for contract-ready buyers. Read the full buyer procedure, compliance requirements and CIF steps. Plus jet fuel and renewable energy.',
  },
  {
    path: '/infrastructure',
    name: 'Infrastructure',
    type: 'WebPage',
    priority: '0.8',
    title: 'Infrastructure | IMOS',
    description:
      'IMOS explores bridges, highways, transportation and development opportunities, collaborating with qualified contractors, engineers, developers and governments.',
  },
  {
    path: '/relations',
    name: 'Relations',
    type: 'WebPage',
    priority: '0.8',
    title: 'Relations | IMOS',
    description:
      'IMOS facilitates relationships between corporations, governments, institutions, investors and contractors through professionalism, transparency and strategic communication.',
  },
  {
    path: '/about',
    name: 'About',
    type: 'AboutPage',
    priority: '0.7',
    title: 'About IMOS | Integrity, relationships, innovation, execution',
    description:
      'IMOS is guided by integrity, relationships, innovation and execution, pursuing responsible, sustainable, long-term growth in energy and infrastructure.',
  },
  {
    path: '/contact',
    name: 'Contact',
    type: 'ContactPage',
    priority: '0.7',
    title: 'Contact IMOS | Prepare an inquiry',
    description:
      'Prepare a commercial inquiry brief for EN590 diesel or a general IMOS inquiry. Validate, copy or download your brief; EN590 briefs can open a prepared email in your own mail application.',
  },
];

export const notFoundPage = {
  path: null,
  title: 'Page not found | IMOS',
  description: 'The page you requested could not be found. Visit the IMOS home page for energy, infrastructure and relations.',
};
