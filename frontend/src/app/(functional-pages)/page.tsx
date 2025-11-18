import MatchOverview from "@/components/match/MatchOverview";
import { fetchMatchOverview } from "@/lib/fetchMatch";
import type { Match } from "@/lib/schemas/matchSchema";

export default async function Home() {
  const matches: Match[] = await fetchMatchOverview();
  return (
    <>
      <h1 className="text-3xl text-center mb-3">Match Overview</h1>
      <MatchOverview matches={matches} />
    </>
  );
}
