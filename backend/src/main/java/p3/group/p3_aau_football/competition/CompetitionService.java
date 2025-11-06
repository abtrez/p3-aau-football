package p3.group.p3_aau_football.competition;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CompetitionService {
    private CompetitionRepository competitionRepository;

    public CompetitionService(CompetitionRepository competitionRepository) {
        this.competitionRepository = competitionRepository;
    }

    public Optional<Competition> getCompetition(String id) {
        return competitionRepository.findById(id);
    }

}
