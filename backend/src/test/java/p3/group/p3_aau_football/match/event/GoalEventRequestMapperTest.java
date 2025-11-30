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
    void shouldMapGoalDtoToGoalModel() {
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

    @Test
    void shouldUpdateMutableGoalFieldsWithGoalDto() {

        //Arrange
        Goal model = new Goal("team1", null, null, null);
        String originalId = model.getId();

        GoalEventRequestDTO dto = new GoalEventRequestDTO("triedChangingTeam", "player", 42, "assister");

        //Act
        mapper.applyUpdate(dto, model);

        //Assert
        assertEquals(originalId, model.getId());              //id must be unchanged
        assertEquals("team1", model.getTeamId());    //team should not change

        assertEquals("player", model.getPlayerId());
        assertEquals(42, model.getMinute());
        assertEquals("assister", model.getAssisterId());
    }
}
