import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect('/auth/login');
}
