package p3.group.p3_aau_football.competition;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class CompetitionServiceTest {

    @Mock
    private CompetitionRepository competitionRepository;

    @InjectMocks
    private CompetitionService competitionService;

    @Test
    void ShouldReturnCompetitionWhenIdExists() {
        Competition mockCompetition = new Competition("2025/26", "Test Competition");
        mockCompetition.setId("123");
        when(competitionRepository.findById("123")).thenReturn(Optional.of(mockCompetition));

        Competition result = competitionService.getCompetition("123");

        assertEquals("Test Competition", result.getName());
        assertEquals("2025/27", result.getSeason());

        verify(competitionRepository).findById("123");
    }
}
