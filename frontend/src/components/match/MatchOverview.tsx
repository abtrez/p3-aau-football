import type { Match } from "@/lib/schemas/matchSchema";
import MatchCard from "@/components/match/MatchCard";

interface MatchOverviewProps {
  matches: Match[];
}

function sortMatchesByKickoff(matches: Match[]) {
  const sortedArray = [...matches];

  sortedArray.sort((a, b) => {
    return new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime();
  });
  return sortedArray;
}

export default function MatchOverview({ matches }: MatchOverviewProps) {
  if (matches.length === 0) {
    return <p>No matches found</p>;
  }

  const sortedMatches = sortMatchesByKickoff(matches);

  return (
    <div className="flex flex-col gap-4 items-stretch sm:items-center">
      {sortedMatches.map((m) => (
        <MatchCard key={m.id} match={m} />
      ))}
    </div>
  );
}
