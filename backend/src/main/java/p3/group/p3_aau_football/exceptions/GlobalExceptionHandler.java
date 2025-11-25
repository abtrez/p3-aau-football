package p3.group.p3_aau_football.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import p3.group.p3_aau_football.competition.CompetitionAlreadyExistsException;
import p3.group.p3_aau_football.competition.CompetitionNotFoundException;
import p3.group.p3_aau_football.statistic.league.LeagueStatisticsNotFoundException;
import p3.group.p3_aau_football.statistic.player.PlayerStatisticsNotFoundException;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(LeagueStatisticsNotFoundException.class)
    public ResponseEntity<ApiError> handleLeagueStatisticsNotFound(
            LeagueStatisticsNotFoundException exception, HttpServletRequest request
    ) {
        ApiError error = new ApiError(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                exception.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(PlayerStatisticsNotFoundException.class)
    public ResponseEntity<ApiError> handlePlayerStatisticsNotFound(
            PlayerStatisticsNotFoundException exception, HttpServletRequest request
    ) {
        ApiError error = new ApiError(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                exception.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(CompetitionNotFoundException.class)
    public ResponseEntity<ApiError> handleCompetitionsNotFound(
            CompetitionNotFoundException exception, HttpServletRequest request
    ) {
        ApiError error = new ApiError(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                exception.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(CompetitionAlreadyExistsException.class)
    public ResponseEntity<ApiError> handleCompetitionAlreadyExists(
            CompetitionAlreadyExistsException exception, HttpServletRequest request
    ) {
        ApiError error = new ApiError(
                LocalDateTime.now(),
                HttpStatus.CONFLICT.value(),
                exception.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }
}
