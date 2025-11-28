import { z } from "zod";

export const playerStatisticsSchema = z.object({
    id: z.string(),
    personId: z.string(),
    won: z.number(),
    lost: z.number(),
    drawn: z.number(),
    goals: z.number(),
    assists: z.number(),
    yellowCards: z.number(),
    redCards: z.number(),
    matchesPlayed: z.number(),
    competitionId: z.string(),
    season: z.string(),
});

export const playerStatisticsArraySchema = z.array(playerStatisticsSchema);
export type PlayerStatistics = z.infer<typeof playerStatisticsSchema>;