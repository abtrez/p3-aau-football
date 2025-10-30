package p3.group.p3_aau_football.match;


public class Match {
    private String homeTeam;
    private String awayTeam;

    public Match(String homeTeam, String awayTeam) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
    }

    public String getHomeTeam(){
        return this.homeTeam;
    }

    public String getAwayTeam(){
        return this.awayTeam;
    }
}
