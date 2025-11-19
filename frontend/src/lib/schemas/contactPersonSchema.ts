import { z } from "zod";

export const contactPersonSchema = z.object({
  id: z.number(), // This becomes a string once we have a Person collection in MongoDB
  firstName: z.string(),
  lastName: z.string(),
  roles: z.array(z.string()).optional(),
  type: z.string(),
  phoneNumber: z.string(),
});

export type contactPerson = z.infer<typeof contactPersonSchema>;