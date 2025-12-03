package p3.group.p3_aau_football.match;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

    public Optional<Match> updateMatch(String id, String date, Venue venue, Boolean cancel) {

        Optional<Match> optionalMatch = matchRepository.findById(id);

        if (optionalMatch.isEmpty()) {
            return Optional.empty();
        }

        Match existingMatch = optionalMatch.get();
        boolean hasUpdates = false;

        if (date != null) {
            existingMatch.setKickoff(LocalDateTime.parse(date));
            hasUpdates = true;
        }
        if (venue != null) {
            existingMatch.setVenue(venue);
            hasUpdates = true;
        }

        if (cancel != null) {
            existingMatch.setCanceled(cancel);
            hasUpdates = true;
        }
        if (!hasUpdates) {
            return matchRepository.findById(id);
        }

        Match updatedMatch = matchRepository.save(existingMatch);

        return Optional.of(updatedMatch);
    }

}
