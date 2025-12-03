import MatchOverview from "@/components/match/MatchOverview";
import { fetchMatchOverview } from "@/lib/fetchMatch";
import type { Match } from "@/lib/schemas/matchSchema";
import AddIcon from "@mui/icons-material/Add";
import FloatingActionButton from "@/components/FloatingActionButton";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export default async function Home() {
  const matches: Match[] = await fetchMatchOverview();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div>
      <h1 className="text-3xl text-left sm:text-center mb-3">Match Overview</h1>
      <MatchOverview matches={matches} />
      {session && (
        <FloatingActionButton icon={AddIcon} link="/leader/create-match" />
      )}
    </div>
  );
}
