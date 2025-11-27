package p3.group.p3_aau_football.statistic.league;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import p3.group.p3_aau_football.statistic.common.Statistics;
import p3.group.p3_aau_football.team.Team;

@Document(collection = "league_statistics")
public class LeagueStatistics extends Statistics {

    @Id
    private String id;
    @DocumentReference
    private Team team;
    private String competitionId;
    private String season;
    private int matchesPlayed;
    private int won;
    private int drawn;
    private int lost;
    private int goalsFor;
    private int goalsAgainst;
    private int points;

    public LeagueStatistics() {
    }

    public LeagueStatistics(Team team, String season, String competitionId, int matchesPlayed, int won, int drawn, int lost, int goalsFor, int goalsAgainst, int points) {
        this.team = team;
        this.season = season;
        this.competitionId = competitionId;
        this.matchesPlayed = matchesPlayed;
        this.won = won;
        this.drawn = drawn;
        this.lost = lost;
        this.goalsFor = goalsFor;
        this.goalsAgainst = goalsAgainst;
        this.points = points;
    }

    public String getId() {
        return this.id;
    }

    public String getSeason() {
        return this.season;
    }

    public void setSeason(String season) {
        this.season = season;
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

    public Team getTeam() {
        return this.team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public void setMatchesPlayed(int matchesPlayed) {
        this.matchesPlayed = matchesPlayed;
    }

    public int getMatchesPlayed() {
        return this.matchesPlayed;
    }

    public int getWon() {
        return this.won;
    }

    public void setWon(int wins) {
        this.won = wins;
    }

    public int getDrawn() {
        return this.drawn;
    }

    public void setDrawn(int draws) {
        this.drawn = draws;
    }

    public int getLost() {
        return this.lost;
    }

    public void setLost(int losses) {
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

    public void setCompetitionId(String competitionId) {
        this.competitionId = competitionId;
    }

    public String getCompetitionId() {
        return this.competitionId;
    }

    public void update(UpdateLeagueStatistics updateLeagueStats) {
        if (updateLeagueStats.matchesPlayed != null) {
            this.matchesPlayed += updateLeagueStats.matchesPlayed;
        }
        if (updateLeagueStats.won != null) {
            this.won += updateLeagueStats.won;
        }
        if (updateLeagueStats.drawn != null) {
            this.drawn += updateLeagueStats.drawn;
        }
        if (updateLeagueStats.lost != null) {
            this.lost += updateLeagueStats.lost;
        }
        if (updateLeagueStats.goalsFor != null) {
            this.goalsFor += updateLeagueStats.goalsFor;
        }
        if (updateLeagueStats.goalsAgainst != null) {
            this.goalsAgainst += updateLeagueStats.goalsAgainst;
        }
        if (updateLeagueStats.points != null) {
            this.points += updateLeagueStats.points;
        }
    }
}
