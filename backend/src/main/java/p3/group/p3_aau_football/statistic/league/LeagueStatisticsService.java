package p3.group.p3_aau_football.statistic.league;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import p3.group.p3_aau_football.match.Match;
import p3.group.p3_aau_football.statistic.common.StatisticsService;
import p3.group.p3_aau_football.statistic.exception.DocumentAlreadyExistsException;
import p3.group.p3_aau_football.statistic.exception.DocumentNotFoundException;
import p3.group.p3_aau_football.team.TeamRepository;

import java.util.Optional;

@Service
public class LeagueStatisticsService implements StatisticsService {

    LeagueStatisticsRepository leagueStatisticsRepository;

    @Autowired
    public LeagueStatisticsService(LeagueStatisticsRepository leagueRepo) {
        this.leagueStatisticsRepository = leagueRepo;
    }

    public void addLeagueStats(LeagueStatistics leagueStats) {
        boolean exists = this.leagueStatisticsRepository.existsById(leagueStats.getId());
        if (!exists) {
            this.leagueStatisticsRepository.save(leagueStats);
        } else {
            String msg = String.format("A document with the same ID already exists in the collection: DocumentID: %s", leagueStats.getId());
            throw new DocumentAlreadyExistsException(msg);
        }
    }

    public void removeLeagueStats(String id) {
        boolean exists = this.leagueStatisticsRepository.existsById(id);
        if (exists) {
            this.leagueStatisticsRepository.deleteById(id);
        } else {
            String msg = String.format("A document with the provided ID does not exists in the collection: DocumentID: %s", id);
            throw new DocumentNotFoundException(msg);
        }
    }

    /**
     * This method is only responsible for directly updating the fields of the LeagueStatistics object
     * not the entire process of updating from raw data.
     *
     */
    public void updateLeagueStatsObject(LeagueStatistics leagueStats) {
        boolean exists = this.leagueStatisticsRepository.existsById(leagueStats.getId());
        if (exists) {
            UpdateLeagueStatistics updateLeagueStats = new UpdateLeagueStatistics(); //logic is set up, but still need
            leagueStats.update(updateLeagueStats); // to figure out where to get the update data from
        } else {
            String msg = String.format("A document with the provided ID does not exists in the collection: DocumentID: %s", leagueStats.getId());
            throw new DocumentNotFoundException(msg);
        }
    }

    /**
     * This method is responsible for the entire process of getting a match as raw data, and updating the
     * relevant LeagueStatistics documents in the database
     *
     */
    public void updateLeagueStats(Match match) {
        // fetch leagueStats for teams
        LeagueStatistics homeTeam = this.leagueStatisticsRepository.findById(match.getHomeTeam().getId())
                .orElseThrow(() -> new LeagueStatisticsNotFoundException("Home Team League Statistics Not Found"));
        LeagueStatistics awayTeam = this.leagueStatisticsRepository.findById(match.getAwayTeam().getId())
                .orElseThrow(() -> new LeagueStatisticsNotFoundException("Away Team League Statistics Not Found"));

        // need to add new logic methods, call them here, then call the update method
    }

}
