import MatchEventRow from "./MatchEventRow";
import {MatchEvent} from "@/lib/schemas/matchEventSchema";

interface MatchEventsListProps {
    matchEvents: MatchEvent[] | null | undefined;
    homeTeamId: string;
}

export default function MatchEventsList({ matchEvents, homeTeamId} : MatchEventsListProps) {
    if (!matchEvents || matchEvents.length === 0 ) {
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
                {matchEvents.map((matchEvent) => (
                    <MatchEventRow
                        key={matchEvent.id}
                        matchEvent={matchEvent}
                        isHomeTeamEvent={matchEvent.teamId === homeTeamId}
                    />
                ))}
            </div>
        </div>
    );
}