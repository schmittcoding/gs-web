import { Icon } from "@tabler/icons-react";

export type MenuItem = {
  id: string;
  icon: Icon;
  path: string;
  label: string;
  dateAdded?: Date;
  className?: string;
};
