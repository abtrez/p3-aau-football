import { z } from "zod";
import { personSchema } from "./personSchema";
import { contactPersonSchema } from "./contactPersonSchema";
// import { personSchema } from "@/lib/schemas/personSchema";

// Single source of truth for what our team objects look like
export const teamSchema = z.object({
  id: z.string(),
  name: z.string(),
  abbreviation: z.string(),
  yearEstablished: z.number(),
  department: z.string(),
  studyPrograms: z.array(z.string()),
  size: z.number(),
  members: z.array(personSchema),
  contactPerson: contactPersonSchema.optional(),
  logo: z.string().nullish(),
});

export const teamsArraySchema = z.array(teamSchema);

export type Team = z.infer<typeof teamSchema>;
