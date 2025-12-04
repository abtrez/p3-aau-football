"use client";

import { useState } from "react";
import MatchEventRow from "./MatchEventRow";
import {
  MatchEventRequest,
  MatchEventResponse,
} from "@/lib/schemas/matchEventSchema";
import { EditMatchEventForm } from "@/components/match/event/EditMatchEventForm";
import { Person } from "@/lib/schemas/personSchema";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

interface MatchEventsListProps {
  events: MatchEventResponse[];
  homeTeamId: string;
  awayTeamId: string;
  homeTeamName: string;
  awayTeamName: string;
  playersById: Record<string, Person>;
  playersByTeamId: Record<string, Person[]>;
  onDeleteEvent: (eventId: string) => Promise<void> | void;
  onUpdateEvent: (
    eventId: string,
    dto: MatchEventRequest,
  ) => Promise<void> | void;
}

/** View model used by MatchEventRow */
export interface MatchEventView {
  id: string;
  isHomeTeamEvent: boolean;
  minuteLabel: string;
  primaryText: string;
  secondaryText?: string;
  primaryPlayerId?: string;
  secondaryPlayerId?: string;
  iconLabel: string;
  icon: React.ReactNode;
}
/**Renders match list, holds state regarding event being edited*/
export default function MatchEventsList({
  events,
  homeTeamId,
  awayTeamId,
  homeTeamName,
  awayTeamName,
  playersById,
  playersByTeamId,
  onDeleteEvent,
  onUpdateEvent,
}: MatchEventsListProps) {
  // State: single event currently being edited (null if none)
  const [eventBeingEdited, setEventBeingEdited] =
    useState<MatchEventResponse | null>(null);

  /** User pressed "save" when editing specific event. */
  async function handleEditSave(eventId: string, dto: MatchEventRequest) {
    await onUpdateEvent(eventId, dto);
    setEventBeingEdited(null);
  }

  /** User pressed "delete" on a specific event. */
  async function handleDeleteEvent(eventId: string) {
    await onDeleteEvent(eventId);
  }

  if (events.length === 0) {
    return <p>No events recorded yet</p>;
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
              onDelete={handleDeleteEvent}
            />
          );
        })}
      </div>

      {/* Edit form in a modal dialog */}
      <Dialog
        open={!!eventBeingEdited} // Coercion boolean operator, forces value to be treated as a boolean
        onClose={() => setEventBeingEdited(null)}
        fullWidth
        maxWidth="sm"
      >
        {eventBeingEdited && (
          <DialogContent>
            <DialogTitle>Edit Match Event</DialogTitle>
            <EditMatchEventForm
              matchEvent={eventBeingEdited}
              homeTeamId={homeTeamId}
              awayTeamId={awayTeamId}
              homeTeamName={homeTeamName}
              awayTeamName={awayTeamName}
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
  //Mark side home/away the event belongs to. For flipping
  const isHomeTeamEvent = matchEvent.teamId === homeTeamId;
  const minuteLabel = matchEvent.minute != null ? `${matchEvent.minute}'` : "";

  // Defaults
  let primaryText: string;
  let secondaryText: string | undefined;
  let primaryPlayerId: string | undefined;
  let secondaryPlayerId: string | undefined;
  let iconLabel: string;
  let icon: React.ReactNode;

  //Subtype specific presentation
  switch (matchEvent.type) {
    case "GOAL": {
      const scorerName = resolvePlayerName(matchEvent.playerId, playersById);
      const assisterName = resolvePlayerName(
        matchEvent.assisterId,
        playersById,
      );

      primaryText = scorerName ?? "Unknown";
      secondaryText = assisterName ? `Assist: ${assisterName}` : undefined;
      primaryPlayerId = matchEvent.playerId ?? undefined;
      secondaryPlayerId = matchEvent.assisterId ?? undefined;

      //Decide icon
      iconLabel = "GOAL";
      icon = <SportsSoccerIcon fontSize="small" htmlColor="#41b0bc" />;
      break;
    }

    case "CARD": {
      const playerName = resolvePlayerName(matchEvent.playerId, playersById);

      primaryText = playerName ?? "Unknown";
      secondaryText = undefined; // e.g. "Second yellow" later
      primaryPlayerId = matchEvent.playerId ?? undefined;
      secondaryPlayerId = undefined;

      const isRed = matchEvent.cardType === "RED_CARD";
      iconLabel = isRed ? "Red card" : "Yellow card";

      //Decide icon
      icon = (
        <div
          className={[
            "w-3 h-5 rounded-[2px] border",
            isRed
              ? "bg-red-500 border-red-600"
              : "bg-yellow-300 border-yellow-500",
          ].join(" ")}
        />
      );
      break;
    }
  }

  return {
    id: String(matchEvent.id),
    isHomeTeamEvent,
    minuteLabel,
    primaryText,
    secondaryText,
    iconLabel,
    primaryPlayerId,
    secondaryPlayerId,
    icon,
  };
}
