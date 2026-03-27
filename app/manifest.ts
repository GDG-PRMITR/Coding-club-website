import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Coding Club PRMITR",
    short_name: "Coding Club",
    description: "PRMITR Coding Club community portal for events, teams, and updates.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4285f4",
    icons: [
      {
        src: "/Coding-Club.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/Coding-Club.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
