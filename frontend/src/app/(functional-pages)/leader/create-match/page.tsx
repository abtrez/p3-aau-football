import { auth } from "@/lib/auth/auth";
import { fetchTeamById, fetchTeams } from "@/lib/fetchTeam";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CreateMatchForm } from "@/components/forms/CreateMatchForm";
import { fetchCompetitions } from "@/lib/fetchCompetition";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }
  
  const team = await fetchTeamById(session.user.team);
  const teams = await fetchTeams();
  const competitions = await fetchCompetitions();

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <CreateMatchForm homeTeam={team} teams={teams} competitions={competitions} />
    </div>
  );
}
