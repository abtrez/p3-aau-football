package p3.group.p3_aau_football.team;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import p3.group.p3_aau_football.people.Person;

@Entity
@Table(name = "teams")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String abbreviation;
    private LocalDate established;

    @ManyToMany
    @JoinTable(
        name = "team_members",
        joinColumns = @JoinColumn(name = "team_id"),
        inverseJoinColumns = @JoinColumn(name = "person_id")
    )
    private List<Person> members = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "contact_person_id", nullable = false)
    private Person contactPerson;

    private String instituteName; // consider institute/education, if there can be more teams pr. institute

    protected Team() {} // JPA
    
    public Team(String name, LocalDate established, Person contactPerson, String instituteName) {
        this.name = name;
        this.established = established;
        this.contactPerson = contactPerson;
        this.instituteName = instituteName;
        this.members = new ArrayList<Person>();
    }

    public Long getId() {
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
