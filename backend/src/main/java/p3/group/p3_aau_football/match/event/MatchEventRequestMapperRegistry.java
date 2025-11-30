package p3.group.p3_aau_football.match.event;

import org.springframework.stereotype.Component;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Spring-managed registry that knows which mapper to use for each {@link MatchEventRequestDTO} subtype to resolve model.
 *
 * <p>Purpose:</p>
 * <ul>
 *     <li>Convert any MatchEventRequestDTO concrete subtype into its corresponding MatchEvent subtype.</li>
 *     <li>Maintain a lookup table with one mapper instance per DTO subtype.</li>
 *     <li>Provide conversion from a MatchEventRequestDTO subtype --> its corresponding MatchEvent subtype. {@code Goal goal = registry.toModel(goalDto);}</li>
 * </ul>
 *
 * <p>OCP Motivation: New event type -> add new mapper bean -> constructor picks it up automatically via Spring DI.
 *                    No switch/case or instanceof in other layers.</p>
 * <p>DTOs kept as 'dumb' data transfer objects without conversion logic (SRP).</p>
 *
 * <p> Generics used, because each mapper(DtoType, MatchEventType) has own concrete type pair.
 *       Java treats the parameterizations as unrelated types.</p>
 *
 *       <p> I.e.  {@code MatchEventRequestMapper<GoalEventRequestDTO,Goal>} is NOT a subtype of {@code MatchEventRequestMapper<MatchEventRequestDTO,MatchEvent>}</p>
 *
 * <p> Wildcards {@code ?} allow the registry map to store mappers with different type arguments.  </p>
 */
@Component
public final class MatchEventRequestMapperRegistry {

    /**
     * Registry/Lookup table mapping DTO runtime classes -> their associated mappers.
     * <ul>
     *  <li>Key:   concrete DTO class (e.g. {@link GoalEventRequestDTO}.class). Must be MatchEventRequestDTO subtype. </li>
     *  <li>Value: mapper instance for that DTO type.</li>
     * </ul>
     * The {@link MatchEventRequestMapper} interface already enforces type bounds on D and M, so explicit bounds are not repeated here for readability.
     */
    private final Map<
                        Class<? extends MatchEventRequestDTO>,  //KEY:   concrete DTO Java class.            (MatchEventRequestDTO subtype, expressed by Wildcard(?) upper bounded to MatchEventRequestDTO)
                        MatchEventRequestMapper<?, ?>           //VALUE: mapper instance for that DTO type.  (Wildcards are still bounded by the interface declaration.)
                     > registry = new HashMap<>();

    /**
     * Constructor used by Spring to inject all mapper beans.
     *
     * <p>Invariant enforced here: </p>
     * <ul>
     *     <li>For each concrete DTO class, there is <b>exactly one</b> mapper.</li>
     *     <li>The mapper is stored under that DTO class as the key only. {@code mapper.sourceType()} </li>
     * </ul>
     *
     * @param allMappers all MatchEventRequestMapper implementations detected via @Component.
     */
    public MatchEventRequestMapperRegistry( List<MatchEventRequestMapper<?,?>> allMappers ) {
        // Build registry from mapper.sourceType() -> mapper
        for (MatchEventRequestMapper<?, ?> mapper : allMappers) {

            /* Add the key(dto class), value(its associated mapper) pair to the HashMap. */
            MatchEventRequestMapper<?, ?> previous = registry.put(
                    mapper.sourceType(), // returns DTO java runtime class
                    mapper
            );

            /* Enforcing invariant - put() returns the previous value associated with key, or null if there was no mapping for key*/
            if (previous != null) {
                throw new IllegalStateException(
                        "More than one MatchEventRequestMapper registered for DTO type: " + mapper.sourceType()
                );
            }
        }
    }

    /**
     * Internal helper that returns the mapper associated with runtime type of the provided DTO.
     *
     * @param dto the request DTO instance.
     * @return a strongly-typed mapper for the DTO’s concrete type.
     * @throws IllegalArgumentException if no mapper is registered for the DTO type.
     *       <type parameters, placeholders in signature and body,> <return type>*/
    private  <D extends MatchEventRequestDTO, M extends MatchEvent> MatchEventRequestMapper<D,M> getMapper (D dto) {

        if (dto == null) {
            throw new IllegalArgumentException("dto can not be null.");
        }

        // Look up mapper (value), by DTO class (key)
        MatchEventRequestMapper<?, ?> rawMapper = registry.get(dto.getClass());      //hashMap.get(key) method returns value(mapper).

        //Ensure mapper registered
        if (rawMapper == null) {
            throw new IllegalArgumentException("No mapper registered for DTO type: " + dto.getClass().getName());
        }

        /* Cast is safe under registry-construction invariant:
         *    For each mapper(value), store it under (key) mapper.sourceType().
         *    sourceType() returns the DTO class D the mapper accepts.
         *    Mapper is never stored under any other key.
         *
         * Therefore, looking up the registry with argument dto.getClass(),
         *  returns the mapper whose <D, M> matches the concrete type of dto.
         */
        return (MatchEventRequestMapper<D, M>) rawMapper;
    }

    /**
     * Converts a request DTO into its corresponding MatchEvent model
     * using the mapper associated with the DTO’s concrete class.
     *
     * @param dto the request DTO instance
     * @param <D> the concrete DTO type
     * @param <M> the concrete MatchEvent type
     * @return a populated MatchEvent model instance
     */
    public <D extends MatchEventRequestDTO, M extends MatchEvent> M toModel(D dto) {
        MatchEventRequestMapper<D, M> typedMapper = getMapper(dto);
        // Delegate model conversion to mapper.
        return typedMapper.toModel(dto);
    }

    /**
     * Applies the given request DTO to an existing MatchEvent model instance.
     * <p> requestDTO subtype and existing event subtype must align. </p>
     * @param dto   the request DTO to apply
     * @param model the existing MatchEvent instance to update
     * @param <D>   the concrete DTO type
     * @param <M>   the concrete MatchEvent subtype being updated
     * @throws IllegalArgumentException if mismatch between provided requestDto and event
     */
    public <D extends MatchEventRequestDTO, M extends MatchEvent> void applyUpdate(D dto, M model) {
        /* Determines the model subtype that this DTO is allowed to update.
         * (DTO subtype -> resolves mapper -> determines model subtype) */
        MatchEventRequestMapper<D, M> typedMapper = getMapper(dto);

        /* Ensure existing event matches the model subtype implied by the DTO through its mapper.
          Prevents mismatches such as CardEventRequestDTO applied to a Goal event.*/
        if (!typedMapper.targetType().isInstance(model)) {
            throw new IllegalArgumentException(
                    "DTO type " + dto.getClass().getName() + " does not match event type " + model.getClass().getName()
            );
        }
        //No mismatch. Delegate model update to mapper.
        typedMapper.applyUpdate(dto, model);
    }
}