import { fetchMatchById } from "@/lib/fetchMatch";
import MatchEventsList from "@/components/match/MatchEventsList";
import { Match } from "@/lib/schemas/matchSchema";

export default async function Page({ params }: any) {
  const { id } = await params;
  const match: Match = await fetchMatchById(id);

  return (
    <div className="text-center">
      <h1>Match with id: {match.id}</h1>
      <p>
        {match.homeTeam.name} vs {match.awayTeam.name}
      </p>

      <p>
            {match.homeScore} - {match.awayScore}
      </p>


      <MatchEventsList
          matchEvents={match.matchEvents}
          homeTeamId = {match.homeTeam.id}
      />
    </div>
  );
}
