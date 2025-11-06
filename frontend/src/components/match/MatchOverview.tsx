import dummyMatches from "@/data/matches.json";
import MatchCard, { MatchCardInterface } from "@/components/match/MatchCard";

const matches = dummyMatches as MatchCardInterface[];

export default function MatchOverview() {
  return (
    <div className="grid gap-4">
      {matches.map((m: MatchCardInterface) => (
        <MatchCard key={m.id} match={m} />
      ))}
    </div>
  );
}
