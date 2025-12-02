import { z } from "zod";

export const createMatchSchema = z.object({
  homeTeamId: z.string(),
  awayTeamId: z.string(),
  season: z.string(),
  competitionId: z.string().nullable().optional(),
  venue: z.string(),
  kickoff: z.string(),
});

export type CreateMatchSchema = z.infer<typeof createMatchSchema>;
