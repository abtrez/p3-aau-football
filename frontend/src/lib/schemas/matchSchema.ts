import { z } from "zod";
import { teamSchema } from "@/lib/schemas/teamSchema";
import {matchEventResponseSchema} from "@/lib/schemas/matchEventSchema";

const venueSchema = z.object({
  id: z.string(),
  name: z.string(),
  pitchIdentifier: z.string().nullable(),
  address: z.string(),
});

const refereeSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const matchSchema = z.object({
  id: z.string(),
  season: z.string().nullish(),
  competition: z.string().nullish(),
  homeTeam: teamSchema,
  awayTeam: teamSchema,
  venue: venueSchema.nullish(),
  kickoff: z.string().nullish(),
  referees: z.array(refereeSchema).nullish(),
  homeScore: z.number(),
  awayScore: z.number(),
  matchEvents: z.array(matchEventResponseSchema),
});

export const matchesArraySchema = z.array(matchSchema);

export type Match = z.infer<typeof matchSchema>;
