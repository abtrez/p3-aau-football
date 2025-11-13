package p3.group.p3_aau_football.statistic.league;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import p3.group.p3_aau_football.statistic.common.StatisticsService;
import p3.group.p3_aau_football.statistic.exception.DocumentAlreadyExistsException;
import p3.group.p3_aau_football.statistic.exception.DocumentNotFoundException;
import p3.group.p3_aau_football.team.TeamRepository;

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

    public void updateLeagueStats(LeagueStatistics leagueStats) {
        boolean exists = this.leagueStatisticsRepository.existsById(leagueStats.getId());
        if (exists) {
            // update stuff
        } else {
            String msg = String.format("A document with the provided ID does not exists in the collection: DocumentID: %s", leagueStats.getId());
            throw new DocumentNotFoundException(msg);
        }
    }

}
