import { getCharacters } from "@/app/(dashboard)/profile/actions";
import { ProfileCharacters } from "@/components/profile/overview/characters.overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconDeviceGamepad2 } from "@tabler/icons-react";

export default async function ProfileOverviewTab() {
  const initialCharacters = await getCharacters(1, 10);

  return (
    <div className="space-y-4">
      <section className="grid grid-cols-4 gap-4">
        {/* <Card>
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
        </Card> */}
        <Card>
          <CardHeader>
            <CardTitle>
              <IconDeviceGamepad2 className="text-muted-foreground size-4" />
              Characters
            </CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <p className="text-2xl font-bold tabular-nums">
              {initialCharacters.total_items}
            </p>
            <p className="text-xs text-muted-foreground">
              Total characters created
            </p>
          </CardContent>
        </Card>
      </section>
      <ProfileCharacters initialData={initialCharacters} />
    </div>
  );
}
