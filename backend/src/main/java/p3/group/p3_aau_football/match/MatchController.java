package p3.group.p3_aau_football.match;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController // flags class, so it is ready for use by Spring MVC to handle web requests.
@RequestMapping("/api/match")
public class MatchController {

    @GetMapping("/overview")
    public List<String> getMatches(@RequestHeader("favoriteTeams") List<String> favoriteTeams) {
        //return new Match("CS Sports Club", "MOSBold");
        return favoriteTeams;
    }

    @GetMapping("/{id}")
    public Match getMatch(@PathVariable("id") String id) {
        return new Match(id, id);
    }

    @PatchMapping("/{id}/edit")
    public String editMatch(@PathVariable("id") String id, @RequestParam("test1") String test1, @RequestParam("test2") String test2) {
        return test1 + " " + test2;
    }

    /* @PostMapping("/add")
    public ResponseEntity<String> test() {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Content-Type", "application/json");
        return new ResponseEntity<String>("Created", responseHeaders, HttpStatus.OK);
    } */
}
