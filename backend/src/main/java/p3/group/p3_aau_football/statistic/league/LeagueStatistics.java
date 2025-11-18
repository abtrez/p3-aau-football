package p3.group.p3_aau_football.statistic.league;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import p3.group.p3_aau_football.statistic.common.Statistics;
import p3.group.p3_aau_football.statistic.league.UpdateLeagueStatistics;

@Document(collection = "league_statistics")
public class LeagueStatistics extends Statistics {
    @Id
    private String id;
    private String teamId;
    private String season;
    private String competition;
    private int matchesPlayed;
    private int won;
    private int drawn;
    private int lost;
    private int goalsFor;
    private int goalsAgainst;
    private int points;

    public String getId() {
        return this.id;
    }

    public String getSeasonYearLabel() {
        return this.season;
    }

    public void setSeasonYearLabel(String yearLabel) {
        this.season = yearLabel;
    }

    public int calculatePoints(LeagueStatistics leagueStats) {
        return (leagueStats.won * 3) + (leagueStats.drawn);
    }

    public int getPoints() {
        return this.points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public String getTeamId() {
        return this.teamId;
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId;
    }

    public void setMatchesPlayed(int matchesPlayed) {
        this.matchesPlayed = matchesPlayed;
    }

    public int getMatchesPlayed() {
        return this.matchesPlayed;
    }

    public int getWins() {
        return this.won;
    }

    public void setWins(int wins) {
        this.won = wins;
    }

    public int getDraws() {
        return this.drawn;
    }

    public void setDraws(int draws) {
        this.drawn = draws;
    }

    public int getLosses() {
        return this.lost;
    }

    public void setLosses(int losses) {
        this.lost = losses;
    }

    public void setGoalsFor(int goalsFor) {
        this.goalsFor = goalsFor;
    }

    public int getGoalsFor() {
        return this.goalsFor;
    }

    public int getGoalsAgainst() {
        return this.goalsAgainst;
    }

    public void setGoalsAgainst(int goalsAgainst) {
        this.goalsAgainst = goalsAgainst;
    }

    public void setCompetition(String comp) {
        this.competition = comp;
    }

    public String getCompetition() {
        return this.competition;
    }

    public void update(UpdateLeagueStatistics updateLeagueStats) {
        if (updateLeagueStats.matchesPlayed != null) this.matchesPlayed = updateLeagueStats.matchesPlayed;
        if (updateLeagueStats.won != null) this.won = updateLeagueStats.won;
        if (updateLeagueStats.drawn != null) this.drawn = updateLeagueStats.drawn;
        if (updateLeagueStats.lost != null) this.lost = updateLeagueStats.lost;
        if (updateLeagueStats.goalsFor != null) this.goalsFor = updateLeagueStats.goalsFor;
        if (updateLeagueStats.goalsAgainst != null) this.goalsAgainst = updateLeagueStats.goalsAgainst;
        if (updateLeagueStats.points != null) this.points = updateLeagueStats.points;
    }
}
