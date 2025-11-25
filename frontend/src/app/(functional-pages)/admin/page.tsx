import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { SignoutButton } from "@/components/authentication/SignoutButton";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user.admin) {
    redirect("/sign-in");
  }

  return (
    <div>
      <h1>asdjiasjdisai</h1>
    </div>
  );
}
