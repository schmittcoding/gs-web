# Creator Contract

> Generated from `ran-models/src/creator/` and `ran-access-point/src/routes/creator/`.
> Do not edit manually — re-run ContractGen to regenerate.
> Last generated: 2026-05-17

## TypeScript Types

```typescript
// mod.rs → CreatorApplicationRequest
export type CreatorApplicationRequest = {
  personal_facebook_url: string | null;
  discord_account: string | null;
  content_links: string | null;
};

// mod.rs → SetSupportedCodeRequest
export type SetSupportedCodeRequest = {
  code: string | null;
};

// mod.rs → CreatorApplicationStatusResponse
export type CreatorApplicationStatusResponse = {
  application_id: string;
  status: number;
  decision_notes: string | null;
  decision_date: string | null;
  assigned_creator_code: string | null;
  created_at: string;
};

// mod.rs → CreatorCommissionEntry
export type CreatorCommissionEntry = {
  commission_id: string;
  transaction_id: string;
  supporter_user_name: string;
  recharge_amount: number;
  commission_percent: number;
  commission_amount: number;
  created_at: string;
};

// mod.rs → CreatorSummary
export type CreatorSummary = {
  creator_code: string;
  total_supporters: number;
  total_earned: number;
};
```

## API Contract

### POST /api/v1/creator/apply

- **Auth**: User session (cookie)
- **Request body**: `CreatorApplicationRequest`
- **Response**: `// { application_id: string }`

---

### GET /api/v1/creator/application

- **Auth**: User session (cookie)
- **Request body**: —
- **Response**: `CreatorApplicationStatusResponse`

---

### POST /api/v1/creator/support

- **Auth**: User session (cookie)
- **Request body**: `SetSupportedCodeRequest`
- **Response**: `// { message: string }`

---

### GET /api/v1/creator/commissions

- **Auth**: User session (cookie)
- **Request body**: —
- **Query params**: `page?: number`, `page_size?: number`
- **Response**: `// { data: CreatorCommissionEntry[], total_records: number }` (paginated, shape from DB)

---

### GET /api/v1/creator/summary

- **Auth**: User session (cookie)
- **Request body**: —
- **Response**: `CreatorSummary`

---
