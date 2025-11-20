package p3.group.p3_aau_football.team;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//Marks this class as a Spring Rest Controller
@RestController
@RequestMapping("/api/team")
public class TeamController {

    private TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping("/get")
    public List<Team> getTeams() {
        return this.teamService.getTeams();
    }

    /**
     * This method gets an id, and returns the corresponding team
     *
     * @param id of the team
     * @return The team that corresponds to the id
     */
    @GetMapping("/get/{id}")
    public ResponseEntity<Team> getTeam(@PathVariable("id") String id) {
        return teamService.getTeamById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Team> addTeam(@RequestBody Team team) {
        Team saved_team = this.teamService.addTeam(team);
        return ResponseEntity.ok(saved_team);
    }
    // handle team creation or edits POST & other requests.
}
