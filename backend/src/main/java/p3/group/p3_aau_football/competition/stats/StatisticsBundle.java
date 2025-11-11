package p3.group.p3_aau_football.competition.stats;

import p3.group.p3_aau_football.match.MatchEvent;


//make scope marker interface
//make participant marker interface

import java.util.List;
import java.util.Map;

//skinny


public class StatisticsBundle {
    //season/competition/stage
    private Long scopeId;

    //team.id / player.id
    private Long participantId;

    //Map a statistic (Goals For) to the source of truth (MatchEvents that count towards that stat)
    private Map<Statistic, List<MatchEvent>> eventsByStat;
}

//stats bundle

