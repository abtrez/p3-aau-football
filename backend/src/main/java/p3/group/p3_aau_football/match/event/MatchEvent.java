package p3.group.p3_aau_football.match.event;

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
    private Player player; //Optional. Don't force teams to log
    @DocumentReference
    private Team team; //If player null, must know what team event belongs to
    private Integer minute; //Optional. Integer wrapper class to allow null, rather than primitive int that defaults to 0.

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

    public Integer getMinute() {
        return this.minute;
    }
}
