import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hundred — test your idea on 100 people who don't exist",
    short_name: "Hundred",
    description:
      "Synthetic audience panels for founders — ranked objections, sentiment, and a price curve before you spend a dollar.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0714",
    theme_color: "#7c3aed",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
