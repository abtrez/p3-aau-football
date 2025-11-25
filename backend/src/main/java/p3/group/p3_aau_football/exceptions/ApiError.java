package p3.group.p3_aau_football.exceptions;

import java.time.LocalDateTime;

public record ApiError(
        LocalDateTime timestamp,
        int status,
        String message,
        String path
) {
}
