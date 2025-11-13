package p3.group.p3_aau_football.people;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/person")
public class PersonController {
    private PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping("/get/{id}")
    public Optional<Person> getPerson(@PathVariable("id") String id) {
        return personService.getPerson(id);
    }

    /* @PostMapping("/add")
    public ResponseEntity addPerson(@RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName, @RequestParam("role") Role role) {
        try {
            Person insertedPerson = personService.insertPerson(firstName, lastName, role);
            return ResponseEntity.ok(insertedPerson);
        }
    } */
    
    
}
