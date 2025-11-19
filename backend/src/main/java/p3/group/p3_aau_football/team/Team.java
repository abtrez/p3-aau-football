package p3.group.p3_aau_football.team;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import p3.group.p3_aau_football.people.Person;

@Document(collection = "teams")
public class Team {

    @Id
    private String id;
    private String name;
    private String abbreviation;
    private int yearEstablished;
    private String department; // consider institute/education, if there can be more teams pr. institute
    private List<String> studyPrograms;
    private String contactPerson; // consider implementing "contactable" interface, and only allowing that type

    public Team() {
    }

    public Team(String name, String abbreviation, int yearEstablished, String department,
            List<String> studyPrograms, String contactPerson) {
        this.name = name;
        this.abbreviation = abbreviation;
        this.yearEstablished = yearEstablished;
        this.department = department;
        this.studyPrograms = studyPrograms;
        this.contactPerson = contactPerson;
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

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public List<String> getStudyPrograms() {
        return this.studyPrograms;
    }

    public void setStudyPrograms(List<String> studyPrograms) {
        this.studyPrograms = studyPrograms;
    }

    public String getContactPerson() {
        return this.contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }
}
