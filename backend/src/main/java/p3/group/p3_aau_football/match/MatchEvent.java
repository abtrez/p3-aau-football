package p3.group.p3_aau_football.match;

import org.springframework.data.mongodb.core.mapping.DocumentReference;
import p3.group.p3_aau_football.role.Player;
import p3.group.p3_aau_football.team.Team;

public abstract class MatchEvent {
    protected String id;
    @DocumentReference
    protected Player player; // does a 'Player' class even exist? it's not imported here
    @DocumentReference
    protected Team team; // if player not attached?
    protected int minute; // optional
}
