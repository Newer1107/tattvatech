export type HeroSceneMode = "explore" | "contact" | null;

export const heroContent = {
  label: "TATTVATECH",
  heading: "Engineering ideas into useful technology.",
  headingLines: ["Engineering ideas", "into useful", "technology."],
  body:
    "We build digital services, scalable software products, drone solutions, and industry-focused technical training.",
  supportingLabel: "Engineered across four connected verticals",
  supportingValue: "04",
  supportingNote:
    "Digital services, products, field systems, and training shaped as one connected offering.",
} as const;

export const heroActions = {
  primary: {
    label: "Explore Capabilities",
    href: "#summary",
  },
  secondary: {
    label: "Start a Project",
    href: "#contact",
  },
} as const;

export const heroMenuItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#summary" },
  { label: "Principles", href: "#businesses" },
  { label: "Services", href: "#tattvatech-services" },
  { label: "Products", href: "#tattvatech-products" },
  { label: "Drones", href: "#tattvatech-drones" },
  { label: "Training", href: "#tattvatech-training" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroVerticals = [
  {
    id: "services",
    number: "01",
    label: "Services",
    description: "Applied software, AI, cloud, analytics, and interface delivery.",
    anchor: "#tattvatech-services",
    badge: "Build",
    metric: "Software + AI",
    sceneTint: "#F55A0A",
    desktopMarkerClassName: "left-[9%] top-[12%]",
  },
  {
    id: "products",
    number: "02",
    label: "Products",
    description: "Reusable platforms shaped from repeatable business problems.",
    anchor: "#tattvatech-products",
    badge: "Scale",
    metric: "Reusable systems",
    sceneTint: "#FF9B26",
    desktopMarkerClassName: "right-[8%] top-[20%]",
  },
  {
    id: "drones",
    number: "03",
    label: "Drones",
    description: "Drone research, applied solutions, consulting, and operations.",
    anchor: "#tattvatech-drones",
    badge: "Apply",
    metric: "Physical systems",
    sceneTint: "#FFB347",
    desktopMarkerClassName: "left-[12%] bottom-[18%]",
  },
  {
    id: "training",
    number: "04",
    label: "Training",
    description: "Technical training designed for institutions, teams, and learners.",
    anchor: "#tattvatech-training",
    badge: "Evolve",
    metric: "Industry training",
    sceneTint: "#FFD27A",
    desktopMarkerClassName: "right-[7%] bottom-[12%]",
  },
] as const;
