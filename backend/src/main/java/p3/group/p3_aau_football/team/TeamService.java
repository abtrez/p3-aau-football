package p3.group.p3_aau_football.team;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class TeamService {

    TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public List<Team> getTeams() {
        return this.teamRepository.findAll();
    }

    public Team getTeamById(String id) {
        return this.teamRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Team not found: " + id));
    }

    public Team addTeam(Team team) {
        return this.teamRepository.save(team);
    }

    public Optional<Team> findByName(String teamName) {
        return this.teamRepository.findByName(teamName);
    }
}
