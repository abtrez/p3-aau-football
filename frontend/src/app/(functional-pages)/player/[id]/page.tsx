import PlayerPage from "@/components/player/PlayerPage";

import { fetchPersonById } from "@/lib/fetchPerson";
import { fetchTeamById } from "@/lib/fetchTeam";
import { fetchPlayerStatistics } from "@/lib/fetchPlayerStatistics";
import { aggregatePlayerStatistics } from "@/lib/aggregatePlayerStatistics";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const player = await fetchPersonById(id);
  let team;

  if (player.teamId) {
    team = await fetchTeamById(player.teamId);
  }

  return (
    <div className="container overflow-auto mx-auto">
      <PlayerPage />
    </div>
  );
}
