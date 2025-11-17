package p3.group.p3_aau_football.people;

import p3.group.p3_aau_football.role.Role;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class PersonService {

    private PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public List<Person> getOverview() {
        return this.personRepository.findAll();
    }

    public Optional<Person> getPerson(String id) {
        return this.personRepository.findById(id);
    }

    public Person insertPerson(String firstName, String lastName, List<Role> roles) throws Exception {
        Person insertedPerson = new Person(firstName, lastName, roles);

        return this.personRepository.insert(insertedPerson);
    }

    public Optional<Person> findByRoleName(String roleName) {
        return this.personRepository.findByRoleName(roleName);
    }
}
