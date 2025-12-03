package p3.group.p3_aau_football.match.event;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
public class MatchEventRequestMapperRegistryTest {

    // Integration tests with Spring Beans
    @Autowired
    private MatchEventRequestMapperRegistry registry;

    // Registry uses DTO to create new appropriate model, using correct mapper
    @Test
    void goalDtoIsMappedToGoal() {
        // Arrange
        GoalEventRequestDTO goalDto = new GoalEventRequestDTO(
                "someTeamId",
                "somePlayerId",
                22,
                "someAssisterId");

        // Act
        Goal goalModel = registry.toModel(goalDto);

        // Assert
        assertEquals("someTeamId", goalModel.getTeamId());
        assertEquals("somePlayerId", goalModel.getPlayerId());
        assertEquals(22, goalModel.getMinute());
        assertEquals("someAssisterId", goalModel.getAssisterId());
    }

    @Test
    void cardDtoIsMappedToCard() {
        // Arrange
        CardEventRequestDTO cardDto = new CardEventRequestDTO(
                "someTeamId",
                "somePlayerId",
                63,
                CardType.RED_CARD);

        // Act
        Card cardModel = registry.toModel(cardDto);

        // Assert
        assertEquals("someTeamId", cardModel.getTeamId());
        assertEquals("somePlayerId", cardModel.getPlayerId());
        assertEquals(63, cardModel.getMinute());
        assertEquals(CardType.RED_CARD, cardModel.getCardType());
    }

    // Registry applying model updates with dto, using correct mapper
    @Test
    void updatesGoalWithGoalDto() {
        // Arrange
        Goal model = new Goal("team1", null, null, null);
        String originalId = model.getId();

        GoalEventRequestDTO dto = new GoalEventRequestDTO("triedChangingTeam", "player", 42, "assister");

        // Act
        registry.applyUpdate(dto, model);

        // Assert
        assertEquals(originalId, model.getId()); // id must be unchanged
        assertEquals("team1", model.getTeamId()); // team should not change

        assertEquals("player", model.getPlayerId());
        assertEquals(42, model.getMinute());
        assertEquals("assister", model.getAssisterId());
    }

    @Test
    void updatesCardWithCardDto() {
        // Arrange
        Card model = new Card("team1", null, null, CardType.RED_CARD);
        String originalId = model.getId();

        CardEventRequestDTO dto = new CardEventRequestDTO("triedChangingTeam", "player", 42, CardType.YELLOW_CARD);

        // Act
        registry.applyUpdate(dto, model);

        // Assert
        assertEquals(originalId, model.getId()); // id must be unchanged
        assertEquals("team1", model.getTeamId()); // team should not change

        assertEquals("player", model.getPlayerId());
        assertEquals(42, model.getMinute());
        assertEquals(CardType.YELLOW_CARD, model.getCardType());
    }

    // Guards mismatch between provided requestDto and event
    @Test
    void guardsAgainstUpdateOnDtoModelTypeMismatch() {
        // Arrange
        Goal goalModel = new Goal("team1", null, null, null);
        CardEventRequestDTO cardDto = new CardEventRequestDTO("team1", "player", 42, CardType.YELLOW_CARD);

        // Act & assert
        assertThrows(
                IllegalArgumentException.class,
                () -> registry.applyUpdate(cardDto, goalModel));
    }

    // Invariant test: duplicate mappers must be rejected
    @Test
    void duplicateMapperForSameDtoTypeIsRejected() {
        MatchEventRequestMapper<?, ?> mapper = new GoalEventRequestMapper();
        MatchEventRequestMapper<?, ?> duplicateMapper = new GoalEventRequestMapper(); // same sourceType()

        assertThrows(
                IllegalStateException.class,
                () -> new MatchEventRequestMapperRegistry(List.of(mapper, duplicateMapper)));
    }
}
