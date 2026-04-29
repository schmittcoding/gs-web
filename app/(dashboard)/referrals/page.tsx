import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ReferralsPage() {
  return (
    <main className="h-full overflow-hidden">
      <section className="grid grid-cols-[max-content_1fr] h-full gap-4">
        <section className="p-6">
          <Card className="w-81.25" variant="primary">
            <CardHeader>
              <CardTitle className="text-lg">Refer your friends</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <section className="p-8 w-full bg-gray-900"></section>
            </CardContent>
          </Card>
        </section>
      </section>
    </main>
  );
}
