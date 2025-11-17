import { z } from "Zod";

const matchSchema = z.object({
  id: z.string(), // String ID from mongoDB
  homeTeam: z.string(), // Team reference --> ID string
  awayTeam: z.string(), // Team reference --> ID string
  venue: z.string(), // Venue reference --> ID string
  kickoff: z.string(), // Dates come as ISO string from JSON
  referees: z.array(z.string()),
  homeScore: z.int(),
  awayScore: z.int(),
  matchEvents: z.array(z.string()),
});
