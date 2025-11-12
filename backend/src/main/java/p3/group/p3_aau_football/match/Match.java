package p3.group.p3_aau_football.match;


import org.springframework.data.mongodb.core.mapping.Document;
import p3.group.p3_aau_football.team.Team;

import java.util.List;
@Document(collection = "matches")
public class Match {
    private int id;
    private final String homeTeam;
    private final String awayTeam;

    //Score & Events
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
    public int getId() {
        return this.id;
    }

    public String getHomeTeam(){
        return this.homeTeam;
    }

    public String getAwayTeam(){
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
