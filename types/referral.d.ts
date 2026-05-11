// mod.rs → GenerateReferralRequest
export type GenerateReferralRequest = {
  cha_num: number;
};

// mod.rs → ApplyReferralRequest
// Validated: referral_code must have length >= 1
export type ApplyReferralRequest = {
  referral_code: string;
  cha_num: number;
};

// mod.rs → ApplyReferralResponse
export type ApplyReferralResponse = {
  success: boolean;
  message: string | null;
};

// mod.rs → EligibleCharacter
// cha_create_date is a pre-formatted ISO-like string (e.g. "2024-01-15T10:30:00")
export type EligibleCharacter = {
  cha_num: number;
  cha_name: string;
  cha_level: number;
  cha_create_date: string;
  cha_school: number;
  cha_class: number;
};

// mod.rs → ReferralDetailsResponse
export type ReferralDetailsResponse = {
  referral_code: string | null;
  applied_code: string | null;
  referral_usage: number;
  can_refer: boolean;
  can_apply: boolean;
};

// mod.rs → MyReferralEntry
// user_name is MASKED: first 3 characters are shown, the rest replaced with "*".
// Example: "kenneth" → "ken****", "ab" → "ab" (3 chars or fewer shown in full).
export type MyReferralEntry = {
  user_name: string;
  cha_name: string;
  cha_level: number;
  cha_school: number;
  cha_class: number;
};
