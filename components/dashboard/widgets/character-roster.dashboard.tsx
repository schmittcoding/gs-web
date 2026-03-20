/* eslint-disable @next/next/no-img-element */
import { getCharacters } from "@/app/(dashboard)/profile/actions";
import {
  getClassName,
  getSchoolColor,
  getSchoolName,
} from "@/components/rankings/types.rankings";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { IconDeviceGamepad2 } from "@tabler/icons-react";
import Link from "next/link";

function CharacterRosterShell({
  children,
  total,
}: {
  children: React.ReactNode;
  total?: number;
}) {
  return (
    <div className="col-span-1 md:col-span-3 lg:col-span-4 relative overflow-hidden shape-main border border-gray-800 bg-gray-950">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800 bg-gray-900/50">
        <div className="flex items-center gap-2">
          <IconDeviceGamepad2 className="size-4 text-primary" />
          <span className="text-sm font-bold uppercase tracking-wider">
            Characters
          </span>
        </div>
        <Link
          href="/profile"
          className="text-xs font-semibold text-primary hover:underline uppercase tracking-wider"
        >
          {total !== undefined ? `View All (${total})` : "View All"}
        </Link>
      </div>
      {children}
    </div>
  );
}

function CharacterRosterSkeleton() {
  return (
    <CharacterRosterShell>
      <div className="p-2 space-y-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-sm" />
        ))}
      </div>
    </CharacterRosterShell>
  );
}

async function CharacterRoster() {
  const characters = await getCharacters(1, 50);

  const sorted = [...characters.data]
    .filter((c) => c.cha_deleted === 0)
    .sort((a, b) => b.cha_level - a.cha_level)
    .slice(0, 5);

  return (
    <CharacterRosterShell total={characters.total_items}>
      <div className="p-2">
        {sorted.length === 0 ? (
          <p className="text-sm text-gray-500 py-8 text-center">
            No characters found
          </p>
        ) : (
          <div className="grid gap-1.5">
            {sorted.map((char) => (
              <div
                key={char.cha_num}
                className={cn(
                  "group/row relative flex items-center gap-3 px-3 py-2.5 rounded-sm overflow-hidden",
                  "hover:bg-gray-900/80 transition-colors duration-200",
                  char.cha_online === 1 && "bg-green-500/3",
                )}
              >
                {char.cha_online === 1 && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-green-400" />
                )}

                <div className="relative shrink-0">
                  <img
                    className="size-9 rounded-full ring-1 ring-gray-800"
                    alt={getClassName(char.cha_class)}
                    src={`https://images.ranonlinegs.com/assets/emblems/${getClassName(char.cha_class).toLowerCase()}.webp`}
                  />
                  {char.cha_online === 1 && (
                    <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-green-400 ring-2 ring-gray-950" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold truncate">
                      {char.cha_name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {getClassName(char.cha_class)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <img
                      className="size-3.5"
                      alt={getSchoolName(char.cha_school)}
                      src={`https://images.ranonlinegs.com/assets/campus/${getSchoolName(char.cha_school)}.png`}
                    />
                    <span
                      className={cn(
                        "text-[10px] font-semibold uppercase tracking-wider",
                        getSchoolColor(char.cha_school),
                      )}
                    >
                      {getSchoolName(char.cha_school)}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-lg font-black tabular-nums leading-none">
                    {char.cha_level}
                  </span>
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-gray-500">
                    Level
                  </p>
                </div>

                <div className="hidden sm:block text-right min-w-16">
                  <span className="text-sm font-bold text-yellow-400 tabular-nums">
                    {char.cha_money.toLocaleString()}
                  </span>
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-gray-500">
                    Gold
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CharacterRosterShell>
  );
}

export { CharacterRoster, CharacterRosterSkeleton };
