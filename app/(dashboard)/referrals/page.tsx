import { ReferralBanner } from "@/components/referrals/banner.referrals";
import { ReferralCodeDisplay } from "@/components/referrals/code-display.referrals";
import { ReferralEarnings } from "@/components/referrals/earnings.referrals";
import { Card, CardContent } from "@/components/ui/card";
import { getEligibleReferralCharacters, getReferralDetails } from "./actions";

export default async function ReferralsPage() {
  const details = await getReferralDetails();

  const characters =
    details?.can_refer && !details?.referral_code
      ? await getEligibleReferralCharacters()
      : [];

  return (
    <main className="h-max p-4 space-y-4 md:pl-0 md:pt-4 md:pb-6 md:pr-6">
      <ReferralBanner />

      {/* Main panel */}
      <section className="container relative xl:-mt-70 -mt-18 mx-auto xl:max-w-7xl max-w-6xl">
        <Card
          wrapperProps={{
            className:
              "ran-concrete before:absolute before:top-0 before:left-0 before:size-full before:bg-gray-950/80",
          }}
        >
          <CardContent className="p-4 md:p-6 xl:p-8 space-y-8">
            <section className="flex gap-6 flex-col lg:flex-row">
              <ReferralCodeDisplay
                initialCode={details?.referral_code ?? null}
                canRefer={details?.can_refer ?? false}
                characters={characters}
              />
              <ReferralEarnings referralUsage={details?.referral_usage ?? 0} />
            </section>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
