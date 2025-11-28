package p3.group.p3_aau_football.match.event;

/**
 * Given a validated {@link CardEventRequestDTO} produces a new {@link Card} model object.
 * <p>Responsibility: Conversion only. </p>
 * <b>Assumption</b>: DTO validation has occurred prior (basic json valid + domain checks ). Does not perform any checks.
 */
public class CardEventRequestMapper implements MatchEventRequestMapper<CardEventRequestDTO, Card> {

    @Override
    public Card toModel(CardEventRequestDTO dto) {
        //return new card, instead of the switch
        return new Card(
                dto.teamId(),
                dto.playerId(),
                dto.minute(),
                dto.cardType()
        );
    }

    @Override
    public Class<Card> targetType() {
        return Card.class;
    }
}
