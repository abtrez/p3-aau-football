package p3.group.p3_aau_football.match;

import org.springframework.data.annotation.Id;

public class Venue {
    @Id
    String id;
    String name;
    String pitchIdentifier; // Should be optional
    String address;
}