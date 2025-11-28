package p3.group.p3_aau_football.match.event;

/**
 * Polymorphic base (super) type for incoming 'Match Event' requests.
 * Sealed interface, as subtypes are "records", which already inherit from java.lang.Record
 */
public sealed interface MatchEventRequestDTO permits GoalEventRequestDTO, CardEventRequestDTO {
        String teamId();
        String playerId();
        Integer minute();
}
