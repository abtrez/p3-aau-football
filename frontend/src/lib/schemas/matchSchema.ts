import { z } from "zod";
import { teamSchema } from "@/lib/schemas/teamSchema";

const venueSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const refereeSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const matchEventSchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  minute: z.number(),
});

export const matchSchema = z.object({
  id: z.string(),
  homeTeam: teamSchema,
  awayTeam: teamSchema,
  venue: venueSchema.nullish(),
  kickoff: z.string().nullish(),
  referees: z.array(refereeSchema).nullish(),
  homeScore: z.number(),
  awayScore: z.number(),
  matchEvents: z.array(matchEventSchema).nullish(),
});

export const matchesArraySchema = z.array(matchSchema);

export type Match = z.infer<typeof matchSchema>;
