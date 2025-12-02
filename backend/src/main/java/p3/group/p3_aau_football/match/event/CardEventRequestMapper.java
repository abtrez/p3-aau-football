package p3.group.p3_aau_football.match.event;

import org.springframework.stereotype.Component;

/**
 * Given a validated {@link CardEventRequestDTO} produces a new {@link Card} model object.
 * <p>Responsibility: Conversion only. </p>
 * <b>Assumption</b>: DTO validation has occurred prior (basic json valid + domain checks ). Does not perform any checks.
 */
@Component
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
    public void applyUpdate(CardEventRequestDTO dto, Card model) {
        //common fields
        model.setPlayerId(dto.playerId());
        model.setMinute(dto.minute());
        //specific fields
        model.setCardType(dto.cardType());
    }

    @Override
    public Class<CardEventRequestDTO> sourceType() {
        return CardEventRequestDTO.class;
    }

    @Override
    public Class<Card> targetType() {
        return Card.class;
    }
}
