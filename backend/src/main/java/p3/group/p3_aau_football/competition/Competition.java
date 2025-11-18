package p3.group.p3_aau_football.competition;

import org.springframework.data.mongodb.core.mapping.DocumentReference;
import p3.group.p3_aau_football.match.Match;
import p3.group.p3_aau_football.season.Season;
import p3.group.p3_aau_football.team.Team;

import java.util.List;

public abstract class Competition {
    protected String name;
    @DocumentReference
    protected Season season;
    protected List<Team> participatingTeams;
    protected List<Match> matches;
}
