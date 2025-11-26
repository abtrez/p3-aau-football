import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div>
      <h1>
        Welcome {session.user.name} Team: {session.user.team} Admin:{" "}
        {session.user.admin.toString()} OBJECT:
        {JSON.stringify(session.user)}
      </h1>
    </div>
  );
}
