import TeamOverview from "@/components/team/TeamOverview";
import { fetchTeams } from "@/lib/fetchTeam";
import type { Team } from "@/lib/schemas/teamSchema";

export default async function Page() {
  const teams: Team[] = await fetchTeams();
  return (
    <>
      <h1 className="text-3xl text-center mb-3">Teams Overview</h1>
      <TeamOverview teams={teams} />
    </>
  );
}
