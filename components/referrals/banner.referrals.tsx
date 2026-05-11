/* eslint-disable @next/next/no-img-element */

export function ReferralBanner() {
  return (
    <section className="aspect-16/7 md:aspect-16/6 relative max-h-full shape-main">
      <img
        className="object-cover object-top size-full"
        alt="Ran Online GS | Refer and Earn"
        src="https://images.ranonlinegs.com/banners/referral-banner.webp"
      />
      <div className="overlay-bottom bg-linear-to-t from-gray-950 to-transparent to-50% absolute size-full top-0 left-0" />
    </section>
  );
}
