import { getSession } from "@/lib/auth/session.auth";
import { fetcherPrivate } from "@/lib/fetcher";
import { NextResponse } from "next/server";

type Params = {
  params: Promise<{ eventId: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { eventId } = await params;
  const res = await fetcherPrivate(`/v1/events/${eventId}/match/status`);

  if (!res.ok) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch match status" },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
