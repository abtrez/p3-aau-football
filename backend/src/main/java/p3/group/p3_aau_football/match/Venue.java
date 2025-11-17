package p3.group.p3_aau_football.match;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "venues")
public class Venue {
    @Id
    private String id;
    private String name;
    private String pitchIdentifier; // Should be optional
    private String address;
}
