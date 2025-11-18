import TeamBadge from "@/components/team/TeamBadge";
import {Match} from "@/lib/schemas/matchSchema";

export interface MatchEventRowProps {
  matchEvent: Match;
}

export default function MatchEventRow({ matchEvent }: MatchEventRowProps) {
  return (
    <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center">

          {/*minute */}
        <div className="justify-self-start">
          <p>68'</p>
        </div>

          {/*icon */}
        <div className="flex flex-col items-center justify-center gap-1 text-gray-500">
          <span className="px-4 text-sm font-semibold text-gray-500 justify-self-center">
            ICON
          </span>
        </div>

          {/*text */}
        <div className="justify-self-end">
            <p>player'</p>
        </div>
      </div>
    </div>
  );
}
