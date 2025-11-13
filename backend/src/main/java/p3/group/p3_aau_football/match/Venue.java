package p3.group.p3_aau_football.match;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "venues")
public class Venue {
    @Id
    String id;
    String name;
    String pitchIdentifier; // Should be optional
    String address;
}