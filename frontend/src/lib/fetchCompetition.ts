"use server";
const BACKEND_URL = process.env.BACKEND_URI || "https://example.com/mock-api";

import {
  competitionsArraySchema,
  type Competition,
  competitionSchema,
} from "@/lib/schemas/competitionSchema";

if (!BACKEND_URL) {
  throw new Error("BACKEND_URI enviornment variable is not defined");
}

export async function fetchCompetitions(): Promise<Competition[]> {
  const res = await fetch(`${BACKEND_URL}/api/competition/get`);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch competitions: ${res.status} ${res.statusText}`,
    );
  }

  const json = await res.json();

  // Validate returned json with Zod
  const result = competitionsArraySchema.safeParse(json);

  if (!result.success) {
    console.error("Raw JSON from backend", JSON.stringify(json, null, 2));
    throw new Error("Backend returned invalid competitions data");
  }

  // Return validated competition data
  return result.data;
}
