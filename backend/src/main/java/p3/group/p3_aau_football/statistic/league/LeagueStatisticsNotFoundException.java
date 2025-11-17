package p3.group.p3_aau_football.statistic.league;

import p3.group.p3_aau_football.statistic.exception.DocumentNotFoundException;

public class LeagueStatisticsNotFoundException extends DocumentNotFoundException {
    public LeagueStatisticsNotFoundException(String message) {
        super(message);
    }
}
