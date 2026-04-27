import { Skeleton } from "@/components/ui/skeleton";

export function MatchScheduleSkeleton() {
  return (
    <div className="rounded-sm overflow-hidden p-6 space-y-4 shape-main border border-gray-800">
      <section className="flex gap-4 justify-center mb-8">
        <div className="flex gap-2 divide-x divide-gray-700">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1 px-2">
              <Skeleton className="h-8 w-10" />
              <Skeleton className="h-3 w-10" />
            </div>
          ))}
        </div>
      </section>
      <section className="flex justify-between gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-1">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </section>
    </div>
  );
}

export function EventScheduleSkeleton() {
  return (
    <section className="space-y-8 pt-4">
      <Skeleton className="h-7 w-40" />
      <section className="space-y-4">
        <Skeleton className="h-3 w-16" />
        {Array.from({ length: 2 }).map((_, i) => (
          <MatchScheduleSkeleton key={i} />
        ))}
      </section>
      <section className="space-y-4">
        <Skeleton className="h-3 w-20" />
        {Array.from({ length: 3 }).map((_, i) => (
          <MatchScheduleSkeleton key={i} />
        ))}
      </section>
    </section>
  );
}

function GuildLeaderboardRowSkeleton() {
  return (
    <div className="relative flex items-center gap-10 px-8 py-3 max-lg:py-6 max-lg:flex-col shape-main w-full bg-gray-900/40">
      <section className="flex flex-1 w-full max-lg:pb-4 items-center max-lg:justify-center gap-10">
        <section className="flex items-center gap-2">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="h-6 w-8" />
        </section>
        <div className="space-y-1">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-5 w-32" />
        </div>
      </section>
      <section className="flex gap-10 flex-wrap justify-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-7 w-12" />
          </div>
        ))}
      </section>
    </div>
  );
}

export function EventGuildLeaderboardSkeleton() {
  return (
    <section className="space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <GuildLeaderboardRowSkeleton key={i} />
      ))}
    </section>
  );
}

function ClassLeaderboardRowSkeleton() {
  return (
    <div className="relative flex items-center gap-10 px-8 py-3 max-lg:py-6 max-lg:flex-col shape-main w-full bg-gray-900/40">
      <section className="flex flex-1 w-full max-lg:pb-4 items-center max-lg:justify-center gap-10">
        <section className="flex items-center justify-center gap-2 w-max xl:w-20">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="h-6 w-8" />
        </section>
        <section className="flex gap-2 items-center w-max xl:w-80">
          <Skeleton className="size-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-5 w-28" />
          </div>
        </section>
        <div className="space-y-1">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-5 w-24" />
        </div>
      </section>
      <section className="flex gap-10 flex-wrap justify-center">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-7 w-12" />
          </div>
        ))}
      </section>
    </div>
  );
}

export function EventClassLeaderboardSkeleton() {
  return (
    <section className="space-y-4 mt-4 divide-y divide-gray-800">
      <nav className="flex flex-wrap gap-2 pb-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-sm" />
        ))}
      </nav>
      <section className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ClassLeaderboardRowSkeleton key={i} />
        ))}
      </section>
    </section>
  );
}
