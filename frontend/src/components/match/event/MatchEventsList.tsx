"use client"

import {useState} from "react";
import MatchEventRow from "./MatchEventRow";
import {MatchEventRequest,
        MatchEventResponse, GoalMatchEventResponse, CardMatchEventResponse
} from "@/lib/schemas/matchEventSchema";
import {EditMatchEventForm} from "@/components/match/event/EditMatchEventForm";
import {Person} from "@/lib/schemas/personSchema";
import { Dialog, DialogContent } from "@mui/material";

interface MatchEventsListProps {
    events: MatchEventResponse[];
    homeTeamId: string;
    awayTeamId: string;
    playersById: Record<string, Person>;
    playersByTeamId: Record<string, Person[]>,
    onDeleteEvent: (eventId: string) => Promise<void> | void;
    onUpdateEvent: (eventId: string, dto: MatchEventRequest) => Promise<void> | void
}

/** View model used by MatchEventRow */
export interface MatchEventView {
    id: string;
    isHomeTeamEvent: boolean;
    minuteLabel: string;
    primaryText: string;
    secondaryText?: string;
    iconLabel: string;
    rawEvent: MatchEventResponse;
}

export default function MatchEventsList({
    events,
    homeTeamId,
    awayTeamId,
    playersById,
    playersByTeamId,
    onDeleteEvent,
    onUpdateEvent,
} : MatchEventsListProps) {

    // Track which single event is currently being edited (null if none)
    const [eventBeingEdited, setEventBeingEdited] = useState<MatchEventResponse | null>(null);

    async function handleEditSave(eventId: string, dto: MatchEventRequest) {
        await onUpdateEvent(eventId, dto)
        setEventBeingEdited(null);
    }

    /** Row-level: user pressed "delete" on a specific event. */
    async function handleDeleteEvent(eventId: string) {
        await onDeleteEvent(eventId);
    }

    if (events.length === 0 ) {
        return (<p>No events recorded yet</p>);
    }


    return (
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
            <header className="px-4 py-3 border-b border-gray-100">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Match events
                </h2>
            </header>

            <div className="flex flex-col">
                {events.map((matchEvent: MatchEventResponse) => {
                    //Prepare view
                    const viewModel = buildMatchEventView(
                        matchEvent,
                        playersById,
                        homeTeamId,
                    );

                    return (
                        <MatchEventRow
                            key={viewModel.id}
                            viewModel={viewModel}
                            onEdit={() => setEventBeingEdited(matchEvent)}
                            onDelete = {handleDeleteEvent}
                        />
                    )
                })}
            </div>

            {/* Edit form in a modal dialog */}
            <Dialog
                open={!!eventBeingEdited}
                onClose={()=> setEventBeingEdited(null)}
                fullWidth
                maxWidth="sm"
            >
                {eventBeingEdited && (
                    <DialogContent>
                        <EditMatchEventForm
                            matchEvent={eventBeingEdited}
                            homeTeamId={homeTeamId}
                            awayTeamId={awayTeamId}
                            playersByTeamId={playersByTeamId}
                            onSave={handleEditSave}
                            onCancel={() => setEventBeingEdited(null)}
                        />
                    </DialogContent>
                )}
            </Dialog>
        </div>
    );
}

/**Helper: playerId --> "FirstName LastName" or undefined*/
function resolvePlayerName(
    playerId: string | null | undefined,
    playersById: Record<string, Person>,
): string | undefined {

    if (!playerId) return undefined;

    //check lookup table
    const player = playersById[playerId];
    if (!player) return undefined;

    return `${player.firstName} ${player.lastName}`;
}

/** Goal specific text: scorer as primary, assister as secondary */
function buildGoalPresentation(
    matchEvent: GoalMatchEventResponse,
    playersById: Record<string, Person>,
): { primaryText: string; secondaryText?: string; iconLabel: string } {

    const scorerName = resolvePlayerName(matchEvent.playerId, playersById);
    const assisterName = resolvePlayerName(matchEvent.assisterId, playersById);

    const primaryText = scorerName ? scorerName : "Unknown";
    const secondaryText = assisterName ? `Assist: ${assisterName}`: undefined;

    return {primaryText, secondaryText, iconLabel: "GOAL",};
}

/** CARD specific text: card as primary, (secondary future work, second yellow)*/
function buildCardPresentation(
    matchEvent: CardMatchEventResponse,
    playersById: Record<string, Person>,
): { primaryText: string; secondaryText?: string; iconLabel: string } {

    const playerName = resolvePlayerName(matchEvent.playerId, playersById);

    const primaryText = playerName ? playerName : "Unknown";

    const secondaryText = undefined; //e.g. Second Yellow, future work

    const iconLabel = matchEvent.cardType === "RED_CARD" ? "RED CARD" : "YELLOW CARD";

    return { primaryText, secondaryText, iconLabel };
}

/**
 * Centralized determining of view model, through helpers:
 * - Resolves names
 * - Decides primary/secondary text
 * - Sets icon label
 * - Marks side home/away the event belongs to. For flipping
 */
export function buildMatchEventView(
    matchEvent: MatchEventResponse,
    playersById: Record<string, Person>,
    homeTeamId: string,
): MatchEventView {
    const isHomeTeamEvent = matchEvent.teamId === homeTeamId;
    const minuteLabel = matchEvent.minute != null ? `${matchEvent.minute}'` : "";

    //Destructure return object, TODO: extensibility, exhaustive switch statement, based on zod?
    const { primaryText, secondaryText, iconLabel } = matchEvent.type === "GOAL"
        ? buildGoalPresentation(matchEvent, playersById)
        : buildCardPresentation(matchEvent, playersById);

    return {
        id: String(matchEvent.id),
        isHomeTeamEvent,
        minuteLabel,
        primaryText,
        secondaryText,
        iconLabel,
        rawEvent: matchEvent,
    };
}
