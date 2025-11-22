package p3.group.p3_aau_football.statistic.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import p3.group.p3_aau_football.exceptions.DocumentAlreadyExistsException;
import p3.group.p3_aau_football.statistic.league.LeagueStatistics;
import p3.group.p3_aau_football.statistic.league.LeagueStatisticsService;
import p3.group.p3_aau_football.statistic.league.enrollTeamDTO;

import java.util.List;

@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {

    private final LeagueStatisticsService leagueStatsService;

    @Autowired
    public StatisticsController(LeagueStatisticsService leagueStatsService) {
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
    public ResponseEntity<LeagueStatistics> addLeagueStatistic(@RequestBody LeagueStatistics leagueStats) {
        LeagueStatistics savedLeagueStatistic = this.leagueStatsService.addLeagueStats(leagueStats);
        return ResponseEntity.ok(savedLeagueStatistic);
    }

    @PostMapping("/enroll/league-team")
    public ResponseEntity<LeagueStatistics>  enrollTeam(@RequestBody enrollTeamDTO request) {
        try {
            LeagueStatistics stats = leagueStatsService.enrollTeam(
                    request.teamId(),
                    request.competitionId(),
                    request.season()
            );
            return ResponseEntity.ok(stats);
        } catch (DocumentAlreadyExistsException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
