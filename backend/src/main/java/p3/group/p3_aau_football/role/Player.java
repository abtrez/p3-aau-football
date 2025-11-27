package p3.group.p3_aau_football.role;

public class Player extends Role {

    private int shirtNumber;

    private PositionGroup positionGroup;
    private Position position;

    public enum PositionGroup {
        DEF, MID, FOW
    }

    public enum Position {
        CB, LB, RB, LWB, RWB,
        CDM, CM, CAM, LM, RM,
        LW, RW, LA, RA, CF, ST
    }

    public Player() {
        super("Player");
    }

    public Player(PositionGroup positionGroup, Position position, int shirtNumber) {
        super("Player");
        this.positionGroup = positionGroup;
        this.position = position;
        this.shirtNumber = shirtNumber;
    }

    public int getShirtNumber() {
        return shirtNumber;
    }

    public void setShirtNumber(int shirtNumber) {
        this.shirtNumber = shirtNumber;
    }

    public PositionGroup getPositionGroup() {
        return positionGroup;
    }

    public void setPositionGroup(PositionGroup positionGroup) {
        this.positionGroup = positionGroup;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }
}
