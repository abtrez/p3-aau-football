package p3.group.p3_aau_football.match;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import p3.group.p3_aau_football.role.Referee;
import p3.group.p3_aau_football.team.Team;

@Document(collection = "matches")
public class Match {

    @Id
    private String id;

    @DocumentReference
    private Team homeTeam;
    @DocumentReference
    private Team awayTeam;

    @DocumentReference
    private Venue venue;
    private LocalDateTime kickoff;
    private Boolean canceled = false;
    private List<Referee> referees;

    private int homeScore;
    private int awayScore;
    @DocumentReference
    private List<MatchEvent> matchEvents;

    //Details
    /*
    (dateTime) date and time - kick-offtime splittes?
    Venue venue
    List<Referee> referees
    int squadSize
    
     */
    //Constructor, should probably have date, venue
    public Match() {
        this.canceled = false;
    }

    public Match(Team homeTeam, Team awayTeam, Venue venue, LocalDateTime kickoff, List<Referee> referees) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.venue = venue;
        this.kickoff = kickoff;
        this.referees = referees;

        this.canceled = false;

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

    public List<MatchEvent> getMatchEvents() {
        return this.matchEvents;
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

    public Boolean getCanceled() {
        return this.canceled;
    }

    public void setCanceled(Boolean canceled) {
        this.canceled = canceled;
    }

    public void setKickoff(LocalDateTime kickoff) {
        this.kickoff = kickoff;
    }

    public void setReferees(List<Referee> referees) {
        this.referees = referees;
    }
}
