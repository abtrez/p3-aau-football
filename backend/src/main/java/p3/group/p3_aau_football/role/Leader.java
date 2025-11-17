package p3.group.p3_aau_football.role;

import org.springframework.data.mongodb.core.mapping.DocumentReference;

import p3.group.p3_aau_football.permission.Permission;
import p3.group.p3_aau_football.team.Team;

public class Leader extends Role implements Permission {

    @DocumentReference
    private Team team;

    public Leader() {
    }

    public Leader(Team team) {
        this.team = team;
    }

    public Team getTeam() {
        return this.team;
    }
}
