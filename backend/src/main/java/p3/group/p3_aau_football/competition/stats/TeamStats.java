package p3.group.p3_aau_football.competition.stats;

public class TeamStats extends Stats {
    //team
    private int wins;
    private int draws;
    private int losses;
    private int goalsAgainst;
    private int goalDifference;

    //No args constructor - Java automatically initializes primitive int fields to 0. Also done in the superclass' no args constructor
    public TeamStats() {
        super(); //made explicit, java compiler would have added implicitly anyway
    }

    public TeamStats(int matchesPlayed, int wins, int draws, int losses, int goals, int goalsAgainst, int yellowCards, int redCards) {
        super(matchesPlayed, goals, yellowCards, redCards);
        this.wins = wins;
        this.draws = draws;
        this.losses = losses;
        this.goalsAgainst = goalsAgainst;
        this.goalDifference = goals - goalsAgainst;
    }
}


