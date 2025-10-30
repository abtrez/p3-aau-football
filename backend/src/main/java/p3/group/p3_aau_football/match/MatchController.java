package p3.group.p3_aau_football.match;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/match")
public class MatchController {

    @GetMapping("/overview")
    public Match getMatches() {
        return new Match("CS Sports Club", "MOSBold");
    }

    @GetMapping("/{id}")
    public Match getMatch(@PathVariable("id") String id) {
        return new Match(id, id);
    }
}
