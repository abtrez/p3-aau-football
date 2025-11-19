package p3.group.p3_aau_football.people;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import p3.group.p3_aau_football.role.Role;
import p3.group.p3_aau_football.team.Team;

@Document(collection = "persons")
public class Person {

    @Id
    private String id;

    private String firstName;
    private String lastName;

    private List<Role> roles;

    private String teamId;

    public Person() {
    }

    public Person(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = new ArrayList<>();
        this.teamId = null;
    }

    public Person(String firstName, String lastName, List<Role> roles) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = roles;
        this.teamId = null;
    }

    public Person(String firstName, String lastName, List<Role> roles, String teamId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = roles;
        this.teamId = teamId;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
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

    public void addRole(Role role) {
        this.roles.add(role);
    }

    public String getTeamId() {
        return this.teamId;
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId;
    }

    /*
     * @Override
     * public boolean equals(Object obj) {
     * if (this == obj) {
     * return true;
     * if (o == null || getClass() != o.getClass())
     * return false;
     * 
     * Person person = (Person) o;
     * return Objects.equals(id, person.id);
     * }
     * 
     * @Override
     * public int hashCode() {
     * return Integer.hashCode(this.id);
     * }
     */
}
