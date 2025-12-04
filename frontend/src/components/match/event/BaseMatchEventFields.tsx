"use client";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Stack,
  FormHelperText,
} from "@mui/material";
import { MatchEventType } from "@/lib/matchEventFormAdapter";
import { Person } from "@/lib/schemas/personSchema";

interface BaseMatchEventFieldsProps {
  mode: "create" | "edit";
  type: MatchEventType;
  teamId: string;
  playerId: string;
  minute: string;
  homeTeamId: string;
  awayTeamId: string;
  homeTeamName: string;
  awayTeamName: string;
  players: Person[]; //for current team
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
  homeTeamName,
  awayTeamName,
  players, //for current team
  onTypeChange,
  onTeamChange,
  onMinuteChange,
  onPlayerChange,
}: BaseMatchEventFieldsProps) {
  const isEditMode = mode === "edit";

  const minuteNumber = Number(minute);
  const minuteInvalid =
    minute !== "" &&
    (Number.isNaN(minuteNumber) || minuteNumber < 0 || minuteNumber > 130);

  return (
    <Stack spacing={2}>
      {/* Event type: GOAL or CARD, locked in edit mode*/}
      <FormControl required={!isEditMode} disabled={isEditMode}>
        {/* Type */}
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          value={type}
          label="Type"
          onChange={(event) =>
            !isEditMode && onTypeChange(event.target.value as MatchEventType)
          }
        >
          <MenuItem value="GOAL">Goal</MenuItem>
          <MenuItem value="CARD">Card</MenuItem>
        </Select>
        <FormHelperText>
          {isEditMode && "Type cannot be changed."}
        </FormHelperText>
      </FormControl>

      {/* Team: home or away, locked in edit mode*/}
      <FormControl required={!isEditMode} disabled={isEditMode}>
        <InputLabel id="team-label">Team</InputLabel>
        <Select
          labelId="team-label"
          value={teamId}
          label="Team"
          onChange={(event) =>
            !isEditMode && onTeamChange(event.target.value as string)
          }
        >
          <MenuItem value={homeTeamId}>{homeTeamName}</MenuItem>
          <MenuItem value={awayTeamId}>{awayTeamName}</MenuItem>
        </Select>
        <FormHelperText>
          {isEditMode && "Team cannot be changed."}
        </FormHelperText>
      </FormControl>

      {/* Minute (optional) */}
      <TextField
        label="Minute"
        type="numeric"
        error={minuteInvalid}
        helperText={minuteInvalid ? "Minute must be between 0 and 130." : ""}
        value={minute}
        onChange={(event) => onMinuteChange(event.target.value)}
      />

      {/* Player (optional) */}
      <FormControl>
        <InputLabel id="player-label">Player</InputLabel>
        <Select
          labelId="player-label"
          value={playerId}
          label="Player"
          onChange={(event) => onPlayerChange(event.target.value as string)}
        >
          <MenuItem value="">
            <em>Unknown</em>
          </MenuItem>
          {/* Populate with players of selected team */}
          {players.map((player) => (
            <MenuItem key={player.id} value={player.id}>
              {player.firstName} {player.lastName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
