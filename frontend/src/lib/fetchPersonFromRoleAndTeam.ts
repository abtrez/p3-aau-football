"use server";
const BACKEND_URL = process.env.BACKEND_URI || "https://example.com/mock-api";
import { personSchema } from "@/lib/schemas/personSchema";
import { z } from "zod";

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
  const json = await res.json();
    
      // Validate returned data with Zod
      const personsArraySchema = z.array(personSchema);
      const result = personsArraySchema.safeParse(json);
    
      if (!result.success) {
        console.error("Raw JSON from backend:", JSON.stringify(json, null, 2));
        throw new Error(`Backend returned invalid Person data for team id ${teamId}`);
      }
    
      // Return validated members from team with role
      return result.data;
    }
