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

    public MatchEvent() {
        this.id = new ObjectId().toHexString(); // Consider deleting. Should only create a new id on new events, which is handled by the other constructor. This is a no args for mongo, where ids are already stored
    }

    /**
     * Used by matchService (indirectly through subclasses) to create an MatchEvent object from DTO
     */
    public MatchEvent(String teamId, String playerId, Integer minute) {
        // consider wether to use the ObjectId().toHexString here in addition/instead of above
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

    public String getTeamId() {
        return this.teamId;
    }

    public Integer getMinute() {
        return this.minute;
    }

    //Setters for everything but id
    //what about the constructor?
}
