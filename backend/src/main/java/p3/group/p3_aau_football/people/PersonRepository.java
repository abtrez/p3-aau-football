package p3.group.p3_aau_football.people;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PersonRepository extends MongoRepository<Person, String> {

    List<Person> findByTeamId(String teamId);

    List<Person> findByTeamIdAndRoles_Name(String teamId, String roleName);
}
