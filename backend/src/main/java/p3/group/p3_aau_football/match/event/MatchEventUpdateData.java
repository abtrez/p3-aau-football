package p3.group.p3_aau_football.match.event;

public interface MatchEventUpdateData {
    String playerId();
    Integer minute();

    //For Goal events
    String assisterId();

    //For Card events
    CardType cardType();
}
