import { getCharacters } from "@/app/(dashboard)/profile/actions";
import { StatCard } from "./stat-card.dashboard";
import {
  IconDeviceGamepad2,
  IconArrowBigUpLinesFilled,
  IconWifi,
} from "@tabler/icons-react";

async function StatCardsGroup() {
  const characters = await getCharacters(1, 50);

  const activeCharacters = characters.data.filter((c) => c.cha_deleted === 0);
  const highestLevel = activeCharacters.reduce(
    (max, char) => Math.max(max, char.cha_level),
    0,
  );
  const onlineCount = characters.data.filter(
    (char) => char.cha_online === 1,
  ).length;

  return (
    <>
      <StatCard
        icon={<IconDeviceGamepad2 className="size-6" />}
        label="Characters"
        value={characters.total_items}
      />
      <StatCard
        icon={<IconArrowBigUpLinesFilled className="size-6" />}
        label="Highest Level"
        value={highestLevel > 0 ? highestLevel : "—"}
        accentColor="text-yellow-400"
      />
      <StatCard
        icon={<IconWifi className="size-6" />}
        label="Online Now"
        value={onlineCount}
        description={
          onlineCount > 0
            ? `${onlineCount} of ${characters.total_items}`
            : undefined
        }
        accentColor="text-green-400"
      />
    </>
  );
}

export { StatCardsGroup };
