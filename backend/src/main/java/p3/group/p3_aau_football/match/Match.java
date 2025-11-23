package p3.group.p3_aau_football.match;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
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
    private List<MatchEvent> matchEvents;

    //Details
    /*
    (dateTime) date and time - kick-offtime splittes?
    Venue venue
    List<Referee> referees
    int squadSize
     */
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
        if (this.matchEvents == null) {
            this.matchEvents = new ArrayList<>();
        }
        return this.matchEvents;
    }

    /// Todo: consider changing implementation away from stream, filter, findfirst,
    public MatchEvent getMatchEvent(String eventId) {
        return getMatchEvents().stream()
                .filter( elem -> elem.getId().equals(eventId))
                .findFirst()
                .orElseThrow(() ->
                        new NoSuchElementException("Match event not found: " + eventId)
                );
    }

    /**
     * Appends all provided matchEvents to this match's list. Wether a single or multiple new events are provided.
     * Call to getMatchEvents() guarantees not encountering null-pointer exception
     * @param newEvents to be added
     */
    public void addEvents(List<MatchEvent> newEvents) {
        getMatchEvents().addAll(newEvents);
        //TODO: recalculate score if goal class, not relevant for other events
    }

    /**
     * Removes the event with the given id.
     * Throws NoSuchElementException if no event with specified id exists.
     */
    public void removeEvent(String eventId) {
        boolean removed = getMatchEvents().removeIf(element -> element.getId().equals(eventId));

        if (!removed) {
            throw new NoSuchElementException("Match event not found: " + eventId);
        }
        //TODO: recalculate score if goal class, not relevant for other events
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
