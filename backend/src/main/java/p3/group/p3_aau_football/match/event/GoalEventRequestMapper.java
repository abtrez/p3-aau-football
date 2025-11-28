package p3.group.p3_aau_football.match.event;

public class GoalEventRequestMapper implements MatchEventRequestMapper<GoalEventRequestDTO, Goal> {

    @Override
    public Goal toModel(GoalEventRequestDTO dto) {
        // return new Goal
        return new Goal();
    }

    @Override
    public Class<Goal> targetType() {
        return Goal.class;
    }
}
