import { z } from "zod";

export const competitionSchema = z.object({
  id: z.string(),
  season: z.string(),
  name: z.string(),
});

export const competitionsArraySchema = z.array(competitionSchema);
export type Competition = z.infer<typeof competitionSchema>;
