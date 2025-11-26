package p3.group.p3_aau_football.people;

import p3.group.p3_aau_football.role.Player;

public record AddPlayerToTeamDTO(
        String firstName,
        String lastName,
        String teamId,
        Player.PositionGroup positionGroup,
        Player.Position position
) {}
