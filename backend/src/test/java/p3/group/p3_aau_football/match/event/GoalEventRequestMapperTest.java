package p3.group.p3_aau_football.match.event;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class GoalEventRequestMapperTest {

    @Test
    void shouldMapGoalEventRequestDtoToGoalModel() {
        //Arrange
        GoalEventRequestDTO dto = new GoalEventRequestDTO(
                "someTeamId",
                "somePlayerId",
                12,
                "someAssisterId"
        );

        GoalEventRequestMapper mapper = new GoalEventRequestMapper();

        //Act
        Goal model = mapper.toModel(dto);

        //Assert
        assertEquals("someTeamId", model.getTeamId());
        assertEquals("somePlayerId", model.getPlayerId());
        assertEquals(12, model.getMinute());
        assertEquals("someAssisterId", model.getAssisterId());
    }

}
