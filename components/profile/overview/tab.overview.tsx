import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconClock, IconDeviceGamepad2, IconSword } from "@tabler/icons-react";

export default function ProfileOverviewTab() {
  return (
    <div className="space-y-4">
      <section className="grid gap-4 sm:grid-cols-5">
        <Card className="p-0 pb-4 shape-main">
          <CardHeader className="px-4 py-3 bg-gray-800 shape-main">
            <CardTitle className="flex items-center gap-2 text-sm">
              <IconClock className="text-muted-foreground size-4" />
              Total Play Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tabular-nums">0h 0m</p>
            <p className="text-xs text-muted-foreground">
              Across all characters
            </p>
          </CardContent>
        </Card>
        <Card className="p-0 pb-4 shape-main">
          <CardHeader className="px-4 py-3 bg-gray-800 shape-main">
            <CardTitle className="flex items-center gap-2 text-sm">
              <IconDeviceGamepad2 className="text-muted-foreground size-4" />
              Characters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tabular-nums">0</p>
            <p className="text-xs text-muted-foreground">
              Total characters created
            </p>
          </CardContent>
        </Card>
      </section>

      <Card className="p-0 pb-4 shape-main">
        <CardHeader className="px-4 py-3 bg-gray-800 shape-main">
          <CardTitle className="flex items-center gap-2 text-sm">
            <IconSword className="text-muted-foreground size-4" />
            Character List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState message="No characters yet" />
        </CardContent>
      </Card>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-sm text-muted-foreground">
      <p>{message}</p>
    </div>
  );
}
