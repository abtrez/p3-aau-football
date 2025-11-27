package p3.group.p3_aau_football.competition;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
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
    void shouldReturnCompetitionWhenIdExists() {
        Competition mockCompetition = new Competition("2025/26", "Test Competition");
        mockCompetition.setId("123");
        when(competitionRepository.findById("123")).thenReturn(Optional.of(mockCompetition));

        Competition result = competitionService.getCompetition("123");

        assertEquals("Test Competition", result.getName());
        assertEquals("2025/26", result.getSeason());

        verify(competitionRepository).findById("123");
    }

    @Test
    void shouldThrowExceptionWhenCompetitionNotFound() {
        when(competitionRepository.findById("321")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> competitionService.getCompetition("321"));

        assertEquals("Competition not found with ID: 321", exception.getMessage());
        verify(competitionRepository).findById("321");
    }

    @Test
    void shouldReturnAllCompetitionsWhenTheyExist() {
        List<Competition> mockCompetitions = List.of(new Competition("2025/26", "Test Competition"), new Competition("2026/27", "Test Competition2"));

        when(competitionRepository.findAll()).thenReturn(mockCompetitions);

        List<Competition> result = competitionService.getOverview();

        assertEquals(false, result.isEmpty());
        assertEquals("Test Competition", result.get(0).getName());
        assertEquals("Test Competition2", result.get(1).getName());
        assertEquals("2025/26", result.get(0).getSeason());
        assertEquals("2026/27", result.get(1).getSeason());

        verify(competitionRepository).findAll();
    }

    @Test
    void shouldThrowExceptionWhenNoCompetitionsExist() {
        when(competitionRepository.findAll()).thenReturn(new ArrayList<>());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> competitionService.getOverview());

        assertEquals("No competitions in the collection", exception.getMessage());
        verify(competitionRepository).findAll();
    }

    @Test
    void shouldCreateCompetitionSuccessfully() {
        Competition savedCompetition = new Competition("2025/26", "test");
        when(competitionRepository.insert(any(Competition.class))).thenReturn(savedCompetition);

        Competition competition = competitionService.insertCompetition("2025/26", "test");

        assertEquals("test", competition.getName());
        assertEquals("2025/26", competition.getSeason());
        verify(competitionRepository).insert(any(Competition.class));
    }

    @Test
    void shouldThrowExceptionWhenCompetitionAlreadyExists() {
        when(competitionRepository.existsBySeasonAndName(any(String.class), any(String.class))).thenReturn(true);

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> competitionService.insertCompetition("2025/26", "test"));

        assertEquals("A competition with the same season and name already exists: Season: 2025/26, Name: test", exception.getMessage());

        verify(competitionRepository).existsBySeasonAndName(any(String.class), any(String.class));
    }
}
