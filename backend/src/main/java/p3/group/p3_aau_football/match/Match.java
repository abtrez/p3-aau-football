package p3.group.p3_aau_football.match;


import p3.group.p3_aau_football.team.Team;

import java.util.List;

public class Match {
    private int id;
    private final Team homeTeam;
    private final Team awayTeam;

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

    //Constructor, should possibly have date
    public Match(Team homeTeam, Team awayTeam) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
    }


    public Team getHomeTeam(){
        return this.homeTeam;
    }

    public Team getAwayTeam(){
        return this.awayTeam;
    }
}
