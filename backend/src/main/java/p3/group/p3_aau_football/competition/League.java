package p3.group.p3_aau_football.competition;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import p3.group.p3_aau_football.match.Match;
import p3.group.p3_aau_football.season.Season;
import p3.group.p3_aau_football.team.Team;

import java.util.List;

@Document(collection = "leagues")
public class League extends Competition {

    @Id
    private String id;

    private int pointsForWin = 3;
    private int pointsForLoss = 0;
    private int pointsForDraw = 1;

    public League(){
    }

    public League(String name, Season season, List<Team> participatingTeams) {
        this.name = name;
        this.season = season;
        this.participatingTeams = participatingTeams;
    }

    public String getId() {
        return id;
    }

    public int getPointsForWin() {
        return pointsForWin;
    }

    public int getPointsForLoss() {
        return pointsForLoss;
    }

    public int getPointsForDraw() {
        return pointsForDraw;
    }

}
