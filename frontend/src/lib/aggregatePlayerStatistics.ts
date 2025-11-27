import { PlayerStatistics } from "./schemas/playerStatisticsSchema";

export function aggregatePlayerStatistics(stats: PlayerStatistics[]) {
  return stats.reduce(
    (acc, stat) => {
      acc.won += stat.won;
      acc.lost += stat.lost;
      acc.drawn += stat.drawn;
      acc.goals += stat.goals;
      acc.assists += stat.assists;
      acc.yellowCards += stat.yellowCards;
      acc.redCards += stat.redCards;
      acc.matchesPlayed += stat.matchesPlayed;
      return acc;
    },
    {
      id: "",
      personId: "",
      competitionId: "",
      season: "",
      won: 0,
      lost: 0,
      drawn: 0,
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0,
      matchesPlayed: 0,
    } satisfies PlayerStatistics
  );
}
