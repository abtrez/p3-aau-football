package p3.group.p3_aau_football.competition;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/competition")
public class CompetitionController {

    private final CompetitionService competitionService;

    public CompetitionController(CompetitionService competitionService) {
        this.competitionService = competitionService;
    }

    @GetMapping("/get")
    public List<Competition> getCompetitions() {
        return this.competitionService.getOverview();
    }

    @GetMapping("/get/{id}")
    public Competition getCompetition(@PathVariable("id") String id) {
        return competitionService.getCompetition(id);
    }

    @GetMapping("/get")
    public Competition getCompetitionBySeasonAndName(@RequestParam("name") String name, @RequestParam("season") String season) {
        return competitionService.getCompetitionBySeasonAndName(season, name);
    }

    @PostMapping("/add")
    public ResponseEntity<Competition> addCompetition(@RequestBody CreateCompetitionRequestDTO request) {
        Competition insertedCompetition = competitionService.insertCompetition(
                request.season(),
                request.name()
        );
        return ResponseEntity.ok(insertedCompetition);
    }


}