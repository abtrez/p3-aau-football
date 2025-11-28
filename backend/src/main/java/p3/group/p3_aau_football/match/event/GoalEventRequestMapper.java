package p3.group.p3_aau_football.match.event;

/**
 * Given a validated {@link GoalEventRequestDTO} produces a new {@link Goal} model object.
 * <p>Responsibility: Conversion only. </p>
 * <b>Assumption</b>: DTO validation has occurred prior (basic json valid + domain checks ). Does not perform any checks.
 */
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
    public Class<Goal> targetType() {
        return Goal.class;
    }
}
