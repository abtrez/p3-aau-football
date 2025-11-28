package p3.group.p3_aau_football.match.event;

/**
 * One directional mapper: DTO -> Model
 * @param <D> generic type for DTO,          MatchEventRequestDTO subtype
 * @param <M> generic type Model,                      MatchEvent subtype
 */
public interface MatchEventRequestMapper<D extends MatchEventRequestDTO, M extends MatchEvent> {

    /**
     * @param dto body of match event request
     * @return model
     */
    M toModel(D dto);

    /** @return model class type this mapper converts to.*/
    Class<M> targetType();
}
