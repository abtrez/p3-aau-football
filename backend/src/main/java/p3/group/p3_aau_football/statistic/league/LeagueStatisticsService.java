package p3.group.p3_aau_football.statistic.league;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import p3.group.p3_aau_football.match.Match;
import p3.group.p3_aau_football.statistic.common.StatisticsService;
import p3.group.p3_aau_football.statistic.exception.DocumentAlreadyExistsException;
import p3.group.p3_aau_football.statistic.exception.DocumentNotFoundException;
import p3.group.p3_aau_football.team.TeamRepository;

import java.util.List;
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
     */
    public List<LeagueStatistics> updateLeagueStatsObject(List<LeagueStatistics> leagueStats, List<UpdateLeagueStatistics> updateLeagueStats) {
        leagueStats.get(0).update(updateLeagueStats.get(0));
        leagueStats.get(1).update(updateLeagueStats.get(1));
        return leagueStats;
    }

    /**
     * This method is responsible for the entire process of getting a match as raw data, and updating the
     * relevant LeagueStatistics documents in the database
     */
    public void updateLeagueStats(Match match) {

        LeagueStatistics homeTeam = this.leagueStatisticsRepository.findById(match.getHomeTeam().getId())
                .orElseThrow(() -> new LeagueStatisticsNotFoundException("Home Team League Statistics Not Found"));
        LeagueStatistics awayTeam = this.leagueStatisticsRepository.findById(match.getAwayTeam().getId())
                .orElseThrow(() -> new LeagueStatisticsNotFoundException("Away Team League Statistics Not Found"));

        List<LeagueStatistics> leagueStats = List.of(homeTeam, awayTeam);
        List<UpdateLeagueStatistics> updateLeagueStats = calculateStats(match);
        List<LeagueStatistics> updatedLeagueStats = updateLeagueStatsObject(leagueStats, updateLeagueStats);
        this.leagueStatisticsRepository.saveAll(updatedLeagueStats);

    }

    /**
     * This method calculates the fields that needs to be updated for the leagueStatistics object
     * based on the match object.
     */
    public List<UpdateLeagueStatistics> calculateStats(Match match) {
        UpdateLeagueStatistics homeTeam = new UpdateLeagueStatistics();
        UpdateLeagueStatistics awayTeam = new UpdateLeagueStatistics();

        homeTeam.matchesPlayed = 1;
        awayTeam.matchesPlayed = 1;
        if (match.getHomeScore() > match.getAwayScore()) {
            homeTeam.won = 1;
            awayTeam.lost = 1;
            homeTeam.points = 3;
        } else if (match.getHomeScore() < match.getAwayScore()) {
            homeTeam.lost = 1;
            awayTeam.won = 1;
            awayTeam.points = 3;
        } else {
            homeTeam.drawn = 1;
            awayTeam.drawn = 1;
            homeTeam.points = 1;
            awayTeam.points = 1;
        }
        homeTeam.goalsFor = match.getHomeScore();
        homeTeam.goalsAgainst = match.getAwayScore();
        awayTeam.goalsFor = match.getAwayScore();
        awayTeam.goalsAgainst = match.getHomeScore();
        return List.of(homeTeam, awayTeam);
    }

    public List<LeagueStatistics> getLeagueStatistics(String season, String competition) {
        return this.leagueStatisticsRepository.findByCompetitionAndSeason(season, competition);
    }
}
