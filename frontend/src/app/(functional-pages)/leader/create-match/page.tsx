import { auth } from "@/lib/auth/auth";
import { fetchTeamById } from "@/lib/fetchTeam";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CreateMatchForm } from "@/components/forms/CreateMatchForm";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }
  
  const team = await fetchTeamById(session.user.team);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <CreateMatchForm homeTeam={team} />
    </div>
  );
}
