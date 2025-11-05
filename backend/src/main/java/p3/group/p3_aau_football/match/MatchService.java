package p3.group.p3_aau_football.match;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import p3.group.p3_aau_football.team.Team;
import p3.group.p3_aau_football.team.TeamRepository;

@Service
public class MatchService {

    private MatchRepository matchRepository;
    private TeamService teamService;

    @Autowired
    public MatchService(MatchRepository matchRepository, TeamService teamService) {
        this.matchRepository = matchRepository;
        this.teamService = teamService;
    }

    public List<Match> getOverview() {
        return this.matchRepository.findAll();
    }

    public Optional<Match> getMatch(String id) {
        return this.matchRepository.findById(id);
    }

    public Match insertMatch(String homeTeamName, String awayTeamName) {
        Team homeTeam = teamService.findByName(homeTeamName);
        Team awayTeam = teamService.findByName(awayTeamName);

        Match insertedMatch = new Match(homeTeam, awayTeam);

        return this.matchRepository.insert(insertedMatch);
    }

}
