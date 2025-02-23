"use server";

import { createClient } from "@/server/supabase";
import { redirect } from "next/navigation";

export async function continueWithGithub() {
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
    },
  });

  if (error) {
    redirect("/auth/error");
  }

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
}
