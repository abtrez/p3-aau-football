package p3.group.p3_aau_football.match.event;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

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

    private String eventId;
    private String playerId; //Optional. Don't force teams to log
    private String teamId; //If player null, must know what team event belongs to
    private Integer minute; //Optional. Integer wrapper class to allow null, rather than primitive int that defaults to 0.

    public MatchEvent() {
        //this.id = new ObjectId().toHexString();
    }

    public String getEventId() {
        return this.eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
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
}
