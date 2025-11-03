package p3.group.p3_aau_football.team;

import java.time.LocalDate;
import java.util.List;
import p3.group.p3_aau_football.people.Person;

public class Team {
    private String name;
    private String abbreviation;
    private LocalDate established;
    private List<Person> members;
    private String contactPerson;
    private String institute; // consider institute/education, if there can be more teams pr. institute

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
    public void setEstablished(LocalDate date) {
        this.established = date;
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

}
