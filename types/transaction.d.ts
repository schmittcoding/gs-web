export type Transaction = {
  admin_remarks: string | null;
  proof_image: string;
  reference_code: string;
  transaction_amount: number;
  transaction_cost: number;
  transaction_id: string;
  transaction_price: number;
  transaction_status: number;
  transaction_time: string;
  transaction_type: number;
  updated_at: string;
  user_name: string;
  user_num: number;
};

export type TransactionsResponse = {
  data: Transaction[];
  total_items: number;
  page: number;
  limit: number;
};
