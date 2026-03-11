import { CheckoutContent } from "@/components/cart/checkout.cart";

export default function CartPage() {
  return (
    <div className="flex flex-col gap-4 p-5 h-full max-w-2xl overflow-y-auto">
      <CheckoutContent />
    </div>
  );
}
