package p3.group.p3_aau_football.statistic.player;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import p3.group.p3_aau_football.statistic.common.Statistics;

@Document(collection = "player_statistics")
public class PlayerStatistics extends Statistics {
    @Id
    private String id;
    private String personId;
    private int goals;
    private int assists;
    private int yellowCards;
    private int redCards;
    private int matchesPlayed;
    private String competitionId;
    private String season;

    public PlayerStatistics(String personId, int goals, int assists, int yellowCards, int redCards, int matchesPlayed,
                            String competitionId, String season) {
        super();
    }

    // setters
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
