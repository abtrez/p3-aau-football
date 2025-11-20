import { fetchMatchById } from "@/lib/fetchMatch";
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
      <MatchEventsList
          matchEvents={match.matchEvents}
          homeTeamId = {match.homeTeam.id}
      />
    </div>
  );
}
