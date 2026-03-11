import Coin from "@/components/common/coin";
import GameButton from "@/components/common/game.button";
import { ChangePasswordDialog } from "@/components/profile/user-details/change-password/change-password.dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/formatters";
import { UserProfile } from "@/types/profile";
import { IconKey, IconLock, IconMail, IconRefresh } from "@tabler/icons-react";
import { ChangeEmailDialog } from "./change-email/change-email.dialog";
import { ChangePinDialog } from "./change-pin/change-pin.dialog";
import { ResetPinDialog } from "./reset-pin/reset-pin.dialog";

type ProfileDetailsProps = {
  user: UserProfile;
};

export default function ProfileDetails({ user }: ProfileDetailsProps) {
  const initials = user.user_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const status = user.user_available ? "Active" : "Inactive";

  return (
    <div className="space-y-4">
      <section className="flex items-center gap-4">
        <Avatar className="size-14">
          <AvatarFallback className="text-xl font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-bold uppercase text-accent">
            {user.user_name}
          </p>
          <p className="text-sm text-gray-400">{user.user_email}</p>
        </div>
      </section>
      <section className="space-y-1">
        <p className="text-sm capitalize">
          <span
            data-active={!!user.user_available}
            className="not-data-active:text-destructive"
          >
            {status}
          </span>{" "}
          <span className="text-muted-foreground">/</span> {user.user_role}
        </p>
        <p className="text-sm">
          <span className="text-muted-foreground">Date Created:</span>{" "}
          {formatDate(user.created_at!)}
        </p>
        <p className="text-sm">
          <span className="text-muted-foreground">Last Updated:</span>{" "}
          {formatDate(user.last_updated!)}
        </p>
      </section>
      <Separator />
      <section className="grid grid-cols-2 gap-2 lg:grid-cols-1">
        <Coin size="lg" value={user.web_points} />
        <Coin variant="mcoin" size="lg" value={user.mileage_points} />
      </section>
      <Separator />
      <section className="grid grid-cols-2 gap-4 lg:gap-2 lg:grid-cols-1">
        <ChangePasswordDialog>
          <GameButton className="w-full" variant="secondary">
            <IconLock />
            Change Password
          </GameButton>
        </ChangePasswordDialog>
        <ChangePinDialog>
          <GameButton className="w-full" variant="secondary">
            <IconKey />
            Change Pincode
          </GameButton>
        </ChangePinDialog>
        <ChangeEmailDialog>
          <GameButton className="w-full" variant="secondary">
            <IconMail />
            Change Email
          </GameButton>
        </ChangeEmailDialog>
        <ResetPinDialog>
          <GameButton className="w-full" variant="secondary">
            <IconRefresh />
            Reset Account PIN
          </GameButton>
        </ResetPinDialog>
      </section>
    </div>
  );
}
