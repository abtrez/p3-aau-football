package p3.group.p3_aau_football.role;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="role")
public abstract class Role {

    @Id
    private String id;
    private String name;

}