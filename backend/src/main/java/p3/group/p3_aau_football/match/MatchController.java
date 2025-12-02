package p3.group.p3_aau_football.match;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import p3.group.p3_aau_football.match.event.MatchEventRequestDTO;

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
    public ResponseEntity<Match> getMatch(@PathVariable("id") String id) {
        try {
            Match match = matchService.getMatch(id);
            return ResponseEntity.ok(match);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
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

    // Matches created by leaders and coaches from the frontend
    @PostMapping("/add-friendly")
    public ResponseEntity<Match> addFriendlyMatch(@RequestBody CreateMatchDTO request) {
        try {
            Match insertedMatch = matchService.insertFriendlyMatch(request);
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

    /// MATCH EVENTS
    //Works, potentially request type change
    @PostMapping("/add/{matchId}/events")
    public ResponseEntity<Match> createMatchEvents(
            @PathVariable("matchId") String matchId,
            @RequestBody List<MatchEventRequestDTO> dtos // deserialize/parse the req body (json formatted array) to a list of MatchEventsReqDtos //TODO: bean validation @Valid
    ) {
        try {
            Match updatedMatch = matchService.addMatchEvents(matchId, dtos);
            return ResponseEntity.ok(updatedMatch);
        } catch(NoSuchElementException e) { //TODO: Improve Exception handling
            System.out.println(e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/remove/{matchId}/events/{eventId}")
    public ResponseEntity<Match> deleteMatchEvent(
            @PathVariable("matchId") String matchId,
            @PathVariable("eventId") String eventId
    ) {
        try {
            Match updatedMatch = matchService.removeMatchEvent(matchId, eventId);
            return ResponseEntity.ok(updatedMatch);
        } catch (NoSuchElementException e) { //TODO: Improve Exception handling
            System.out.println(e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{matchId}/events/{eventId}")
    public ResponseEntity<Match> updateMatchEvent(
            @PathVariable("matchId") String matchId,
            @PathVariable("eventId") String eventId,
            @RequestBody MatchEventRequestDTO dto // TODO: @Valid later
    ) {
        try {
            Match updatedMatch = matchService.editMatchEvent(matchId, eventId, dto);
            return ResponseEntity.ok(updatedMatch);
        } catch (NoSuchElementException e) { //TODO: Improve Exception handling
            System.out.println(e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
}