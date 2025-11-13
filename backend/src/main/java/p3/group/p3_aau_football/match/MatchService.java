package p3.group.p3_aau_football.match;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class MatchService {

    @Autowired
    private MatchRepository matchRepository;

    private MongoTemplate mongoTemplate;

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

        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update();

        boolean hasUpdates = false;

        if (date != null) {
            update.set("date", date);
            hasUpdates = true;
        }
        if (venue != null) {
            update.set("venue", venue);
            hasUpdates = true;
        }

        if (cancel != null) {
            update.set("cancel", cancel);
            hasUpdates = true;
        }
        if (!hasUpdates) {
            return matchRepository.findById(id);
        }

        Match updatedMatch = mongoTemplate.findAndModify(
                query,
                update,
                org.springframework.data.mongodb.core.FindAndModifyOptions.options().returnNew(true),
                Match.class
        );
        return Optional.ofNullable(updatedMatch);
    }

}
