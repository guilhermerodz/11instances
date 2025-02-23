"use server";
import { createClient } from "@/server/supabase";
import { redirect } from "next/navigation";
import { INSTANCE_SOURCES_SEPARATOR } from "@/lib/constants";
import { z } from "zod";

const createInstancePayloadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  sources: z.string(),
});

export async function createInstance(formData: FormData) {
  const payload = createInstancePayloadSchema.parse({
    name: formData.get("name"),
    description: formData.get("description"),
    sources: formData.get("sources"),
  });
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase.from("instances").insert({
    name: payload.name,
    description: payload.description ?? null,
    sources: payload.sources,
    user_uid: user.id,
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/dashboard");
}
