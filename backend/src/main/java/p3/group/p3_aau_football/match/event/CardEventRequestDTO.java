package p3.group.p3_aau_football.match.event;

/** Request DTO for 'Card' match events. */
public record CardEventRequestDTO(
        String teamId,
        String playerId,
        Integer minute,
        CardType cardType
) implements MatchEventRequestDTO {
}
