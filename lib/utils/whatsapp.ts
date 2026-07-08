import { RESTAURANT } from "@/lib/data/restaurant";
import { CONTACT_URLS, buildWhatsAppURL } from "@/lib/contact";

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
}

export function generateWhatsAppURL(order: OrderDetails): string {
  const now = new Date();
  const time = now.toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const itemLines = order.items
    .map((i) => `• ${i.name} ×${i.qty} — Rs. ${i.price * i.qty}`)
    .join("\n");

  const message = `━━━━━━━━━━━━━━━━━━━━━
🍕 *NEW ORDER — ${RESTAURANT.name}*
━━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${order.name}
📞 *Phone:* ${order.phone}
📍 *Address:* ${order.address}
${order.notes ? `📝 *Notes:* ${order.notes}\n` : ""}━━━━━━━━━━━━━━━━━━━━━
🛒 *ORDER ITEMS:*
${itemLines}
━━━━━━━━━━━━━━━━━━━━━
💰 *SUBTOTAL: Rs. ${order.subtotal}*
🚗 *Delivery: Free (${RESTAURANT.deliveryArea})*
💳 *TOTAL: Rs. ${order.subtotal}*
💵 *Payment: Cash on Delivery*
━━━━━━━━━━━━━━━━━━━━━
⏱ Ordered at: ${time}
📅 Date: ${date}
━━━━━━━━━━━━━━━━━━━━━`;

  return buildWhatsAppURL(message);
}

// Re-export so consumers can grab a base URL without importing @/lib/contact.
export { CONTACT_URLS };
