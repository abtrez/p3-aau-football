import { z } from "zod";
import { teamSchema } from "@/lib/schemas/teamSchema";

export const leagueStatisticsSchema = z.object({
  team: teamSchema,
  season: z.string(),
  competitionId: z.string(),
  matchesPlayed: z.number(),
  won: z.number(),
  drawn: z.number(),
  lost: z.number(),
  goalsFor: z.number(),
  goalsAgainst: z.number(),
  points: z.number(),
});

export type LeagueStatistics = z.infer<typeof leagueStatisticsSchema>;
