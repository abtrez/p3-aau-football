package p3.group.p3_aau_football.role;

import p3.group.p3_aau_football.match.Match;

import java.util.ArrayList;
import java.util.List;

public class Referee extends Role{
    private List<Match> matches = new ArrayList<>();

    public List<Match> getMatches() {
        return this.matches;
    }
    public void addMatch(Match match) {
        this.matches.add(match);
    }
}
