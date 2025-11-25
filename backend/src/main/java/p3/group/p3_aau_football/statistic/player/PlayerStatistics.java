package p3.group.p3_aau_football.statistic.player;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import p3.group.p3_aau_football.statistic.common.Statistics;

@Document(collection = "player_statistics")
public class PlayerStatistics extends Statistics {
    @Id
    private String id;
    private String personId;
    private int wins;
    private int losses;
    private int draws;
    private int goals;
    private int assists;
    private int yellowCards;
    private int redCards;
    private int matchesPlayed;
    private String competitionId;
    private String season;

    public PlayerStatistics(String personId, int wins, int losses, int draws, int goals, int assists, int yellowCards,
            int redCards, int matchesPlayed,
            String competitionId, String season) {
        this.personId = personId;
        this.wins = wins;
        this.losses = losses;
        this.draws = draws;
        this.goals = goals;
        this.assists = assists;
        this.yellowCards = yellowCards;
        this.redCards = redCards;
        this.matchesPlayed = matchesPlayed;
        this.competitionId = competitionId;
        this.season = season;
    }

    // setters
    public void setWins(int wins) {
        this.wins = wins;
    }

    public void setLosses(int losses) {
        this.losses = losses;
    }

    public void setDraws(int draws) {
        this.draws = draws;
    }

    public void setGoals(int goals) {
        this.goals = goals;
    }

    public void setAssists(int assists) {
        this.assists = assists;
    }

    public void setYellowCards(int yellowCards) {
        this.yellowCards = yellowCards;
    }

    public void setRedCards(int redCards) {
        this.redCards = redCards;
    }

    public void setMatchesPlayed(int matchesPlayed) {
        this.matchesPlayed = matchesPlayed;
    }

    public void setCompetitionId(String competitionId) {
        this.competitionId = competitionId;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public void setPersonId(String personId) {
        this.personId = personId;
    }

    // getters
    public int getWins() {
        return this.wins;
    }

    public int getLosses() {
        return this.losses;
    }

    public int getDraws() {
        return this.draws;
    }

    public String getId() {
        return this.id;
    }

    public String getPersonId() {
        return this.personId;
    }

    public int getGoals() {
        return this.goals;
    }

    public int getAssists() {
        return this.assists;
    }

    public int getYellowCards() {
        return this.yellowCards;
    }

    public int getRedCards() {
        return this.redCards;
    }

    public int getMatchesPlayed() {
        return this.matchesPlayed;
    }

    public String getCompetitionId() {
        return this.competitionId;
    }

    public String getSeason() {
        return this.season;
    }
}
