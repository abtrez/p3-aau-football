package p3.group.p3_aau_football.Role;

import p3.group.p3_aau_football.team.Team;

public class Coach {

    private Team team;
    private Boolean isAssistant;

    public Team getTeam() {
        return this.team;
    }

    public Boolean getIsAssistant() {
        return this.isAssistant;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public void setIsAssistant(Boolean isAssistant) {
        this.isAssistant = isAssistant;
    }
}
