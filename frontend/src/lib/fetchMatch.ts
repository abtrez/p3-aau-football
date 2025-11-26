"use server";
import {
  Match,
  matchesArraySchema,
  matchSchema,
} from "@/lib/schemas/matchSchema";

const BACKEND_URL = process.env.BACKEND_URI;

const isBuild = !!process.env.NEXT_PHASE;

if (!BACKEND_URL && !isBuild) {
  throw new Error("BACKEND_URI environment variable is not defined");
}

export async function fetchMatchOverview(): Promise<Match[]> {
  if (isBuild) return [];
  const res = await fetch(`${BACKEND_URL}/api/match/get`);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch match overview: ${res.status} ${res.statusText}`
    );
  }
  // Validate returned json with Zod
  const json = await res.json();
  const result = matchesArraySchema.safeParse(json);

  if (!result.success) {
    console.error("Raw JSON from backend:", JSON.stringify(json, null, 2));
    throw new Error("Backend returned invalid match data");
  }

  // Return validated match data
  return result.data;
}

export async function fetchMatchById(matchId: string): Promise<Match> {
  const res = await fetch(`${BACKEND_URL}/api/match/get/${matchId}`);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch match ${matchId}: ${res.status} ${res.statusText}`
    );
  }
  // Validate returned json with Zod
  const json = await res.json();

  const result = matchSchema.safeParse(json);

  if (!result.success) {
    console.error("Raw JSON from backend:", JSON.stringify(json, null, 2));
    throw new Error("Backend returned invalid match data");
  }
  // Return validated single match data
  return result.data;
}
