package p3.group.p3_aau_football.match.event;

/** <p>TODO: Bean validation<p>
 * Request DTO for 'Card' match events.
 *
 * <p>Responsibility: Transfer + basic validation of request body JSON, not domain logic.</p>
 * <p>Validation is performed in controller and service layer.</p>
 * Constraints:
 * @param teamId required
 * @param playerId optional
 * @param minute optional, must be >= 0 if present
 * @param cardType required
 */
public record CardEventRequestDTO(
        String teamId,
        String playerId,
        Integer minute,
        CardType cardType
) implements MatchEventRequestDTO {
}
