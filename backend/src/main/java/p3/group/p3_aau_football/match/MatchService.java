package p3.group.p3_aau_football.match;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public Optional<Match> getMatch(String id) {
        return this.matchRepository.findById(id);
    }

    public Match insertMatch(Match match) {
        //Optional<Team> homeTeam = teamService.findByName(match.getHomeTeam().getName());
        //Optional<Team> awayTeam = teamService.findByName(match.getAwayTeam().getName());

        //if (homeTeam.isPresent() && awayTeam.isPresent()) { // TODO: Add check for if match is in league
        this.leagueStatsService.updateLeagueStats(match);
        return this.matchRepository.insert(match);
        //} else {
        //   throw new Exception("Team not found");
        //}

    }

    /**
     * Intermediate step DTO --> Model Object to be persisted with Mongo
     * @param dto required fields of a match event excluding id, as this is generated in model constructor
     * @returns Goal object, Card object, or throws exception
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
            default -> throw new IllegalArgumentException("Unknown type: " + dto.type()); // Figure out exact Exception type later
        };
    }

    // Works, but improvements pending
    public Match addMatchEvents(String matchId, List<MatchEventRequestDTO> requests) {

        //Consider decoupling this from other service function, using the MatchRepository directly.
        //Current motivation: Reuse potential future validation/error handling of getMatch() method.
        Optional<Match> matchOptional = getMatch(matchId);

        //Ensure the match exists
        if (matchOptional.isEmpty()) {
            throw new Error("Match does not exist");
        }

        //Convert to optional object to regular match object
        Match match = matchOptional.get();

        List<MatchEvent> events = match.getMatchEvents();

        //Ensure the match event field is not null, so add() method does not run into runtime error
        if (events == null) {
            events = new ArrayList<>();
        }

        //Create match events from each request dto, append to the temporary list
        for (MatchEventRequestDTO dto : requests ) {
            events.add(matchEventDtoToModel(dto));
        }


        match.setMatchEvents(events);
        return matchRepository.save(match);
    }
}
