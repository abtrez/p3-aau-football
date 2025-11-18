package p3.group.p3_aau_football.role;

public class Player extends Role {
    private String teamId;
    private int shirtNumber;

    private PositionGroup positionGroup;
    private Position position;

    public enum PositionGroup {
        DEF, MID, FOW
    }

    public enum Position {
        CB, LB, RB, LWB, RWB, CDM, CM, CAM,
        LM, ST, CF, LW, RW, LA, RA
    }

    public Player() {
        super();
    }

    public Player(String name, String teamId, int shirtNumber, PositionGroup positionGroup, Position position) {
        super(name);
        this.teamId = teamId;
        this.shirtNumber = shirtNumber;
        this.positionGroup = positionGroup;
        this.position = position;
    }

    public String getTeamId() {
        return teamId;
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId;
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
