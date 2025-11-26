"use server";

import { personSchema } from "@/lib/schemas/personSchema";
import { z } from "zod";

const BACKEND_URL = process.env.BACKEND_URI;

const isBuild = !!process.env.NEXT_PHASE;

if (!BACKEND_URL && !isBuild) {
  throw new Error("BACKEND_URI environment variable is not defined");
}

export async function fetchPersonsFromTeamId(teamId: string) {
  const res = await fetch(`${BACKEND_URL}/api/person/getFromTeam/${teamId}`);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch persons from team ${teamId}: ${res.status} ${res.statusText}`
    );
  }
  const json = await res.json();

  // Validate returned data with Zod
  const personsArraySchema = z.array(personSchema);
  const result = personsArraySchema.safeParse(json);

  if (!result.success) {
    console.error("Raw JSON from backend:", JSON.stringify(json, null, 2));
    throw new Error(
      `Backend returned invalid Peron data for team id ${teamId}`
    );
  }

  // Return validated members from team
  return result.data;
}
