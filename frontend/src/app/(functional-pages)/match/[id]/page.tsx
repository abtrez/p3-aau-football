import { fetchMatchById } from "@/lib/fetchMatch";
import MatchEventsList from "@/components/match/MatchEventsList";
import { Match } from "@/lib/schemas/matchSchema";
import {CreateMatchEventForm} from "@/components/match/CreateMatchEventForm";

export default async function Page({ params }: any) {
  //Fetch initial data
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
          matchId={match.id}
          initialMatchEvents={match.matchEvents}
          homeTeamId = {match.homeTeam.id}
      />

      <CreateMatchEventForm
            matchId={match.id}
            homeTeamId={match.homeTeam.id}
            awayTeamId={match.awayTeam.id}
      />

    </div>
  );
}
