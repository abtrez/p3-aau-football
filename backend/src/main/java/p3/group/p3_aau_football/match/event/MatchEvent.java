package p3.group.p3_aau_football.match.event;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import org.bson.types.ObjectId;

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
    private String teamId; //Required since playerId optional, must know what team the event belongs to
    private String playerId; //Optional. Don't force teams to log
    private Integer minute; //Optional. Integer wrapper class to allow null, rather than primitive int that defaults to 0.

    //Mongo-required no-args constructor
    public MatchEvent() {
    }

    /** Used (indirectly through subclasses) to create a new domain instance */
    public MatchEvent(String teamId, String playerId, Integer minute) {
        this.id = new ObjectId().toHexString();
        this.teamId = teamId;
        this.playerId = playerId;
        this.minute = minute;
    }

    public String getId() {
        return this.id;
    }

    public String getPlayerId() {
        return this.playerId;
    }
    public void setPlayerId(String playerId) {
        this.playerId = playerId;
    }

    public String getTeamId() {
        return this.teamId;
    }

    public Integer getMinute() {
        return this.minute;
    }
    public void setMinute(Integer minute) {
        this.minute = minute;
    }
}
