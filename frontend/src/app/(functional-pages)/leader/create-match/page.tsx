import { auth } from "@/lib/auth/auth";
import { fetchTeamById, fetchTeams } from "@/lib/fetchTeam";
import { fetchCompetitionBySeasonAndName } from "@/lib/fetchCompetition";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CreateMatchForm } from "@/components/forms/CreateMatchForm";
import { fetchCompetitions } from "@/lib/fetchCompetition";
import { getCurrentSeason } from "@/lib/utils/getCurrentSeason";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const currentSeason = getCurrentSeason();
  const homeTeamId = session.user.team;
  const opponentTeams = await fetchTeams();
  const competition = await fetchCompetitionBySeasonAndName(
    "Friendlies",
    currentSeason,
  );

  console.log(competition);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <CreateMatchForm
        homeTeamId={homeTeamId}
        opponentTeams={opponentTeams}
        competition={competition}
        season={currentSeason}
      />
    </div>
  );
}
