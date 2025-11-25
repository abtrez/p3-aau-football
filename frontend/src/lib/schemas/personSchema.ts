import { z } from "zod";
import { roleSchema } from "@/lib/schemas/roleSchema";

export const personSchema = z.object({
  id: z.string(), // This becomes a string once we have a Person collection in MongoDB
  firstName: z.string(),
  lastName: z.string(),
  roles: z.array(roleSchema).nullish(),
  teamId: z.string().optional()
});

export type Person = z.infer<typeof personSchema>;