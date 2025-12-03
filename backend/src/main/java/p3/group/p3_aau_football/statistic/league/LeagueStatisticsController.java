package p3.group.p3_aau_football.statistic.league;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import p3.group.p3_aau_football.statistic.common.StatisticsController;

import java.util.List;

@RestController
@RequestMapping("/api/statistics")
public class LeagueStatisticsController implements StatisticsController {

    private final LeagueStatisticsService leagueStatsService;

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

    @PostMapping("/enroll/league-team")
    public ResponseEntity<LeagueStatistics> enrollTeam(@RequestBody EnrollTeamDTO request) {
        LeagueStatistics savedLeagueStatistic = this.leagueStatsService.enrollTeam(request.team(),
                request.season(),
                request.competitionId(),
                0,
                0,
                0,
                0,
                0,
                0,
                0);
        return ResponseEntity.ok(savedLeagueStatistic);
    }

}
