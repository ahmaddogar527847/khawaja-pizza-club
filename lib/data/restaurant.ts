import { CONTACT } from "@/lib/contact";

/**
 * Restaurant static data.
 * Phone / WhatsApp numbers are derived from the single source of truth
 * in `@/lib/contact`. To change them, edit only that file.
 */
export const RESTAURANT = {
  name: CONTACT.brandName,
  tagline: "Pizza, Burger & Fast Food",
  slogan: "Utterly, Butterly, Delicious",

  // Display copy (e.g. "0301-7723698")
  phone: CONTACT.phoneDisplay,
  // E.164-free international number for `wa.me` deep links
  whatsapp: CONTACT.whatsappNumber,

  address: "Thana Chowk, Shujaabad",
  city: "Shujaabad",
  deliveryArea: "Shujaabad City",
  deliveryCharge: "Free",
  hours: "Open Daily — 11:00 AM to 1:00 AM",
};

export const REVIEWS = [
  {
    name: "Ahmed K.",
    location: "Shujaabad",
    rating: 5,
    text: "Bhai bilkul best pizza hai! Cheese itni zyada thi ke bas maza aa gaya. Delivery bhi 30 minutes mein aa gayi. Khawaja Pizza Club zindabaad!",
    avatar: "AK",
    date: "2 days ago",
  },
  {
    name: "Sara M.",
    location: "Thana Chowk",
    rating: 5,
    text: "Family deal bohot value for money hai. Sab items fresh the aur packaging bhi very nice. Definitely order karengi dobara! Highly recommended.",
    avatar: "SM",
    date: "1 week ago",
  },
  {
    name: "Usman T.",
    location: "Shujaabad",
    rating: 5,
    text: "Zinger burger ne zindagi badal di. Seriously the BEST burger in the area. Price bhi reasonable hai mashallah. Mighty Zinger is a must try!",
    avatar: "UT",
    date: "3 days ago",
  },
  {
    name: "Fatima R.",
    location: "Multan Road",
    rating: 5,
    text: "Peri Peri pizza is absolutely amazing. Perfectly spiced, crispy crust, generous toppings. Fast delivery and polite staff. Will keep ordering!",
    avatar: "FR",
    date: "5 days ago",
  },
  {
    name: "Hassan B.",
    location: "Shujaabad",
    rating: 5,
    text: "Behari Roll Platter tha aur taste ekdam mast tha. Hot wings bhi crispy the. Free delivery is a huge plus. 10/10 would recommend to everyone.",
    avatar: "HB",
    date: "2 weeks ago",
  },
  {
    name: "Zainab A.",
    location: "Thana Chowk",
    rating: 5,
    text: "Shawarma is the best in town. Chicken filling bohot generous tha. Price bhi sasta aur taste lajawab. Khawaja Pizza Club is our family favourite now!",
    avatar: "ZA",
    date: "4 days ago",
  },
];
