package p3.group.p3_aau_football.competition;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletionException;

@Service
public class CompetitionService {

    private CompetitionRepository competitionRepository;

    public CompetitionService(CompetitionRepository competitionRepository) {
        this.competitionRepository = competitionRepository;
    }

    public List<Competition> getOverview() {
        return this.competitionRepository.findAll();
    }

    public Optional<Competition> getCompetition(String id) {
        return this.competitionRepository.findById(id);
    }

    public Competition insertCompetition(Competition competition) {
        return this.competitionRepository.insert(competition);
    }
}
