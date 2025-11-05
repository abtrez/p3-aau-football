package p3.group.p3_aau_football.match;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import p3.group.p3_aau_football.team.Team;

@Service
public class MatchService {

    MatchRepository matchRepository;

    @Autowired
    public MatchService(MatchRepository matchRepository) {
        this.matchRepository = matchRepository;
    }

    public List<Match> getOverview() {
        return this.matchRepository.findAll();
    }

    public Optional<Match> getMatch(String id) {
        return this.matchRepository.findById(id);
    }

    public Match insertMatch(Team homeTeam, Team awayTeam) {
        Match insertedMatch = new Match(homeTeam, awayTeam);

        return this.matchRepository.insert(insertedMatch);
    }

}
