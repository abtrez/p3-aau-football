"use server";
import {matchSchema} from "@/lib/schemas/matchSchema";

const BACKEND_URL = process.env.BACKEND_URI || "https://example.com/mock-api";

if (!BACKEND_URL) {
  throw new Error("BACKEND_URI environment variable is not defined");
}

export async function fetchMatchOverview() {
  const res = await fetch(`${BACKEND_URL}/api/match/get`);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch match overview: ${res.status} ${res.statusText}`
    );
  }
  return res.json();
}

export async function fetchMatchById(matchId: string) {
  const res = await fetch(`${BACKEND_URL}/api/match/get/${matchId}`);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch match ${matchId}: ${res.status} ${res.statusText}`
    );
  }
  //Validate returned json with Zod
  const json = await res.json();
  const result = matchSchema.safeParse(json);

  if (!result.success) {
      throw new Error("Backend returned invalid match data");
  }

  return result.data;
}
