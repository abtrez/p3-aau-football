package p3.group.p3_aau_football.match;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import p3.group.p3_aau_football.match.event.Card;
import p3.group.p3_aau_football.match.event.Goal;
import p3.group.p3_aau_football.match.event.MatchEvent;
import p3.group.p3_aau_football.match.event.MatchEventRequestDTO;
import p3.group.p3_aau_football.statistic.league.LeagueStatisticsService;
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

    /**
     * @param id of the match to get.
     * May throw NoSuchElementException
     */
    public Match getMatch(String id) {
        //if a value (Match) is present in Optional<Match> type variable, return it (Match type).
        return this.matchRepository.findById(id)
                //otherwise throw a specified exception
                .orElseThrow(() -> new NoSuchElementException("Match not found with id: " + id));
    }   //Instead of (if optionalType.isPresent()) {optionalType.get()}

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

    /**
     * Intermediate step DTO --> Model Object to be persisted with Mongo
     * @param dto required fields of a match event excluding id, as this is generated in model constructor
     * @return Goal object, Card object, or throws exception
     */
    private MatchEvent matchEventDtoToModel(MatchEventRequestDTO dto) {
        //Switch Expression on DTO record. Evaluates to a single value, which is returned.
        return switch (dto.type()) {
            // -> syntax no need for 'break' statements
            case "GOAL" -> new Goal(
                    dto.teamId(),
                    dto.playerId(),
                    dto.minute(),
                    dto.assisterId()
            );
            case "CARD" -> new Card(
                    dto.teamId(),
                    dto.playerId(),
                    dto.minute(),
                    dto.cardType()
            );
            default -> throw new IllegalArgumentException("Unknown type: " + dto.type()); //TODO: Figure out exact Exception type later
        };
    }

    // Works, but improvements pending
    public Match addMatchEvents(String matchId, List<MatchEventRequestDTO> requests) {
        /// Get match on which to add events. Reuse validation/error handling of getMatch() method
        Match match = getMatch(matchId);  //may throw NoSuchElementException

        /// Prepare new events
        List<MatchEvent> newMatchEvents = new ArrayList<>();

        // Create Match Event objects (of appropriate subclass) from each request dto, append to the temporary list
        for (MatchEventRequestDTO dto : requests ) {
            //TODO: dto validation, expeption handling? validate team belongs to this match?
            newMatchEvents.add(matchEventDtoToModel(dto));
        }

        /// Delegate addition to model logic, passing the new events
        match.addEvents(newMatchEvents);

        /// Persist changes
        return matchRepository.save(match);
    }

    public Match removeMatchEvent(String matchId, String eventId) {
        /// Get match from which to remove event. Reuse validation/error handling of getMatch() method
        Match match = getMatch(matchId); //may throw NoSuchElementException

        /// Delegate removal to model logic
        match.removeEvent(eventId);     //may throw NoSuchElementException

        /// Persist changes
        return matchRepository.save(match);
    }

    /**
     * Throws IllegalArgument Exception, if the team was attempted changed TODO: consider type check as well: "Goal, CARD"
     */
    public Match editMatchEvent(String matchId, String eventId, MatchEventRequestDTO dto) {
        /// Get reference to match from which to edit event. Reuse validation/error handling of getMatch() method
        Match match = getMatch(matchId);

        /// Get reference to the MatchEvent itself
        MatchEvent event = match.getMatchEvent(eventId);

        /// Ensure that requester did not attempt to change the team, which the event belongs to
        if (!event.getTeamId().equals(dto.teamId())) {
            throw new IllegalArgumentException("Team cannot change");
        }

        /// Delegate updating to polymorphic model logic
        event.applyUpdate(dto);

        /// Persist changes
        return matchRepository.save(match);
    }
}
