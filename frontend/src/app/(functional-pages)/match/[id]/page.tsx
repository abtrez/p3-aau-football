import { fetchMatchById } from "@/lib/fetchMatch";
import { Match } from "@/lib/schemas/matchSchema";
import MatchPage from "@/components/match/MatchPage";
import {fetchPersonFromTeamIdByRole} from "@/lib/fetchPersonFromRoleAndTeam";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  //Fetch initial data
  const { id } = await params;
  const match: Match = await fetchMatchById(id);

  //fetch players for matchEvents, destructured into two variables
    const [homePlayers, awayPlayers] = await Promise.all([
        fetchPersonFromTeamIdByRole(match.homeTeam.id, "Player"),
        fetchPersonFromTeamIdByRole(match.awayTeam.id, "Player")
    ]);

  //Client container
  return (
    <div className="text-center">
        <MatchPage
            initialMatch={match}
            homePlayers={homePlayers}
            awayPlayers={awayPlayers}
        />
    </div>
  );
}