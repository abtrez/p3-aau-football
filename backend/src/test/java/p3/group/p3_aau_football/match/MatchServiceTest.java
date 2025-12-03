package p3.group.p3_aau_football.match;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import p3.group.p3_aau_football.match.event.MatchEventRequestMapperRegistry;
import p3.group.p3_aau_football.statistic.league.LeagueStatisticsService;
import p3.group.p3_aau_football.team.TeamService;

@ExtendWith(MockitoExtension.class)
public class MatchServiceTest {

    @Mock
    MatchRepository matchRepository;
    @Mock
    TeamService teamService;
    @Mock
    LeagueStatisticsService leagueStatsService;
    @Mock
    MatchEventRequestMapperRegistry mapperRegistry;

    @InjectMocks
    MatchService matchService;

}
