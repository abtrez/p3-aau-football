"use server";

import { Person } from "./schemas/personSchema";

const BACKEND_URL = process.env.BACKEND_URI || "https://example.com/mock-api";

if (!BACKEND_URL) {
  throw new Error("BACKEND_URI environment variable is not defined");
}

export async function fetchPersonsFromRoleAndTeamId(teamId : string, roles: string[]):
  Promise<Person[]>{
    const rolesQuery = roles.join(",");
    const res = await fetch(`${BACKEND_URL}/api/personFromRoleAndTeam/${teamId}?roles=${rolesQuery}`);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch persons from team ${teamId} and role ${rolesQuery}: ${res.status} ${res.statusText}`
    );
  }
  const data: Person[] = await res.json();
  return data;
}