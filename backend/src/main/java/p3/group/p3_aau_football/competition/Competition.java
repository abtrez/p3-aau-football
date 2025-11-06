package p3.group.p3_aau_football.competition;

import p3.group.p3_aau_football.competition.policy.FormatPolicy;
import p3.group.p3_aau_football.match.Match;
import p3.group.p3_aau_football.season.Season;
import p3.group.p3_aau_football.team.Team;

import java.util.List;

public class Competition {
    private String name;
    private Season season;
    private List<Team> participatingTeams;
    private List<Match> matches;

    private FormatPolicy format;
}
