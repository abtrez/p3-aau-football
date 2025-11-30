package p3.group.p3_aau_football.match.event;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class GoalEventRequestMapperTest {

    GoalEventRequestMapper mapper = new GoalEventRequestMapper();

    @Test
    void sourceTypeIsGoalEventRequestDTO() {
        assertEquals(GoalEventRequestDTO.class, mapper.sourceType());
    }

    @Test
    void targetTypeIsGoal() {
        assertEquals(Goal.class, mapper.targetType());
    }

    @Test
    void shouldMapGoalEventRequestDtoToGoalModel() {
        //Arrange
        GoalEventRequestDTO dto = new GoalEventRequestDTO(
                "someTeamId",
                "somePlayerId",
                12,
                "someAssisterId"
        );

        //Act
        Goal model = mapper.toModel(dto);

        //Assert
        assertEquals("someTeamId", model.getTeamId());
        assertEquals("somePlayerId", model.getPlayerId());
        assertEquals(12, model.getMinute());
        assertEquals("someAssisterId", model.getAssisterId());
    }
}
