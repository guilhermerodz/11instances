import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/server/supabase";
import Link from "next/link";
import { SignoutButton } from "../../signout-button";
import { ChevronLeftIcon } from "lucide-react";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const supabase = await createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: instance, error } = await supabase.from("instances").select("*").eq("id", id as any).limit(1).single();

  if (error) {
    return <>Error loading instance: {error.message}</>
  }

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
            <Link href="/dashboard" className="text-sm text-muted-foreground flex items-center gap-1"> <ChevronLeftIcon className="size-4" /> Back to instances</Link>
            {/* <h3 className="text-2xl font-semibold mb-2">Continue where you left off</h3>

          <div className="flex w-full overflow-x-auto gap-2">
            {leftOff.map((instance, idx) => (
              <InstanceCard key={idx} />
            ))}
          </div> */}

            <p className="text-2xl font-semibold tracking-tight text-center text-balance w-full">How Can I Help You?</p>

            <div className="flex flex-col gap-2 mt-2 items-center">
              <Link href={`/dashboard/instances/${id}/speak`} className={buttonVariants({ variant: 'outline' })}>Speak</Link>
              <Link href={``} className={buttonVariants({ variant: 'outline' })} aria-disabled>Chat</Link>
              <Link href={``} className={buttonVariants({ variant: 'outline' })} aria-disabled>Audiobook</Link>
              <Link href={``} className={buttonVariants({ variant: 'outline' })} aria-disabled>Podcast</Link>
            </div>
          </>}
        </main>
      </div>
    </div>
  );
}
