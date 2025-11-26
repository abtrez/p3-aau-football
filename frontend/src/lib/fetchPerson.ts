"use server";

import { Person, personSchema } from "@/lib/schemas/personSchema";

const BACKEND_URL = process.env.BACKEND_URI;

const isBuild = !!process.env.NEXT_PHASE;

if (!BACKEND_URL && !isBuild) {
  throw new Error("BACKEND_URI environment variable is not defined");
}

export async function fetchPersonById(PersonId: string): Promise<Person> {
  const res = await fetch(`${BACKEND_URL}/api/person/get/${PersonId}`);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch person ${PersonId}: ${res.status} ${res.statusText}`
    );
  }
  const json = await res.json();

  const result = personSchema.safeParse(json);

  if (!result.success) {
    console.error("Raw JSON from backend:", JSON.stringify(json, null, 2));
    throw new Error(`Backend returned invalid Person data from ${PersonId}`);
  }
  // Return validated single person data
  return result.data;
}
