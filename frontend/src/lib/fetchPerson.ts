"use server";

import { personSchema } from "@/lib/schemas/personSchema";

const BACKEND_URL = process.env.BACKEND_URI || "https://example.com/mock-api";

if (!BACKEND_URL) {
  throw new Error("BACKEND_URI environment variable is not defined");
}

export async function fetchPersonById(PersonId: string) {
  const res = await fetch(`${BACKEND_URL}/api/person/get/${PersonId}`);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch person ${PersonId}: ${res.status} ${res.statusText}`,
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

export default async function addPlayerToTeam(payload: object) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ payload }),
  };

  const res await fetch("/api/")
}
