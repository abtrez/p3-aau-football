package p3.group.p3_aau_football.people;

import org.springframework.stereotype.Service;
import p3.group.p3_aau_football.role.Player;

import java.util.List;
import java.util.Optional;

@Service
public class PersonService {
    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public Optional<Person> getPerson(String id) {
        return personRepository.findById(id);
    }

    public Person savePerson(Person person) {
        return personRepository.save(person);
    }

    public Optional<Person> addPlayerToPerson(String personId, Player player) {
        return personRepository.findById(personId)
                .map(person -> {
                    person.addRole(player);
                    return personRepository.save(person);
                });
    }

    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }

}
