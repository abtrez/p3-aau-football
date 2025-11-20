import CompetitionCard from "@/components/competition/CompetitionCard";
import type { Competition } from "@/lib/schemas/competitionSchema";

interface CompetitionOverviewProps {
  competitions: Competition[];
}

export default function CompetitionOverview({
  competitions,
}: CompetitionOverviewProps) {
  return (
    <div className="grid gap-4">
      {competitions.map((c) => (
        //<CompetitionCard key={c.id} competition={c} />
        <p>Hello</p>
      ))}
    </div>
  );
}
