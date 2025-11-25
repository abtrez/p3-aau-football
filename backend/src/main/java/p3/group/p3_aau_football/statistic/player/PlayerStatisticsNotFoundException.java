package p3.group.p3_aau_football.statistic.player;

import p3.group.p3_aau_football.exceptions.DocumentNotFoundException;

public class PlayerStatisticsNotFoundException extends DocumentNotFoundException {
    public PlayerStatisticsNotFoundException(String message) {
        super(message);
    }
}
