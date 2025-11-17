import { z } from "zod";

// Single source of truth for what our team objects look like
export const teamSchema = z.object({
  id: z.number(),
  name: z.string(),
  abbreviation: z.string(),
  yearEstablished: z.string(),
  department: z.string(),
  size: z.number(),
  members: z.array(z.unknown()),
  contactPerson: z.unknown(),
  logo: z.string().optional(),
});

export const teamsArraySchema = z.array(teamSchema);

export type Team = z.infer<typeof teamSchema>;
