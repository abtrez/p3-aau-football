"use client"

import {
    FormGroup,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from "@mui/material"
import {MatchEventType} from "@/lib/matchEventFormAdapter";

interface BaseMatchEventFieldsProps {
    mode: "create" | "edit";
    type: MatchEventType;
    teamId: string;
    playerId: string;
    minute: string;
    homeTeamId: string;
    awayTeamId: string;
    onTypeChange: (value: MatchEventType) => void;
    onTeamChange: (value: string) => void;
    onMinuteChange: (value: string) => void;
    onPlayerChange: (value: string) => void;
}

/** Shared fields across all match events:     type, team, player, minute
 * Respecting Backend Invariant: type,team locked on edit. */
export function BaseMatchEventFields({
    mode,
    type,
    teamId,
    playerId,
    minute,
    homeTeamId,
    awayTeamId,
    onTypeChange,
    onTeamChange,
    onMinuteChange,
    onPlayerChange
    }: BaseMatchEventFieldsProps) {
    const isEditMode = mode === "edit";

    return (
        <FormGroup className="gap-4">

            {/* Event type: GOAL or CARD, locked in edit mode*/}
            <FormControl disabled={isEditMode}>
                {/* Type */}
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                    labelId="type-label"
                    value={type}
                    label="Type"
                    onChange={(event) => !isEditMode && onTypeChange(event.target.value as MatchEventType)}
                >
                    <MenuItem value="GOAL">Goal</MenuItem>
                    <MenuItem value="CARD">Card</MenuItem>
                </Select>
            </FormControl>

            {/* Team: home or away, locked in edit mode*/}
            <FormControl disabled={isEditMode}>
                <InputLabel id="team-label">Team</InputLabel>
                <Select
                    labelId="team-label"
                    value={teamId}
                    label="Team"
                    onChange={(event) => !isEditMode && onTeamChange(event.target.value as string)}
                >
                    {/* TODO: display team names */}
                    <MenuItem value={homeTeamId}>Home Team Name</MenuItem>
                    <MenuItem value={awayTeamId}>Away Team Name</MenuItem>
                </Select>
            </FormControl>


            {/* Minute (optional) */}
            <TextField
                label="Minute"
                type="number"
                size="small"
                value={minute}
                onChange={(event) => onMinuteChange(event.target.value)}
            />

            {/* Player (optional) */}
            <FormControl>
                <InputLabel id="player-label">Player (optional)</InputLabel>
                <Select
                    labelId="player-label"
                    value={playerId}
                    label="Player"
                    onChange={(event) => onPlayerChange(event.target.value as string)}
                >
                    <MenuItem value="">Unreported</MenuItem>
                    {/* TODO: populate players of selected team */}
                </Select>
            </FormControl>
        </FormGroup>
    );
  }