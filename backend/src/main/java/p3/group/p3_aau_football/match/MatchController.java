package p3.group.p3_aau_football.match;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController // flags class, so it is ready for use by Spring MVC to handle web requests.
@RequestMapping("/api/match")
public class MatchController {

    @Autowired
    MatchService matchService;

    @GetMapping("/overview")
    public List<Match> getMatches() {

        List<Match> matchOverview = matchService.getOverview();

        return matchOverview;
    }

    @PostMapping("/add")
    public ResponseEntity<Match> addMatch(@RequestParam("homeTeam") String homeTeam, @RequestParam("awayTeam") String awayTeam) {
        Match insertedMatch = matchService.insertMatch(homeTeam, awayTeam);

        return ResponseEntity.ok(insertedMatch);
    }

    @GetMapping("/{id}")
    public Optional<Match> getMatch(@PathVariable("id") String id) {
        return matchService.getMatch(id);
    }

    /* @PatchMapping("/{id}/edit")
    public RespondEntity<Match> editMatch(
    @PathVariable("id") String id,
    @RequestParam(required = false) String Date,
    @RequestParam(required = false) String Venue,
    @RequestParam(required = false) Boolean Cancel
    )
    {
    Optional <Match> updatedMatch = Matchservice.updateMatch(id, Date, Venue, Cancel);

        return ResponseEntity.ok(updatedMatch);
    }
     */
}
