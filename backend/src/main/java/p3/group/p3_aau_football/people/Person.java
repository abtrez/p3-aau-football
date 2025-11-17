package p3.group.p3_aau_football.people;

import java.util.List;
import java.util.Optional;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import p3.group.p3_aau_football.role.Role;

@Document(collection = "people")
public class Person {

    @Id
    private String id;

    private String firstName;
    private String lastName;

    private List<Role> roles;

    public Person() {
    }

    public Person(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = List.of();
    }

    public Person(String firstName, String lastName, List<Role> roles) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = roles;
    }

    public String getId() {
        return this.id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public List<Role> getRoles() {
        return this.roles;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    /* @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (!(obj instanceof Person)) {
            return false;
        }
        Person other = (Person) obj;
        return this.id == other.getId();
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(this.id);
    } */
}
