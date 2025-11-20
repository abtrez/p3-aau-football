package p3.group.p3_aau_football.match.event;

import org.springframework.data.mongodb.core.mapping.DocumentReference;
import p3.group.p3_aau_football.role.Player;

public class Goal extends MatchEvent {
    private String assisterId; //Optional

    public String getAssisterId() {
        return this.assisterId;
    }
}
