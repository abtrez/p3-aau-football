package p3.group.p3_aau_football.statistic.player;

import java.util.List;

import org.springframework.stereotype.Service;
import p3.group.p3_aau_football.statistic.common.StatisticsService;

@Service
public class PlayerStatisticsService implements StatisticsService {

    private final PlayerStatisticRepository playerStatisticsRepository;

    public PlayerStatisticsService(PlayerStatisticRepository playerStatsRepo) {
        this.playerStatisticsRepository = playerStatsRepo;
    }

    public List<PlayerStatistics> getPlayerStats(String personId, String season, String competitionId) {
        List<PlayerStatistics> statsList = this.playerStatisticsRepository
                .findAllByPersonIdAndSeasonAndCompetitionId(personId, season, competitionId);

        if (statsList.isEmpty()) {
            throw new PlayerStatisticsNotFoundException(
                    String.format("No Player Statistics found for personId=%s, season=%s, competitionId=%s",
                            personId, season, competitionId));
        }

        return statsList;
    }

    public PlayerStatistics addPlayerStatistics(String personId, int wins, int losses, int goals, int assists,
            int yellowCards, int redCards,
            int matchesPlayed, String competitionId, String season) {
        /// TODO: add exists check to avoid duplication in DB
        return this.playerStatisticsRepository.save(new PlayerStatistics(personId, wins, losses, goals, assists,
                yellowCards, redCards, matchesPlayed, competitionId, season));
    }
}
