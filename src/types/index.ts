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
