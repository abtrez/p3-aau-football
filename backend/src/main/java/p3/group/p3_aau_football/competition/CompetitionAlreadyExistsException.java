package p3.group.p3_aau_football.competition;

import p3.group.p3_aau_football.exceptions.DocumentAlreadyExistsException;

public class CompetitionAlreadyExistsException extends DocumentAlreadyExistsException {
    public CompetitionAlreadyExistsException(String message) {
        super(message);
    }
}
