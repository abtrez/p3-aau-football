"use server"

import {Match, matchSchema} from "@/lib/schemas/matchSchema";
import {
    DeleteMatchEventInput, deleteMatchEventInputSchema,
    CreateMatchEventsInput, createMatchEventsInputSchema,
    UpdateMatchEventInput, updateMatchEventInputSchema,
} from "@/lib/schemas/matchEventSchema";

const BACKEND_URL = process.env.BACKEND_URI || "https://example.com/mock-api";
if (!BACKEND_URL) {
    throw new Error("BACKEND_URI environment variable is not defined");
}

export async function deleteMatchEvent(input: DeleteMatchEventInput) : Promise<Match> {

    //Validate input prior to making request
    const { matchId, eventId} = deleteMatchEventInputSchema.parse(input)

    //Perform deletion request
    const url = `${BACKEND_URL}/api/match/remove/${matchId}/events/${eventId}`
    const response = await fetch(url, {method: "DELETE"} );

    if (!response.ok) {
        throw new Error(
            `Failed to delete match event ${eventId}: ${response.status} ${response.statusText}`,
        );
    }

    // Validate the returned Match (json from response body) with matchSchema
    const json = await response.json();
    const result = matchSchema.safeParse(json); // Same argument .parse instead of .safeParse

    if (!result.success) {
        console.error("Raw JSON from backend:", JSON.stringify(json, null, 2));
        throw new Error("Backend returned invalid match data on delete.");
    }

    //Return the validated Match with the updated events list
    return result.data;
}

export async function createMatchEvents(input: CreateMatchEventsInput) : Promise <Match> {

    //Validate input prior to making request
    const { matchId, events} = createMatchEventsInputSchema.parse(input);

    //Make creation request
    const response = await fetch(
        `${BACKEND_URL}/api/match/add/${matchId}/events`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(events), //List<MatchEventRequestDTO
        }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to create match events: ${response.status} ${response.statusText}`
        );
    }

    //Validate the returned Match (json from response body) with matchSchema
    const json = await response.json();
    const result = matchSchema.safeParse(json);

    if (!result.success) {
        console.error("Raw JSON from backend:", JSON.stringify(json, null, 2));
        throw new Error("Backend returned invalid match data when creating events");
    }

    //Return the validated Match with the updated events list
    return result.data;
}

export async function updateMatchEvent(input: UpdateMatchEventInput): Promise<Match> {

    //Validate input prior to making request
    const { matchId, eventId, event} = updateMatchEventInputSchema.parse(input);

    //Make update request
    const response = await fetch(
        `${BACKEND_URL}/api/match/update/${matchId}/events/${eventId}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(event),
        }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to update match event: ${response.status} ${response.statusText}`
        );
    }

    //Validate the returned Match (json from response body) with matchSchema
    const json = await response.json();
    const parsed = matchSchema.safeParse(json);
    if (!parsed.success) {
        console.error("Raw JSON from backend:", JSON.stringify(json, null, 2));
        throw new Error("Backend returned invalid match data on update");
    }

    //Return the validated Match with the updated events list
    return parsed.data;
}


