package p3.group.p3_aau_football.people;

import java.util.List;

import p3.group.p3_aau_football.role.Role;

public class CreatePersonRequest {
    private String firstName;
    private String lastName;
    private List<Role> roles;
    private String teamId;

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public List<Role> getRoles() {
        return this.roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public String getTeamId() {
        return this.teamId;
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId;
    }
}
