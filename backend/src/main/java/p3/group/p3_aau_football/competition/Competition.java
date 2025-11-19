package p3.group.p3_aau_football.competition;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "competitions")
public class Competition {
    @Id
    private String id;
    protected String name;

    public Competition() {}

    public Competition(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public String setName(String name) {
        return this.name = name;
    }

}
