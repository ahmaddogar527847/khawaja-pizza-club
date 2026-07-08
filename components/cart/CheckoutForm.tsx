"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Send, CheckCircle, Loader2 } from "lucide-react";
import { CartItem } from "@/lib/store/cart";
import { generateWhatsAppURL } from "@/lib/utils/whatsapp";
import { openExternalURL } from "@/lib/utils/contact-actions";
import { useCartStore } from "@/lib/store/cart";
import { placeOrder } from "@/lib/api";

const schema = z.object({
  name:    z.string().min(2, "Name is required (min 2 chars)"),
  phone:   z.string().min(10, "Enter a valid phone number"),
  address: z.string().min(8, "Please provide a full delivery address"),
  notes:   z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  items: CartItem[];
  subtotal: number;
  onBack: () => void;
}

export default function CheckoutForm({ items, subtotal, onBack }: Props) {
  const { clearCart, closeCart } = useCartStore();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    try {
      const result = await placeOrder({
        customer_name: data.name,
        customer_phone: data.phone,
        customer_address: data.address,
        notes: data.notes || "",
        items: items.map((i) => ({
          product_name: i.name,
          quantity: i.qty,
          unit_price: i.price,
          selected_variant: i.variant || "",
        })),
      });
      setOrderNumber(result.order_number);
      const waUrl = generateWhatsAppURL({
        ...data,
        items: items.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
        subtotal,
      });
      // Open the pre-filled order summary in a NEW tab. The current
      // restaurant tab stays put — never assigned to window.location.
      openExternalURL(waUrl);
      setTimeout(() => {
        clearCart();
        closeCart();
      }, 3000);
    } catch {
      const waUrl = generateWhatsAppURL({
        ...data,
        items: items.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
        subtotal,
      });
      openExternalURL(waUrl);
      clearCart();
      closeCart();
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 focus:border-[rgba(224,184,76,0.5)] focus:outline-none text-white placeholder-white/30 text-sm rounded-xl px-4 py-3 transition-colors";
  const errorClass = "text-red-400 text-xs mt-1";

  if (orderNumber) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 px-5 py-10 text-center gap-4">
        <CheckCircle size={48} className="text-[#25D366]" />
        <h3 className="text-white font-serif font-bold text-xl">Order Placed!</h3>
        <p className="text-white/60 text-sm">
          Your order <span className="text-[oklch(0.78_0.17_85)] font-bold">#{orderNumber}</span> has been submitted.
        </p>
        <p className="text-white/40 text-xs">You'll receive updates in realtime.</p>
        <div className="flex items-center gap-2 text-[#25D366] text-xs mt-2">
          <Loader2 size={12} className="animate-spin" />
          WhatsApp is opening...
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-y-auto">
      <div className="flex-1 px-5 py-4 space-y-4">
        {/* Order summary */}
        <div className="glass-card p-4 rounded-xl space-y-1.5">
          <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Order Summary</p>
          {items.map((i) => (
            <div key={i.id} className="flex justify-between text-xs">
              <span className="text-white/70 truncate mr-2">
                {i.name} ×{i.qty}
              </span>
              <span className="text-[oklch(0.78_0.17_85)] shrink-0">Rs. {(Number(i.price) * i.qty).toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold border-t border-white/5 pt-2 mt-2 text-sm">
            <span className="text-white/60">Total</span>
            <span className="text-[oklch(0.78_0.17_85)]">Rs. {subtotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Fields */}
        <div>
          <label className="text-white/50 text-xs uppercase tracking-wide block mb-1.5">
            Your Name *
          </label>
          <input {...register("name")} placeholder="e.g. Ahmed Khan" className={inputClass} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className="text-white/50 text-xs uppercase tracking-wide block mb-1.5">
            Phone Number *
          </label>
          <input {...register("phone")} placeholder="e.g. 0301-1234567" className={inputClass} />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
        <div>
          <label className="text-white/50 text-xs uppercase tracking-wide block mb-1.5">
            Delivery Address *
          </label>
          <textarea
            {...register("address")}
            rows={3}
            placeholder="Street, Area, Shujaabad..."
            className={`${inputClass} resize-none`}
          />
          {errors.address && <p className={errorClass}>{errors.address.message}</p>}
        </div>
        <div>
          <label className="text-white/50 text-xs uppercase tracking-wide block mb-1.5">
            Special Instructions
          </label>
          <input {...register("notes")} placeholder="Any notes for your order..." className={inputClass} />
        </div>
        {submitError && (
          <p className="text-red-400 text-xs text-center">{submitError}</p>
        )}
      </div>

      {/* Actions */}
      <div className="px-5 py-4 border-t border-[rgba(224,184,76,0.1)] space-y-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="gold-btn w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isSubmitting ? (
            <><Loader2 size={14} className="animate-spin" /> Submitting...</>
          ) : (
            <><Send size={14} /> Place Order</>
          )}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full py-3 rounded-xl text-sm text-white/50 hover:text-white flex items-center justify-center gap-2 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Cart
        </button>
      </div>
    </form>
  );
}
