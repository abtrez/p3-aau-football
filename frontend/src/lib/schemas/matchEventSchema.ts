import { z } from "zod";

// Response Schemas: defines what backend should send.
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

/** Zod runtime validation logic
 * MatchEvent schema representing all possible match events.
 * "type" argument is the discriminator, which zod uses to decide which
 * subtype schema to validate against. */
export const matchEventSchema = z.discriminatedUnion("type", [
    goalMatchEventSchema,
    cardMatchEventSchema,
]);

//Typescript type to use in React Components
export type MatchEvent = z.infer<typeof matchEventSchema>;

// Request Schemas: Defines what frontend should send to backend, used to validate user input
export const deleteMatchEventInputSchema = z.object({
    matchId: z.string(),
    eventId: z.string()
});
export type DeleteMatchEventInput = z.infer<typeof deleteMatchEventInputSchema>


// Create
export const createMatchEventInputSchema = z.object({
    matchId: z.string(),
    type: z.enum(["GOAL", "CARD"]),
    teamId: z.string(),
    minute: z.number().int().nonnegative(),
    // later extend with playerId, assisterId, cardType etc.
});

export type CreateMatchEventInput = z.infer<typeof createMatchEventInputSchema>;