package p3.group.p3_aau_football.people;

import p3.group.p3_aau_football.role.Role;

import java.util.List;

public class Person {

    private int id;
    private String firstName;
    private String lastName;
    private List<Role> roles;

    public int getId() {
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

    public void setId(int id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void getRoles(List<Role> roles) {
        this.roles = roles;
    }

    @Override
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
    }
}
