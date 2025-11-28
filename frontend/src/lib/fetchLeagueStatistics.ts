"use server";
const BACKEND_URL = process.env.BACKEND_URI;

const isBuild = !!process.env.NEXT_PHASE;

import {
  leagueStatisticsArraySchema,
  type LeagueStatistics,
} from "@/lib/schemas/leagueStatisticsSchema";

if (!BACKEND_URL && !isBuild) {
  throw new Error("BACKEND_URI environment variable is not defined");
}

export async function fetchLeagueStatistics(
  competitionId: string,
  season: string
): Promise<LeagueStatistics[]> {
  if (isBuild) return [];

  const url =
    `${BACKEND_URL}/api/statistics/get/league` +
    `?season=${encodeURIComponent(season)}` +
    `&competitionId=${encodeURIComponent(competitionId)}`;

  const res = await fetch(url);

  // Simply return empty array if there is no league statistics on the competition
  if (res.status == 404) {
    return [];
  }

  if (!res.ok) {
    throw new Error(
      `Failed to fetch competitions: ${res.status} ${res.statusText}`
    );
  }
  const json = await res.json();

  // Validate returned data with Zod
  const result = leagueStatisticsArraySchema.safeParse(json);

  if (!result.success) {
    console.error("Raw JSON from backend:", JSON.stringify(json, null, 2));
    throw new Error(
      `Backend returned invalid league statistics data to competition: ${competitionId}`
    );
  }
  // Return validated league statistics data
  return result.data;
}
