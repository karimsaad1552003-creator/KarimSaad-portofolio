import type { MetadataRoute } from "next";
import { portfolioData } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = portfolioData.seo.siteUrl;
  const projectEntries = portfolioData.projects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: project.featured ? 0.8 : 0.6,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectEntries,
  ];
}
