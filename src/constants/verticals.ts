import type { BusinessVertical, EditorialPrinciple } from "@/types";

export const businessVerticalsIntro = {
  label: "Principles We Follow",
  heading: "Observe. Build.\nScale. Evolve. Responsibly.",
  description:
    "We engineer meaningful technology through clarity, precision, and long-term thinking.",
} as const;

export const businessPrinciples: EditorialPrinciple[] = [
  {
    word: "Observe.",
    tone: "primary",
    desktopClassName: "left-[7%] top-[10%] max-w-[16rem] text-left",
    mobileClassName: "self-start",
    markerClassName: "left-[17%] top-[22%]",
    lineClassName: "left-[7%] top-[25%] w-[18vw]",
    relatedIndexes: [1, 2],
  },
  {
    word: "Build.",
    tone: "primary",
    desktopClassName: "left-[12%] top-[40%] max-w-[15rem] text-left",
    mobileClassName: "self-start",
    markerClassName: "left-[25%] top-[50%]",
    lineClassName: "left-[12%] top-[54%] w-[14vw]",
    relatedIndexes: [0, 2, 3],
  },
  {
    word: "Scale.",
    tone: "secondary",
    desktopClassName: "right-[10%] top-[42%] max-w-[15rem] text-right",
    mobileClassName: "self-end text-right",
    markerClassName: "right-[20%] top-[51%]",
    lineClassName: "right-[10%] top-[56%] w-[15vw]",
    relatedIndexes: [0, 1, 4],
  },
  {
    word: "Evolve.",
    tone: "inverse",
    desktopClassName: "left-[8%] top-[72%] max-w-[14rem] text-left",
    mobileClassName: "self-start",
    markerClassName: "left-[18%] top-[82%]",
    lineClassName: "left-[8%] top-[86%] w-[15vw]",
    relatedIndexes: [1, 4],
  },
  {
    word: "Responsibly.",
    tone: "inverse",
    desktopClassName: "right-[8%] top-[74%] max-w-[20rem] text-right",
    mobileClassName: "self-end text-right",
    markerClassName: "right-[18%] top-[84%]",
    lineClassName: "right-[8%] top-[88%] w-[17vw]",
    relatedIndexes: [2, 3],
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
