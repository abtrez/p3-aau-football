package p3.group.p3_aau_football.people;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import p3.group.p3_aau_football.role.Player;

import java.util.List;

@RestController
@RequestMapping("/api/person")
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @PostMapping
    public ResponseEntity<Person> createPerson(@RequestBody Person person) {
        Person saved = personService.savePerson(person);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Person> getPerson(@PathVariable("id") String id) {
        return personService.getPerson(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Person>> listPersons() {
        return ResponseEntity.ok(personService.getAllPersons());
    }

    @PostMapping("/{id}/addPlayer")
    public ResponseEntity<Person> addPlayerToPerson(
            @PathVariable("id") String id,
            @RequestBody Player player) {

        return personService.addPlayerToPerson(id, player)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
