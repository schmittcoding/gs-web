import { ERechargeProvider } from "./types.recharge";

export const RECHARGE_CURRENCY: Record<keyof typeof ERechargeProvider, string> =
  {
    GCash: "PHP",
    PayPal: "USD",
    Wise: "USD",
    PayMongo: "PHP",
  };

export const PROVIDERS_WITH_REFERENCE = ["wise", "gcash"];
export const PROVIDERS_WITH_PROOF = ["gcash"];

export const RECHARGE_MESSAGES: Record<
  keyof typeof ERechargeProvider,
  { title: string; message: string }
> = {
  GCash: {
    title: "GCash Transaction Submitted",
    message:
      "Your GCash transaction has been received and is now pending review by the admin. You'll be notified once it has been confirmed.",
  },
  PayPal: {
    title: "Proceed to PayPal",
    message:
      "You've been redirected to the PayPal page to complete your transaction. You can safely close this window.",
  },
  Wise: {
    title: "Wise Transaction Submitted",
    message:
      "Your Wise transaction has been received. Please contact GM UI or GM Libra on Discord to complete the transaction process.",
  },
  PayMongo: {
    title: "Proceed to PayMongo",
    message:
      "You've been redirected to the PayMongo page to complete your transaction. You can safely close this window.",
  },
};
