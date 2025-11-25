"use server";
const BACKEND_URL = process.env.BACKEND_URI || "https://example.com/mock-api";

import {
    playerStatisticsArraySchema,
    type PlayerStatistics,
    playerStatisticsSchema,
} from "@/lib/schemas/playerStatisticsSchema";

if (!BACKEND_URL) {
    throw new Error("BACKEND_URI environment variable is not defined");
}

export async function fetchPlayerStatistics(
    personId: string,
    competitionId: string,
    season: string,
): Promise<PlayerStatistics[]> {
    const url =
        `${BACKEND_URL}/api/statistics/get/player` +
        `?personId=${encodeURIComponent(personId)}` +
        `&season=${encodeURIComponent(season)}` +
        `&competitionId=${encodeURIComponent(competitionId)}`;

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(
            `Failed to fetch player statistics: ${res.status} ${res.statusText}`,
        );
    }
    const json = await res.json();

    // Validate returned data with Zod
    const result = playerStatisticsArraySchema.safeParse(json);

    if (!result.success) {
        console.error("Raw JSON from backend:", JSON.stringify(json, null, 2));
        throw new Error(
            `Backend returned invalid player statistics data to competition: ${competitionId}`,
        );
    }
    // Return validated player statistics data
    return result.data;
}
