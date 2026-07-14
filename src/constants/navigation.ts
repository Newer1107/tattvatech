import type { NavGroup, NavItem } from "@/types";

export const navigationItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#summary" },
  { label: "Services", href: "#services" },
  { label: "Businesses", disabled: true },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const navigationGroups: NavGroup[] = [
  {
    title: "TattvaTech Services",
    marker: "circle",
    links: [
      { label: "Services", href: "#services" },
      { label: "Projects", href: "#reviews" },
    ],
  },
  {
    title: "TattvaTech Products",
    marker: "triangle",
    links: [
      { label: "SaaS Products", disabled: true },
      { label: "Explore Products", disabled: true },
    ],
  },
  {
    title: "TattvaTech Training",
    marker: "square",
    links: [
      { label: "Industrial Preparation", disabled: true },
      { label: "Workshops", disabled: true },
      { label: "Training Programs", disabled: true },
    ],
  },
  {
    title: "TattvaTech Drones",
    marker: "diamond",
    links: [
      { label: "Drone Solutions", disabled: true },
      { label: "Explore Drones", disabled: true },
    ],
  },
];

export const navigationActions: NavItem[] = [
  { label: "Contact", href: "#contact" },
];
