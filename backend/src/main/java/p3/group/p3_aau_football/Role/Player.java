package p3.group.p3_aau_football.Role;

import p3.group.p3_aau_football.team.Team;

public class Player {

    private Team team;
    private int shirtNumber;

    private PositionGroup positionGroup;
    private Position position;

    enum PositionGroup {
        DEF,
        MID,
        FOW
    }

    enum Position {
        CB, LB, RB, LWB, RWB, CDM, CM, CAM,
        LM, ST, CF, LW, RW, LA, RA

    }

    public Team getTeam() {
        return this.team;
    }

    public int getshirtNumber() {
        return this.shirtNumber;
    }

    public PositionGroup getPositionGroup() {
        return this.positionGroup;
    }

    public Position getPosition() {
        return this.position;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public void setShirtNumber(int shirtNumber) {
        this.shirtNumber = shirtNumber;
    }

    public void setPositionGroup(PositionGroup positionGroup) {
        this.positionGroup = positionGroup;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

}
