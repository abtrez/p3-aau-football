package p3.group.p3_aau_football.statistic.player;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import p3.group.p3_aau_football.statistic.common.StatisticsController;

@RestController
@RequestMapping("/api/statistics")
public class PlayerStatisticsController implements StatisticsController {

    private final PlayerStatisticsService playerStatisticsService;

    public PlayerStatisticsController(PlayerStatisticsService playerStatsService) {
        this.playerStatisticsService = playerStatsService;
    }

    @GetMapping("/get/player/{id}")
    public PlayerStatistics getPlayerStats(@PathVariable("id") String id) {
        return playerStatisticsService.getPlayerStatsById(id);
    }


}
