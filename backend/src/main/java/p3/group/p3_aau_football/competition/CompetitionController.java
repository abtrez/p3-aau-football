package p3.group.p3_aau_football.competition;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import p3.group.p3_aau_football.match.MatchService;

import java.util.List;
import java.util.Optional;

@RestController // flags class, so it is ready for use by Spring MVC to handle web requests.
@RequestMapping("/api/competition")
public class CompetitionController {

    private CompetitionService competitionService;

    public CompetitionController(CompetitionService competitionService) {
        this.competitionService = competitionService;
    }

    @GetMapping("/get")
    public List<Competition> getCompetitions() {
        return this.competitionService.getOverview();
    }

    @GetMapping("/get/{id}")
    public Optional<Competition> getCompetition(@PathVariable("id") String id) {
        return competitionService.getCompetition(id);
    }

    @PostMapping("/add")
    public ResponseEntity<Competition> addCompetition(@RequestBody Competition competition) {
        try {
            Competition insertedCompetition = competitionService.insertCompetition(competition);
            return ResponseEntity.ok(insertedCompetition);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}