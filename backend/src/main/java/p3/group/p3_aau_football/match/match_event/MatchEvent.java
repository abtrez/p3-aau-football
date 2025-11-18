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
    private String id;
    @DocumentReference
    private Player player; //optional
    @DocumentReference
    private Team team; // If player null, must know what team event belongs to
    private int minute; // optional

    public MatchEvent() {

    }

    public String getId() {
        return this.id;
    }

    public Player getPlayer() {
        return this.player;
    }

    public Team getTeam() {
        return this.team;
    }

    public int getMinute() {
        return this.minute;
    }
}
