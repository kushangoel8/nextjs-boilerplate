import type { MetadataRoute } from "next";

const siteUrl = "https://nextjs-boilerplate-kushangoel8-7415-kushan-goel-s-projects.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
