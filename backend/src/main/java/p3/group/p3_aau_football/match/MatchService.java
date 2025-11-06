package p3.group.p3_aau_football.match;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MatchService {

    @Autowired
    MatchRepository matchRepository;

    public List<Match> getOverview() {
        return matchRepository.findAll();
    }

    public Optional<Match> getMatch(String id) {
        return matchRepository.findById(id);
    }

    public Match insertMatch(String homeTeam, String awayTeam) {
        Match insertedMatch = new Match(homeTeam, awayTeam);

        return matchRepository.insert(insertedMatch);
    }

    public Optional<Match> updateMatch(String, id, String Date, String Venue, Boolean Cancel) {
        Optional<Match> optionalMatch = matchRepository.findById(id);

    }

}
