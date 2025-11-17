import { z } from "Zod";
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

const matchSchema = z.object({
  id: z.string(),
  homeTeam: teamSchema,
  awayTeam: teamSchema,
  venue: venueSchema,
  kickoff: z.string(),
  referees: z.array(refereeSchema),
  homeScore: z.int(),
  awayScore: z.int(),
  matchEvents: z.array(z.string()),
});
