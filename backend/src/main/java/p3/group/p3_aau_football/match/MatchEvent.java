package p3.group.p3_aau_football.match;

import p3.group.p3_aau_football.team.Team;

public abstract class MatchEvent {
    protected int id;
    protected Player player;
    protected Team team; //if player not attached?
    protected int minute; //optional
}
