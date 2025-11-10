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

    public Optional<Match> updateMatch(String id, String date, String venue, Boolean cancel) {
        Optional<Match> optionalMatch = matchRepository.findById(id);

        if (optionalMatch.isEmpty()) {
            return Optional.empty();
        }
        Match match = optionalMatch.get();

        if (date != null) {
            match.setDate(date);
        }

        if (venue != null) {
            match.setVenue(venue);
        }

        if (cancel != null) {
            match.setCancel(cancel);
        }

        Match updatedMatch = matchRepository.save(match);

        return Optional.of(updatedMatch);
    }

}
