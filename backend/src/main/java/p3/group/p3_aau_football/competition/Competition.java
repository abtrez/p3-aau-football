package p3.group.p3_aau_football.competition;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import p3.group.p3_aau_football.match.Match;
import p3.group.p3_aau_football.season.Season;
import p3.group.p3_aau_football.team.Team;

import java.util.List;
//use composition, pg. 788 javafundamentals
@Document(collection = "competition")
public class Competition {
    @Id private String id;
    private String name;
    private Season season;
    private List<Team> participatingTeams;
    private List<Match> matches;
}
