package p3.group.p3_aau_football.match.event;

/** Request DTO for 'Goal' match events */
public record GoalEventRequestDTO(
        String teamId,
        String playerId,
        Integer minute,
        String assisterId
) implements MatchEventRequestDTO {
}
