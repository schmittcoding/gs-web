/* eslint-disable @next/next/no-img-element */
import { StreamerHeroSection } from "@/components/streamer/hero-section.streamer";
import { CommissionsTable } from "@/components/streamer/commissions-table.streamer";
import { StreamerSummaryCard } from "@/components/streamer/summary-card.streamer";
import { requireSession } from "@/lib/auth/session.auth";
import {
  getStreamerApplication,
  getStreamerCommissions,
  getStreamerSummary,
} from "./actions";
import {
  IconAffiliateFilled,
  IconBroadcast,
  IconCoinFilled,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";

const HOW_IT_WORKS = [
  {
    icon: IconAffiliateFilled,
    step: "01",
    title: "Apply",
    description:
      "Submit your application with your social media links. Our team reviews every submission and approves streamers who are actively building a community.",
  },
  {
    icon: IconBroadcast,
    step: "02",
    title: "Stream & Share",
    description:
      "Once approved, you receive a unique streamer code. Share it in your streams, videos, and posts. Encourage your audience to use your code when recharging.",
  },
  {
    icon: IconCoinFilled,
    step: "03",
    title: "Receive Awards",
    description:
      "Earn commissions automatically for every transaction made using your code. Track your earnings and supporters in real time from your streamer dashboard.",
  },
];

const FAQS = [
  {
    q: "WHAT IS SUPPORT-A-STREAMER PROGRAM?",
    a: "The Support-a-Streamer program is an affiliate marketing initiative for streamers and social media content creators. It gives streamers the opportunity to receive commissions by creating or streaming content for Ran Online GS. We recognize how important streamers have been to our success, so we built this program to share in that success.",
  },
  {
    q: "HOW DO I RECEIVE COMMISSIONS OR REWARDS?",
    a: "Once your streamer application is approved, you'll receive a unique streamer code. Share this code with your audience. When your supporters enter your code and make transactions on Ran Online GS, you'll automatically earn a commission that is credited to your streamer account.",
  },
  {
    q: "WHO IS ELIGIBLE TO PARTICIPATE?",
    a: "Any active Ran Online GS player with a verifiable online presence — such as a YouTube channel, Facebook page, Twitch stream, or TikTok account — is eligible to apply. Applications are reviewed individually and approved based on content quality, audience size, and community engagement.",
  },
  {
    q: "HOW MUCH CAN A STREAMER RECEIVE?",
    a: "Commission rates are determined upon approval of your application and may vary based on your platform and reach. Specific rates will be detailed in your approval notification. We are committed to offering competitive rates that reflect your contribution to the community.",
  },
  {
    q: "WHEN DO I RECEIVE MY COMMISSIONS?",
    a: "Commissions are tracked and recorded in real time. You can view your earnings at any time in the Commission History section of your streamer dashboard. Payouts are processed on a regular schedule as determined by the Ran Online GS team.",
  },
  {
    q: "HOW DO I PROPERLY DISCLOSE THAT I'M IN THE PROGRAM?",
    a: "You are required to disclose your participation in the Support-a-Streamer program whenever you are creating content that references it. A simple disclosure such as 'Use streamer code [YOUR CODE] on Ran Online GS' is sufficient. Transparency with your audience is an important part of the program.",
  },
];

export default async function SupportAStreamerPage() {
  const session = await requireSession();
  const user = session.user;
  const isStreamer = !!user.creator_code;

  const [applicationResult, commissionsResult, summaryResult] = await Promise.all([
    !isStreamer
      ? getStreamerApplication()
      : Promise.resolve({ success: false, data: null }),
    isStreamer
      ? getStreamerCommissions(1, 10)
      : Promise.resolve({ success: false, data: [], total: 0 }),
    isStreamer
      ? getStreamerSummary()
      : Promise.resolve({ success: false, data: null }),
  ]);

  return (
    <main className="min-h-0 size-full relative overflow-auto p-4 space-y-6 pb-10">
      <StreamerHeroSection
        application={applicationResult.data}
        isStreamer={isStreamer}
      />

      <section className="space-y-3">
        <div className="flex items-center gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
            How It Works
          </p>
          <div className="h-px flex-1 bg-gray-800" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {HOW_IT_WORKS.map(({ icon: Icon, step, title, description }) => (
            <div
              key={step}
              className="shape-main border border-gray-800 bg-gray-900/50 p-5 space-y-3 relative overflow-hidden"
            >
              <div
                className="absolute -right-8 -top-8 size-24 opacity-[0.06]"
                style={{
                  background:
                    "radial-gradient(circle, var(--color-orange-peel-500), transparent 70%)",
                }}
              />
              <div className="flex items-center gap-3">
                <div className="size-9 shape-main bg-primary/10 flex items-center justify-center">
                  <Icon className="size-5 text-primary" />
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">
                  Step {step}
                </p>
              </div>
              <p className="font-black uppercase tracking-tight text-base">{title}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
              <div className="absolute bottom-0 left-0 h-0.5 w-1/2 bg-linear-to-r from-primary/40 to-transparent" />
            </div>
          ))}
        </div>
      </section>

      {isStreamer && (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
              Your Streamer Stats
            </p>
            <div className="h-px flex-1 bg-gray-800" />
          </div>
          {summaryResult.data && (
            <StreamerSummaryCard summary={summaryResult.data} />
          )}
          <CommissionsTable
            initialData={commissionsResult.data}
            initialTotal={commissionsResult.total}
          />
        </section>
      )}

      <section className="space-y-3">
        <div className="flex items-center gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
            Frequently Asked Questions
          </p>
          <div className="h-px flex-1 bg-gray-800" />
        </div>
        <div className="space-y-2">
          {FAQS.map(({ q, a }) => (
            <details
              key={q}
              className="group shape-main border border-gray-800 bg-gray-900/40 overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none hover:bg-gray-800/30 transition-colors">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-200">
                  {q}
                </span>
                <IconPlus className="size-4 text-primary shrink-0 group-open:hidden" />
                <IconMinus className="size-4 text-primary shrink-0 hidden group-open:block" />
              </summary>
              <div className="px-5 pb-4 pt-1">
                <p className="text-xs text-gray-400 leading-relaxed">{a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
