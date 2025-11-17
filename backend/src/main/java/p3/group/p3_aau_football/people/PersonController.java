package p3.group.p3_aau_football.people;

import java.util.List;
import java.util.Optional;

import p3.group.p3_aau_football.role.Role;
import p3.group.p3_aau_football.role.Leader;
import p3.group.p3_aau_football.team.Team;
import p3.group.p3_aau_football.team.TeamService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController // flags class, so it is ready for use by Spring MVC to handle web requests.
@RequestMapping("/api/person")
public class PersonController {

    private PersonService personService;
    private TeamService teamService;

    public PersonController(PersonService personService, TeamService teamService) {
        this.personService = personService;
        this.teamService = teamService;
    }

    @GetMapping("/get")
    public List<Person> getPeople() {
        return this.personService.getOverview();
    }

    @GetMapping("/get/{id}")
    public Optional<Person> getPerson(@PathVariable("id") String id) {
        return personService.getPerson(id);
    }

    @PostMapping("/add")
    public ResponseEntity<Person> addPerson(@RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName, @RequestBody(required = false) List<Role> roles) {
        try {
            if (roles == null) {
                roles = List.of();
            }

            Person insertedPerson = personService.insertPerson(firstName, lastName, roles);
            return ResponseEntity.ok(insertedPerson);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    /* @PatchMapping("/{id}/edit")
    public String editMatch(@PathVariable("id") String id, @RequestParam("test1") String test1, @RequestParam("test2") String test2) {
        return test1 + " " + test2;
    } */
}
