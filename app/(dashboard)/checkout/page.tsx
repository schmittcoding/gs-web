import { CheckoutContent } from "@/components/cart/checkout.cart";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Review and complete your Ran Online GS item shop purchase.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="flex h-full overflow-hidden p-5">
      <CheckoutContent />
    </div>
  );
}
