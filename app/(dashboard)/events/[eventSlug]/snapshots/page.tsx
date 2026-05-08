import { EventSnapshotProvider } from "@/components/events/(eventSlug)/tabs/event-snapshots/snapshot-context.events";
import { SnapshotFilters } from "@/components/events/(eventSlug)/tabs/event-snapshots/snapshot-filters.events";
import { SnapshotSelect } from "@/components/events/(eventSlug)/tabs/event-snapshots/snapshot-select.events";
import { getSnapshots } from "./actions";
import EventSnapshotLeaderboards from "@/components/events/(eventSlug)/tabs/event-snapshots/snapshot-leaderboards.events";

type PageProps = {
  params: Promise<{ eventSlug: string }>;
};

export default async function SnapshotPage({ params }: PageProps) {
  const { eventSlug } = await params;
  const { snapshots } = await getSnapshots(eventSlug);

  return (
    <EventSnapshotProvider snapshots={snapshots}>
      <section className="grid grid-cols-[max-content_1fr] gap-4 pt-4">
        <section className="space-y-4 w-100">
          <SnapshotSelect />
          <SnapshotFilters />
        </section>
        <section className="">
          <EventSnapshotLeaderboards />
        </section>
      </section>
    </EventSnapshotProvider>
  );
}
