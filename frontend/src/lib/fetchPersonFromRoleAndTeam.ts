"use server";
const BACKEND_URL = process.env.BACKEND_URI || "https://example.com/mock-api";

if (!BACKEND_URL) {
  throw new Error("BACKEND_URI environment variable is not defined");
}

export async function fetchPersonFromTeamIdByRole(teamId : string, roleName : string) {
  const res = await fetch(`${BACKEND_URL}/api/person/getFromTeam/${teamId}/role/${roleName}`);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch persons from team ${teamId} with team role ${roleName}: ${res.status} ${res.statusText}`
    );
  }
  return res.json();
}