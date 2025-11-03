package p3.group.p3_aau_football.team;

import org.springframework.web.bind.annotation.*;

//Marks this class as a Spring Rest Controller
@RestController
@RequestMapping("/api/team")
public class TeamController {

    @GetMapping("/overview")
    public String getTeams() {
        return "teams";
    }

    /**
     * Endpoint - one specified team
     * @param id of the team
     * @return .
     */
    @GetMapping("/{id}")
    public Team getTeam(@PathVariable("id") String id) {
        return new Team();
    }

}
