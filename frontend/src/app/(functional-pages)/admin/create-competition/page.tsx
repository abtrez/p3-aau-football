import { CreateCompetitionForm } from "@/components/forms/CreateCompetitionForm";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user.admin) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <CreateCompetitionForm />
    </div>
  );
}
