"use server"

import {Match, matchSchema} from "@/lib/schemas/matchSchema";
import {
    DeleteMatchEventInput, deleteMatchEventInputSchema,
    CreateMatchEventInput, createMatchEventInputSchema
} from "@/lib/schemas/matchEventSchema";

const BACKEND_URL = process.env.BACKEND_URI || "https://example.com/mock-api";
if (!BACKEND_URL) {
    throw new Error("BACKEND_URI environment variable is not defined");
}

export async function deleteMatchEvent(
    input: DeleteMatchEventInput
) : Promise<Match> {

    /*Validate input params before making the request.
        Should arguably be stricter with .parse instead of .safeParse,
        as input should be directly from url, not user form input. Could reveal app logic issues */
    const parsedInput = deleteMatchEventInputSchema.safeParse(input)
    if(!parsedInput.success) {
        throw new Error("Invalid match or event ids passed to deleteMatchEvent")
    }
    const { matchId, eventId} = parsedInput.data;

    //Perform the deletion request
    const url = `${BACKEND_URL}/api/match/remove/${matchId}/events/${eventId}`
    const res = await fetch(url, {method: "DELETE"} );

    if (!res.ok) {
        throw new Error(
            `Failed to delete match event ${eventId}: ${res.status} ${res.statusText}`,
        );
    }

    // Validate returned json from response body with Zod.
    const json = await res.json();
    const result = matchSchema.safeParse(json); // Same argument .parse instead of .safeParse

    if (!result.success) {
        console.error("Raw JSON from backend:", JSON.stringify(json, null, 2));
        throw new Error("Backend returned invalid match data");
    }
    // Return validated single match data
    return result.data;
}

export async function createMatchEvent(
    input: CreateMatchEventInput
) : Promise <Match> {

    //Validate input prior to making request
    const parsed = createMatchEventInputSchema.parse(input)


    const { matchId, ...rest } = parsed; //TODO: fix ... rest

    // TODO: Fix backend contract and remove this.
    const dto = {
        type: rest.type,
        teamId: rest.teamId,
        playerId: null,       // extend later if needed
        minute: rest.minute,
        assisterId: null,     // extend later if needed
        cardType: null,       // extend later if needed (for cards)
    };

    // Call backend, service expects a List<MatchEventRequestDTO>, therefore sending [dto]
    const res = await fetch(
        `${BACKEND_URL}/api/match/add/${matchId}/events`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([dto]),
        }
    );

    if (!res.ok) {
        throw new Error(
            `Failed to create match event: ${res.status} ${res.statusText}`
        );
    }

    // Validate the returned Match (json from response body) with matchSchema
    const json = await res.json();
    const result = matchSchema.safeParse(json);

    if (!result.success) {
        console.error("Raw JSON from backend:", JSON.stringify(json, null, 2));
        throw new Error("Backend returned invalid match data when creating event");
    }

    // Return the updated Match with new events list
    return result.data;
}

export async function updateMatchEvent(input: {
    //TODO: use props when backend contract fixed
    matchId: string;
    eventId: string;
    type: "GOAL" | "CARD";
    teamId: string;
    minute: number;
}): Promise<Match> {
    const { matchId, eventId, ...rest } = input;

    // TODO:  Temporary DTO: fixing once the backend contract is final
    const dto = {
        type: rest.type,
        teamId: rest.teamId,
        playerId: null,   // TODO: later when adding player selection
        minute: rest.minute,
        assisterId: null, // TODO: for GOAL
        cardType: null,   // TODO: for CARD
    };

    const res = await fetch(
        `${BACKEND_URL}/api/match/update/${matchId}/events/${eventId}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dto),
        }
    );

    if (!res.ok) {
        throw new Error(
            `Failed to update match event: ${res.status} ${res.statusText}`
        );
    }

    const json = await res.json();
    const parsed = matchSchema.safeParse(json);
    if (!parsed.success) {
        console.error("Raw JSON from backend:", JSON.stringify(json, null, 2));
        throw new Error("Backend returned invalid match data on update");
    }

    return parsed.data;
}


