"use server";

import { RECHARGE_CURRENCY } from "@/components/recharge/constants.recharge";
import {
  ERechargeProvider,
  RechargeDenomination,
  RechargeGateway,
  RechargeGatewayResponse,
  RechargeInfoResponse,
} from "@/components/recharge/types.recharge";
import { AUTH_CONFIG } from "@/lib/constants";
import { fetcherPrivate } from "@/lib/fetcher";
import { rechargeSchema } from "@/lib/validations/recharge";
import { redirect } from "next/navigation";
import z from "zod";

const formatRechargeInfoValues = (
  values: RechargeInfoResponse,
): RechargeDenomination => ({
  id: values.id,
  price: values.amount,
  amount: values.points,
  currency:
    RECHARGE_CURRENCY[
      ERechargeProvider[values.type] as keyof typeof ERechargeProvider
    ],
  type: ERechargeProvider[values.type],
});

const formatGatewayInfoValues = (
  values: RechargeGatewayResponse,
): RechargeGateway => ({
  name: values.name,
  number: values.number,
  image: values.image,
  provider: ERechargeProvider[values.provider].toLowerCase(),
});

export async function getRechargeDetails() {
  const [rechargeRes, gatewayRes] = await Promise.all([
    fetcherPrivate("/v1/payments/get-recharge-info"),
    fetcherPrivate("/v1/payments/get-gateway-info"),
  ]);

  if (rechargeRes.status === 401 || gatewayRes.status === 401) {
    redirect(AUTH_CONFIG.loginPath);
  }

  const [rechargeInfo, gatewayInfo] = await Promise.all([
    rechargeRes.json() as Promise<RechargeInfoResponse[]>,
    gatewayRes.json() as Promise<RechargeGatewayResponse[]>,
  ]);

  const gateways = gatewayInfo.map(formatGatewayInfoValues);
  const grouped = Object.groupBy(
    rechargeInfo,
    ({ type }) => ERechargeProvider[type],
  );

  return Object.entries(grouped).reduce(
    (res, [key, value]) => ({
      ...res,
      [key]: {
        denomination: value?.map(formatRechargeInfoValues),
        details: gateways.find(
          ({ provider }) => provider === key.toLowerCase(),
        ),
      },
    }),
    {} as Record<
      keyof typeof ERechargeProvider,
      {
        denomination: RechargeDenomination[] | undefined;
        details: RechargeGateway | undefined;
      }
    >,
  );
}

export type ConfirmTransactionResult = {
  success: boolean;
  message: string;
  data?: string | null;
};

export type ConfirmTransactionPayload = {
  id: string;
  gateway: string;
  referenceNumber: string;
  proofImageBase64: string | null;
};

export async function confirmTransaction(
  _prev: ConfirmTransactionResult,
  payload: ConfirmTransactionPayload,
): Promise<ConfirmTransactionResult> {
  const validated = rechargeSchema.safeParse({
    id: payload.id,
    gateway: payload.gateway,
    referenceNumber: payload.referenceNumber,
  });

  console.log({ validated });

  if (!validated.success) {
    const fieldErrors = z.flattenError(validated.error).fieldErrors;
    const firstError = Object.values(fieldErrors).flat().find(Boolean);
    return {
      success: false,
      message: firstError ?? "Validation failed",
    };
  }

  const { id, gateway, referenceNumber } = validated.data;
  const provider = gateway.toLowerCase();

  let body: Record<string, unknown> | null = null;

  if (provider === "gcash") {
    body = {
      type: "gcash",
      reference_number: referenceNumber,
      proof_image: payload.proofImageBase64,
    };
  } else if (provider === "wise") {
    body = {
      type: "wise",
      reference_number: referenceNumber,
    };
  }

  console.log({ body });

  const res = await fetcherPrivate(`/v1/payments/transaction/${id}`, {
    method: "POST",
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  console.log({ res });

  if (res.status === 401) {
    redirect(AUTH_CONFIG.loginPath);
  }

  if (!res.ok) {
    const error = await res
      .json()
      .catch(() => ({ message: "Transaction failed" }));
    return {
      success: false,
      message: error.message ?? "Transaction failed",
    };
  }

  const data = await res.json();

  const hasRedirectUrl = ["paymongo", "paypal"].includes(provider);

  return {
    success: true,
    message: "Transaction submitted successfully",
    data: hasRedirectUrl ? data.approval_url : data.recharge_info?.id,
  };
}
