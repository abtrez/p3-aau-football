package p3.group.p3_aau_football.match.event;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type"
)

@JsonSubTypes({
        @JsonSubTypes.Type(value = GoalEventRequestDTO.class, name = "GOAL"),
        @JsonSubTypes.Type(value = CardEventRequestDTO.class, name = "CARD")
})

/**
 * Polymorphic base (super) type for incoming 'Match Event' requests.
 * Sealed interface, as subtypes are "records", which already inherit from java.lang.Record
 */
public sealed interface MatchEventRequestDTO permits GoalEventRequestDTO, CardEventRequestDTO {
        String teamId();
        String playerId();
        Integer minute();
}
