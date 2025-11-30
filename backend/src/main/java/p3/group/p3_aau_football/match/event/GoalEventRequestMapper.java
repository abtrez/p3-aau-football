package p3.group.p3_aau_football.match.event;

import org.springframework.stereotype.Component;

/**
 * Given a validated {@link GoalEventRequestDTO} produces a new {@link Goal} model object.
 * <p>Responsibility: Conversion only. </p>
 * <b>Assumption</b>: DTO validation has occurred prior (basic json valid + domain checks ). Does not perform any checks.
 */
@Component
public class GoalEventRequestMapper implements MatchEventRequestMapper<GoalEventRequestDTO, Goal> {

    @Override
    public Goal toModel(GoalEventRequestDTO dto) {
        // Creates an entirely new goal event, with a newly generated id
        return new Goal(
                dto.teamId(),
                dto.playerId(),
                dto.minute(),
                dto.assisterId()
        );
    }

    @Override
    public void applyUpdate(GoalEventRequestDTO dto, Goal model) {
        //common fields
        model.setPlayerId(dto.playerId());
        model.setMinute(dto.minute());
        //specific fields
        model.setAssisterId(dto.assisterId());
    }

    @Override
    public Class<GoalEventRequestDTO> sourceType() {
        return GoalEventRequestDTO.class;
    }

    @Override
    public Class<Goal> targetType() {
        return Goal.class;
    }
}
