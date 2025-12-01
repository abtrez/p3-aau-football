package p3.group.p3_aau_football.competition;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompetitionService {

    private final CompetitionRepository competitionRepository;

    public CompetitionService(CompetitionRepository competitionRepository) {
        this.competitionRepository = competitionRepository;
    }

    public List<Competition> getOverview() {
        List<Competition> competitions = this.competitionRepository.findAll();
        if (competitions.isEmpty()) {
            throw new CompetitionNotFoundException("No competitions in the collection");
        }
        return competitions;
    }

    public Competition getCompetition(String id) {
        return this.competitionRepository.findById(id)
                .orElseThrow(() -> new CompetitionNotFoundException(String.format("Competition not found with ID: %s", id)));
    }

    public Competition getCompetitionBySeasonAndName(String season, String name) {
        return this.competitionRepository.findBySeasonAndName(season, name)
                .orElseThrow(() -> new CompetitionNotFoundException(String.format("Competition not found with Season: %s and Name: %s", season, name)));
    }

    public Competition insertCompetition(String season, String name) {
        boolean exists = this.competitionRepository.existsBySeasonAndName(season, name);
        if (exists) {
            String message = String.format("A competition with the same season and name already exists: Season: %s, Name: %s", season, name);
            throw new CompetitionAlreadyExistsException(message);
        }
        return this.competitionRepository.insert(new Competition(season, name));
    }


}
