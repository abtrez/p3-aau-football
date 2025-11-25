"use server"

import {Match, matchSchema} from "@/lib/schemas/matchSchema";
import {DeleteMatchEventInput, deleteMatchEventInputSchema} from "@/lib/schemas/matchEventSchema";

const BACKEND_URL = process.env.BACKEND_URI || "https://example.com/mock-api";
if (!BACKEND_URL) {
    throw new Error("BACKEND_URI environment variable is not defined");
}

export async function deleteMatchEvent( input: DeleteMatchEventInput) : Promise<Match> {

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
            `Failed to fetch match ${matchId}: ${res.status} ${res.statusText}`,
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


