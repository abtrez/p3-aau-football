package p3.group.p3_aau_football.team;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

public interface TeamRepository extends MongoRepository<Team, String> {
    Optional<Team> findByName(String name);
}
