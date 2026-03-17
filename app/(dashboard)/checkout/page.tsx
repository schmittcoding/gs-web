import { CheckoutContent } from "@/components/cart/checkout/content.checkout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Review and complete your Ran Online GS item shop purchase.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="flex size-full min-w-0 overflow-y-auto overflow-x-hidden lg:overflow-hidden px-4">
      <CheckoutContent />
    </div>
  );
}
