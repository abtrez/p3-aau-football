"use client";

import { useState } from "react";
import { FormControl, Button } from "@mui/material";
import {
  MatchEventRequest,
  MatchEventResponse,
} from "@/lib/schemas/matchEventSchema";
import MatchEventFormFields from "@/components/match/event/MatchEventFormFields";
import {
  formStateToMatchEventRequest,
  MatchEventFormState,
} from "@/lib/matchEventFormAdapter";
import { Person } from "@/lib/schemas/personSchema";

interface EditMatchEventFormProps {
  matchEvent: MatchEventResponse;
  homeTeamId: string;
  awayTeamId: string;
  homeTeamName: string;
  awayTeamName: string;
  playersByTeamId: Record<string, Person[]>;
  onSave: (eventId: string, dto: MatchEventRequest) => Promise<void> | void;
  onCancel: () => void;
}

/** Edit form (existing event)
 * Backend invariant: type and team cannot be changed.*/
export function EditMatchEventForm({
  matchEvent,
  homeTeamId,
  awayTeamId,
  homeTeamName,
  awayTeamName,
  playersByTeamId,
  onSave,
  onCancel,
}: EditMatchEventFormProps) {
  //Initialise state based on backend/response match event object
  const [formState, setFormState] = useState<MatchEventFormState>(() => {
    if (matchEvent.type === "GOAL") {
      return {
        type: "GOAL",
        teamId: matchEvent.teamId ?? homeTeamId, //drop when zod non-null
        playerId: matchEvent.playerId ?? "",
        minute: matchEvent.minute != null ? String(matchEvent.minute) : "",
        assisterId: matchEvent.assisterId ?? "",
      };
    }

    return {
      type: "CARD",
      teamId: matchEvent.teamId ?? homeTeamId,
      playerId: matchEvent.playerId ?? "",
      minute: matchEvent.minute != null ? String(matchEvent.minute) : "",
      assisterId: "",
      cardType: matchEvent.cardType,
    };
  });

  const [loading, setLoading] = useState(false);

  //patch function, passed down. Called by subcomponents when fields change. Merges partial updates to state variable
  function updateFormState(update: Partial<MatchEventFormState>) {
    setFormState((prev) => ({ ...prev, ...update }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      const dto = formStateToMatchEventRequest(formState);
      await onSave(String(matchEvent.id), dto);
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
        mode="edit"
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        homeTeamName={homeTeamName}
        awayTeamName={awayTeamName}
        playersByTeamId={playersByTeamId}
        onChange={updateFormState}
      />

      {/*Submit button*/}
      <FormControl>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </FormControl>
      {/*Cancel button*/}
      <FormControl>
        <Button type="button" variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </FormControl>
    </form>
  );
}
