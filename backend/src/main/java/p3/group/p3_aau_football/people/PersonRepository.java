package p3.group.p3_aau_football.people;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface PersonRepository extends MongoRepository<Person, String> {

    @Query("{ 'role' : { 'name' : ?0} }")
    Optional<Person> findByRoleName(String roleName);

    //fetching persons from a team
    List<Person> findByTeamId(String teamId);

    //fetching persons from a team with a special role
    List<Person> findByTeamIdAndRoles_Name(String teamId, String roleName);
}
