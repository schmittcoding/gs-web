/* eslint-disable @next/next/no-img-element */
import { EventsGrid } from "@/components/events/events-grid.events";
import { Card } from "@/components/ui/card";
import { Suspense } from "react";

export default async function EventsPage() {
  return (
    <main className="min-h-0 size-full relative overflow-auto p-4 space-y-4">
      <Card className="w-full h-48 sm:h-64 md:h-87.5 overflow-hidden relative">
        <img
          src="/images/background/bg-tournament.png"
          alt="Ran Online GS | Tournament"
          className="object-cover size-full object-center"
        />
        <div className="absolute size-full top-0 left-0 bg-linear-to-t from-background/70 to-transparent" />
      </Card>
      <section className="h-max pt-4 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <Suspense>
            <EventsGrid />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
