package p3.group.p3_aau_football.match;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import p3.group.p3_aau_football.team.Team;
import p3.group.p3_aau_football.team.TeamService;
import p3.group.p3_aau_football.statistic.league.LeagueStatisticsService;


@Service
public class MatchService {

    private MatchRepository matchRepository;
    private TeamService teamService;
    private LeagueStatisticsService leagueStatsService;

    @Autowired
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

    public Match insertMatch(String homeTeamName, String awayTeamName) throws Exception {
        Optional<Team> homeTeam = teamService.findByName(homeTeamName);
        Optional<Team> awayTeam = teamService.findByName(awayTeamName);

        if (homeTeam.isPresent() && awayTeam.isPresent()) {
            Match insertedMatch = new Match(homeTeam.get(), awayTeam.get());
            this.leagueStatsService.updateLeagueStats(insertedMatch);
            return this.matchRepository.insert(insertedMatch);
        } else {
            throw new Exception("Team not found");
        }

    }

}
