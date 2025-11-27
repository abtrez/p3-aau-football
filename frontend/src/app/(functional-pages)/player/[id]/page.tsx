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
  let team = null;

  if (player.teamId) {
    team = await fetchTeamById(player.teamId);
  }

  let statistics = null;
  let aggregatedStatistics = null;
  if (player.roles?.some(role => role.type === "PLAYER")) {
    statistics = await fetchPlayerStatistics(id, "2024/25", "69259efacd3900a562867eb0");

    if (statistics != null) {
      aggregatedStatistics = aggregatePlayerStatistics(statistics);
    } else {
      aggregatedStatistics = null;
    }
  } else {
    return (
      <div className="container overflow-auto mx-auto">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-semibold  text-neutral-900 text-center">
            {player.firstName} {player.lastName}
          </h1>
          <h2 className="text-2xl font-semibold  text-neutral-900 text-center -m-4">
            {team ? team.name : player.teamId}
          </h2>
        </div>
        <h1 className="text-2xl font-semibold  text-neutral-900 text-center mt-12 italic">
          This person is not a player.
        </h1>
      </div>
    )
  }

  return (
    <div className="container overflow-auto mx-auto">
      <PlayerPage player={player} team={team} statistics={aggregatedStatistics} />
    </div>
  );
}
