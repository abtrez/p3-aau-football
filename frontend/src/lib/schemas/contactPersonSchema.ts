import { z } from "zod";

export const contactPersonSchema = z.object({
  phoneNumber: z.string(),
});

export type contactPerson = z.infer<typeof contactPersonSchema>;