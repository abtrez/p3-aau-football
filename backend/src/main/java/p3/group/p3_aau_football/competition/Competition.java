package p3.group.p3_aau_football.competition;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "competitions")
public class Competition {
    @Id
    private String id;
    private String season;
    private String name;

    public Competition() {}

    public Competition(String name) {
        this.name = name;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSeason() {
        return this.season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public String getName() {
        return this.name;
    }

    public String setName(String name) {
        return this.name = name;
    }

}
