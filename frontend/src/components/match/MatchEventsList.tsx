import MatchEventRow from "./MatchEventRow";
import type {Match} from "@/lib/schemas/matchSchema";

interface MatchEventsListProps {
    matchEvents: Match.matchEvents;
}

export default function MatchEventsList({ matchEvents } : MatchEventsListProps) {
    return (
        <div className="flex flex-col divide-y divide-gray-100">
            {matchEvents.map((matchEvent) => (
                <MatchEventRow key={matchEvent.id} matchEvent={matchEvent} />
            ))}
        </div>
    );
}