package p3.group.p3_aau_football.match.event;

/**
 * Used to parse add matchEvent requestDTO into java object
 */
public record MatchEventRequestDTO(
        String type,    // "GOAL" or "CARD", see jackson annotations on MatchEvent.java
        String teamId,
        String playerId,
        Integer minute,
        //Goal specific
        String assisterId,
        //Card specific
        CardType cardType
) {
}
