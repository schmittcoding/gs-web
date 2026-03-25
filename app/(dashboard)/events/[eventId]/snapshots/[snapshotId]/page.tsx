type PageProps = {
  params: Promise<{ eventId: string; snapshotId: string }>;
};

export default async function SnapshotDetailPage({ params }: PageProps) {
  const { eventId, snapshotId } = await params;

  return <main className="min-h-0 h-full overflow-auto bg-gray-950 p-4"></main>;
}
