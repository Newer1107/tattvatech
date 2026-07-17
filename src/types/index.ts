export type NavItem = {
  label: string;
  href?: string;
  disabled?: boolean;
};

export type NavGroup = {
  title: string;
  marker: "circle" | "triangle" | "square" | "diamond";
  links: NavItem[];
};

export type Vertical = {
  name: string;
  description: string;
  emphasis: "primary" | "secondary";
};

export type BusinessVerticalTheme = "warm" | "dark" | "orange" | "amber";

export interface BusinessVertical {
  id: string;
  number: string;
  titleTop: string;
  titleBottom: string;
  description: string;
  capabilities: string[];
  anchor: string;
  linkLabel: string;
  image?: string;
  imageAlt?: string;
  theme: BusinessVerticalTheme;
}

export interface BusinessPrinciple {
  title: string;
  description: string;
}

export interface EditorialPrinciple {
  word: string;
  tone: "primary" | "secondary" | "accent" | "inverse";
  desktopClassName: string;
  mobileClassName?: string;
  markerClassName?: string;
  lineClassName?: string;
  relatedIndexes?: number[];
}

export type Service = {
  title: string;
  description: string;
  deliverables?: string[];
  technologies?: string[];
};

export type Review = {
  title: string;
  description: string;
};

export type Achievement = {
  title: string;
  description: string;
};
