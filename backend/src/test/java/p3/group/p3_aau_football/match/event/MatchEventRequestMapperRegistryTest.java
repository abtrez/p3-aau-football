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

    @Test
    void goalDtoIsMappedToGoal() {
        //Arrange
        GoalEventRequestDTO goalDto = new GoalEventRequestDTO(
                "someTeamId",
                "somePlayerId",
                22,
                "someAssisterId"
        );

        //Act
        Goal goalModel = registry.toModel(goalDto);

        //Assert
        assertEquals("someTeamId", goalModel.getTeamId());
        assertEquals("somePlayerId", goalModel.getPlayerId());
        assertEquals(22, goalModel.getMinute());
        assertEquals("someAssisterId", goalModel.getAssisterId());
    }

    @Test
    void cardDtoIsMappedToCard() {
        //Arrange
        CardEventRequestDTO cardDto = new CardEventRequestDTO(
                "someTeamId",
                "somePlayerId",
                63,
                CardType.RED_CARD
        );

        //Act
        Card cardModel = registry.toModel(cardDto);

        //Assert
        assertEquals("someTeamId", cardModel.getTeamId());
        assertEquals("somePlayerId", cardModel.getPlayerId());
        assertEquals(63, cardModel.getMinute());
        assertEquals(CardType.RED_CARD, cardModel.getCardType());
    }

    // Invariant test: duplicate mappers must be rejected
    @Test
    void duplicateMapperForSameDtoTypeIsRejected() {
        MatchEventRequestMapper<?, ?> mapper = new GoalEventRequestMapper();
        MatchEventRequestMapper<?, ?> duplicateMapper = new GoalEventRequestMapper(); // same sourceType()

        assertThrows(
                IllegalStateException.class,
                () -> new MatchEventRequestMapperRegistry(List.of(mapper, duplicateMapper))
        );
    }
}
