import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Khawaja Pizza Club - Premium Pizza, Burgers & Fast Food",
    short_name: "Khawaja Pizza Club",
    description:
      "Order premium pizza, burgers, and fast food with free delivery in Shujaabad. Open 11 AM to 1 AM daily.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#000000",
    theme_color: "#000000",
    prefer_related_applications: false,
    categories: ["food", "restaurant"],
    screenshots: [
      {
        src: "/screenshot-narrow.png",
        sizes: "540x720",
        form_factor: "narrow",
        type: "image/png",
      },
      {
        src: "/screenshot-wide.png",
        sizes: "1280x720",
        form_factor: "wide",
        type: "image/png",
      },
    ],
    icons: [
      {
        src: "/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/favicon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon-192-maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/logo.png",
        sizes: "any",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    shortcuts: [
      {
        name: "View Menu",
        short_name: "Menu",
        description: "View our full menu",
        url: "/?shortcut=menu",
        icons: [
          {
            src: "/shortcut-menu.png",
            sizes: "96x96",
            type: "image/png",
          },
        ],
      },
      {
        name: "Order Now",
        short_name: "Order",
        description: "Start ordering food",
        url: "/?shortcut=order",
        icons: [
          {
            src: "/shortcut-order.png",
            sizes: "96x96",
            type: "image/png",
          },
        ],
      },
      {
        name: "Contact Us",
        short_name: "Contact",
        description: "Contact us via WhatsApp",
        url: "/?shortcut=contact",
        icons: [
          {
            src: "/shortcut-contact.png",
            sizes: "96x96",
            type: "image/png",
          },
        ],
      },
    ],
  };
}
