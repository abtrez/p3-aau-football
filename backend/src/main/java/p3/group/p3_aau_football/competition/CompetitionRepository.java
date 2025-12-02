package p3.group.p3_aau_football.competition;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CompetitionRepository extends MongoRepository<Competition, String> {
    boolean existsBySeasonAndName(String season, String name);

    Optional<Competition> findBySeasonAndName(String season, String name);
}
