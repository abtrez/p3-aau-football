package p3.group.p3_aau_football.statistic.league;

import p3.group.p3_aau_football.team.Team;

public record EnrollTeamDTO(
        Team team,
        String season,
        String competitionId
) {
}
