import { z } from "zod";

/** Grouped by responsibility
 *
 * Response side:   shape of (MatchEvent) model objects returned by backend.
 * Request side:    payload shape for create/update functionality (MatchEventRequestDTO)
 * Operational:     input objects for server actions (path params + DTO payload ^)
 *
 * Base schemas for shared fields, are extended upon by subtype specific schemas with:
 *     - a discriminator literal ("type")
 *     - subtype-specific fields.
 *
 * Both response and request hierarchies use a discriminated union on the "type" field
 * ("GOAL" | "CARD"), mirroring the backend's Jackson @JsonTypeInfo configuration.
 */

/** _________________________________________________________________________________
 *  Response Side:  MatchEvent (Goal, Card) domain objects backend returns inside Match.
                    Mirrors backend MatchEvent abstract class and its subclasses.
 _________________________________________________________________________________ */
const baseMatchEventResponseSchema = z.object({
    //TODO: tighten schema, nullish, nullable, optional
    id: z.string().nullish(),        //Always present once persisted
    teamId: z.string().nullish(),    //Required in domain
    playerId: z.string().nullish(),  //Optional
    minute: z.coerce.number().int().nonnegative().nullish() //Optional >= 0 if present, consider max()
});

const goalEventResponseSchema = baseMatchEventResponseSchema.extend({
    type: z.literal("GOAL"), //discriminator as defined by Jackson on MatchEvent backend class
    assisterId: z.string().nullish() //TODO: nullable instead?
});

const cardEventResponseSchema = baseMatchEventResponseSchema.extend({
    type: z.literal("CARD"), //discriminator as defined by Jackson on MatchEvent backend class
    cardType: z.enum(["YELLOW_CARD", "RED_CARD"]),
});

/** Runtime validation for any MatchEvent responses
 * "type" argument: discriminator zod uses to decide: which subtype schema to validate against. */
export const matchEventResponseSchema = z.discriminatedUnion("type", [
    goalEventResponseSchema,
    cardEventResponseSchema,
]);

/** Typescript type to use in React Components */
export type MatchEventResponse = z.infer<typeof matchEventResponseSchema>;


/** _________________________________________________________________________________
 *  Request Side:   MatchEventRequestDTO (GoalEventRequestDTO, CardEventRequestDTO)
                    Defines payload data frontend sends to backend for create/update.
 _________________________________________________________________________________ */
const baseMatchEventRequestSchema = z.object({
    //TODO: tighten schema, nullish, nullable, optional
    teamId: z.string().nullable(),
    playerId: z.string().nullable(),
    minute: z.coerce.number().int().nonnegative().nullable(), //Optional >= 0 if present, consider max() //coerce
});

const goalEventRequestSchema = baseMatchEventRequestSchema.extend({
    type: z.literal("GOAL"),
    assisterId: z.string().nullish(), //TODO: nullable instead?
});

const cardEventRequestSchema = baseMatchEventRequestSchema.extend({
    type: z.literal("CARD"),
    cardType: z.enum(["YELLOW_CARD", "RED_CARD"]),
});

/** Discriminated union for any match event request payload.
 * Runtime validation for the JSON body expected by POST/PUT event endpoints.
 */
export const matchEventRequestSchema = z.discriminatedUnion("type", [
    goalEventRequestSchema,
    cardEventRequestSchema,
]);

/** Typescript type to use in React Components */
export type MatchEventRequest = z.infer<typeof matchEventRequestSchema>;

export const matchEventRequestArraySchema = z.array(matchEventRequestSchema);
export type MatchEventRequestArray = z.infer<typeof matchEventRequestArraySchema>;


/** _________________________________________________________________________________
 *  Operational:   server action input schemas. Combine path parameters with DTO payloads
 _________________________________________________________________________________ */

/** Input object for DELETING a single match event. */
export const deleteMatchEventInputSchema = z.object({
    matchId: z.string(), //path param
    eventId: z.string()  //path param
});
export type DeleteMatchEventInput = z.infer<typeof deleteMatchEventInputSchema>

/** Input object for CREATING one or more match events on a given match. */
export const createMatchEventsInputSchema = z.object({
    matchId: z.string(),                 //path param
    events: matchEventRequestArraySchema //payload, request body. List of events.
});
export type CreateMatchEventsInput = z.infer<typeof createMatchEventsInputSchema>;

/** Input object for UPDATING a single match event. */
export const updateMatchEventInputSchema = z.object({
    matchId: z.string(), //path param
    eventId: z.string(), //path param
    event: matchEventRequestSchema //payload, request body: Single event.
});
export type UpdateMatchEventInput = z.infer<typeof updateMatchEventInputSchema>;