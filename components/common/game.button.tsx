import { Button } from "../ui/button";

type GameButtonProps = React.ComponentProps<typeof Button>;

export default function GameButton(props: GameButtonProps) {
  return (
    <Button
      className="h-[unset] relative inline-flex items-center gap-2 py-3 px-6 text-base border-none cursor-pointer outline-none whitespace-nowrap game-btn hover:bg-primary/90"
      {...props}
    ></Button>
  );
}
