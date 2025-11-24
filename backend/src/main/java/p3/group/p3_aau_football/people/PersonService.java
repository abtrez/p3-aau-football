package p3.group.p3_aau_football.people;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import p3.group.p3_aau_football.role.Player;
import p3.group.p3_aau_football.role.Role;
import p3.group.p3_aau_football.team.TeamService;

@Service
public class PersonService {

    private final PersonRepository personRepository;
    private final TeamService teamService;

    public PersonService(PersonRepository personRepository, TeamService teamService) {
        this.personRepository = personRepository;
        this.teamService = teamService;
    }

    public Optional<Person> getPerson(String id) {
        return personRepository.findById(id);
    }

    public Person updatePerson(Person person) {
        return personRepository.save(person);
    }

    public Person insertPerson(String firstName, String lastName, List<Role> roles, String teamId) throws Exception {
        if (roles == null) {
            roles = new ArrayList<>();
        }

        Person insertedPerson = new Person(firstName, lastName, roles);
        insertedPerson.setTeamId(teamId);

        return this.personRepository.save(insertedPerson);
    }

    public Optional<Person> addPlayerToPerson(String personId, Player player) {
        return personRepository.findById(personId).map(person -> {
            person.addRole(player);
            return personRepository.save(person);
        });
    }

    public List<Person> getOverview() {
        return personRepository.findAll();
    }

    public Optional<Person> findByRoleName(String roleName) {
        return this.personRepository.findByRoleName(roleName);
    }

    public List<Person> getPersonsFromTeam(String teamId) {
        return personRepository.findByTeamId(teamId);
    }

    public List<Person> getPersonFromTeamIdAndRole(String teamId, String roleName){
        return personRepository.findByTeamIdAndRole(teamId, roleName);
    }

    public ResponseEntity<Person> addTeamToPerson(String personId, String teamId) {

        if (teamId == null) {
            throw new Error("Team ID is null.");
        }

        Optional<Person> personOpt = personRepository.findById(personId);

        if (personOpt.isEmpty()) {
            throw new Error("Person does not exist.");
        }

        Person person = personOpt.get();

        person.setTeamId(teamId);
        Person insertedPerson = personRepository.save(person);

        return ResponseEntity.ok(insertedPerson);
    }

}
