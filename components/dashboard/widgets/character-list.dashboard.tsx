/* eslint-disable @next/next/no-img-element */
import { getCharacters } from "@/app/(dashboard)/profile/actions";
import { CharactersResponse } from "@/components/profile/overview/types.characters";
import {
  formatGold,
  getClassName,
  getSchoolAbbr,
  getSchoolColor,
} from "@/components/rankings/types.rankings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

function CharacterListShell({ children }: PropsWithChildren) {
  return (
    <Card className="h-max">
      <CardHeader className="pt-4">
        <CardTitle className="text-sm font-bold uppercase tracking-wider">
          Character List
        </CardTitle>
      </CardHeader>
      {children}
    </Card>
  );
}

export function CharacterListSkeleton() {
  return (
    <CharacterListShell>
      <CardContent className="p-2 bg-gray-900!">
        <section className="divide-y divide-gray-800">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2.5">
              <Skeleton className="size-9 shrink-0 rounded-full" />
              <div className="flex-1 min-w-0 space-y-1.5">
                <Skeleton className="h-3.5 w-2/5 rounded-sm" />
                <Skeleton className="h-2.5 w-1/4 rounded-sm" />
              </div>
              <div className="text-right space-y-1">
                <Skeleton className="h-5 w-8 ml-auto rounded-sm" />
                <Skeleton className="h-2 w-8 ml-auto rounded-sm" />
              </div>
              <div className="hidden sm:block text-right space-y-1 min-w-16">
                <Skeleton className="h-3.5 w-12 ml-auto rounded-sm" />
                <Skeleton className="h-2 w-8 ml-auto rounded-sm" />
              </div>
            </div>
          ))}
        </section>
      </CardContent>
    </CharacterListShell>
  );
}

export default async function CharacterListWidget() {
  const characters: CharactersResponse = await getCharacters(1, 10);

  const sorted = [...characters.data]
    .filter((c) => c.cha_deleted === 0)
    .sort((a, b) => b.cha_level - a.cha_level)
    .slice(0, 5);

  return (
    <CharacterListShell>
      <CardContent className="p-2 bg-gray-900!">
        {sorted.length === 0 ? (
          <p className="text-sm text-gray-500 py-8 text-center">
            No characters found
          </p>
        ) : (
          <section className="divide-y divide-gray-800">
            {sorted.map((char) => {
              const clsName = getClassName(char.cha_class);
              const schoolAbbr = getSchoolAbbr(char.cha_school);
              const schoolColor = getSchoolColor(char.cha_school);
              return (
                <section
                  key={char.cha_num}
                  className={cn(
                    "group/row relative flex items-center gap-3 px-3 py-2.5 overflow-hidden",
                    "hover:bg-gray-900/80 transition-colors duration-200",
                    char.cha_online === 1 && "bg-green-500/3",
                  )}
                >
                  <div className="relative shrink-0">
                    <img
                      className="size-9 rounded-full ring-1 ring-gray-800"
                      alt={`Ran Online GS | Classes | ${clsName}`}
                      src={`https://images.ranonlinegs.com/assets/emblems/${clsName.toLowerCase()}.webp`}
                      title={clsName}
                    />
                    {char.cha_online === 1 && (
                      <span
                        className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-green-400 ring-2 ring-gray-950"
                        title="Online"
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold truncate">
                        {char.cha_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <img
                        className="size-3.5"
                        alt={`Ran Online GS | Classes | ${schoolAbbr.toUpperCase()}`}
                        src={`https://images.ranonlinegs.com/assets/campus/${schoolAbbr.toLowerCase()}.png`}
                      />
                      <span
                        className={cn(
                          "text-[10px] font-semibold uppercase tracking-wider",
                          schoolColor,
                        )}
                      >
                        {schoolAbbr}
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
                      {formatGold(char.cha_money)}
                    </span>
                    <p className="text-[9px] font-semibold uppercase tracking-widest text-gray-500">
                      Gold
                    </p>
                  </div>
                </section>
              );
            })}
          </section>
        )}
      </CardContent>
    </CharacterListShell>
  );
}
