package p3.group.p3_aau_football.match;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import p3.group.p3_aau_football.team.Team;
import p3.group.p3_aau_football.team.TeamRepository;

@Service
public class MatchService {

    @Autowired
    MatchRepository matchRepository;

    @Autowired
    private TeamRepository teamRepository;

    public List<Match> getOverview() {
        return matchRepository.findAll();
    }

    public Optional<Match> getMatch(String id) {
        return matchRepository.findById(id);
    }

    public Match insertMatch(String homeTeamName, String awayTeamName) {
        Team homeTeam = teamRepository.findByName(homeTeamName)
                .orElseThrow(() -> new RuntimeException("Home team not found"));
        Team awayTeam = teamRepository.findByName(awayTeamName)
                .orElseThrow(() -> new RuntimeException("Away team not found"));

        Match insertedMatch = new Match(homeTeam, awayTeam);

        return matchRepository.insert(insertedMatch);
    }

}
