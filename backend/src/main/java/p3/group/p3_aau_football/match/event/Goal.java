package p3.group.p3_aau_football.match.event;

public class Goal extends MatchEvent {
    private String assisterId; //Optional

    //Mongo-required no-args constructor
    public Goal() { super(); }

    /** Used to create a new domain instance */
    public Goal(String teamId, String playerId, Integer minute, String assisterId) {
        super(teamId, playerId, minute);
        this.assisterId = assisterId;
    }
    
    public String getAssisterId() {
        return this.assisterId;
    }
    public void setAssisterId(String assisterId) {
        this.assisterId = assisterId;
    }
}
