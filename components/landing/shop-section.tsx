import { Flame, ShoppingCart, Sword, Tag } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const HOT_ITEMS = [
  {
    icon: Sword,
    name: "Dark Flame Sword",
    type: "Weapon · Grade S",
    originalPrice: 599,
    salePrice: 299,
    discountPct: 50,
    color: "from-[var(--color-orange-peel-950)]/80",
    iconClass: "text-[var(--color-orange-peel-400)]",
    stock: "Limited",
  },
  {
    icon: Tag,
    name: "Sacred Gate Armor Set",
    type: "Armor · Full Set",
    originalPrice: 999,
    salePrice: 499,
    discountPct: 50,
    color: "from-blue-950/80",
    iconClass: "text-blue-400",
    stock: "48 left",
  },
  {
    icon: Flame,
    name: "EXP Boost Potion ×30",
    type: "Consumable · Stackable",
    originalPrice: 249,
    salePrice: 149,
    discountPct: 40,
    color: "from-violet-950/80",
    iconClass: "text-violet-400",
    stock: "Unlimited",
  },
  {
    icon: Tag,
    name: "Phoenix Legendary Wings",
    type: "Cosmetic · Animated",
    originalPrice: 799,
    salePrice: 399,
    discountPct: 50,
    color: "from-emerald-950/80",
    iconClass: "text-emerald-400",
    stock: "12 left",
  },
]

export function ShopSection() {
  return (
    <section id="shop" className="bg-[var(--color-cod-gray-950)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Section header */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Item Mall
              </span>
            </div>
            <h2 className="font-black text-3xl uppercase tracking-tight text-foreground md:text-4xl">
              Hot in the Armory.
              <br />
              <span className="text-[var(--color-cod-gray-500)]">Limited Time Only.</span>
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-fit gap-1.5 border-[var(--color-cod-gray-700)] text-xs uppercase tracking-widest hover:border-primary/40"
          >
            <ShoppingCart size={14} data-icon="inline-start" />
            Browse Item Mall
          </Button>
        </div>

        {/* Items grid */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {HOT_ITEMS.map(({ icon: Icon, name, type, originalPrice, salePrice, discountPct, color, iconClass, stock }) => (
            <div
              key={name}
              className="group flex flex-col overflow-hidden rounded-lg border border-[var(--color-cod-gray-800)] bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl"
            >
              {/* Item visual */}
              <div
                className={cn(
                  "relative flex h-36 items-center justify-center bg-gradient-to-b to-transparent",
                  color
                )}
              >
                {/* Sale badge */}
                <Badge className="absolute left-3 top-3 rounded text-[10px] font-black uppercase tracking-wider">
                  -{discountPct}%
                </Badge>

                {/* Stock indicator */}
                <span className="absolute right-3 top-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-cod-gray-500)]">
                  {stock}
                </span>

                <Icon
                  size={56}
                  weight="duotone"
                  className={cn(
                    "transition-transform duration-300 group-hover:scale-110",
                    iconClass
                  )}
                />
              </div>

              {/* Details */}
              <div className="flex flex-1 flex-col gap-4 p-5">
                <div>
                  <h3 className="font-bold text-sm text-foreground leading-snug">{name}</h3>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-cod-gray-500)]">
                    {type}
                  </p>
                </div>

                {/* Pricing */}
                <div className="mt-auto flex items-end justify-between">
                  <div>
                    <div className="text-[10px] text-[var(--color-cod-gray-600)] line-through">
                      ₱{originalPrice.toLocaleString()}
                    </div>
                    <div className="font-black text-xl text-primary leading-none">
                      ₱{salePrice.toLocaleString()}
                    </div>
                  </div>
                  <Button
                    size="icon-sm"
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label={`Add ${name} to cart`}
                  >
                    <ShoppingCart />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Urgency banner */}
        <div className="mt-6 flex items-center justify-center gap-3 rounded-lg border border-primary/20 bg-primary/5 py-4 px-6 text-center">
          <Flame size={16} className="text-primary" weight="fill" />
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-cod-gray-400)]">
            Flash sale ends in{" "}
            <span className="ran-flicker font-black text-primary">47:32:08</span>
            {" "}— don&apos;t miss out
          </p>
          <Flame size={16} className="text-primary" weight="fill" />
        </div>
      </div>
    </section>
  )
}
