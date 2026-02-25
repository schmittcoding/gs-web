import Image from "next/image";
import { IconGameCoin } from "../icons";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function DashboardHeader() {
  return (
    <header className="h-max w-full px-5 py-4 flex justify-between">
      <section>
        <Image src="/logo.png" alt="Ran Online GS" width={150} height={72} />
      </section>
      <section className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Avatar size="lg">
            <AvatarFallback className="shape-hexagon bg-primary text-primary-foreground">
              K
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-gray-400 uppercase font-bold">
              kendra03
            </p>
            <p className="text-sm flex gap-1 items-center">
              27,000 <IconGameCoin className="size-4" />
            </p>
          </div>
        </div>
      </section>
    </header>
  );
}
