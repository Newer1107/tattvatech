export const PUBLIC_EMAIL = "business@tattvatech.co.in";
export const PUBLIC_EMAIL_MAILTO = `mailto:${PUBLIC_EMAIL}`;
export const LINKEDIN_URL = "https://www.linkedin.com/company/tattvatechbharat/posts/?feedView=all";

export type VerticalKey = "Services" | "Products" | "Drones" | "Training";

export type VerticalRoute = {
  title: VerticalKey;
  href: "/services" | "/products" | "/drones" | "/training";
  description: string;
  tags: string[];
  feedsInto: VerticalKey;
  feedsHref: "/services" | "/products" | "/drones" | "/training";
};

export type FooterLink = {
  label: string;
  href: string;
  className?: string;
  external?: boolean;
};

export type FooterColumn = {
  heading: string;
  links: FooterLink[];
};

export const verticalRoutes: VerticalRoute[] = [
  {
    title: "Services",
    href: "/services",
    description:
      "Custom software, AI systems, cloud infrastructure, and design delivered as long-term engineering partnerships.",
    tags: ["Web", "Mobile", "AI", "Cloud"],
    feedsInto: "Services",
    feedsHref: "/services",
  },
  {
    title: "Products",
    href: "/products",
    description:
      "Scalable software products built from recurring, real-world problems discovered during service delivery.",
    tags: ["SaaS", "Tools", "Platforms"],
    feedsInto: "Products",
    feedsHref: "/products",
  },
  {
    title: "Drones",
    href: "/drones",
    description:
      "Research, industrial applications, aerial systems, consulting, and training across the drone stack.",
    tags: ["Aerial", "Telemetry", "Industry"],
    feedsInto: "Drones",
    feedsHref: "/drones",
  },
  {
    title: "Training",
    href: "/training",
    description:
      "College programs, workshops, faculty development, student upskilling, and corporate training.",
    tags: ["Colleges", "Workshops", "Corporate"],
    feedsInto: "Training",
    feedsHref: "/training",
  },
];

export const footerColumns: FooterColumn[] = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/#about" },
      { label: "Ecosystem", href: "/#ecosystem" },
      { label: "Principles", href: "/#process" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Web", href: "/services" },
      { label: "Software", href: "/services" },
      { label: "Mobile", href: "/services" },
      { label: "AI & Automation", href: "/services" },
      { label: "Cloud & DevOps", href: "/services" },
    ],
  },
  {
    heading: "Verticals",
    links: [
      { label: "Products", href: "/products" },
      { label: "Drones", href: "/drones" },
      { label: "Training", href: "/training" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: PUBLIC_EMAIL, href: PUBLIC_EMAIL_MAILTO, className: "contact-email" },
      { label: "LinkedIn", href: LINKEDIN_URL, external: true },
      { label: "X / Twitter", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
] as const;

export const pageSummaries = {
  services: {
    eyebrow: "Services",
    title: "Engineering as a long-term practice.",
    description:
      "Custom systems, AI, mobile, cloud, and product engineering delivered with the same calm rigor that drives the main TattvaTech ecosystem.",
    highlights: [
      "Custom software designed for clarity and scale.",
      "AI and automation grounded in operational reality.",
      "Design and delivery that stay maintainable over time.",
    ],
  },
  products: {
    eyebrow: "Products",
    title: "Products born from real work.",
    description:
      "We turn recurring problems into product-grade software with the pragmatism of a services team and the discipline of a product company.",
    highlights: [
      "Recurring field problems distilled into product opportunities.",
      "Reusable systems that compound internal IP.",
      "Shipping discipline tuned for product longevity.",
    ],
  },
  drones: {
    eyebrow: "Drones",
    title: "Aerial systems, grounded engineering.",
    description:
      "Research, industrial deployment, consulting, and training across the drone stack for teams that need systems which operate reliably in the field.",
    highlights: [
      "Applied research across flight, sensing, and autonomy.",
      "Industrial aerial systems built for real environments.",
      "Operational consulting and training around the full stack.",
    ],
  },
  training: {
    eyebrow: "Training",
    title: "Knowledge that travels.",
    description:
      "Programs, workshops, faculty development, and corporate learning designed by practitioners who teach what they actually build.",
    highlights: [
      "College and cohort programs shaped by current engineering work.",
      "Workshops and faculty development for practical capability growth.",
      "Corporate upskilling for software, AI, and drone teams.",
    ],
  },
} as const;
