import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap:
      "https://nextjs-boilerplate-kushangoel8-7415-kushan-goel-s-projects.vercel.app/sitemap.xml",
  };
}
