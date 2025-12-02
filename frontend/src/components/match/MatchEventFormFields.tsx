"use client";

import {BaseMatchEventFields} from "@/components/match/BaseMatchEventFields";
import GoalEventFields from "@/components/match/GoalEventFields";
import CardEventFields from "@/components/match/CardEventFields";
import {MatchEventFormState} from "@/lib/matchEventFormAdapter";

interface MatchEventFormFieldsProps {
    formState: MatchEventFormState;
    mode: "create" | "edit";
    homeTeamId: string;
    awayTeamId: string;
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
    onChange,
}: MatchEventFormFieldsProps) {
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
                onTypeChange={(type) => onChange({ type })}
                onTeamChange={(teamId) => onChange({ teamId })}
                onMinuteChange={(minute) => onChange({ minute })}
                onPlayerChange={(playerId) => onChange({ playerId })}
            />

            {/*Conditional render based on type*/}
            {formState.type === "GOAL" && (
                <GoalEventFields
                    assisterId={formState.assisterId ?? ""}
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