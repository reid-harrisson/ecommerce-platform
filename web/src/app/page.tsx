import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Hello Next.js!</h1>
      <ModeToggle />
      <Button>Toggle</Button>
    </div>
  );
}
