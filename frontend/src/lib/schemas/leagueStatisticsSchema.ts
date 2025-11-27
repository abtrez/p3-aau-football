import { z } from "zod";

import { teamSchema } from "@/lib/schemas/teamSchema";

export const leagueStatisticsSchema = z.object({
  id: z.string(),
  team: teamSchema,
  competitionId: z.string(),
  season: z.string(),
  matchesPlayed: z.number(),
  won: z.number(),
  drawn: z.number(),
  lost: z.number(),
  goalsFor: z.number(),
  goalsAgainst: z.number(),
  points: z.number(),
});

export const leagueStatisticsArraySchema = z.array(leagueStatisticsSchema);
export type LeagueStatistics = z.infer<typeof leagueStatisticsSchema>;
