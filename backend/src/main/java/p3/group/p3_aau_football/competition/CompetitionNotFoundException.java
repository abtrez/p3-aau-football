package p3.group.p3_aau_football.competition;

import p3.group.p3_aau_football.exceptions.DocumentNotFoundException;

public class CompetitionNotFoundException extends DocumentNotFoundException {
    public CompetitionNotFoundException(String message) {
        super(message);
    }
}
