package p3.group.p3_aau_football.statistic;

public class LeagueStatistic extends Statistics {
    private String teamId;
    private int matchesPlayed;
    private int won;
    private int drawn;
    private int lost;
    private int goalsFor;
    private int goalsAgainst;
    private int points;


    public int calculatePoints(LeagueStatistic leagueStats) {
        return (leagueStats.won * 3) + (leagueStats.drawn);
    }

    public int getPoints() {
        return this.points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public String getTeamId() {
        return this.teamId;
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId;
    }

    public void setMatchesPlayed(int matchesPlayed) {
        this.matchesPlayed = matchesPlayed;
    }

    public int getMatchesPlayed() {
        return this.matchesPlayed;
    }

    public int getWins() {
        return this.won;
    }

    public void setWins(int wins) {
        this.won = wins;
    }

    public int getDraws() {
        return this.drawn;
    }

    public void setDraws(int draws) {
        this.drawn = draws;
    }

    public int getLosses() {
        return this.lost;
    }

    public void setLosses(int losses) {
        this.lost = losses;
    }

    public void setGoalsFor(int goalsFor) {
        this.goalsFor = goalsFor;
    }

    public int getGoalsFor() {
        return this.goalsFor;
    }

    public int getGoalsAgainst() {
        return this.goalsAgainst;
    }

    public void setGoalsAgainst(int goalsAgainst) {
        this.goalsAgainst = goalsAgainst;
    }

}
