## API Contract

### GET /api/v1/referrals/details

- **Auth**: User session (cookie)
- **Request body**: —
- **Query params**: —
- **Response**: `ReferralDetailsResponse`
- **Error codes**:
  - `401` — No active session
  - `500` — `{ message: string }` — DB failure on referral lookup, usage lookup, or account info

**Notes**: `can_refer` is `true` only when the account is at least `REFERRAL_MIN_ACCOUNT_AGE_DAYS` old (default 30), has no existing referral code, and owns at least one character at or above `REFERRAL_MIN_CHAR_LEVEL` (default 280). `can_apply` is `true` only when the account is at most `REFERRAL_MAX_REFEREE_ACCOUNT_AGE_DAYS` old (default 7), has not already applied a code, and owns at least one character at or above `REFERRAL_MIN_REFEREE_CHAR_LEVEL` (default 200).

---

### GET /api/v1/referrals/characters

- **Auth**: User session (cookie)
- **Request body**: —
- **Query params**:
  - `type` — `number` (optional) — `1` = referrer eligibility check (default), `2` = referee eligibility check
- **Response**: `EligibleCharacter[]`
- **Error codes**:
  - `401` — No active session
  - `500` — `{ message: string }` — DB failure

**Notes**: When `type=1`, the minimum level threshold is `REFERRAL_MIN_CHAR_LEVEL` (default 280). When `type=2`, the threshold is `REFERRAL_MIN_REFEREE_CHAR_LEVEL` (default 200).

---

### POST /api/v1/referrals/generate

- **Auth**: User session (cookie)
- **Request body**: `GenerateReferralRequest`
- **Response**: `{ referral_code: string }` — the newly generated code in the format `RAN-XXXXXX` (6 uppercase hex characters)
- **Error codes**:
  - `400` — `{ message: string }` — one of:
    - `"You already have an active referral code"`
    - `"Account must be at least {N} days old"`
    - `"Selected character is not eligible to create a referral code"`
  - `401` — No active session
  - `500` — `{ message: string }` — DB failure

**Notes**: Enforces `REFERRAL_MIN_ACCOUNT_AGE_DAYS` (default 30) and `REFERRAL_MIN_CHAR_LEVEL` (default 280). The `cha_num` in the request body must be among the characters returned by `GET /characters?type=1`.

---

### POST /api/v1/referrals/apply

- **Auth**: User session (cookie)
- **Request body**: `ApplyReferralRequest`
- **Response**: `ApplyReferralResponse`
- **Error codes**:
  - `400` — `{ referral_code?: string }` (field-keyed validation map) if `referral_code` is empty; or `{ message: string }` for any of:
    - `"You have already applied a referral code"`
    - `"Invalid referral code"`
    - `"This referral code is no longer active"`
    - `"You cannot apply your own referral code"`
    - `"Your account is too old to apply referral codes (max {N} days)"`
    - `"Selected character is not eligible to apply a referral code"`
  - `401` — No active session
  - `500` — `{ message: string }` — DB failure

**Notes**: After a successful apply, the system automatically runs fraud checks in the background and may create internal flag records (no flag is exposed in the response). Enforces `REFERRAL_MAX_REFEREE_ACCOUNT_AGE_DAYS` (default 7) and `REFERRAL_MIN_REFEREE_CHAR_LEVEL` (default 200). The `cha_num` must be among the characters returned by `GET /characters?type=2`.

Fraud flag types created automatically (internal, not returned to the client):

- `DEVICE_SHARED` — referee and referrer share a hardware ID
- `TEMP_EMAIL_PROVIDER` — referee email domain matches a known disposable provider
- `RANDOM_EMAIL` — referee email local-part appears randomly generated
- `SEQUENTIAL_EMAIL` — referee and referrer email local-parts share a prefix and differ by ≤ 2 in trailing numeric suffix
- `EMAIL_REUSE` — referee and referrer email local-parts are identical or within edit distance ≤ 2

---

### GET /api/v1/referrals/my-referrals

- **Auth**: User session (cookie)
- **Request body**: —
- **Query params**: —
- **Response**: `MyReferralEntry[]` — empty array if the authenticated user has no referral code
- **Error codes**:
  - `401` — No active session
  - `500` — `{ message: string }` — DB failure

**Notes**: The `user_name` field in each `MyReferralEntry` is **masked**: the first 3 characters of the referee's account ID are shown and the remaining characters are replaced with `*` (e.g. `"kenneth"` → `"ken****"`). Accounts with IDs of 3 characters or fewer are shown in full. Character entries for referees whose game character could not be fetched are silently omitted from the list.

---
