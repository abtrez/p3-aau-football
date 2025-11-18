package p3.group.p3_aau_football.people;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface PersonRepository extends MongoRepository<Person, String> {

    @Query("{ 'role' : { 'name' : ?0} }")
    Optional<Person> findByRoleName(String roleName);
}
