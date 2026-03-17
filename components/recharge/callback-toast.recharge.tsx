"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { sileo } from "sileo";

export default function RechargeCallbackToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const shown = useRef(false);

  const type = searchParams.get("type");
  const method = searchParams.get("method");

  useEffect(() => {
    if (method !== "paypal" || shown.current) return;

    if (type === "success") {
      shown.current = true;

      sileo.success({
        title: "Payment Successful",
        description:
          "Your PayPal transaction has been completed. Your R-Coins will be credited to your account shortly.",
      });

      router.replace("/recharge");
    }

    if (type === "cancelled") {
      shown.current = true;

      sileo.warning({
        title: "Payment Cancelled",
        description:
          "Your PayPal transaction was cancelled. No charges were made.",
      });

      router.replace("/recharge");
    }
  }, [type, method, router]);

  return null;
}
