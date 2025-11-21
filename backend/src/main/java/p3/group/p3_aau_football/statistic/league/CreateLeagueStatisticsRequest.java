package p3.group.p3_aau_football.statistic.league;

import p3.group.p3_aau_football.team.Team;

public record CreateLeagueStatisticsRequest(
        Team team,
        String season,
        String competitionId,
        int matchesPlayed,
        int won,
        int drawn,
        int lost,
        int goalsFor,
        int goalsAgainst,
        int points
) {
}
