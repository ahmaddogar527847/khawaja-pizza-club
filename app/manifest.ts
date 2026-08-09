import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Khawaja Pizza Club",
    short_name: "Khawaja Pizza Club",
    description:
      "Premium Pizza, Burgers & Fast Food in Shujaabad.",

    start_url: "/",
    scope: "/",
    display: "standalone",

    background_color: "#000000",
    theme_color: "#000000",

    icons: [
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
