import { fetchMatchById } from "@/lib/fetchMatch";
import { Match } from "@/lib/schemas/matchSchema";
import MatchPage from "@/components/match/MatchPage";
import { fetchPersonFromTeamIdByRole } from "@/lib/fetchPersonFromRoleAndTeam";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  //Fetch initial data
  const { id } = await params;

  //Authentification for editing
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const match: Match = await fetchMatchById(id);

  //fetch players for matchEvents, destructured into two variables
  const [homePlayers, awayPlayers] = await Promise.all([
    fetchPersonFromTeamIdByRole(match.homeTeam.id, "Player"),
    fetchPersonFromTeamIdByRole(match.awayTeam.id, "Player"),
  ]);

  //Evaluate editing permission and pass down
  const userTeamId = session?.user.team ?? null;
  const canEditMatch =
    userTeamId === match.homeTeam.id || userTeamId === match.awayTeam.id;

  //Client container
  return (
    <div className="text-center">
      <MatchPage
        initialMatch={match}
        homePlayers={homePlayers}
        awayPlayers={awayPlayers}
        canEditMatch={canEditMatch}
      />
    </div>
  );
}
