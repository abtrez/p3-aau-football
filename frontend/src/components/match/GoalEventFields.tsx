"use client"

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";

interface GoalEventFieldsProps {
    assisterId: string;
    onAssisterChange: (value: string) => void;
}

/** GOAL specific fields: assister */
export default function GoalEventFields({
        assisterId,
        onAssisterChange
    }: GoalEventFieldsProps) {
    return (
        <FormControl>
            <InputLabel id="assister-label">Assister (optional)</InputLabel>
            <Select
                labelId="assister-label"
                value={assisterId}
                label="Assister"
                onChange={(event) => onAssisterChange(event.target.value as string)}
            >
                <MenuItem value="">Unreported</MenuItem>
                {/* TODO: populate players of selected team */}
            </Select>
        </FormControl>
    );
}