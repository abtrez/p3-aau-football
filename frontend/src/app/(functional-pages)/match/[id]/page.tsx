import { fetchMatchById } from "@/lib/fetchMatch";
import { Match } from "@/lib/schemas/matchSchema";
import MatchPage from "@/components/match/MatchPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  //Fetch initial data
  const { id } = await params;
  const match: Match = await fetchMatchById(id);

  return (
    <div className="text-center">
        <MatchPage initialMatch={match} />
    </div>
  );
}
