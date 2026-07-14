import type { Metadata } from "next";
import { siteConfig } from "@/constants/site";

export function buildMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: siteConfig.title,
    description: siteConfig.description,
    applicationName: siteConfig.name,
    keywords: [
      "TattvaTech",
      "technology company",
      "software development",
      "web development",
      "AI automation",
      "cloud devops",
    ],
    openGraph: {
      title: siteConfig.title,
      description: siteConfig.description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: "/brand/tattvatech-logo.png",
          width: 1200,
          height: 630,
          alt: "TattvaTech logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
      images: ["/brand/tattvatech-logo.png"],
    },
  };
}