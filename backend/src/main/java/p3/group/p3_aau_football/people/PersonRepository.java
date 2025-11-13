package p3.group.p3_aau_football.people;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PersonRepository extends MongoRepository<Person, String>{
}