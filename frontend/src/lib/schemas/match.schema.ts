import { z } from "Zod";
import { teamSchema } from "@/lib/schemas/team.schema";

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
  id: z.string(), // String ID from mongoDB
  homeTeam: teamSchema, // Team reference --> ID string
  awayTeam: teamSchema, // Team reference --> ID string
  venue: venueSchema, // Venue reference --> ID string
  kickoff: z.string(), // Dates come as ISO string from JSON
  referees: z.array(refereeSchema),
  homeScore: z.int(),
  awayScore: z.int(),
  matchEvents: z.array(z.string()),
});
