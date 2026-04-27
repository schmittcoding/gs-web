import { GuildParticipantsTab } from "@/components/events/participants/guild.participants";
import { KothParticipantsTab } from "@/components/events/participants/koth.participants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ eventSlug: string }>;
};

export default async function ParticipantsPage({ params }: PageProps) {
  const { eventSlug } = await params;

  return (
    <Tabs defaultValue="gvg">
      <TabsList>
        <TabsTrigger value="gvg">Guild vs Guild</TabsTrigger>
        <TabsTrigger value="koth">KOTH</TabsTrigger>
      </TabsList>
      <TabsContent value="gvg">
        <GuildParticipantsTab eventId={eventSlug} />
      </TabsContent>
      <TabsContent value="koth">
        <KothParticipantsTab eventId={eventSlug} />
      </TabsContent>
    </Tabs>
  );
}
