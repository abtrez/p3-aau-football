"use client"

import {useState} from "react";
import MatchEventRow from "./MatchEventRow";
import {MatchEventRequest, matchEventRequestSchema,
        MatchEventResponse
} from "@/lib/schemas/matchEventSchema";
import {EditMatchEventForm} from "@/components/match/EditMatchEventForm";

interface MatchEventsListProps {
    events: MatchEventResponse[],
    homeTeamId: string;
    awayTeamId: string;
    onDeleteEvent: (eventId: string) => Promise<void> | void;
    onUpdateEvent: (eventId: string, dto: MatchEventRequest) => Promise<void> | void
}

export default function MatchEventsList({
    events,
    homeTeamId,
    awayTeamId,
    onDeleteEvent,
    onUpdateEvent,
} : MatchEventsListProps) {

    // Track which single event is currently being edited.
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
                {events.map((matchEvent: MatchEventResponse) => (
                    <MatchEventRow
                        key={matchEvent.id}
                        matchEvent={matchEvent}
                        isHomeTeamEvent={matchEvent.teamId === homeTeamId}
                        onEdit={setEventBeingEdited}
                        onDelete = {handleDeleteEvent}
                    />
                ))}
            </div>

            {/* In-place edit form for the chosen event */}
            {eventBeingEdited && (
                <div className="px-4 pb-4">
                    <EditMatchEventForm
                        matchEvent={eventBeingEdited}
                        homeTeamId={homeTeamId}
                        awayTeamId={awayTeamId}
                        onSave={handleEditSave}
                        onCancel={() => setEventBeingEdited(null)}
                    />
                </div>
            )}
        </div>
    );
}