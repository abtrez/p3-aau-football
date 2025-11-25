package p3.group.p3_aau_football.statistic.league;

import java.util.List;
import java.util.Optional;

import p3.group.p3_aau_football.statistic.common.StatisticsRepository;
import p3.group.p3_aau_football.team.Team;

public interface LeagueStatisticsRepository extends StatisticsRepository<LeagueStatistics, String> {

    List<LeagueStatistics> findBySeasonAndCompetitionId(String season, String competitionId);

    Optional<LeagueStatistics> findByTeamAndSeasonAndCompetitionId(Team team, String season, String competitionId);

    boolean existsByTeamAndSeasonAndCompetitionId(Team team, String season, String competitionId);
}
