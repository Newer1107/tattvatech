export type HeroSceneMode = "explore" | "contact" | null;

export const heroContent = {
  label: "TATTVATECH",
  heading: "Engineering ideas into useful technology.",
  headingLines: ["Engineering", "ideas", "into", "useful", "technology."],
  bodyLines: [
    "We build digital services,",
    "scalable software products,",
    "drone solutions, and industry-",
    "focused technical training.",
  ],
} as const;

export const heroActions = {
  primary: {
    label: "Explore Capabilities",
    href: "#summary",
  },
  secondary: {
    label: "Start a project",
    href: "#contact",
  },
} as const;

export const heroMenuItems = [
  { label: "Principles", href: "#businesses" },
  { label: "Services", href: "#tattvatech-services" },
  { label: "Products", href: "#tattvatech-products" },
  { label: "Training", href: "#tattvatech-training" },
  { label: "Contact", href: "#contact" },
] as const;
