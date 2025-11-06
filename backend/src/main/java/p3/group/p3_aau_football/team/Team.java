package p3.group.p3_aau_football.team;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import p3.group.p3_aau_football.people.Person;

public class Team {
    @Id
    private String id;
    private String name;
    private String abbreviation;
    private LocalDate established;
    private List<Person> members;
    private Person contactPerson;
    private String instituteName; // consider institute/education, if there can be more teams pr. institute

    public Team(String name, LocalDate established, Person contactPerson, String instituteName) {
        this.name = name;
        this.established = established;
        this.contactPerson = contactPerson;
        this.instituteName = instituteName;
        this.members = new ArrayList<Person>();
    }

    public Team() {
    }

    public String getId() {
        return this.id;
    }
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAbbreviation() {
        return this.abbreviation;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    public LocalDate getEstablished() {
        return this.established;
    }

    public List<Person> getMembers() {
        return this.members;
    }

    public void addMember(Person member) {
        this.members.add(member);
    }

    public void removeMember(Person member) {
        List<Person> members = this.members;
        members.remove(member);
    }

    public Person getContactPerson() {
        return this.contactPerson;
    }

    public void setContactPerson(Person contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getInstituteName() {
        return this.instituteName;
    }

    public void setInstituteName(String instituteName) {
        this.instituteName = instituteName;
    }
}
