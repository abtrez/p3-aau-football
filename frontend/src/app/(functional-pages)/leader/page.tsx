import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button, Chip } from "@mui/material";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const { user } = session;

  return (
    <div className="max-w-2xl mx-auto text-center mt-16 space-y-8">
      <div>
        {user.admin && <Chip label="Admin" color="primary" size="small" />}
        <h1 className="text-3xl font-semibold">Welcome, {user.name}</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div
          className="flex flex-col rounded-2xl bg-white shadow-sm border border-gray-100
          transition-all duration-200 hover:shadow-md p-6"
        >
          <div>
            <h3 className="text-sm font-medium text-gray-800 uppercase text-center">
              Add team member
            </h3>
            <p className="mt-2 text-sm text-center text-gray-500 leading-relaxed">
              Add a team member to your team.
            </p>
          </div>

          <div className="mt-auto pt-4">
            <Button href="/leader/add-member" variant="contained" fullWidth>
              Add Team Member
            </Button>
          </div>
        </div>

        <div
          className="flex flex-col rounded-2xl bg-white shadow-sm border border-gray-100
          transition-all duration-200 hover:shadow-md p-6"
        >
          <div>
            <h3 className="text-sm font-medium text-gray-800 uppercase text-center">
              Create match
            </h3>
            <p className="mt-2 text-sm text-center text-gray-500 leading-relaxed">
              Create a match against another team.
            </p>
          </div>

          <div className="mt-auto pt-4">
            <Button href="/leader/create-match" variant="contained" fullWidth>
              Create Match
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
