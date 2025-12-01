"use client"

import {FormEvent, useState} from "react";
import {MatchEventFields, MatchEventType} from "@/components/match/MatchEventFields";
import { Paper, FormControl, Button } from "@mui/material";
import {createMatchEvents} from "@/lib/fetchMatchEvent";
import {MatchEventRequest, matchEventRequestSchema} from "@/lib/schemas/matchEventSchema";

// Remember to remove
export type NewMatchEventInput = {
    type: "GOAL" | "CARD";
    teamId: string;
    minute: number;
};

interface CreateMatchEventFormProps {
    matchId: string;
    homeTeamId: string;
    awayTeamId: string;
}

export function CreateMatchEventForm({
    matchId,
    homeTeamId,
    awayTeamId,
}: CreateMatchEventFormProps) {
    const [type, setType] = useState<MatchEventType>("GOAL");
    const [teamId, setTeamId] = useState(homeTeamId);
    const [minute, setMinute] = useState("");

    const [loading, setLoading] = useState(false)

    /** Event handler */
    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setLoading(true);

        const numericMinute = Number(minute);

        try {
            //TODO: fix on a new branch
            //Build raw DTO payload matching MatchEventRequestDTO
            const numericMinute = Number(minute);

            const base = {
                type,
                teamId,
                playerId: null,
                minute: numericMinute,
            };

            // Validate against Zod request schema
            const eventDto: MatchEventRequest = matchEventRequestSchema.parse(
                type === "GOAL"
                    ? {
                        ...base,
                        assisterId: null,
                    }
                    : {
                        ...base,
                        cardType: "YELLOW_CARD" as const,
                    },
            );

            await createMatchEvents({
                matchId,
                events: [eventDto],
            });

            // e.g. reset minute only
            setMinute("");
        } catch (err) {
            console.error("Failed to create event:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Paper>
            <form onSubmit={handleSubmit}>
                {/*Main Content*/}
                <MatchEventFields
                    type={type}
                    teamId={teamId}
                    minute={minute}
                    homeTeamId={homeTeamId}
                    awayTeamId={awayTeamId}
                    onTypeChange={setType}
                    onTeamChange={setTeamId}
                    onMinuteChange={setMinute}
                />

                {/*Submit button*/}
                <FormControl className="mt-4">
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? "Saving..." : "Add event"}
                    </Button>
                </FormControl>
            </form>
        </Paper>
    );
}