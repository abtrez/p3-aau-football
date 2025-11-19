package p3.group.p3_aau_football.statistic.league;

import p3.group.p3_aau_football.statistic.common.StatisticsRepository;

import java.util.List;

public interface LeagueStatisticsRepository extends StatisticsRepository<LeagueStatistics, String> {
    List<LeagueStatistics> findBySeasonAndCompetition(String season, String competition);
}
