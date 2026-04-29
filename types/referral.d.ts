// mod.rs → GenerateReferralCodeRequest
export type GenerateReferralCodeRequest = {
  /** Character number to associate with the new code — must be >= 1 */
  cha_num: number;
};

// mod.rs → ApplyReferralCodeRequest
export type ApplyReferralCodeRequest = {
  /** Referral code to apply — format: RAN-XXXXX (5 uppercase alphanumeric chars) */
  code: string;
  /** Character number applying the code — must be >= 1 */
  cha_num: number;
  /** Optional device identifier for fraud detection */
  device_id: string | null;
};

// mod.rs → GenerateReferralCodeResponse
export type GenerateReferralCodeResponse = {
  /** The newly generated referral code */
  code: string;
};

// mod.rs → ApplyReferralCodeResponse
export type ApplyReferralCodeResponse = {
  /** ID of the new referrer–referee relationship */
  relationship_id: number;
  /** Number of fraud flags triggered by this application */
  flags_count: number;
};

// mod.rs → ReferralCodeDetail
export type ReferralCodeDetail = {
  /** Referral code string (format: RAN-XXXXX) */
  code: string;
  /** User number of the referrer */
  referrer_user_num: number;
  /** Character number used when generating the code */
  referrer_cha_num: number;
  /** ISO 8601 timestamp when the code was created */
  created_at: string;
  /** Whether the code is currently active */
  is_active: boolean;
  /** Number of times the code has been used */
  usage_count: number;
  /** Maximum number of allowed uses */
  max_usage: number;
};

// mod.rs → RefereeInfo
export type RefereeInfo = {
  /** User number of the referee */
  user_num: number;
  /** Character number used when the code was applied */
  cha_num: number;
  /** ISO 8601 timestamp when the code was applied */
  applied_at: string;
};
