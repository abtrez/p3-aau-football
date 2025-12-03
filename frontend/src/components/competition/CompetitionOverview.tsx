import CompetitionCard from "@/components/competition/CompetitionCard";
import type { Competition } from "@/lib/schemas/competitionSchema";

interface CompetitionOverviewProps {
  competitions: Competition[];
}

export default function CompetitionOverview({
  competitions,
}: CompetitionOverviewProps) {
  return (
    <div className="flex flex-col gap-4 justify-center items-stretch sm:items-center">
      {competitions.map((competition) => {
        if (competition.name === "Friendlies") return null;
        return (
          <CompetitionCard key={competition.id} competition={competition} />
        );
      })}
    </div>
  );
}
