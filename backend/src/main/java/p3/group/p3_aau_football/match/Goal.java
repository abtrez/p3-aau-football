package p3.group.p3_aau_football.match;

import org.springframework.data.mongodb.core.mapping.DocumentReference;
import p3.group.p3_aau_football.role.Player;


public class Goal extends MatchEvent {
    @DocumentReference
    private Player assister;
}
