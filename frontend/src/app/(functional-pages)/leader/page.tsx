import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@mui/material";

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
      <Button variant="contained" href="/leader/create-match">
        create match
      </Button>
      <Button variant="contained" href="/leader/add-member">
        add member
      </Button>
    </div>
  );
}
