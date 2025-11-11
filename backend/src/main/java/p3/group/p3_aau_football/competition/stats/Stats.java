package p3.group.p3_aau_football.competition.stats;

/**
 * Base class - stats shared on both player and team level within a stage
 * Does not currently adhere to the open closed principle
 */
public abstract class Stats {
//Obs side 163 i javaFundamentals bogen, de kan inherites selvom de er private, men kun metoder defineret her kan accesse dem direkte
    //competition, participant
    private int matchesPlayed;
    private int goals;
    private int yellowCards;
    private int redCards;

    //No args constructor - Java automatically initializes primitive int fields to 0
    public Stats() {
    }

    public Stats(int matchesPlayed, int goals, int yellowCards, int redCards) {
        this.matchesPlayed = matchesPlayed;
        this.goals = goals;
        this.yellowCards = yellowCards;
        this.redCards = redCards;
    }

    //must define getters and setters, if subclasses should be able to use
}
