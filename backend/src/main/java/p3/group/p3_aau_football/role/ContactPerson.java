package p3.group.p3_aau_football.role;

public class ContactPerson extends Role {

    private String phoneNumber;

    public ContactPerson() {
    }

    public ContactPerson(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
