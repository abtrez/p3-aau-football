import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const response = await auth.api.getSession({
    headers: await headers(),
  });

  if (response && response.session) {
    if (response.user.admin) {
      redirect("/admin");
    }
    redirect("/leader");
  }
  redirect("/sign-in");
}
