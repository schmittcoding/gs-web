/* eslint-disable @next/next/no-img-element */
"use client";

import GameButton from "@/components/common/game.button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export type PromoBannerSlide = {
  src: string;
  alt: string;
  /** Optional click-through link */
  href?: string;
  /** Primary headline rendered over the image */
  label?: string;
  /** Secondary meta line rendered above the label */
  sublabel?: string;
};

type PromoBannerWidgetProps = {
  slides: PromoBannerSlide[];
  /** Auto-advance interval in ms. Default: 4000 */
  interval?: number;
  className?: string;
};

export default function PromoBannerWidget({
  slides,
  interval = 4000,
  className,
}: PromoBannerWidgetProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const goTo = useCallback(
    (index: number) => setCurrent(((index % count) + count) % count),
    [count],
  );
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    if (paused || count <= 1) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % count), interval);
    return () => clearInterval(id);
  }, [paused, interval, count]);

  if (count === 0) return null;

  const slideWidth = 100 / count;

  return (
    <Card className={cn("h-full min-h-64", className)}>
      <div
        role="region"
        aria-label="Promotional banner"
        className="relative flex-1 min-h-0 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {/* Slides track — translateX shifts by one viewport-width per step */}
        <div
          aria-live="polite"
          className="flex h-full"
          style={{
            width: `${count * 100}%`,
            transform: `translateX(calc(-${current} * ${slideWidth}%))`,
            transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {slides.map((slide, i) => {
            const itemCls =
              "relative h-full overflow-hidden flex-shrink-0 block";
            const itemStyle = { width: `${slideWidth}%` };

            const inner = (
              <>
                <img
                  src={slide.src}
                  alt={slide.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Gradient overlays for legibility */}
                <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/30 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-linear-to-tr from-primary/5 to-transparent pointer-events-none" />

                {(slide.label || slide.sublabel) && (
                  <div className="absolute bottom-9 left-4 space-y-0.5">
                    {slide.sublabel && (
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                        {slide.sublabel}
                      </p>
                    )}
                    {slide.label && (
                      <p className="text-base font-black uppercase tracking-tight">
                        {slide.label}
                      </p>
                    )}
                  </div>
                )}
              </>
            );

            return slide.href ? (
              <Link
                key={i}
                href={slide.href}
                className={itemCls}
                style={itemStyle}
                aria-label={slide.label ?? slide.alt}
                tabIndex={i === current ? 0 : -1}
              >
                {inner}
              </Link>
            ) : (
              <div
                key={i}
                className={itemCls}
                style={itemStyle}
                aria-hidden={i !== current}
              >
                {inner}
              </div>
            );
          })}
        </div>

        {/* Prev / Next arrow controls */}
        {count > 1 && (
          <>
            <GameButton
              onClick={prev}
              size="icon"
              aria-label="Previous slide"
              className="absolute left-2 top-1/2 -translate-y-1/2 size-max min-w-0! p-2 aspect-square"
              variant="outline"
            >
              <IconChevronLeft className="size-6" />
            </GameButton>
            <GameButton
              onClick={next}
              size="icon"
              aria-label="Next slide"
              className="absolute right-2 top-1/2 -translate-y-1/2 size-max min-w-0! p-2 aspect-square"
              variant="outline"
            >
              <IconChevronRight className="size-6" />
            </GameButton>
          </>
        )}

        {/* Dot navigation — pill expands on active */}
        {count > 1 && (
          <div
            className="absolute bottom-3 right-3 flex items-center gap-1.5"
            role="tablist"
            aria-label="Banner slides"
          >
            {slides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1 rounded-full transition-all duration-300 focus-visible:outline-none",
                  i === current
                    ? "w-4 bg-primary"
                    : "w-1.5 bg-gray-700 hover:bg-gray-500",
                )}
              />
            ))}
          </div>
        )}

        {/* Ambient glow — top-right corner */}
        <div
          className="absolute -right-16 -top-16 h-75 w-75 rounded-full opacity-[0.05] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, var(--color-orange-peel-500), transparent 70%)",
          }}
        />

        {/* Brand accent line — bottom-left */}
        <div className="absolute bottom-0 left-0 h-0.5 w-1/3 bg-linear-to-r from-primary to-transparent pointer-events-none ran-sweep-line" />
      </div>
    </Card>
  );
}
