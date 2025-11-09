package p3.group.p3_aau_football.match;


import jakarta.persistence.*;
import p3.group.p3_aau_football.team.Team;

import java.util.List;


@Entity
@Table(name = "matches")
public class Match {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "home_team_id", nullable = false)
    private Team homeTeam;

    @ManyToOne
    @JoinColumn(name = "away_team_id", nullable = false)
    private Team awayTeam;

    //Score & Events
    private int homeScore;
    private int awayScore;
    
    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL)
    private List<MatchEvent> matchEvents;

    protected Match() {} // JPA

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
    public Long getId() {
        return this.id;
    }

    public Team getHomeTeam(){
        return this.homeTeam;
    }

    public Team getAwayTeam(){
        return this.awayTeam;
    }

    public int getHomeScore()  {
        return this.homeScore;
    }

    public int getAwayScore() {
        return this.awayScore;
    }

    public List<MatchEvent> getMatchEvents() {
        return this.matchEvents;
    }

    //Setters
    public void setHomeScore(int homeScore){
        this.homeScore = homeScore;
    }

    public void setAwayScore(int awayScore) {
        this.awayScore = awayScore;
    }

    // set date, venue, referees
}
