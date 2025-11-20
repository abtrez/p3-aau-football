import type { Competition } from "@/lib/schemas/competitionSchema";

interface CompetitionCardProps {
  competition: Competition;
}

export default function CompetitionCard({ competition }: CompetitionCardProps) {
  return (
    <div className="flex flex-col border border-black rounded-xl justify-center items-center h-[200px] w-[400px]">
      {competition.name}
    </div>
  );
}
