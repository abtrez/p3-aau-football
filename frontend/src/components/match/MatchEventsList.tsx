"use client"

import MatchEventRow from "./MatchEventRow";
import {MatchEvent} from "@/lib/schemas/matchEventSchema";
import {useState} from "react";
import {deleteMatchEvent} from "@/lib/fetchMatchEvent";

interface MatchEventsListProps {
    matchId: string;
    initialMatchEvents: MatchEvent[]
    homeTeamId: string;
}

export default function MatchEventsList({
    matchId,
    initialMatchEvents,
    homeTeamId
} : MatchEventsListProps) {

    // Declaring local state variable for the component. Essentially holds the list of MatchEvents
    const [events, setEvents] = useState(initialMatchEvents);

    // Eventhandler to pass down, async due to backend request
    async function handleDelete(eventId: string) {

        //Call server action to send request to backend
        const updatedMatch = await deleteMatchEvent({matchId: matchId, eventId: eventId});

        //Update local state with new events from backend
        setEvents(updatedMatch.matchEvents)
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
                {events.map((matchEvent: MatchEvent) => (
                    <MatchEventRow
                        key={matchEvent.id}
                        matchEvent={matchEvent}
                        isHomeTeamEvent={matchEvent.teamId === homeTeamId}
                        onDelete = {handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}