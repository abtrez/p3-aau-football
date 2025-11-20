import TeamBadge from "@/components/team/TeamBadge";
import {MatchEvent} from "@/lib/schemas/matchSchema";

export interface MatchEventRowProps {
  matchEvent: MatchEvent;
  isHomeTeamEvent: boolean;
}

export default function MatchEventRow({ matchEvent, isHomeTeamEvent}: MatchEventRowProps) {
    const minuteLabel = matchEvent.minute != null ? `${matchEvent.minute}'` : "";
    const text = `${matchEvent.type} ${matchEvent.team?.name}`;

    return (
    <div className=" p-4">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center">

          {/*left */}
        <div className="justify-self-start">
          <p>{isHomeTeamEvent ? text : minuteLabel}</p>
        </div>

          {/*icon */}
        <div className="flex flex-col items-center justify-center gap-1 text-gray-500">
          <span className="px-4 text-sm font-semibold text-gray-500 justify-self-center">
            ICON
          </span>
        </div>

          {/*right */}
        <div className="justify-self-end">
            <p>{isHomeTeamEvent ? minuteLabel : text}</p>
        </div>
      </div>
    </div>
  );
}
