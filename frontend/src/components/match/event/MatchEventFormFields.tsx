"use client";

import { BaseMatchEventFields } from "@/components/match/event/BaseMatchEventFields";
import GoalEventFields from "@/components/match/event/GoalEventFields";
import CardEventFields from "@/components/match/event/CardEventFields";
import { MatchEventFormState } from "@/lib/matchEventFormAdapter";
import { Person } from "@/lib/schemas/personSchema";

interface MatchEventFormFieldsProps {
  formState: MatchEventFormState;
  mode: "create" | "edit";
  homeTeamId: string;
  awayTeamId: string;
  homeTeamName: string;
  awayTeamName: string;
  playersByTeamId: Record<string, Person[]>;
  onChange: (update: Partial<MatchEventFormState>) => void;
}

/** Combines:
 * Base fields (type, team, minute, player)
 * + Fields for current type (GOAL or CARD)
 */
export default function MatchEventFormFields({
  formState,
  mode,
  homeTeamId,
  awayTeamId,
  homeTeamName,
  awayTeamName,
  playersByTeamId,
  onChange,
}: MatchEventFormFieldsProps) {
  //Lookup once
  const playersForTeam = playersByTeamId[formState.teamId];
  return (
    <div className="flex flex-col gap-4">
      {/*Always render base fields*/}
      <BaseMatchEventFields
        mode={mode}
        type={formState.type}
        teamId={formState.teamId}
        playerId={formState.playerId}
        minute={formState.minute}
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        homeTeamName={homeTeamName}
        awayTeamName={awayTeamName}
        players={playersForTeam}
        onTypeChange={(type) => onChange({ type })}
        onTeamChange={(teamId) => onChange({ teamId })}
        onMinuteChange={(minute) => onChange({ minute })}
        onPlayerChange={(playerId) => onChange({ playerId })}
      />

      {/*Conditional render based on type*/}
      {formState.type === "GOAL" && (
        <GoalEventFields
          assisterId={formState.assisterId ?? ""}
          scorerId={formState.playerId}
          players={playersForTeam}
          onAssisterChange={(assisterId) => onChange({ assisterId })}
        />
      )}

      {formState.type === "CARD" && (
        <CardEventFields
          cardType={formState.cardType ?? "YELLOW_CARD"}
          onCardTypeChange={(cardType) => onChange({ cardType })}
        />
      )}
    </div>
  );
}
