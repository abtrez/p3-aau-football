package p3.group.p3_aau_football.match;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import p3.group.p3_aau_football.match.event.Goal;
import p3.group.p3_aau_football.match.event.MatchEvent;
import p3.group.p3_aau_football.role.Referee;
import p3.group.p3_aau_football.team.Team;

@Document(collection = "matches")
public class Match {

    @Id
    private String id;

    private String season;
    private String competition;

    @DocumentReference
    private final Team homeTeam;
    @DocumentReference
    private final Team awayTeam;

    @DocumentReference
    private Venue venue;
    private LocalDateTime kickoff;
    private List<Referee> referees;

    private int homeScore;
    private int awayScore;
    private List<MatchEvent> matchEvents = new ArrayList<>(); // Ensure non-null initialization, to protect logic from null-pointer exceptions

    //Constructor, should probably have date, venue
    public Match(Team homeTeam, Team awayTeam) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        //date
        //venue
    }

    //Getters
    public String getId() {
        return this.id;
    }

    public Team getHomeTeam() {
        return this.homeTeam;
    }
    public Team getAwayTeam() {
        return this.awayTeam;
    }

    public int getHomeScore() {
        return this.homeScore;
    }
    public int getAwayScore() {
        return this.awayScore;
    }

    public Venue getVenue() {
        return this.venue;
    }

    public LocalDateTime getKickoff() {
        return this.kickoff;
    }

    public List<Referee> getReferees() {
        return this.referees;
    }

    /**
     * @return reference of object's internal matchEvents list.
     * Always non-null. No events recorded, means empty list.
     */
    public List<MatchEvent> getMatchEvents() {
        return this.matchEvents;
    }

    /**
     * @return reference of match event with given id or throw exception
     */
    public MatchEvent getMatchEvent(String eventId) {
        for (MatchEvent event : this.matchEvents) {
            if (event.getId().equals(eventId)) {
                return event;
            }
        }
        throw new NoSuchElementException("Match event not found: " + eventId);
    }

    /**
     * Appends all provided matchEvents to this match's list. Whether a single or multiple new events are provided.
     * @param newEvents to be added
     */
    public void addEvents(List<MatchEvent> newEvents) {
        this.matchEvents.addAll(newEvents);

        //Recalculates score if goal class, not relevant for other events
        recalculateScoreFromEvents(); // may throw IllegalStateException
    }

    /**
     * Removes the event with the given id.
     * Throws NoSuchElementException if no event with specified id exists.
     */
    public void removeEvent(String eventId) {
        boolean removed = this.matchEvents.removeIf(element -> element.getId().equals(eventId));

        if (!removed) {
            throw new NoSuchElementException("Match event not found: " + eventId);
        }

        //Recalculate score if goal class, not relevant for other events
        recalculateScoreFromEvents(); // may throw IllegalStateException
    }

    /**
     * Recalculates and sets the match scores based on Goal Events
     * Private helper: match itself should ensure alignment between its score variables and goal events.

     * If a GOAL event belongs to neither team, the match is in an inconsistent state,
     * an IllegalStateException is thrown. Not caught, data integrity issue.

     * Called upon addition/removal of match events, excluding edits: currently a goal shouldn't be reassigned to the other team. Such a case considered a different event, rather than a typo to be changed.
     */
    private void recalculateScoreFromEvents() {
        int homeScore = 0;
        int awayScore = 0;

        String homeTeamId = this.homeTeam.getId();
        String awayTeamId = this.awayTeam.getId();

        for (MatchEvent event : getMatchEvents()) {

            if (!(event instanceof Goal g)) {
                continue; // Only goal events contribute to score
            }

            String teamId = g.getTeamId();

            if (teamId.equals(homeTeamId)) {
                homeScore++;
            } else if (teamId.equals(awayTeamId)) {
                awayScore++;
            } else {
                //Invariant violation: Goal instance, not belonging to either playing team. Data Integrity Concern, let bubble
                throw new IllegalStateException("Goal event for team not in this match: " + teamId);
            }
        }
        // Overwrite the score with recalculation
        this.homeScore = homeScore;
        this.awayScore = awayScore;
    }

    public String getSeason() {
        return this.season;
    }

    public String getCompetition() {
        return this.competition;
    }

    //Setters
    public void setHomeScore(int homeScore) {
        this.homeScore = homeScore;
    }

    public void setAwayScore(int awayScore) {
        this.awayScore = awayScore;
    }

    public void setVenue(Venue venue) {
        this.venue = venue;
    }

    public void setKickoff(LocalDateTime kickoff) {
        this.kickoff = kickoff;
    }

    public void setReferees(List<Referee> referees) {
        this.referees = referees;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public void setCompetition(String competition) {
        this.competition = competition;
    }
}
