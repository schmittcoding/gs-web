import { Card, CardContent } from "@/components/ui/card";

export default function ComingSoonWidget() {
  return <Card variant='destructive'>
    <CardContent className="bg-[linear-gradient(to_bottom_right,var(--color-carnation-600),var(--color-carnation-700),var(--color-carnation-700),var(--color-carnation-600))] flex flex-col items-center justify-center size-full">
      <span className="text-(--color-carnation-100) uppercase font-semibold tracking-wider text-xl">Featured Shop</span>
      <span className="text-(--color-carnation-100)/70 text-sm">Coming Soon</span>
    </CardContent>
  </Card>;
}
