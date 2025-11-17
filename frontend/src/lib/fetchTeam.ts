"use server";
const BACKEND_URL = process.env.BACKEND_URI || "https://example.com/mock-api";

import {
  teamsArraySchema,
  type Team,
  teamSchema,
} from "@/lib/schemas/teamSchema";

if (!BACKEND_URL) {
  throw new Error("BACKEND_URI environment variable is not defined");
}

export async function fetchTeams(): Promise<Team[]> {
  const res = await fetch(`${BACKEND_URL}/api/team/get`);
  if (!res.ok) {
    throw new Error(`Failed to fetch teams: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();

  // Validate returned json with Zod
  const result = teamsArraySchema.safeParse(json);

  if (!result.success) {
    console.error("Raw JSON from backend:", JSON.stringify(json, null, 2));
    throw new Error("Backend returned invalid teams data");
  }

  // Return validated team data
  return result.data;
}

export async function fetchTeamById(teamId: string): Promise<Team> {
  const res = await fetch(`${BACKEND_URL}/api/team/get/${teamId}`);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch team ${teamId}: ${res.status} ${res.statusText}`,
    );
  }
  const json = await res.json();

  // Validate returned data with Zod
  const result = teamSchema.safeParse(json);

  if (!result.success) {
    console.error("Raw JSON from backend:", JSON.stringify(json, null, 2));
    throw new Error(`Backend returned invalid team data for id ${teamId}`);
  }

  // Return validated single team data
  return result.data;
}
