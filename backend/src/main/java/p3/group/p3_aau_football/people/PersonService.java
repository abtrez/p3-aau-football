package p3.group.p3_aau_football.people;

import java.util.List;
import java.util.Optional;

import javax.management.relation.Role;

import org.springframework.stereotype.Service;

@Service
public class PersonService {
    private PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public Optional<Person> getPerson(String id) {
        return personRepository.findById(id);
    }
}
