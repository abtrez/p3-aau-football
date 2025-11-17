package p3.group.p3_aau_football.role;

public class Player extends Role {

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

    public Player() {
    }

    public Player(PositionGroup positionGroup, Position position, int shirtNumber) {
        this.positionGroup = positionGroup;
        this.position = position;
        this.shirtNumber = shirtNumber;
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
