package p3.group.p3_aau_football.role;

public class ContactPerson extends Role {

    private String phoneNumber;

    public ContactPerson() {
        super("Contact Person");
    }

    public ContactPerson(String phoneNumber) {
        super("Contact Person");
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
