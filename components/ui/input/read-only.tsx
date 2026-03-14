import { cn } from "@/lib/utils";
import { Slot } from "radix-ui";

type ReadOnlyFieldProps = React.ComponentProps<"div"> & {
  label: string;
  children?: string | React.ReactNode;
};

export default function ReadOnlyField({
  className,
  children,
  label,
  ...props
}: ReadOnlyFieldProps) {
  const Comp =
    !children || typeof children === "string" || typeof children === "number"
      ? "p"
      : Slot.Root;

  return (
    <div
      className={cn("space-y-0.5", className)}
      data-slot="read-only-field"
      {...props}
    >
      <p className="text-sm text-gray-400/80" data-slot="read-only-label">
        {label}
      </p>
      <Comp data-slot="read-only-value">
        {typeof children === "number" ? children : children || "-"}
      </Comp>
    </div>
  );
}
