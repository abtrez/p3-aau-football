"use server";

import { personSchema } from "@/lib/schemas/personSchema";
import {
  addPlayerToTeamSchema,
  type AddPlayerToTeam,
} from "@/lib/schemas/addPlayerToTeamSchema";

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

export default async function addPlayerToTeam(formData: unknown) {
  // Validate the form data with zod
  const parsed = addPlayerToTeamSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      result: null,
      error: "Received invalid form data from the frontend",
    };
  }

  // Validated form data
  const validatedFormData: AddPlayerToTeam = parsed.data;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFormData),
  };

  const res = await fetch(
    "http://localhost:8080/api/person/add-player",
    options,
  );

  if (!res.ok) {
    return {
      result: null,
      error: `Failed to add player to team: status code ${res.status} ${res.statusText}`,
    };
  }

  const result = res.json();

  // Return status code and state of response
  return { result: result, error: null };
}
