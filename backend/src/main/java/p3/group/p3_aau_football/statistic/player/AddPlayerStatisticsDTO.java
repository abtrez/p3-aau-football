package p3.group.p3_aau_football.statistic.player;

public record AddPlayerStatisticsDTO(
    String personId,
    int wins,
    int losses,
    int draws,
    int goals,
    int assists,
    int yellowCards,
    int redCards,
    int matchesPlayed,
    String competitionId,
    String season) {
}
