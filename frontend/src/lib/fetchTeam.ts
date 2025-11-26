"use server";
const BACKEND_URL = process.env.BACKEND_URI;

const isBuild = !!process.env.NEXT_PHASE;

import {
  teamsArraySchema,
  type Team,
  teamSchema,
} from "@/lib/schemas/teamSchema";

if (!BACKEND_URL && !isBuild) {
  throw new Error("BACKEND_URI environment variable is not defined");
}

export async function fetchTeams(): Promise<Team[]> {
  if (isBuild) return [];
  const res = await fetch(`${BACKEND_URL}/api/team/get`);
  if (!res.ok) {
    throw new Error(`Failed to fetch teams: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();

  // Validate returned json with Zod
  const result = teamsArraySchema.safeParse(json);

  if (!result.success) {
    console.error("Raw JSON from backend:", JSON.stringify(json, null, 2));
    throw new Error("Backend returned invalid teams data");
  }

  // Return validated team data
  return result.data;
}

export async function fetchTeamById(teamId: string): Promise<Team> {
  const safePattern = /^[a-zA-Z0-9_-]+$/;
  if (!safePattern.test(teamId)) {
    throw new Error(`Invalid teamId parameter.`);
  }
  const res = await fetch(`${BACKEND_URL}/api/team/get/${teamId}`);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch team ${teamId}: ${res.status} ${res.statusText}`
    );
  }
  const json = await res.json();

  // Validate returned data with Zod
  const result = teamSchema.safeParse(json);

  if (!result.success) {
    console.error("Raw JSON from backend:", JSON.stringify(json, null, 2));
    throw new Error(`Backend returned invalid team data for id ${teamId}`);
  }

  // Return validated single team data
  return result.data;
}

export async function addTeam(
  name: string,
  abbreviation: string,
  yearEstablished: number,
  department: string,
  studyPrograms: string[],
  contactPerson: string
) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      abbreviation: abbreviation,
      yearEstablished: yearEstablished,
      department: department,
      studyPrograms: studyPrograms,
      contactPerson: contactPerson,
    }),
  };

  const res = await fetch(`${BACKEND_URL}/api/team/add`, options);

  if (!res.ok) {
    return {
      result: null,
      error: `Failed to add team: ${res.status} ${res.statusText}`,
    };
  }

  const json = await res.json();

  // Validate returned json with Zod
  const result = teamSchema.safeParse(json);

  if (!result.success) {
    return {
      result: null,
      error: "Backend returned invalid team data",
    };
  }

  // Return status code and state of response
  return { result: result.data, error: null };
}
