import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sidetrack — check-ins that actually get through",
    short_name: "Sidetrack",
    description:
      "Short, personal SMS and voice-note check-ins for people juggling multiple serious commitments at once.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4f46e5",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
