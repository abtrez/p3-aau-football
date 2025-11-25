package p3.group.p3_aau_football.match;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import p3.group.p3_aau_football.statistic.league.LeagueStatisticsService;
import p3.group.p3_aau_football.team.Team;
import p3.group.p3_aau_football.team.TeamService;

@Service
public class MatchService {

    private MatchRepository matchRepository;
    private TeamService teamService;
    private LeagueStatisticsService leagueStatsService;

    public MatchService(MatchRepository matchRepository, TeamService teamService, LeagueStatisticsService leagueStatsService) {
        this.matchRepository = matchRepository;
        this.teamService = teamService;
        this.leagueStatsService = leagueStatsService;
    }

    public List<Match> getOverview() {
        return this.matchRepository.findAll();
    }

    public Optional<Match> getMatch(String id) {
        return this.matchRepository.findById(id);
    }

    public Match insertMatch(Match match) {
        //Optional<Team> homeTeam = teamService.findByName(match.getHomeTeam().getName());
        //Optional<Team> awayTeam = teamService.findByName(match.getAwayTeam().getName());

        //if (homeTeam.isPresent() && awayTeam.isPresent()) {
        if (match.getCompetitionId() != null && match.getSeason() != null) {
            this.leagueStatsService.updateLeagueStats(match);
        }
        return this.matchRepository.insert(match);
        //} else {
        //   throw new Exception("Team not found");
        //}

    }

}
