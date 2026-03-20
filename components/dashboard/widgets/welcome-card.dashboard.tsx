/* eslint-disable @next/next/no-img-element */
import {
  CharactersResponse,
  type CharacterInfo,
} from "@/components/profile/overview/types.characters";
import {
  getClassName,
  getSchoolColor,
  getSchoolName,
} from "@/components/rankings/types.rankings";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { type User } from "@/lib/auth/api.auth";
import { UserProfile } from "@/types/profile";

type WelcomeCardProps = {
  user: User;
  profile: UserProfile;
  characters: CharactersResponse;
};

function WelcomeCardShell({ children }: { children: React.ReactNode }) {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-4 relative overflow-hidden shape-main border border-gray-800 h-max min-h-48">
      {children}
    </Card>
  );
}

function WelcomeCardSkeleton() {
  return (
    <WelcomeCardShell>
      <div className="p-6 space-y-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48 mt-4" />
      </div>
    </WelcomeCardShell>
  );
}

function WelcomeCardContent({
  user,
  profile,
  topCharacter,
}: {
  user: User;
  profile: { created_at?: string } | null;
  topCharacter: CharacterInfo | null;
}) {
  return (
    <WelcomeCardShell>
      {/* Background layers */}
      {topCharacter && (
        <img
          className="absolute right-0 top-0 h-full w-1/2 object-cover object-top opacity-[0.08] blur-[1px] scale-110"
          alt=""
          src={`https://images.ranonlinegs.com/assets/campus/${getSchoolName(topCharacter.cha_school)}.png`}
        />
      )}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-cod-gray-400) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-cod-gray-400) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-r from-gray-950 via-gray-950/95 to-transparent" />
      <div
        className="absolute -right-16 -top-16 h-75 w-75 rounded-full opacity-[0.06]"
        style={{
          background:
            "radial-gradient(circle, var(--color-orange-peel-500), transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative flex h-full items-center gap-6 p-6">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <Badge
              className="capitalize"
              variant={user.user_role === "admin" ? "default" : "secondary"}
            >
              {user.user_role}
            </Badge>
            {profile?.created_at && (
              <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                Member since {new Date(profile.created_at).getFullYear()}
              </span>
            )}
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight">
            Welcome back, <span className="text-primary">{user.user_name}</span>
          </h1>

          {topCharacter && (
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-800">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                Top Character
              </span>
              <div className="flex items-center gap-2">
                <img
                  className="size-6 rounded-full"
                  alt={getClassName(topCharacter.cha_class)}
                  src={`https://images.ranonlinegs.com/assets/emblems/${getClassName(topCharacter.cha_class).toLowerCase()}.webp`}
                />
                <span className="text-sm font-bold">
                  {topCharacter.cha_name}
                </span>
                <span
                  className={`text-xs font-medium uppercase ${getSchoolColor(topCharacter.cha_school)}`}
                >
                  {getSchoolName(topCharacter.cha_school)}
                </span>
                <span className="text-xs text-gray-400 tabular-nums">
                  Lv. {topCharacter.cha_level}
                </span>
              </div>
            </div>
          )}
        </div>

        {topCharacter && (
          <div className="hidden lg:flex flex-col items-end gap-1">
            <span className="text-5xl font-black text-primary tabular-nums leading-none ran-fade-up-1">
              {topCharacter.cha_level}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
              Level
            </span>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 h-0.5 w-1/3 bg-linear-to-r from-primary to-transparent" />
    </WelcomeCardShell>
  );
}

async function WelcomeCard({ profile, characters, user }: WelcomeCardProps) {
  const topCharacter =
    [...characters.data]
      .filter((c) => c.cha_deleted === 0)
      .sort((a, b) => b.cha_level - a.cha_level)[0] ?? null;

  return (
    <WelcomeCardContent
      user={user}
      profile={profile}
      topCharacter={topCharacter}
    />
  );
}

export { WelcomeCard, WelcomeCardSkeleton };
