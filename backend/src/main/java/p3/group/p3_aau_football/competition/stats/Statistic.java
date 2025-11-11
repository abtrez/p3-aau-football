package p3.group.p3_aau_football.competition.stats;

import org.springframework.data.annotation.Id;

import java.util.List;

/**
 * What is measured
 */
public class Statistic {
    Long id;
    String abbreviation; //PL, W, D, L,           GF, GA ...
    String name;         //Played, Won, Drawn     Goals For, Goals Against ...can
}
