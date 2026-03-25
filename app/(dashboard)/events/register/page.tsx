import { RegistrationForm } from "@/components/events/registration/registration-form";
import { RegistrationStatus } from "@/components/events/registration/registration-status";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/formatters";
import { IconArrowLeft } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import {
  getCurrentEvent,
  getEligibleCharacters,
  getRegistrationStatus,
} from "../actions";

export const metadata: Metadata = {
  title: "Event Registration",
  description: "Register your character for the current Ran Online GS event.",
  robots: { index: false, follow: false },
};

export default async function RegisterPage() {
  await connection();

  const { event } = await getCurrentEvent();

  if (!event) {
    return (
      <main className="min-h-0 size-full bg-gray-950 relative overflow-auto p-4">
        <section className="container mx-auto flex items-center justify-center h-full">
          <p className="text-gray-400 text-lg">No active event at this time.</p>
        </section>
      </main>
    );
  }

  const registrationClosed = event.registration_close <= new Date();

  const [{ registrations }, { characters }] = await Promise.all([
    getRegistrationStatus(event.event_id),
    getEligibleCharacters(event.event_id),
  ]);

  return (
    <main className="min-h-0 size-full bg-gray-950 relative overflow-auto p-4">
      <section className="w-full max-w-2xl mx-auto space-y-4">
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-foreground transition-colors"
        >
          <IconArrowLeft className="size-4" />
          Back to event
        </Link>

        <h2 className="text-2xl font-bold">
          Register for {event.event_name}
        </h2>

        {registrationClosed ? (
          <Card variant="destructive">
            <CardContent className="py-6">
              <p className="text-destructive font-bold text-center">
                Registration closed on{" "}
                {formatDate(event.registration_close)}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              Registration open until{" "}
              <span className="text-gray-300 font-medium">
                {formatDate(event.registration_close)}
              </span>
            </p>

            {registrations.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  Current Registration
                </h3>
                <RegistrationStatus registrations={registrations} />
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle>
                  {registrations.length > 0
                    ? "Update Registration"
                    : "New Registration"}
                </CardTitle>
              </CardHeader>
              <RegistrationForm
                eventId={event.event_id}
                minLevel={event.min_level}
                characters={characters}
                existingRegistrations={registrations}
              />
            </Card>
          </div>
        )}
      </section>
    </main>
  );
}
