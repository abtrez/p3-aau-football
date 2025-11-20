package p3.group.p3_aau_football.statistic.league;

import java.util.List;
import java.util.Optional;

import p3.group.p3_aau_football.statistic.common.StatisticsRepository;
import p3.group.p3_aau_football.team.Team;

public interface LeagueStatisticsRepository extends StatisticsRepository<LeagueStatistics, String> {

    List<LeagueStatistics> findBySeasonAndCompetition(String season, String competition);

    /**
     * Finds a team by the team id.
     *
     * @param team
     * @return Optional<LeagueStatistics>
     */
    Optional<LeagueStatistics> findByTeam(Team team);
}
