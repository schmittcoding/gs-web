export type RechargeInfoResponse = {
  id: string;
  type: number;
  amount: number;
  points: number;
  status: number;
  discount?: number;
};

export type RechargeGatewayResponse = {
  id: string;
  provider: number;
  name: string;
  number: string;
  image: string;
  status: number;
};

export type RechargeDenomination = Pick<
  RechargeInfoResponse,
  "id" | "amount"
> & {
  type: string;
  currency: string;
  price: number;
};

export type RechargeGateway = Pick<
  RechargeGatewayResponse,
  "name" | "number" | "image"
> & {
  provider: string;
};

export enum ERechargeProvider {
  GCash = 1,
  PayPal = 2,
  Wise = 3,
  PayMongo = 4,
}
