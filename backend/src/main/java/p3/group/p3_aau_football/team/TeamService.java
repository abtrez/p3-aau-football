package p3.group.p3_aau_football.team;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    TeamRepository teamRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public List<Team> getTeams() {
        return this.teamRepository.findAll();
    }

    public Optional<Team> getTeamById(String id) {
        return this.teamRepository.findById(id);
    }

    public Team addTeam(Team team) {
        return this.teamRepository.insert(team);
    }

    public Optional<Team> findByName(String teamName) {
        return this.teamRepository.findByName(teamName);
    }
}
