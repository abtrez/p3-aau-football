"use server";
const BACKEND_URL = process.env.BACKEND_URI || "https://example.com/mock-api";

import {
  competitionsArraySchema,
  type Competition,
  competitionSchema,
} from "@/lib/schemas/competitionSchema";

if (!BACKEND_URL) {
  throw new Error("BACKEND_URI environment variable is not defined");
}

export async function fetchCompetitions(): Promise<Competition[]> {
  const res = await fetch(`${BACKEND_URL}/api/competition/get`);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch competitions: ${res.status} ${res.statusText}`
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

export async function fetchCompetitionById(
  competitionId: string
): Promise<Competition> {
  const res = await fetch(
    `${BACKEND_URL}/api/competition/get/${competitionId}`
  );
  if (!res.ok) {
    throw new Error(
      `Failed to fetch competition ${competitionId}: ${res.status} ${res.statusText}`
    );
  }
  const json = await res.json();

  // Validate returned data with Zod
  const result = competitionSchema.safeParse(json);

  if (!result.success) {
    console.error("Raw JSON from backend:", JSON.stringify(json, null, 2));
    throw new Error(
      `Backend returned invalid team data for id ${competitionId}`
    );
  }

  // Return validated single team data
  return result.data;
}

export async function addCompetition(name: string, season: string) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, season: season }),
  };

  const res = await fetch(`${BACKEND_URL}/api/competition/add`, options);

  if (!res.ok) {
    return {
      result: null,
      error: `Failed to add competitions: ${res.status} ${res.statusText}`,
    };
  }

  const json = await res.json();

  // Validate returned json with Zod
  const result = competitionSchema.safeParse(json);

  if (!result.success) {
    return {
      result: null,
      error: "Backend returned invalid competitions data",
    };
  }

  // Return status code and state of response
  return { result: result.data, error: null };
}
