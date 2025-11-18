package p3.group.p3_aau_football.statistic.common;

import java.time.LocalDateTime;

public abstract class Statistics {

    private LocalDateTime timestamp;

    public LocalDateTime getTimestamp() {
        return this.timestamp;
    }

    ;

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
;
}
