package p3.group.p3_aau_football.people;

import p3.group.p3_aau_football.role.Role;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Document(collection = "person")
public class Person {
    @Id
    private String id;

    private String firstName;
    private String lastName;

    // Embedded roles (Player, Coach, ...). Jackson will handle actual subtype
    // thanks to @JsonTypeInfo on Role.
    private List<Role> roles;

    // No-arg constructor for Jackson / Spring
    public Person() {
        this.roles = new ArrayList<>();
    }

    public Person(String firstName, String lastName, List<Role> roles) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = roles != null ? roles : new ArrayList<>();
    }

    public String getId() {
        return id;
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
        if (roles == null)
            roles = new ArrayList<>();
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    // convenience
    public void addRole(Role role) {
        getRoles().add(role);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;

        Person person = (Person) o;
        return Objects.equals(id, person.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
