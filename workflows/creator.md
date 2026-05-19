# Creator Module

## Description

> The Support-A-Creator program is an affiliate marketing program for streamers and social media content creators. Support-A-Creator gives creators the opportunity to receive commissions by creating or streaming contents for Ran Online GS. Quick Silver believes that content creators are an essential part of building communities around awesome games. We recognize how important content creators of all kinds have been to our success, so we built this program to share in that success.

## API Contract

- Use `workflows/creator-contract.md` for API contract and schema
- The user's `creator_code` and `supported_code` is added on the `User` schema.

```typescript
export type User = {
  user_num: number;
  user_email: string;
  user_name: string;
  user_role: "admin" | "player";
  web_points: number;
  mileage_points: number;
  creator_code: string | null;
  supported_code: string | null;
};
```

## Feature / Process Flow

- A player should be able to apply as a creator.
- A player should be able to support a creator by entering their code.
- A player should be able to only support 1 creator at a time.
- A creator should be able to see the list of commissions

## Pages, Components, and Features

- A new button `Support a Creator` should be added in the `@components/dashboard/header.dashboard.tsx` beside the download button.
  - A dialog should appear with an input field to enter creator's code to support
- A new sidebar nav item should be added, redirect to `/support-a-creator` page
  - A call-to-action `Apply as Creator` should be visible on the in the banner
    - A dialog that contains the application form should appear.
  - The page structure:
    - The image banner with CTAs and Texts
    - A 3-columned layout, how it works:
      - Apply
      - Stream & Share
      - Receive commission awards
    - FAQs
      - WHAT IS SUPPORT-A-CREATOR PROGRAM?
      - HOW DO I RECEIVE COMMISSIONS OR REWARDS?
      - WHO IS ELIGIBLE TO PARTICIPATE?
      - HOW MUCH CAN A STREAMER OR CREATOR RECEIVE?
      - WHEN DO I RECEIVE MY COMMISSIONS?
      - HOW DO I PROPERLY DISCLOSE THAT I'M IN THE PROGRAM?

## Reference

- Use Epic Games' SAC as reference: `https://sac.epicgames.com/overview`
