"use server";
const BACKEND_URL = process.env.BACKEND_URI || "https://example.com/mock-api";

if (!BACKEND_URL) {
    throw new Error("BACKEND_URI environment variable is not defined");
}

export async function fetchTeams() {
    const res = await fetch(`${BACKEND_URL}/api/team/get`);
    if (!res.ok) {
        throw new Error(`Failed to fetch teams: ${res.status} ${res.statusText}`);
    }
    return res.json();
}

export async function fetchTeamById(teamID: string) {
    const res = await fetch(`${BACKEND_URL}/api/team/get/${teamID}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch team ${teamID}: ${res.status} ${res.statusText}`);
    }
    return res.json();
}

export async function fetchTeams() {
    const res = await fetch(`${BACKEND_URL}/api/team/get`);
    if (!res.ok) {
        throw new Error(
            `Failed to fetch teams: ${res.status} ${res.statusText}`
        );
    }
    return res.json();
}
