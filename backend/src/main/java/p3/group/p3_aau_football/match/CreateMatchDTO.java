package p3.group.p3_aau_football.match;

import java.time.LocalDateTime;

public record CreateMatchDTO(
        String homeTeamId,
        String awayTeamId,
        String season,
        String competitionId,
        String venue,
        LocalDateTime kickoff
) {}