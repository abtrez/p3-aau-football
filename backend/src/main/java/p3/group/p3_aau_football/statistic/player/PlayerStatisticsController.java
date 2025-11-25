package p3.group.p3_aau_football.statistic.player;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import p3.group.p3_aau_football.statistic.common.StatisticsController;

@RestController
@RequestMapping("/api/statistics")
public class PlayerStatisticsController implements StatisticsController {

    private final PlayerStatisticsService playerStatisticsService;

    public PlayerStatisticsController(PlayerStatisticsService playerStatsService) {
        this.playerStatisticsService = playerStatsService;
    }

    // the most important is per season & league
    @GetMapping("/get/player")
    public PlayerStatistics getPlayerStats(@RequestParam String personId, @RequestParam String season,
            @RequestParam String competitionId) {
        return playerStatisticsService.getPlayerStats(personId, season, competitionId);
    }

    @PostMapping("/add/player")
    public ResponseEntity<PlayerStatistics> addPlayerStats(@RequestBody AddPlayerStatisticsDTO request) {
        PlayerStatistics savedPlayerStatistics = this.playerStatisticsService.addPlayerStatistics(
                request.personId(),
                request.goals(),
                request.assists(),
                request.yellowCards(),
                request.redCards(),
                request.matchesPlayed(),
                request.competitionId(),
                request.season());
        return ResponseEntity.ok(savedPlayerStatistics);
    }

}
