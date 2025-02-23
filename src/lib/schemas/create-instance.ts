import { z } from "zod";

export const createInstanceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  sources: z.array(z.object({
    url: z.string().url("Must be a valid URL")
  }))
})