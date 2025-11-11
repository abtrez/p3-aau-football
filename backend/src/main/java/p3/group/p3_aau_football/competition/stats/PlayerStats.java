package p3.group.p3_aau_football.competition.stats;

public class PlayerStats extends Stats {
    private int assists;

    //No args constructor - Java automatically initializes primitive int fields to 0. Also done in the superclass no args constructor
    public PlayerStats() {
        super(); //made explicit, java compiler would have added implicitly anyway
    }

    public PlayerStats(int matchesPlayed, int goals, int assists, int yellowCards, int redCards) {
        super(matchesPlayed, goals, yellowCards, redCards);
        this.assists = assists;
    }
}
