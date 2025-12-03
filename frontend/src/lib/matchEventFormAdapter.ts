import {MatchEventRequest, matchEventRequestSchema} from "@/lib/schemas/matchEventSchema";

//Shared string types for Event & Card types. To avoid literals everywhere
export type MatchEventType = "GOAL" | "CARD";
export type CardType = "YELLOW_CARD" | "RED_CARD";

//React form state for creating/editing a match event
export type MatchEventFormState = {
    type: MatchEventType;
    teamId: string;
    playerId: string; // "" -> null
    minute: string;   // "" -> null, forms treats field as string, zod requires int.
    assisterId?: string;    // GOAL only
    cardType?: CardType;    // CARD only
}

//Convert UI form state -> validated dto payload for backend
export function formStateToMatchEventRequest(
    formState: MatchEventFormState
): MatchEventRequest {

    const minuteClean = formState.minute.trim();

    const base = {
        teamId: formState.teamId,
        playerId: formState.playerId === "" ? null : formState.playerId, //optional
        minute: minuteClean === "" ? null : minuteClean //optional, zod coercion to number
    };

    //GOAL
    if (formState.type === "GOAL") {
        return matchEventRequestSchema.parse({
            type: "GOAL",
            ...base,
            assisterId: formState.assisterId === "" ? null : formState.assisterId, //optional
        });
    }

    //CARD
    return matchEventRequestSchema.parse({
        type: "CARD",
        ...base,
        cardType: formState.cardType,
    });
}