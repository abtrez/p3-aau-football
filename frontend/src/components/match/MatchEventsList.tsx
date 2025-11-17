import MatchEventRow from "./MatchEventRow";

export default function MatchEventsList({ matchEvents }) {
    return (
        <div className="flex flex-col divide-y divide-gray-100">
            {matchEvents.map((matchEvent) => (
                <MatchEventRow key={matchEvent.id} matchEvent={matchEvent} />
            ))}
        </div>
    );
}