"use client";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Person } from "@/lib/schemas/personSchema";

interface GoalEventFieldsProps {
  assisterId: string;
  scorerId: string;
  players: Person[]; //for current team
  onAssisterChange: (value: string) => void;
}

/** GOAL specific fields: assister */
export default function GoalEventFields({
  assisterId,
  scorerId,
  players,
  onAssisterChange,
}: GoalEventFieldsProps) {
  return (
    <FormControl>
      <InputLabel id="assister-label">Assister</InputLabel>
      <Select
        labelId="assister-label"
        value={assisterId}
        label="Assister"
        onChange={(event) => onAssisterChange(event.target.value as string)}
      >
        <MenuItem value="">
          <em>No assist / Unknown</em>
        </MenuItem>
        {/* Populate with players of selected team */}
        {players.map((player) => {
          if (player.id === scorerId) return null;
          return (
            <MenuItem key={player.id} value={player.id}>
              {player.firstName} {player.lastName}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
