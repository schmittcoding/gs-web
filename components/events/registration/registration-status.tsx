import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReadOnlyField from "@/components/ui/input/read-only";
import { CLASSES, SCHOOLS } from "@/lib/events/constants";
import { formatDate } from "@/lib/formatters";
import type { EventRegistrationData } from "@/types/event";

type RegistrationStatusProps = {
  registrations: EventRegistrationData[];
};

export function RegistrationStatus({ registrations }: RegistrationStatusProps) {
  if (registrations.length === 0) {
    return (
      <Card>
        <CardContent className="py-6 text-center">
          <p className="text-gray-400">
            You have not registered for this event yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {registrations.map((reg) => {
        const className =
          CLASSES.find((c) => c.chaClass === reg.cha_class)?.name ?? "Unknown";
        const schoolName =
          SCHOOLS.find((s) => s.chaSchool === reg.cha_school)?.name ?? "Unknown";

        const categories: string[] = [];
        if (reg.join_gvg) categories.push("GvG");
        if (reg.join_koth) categories.push("KOTH");

        return (
          <Card key={reg.registration_id} size="sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Registered Character
                <Badge variant="default">{className}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 py-3">
              <ReadOnlyField label="School">{schoolName}</ReadOnlyField>
              <ReadOnlyField label="Categories">
                <div className="flex gap-1.5">
                  {categories.map((cat) => (
                    <Badge key={cat} variant="outline">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </ReadOnlyField>
              <ReadOnlyField label="Registered at">
                {formatDate(reg.registered_at)}
              </ReadOnlyField>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
