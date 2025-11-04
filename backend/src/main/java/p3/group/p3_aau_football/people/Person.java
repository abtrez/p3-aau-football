package p3.group.p3_aau_football.people;

public class Person {
    private int id;

    public int getId() {
        return this.id;
    }
    public void setId(int id) {
        this.id = id;
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
