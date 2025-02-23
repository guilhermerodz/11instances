export default function Page() {
  return (
    <div className="w-full h-screen">
      <div className="flex flex-col mx-auto w-full p-8 max-w-screen-sm h-full">
        <header className="flex flex-shrink-0 flex-grow-0 items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Instances</h1>
        </header>

        <main className="flex-1 flex flex-col justify-center items-center">
          <h3 className="text-2xl font-semibold tracking-tight">Continue where you left off</h3>
          
          <div className="flex w-full overflow-x-scroll">
            <InstanceCard />
            <InstanceCard />
            <InstanceCard />
            <InstanceCard />
            <InstanceCard />
            <InstanceCard />
          </div>
        </main>
      </div>
    </div>
  );
}

function InstanceCard() {
  return (
    <div className="rounded-lg bg-card text-card-foreground p-4">
      Alex Hormozi – Build an MVP
    </div>
  )
}