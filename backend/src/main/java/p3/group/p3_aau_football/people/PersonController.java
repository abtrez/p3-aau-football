package p3.group.p3_aau_football.people;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import p3.group.p3_aau_football.role.Player;
import p3.group.p3_aau_football.role.Role;

@RestController // flags class, so it is ready for use by Spring MVC to handle web requests.
@RequestMapping("/api/person")
public class PersonController {

    private PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping("/get")
    public List<Person> getPeople() {
        return this.personService.getOverview();
    }

    @GetMapping("/get/{id}")
    public Optional<Person> getPerson(@PathVariable("id") String id) {
        return personService.getPerson(id);
    }

    @GetMapping("/getFromTeam/{teamId}")
    public List<Person> getPersonsFromTeam(@PathVariable("teamId") String teamId) {
        return personService.getPersonsByTeamId(teamId);
    }

    @GetMapping("/getFromTeam/{teamId}/role/{roleName}")
    public List<Person> getPersonFromTeamIdAndRole(@PathVariable String teamId, @PathVariable String roleName) {
        return personService.getPersonFromTeamIdAndRole(teamId, roleName);
    }

    @GetMapping("/get/roles/{personId}")
    public List<Role> getRolesFromPerson(@PathVariable String personId) {
        var person = personService.getPerson(personId);
        return person.get().getRoles();
    }

    @PostMapping("/add")
    public ResponseEntity<Person> addPerson(@RequestBody CreatePersonRequest request) {
        try {
            Person insertedPerson = personService.insertPerson(
                    request.firstName(),
                    request.lastName(),
                    request.roles(),
                    request.teamId());

            return ResponseEntity.ok(insertedPerson);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/add/{id}/addPlayer")
    public ResponseEntity<Person> addPlayerToPerson(
            @PathVariable("id") String id,
            @RequestBody Player player) {

        return personService.addPlayerToPerson(id, player)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add/{id}/addTeam/{teamId}")
    public ResponseEntity<Person> addTeamToPerson(
            @PathVariable("id") String id,
            @PathVariable("teamId") String teamId) {

        return personService.addTeamToPerson(id, teamId);
    }

    /*
     * @PatchMapping("/{id}/edit")
     * public String editMatch(@PathVariable("id") String id, @RequestParam("test1")
     * String test1, @RequestParam("test2") String test2) {
     * return test1 + " " + test2;
     * }
     */
}
