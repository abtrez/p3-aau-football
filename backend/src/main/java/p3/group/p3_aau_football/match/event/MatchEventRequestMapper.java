package p3.group.p3_aau_football.match.event;

/**
 * <p>Generic one directional mapper for match event requests: DTO -> Model.</p>
 * <p>Responsibility: Conversion only. </p>
 * <p>Generic class (Parameterized class) for polymorphic code.</p>
 * Subtype <b>assumptions</b>: Given a validated DTO, produce the corresponding model object.
 * @param <D> bounded generic type for DTO,   must be subtype of   MatchEventRequestDTO
 * @param <M> bounded generic type Model,     must be subtype of   MatchEvent
 */
public interface MatchEventRequestMapper<D extends MatchEventRequestDTO, M extends MatchEvent> {

    /** Create a new domain model instance from an incoming request DTO.
     * @param dto body of match event request
     * @return model
     * Called when adding new match events.
     */
    M toModel(D dto);

    /** Apply an update from request DTO onto an existing domain model instance.
     * Called when editing match events. Mutates in place.*/
    void applyUpdate(D dto, M model);

    /** @return dto class type this mapper converts from (used as key in registry). */
    Class<D> sourceType();

    /** @return model class type this mapper produces*/
    Class<M> targetType();
}
