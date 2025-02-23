import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/server/supabase";
import Link from "next/link";
import { SignoutButton } from "../../../signout-button";
import { ChevronLeftIcon } from "lucide-react";
import { ElevenLabsClient } from "elevenlabs";
import { Conversational } from "./conversational";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const supabase = await createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: instance, error } = await supabase.from("instances").select("*").eq("id", id as any).limit(1).single();

  const elevenLabs = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY!,
  });

  if (error) {
    return <>Error loading instance: {error.message}</>
  }

  const signedUrl = await elevenLabs.conversationalAi.getSignedUrl({
    agent_id: instance.conversational_agent_id,
  });

  const found = instance !== null;

  return (
    <div className="w-full h-screen">
      <div className="flex flex-col mx-auto w-full p-8 max-w-screen-sm h-full">
        <header className="flex flex-shrink-0 flex-grow-0 items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Instances</h1>
          <SignoutButton />
        </header>

        <main className="flex-1 flex flex-col mt-8">
          {!found && <>
            <div className="flex flex-col gap-2 items-center mt-20">
              <p>This instance doesn&apos;t exist.</p>
              <Link href="/dashboard" className={buttonVariants({ variant: 'default' })}>Go home</Link>
            </div>
          </>}
          {found && <>
            <Link href={`/dashboard/instances/${id}`} className="text-sm text-muted-foreground flex items-center gap-1"> <ChevronLeftIcon className="size-4" /> Back</Link>
            {/* <h3 className="text-2xl font-semibold mb-2">Continue where you left off</h3>

          <div className="flex w-full overflow-x-auto gap-2">
            {leftOff.map((instance, idx) => (
              <InstanceCard key={idx} />
            ))}
          </div> */}

            <p className="text-2xl font-semibold tracking-tight text-center text-balance w-full">{instance.name}</p>

            <Conversational signedUrl={signedUrl} />
          </>}
        </main>
      </div>
    </div>
  );
}
