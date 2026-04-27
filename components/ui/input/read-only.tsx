import { cn } from "@/lib/utils";
import { Slot } from "radix-ui";

type ReadOnlyFieldProps = React.ComponentProps<"div"> & {
  label: string;
  children?: string | React.ReactNode;
  size?: "default" | "sm";
};

export default function ReadOnlyField({
  className,
  children,
  label,
  size = "default",
  ...props
}: ReadOnlyFieldProps) {
  const Comp =
    !children || typeof children === "string" || typeof children === "number"
      ? "p"
      : Slot.Root;

  return (
    <div
      className={cn("space-y-0.5 group", className)}
      data-slot="read-only-field"
      data-size={size}
      {...props}
    >
      <p
        className="text-sm text-gray-400/80 group-data-[size=sm]:text-xs"
        data-slot="read-only-label"
      >
        {label}
      </p>
      <Comp data-slot="read-only-value">
        {typeof children === "number" ? children : children || "-"}
      </Comp>
    </div>
  );
}
