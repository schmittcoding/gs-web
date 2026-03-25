import { ReactNode } from "react";

type EventsLayoutProps = {
  children: ReactNode;
};

export default function EventsLayout({ children }: EventsLayoutProps) {
  return <>{children}</>;
}
