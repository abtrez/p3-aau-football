package p3.group.p3_aau_football.match;


import p3.group.p3_aau_football.team.Team;

public class Match {
    private int id;
    private Team homeTeam;
    private Team awayTeam;





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
