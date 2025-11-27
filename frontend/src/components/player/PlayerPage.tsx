import InfoItem from "@/components/statistics/InfoItem";
import TeamLogo from "@/components/team/TeamLogo";
import { Person } from "@/lib/schemas/personSchema";
import { PlayerStatistics } from "@/lib/schemas/playerStatisticsSchema";
import { Team } from "@/lib/schemas/teamSchema";
import Divider from "@mui/material/Divider";

interface PlayerPageInterface {
  player: Person;
  team: Team | null;
  statistics: PlayerStatistics | null;
}

export default function PlayerPage({ player, team, statistics }: PlayerPageInterface) {
  const playerRole = player.roles?.find(role => role.type === "PLAYER");

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <TeamLogo logo={"/placeholder-logo.png"} height={120} width={120} />
        <h1 className="text-4xl font-semibold  text-neutral-900 text-center">
          {player.firstName} {player.lastName}
        </h1>
        <h2 className="text-2xl font-semibold  text-neutral-900 text-center -m-4">
          {team ? team.name : player.teamId}
        </h2>
      </div>
      <Divider sx={{ borderBottomWidth: 3, my: 3 }} />
      <div className="grid grid-cols-2 gap-3">
        <InfoItem label="Wins" value={statistics?.wins ?? 0} />
        <InfoItem label="Losses" value={statistics?.losses ?? 0} />
        <InfoItem label="Draws" value={statistics?.draws ?? 0} />
        <InfoItem label="Played" value={statistics?.matchesPlayed ?? 0} />
        <InfoItem label="Win Percentage" value={`${100}%`} />
        <InfoItem label="Goals" value={statistics?.goals ?? 0} />
        <InfoItem label="Assists" value={statistics?.assists ?? 0} />
        <InfoItem
          label="Discipline"
          value={`Y (${statistics?.yellowCards ?? 0}) R (${statistics?.redCards ?? 0})`}
        />
        <InfoItem label="Shirt Number" value={playerRole?.shirtNumber ?? "N/A"} />
        <InfoItem label="Position" value={(playerRole?.positionGroup ?? "N/A") + ", " + (playerRole?.position ?? "N/A")} />
        <InfoItem label="Joined Team" value={2025} />
      </div>
    </>
  )
}