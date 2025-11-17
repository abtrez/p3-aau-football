package p3.group.p3_aau_football.match;

import p3.group.p3_aau_football.role.Player;

public abstract class MatchEvent {
    protected String id;
    protected Player player;
    protected String teamId; // if player not attached?
    protected int minute; // optional
}
