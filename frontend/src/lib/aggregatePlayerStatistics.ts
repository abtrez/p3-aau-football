import { PlayerStatistics } from "./schemas/playerStatisticsSchema";

export function aggregatePlayerStatistics(stats: PlayerStatistics[]) {
  return stats.reduce(
    (acc, stat) => {
      acc.wins += stat.wins;
      acc.losses += stat.losses;
      acc.draws += stat.draws;
      acc.goals += stat.goals;
      acc.assists += stat.assists;
      acc.yellowCards += stat.yellowCards;
      acc.redCards += stat.redCards;
      acc.matchesPlayed += stat.matchesPlayed;
      return acc;
    },
    {
      wins: 0,
      losses: 0,
      draws: 0,
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0,
      matchesPlayed: 0,
    }
  );
}
