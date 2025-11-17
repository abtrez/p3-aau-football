"use server";
const BACKEND_URL = process.env.BACKEND_URI || "https://example.com/mock-api";

import { teamsArraySchema, type Team } from "@/lib/schemas/teamSchema";

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
    throw new Error("Backend returned invalid teams data");
  }

  // Return validated team data
  return result.data;
}

export default fetchTeams;

export async function fetchTeamById(teamID: string) {
  const res = await fetch(`${BACKEND_URL}/api/team/get/${teamID}`);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch team ${teamID}: ${res.status} ${res.statusText}`,
    );
  }
  return res.json();
}
