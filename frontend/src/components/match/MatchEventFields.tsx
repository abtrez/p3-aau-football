"use client"

import {
    FormGroup,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from "@mui/material"

export type MatchEventType = "GOAL" | "CARD";

interface MatchEventFieldsProps {
    //current values
    type: MatchEventType;
    teamId: string;
    minute: string;

    //needed to populate team dropdown
    homeTeamId: string;
    awayTeamId: string;

    //handlers
    onTypeChange: (value: MatchEventType) => void;
    onTeamChange: (value: string) => void;
    onMinuteChange: (value: string) => void;

}

export function MatchEventFields({
    type,
    teamId,
    minute,

    homeTeamId,
    awayTeamId,

    onTypeChange,
    onTeamChange,
    onMinuteChange
}: MatchEventFieldsProps ) {
    return (
        <FormGroup className="gap-4">

            {/* Event type: GOAL or CARD */}
            <FormControl>
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                    labelId="type-label"
                    value={type}
                    label="Type"
                    onChange={(e) => onTypeChange(e.target.value as MatchEventType)}
                >
                    <MenuItem value="GOAL">Goal</MenuItem>
                    <MenuItem value="CARD">Card</MenuItem>
                </Select>
            </FormControl>

            {/* Team: home or away */}
            <FormControl>
                <InputLabel id="team-label">Team</InputLabel>
                <Select
                    labelId="team-label"
                    value={teamId}
                    label="Team"
                    onChange={(e) => onTeamChange(e.target.value as string)}
                >
                    <MenuItem value={homeTeamId}>Home team</MenuItem>
                    <MenuItem value={awayTeamId}>Away team</MenuItem>
                </Select>
            </FormControl>


            {/* Minute */}
            <TextField
                label="Minute"
                type="number"
                size="small"
                value={minute}
                onChange={(e) => onMinuteChange(e.target.value)}
            />
        </FormGroup>

    );
}