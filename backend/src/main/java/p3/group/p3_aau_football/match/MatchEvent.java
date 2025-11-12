package p3.group.p3_aau_football.match;

import p3.group.p3_aau_football.role.Player;
import p3.group.p3_aau_football.team.Team;

public abstract class MatchEvent {
    protected int id;
    protected Player player; // does a 'Player' class even exist? it's not imported here
    protected Team team; // if player not attached?
    protected int minute; // optional
}
