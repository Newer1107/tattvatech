import type { NavGroup, NavItem } from "@/types";

export const navigationItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#summary" },
  { label: "Verticals", href: "#businesses" },
  { label: "References", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export const navigationGroups: NavGroup[] = [
  {
    title: "TattvaTech Services",
    marker: "circle",
    links: [
      { label: "Services", href: "#tattvatech-services" },
      { label: "Delivery approach", href: "#summary" },
    ],
  },
  {
    title: "TattvaTech Products",
    marker: "triangle",
    links: [
      { label: "SaaS Products", href: "#tattvatech-products" },
      { label: "Product direction", href: "#summary" },
    ],
  },
  {
    title: "TattvaTech Training",
    marker: "square",
    links: [
      { label: "Industrial Preparation", href: "#tattvatech-training" },
      { label: "Workshops", href: "#tattvatech-training" },
      { label: "Training Programs", href: "#tattvatech-training" },
    ],
  },
  {
    title: "TattvaTech Drones",
    marker: "diamond",
    links: [
      { label: "Drone Solutions", href: "#tattvatech-drones" },
      { label: "Field capability", href: "#summary" },
    ],
  },
];

export const navigationActions: NavItem[] = [
  { label: "Contact", href: "#contact" },
];
