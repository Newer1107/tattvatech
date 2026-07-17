import type { BusinessPrinciple, BusinessVertical } from "@/types";

export const businessVerticalsIntro = {
  label: "Principles We Follow",
  heading: "Purpose before technology.\nClarity before complexity.",
  description:
    "We design solutions around real needs, responsible engineering, clear communication, and systems built to grow.",
} as const;

export const businessPrinciples: BusinessPrinciple[] = [
  {
    title: "Purpose-Led",
    description: "Build around real problems, not fashionable technology.",
  },
  {
    title: "Clarity",
    description: "Make every product, process, and decision understandable.",
  },
  {
    title: "Scalability",
    description: "Engineer foundations that can grow with the organization.",
  },
  {
    title: "Responsibility",
    description: "Deliver secure, maintainable, and useful systems.",
  },
];

export const businessVerticals: BusinessVertical[] = [
  {
    id: "tattvatech-services",
    number: "01",
    titleTop: "TattvaTech",
    titleBottom: "Services",
    description:
      "Custom technology solutions for businesses, institutions, startups, and growing organizations.",
    capabilities: [
      "Web Development",
      "Software Development",
      "Mobile App Development",
      "AI & Automation",
      "Cloud & DevOps",
      "Data Analytics",
      "UI/UX Design",
    ],
    anchor: "#tattvatech-services",
    linkLabel: "Explore TattvaTech Services",
    theme: "warm",
  },
  {
    id: "tattvatech-drones",
    number: "02",
    titleTop: "TattvaTech",
    titleBottom: "Drones",
    description:
      "Drone technology, applications, research, consulting, training, and industry-focused solutions.",
    capabilities: [
      "Drone Solutions",
      "Industrial Applications",
      "Research & Innovation",
      "Consulting",
      "Training",
    ],
    anchor: "#tattvatech-drones",
    linkLabel: "Explore TattvaTech Drones",
    theme: "dark",
  },
  {
    id: "tattvatech-products",
    number: "03",
    titleTop: "TattvaTech",
    titleBottom: "Products",
    description:
      "Software products designed to solve repeatable business and institutional problems at scale.",
    capabilities: ["SaaS Products", "Built to expand into a broader product portfolio."],
    anchor: "#tattvatech-products",
    linkLabel: "Explore TattvaTech Products",
    theme: "orange",
  },
  {
    id: "tattvatech-training",
    number: "04",
    titleTop: "TattvaTech",
    titleBottom: "Training",
    description:
      "Industry-focused technical training for students, faculty members, institutions, and corporate teams.",
    capabilities: [
      "College Industrial Preparation",
      "Workshops",
      "Student Upskilling",
      "Teacher Training",
      "Corporate Training",
    ],
    anchor: "#tattvatech-training",
    linkLabel: "Explore TattvaTech Training",
    theme: "amber",
  },
];

export const businessVerticalsClosing = {
  heading: "Technology made useful.",
  description:
    "Across services, products, drones, and training, we focus on practical outcomes and lasting value.",
} as const;
