package p3.group.p3_aau_football.statistic.league;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import p3.group.p3_aau_football.statistic.common.StatisticsController;

import java.util.List;

@RestController
@RequestMapping("/api/statistics")
public class LeagueStatisticsController implements StatisticsController {

    private final LeagueStatisticsService leagueStatsService;

    @Autowired
    public LeagueStatisticsController(LeagueStatisticsService leagueStatsService) {
        this.leagueStatsService = leagueStatsService;
    }

    @GetMapping("/get/league")
    public ResponseEntity<List<LeagueStatistics>> getLeagueStatistics(
            @RequestParam String season,
            @RequestParam String competitionId) {

        List<LeagueStatistics> leagueStats = this.leagueStatsService.getLeagueStatistics(season, competitionId);

        if (leagueStats.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(leagueStats);
    }

    @PostMapping("/add/league")
    public ResponseEntity<LeagueStatistics> addLeagueStatistic(@RequestBody CreateLeagueStatisticsRequest request) {
        LeagueStatistics savedLeagueStatistic = this.leagueStatsService.addLeagueStats(request.team(),
                request.season(),
                request.competitionId(),
                request.matchesPlayed(),
                request.won(),
                request.drawn(),
                request.lost(),
                request.goalsFor(),
                request.goalsAgainst(),
                request.points()
        );
        return ResponseEntity.ok(savedLeagueStatistic);
    }

}
