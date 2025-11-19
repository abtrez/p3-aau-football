package p3.group.p3_aau_football.people;

import org.springframework.stereotype.Service;
import p3.group.p3_aau_football.role.Role;
import p3.group.p3_aau_football.team.Team;
import p3.group.p3_aau_football.team.TeamService;
import p3.group.p3_aau_football.role.Player;

import java.util.List;
import java.util.Optional;

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
        Person insertedPerson;

        if (teamId != null) {
            Optional<Team> personTeam = teamService.getTeamById(teamId);

            if (personTeam.isPresent()) {
                insertedPerson = new Person(firstName, lastName, roles, personTeam.get());
            } else {
                throw new Error("Team does not exist.");
            }
        } else {
            insertedPerson = new Person(firstName, lastName, roles);
        }

        return this.personRepository.insert(insertedPerson);
    }

    public Optional<Person> addPlayerToPerson(String personId, Player player) {
        return personRepository.findById(personId)
                .map(person -> {
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

}
