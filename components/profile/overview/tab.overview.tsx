import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconClock, IconDeviceGamepad2, IconSword } from "@tabler/icons-react";

export default function ProfileOverviewTab() {
  return (
    <div className="space-y-4">
      <section className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>
              <IconClock className="text-muted-foreground size-4" />
              Total Play Time
            </CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <p className="text-2xl font-bold tabular-nums">0h 0m</p>
            <p className="text-xs text-muted-foreground">
              Across all characters
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <IconDeviceGamepad2 className="text-muted-foreground size-4" />
              Characters
            </CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <p className="text-2xl font-bold tabular-nums">0</p>
            <p className="text-xs text-muted-foreground">
              Total characters created
            </p>
          </CardContent>
        </Card>
      </section>
      <Card>
        <CardHeader>
          <CardTitle>
            <IconSword className="text-muted-foreground size-4" />
            Character List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState message="Coming soon..." />
        </CardContent>
      </Card>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-xs text-muted-foreground">
      <p>{message}</p>
    </div>
  );
}
