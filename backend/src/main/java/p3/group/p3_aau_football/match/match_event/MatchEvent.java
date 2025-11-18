package p3.group.p3_aau_football.match.match_event;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import p3.group.p3_aau_football.role.Player;
import p3.group.p3_aau_football.team.Team;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type"
)

@JsonSubTypes({
        @JsonSubTypes.Type(value = Goal.class, name = "GOAL"),
        @JsonSubTypes.Type(value = Card.class, name = "CARD")
})

public abstract class MatchEvent {
    protected String id;
    @DocumentReference
    protected Player player; // does a 'Player' class even exist? it's not imported here
    @DocumentReference
    protected Team team; // if player not attached?
    protected int minute; // optional
}
