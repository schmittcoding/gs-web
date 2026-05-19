export type CreatorApplicationRequest = {
  personal_facebook_url: string | null;
  discord_account: string | null;
  content_links: string | null;
};

export type SetSupportedCodeRequest = {
  code: string | null;
};

export type CreatorApplicationStatusResponse = {
  application_id: string;
  status: number;
  decision_notes: string | null;
  decision_date: string | null;
  assigned_creator_code: string | null;
  created_at: string;
};

export type CreatorCommissionEntry = {
  commission_id: string;
  transaction_id: string;
  supporter_user_name: string;
  recharge_amount: number;
  commission_percent: number;
  commission_amount: number;
  created_at: string;
};

export type CreatorSummary = {
  creator_code: string;
  total_supporters: number;
  total_earned: number;
};
