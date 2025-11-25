package p3.group.p3_aau_football.statistic.player;

import org.springframework.stereotype.Service;
import p3.group.p3_aau_football.statistic.common.StatisticsService;

@Service
public class PlayerStatisticsService implements StatisticsService {

    private final PlayerStatisticRepository playerStatisticsRepository;

    public PlayerStatisticsService(PlayerStatisticRepository playerStatsRepo) {
        this.playerStatisticsRepository = playerStatsRepo;
    }

    public PlayerStatistics getPlayerStats(String id, String season, String competitionId) {
        return this.playerStatisticsRepository.findByPersonIdAndSeasonAndCompetitionId(id, season, competitionId)
                .orElseThrow(() -> new PlayerStatisticsNotFoundException(String.format("A Player Statistics Document with ID: %s does not exist in the database", id)));
    }

    public PlayerStatistics addPlayerStatistics(String personId, int goals, int assists, int yellowCards, int redCards
            , int matchesPlayed, String competitionId, String season) {
        /// TODO: add exists check to avoid duplication in DB
        return this.playerStatisticsRepository.save(new PlayerStatistics(personId, goals, assists, yellowCards, redCards
                , matchesPlayed, competitionId, season));
    }
}
