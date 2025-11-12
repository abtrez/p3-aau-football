package p3.group.p3_aau_football.statistic;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public abstract class Statistics {
    @Id
    private String id;
    private LocalDateTime timestamp;
}
