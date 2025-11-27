package p3.group.p3_aau_football.statistic.player;

import p3.group.p3_aau_football.statistic.common.StatisticsRepository;

import java.util.List;
import java.util.Optional;

public interface PlayerStatisticRepository extends StatisticsRepository<PlayerStatistics, String> {
    List<PlayerStatistics> findAllByPersonIdAndSeasonAndCompetitionId(
            String personId,
            String season,
            String competitionId);

}
