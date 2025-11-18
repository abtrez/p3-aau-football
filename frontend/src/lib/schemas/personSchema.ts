import { z } from "zod";

export const personSchema = z.object({
  id: z.number(), // This becomes a string once we have a Person collection in MongoDB
  firstName: z.string(),
  lastName: z.string(),
  roles: z.array(z.string()).optional(),
});

export type Person = z.infer<typeof personSchema>;