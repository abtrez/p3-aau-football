import { fetchMatchById } from "@/lib/fetchMatch";
import TeamLogo from "@/components/match/MatchEventRow";
import MatchEventRow from "@/components/match/MatchEventRow";
import matchEvents from "@/data/matchEvents.json";
import MatchEventsList from "@/components/match/MatchEventsList";
import { Match } from "@/lib/schemas/matchSchema";

export default async function Page({ params }: any) {
  const { id } = await params;
  const match: Match = await fetchMatchById(id);

  return (
    <div>
      <h1>Match with id: {match.id}</h1>
      <p>
        {match.homeTeam.name} vs {match.awayTeam.name}
      </p>
      <MatchEventsList matchEvents={match.matchEvents} />
    </div>
  );
}
