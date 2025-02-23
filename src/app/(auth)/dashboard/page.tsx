import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/server/supabase";
import Link from "next/link";
import { SignoutButton } from "./signout-button";
import { Database } from "../../../../database.types";

export default async function Page() {
  const supabase = await createClient();

  const { data: instances, error } = await supabase.from("instances").select("*");

  if (error) {
    return <>Error loading instances: {error.message}</>
  }

  const isEmpty = instances.length === 0;


  console.log({ instances })

  return (
    <div className="w-full h-screen">
      <div className="flex flex-col mx-auto w-full p-8 max-w-screen-sm h-full">
        <header className="flex flex-shrink-0 flex-grow-0 items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Instances</h1>
          <SignoutButton />
        </header>

        <main className="flex-1 flex flex-col mt-0">
          {isEmpty && <>
            <div className="flex flex-col gap-2 items-center mt-20">
              <p>Looks like you haven&apos;t created any instances yet.</p>
              <Link href="dashboard/instances/create" className={buttonVariants({ variant: 'default' })}>Create instance</Link>
            </div>
          </>}
          {!isEmpty && <>
            {/* <h3 className="text-2xl font-semibold mb-2">Continue where you left off</h3>

          <div className="flex w-full overflow-x-auto gap-2">
            {leftOff.map((instance, idx) => (
              <InstanceCard key={idx} />
            ))}
          </div> */}

            <h3 className="text-2xl font-semibold mt-8 mb-2 flex gap-2 items-center">All instances <Link href="dashboard/instances/create" className={buttonVariants({ size: 'sm', variant: 'outline' })}>Add</Link></h3>

            <div className="flex w-full overflow-x-auto gap-2">
              {instances.map((instance) => (
                <InstanceCard key={instance.id} data={instance} />
              ))}
            </div>
          </>}
        </main>
      </div>
    </div>
  );
}

function InstanceCard(props: { data: Database["public"]["Tables"]["instances"]["Row"] }) {
  return (
    <Link href={`/dashboard/instances/${props.data.id}`} className="rounded-lg bg-card text-card-foreground p-4 border w-40 shrink-0 grow-0">
      {props.data.name}
    </Link>
  )
}