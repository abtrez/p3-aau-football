package p3.group.p3_aau_football.match.event;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CardEventRequestMapperTest {
    CardEventRequestMapper mapper = new CardEventRequestMapper();

    @Test
    void sourceTypeIsCardEventRequestDTO() {
        assertEquals(CardEventRequestDTO.class, mapper.sourceType());
    }

    @Test
    void targetTypeIsCard() {
        assertEquals(Card.class, mapper.targetType());
    }

    @Test
    void shouldMapCardDtoToCardModel() {
        //Arrange
        CardEventRequestDTO dto = new CardEventRequestDTO(
                "someTeamId",
                "somePlayerId",
                63,
                CardType.RED_CARD
        );

        //Act
        Card model = mapper.toModel(dto);

        //Assert
        assertEquals("someTeamId", model.getTeamId());
        assertEquals("somePlayerId", model.getPlayerId());
        assertEquals(63, model.getMinute());
        assertEquals(CardType.RED_CARD, model.getCardType());
    }

    @Test
    void shouldUpdateMutableCardFieldsWithCardDto() {

        //Arrange
        Card model = new Card("team1", null, null, CardType.RED_CARD);
        String originalId = model.getId();
        CardEventRequestDTO dto = new CardEventRequestDTO("triedChangingTeam", "player", 42, CardType.YELLOW_CARD);

        //Act
        mapper.applyUpdate(dto, model);

        //Assert
        assertEquals(originalId, model.getId());              //id must be unchanged
        assertEquals("team1", model.getTeamId());    //team should not change

        assertEquals("player", model.getPlayerId());
        assertEquals(42, model.getMinute());
        assertEquals(CardType.YELLOW_CARD, model.getCardType());
    }
}
