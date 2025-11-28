import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@mui/material";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user.admin) {
    redirect("/sign-in");
  }

  return (
    <div className="grid grid-cols-3 w-full mt-15 gap-5">
      <Button variant="contained" href="/admin/create-user">
        Add leader
      </Button>
      <Button variant="contained" href="/admin/create-competition">
        Add competition
      </Button>
      <Button variant="contained" href="/admin/create-team">
        Add team
      </Button>
    </div>
  );
}
