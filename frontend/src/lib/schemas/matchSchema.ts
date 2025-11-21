import { z } from "zod";
import { teamSchema } from "@/lib/schemas/teamSchema";

const venueSchema = z.object({
  id: z.string(),
  name: z.string(),
  pitchIdentifier: z.string().nullable(),
  address: z.string(),
});

const refereeSchema = z.object({
  id: z.string(),
  name: z.string(),
});

/** Base schema mirroring backend's MatchEvent abstract class.
 * As with the java subclasses, zod schemas are defined for each subtype, in turn mirroring their corresponding backend class.
 * This schema serves as a base, which subtype schemas (goal, card) extend upon with a discriminator literal ("type") and subtype-specific fields.
 */
const baseMatchEventSchema = z.object({
  id: z.string().nullish(),
  playerId: z.string().nullish(),
  teamId: z.string().nullish(),
  minute: z.number().int().nonnegative().nullish()
});

/** Extends {@link baseMatchEventSchema} with keys for the schema's corresponding java class's fields */
const goalMatchEventSchema = baseMatchEventSchema.extend({
    type: z.literal("GOAL"), //as defined by jackson in backend MatchEvent class
    assisterId: z.string().nullish()
});

/** Extends {@link baseMatchEventSchema} with the keys for the schema's corresponding java class's fields */
const cardMatchEventSchema = baseMatchEventSchema.extend({
  type: z.literal("CARD"), //as defined by jackson in backend MatchEvent class
  cardType: z.enum(["YELLOW_CARD", "RED_CARD"]),
});

/** MatchEvent schema representing all possible match events.
 * "type" argument is the discriminator, which zod uses to decide which
 * subtype schema to validate against. */
export const matchEventSchema = z.discriminatedUnion("type", [
  goalMatchEventSchema,
  cardMatchEventSchema,
]);

export const matchSchema = z.object({
  id: z.string(),
  season: z.string().nullish(),
  competition: z.string().nullish(),
  homeTeam: teamSchema,
  awayTeam: teamSchema,
  venue: venueSchema.nullish(),
  kickoff: z.string().nullish(),
  referees: z.array(refereeSchema).nullish(),
  homeScore: z.number(),
  awayScore: z.number(),
  matchEvents: z.array(matchEventSchema).nullish(),
});

export const matchesArraySchema = z.array(matchSchema);

export type MatchEvent = z.infer<typeof matchEventSchema>;
export type Match = z.infer<typeof matchSchema>;
