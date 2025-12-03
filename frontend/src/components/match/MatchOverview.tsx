import type { Match } from "@/lib/schemas/matchSchema";
import MatchCard from "@/components/match/MatchCard";

interface MatchOverviewProps {
  matches: Match[];
}

export default function MatchOverview({ matches }: MatchOverviewProps) {
  if (matches.length === 0) {
    return <p>No matches found</p>;
  }
  return (
    <div className="flex flex-col gap-4 items-stretch sm:items-center">
      {matches.map((m) => (
        <MatchCard key={m.id} match={m} />
      ))}
    </div>
  );
}
