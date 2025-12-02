package p3.group.p3_aau_football.match;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import p3.group.p3_aau_football.match.event.MatchEvent;
import p3.group.p3_aau_football.match.event.MatchEventRequestDTO;
import p3.group.p3_aau_football.match.event.MatchEventRequestMapperRegistry;
import p3.group.p3_aau_football.statistic.league.LeagueStatisticsService;
import p3.group.p3_aau_football.team.Team;
import p3.group.p3_aau_football.team.TeamService;

@Service
public class MatchService {

    private MatchRepository matchRepository;
    private TeamService teamService;
    private LeagueStatisticsService leagueStatsService;
    private MatchEventRequestMapperRegistry matchEventRequestMapperRegistry;

    public MatchService(MatchRepository matchRepository, TeamService teamService, LeagueStatisticsService leagueStatsService, MatchEventRequestMapperRegistry matchEventRequestMapperRegistry) {
        this.matchRepository = matchRepository;
        this.teamService = teamService;
        this.leagueStatsService = leagueStatsService;
        this.matchEventRequestMapperRegistry = matchEventRequestMapperRegistry;
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

    public Match insertFriendlyMatch(CreateMatchDTO request) {
        Team homeTeam = teamService.getTeamById(request.homeTeamId())
                .orElseThrow(() -> new NoSuchElementException("Team not found: " + request.homeTeamId()));
        Team awayTeam = teamService.getTeamById(request.awayTeamId())
                .orElseThrow(() -> new NoSuchElementException("Team not found: " + request.awayTeamId()));

        Match match = new Match(homeTeam, awayTeam);
        match.setSeason(request.season());
        match.setCompetition(request.competitionId());
        match.setVenue(request.venue());
        match.setKickoff(request.kickoff());
        // TODO Figure out how we add referees - should have option to be null untill a referee is found

        return this.matchRepository.insert(match);
    }

    public Match addMatchEvents(String matchId, List<MatchEventRequestDTO> requestsDTOs) {
        /// Get match on which to add events. Reuse validation/error handling of getMatch() method
        Match match = getMatch(matchId);  //may throw NoSuchElementException

        /// Prepare new events
        List<MatchEvent> newMatchEvents = new ArrayList<>();

        // Create Match Event objects (of appropriate subclass) from each request dto, append to the temporary list
        for (MatchEventRequestDTO dto : requestsDTOs ) {
            //TODO: dto validation, expeption handling? validate team belongs to this match?
            MatchEvent model = matchEventRequestMapperRegistry.toModel(dto);
            newMatchEvents.add(model);
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

        /// Delegate all DTO -> model update logic to mappers + registry
        matchEventRequestMapperRegistry.applyUpdate(dto, event);

        /// Persist changes
        return matchRepository.save(match);
    }
}
