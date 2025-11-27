package p3.group.p3_aau_football.role;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")

@JsonSubTypes({
        @JsonSubTypes.Type(value = Leader.class, name = "LEADER"),
        @JsonSubTypes.Type(value = Referee.class, name = "REFEREE"),
        @JsonSubTypes.Type(value = ContactPerson.class, name = "CONTACTPERSON"),
        @JsonSubTypes.Type(value = Coach.class, name = "COACH"),
        @JsonSubTypes.Type(value = Player.class, name = "PLAYER")
})

public abstract class Role {
    private String name;

    public Role() {
    }

    public Role(String name){
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
