import type { Icon as TablerIcon } from "@tabler/icons-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type IconProps = React.SVGProps<SVGSVGElement> & {
  /** Width and height in px. Mirrors Tabler's `size` prop. */
  size?: string | number;
  /** Stroke width. Mirrors Tabler's `stroke` prop. */
  stroke?: string | number;
  /** Stroke color. Defaults to `currentColor`. */
  color?: string;
};

/**
 * Factory that wraps a raw SVG subtree into a component matching the
 * Tabler `Icon` interface, so custom icons are drop-in replacements
 * anywhere a Tabler icon is accepted.
 *
 * @param svgContent - The inner JSX of the SVG (paths, circles, etc.)
 * @param viewBox    - The SVG viewBox string. Defaults to "0 0 24 24".
 * @param displayName - Optional display name shown in React DevTools.
 *
 * @example
 * export const IconCustomBrand = createIcon(
 *   <path d="M12 2L2 7l10 5 10-5-10-5z" />,
 *   "0 0 24 24",
 *   "IconCustomBrand"
 * )
 */
function createIcon(
  svgContent: React.ReactNode,
  viewBox = "0 0 24 24",
  displayName?: string,
): TablerIcon {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>(
    (
      {
        size = 24,
        // stroke = 2,
        color = "currentColor",
        className,
        ...props
      },
      ref,
    ) => (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={viewBox}
        // fill="none"
        // stroke={color}
        // strokeWidth={stroke}
        // strokeLinecap="round"
        // strokeLinejoin="round"
        fill={color}
        className={cn("tabler-icon", className)}
        {...props}
      >
        {svgContent}
      </svg>
    ),
  );

  Icon.displayName = displayName ?? "CustomIcon";

  return Icon as unknown as TablerIcon;
}

export { createIcon };
export type { IconProps };
