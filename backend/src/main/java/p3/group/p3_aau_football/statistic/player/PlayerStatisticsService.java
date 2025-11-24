package p3.group.p3_aau_football.statistic.player;

import org.springframework.stereotype.Service;
import p3.group.p3_aau_football.statistic.common.StatisticsService;

@Service
public class PlayerStatisticsService implements StatisticsService {

    private final PlayerStatisticRepository playerStatisticsRepository;

    public PlayerStatisticsService(PlayerStatisticRepository playerStatsRepo) {
        this.playerStatisticsRepository = playerStatsRepo;
    }

    PlayerStatistics getPlayerStatsById(String id) {
        return this.playerStatisticsRepository.findById(id)
                .orElseThrow(() -> new PlayerStatisticsNotFoundException(String.format("A Player Statistics Document with ID: %s does not exist in the database", id)));
    }
}
