package p3.group.p3_aau_football.statistic.league;

import p3.group.p3_aau_football.exceptions.DocumentNotFoundException;

public class LeagueStatisticsNotFoundException extends DocumentNotFoundException {
    public LeagueStatisticsNotFoundException(String message) {
        super(message);
    }
}
