import type { Competition } from "@/lib/schemas/competitionSchema";

import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import Link from "next/link";

interface CompetitionCardProps {
  competition: Competition;
}

export default function CompetitionCard({ competition }: CompetitionCardProps) {
  return (
    <Link href={`/competitions/${competition.id}`}>
      <div
        className="
        w-full
        sm:w-[400px]
        md:w-[500px]
        lg:w-[600px]
        h-[110px]
        sm:h-[115px]
        md:h-[150px]
        flex items-center justify-between
        rounded-xl border border-slate-200
        shadow-sm bg-white
        px-4 sm:px-5
        transition-all duration-200
        hover:shadow-md hover:-translate-y-1
        cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center p-3 rounded-xl bg-blue-50 text-blue-600">
            <SportsSoccerIcon fontSize="small" />
          </div>

          <div className="flex flex-col">
            <span className={"text-[11px] uppercase tracking-wide text-slate"}>
              Competition
            </span>
            <h3 className="sm:text-lg font-semibold text-slate-900 max-w-[180px] sm:max-w-full truncate">
              {competition.name}
            </h3>
          </div>
        </div>
        <span className="text-sm font-medium text-blue-600">See details</span>
      </div>
    </Link>
  );
}
