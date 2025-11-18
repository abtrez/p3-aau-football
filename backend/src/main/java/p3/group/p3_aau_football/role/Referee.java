package p3.group.p3_aau_football.role;

import p3.group.p3_aau_football.match.Match;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.DocumentReference;

public class Referee extends Role {

    @DocumentReference
    private List<Match> matches;

    public Referee() {
        this.matches = List.of();
    }

    public Referee(List<Match> matches) {
        this.matches = matches;
    }

    public List<Match> getMatches() {
        return this.matches;
    }

    public void addMatch(Match match) {
        this.matches.add(match);
    }
}
