import CompetitionOverview from "@/components/competition/CompetitionOverview";
import { fetchCompetitions } from "@/lib/fetchCompetition";
import type { Competition } from "@/lib/schemas/competitionSchema";

export default async function Page() {
  const competitions: Competition[] = await fetchCompetitions();
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-left sm:text-center mb-3">Competitions</h1>
      <CompetitionOverview competitions={competitions} />
    </div>
  );
}
