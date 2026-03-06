import { IconLoader2 } from "@tabler/icons-react";

export default function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <IconLoader2 className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
}
