import { z } from "Zod";

export const teamSchema = z.object({
  id: z.string(),
  name: z.string(),
  abbreviation: z.string(),
  yearEstablished: z.string(),
  department: z.string(),
  size: z.number(),
  members: z.array(z.unknown()),
  contactPerson: z.unknown(),
});
