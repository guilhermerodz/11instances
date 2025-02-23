'use client';

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/logout";
import Link from "next/link";
import { ChevronLeftIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const instanceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  sources: z.array(z.object({
    url: z.string().url("Must be a valid URL")
  }))
})

export default function Page() {
  const form = useForm<z.infer<typeof instanceSchema>>({
    resolver: zodResolver(instanceSchema),
    defaultValues: {
      name: "",
      description: "",
      sources: [{ url: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sources"
  });

  return (
    <div className="w-full h-screen">
      <div className="flex flex-col mx-auto w-full p-8 max-w-screen-sm h-full">
        <header className="flex flex-shrink-0 flex-grow-0 items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Instances</h1>
          <Button variant='ghost' onClick={signOut}>Logout</Button>
        </header>

        <Form {...form}>
          <form className="flex-1 flex flex-col mt-8">
            <Link href="/dashboard" className="text-sm text-muted-foreground flex items-center gap-1"> <ChevronLeftIcon className="size-4" /> Back to instances</Link>
            <h3 className="text-2xl font-semibold mb-2 flex gap-2 items-center">Make your instance</h3>
            
            <div className="space-y-4 mt-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Instance" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="What's this instance about?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Sources</FormLabel>
                <div className="space-y-2">
                  {fields.map((field, index) => (
                    <FormField
                      key={field.id}
                      control={form.control}
                      name={`sources.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input placeholder="https://..." {...field} />
                            </FormControl>
                            <Button 
                              type="button"
                              variant="outline" 
                              size="icon"
                              onClick={() => remove(index)}
                              disabled={index === 0 && fields.length === 1}
                            >
                              <TrashIcon className="size-4" />
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="mt-2"
                  onClick={() => append({ url: "" })}
                >
                  <PlusIcon className="size-4 mr-2" />
                  Add source
                </Button>
              </div>

              <Button type="submit" className="mt-8">
                Create instance
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}