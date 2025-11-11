package p3.group.p3_aau_football.competition;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController //marks the class as a controller where every method returns a domain object instead of a view.
@RequestMapping("/api/competition")
public class CompetitionController {

    private CompetitionService competitionService;

    @Autowired
    public CompetitionController(CompetitionService competitionService) {
        this.competitionService = competitionService;
    }

    @GetMapping("get/{id}")
    public Optional<Competition> getCompetition(@PathVariable("id") String id) {
        return competitionService.getCompetition(id);
    }


    // @GetMapping("/{scopeId}/standings")
}
