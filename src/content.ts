export type ProjectItem = {
  name: string
  description: string
  url: string
}

export type BakeEntry = {
  number: string
  title: string
  hydration: string
  flour: string
  ferment: string
  notes: string
}

export type PhotoCard = {
  src: string
  caption: string
  alt: string
  ar: string
  rot: number
}

export const PROFILE = {
  name: 'Harri',
  handle: 'harrymove-ctrl',
  greeting: "Hi, I'm Harri.",
  intro: 'I build AI tools, native apps, and developer infrastructure.',
  rolePrefix: "By day I'm a software engineer at ",
  orgName: 'CommandOSS',
  orgUrl: 'https://github.com/CommandOSSLabs',
  breadTitle: 'I bake a lot of bread and write it all down',
  breadBody:
    'When a loaf comes out with an open crumb and crisp blistered crust, I log the hydration, flour blend, and fermentation notes right beside my engineering journals.',
  githubUrl: 'https://github.com/harrymove-ctrl',
  githubReposUrl: 'https://github.com/harrymove-ctrl?tab=repositories',
  email: 'mailto:harry.phan@commandoss.com',
  repoCountNote: 'Plus 40+ more experiments and tools on GitHub.',
} as const

export const PROJECTS: ProjectItem[] = [
  {
    name: 'Telegram CLI',
    description:
      'A small CLI that lets AI agents use a personal Telegram account.',
    url: 'https://github.com/harrymove-ctrl/telegram-cli',
  },
  {
    name: 'Raea',
    description:
      'Render Anything Engine: videos, motion graphics, 3D, and games on your own GPU.',
    url: 'https://github.com/harrymove-ctrl/raea',
  },
  {
    name: 'Ghostex',
    description:
      'Native Rust and GPUI workspace built for 20+ coding agents and Ghostty.',
    url: 'https://github.com/harrymove-ctrl/Ghostex',
  },
  {
    name: 'AGY Profiles',
    description:
      'Clean-room multi-profile sandbox manager and MCP server for Antigravity.',
    url: 'https://github.com/harrymove-ctrl/agy-profiles',
  },
  {
    name: 'Discord Radar',
    description:
      'Local Discord channel archiver, SQLite FTS5 search CLI, and signal extractor.',
    url: 'https://github.com/harrymove-ctrl/discord-radar',
  },
  {
    name: 'AGY Tele',
    description:
      'Two-way Telegram and Antigravity Desktop sync daemon with local SQLite search.',
    url: 'https://github.com/harrymove-ctrl/agy-tele',
  },
  {
    name: 'Condomdom',
    description:
      'Personal ASCII-drawn library of UI components, videos, and agent skills.',
    url: 'https://github.com/harrymove-ctrl/condomdom',
  },
]

export const BAKE_LOGS: BakeEntry[] = [
  {
    number: 'Bake #042',
    title: 'Country Tartine Boule',
    hydration: '78% hydration',
    flour: '85% bread flour, 15% stoneground whole wheat',
    ferment: '4.5h bulk at 25C + 14h cold proof at 4C',
    notes:
      'Three coil folds spaced 35 mins apart built clean tension without tearing. Baked in cast iron at 250C covered for 20 mins, then 22 mins uncovered.',
  },
  {
    number: 'Bake #039',
    title: 'Toasted Sesame Honey Loaf',
    hydration: '75% hydration',
    flour: '90% strong white, 10% dark rye, 3% raw honey',
    ferment: '4h bulk + 12h cold retard',
    notes:
      'Folded toasted black and white sesame seeds into the second lamination. Sweet malt aroma and pillowy crumb with zero gummy streaks.',
  },
  {
    number: 'Bake #034',
    title: 'Weekend Table Batard',
    hydration: '80% hydration',
    flour: '80% bread flour, 12% spelt, 8% whole rye',
    ferment: '5h bulk at 24C + 16h cold proof',
    notes:
      'Higher spelt softened the extensibility nicely. Scored shallow at 30 degrees for a single clean ear and deep mahogany crust.',
  },
  {
    number: 'Bake #028',
    title: 'Overnight Olive Oil Focaccia',
    hydration: '84% hydration',
    flour: '100% high-protein white bread flour',
    ferment: '18h cold bulk + 3h pan proof',
    notes:
      'Generous cold-pressed olive oil and flaky sea salt. Crisp lacy bottom crust with tall, airy pockets throughout the center slab.',
  },
]

export const PHOTO_CARDS: PhotoCard[] = [
  {
    src: '/cards/card-01.svg',
    caption: 'Bake Log #042: Country Sourdough at 78% hydration',
    alt: 'Editorial risograph print of a scored country sourdough loaf and hydration badge',
    ar: '4 / 5',
    rot: -3.2,
  },
  {
    src: '/cards/card-02.svg',
    caption: 'Raea Studio + GPUI: Native Rust video workbench at CommandOSS',
    alt: 'Blueprint print showing Raea Studio GPUI workbench and cargo check badge',
    ar: '1000 / 760',
    rot: 2.6,
  },
  {
    src: '/cards/card-03.svg',
    caption: 'Field Notes: Scoring dough and writing clean logs at 24.5C',
    alt: 'Cobalt-and-cream notebook sketch celebrating bread baking and field logging',
    ar: '4 / 5',
    rot: -1.8,
  },
  {
    src: '/cards/card-04.svg',
    caption: 'Telegram CLI: Reading, searching, and drafting for AI agents',
    alt: 'Diagram card showing Telegram CLI, incur, and SQLite command flow',
    ar: '1000 / 760',
    rot: 3.4,
  },
  {
    src: '/cards/card-05.svg',
    caption: 'Morning Ritual: 06:00 ICT pour-over and orchestrator check-in',
    alt: 'Minimal cobalt mug sketch representing morning engineering and bake routines',
    ar: '4 / 5',
    rot: -2.4,
  },
  {
    src: '/cards/card-06.svg',
    caption: 'CommandOSS Labs: Rust, TypeScript, and local-first tools',
    alt: 'Bento grid print highlighting ZRoute, Ghostex, MemWal, and CommandOSS Labs',
    ar: '1000 / 760',
    rot: 1.9,
  },
]
