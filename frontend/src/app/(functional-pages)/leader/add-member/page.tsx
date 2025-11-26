import AddMemberForm from "@/components/forms/AddMemberForm";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("You must be logged in to access this page");
  }
  const teamId = session.user.team;

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <AddMemberForm teamId={teamId} />
    </div>
  );
}
