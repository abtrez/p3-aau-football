"use client"

import MatchEventRow from "./MatchEventRow";
import {MatchEventResponse} from "@/lib/schemas/matchEventSchema";
import {useState} from "react";
import {deleteMatchEvent, updateMatchEvent} from "@/lib/fetchMatchEvent";
import {EditMatchEventForm} from "@/components/match/EditMatchEventForm";

interface MatchEventsListProps {
    matchId: string;
    initialMatchEvents: MatchEventResponse[]
    homeTeamId: string;
}

export default function MatchEventsList({
    matchId,
    initialMatchEvents,
    homeTeamId
} : MatchEventsListProps) {

    // Local state variable for the component. Essentially holds the list of MatchEvents.
    const [events, setEvents] = useState(initialMatchEvents);
    const [editingEvent, setEditingEvent] = useState<MatchEventResponse | null>(null);

    /** Event Handler passed down to subcomponents, async due to backend request*/
    async function handleDelete(eventId: string) {

        //Call server action to send request to backend
        const updatedMatch = await deleteMatchEvent({matchId: matchId, eventId: eventId});

        //Update local state with updated events list from backend
        setEvents(updatedMatch.matchEvents)
    }

    function handleEditClick(event: MatchEventResponse) {
        setEditingEvent(event);
    }

    async function handleUpdateSave(input: {
        eventId: string;
        type: "GOAL" | "CARD";
        teamId: string;
        minute: number;
    }) {
        const updatedMatch = await updateMatchEvent({
            matchId,
            ...input,
        });
        setEvents(updatedMatch.matchEvents);
        setEditingEvent(null);
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
                        onEdit={handleEditClick}
                        onDelete = {handleDelete}
                    />
                ))}
            </div>

            {editingEvent && (
                <div className="px-4 pb-4">
                    <EditMatchEventForm
                        matchEvent={editingEvent}
                        homeTeamId={homeTeamId}
                        // for now we just pass the same id as "awayTeamId" isn’t needed by your current UI logic
                        awayTeamId={"editingEvent.teamId === homeTeamId ? homeTeamId : editingEvent.teamId"}
                        onSave={handleUpdateSave}
                        onCancel={() => setEditingEvent(null)}
                    />
                </div>
            )}
        </div>
    );
}