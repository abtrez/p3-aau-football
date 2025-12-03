"use client"

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import {CardType} from "@/lib/matchEventFormAdapter";

interface CardEventFieldsProps {
    cardType: CardType;
    onCardTypeChange: (value: CardType) => void;
}

/** CARD specific fields: cardType (required) */
export default function CardEventFields({
    cardType,
    onCardTypeChange,
    }: CardEventFieldsProps) {
    return (
        <FormControl>
            <InputLabel id="card-type-label">Card Type</InputLabel>
            <Select
                labelId="card-type-label"
                label="Card Type"
                value={cardType}
                onChange={(event) =>
                    onCardTypeChange(event.target.value as CardType)
                }
            >
                <MenuItem value="YELLOW_CARD">Yellow Card</MenuItem>
                <MenuItem value="RED_CARD">Red Card</MenuItem>
            </Select>
        </FormControl>
    );
}