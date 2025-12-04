"use client";

import { FormControl, Button } from "@mui/material";
import { MatchEventRequest } from "@/lib/schemas/matchEventSchema";
import MatchEventFormFields from "@/components/match/event/MatchEventFormFields";
import { useState } from "react";
import {
  formStateToMatchEventRequest,
  MatchEventFormState,
} from "@/lib/matchEventFormAdapter";
import { Person } from "@/lib/schemas/personSchema";

interface CreateMatchEventFormProps {
  homeTeamId: string;
  awayTeamId: string;
  homeTeamName: string;
  awayTeamName: string;
  playersByTeamId: Record<string, Person[]>;
  onSubmit: (dto: MatchEventRequest) => Promise<void> | void;
}

/** Create form: logging new event*/
export function CreateMatchEventForm({
  homeTeamId,
  awayTeamId,
  homeTeamName,
  awayTeamName,
  playersByTeamId,
  onSubmit,
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/*Main Content*/}
      <MatchEventFormFields
        formState={formState}
        mode="create"
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        homeTeamName={homeTeamName}
        awayTeamName={awayTeamName}
        playersByTeamId={playersByTeamId}
        onChange={updateFormState}
      />

      {/*Submit button*/}
      <FormControl className="mt-2">
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Saving..." : "Add event"}
        </Button>
      </FormControl>
    </form>
  );
}
