import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Khawaja Pizza Club",
    short_name: "Khawaja Pizza Club",
    description:
      "Premium Pizza, Burgers, Fast Food, Delivery & Online Ordering from Khawaja Pizza Club.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/logo.png",
        sizes: "any",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
}
