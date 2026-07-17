import type { BusinessVertical, EditorialPrinciple } from "@/types";

export const businessVerticalsIntro = {
  label: "Principles We Follow",
  heading: "Observe. Think. Build.\nScale. Evolve. Responsibly.",
  description:
    "Engineering meaningful technology through clarity, precision, and long-term thinking.",
} as const;

export const businessPrinciples: EditorialPrinciple[] = [
  {
    word: "Observe.",
    tone: "primary",
    desktopClassName: "left-[8%] top-[11%] max-w-[12rem] text-left",
    mobileClassName: "self-start",
    markerClassName: "left-[10%] top-[18%]",
    lineClassName: "left-[7%] top-[27%] w-[18vw]",
    relatedIndexes: [1, 2],
  },
  {
    word: "Think.",
    tone: "secondary",
    desktopClassName: "right-[11%] top-[18%] max-w-[12rem] text-right",
    mobileClassName: "self-end text-right",
    markerClassName: "right-[15%] top-[26%]",
    lineClassName: "right-[13%] top-[34%] w-[15vw]",
    relatedIndexes: [0, 2, 3],
  },
  {
    word: "Build.",
    tone: "accent",
    desktopClassName: "left-[18%] top-[36%] max-w-[11rem] text-left",
    mobileClassName: "self-start",
    markerClassName: "left-[26%] top-[44%]",
    lineClassName: "left-[17%] top-[49%] w-[11vw]",
    relatedIndexes: [0, 1, 4],
  },
  {
    word: "Scale.",
    tone: "primary",
    desktopClassName: "right-[16%] top-[52%] max-w-[11rem] text-right",
    mobileClassName: "self-end text-right",
    markerClassName: "right-[22%] top-[59%]",
    lineClassName: "right-[18%] top-[66%] w-[10vw]",
    relatedIndexes: [1, 3, 5],
  },
  {
    word: "Evolve.",
    tone: "inverse",
    desktopClassName: "left-[12%] top-[66%] max-w-[12rem] text-left",
    mobileClassName: "self-start",
    markerClassName: "left-[22%] top-[76%]",
    lineClassName: "left-[11%] top-[79%] w-[14vw]",
    relatedIndexes: [2, 5],
  },
  {
    word: "Responsibly.",
    tone: "inverse",
    desktopClassName: "right-[10%] top-[73%] max-w-[18rem] text-right",
    mobileClassName: "self-end text-right",
    markerClassName: "right-[12%] top-[82%]",
    lineClassName: "right-[11%] top-[86%] w-[16vw]",
    relatedIndexes: [3, 4],
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
