"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { IconChevronDown } from "@tabler/icons-react";
import {
  ComponentProps,
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type GameSelectContextValue = {
  compact?: boolean;
  value: string;
  onValueChange: (value: string) => void;
  close: () => void;
  selectedItemRef: React.RefObject<HTMLButtonElement | null>;
};

const GameSelectContext = createContext<GameSelectContextValue | null>(null);

function useGameSelect() {
  const ctx = useContext(GameSelectContext);
  if (!ctx)
    throw new Error(
      "GameSelect compound components must be used within <GameSelect>.",
    );
  return ctx;
}

type GameSelectProps = PropsWithChildren<{
  compact?: boolean;
  value: string;
  onValueChange: (value: string) => void;
}>;

function GameSelect({
  children,
  compact = false,
  value,
  onValueChange,
}: GameSelectProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const selectedItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        selectedItemRef.current?.scrollIntoView({ block: "nearest" });
      });
    }
  }, [open]);

  return (
    <GameSelectContext.Provider
      value={{ compact, value, onValueChange, close, selectedItemRef }}
    >
      <Popover open={open} onOpenChange={setOpen}>
        {children}
      </Popover>
    </GameSelectContext.Provider>
  );
}

/**
 * Trigger button. Appends a chevron that rotates when the popover is open.
 *
 * Sizing and alignment are intentionally left to the consumer via `className`:
 *   - Compact / single-line: add `items-center h-9 px-3 w-40`
 *   - Rich / multi-line:     add `items-start px-5 py-3 w-full`
 */
function GameSelectTrigger({
  className,
  children,
  ...props
}: ComponentProps<"button">) {
  return (
    <PopoverTrigger asChild>
      <button
        className={cn(
          "flex gap-3 bg-gray-800! shape-main shape-no-hover border border-gray-700 px-4 relative",
          "before:absolute before:bottom-[-1] before:left-[-1] before:size-2 before:border-b-2 before:border-l-2 before:border-gray-700",
          "after:absolute after:top-[-1] after:right-[-1] after:size-2 after:border-t-2 after:border-r-2 after:border-gray-700",
          "hover:border-gray-600 group cursor-pointer text-left",
          "transition-colors duration-200 outline-none",
          className,
        )}
        {...props}
      >
        <div className="flex-1 min-w-0">{children}</div>
        <IconChevronDown className="size-5 shrink-0 opacity-50 transition-all duration-300 group-data-[state=open]:rotate-180" />
      </button>
    </PopoverTrigger>
  );
}

function GameSelectContent({
  className,
  align = "start",
  children,
  ...props
}: ComponentProps<typeof PopoverContent>) {
  return (
    <PopoverContent
      align={align}
      side="bottom"
      className={cn(
        "max-h-87.5 shape-main w-max overflow-auto divide-y gap-0 divide-gray-800 p-0",
        className,
      )}
      {...props}
    >
      {children}
    </PopoverContent>
  );
}

type GameSelectItemProps = PropsWithChildren<{
  value: string;
  className?: string;
}>;

function GameSelectItem({ value, children, className }: GameSelectItemProps) {
  const {
    compact,
    value: selectedValue,
    onValueChange,
    close,
    selectedItemRef,
  } = useGameSelect();

  const isSelected = value === selectedValue;

  return (
    <button
      ref={isSelected ? selectedItemRef : undefined}
      className={cn(
        "w-full pt-4 pl-5 pr-3 not-last:pb-4 last:pb-3",
        "text-left transition-colors duration-150",
        "data-[active=true]:bg-gray-800 hover:bg-gray-800/50",
        "data-[compact=true]:pb-2.5!",
        className,
      )}
      data-compact={compact}
      data-active={isSelected}
      onClick={() => {
        onValueChange(value);
        close();
      }}
    >
      {children}
    </button>
  );
}

export { GameSelect, GameSelectContent, GameSelectItem, GameSelectTrigger };
