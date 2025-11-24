package p3.group.p3_aau_football.match;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import p3.group.p3_aau_football.team.Team;
import p3.group.p3_aau_football.team.TeamService;

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

    public Match insertMatch(String homeTeamName, String awayTeamName) throws Exception {
        Optional<Team> homeTeam = teamService.findByName(homeTeamName);
        Optional<Team> awayTeam = teamService.findByName(awayTeamName);

        if (homeTeam.isPresent() && awayTeam.isPresent()) {
            Match insertedMatch = new Match(homeTeam.get(), awayTeam.get());
            return this.matchRepository.insert(insertedMatch);
        } else {
            throw new Exception("Team not found");
        }

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
