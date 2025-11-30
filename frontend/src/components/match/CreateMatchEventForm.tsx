"use client"

import {FormEvent, useState} from "react";
import {MatchEventFields, MatchEventType} from "@/components/match/MatchEventFields";
import { Paper, FormControl, Button } from "@mui/material";
import {createMatchEvents} from "@/lib/fetchMatchEvent";

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
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        setLoading(true);

        const numericMinute = Number(minute);

        try {
            await createMatchEvents({
                matchId: matchId,
                type: type,
                teamId: teamId,
                minute: numericMinute,
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