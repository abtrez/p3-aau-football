package p3.group.p3_aau_football.match;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.service.annotation.PostExchange;

import java.util.ArrayList;
import java.util.List;

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

    @PostMapping("/{id}/edit")
    public String editMatch(@PathVariable("id") String id, @RequestParam String test1) {
        return test1;
    }

    @PostMapping("/add")
    public ResponseEntity<String> test() {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Content-Type", "application/json");
        return new ResponseEntity<String>("Created", responseHeaders, HttpStatus.OK);
    }




}
