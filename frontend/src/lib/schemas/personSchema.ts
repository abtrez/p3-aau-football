import { z } from "zod";
import { roleSchema } from "@/lib/schemas/roleSchema";

export const personSchema = z.object({
  id: z.string(), 
  firstName: z.string(),
  lastName: z.string(),
  roles: z.array(roleSchema).nullish(),
  teamId: z.string().optional()
});

export type Person = z.infer<typeof personSchema>;