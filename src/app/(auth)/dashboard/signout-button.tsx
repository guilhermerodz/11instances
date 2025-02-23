'use client';

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/logout";

export function SignoutButton() {
  return <Button variant='ghost' onClick={signOut}>Logout</Button>
}