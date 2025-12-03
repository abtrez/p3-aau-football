"use client"

import { Paper, FormControl, Button } from "@mui/material";
import {MatchEventRequest} from "@/lib/schemas/matchEventSchema";
import MatchEventFormFields from "@/components/match/MatchEventFormFields";
import {useState} from "react";
import {formStateToMatchEventRequest, MatchEventFormState} from "@/lib/matchEventFormAdapter";

interface CreateMatchEventFormProps {
    homeTeamId: string;
    awayTeamId: string;
    onSubmit: (dto: MatchEventRequest) => Promise<void> | void;
}

/** Create form: logging new event*/
export function CreateMatchEventForm({
    homeTeamId,
    awayTeamId,
    onSubmit
}: CreateMatchEventFormProps) {

    //Form holds state, passes it down
    const [formState, setFormState] = useState<MatchEventFormState>({
        type: "GOAL",
        teamId: homeTeamId,
        playerId: "",
        minute: "",
        assisterId: "",
        cardType: "YELLOW_CARD", // used if user switches to CARD
    });
    const [loading, setLoading] = useState(false);

    //patch function, passed down. Called by subcomponents when fields change. Merges partial updates to state variable
    function updateFormState(update: Partial<MatchEventFormState>) {
        setFormState((prev) => ({ ...prev, ...update }));
    }

    /** Event handler */
    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setLoading(true);

        try {
            const dto = formStateToMatchEventRequest(formState);
            await onSubmit(dto);

            // Clear fields
            setFormState((prev) => ({
                ...prev,
                playerId: "",
                minute: "",
                assisterId: "",
            }));
        } catch (err) {
            console.error("Invalid match event:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Paper className="mt-4 p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/*Main Content*/}
                <MatchEventFormFields
                    formState={formState}
                    mode="create"
                    homeTeamId={homeTeamId}
                    awayTeamId={awayTeamId}
                    onChange={updateFormState}
                />

                {/*Submit button*/}
                <FormControl className="mt-2">
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? "Saving..." : "Add event"}
                    </Button>
                </FormControl>
            </form>
        </Paper>
    );
}