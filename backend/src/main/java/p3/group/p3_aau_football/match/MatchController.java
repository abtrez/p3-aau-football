package p3.group.p3_aau_football.match;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController // flags class, so it is ready for use by Spring MVC to handle web requests.
@RequestMapping("/api/match")
public class MatchController {

    private MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping("/get")
    public List<Match> getMatches() {
        return this.matchService.getOverview();
    }

    @GetMapping("/get/{id}")
    public Optional<Match> getMatch(@PathVariable("id") String id) {
        return matchService.getMatch(id);
    }

    @PostMapping("/add")
    public ResponseEntity<Match> addMatch(@RequestBody Match match) {
        try {
            Match insertedMatch = matchService.insertMatch(match);
            return ResponseEntity.ok(insertedMatch);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }



    /*
     * @PatchMapping("/{id}/edit")
     * public String editMatch(@PathVariable("id") String id, @RequestParam("test1")
     * String test1, @RequestParam("test2") String test2) {
     * return test1 + " " + test2;
     * }
     */
}
