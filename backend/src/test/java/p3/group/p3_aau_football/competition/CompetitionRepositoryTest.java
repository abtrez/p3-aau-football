package p3.group.p3_aau_football.competition;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class CompetitionRepositoryTest {

    @Mock
    private CompetitionRepository competitionRepository;

    @Test
    void ShouldReturnTrueWhenCompetitionAlreadyExists() {
        when(competitionRepository.existsBySeasonAndName("2025/26", "test")).thenReturn(true);

        Boolean result = competitionRepository.existsBySeasonAndName("2025/26", "test");

        assertEquals(true, result);

        verify(competitionRepository).existsBySeasonAndName("2025/26", "test");
    }

    @Test
    void ShouldReturnFalseWhenCompetitionDoesNotAlreadyExist() {
        when(competitionRepository.existsBySeasonAndName("2025/26", "test")).thenReturn(false);

        Boolean result = competitionRepository.existsBySeasonAndName("2025/26", "test");

        assertEquals(false, result);

        verify(competitionRepository).existsBySeasonAndName("2025/26", "test");
    }
}
