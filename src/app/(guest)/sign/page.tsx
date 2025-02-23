import { Button } from "@/components/ui/button";
import { SiGithub } from '@icons-pack/react-simple-icons'

export default function Page() {
  return (
    <div className="w-full h-screen">
      <div className="flex flex-col mx-auto w-full p-8 max-w-screen-sm h-full">
        <header className="flex flex-shrink-0 flex-grow-0 items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Instances</h1>
        </header>

        <main className="flex-1 flex flex-col justify-center items-center">
          <Button><SiGithub /> Continue with Github</Button>
        </main>
      </div>
    </div>
  );
}
