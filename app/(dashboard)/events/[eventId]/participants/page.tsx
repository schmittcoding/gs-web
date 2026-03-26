import { GuildParticipantsTab } from "@/components/events/participants/guild.participants";
import { KothParticipantsTab } from "@/components/events/participants/koth.participants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentEvent } from "../../actions";

type PageProps = {
  params: Promise<{ eventId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { eventId } = await params;
  const { event } = await getCurrentEvent();

  if (!event || event.event_id !== eventId) {
    return (
      <main className="min-h-0 size-full bg-gray-950 relative overflow-auto p-4">
        <section className="container mx-auto flex items-center justify-center h-full">
          <p className="text-gray-400 text-lg">No active event at this time.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-0 h-full overflow-auto bg-gray-950 p-4">
      <section className="space-y-4 flex flex-col h-max">
        <Tabs
          className="gap-4 lg:h-full lg:grid lg:grid-rows-[auto_1fr] lg:overflow-hidden"
          defaultValue="gvg"
        >
          <section className="max-md:mb-8 flex max-md:flex-col gap-4 justify-between w-full">
            <div className="space-y-1 shrink-0">
              <h2 className="text-2xl font-bold text-accent">
                {event.event_name}
              </h2>
              <p className="text-sm text-gray-400">
                Leaderboard standings across all completed matches
              </p>
            </div>
            <TabsList
              variant="line"
              className="mx-auto md:mx-0 justify-start w-max overflow-x-auto shrink-0"
            >
              <TabsTrigger value="gvg">Guild vs Guild</TabsTrigger>
              <TabsTrigger value="koth">KOTH</TabsTrigger>
            </TabsList>
          </section>

          <TabsContent value="gvg">
            <GuildParticipantsTab eventId={eventId} />
          </TabsContent>
          <TabsContent value="koth">
            <KothParticipantsTab eventId={eventId} />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
