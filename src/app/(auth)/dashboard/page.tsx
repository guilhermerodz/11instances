'use client';

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/logout";
import Link from "next/link";

const instances = [
  {},
  {},
  {},
  {},
  {},
  {},
]

const leftOff = [
  instances[0],
]

export default function Page() {
  return (
    <div className="w-full h-screen">
      <div className="flex flex-col mx-auto w-full p-8 max-w-screen-sm h-full">
        <header className="flex flex-shrink-0 flex-grow-0 items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Instances</h1>
          <Button onClick={signOut}>Logout</Button>
        </header>

        <main className="flex-1 flex flex-col mt-20">
          <h3 className="text-2xl font-semibold tracking-tight mb-2">Continue where you left off</h3>

          <div className="flex w-full overflow-x-auto gap-2">
            {leftOff.map((instance, idx) => (
              <InstanceCard key={idx} />
            ))}
          </div>

          <h3 className="text-2xl font-semibold tracking-tight mt-8 mb-2">All instances</h3>

          <div className="flex w-full overflow-x-auto gap-2">
            {instances.map((instance, idx) => (
              <InstanceCard key={idx} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function InstanceCard() {
  return (
    <Link href='#' className="rounded-lg bg-card text-card-foreground p-4 border w-40 shrink-0 grow-0">
      Alex Hormozi – Build an MVP
    </Link>
  )
}