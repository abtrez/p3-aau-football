package p3.group.p3_aau_football.people;

import java.util.List;

import p3.group.p3_aau_football.role.Role;

public record CreatePersonRequest(
        String firstName,
        String lastName,
        List<Role> roles,
        String teamId
) {
}


