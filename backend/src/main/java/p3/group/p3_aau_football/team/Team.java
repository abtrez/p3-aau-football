package p3.group.p3_aau_football.team;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import p3.group.p3_aau_football.people.Person;

public class Team {
    @Id
    private String id;
    private String name;
    private String abbreviation;
    private int yearEstablished;
    private String department; // consider institute/education, if there can be more teams pr. institute
    private List<String> studyPrograms;

    private Person contactPerson; //consider implementing "contactable" interface, and only allowing that type
    private List<Person> members;

    public Team(String name, String abbreviation, int yearEstablished, Person contactPerson, String department, List<String> studyPrograms) {
        this.name = name;
        this.abbreviation = abbreviation;
        this.yearEstablished = yearEstablished;
        this.department = department;
        this.studyPrograms = studyPrograms;
        this.contactPerson = contactPerson;
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

    public int getYearEstablished() {
        return this.yearEstablished;
    }

    public List<String> getStudyPrograms() {return this.studyPrograms;}
    public void setStudyPrograms(List<String> studyPrograms) {this.studyPrograms = studyPrograms;}

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

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}
