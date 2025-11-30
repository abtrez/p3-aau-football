"use client";

import { useState } from "react";
import { Paper, FormControl, Button } from "@mui/material";
import { MatchEventResponse } from "@/lib/schemas/matchEventSchema";
import {
    MatchEventFields,
    MatchEventType,
} from "@/components/match/MatchEventFields";

interface EditMatchEventFormProps {
    matchEvent: MatchEventResponse;
    homeTeamId: string;
    awayTeamId: string;
    onSave: (input: {
        eventId: string;
        type: "GOAL" | "CARD";
        teamId: string;
        minute: number;
    }) => Promise<void> | void;
    onCancel: () => void;
}

export function EditMatchEventForm({
    matchEvent,
    homeTeamId,
    awayTeamId,
    onSave,
    onCancel,
    }: EditMatchEventFormProps) {
    const [type, setType] = useState<MatchEventType>(matchEvent.type);
    const [teamId, setTeamId] = useState(matchEvent.teamId);
    const [minute, setMinute] = useState(
        matchEvent.minute != null ? String(matchEvent.minute) : "",
    );
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setLoading(true);

        try {
            await onSave({
                eventId: String(matchEvent.id),
                type: type,
                teamId: teamId? teamId : "",
                minute: Number(minute),
            });
        } catch (err) {
            console.error("Failed to update event:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Paper className="mt-4 p-4">
            <form onSubmit={handleSubmit}>
                <MatchEventFields
                    type={type}
                    teamId={teamId? teamId : ""}
                    minute={minute}
                    homeTeamId={homeTeamId}
                    awayTeamId={awayTeamId}
                    onTypeChange={setType}
                    onTeamChange={setTeamId}
                    onMinuteChange={setMinute}
                />

                <div className="mt-4 flex gap-2 justify-end">
                    <FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save"}
                        </Button>
                    </FormControl>
                    <FormControl>
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </FormControl>
                </div>
            </form>
        </Paper>
    );
}