import { ClassesSection } from "@/components/landing/classes-section"
import { ContentSection } from "@/components/landing/content-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { LandingFooter } from "@/components/landing/footer"
import { HeroSection } from "@/components/landing/hero-section"
import { LandingNav } from "@/components/landing/nav"
import { NewsSection } from "@/components/landing/news-section"
import { ShopSection } from "@/components/landing/shop-section"

export default function Page() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <LandingNav />
      <HeroSection />
      <FeaturesSection />
      <ClassesSection />
      <ContentSection />
      <NewsSection />
      <ShopSection />
      <LandingFooter />
    </div>
  )
}
