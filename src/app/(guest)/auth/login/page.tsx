'use client';

import { Button } from "@/components/ui/button";
import { SiGithub } from '@icons-pack/react-simple-icons'
import { continueWithGithub } from "./actions";
import React from "react";

export default function Page() {
  const [redirecting, setRedirecting] = React.useState(false);

  return (
    <div className="w-full h-screen">
      <div className="flex flex-col mx-auto w-full p-8 max-w-screen-sm h-full">
        <header className="flex flex-shrink-0 flex-grow-0 items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Instances</h1>
        </header>

        <form className="flex-1 flex flex-col justify-center items-center" action={continueWithGithub}>
          <Button variant={redirecting ? 'ghost' : 'default'} formAction={continueWithGithub} onClick={() => setRedirecting(true)}>
            {redirecting && <>Redirecting...</>}
            {!redirecting && <><SiGithub /> Continue with Github</>}
          </Button>
        </form>
      </div>
    </div>
  );
}
